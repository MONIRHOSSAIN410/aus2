import type { Metadata, Viewport } from "next";

import { CartDrawer } from "@/components/layout/cart-drawer";
import { CookieBanner } from "@/components/layout/cookie-banner";
import { PromoModal } from "@/components/layout/promo-modal";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { Toaster } from "@/components/layout/toaster";
import { AnnouncementBar } from "@/components/layout/announcement-bar";
import { PageTransition } from "@/components/motion/page-transition";
import { ScrollProgress } from "@/components/motion/scroll-progress";
import { KatanaCursor } from "@/components/katana-cursor";
import { ReduxProvider } from "@/components/providers";
import { SmoothScroll } from "@/components/smooth-scroll";
import { QuickView } from "@/components/product/quick-view";
import { anton, archivo, plexMono } from "@/lib/fonts";
import { site } from "@/lib/site";

import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Anime Streetwear Australia — ZENJI",
    template: "%s — ZENJI",
  },
  description: `${site.tagline} ${site.promise}`,
  keywords: ["anime streetwear", "graphic tees", "Australia", "otaku fashion", "oversized tee"],
  openGraph: {
    title: "Anime Streetwear Australia — ZENJI",
    description: site.tagline,
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#050505",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${anton.variable} ${plexMono.variable} ${archivo.variable}`}
      suppressHydrationWarning
    >
      <body className="min-h-screen bg-ink-950 text-white">
        <ReduxProvider>
          <SmoothScroll />
          <ScrollProgress />
          <AnnouncementBar />
          <SiteHeader />
          <PageTransition>{children}</PageTransition>
          <SiteFooter />
          <CartDrawer />
          <QuickView />
          <PromoModal />
          <CookieBanner />
          <Toaster />
          <KatanaCursor />
        </ReduxProvider>
      </body>
    </html>
  );
}
