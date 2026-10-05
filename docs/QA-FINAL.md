# QA-FINAL: independent reality check

**Date:** 2026-10-05 · **Branch:** `signal-path` · **Build:** `next build` (fonts mocked) + `next start -p 3400`
**Tooling:** Playwright 1.56 + Chromium (`/opt/pw-browsers`), `@axe-core/playwright` 4.13, PIL, ffprobe/ffmpeg.
**Scope:** all 40 sitemap routes (`/`, `/work`, 8 `/work/*`, `/editorial`, 24 `/editorial/*`, `/editorial/read/vol1`, `vol2`, `/thoughts`, `/about`) plus `/editorial?kind=social`, `/blog`, `/store`, each at 1440x900 and 390x844 (82 page loads).

Note: the sitemap and `src/data/editorial.ts` hold **24** Editorial items, not 25 (HANDOFF said 25).

## Gate table

| Gate | Result | Evidence |
|---|---|---|
| G1 console / hydration | **PASS** | 0 errors, 0 hydration warnings, 0 page errors, 0 HTTP 4xx/5xx on all 82 loads. The only console output is `Failed to decode downloaded font` from the sandbox font mock (not present in production). |
| G2 links / redirects | **PASS** | 116 unique internal hrefs all return 200 after redirects; 0 `href="#"` or empty. Fragment targets `#path #terminal #contact #cs-cta #browse #gallery #subscribe` all exist. `/blog` 307 to `/thoughts`, `/store` 307 to `/editorial?kind=product` (200). |
| G3 facts | **PASS (page copy)**, see remaining issue 2 | Every rendered number next to tenants/units/leases/clients is 4,500+ / 5,000+ / 3,000+ / 80+ (home, /work, /work/makeja-homes, /about). No 247, 1.5M, 5,450, 243 or "7 parts" in any rendered text; no money-volume claims in source. |
| G4 a11y | **PASS** | axe serious/critical = 0 on all 82 loads. Exactly one h1 on every route. Filter chips are `button[aria-pressed]`. All videos are `muted`; editorial films are `aria-hidden` duplicates of a next/image poster carrying the alt, and stage films have labelled Play/Pause buttons. Reduced motion: 0 running animations on `/` and `/editorial`, all 15 editorial videos stay paused. |
| G5 mobile 390x844 | **PASS** | `scrollWidth - clientWidth = 0` on every route. All tap targets 44px or larger (the WhatsApp float measured 42px only mid entrance animation at scale 0.8; settled size is 52x52). Screenshots of the 7 listed routes reviewed. Hero orb now shows Levo's portrait: face centred, not cropped, ring and badges clear of the face at 1440 and 390. |
| G6 media | **PASS after fixes** | 71 media entries in `editorial.ts`: every file exists, declared w/h equals real dimensions (PIL/ffprobe), page folders hold the declared count, posters match video aspect, all videos H.264 with no audio track. All rendered `<img>` load (slow-scroll check: 0 unloaded). Poster frames plus frames at 20/50/85% of every film reviewed by eye. Two private-data leaks found and fixed (below). |
| G7 copy bans | **PASS** | 0 em/en dashes and 0 banned words in rendered text of every route, and in SSR HTML including attributes (alt, aria-label, meta). Only hit in source is the hidden terminal alias `journey` (not visible copy). |
| G8 SEO | **PASS** | Every route has a unique title and a description of 160 chars or fewer (max 158, `/about`), canonical on `https://levis.makejahomes.co.ke`, and `og:image`. `/editorial?kind=social` shares `/editorial`'s title by design and canonicals to `/editorial`. |

## Fixes made

1. **Private data in the web revamp film** (`public/editorial/makeja/makeja-web-revamp.mp4`): the screen recording showed a Google account chooser with three personal Gmail addresses, a signed-in enquiries page with an email, Claude Code terminals discussing quotations and personal email, the Claude chat history sidebar, the Windows start menu, and old Makeja numbers (180+ units, 71 leases, 13 clients). Removed the film and its poster from `public/` and from the gallery; renamed the item to match what remains.
   - `src/data/editorial.ts:284` title "Agents ad and command centre film"
   - `src/data/editorial.ts:288` blurb now describes the agents ad and the command centre reveal
   - `src/data/editorial.ts:291-293` gallery entry for `makeja-web-revamp.mp4` removed
2. **Third-party phone number** in `public/editorial/chillminds/chillminds-get-magazine.mp4`: from 8.5s to the end it showed "0711281778 Nurse Liz". Re-cut to the first 8.2s (H.264, no audio, same 1280x720, `editorial.ts:319` dimensions unchanged).

## Remaining issues (need Levo)

1. **Njiti poster says "Powered by Claude"** (`public/editorial/makeja/makeja-poster-7.webp`, shown on `/editorial/makeja-feature-posters`). Njiti does not run on Claude (see `docs/TECH-FINDINGS.md`), so the image makes a false claim. Re-export the poster with the right model line or drop it from the series.
2. **Makeja site screenshot shows old numbers**: `public/work/makeja-screenshot.png` (home station and `/work/makeja-homes`) shows 180+ units, 71 leases, 13 clients, contradicting `facts.ts`. Resolves when the Makeja site is updated (HANDOFF pending item) and re-screenshotted. The banner `makeja-banner.webp` and Njiti poster also show mock UI figures (KES 4.5M, KES 2.1M, revenue KES 3.8M); they read as mock data but are money figures, so consider swapping.
3. **Business phone numbers in client artwork**: Gloss & Glow logo (0720574203, 0742171884), Prime Touch ad (+254715606099), Makeja poster 1 (+254 796 809 106 next to Levo's number). These are the brands' published contact numbers, not private data, but confirm the clients are fine with them appearing in a portfolio.
4. **Re-cut a clean web revamp film** if Levo wants it back: record only the public Makeja site, in a clean browser profile, after the numbers are updated.
5. **Old files remain in git history**: the removed film is still in earlier commits of a public repo. If the emails matter, rewrite history or accept the exposure.
6. **Chill Minds flipbook pages** (72 pages) were checked for load, count and dimensions, not read page by page for private data. They are the published magazines, but a read-through for phone numbers or student names is still worth doing.
7. HANDOFF said 25 Editorial items; there are 24.
