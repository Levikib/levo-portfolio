/**
 * Lead form config: personas, branching fields and validation.
 * Shared by the client form (src/components/contact/LeadForm.tsx) and the
 * API route (src/app/api/contact/route.ts), so the questions, the labels in
 * the email and the server-side checks can never drift apart.
 *
 * Copy rules: no em or en dashes, no banned buzzwords (see HANDOFF.md).
 */

export type Option = { value: string; label: string; hint?: string };

export type FieldKind = "choice" | "multi" | "text" | "url" | "date";

export type Field = {
  id: string;
  label: string;
  kind: FieldKind;
  required?: boolean;
  options?: Option[];
  placeholder?: string;
  hint?: string;
  /** Renders at half width on wide screens (text-like fields only). */
  half?: boolean;
  autoComplete?: string;
};

export type PersonaId = "build" | "role" | "partner" | "invest" | "makeja" | "press" | "other";

export type Persona = {
  id: PersonaId;
  /** Card title. */
  label: string;
  /** Short tag used in the email subject, e.g. "[Lead · Investor]". */
  tag: string;
  /** One line under the card title. */
  line: string;
  glyph: string;
  accent: string;
  /** Step 2 heading. */
  ask: string;
  fields: Field[];
  /** Field id that holds the organisation name, used in the subject line. When absent, step 3 asks for a company. */
  orgField?: string;
  message: { label: string; placeholder: string };
};

/* ─── Shared option sets ─────────────────────────────────────────────────── */

/** Rough rate for the KES hints only. 1 USD ≈ 129 KES. */
export const KES_RATE = 129;

const BUDGETS: Option[] = [
  { value: "under-2k", label: "Under $2K", hint: "under KES 260K" },
  { value: "2k-5k", label: "$2K to $5K", hint: "KES 260K to 650K" },
  { value: "5k-15k", label: "$5K to $15K", hint: "KES 650K to 1.9M" },
  { value: "15k-40k", label: "$15K to $40K", hint: "KES 1.9M to 5.2M" },
  { value: "40k-plus", label: "$40K+", hint: "KES 5.2M+" },
  { value: "not-sure", label: "Not sure yet", hint: "help me scope it" },
];

const TIMELINES: Option[] = [
  { value: "asap", label: "ASAP", hint: "under a month" },
  { value: "1-3m", label: "1 to 3 months" },
  { value: "3-6m", label: "3 to 6 months" },
  { value: "flexible", label: "Flexible" },
];

/* ─── Personas ───────────────────────────────────────────────────────────── */

export const PERSONAS: Persona[] = [
  {
    id: "build",
    label: "Hire me for a build",
    tag: "Build",
    line: "A site, an app, a product. Scoped, built, shipped.",
    glyph: "</>",
    accent: "#d4ff3a",
    ask: "What are we building?",
    fields: [
      {
        id: "projectType",
        label: "Project type",
        kind: "multi",
        required: true,
        hint: "Pick all that apply.",
        options: [
          { value: "website", label: "Website" },
          { value: "webapp", label: "Web app or SaaS" },
          { value: "ecommerce", label: "E-commerce" },
          { value: "brand", label: "Brand and design" },
          { value: "ai", label: "AI or automation" },
          { value: "strategy", label: "Strategy or audit" },
        ],
      },
      {
        id: "stage",
        label: "Where it stands",
        kind: "choice",
        required: true,
        options: [
          { value: "idea", label: "Just an idea" },
          { value: "designs", label: "Designs or a brief ready" },
          { value: "improve", label: "Live, needs to be better" },
          { value: "rescue", label: "Stalled build to rescue" },
        ],
      },
      { id: "budget", label: "Budget (USD)", kind: "choice", required: true, options: BUDGETS, hint: `KES at about ${KES_RATE} to the dollar.` },
      { id: "timeline", label: "Timeline", kind: "choice", required: true, options: TIMELINES },
      { id: "links", label: "Existing site, deck or brief", kind: "url", placeholder: "yoursite.com", hint: "Optional. Any link that saves us a call." },
    ],
    message: { label: "What does done look like?", placeholder: "Who it's for, what it has to do, and how you'll know it worked." },
  },
  {
    id: "role",
    label: "Hire me for a role",
    tag: "Role",
    line: "Recruiters and teams. Full-time, contract or fractional.",
    glyph: "cv",
    accent: "#ff8a1f",
    ask: "Tell me about the role.",
    orgField: "company",
    fields: [
      { id: "company", label: "Company", kind: "text", required: true, half: true, autoComplete: "organization" },
      { id: "roleTitle", label: "Role title", kind: "text", required: true, half: true, placeholder: "Senior Fullstack Engineer" },
      {
        id: "employment",
        label: "Employment type",
        kind: "choice",
        required: true,
        options: [
          { value: "full-time", label: "Full-time" },
          { value: "contract", label: "Contract" },
          { value: "fractional", label: "Part-time or fractional" },
          { value: "advisory", label: "Advisory" },
        ],
      },
      {
        id: "workMode",
        label: "Where the work happens",
        kind: "choice",
        required: true,
        options: [
          { value: "remote", label: "Remote" },
          { value: "hybrid", label: "Hybrid" },
          { value: "onsite", label: "On-site" },
        ],
      },
      { id: "location", label: "Location or time zone", kind: "text", half: true, placeholder: "Remote, EU hours" },
      { id: "salary", label: "Salary or rate band", kind: "text", half: true, placeholder: "Optional", hint: "Optional. Saves everyone a round trip." },
      { id: "jobLink", label: "Job post link", kind: "url", placeholder: "jobs.company.com/role" },
    ],
    message: { label: "What's the team solving?", placeholder: "The problem, the stack, and why this role exists now." },
  },
  {
    id: "partner",
    label: "Partner or collaborate",
    tag: "Partner",
    line: "Agencies, founders, builders. Let's make something together.",
    glyph: "&",
    accent: "#8b7cff",
    ask: "What kind of partnership?",
    orgField: "organisation",
    fields: [
      { id: "organisation", label: "Organisation", kind: "text", required: true, half: true, autoComplete: "organization" },
      { id: "orgSite", label: "Website", kind: "url", half: true, placeholder: "yourorg.com" },
      {
        id: "partnerType",
        label: "Shape of it",
        kind: "choice",
        required: true,
        options: [
          { value: "co-build", label: "Co-build a product" },
          { value: "agency", label: "Agency or white-label" },
          { value: "referral", label: "Referral partnership" },
          { value: "integration", label: "Integrate with Makeja Homes" },
          { value: "community", label: "Community or event" },
          { value: "other", label: "Something else" },
        ],
      },
    ],
    message: { label: "The idea", placeholder: "What we'd do together, and what each side brings." },
  },
  {
    id: "invest",
    label: "Invest in Makeja Homes",
    tag: "Investor",
    line: "Angels and funds backing PropTech in East Africa.",
    glyph: "$",
    accent: "#ffb35c",
    ask: "Who's investing?",
    orgField: "fund",
    fields: [
      { id: "fund", label: "Fund or angel name", kind: "text", required: true, half: true, autoComplete: "organization" },
      { id: "fundSite", label: "Website or profile", kind: "url", half: true, placeholder: "fund.vc" },
      {
        id: "investorType",
        label: "You are",
        kind: "choice",
        required: true,
        options: [
          { value: "angel", label: "Angel" },
          { value: "vc", label: "VC fund" },
          { value: "family-office", label: "Family office" },
          { value: "strategic", label: "Corporate or strategic" },
          { value: "syndicate", label: "Syndicate" },
        ],
      },
      {
        id: "cheque",
        label: "Typical cheque",
        kind: "choice",
        required: true,
        options: [
          { value: "under-25k", label: "Under $25K" },
          { value: "25k-100k", label: "$25K to $100K" },
          { value: "100k-500k", label: "$100K to $500K" },
          { value: "500k-plus", label: "$500K+" },
          { value: "undisclosed", label: "Prefer not to say" },
        ],
      },
      {
        id: "stageFocus",
        label: "Stage focus",
        kind: "multi",
        options: [
          { value: "pre-seed", label: "Pre-seed" },
          { value: "seed", label: "Seed" },
          { value: "series-a", label: "Series A" },
          { value: "growth", label: "Growth" },
        ],
      },
      {
        id: "deck",
        label: "The deck",
        kind: "choice",
        required: true,
        options: [
          { value: "send", label: "Send me the deck" },
          { value: "call-first", label: "Call first" },
          { value: "not-yet", label: "Not yet" },
        ],
      },
    ],
    message: { label: "What caught your eye?", placeholder: "Your thesis, what you'd want to see, and any timing on your side." },
  },
  {
    id: "makeja",
    label: "Makeja Homes enquiry",
    tag: "Makeja",
    line: "Property companies, landlords and agents who want the platform.",
    glyph: "⌂",
    accent: "#5fe3b0",
    ask: "Tell me about your portfolio.",
    orgField: "company",
    fields: [
      { id: "company", label: "Company", kind: "text", required: true, half: true, autoComplete: "organization" },
      { id: "location", label: "City or area", kind: "text", half: true, placeholder: "Nairobi, Kilimani" },
      {
        id: "companyType",
        label: "You are a",
        kind: "choice",
        required: true,
        options: [
          { value: "manager", label: "Property manager" },
          { value: "landlord", label: "Landlord" },
          { value: "agent", label: "Letting agent" },
          { value: "developer", label: "Developer" },
          { value: "other", label: "Other" },
        ],
      },
      {
        id: "units",
        label: "Units you manage",
        kind: "choice",
        required: true,
        options: [
          { value: "1-50", label: "1 to 50" },
          { value: "51-200", label: "51 to 200" },
          { value: "201-1000", label: "201 to 1,000" },
          { value: "1000-plus", label: "1,000+" },
        ],
      },
      {
        id: "tools",
        label: "Running it on today",
        kind: "multi",
        options: [
          { value: "spreadsheets", label: "Spreadsheets" },
          { value: "paper", label: "Paper records" },
          { value: "software", label: "Other property software" },
          { value: "accounting", label: "QuickBooks or accounting" },
          { value: "whatsapp", label: "WhatsApp groups" },
          { value: "nothing", label: "Nothing yet" },
        ],
      },
      {
        id: "needs",
        label: "Most needed",
        kind: "multi",
        options: [
          { value: "rent", label: "Rent collection and M-Pesa" },
          { value: "leases", label: "Digital leases" },
          { value: "maintenance", label: "Maintenance requests" },
          { value: "finance", label: "Accounting and eTIMS" },
          { value: "whatsapp-bot", label: "Tenant WhatsApp bot" },
        ],
      },
      {
        id: "next",
        label: "Next step",
        kind: "choice",
        required: true,
        options: [
          { value: "demo", label: "Book a demo" },
          { value: "pricing", label: "Pricing first" },
          { value: "exploring", label: "Just exploring" },
        ],
      },
    ],
    message: { label: "Where does it hurt most?", placeholder: "Late rent, scattered records, slow maintenance. Tell me what eats your week." },
  },
  {
    id: "press",
    label: "Press, speaking or podcast",
    tag: "Press",
    line: "Interviews, panels, podcasts and workshops.",
    glyph: "❝",
    accent: "#ff8fb1",
    ask: "What's the platform?",
    orgField: "outlet",
    fields: [
      { id: "outlet", label: "Outlet, event or show", kind: "text", required: true, half: true, autoComplete: "organization" },
      { id: "outletLink", label: "Link", kind: "url", half: true, placeholder: "show.fm" },
      {
        id: "format",
        label: "Format",
        kind: "choice",
        required: true,
        options: [
          { value: "interview", label: "Article or interview" },
          { value: "podcast", label: "Podcast" },
          { value: "speaking", label: "Talk or panel" },
          { value: "workshop", label: "Workshop" },
          { value: "other", label: "Other" },
        ],
      },
      { id: "topic", label: "Topic", kind: "text", required: true, placeholder: "Building SaaS for African property markets" },
      { id: "date", label: "Date", kind: "date", half: true, hint: "Optional." },
      { id: "audience", label: "Audience or reach", kind: "text", half: true, placeholder: "Optional" },
    ],
    message: { label: "The angle", placeholder: "What you want me to cover, the format and any prep you need." },
  },
  {
    id: "other",
    label: "Something else",
    tag: "Other",
    line: "Doesn't fit a box? Good. Tell me anyway.",
    glyph: "?",
    accent: "#a7a195",
    ask: "What's on your mind?",
    fields: [{ id: "subject", label: "In a few words", kind: "text", required: true, placeholder: "Mentorship, a question, a wild idea" }],
    message: { label: "Tell me more", placeholder: "Context, what you need from me and by when." },
  },
];

export const PERSONA_BY_ID = Object.fromEntries(PERSONAS.map((p) => [p.id, p])) as Record<PersonaId, Persona>;

/* ─── Step 3 options ─────────────────────────────────────────────────────── */

export const CHANNELS: Option[] = [
  { value: "email", label: "Email" },
  { value: "whatsapp", label: "WhatsApp" },
  { value: "call", label: "Call" },
];

export const HEARD: Option[] = [
  { value: "", label: "Choose one (optional)" },
  { value: "linkedin", label: "LinkedIn" },
  { value: "github", label: "GitHub" },
  { value: "search", label: "Google or search" },
  { value: "social", label: "X, Instagram or TikTok" },
  { value: "referral", label: "Someone referred me" },
  { value: "makeja", label: "Makeja Homes" },
  { value: "client-site", label: "A site you built" },
  { value: "event", label: "An event or talk" },
  { value: "other", label: "Somewhere else" },
];

export const DIAL_CODES: Option[] = [
  { value: "+254", label: "KE +254" },
  { value: "+255", label: "TZ +255" },
  { value: "+256", label: "UG +256" },
  { value: "+250", label: "RW +250" },
  { value: "+251", label: "ET +251" },
  { value: "+234", label: "NG +234" },
  { value: "+233", label: "GH +233" },
  { value: "+27", label: "ZA +27" },
  { value: "+971", label: "AE +971" },
  { value: "+44", label: "UK +44" },
  { value: "+1", label: "US/CA +1" },
  { value: "+49", label: "DE +49" },
  { value: "+33", label: "FR +33" },
  { value: "+31", label: "NL +31" },
  { value: "+46", label: "SE +46" },
  { value: "+91", label: "IN +91" },
  { value: "+61", label: "AU +61" },
  { value: "other", label: "Other (type it)" },
];

/* ─── Payload + validation (shared client and server) ───────────────────── */

export type Answers = Record<string, string | string[]>;

export type ContactInfo = {
  name: string;
  email: string;
  phoneCode: string;
  phone: string;
  company: string;
  channel: string;
  heard: string;
  message: string;
  consent: boolean;
};

export type LeadPayload = {
  persona: PersonaId;
  answers: Answers;
  contact: ContactInfo;
  meta?: { page?: string; referrer?: string; utm?: Record<string, string>; elapsedMs?: number };
  /** Honeypot. Humans leave it empty. */
  hp?: string;
};

export const LIMITS = { text: 200, url: 500, message: 4000, messageMin: 15, name: 120, email: 254 };

export const isEmail = (v: string) => v.length <= LIMITS.email && /^[^\s@<>()",;:]+@[^\s@<>()",;:]+\.[a-z]{2,}$/i.test(v);

/** Accepts "site.com" or "https://site.com". Returns the normalised URL or null. */
export function normaliseUrl(v: string): string | null {
  const s = v.trim();
  if (!s) return null;
  try {
    const u = new URL(/^https?:\/\//i.test(s) ? s : `https://${s}`);
    if (!/^https?:$/.test(u.protocol) || !u.hostname.includes(".")) return null;
    return u.toString();
  } catch {
    return null;
  }
}

export const isPhone = (v: string) => /^\+?[0-9 ()]{6,20}$/.test(v.trim()) && v.replace(/\D/g, "").length >= 6;

/** Validates one step-2 field. Returns an error message or "". */
export function checkField(f: Field, raw: string | string[] | undefined): string {
  if (f.kind === "multi") {
    const arr = Array.isArray(raw) ? raw : [];
    if (f.required && arr.length === 0) return `Pick at least one.`;
    if (arr.some((v) => !f.options?.some((o) => o.value === v))) return "Pick from the list.";
    return "";
  }
  const v = typeof raw === "string" ? raw.trim() : "";
  if (!v) return f.required ? (f.kind === "choice" ? "Pick one." : `${f.label} is required.`) : "";
  if (f.kind === "choice") return f.options?.some((o) => o.value === v) ? "" : "Pick from the list.";
  if (f.kind === "url") return v.length > LIMITS.url || !normaliseUrl(v) ? "That link doesn't look right." : "";
  if (f.kind === "date") return /^\d{4}-\d{2}-\d{2}$/.test(v) ? "" : "Use a real date.";
  return v.length > LIMITS.text ? `Keep it under ${LIMITS.text} characters.` : "";
}

export function checkDetails(persona: Persona, answers: Answers): Record<string, string> {
  const errors: Record<string, string> = {};
  for (const f of persona.fields) {
    const e = checkField(f, answers[f.id]);
    if (e) errors[f.id] = e;
  }
  return errors;
}

export function checkContact(c: ContactInfo): Record<string, string> {
  const errors: Record<string, string> = {};
  const name = c.name.trim();
  if (!name) errors.name = "Your name is required.";
  else if (name.length > LIMITS.name) errors.name = "That name is too long.";
  if (!c.email.trim()) errors.email = "Your email is required.";
  else if (!isEmail(c.email.trim())) errors.email = "That email doesn't look right.";
  const needsPhone = c.channel === "whatsapp" || c.channel === "call";
  if (c.phone.trim()) {
    if (!isPhone(c.phone)) errors.phone = "Digits and spaces only, at least 6 of them.";
  } else if (needsPhone) {
    errors.phone = `Add a number so I can ${c.channel === "call" ? "call" : "WhatsApp"} you.`;
  }
  if (c.phoneCode && c.phoneCode !== "other" && !DIAL_CODES.some((d) => d.value === c.phoneCode)) errors.phone = "Pick a country code.";
  if (c.company.trim().length > LIMITS.text) errors.company = `Keep it under ${LIMITS.text} characters.`;
  if (!CHANNELS.some((o) => o.value === c.channel)) errors.channel = "Pick how to reach you.";
  if (c.heard && !HEARD.some((o) => o.value === c.heard)) errors.heard = "Pick from the list.";
  const msg = c.message.trim();
  if (msg.length < LIMITS.messageMin) errors.message = `A little more, please. At least ${LIMITS.messageMin} characters.`;
  else if (msg.length > LIMITS.message) errors.message = `Keep it under ${LIMITS.message} characters.`;
  if (!c.consent) errors.consent = "Tick this so I can reply.";
  return errors;
}

/** Human-readable value for a field, for the summary and the email. */
export function displayValue(f: Field, raw: string | string[] | undefined): string {
  if (raw === undefined) return "";
  const lab = (v: string) => {
    const o = f.options?.find((x) => x.value === v);
    return o ? (o.hint && f.id === "budget" ? `${o.label} (${o.hint})` : o.label) : v;
  };
  if (Array.isArray(raw)) return raw.map(lab).join(", ");
  const v = raw.trim();
  if (!v) return "";
  if (f.kind === "url") return normaliseUrl(v) ?? v;
  return f.options ? lab(v) : v;
}

export const optionLabel = (list: Option[], v: string) => list.find((o) => o.value === v)?.label ?? v;
