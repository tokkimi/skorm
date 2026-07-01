import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { SiteChrome } from "@/components/site-chrome";
import { SiteFooter } from "@/components/site-footer";
import "./globals.css";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "SKORM Agency — Management, communication & booking",
  description:
    "SKORM Agency accompagne les artistes dans leur management, leur communication, leurs partenariats, l’IA, la formation et leurs bookings en Europe.",
  openGraph: {
    title: "SKORM Agency",
    description: "Management • Communication • Partnerships • AI • Training",
    type: "website",
    locale: "fr_FR",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="fr" data-scroll-behavior="smooth" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body>
        {children}
        <SiteFooter />
        <SiteChrome />
      </body>
    </html>
  );
}
