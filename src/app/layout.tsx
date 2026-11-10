import type { Metadata, Viewport } from "next";
import "./globals.css";
import "./mobile.css";
import "./signal.css";
import "./fonts.css";
import { SAME_AS, SITE_NAME, SITE_URL, graph, ldJson, makejaOrg, person, website } from "@/lib/seo";
import { ROUTE_COPY, ROUTE_META, routeJsonLd } from "@/lib/seo-routes";
import RouteJsonLd from "@/lib/RouteJsonLd";
import CustomCursor from "@/components/ui/CustomCursor";
import WhatsAppFloat from "@/components/ui/WhatsAppFloat";
import SmoothScroll from "@/components/ui/SmoothScroll";
import Nav from "@/components/signal/Nav";
import Footer from "@/components/signal/Footer";


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
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/* Fonts come from one Google Fonts stylesheet, not next/font/google:
            since Nov 2026 Google returns font URLs next/font 14.2 can't parse,
            which fails the build. It loads without blocking first paint
            (media="print" until it arrives); variables live in fonts.css. */}
        <link rel="preload" as="style" href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:wght@400;600;700;800&family=DM+Sans:wght@300;400;500&family=JetBrains+Mono:wght@400;600&family=Permanent+Marker&display=swap" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:wght@400;600;700;800&family=DM+Sans:wght@300;400;500&family=JetBrains+Mono:wght@400;600&family=Permanent+Marker&display=swap" media="print" data-lv-fonts="" />
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){var l=document.querySelector('link[data-lv-fonts]');if(!l)return;var on=function(){l.media='all'};if(l.sheet){on()}else{l.addEventListener('load',on)}})();`,
          }}
        />
        <noscript>
          <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:wght@400;600;700;800&family=DM+Sans:wght@300;400;500&family=JetBrains+Mono:wght@400;600&family=Permanent+Marker&display=swap" />
        </noscript>
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
