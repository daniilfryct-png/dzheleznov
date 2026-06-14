import type { Metadata } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import { PromoBar } from "@/components/layout/PromoBar";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { CartDrawer } from "@/components/store/CartDrawer";
import { CartProvider } from "@/contexts/CartContext";
import { FavoritesProvider } from "@/contexts/FavoritesContext";
import { RecentlyViewedProvider } from "@/contexts/RecentlyViewedContext";
import { StructuredData } from "@/components/seo/StructuredData";
import { defaultMetadata, organizationJsonLd } from "@/lib/seo";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  subsets: ["latin", "cyrillic"],
  variable: "--font-cormorant",
  weight: ["300", "400", "500", "600"],
  display: "swap",
});

const inter = Inter({
  subsets: ["latin", "cyrillic"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = defaultMetadata;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru" className={`${cormorant.variable} ${inter.variable}`}>
      <head>
        <StructuredData data={organizationJsonLd()} />
      </head>
      <body>
        <CartProvider>
          <FavoritesProvider>
            <RecentlyViewedProvider>
              <PromoBar />
              <Header />
              <main>{children}</main>
              <Footer />
              <CartDrawer />
            </RecentlyViewedProvider>
          </FavoritesProvider>
        </CartProvider>
      </body>
    </html>
  );
}
