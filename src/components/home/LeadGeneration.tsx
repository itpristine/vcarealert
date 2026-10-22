import Link from "next/link";
import { ArrowRight, Building2, MapPin, Target, Users } from "lucide-react";

const leadTypes = [
  "VCare Alert",
  "Durable Medical Equipment",
  "Reverse Mortgage",
  "Senior Insurance",
  "Walk-In Bathtubs",
  "Final Expense",
  "Home Security",
  "Genetic Testing",
];

const benefits = [
  {
    icon: <Target className="w-5 h-5" />,
    title: "Built around your goals",
    description: "Share your audience, locations, and volume to shape a tailored lead program.",
  },
  {
    icon: <Building2 className="w-5 h-5" />,
    title: "Industry-specific requests",
    description: "Request VCare Alert leads or tell us about another industry or business.",
  },
  {
    icon: <MapPin className="w-5 h-5" />,
    title: "Targeted by location",
    description: "Tell us the markets you want to reach and the number of leads you need.",
  },
];

export default function LeadGeneration() {
  return (
    <section id="lead-generation" className="py-24 bg-gray-50 relative overflow-hidden">
      <div className="absolute -top-24 -right-20 w-96 h-96 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-semibold mb-6 border border-primary/20">
              <Users className="w-4 h-4" />
              Business Lead Generation
            </div>
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6 tracking-tight leading-tight">
              Reach the right people for your business.
            </h2>
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              Looking for leads for VCare Alert or another industry? Tell us about your
              audience, target locations, and volume. Our team will review your needs
              and prepare a customized quotation.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-9">
              {leadTypes.map((type) => (
                <div key={type} className="flex items-center gap-2 text-gray-700 font-medium">
                  <span className="w-2 h-2 rounded-full bg-accent flex-shrink-0" />
                  {type}
                </div>
              ))}
              <div className="flex items-center gap-2 text-gray-700 font-medium">
                <span className="w-2 h-2 rounded-full bg-accent flex-shrink-0" />
                Other industries
              </div>
            </div>

            <Link
              href="/lead-generation#request-quote"
              className="inline-flex items-center gap-2 px-7 py-4 rounded-xl bg-primary text-white font-semibold hover:bg-blue-600 transition-colors shadow-lg shadow-primary/20"
            >
              Request a Quotation
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>

          <div className="bg-white rounded-3xl border border-gray-100 shadow-xl p-8 sm:p-10">
            <h3 className="text-2xl font-bold text-gray-900 mb-7">A quote tailored to your needs</h3>
            <div className="space-y-6">
              {benefits.map((benefit) => (
                <div key={benefit.title} className="flex gap-4">
                  <div className="w-11 h-11 rounded-xl bg-primary/10 text-primary flex items-center justify-center flex-shrink-0">
                    {benefit.icon}
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">{benefit.title}</h4>
                    <p className="text-sm text-gray-600 leading-relaxed">{benefit.description}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-8 pt-6 border-t border-gray-100">
              <p className="text-sm text-gray-500">
                Have a unique audience or campaign in mind? Include the details in your request and we’ll be in touch.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
