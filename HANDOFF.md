# HANDOFF: read this first

> **New Claude session or new Claude account? Start here.** This file plus `docs/` is the complete memory of the project; the earlier chat history is NOT available to you. Read sections 0, 1, 2 and 6, then do "Next session: first moves".

**Last updated:** 2026-10-06 morning (end of the first Claude account's session; Levo is moving to a second Claude account because the first hit its weekly limit)
**Live site:** levis.makejahomes.co.ke (Vercel auto-deploys `main`). All canonicals, sitemap and OG URLs use this domain (`SITE.url` in `src/data/facts.ts`).
**Repo:** github.com/Levikib/levo-portfolio. Work on `signal-path`, then fast-forward `main` to it (`git push origin signal-path && git push origin signal-path:main`). Both are identical right now.

---

## 0. Start here (new account)

**What this is:** Levo's personal portfolio, rebuilt in October 2026 as "Signal Path". It is a dark claymorphism site: an amber signal ribbon draws down the page through 8 project stations, deep case studies, an Editorial gallery of his design and motion work, a Thoughts blog section and a working terminal. It is live.

**Setup in a fresh cloud session:**
1. The GitHub account `Levikib` must be connected to this Claude account (claude.ai connectors / GitHub app). Then attach the repos you need: `levo-portfolio` (push), and read-only for context: `makeja-homes` (private), `noevella` (private), `elatec-web` (private), `mikono-creations`, `ghostnet` and `hookah-website` (public).
2. `git clone https://github.com/Levikib/levo-portfolio && cd levo-portfolio && git checkout signal-path && npm ci`
3. Build with the Google Fonts mock in section 3 (the sandbox can't reach Google Fonts).
4. Levo's laptop (Windows, desktop app) can be linked to the session. Folders he has granted before: `C:\Users\admin\Downloads`, `Documents\Makeja Homes Files`, `Documents\Professional Documents`, `Documents\ShanTech Projects\Animated Videos Portfolio`, `Documents\Job Quotations`, `Documents\Sammy Quotations`. A new session must request them again. The laptop has ffmpeg, pdftoppm and ImageMagick in its shell: encode media there, then stage only the small outputs.

**Next session: first moves (in this order):**
1. **Hero avatar.** Levo does NOT want his real photo in the hero (removed 2026-10-06). He is generating a cartoon/clay character of himself in Google AI Studio on a chroma-green background plus a transparent PNG, using `docs/MEDIA-PROMPTS.md` section 1. When the files land in `Downloads\portfolio-media\`, wire them in (Wiring section of that doc). Until then the hero orb shows the clay `>_` key, which is fine.
2. **Product reels.** All 8 reel slots are empty (inventory table in `docs/MEDIA-PROMPTS.md` section 0). The plan is a screenshot of the live page, then an AI Studio device mock-up, then Veo image-to-video, with per-product prompts in section 3. Help Levo take the screenshots (Claude in Chrome or Playwright against the live sites), then wire the videos in. Hookah goes last.
3. **Pixel-clay experiment** (section 10 below): Levo wants to explore it on a separate branch, not on `main`.
4. Then continue the Pending list (section 6).

**How to talk to Levo:** he is often on his phone using voice input, so keep replies to about 3 sentences. He likes parallel agents in cloud sessions, perfectionist builders and an independent QA pass, with everything committed and pushed. Before ending any session: update this file, commit, push both branches.

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
| Single source of truth | `src/data/facts.ts` (numbers, contacts, `waLink`), `src/data/projects.ts` (case studies, `ORDER`), `src/data/media.ts` (reel/hero slots, `ready` flags), `src/data/editorial.ts` (Editorial items, 25), `src/data/thoughts.ts` (posts, topics, `COMING`, `SUBSTACK_URL`) |
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
- Merged to `main` and **live**: Vercel production deploy succeeded (`cf9faa9`) and levis.makejahomes.co.ke/work/makeja-homes serves the new case study.

- Laptop audit done (2026-10-05): 10 Editorial items added from Levo's laptop (Makeja feature posters x10, square social videos x4, agents ad, web revamp film, command centre reveal, comic cast, banner; Chill Minds campaign films; ShanTech identity, films, business card and proposal; Kivulini Cabins proposal and film; Prime Touch ad; Care and Gloss & Glow logos). Videos cut to 20s previews, H.264, no audio. Working copies are in `C:\Users\admin\Downloads\portfolio-editorial-export`.
- **Deliberately excluded** from the laptop: ID cards, certificates, KRA/TCC docs, transcripts, cover letters, CVs (pending Levo's OK), everything in Job Quotations and Sammy Quotations (bank details and third-party pricing), the Makeja corporate legal documents, pitch-deck financials, the "Her Prettiness Mio" birthday book (private person), and the health explainer videos (not reviewed yet, see Ideas).
- Hero photo removed 2026-10-06 at Levo's request (he wants a generated cartoon avatar instead). The orb shows the clay `>_` key until the avatar lands.
- AI generation prompts written: `docs/MEDIA-PROMPTS.md`, also saved to `C:\Users\admin\Downloads\PORTFOLIO-MEDIA-PROMPTS.md`.
- **Full independent QA pass: done** (`docs/QA-FINAL.md`). All 8 gates pass on 40 routes at 1440 and 390; fixed two private-data leaks (web revamp film removed, Chill Minds promo trimmed before a third-party phone number). Editorial has 24 items, not 25.

- Post-QA: dropped Makeja poster 7 (it said Njiti is powered by Claude) and the old Makeja screenshot (outdated numbers).

## 6. Pending (priority order)

1. Smoke-test the live site on a real phone (layout, fonts, videos).
2. **QA follow-ups for Levo** (details in `docs/QA-FINAL.md`): poster 7 and the old Makeja screenshot were already removed (2026-10-05); confirm clients are fine with their business phone numbers in artwork (Gloss & Glow, Prime Touch, second number on poster 1); the removed web revamp film is still in git history; read the 72 Chill Minds pages for private data; re-record a clean web revamp film if wanted.
3. **Laptop audit: done.** Optional extras still on the laptop: the comic strip zips (`Downloads/Makeja Marketing Comic Strip 1.zip`, `2.zip`), `Makeja Homes Outro 1.mp4`, `A_heavy_drop_of_black_sumi_ink.mp4`, Tutorials 2 to 4 and the health explainer animations in `Animated Videos Portfolio` (Contraception, Menopause, PMS, Lower Cancer Risk, Patience Family Matters, Abel Breaking Barriers): ask Levo before using the health ones.
4. **Domain:** done. Everything points at levis.makejahomes.co.ke (`levikibirie.dev` was never registered). If Levo buys a personal domain later, change `SITE.url` and add it in Vercel.
5. **Media to produce:** see section 0, "first moves" 1 and 2, and `docs/MEDIA-PROMPTS.md` (rewritten 2026-10-06: inventory table, avatar on a chroma-green background, Veo reel prompts per product, OG image, Thoughts covers, wiring steps). An older copy of the prompts sits at `Downloads\\PORTFOLIO-MEDIA-PROMPTS.md` on the laptop; the repo version is the current one.
6. **Redesign `/about`** in the clay system (still the old style), and clean up `src/app/mobile.css` (it overrides heading sizes and `wa.me` links; `signal.css` currently fights it).
7. **Core banking case study** is thin: needs 1 to 2 shareable results from Levo and confirmation of what can be said about clients.
8. **Hero and CTA strategy** from `docs/STRATEGY.md`: add a "Hiring? Get my CV" path. A CV exists on the laptop (`Professional Documents/Levis_Kibirie_CV_2026_v2.pdf`) but it has personal contact details: ask Levo before publishing it. Pick hero copy option A or B.
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

## 9. Open decisions for Levo

- The removed web-revamp film (personal Gmail accounts visible) is still in the public repo's git history. Scrubbing it needs a history rewrite and force-push of `main`: only with Levo's explicit OK.
- Re-export Makeja poster 7 with the correct AI line (Groq) if he wants it back.

## 10. Pixel-clay experiment (Levo's idea, 2026-10-06)

Brief he supplied: `docs/ideas/pixel-clay-brief.md`. The idea is to merge pixel-art geometry with claymorphism lighting: stepped pixel corners via an SVG `clipPath`, hard offset drop shadows plus clay inner highlights, cards that press in like hardware buttons, a CRT scanline overlay on the terminal, optional R3F voxel models in the reels, and stepped (frame-limited) animation.

**Engineering notes for whoever builds it:**
- Do it on a new branch `pixel-clay`, behind a single CSS class on `<html>` (e.g. `data-skin="pixel"`), so it can be compared side by side with the current skin and switched off instantly.
- **Gotcha:** `clip-path` clips `box-shadow`, so the brief's recipe (clip-path plus outer drop shadow on the same element) will cut off the drop shadow. Build the stepped outline and drop shadow from a pseudo-element or an inline SVG frame behind the card, and clip only the inner surface.
- Do NOT apply `-webkit-font-smoothing: none` or `image-rendering: pixelated` to body text or photos: it wrecks readability and accessibility. Use pixelated rendering only on deliberate pixel assets (icons, sprites, voxel renders).
- Stepped easing (`steps(3)`) only for decorative micro-motion; keep page transitions and focus states smooth. Honour `prefers-reduced-motion`.
- The CRT shader for the terminal can be pure CSS first (repeating-linear-gradient scanlines, slight curvature via an SVG filter). Only use WebGL if the CSS version falls short, and keep it lazy-loaded.
- R3F voxel models for reels: a nice later phase. Start with one (e.g. a voxel Makeja tower) and keep the home page JS budget in check.
- Prototype order: one card plus one button plus the terminal bezel → screenshots at 390 and 1440 → show Levo → decide whether to roll it out.

## 11. Makeja social content (2026-10-08)

- Claude Doc "Social Content Pack: Mikono + Makeja Tutorials": https://claude.ai/code/artifact/641367bc-c8eb-434a-8116-0065455bb430
  - LinkedIn post for the Mikono showcase video (trimmed file on the laptop: `Downloads\Mikono Video - LinkedIn.mp4`).
  - Per-platform posts for the 6 Makeja tutorials in the "Real Estate OS" voice, with a posting schedule (Oct 9 to Oct 21).
  - "Tutorial posters + Veo films": a poster prompt (AI Studio), a 6s Veo concept prompt, outro tagline and caption with the tutorial link, for all 6 tutorials. Leases Management goes first.
- Open: trial length (30 vs 14 days, doc comment); the pitch deck has 21 em dashes (cleanup offered, not approved).

## 12. Portfolio media pack (2026-10-09)

- Claude Doc "Portfolio Media Pack": https://claude.ai/code/artifact/b2aa399c-dc9f-4580-bb50-a87475b09614 (supersedes docs/MEDIA-PROMPTS.md for prompts).
- 13 files: avatar (green, transparent, 4 poses), hero loop, og-image, 7 Veo reels, Hookah screen recording last.
- Makeja and core-banking reels are pure concept (no screenshots). The Makeja reel file name is now `makeja-reel-16x9-10s.mp4`; update `REELS["makeja-homes"].src` when wiring.
- Levo drops files in `C:\Users\admin\Downloads\portfolio-media\` and says "media is ready" → stage, compress (ffmpeg line in docs/MEDIA-PROMPTS.md), wire in src/data/media.ts, build with the font mock, push signal-path and main.
- 2026-10-09 DONE: 6 reels + avatar (public/media/levo-avatar.webp, cropped from AI Studio art) + new og-image.png wired and live. Core banking REMOVED for good (Levo: not his work); Hookah hidden (kept in ALL, out of ORDER) until the shader ships. Type scale compacted ~30% site-wide (signal.css tokens + editorial.css). Hero loop video still not made (optional).
