import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Work & Projects",
  description:
    "Portfolio of engineering work by Levis Kibirie. Makeja Homes (production SaaS, 247+ tenants), GhostNet (cybersecurity platform, AI-powered), Akili Markets (NSE research agent), Hookah Website, ShanTech Agency, and Chill Minds Magazine.",
  keywords: [
    "Makeja Homes", "GhostNet", "Akili Markets", "Hookah Website", "ShanTech Agency", "Chill Minds Magazine",
    "SaaS Portfolio", "Next.js Projects", "Kenya Engineer Portfolio", "Fullstack Projects", "Cybersecurity Platform",
  ],
  alternates: { canonical: "https://levikibirie.dev/work" },
  openGraph: {
    title: "Work & Projects | Levis Kibirie",
    description: "6 projects — Makeja Homes, GhostNet, Akili Markets, Hookah Website, ShanTech Agency, Chill Minds Magazine. Production systems, AI platforms, and digital products built by Levis Kibirie.",
    url: "https://levikibirie.dev/work",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
  },
  twitter: {
    title: "Work & Projects | Levis Kibirie",
    description: "6 projects — Makeja Homes, GhostNet, Akili Markets, Hookah Website, ShanTech Agency, Chill Minds Magazine.",
  },
};

export default function WorkLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
