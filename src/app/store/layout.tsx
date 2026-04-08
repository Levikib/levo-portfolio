import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Store & Design Work",
  description:
    "Design work and resources by Levis Kibirie. Chill Minds Magazine Vol. 1 & 2 — children's mental wellness editorial design. Brand identities, print production, and design systems.",
  keywords: [
    "Chill Minds Magazine", "Kenya Design", "Editorial Design", "Print Design",
    "Children Magazine Kenya", "Mental Wellness Kids", "Graphic Design Nairobi",
  ],
  alternates: { canonical: "https://levikibirie.dev/store" },
  openGraph: {
    title: "Store & Design Work | Levis Kibirie",
    description: "Editorial design, brand identities, and print work by Levis Kibirie.",
    url: "https://levikibirie.dev/store",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
  },
};

export default function StoreLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
