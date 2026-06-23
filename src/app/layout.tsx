import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import CookieConsent from "@/components/ui/CookieConsent";
import FloatingContact from "@/components/ui/FloatingContact";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.vcarealert.com"),
  title: {
    default: "vCareAlert | Medical Alert Systems for Seniors",
    template: "%s | vCareAlert",
  },
  description:
    "Award-winning medical alert systems for seniors. GPS tracking, fall detection, 24/7 monitoring. Get a free quote today. No long-term contracts.",
  keywords: [
    "medical alert system",
    "medical alert systems for seniors",
    "personal emergency response system",
    "fall detection device",
    "medical alert devices",
    "senior safety",
    "elderly monitoring",
    "life alert alternative",
    "GPS medical alert",
    "home medical alert system",
  ],
  icons: {
    icon: "/cropped_circle_image.png",
  },
  openGraph: {
    title: "vCareAlert | Medical Alert Systems for Seniors",
    description:
      "Award-winning medical alert systems with GPS tracking, fall detection & 24/7 monitoring. Free quote, no contracts.",
    url: "https://www.vcarealert.com",
    siteName: "vCareAlert",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "vCareAlert | Medical Alert Systems for Seniors",
    description:
      "Award-winning medical alert systems with GPS tracking, fall detection & 24/7 monitoring.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "https://www.vcarealert.com",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} h-full antialiased`}
    >
      <head>
        {/* Placeholder for Google Analytics (GA4) */}
        {/* <script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script> */}
        {/* Placeholder for Meta Pixel */}
      </head>
      <body className="min-h-full flex flex-col selection:bg-primary selection:text-white bg-background text-foreground">
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=AW-18175272091"
          strategy="afterInteractive"
        />
        <Script id="google-tag-inline" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'AW-18175272091');
          `}
        </Script>
        <Navbar />
        <main className="flex-grow flex flex-col">
          {children}
        </main>
        <Footer />
        <FloatingContact />
        <CookieConsent />
      </body>
    </html>
  );
}
