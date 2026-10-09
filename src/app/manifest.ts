import type { MetadataRoute } from "next";
import { SITE_NAME } from "@/lib/seo";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${SITE_NAME} (Levo): Fullstack Engineer & Founder`,
    short_name: "Levo",
    description: "Case studies, editorial design and writing by Levis Kibirie, fullstack engineer and founder of Makeja Homes in Nairobi, Kenya.",
    start_url: "/",
    scope: "/",
    display: "browser",
    lang: "en-KE",
    background_color: "#0b0c0e",
    theme_color: "#0b0c0e",
    categories: ["portfolio", "technology", "design"],
    icons: [
      { src: "/favicon-16.png", sizes: "16x16", type: "image/png" },
      { src: "/favicon-32.png", sizes: "32x32", type: "image/png" },
      { src: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  };
}
