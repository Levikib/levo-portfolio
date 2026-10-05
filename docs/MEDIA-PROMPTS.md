# Portfolio media prompts (Google AI Studio images + Veo videos)

For: levis.makejahomes.co.ke (Signal Path redesign). Generate these, save them with the exact filenames, and send them to Claude to wire in. Each one has a slot in `src/data/media.ts` or `src/data/editorial.ts`.

**House look (use in every prompt):** dark graphite ground (#0b0c0e), soft matte clay surfaces with gentle inner highlights (claymorphism), one glowing amber signal ribbon (#ff8a1f), small lime (#d4ff3a) and violet (#8b7cff) accents, hyper-real studio lighting, shallow depth of field, no text, no logos, no watermarks.

---

## 1. Hero avatar (Google AI Studio, image, with your face references)

Attach 3 to 5 clear reference photos of your face (front, three-quarter, smiling, good light). Your suit photo is a great primary reference.

**Prompt A, stylised 3D clay avatar (main hero):**
> Using the attached photos as the exact identity reference, create a 3D claymorphism character portrait of this man: same face shape, skin tone, hairstyle, short goatee and smile. Soft matte clay material, slightly rounded and puffy forms, Pixar-quality but tasteful and grown-up. He wears a dark charcoal knit sweater. Shoulders-up, facing three-quarters to camera, confident warm smile. Background: deep graphite (#0b0c0e) with a soft amber rim light from the left and a faint violet fill from the right. A thin glowing amber light ribbon curves behind his shoulders. Square 1:1, 2048 px, centred, studio lighting, no text.

**Prompt B, hyper-real editorial portrait (About page, case study author card):**
> Using the attached photos as the exact identity reference, create a photorealistic editorial portrait of this man in a dark studio. Same face, hair and goatee, natural skin texture, no beauty filter. Charcoal blazer over a black crew-neck tee. Lighting: soft key from front-left, amber (#ff8a1f) rim light on the right edge of his face and shoulder, deep graphite background with subtle gradient. Looking at camera, calm confident half smile. Portrait 4:5, 2048 px tall, shallow depth of field, no text.

**Prompt C, transparent cut-out for the hero orb:** run Prompt A again, then ask:
> Remove the background completely and return a transparent PNG cut-out of the character, keeping the soft amber rim light on his edges.

Save as: `levo-avatar.png` (Prompt C), `levo-portrait.jpg` (Prompt B), `levo-avatar-square.png` (Prompt A).

## 2. Hero centrepiece loop (Veo, video)

**Prompt:**
> A seamless 6 second loop. A smooth matte graphite clay sphere floats in the centre of a dark studio (#0b0c0e). A thick glossy amber (#ff8a1f) ribbon wraps diagonally around the sphere and slowly travels along its own path, like a signal moving through a cable. Small soft clay shapes (a lime cube, a violet pill, a tiny amber star) orbit slowly at different depths. Soft studio key light, gentle reflections, subtle floating dust particles. Locked-off camera, very slow 5 degree orbit, no cuts. The last frame must match the first frame for a perfect loop. No text, no logos. Square 1:1.

Save as: `hero-orbit-1x1-6s.mp4`, plus one still frame as `hero-orbit-poster.png`.

**Optional variant (avatar inside the orb):** after the avatar exists, use Veo image-to-video with `levo-avatar-square.png`:
> Animate this clay character subtly: a slow blink, a small smile widening, a gentle head tilt, while the amber ribbon behind him glows and drifts. 6 seconds, seamless loop, camera locked off.

## 3. Core banking station (Veo, video)

> Abstract 8 second shot, no logos, no readable text, no real data. A dark server corridor rendered as soft graphite clay blocks. Thin amber light signals pulse along cables between the racks, then converge into one bright point at the end of the corridor. Slow dolly forward. Cool violet ambient light, amber highlights, hyper-real materials, shallow depth of field. 16:9.

Save as: `banking-abstract-16x9-8s.mp4`.

## 4. Open Graph share image (Google AI Studio, image)

> A 1200 x 630 social share banner. Left 55 percent: empty dark graphite space (text will be added in code). Right side: the 3D clay avatar from the attached image (or a clay sphere if no avatar yet) wrapped by a glowing amber ribbon, small lime and violet clay shapes floating nearby. Soft studio light, hyper-real clay, no text.

Save as: `og-image.png` (1200 x 630).

## 5. Thoughts covers (Google AI Studio, one per post)

Template, swap the subject in brackets:
> Editorial cover illustration in soft 3D claymorphism on a dark graphite background (#0b0c0e). Subject: [e.g. a clay database split into many small labelled-free drawers, for a post about schema-per-tenant]. One amber glowing ribbon connects the elements. Lime and violet accents. Hyper-real studio lighting, generous empty space at the top for a title, no text. 16:9, 1600 px wide.

Planned posts and suggested subjects:
- Schema-per-tenant at Makeja: a clay apartment block where each floor is a separate sealed drawer.
- What anime taught me about building in public: a clay katana resting on a laptop keyboard, amber ribbon as the blade's glow.
- Shipping world-class products from Nairobi: clay Nairobi skyline silhouette with the ribbon running from it across a clay globe.

Save as: `thought-<slug>.png`.

## 6. Project reels (CapCut screen recordings, not AI)

Record at 1920 x 1080 (9:16 at 1080 x 1920 for Mikono), 60 fps, then cut to length in CapCut. Export H.264, no audio, under 6 MB. Hide any real tenant names, emails, phone numbers or amounts (use a demo company).

| File | Length | Shot list |
|---|---|---|
| `makeja-dashboard-16x9-12s.mp4` | 12s | Demo admin dashboard, generate monthly bills, open one payment, ask Njiti one question |
| `mikono-studio-9x16-10s.mp4` | 10s | Phone: open the custom studio, pick an animal and colours, WhatsApp order opens |
| `elatec-projects-16x9-10s.mp4` | 10s | Hero slider, towns-served index, a product page, WhatsApp hand-off |
| `noevella-hero-16x9-8s.mp4` | 8s | Splash, hero video, open the mega menu, scroll division cards |
| `levo-cli-16x9-10s.mp4` | 10s | Type `help`, Tab-complete `open makeja`, page jumps to the case study |
| `ghostnet-16x9-8s.mp4` | 8s | Matrix-rain entry, module grid, ask GHOST one question |
| `hookah-16x9-8s.mp4` | 8s | Leave for last (project still in progress) |

## Hand-off

Put everything in one folder, e.g. `Downloads/portfolio-media/`, and tell Claude: "media is in Downloads/portfolio-media, wire it in". Claude will optimise each file, copy it into `public/media/` or `public/reels/`, flip the `ready` flags in `src/data/media.ts`, and deploy.
