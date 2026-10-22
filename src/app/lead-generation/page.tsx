import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ArrowRight, CheckCircle2 } from "lucide-react";
import LeadGenerationQuoteForm from "@/components/forms/LeadGenerationQuoteForm";

export const metadata: Metadata = {
  title: "Business Lead Generation",
  description:
    "Request a customized quote for VCare Alert and industry-specific lead generation. Share your target audience, location, and lead volume.",
  alternates: {
    canonical: "https://www.vcarealert.com/lead-generation",
  },
};

const services = [
  "VCare Alert and medical alert systems",
  "Durable medical equipment",
  "Reverse mortgage and senior insurance",
  "Walk-in bathtubs and final expense",
  "Home security and genetic testing",
  "Other industries and business needs",
];

export default function LeadGenerationPage() {
  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <Link href="/" className="inline-flex items-center gap-2 text-gray-500 hover:text-primary transition-colors font-medium">
            <ArrowLeft className="w-5 h-5" />
            Back to Home
          </Link>
        </div>

        <section className="bg-white rounded-3xl border border-gray-100 shadow-sm p-8 sm:p-12 lg:p-16 mb-16 overflow-hidden relative">
          <div className="absolute -right-20 -top-24 w-80 h-80 rounded-full bg-primary/10 blur-3xl pointer-events-none" />
          <div className="relative z-10 max-w-3xl">
            <span className="inline-flex items-center px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-semibold border border-primary/20 mb-6">
              Business Lead Generation
            </span>
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 tracking-tight leading-tight">
              Leads tailored to your business.
            </h1>
            <p className="text-lg text-gray-600 mb-8 leading-relaxed max-w-2xl">
              From VCare Alert to other relevant industries, tell us who you want to
              reach, where you want to reach them, and how many leads you need. We’ll
              follow up with a quotation based on your requirements.
            </p>
            <Link
              href="#request-quote"
              className="inline-flex items-center gap-2 px-7 py-4 rounded-xl bg-primary text-white font-semibold hover:bg-blue-600 transition-colors shadow-lg shadow-primary/20"
            >
              Get a Quote
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </section>

        <section aria-labelledby="lead-services-heading" className="mb-16">
          <div className="text-center mb-10">
            <h2 id="lead-services-heading" className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 tracking-tight">
              Lead programs for a range of industries
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Choose VCare Alert or another business category. If you don’t see your
              industry listed, select Other in the form and tell us more.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {services.map((service) => (
              <div key={service} className="flex items-start gap-3 bg-white p-5 rounded-2xl border border-gray-100 shadow-sm">
                <CheckCircle2 className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                <span className="font-medium text-gray-700">{service}</span>
              </div>
            ))}
          </div>
        </section>

        <section id="request-quote" className="scroll-mt-28">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 tracking-tight">
              Tell us what you need
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Include your contact details and campaign requirements, and our team
              will be in touch with a customized quotation.
            </p>
          </div>
          <div className="max-w-4xl mx-auto">
            <LeadGenerationQuoteForm />
          </div>
        </section>
      </div>
    </div>
  );
}
