import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Writing by Levis Kibirie — engineering, SaaS, Nairobi tech, cybersecurity, and creative work. Real thoughts from a builder in Africa.",
  keywords: [
    "Levis Kibirie Blog", "Kenya Tech Blog", "SaaS Engineering Blog",
    "Nairobi Developer", "Cybersecurity Writing", "Africa Tech",
  ],
  alternates: { canonical: "https://levikibirie.dev/blog" },
  openGraph: {
    title: "Blog | Levis Kibirie",
    description: "Writing on engineering, SaaS, and the Nairobi tech scene.",
    url: "https://levikibirie.dev/blog",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
  },
};

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
