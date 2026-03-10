<div align="center">

```
██╗     ███████╗██╗   ██╗██╗███████╗    ██╗  ██╗██╗██████╗ ██╗███████╗██████╗ ██╗███████╗
██║     ██╔════╝██║   ██║██║██╔════╝    ██║ ██╔╝██║██╔══██╗██║██╔════╝██╔══██╗██║██╔════╝
██║     █████╗  ██║   ██║██║███████╗    █████╔╝ ██║██████╔╝██║█████╗  ██████╔╝██║█████╗  
██║     ██╔══╝  ╚██╗ ██╔╝██║╚════██║    ██╔═██╗ ██║██╔══██╗██║██╔══╝  ██╔══██╗██║██╔══╝  
███████╗███████╗ ╚████╔╝ ██║███████║    ██║  ██╗██║██████╔╝██║███████╗██║  ██║██║███████╗
╚══════╝╚══════╝  ╚═══╝  ╚═╝╚══════╝    ╚═╝  ╚═╝╚═╝╚═════╝ ╚═╝╚══════╝╚═╝  ╚═╝╚═╝╚══════╝
```

**Personal portfolio · levis.makejahomes.co.ke · Built with Next.js 14 · Nairobi, Kenya**

[![Live](https://img.shields.io/badge/live-levis.makejahomes.co.ke-7c3aed?style=flat-square)](https://levis.makejahomes.co.ke)
[![Next.js](https://img.shields.io/badge/Next.js-14.2-black?style=flat-square&logo=next.js)](https://nextjs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178c6?style=flat-square&logo=typescript)](https://typescriptlang.org)
[![Deployed on Vercel](https://img.shields.io/badge/deployed-Vercel-black?style=flat-square&logo=vercel)](https://vercel.com)
[![License](https://img.shields.io/badge/license-MIT-green?style=flat-square)](LICENSE)

</div>

---

## Overview

This is the source code for my personal portfolio — a production-grade, animated, multi-page site built entirely from scratch in Next.js 14 with TypeScript. No UI kits. No templates. Every component, animation, and interaction is custom.

**Live:** [levis.makejahomes.co.ke](https://levis.makejahomes.co.ke)

---

## What Makes This Different

Most developer portfolios are Bootstrap clones or Webflow exports. This one is a **fully engineered product** — same standard I apply to Makeja Homes.

| Feature | Implementation |
|---------|----------------|
| Motion graphic intro | RAF loop, per-character scramble decode, canvas constellation |
| Galaxy background | 6 drifting nebula clouds + 180 twinkling stars, all canvas-drawn |
| Chromatic aberration | CSS `text-shadow` animation with async red/cyan offset |
| 3D mouse tilt | `perspective()` + lerped `rotateX/rotateY` directly on DOM |
| Smooth scroll | Lenis scroll engine with custom easing |
| Custom cursor | White dot + purple ring with `mix-blend-mode: difference` |
| Particle field | 70-particle system with inter-particle connection lines |
| Design system | Full CSS variable system, cream/dark alternating sections |
| Contact form | Resend API integration with server-side route handler |
| Zero JS frameworks for animation | Pure RAF + canvas, no Three.js, no GSAP dependency |

---

## Pages

### `/` — Home
Full landing page with animated hero, role tag cycling, parallax photo, marquee ticker, 4-project featured work grid, skills radar chart, animated stat counters, how-I-work principles, design work showcase, blog preview cards, and full contact form.

### `/work` — Work Portfolio + Services
Toggle between two views:

**Work Portfolio view** — 4 projects with alternating left/right layout, live SVG data visualizations, category filter (All / Engineering / AI & Data / Agency / Design), status badges, and expandable Deep Dive panels.

**Services view** — 7 service categories, 36 individual services. Alternating full-width light/dark section bands. Checkable service cards for enquiry building. Lead generation form at the bottom that submits to the contact API.

### `/about` — About
Split hero (bio copy left, galaxy motion graphic right). The right panel features:
- Canvas-rendered galaxy: 6 nebula clouds with drift + pulse, 180 twinkling stars with glow halos
- Per-character scramble decode with Greek/Japanese/Latin glyph cycling
- Chromatic aberration on key words after resolve
- Shimmer light sweep on resolved words
- 3D mouse-tracked tilt on entire text container
- Resolve flash (`brightness(3.2)` spike) on word completion
- Auto-looping script with configurable timing

Below the hero: animated stat counters, filterable career timeline, 8-category stack grid, "Beyond the Code" interest cards, CTA.

### `/blog` — Thoughts
Featured 2-post dark/light split layout, full post list with numbered index, category filter tabs, newsletter capture form.

### `/store` — Digital Products
4 digital products with expandable "What's Inside" panels, alternating dark/light rows, price in KSH + USD, custom work CTA.

---

## Tech Stack

| Layer | Choice | Why |
|-------|--------|-----|
| Framework | Next.js 14 (App Router) | RSC + server actions, excellent DX |
| Language | TypeScript 5 | Full type safety, caught 30+ bugs before deploy |
| Styling | Tailwind CSS + inline styles | System styles via Tailwind, component styles inline for precision |
| Smooth scroll | Lenis | Most natural feel, lightweight |
| Animation | Custom RAF loops + CSS | Zero overhead, full control |
| Canvas | Native Canvas 2D API | No abstraction layer needed |
| Email | Resend | First-class Next.js support, reliable delivery |
| CMS | Sanity (configured) | Ready for blog content when needed |
| Deployment | Vercel | Instant CI/CD on push to main |
| DNS | Cloudflare CNAME → Vercel | Custom domain on levis.makejahomes.co.ke |

---

## Project Structure

```
levo-portfolio/
├── src/
│   ├── app/
│   │   ├── layout.tsx              # Root layout: Nav + Footer + SmoothScroll wrapper
│   │   ├── page.tsx                # Home page — all section components
│   │   ├── globals.css             # CSS variable system + animations
│   │   ├── about/
│   │   │   └── page.tsx            # About page with galaxy motion graphic
│   │   ├── work/
│   │   │   └── page.tsx            # Work portfolio + services toggle
│   │   ├── blog/
│   │   │   └── page.tsx            # Blog listing with featured posts
│   │   ├── store/
│   │   │   └── page.tsx            # Digital products store
│   │   └── api/
│   │       └── contact/
│   │           └── route.ts        # POST handler → Resend API
│   │
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Nav.tsx             # Dark nav, rainbow top line, availability pill
│   │   │   └── Footer.tsx          # Dark footer, 3-column layout
│   │   │
│   │   ├── home/
│   │   │   ├── Hero.tsx            # Split hero: bio left, organic blob photo right
│   │   │   └── Marquee.tsx         # Neon ticker strip
│   │   │
│   │   ├── sections/
│   │   │   ├── FeaturedWork.tsx    # 2×2 project grid
│   │   │   ├── SkillsStack.tsx     # Radar chart + skill bars (dark)
│   │   │   ├── ByTheNumbers.tsx    # 6 stat cards with SVG circular progress
│   │   │   ├── HowIWork.tsx        # 4 working principle cards
│   │   │   ├── DesignWork.tsx      # Editorial + brand design cards
│   │   │   ├── BlogPreview.tsx     # 3 latest posts (dark)
│   │   │   └── ContactSection.tsx  # Intent selector + glass form
│   │   │
│   │   └── ui/
│   │       ├── CustomCursor.tsx    # Dot + ring cursor with blend mode
│   │       ├── ParticleField.tsx   # 70-particle canvas system
│   │       └── SmoothScroll.tsx    # Lenis scroll wrapper
│   │
│   └── lib/
│       └── sanity.ts               # Sanity client (projectId pending)
│
├── public/
│   └── levo.jpg                    # Profile photo
│
├── next.config.mjs                 # Image domains config
├── tailwind.config.ts              # Custom font variable extensions
├── tsconfig.json
└── package.json
```

---

## Design System

### Colour Palette

```css
/* Backgrounds */
--bg:        #faf7f0   /* cream — primary light background */
--bg-2:      #f4efe4   /* warm cream — secondary surfaces */
--surface:   #ffffff   /* pure white cards */

/* Dark sections */
                       /* #0a0805 — near-black, used for dark bands */
                       /* #05020f — deep galaxy dark for motion graphic */

/* Accent colours */
--purple:       #7c3aed
--purple-light: #a855f7
--forest:       #1a5c2e
--forest-mid:   #2d7a45
--forest-light: #4ead6a
--amber:        #d97706
--rose:         #e11d48

/* Text */
--text:   #1a1208   /* near-black warm */
--text-3: #7a6e5f   /* secondary */
--text-4: #b5a99a   /* tertiary / labels */
```

### Typography

```css
--font-display: 'Syne'      /* headings — geometric, strong */
--font-mono:    'Syne Mono' /* labels, tags, terminal text */
--font-body:    'DM Sans'   /* body copy */
```

### Section Flow (Home)

```
Hero        → light (cream)
Marquee     → dark strip
FeaturedWork → light
SkillsStack  → dark  
ByTheNumbers → dark (same band)
HowIWork     → light
DesignWork   → light
BlogPreview  → dark
Contact      → light
Footer       → dark
```

The alternating rhythm creates visual breathing room and ensures every dark section has maximum contrast for stat numbers and code snippets.

---

## Galaxy Motion Graphic — Technical Detail

The `/about` right panel renders a real-time canvas animation loop at 60fps. Architecture:

### Canvas Pipeline (per frame)
```
1. clearRect
2. Deep space radial gradient base
3. Nebula clouds — 6 drifting elliptical radial gradients
4. Stars — 180 points with individual twinkle sine waves + glow halos
5. Scanlines — subtle horizontal lines at 3px intervals (0.07 opacity)
6. Vignette — radial gradient darkening edges
```

### Nebula System
Each nebula has independent:
- Starting position (seeded randomly)
- Drift velocity (driftX, driftY — sub-pixel per frame)
- Pulse phase offset (prevents synchronised breathing)
- Pulse speed (varies 2–4x range)
- Colour from the design palette (purple, green, cyan, rose, amber)

Nebulas wrap around canvas edges for seamless infinite drift.

### Scramble Decode System
```
Timeline builder  →  flat array of WordTiming items with absolute startTimes
RAF loop          →  elapsed = now - seqStart
Per word          →  charsResolved = floor(elapsed / charMs)
Resolved chars    →  real character, inherits word colour
Unresolved chars  →  random glyph from Greek/Japanese/Latin set, purple-tinted
Word complete     →  resolveFlash keyframe fires (brightness 3.2×)
Chromatic words   →  CSS animation: red/cyan text-shadow oscillates
Shimmer words     →  overlay gradient sweeps every 3s
Cursor            →  follows last active word, glows purple
Loop              →  restarts with 700ms pause after sequence complete
```

### 3D Tilt
Mouse position normalised 0–1. Each frame:
```js
tiltX += (targetX - tiltX) * 0.055  // lerp factor
tiltY += (targetY - tiltY) * 0.055
textRef.style.transform = `perspective(820px) rotateX(${tiltX}deg) rotateY(${tiltY}deg)`
```
Applied directly to DOM (not via React state) to avoid render overhead.

---

## Contact Form

```
User submits form
       │
       ▼
POST /api/contact
  → Validates required fields
  → Calls Resend API
  → Sends to leviskibirie2110@gmail.com
  → Returns { success: true }
       │
       ▼
Toast confirmation shown to user
```

**Environment variable required:**
```env
RESEND_API_KEY=re_xxxxxxxxxxxx
```

Set in Vercel: Settings → Environment Variables → Add → Redeploy.

---

## Local Development

```bash
# Clone
git clone https://github.com/Levikib/levo-portfolio.git
cd levo-portfolio

# Install
npm install

# Environment
cp .env.example .env.local
# Add: RESEND_API_KEY=your_key_here

# Run
npm run dev
# → http://localhost:3000
```

**Node version:** 18+ required (for App Router and server components).

---

## Deployment

The repo is connected to Vercel with automatic deployments on every push to `main`.

```bash
# Standard deploy workflow
git add .
git commit -m "feat: description"
git push
# → Vercel auto-deploys in ~60s
```

### Custom Domain Setup
Domain `levis.makejahomes.co.ke` points to Vercel via Cloudflare CNAME:
```
CNAME  levis  →  69cf7dee79a89c19.vercel-dns-017.com
```

### Environment Variables (Vercel)
| Variable | Purpose |
|----------|---------|
| `RESEND_API_KEY` | Contact form email delivery |
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | CMS (when configured) |
| `NEXT_PUBLIC_SANITY_DATASET` | CMS dataset (production) |

---

## Performance Notes

- All canvas animations use `requestAnimationFrame` — never `setInterval`
- 3D tilt uses direct DOM mutation (not React state) for zero-overhead 60fps
- Text scramble state updates throttled to ~30fps (`now - lastUpdate >= 33ms`) while canvas continues at 60fps
- Images served from `/public` — no external CDN required for portfolio photos
- Lenis smooth scroll uses native scroll events with custom easing
- No jQuery, no Bootstrap, no animation library dependencies

---

## Pending / Roadmap

- [ ] `RESEND_API_KEY` → add to Vercel env vars and redeploy
- [ ] Mobile responsive pass — not yet optimised for phones
- [ ] LinkedIn rewrite to match portfolio positioning
- [ ] Sanity CMS setup — create project at sanity.io, add `NEXT_PUBLIC_SANITY_PROJECT_ID`
- [ ] Write blog posts (SaaS post, NSE agent post)
- [ ] SEO — OG image (1200×630) for social sharing
- [ ] Vercel Analytics — enable in dashboard
- [ ] NSE Research Agent — Python + TypeScript + NSE data APIs

---

## Related Projects

| Project | Repo | Live |
|---------|------|------|
| **Makeja Homes** — Production SaaS | [github.com/Levikib/makeja-homes](https://github.com/Levikib/makeja-homes) | [makejahomes.co.ke](https://makejahomes.co.ke) |
| **Levo Portfolio** — This repo | [github.com/Levikib/levo-portfolio](https://github.com/Levikib/levo-portfolio) | [levis.makejahomes.co.ke](https://levis.makejahomes.co.ke) |

---

## Builder

**Levis Kibirie** — Founding Fullstack Engineer · Nairobi, Kenya

- 🌐 [levis.makejahomes.co.ke](https://levis.makejahomes.co.ke)
- 💼 [linkedin.com/in/levis-kibirie-6bba13344](https://linkedin.com/in/levis-kibirie-6bba13344)
- 🐙 [github.com/Levikib](https://github.com/Levikib)
- ✉️ leviskibirie2110@gmail.com

---

## License

MIT — feel free to use as reference or inspiration. If you build something with it, a mention is appreciated but not required.

---

<div align="center">
<sub>Built from scratch in Nairobi. Every pixel deliberate. Every animation intentional.</sub>
</div>
