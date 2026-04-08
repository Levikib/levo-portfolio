import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
  description:
    "About Levis Kibirie — Fullstack Engineer, SaaS Founder, and Graphic Designer from Nairobi, Kenya. 8+ years building production systems. ISC2 Certified, CEH, builder of Makeja Homes and GhostNet.",
  keywords: [
    "Levis Kibirie About", "Nairobi Engineer", "Fullstack Developer Kenya",
    "ISC2 Certified", "CEH", "SaaS Founder Kenya", "Remote Engineer Africa",
  ],
  alternates: { canonical: "https://levikibirie.dev/about" },
  openGraph: {
    title: "About | Levis Kibirie",
    description: "8+ years. Nairobi → World. Fullstack engineer, SaaS founder, graphic designer.",
    url: "https://levikibirie.dev/about",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
  },
  twitter: {
    title: "About | Levis Kibirie",
    description: "8+ years. Nairobi → World. Fullstack engineer, SaaS founder, graphic designer.",
  },
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
