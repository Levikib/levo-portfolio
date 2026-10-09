import { NextRequest, NextResponse } from "next/server";
import {
  PERSONA_BY_ID,
  CHANNELS,
  HEARD,
  LIMITS,
  checkDetails,
  checkContact,
  displayValue,
  optionLabel,
  normaliseUrl,
} from "@/components/contact/leadConfig";
import type { Answers, ContactInfo, LeadPayload, Persona, PersonaId } from "@/components/contact/leadConfig";

/**
 * Lead intake for the contact form (src/components/contact/LeadForm.tsx).
 * Validates with the same config as the client, drops bots quietly, and sends
 * one clean HTML email through Resend.
 *
 * Env: RESEND_API_KEY (required). Optional: CONTACT_TO (default Levo's inbox),
 * CONTACT_FROM (default Resend's onboarding sender; set to a verified domain sender in production).
 */

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const WA_NUMBER = "254723819934";
const TO = process.env.CONTACT_TO || "leviskibirie2110@gmail.com";
const FROM = process.env.CONTACT_FROM || "Portfolio Leads <onboarding@resend.dev>";
const SITE_HOST = "levis.makejahomes.co.ke";

/* ─── light in-memory rate limit (per server instance) ─────────────────── */
const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 5;
const hits = new Map<string, number[]>();

function rateLimited(ip: string): boolean {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  if (hits.size > 5000) {
    for (const [k, v] of hits) if (v.every((t) => now - t >= WINDOW_MS)) hits.delete(k);
  }
  return recent.length > MAX_PER_WINDOW;
}

function clientIp(req: NextRequest): string {
  const fwd = req.headers.get("x-forwarded-for");
  return (fwd ? fwd.split(",")[0] : req.headers.get("x-real-ip") || req.ip || "unknown").trim();
}

/* ─── helpers ──────────────────────────────────────────────────────────── */
const esc = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;");
const oneLine = (s: string) => s.replace(/[\r\n\t]+/g, " ").replace(/\s{2,}/g, " ").trim();
const str = (v: unknown, max = LIMITS.text) => (typeof v === "string" ? v.slice(0, max) : "");

const json = (body: Record<string, unknown>, status = 200) => NextResponse.json(body, { status });

/** Coerces untrusted JSON into the expected shapes. Unknown keys are dropped. */
function coerce(body: unknown): { persona: Persona | null; answers: Answers; contact: ContactInfo; meta: NonNullable<LeadPayload["meta"]>; hp: string } {
  const b = (body && typeof body === "object" ? body : {}) as Record<string, unknown>;

  // Legacy shape { name, email, message, type } from the old form.
  if (!b.persona && typeof b.email === "string") {
    return {
      persona: PERSONA_BY_ID.other,
      answers: { subject: str(b.type) || "Message from the site" },
      contact: { name: str(b.name, LIMITS.name), email: str(b.email, LIMITS.email), phoneCode: "", phone: "", company: "", channel: "email", heard: "", message: str(b.message, LIMITS.message), consent: true },
      meta: {},
      hp: "",
    };
  }

  const persona = typeof b.persona === "string" && b.persona in PERSONA_BY_ID ? PERSONA_BY_ID[b.persona as PersonaId] : null;
  const rawA = (b.answers && typeof b.answers === "object" ? b.answers : {}) as Record<string, unknown>;
  const answers: Answers = {};
  if (persona) {
    for (const f of persona.fields) {
      const v = rawA[f.id];
      if (f.kind === "multi") {
        if (Array.isArray(v)) answers[f.id] = v.filter((x): x is string => typeof x === "string").slice(0, 20).map((x) => x.slice(0, 60));
      } else if (typeof v === "string") {
        answers[f.id] = v.slice(0, f.kind === "url" ? LIMITS.url : LIMITS.text);
      }
    }
  }
  const c = (b.contact && typeof b.contact === "object" ? b.contact : {}) as Record<string, unknown>;
  const contact: ContactInfo = {
    name: str(c.name, LIMITS.name + 1),
    email: str(c.email, LIMITS.email + 1).trim(),
    phoneCode: str(c.phoneCode, 10),
    phone: str(c.phone, 30),
    company: str(c.company, LIMITS.text + 1),
    channel: str(c.channel, 20),
    heard: str(c.heard, 30),
    message: str(c.message, LIMITS.message + 1),
    consent: c.consent === true,
  };
  const m = (b.meta && typeof b.meta === "object" ? b.meta : {}) as Record<string, unknown>;
  const utmIn = (m.utm && typeof m.utm === "object" ? m.utm : {}) as Record<string, unknown>;
  const utm: Record<string, string> = {};
  for (const k of ["utm_source", "utm_medium", "utm_campaign", "utm_content", "ref"]) {
    const v = str(utmIn[k], 120);
    if (v) utm[k] = v;
  }
  return {
    persona,
    answers,
    contact,
    meta: {
      page: str(m.page, 200),
      referrer: str(m.referrer, 300),
      utm,
      elapsedMs: typeof m.elapsedMs === "number" && Number.isFinite(m.elapsedMs) ? m.elapsedMs : undefined,
    },
    hp: str(b.hp, 200),
  };
}

/* ─── email ────────────────────────────────────────────────────────────── */
type Row = { k: string; v: string; href?: string };

function rowsHtml(rows: Row[]): string {
  return rows
    .filter((r) => r.v)
    .map(
      (r) => `<tr>
  <td style="padding:10px 14px 10px 0;vertical-align:top;width:38%;font:600 12px/1.4 ui-monospace,Menlo,monospace;color:#8a857b;text-transform:uppercase;letter-spacing:.06em;">${esc(r.k)}</td>
  <td style="padding:10px 0;vertical-align:top;font:15px/1.5 -apple-system,Segoe UI,Roboto,sans-serif;color:#1a1814;">${
    r.href ? `<a href="${esc(r.href)}" style="color:#c25a00;">${esc(r.v)}</a>` : esc(r.v)
  }</td>
</tr>`,
    )
    .join("");
}

function section(title: string, inner: string): string {
  return `<div style="background:#ffffff;border-radius:16px;padding:20px 22px;margin:0 0 14px;">
  <p style="margin:0 0 6px;font:700 12px/1 ui-monospace,Menlo,monospace;color:#8a857b;text-transform:uppercase;letter-spacing:.1em;">${esc(title)}</p>
  ${inner}
</div>`;
}

function buildEmail(p: Persona, answers: Answers, c: ContactInfo, meta: NonNullable<LeadPayload["meta"]>, ip: string) {
  const org = (p.orgField ? String(answers[p.orgField] ?? "") : c.company).trim();
  const name = oneLine(c.name);
  const subject = oneLine(`[Lead · ${p.tag}] ${name}${org ? `, ${org}` : ""}`).slice(0, 180);

  const codeDigits = c.phoneCode && c.phoneCode !== "other" ? c.phoneCode.replace(/\D/g, "") : "";
  const localDigits = c.phone.replace(/\D/g, "");
  const intl = localDigits ? (codeDigits ? codeDigits + localDigits.replace(/^0+/, "") : localDigits) : "";
  const fullPhone = localDigits ? (codeDigits ? `+${codeDigits} ${c.phone.trim()}` : c.phone.trim()) : "";

  const detailRows: Row[] = p.fields.map((f) => {
    const v = displayValue(f, answers[f.id]);
    return { k: f.label, v, href: f.kind === "url" && v ? normaliseUrl(v) ?? undefined : undefined };
  });

  const contactRows: Row[] = [
    { k: "Name", v: name },
    { k: "Email", v: c.email, href: `mailto:${c.email}` },
    { k: "Phone", v: fullPhone, href: intl ? `tel:+${intl}` : undefined },
    { k: "Company", v: p.orgField ? "" : oneLine(c.company) },
    { k: "Reach by", v: optionLabel(CHANNELS, c.channel) },
    { k: "Found via", v: c.heard ? optionLabel(HEARD, c.heard) : "" },
  ];

  const utmStr = Object.entries(meta.utm ?? {}).map(([k, v]) => `${k}=${v}`).join(", ");
  const metaRows: Row[] = [
    { k: "Page", v: meta.page ?? "" },
    { k: "Referrer", v: meta.referrer ?? "" },
    { k: "Campaign", v: utmStr },
    { k: "Time on form", v: meta.elapsedMs ? `${Math.round(meta.elapsedMs / 1000)}s` : "" },
    { k: "Received", v: new Date().toLocaleString("en-GB", { timeZone: "Africa/Nairobi", dateStyle: "medium", timeStyle: "short" }) + " EAT" },
    { k: "IP", v: ip },
  ];

  const replyHref = `mailto:${c.email}?subject=${encodeURIComponent(`Re: ${p.ask}`)}`;
  const waHref = intl ? `https://wa.me/${intl}?text=${encodeURIComponent(`Hi ${name.split(" ")[0]}, Levo here. Thanks for reaching out.`)}` : "";
  const btn = (href: string, label: string, bg: string, fg: string) =>
    `<a href="${esc(href)}" style="display:inline-block;margin:0 8px 8px 0;padding:12px 18px;border-radius:999px;background:${bg};color:${fg};font:700 14px/1 -apple-system,Segoe UI,Roboto,sans-serif;text-decoration:none;">${esc(label)}</a>`;

  const msgHtml = esc(c.message.trim()).replace(/\r?\n/g, "<br>");

  const html = `<!doctype html><html><body style="margin:0;background:#f3eee4;">
<div style="max-width:640px;margin:0 auto;padding:28px 16px;font-family:-apple-system,Segoe UI,Roboto,sans-serif;">
  <div style="background:#111316;border-radius:20px;padding:24px 24px 22px;margin:0 0 14px;">
    <p style="margin:0;font:600 12px/1 ui-monospace,Menlo,monospace;color:${esc(p.accent)};letter-spacing:.08em;text-transform:uppercase;">New lead · ${esc(p.tag)}</p>
    <h1 style="margin:10px 0 6px;font:800 26px/1.1 -apple-system,Segoe UI,Roboto,sans-serif;color:#f3eee4;letter-spacing:-.02em;">${esc(name)}${org ? `<span style="color:#a7a195;font-weight:600;">, ${esc(org)}</span>` : ""}</h1>
    <p style="margin:0;font:14px/1.5 -apple-system,Segoe UI,Roboto,sans-serif;color:#d9d3c7;">${esc(p.label)}</p>
    <div style="margin-top:18px;">
      ${btn(replyHref, "Reply by email", "#d4ff3a", "#111400")}
      ${waHref ? btn(waHref, "WhatsApp them", "#25d366", "#06200f") : ""}
    </div>
  </div>
  ${section(p.message.label, `<p style="margin:0;font:15.5px/1.6 -apple-system,Segoe UI,Roboto,sans-serif;color:#1a1814;">${msgHtml}</p>`)}
  ${section("Details", `<table role="presentation" style="width:100%;border-collapse:collapse;">${rowsHtml(detailRows)}</table>`)}
  ${section("Contact", `<table role="presentation" style="width:100%;border-collapse:collapse;">${rowsHtml(contactRows)}</table>`)}
  ${section("Source", `<table role="presentation" style="width:100%;border-collapse:collapse;">${rowsHtml(metaRows)}</table>`)}
  <p style="margin:18px 0 0;font:12px/1.5 ui-monospace,Menlo,monospace;color:#8a857b;">Sent from ${SITE_HOST}. Consent to reply: given.</p>
</div></body></html>`;

  const text = [
    `New lead: ${p.label}`,
    "",
    `${p.message.label}:`,
    c.message.trim(),
    "",
    "DETAILS",
    ...detailRows.filter((r) => r.v).map((r) => `${r.k}: ${r.v}`),
    "",
    "CONTACT",
    ...contactRows.filter((r) => r.v).map((r) => `${r.k}: ${r.v}`),
    "",
    "SOURCE",
    ...metaRows.filter((r) => r.v).map((r) => `${r.k}: ${r.v}`),
  ].join("\n");

  return { subject, html, text };
}

/* ─── handler ──────────────────────────────────────────────────────────── */
/** Plain-text summary of what they sent, used in the confirmation email and the WhatsApp ping. */
function summaryLines(p: Persona, answers: Answers, c: ContactInfo): string[] {
  return [
    `Enquiry: ${p.label}`,
    ...p.fields.map((f) => [f.label, displayValue(f, answers[f.id])] as const).filter(([, v]) => v).map(([k, v]) => `${k}: ${v}`),
    `${p.message.label}: ${oneLine(c.message).slice(0, 600)}`,
  ];
}

function buildConfirmation(p: Persona, answers: Answers, c: ContactInfo) {
  const first = oneLine(c.name).split(" ")[0] || "there";
  const lines = summaryLines(p, answers, c);
  const wa = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(`Hi Levo, it's ${oneLine(c.name)}. I just sent the ${p.tag.toLowerCase()} form on your site.`)}`;
  const subject = `Got it, ${first}. Here's what you sent.`;
  const rows = lines.map((l) => {
    const i = l.indexOf(": ");
    return `<tr><td style="padding:8px 0;border-bottom:1px solid #ece6da;font:600 12px/1.4 ui-monospace,Menlo,monospace;color:#8a857b;vertical-align:top;width:34%;">${esc(l.slice(0, i))}</td><td style="padding:8px 0 8px 12px;border-bottom:1px solid #ece6da;font:14.5px/1.5 -apple-system,Segoe UI,Roboto,sans-serif;color:#1a1814;">${esc(l.slice(i + 2))}</td></tr>`;
  }).join("");
  const html = `<!doctype html><html><body style="margin:0;background:#f3eee4;">
<div style="max-width:600px;margin:0 auto;padding:28px 16px;font-family:-apple-system,Segoe UI,Roboto,sans-serif;">
  <div style="background:#111316;border-radius:20px;padding:26px 24px;">
    <p style="margin:0;font:600 12px/1 ui-monospace,Menlo,monospace;color:#ff8a1f;letter-spacing:.08em;text-transform:uppercase;">Levis Kibirie</p>
    <h1 style="margin:12px 0 8px;font:800 26px/1.15 -apple-system,Segoe UI,Roboto,sans-serif;color:#f3eee4;">Got it, ${esc(first)}.</h1>
    <p style="margin:0;font:15px/1.6 -apple-system,Segoe UI,Roboto,sans-serif;color:#d9d3c7;">Your message is on my desk. You'll hear from me within a day, usually sooner. If it can't wait, WhatsApp me and mention this form.</p>
    <div style="margin-top:18px;">
      <a href="${esc(wa)}" style="display:inline-block;margin:0 8px 8px 0;padding:12px 18px;border-radius:999px;background:#25d366;color:#06200f;font:700 14px/1 -apple-system,Segoe UI,Roboto,sans-serif;text-decoration:none;">WhatsApp me</a>
      <a href="https://${SITE_HOST}/work" style="display:inline-block;margin:0 8px 8px 0;padding:12px 18px;border-radius:999px;background:#d4ff3a;color:#111400;font:700 14px/1 -apple-system,Segoe UI,Roboto,sans-serif;text-decoration:none;">See the work</a>
    </div>
  </div>
  <div style="background:#fff;border-radius:16px;padding:18px 20px;margin-top:14px;">
    <p style="margin:0 0 6px;font:600 12px/1 ui-monospace,Menlo,monospace;color:#8a857b;text-transform:uppercase;letter-spacing:.08em;">What you sent</p>
    <table role="presentation" style="width:100%;border-collapse:collapse;">${rows}</table>
  </div>
  <p style="margin:18px 0 0;font:12px/1.5 ui-monospace,Menlo,monospace;color:#8a857b;">You're getting this because you used the form on ${SITE_HOST}. Just reply to this email to add anything.</p>
</div></body></html>`;
  const text = [`Got it, ${first}.`, "", "You'll hear from me within a day, usually sooner.", `WhatsApp: ${wa}`, "", "WHAT YOU SENT", ...lines, "", `Levis Kibirie, ${SITE_HOST}`].join("\n");
  return { subject, html, text };
}

async function sendEmail(apiKey: string, payload: Record<string, unknown>): Promise<{ ok: boolean; detail?: string }> {
  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${apiKey}` },
      body: JSON.stringify(payload),
    });
    if (res.ok) return { ok: true };
    return { ok: false, detail: `${res.status} ${(await res.text().catch(() => "")).slice(0, 300)}` };
  } catch (e) {
    return { ok: false, detail: String(e) };
  }
}

/**
 * Optional instant WhatsApp ping to Levo via Twilio. Runs only when TWILIO_ACCOUNT_SID,
 * TWILIO_AUTH_TOKEN, TWILIO_WHATSAPP_FROM and LEAD_WHATSAPP_TO are all set. Never blocks the lead.
 */
async function pingWhatsApp(p: Persona, answers: Answers, c: ContactInfo): Promise<boolean> {
  const sid = process.env.TWILIO_ACCOUNT_SID, token = process.env.TWILIO_AUTH_TOKEN;
  const from = process.env.TWILIO_WHATSAPP_FROM, to = process.env.LEAD_WHATSAPP_TO;
  if (!sid || !token || !from || !to) return false;
  const body = [`New lead · ${p.tag}`, `${oneLine(c.name)} <${c.email}>${c.phone ? ` ${c.phoneCode !== "other" ? c.phoneCode : ""} ${c.phone}` : ""}`, ...summaryLines(p, answers, c).slice(1)].join("\n").slice(0, 1500);
  const wa = (n: string) => (n.startsWith("whatsapp:") ? n : `whatsapp:${n}`);
  try {
    const res = await fetch(`https://api.twilio.com/2010-04-01/Accounts/${sid}/Messages.json`, {
      method: "POST",
      headers: { Authorization: `Basic ${Buffer.from(`${sid}:${token}`).toString("base64")}`, "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({ From: wa(from), To: wa(to), Body: body }).toString(),
    });
    if (!res.ok) console.error("[contact] WhatsApp ping failed", res.status);
    return res.ok;
  } catch (e) {
    console.error("[contact] WhatsApp ping error", e);
    return false;
  }
}

export async function POST(req: NextRequest) {
  const ip = clientIp(req);
  if (rateLimited(ip)) {
    return json({ ok: false, error: "Too many messages. Try again in a few minutes." }, 429);
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return json({ ok: false, error: "Send JSON." }, 400);
  }

  const { persona, answers, contact, meta, hp } = coerce(body);

  // Bots: honeypot filled, or the whole form "completed" in under 3 seconds. Pretend it worked.
  if (hp.trim() || (typeof meta.elapsedMs === "number" && meta.elapsedMs < 3000)) {
    return json({ ok: true });
  }

  if (!persona) return json({ ok: false, error: "Pick who you are.", step: 1, errors: { persona: "Pick one to continue." } }, 400);

  const detailErrors = checkDetails(persona, answers);
  if (Object.keys(detailErrors).length) {
    return json({ ok: false, error: "Some details need a fix.", step: 2, errors: detailErrors }, 400);
  }
  const contactErrors = checkContact(contact);
  if (Object.keys(contactErrors).length) {
    return json({ ok: false, error: "Some contact details need a fix.", step: 3, errors: contactErrors }, 400);
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error("[contact] RESEND_API_KEY is not set; lead not sent.", { persona: persona.id, email: contact.email });
    return json({ ok: false, error: "The inbox isn't wired up yet." }, 503);
  }

  const { subject, html, text } = buildEmail(persona, answers, contact, meta, ip);

  const lead = await sendEmail(apiKey, {
    from: FROM, to: [TO], reply_to: contact.email, subject, html, text,
    tags: [{ name: "persona", value: persona.id }],
  });
  if (!lead.ok) {
    console.error("[contact] Resend rejected the lead email", lead.detail);
    return json({ ok: false, error: "That didn't go through." }, 502);
  }

  // Lead is safe in the inbox. Now the extras, in parallel, best effort: a confirmation copy to the
  // sender and an instant WhatsApp ping to Levo. Neither can fail the request.
  const conf = buildConfirmation(persona, answers, contact);
  const [confirmation, whatsapp] = await Promise.all([
    sendEmail(apiKey, { from: FROM, to: [contact.email], reply_to: TO, subject: conf.subject, html: conf.html, text: conf.text, tags: [{ name: "type", value: "lead-confirmation" }] }),
    pingWhatsApp(persona, answers, contact),
  ]);
  if (!confirmation.ok) console.warn("[contact] Confirmation email not sent", confirmation.detail);
  return json({ ok: true, success: true, confirmation: confirmation.ok, whatsapp });
}
