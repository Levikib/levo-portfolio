# QA Report: signal-path

Date: 2026-10-05. Build: `next build` (Google Fonts mocked) passed, 21 static pages. Production server on :3100, run from a throwaway copy. Tools: curl + BeautifulSoup over the raw HTML of all 14 routes, Playwright with a bundled Chromium (@sparticuz/chromium; the Playwright CDN is blocked), and @axe-core/playwright.

Routes checked: `/ /about /blog /editorial /store /work /work/{makeja-homes, mikono-creations, noevella-group, elatec-safety-systems, core-banking, ghostnet, levo-cli, hookah-3d}`

## Summary

| Gate | Verdict | Count |
|---|---|---|
| G1 Placeholder / fake content | PASS | 0 blocking (reel/hero slots are intentional, listed below) |
| G2 Links | PASS (1 warning) | 0 broken, 0 `#`/empty hrefs; /about and /store have no inbound links |
| G3 Number consistency | PASS | 0 mismatches, 0 banned numbers visible |
| G4 Server-rendered stats | PASS | 4/4 on `/`, 4/4 on `/work/makeja-homes` |
| G5 Accessibility | **FAIL** | hydration failure on 2 routes; contrast on 7/8 audited routes; no `<main>` on 4 routes |
| G6 SEO | **FAIL** | 8 case studies lack og:image and the brand suffix in the title; 9 descriptions over 160 chars |
| G7 Mobile | **FAIL** (minor) | no horizontal scroll; 1 overlap; many tap targets under 44px |
| G8 Copy bans | **FAIL** | 3 visible hits (1 em dash, 1 en dash, 1 "journey"); more in terminal output |

### P0 (fix before ship)
1. **Hydration failure on `/` and `/store` at desktop widths.** See G5-1.
2. **Case study pages have no og:image, and their titles drop "| Levis Kibirie".** See G6-1 and G6-2.
3. **Visible em dash, en dash and "Journey".** See G8.

---

## G1 Placeholder / fake content: PASS

- No `lorem`, `TBD`, `[DEMO]` or `John Doe` in any rendered HTML. `TODO` appears only in a source comment (`src/data/facts.ts:10`, `// TODO(levo): confirm the production domain`) and is not rendered. That domain is unconfirmed, though, which affects G6.
- **"To fill in" does NOT render in production.** It is gated by `process.env.NODE_ENV !== "production"` in `src/app/work/[slug]/page.tsx:135`. No hits in any production HTML.
- Intentional media slots (listed, not failed):
  - `[ HERO SLOT ]` on `/`, in the hero orb (`.sp-stage__orb`).
  - `[ REEL SLOT ]` on `/`, in the stations `#station-mikono-creations`, `#station-noevella-group`, `#station-elatec-safety-systems` and `#station-core-banking`.
  - `[ REEL SLOT ]` on `/work/mikono-creations`, `/work/noevella-group`, `/work/elatec-safety-systems`, `/work/core-banking` and `/work/levo-cli`.
  - Note: the home levo-cli station shows a terminal teaser, but `/work/levo-cli` still shows a REEL SLOT.

## G2 Links: PASS (with one warning)

- All 13 distinct internal hrefs return 200: `/ /blog /editorial /store /work` plus the 8 `/work/*` pages.
- No `href="#"` and no empty hrefs. The only in-page fragments are `#path`, `#terminal`, `/#terminal` and `/#contact`, and their targets exist (`id="path"`, `id="terminal"`, `id="contact"`). `#ribPath` is an SVG `<use>`/`<textPath>` reference, not a link.
- **Warning: orphan pages.** No rendered page links to `/about`, and only `/editorial` links to `/store`. Both are reachable only through the sitemap.
  - Fix: add About to `src/components/signal/Nav.tsx` (next to Editorial and Writing) or to `src/components/signal/Footer.tsx`. Add Store to the footer.
- External links (not fetched): makejahomes.co.ke, mikono-creations.vercel.app, noevellagroup.com, elatecsafetysystems.co.ke, ghostnet-pi.vercel.app, hookah-website-two.vercel.app, github.com/Levikib (plus /ghostnet, /hookah-website, /levo-portfolio), linkedin.com/in/levis-kibirie-6bba13344, two wa.me/254723819934 variants with different prefilled text, and mailto:leviskibirie2110@gmail.com.
  - Minor: the two WhatsApp prefill messages differ ("I found your portfolio and I'd like to discuss a project" vs "I saw your portfolio and want to talk about a project"). Pick one.

## G3 Number consistency: PASS

Every visible tenants/units/leases/clients number matches `src/data/facts.ts`:
- `/`: 4,500+ tenants, 5,000+ units managed, 3,000+ leases (hero badge and the Makeja station), 80+ client companies.
- `/work/makeja-homes`: the stat row and the Results text both read 4,500+, 5,000+, 3,000+ and 80+.
- `/about`: 4,500+ tenants and 5,000+ units, in three places.
- `/work` meta description: 4,500+ tenants.

Other client counts are different facts, not Makeja figures, so they are not conflicts: "12+ SME clients" for ShanTech on /about and in the terminal, and "12 clients" on /blog and /store.

Banned values: none of 247, 1.5M, 5,450, 243 or "7 parts" appears in visible text. They occur only as false positives in raw HTML: `rgba(168,85,247,…)` CSS on /about and /store, and a webpack chunk id `243` in the RSC payload on /blog. `src/` has no other occurrences outside colour values.

## G4 Server-rendered stats: PASS

Values come from raw `curl` HTML, with no JS run:
- `/`: `>4,500+<`, `>5,000+<`, `>3,000+<` (twice), `>80+<`, `>8+<` and `>4<`. No zeros.
- `/work/makeja-homes`: `>4,500+<`, `>5,000+<`, `>3,000+<` and `>80+<`.

Caveat: G5-1 below means desktop browsers discard this server HTML on `/` and re-render on the client. The numbers stay correct, but the SSR benefit is lost there.

## G5 Accessibility: FAIL

**Passes:**
- Exactly one h1 on every route.
- No heading-level skips on any route.
- No `<img>` without alt.
- No unnamed links or buttons in the SSR HTML.
- Work mega toggle (`button[data-mega-toggle]`, `.sp-nav__link`): `aria-controls="sp-mega"` and `aria-expanded="false"`. In the browser it flips to `"true"` on click, `#sp-mega` becomes visible, and Escape sets it back to `"false"`.

**G5-1 (P0) Hydration failure.**
- In the production build at 1440x900, `/` logs React errors #425 (×4, text mismatch), #418 and #423 ("entire root will switch to client rendering"). `/store` logs #418 (×6) and #423.
- Dev mode confirms the `/store` cause: a style mismatch (`padding-left:20px` on the server vs `48px` on the client) at `src/app/store/page.tsx:67-68`.
- Root cause: `src/hooks/useIsMobile.ts` returns `true` on the server and reads `window.innerWidth` in its lazy initializer on the client. On `/`, the consumer is `src/components/sections/Terminal.tsx:460-462`: the prompt text switches between `levis:~$` and the full PROMPT, so the text differs.
- Fix: initialize `useState(false)` (or `true`) identically on server and client, and set the real value inside `useEffect`. Better still, replace these inline styles with CSS media queries.

**G5-2 Color contrast (axe, serious):**
- `/`: 3 nodes. `.sp-bubble` is #fff on #8b7cff at 3.26:1. Fix: darken `--sp-violet` to about #6a5cff, or use #000 text.
- `/work/makeja-homes` and `/work/mikono-creations`: `.cs-meta dt` is #6c675f on #0b0c0e at 3.48:1 and 11px. Fix: in `src/app/signal.css:133`, use `color: var(--sp-muted)` (#9b958b) instead of `--sp-dim`.
- `/about` (43 nodes), `/blog` (40), `/store` (24) and `/editorial` (13): the legacy pages use `#b5a99a` on `#faf7f0` at 2.15:1, 8-9px. `#2e86c1` on cream is 3.7:1. Fix: raise `--text-4`/`--text-3` to at least #6f665a and stop using 8-9px label sizes.
- `/work`: 0 contrast issues.

**G5-3 Landmarks:**
- `/about`, `/blog`, `/editorial` and `/store` have no `<main>` (axe `landmark-one-main`). Fix: wrap the page content in `<main>` in each `page.tsx`.
- Every route also has a moderate `region` hit on `a[rel="noopener noreferrer"] > div`, the floating WhatsApp button (`src/components/ui/WhatsAppFloat.tsx`). Fix: render it inside the footer or another landmark, or give it an `aria-label` on an `<aside>`.

**G5-4 Minor:** the filter buttons on /about (All / Education / Work…) have no `aria-pressed`. Add `aria-pressed={filter===x}`.

## G6 SEO: FAIL

| Route | Title (len) | Desc len | Canonical | og:image |
|---|---|---|---|---|
| / | Levis Kibirie: Fullstack Engineer & SaaS Founder (48) | **187** | yes | yes |
| /about | About \| Levis Kibirie (21) | **172** | yes | yes |
| /blog | Blog \| Levis Kibirie (20) | 132 | yes | yes |
| /editorial | Chill Minds Magazine **—** Read Online \| Levis Kibirie (50) | **169** | yes | yes |
| /store | Store & Design Work \| Levis Kibirie (35) | **179** | yes | yes |
| /work | Case studies \| Levis Kibirie (28) | **188** | yes | yes |
| /work/makeja-homes | Makeja Homes case study (23) | **220** | yes | **no** |
| /work/mikono-creations | Mikono Creations case study (27) | **189** | yes | **no** |
| /work/noevella-group | Noevella Group case study (25) | 154 | yes | **no** |
| /work/elatec-safety-systems | Elatec Safety Systems case study (32) | **174** | yes | **no** |
| /work/core-banking | Core banking environments case study (36) | 159 | yes | **no** |
| /work/ghostnet | GhostNet case study (19) | 152 | yes | **no** |
| /work/levo-cli | levo-cli case study (19) | **220** | yes | **no** |
| /work/hookah-3d | Hookah 3D case study (20) | 133 | yes | **no** |

- No duplicate titles. robots.txt and sitemap.xml exist. `html lang="en"`.
- **G6-1 (P0):** the `/work/*` pages have only `og:title`, `og:description` and `og:url`, with no `og:image`. The page-level `openGraph` object in `generateMetadata` (`src/app/work/[slug]/page.tsx:21`) replaces the parent's openGraph wholesale. Fix: add `images: [{ url: "/og-image.png", width: 1200, height: 630 }]` there (or a per-project image), plus `type: "article"`.
- **G6-2 (P0):** the case study titles lack "| Levis Kibirie". `src/app/work/layout.tsx` sets `title: "Case studies"` as a plain string, which ends the root `template` for its children. Fix: in work/layout.tsx use `title: { default: "Case studies", template: "%s | Levis Kibirie" }`, or return `title: { absolute: \`${p.name} case study | Levis Kibirie\` }` from generateMetadata.
- **G6-3:** 9 descriptions are over 160 characters (bold in the table). Trim them to 150-160. For the case studies, use `p.tagline` or a dedicated `seoDescription` field instead of `p.summary`.
- **G6-4:** the `/editorial` title contains an em dash (also a G8 hit). Fix: `src/app/editorial/layout.tsx:4,13`, change it to "Chill Minds Magazine: Read Online".
- **G6-5 (risk):** every canonical, og:url, the sitemap and robots point at `https://levikibirie.dev`. `facts.ts:10` still says this domain is unconfirmed, and the known personal site is levis.makejahomes.co.ke. If the domain is wrong, every canonical is wrong. Confirm it before launch.
- Minor: the `/about` twitter card has no `twitter:creator`.

## G7 Mobile / visual: FAIL (minor)

Screenshots are in `docs/qa-screens/`. I looked at: `home-390-top.png`, `home-390-path-mid.png`, `home-390-path-late.png`, `home-1440-top.png`, `home-1440-path-mid.png`, `home-1440-path-late.png`, `makeja-390-top.png`, `makeja-1440-top.png` and `mega-open-1440.png`, plus crops of `home-390-full.png` (stats band to the first station, and the bottom) and `makeja-390-full.png` (architecture section). Full-page shots exist for all four combinations.

- **Horizontal scroll: none.** At both 390 and 1440, `scrollWidth == clientWidth` on `/` and `/work/makeja-homes`. Hero decorations (the bubble, burst and ribbon at x 343-545) extend past 390px but are clipped by `.sp-hero { overflow:hidden }` and by `overflow-x:hidden` on body/html. That flag masks overflow rather than preventing it, so keep it.
- **Overlap (390, `/`):** the purple `Squiggle` (`src/components/signal/Hero.tsx:19`, `bottom:140; left:-10`) is drawn across the "tenants on Makeja Homes" stat label, and "Homes" is partly hidden. Fix: hide the squiggle under 640px, or move it above the stats rule.
- **Signal path: visible, and the stations light up.**
  - Before scrolling, all 8 stations have `data-lit="false"`.
  - With Noevella centred, stations 01-03 are lit and the glowing amber line is drawn to station 03. The rest of the line is dotted, as designed.
  - With levo-cli centred, stations 01-07 are lit and 08 (hookah-3d) is not yet reached.
  - It behaves the same at 390 (a straight line on the left gutter) and 1440 (S-curves).
- At 1440 the curve passes behind the Noevella stat label "CMS collections" and the chips, and behind "commands" on levo-cli. The line sits under the text and stays legible, so this is cosmetic. Optional: add a dark text-shadow or a small background on `.sp-station__stats`.
- **Tap targets under 44px:**
  - Both widths: the terminal quick-command buttons (`help`, `projects`… 14 buttons, 29px tall), the footer links Work / GitHub / LinkedIn / Email (21px tall), `.sp-nav__brand` (21px) and `.sp-eyebrow` "← all case studies" (14px).
  - `/work/makeja-homes`: "Live site ↗" in `.cs-meta` (23px).
  - Under 500px: the WhatsApp float (42x42).
  - Fix: `min-height:44px; display:inline-flex; align-items:center` on these, or padding that reaches 44px.
- The mega menu opens correctly at 1440 with all 8 projects and the feature card. The case study architecture cards stack cleanly at 390, and code blocks scroll inside `pre` (`overflow-x:auto`).

## G8 Copy bans: FAIL

`src/data/projects.ts` and `src/components/signal/*` are **clean** (no em dash, en dash or banned words).

Visible hits:

| Route | Text | Source | Fix |
|---|---|---|---|
| /editorial (title tag) | "Chill Minds Magazine — Read Online" | `src/app/editorial/layout.tsx:4,13` | "Chill Minds Magazine: Read Online" |
| /about | "2020–2024" | `src/app/about/page.tsx:441` | "2020 to 2024" |
| /about | "// Journey" | `src/app/about/page.tsx:545` | "// Path" or "// Timeline" |

Rendered only after terminal interaction (not in SSR, but visible to users):

| Text | Source |
|---|---|
| "SHANTECH AGENCY · 2024–25" | `src/components/sections/Terminal.tsx:52` |
| "2024–25 · Agency" | `Terminal.tsx:218` |
| "2020–2024 BSc…" | `Terminal.tsx:228` |
| "Completed 2024–2025" | `Terminal.tsx:302` |
| "Career journey, 2017 → now" | `Terminal.tsx:100` |
| "for the full journey" | `Terminal.tsx:258` |
| `journey` as a command alias (keep it, it is input only) | `Terminal.tsx:337` |

Fix for the terminal lines: replace the en dashes with " to " or "/", and "journey" with "timeline" or "path". No hits for elevate, unlock, seamless, leverage, delve, game-changer, cutting-edge, robust or empower.

## What I could not check

- External links: not fetched, because the sandbox network is restricted.
- Real fonts: the build used mocked Google Fonts, so final metrics, text wrapping and line breaks may differ slightly.
- Real devices: the browser was headless Chromium only. I did not test Safari/iOS, `100svh` behaviour or touch scrolling, and I did not test Lenis smooth scroll on touch.
- Throttled performance and Lighthouse/LCP: not measured.
- `prefers-reduced-motion`: not exercised, although the code path sets every station lit.
- Keyboard focus order and visible focus rings: not audited beyond the Escape check on the mega menu.
- Screen reader output: not tested.
- `/api/contact`: not exercised.
- `/work/*` pages other than makeja-homes and mikono-creations: no axe run (only the static checks).
- `/store` and `/about` in the 390 viewport: no screenshots.
