import type { Metadata } from "next";
import { Syne, Syne_Mono, DM_Sans } from "next/font/google";
import "./globals.css";
import Nav from "@/components/layout/Nav";
import Footer from "@/components/layout/Footer";
import CustomCursor from "@/components/ui/CustomCursor";
import SmoothScroll from "@/components/ui/SmoothScroll";

const syne = Syne({ subsets:["latin"], variable:"--font-syne", weight:["400","600","700","800"] });
const syneMono = Syne_Mono({ subsets:["latin"], variable:"--font-syne-mono", weight:"400" });
const dmSans = DM_Sans({ subsets:["latin"], variable:"--font-dm-sans", weight:["300","400","500"] });

export const metadata: Metadata = {
  title: "Levis Kibirie — Fullstack Engineer & SaaS Founder",
  description: "8+ years building production systems. Founder of Makeja Homes. Based in Nairobi, Kenya. Open to senior remote roles globally.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${syne.variable} ${syneMono.variable} ${dmSans.variable}`}>
      <body className="bg-[#050505] text-[#f0ede8] overflow-x-hidden">
        <CustomCursor />
        <SmoothScroll>
          <Nav />
          <main>{children}</main>
          <Footer />
        </SmoothScroll>
      </body>
    </html>
  );
}
