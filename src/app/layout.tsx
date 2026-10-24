import type { Metadata } from "next";
import localFont from "next/font/local";
import { Header, Footer } from "@/components/site-layout";
import { site } from "@/data/site-config";
import "./globals.css";

const inter = localFont({ src: "../../public/fonts/inter-latin.woff2", weight: "300 600", variable: "--font-inter", display: "swap" });
const playfair = localFont({ src: [
  { path: "../../public/fonts/playfair-latin.woff2", weight: "400 600", style: "normal" },
  { path: "../../public/fonts/playfair-italic-latin.woff2", weight: "400 600", style: "italic" },
], variable: "--font-playfair", display: "swap" });

export const metadata: Metadata = {
  ...(site.websiteUrl ? { metadataBase: new URL(site.websiteUrl) } : {}),
  title: { default: `${site.name} | Architecture shaped by intention`, template: `%s | ${site.name}` },
  description: site.description,
  openGraph: { type: "website", siteName: site.name, title: site.name, description: site.description, images: [{ url: "/images/noirva-social.jpg", width: 1200, height: 630, alt: site.tagline }] },
  twitter: { card: "summary_large_image", title: site.name, description: site.description, images: ["/images/noirva-social.jpg"] },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en" className={`${inter.variable} ${playfair.variable}`}><body><Header /><main id="main">{children}</main><Footer /></body></html>;
}
