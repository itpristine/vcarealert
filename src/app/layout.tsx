import type { Metadata } from "next";
import { Inter } from "next/font/google";
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
  title: "vCareAlert | Advanced Medical Alert Systems",
  description: "Futuristic and reliable medical alert solutions for seniors. Get your free quote today.",
  openGraph: {
    title: "vCareAlert | Advanced Medical Alert Systems",
    description: "Futuristic and reliable medical alert solutions for seniors.",
    type: "website",
  }
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
