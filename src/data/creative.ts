/**
 * Creative & Strategy: the non-code half of the work.
 * Every line here must be true and traceable: repo data files, HANDOFF.md or Levo himself.
 * Rules: no em or en dashes, no invented results, revenue, prices or testimonials.
 * Makeja is pre-revenue: never imply revenue, never state a price or payment volume.
 * Never mention core banking.
 */

export type CreativeSectionId = "design" | "brand" | "strategy" | "growth";

export type CreativeSection = {
  id: CreativeSectionId;
  /** Short label used in the nav and the in-page index. */
  label: string;
  /** Where the nav links to. Design & Motion goes straight to the Editorial gallery. */
  href: string;
  /** One line for the nav mega menu. */
  blurb: string;
  accent: string;
  glyph: string;
};

export const CREATIVE_SECTIONS: CreativeSection[] = [
  { id: "design", label: "Design & Motion", href: "/editorial", blurb: "Magazines, launch films, posters and campaign art.", accent: "#ff8a1f", glyph: "●" },
  { id: "brand", label: "Brand systems", href: "/creative#brand", blurb: "Identities and positioning that hold up on every surface.", accent: "#8b7cff", glyph: "◆" },
  { id: "strategy", label: "Business strategy", href: "/creative#strategy", blurb: "What to build, who pays and how the offer is framed.", accent: "#d4ff3a", glyph: "▲" },
  { id: "growth", label: "Growth & marketing", href: "/creative#growth", blurb: "Content systems that keep a small brand showing up.", accent: "#6fe7ff", glyph: "✦" },
];

export const CREATIVE_HERO = {
  eyebrow: "$ ls ./creative --strategy",
  title: "Code is half of it.",
  subtitle: "The other half is knowing what to build and how to sell it.",
  kicker:
    "I design the brand, frame the offer and plan the launch for the products I build. Same person, same standard, no handoff where the idea gets lost.",
};

/** Editorial slugs shown in the Design & Motion section, in order. Missing slugs are skipped. */
export const DESIGN_PICKS = ["chill-minds-vol-1a", "makeja-sunrise-towers", "makeja-feature-posters"];

export type BrandSystem = {
  name: string;
  /** Mono tag above the name. */
  tag: string;
  accent: string;
  /** What the system is, in one or two sentences. */
  what: string;
  points: string[];
  image: { src: string; alt: string; fit?: "cover" | "contain" };
  href: string;
  cta: string;
};

export const BRAND_SYSTEMS: BrandSystem[] = [
  {
    name: "Makeja Homes",
    tag: "positioning · identity",
    accent: "#ff8a1f",
    what: "Positioned as The Real Estate OS: one platform for everything property, split into three pillars, Manage, Find and Build.",
    points: [
      "Tower logomark in stacked, horizontal and app lockups",
      "A recurring cast of six characters for comic strips",
      "Feature poster series and a locked video outro",
    ],
    image: { src: "/editorial/makeja/logo-stacked.webp", alt: "Makeja Homes stacked logo with four copper towers", fit: "contain" },
    href: "/editorial/makeja-identity",
    cta: "See the identity",
  },
  {
    name: "Mikono Creations",
    tag: "art direction",
    accent: "#e8b04b",
    what: "Claymorphism meets scrapbook collage for a shop of handmade crocheted animals. Soft, tactile, and built to feel made by hand.",
    points: [
      "59 SVG animal sprites and a stitched safari cast",
      "Clay cards, organic blobs and kinetic type",
      "A herd game that rewards people for exploring",
    ],
    image: { src: "/editorial/mikono/hero-scene.webp", alt: "Mikono Creations hero scene with crocheted safari animals" },
    href: "/work/mikono-creations",
    cta: "Read the case study",
  },
  {
    name: "Noevella Group",
    tag: "luxury web",
    accent: "#e91e8c",
    what: "A luxury creative agency site in plum and gold that the founder runs herself, with no developer needed.",
    points: [
      "Clay and glass panels with sticker cards",
      "A type-on hero and a floating pill nav",
      "A mega panel for each agency division",
    ],
    image: { src: "/reels/noevella-reel-16x9-8s.webp", alt: "Laptop showing the Noevella site in a plum studio with gold light" },
    href: "/work/noevella-group",
    cta: "Read the case study",
  },
  {
    name: "Elatec Safety Systems",
    tag: "poster campaigns",
    accent: "#6fd3a5",
    what: "Marketing posters for a security, solar and shading installer, one per service line, so each offer gets its own clear moment.",
    points: [
      "CCTV, electric fencing, intercoms and automated gates",
      "Solar water heaters and backup systems",
      "Clear view and privacy screen fencing",
    ],
    image: { src: "/reels/elatec-reel-16x9-8s.webp", alt: "Laptop at dusk on a Nairobi rooftop with CCTV and solar panels" },
    href: "/work/elatec-safety-systems",
    cta: "See the build",
  },
  {
    name: "Chill Minds",
    tag: "editorial design",
    accent: "#8b7cff",
    what: "A student mental wellness magazine. Concept, layout, type and illustration direction across 2 volumes and 72 pages.",
    points: [
      "Body image, trauma, money and growing up online",
      "A deeper visual language for the relationships issue",
      "Animated campaign films for the launch",
    ],
    image: { src: "/editorial/vol1/page-01.jpg", alt: "Chill Minds Vol. 1A magazine cover", fit: "contain" },
    href: "/editorial/read/vol1",
    cta: "Read it online",
  },
];

export type StrategyMove = { n: string; title: string; body: string };

export const STRATEGY = {
  eyebrow: "$ cat ./makeja/strategy.md",
  title: "Strategy is deciding what not to build.",
  kicker:
    "Makeja Homes is where I run the business side for real: positioning, pricing, the funnel and the raise. It is pre-revenue, with property companies on trial while we prove the model.",
  moves: [
    {
      n: "01",
      title: "Positioning",
      body: "Moved Makeja from property management software to The Real Estate OS: one platform for everything property, framed as Manage, Find and Build.",
    },
    {
      n: "02",
      title: "Monetisation and pricing",
      body: "Redesigned how the platform makes money and how the plans are laid out, so value is captured wherever value moves through the product.",
    },
    {
      n: "03",
      title: "Trial to paid",
      body: "A one month free trial designed as a funnel, with short product tutorials that walk a company from first login to a paid plan.",
    },
    {
      n: "04",
      title: "Investor pitch",
      body: "Built the investor pitch and prepared the seed raise: the story, the market and the model, told in plain, confident language.",
    },
  ] as StrategyMove[],
};

export type GrowthItem = { title: string; body: string; tag: string };

export const GROWTH = {
  eyebrow: "$ ./shantech --grow",
  title: "Growth is a system, not a post.",
  kicker:
    "ShanTech Agency is my studio, with 12+ Kenyan SME clients. Sites, identities, films and content for businesses that need to be seen.",
  items: [
    { tag: "content", title: "Social content systems", body: "Pillars, poster templates and a posting schedule per platform, so a small team can publish every week without starting from zero." },
    { tag: "video", title: "AI-assisted video", body: "Launch films and product spots directed with Veo and edited by hand: logo stings, feature ads and campaign films." },
    { tag: "funnel", title: "Tutorial-led funnels", body: "Short product tutorials, each paired with a poster, a film and a caption that leads back to the product." },
    { tag: "identity", title: "Identity for small brands", body: "Logos, business cards and proposals for local businesses that need to look established from day one." },
  ] as GrowthItem[],
};

/** "How I think" strip. Principles from how the work is actually done, not claims. */
export const PRINCIPLES = [
  "Positioning before pixels.",
  "One source of truth for every number.",
  "Test on cheap phones, not on opinions.",
  "Every claim has to match the code.",
];
