import type { EditorialItem, EditorialKind, Media } from "@/data/editorial";
import type { Thought, ThoughtTopic } from "@/data/thoughts";
import { SUBSTACK_URL } from "@/data/thoughts";
import { SITE } from "@/data/facts";

/** Per-kind accent and the verb used on the card CTA. All accents carry dark text at ≥4.5:1. */
export const KIND_META: Record<EditorialKind, { label: string; accent: string; verb: string }> = {
  magazine: { label: "Magazine", accent: "#8b7cff", verb: "Read" },
  motion: { label: "Motion", accent: "#ff8a1f", verb: "Watch" },
  social: { label: "Social", accent: "#d4ff3a", verb: "View" },
  brand: { label: "Brand", accent: "#6fe7ff", verb: "View" },
  document: { label: "Document", accent: "#f3eee4", verb: "View" },
  print: { label: "Print", accent: "#ff7ab6", verb: "View" },
  product: { label: "Digital product", accent: "#d4ff3a", verb: "Get it" },
};

export const TOPIC_META: Record<ThoughtTopic, { label: string; accent: string }> = {
  engineering: { label: "Engineering", accent: "#d4ff3a" },
  founder: { label: "Founder notes", accent: "#ff8a1f" },
  design: { label: "Design", accent: "#8b7cff" },
  anime: { label: "Anime", accent: "#ff7ab6" },
  "africa-tech": { label: "Africa tech", accent: "#6fe7ff" },
  career: { label: "Career", accent: "#ffb35c" },
};

/** Still image for any media: image src, video poster, or the first page of a page set. */
export function stillOf(m: Media): { src: string; w: number; h: number } | null {
  if (m.type === "image") return { src: m.src, w: m.w, h: m.h };
  if (m.type === "video") return m.poster ? { src: m.poster, w: m.w, h: m.h } : null;
  return { src: `${m.folder}/page-01.${m.ext}`, w: m.w, h: m.h };
}

/** Landscape media fills the frame; portrait and square media stand in it as an object. */
export const fitOf = (m: { w: number; h: number }) => (m.w / m.h >= 1.2 ? "cover" : "object");

export function altOf(m: Media, fallback: string) {
  return m.type === "pages" ? `${fallback}, page 1` : m.alt;
}

export const pageSrc = (m: Extract<Media, { type: "pages" }>, n: number) =>
  `${m.folder}/page-${String(n).padStart(2, "0")}.${m.ext}`;

/** "/editorial/vol1" -> "vol1" */
export const volOf = (m: Extract<Media, { type: "pages" }>) => m.folder.split("/").filter(Boolean).pop()!;

export function pagesOf(item: EditorialItem) {
  return [item.cover, ...(item.gallery ?? [])].filter((m): m is Extract<Media, { type: "pages" }> => m.type === "pages");
}

/** Where the card CTA goes: the item's own CTA when it is internal, otherwise the detail page. */
export const itemHref = (item: EditorialItem) => `/editorial/${item.slug}`;

export const mediaCount = (item: EditorialItem) => {
  const all = [item.cover, ...(item.gallery ?? [])];
  const pages = all.reduce((n, m) => n + (m.type === "pages" ? m.count : 0), 0);
  if (pages) return `${pages} pages`;
  const vids = all.filter((m) => m.type === "video").length;
  const imgs = all.filter((m) => m.type === "image").length;
  return [vids ? `${vids} ${vids === 1 ? "film" : "films"}` : "", imgs ? `${imgs} ${imgs === 1 ? "image" : "images"}` : ""].filter(Boolean).join(" · ");
};

/** Trim to ≤155 chars on a word boundary, for meta descriptions. */
export function clip(s: string, max = 155) {
  if (s.length <= max) return s;
  return s.slice(0, s.lastIndexOf(" ", max - 1)).replace(/[,.;:]$/, "") + "…";
}

export function fmtDate(iso: string) {
  return new Date(iso + "T00:00:00Z").toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric", timeZone: "UTC" });
}

export const published = (list: Thought[]) =>
  list.filter((t) => t.status === "published").sort((a, b) => (a.date < b.date ? 1 : -1));

/** Substack when it exists, otherwise a real mailto with a subject. Never a fake form. */
export const subscribeHref = () =>
  SUBSTACK_URL ?? `mailto:${SITE.email}?subject=${encodeURIComponent("Subscribe me to Thoughts")}&body=${encodeURIComponent("Hi Levo, please email me when you publish a new post.")}`;
