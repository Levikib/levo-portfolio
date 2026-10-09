import type { Metadata, Viewport } from "next";
import { Bricolage_Grotesque, JetBrains_Mono, DM_Sans, Permanent_Marker } from "next/font/google";
import "./globals.css";
import "./mobile.css";
import "./signal.css";
import { SAME_AS, SITE_NAME, SITE_URL, graph, ldJson, makejaOrg, person, website } from "@/lib/seo";
import { ROUTE_COPY, ROUTE_META, routeJsonLd } from "@/lib/seo-routes";
import RouteJsonLd from "@/lib/RouteJsonLd";
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

export const metadata: Metadata = {
  ...ROUTE_META.home,
  metadataBase: new URL(SITE_URL),
  title: {
    default: ROUTE_COPY.home.title,
    template: `%s | ${SITE_NAME}`,
  },
  applicationName: SITE_NAME,
  referrer: "origin-when-cross-origin",
  formatDetection: { telephone: false, email: false, address: false },
  icons: {
    icon: [
      { url: "/favicon-16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
  },
};

export const viewport: Viewport = {
  themeColor: "#0b0c0e",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

/** Site-wide entities. Per-route nodes (ProfilePage, CollectionPage, ...) come from RouteJsonLd. */
const siteJsonLd = ldJson(graph(person, makejaOrg, website));
const routeLd = routeJsonLd();

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${mono.variable} ${dmSans.variable} ${hand.variable}`}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {SAME_AS.map((href) => <link key={href} rel="me" href={href} />)}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: siteJsonLd }} />
        <RouteJsonLd map={routeLd} />
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
