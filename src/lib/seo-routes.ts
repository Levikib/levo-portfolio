/**
 * Metadata and JSON-LD for the static routes. Server-only: it reads the data
 * files, so import it from server components (layouts, pages, sitemap) only.
 *
 * New static routes (/creative, /contact) use these too:
 *   export const metadata = ROUTE_META.creative;
 */
import type { Metadata } from "next";
import { CAREER, MAKEJA, fmt } from "@/data/facts";
import { PROJECTS } from "@/data/projects";
import { EDITORIAL } from "@/data/editorial";
import { THOUGHTS } from "@/data/thoughts";
import { published } from "@/components/editorial/meta";
import {
  ID,
  abs,
  breadcrumbs,
  graph,
  ldJson,
  pageMetadata,
  person,
  profilePage,
  webPage,
} from "@/lib/seo";

type RouteKey = "home" | "work" | "editorial" | "thoughts" | "about" | "creative" | "contact";

type RouteCopy = { path: string; title: string; crumb: string; description: string; keywords: string[] };

export const ROUTE_COPY: Record<RouteKey, RouteCopy> = {
  home: {
    path: "/",
    title: "Levis Kibirie (Levo) | Fullstack Engineer & SaaS Founder, Kenya",
    crumb: "Home",
    description: `Levis Kibirie (Levo) is a fullstack Next.js engineer in Nairobi, Kenya and founder of Makeja Homes, PropTech SaaS for ${fmt(MAKEJA.tenants)} tenants. Hire him to build.`,
    keywords: ["Levis Kibirie portfolio", "hire fullstack engineer Kenya", "remote fullstack engineer Africa", "multi-tenant SaaS engineer"],
  },
  work: {
    path: "/work",
    title: "Case studies: SaaS, PropTech and web builds",
    crumb: "Case studies",
    description: "Case studies by Levis Kibirie, fullstack engineer in Nairobi: Makeja Homes multi-tenant PropTech SaaS, client websites, GhostNet and levo-cli, with real code.",
    keywords: ["software case studies Kenya", "Next.js case study", "multi-tenant SaaS architecture", "PropTech case study", "web developer portfolio Nairobi"],
  },
  editorial: {
    path: "/editorial",
    title: "Editorial: brand, motion and print design",
    crumb: "Editorial",
    description: "Editorial, brand and motion design by Levis Kibirie in Nairobi: magazines, launch films, identities and campaign art for Makeja Homes, Chill Minds and more.",
    keywords: ["brand design Nairobi", "graphic designer Kenya", "motion design Kenya", "editorial design", "magazine design Kenya", "Chill Minds Magazine"],
  },
  thoughts: {
    path: "/thoughts",
    title: "Thoughts: engineering, founding and design",
    crumb: "Thoughts",
    description: "Essays by Levis Kibirie (Levo) on fullstack engineering, founding a SaaS company from Nairobi, product design, anime and the African tech scene. Read free.",
    keywords: ["Levis Kibirie blog", "engineering blog Kenya", "founder essays Africa", "African tech blog", "SaaS founder notes"],
  },
  about: {
    path: "/about",
    title: "About Levo: fullstack engineer and founder in Nairobi",
    crumb: "About",
    description: `About Levis Kibirie (Levo): fullstack engineer, product designer and founder of Makeja Homes in Nairobi, Kenya, with ${fmt(CAREER.years)} years shipping production software.`,
    keywords: ["about Levis Kibirie", "Levo Kibirie bio", "Nairobi software engineer", "Kenyan tech founder"],
  },
  creative: {
    path: "/creative",
    title: "Creative: brand design, strategy and growth",
    crumb: "Creative",
    description: "Creative work by Levis Kibirie in Nairobi: brand design, business strategy and growth for Kenyan companies, from identity systems and campaigns to launch films.",
    keywords: ["brand design Kenya", "brand strategy Nairobi", "business strategy consultant Kenya", "growth marketing Kenya", "creative director Nairobi"],
  },
  contact: {
    path: "/contact",
    title: "Contact: hire a fullstack engineer in Nairobi",
    crumb: "Contact",
    description: "Contact Levis Kibirie (Levo), fullstack engineer and founder in Nairobi, Kenya. Hire him for a senior remote role, a SaaS build, a website or brand strategy.",
    keywords: ["hire Levis Kibirie", "contact Levo Kibirie", "hire Next.js developer Kenya", "freelance fullstack developer Nairobi"],
  },
};

const meta = (k: RouteKey, extra: Partial<Parameters<typeof pageMetadata>[0]> = {}): Metadata => {
  const c = ROUTE_COPY[k];
  return pageMetadata({
    title: c.title,
    absoluteTitle: k === "home",
    description: c.description,
    path: c.path,
    keywords: c.keywords,
    ...extra,
  });
};

export const ROUTE_META: Record<RouteKey, Metadata> = {
  home: meta("home", { type: "profile" }),
  work: meta("work"),
  editorial: meta("editorial", {
    images: [{ url: "/editorial/vol1/page-01.jpg", width: 1000, height: 1421, alt: "Chill Minds Vol. 1A cover, designed by Levis Kibirie" }],
  }),
  thoughts: meta("thoughts"),
  about: meta("about", { type: "profile" }),
  creative: meta("creative"),
  contact: meta("contact"),
};

/* JSON-LD per static route, keyed by pathname. Rendered by <RouteJsonLd>. */

function crumbFor(k: Exclude<RouteKey, "home">) {
  const c = ROUTE_COPY[k];
  return breadcrumbs([{ name: c.crumb, path: c.path }]);
}

function routeGraph(k: Exclude<RouteKey, "home">, type: string, extra: Record<string, unknown> = {}) {
  const c = ROUTE_COPY[k];
  return graph(webPage(type, c.path, c.title, c.description, extra), crumbFor(k));
}

const itemList = (name: string, items: { name: string; path: string }[]) => ({
  "@type": "ItemList",
  name,
  numberOfItems: items.length,
  itemListElement: items.map((x, k) => ({ "@type": "ListItem", position: k + 1, name: x.name, url: abs(x.path) })),
});

export function routeJsonLd(): Record<string, string> {
  const posts = published(THOUGHTS);
  return {
    "/": ldJson(graph(profilePage)),
    "/work": ldJson(
      routeGraph("work", "CollectionPage", {
        mainEntity: itemList("Case studies by Levis Kibirie", PROJECTS.map((p) => ({ name: `${p.name}: ${p.tagline}`, path: `/work/${p.slug}` }))),
      }),
    ),
    "/editorial": ldJson(
      routeGraph("editorial", "CollectionPage", {
        mainEntity: itemList("Editorial and design work by Levis Kibirie", EDITORIAL.map((i) => ({ name: i.title, path: `/editorial/${i.slug}` }))),
      }),
    ),
    "/thoughts": ldJson(
      routeGraph("thoughts", "CollectionPage", {
        mainEntity: {
          "@type": "Blog",
          "@id": ID.blog,
          url: abs("/thoughts"),
          name: "Thoughts by Levis Kibirie",
          description: ROUTE_COPY.thoughts.description,
          inLanguage: "en-KE",
          author: { "@id": ID.person },
          publisher: { "@id": ID.person },
          blogPost: posts.map((t) => ({
            "@type": "BlogPosting",
            "@id": `${abs(`/thoughts/${t.slug}`)}#article`,
            headline: t.title,
            url: abs(`/thoughts/${t.slug}`),
            datePublished: t.date,
            author: { "@id": ID.person },
          })),
        },
      }),
    ),
    "/about": ldJson(routeGraph("about", "AboutPage", { mainEntity: { "@id": person["@id"] } })),
    "/creative": ldJson(
      routeGraph("creative", "CollectionPage", {
        keywords: ROUTE_COPY.creative.keywords.join(", "),
        mainEntity: { "@id": person["@id"] },
      }),
    ),
    "/contact": ldJson(routeGraph("contact", "ContactPage", { mainEntity: { "@id": person["@id"] } })),
  };
}
