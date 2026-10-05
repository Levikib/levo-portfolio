import type { Metadata, Viewport } from "next";
import { Bricolage_Grotesque, JetBrains_Mono, DM_Sans, Permanent_Marker } from "next/font/google";
import "./globals.css";
import "./mobile.css";
import "./signal.css";
import { MAKEJA, fmt } from "@/data/facts";
import CustomCursor from "@/components/ui/CustomCursor";
import WhatsAppFloat from "@/components/ui/WhatsAppFloat";
import SmoothScroll from "@/components/ui/SmoothScroll";
import Nav from "@/components/signal/Nav";
import Footer from "@/components/signal/Footer";

const display = Bricolage_Grotesque({
  subsets: ["latin"],
  weight: ["400", "600", "700", "800"],
  variable: "--font-display",
  display: "swap",
});
const mono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "600"],
  variable: "--font-mono",
  display: "swap",
});
const hand = Permanent_Marker({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-hand",
  display: "swap",
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
    default: "Levis Kibirie: Fullstack Engineer & SaaS Founder",
    template: "%s | Levis Kibirie",
  },
  description:
    `Product engineer and designer in Nairobi. Founder of Makeja Homes (${fmt(MAKEJA.tenants)} tenants, ${fmt(MAKEJA.units)} units). Four years on core banking environments. Open to senior remote roles and contract builds.`,
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
    title: "Levis Kibirie: Fullstack Engineer & SaaS Founder",
    description: "Follow the signal: deep case studies from Makeja Homes, client builds and core banking.",
    siteName: "Levis Kibirie",
    locale: "en_US",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Levis Kibirie: Fullstack Engineer & SaaS Founder" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Levis Kibirie: Fullstack Engineer & SaaS Founder",
    description: "Follow the signal: deep case studies from Makeja Homes, client builds and core banking.",
    images: ["/og-image.png"],
    creator: "@levikibirie",
  },
};

export const viewport: Viewport = {
  themeColor: "#0b0c0e",
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
    <html lang="en" className={`${display.variable} ${mono.variable} ${dmSans.variable} ${hand.variable}`}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
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
