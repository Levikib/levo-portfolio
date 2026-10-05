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
];
