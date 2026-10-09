"use client";

import { useCallback, useEffect, useId, useRef, useState } from "react";
import type { ChangeEvent, FormEvent, MouseEvent } from "react";
import { SITE, waLink } from "@/data/facts";
import {
  PERSONAS,
  PERSONA_BY_ID,
  CHANNELS,
  HEARD,
  DIAL_CODES,
  LIMITS,
  checkDetails,
  checkContact,
  displayValue,
  optionLabel,
} from "./leadConfig";
import type { Answers, ContactInfo, Field, LeadPayload, PersonaId } from "./leadConfig";
import "./LeadForm.css";

type Status = "idle" | "sending" | "done" | "error";
type Errors = Record<string, string>;

const STEPS = ["Who", "Details", "You", "Send"] as const;
const DRAFT_KEY = "levo-lead-draft-v1";

const EMPTY_CONTACT: ContactInfo = {
  name: "",
  email: "",
  phoneCode: "+254",
  phone: "",
  company: "",
  channel: "email",
  heard: "",
  message: "",
  consent: false,
};

type Draft = { v: 1; step: number; persona: PersonaId | ""; answers: Answers; contact: ContactInfo };

function readDraft(): Draft | null {
  try {
    const raw = window.localStorage.getItem(DRAFT_KEY);
    if (!raw) return null;
    const d = JSON.parse(raw) as Draft;
    return d && d.v === 1 ? d : null;
  } catch {
    return null;
  }
}
function writeDraft(d: Draft) {
  try {
    window.localStorage.setItem(DRAFT_KEY, JSON.stringify(d));
  } catch {
    /* private mode or blocked storage: the form still works */
  }
}
function clearDraft() {
  try {
    window.localStorage.removeItem(DRAFT_KEY);
  } catch {
    /* ignore */
  }
}

export type LeadFormProps = {
  /** Tighter persona grid for embedding in a page section. */
  compact?: boolean;
  /** Where the form lives, sent with the lead (e.g. "home", "contact"). */
  source?: string;
  /** Heading level for the step titles. Use "h2" under a page h1, "h3" under a section h2. Default "h3". */
  titleAs?: "h2" | "h3";
};

/**
 * Branching lead form: Who are you? → details for that persona → contact → review.
 * Plain React, no form libraries. Autosaves a draft to localStorage.
 */
export default function LeadForm({ compact = false, source = "site", titleAs = "h3" }: LeadFormProps) {
  const H = titleAs;
  const uid = useId().replace(/:/g, "");
  const fid = (k: string) => `lf${uid}-${k}`;

  const [step, setStep] = useState(1);
  const [persona, setPersona] = useState<PersonaId | "">("");
  const [answers, setAnswers] = useState<Answers>({});
  const [contact, setContact] = useState<ContactInfo>(EMPTY_CONTACT);
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<Status>("idle");
  const [failMsg, setFailMsg] = useState("");
  const [restored, setRestored] = useState(false);
  const [hp, setHp] = useState("");

  const hydrated = useRef(false);
  const startedAt = useRef(0);
  const utm = useRef<Record<string, string>>({});
  const stepRef = useRef<HTMLDivElement>(null);
  const doneRef = useRef<HTMLDivElement>(null);
  const moved = useRef(false);

  const p = persona ? PERSONA_BY_ID[persona] : null;

  /* ── mount: restore draft, read ?as= preselect and UTM tags ── */
  useEffect(() => {
    startedAt.current = Date.now();
    const params = new URLSearchParams(window.location.search);
    for (const k of ["utm_source", "utm_medium", "utm_campaign", "utm_content", "ref"]) {
      const v = params.get(k);
      if (v) utm.current[k] = v.slice(0, 120);
    }
    const asParam = (params.get("as") || params.get("persona") || "") as PersonaId;
    const pre = asParam && PERSONA_BY_ID[asParam] ? asParam : "";
    const d = readDraft();
    if (d && (d.persona || d.contact?.name || d.contact?.message)) {
      setPersona(pre || d.persona);
      setAnswers(d.answers || {});
      setContact({ ...EMPTY_CONTACT, ...d.contact, consent: false });
      setStep(Math.min(Math.max(1, d.step || 1), 3));
      setRestored(true);
    } else if (pre) {
      setPersona(pre);
      setStep(2);
    }
    hydrated.current = true;
  }, []);

  /* ── autosave (debounced) ── */
  useEffect(() => {
    if (!hydrated.current || status === "done") return;
    const t = window.setTimeout(() => writeDraft({ v: 1, step, persona, answers, contact }), 350);
    return () => window.clearTimeout(t);
  }, [step, persona, answers, contact, status]);

  /* ── move focus to the new step for keyboard and screen reader users ── */
  useEffect(() => {
    if (!moved.current) return;
    const el = stepRef.current;
    if (!el) return;
    el.focus({ preventScroll: true });
    const top = el.getBoundingClientRect().top;
    if (top < 90 || top > window.innerHeight * 0.6) {
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      window.scrollTo({ top: window.scrollY + top - 110, behavior: reduce ? "auto" : "smooth" });
    }
  }, [step]);

  useEffect(() => {
    if (status === "done") doneRef.current?.focus();
  }, [status]);

  const go = useCallback((n: number) => {
    moved.current = true;
    setErrors({});
    setStep(n);
  }, []);

  const focusFirstError = (errs: Errors, order: string[]) => {
    const first = order.find((k) => errs[k]);
    if (!first) return;
    window.setTimeout(() => document.getElementById(fid(first))?.focus(), 0);
  };

  const validate = (s: number): boolean => {
    let errs: Errors = {};
    let order: string[] = [];
    if (s === 1) {
      if (!p) errs = { persona: "Pick one to continue." };
      order = ["persona"];
    } else if (s === 2 && p) {
      errs = checkDetails(p, answers);
      order = p.fields.map((f) => f.id);
    } else if (s === 3) {
      errs = checkContact(contact);
      order = ["name", "email", "phone", "company", "channel", "heard", "message", "consent"];
    }
    setErrors(errs);
    if (Object.keys(errs).length) {
      focusFirstError(errs, order);
      return false;
    }
    return true;
  };

  const next = () => {
    if (validate(step)) go(Math.min(4, step + 1));
  };

  /* ── field updaters ── */
  const setAnswer = (id: string, v: string | string[]) => {
    setAnswers((a) => ({ ...a, [id]: v }));
    if (errors[id]) setErrors((e) => ({ ...e, [id]: "" }));
  };
  const toggleMulti = (id: string, v: string) => {
    const cur = Array.isArray(answers[id]) ? (answers[id] as string[]) : [];
    setAnswer(id, cur.includes(v) ? cur.filter((x) => x !== v) : [...cur, v]);
  };
  const setC = <K extends keyof ContactInfo>(k: K, v: ContactInfo[K]) => {
    setContact((c) => ({ ...c, [k]: v }));
    if (errors[k]) setErrors((e) => ({ ...e, [k]: "" }));
  };

  const pickPersona = (id: PersonaId) => {
    setPersona(id);
    if (errors.persona) setErrors({});
  };
  /** Pointer clicks on a card advance straight to step 2. Arrow keys and Space only move the selection (their click.detail is 0). */
  const onPersonaClick = (e: MouseEvent<HTMLLabelElement>, id: PersonaId) => {
    if (e.detail > 0) {
      setPersona(id);
      window.setTimeout(() => go(2), 140);
    }
  };

  const startOver = () => {
    clearDraft();
    setPersona("");
    setAnswers({});
    setContact(EMPTY_CONTACT);
    setRestored(false);
    setStatus("idle");
    setFailMsg("");
    startedAt.current = Date.now();
    go(1);
  };

  /* ── submit ── */
  const send = async () => {
    if (!p) return go(1);
    const d = checkDetails(p, answers);
    if (Object.keys(d).length) {
      go(2);
      setErrors(d);
      return;
    }
    const c = checkContact(contact);
    if (Object.keys(c).length) {
      go(3);
      setErrors(c);
      return;
    }
    const picked: Answers = {};
    for (const f of p.fields) if (answers[f.id] !== undefined) picked[f.id] = answers[f.id];
    const payload: LeadPayload = {
      persona: p.id,
      answers: picked,
      contact: { ...contact, name: contact.name.trim(), email: contact.email.trim(), message: contact.message.trim() },
      meta: {
        page: `${window.location.pathname}${source ? ` (${source})` : ""}`,
        referrer: document.referrer.slice(0, 300),
        utm: utm.current,
        elapsedMs: Date.now() - startedAt.current,
      },
      hp,
    };
    setStatus("sending");
    setFailMsg("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = (await res.json().catch(() => ({}))) as { ok?: boolean; error?: string; errors?: Errors; step?: number };
      if (res.ok && data.ok !== false) {
        clearDraft();
        setStatus("done");
        return;
      }
      if (res.status === 400 && data.errors && data.step) {
        setStatus("idle");
        go(data.step);
        setErrors(data.errors);
        return;
      }
      setFailMsg(
        res.status === 429
          ? "Easy. That's a lot of messages in a short time. Give it a few minutes or reach me directly."
          : data.error || "That didn't go through.",
      );
      setStatus("error");
    } catch {
      setFailMsg("No connection. Your answers are saved on this device.");
      setStatus("error");
    }
  };

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (status === "sending") return;
    if (step < 4) next();
    else void send();
  };

  /* ── success ── */
  if (status === "done" && p) {
    const first = contact.name.trim().split(/\s+/)[0] || "there";
    const org = p.orgField ? String(answers[p.orgField] ?? "").trim() : contact.company.trim();
    const wa = waLink(`Hi Levo, I just sent the ${p.tag.toLowerCase()} form on your site. ${contact.name.trim()}${org ? `, ${org}` : ""}.`);
    return (
      <div className={`lf lf--done${compact ? " lf--compact" : ""}`}>
        <div className="lf-done" ref={doneRef} tabIndex={-1} role="status" aria-live="polite">
          <span className="lf-done__check" aria-hidden>✓</span>
          <p className="lf-done__title">Got it, {first}.</p>
          <p className="lf-done__body">You&apos;ll hear from me within a day. Usually sooner.</p>
          <p className="lf-done__meta">
            Reply goes to <strong>{contact.email.trim()}</strong>
            {contact.channel !== "email" && contact.phone ? `, or ${optionLabel(CHANNELS, contact.channel)} on ${contact.phoneCode === "other" ? "" : contact.phoneCode + " "}${contact.phone.trim()}` : ""}.
          </p>
          <div className="lf-done__actions">
            <a className="cbtn cbtn--primary cbtn--lg" href={wa} target="_blank" rel="noreferrer">
              <span className="cbtn__label">Skip the queue on WhatsApp</span>
              <span className="cbtn__icon" aria-hidden>↗</span>
            </a>
            <button type="button" className="cbtn cbtn--ghost cbtn--lg lf-b" onClick={startOver}>
              <span className="cbtn__label">Send another</span>
              <span className="cbtn__icon" aria-hidden>↺</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  const errCount = Object.values(errors).filter(Boolean).length;
  const descBy = (k: string, hint?: string) =>
    [hint ? fid(`${k}-hint`) : "", errors[k] ? fid(`${k}-err`) : ""].filter(Boolean).join(" ") || undefined;
  const err = (k: string) =>
    errors[k] ? (
      <p className="lf-err" id={fid(`${k}-err`)}>
        {errors[k]}
      </p>
    ) : null;

  /* ── field renderer for step 2 ── */
  const renderField = (f: Field) => {
    const val = answers[f.id];
    if (f.kind === "choice" || f.kind === "multi") {
      const multi = f.kind === "multi";
      const sel = multi ? (Array.isArray(val) ? val : []) : typeof val === "string" ? val : "";
      return (
        <fieldset key={f.id} className="lf-field lf-field--full" aria-describedby={descBy(f.id, f.hint)} aria-invalid={errors[f.id] ? true : undefined}>
          <legend className="lf-label">
            {f.label}
            {!f.required && <span className="lf-opt"> optional</span>}
          </legend>
          {f.hint && <p className="lf-hint" id={fid(`${f.id}-hint`)}>{f.hint}</p>}
          <div className={`lf-chips${multi ? " lf-chips--multi" : ""}`}>
            {f.options!.map((o, i) => {
              const on = multi ? (sel as string[]).includes(o.value) : sel === o.value;
              return (
                <label key={o.value} className="lf-chip">
                  <input
                    id={i === 0 ? fid(f.id) : undefined}
                    type={multi ? "checkbox" : "radio"}
                    name={fid(f.id)}
                    value={o.value}
                    checked={on}
                    onChange={() => (multi ? toggleMulti(f.id, o.value) : setAnswer(f.id, o.value))}
                  />
                  <span className="lf-chip__face">
                    <span className="lf-chip__tick" aria-hidden />
                    <span>
                      {o.label}
                      {o.hint && <small>{o.hint}</small>}
                    </span>
                  </span>
                </label>
              );
            })}
          </div>
          {err(f.id)}
        </fieldset>
      );
    }
    const type = f.kind === "url" ? "url" : f.kind === "date" ? "date" : "text";
    return (
      <div key={f.id} className={`lf-field${f.half ? "" : " lf-field--full"}`}>
        <label className="lf-label" htmlFor={fid(f.id)}>
          {f.label}
          {!f.required && <span className="lf-opt"> optional</span>}
        </label>
        <input
          id={fid(f.id)}
          className="lf-input"
          type={type}
          inputMode={f.kind === "url" ? "url" : undefined}
          value={typeof val === "string" ? val : ""}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setAnswer(f.id, e.target.value)}
          placeholder={f.placeholder}
          autoComplete={f.autoComplete ?? "off"}
          maxLength={f.kind === "url" ? LIMITS.url : LIMITS.text}
          required={f.required}
          aria-invalid={errors[f.id] ? true : undefined}
          aria-describedby={descBy(f.id, f.hint)}
        />
        {f.hint && <p className="lf-hint" id={fid(`${f.id}-hint`)}>{f.hint}</p>}
        {err(f.id)}
      </div>
    );
  };

  /* ── review rows ── */
  const detailRows = p
    ? p.fields.map((f) => ({ k: f.label, v: displayValue(f, answers[f.id]) })).filter((r) => r.v)
    : [];
  const phoneShown = contact.phone.trim() ? `${contact.phoneCode === "other" ? "" : contact.phoneCode + " "}${contact.phone.trim()}` : "";
  const contactRows = [
    { k: "Name", v: contact.name.trim() },
    { k: "Email", v: contact.email.trim() },
    { k: "Phone", v: phoneShown },
    { k: "Company", v: p?.orgField ? "" : contact.company.trim() },
    { k: "Reach me by", v: optionLabel(CHANNELS, contact.channel) },
    { k: "Found you via", v: contact.heard ? optionLabel(HEARD, contact.heard) : "" },
  ].filter((r) => r.v);

  return (
    <form className={`lf${compact ? " lf--compact" : ""}`} onSubmit={onSubmit} noValidate aria-label="Contact Levo">
      {/* progress */}
      <ol className="lf-progress" aria-label="Progress">
        {STEPS.map((s, i) => {
          const n = i + 1;
          const state = n < step ? "done" : n === step ? "now" : "todo";
          return (
            <li key={s} className={`lf-progress__item is-${state}`} aria-current={n === step ? "step" : undefined}>
              {state === "done" ? (
                <button type="button" className="lf-progress__btn lf-b" onClick={() => go(n)} aria-label={`Step ${n}, ${s}, done. Go back to it.`}>
                  <span className="lf-progress__dot" aria-hidden>✓</span>
                  <span className="lf-progress__name">{s}</span>
                </button>
              ) : (
                <span className="lf-progress__btn">
                  <span className="lf-progress__dot" aria-hidden>{n}</span>
                  <span className="lf-progress__name">
                    <span className="sr-only">Step {n} of 4, </span>
                    {s}
                  </span>
                </span>
              )}
            </li>
          );
        })}
      </ol>

      {restored && step < 4 && (
        <div className="lf-restored">
          <span>Picked up where you left off.</span>
          <button type="button" className="lf-link lf-b" onClick={startOver}>Start over</button>
        </div>
      )}

      {errCount > 0 && (
        <p className="lf-alert" role="alert">
          {errCount === 1 ? "One thing to fix before you move on." : `${errCount} things to fix before you move on.`}
        </p>
      )}

      <div className="lf-step" ref={stepRef} tabIndex={-1} key={step}>
        {/* STEP 1: persona */}
        {step === 1 && (
          <fieldset className="lf-set" aria-describedby={errors.persona ? fid("persona-err") : undefined}>
            <legend className="lf-title">Who are you?</legend>
            <p className="lf-sub">Pick the closest. The questions adapt.</p>
            <div className="lf-personas">
              {PERSONAS.map((x, i) => (
                <label key={x.id} className="lf-persona" style={{ ["--pa" as string]: x.accent }} onClick={(e) => onPersonaClick(e, x.id)}>
                  <input
                    id={i === 0 ? fid("persona") : undefined}
                    type="radio"
                    name={fid("persona")}
                    value={x.id}
                    checked={persona === x.id}
                    onChange={() => pickPersona(x.id)}
                  />
                  <span className="lf-persona__face">
                    <span className="lf-persona__glyph" aria-hidden>{x.glyph}</span>
                    <span className="lf-persona__text">
                      <span className="lf-persona__label">{x.label}</span>
                      <span className="lf-persona__line">{x.line}</span>
                    </span>
                    <span className="lf-persona__check" aria-hidden>✓</span>
                  </span>
                </label>
              ))}
            </div>
            {err("persona")}
          </fieldset>
        )}

        {/* STEP 2: branching details */}
        {step === 2 && p && (
          <div className="lf-set" style={{ ["--pa" as string]: p.accent }}>
            <p className="lf-kicker">
              <span className="lf-kicker__glyph" aria-hidden>{p.glyph}</span> {p.label}
            </p>
            <H className="lf-title lf-title--h">{p.ask}</H>
            <p className="lf-sub">Fields marked optional can stay blank.</p>
            <div className="lf-grid">{p.fields.map(renderField)}</div>
          </div>
        )}

        {/* STEP 3: contact */}
        {step === 3 && p && (
          <div className="lf-set" style={{ ["--pa" as string]: p.accent }}>
            <H className="lf-title lf-title--h">Where do I reply?</H>
            <p className="lf-sub">Nothing here goes to a mailing list.</p>
            <div className="lf-grid">
              <div className="lf-field">
                <label className="lf-label" htmlFor={fid("name")}>Name</label>
                <input id={fid("name")} className="lf-input" value={contact.name} onChange={(e) => setC("name", e.target.value)} autoComplete="name" maxLength={LIMITS.name} required aria-invalid={errors.name ? true : undefined} aria-describedby={descBy("name")} />
                {err("name")}
              </div>
              <div className="lf-field">
                <label className="lf-label" htmlFor={fid("email")}>Email</label>
                <input id={fid("email")} className="lf-input" type="email" inputMode="email" value={contact.email} onChange={(e) => setC("email", e.target.value)} onBlur={() => contact.email && setErrors((er) => ({ ...er, email: checkContact({ ...contact, consent: true }).email || "" }))} autoComplete="email" maxLength={LIMITS.email} required aria-invalid={errors.email ? true : undefined} aria-describedby={descBy("email")} />
                {err("email")}
              </div>
              <div className="lf-field">
                <label className="lf-label" htmlFor={fid("phone")}>
                  Phone or WhatsApp{contact.channel === "email" && <span className="lf-opt"> optional</span>}
                </label>
                <div className="lf-phone">
                  <select className="lf-input lf-select lf-phone__code" aria-label="Country code" value={contact.phoneCode} onChange={(e) => setC("phoneCode", e.target.value)}>
                    {DIAL_CODES.map((d) => (
                      <option key={d.value} value={d.value}>{d.label}</option>
                    ))}
                  </select>
                  <input id={fid("phone")} className="lf-input" type="tel" inputMode="tel" value={contact.phone} onChange={(e) => setC("phone", e.target.value)} autoComplete="tel-national" placeholder={contact.phoneCode === "other" ? "+00 000 000 000" : "712 345 678"} maxLength={22} aria-invalid={errors.phone ? true : undefined} aria-describedby={descBy("phone")} />
                </div>
                {err("phone")}
              </div>
              {!p.orgField && (
                <div className="lf-field">
                  <label className="lf-label" htmlFor={fid("company")}>Company<span className="lf-opt"> optional</span></label>
                  <input id={fid("company")} className="lf-input" value={contact.company} onChange={(e) => setC("company", e.target.value)} autoComplete="organization" maxLength={LIMITS.text} aria-invalid={errors.company ? true : undefined} aria-describedby={descBy("company")} />
                  {err("company")}
                </div>
              )}
              <fieldset className="lf-field" aria-describedby={descBy("channel")}>
                <legend className="lf-label">Best way to reach you</legend>
                <div className="lf-chips">
                  {CHANNELS.map((o, i) => (
                    <label key={o.value} className="lf-chip">
                      <input id={i === 0 ? fid("channel") : undefined} type="radio" name={fid("channel")} value={o.value} checked={contact.channel === o.value} onChange={() => setC("channel", o.value)} />
                      <span className="lf-chip__face"><span className="lf-chip__tick" aria-hidden /><span>{o.label}</span></span>
                    </label>
                  ))}
                </div>
                {err("channel")}
              </fieldset>
              <div className="lf-field">
                <label className="lf-label" htmlFor={fid("heard")}>How did you find me?<span className="lf-opt"> optional</span></label>
                <select id={fid("heard")} className="lf-input lf-select" value={contact.heard} onChange={(e) => setC("heard", e.target.value)} aria-describedby={descBy("heard")}>
                  {HEARD.map((o) => (
                    <option key={o.value} value={o.value}>{o.label}</option>
                  ))}
                </select>
                {err("heard")}
              </div>
              <div className="lf-field lf-field--full">
                <label className="lf-label" htmlFor={fid("message")}>{p.message.label}</label>
                <textarea id={fid("message")} className="lf-input lf-textarea" value={contact.message} onChange={(e) => setC("message", e.target.value)} placeholder={p.message.placeholder} rows={compact ? 4 : 5} maxLength={LIMITS.message} required aria-invalid={errors.message ? true : undefined} aria-describedby={descBy("message", "count")} />
                <p className="lf-hint lf-count" id={fid("message-hint")}>
                  {contact.message.trim().length < LIMITS.messageMin ? `At least ${LIMITS.messageMin} characters.` : `${contact.message.length} of ${LIMITS.message}`}
                </p>
                {err("message")}
              </div>
              <div className="lf-field lf-field--full">
                <label className="lf-consent">
                  <input id={fid("consent")} type="checkbox" checked={contact.consent} onChange={(e) => setC("consent", e.target.checked)} aria-invalid={errors.consent ? true : undefined} aria-describedby={descBy("consent")} />
                  <span className="lf-consent__box" aria-hidden>✓</span>
                  <span>Use these details to reply to me about this. Nothing else, no newsletters.</span>
                </label>
                {err("consent")}
              </div>
              {/* honeypot: hidden from people and assistive tech, bots fill it */}
              <div className="lf-hp" aria-hidden="true">
                <label htmlFor={fid("hp")}>Leave this empty</label>
                <input id={fid("hp")} name="website_url" tabIndex={-1} autoComplete="off" value={hp} onChange={(e) => setHp(e.target.value)} />
              </div>
            </div>
          </div>
        )}

        {/* STEP 4: review */}
        {step === 4 && p && (
          <div className="lf-set" style={{ ["--pa" as string]: p.accent }}>
            <H className="lf-title lf-title--h">Look right?</H>
            <p className="lf-sub">One last check. Edit anything, then send.</p>
            <div className="lf-review">
              <section className="lf-review__block" aria-label="You are">
                <div className="lf-review__head">
                  <span>You are</span>
                  <button type="button" className="lf-link lf-b" onClick={() => go(1)} aria-label="Edit who you are">Edit</button>
                </div>
                <p className="lf-review__persona"><span aria-hidden>{p.glyph}</span> {p.label}</p>
              </section>
              <section className="lf-review__block" aria-label="Details">
                <div className="lf-review__head">
                  <span>Details</span>
                  <button type="button" className="lf-link lf-b" onClick={() => go(2)} aria-label="Edit details">Edit</button>
                </div>
                <dl className="lf-dl">
                  {detailRows.map((r) => (
                    <div key={r.k}><dt>{r.k}</dt><dd>{r.v}</dd></div>
                  ))}
                </dl>
              </section>
              <section className="lf-review__block" aria-label="Contact">
                <div className="lf-review__head">
                  <span>You</span>
                  <button type="button" className="lf-link lf-b" onClick={() => go(3)} aria-label="Edit contact details">Edit</button>
                </div>
                <dl className="lf-dl">
                  {contactRows.map((r) => (
                    <div key={r.k}><dt>{r.k}</dt><dd>{r.v}</dd></div>
                  ))}
                </dl>
                <p className="lf-review__msg"><span>{p.message.label}</span>{contact.message.trim()}</p>
              </section>
            </div>
            {status === "error" && (
              <div className="lf-fail" role="alert">
                <p><strong>{failMsg}</strong> Your answers are still here. Try again, or reach me directly.</p>
                <div className="lf-fail__links">
                  <a href={`mailto:${SITE.email}`}>{SITE.email}</a>
                  <a href={waLink("Hi Levo, your contact form failed for me, so here I am.")} target="_blank" rel="noreferrer">WhatsApp</a>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* nav */}
      <div className="lf-nav">
        {step > 1 ? (
          <button type="button" className="cbtn cbtn--ghost lf-b lf-nav__back" onClick={() => go(step - 1)}>
            <span className="cbtn__icon" aria-hidden>←</span>
            <span className="cbtn__label">Back</span>
          </button>
        ) : (
          <span className="lf-nav__note">About two minutes. Replies within a day.</span>
        )}
        <button type="submit" className={`cbtn ${step === 4 ? "cbtn--signal" : "cbtn--primary"} cbtn--lg lf-b lf-nav__next`} disabled={status === "sending"} aria-busy={status === "sending" || undefined}>
          <span className="cbtn__label">{step < 4 ? "Next" : status === "sending" ? "Sending" : status === "error" ? "Try again" : "Send it"}</span>
          <span className="cbtn__icon" aria-hidden>{status === "sending" ? "…" : "→"}</span>
        </button>
      </div>
    </form>
  );
}
