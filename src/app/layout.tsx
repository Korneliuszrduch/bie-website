import type { Metadata } from "next";
import { IBM_Plex_Sans } from "next/font/google";
import { ConversionTracker } from "@/components/ConversionTracker";
import { CookieConsentBanner } from "@/components/CookieConsentBanner";
import { Footer } from "@/components/Footer";
import { GoogleTagManager } from "@/components/GoogleTagManager";
import { Header } from "@/components/Header";
import { JsonLd } from "@/components/JsonLd";
import { StagingBanner } from "@/components/StagingBanner";
import { businessJsonLd, webSiteJsonLd } from "@/lib/jsonld";
import { defaultRootMetadata } from "@/lib/seo";
import "./globals.css";

const ibmPlexSans = IBM_Plex_Sans({
  variable: "--font-ibm-plex-sans",
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = defaultRootMetadata();

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pl" className={`${ibmPlexSans.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col font-sans">
        <JsonLd data={[businessJsonLd(), webSiteJsonLd()]} />
        <GoogleTagManager />
        <ConversionTracker />
        <StagingBanner />
        <Header />
        {children}
        <Footer />
        <CookieConsentBanner />
      </body>
    </html>
  );
}
