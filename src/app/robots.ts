import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/"],
      },
    ],
    sitemap: "https://levis.makejahomes.co.ke/sitemap.xml",
    host: "https://levis.makejahomes.co.ke",
  };
}
