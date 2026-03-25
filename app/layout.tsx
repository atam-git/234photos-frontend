import type { Metadata } from "next";
import { Inter, Playfair_Display, Fira_Code } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap",
});

const firaCode = Fira_Code({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "234photos - Africa's Stock Media Marketplace",
  description: "Discover authentic African stock photos, videos, and illustrations. The premier marketplace for culturally intelligent media.",
  keywords: ["stock photos", "Africa", "stock media", "photography", "videos", "illustrations"],
  authors: [{ name: "234photos" }],
  openGraph: {
    title: "234photos - Africa's Stock Media Marketplace",
    description: "Discover authentic African stock photos, videos, and illustrations.",
    type: "website",
    locale: "en_US",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable} ${firaCode.variable}`}>
      <body className="font-sans antialiased">
        {children}
      </body>
    </html>
  );
}
