# Portfolio strategy

Positioning and copy review for Levis "Levo" Kibirie's portfolio. Written 2026-10-05.
Every number below comes from `src/data/facts.ts` or `src/data/projects.ts`. Any fact pulled from a source repo cites the file. Nothing here is invented.

---

## 1. Positioning

**One line:** A product engineer who designs and ships the whole thing, from the database schema to the pixel, and has the production SaaS and banking work to prove it.

### Audience A: hiring managers for senior remote roles (USD)

What they must believe in 10 seconds:

1. **He has owned a real production system end to end.** Makeja: 4,500+ tenants, 5,000+ units, 3,000+ leases, 80+ client companies.
2. **He handles hard backend problems, not just UI.** Schema-per-tenant Postgres, payment reconciliation, token revocation.
3. **He works in high-stakes environments.** Four years on Temenos T24 core banking environments for banks including NCBA.
4. **He can work remotely with them.** Time zone, written decisions (`DECISIONS.md`), fast replies.

What they scan for and do not find today: a CV, a GitHub link next to the contact buttons, and a one-line "what I want next" (role type, stack, remote).

### Audience B: business owners commissioning a build

What they must believe in 10 seconds:

1. **He builds sites that sell, not brochures.** Elatec takes deposits and bookings; Mikono turns visitors into WhatsApp orders.
2. **He has a process that does not slip.** Strategy, two prototypes, three QA gates.
3. **The result looks premium and runs on cheap phones.**
4. **He is easy to start with.** WhatsApp, reply within a day, Nairobi based.

**Tension to manage:** the home page currently speaks mostly to Audience B (WhatsApp first CTA, "How a site gets built here"). Audience A is the higher value one in USD. Fix this with a two-door split, see section 4, change 1.

---

## 2. Hero copy

Both fit the existing layout: "Hey, I'm" / **LEVO.** / role line / lede / two CTAs. Ledes are under 45 words.

### Option A: lead with proof (recommended for job search)

- **Role line:** Product engineer · Designer · SaaS founder (keep as is)
- **Lede (38 words):** I design and build software people rely on every day. My platform, Makeja Homes, runs 5,000+ rental units for 80+ property companies. Before that and alongside it, four years building core banking test environments. Nairobi based, remote ready.
- **CTAs:** "See the work ↓" and "Hiring? Get my CV ↗"

### Option B: lead with what he does for you (recommended for client work)

- **Role line:** Product engineer · Designer · Founder
- **Lede (39 words):** I take an idea from first sketch to live product, and I check every step before it ships. I built Makeja Homes, now used by 80+ property companies, and sites that take real orders for Kenyan businesses.
- **CTAs:** "See the work ↓" and "Start a project ↗"

Note on the current lede: "systems that move real money" is fine, but keep it vague. Do not add any money volume figure.

---

## 3. Projects (in display order)

### 01 Makeja Homes

- **Tagline (11 words):** Property management software built for how Kenyan landlords actually work.
- **Summary (45 words):** A multi-tenant SaaS where each property company gets its own Postgres schema. Leases are signed online, bills go out in one click, and Paystack payments reconcile themselves. 4,500+ tenants, 5,000+ units and 80+ client companies run on it today.
- **Hiring manager should notice:** He chose schema-per-tenant isolation, then solved the hard parts it caused (Prisma limits, PgBouncer, provisioning) and wrote every call down.
- New fact available for the case study: QuickBooks Online sync per client over OAuth2 (`makeja-homes/README.md`, Tech Stack and Integrations Hub). Not yet in projects.ts.

### 02 Mikono Creations

- **Tagline (12 words):** A crochet toy shop that takes custom orders straight into WhatsApp.
- **Summary (44 words):** Built from five zips of photos and a founder story. A shop, a custom order studio with 23 order types, gift and size finders, and hand-drawn animals with a strict motion budget. Every one of the 88 supplied photos is used and labelled.
- **Hiring manager should notice:** He turned a messy brief into a repeatable, gated process (prototypes, verifiers, scripted checks) and refused to invent prices.

### 03 Noevella Group

- **Tagline (12 words):** An agency site the founder runs herself, with no developer needed.
- **Summary (42 words):** Five divisions told as one integrated team. Payload CMS lives inside the Next.js app with 11 typed collections, so work, journal posts and shop products are all self-serve. Nine research briefs shaped the message before any layout was built.
- **Hiring manager should notice:** Content modelling and a CMS chosen for the client's daily use, not the developer's taste.
- Verified: Next.js 16.3.6, React 19.3.0, Payload 3.90.2 (`noevella/package.json`). The core message "one integrated team" is in `noevella/docs/CONTENT_MASTER_PLAN.md`.

### 04 Elatec Safety Systems

- **Tagline (11 words):** A security and solar installer that now sells and books online.
- **Summary (44 words):** A real shop with category-based deposits (30% default, 40% for solar and gate automation), bookings, SMS and WhatsApp confirmations, and order tracking by reference. Hand-written structured data for local search, with 3D product scenes for cameras, solar and shading.
- **Hiring manager should notice:** Small, correct business rules in code (deposit maths rounds up, public reads limited by row-level security).

### 05 Core banking environments

- **Tagline (11 words):** Four years building the test environments banks trust before release.
- **Summary (30 words):** As an independent contractor for Sensys, I build and run Temenos T24 development and test environments for financial institutions, including NCBA. Banks test against them without touching production.
- **Hiring manager should notice:** Long-term trust in a regulated, zero-error domain. This is the strongest senior signal on the site and it currently has the least content (see section 5).

### 06 GhostNet

- **Tagline (11 words):** A security training platform with its own AI assistant built in.
- **Summary (37 words):** Thirteen modules from OSINT to Active Directory, eight standalone tools, a leaderboard and GHOST, an LLM assistant that only answers signed-in users, with per-user rate limits and hard caps on input size.
- **Hiring manager should notice:** He thinks about abuse of AI features (auth, limits, input caps), not just the happy path.

### 07 levo-cli

- **Tagline (10 words):** The terminal on this site, built as its own small product.
- **Summary (38 words):** A command parser with history, tab completion and man pages. Commands like open, work and hire move you around the site. It reads the same facts file as every page, so it never shows a different number.
- **Hiring manager should notice:** One source of truth shared across two interfaces. Small, but it shows taste for clean data flow.

### 08 Hookah 3D

- **Tagline (11 words):** One 3D model that splits apart on scroll, all on the GPU.
- **Summary (33 words):** A rental and booking site whose hero model splits into 5 bands with a custom vertex shader. A single scroll value drives the effect both ways, with no extra models or draw calls.
- **Hiring manager should notice:** He can write GLSL and reach for the GPU when it is the simplest answer.

---

## 4. Five highest-impact changes

| # | What | Why | Effort |
|---|------|-----|--------|
| 1 | **Two doors in the hero and contact block.** "Hiring for a role" (CV download, LinkedIn, GitHub, email) and "Need a build" (WhatsApp, email). | The contact block leads with WhatsApp, which suits Kenyan clients but reads as informal to a US or EU hiring manager. No CV, GitHub or LinkedIn link is on the home page. Each audience should see its own next step without scrolling. | S |
| 2 | **Fill the core banking case study.** Add 2 or 3 shareable specifics (how many environments, refresh or setup time, what you own end to end, what can be said about clients) once Levo confirms them. | It has no decisions, QA, results or next steps, and the stack is generic ("Linux", "Databases"). For senior roles, regulated banking work is the second biggest proof after Makeja. Right now it looks thin. | M |
| 3 | **Ship the reels and hero media.** Every `ready` flag in `src/data/media.ts` is `false`, so every station shows a placeholder or a still. | A 10 second clip of a real dashboard or a real WhatsApp order is the fastest proof for both audiences. Placeholders on a portfolio cost trust. Start with Makeja and Mikono. | M |
| 4 | **Add a short "What I want next" line plus a results strip per case study.** One line under the hero or on /about: senior product or full-stack roles, remote, TypeScript, Next.js, Postgres. On each case study, lift the best 1 or 2 results to the top. | Recruiters filter by role fit in seconds. Results currently sit near the bottom of each case study after problem, architecture and decisions. | S |
| 5 | **Fix the trust gaps before sharing the link.** Update makejahomes.co.ke figures (audit notes it still shows 180+ units, 71 leases, 13 clients); fix the GhostNet client-supplied system prompt before listing it as a "next" step; confirm the production domain (`SITE.url` has a TODO, `levikibirie.dev`); remove "KSH flows daily" from the terminal `makeja` command in `src/components/sections/Terminal.tsx`. | A hiring manager who clicks through to Makeja and sees older, smaller numbers will doubt every number. A public note that a live AI route trusts the client is an invitation to test it. The terminal line hints at money volume, which is off limits. | S |

Close runner-up: link the Makeja repo, or a curated public excerpt of it, from the case study. No Makeja project has a `repo` field, and code a reviewer can open beats code quoted on a page.

---

## 5. Copy issues in `projects.ts`

Checks run: no em dashes or en dashes found, and none of the banned filler words appear in projects.ts, Hero.tsx or page.tsx.

| # | Quote | Issue | Fix |
|---|-------|-------|-----|
| 1 | Makeja tagline: "The real estate operating system for African landlords." | Makeja serves Kenya (KRA, M-Pesa, eTIMS). "African" overstates reach and "operating system" is a buzz phrase. | "Property management software built for how Kenyan landlords actually work." |
| 2 | Makeja qa: "Kenya tax module encodes MRI withholding, ..." | "MRI" is unexplained jargon for a non-Kenyan reader. | "Kenya tax module covers monthly rental income tax, contractor withholding, ..." (`lib/kenya-tax.ts` per ENGINEERING-AUDIT.md) |
| 3 | Makeja next: "M-Pesa STK push as the default rent rail." | The Makeja README already lists "M-Pesa STK Push" in the stack (`makeja-homes/README.md`, Tech Stack). Reads as if it does not exist yet. | "Make M-Pesa STK push the default way tenants pay rent." |
| 4 | Mikono stack: "90 orchestrated AI agents" | ENGINEERING-AUDIT.md says "90 agent calls". Calls and agents are not the same claim. | "90 orchestrated agent runs" (or confirm the right word with Levo). |
| 5 | Mikono summary: "for a women-led craft business" | Not verifiable from any repo here. | Keep only if Levo confirms; otherwise "for a Nairobi craft business". |
| 6 | Mikono qa: "SEO crawl of 121 pages with zero blocking issues." | Source is the playbook, not available to verify here. | Keep if the playbook confirms it; it is a strong line. |
| 7 | Elatec problem: "A company with 15+ years of installs" | The Elatec site says "15+ years of combined industry experience" (`elatec-web/src/app/(public)/about/page.tsx`). The company itself may be younger. | "A team with 15+ years of combined experience had no way to sell equipment, take deposits or show proof of work online." |
| 8 | Elatec stats and results: "33 towns with real projects" | The audit notes the repo is older than the live site, so this is only verified on the live site. | Confirm which branch is deployed; keep if live. |
| 9 | Noevella tagline: "Five divisions, one integrated team, one site the founder edits herself." | Good idea, but three clauses; long for a station card. | "An agency site the founder runs herself, with no developer needed." |
| 10 | Noevella next: "Remove demo labels from shop items before launch." and "Move from a Gmail address to a domain email." | These are client to-dos, not engineering next steps. They make a live client look unfinished in public. | Replace with an engineering next step, or leave `next` empty. |
| 11 | Core banking stack: "Linux", "Databases", "Environment provisioning" | Generic and unverified. A senior reviewer reads this as filler. | Replace with the real tools once Levo confirms them (OS, database engine, scripting, CI). |
| 12 | Core banking `results`, `decisions`, `qa`: all empty | The station renders as a stub. | See section 4, change 2. |
| 13 | levo-cli tagline: "A real terminal for exploring my work, in the browser and in yours." | "and in yours" claims an npm package that is not published yet. | "The terminal on this site, built as its own small product." Add the npm line when it ships. |
| 14 | GhostNet summary: "for authenticated operators" | Jargon; "operators" is in-world language. | "for signed-in users". |
| 15 | GhostNet next: "Move the agent's system prompt to the server so clients cannot change it." | Publicly flags a live weakness. | Fix it first, then move it to `decisions` as "System prompt lives on the server". |
| 16 | Hookah 3D summary: "A rental and booking site" | Fine, but `kind` is "Lab · WebGL" while the summary describes a commercial site. Pick one. | If it is a client or real product, change `kind`; if a lab, drop "rental and booking". |

### Unverified, needs Levo

- "women-led" (Mikono), "SEO crawl of 121 pages" (Mikono), "90 orchestrated AI agents" vs "90 agent calls".
- "33 towns" (Elatec), live site only.
- Any concrete core banking result.
- Production domain for `SITE.url`.
