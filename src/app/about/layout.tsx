import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
  description:
    "About Levis Kibirie — Fullstack Engineer, SaaS Founder, and Graphic Designer from Nairobi, Kenya. 8+ years building production systems across the full stack: Makeja Homes, GhostNet, Akili Markets, Chill Minds Magazine, and more.",
  keywords: [
    "Levis Kibirie About", "Nairobi Engineer", "Fullstack Developer Kenya",
    "SaaS Founder Kenya", "Remote Engineer Africa", "Cybersecurity Engineer Kenya",
    "Makeja Homes", "GhostNet", "Chill Minds Magazine",
  ],
  alternates: { canonical: "https://levikibirie.dev/about" },
  openGraph: {
    title: "About | Levis Kibirie",
    description: "8+ years. Nairobi → World. Fullstack engineer, SaaS founder, graphic designer. Builder of Makeja Homes, GhostNet, Akili Markets, and Chill Minds Magazine.",
    url: "https://levikibirie.dev/about",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
  },
  twitter: {
    title: "About | Levis Kibirie",
    description: "8+ years. Nairobi → World. Builder of Makeja Homes, GhostNet, Akili Markets, and Chill Minds Magazine.",
  },
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
