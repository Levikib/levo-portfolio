<div align="center">

```
██╗     ███████╗██╗   ██╗██╗███████╗    ██╗  ██╗██╗██████╗ ██╗██████╗ ██╗███████╗
██║     ██╔════╝██║   ██║██║██╔════╝    ██║ ██╔╝██║██╔══██╗██║██╔══██╗██║██╔════╝
██║     █████╗  ██║   ██║██║███████╗    █████╔╝ ██║██████╔╝██║██████╔╝██║█████╗  
██║     ██╔══╝  ╚██╗ ██╔╝██║╚════██║    ██╔═██╗ ██║██╔══██╗██║██╔══██╗██║██╔══╝  
███████╗███████╗ ╚████╔╝ ██║███████║    ██║  ██╗██║██████╔╝██║██║  ██║██║███████╗
╚══════╝╚══════╝  ╚═══╝  ╚═╝╚══════╝    ╚═╝  ╚═╝╚═╝╚═════╝ ╚═╝╚═╝  ╚═╝╚═╝╚══════╝
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

This is the source for my personal engineering portfolio. Not a template, not a Webflow export — a fully custom Next.js 14 site built to the same standard I apply to production SaaS products. Every component, animation, and interaction written from scratch.

**Live:** [levis.makejahomes.co.ke](https://levis.makejahomes.co.ke)

---

## What Makes This Different

| Feature | Implementation |
|---------|----------------|
| Scramble / glitch motion graphic | RAF loop, per-character decode, multi-color streams, hexPulse particle breathing, chromatic aberration, shimmer sweep |
| 3D mouse tilt | CSS `perspective()` + lerped `rotateX/rotateY` applied directly to DOM |
| Interactive terminal | Full browser terminal with 15+ commands, history navigation, tab autocomplete |
| Career timeline | Alternating 3-column grid layout, staggered IntersectionObserver reveals |
| Canvas data visualisations | Live charts per project: bar graphs, candlestick charts, funnel animations, GhostNet module tracker |
| Custom cursor | White dot + purple ring with `mix-blend-mode: difference` |
| Design system | Full CSS variable system, warm cream / near-black alternating sections |
| Security headers | `X-Content-Type-Options`, `X-Frame-Options`, `Referrer-Policy`, `Permissions-Policy` |
| Contact form | Resend API with server-side route handler |
| SEO | Per-page `metadata`, JSON-LD Person schema, auto-generated `sitemap.xml` + `robots.txt` |
| Performance | AVIF/WebP images, 1-year cache TTL, `compress: true`, hero image compressed 308KB → 65KB |

---

## Pages

### `/` — Home
Hero with scramble name reveal → marquee ticker → 5-project featured work grid → skills radar + bars → animated stat counters → career timeline → interactive terminal → design showcase → blog preview → contact form.

### `/work` — Work & Services
Toggle between two views:

**Projects view** — 5 projects (Makeja Homes, GhostNet, NSE Agent, ShanTech, Chill Minds) with alternating left/right layout, live canvas data visualisations, status badges, expandable Deep Dive panels, live site + GitHub links where available.

**Services view** — 7 service categories, 35+ individual services. Full-width alternating light/dark bands. Lead generation form at the bottom.

### `/about` — About
The key feature is the **MotionGraphic** — a canvas + DOM animation panel on the right side featuring:
- 35 particle system with size-breathing (hexPulse)
- 7 data streams cycling through purple + emerald colours
- Per-character scramble decode with Greek, Japanese, Latin, and Unicode block glyphs
- Chromatic aberration on key resolved words
- Shimmer sweep overlay (250% gradient)
- `brightness(3)` resolve flash on word completion
- 3D mouse-tracked tilt (±7 degrees)
- Auto-looping SCRIPT with custom timing per word group

Below: animated stat counters, career timeline, full tech stack grid, beyond-the-code section.

### `/blog` — Thoughts
Featured 2-post dark/light split, full post index with category filter, LinkedIn + contact CTAs.

### `/store` — Digital Products
4 digital products (SaaS starter kit, Meta ads playbook, editorial design system, CV template) with expandable contents, KSH + USD pricing, enquiry links.

---

## Tech Stack

| Layer | Choice | Why |
|-------|--------|-----|
| Framework | Next.js 14 (App Router) | RSC, server actions, Metadata API, file-based routing |
| Language | TypeScript 5 | Full type safety across all components |
| Styling | Tailwind CSS + inline styles | System utilities via Tailwind, component precision via inline |
| Animation | Custom RAF loops + CSS | Zero overhead, full control, no abstraction layer |
| Canvas | Native Canvas 2D API | Particle systems, data visualisations, motion graphic |
| Smooth scroll | Lenis | Natural easing, lightweight |
| Email | Resend | First-class Next.js support |
| Fonts | Syne + Syne Mono + DM Sans | Via `next/font/google` — zero layout shift |
| Image optimisation | Sharp (devDep) | JPEG compression pipeline + favicon generation |
| Deployment | Vercel | Automatic CI/CD on push to `main` |

---

## Project Structure

```
levo-portfolio/
├── src/
│   ├── app/
│   │   ├── layout.tsx              # Root layout — Nav, Footer, SmoothScroll, JSON-LD
│   │   ├── page.tsx                # Home — all section components assembled
│   │   ├── globals.css             # CSS variable system, keyframes, base styles
│   │   ├── mobile.css              # Mobile-specific overrides
│   │   ├── robots.ts               # Auto-generates /robots.txt
│   │   ├── sitemap.ts              # Auto-generates /sitemap.xml
│   │   ├── about/
│   │   │   ├── layout.tsx          # /about metadata + OG
│   │   │   └── page.tsx            # About page with MotionGraphic
│   │   ├── work/
│   │   │   ├── layout.tsx          # /work metadata + OG
│   │   │   └── page.tsx            # Projects + Services toggle
│   │   ├── blog/
│   │   │   ├── layout.tsx          # /blog metadata + OG
│   │   │   └── page.tsx            # Blog listing
│   │   ├── store/
│   │   │   ├── layout.tsx          # /store metadata + OG
│   │   │   └── page.tsx            # Digital products store
│   │   └── api/
│   │       └── contact/
│   │           └── route.ts        # POST → Resend API
│   │
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Nav.tsx             # Sticky nav, rainbow accent line, mobile menu
│   │   │   └── Footer.tsx          # Dark footer, 3-column layout
│   │   │
│   │   ├── home/
│   │   │   ├── Hero.tsx            # Split hero with profile photo + role cycling
│   │   │   └── Marquee.tsx         # Neon marquee ticker strip
│   │   │
│   │   ├── sections/
│   │   │   ├── FeaturedWork.tsx    # 5-project grid with live/github links
│   │   │   ├── SkillsStack.tsx     # Canvas radar chart + skill category grid
│   │   │   ├── ByTheNumbers.tsx    # Animated stat counters
│   │   │   ├── Timeline.tsx        # Career timeline, 8 events, alternating layout
│   │   │   ├── Terminal.tsx        # Interactive browser terminal
│   │   │   ├── DesignWork.tsx      # Editorial + brand design cards
│   │   │   ├── BlogPreview.tsx     # 3 latest post cards
│   │   │   └── ContactSection.tsx  # Intent selector + contact form
│   │   │
│   │   └── ui/
│   │       ├── CustomCursor.tsx    # Dot + ring cursor with blend mode
│   │       ├── WhatsAppFloat.tsx   # Floating WhatsApp CTA button
│   │       └── SmoothScroll.tsx    # Lenis scroll wrapper
│   │
│   └── hooks/
│       └── useIsMobile.ts          # Mobile breakpoint detection hook
│
├── public/
│   ├── levo.jpg                    # Profile photo (compressed, 65KB)
│   ├── favicon-16.png              # Generated via sharp
│   ├── favicon-32.png
│   ├── apple-touch-icon.png
│   └── og-image.png                # OpenGraph social card (1200×630)
│
├── next.config.mjs                 # Security headers, image config, compression
├── tailwind.config.ts              # Custom font variable extensions
├── tsconfig.json
└── package.json
```

---

## Design System

### Colour Palette

```css
/* Backgrounds */
--bg:      #faf7f0   /* warm cream — primary background */
--bg-2:    #f4efe4   /* slightly darker cream — secondary surfaces */

/* Dark sections */
           #0a0805   /* near-black warm — dark section bands */
           #05020f   /* deep galaxy dark — motion graphic background */

/* Accents */
--purple:       #7c3aed
--purple-light: #a855f7
--forest:       #4ead6a
--emerald:      #10b981
--amber:        #d97706
--rose:         #e11d48
--cyan:         #0891b2

/* Text */
--text:   #1a1208   /* near-black warm */
--text-3: #7a6e5f   /* secondary */
--text-4: #b5a99a   /* labels / tertiary */
```

### Typography

```css
--font-display: 'Syne'       /* headings — geometric, heavy */
--font-mono:    'Syne Mono'  /* labels, tags, terminal, code blocks */
--font-body:    'DM Sans'    /* body copy, descriptions */
```

### Section Rhythm (Home)

```
Hero            → cream (light)
Marquee         → dark strip
FeaturedWork    → cream (light)
SkillsStack     → dark
ByTheNumbers    → dark (continued)
Timeline        → cream (light)
Terminal        → dark
DesignWork      → cream (light)
BlogPreview     → dark
Contact         → cream (light)
Footer          → dark
```

Alternating bands create visual breathing room and frame stats/code against maximum contrast backgrounds.

---

## MotionGraphic — Technical Detail

The `/about` right panel runs a real-time canvas + DOM animation at 60fps. Architecture:

### Scramble Decode System

```
SCRIPT array  →  word groups with timing, colour, effects config
RAF loop      →  elapsed = performance.now() - seqStart
Per word      →  charsResolved = floor(elapsed / charMs)
Resolved      →  real character with word colour applied
Unresolved    →  random glyph from GLYPHS set (Latin, Greek, Japanese, Unicode blocks)
Word complete →  resolveFlash: brightness(3) spike fires
Chromatic     →  CSS animation: red/cyan text-shadow oscillates async
Shimmer       →  linear-gradient overlay sweeps at 250% width every 3s
Cursor        →  positioned after last active word, glows purple
Loop          →  700ms pause, then restarts from top
```

### Particle + Stream System

```
35 particles  →  random position, velocity, size, opacity
hexPulse      →  per-particle size breathing via sine wave (phase offset per particle)
7 streams     →  vertical data columns cycling through STREAM_COLORS
               →  ["#7c3aed", "#a855f7", "#10b981", "#4ead6a"]
Each frame    →  stream chars fall, fade, and cycle glyphs
```

### 3D Tilt

Mouse position normalised 0–1, applied to container per frame:

```js
tiltX += (targetX - tiltX) * 0.055   // lerped approach
tiltY += (targetY - tiltY) * 0.055
container.style.transform = `perspective(820px) rotateX(${tiltX}deg) rotateY(${tiltY}deg)`
```

Direct DOM mutation — zero React state, zero re-renders.

---

## Interactive Terminal — Command Reference

The `/` home page includes a fully functional browser terminal. Available commands:

| Command | Output |
|---------|--------|
| `help` | All available commands |
| `whoami` | Engineer bio |
| `makeja` | Makeja Homes metrics + stack |
| `ghostnet` | GhostNet platform details |
| `skills` | Full tech stack list |
| `stack` | Same as skills |
| `contact` | Email + LinkedIn + GitHub |
| `hire levis` | Availability + CTA |
| `ls` | Directory listing |
| `pwd` | Current path |
| `date` | Current date |
| `sudo` | Easter egg |
| `clear` | Clears terminal |
| `exit` | Terminal goodbye |

Supports ↑↓ history navigation, Tab autocomplete, and quick-fire buttons below the prompt.

---

## SEO Setup

```
/robots.txt    → auto-generated via app/robots.ts
/sitemap.xml   → auto-generated via app/sitemap.ts (5 routes, priority weights)
JSON-LD        → Person schema in root layout.tsx
Per-page meta  → layout.tsx in each route segment
```

### Per-Page Metadata Coverage

| Route | Title | Description | OG Image | Canonical |
|-------|-------|-------------|----------|-----------|
| `/` | Levis Kibirie — Fullstack Engineer & SaaS Founder | ✓ | `/og-image.png` | `levis.makejahomes.co.ke` |
| `/about` | About \| Levis Kibirie | ✓ | `/og-image.png` | `levis.makejahomes.co.ke/about` |
| `/work` | Work & Services \| Levis Kibirie | ✓ | `/og-image.png` | `levis.makejahomes.co.ke/work` |
| `/blog` | Blog \| Levis Kibirie | ✓ | `/og-image.png` | `levis.makejahomes.co.ke/blog` |
| `/store` | Store \| Levis Kibirie | ✓ | `/og-image.png` | `levis.makejahomes.co.ke/store` |

---

## Contact Form

```
User submits form
       │
       ▼
POST /api/contact
  → Validates name, email, message
  → Calls Resend API
  → Delivers to leviskibirie2110@gmail.com
  → Returns { success: true }
       │
       ▼
UI shows confirmation state
```

**Required environment variable:**
```env
RESEND_API_KEY=re_xxxxxxxxxxxx
```

---

## Local Development

```bash
# Clone
git clone https://github.com/Levikib/levo-portfolio.git
cd levo-portfolio

# Install
npm install

# Environment
echo "RESEND_API_KEY=your_key_here" > .env.local

# Run
npm run dev
# → http://localhost:3000
```

**Requires Node 18+.**

---

## Deployment

Auto-deploys to Vercel on every push to `main`.

```bash
git add .
git commit -m "feat: description"
git push
# → live in ~60s
```

### Environment Variables (Vercel)

| Variable | Purpose |
|----------|---------|
| `RESEND_API_KEY` | Contact form delivery via Resend |

### Security Headers (next.config.mjs)

```
X-Content-Type-Options: nosniff
X-Frame-Options: DENY
Referrer-Policy: strict-origin-when-cross-origin
Permissions-Policy: camera=(), microphone=(), geolocation=()
Cache-Control: public, max-age=31536000, immutable  (/_next/static, images, fonts)
```

---

## Related Projects

| Project | Repo | Live |
|---------|------|------|
| **Makeja Homes** — Property management SaaS (247+ tenants, KSH 1.5M/mo) | [github.com/Levikib/makeja-homes](https://github.com/Levikib/makeja-homes) | [makejahomes.co.ke](https://makejahomes.co.ke) |
| **GhostNet** — Cybersecurity research & training platform (13 modules, GHOST AI) | — | [ghostnet-pi.vercel.app](https://ghostnet-pi.vercel.app) |
| **Levo Portfolio** — This repo | [github.com/Levikib/levo-portfolio](https://github.com/Levikib/levo-portfolio) | [levis.makejahomes.co.ke](https://levis.makejahomes.co.ke) |

---

## Builder

**Levis Kibirie** — Fullstack Engineer & SaaS Founder · Nairobi, Kenya

- 🌐 [levis.makejahomes.co.ke](https://levis.makejahomes.co.ke)
- 💼 [linkedin.com/in/levis-kibirie-6bba13344](https://linkedin.com/in/levis-kibirie-6bba13344)
- 🐙 [github.com/Levikib](https://github.com/Levikib)
- ✉️ leviskibirie2110@gmail.com

---

## License

MIT — use it as reference or inspiration. A mention is appreciated but not required.

---

<div align="center">
<sub>Built from scratch in Nairobi. Every pixel deliberate. Every animation intentional.</sub>
</div>
