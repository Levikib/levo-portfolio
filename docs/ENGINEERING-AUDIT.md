# Engineering audit: what the portfolio should show

Read-only audit of Levo's repos, done 2026-10-05, to find the strongest real engineering for the case studies. Every item cites a file. Nothing here is invented; claims that could not be verified are marked.

## Makeja Homes (Levikib/makeja-homes)
Scale of the codebase: 407 API route handlers, 200 pages, 24 tables per tenant schema.

1. **Schema-per-tenant multi-tenancy on Postgres.** Every company gets its own Postgres schema (`tenant_<slug>`). `lib/tenant-schema-provisioner.ts` (577 lines) creates the schema, enums and every table in raw SQL, because `prisma db push` cannot run on Vercel's read-only serverless filesystem.
2. **Pooled-connection workaround.** `lib/db/prisma-tenant.ts` routes each tenant through the direct (non-PgBouncer) URL with `options=--search_path` set, because PgBouncer drops the `options` parameter. It keeps a 20-client cache with eviction.
3. **Self-healing schema.** Columns are added with `ADD COLUMN IF NOT EXISTS` heal passes inside routes, because `_prisma_migrations` drifted from production. The reasoning is recorded in `DECISIONS.md` rather than hidden.
4. **Money as integer minor units.** `lib/money.ts` moves listing prices from floating point to BigInt cents, with one rounding rule for the whole path.
5. **Payment reconciliation without cron.** `lib/reconcile-paystack-pending.ts` verifies stale PENDING Paystack payments with Paystack's API whenever a tenant or admin opens the payments view. This closes the "abandoned checkout stays pending forever" bug.
6. **Billing period guard.** `lib/billing-period-guard.ts` blocks bills, water readings or fees for months before a tenant moved in or before the unit existed.
7. **Token revocation.** `lib/token-blocklist.ts`: logout writes the JWT `jti` to an Upstash Redis blocklist with a 25h TTL, longer than the 24h token life, so revocation has no gap.
8. **Njiti AI with memory.** `lib/njiti/memory.ts` keeps raw chat history and a separate distilled memory of durable company facts. Only the distilled memory is injected into prompts, so context does not grow without limit.
9. **Kenya tax engine.** `lib/kenya-tax.ts`: monthly rental income tax (7.5% above KES 288,000 a year), contractor withholding, VAT threshold, county land rates and lease stamp duty.
10. **Cross-schema public listings index.** `lib/listings/sync-index.ts` is the one write-through from tenant schemas into `public.rental_listing_index`. It runs fire-and-forget on every relevant mutation, with a nightly reconciler as a safety net.
11. **Contractor trust score.** `lib/build/trust-score.ts` scores BUILD merchants out of 100 from verification checks (ID, KRA PIN, NCA licence), reviews (only with at least 3 reviews) and completed jobs.
12. **Deterministic anti-slop linter.** `lib/growth/prose-lint.ts` strips AI filler phrases and dashes from outbound emails with no model call, as the final backstop after an AI editing pass.
13. Integrations in `lib/integrations/`: KRA eTIMS e-invoicing, WhatsApp, and the listings feed.

Product numbers supplied by Levo (2026-10-05): 4,500+ tenants, 5,000+ units, 3,000+ leases, 80+ client companies. Note: makejahomes.co.ke still shows older figures (180+ units, 71 leases, 13 clients) and must be updated to match.

## Elatec Safety Systems (Levikib/elatec-web)
18 pages, Next.js 14, Supabase (Postgres with row-level security), Sanity CMS.
1. **Hand-built schema.org layer.** `src/lib/schema.ts` builds Organization, Product and other JSON-LD. Unverified social links are deliberately left out of `sameAs` instead of being invented (see the comment in the file).
2. **Order pipeline.** `src/app/api/orders/route.ts` covers order refs (`ELT-YYYY-NNNNN`), staged order events, an admin list with pagination, and a WhatsApp confirmation.
3. **Category deposit rules.** `src/lib/utils/depositCalc.ts` sets a 30% default deposit, 40% for solar and gate automation.
4. **SMS via Africa's Talking.** `src/lib/africastalking/sms.ts` normalises Kenyan phone formats to E.164.
5. **3D service scenes.** `src/components/3d/` contains Draco-compressed GLB models (camera, solar, shading) in React Three Fiber.
6. Supabase policies: `supabase-schema.sql` has public read of an order by reference only.
Note: this repo looks older than the live site (the projects map with 33 towns is live). Confirm which branch is deployed.

## Noevella Group (Levikib/noevella)
Next.js 16, React 19, Payload CMS 3 on Postgres, Vercel Blob storage, 13 pages, 11 collections (Divisions, Projects, Products, Orders, Inquiries, Insights, Services, TeamMembers, Testimonials, Media, Users).
1. **A full headless CMS the client edits herself**, with typed collections and generated types (`src/payload-types.ts`).
2. **Design DNA locked with the client** in `docs/DESIGN_DNA.md`: clay plus glass panels, sticker cards, a type-on hero, and no WebGL on purpose.
3. **Research-led content plan**: 9 research briefs synthesised into `docs/CONTENT_MASTER_PLAN.md`.
4. **Consent-aware marketing pixels**: `src/components/MarketingPixels.tsx`, `PIXEL_SETUP.md`.
5. A repeatable media import pipeline: the `import-*` scripts in `package.json`.

## Mikono Creations
The GitHub repo is empty: the code was never committed (the playbook confirms this). Evidence comes from the live site and the Foundation Build Playbook: 51 route templates, 79 components, 90 agent calls, three-verifier QA rounds, a custom studio with 23 order types, 47 posts, and all 88 supplied photos used.
Action: commit the Mikono code so the case study can link to real source.

## GhostNet (Levikib/ghostnet)
13 modules confirmed in `app/modules/` (active directory, cloud, crypto, malware, mobile, network, offensive, OSINT, red team, social engineering, Tor, web, wireless). Tool routes: attack path, crypto tracer, CTF, intel, payload, report generator, Shodan, terminal, plus a leaderboard.
- `app/api/ghost/route.ts`: authenticated LLM agent with per-user rate limiting and strict input validation.
- Honest next step: the route accepts a client-supplied system prompt. Move the prompt server-side.
- Unverified: the "243 lab steps" and "5,450 XP" figures on the current site. Keep them off until they are counted from the code.

## Hookah 3D (Levikib/hookah-website)
- `src/components/ExplodeHookah.tsx`: a custom GLSL vertex shader splits the mesh into **5** height bands, each with its own offset, rotation and a wobble at peak. It is driven by one `uProgress` uniform from scroll. Correction: the current site says 7 parts; the code says 5 bands.

## Portfolio itself (this repo)
- Old numbers (247+ tenants, KSH 1.5M) were hard-coded in 6 files. They are replaced by `src/data/facts.ts`.
- The Next.js version was bumped from 14.2.0 to 14.2.35 (security patch).
