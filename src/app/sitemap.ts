import type { MetadataRoute } from "next";
import { SITE } from "@/data/facts";
import { PROJECTS } from "@/data/projects";
import { EDITORIAL } from "@/data/editorial";
import { THOUGHTS } from "@/data/thoughts";
import { pagesOf, published, volOf } from "@/components/editorial/meta";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const u = (path: string, priority: number, changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"] = "monthly", lastModified: Date = now) =>
    ({ url: `${SITE.url}${path}`, lastModified, changeFrequency, priority });
  const vols = Array.from(new Set(EDITORIAL.flatMap((i) => pagesOf(i).map(volOf))));

  return [
    u("", 1.0),
    u("/work", 0.9),
    ...PROJECTS.map((p) => u(`/work/${p.slug}`, 0.8)),
    u("/editorial", 0.8),
    ...EDITORIAL.map((i) => u(`/editorial/${i.slug}`, 0.6)),
    ...vols.map((v) => u(`/editorial/read/${v}`, 0.6)),
    u("/thoughts", 0.7, "weekly"),
    ...published(THOUGHTS).map((t) => u(`/thoughts/${t.slug}`, 0.7, "yearly", new Date(t.date + "T00:00:00Z"))),
    u("/about", 0.6),
  ];
}
