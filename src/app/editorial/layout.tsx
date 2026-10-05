import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Chill Minds Magazine: Read Online",
  description:
    "Chill Minds Magazine Vol. 1A & 1B, a children's mental wellness and health magazine designed, illustrated, and produced by Levis Kibirie. Read both volumes online, free.",
  keywords: [
    "Chill Minds Magazine", "Kids Mental Health Magazine", "Children Wellness Kenya",
    "Editorial Design", "Magazine Flipbook", "Kenya Design",
  ],
  alternates: { canonical: "https://levis.makejahomes.co.ke/editorial" },
  openGraph: {
    title: "Chill Minds Magazine: Read Online | Levis Kibirie",
    description: "Both volumes of Chill Minds Magazine, free to read online.",
    url: "https://levis.makejahomes.co.ke/editorial",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
  },
};

export default function EditorialLayout({ children }: { children: React.ReactNode }) {
  return <main>{children}</main>;
}
