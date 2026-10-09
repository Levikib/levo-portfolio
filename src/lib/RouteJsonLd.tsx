"use client";

import { usePathname } from "next/navigation";

/**
 * Emits the JSON-LD for the current static route (/, /work, /editorial, ...).
 * The map is built on the server (src/lib/seo-routes.ts) and passed in as
 * strings, so the data files never ship to the client. Renders during SSR,
 * so crawlers see it in the initial HTML. Dynamic routes emit their own.
 */
export default function RouteJsonLd({ map }: { map: Record<string, string> }) {
  const p = usePathname() || "/";
  const key = p.length > 1 ? p.replace(/\/+$/, "") : "/";
  const json = map[key];
  if (!json) return null;
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: json }} />;
}
