import type { MetadataRoute } from "next";
import { PROJECTS } from "@/data/projects";
import { EDITORIAL } from "@/data/editorial";
import { THOUGHTS } from "@/data/thoughts";
import { pagesOf, published, volOf } from "@/components/editorial/meta";
import { abs } from "@/lib/seo";

type Freq = MetadataRoute.Sitemap[number]["changeFrequency"];

/**
 * Every public route. PROJECTS already excludes hidden builds (hookah-3d),
 * and only published Thoughts get a URL. /api is never listed.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const u = (path: string, priority: number, changeFrequency: Freq = "monthly", lastModified: Date = now) => ({
    url: abs(path),
    lastModified,
    changeFrequency,
    priority,
  });
  const vols = Array.from(new Set(EDITORIAL.flatMap((i) => pagesOf(i).map(volOf))));
  const posts = published(THOUGHTS);

  return [
    u("/", 1.0, "weekly"),
    u("/work", 0.9, "weekly"),
    u("/creative", 0.9, "weekly"),
    u("/contact", 0.8),
    ...PROJECTS.map((p) => u(`/work/${p.slug}`, 0.8)),
    u("/editorial", 0.8, "weekly"),
    ...EDITORIAL.map((i) => u(`/editorial/${i.slug}`, i.featured ? 0.7 : 0.6)),
    ...vols.map((v) => u(`/editorial/read/${v}`, 0.7)),
    u("/thoughts", 0.7, "weekly"),
    ...posts.map((t) => u(`/thoughts/${t.slug}`, 0.7, "yearly", new Date(t.date + "T00:00:00Z"))),
    u("/about", 0.7),
  ];
}
