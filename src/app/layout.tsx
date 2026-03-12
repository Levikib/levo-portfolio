import type { Metadata } from "next";
import { Syne, Syne_Mono, DM_Sans } from "next/font/google";
import "./globals.css";
import CustomCursor from "@/components/ui/CustomCursor";
import WhatsAppFloat from "@/components/ui/WhatsAppFloat";
import SmoothScroll from "@/components/ui/SmoothScroll";
import Nav from "@/components/layout/Nav";
import Footer from "@/components/layout/Footer";

const syne = Syne({ subsets: ["latin"], weight: ["400","600","700","800"], variable: "--font-display" });
const syneMono = Syne_Mono({ subsets: ["latin"], weight: ["400"], variable: "--font-mono" });
const dmSans = DM_Sans({ subsets: ["latin"], weight: ["300","400","500"], variable: "--font-body" });

export const metadata: Metadata = {
  title: "Levis Kibirie — Fullstack Engineer & SaaS Founder",
  description: "Fullstack Software Engineer and SaaS Founder from Nairobi, Kenya. Built Makeja Homes — a production property management platform processing KSH 1.5M+ monthly. Open to senior remote roles.",
  keywords: ["Fullstack Engineer", "SaaS Founder", "Next.js", "TypeScript", "Nairobi", "Kenya", "Remote Engineer", "Levis Kibirie"],
  authors: [{ name: "Levis Kibirie", url: "https://levis.makejahomes.co.ke" }],
  creator: "Levis Kibirie",
  metadataBase: new URL("https://levis.makejahomes.co.ke"),
  openGraph: {
    type: "website",
    url: "https://levis.makejahomes.co.ke",
    title: "Levis Kibirie — Fullstack Engineer & SaaS Founder",
    description: "Engineer who builds systems that move real money. 8+ years. Nairobi → World.",
    siteName: "Levis Kibirie",
    images: [{ url: "/levo.jpg", width: 1200, height: 630, alt: "Levis Kibirie — Fullstack Engineer" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Levis Kibirie — Fullstack Engineer & SaaS Founder",
    description: "Engineer who builds systems that move real money. 8+ years. Nairobi → World.",
    images: ["/levo.jpg"],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${syne.variable} ${syneMono.variable} ${dmSans.variable}`}>
      <body>
        <CustomCursor />
        <WhatsAppFloat />
        <Nav />
        <SmoothScroll>{children}</SmoothScroll>
        <Footer />
      </body>
    </html>
  );
}
