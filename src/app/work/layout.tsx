import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Work & Projects",
  description:
    "Portfolio of engineering work by Levis Kibirie. Makeja Homes (production SaaS, 247+ tenants, KSH 1.5M/mo), GhostNet (cybersecurity platform, AI-powered), NSE Research Agent, ShanTech Agency, and more.",
  keywords: [
    "Makeja Homes", "GhostNet", "SaaS Portfolio", "Next.js Projects",
    "Kenya Engineer Portfolio", "Fullstack Projects", "Cybersecurity Platform",
  ],
  alternates: { canonical: "https://levikibirie.dev/work" },
  openGraph: {
    title: "Work & Projects | Levis Kibirie",
    description: "Production systems, AI platforms, and digital products built by Levis Kibirie.",
    url: "https://levikibirie.dev/work",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
  },
  twitter: {
    title: "Work & Projects | Levis Kibirie",
    description: "Production systems, AI platforms, and digital products built by Levis Kibirie.",
  },
};

export default function WorkLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
