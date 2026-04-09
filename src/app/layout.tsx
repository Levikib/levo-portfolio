import type { Metadata, Viewport } from "next";
import { Syne, Syne_Mono, DM_Sans } from "next/font/google";
import "./globals.css";
import "./mobile.css";
import CustomCursor from "@/components/ui/CustomCursor";
import WhatsAppFloat from "@/components/ui/WhatsAppFloat";
import SmoothScroll from "@/components/ui/SmoothScroll";
import Nav from "@/components/layout/Nav";
import Footer from "@/components/layout/Footer";

const syne = Syne({
  subsets: ["latin"],
  weight: ["400", "600", "700", "800"],
  variable: "--font-display",
  display: "swap",
  preload: true,
});
const syneMono = Syne_Mono({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-mono",
  display: "swap",
  preload: false,
});
const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-body",
  display: "swap",
  preload: false,
});

const BASE_URL = "https://levikibirie.dev";

export const icons = {
  icon: [
    { url: "/favicon-16.png", sizes: "16x16", type: "image/png" },
    { url: "/favicon-32.png", sizes: "32x32", type: "image/png" },
  ],
  apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
};

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: "Levis Kibirie — Fullstack Engineer & SaaS Founder",
    template: "%s | Levis Kibirie",
  },
  description:
    "Fullstack Software Engineer and SaaS Founder from Nairobi, Kenya. Built Makeja Homes (247+ tenants, KSH 1.5M/mo) and GhostNet (cybersecurity platform with AI). 8+ years. Open to senior remote roles.",
  keywords: [
    "Fullstack Engineer", "SaaS Founder", "Next.js Developer", "TypeScript",
    "Nairobi Kenya", "Remote Engineer", "Levis Kibirie", "Makeja Homes",
    "GhostNet", "Cybersecurity", "Property Management SaaS", "Paystack",
    "React Developer Kenya", "Software Engineer Africa",
  ],
  authors: [{ name: "Levis Kibirie", url: BASE_URL }],
  creator: "Levis Kibirie",
  publisher: "Levis Kibirie",
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 },
  },
  alternates: { canonical: BASE_URL },
  openGraph: {
    type: "website",
    url: BASE_URL,
    title: "Levis Kibirie — Fullstack Engineer & SaaS Founder",
    description: "Engineer who builds systems that move real money. 8+ years. Nairobi → World.",
    siteName: "Levis Kibirie",
    locale: "en_US",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Levis Kibirie — Fullstack Engineer & SaaS Founder" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Levis Kibirie — Fullstack Engineer & SaaS Founder",
    description: "Engineer who builds systems that move real money. 8+ years. Nairobi → World.",
    images: ["/og-image.png"],
    creator: "@levikibirie",
  },
};

export const viewport: Viewport = {
  themeColor: "#7c3aed",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Levis Kibirie",
  url: BASE_URL,
  image: `${BASE_URL}/levo.jpg`,
  jobTitle: "Fullstack Software Engineer & SaaS Founder",
  description: "Fullstack Engineer from Nairobi, Kenya. Built Makeja Homes and GhostNet. 8+ years in tech.",
  address: { "@type": "PostalAddress", addressLocality: "Nairobi", addressCountry: "KE" },
  sameAs: [
    "https://github.com/Levikib",
    "https://linkedin.com/in/levis-kibirie-6bba13344",
  ],
  knowsAbout: ["TypeScript", "Next.js", "PostgreSQL", "Cybersecurity", "SaaS", "Paystack", "Supabase"],
  worksFor: [
    { "@type": "Organization", name: "Makeja Homes", url: "https://makejahomes.co.ke" },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${syne.variable} ${syneMono.variable} ${dmSans.variable}`}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preload" href="/levo.jpg" as="image" type="image/jpeg" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
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
