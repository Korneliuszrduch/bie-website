import type { Metadata } from "next";
import { IBM_Plex_Sans } from "next/font/google";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { StagingBanner } from "@/components/StagingBanner";
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
        <StagingBanner />
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
