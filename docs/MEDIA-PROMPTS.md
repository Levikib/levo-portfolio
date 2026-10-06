# Portfolio media: what's missing and the prompts to make it

Updated 2026-10-06. Levo generates these in **Google AI Studio** (images) and **Veo** (video), drops them in `C:\Users\admin\Downloads\portfolio-media\`, and a Claude session wires them in (see "Wiring" at the end).

**House look (paste into every prompt):** dark graphite ground (#0b0c0e), soft matte claymorphism surfaces with gentle inner highlights, one glowing amber signal ribbon (#ff8a1f), small lime (#d4ff3a) and violet (#8b7cff) accents, hyper-real studio lighting, shallow depth of field. No text, no logos, no watermarks, no UI gibberish.

---

## 0. Inventory of empty slots (as of 2026-10-06)

| Slot | Where it shows | File to produce | Code switch |
|---|---|---|---|
| Hero avatar | Home hero orb | `levo-avatar.png` (transparent) | `HERO.avatar` in `src/data/media.ts` |
| Hero loop | Home hero orb (wins over avatar if ready) | `hero-orbit-1x1-6s.mp4` + poster | `HERO.loop` |
| Reel: Makeja Homes | Station 01 + `/work/makeja-homes` | `makeja-reel-16x9-10s.mp4` | `REELS["makeja-homes"]` |
| Reel: Mikono Creations | Station 02 + case study (tall frame) | `mikono-reel-9x16-8s.mp4` | `REELS["mikono-creations"]` |
| Reel: Noevella Group | Station 03 + case study | `noevella-reel-16x9-8s.mp4` | `REELS["noevella-group"]` |
| Reel: Elatec | Station 04 + case study | `elatec-reel-16x9-8s.mp4` | `REELS["elatec-safety-systems"]` |
| Reel: Core banking | Station 05 + case study | `banking-reel-16x9-8s.mp4` | `REELS["core-banking"]` |
| Reel: GhostNet | Station 06 (currently an old screenshot) | `ghostnet-reel-16x9-8s.mp4` | `REELS.ghostnet` |
| Reel: levo-cli | Station 07 (shows a live terminal link instead; reel only on the case study) | `levo-cli-reel-16x9-8s.mp4` | `REELS["levo-cli"]` |
| Reel: Hookah 3D | Station 08 (old screenshot) | **last, project still in progress** | `REELS["hookah-3d"]` |
| OG share image | Link previews everywhere | `og-image.png` 1200x630 | `public/og-image.png` |
| Thoughts covers | `/thoughts` cards (once posts exist) | `thought-<slug>.png` | `cover` in `src/data/thoughts.ts` |

The Editorial section is fully stocked (25 items); nothing needed there.

---

## 1. Hero avatar: cartoon character that looks like Levo (Google AI Studio)

Goal: a stylised character, not a photo, on a background that is trivial to remove so it can sit in any scene (hero orb, About page, stickers, OG image).

**Setup:** attach 3 to 5 reference photos (front, three-quarter, smiling, good light; the navy suit photo is the best primary). Generate on a **flat chroma-green background**, then ask for a transparent cut-out.

**Prompt 1A, master character (do this first):**
> Create a stylised 3D cartoon character of the man in the attached photos. Keep his identity exact: face shape, warm brown skin tone, short tapered afro, short goatee and moustache, friendly wide smile, dark brown eyes. Style: premium 3D animated film character with soft claymorphism shading, slightly larger head than real proportions, smooth matte clay skin with subtle subsurface warmth, not a caricature. Outfit: charcoal knit sweater over a white collar, small amber (#ff8a1f) pin on the chest. Pose: waist-up, body turned three-quarters to the right, head turned to camera, confident warm smile. Lighting: soft studio key light from front-left, faint amber rim light on his right edge. Background: perfectly flat solid chroma green (#00FF00) with no gradient, no shadow on the background and no floor. 1:1, 2048 x 2048. No text.

**Prompt 1B, transparent version (same chat, right after 1A):**
> Return the exact same character as a transparent PNG cut-out with clean anti-aliased edges and no green fringe. Keep the amber rim light on his edges.

**Prompt 1C, pose pack (same chat, for reuse around the site):**
> Keeping the identical character, outfit and lighting on the same flat chroma-green background, generate four separate images: (1) waving hello, (2) pointing to his left at something off-frame, (3) arms crossed, confident, (4) seated at a laptop, typing, slight smile. 1:1, 2048 px each. No text.

**Checks before sending:** the face clearly reads as Levo, there's no green spill on the hair or ears, the edges are clean, and hands have five fingers.

**Save as:** `levo-avatar.png` (1B, transparent), `levo-avatar-green.png` (1A), `levo-pose-wave.png`, `levo-pose-point.png`, `levo-pose-arms.png`, `levo-pose-laptop.png`.

## 2. Hero loop: the avatar comes alive (Veo, image-to-video)

Use `levo-avatar-green.png` as the input frame. The green background stays green, so the loop can be keyed later if needed.

> Animate this 3D cartoon character subtly for a seamless 6 second loop: one slow natural blink, a gentle breath in the shoulders, a small friendly head tilt and the smile widening slightly, then easing back to the starting pose. The camera is locked off. Keep the background perfectly flat chroma green with no lighting change. The last frame must match the first frame exactly. No text.

**Save as:** `hero-orbit-1x1-6s.mp4`. If the loop isn't clean, skip it: the transparent PNG alone looks great in the orb.

---

## 3. Product reels (Veo)

**The method that works best: screenshot, then image-to-video.** Veo can't render real interface text, so give it a real frame. For each product:
1. Open the live page in Chrome at 1920 x 1080 (phone view at 1080 x 1920 for Mikono), hide personal data, and take a clean screenshot.
2. In Google AI Studio, ask for: "Place this exact screenshot, unchanged, on the screen of a floating matte graphite laptop (or phone) on a dark graphite studio background with an amber rim light. Photoreal product shot." That gives you the **start frame**.
3. Run the Veo prompt below with that start frame. Keep the screen content static and move the camera, light and particles; that's what keeps the UI legible.

Each reel: 8 to 10 seconds, no audio, ends on a calm still frame (a clean end frame doubles as the poster).

### 01 Makeja Homes (16:9, 10s)
Screenshot: the admin dashboard of a demo company (overview with occupancy and bills). No real tenant names.
> Slow cinematic push-in on this laptop floating in a dark graphite studio. A thin amber light ribbon enters from the left, wraps once around the laptop and runs along the bottom edge of the screen like a signal. Tiny clay house-shaped particles drift up past the screen. The screen content stays perfectly still and sharp. Soft amber rim light, gentle reflections on the desk-less floor. Ends on a calm, centred hero frame. 16:9, 10 seconds, no text overlays.

### 02 Mikono Creations (9:16, 8s)
Screenshot (phone): the custom animal studio with an animal selected, or the shop grid.
> A matte phone floats upright in a warm cream-and-graphite studio. Three small crocheted toy animals (a giraffe, an elephant, a lion) made of soft yarn tumble gently into the frame and settle around the base of the phone. Slow orbit of about 15 degrees. The screen content stays still and readable. Warm soft light, shallow depth of field. 9:16 vertical, 8 seconds, no text.

### 03 Noevella Group (16:9, 8s)
Screenshot: the homepage hero with the mega menu open.
> Elegant slow dolly-in on a floating laptop in a deep plum (#1a0736) studio. Soft magenta and gold light sweeps across the frame like stage lighting at a gala. Thin gold confetti particles drift in slow motion. The screen stays still and sharp. Luxury editorial mood, 16:9, 8 seconds, no text.

### 04 Elatec Safety Systems (16:9, 8s)
Screenshot: the homepage hero or the projects page with the towns list.
> A floating laptop at dusk over a softly blurred Nairobi suburb rooftop. A sleek CCTV camera rotates slowly in the foreground, and a solar panel catches the last orange sunlight. A thin amber line traces a perimeter fence in light across the background. Slow push-in, the screen content stays still. Cinematic, 16:9, 8 seconds, no text.

### 05 Core banking environments (16:9, 8s, no screenshot, fully abstract)
> Abstract shot, no logos, no readable text, no real data. A dark corridor of server racks rendered as soft graphite clay blocks. Thin amber light signals pulse along cables between the racks and converge into one bright point at the end of the corridor, where a calm vault-like door glows. Slow steady dolly forward, cool violet ambient light, amber highlights, hyper-real materials. 16:9, 8 seconds.

### 06 GhostNet (16:9, 8s)
Screenshot: the module grid page.
> A floating laptop in a pitch-dark room lit only by the screen's green glow. Faint green digital rain falls in the far background, out of focus. A soft hooded silhouette leans in at the edge of frame, then fades. Slow push-in, the screen content stays still. Moody cyber-thriller look, 16:9, 8 seconds, no text.

### 07 levo-cli (16:9, 8s)
Screenshot: the terminal on the home page after running `help`.
> A floating mechanical keyboard and a small graphite clay monitor showing this terminal. A lime (#d4ff3a) cursor glow pulses on the screen. Keys depress one by one on their own as if someone invisible is typing, with soft clicks of light. Slow orbit, amber rim light. 16:9, 8 seconds, no text.

### 08 Hookah 3D: do this last (project still in progress)
Better as a real screen recording of the explode shader once it's live on the hero.

---

## 4. OG share image (Google AI Studio)

Use the transparent avatar.
> A 1200 x 630 social share banner on a dark graphite background. The right 45 percent shows the attached 3D cartoon character, waist-up, with a glowing amber ribbon curving behind him and small lime and violet clay shapes floating nearby. The left 55 percent stays empty dark space for text. Soft studio light. No text.

**Save as:** `og-image.png`.

## 5. Thoughts covers (Google AI Studio, one per post, once posts exist)

> Editorial cover in soft 3D claymorphism on a dark graphite background (#0b0c0e). Subject: [subject]. One amber glowing ribbon connects the elements, with lime and violet accents. Hyper-real studio light, empty space at the top for a title, no text. 16:9, 1600 px wide.

Subjects: schema-per-tenant (a clay apartment block where each floor is a sealed drawer); anime and building in public (a clay katana resting on a keyboard, the ribbon as its glow); shipping from Nairobi (a clay Nairobi skyline with the ribbon running across a clay globe).

---

## Wiring (for the Claude session)

1. Stage the files from `Downloads\portfolio-media\` (needs the desktop app linked).
2. Videos: `ffmpeg -i in.mp4 -an -vf "scale='min(1280,iw)':-2,fps=30" -c:v libx264 -crf 26 -pix_fmt yuv420p -movflags +faststart out.mp4`, plus a poster frame saved as `.webp`. Images: `.webp` at quality 82 (keep the avatar as PNG or lossless WebP to keep its transparency).
3. Avatar → `public/media/levo-avatar.png`. Set `HERO.avatar = { src, ready: true }`, and in `src/components/signal/Hero.tsx` render it with `object-fit: contain`, anchored to the bottom of the orb. Write fresh alt text (e.g. "Illustrated character of Levis Kibirie").
4. Reels → `public/reels/<file>`, then set `REELS[slug].src`, `poster`, `ready: true`, and delete any `fallback`.
5. Build with the font mock (see HANDOFF), commit, then push `signal-path` and `main`.
