/**
 * Editorial: design work, digital products, motion and print.
 * Contract shared by the data auditors and the UI. One item = one card.
 * `src` paths are under /public. Never add an item whose files are not in the repo.
 * Client documents (invoices, quotations, profiles) must be redacted or mocked
 * before they appear here: no real client names, amounts, phones, emails, IDs.
 */
export type EditorialKind = "magazine" | "motion" | "social" | "brand" | "document" | "product" | "print";

export type Media =
  | { type: "image"; src: string; alt: string; w: number; h: number }
  | { type: "video"; src: string; poster?: string; alt: string; w: number; h: number }
  | { type: "pages"; folder: string; count: number; ext: "jpg" | "webp"; w: number; h: number };

export type EditorialItem = {
  slug: string;
  title: string;
  kind: EditorialKind;
  client: string;          // brand or "Personal"
  year: string;
  blurb: string;           // under 30 words, plain English
  tools: string[];
  cover: Media;
  gallery?: Media[];
  featured?: boolean;
  cta?: { label: string; href: string };  // e.g. read online, buy, watch
  price?: string;          // only for real digital products
  source: string;          // where the files came from (audit trail)
};

export const EDITORIAL_KINDS: { id: EditorialKind | "all"; label: string }[] = [
  { id: "all", label: "Everything" },
  { id: "magazine", label: "Magazines" },
  { id: "motion", label: "Motion" },
  { id: "social", label: "Social" },
  { id: "brand", label: "Brand" },
  { id: "document", label: "Documents" },
  { id: "print", label: "Print" },
  { id: "product", label: "Digital products" },
];

export const EDITORIAL: EditorialItem[] = [
  {
    slug: "chill-minds-vol-1a",
    title: "Chill Minds, Vol. 1A",
    kind: "magazine",
    client: "Chill Minds",
    year: "2024",
    blurb: "A 36-page student mental wellness magazine: body image, trauma, money and growing up online. Concept, layout, type and illustration direction.",
    tools: ["InDesign", "Illustrator"],
    cover: { type: "image", src: "/editorial/vol1/page-01.jpg", alt: "Chill Minds Vol. 1A cover", w: 1000, h: 1421 },
    gallery: [{ type: "pages", folder: "/editorial/vol1", count: 36, ext: "jpg", w: 1000, h: 1421 }],
    featured: true,
    cta: { label: "Read it online", href: "/editorial/read/vol1" },
    source: "levo-portfolio/public/editorial/vol1",
  },
  {
    slug: "chill-minds-vol-1b",
    title: "Chill Minds, Vol. 1B",
    kind: "magazine",
    client: "Chill Minds",
    year: "2025",
    blurb: "The relationships issue: self-esteem, family, grief and pressure, with a deeper visual language than the first volume.",
    tools: ["InDesign", "Illustrator"],
    cover: { type: "image", src: "/editorial/vol2/page-01.jpg", alt: "Chill Minds Vol. 1B cover", w: 1000, h: 1421 },
    gallery: [{ type: "pages", folder: "/editorial/vol2", count: 36, ext: "jpg", w: 1000, h: 1421 }],
    featured: true,
    cta: { label: "Read it online", href: "/editorial/read/vol2" },
    source: "levo-portfolio/public/editorial/vol2",
  },
  {
    slug: "makeja-logo-intro",
    title: "Makeja Homes logo intro",
    kind: "motion",
    client: "Makeja Homes",
    year: "2026",
    blurb: "A four second vertical sting: four towers rise one by one, then the wordmark settles. Directed and edited by Levo, generated with Veo from the real logo.",
    tools: ["Veo"],
    cover: { type: "video", src: "/editorial/makeja/logo-intro.mp4", poster: "/editorial/makeja/logo-intro.webp", alt: "Four copper towers rise into the Makeja Homes logo on a dark background", w: 720, h: 1280 },
    featured: true,
    source: "makeja-homes/public/brand/v2/logo-intro.mp4 (prompt: makeja-homes/VEO_PROMPTS.md #1)",
  },
  {
    slug: "makeja-sunrise-towers",
    title: "Sunrise towers",
    kind: "motion",
    client: "Makeja Homes",
    year: "2026",
    blurb: "Homepage hero film. The skyline grows out of a Nairobi dawn and lands on the brand mark. Directed and edited by Levo, generated with Veo.",
    tools: ["Veo"],
    cover: { type: "video", src: "/editorial/makeja/sunrise-towers.mp4", poster: "/editorial/makeja/sunrise-towers.webp", alt: "Four towers silhouetted against a golden sunrise over a city", w: 1280, h: 720 },
    featured: true,
    source: "makeja-homes/public/videos/sunrise-towers.mp4",
  },
  {
    slug: "makeja-blueprint-towers",
    title: "Blueprint and studio towers",
    kind: "motion",
    client: "Makeja Homes",
    year: "2026",
    blurb: "Two alternate hero cuts: towers assembling from a wireframe blueprint, and a lightning-lit studio build. Both resolve on the logo. Directed by Levo, generated with Veo.",
    tools: ["Veo"],
    cover: { type: "video", src: "/editorial/makeja/blueprint-towers.mp4", poster: "/editorial/makeja/blueprint-towers.webp", alt: "Copper towers built out of a glowing blueprint grid", w: 1280, h: 720 },
    gallery: [
      { type: "video", src: "/editorial/makeja/studio-intro.mp4", poster: "/editorial/makeja/studio-intro.webp", alt: "Glass and copper towers lit in a dark studio", w: 1280, h: 720 },
    ],
    source: "makeja-homes/public/videos/blueprint-towers.mp4, studio-intro.mp4",
  },
  {
    slug: "makeja-kinetic-type",
    title: "Kinetic type promo",
    kind: "motion",
    client: "Makeja Homes",
    year: "2026",
    blurb: "A 13 second kinetic typography piece that runs inside the homepage product panel: tenants, payments, maintenance, insights, then the wordmark.",
    tools: [],
    cover: { type: "video", src: "/editorial/makeja/kinetic.mp4", poster: "/editorial/makeja/kinetic.webp", alt: "Bold white type reading Payments reconciled automatically", w: 1280, h: 720 },
    source: "makeja-homes/public/videos/makeja-kinetic.mp4",
  },
  {
    slug: "makeja-listings-promos",
    title: "Listings launch promos",
    kind: "motion",
    client: "Makeja Homes",
    year: "2026",
    blurb: "Three short promos for the listings marketplace, each with its own look: glass tunnel, warp speed and warm burst. They rotate in the listings hero.",
    tools: [],
    cover: { type: "video", src: "/editorial/makeja/listings-3.mp4", poster: "/editorial/makeja/listings-3.webp", alt: "Gold type reading Then move in inside a glowing glass tunnel", w: 960, h: 540 },
    gallery: [
      { type: "video", src: "/editorial/makeja/listings-1.mp4", poster: "/editorial/makeja/listings-1.webp", alt: "Gold type over cyan warp speed lines", w: 960, h: 540 },
      { type: "video", src: "/editorial/makeja/listings-2.mp4", poster: "/editorial/makeja/listings-2.webp", alt: "Makeja Homes end card on a warm cream background", w: 960, h: 540 },
    ],
    source: "makeja-homes/public/videos/makeja-listings-1..3.mp4",
  },
  {
    slug: "makeja-tutorials-hero",
    title: "Tutorials hub opener",
    kind: "motion",
    client: "Makeja Homes",
    year: "2026",
    blurb: "Background loop for the tutorials page: a play mark turns into a dashboard that splits into floating lesson cards.",
    tools: [],
    cover: { type: "video", src: "/editorial/makeja/tutorials-hero.mp4", poster: "/editorial/makeja/tutorials-hero.webp", alt: "Cyan play icon floating in a dark particle field", w: 1280, h: 720 },
    source: "makeja-homes/public/videos/hero/tutorials-hero.mp4",
  },
  {
    slug: "makeja-identity",
    title: "Makeja Homes identity",
    kind: "brand",
    client: "Makeja Homes",
    year: "2026",
    blurb: "The tower mark in stacked, horizontal and app lockups, next to the earlier four bar mark it replaced.",
    tools: [],
    cover: { type: "image", src: "/editorial/makeja/logo-stacked.webp", alt: "Makeja Homes stacked logo with four copper towers", w: 604, h: 594 },
    gallery: [
      { type: "image", src: "/editorial/makeja/logo-horizontal.webp", alt: "Horizontal Makeja Homes navigation logo", w: 900, h: 275 },
      { type: "image", src: "/editorial/makeja/logo-official.webp", alt: "Makeja Homes logo on a dark vertical card", w: 720, h: 1280 },
      { type: "image", src: "/editorial/makeja/logo-v1-brick.webp", alt: "Earlier Makeja Homes mark of four rising bars on brick brown", w: 1074, h: 720 },
    ],
    source: "makeja-homes/public/brand/v2, v3 and brand/makeja-homes-logo-deep-brick-brown.png",
  },
  {
    slug: "makeja-problem-cards",
    title: "The cost of chaos",
    kind: "brand",
    client: "Makeja Homes",
    year: "2026",
    blurb: "Six abstract covers for the homepage problem carousel, one per landlord pain point. Art directed by Levo from a shared brief, generated with Gemini.",
    tools: ["Gemini"],
    cover: { type: "image", src: "/editorial/makeja/problem-whatsapp-chaos.webp", alt: "Tangled ember light trails on near black", w: 900, h: 672 },
    gallery: [
      { type: "image", src: "/editorial/makeja/problem-spreadsheet-hell.webp", alt: "A grid of light breaking apart", w: 900, h: 672 },
      { type: "image", src: "/editorial/makeja/problem-paper-lease-nightmares.webp", alt: "A sheet of paper dissolving into particles", w: 900, h: 672 },
      { type: "image", src: "/editorial/makeja/problem-billing-errors.webp", alt: "Scattered glowing digits", w: 900, h: 672 },
      { type: "image", src: "/editorial/makeja/problem-maintenance-black-hole.webp", alt: "A spiral of light vanishing inward", w: 900, h: 672 },
      { type: "image", src: "/editorial/makeja/problem-zero-audit-trail.webp", alt: "Faint footprints fading into darkness", w: 900, h: 672 },
    ],
    featured: true,
    source: "makeja-homes/public/images/problem-cards (brief: docs/problem-card-thumbnail-prompts.md)",
  },
  {
    slug: "makeja-pillar-tiles",
    title: "Build, Find, Manage tiles",
    kind: "brand",
    client: "Makeja Homes",
    year: "2026",
    blurb: "Three playful 3D type tiles for the three product pillars on the homepage. Art directed by Levo, generated with Gemini.",
    tools: ["Gemini"],
    cover: { type: "image", src: "/editorial/makeja/pillar-find.webp", alt: "3D red Find lettering with a map pin", w: 1024, h: 1024 },
    gallery: [
      { type: "image", src: "/editorial/makeja/pillar-build.webp", alt: "3D orange Build lettering with tools", w: 1024, h: 1024 },
      { type: "image", src: "/editorial/makeja/pillar-manage.webp", alt: "3D Manage lettering on a pale sky", w: 1024, h: 1024 },
    ],
    source: "makeja-homes/public/images/pillars (brief: docs/pillar-thumbnail-and-favicon-prompts.md)",
  },
  {
    slug: "smokers-vine-hero-films",
    title: "Smokers Vine hero films",
    kind: "motion",
    client: "Smokers Vine",
    year: "2026",
    blurb: "Three slow, smoky product loops for a hookah service site: glowing coals, mango and mint, and a lit pipe. Directed by Levo, generated with Veo.",
    tools: ["Veo"],
    cover: { type: "video", src: "/editorial/smokers-vine/hero-coals.mp4", poster: "/editorial/smokers-vine/hero-coals.webp", alt: "Glowing coals on a hookah bowl with rising smoke", w: 1280, h: 720 },
    gallery: [
      { type: "video", src: "/editorial/smokers-vine/hero-mango.mp4", poster: "/editorial/smokers-vine/hero-mango.webp", alt: "Cut mango and mint beside a hookah bowl in smoke", w: 1280, h: 720 },
      { type: "video", src: "/editorial/smokers-vine/hero-pipe.mp4", poster: "/editorial/smokers-vine/hero-pipe.webp", alt: "A hookah lit red in a dark room", w: 1280, h: 720 },
    ],
    featured: true,
    source: "levikib/hookah-website/public/videos/hero-1..3.mp4",
  },
  {
    slug: "smokers-vine-stills",
    title: "Flavours and rentals stills",
    kind: "brand",
    client: "Smokers Vine",
    year: "2026",
    blurb: "AI generated product stills for the flavour menu and rental packages, lit to match the hero films: dark, warm and red-rimmed.",
    tools: [],
    cover: { type: "image", src: "/editorial/smokers-vine/tropical.webp", alt: "Hookah bowl beside pineapple and passion fruit", w: 1408, h: 768 },
    gallery: [
      { type: "image", src: "/editorial/smokers-vine/mint-family.webp", alt: "Hookah bowl topped with mint leaves", w: 1408, h: 768 },
      { type: "image", src: "/editorial/smokers-vine/signature.webp", alt: "A hand pressing tobacco into a bowl", w: 1408, h: 768 },
      { type: "image", src: "/editorial/smokers-vine/premium-pot.webp", alt: "A crystal hookah on a dark stage", w: 1408, h: 768 },
      { type: "image", src: "/editorial/smokers-vine/duo-pot.webp", alt: "A two hose hookah lit red", w: 1408, h: 768 },
    ],
    source: "levikib/hookah-website/public/images/flavours, rentals",
  },
  {
    slug: "mikono-stitched-cast",
    title: "Stitched safari cast",
    kind: "brand",
    client: "Mikono Creations",
    year: "2026",
    blurb: "Twelve hand stitched style SVG characters, built as layered parts so the site can make them blink, breathe and walk across the hero scene.",
    tools: ["SVG"],
    cover: { type: "image", src: "/editorial/mikono/hero-scene.webp", alt: "Illustrated savanna with a lion, elephant and giraffe", w: 1280, h: 720 },
    gallery: [
      { type: "image", src: "/editorial/mikono/cast-sheet.webp", alt: "Sheet of twelve stitched animal characters", w: 1600, h: 560 },
    ],
    source: "levikib/mikono-creations/public/fx/cast/*.svg, public/fx/hero-poster.jpg",
  },
];
