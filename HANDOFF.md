# HANDOFF: read this first

Living status doc for Claude sessions working on Levo's portfolio. Read it top to bottom before touching code. **Update it at the end of every session**: move finished items to Done, add new pending items and ideas, and bump "Last updated".

**Last updated:** 2026-10-05 (Claude cloud session)
**Live site:** levis.makejahomes.co.ke (Vercel deploys from `main`). The canonical domain in code is `levikibirie.dev` and is **unconfirmed** (see Pending).
**Repo:** github.com/Levikib/levo-portfolio. `main` and `signal-path` both point at the redesign (fast-forwarded on 2026-10-05).

---

## 1. Who Levo is and how he works

- Levis "Levo" Kibirie, product engineer and designer in Nairobi (EAT, UTC+3). Founder of Makeja Homes (PropTech SaaS, co-founder Angela Wangui). About 4 years as an independent contractor for Sensys, building T24 core banking dev/test environments for banks including NCBA. Runs ShanTech Agency (client sites: Mikono Creations, Elatec Safety Systems, Noevella Group).
- Goal of this portfolio: win senior remote roles (USD) and high-value client builds.
- **Often uses voice input from his phone: keep chat replies to about 3 sentences.**
- Taste: hyper-futuristic, hyper-realistic, **claymorphism**, strict card uniformity, CTAs everywhere, hand-drawn doodle energy, a working terminal. He wants his portfolio to make his client sites look like child's play.
- He wants work done in **parallel agents** in Claude cloud sessions (perfectionist builders + independent QA), with everything committed.

## 2. Non-negotiable rules

1. **Facts:** every number lives in `src/data/facts.ts`. Makeja figures (from Levo, 2026-10-05): **4,500+ tenants, 5,000+ units, 3,000+ leases, 80+ client companies.** Never show monthly money or payment volume. Never invent numbers, clients, quotes or results.
2. **Copy bans:** no em dashes or en dashes in visible copy, and none of: elevate, unlock, seamless, leverage, delve, journey, game-changer, cutting-edge, robust, empower. Plain, confident English.
3. **Claims must match code.** Case studies were fact-checked against the repos (`docs/TECH-FINDINGS.md`, `docs/MIKONO-FINDINGS.md`). Re-verify before adding claims.
4. **Private repos (makeja-homes, elatec-web, noevella):** never publish security weaknesses, internal comments, client names from comments, or personal emails. See "Publication risks" in `docs/TECH-FINDINGS.md`.
5. **A11y/perf floor:** one h1 per page, contrast 4.5:1, tap targets 44px, visible focus, `prefers-reduced-motion` honoured, no horizontal scroll at 390px, server-rendered numbers, no hydration mismatches (see `src/hooks/useIsMobile.ts`, which must return the same value on server and first client render).
6. **Commits:** author `Levis Kibirie <leviskibirie2110@gmail.com>`. End each message with the session attribution lines given in that session's system reminder. Never `git add -A` while parallel agents are editing. Commit and push before ending a session.
7. **Display order of projects** (`ORDER` in `src/data/projects.ts`): Makeja, Mikono, Noevella, Elatec, core banking, GhostNet, levo-cli, **Hookah last** (still in progress).

## 3. How to build locally in the cloud sandbox

The sandbox cannot reach Google Fonts, so `next build` fails on `next/font`. Use a mock:

```bash
cat > /tmp/font-mock.js <<'EOF'
module.exports = new Proxy({}, { get: (_t, url) => typeof url === 'string' ? `@font-face { font-family: 'Mock'; font-style: normal; font-weight: 400; src: url(https://fonts.gstatic.com/s/mock/v1/mock.woff2) format('woff2'); }` : undefined, has: () => true });
EOF
npm ci
NEXT_FONT_GOOGLE_MOCKED_RESPONSES=/tmp/font-mock.js npx next build
npx tsc --noEmit
```

Screenshots: install Playwright in a scratch dir, and use the preinstalled Chromium under `/opt/pw-browsers` (do not run `playwright install`). Fonts render as fallback in the sandbox, so judge layout, colour and depth, not typography.

## 4. Architecture (what exists now)

**Concept: "Signal Path".** An amber signal ribbon wraps a clay sphere in the hero, then draws itself down the page on scroll (`SignalPath.tsx`) and lights each project "station".

| Area | Files |
|---|---|
| Single source of truth | `src/data/facts.ts` (numbers, contacts, `waLink`), `src/data/projects.ts` (case studies, `ORDER`), `src/data/media.ts` (reel/hero slots, `ready` flags), `src/data/editorial.ts` (Editorial items, 15), `src/data/thoughts.ts` (posts, topics, `COMING`, `SUBSTACK_URL`) |
| Design system | `src/app/signal.css` (tokens, clay recipes), `src/components/signal/index.ts` (API docs + exports: `ClayCard`, `ClayButton`, `SectionHeader`, `CtaBand`, `Marquee`). Editorial/Thoughts styles in `src/app/editorial.css` |
| Home | `src/app/page.tsx`: Hero, Signal Path with 8 Stations, Terminal, build process, contact CTA band |
| Case studies | `/work` index, `/work/[slug]` (problem, architecture, decisions, real code, QA, results, next) |
| Editorial | `/editorial` (featured shelf, `?kind=` filter chips), `/editorial/[slug]`, `/editorial/read/[vol]` (Chill Minds flipbook, vol1/vol2, 36 pages each) |
| Thoughts | `/thoughts` (topic filter, coming-soon cards, email/Substack CTA), `/thoughts/[slug]` (long-form layout). How to add a post: `docs/THOUGHTS-WRITING-GUIDE.md` |
| Terminal ("levo-cli") | `src/components/sections/Terminal.tsx`: reads facts/projects, `open <project>` and `work` navigate |
| Redirects | `next.config.mjs`: `/blog` → `/thoughts`, `/store` → `/editorial?kind=product` |
| Legacy (not yet redesigned) | `/about` (old purple/cream style), `src/app/mobile.css`, `src/components/ui/CustomCursor.tsx`, `WhatsAppFloat.tsx` |

**Reference docs in `docs/`:** `ENGINEERING-AUDIT.md`, `TECH-FINDINGS.md` (claim verification + publication risks), `MIKONO-FINDINGS.md`, `STRATEGY.md` (positioning, hero copy options, top 5 conversion changes), `MEDIA-REPOS.md` (what media was picked/rejected and why), `QA-REPORT.md` (first QA pass), `THOUGHTS-WRITING-GUIDE.md`, `design-screens/` and `qa-screens/` (screenshots).

## 5. Done (2026-10-05)

- Engineering audit of all repos; case studies fact-checked and corrected (Makeja: 40+ tables per tenant, gpt-oss-120b with fallbacks, M-Pesa via Paystack, migration runner, signed webhook; Elatec: claims trimmed to what is wired; Hookah: marked in progress; Noevella: pixels are not consent-gated).
- Mikono case study rewritten from its repo (132 components, 29 order types, 51 routes, 47 posts, 294 tests).
- Signal Path home, clay design system, uniform cards, CTAs at the end of every section.
- Editorial: 15 items (2 Chill Minds magazines + 12 pieces of Makeja, Smokers Vine/Hookah and Mikono media from the repos, about 11.7 MB).
- Thoughts section and writing guide (no posts yet, by design: Levo writes them).
- QA fixes: hydration bug, contrast, tap targets, landmarks, og images, title template, copy bans.
- Merged to `main` (fast-forward `87ae7b5..b27f98c`). **Not yet confirmed that Vercel deployed it.**

## 6. Pending (priority order)

1. **Confirm the Vercel production deploy** of `b27f98c` and smoke-test the live site on a phone.
2. **Full independent QA pass** on every route (was cancelled twice). Gates: console/hydration, links and redirects, facts, axe, mobile screenshots, media privacy, copy bans, SEO. Write `docs/QA-FINAL.md`.
3. **Laptop content audit for Editorial** (needs the desktop app open and the computer linked). Folders Levo granted:
   `C:\Users\admin\Documents\ShanTech Projects\Animated Videos Portfolio`, `...\Documents\Professional Documents`, `...\Documents\Sammy Quotations`, `...\Documents\Job Quotations`, `...\Documents\Makeja Homes Files`, and `C:\Users\admin\Downloads` (look for files named with "makeja"). Find finished design work: business profiles, invoices/quotation designs, posters, Makeja social posts and videos, other brands. **Redact or mock any client names, amounts, phones, emails or IDs** before publishing. Append items to `src/data/editorial.ts`, optimise media into `public/editorial/<brand>/`.
4. **Domain:** confirm `levikibirie.dev` vs `levis.makejahomes.co.ke`, then set `SITE.url` in `facts.ts` and the canonicals.
5. **Media to produce** (slots in `src/data/media.ts`; flip `ready: true` when files land): hero Veo loop (1:1, 6s), illustrated avatar from next week's photoshoot, one reel per project (CapCut screen recordings, filenames listed in `media.ts`). Task still open: write the Veo / Google AI Studio prompts and a CapCut shot list.
6. **Redesign `/about`** in the clay system (still the old style), and clean up `src/app/mobile.css` (it overrides heading sizes and `wa.me` links; `signal.css` currently fights it).
7. **Core banking case study** is thin: needs 1 to 2 shareable results from Levo and confirmation of what can be said about clients.
8. **Hero and CTA strategy** from `docs/STRATEGY.md`: add a "Hiring? Get my CV" path (CV PDF needed), pick hero copy option A or B.
9. **levo-cli:** publish `npx levo` to npm (own repo), then restore the npm mention in the case study. Restyle the terminal's command buttons to the clay system.
10. **Thoughts:** Levo will give topics and voice notes; write posts from them as `status: "draft"` for his approval. Set `SUBSTACK_URL` once the Substack exists.
11. **Makeja's own site** still shows old numbers (180+ units, 71 leases, 13 clients): update to match `facts.ts`.
12. **Real typography check** on the live site (fonts were mocked during the build).

## 7. Issues found in Levo's other repos (tell him; fix only if asked)

- **Elatec (`elatec-web`), security:** the Supabase policy `USING (true)` on `orders` and `order_events` lets anyone read every customer order (`supabase-schema.sql:121-128`). Admin API routes accept any signed-in user. Order refs can be guessed.
- **GhostNet:** Next.js 14.2.3 has a middleware authorization bypass (CVE-2025-29927); upgrade to 14.2.25 or later. The client can send its own system prompt to the Groq route.
- **Noevella:** `Users` collection is public-read (staff emails exposed at `/api/users`); the image optimiser allows any host; `[DEMO]` labels are still on shop items.
- **Mikono:** the last committed mobile QA check fails; the README still says 23 order types (it is 29).
- **Hookah:** the explode shader component is not mounted on the live page.

## 8. Ideas parked for later

- Make the hero centrepiece a real lightweight 3D clay object (R3F) once the Veo loop exists, with a still fallback.
- "Engine room" easter egg: the signal ribbon plugs into the terminal at the end of the path.
- Digital products in Editorial (templates, UI kits, Framer templates) with real checkout once they exist.
- A Framer marketplace template based on the Mikono clay plus scrapbook style.
- Case study for ShanTech Agency and Chill Minds as design-led stations.
