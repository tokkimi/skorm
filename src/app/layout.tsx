import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { SiteChrome } from "@/components/site-chrome";
import { SiteFooter } from "@/components/site-footer";
import { SkormRadio } from "@/components/skorm-radio";
import { radioTracks } from "@/lib/radio";
import "./globals.css";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL("https://www.skorm-agency.com"),
  title: "SKORM Agency — Management, communication & booking",
  description:
    "SKORM Agency accompagne les artistes dans leur management, leur communication, leurs partenariats, l'IA, la formation et leurs bookings en Europe.",
  icons: {
    icon: "/icon.png",
    shortcut: "/icon.png",
    apple: "/apple-icon.png",
  },
  openGraph: {
    title: "SKORM Agency",
    description: "Management · Communication · Partnerships · AI · Training",
    type: "website",
    locale: "fr_FR",
    images: ["/opengraph-image.png"],
  },
  appleWebApp: {
    capable: true,
    title: "SKORM Agency",
    statusBarStyle: "black-translucent",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="fr" data-scroll-behavior="smooth" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body>
        {children}
        <SiteFooter />
        <SkormRadio tracks={radioTracks} />
        <SiteChrome />
      </body>
    </html>
  );
}
