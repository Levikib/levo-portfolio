# Media from client repos: Editorial audit

Audit of design and motion assets in Levo's local repo clones, picked for the Editorial section. Every video was checked by pulling start, middle and end frames; every candidate image was viewed. Files were re-encoded for the web: H.264, max 1280px wide, CRF 26, no audio, faststart, with a WebP poster; images as WebP, max 1600px, quality 82.

Total added: about 11.7 MB (makeja 9.0 MB, smokers-vine 2.6 MB, mikono 84 KB). Largest single file: listings-1.mp4 at 1.5 MB.

## How provenance was established

- `encoder=Google` in the MP4 metadata marks Veo output. Makeja logo intro, sunrise, blueprint and studio clips and all three Smokers Vine hero clips carry it. Makeja's `VEO_PROMPTS.md` and `CLAUDE_DESKTOP_VEO_INSTRUCTIONS.md` confirm Levo wrote the briefs and ran them in Veo with the real logo as reference. These are labelled "Directed by Levo, generated with Veo".
- Makeja problem cards and pillar tiles: briefs in `makeja-homes/docs/problem-card-thumbnail-prompts.md` and `docs/pillar-thumbnail-and-favicon-prompts.md`, generated in Google AI Studio (Gemini). Labelled as such.
- Kinetic, listings promos and tutorials opener were re-muxed with ffmpeg (`Lavf`), so the original tool is unknown. `tools` is left empty rather than guessed.
- Smokers Vine stills are 1408x768, a typical AI image size, with no prompt file. Blurb says "AI generated", no tool named.
- The Makeja clone is shallow, so git dates are all 2026-10-04. Year is 2026 for everything.

## Selected (12 cards, 44 files)

| Card | Kind | Files (web size) | Why |
|---|---|---|---|
| Makeja Homes logo intro (featured) | motion | logo-intro.mp4 292 KB, 720x1280, 4 s | Clean, on-brand, the strongest single piece of motion. |
| Sunrise towers (featured) | motion | sunrise-towers.mp4 740 KB, 1280x720, 10 s | Cinematic hero, real Nairobi feel, lands on the mark. |
| Blueprint and studio towers | motion | blueprint-towers.mp4 1.1 MB, studio-intro.mp4 1.4 MB | Two distinct hero concepts. Grouped as one card because both end on the same logo shot. |
| Kinetic type promo | motion | kinetic.mp4 564 KB, 13.5 s | Tight typographic piece, crisp text, no artefacts. |
| Listings launch promos | motion | listings-1/2/3.mp4, 0.9 to 1.5 MB, 960x540 | Three looks for one campaign, grouped into one card. |
| Tutorials hub opener | motion | tutorials-hero.mp4 720 KB | Polished 3D UI motion. Unlike the tutorials themselves, it shows no real data. |
| Makeja Homes identity | brand | 4 WebP logos | Current tower mark in lockups, plus the earlier bar mark for context. |
| The cost of chaos (featured) | brand | 6 WebP, 900x672 | A consistent, art directed series. The best still work in the repos. |
| Build, Find, Manage tiles | brand | 3 WebP, 1024x1024 | Finished promo tiles. Weaker than the problem cards, but real and in use. |
| Smokers Vine hero films (featured) | motion | 3 MP4, 0.5 to 1 MB | Rich product mood loops that hold up full screen. |
| Flavours and rentals stills | brand | 5 WebP, 1408x768 | Consistent lighting with the films, finished product shots. |
| Stitched safari cast (Mikono) | brand | hero-scene.webp, cast-sheet.webp (rendered from 12 SVGs) | Original illustration system that drives the site's animated hero. |

## Rejected

- **Makeja tutorial videos** (4 files, 6 to 13 MB, 3 to 7 min): screen recordings that show a Gmail inbox, real emails, phone numbers, saved-password popups and a webcam overlay. Private data, and not design work.
- **Makeja dashboard-reveal.mp4**: the AI-generated dashboard has garbled text ("Revame Traore", "Lapoaly Rorke") that is clearly visible in the middle frame.
- **Makeja screenshots/** (about 90 PNGs): UI captures. Many contain tenant data, and they belong in case studies, not Editorial.
- **Makeja images/blog/** (about 100 JPGs): stock photography used as-is.
- **Makeja hero-skyline, listings-hero posters**: small posters taken from videos that are already included.
- **Makeja public/uploads/proof-of-payment**: user uploads. Excluded on privacy grounds.
- **Noevella**: `public/placeholder/*` are empty SVG placeholders. The logo files and `docs/inspiration/noevella-logo-variants.pdf` (Canva) are the client's own brand or reference material, not Levo's work. Nothing qualified.
- **Elatec**: the campaign posters exist only as prompts in `campaign-poster-prompts.md`, with no rendered files in the repo. Project photos are the client's field photos. Shop images are manufacturer product shots. `unpublished/` is marked DO-NOT-USE or rights-unverified. The walkthrough videos are raw phone footage. Nothing qualified.
- **Mikono photos** (products, story, moments, gallery, market-stall.mp4): the client's own photography and phone video, which is pillarboxed. Mikono `cast2/` SVGs are not used on the site yet, per CAST2.md. Cutouts are background-removed product photos.
- **Hookah 3D models (.glb)**: these are site assets, not stills or motion. Too heavy for this section.
