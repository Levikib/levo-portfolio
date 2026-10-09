import { MAKEJA, fmt } from "./facts";

export type Snippet = { file: string; caption: string; code: string };
export type Decision = { title: string; why: string; tradeoff: string };
export type Layer = { name: string; detail: string };
export type Reel = { file: string; ratio: "16:9" | "9:16" | "1:1"; seconds: number; shot: string };

export type Project = {
  slug: string;
  station: string;
  name: string;
  kind: string;
  accent: string;
  tagline: string;
  summary: string;
  live?: string;
  repo?: string;
  role: string;
  when: string;
  stack: string[];
  stats: { value: string; label: string }[];
  problem: string[];
  architecture: Layer[];
  decisions: Decision[];
  code: Snippet[];
  qa: string[];
  results: string[];
  next: string[];
  reel: Reel;
  placeholders?: string[];
  /** Shown instead of a source link when the repo is private. */
  repoNote?: string;
};

const ALL: Project[] = [
  {
    slug: "makeja-homes",
    station: "01",
    name: "Makeja Homes",
    kind: "Founder · PropTech SaaS",
    accent: "#FF8A1F",
    tagline: "Property management software built for how Kenyan landlords actually work.",
    summary:
      "A multi-tenant SaaS where every property company gets its own isolated Postgres schema: leases signed online, bills generated in one click, payments reconciled automatically, and an AI assistant that knows the portfolio.",
    live: "https://makejahomes.co.ke",
    repoNote: "Private repo. Code walkthrough on request.",
    role: "Co-founder, founding engineer and product designer",
    when: "2024 to now",
    stack: ["Next.js 14", "TypeScript", "PostgreSQL (Neon)", "Prisma + raw SQL", "Upstash Redis", "Paystack (cards + M-Pesa)", "Groq (gpt-oss-120b + fallbacks)", "KRA eTIMS", "QuickBooks Online"],
    stats: [
      { value: fmt(MAKEJA.tenants), label: MAKEJA.tenants.label },
      { value: fmt(MAKEJA.units), label: MAKEJA.units.label },
      { value: fmt(MAKEJA.leases), label: MAKEJA.leases.label },
      { value: fmt(MAKEJA.clients), label: MAKEJA.clients.label },
    ],
    problem: [
      "Kenyan landlords run portfolios on WhatsApp groups, screenshots as payment proof, and spreadsheets with water readings done by hand.",
      "Off-the-shelf tools are built for other markets: no water sub-meter billing, no KRA tax rules, no M-Pesa, no caretaker or storekeeper roles.",
      "Property companies also need hard data isolation: one company's tenants can never leak into another's dashboard.",
    ],
    architecture: [
      { name: "Edge", detail: "Next.js middleware verifies the JWT, resolves the company slug, checks the Redis revocation list." },
      { name: "App", detail: "407 API route handlers and 200 pages across 5 role dashboards: admin, manager, caretaker, storekeeper, tenant." },
      { name: "Tenant data", detail: "One Postgres schema per company (tenant_<slug>) with 40+ tables, reached through a capped LRU of clients pinned by search_path, kept current by a per-tenant migration runner." },
      { name: "Shared data", detail: "A master schema for companies, billing and the public rental listings index fed from every tenant schema." },
      { name: "Money", detail: "Paystack cards and M-Pesa in, a signed webhook that credits bills in one transaction, stale payments reconciled on read, integer minor units for listing prices." },
      { name: "Integrations", detail: "KRA eTIMS e-invoicing, QuickBooks Online sync per client, WhatsApp reminders." },
      { name: "Intelligence", detail: "Njiti, an in-dashboard assistant with role-scoped live data and a distilled long-term memory per company." },
    ],
    decisions: [
      {
        title: "Schema-per-tenant, not a tenant_id column",
        why: "Each company's data sits in its own schema, so a missed WHERE clause cannot leak another company's tenants.",
        tradeoff: "Prisma migrations cannot reach dynamic schemas, so tenant tables are provisioned and evolved in raw SQL.",
      },
      {
        title: "Provision in SQL, not prisma db push",
        why: "Vercel's serverless filesystem is read-only, so the CLI cannot run at signup. A 577-line provisioner creates the schema, enums and every table directly.",
        tradeoff: "Tenant schemas then drift, so a migration runner applies numbered, idempotent steps to every schema, records them in a ledger and holds a Postgres advisory lock so two deploys never migrate at once.",
      },
      {
        title: "Reconcile on read instead of a cron",
        why: "Tenants who abandon Paystack checkout never hit the callback, leaving payments stuck as PENDING. Stale ones are now verified with Paystack whenever anyone views payments.",
        tradeoff: "A small latency cost on that one view, in exchange for zero extra infrastructure.",
      },
      {
        title: "Two-layer AI memory",
        why: "Raw chat history would blow the context window within weeks. Njiti keeps the history for browsing and injects only distilled, durable company facts into prompts.",
        tradeoff: "A distillation pass has to decide what is durable, so memory is curated, not complete.",
      },
      {
        title: "Write it down: DECISIONS.md",
        why: "Non-obvious calls (enum sequencing in Postgres, raw SQL over prisma migrate) are logged with what was rejected and why.",
        tradeoff: "Slower in the moment, much faster for every future change.",
      },
    ],
    code: [
      {
        file: "lib/get-prisma.ts",
        caption: "The pooler drops search_path, so each tenant gets a direct connection pinned to its schema, held in a capped LRU so tenant growth cannot exhaust connections.",
        code: `export function buildTenantUrl(schemaName: string): string {
  // Neon's pgbouncer pooler strips the \`options=\` parameter, so search_path
  // is never set and all queries silently hit the public schema instead.
  const direct = (process.env.DIRECT_DATABASE_URL || /* … */ '').replace('-pooler.', '.')
  // … strip any existing schema= / options= params
  return \`\${base}\${sep}options=--search_path%3D\${schemaName}\`
}

export function getCachedClient(schemaName: string): PrismaClient {
  const existing = cache.get(schemaName)
  if (existing) {
    cache.delete(schemaName)   // refresh recency
    cache.set(schemaName, existing)
    return existing
  }
  // … create client, then evict the least-recently-used one past the cap
}`,
      },
      {
        file: "lib/db/tenant-migrations/runner.ts",
        caption: "Every tenant schema is migrated by idempotent steps recorded in a shared ledger, under an advisory lock so concurrent deploys queue instead of racing DDL.",
        code: `export async function sweepAllTenantSchemas(opts: { force?: boolean } = {}) {
  const master = getMasterPrisma()
  await ensureLedger(master)
  await master.$executeRawUnsafe(\`SELECT pg_advisory_lock(\${ADVISORY_LOCK_KEY})\`)
  try {
    const schemas = await listTenantSchemas(master)
    for (const schema of schemas) {
      results.push(await runTenantMigrations(schema, opts))
    }
    // …
  } finally {
    await master.$executeRawUnsafe(\`SELECT pg_advisory_unlock(\${ADVISORY_LOCK_KEY})\`)
  }
}`,
      },
      {
        file: "app/api/webhooks/paystack/route.ts",
        caption: "The webhook checks Paystack's HMAC signature in constant time, then marks the payment and credits the bill inside one transaction, so money can never be half recorded.",
        code: `const hash = crypto
  .createHmac("sha512", process.env.PAYSTACK_SECRET_KEY!)
  .update(body)
  .digest("hex")

const hashBuf = Buffer.from(hash, "hex")
const sigBuf = signature ? Buffer.from(signature, "hex") : Buffer.alloc(0)
const signatureValid =
  hashBuf.length === sigBuf.length && crypto.timingSafeEqual(hashBuf, sigBuf)
// …
await db.$transaction(async (tx) => {
  // mark COMPLETED and credit the bill or deposit together …
})`,
      },
      {
        file: "lib/reconcile-paystack-pending.ts",
        caption: "Abandoned checkouts are verified with Paystack the next time anyone looks, so nothing stays falsely pending.",
        code: `const stale = await db.$queryRawUnsafe(\`
  SELECT id, COALESCE("referenceNumber", reference) AS ref
  FROM payments
  WHERE status::text = 'PENDING'
    AND "paymentMethod"::text = 'PAYSTACK'
    AND "createdAt" < NOW() - INTERVAL '2 minutes'
  LIMIT 20\`)

for (const row of stale) {
  const ps = await fetch(
    \`https://api.paystack.co/transaction/verify/\${encodeURIComponent(row.ref)}\`,
    { headers: { Authorization: \`Bearer \${process.env.PAYSTACK_SECRET_KEY}\` } })
  // Paystack says it never succeeded: mark FAILED. A real success is left
  // to the full verify path (bill matching, wallet credit, receipt) …
}`,
      },
      {
        file: "lib/token-blocklist.ts",
        caption: "Logout revokes the token's jti in Redis for 25 hours, one hour longer than the token can live.",
        code: `const BLOCKLIST_TTL_SEC = 25 * 60 * 60 // JWT maxAge is 24h

export async function revokeToken(jti: string) {
  await kvSet(\`blocklist:\${jti}\`, '1', BLOCKLIST_TTL_SEC)
}
export async function isRevoked(jti: string) {
  return kvHas(\`blocklist:\${jti}\`)
}`,
      },
    ],
    qa: [
      "Billing guard refuses bills or water readings for months before a tenant moved in or a unit existed.",
      "Integer minor units for listing money, one rounding rule for the whole path.",
      "Kenya tax module encodes MRI withholding, contractor withholding, VAT threshold, county land rates and stamp duty.",
      "Paystack webhook: constant-time signature check, idempotent, money credited in one transaction.",
      "Rate limiting, CSRF double-submit plus Sec-Fetch-Site checks, bcrypt, Turnstile on login and password reset.",
    ],
    results: [
      `${fmt(MAKEJA.tenants)} tenants and ${fmt(MAKEJA.units)} units under management.`,
      `${fmt(MAKEJA.leases)} leases signed digitally, ${fmt(MAKEJA.clients)} client companies.`,
      "Three products on one login: MANAGE, FIND (public listings) and BUILD (verified contractor marketplace).",
      "407 API routes and 200 pages, with every tenant schema kept current by the migration runner.",
    ],
    next: [
      "A direct M-Pesa STK push rail alongside Paystack.",
    ],
    reel: { file: "reels/makeja-dashboard-16x9-12s.mp4", ratio: "16:9", seconds: 12, shot: "Admin dashboard: generate monthly bills, open a payment, ask Njiti a question." },
  },
  {
    slug: "mikono-creations",
    station: "02",
    name: "Mikono Creations",
    kind: "Client · Craft e-commerce",
    accent: "#E8B04B",
    tagline: "A handmade animal shop whose checkout writes the WhatsApp order for you.",
    summary:
      "A full store for a Nairobi craft business that supports 25+ women: 30 animals, a custom-order studio with 29 order types, gift and size finders, a budgeted animal layer, and a checkout that writes a referenced WhatsApp order sized to fit the link.",
    live: "https://mikono-creations.vercel.app",
    repo: "https://github.com/Levikib/Mikono-Creations",
    role: "Strategy, design and full build, run as a multi-agent pipeline with audit gates",
    when: "2026",
    stack: ["Next.js 16 (App Router)", "React 19", "TypeScript", "Tailwind CSS 4", "sharp (build-time WebP pipeline)", "WhatsApp deep links", "Playwright (mobile QA scripts)", "Vercel"],
    stats: [
      { value: "51", label: "route templates" },
      { value: "29", label: "custom order types" },
      { value: "88/88", label: "supplied photos and video used" },
      { value: "294", label: "unit tests passing" },
    ],
    problem: [
      "The brief arrived as 5 WhatsApp zips: 87 photos, 1 video, a logo, seven stockists and a founder story. Prices, delivery fees and centimetre sizes were not supplied.",
      "The client ruled out bright colours in the interface for a children's brand, then asked for a site that felt more alive.",
      "Kenyan customers buy through WhatsApp, not card checkout, and much of the work is custom: mascots, corporate gifts, pet lookalikes, classroom sets.",
    ],
    architecture: [
      { name: "Media intelligence", detail: "Every file got a stable id. 8 analyst agents labelled them, two blind passes re-labelled 60, and 5 independent deciders voted on the 44 unclear ones." },
      { name: "Strategy", detail: "Six strategy reports, then an audit that failed the set and listed 19 contradictions between them, then one binding decisions file of 40 rulings that overrides them all." },
      { name: "Storefront", detail: "30 animals in 5 categories with colour and size variants, a cart, and an order wizard that ends in a prefilled WhatsApp message with an MK-YYMMDD-XXXX reference." },
      { name: "Studio", detail: "A 3-step quick brief or a full brief of up to 11 steps. Each of the 29 order types carries flags that decide which questions appear. Multi-piece orders, plus a gift finder, a size finder and a safari family builder." },
      { name: "Living layer", detail: "59 SVG animal sprites, a scroll thread and a 12-find herd game. The server renders every animal as still HTML; a standalone engine only sets data attributes, so hydration never disagrees." },
      { name: "Images", detail: "A build step turns 280 source images into 2,391 WebP variants at up to 11 widths. A custom next/image loader picks the nearest one, so no runtime optimiser is billed." },
      { name: "Content and trust", detail: "47 journal posts from four sources normalised into one model, 16 draft legal documents, and analytics tags that load only after consent." },
    ],
    decisions: [
      {
        title: "Two real prototypes before choosing a look",
        why: "A dark glass direction and a daylight clay direction were both built as static pages with the real photos and screenshotted at phone and desktop sizes.",
        tradeoff: "Daylight clay won: heavy backdrop blur is the costliest effect on low-end Android, and dark was the wrong first impression for a children's brand.",
      },
      {
        title: "No invented prices",
        why: "One pricesConfirmed flag drives four price states, so no total is shown or estimated until every line and the delivery fee are known. The catalogue throws at build time if the flag is on and any product lacks a price.",
        tradeoff: "Every product reads 'Ask for price' until the client supplies prices, which costs some conversion.",
      },
      {
        title: "Motion with a budget",
        why: "An inline head script picks the animal tier before first paint from the visitor's switch, reduced motion, Save-Data and device memory. The engine then lets at most 4 animals move on a phone, 6 on desktop, 2 on weak devices.",
        tradeoff: "Fewer flourishes. After three slow frames the engine cuts the budget by 2 for the session, and an Animals switch in every footer turns motion off.",
      },
      {
        title: "Pre-built images instead of a runtime optimiser",
        why: "The hosted image optimiser hit its plan limit, so every photo is now resized once at build time and served as static WebP.",
        tradeoff: "Builds take longer as the photo set grows, so variants are incremental and AVIF stays opt-in.",
      },
    ],
    code: [
      {
        file: "lib/whatsapp.ts",
        caption: "A wa.me link fails when it gets too long, so the order message steps down from full to compact to short until the encoded URL fits, and the full text is kept for the customer to paste.",
        code: `export const URL_BUDGET = 2000;
// …
/** Picks the longest level whose encoded URL fits the budget. fullText is always the full message for copying. */
export function planOrderSend(number: string | undefined, o: OrderMsg): SendPlan {
  const fullText = buildOrderMessage(o, "full");
  const levels: Level[] = ["full", "compact", "short"];
  let last: SendPlan | null = null;
  for (const level of levels) {
    const text = level === "full" ? fullText : buildOrderMessage(o, level);
    const url = buildWaUrl(number, text);
    last = { level, text, fullText, url, tooLong: false, pasteRest: level !== "full" };
    if (!url || url.length <= URL_BUDGET) return last;
  }
  return { ...(last as SendPlan), tooLong: true };
}`,
      },
      {
        file: "components/fx/engine/index.ts",
        caption: "Only the best few animals may move at once. The budget depends on screen width and device tier, and drops for the rest of the session after three slow frames.",
        code: `function setBudget() {
  const phone = innerWidth < 900;
  budget = tier === "lite" ? 2 : phone ? 4 : 6;
  try { if (sessionStorage.getItem("mk-fx-slow")) budget = Math.max(1, budget - 2); } catch { /* storage blocked */ }
}
// …
  if (!force && lastT && dt > 100 && motionOK()) {
    slowFrames = slowFrames.filter((t) => now - t < 2000);
    slowFrames.push(now);
    if (slowFrames.length >= 3) { try { sessionStorage.setItem("mk-fx-slow", "1"); } catch { /* storage blocked */ } setBudget(); soon(0); slowFrames = []; }
  }`,
      },
      {
        file: "lib/studio/flow.ts",
        caption: "The studio asks only what the brief makes relevant. Order types are data with flags, and small pure predicates decide which steps and sections appear.",
        code: `export const wantsBusiness = (b: Brief) => isBusinessCustomer(b) || hasType(b, (t) => !!t.business);
// …
export const isBulk = (b: Brief) => hasType(b, (t) => !!t.bulk) || b.pieces.some((p) => !!qtyBands.find((x) => x.id === p.qtyBand)?.bulk) || totalCount(b) >= BULK_FROM;
// …
export const mayHaveLogo = (b: Brief) => hasLogoFinish(b) || hasType(b, (t) => !!t.logo) || b.pieces.some((p) => p.baseId === "character");
// …
export function activeSteps(path: PathMode, b: Brief): StepId[] {
  if (path === "quick") return quickSteps;
  return fullSteps.filter((s) => s !== "business" || wantsBusiness(b));
}`,
      },
      {
        file: "scripts/test-whatsapp.mjs",
        caption: "Privacy rules are tests: a business's KRA PIN goes into the WhatsApp message but must never reach the draft saved on the device.",
        code: `t("the KRA PIN is in the message but never in a draft", () => {
  const form = { ...F.emptyForm, customerTypes: ["shop"], name: "Amina", phone: "0712345678", businessName: "Savanna Gifts", kraPin: "A123456789B", paymentNote: "x" };
  const ticks = { ...F.noTicks, terms_acknowledged: true };
  const msg = F.toOrderMsg(form, [{ sku: "a-b-s", name: "A", colourLabel: "B", size: "S", qty: 1 }], "MK-261001-AAAA", ticks, "", "", C.CONSENT_VERSION);
  assert.ok(W.buildOrderMessage(msg, "full").includes("KRA PIN: A123456789B"));
  const full = W.buildOrderMessage(msg, "full");
  F.writeDraft({ step: "review", skipGift: false, skipAbout: false, form, ref: "MK-261001-AAAA", sent: { message: full, text: full, level: "full", at: 1 } });
  const raw = mem.get(F.DRAFT_KEY);
  assert.ok(raw && !raw.includes("A123456789B") && !raw.includes("kraPin"), "draft has no PIN");
  const back = F.readDraft();
  assert.equal(back.form.kraPin, "");
});`,
      },
    ],
    qa: [
      "Three independent verifiers (visual, content and media, function and accessibility) per rendering phase; their reports for the shop, trade and content phases are committed to the repo.",
      "294 unit tests across checkout, WhatsApp messages, enquiries, the studio and helpers, including privacy rules: no child data fields, and the KRA PIN never stored on the device.",
      "Build gates: a copy scan for dashes and banned phrases, a choreography check for the animal layer, and an OKLCH chroma cap of 0.13 with WCAG AA contrast pairs.",
      "Playwright mobile scripts for layout, interactions, width and performance across 11 viewports; the width gate passes all 366 page and width runs.",
    ],
    results: [
      "All 88 supplied files (87 photos, 1 video) appear on the site; the 44 unclear species were settled by vote for the client to confirm at review.",
      "Live with 51 route templates, 30 animals, 47 journal posts and a custom studio that turns any brief into one WhatsApp message.",
      "The pipeline was written up as the Foundation Build Playbook for future client sites.",
    ],
    next: [
      "Switch on prices and product offer markup once the client confirms them.",
      "Clear the open critical and high findings from the latest mobile layout gate.",
      "Run the SEO crawler against the live site and fix what it finds.",
      "Have a Kenyan advocate review the 16 draft legal documents before launch.",
    ],
    reel: { file: "reels/mikono-studio-9x16-10s.mp4", ratio: "9:16", seconds: 10, shot: "Phone: build a custom animal in the studio, then the WhatsApp order opens." },
  },
  {
    slug: "elatec-safety-systems",
    station: "03",
    name: "Elatec Safety Systems",
    kind: "Client · Local service + shop",
    accent: "#6FD3A5",
    tagline: "A security and solar installer that now sells and books online.",
    summary:
      "A service business site with a real shop, bookings, a WhatsApp order hand-off, a towns-served index computed from real project records, and structured data written by hand for local search.",
    live: "https://elatecsafetysystems.co.ke",
    repoNote: "Client repo, private. Walkthrough on request.",
    role: "Design and full build through ShanTech",
    when: "2026",
    stack: ["Next.js 14", "TypeScript", "Supabase (Postgres)", "Typed data files", "WhatsApp", "Africa's Talking SMS"],
    stats: [
      { value: "18", label: "page templates" },
      { value: "33", label: "towns with real projects" },
      { value: "3", label: "service pillars" },
    ],
    problem: [
      "A company with 15+ years of installs had no way to sell equipment, take deposits or show proof of work online.",
      "Three very different services (security, solar, shading) had to read as one brand.",
    ],
    architecture: [
      { name: "Content", detail: "Typed data files for services, products, projects and the blog, so every page is static and fast." },
      { name: "Proof", detail: "A towns-served index whose counts are computed from the project records, so the claim cannot drift from the evidence." },
      { name: "Commerce", detail: "Cart and checkout hand off a full order summary to WhatsApp. An order API with staged events is built, ready to switch on." },
      { name: "Messaging", detail: "Notifications try WhatsApp first and fall back to Africa's Talking SMS." },
      { name: "Search", detail: "Hand-built schema.org JSON-LD for the organisation, services and products." },
    ],
    decisions: [
      {
        title: "Deposits by product category",
        why: "Installs need commitment up front: 30% by default, 40% for solar and gate automation.",
        tradeoff: "The rule lives in the order API, which is not switched on yet; the live checkout hands off to WhatsApp today.",
      },
      {
        title: "Leave out what is not real",
        why: "Social profiles that did not exist yet were kept out of the structured data instead of being invented.",
        tradeoff: "Weaker social signals until the client sets up real profiles.",
      },
    ],
    code: [
      {
        file: "src/lib/utils/depositCalc.ts",
        caption: "Category-aware deposits with an override, rounded up so the business is never short. Built into the order API.",
        code: `const DEFAULT_DEPOSIT_PCT = 30
const CATEGORY_DEPOSIT_PCT = { solar: 40, gate_automation: 40 }

export function calcDeposit(subtotal, category?, overridePct?) {
  const pct = overridePct
    ?? (category ? CATEGORY_DEPOSIT_PCT[category] : undefined)
    ?? DEFAULT_DEPOSIT_PCT
  const deposit = Math.ceil((subtotal * pct) / 100)
  return { deposit, balance: subtotal - deposit, pct }
}`,
      },
      {
        file: "src/data/projectsData.ts",
        caption: "The 'towns we have worked in' claim is computed from the project records, so the number cannot drift from the evidence.",
        code: `export function getAllLocations() {
  const counts = new Map<string, number>()
  for (const p of PROJECTS_DATA) {
    counts.set(p.location, (counts.get(p.location) ?? 0) + 1)
  }
  return Array.from(counts.entries())
    .map(([location, count]) => ({ location, count, region: getProjectRegion(location) }))
    .sort((a, b) => b.count - a.count || a.location.localeCompare(b.location))
}`,
      },
    ],
    qa: ["Structured data only states what exists: missing social profiles are left out, not invented.", "Town and region counts are derived from project records at render time."],
    results: ["Shop, bookings and project proof live under one brand.", "Real projects listed across 33 towns and counties."],
    next: ["Switch checkout onto the order API with private tracking links.", "Real social links in the footer and structured data.", "Server-render the stats so they never show zero."],
    reel: { file: "reels/elatec-projects-16x9-10s.mp4", ratio: "16:9", seconds: 10, shot: "Hero slider, then the towns-served index, then a product page and the WhatsApp order." },
    placeholders: ["Repo is private: decide whether to show code excerpts publicly."],
  },
  {
    slug: "noevella-group",
    station: "04",
    name: "Noevella Group",
    kind: "Client · Luxury creative agency",
    accent: "#E91E8C",
    tagline: "An agency site the founder runs herself, with no developer needed.",
    summary:
      "A media-forward agency site on a headless CMS: divisions, work, journal and a shop, with a design language locked with the client before a page was built.",
    live: "https://noevellagroup.com",
    repoNote: "Client repo, private. Walkthrough on request.",
    role: "Design and full build through Shannara",
    when: "2026",
    stack: ["Next.js 16", "React 19", "Payload CMS 3", "PostgreSQL", "Vercel Blob", "GSAP + Lenis"],
    stats: [
      { value: "11", label: "CMS collections" },
      { value: "5", label: "divisions" },
      { value: "9", label: "research briefs" },
    ],
    problem: [
      "A founder running events, brand strategy, talent and a creative hub needed one story, not five service pages.",
      "She needed to publish work and products herself, without a developer.",
    ],
    architecture: [
      { name: "CMS", detail: "Payload 3 inside the Next.js app: Divisions, Projects, Products, Orders, Inquiries, Insights, Services, Team, Testimonials, Media, Users." },
      { name: "Storage", detail: "Postgres for content, Vercel Blob for media, scripted media imports." },
      { name: "Front end", detail: "Clay and glass panels, sticker cards, type-on hero, floating pill nav with a mega panel." },
      { name: "Growth", detail: "Meta and GA4 pixels with campaign attribution carried into every order and WhatsApp message." },
      { name: "Resilience", detail: "Every CMS query falls back to labelled static content, so pages render before any entry exists." },
    ],
    decisions: [
      {
        title: "No WebGL, on purpose",
        why: "The design DNA keeps motion in CSS and GSAP so video stays the hero and phones stay fast.",
        tradeoff: "Less spectacle, more speed and content.",
      },
      {
        title: "Research before layout",
        why: "Nine research briefs fed one content master plan; the core message became 'one integrated team'.",
        tradeoff: "Slower start, far fewer rewrites.",
      },
    ],
    code: [
      {
        file: "src/lib/queries.ts",
        caption: "Every CMS query degrades to labelled static content, so the site renders before a single entry exists and never shows a blank grid.",
        code: `async function safe<T>(fn: () => Promise<T>, fallback: T): Promise<T> {
  try {
    return await fn()
  } catch (err) {
    console.warn('[queries] falling back:', (err as Error).message)
    return fallback
  }
}

export async function getFeaturedProjects(limit = 9) {
  const fromCms = await safe(async () => { /* payload.find featured projects … */ }, [])
  // Real featured work leads, clearly labelled demo work fills the rest
  return [...fromCms, ...DEMO_PROJECTS].slice(0, limit)
}`,
      },
      {
        file: "src/components/Reveal.tsx",
        caption: "Scroll reveals are progressive enhancement: off for reduced motion, armed only after JS runs, and forced visible after 3 seconds so content can never stay hidden.",
        code: `const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
if (reduce) {
  el.classList.add('is-in')
  return
}

// Arm the CSS effect (idempotent across instances).
document.documentElement.setAttribute('data-reveal-armed', '')
// … IntersectionObserver adds .is-in on entry …

// Safety net: never leave content hidden.
const failSafe = window.setTimeout(() => el.classList.add('is-in'), 3000)`,
      },
    ],
    qa: ["Typed collections with generated types.", "Every animation respects reduced motion, with a global kill switch.", "Orders and inquiries accept public creates but only signed-in staff can read them."],
    results: ["The founder edits content, work and products herself."],
    next: ["Remove demo labels from shop items before launch.", "Move from a Gmail address to a domain email."],
    reel: { file: "reels/noevella-hero-16x9-8s.mp4", ratio: "16:9", seconds: 8, shot: "Splash, hero video, open the mega menu, scroll the division cards." },
  },
  {
    slug: "levo-cli",
    station: "06",
    name: "levo-cli",
    kind: "Product · Web terminal",
    accent: "#D4FF3A",
    tagline: "A real terminal for exploring my work, in the browser and in yours.",
    summary:
      "The terminal on this site is its own product: a command parser with history, autocomplete, man pages and commands that move you around the site.",
    repo: "https://github.com/Levikib/levo-portfolio",
    role: "Design and build",
    when: "2026",
    stack: ["React", "TypeScript", "Keyboard-first UI"],
    stats: [{ value: "20+", label: "commands" }],
    problem: ["Portfolios ask you to scroll. Engineers like to type. The terminal lets both kinds of visitor in."],
    architecture: [
      { name: "Parser", detail: "Tokenises input, resolves aliases, routes to command handlers." },
      { name: "State", detail: "History with arrow keys, tab completion over known commands." },
      { name: "Navigation", detail: "Commands like open, hire and work move the page, not just print text." },
    ],
    decisions: [
      {
        title: "Same data as the page",
        why: "The terminal reads the same facts file as the rest of the site, so it can never show a different number.",
        tradeoff: "Copy for the terminal is plainer than hand-written ASCII cards.",
      },
    ],
    code: [],
    qa: ["Works by keyboard only; focus stays inside the terminal while typing."],
    results: [],
    next: ["Publish `npx levo` to npm.", "Themes and a few easter eggs."],
    reel: { file: "reels/levo-cli-16x9-10s.mp4", ratio: "16:9", seconds: 10, shot: "Type help, tab-complete open makeja, the page scrolls to the station." },
    placeholders: ["npm package name and link once published."],
  },
  {
    slug: "ghostnet",
    station: "07",
    name: "GhostNet",
    kind: "Lab · Security training platform",
    accent: "#7CF0C8",
    tagline: "A cybersecurity training ground with an AI operator built in.",
    summary:
      "Thirteen training modules from OSINT to Active Directory, eight standalone security tools, a leaderboard, and GHOST, an LLM agent for signed-in users.",
    live: "https://ghostnet-pi.vercel.app",
    repo: "https://github.com/Levikib/ghostnet",
    role: "Design and build",
    when: "2025",
    stack: ["Next.js 14", "Supabase", "Groq (Llama 3.3 70B)"],
    stats: [{ value: "13", label: "modules" }],
    problem: ["Security learning is scattered across blogs and videos. GhostNet puts modules, tools and an assistant in one place."],
    architecture: [
      { name: "Modules", detail: "Active Directory, cloud, crypto, malware, mobile, network, offensive, OSINT, red team, social engineering, Tor, web, wireless." },
      { name: "Tools", detail: "Attack path, crypto tracer, CTF, intel, payload, report generator, Shodan, terminal." },
      { name: "GHOST agent", detail: "Authenticated, rate-limited per user, strict input validation." },
    ],
    decisions: [],
    code: [
      {
        file: "app/api/ghost/route.ts",
        caption: "The agent only answers signed-in users, with a per-user hourly limit (in memory, per instance) and hard caps on input size and roles.",
        code: `const { data: { user } } = await authClient.auth.getUser()
if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
if (!checkRateLimit(user.id))
  return NextResponse.json({ error: 'Rate limit exceeded' }, { status: 429 })
if (!Array.isArray(messages) || messages.length > 40) // reject
for (const msg of messages)
  if (msg.content.length > 4000) // reject`,
      },
    ],
    qa: [],
    results: [],
    next: ["Move the agent's system prompt to the server so clients cannot change it.", "Persist rate limits in Redis instead of memory."],
    reel: { file: "reels/ghostnet-16x9-8s.mp4", ratio: "16:9", seconds: 8, shot: "Matrix-rain entry, module grid, ask GHOST a question." },
  },
  {
    slug: "hookah-3d",
    station: "08",
    name: "Hookah 3D",
    kind: "Lab · WebGL",
    accent: "#FF5E7A",
    tagline: "A product that comes apart on the GPU.",
    summary:
      "An R&D shader for a hookah rental site: one model splits into 5 bands with a custom vertex shader, driven by a single progress uniform. Still in progress and not yet on the live page.",
    live: "https://hookah-website-two.vercel.app",
    repo: "https://github.com/Levikib/hookah-website",
    role: "Design and build",
    when: "2026",
    stack: ["Next.js 16", "React Three Fiber", "GLSL", "GSAP"],
    stats: [{ value: "5", label: "GPU-split bands" }],
    problem: ["A product page needed to feel like an experience without shipping five separate models."],
    architecture: [
      { name: "Model", detail: "One GLB mesh." },
      { name: "Shader", detail: "The vertex shader assigns each vertex to a height band and moves bands independently." },
      { name: "Progress", detail: "uProgress eases toward a target each frame and drives the explosion both ways; scroll wiring is next." },
    ],
    decisions: [
      {
        title: "Split on the GPU, not in Blender",
        why: "Banding by vertex height means one model, no extra draw calls, and a reversible effect.",
        tradeoff: "Bands follow height, not real part boundaries.",
      },
    ],
    code: [
      {
        file: "src/components/ExplodeHookah.tsx",
        caption: "Each vertex finds its band from model height, then moves and rotates with that band.",
        code: `float getBand(float y) {
  float t = (y - uModelMinY) / (uModelMaxY - uModelMinY);
  return floor(t * 5.0);
}

void main() {
  float band  = getBand(position.y);
  vec3 offset = bandOffset(band) * uProgress;
  float rot   = bandRotY(band)   * uProgress;
  // + a small sine wobble at peak …
  vec3 pos    = rotY(rot) * position + offset;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
}`,
      },
    ],
    qa: [],
    results: [],
    next: ["Mount the shader on the live hero and wire it to scroll."],
    reel: { file: "reels/hookah-16x9-8s.mp4", ratio: "16:9", seconds: 8, shot: "Scroll: the model splits apart, then reassembles." },
  },
];

/**
 * Display order (Levo, 2026-10-09). Core banking removed for good.
 * hookah-3d stays in ALL but is hidden until the shader ships; add it back to ORDER to publish it.
 */
const ORDER = ["makeja-homes", "mikono-creations", "noevella-group", "elatec-safety-systems", "ghostnet", "levo-cli"];

export const PROJECTS: Project[] = ORDER.map((slug, i) => {
  const p = ALL.find((x) => x.slug === slug)!;
  return { ...p, station: String(i + 1).padStart(2, "0") };
});

export const getProject = (slug: string) => PROJECTS.find((p) => p.slug === slug);
