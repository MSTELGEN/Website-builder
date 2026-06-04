import type { Metadata, Viewport } from "next";
import "./globals.css";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "The 7-Night Sleep Reset — ManyRituals",
  description:
    "Seven evidence-based rituals for better sleep. Free guide from ManyRituals — Sleep research, decoded.",
  openGraph: {
    title: "The 7-Night Sleep Reset",
    description: "Seven small experiments. Seven nights. No supplements, no gadgets.",
    siteName: "ManyRituals",
    type: "website",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#14171c",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Nav />
        <main id="main-content">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
