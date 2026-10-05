import type { Metadata } from "next";
import { MAKEJA, fmt } from "@/data/facts";

export const metadata: Metadata = {
  title: { default: "Case studies", template: "%s | Levis Kibirie" },
  description: `Case studies by Levis Kibirie: Makeja Homes (${fmt(MAKEJA.tenants)} tenants), Mikono Creations, Elatec, Noevella Group, core banking, levo-cli, GhostNet and Hookah 3D.`,
  alternates: { canonical: "https://levis.makejahomes.co.ke/work" },
  openGraph: {
    title: "Case studies | Levis Kibirie",
    description: "Architecture, decisions and real code behind every build.",
    url: "https://levis.makejahomes.co.ke/work",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
  },
};

export default function WorkLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
