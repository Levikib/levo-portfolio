# Technical findings: case-study fact-check

Principal-engineer pass over `src/data/projects.ts`, done 2026-10-05 against local clones (read-only). Every verdict cites `file:line` in the named repo. Repo HEADs checked: makeja-homes `c1afdd2`, noevella `b6da8bd`, elatec-web `73ec38c` (single commit, 2026-09-08), ghostnet `807d0c3` (single commit, 2026-07-15), hookah-website (single commit, 2026-09-10).

Legend: **TRUE** = code confirms it. **PARTIAL** = true but overstated or needs a qualifier. **FALSE** = code contradicts it. **UNVERIFIED** = not provable from code (business number, live-site state).

---

## 1. Verification table

### Makeja Homes (`/home/claude/makeja-homes`)

| Claim in projects.ts | Verdict | Evidence |
|---|---|---|
| Stack: Next.js 14 | TRUE | `package.json:54` `"next": "^14.2.33"` |
| Stack: PostgreSQL (Neon) | TRUE | `CLAUDE.md:100`; `lib/get-prisma.ts:16` (Neon connection-limit comment) |
| Stack: Prisma + raw SQL | TRUE | `lib/tenant-schema-provisioner.ts:36+`, `$queryRawUnsafe` throughout |
| Stack: Upstash Redis | TRUE | `lib/redis-kv.ts:14-24`, `lib/rate-limit.ts:15-16` |
| Stack: Paystack | TRUE | `app/api/webhooks/paystack/route.ts`, `lib/reconcile-paystack-pending.ts` |
| Stack: M-Pesa | PARTIAL | No direct Daraja/STK integration. M-Pesa is taken through Paystack mobile money (`app/api/billing/subscribe-mpesa/route.ts:11-16`) and manual till/paybill recording (`app/api/tenant/payments/create-manual/route.ts:46-47`). Say "M-Pesa via Paystack". |
| Stack: **Groq (Llama)** | **FALSE** | `lib/groq.ts:4-5` says the Llama line was pulled in Aug 2026; default is `openai/gpt-oss-120b` with a fallback chain (`lib/groq.ts:20-27`). Use "Groq (gpt-oss-120b, fallback chain)". |
| Stack: KRA eTIMS | TRUE | `lib/integrations/etims.ts`, `app/api/integrations/etims/submit-invoice/route.ts` |
| Edge: middleware verifies JWT, resolves slug, checks Redis revocation | TRUE | `middleware.ts:2-3, 126-136, 168-192` |
| 407 API route handlers | TRUE | `find app -name route.ts` = 407 |
| 200 pages | TRUE | `find app -name page.*` = 200 |
| 5 role dashboards (admin, manager, caretaker, storekeeper, tenant) | TRUE | `prisma/schema.prisma:718-724` enum Role; `app/dashboard/{admin,manager,caretaker,storekeeper,tenant}` (an `agent` dashboard also exists) |
| One Postgres schema per company, `tenant_<slug>` | TRUE | `lib/get-prisma.ts:48-63`, `middleware.ts:199` |
| **24 tables each** | **FALSE** | The provisioner baseline creates **22** distinct tables (`lib/tenant-schema-provisioner.ts:68-457`; `grep -c 'CREATE TABLE'` returns 24 only because it counts a comment at :471 and a second `staff_profiles` at :533). The 11-step migration runner then adds more: baseline + runner steps = **47 distinct tables** (`lib/db/tenant-migrations/steps/*.ts`), plus heal passes (njiti_memory etc.). Say "40+ tables per tenant schema". Also fix `ENGINEERING-AUDIT.md:6`. |
| Reached through a cached client pinned by `search_path` | TRUE | `lib/get-prisma.ts:48-63, 102-127` (the real hot path, 397 importers) and `lib/db/prisma-tenant.ts:6-33` (2 importers) |
| Master schema for companies, billing and public listings index | TRUE | `prisma/schema.prisma:25` `companies`, `:1157` `rental_listing_index`; `lib/billing/` |
| Listings index fed from every tenant schema | TRUE | `lib/listings/sync-index.ts:5-22`; nightly reconciler `vercel.json` `/api/cron/reconcile-listings` |
| Paystack and M-Pesa in, automatic reconciliation | PARTIAL | Paystack webhook reconciles bills/deposits in one transaction (`app/api/webhooks/paystack/route.ts:578`); stale PENDING reconciled on read. M-Pesa as above. |
| Integer minor units for listing prices | TRUE | `lib/money.ts:10-16`; `prisma/schema.prisma` `rentAmountMinor BigInt?` etc. |
| Njiti: role-scoped live data | TRUE | `app/api/njiti/route.ts:681-739, 892-894` |
| Njiti: distilled long-term memory per company | TRUE | `lib/njiti/memory.ts:1-23, 55-80`; cron `app/api/cron/njiti-distill-memory` |
| Decision: schema-per-tenant; Prisma migrate cannot reach dynamic schemas | TRUE | `lib/db/tenant-migrations/runner.ts:16` "Prisma migrate stays master-only" |
| Decision: 577-line provisioner, Vercel read-only FS | TRUE | `wc -l` = 577; `lib/tenant-schema-provisioner.ts:7-11` |
| Decision tradeoff: "kept in step by discipline and self-heal passes" | **OUTDATED** | There is now a real per-tenant migration runner: ledger table, idempotent steps, `pg_advisory_lock`, nightly cron and drift check (`lib/db/tenant-migrations/runner.ts:7-21, 145-176`; `vercel.json` `/api/cron/migrate-tenant-schemas`). The provisioner calls it (`lib/tenant-schema-provisioner.ts:568-569`). |
| Next: "Bring the remaining raw-SQL tables under a single migration runner per tenant" | **OUTDATED** | Already done (11 steps registered, `lib/db/tenant-migrations/registry.ts:2-12`). Move to Results/Decisions; replace with a real next step. |
| Decision: reconcile on read instead of cron | TRUE | `lib/reconcile-paystack-pending.ts:1-16`; called from `app/api/tenant/payments/history/route.ts:52`, `app/api/admin/payments/list/route.ts:31` |
| Decision: two-layer AI memory | TRUE | `lib/njiti/memory.ts:4-17` |
| Decision: DECISIONS.md logs enum sequencing and raw SQL over migrate | TRUE | `DECISIONS.md:9-26` (enum gotcha), `:84` (raw SQL over prisma migrate), `:4` "rejected, and why" |
| "Every non-obvious call is logged" | UNVERIFIED | Soften to "Non-obvious calls are logged". |
| QA: billing guard | TRUE | `lib/billing-period-guard.ts:1-17, 60-101` |
| QA: integer minor units, one rounding rule | TRUE | `lib/money.ts:1-16` (scope is the listings path only; caption already says "listing money") |
| QA: Kenya tax module (MRI, contractor WHT, VAT threshold, land rates, stamp duty) | TRUE | `lib/kenya-tax.ts:31-45, 60, 130, 151, 172, 194` |
| QA: rate limiting, CSRF, bcrypt | TRUE | `lib/rate-limit.ts`; `middleware.ts:266-285` (Sec-Fetch-Site + double-submit); bcrypt in 45 files |
| QA: **Turnstile on public forms** | PARTIAL | Turnstile is on login, forgot-password and instance lookup only (`app/api/auth/forgot-password/route.ts`, `app/api/auth/instances/route.ts`, `app/auth/login/page.tsx`). Say "Turnstile on login and password reset". |
| Results: tenant/unit/lease/client numbers | UNVERIFIED | Supplied by Levo (`ENGINEERING-AUDIT.md:22`); not derivable from code. |
| Results: MANAGE, FIND, BUILD on one login | TRUE | `app/page.tsx:342, 398-429`; `app/build`, `lib/build/` |

**Code excerpts (Makeja)**

| Snippet | Verdict | Notes |
|---|---|---|
| `lib/db/prisma-tenant.ts` | PARTIAL | Lines 3-8, 18-24. Two changes alter meaning: (a) real code falls back `DIRECT_DATABASE_URL \|\| MASTER_DATABASE_URL \|\| DATABASE_URL!` and strips `schema=` / `options=` params (:19-22); (b) real code picks `?` or `&` via `sep` (:23-24), the excerpt hard-codes `?`. Also this file has only 2 importers; the path 397 files use is `lib/get-prisma.ts`, which has a true LRU (refresh on hit) capped at 50. **Recommend swapping** to the `lib/get-prisma.ts` snippet in section 3. |
| `lib/reconcile-paystack-pending.ts` | PARTIAL | SQL matches :27-35 (drops `ORDER BY "createdAt" DESC` without a marker: harmless). The trailing comment **"settle or fail the payment from Paystack's real status"** is wrong: the code only marks FAILED when Paystack says not-success and deliberately never settles a success (:50-58). Change to `// Paystack says it never succeeded: mark FAILED. Success goes through the full verify path …`. |
| `lib/token-blocklist.ts` | TRUE | Matches :16-24 (return types dropped, inline comment reworded; meaning preserved). Worth noting in copy: fallback is in-memory when Upstash is unset (:7-8). |

### Noevella Group (`/home/claude/noevella`)

| Claim | Verdict | Evidence |
|---|---|---|
| Next.js 16, React 19, Payload CMS 3 | TRUE | `package.json` `next 16.3.6`, `react 19.3.0`, `payload 3.90.2` |
| PostgreSQL | TRUE | `src/payload.config.ts:50-54` |
| Vercel Blob | TRUE (conditional) | `src/payload.config.ts:62-72` (enabled when `BLOB_READ_WRITE_TOKEN` is set) |
| GSAP + Lenis | TRUE | `src/components/SmoothScroll.tsx:4-30` |
| 11 CMS collections (named list) | TRUE | `src/payload.config.ts:31-43` |
| 5 divisions | TRUE | `src/lib/site.ts:46-116` |
| 9 research briefs | TRUE | `docs/research/01..09-*.md` |
| Scripted media imports | TRUE | `package.json` `import-*` scripts; `src/lib/import-*.ts` |
| Clay and glass, sticker cards, type-on hero | TRUE | `docs/DESIGN_DNA.md:11, 29, 39-41`; `src/components/home/TypeCycle.tsx` used at `Hero.tsx:94` |
| Floating pill nav with mega panel | TRUE | `src/components/Header.module.css:192-195` (`megaIn`) |
| **Consent-aware marketing pixels** | **FALSE** | No consent check anywhere (`grep -ri consent src` finds only copy text). Pixels load whenever the env ID is set (`src/components/MarketingPixels.tsx:7-11, 19, 32`). Accurate: "env-gated Meta + GA4 pixels with UTM / click-id attribution carried into every order and WhatsApp message". |
| WhatsApp checkout | TRUE | `src/components/cart/CartDrawer.tsx:43-87`, `src/lib/whatsapp.ts:104-145` |
| No WebGL, on purpose | TRUE | `docs/DESIGN_DNA.md:58` "**No WebGL.**"; no three.js in `package.json` |
| "One integrated team" core message | TRUE | `docs/CONTENT_MASTER_PLAN.md:10` |
| QA: typed collections with generated types | TRUE | `src/payload.config.ts:47-49`; `src/payload-types.ts` |
| QA: every animation respects reduced motion | TRUE | Global kill-switch `src/app/(frontend)/globals.css:509-515`; every GSAP component checks `matchMedia` (e.g. `Hero.tsx:18-22`, `SmoothScroll.tsx:15`, `Reveal.tsx:35-39`) |
| Results: founder edits content herself | UNVERIFIED | Capability exists (Payload admin); usage is not provable from code. |
| Next: remove demo labels | TRUE (still needed) | `[DEMO]` in `src/lib/site.ts:427-429`, `src/lib/seed.ts:9` |

### Elatec Safety Systems (`/home/claude/elatec-web`)

The case study describes more than this repo does. Several features exist as API routes or components that **nothing in the UI calls or mounts**. If the live site is built from a different branch, confirm before publishing; otherwise correct the copy.

| Claim | Verdict | Evidence |
|---|---|---|
| Next.js 14 | TRUE | `package.json` `next 14.2.35` |
| Supabase (Postgres + RLS) | PARTIAL | Supabase used by API routes; RLS policy is effectively open (see below). |
| **Sanity CMS** | **FALSE** | `src/lib/sanity/client.ts` and `sanity/schemas/` exist but **no file imports `lib/sanity`**. Services, projects, blog and products come from TS files: `src/data/{serviceData,projectsData,blogPosts,catalogueProducts}.ts` (imported by `src/app/sitemap.ts:2-4` and pages). |
| React Three Fiber | PARTIAL | Dependency and components exist (`src/components/3d/*`) but **none is imported anywhere** in `src/app` or other components. |
| Africa's Talking SMS | TRUE | `src/lib/africastalking/sms.ts`; used as fallback in `src/app/api/notifications/whatsapp/route.ts:137-140` |
| **Resend** | **FALSE** | In `package.json` only; never imported. Remove from stack. |
| 18 page templates | TRUE | 18 `page.tsx` (15 public + 3 admin) |
| 33 towns with real projects | TRUE | 33 unique `location:` values in `src/data/projectsData.ts`; derived at runtime by `getAllLocations()` (:1475-1483) and shown by `src/components/home/AreasServed.tsx:14-34` |
| 3 service pillars | TRUE | `src/data/projectsData.ts:1` `"security" \| "solar" \| "shading"` |
| "Projects map of every town served" | PARTIAL | `AreasServed` is a list grouped by region, not a map. Say "towns-served index". |
| Commerce: cart, checkout and orders in Supabase | **FALSE in the UI** | `src/app/api/orders/route.ts:59-163` creates orders, but checkout never calls it: `src/app/(public)/checkout/CheckoutPageClient.tsx:122-140` builds a WhatsApp message client-side; no `fetch('/api/…')` exists anywhere in `src/app/(public)` or components. |
| Staged order events | TRUE (API only) | `src/app/api/orders/route.ts:135-139`, `src/app/api/orders/[ref]/route.ts:102-162` |
| Public lookup by reference | PARTIAL | API looks up by ref (`api/orders/[ref]/route.ts:29-57`), but the tracking page renders a hard-coded `SAMPLE_ORDER` (`src/app/(public)/order/[ref]/OrderTrackingClient.tsx:28-40, 110-112`). Admin orders page also uses `SAMPLE_ORDERS` (`src/app/(admin)/admin/orders/page.tsx:12-13`). |
| Messaging: WhatsApp confirmations + SMS, Kenyan numbers normalised | PARTIAL | Prefix rewrite only (`0…` to `+254…`), no validation (`sms.ts:11-15`, `whatsapp/send.ts:17-21`). `sendNotification` calls `sendSMS` twice instead of WhatsApp-then-SMS (`sms.ts:46-48`, a bug). |
| Hand-built schema.org JSON-LD | TRUE | `src/lib/schema.ts:1-10, 20-55, 61-106, 141-175` |
| 3D: Draco-compressed GLB scenes for camera, solar, shading | PARTIAL | Those 3 GLBs are Draco (`KHR_draco_mesh_compression` present); the other 8 are not, and `automated-gates.glb` is **30 MB**. Scenes are not mounted anywhere (see R3F row). |
| Decision: deposits by category (30% / 40%) | PARTIAL | `src/lib/utils/depositCalc.ts:3-23` is correct, but it only runs in the uncalled orders API, uses only the **first item's** category (`api/orders/route.ts:92-94`), and the product page hard-codes "30% deposit" (`ProductDetailClient.tsx:240`). A `settings` table with the same percentages is seeded but unused (`supabase-schema.sql:83-90`). |
| Decision: leave out unreal social profiles | TRUE | `src/lib/schema.ts:30-37` |
| **QA: "RLS: the public can read an order only by its reference"** | **FALSE (security bug)** | `supabase-schema.sql:121-123` `CREATE POLICY "Public can read orders by ref" ON orders FOR SELECT USING (true);` lets anyone with the public anon key read **every** order (name, phone, email, location, amounts). Same for `order_events` (:126-128). |
| QA: refs `ELT-YYYY-NNNNN` | TRUE | `src/lib/utils/orderRef.ts:1-5`. Note: only 90,000 values per year from `Math.random`, no retry on UNIQUE collision, and the public `GET /api/orders/[ref]` makes refs enumerable. The tracking page sample uses a different format (`ELA-20240521-7834`). |
| Code excerpt `depositCalc.ts` | TRUE | Matches :3-23 with types stripped; meaning preserved. |

### GhostNet (`/home/claude/levikib/ghostnet`)

| Claim | Verdict | Evidence |
|---|---|---|
| Next.js 14 | TRUE | `package.json:15` `14.2.3` (see risk: vulnerable version) |
| Supabase | TRUE | `package.json:12-13` |
| Groq (Llama 3.3 70B) | TRUE | `app/api/ghost/route.ts:70` |
| 13 modules (list) | TRUE | `app/modules/*` (13 dirs) |
| Tools list + leaderboard | TRUE | `app/{attack-path,crypto-tracer,ctf,intel,payload,report-generator,shodan,terminal,leaderboard}` |
| GHOST: authenticated, per-user rate limit, strict input validation | TRUE | `app/api/ghost/route.ts:26-56` |
| when: 2025 | UNVERIFIED | Repo has one commit dated 2026-07-15 (likely squashed). |
| Code excerpt | TRUE | Matches :27-47; elisions marked `// reject`. Real check also validates `typeof` and `role` (:46-51). Copy should say the limit is in-memory per instance (:4-9). |
| Next: move system prompt server-side | TRUE (still needed) | `route.ts:38, 54, 73` accepts client `systemPrompt` |

### Hookah 3D (`/home/claude/levikib/hookah-website`)

| Claim | Verdict | Evidence |
|---|---|---|
| Next.js 16, R3F, GLSL, GSAP | TRUE | `package.json:13,17,19`; `src/components/ExplodeHookah.tsx` |
| **Paystack** | **FALSE** | No Paystack code; only a `paystack_reference` column displayed in admin (`src/app/admin/page.tsx:66`). Remove from stack. |
| 5 bands, custom vertex shader | TRUE | `ExplodeHookah.tsx:23-26, 29-43` |
| **Hero model splits on scroll** | **FALSE today** | `ExplodeHookah` is **not imported anywhere**; the home hero is `HeroSpotlight` with videos (`src/app/page.tsx:3`, `HeroSpotlight.tsx:6-26`). `SplineDisassembly.tsx:18` still has a `REPLACE_WITH_DISASSEMBLY_SCENE_ID` placeholder. Reword as "an R&D component, not yet on the live page", or mount it before publishing. |
| uProgress drives it both ways | PARTIAL | Uniform is eased toward a `progress` prop each frame (`:196-199`); no scroll source is wired because the component is unused. |
| Code excerpt | PARTIAL | Matches :23-26, 50-65 but silently drops the wobble lines (:58-60). Add `// + a small sine wobble at peak …` before `vec3 pos`. |

---

## 2. New findings per project

### Makeja Homes

**M1. Per-tenant migration runner with a ledger and an advisory lock**
Every tenant schema is migrated by idempotent numbered steps, with a ledger in the shared schema recording which steps each tenant has. A Postgres advisory lock serialises concurrent sweeps so two deploys, or a deploy racing the nightly cron, queue instead of colliding on DDL.
*Why a hiring manager cares:* schema-per-tenant usually dies on migrations; this shows the hard part solved with drift detection, not hand-waved.
File: `lib/db/tenant-migrations/runner.ts`
```ts
export async function sweepAllTenantSchemas(opts: { force?: boolean } = {}): Promise<SweepReport> {
  const master = getMasterPrisma()
  await ensureLedger(master)

  // pg_advisory_lock blocks until the lock is free; it is session-scoped, so
  // the getMasterPrisma singleton holds it for the duration of this call.
  await master.$executeRawUnsafe(`SELECT pg_advisory_lock(${ADVISORY_LOCK_KEY})`)
  try {
    const schemas = await listTenantSchemas(master)
    const results: SchemaMigrateResult[] = []
    for (const schema of schemas) {
      results.push(await runTenantMigrations(schema, opts))
    }
    // …
  } finally {
    await master.$executeRawUnsafe(`SELECT pg_advisory_unlock(${ADVISORY_LOCK_KEY})`).catch(() => {})
  }
```

**M2. Paystack webhook: constant-time signature check and one transaction for money**
The webhook verifies Paystack's HMAC-SHA512 signature with a constant-time compare, then marks the payment COMPLETED and credits the bill or deposit inside a single database transaction. Previously a failure after the status write left a payment "paid" with nothing credited and the idempotency check blocked any retry.
*Why:* correct webhook handling (auth, idempotency, atomicity) is the exact thing that loses real money when done wrong.
File: `app/api/webhooks/paystack/route.ts` (:333-341, :578)
```ts
    const hash = crypto
      .createHmac("sha512", process.env.PAYSTACK_SECRET_KEY!)
      .update(body)
      .digest("hex");

    const hashBuf = Buffer.from(hash, 'hex')
    const sigBuf = signature ? Buffer.from(signature, 'hex') : Buffer.alloc(0)
    const signatureValid = hashBuf.length === sigBuf.length && crypto.timingSafeEqual(hashBuf, sigBuf)
    // …
        await db.$transaction(async (tx: any) => {
```

**M3. Session revocation enforced once, at the edge**
A red-team pass found most API routes verified the JWT themselves and never checked the logout blocklist, proven by replaying a logged-out token to create a real record. The fix checks the revocation list once in middleware before any route runs, closing the gap for every route at once.
*Why:* shows a find-reproduce-fix security loop and a fix chosen for blast radius rather than 150 scattered edits.
File: `middleware.ts` (:126-136, :168-176)
```ts
async function isTokenRevoked(req: NextRequest): Promise<boolean> {
  try {
    const token = req.cookies.get('token')?.value
    if (!token) return false
    const { payload } = await jwtVerify(token, JWT_SECRET)
    const jti = payload.jti as string | undefined
    if (!jti) return false
    return await isRevoked(jti)
  } catch {
    return false
  }
}
// …
  if (await isTokenRevoked(req)) {
    if (currentPath.startsWith('/api/')) {
      return NextResponse.json({ error: 'Session revoked. Please log in again.' }, { status: 401 })
    }
```

**M4. Bounded LRU of tenant database clients**
Each tenant needs a direct (non-pooled) connection because the pooler drops `search_path`, so an unbounded cache would open one connection per tenant ever served and exhaust Neon's limit. The cache refreshes recency on every hit and evicts the least-recently-used client past a configurable cap.
*Why:* a real scaling failure mode identified before it happened, solved with no extra infrastructure.
File: `lib/get-prisma.ts` (:102-127)
```ts
export function getCachedClient(schemaName: string): PrismaClient {
  const existing = cache.get(schemaName)
  if (existing) {
    // Refresh recency: delete + re-insert moves this key to the "most
    // recently used" end of the map's iteration order.
    cache.delete(schemaName)
    cache.set(schemaName, existing)
    return existing
  }
  const client = new PrismaClient({ datasources: { db: { url: buildTenantUrl(schemaName) } } })
  cache.set(schemaName, client)
  if (cache.size > MAX_CACHED_TENANT_CLIENTS) {
    const oldestKey = cache.keys().next().value
    // … delete from cache first, then $disconnect()
  }
  return client
}
```

**M5. Model-agnostic LLM client with fallback and rate-limit backoff**
All AI calls go through one helper that tries a configurable primary model, then walks a fallback chain when a model is retired, and backs off on 429s using the provider's Retry-After hint. When the provider pulled the whole Llama line in Aug 2026, the product kept working.
*Why:* production AI features fail on vendor churn; this is the resilience layer most teams add only after an outage.
File: `lib/groq.ts` (:20-27, :74-77)
```ts
export const GROQ_MODEL = process.env.GROQ_MODEL || "openai/gpt-oss-120b"

export const GROQ_FALLBACKS = [
  "openai/gpt-oss-120b",
  "openai/gpt-oss-20b",
  "qwen/qwen3.8-27b",
  "groq/compound",
]
// …
  for (const model of candidates) {
    let res: Response | null = null

    // Up to 3 attempts per model, backing off on 429 rate limits.
    for (let attempt = 0; attempt < 3; attempt++) {
```

(Also strong but not excerpted: CSRF double-submit plus `Sec-Fetch-Site` rejection, `middleware.ts:266-285`; contractor trust score, `lib/build/trust-score.ts:29-50`.)

### Noevella Group

**N1. Content that degrades gracefully, never a blank page**
Every CMS query is wrapped so a missing table, an unmigrated database or an empty collection falls back to labelled static content. Real CMS work leads and clearly marked demo items fill the rest.
*Why:* the site could ship and render before the client loaded any content, which is how headless-CMS launches usually stall.
File: `src/lib/queries.ts` (:14-21, :33-53)
```ts
async function safe<T>(fn: () => Promise<T>, fallback: T): Promise<T> {
  try {
    return await fn()
  } catch (err) {
    console.warn('[queries] falling back:', (err as Error).message)
    return fallback
  }
}
// …
  // Real featured work leads, clearly-labelled [DEMO] work fills the rest —
  // both are shown together rather than one replacing the other.
  return [...fromCms, ...DEMO_PROJECTS].slice(0, limit)
```

**N2. Scroll reveals as progressive enhancement, with a fail-safe**
Content renders visible by default; the hide-until-scrolled effect is only armed after JavaScript runs and only if the visitor allows motion. A 3-second timer forces anything still hidden into view, so a stalled observer can never leave the page blank.
*Why:* animation that cannot break content or accessibility is a mark of senior front-end judgment.
File: `src/components/Reveal.tsx` (:35-42, :70-71)

**N3. Marketing attribution carried end to end**
UTM and click IDs are captured on first landing into session storage, then attached to the stored Order, the Inquiry and the WhatsApp message itself. The business sees which campaign produced each WhatsApp sale, which ad platforms cannot see on their own.
*Why:* closes the measurement gap of an off-site (WhatsApp) checkout.
Files: `src/lib/pixel.ts:80-117`, `src/app/(frontend)/api/checkout/route.ts:64-89`, `src/lib/whatsapp.ts:136-138`

**N4. Least-privilege CMS access for customer data**
Orders and Inquiries accept public creates but only signed-in staff can read, update or delete them. Content collections are public-read only.
*Why:* correct default access for PII on a headless CMS. (Caveat: `Users` is still public-read; see risks.)
File: `src/collections/Orders.ts:15-20`, `src/collections/Inquiries.ts:11-15`

**N5. Fail-loud, idempotent media import**
The product-image import matches each crop to a product by an exact slug and lists every unmatched product or file instead of silently skipping, and reuses an existing upload rather than duplicating it.
*Why:* repeatable data operations against production.
File: `src/lib/import-product-crops.ts:1-15, 35-53`

### Elatec Safety Systems

Honest note: the strongest *verified-in-use* engineering here is SEO and data-grounded claims. The commerce back end is real code but not wired to the UI.

**E1. Structured data that refuses to invent facts**
The JSON-LD builders omit social profiles, street address and geo that do not exist, and represent multiple real price tiers as an `OfferCatalog` instead of collapsing them into one fabricated price.
*Why:* rich-result eligibility without risking a Google manual action for misleading markup.
File: `src/lib/schema.ts:30-37, 75-85, 150-170`

**E2. Marketing claims derived from data, not typed in**
The "real projects in N towns across M regions" section computes its numbers from the project records at render time, so the claim cannot drift from the evidence.
*Why:* the same "single source of truth" principle as the portfolio's own facts file.
File: `src/data/projectsData.ts:1467-1483`, `src/components/home/AreasServed.tsx:7-16`

**E3. Notification channel fallback**
Admin notifications try WhatsApp first and fall back to Africa's Talking SMS, and report which channel actually delivered.
*Why:* reliable delivery in a market where WhatsApp Business API can fail or be unconfigured.
File: `src/app/api/notifications/whatsapp/route.ts:126-150` (note the separate `sendNotification` bug in `sms.ts:46-48`)

**E4. Order pipeline with stage validation and an event timeline (API)**
Stage changes are validated against an allow-list, write an `order_events` row and send the customer a status message; the public endpoint strips internal IDs.
*Why:* sound API design, but it is not called by the UI yet, so describe it as built, not live.
File: `src/app/api/orders/[ref]/route.ts:68-72, 102-162`

**E5. Admin-only API routes**
Only list/update endpoints require a Supabase session. Caveat: any authenticated Supabase user passes; there is no admin role check (`api/orders/route.ts:14-19`). Not recommended as a showcase.

---

## 3. Proposed snippets (ready to paste)

### Makeja: replace the `lib/db/prisma-tenant.ts` snippet

```ts
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
```

### Makeja: corrected comment in the reconcile snippet
Replace `// settle or fail the payment from Paystack's real status …` with:
```ts
  // Paystack says it never succeeded: mark FAILED. A real success is left
  // to the full verify path (bill matching, wallet credit, receipt) …
```

### Makeja: optional fourth snippet (migration runner)

```ts
      {
        file: "lib/db/tenant-migrations/runner.ts",
        caption: "Every tenant schema is migrated by idempotent steps, recorded in a shared ledger, with an advisory lock so concurrent deploys queue instead of racing DDL.",
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
```

### Noevella

```ts
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
  // Real featured work leads, clearly-labelled [DEMO] work fills the rest
  return [...fromCms, ...DEMO_PROJECTS].slice(0, limit)
}`,
      },
      {
        file: "src/components/Reveal.tsx",
        caption: "Scroll reveals are progressive enhancement: off for reduced motion, armed only after JS runs, and forced visible after 3s so content can never stay hidden.",
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
```

### Elatec (add alongside, or replace, the deposit snippet)

```ts
      {
        file: "src/lib/schema.ts",
        caption: "Structured data only states what is real: placeholder social links are left out of sameAs instead of being invented.",
        code: `// Footer social icons are currently placeholder \`href="#"\` links (Facebook, X/Twitter,
// Instagram, YouTube) with no real destination in the codebase, so they are intentionally
// OMITTED from \`sameAs\` rather than fabricated. The WhatsApp business line IS real
// … and is included below.
sameAs: ["https://wa.me/…"],`,
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
```
If the deposit snippet stays, change its caption to say the rule is implemented in the order API (not that customers are charged by it today).

### Suggested copy edits (summary)
- Makeja `stack`: `"Groq (gpt-oss-120b, fallback chain)"`, `"M-Pesa via Paystack"`.
- Makeja architecture "Tenant data": `"40+ tables each"`.
- Makeja decision 2 tradeoff: mention the migration runner (ledger, advisory lock, nightly drift check). Replace `next[0]` with something real, e.g. "Admin role check on the shared revocation path for deactivated users" (see `middleware.ts:118-124`) or "Remove the x-tenant-slug header fallback" (`lib/get-prisma.ts:93-95`).
- Makeja QA: "Turnstile on login and password reset".
- Noevella architecture "Growth": drop "Consent-aware"; say "Env-gated Meta and GA4 pixels with campaign attribution carried into orders and WhatsApp messages."
- Elatec: drop Sanity and Resend from stack; architecture "Content" becomes typed data files; "Commerce" should say order API built, WhatsApp hand-off live; remove the RLS QA line until the policy is fixed; "3D" should say scenes built, not yet mounted (or mount them).
- Hookah: drop Paystack; state the shader component is not yet on the live page.

---

## 4. Publication risks

### Must fix in the client code (not just the copy)
1. **Elatec, order data is world-readable.** `supabase-schema.sql:121-128` grants `SELECT USING (true)` on `orders` and `order_events`. With the public anon key (shipped to every browser, `src/lib/supabase/client.ts:4-6`) anyone can list every customer's name, phone, email and location. Replace with no public policy and serve tracking only via the service-role API, or a `security definer` function keyed on ref. Do **not** publish the current QA claim.
2. **Elatec, enumerable order refs.** `ELT-YYYY-` + 5 random digits (`orderRef.ts:1-5`) and a public `GET /api/orders/[ref]` that returns name, location and amounts = trivially enumerable. Use a long random token for the public tracking URL. Avoid advertising the format.
3. **Elatec, any Supabase user is admin.** Admin routes only check `getUser()` (`api/orders/route.ts:14-19`, `[ref]/route.ts:87-92`, `notifications/whatsapp/route.ts:74-80`); the notifications route lets any signed-in user send arbitrary WhatsApp/SMS (`type: "custom"`).
4. **Noevella, admin users are public-read.** `src/collections/Users.ts:10-12` `read: () => true` exposes staff emails at `/api/users`. Change to `({ req }) => Boolean(req.user)`.
5. **Noevella, open image proxy.** `next.config.mjs:6-8` `remotePatterns: [{ hostname: '**' }]` lets anyone use the site's image optimizer for any host.
6. **GhostNet (public repo), vulnerable Next.js.** `package.json:15` `next 14.2.3` is below 14.2.25, the fix for the middleware authorization bypass (CVE-2025-29927); GhostNet gates pages in `middleware.ts:136-141`. Upgrade before linking the repo from a portfolio.
7. **GhostNet, client-supplied system prompt** (`app/api/ghost/route.ts:38, 73`) makes the endpoint a general proxy on your Groq key for any signed-in user; rate limit is in-memory per instance (:4-9). Already listed as a next step; fine to show.

### Do not publish from the private repos
- **Makeja:** the red-team comments in `middleware.ts:106-124` (states ~150 of ~155 routes hand-roll JWT checks and that `isActive` is not checked in middleware) and `lib/get-prisma.ts:93-95` (`TODO [PENTEST-FIX-3]` header fallback) map remaining weaknesses. The CSRF exclusion regex (`middleware.ts:73`) lists every unauthenticated mutation route. A real client schema name, `tenant_hillux`, appears in `app/api/webhooks/paystack/route.ts` comments. None of these are in the current excerpts; keep it that way and trim comments if you add the webhook snippet.
- **Makeja excerpts as published:** only env var names (`DIRECT_DATABASE_URL`, `PAYSTACK_SECRET_KEY`) and the public Paystack API host. Safe. No secrets found in tracked files (only placeholders in `.env.example` / `README.md`).
- **Noevella:** `src/lib/import-media.ts:4-5` contains a personal Gmail address (`creativelywaithera@…`) of the client contact. Do not excerpt that file. The proposed snippets do not include it.
- **Elatec:** the business phone numbers in `schema.ts:37-48` and `api/orders/[ref]/route.ts:165` are already public on the site, but redact them in excerpts anyway (done above with `…`). Do not publish `supabase-schema.sql` until the RLS policy is fixed.
- **Public repos (GhostNet, Hookah):** `AKIAIOSFODNN7EXAMPLE` in `ghostnet/app/modules/cloud-security/page.tsx:387` is AWS's documented example key, not a leak. No secrets found in Hookah.

### Accuracy risks a technical reviewer would catch
- Elatec and Hookah list features (Sanity, Resend, Paystack, live 3D, live order tracking) that the linked/described code does not use. A reviewer who opens the repo or DevTools will see it. Fix the copy or wire the features first.
- Makeja "24 tables" contradicts the provisioner on inspection.
- Makeja "Groq (Llama)" contradicts `lib/groq.ts`.
