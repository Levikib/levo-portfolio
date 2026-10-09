/**
 * SEO helpers: one place for titles, descriptions, canonicals, Open Graph,
 * Twitter cards and schema.org JSON-LD. Every page builds its metadata with
 * `pageMetadata()` so nothing drifts between routes.
 *
 * Copy rules: no em dashes, never mention core banking, never state Makeja
 * revenue, prices or payment volume. Numbers come from facts.ts only.
 */
import type { Metadata } from "next";
import { CAREER, MAKEJA, SITE, fmt } from "@/data/facts";

export const SITE_URL = SITE.url;
export const SITE_NAME = SITE.name;
export const LOCALE = "en_KE";
export const LANG = "en-KE";
export const AVATAR = "/media/levo-avatar.webp";
export const MAKEJA_URL = "https://makejahomes.co.ke";

/** Profiles that really exist, from facts.ts. Never add one that is not there. */
export const SAME_AS: string[] = [SITE.github, SITE.linkedin];

export const OG_DEFAULT = {
  url: "/og-image.png",
  width: 1200,
  height: 630,
  alt: "Levis Kibirie (Levo), fullstack engineer and founder of Makeja Homes, Nairobi",
};

/** Stable @id anchors so every page's JSON-LD links back to the same entities. */
export const ID = {
  person: `${SITE_URL}/#person`,
  website: `${SITE_URL}/#website`,
  profile: `${SITE_URL}/#profilepage`,
  makeja: `${MAKEJA_URL}/#organization`,
  blog: `${SITE_URL}/thoughts#blog`,
};

/** Absolute URL for a site path ("/" or "" is the home page). */
export function abs(path: string): string {
  if (/^https?:\/\//.test(path)) return path;
  if (!path || path === "/") return SITE_URL;
  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}

/** Search terms the whole site should rank for. Pages add their own on top. */
export const CORE_KEYWORDS = [
  "Levis Kibirie",
  "Levo Kibirie",
  "Levo",
  "fullstack engineer Nairobi",
  "fullstack engineer Kenya",
  "Next.js developer Kenya",
  "TypeScript developer Nairobi",
  "SaaS founder Kenya",
  "PropTech founder Kenya",
  "Makeja Homes founder",
  "product engineer and designer",
  "brand design Nairobi",
  "business strategy",
  "growth marketing",
];

export const KNOWS_ABOUT = [
  "TypeScript",
  "Next.js",
  "React",
  "Node.js",
  "PostgreSQL",
  "Multi-tenant SaaS",
  "PropTech",
  "Product design",
  "Brand strategy",
  "Business strategy",
  "Growth marketing",
  "Editorial and motion design",
];

/** Clip to max chars on a word boundary. */
export function clipTo(s: string, max = 160): string {
  const t = s.replace(/\s+/g, " ").trim();
  if (t.length <= max) return t;
  const cut = t.slice(0, t.lastIndexOf(" ", max - 1)).replace(/[,.;:\s]+$/, "");
  return `${cut}…`;
}

/**
 * Meta description in the 140 to 160 char window: the base text, padded with
 * suffixes (in order) while it is short, then clipped to 160 on a word.
 */
export function describe(base: string, ...suffixes: string[]): string {
  let out = base.replace(/\s+/g, " ").trim();
  for (const s of suffixes) {
    if (out.length >= 140) break;
    const next = `${out.replace(/[.\s]+$/, "")}. ${s}`;
    out = next;
  }
  return clipTo(out, 160);
}

type OgImage = { url: string; width?: number; height?: number; alt?: string };

export type PageMetaInput = {
  /** Short page title; the root template adds " | Levis Kibirie". */
  title: string;
  /** Use the title as-is (no template), e.g. for the home page. */
  absoluteTitle?: boolean;
  description: string;
  /** Site path, e.g. "/work/makeja-homes". */
  path: string;
  images?: OgImage[];
  type?: "website" | "article" | "profile";
  keywords?: string[];
  publishedTime?: string;
  modifiedTime?: string;
  section?: string;
  tags?: string[];
};

/** Consistent metadata for any page: canonical, OG, Twitter, robots, authorship. */
export function pageMetadata(i: PageMetaInput): Metadata {
  const url = abs(i.path);
  const full = i.absoluteTitle ? i.title : `${i.title} | ${SITE_NAME}`;
  const images = (i.images?.length ? i.images : [OG_DEFAULT]).map((im) => ({
    ...im,
    alt: im.alt ?? full,
  }));
  const type = i.type ?? "website";
  const openGraph: Metadata["openGraph"] =
    type === "article"
      ? {
          type: "article",
          url,
          title: full,
          description: i.description,
          siteName: SITE_NAME,
          locale: LOCALE,
          images,
          authors: [SITE_URL],
          ...(i.publishedTime ? { publishedTime: i.publishedTime } : {}),
          ...(i.modifiedTime ? { modifiedTime: i.modifiedTime } : {}),
          ...(i.section ? { section: i.section } : {}),
          ...(i.tags?.length ? { tags: i.tags } : {}),
        }
      : type === "profile"
        ? {
            type: "profile",
            url,
            title: full,
            description: i.description,
            siteName: SITE_NAME,
            locale: LOCALE,
            images,
            firstName: "Levis",
            lastName: "Kibirie",
            username: "Levo",
          }
        : { type: "website", url, title: full, description: i.description, siteName: SITE_NAME, locale: LOCALE, images };

  return {
    title: i.absoluteTitle ? { absolute: i.title } : i.title,
    description: i.description,
    keywords: Array.from(new Set([...(i.keywords ?? []), ...CORE_KEYWORDS])),
    authors: [{ name: SITE_NAME, url: SITE_URL }],
    creator: SITE_NAME,
    publisher: SITE_NAME,
    category: "technology",
    alternates: { canonical: url },
    robots: {
      index: true,
      follow: true,
      googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 },
    },
    openGraph,
    twitter: {
      card: "summary_large_image",
      title: full,
      description: i.description,
      images: images.map((im) => ({ url: im.url, alt: im.alt })),
    },
  };
}

/* ------------------------------------------------------------------ */
/* JSON-LD                                                             */
/* ------------------------------------------------------------------ */

export type Crumb = { name: string; path: string };

export function breadcrumbs(items: Crumb[]) {
  const all: Crumb[] = [{ name: "Home", path: "/" }, ...items];
  return {
    "@type": "BreadcrumbList",
    "@id": `${abs(all[all.length - 1].path)}#breadcrumb`,
    itemListElement: all.map((c, k) => ({
      "@type": "ListItem",
      position: k + 1,
      name: c.name,
      item: abs(c.path),
    })),
  };
}

/** A reference to the site-wide Person, for author/creator fields. */
export const personRef = { "@type": "Person", "@id": ID.person, name: SITE_NAME, url: SITE_URL };

export const PERSON_DESCRIPTION = `Levis Kibirie (Levo) is a fullstack engineer and product designer in Nairobi, Kenya, with ${fmt(CAREER.years)} years shipping software. He co-founded Makeja Homes, a multi-tenant PropTech SaaS serving ${fmt(MAKEJA.tenants)} tenants and ${fmt(MAKEJA.units)} units across ${fmt(MAKEJA.clients)} property companies, and builds brand, strategy and web projects for clients.`;

export const person = {
  "@type": "Person",
  "@id": ID.person,
  name: SITE_NAME,
  alternateName: ["Levo", "Levo Kibirie"],
  givenName: "Levis",
  familyName: "Kibirie",
  url: SITE_URL,
  image: { "@type": "ImageObject", url: abs(AVATAR), caption: "3D avatar of Levis Kibirie (Levo)" },
  jobTitle: "Fullstack Engineer & Founder",
  description: PERSON_DESCRIPTION,
  worksFor: { "@id": ID.makeja },
  homeLocation: {
    "@type": "Place",
    name: "Nairobi, Kenya",
    address: { "@type": "PostalAddress", addressLocality: "Nairobi", addressCountry: "KE" },
  },
  address: { "@type": "PostalAddress", addressLocality: "Nairobi", addressCountry: "KE" },
  hasOccupation: {
    "@type": "Occupation",
    name: "Fullstack Software Engineer",
    occupationLocation: { "@type": "City", name: "Nairobi" },
    skills: KNOWS_ABOUT.join(", "),
  },
  knowsAbout: KNOWS_ABOUT,
  sameAs: SAME_AS,
};

export const makejaOrg = {
  "@type": "Organization",
  "@id": ID.makeja,
  name: "Makeja Homes",
  url: MAKEJA_URL,
  description: "Multi-tenant property management SaaS (PropTech) built for Kenyan landlords and property companies.",
  founder: { "@id": ID.person },
  foundingLocation: { "@type": "Place", name: "Nairobi, Kenya" },
  areaServed: { "@type": "Country", name: "Kenya" },
};

export const website = {
  "@type": "WebSite",
  "@id": ID.website,
  url: SITE_URL,
  name: SITE_NAME,
  alternateName: ["Levo", "Levo Kibirie"],
  description: "Portfolio of Levis Kibirie (Levo): case studies, editorial design and writing from a fullstack engineer and founder in Nairobi.",
  inLanguage: LANG,
  author: { "@id": ID.person },
  publisher: { "@id": ID.person },
};

export const profilePage = {
  "@type": "ProfilePage",
  "@id": ID.profile,
  url: SITE_URL,
  name: "Levis Kibirie (Levo): Fullstack Engineer & SaaS Founder, Kenya",
  inLanguage: LANG,
  isPartOf: { "@id": ID.website },
  mainEntity: { "@id": ID.person },
  about: { "@id": ID.person },
  primaryImageOfPage: { "@type": "ImageObject", url: abs(OG_DEFAULT.url), width: 1200, height: 630 },
};

/** Wrap nodes in one schema.org @graph document. */
export function graph(...nodes: object[]) {
  return { "@context": "https://schema.org", "@graph": nodes };
}

/** Safe JSON for a <script type="application/ld+json"> body. */
export function ldJson(data: unknown): string {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

/** A WebPage-family node for an inner page, linked to the site and its breadcrumb. */
export function webPage(type: string, path: string, name: string, description: string, extra: Record<string, unknown> = {}) {
  const url = abs(path);
  return {
    "@type": type,
    "@id": `${url}#webpage`,
    url,
    name,
    description,
    inLanguage: LANG,
    isPartOf: { "@id": ID.website },
    about: { "@id": ID.person },
    author: { "@id": ID.person },
    breadcrumb: { "@id": `${url}#breadcrumb` },
    ...extra,
  };
}
