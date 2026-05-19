import QuoteForm from "@/components/forms/QuoteForm";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Get a Free Quote",
  description:
    "Get a free, no-obligation quote for a medical alert system. Choose from home systems, mobile devices, and smartwatches with 24/7 monitoring.",
  alternates: {
    canonical: "https://www.vcarealert.com/quote",
  },
};

export default function GeneralQuotePage() {
  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <div className="mb-8">
          <Link href="/" className="inline-flex items-center gap-2 text-gray-500 hover:text-primary transition-colors font-medium">
            <ArrowLeft className="w-5 h-5" />
            Back to Home
          </Link>
        </div>
        
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 tracking-tight">
            Secure Your Independence
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Fill out the form below to get a free, no-obligation quote tailored to your specific needs.
          </p>
        </div>
        
        <QuoteForm />
      </div>
    </div>
  );
}
