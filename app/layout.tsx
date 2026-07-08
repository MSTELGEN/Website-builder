import type { Metadata, Viewport } from "next";
import { Bebas_Neue, Inter } from "next/font/google";
import "./globals.css";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

const display = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

const body = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

const SITE_URL = "https://avondwinkel-apeldoorn.nl";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Avondwinkel Apeldoorn — Diouma · Bier, drank & snacks tot laat in het weekend",
    template: "%s · Avondwinkel Diouma Apeldoorn",
  },
  description:
    "Avondwinkel Diouma in het centrum van Apeldoorn. Koud bier, wijn, sterke drank, frisdrank, chips en snacks — elke avond tot laat open. Stationsstraat 289A, 5 min. van het station. Bel 055 312 3490.",
  keywords: [
    "avondwinkel Apeldoorn",
    "avondwinkel Diouma",
    "bier Apeldoorn avond",
    "drank kopen Apeldoorn",
    "night shop Apeldoorn",
    "chips en snacks Apeldoorn",
    "laat open winkel Apeldoorn",
  ],
  alternates: { canonical: SITE_URL },
  openGraph: {
    title: "Avondwinkel Diouma — Apeldoorn",
    description:
      "Koud bier, drank & snacks tot diep in de nacht. In het centrum van Apeldoorn, 5 minuten van het station.",
    url: SITE_URL,
    siteName: "Avondwinkel Diouma",
    locale: "nl_NL",
    type: "website",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#07060d",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="nl" className={`${display.variable} ${body.variable}`}>
      <body>
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-neon-pink focus:px-4 focus:py-2 focus:text-white"
        >
          Naar hoofdinhoud
        </a>
        <Nav />
        <main id="main-content">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
