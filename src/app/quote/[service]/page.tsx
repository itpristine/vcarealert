import LeadForm from "@/components/forms/LeadForm";
import Link from "next/link";
import { ArrowLeft, CheckCircle } from "lucide-react";
import { notFound } from "next/navigation";

// Define the available services and their details
const servicesData: Record<string, { title: string; description: string; benefits: string[] }> = {
  "durable-medical-equipment": {
    title: "Durable Medical Equipment",
    description: "Get access to top-tier medical equipment designed to improve your quality of life at home. We provide reliable and easy-to-use products.",
    benefits: ["Wheelchairs & Scooters", "Hospital Beds", "Oxygen Equipment", "Mobility Aids"]
  },
  "reverse-mortgage": {
    title: "Reverse Mortgage",
    description: "Leverage your home's equity to secure your retirement. Learn how a reverse mortgage can provide you with tax-free funds while you stay in your home.",
    benefits: ["Tax-Free Proceeds", "No Monthly Mortgage Payments", "Stay in Your Home", "Flexible Payment Options"]
  },
  "medical-alert-systems": {
    title: "Medical Alert Systems",
    description: "Enjoy peace of mind knowing help is just a button press away, 24/7. Our advanced systems offer fall detection and fast response times.",
    benefits: ["24/7 Monitoring", "Automatic Fall Detection", "GPS Location Tracking", "Water-resistant Pendants"]
  },
  "insurance-for-seniors": {
    title: "Insurance for Seniors",
    description: "Find the right coverage for your healthcare needs and protect your loved ones' financial future with our customized senior insurance plans.",
    benefits: ["Medicare Supplements", "Life Insurance", "Prescription Drug Coverage", "Dental & Vision Plans"]
  },
  "walk-in-bathtub": {
    title: "Walk-In Bathtub",
    description: "Transform your bathroom into a safe, spa-like environment. Our walk-in tubs reduce the risk of slips and falls while providing therapeutic benefits.",
    benefits: ["Low Step-in Threshold", "Hydrotherapy Jets", "Anti-slip Flooring", "Comfortable Seating"]
  },
  "final-expense": {
    title: "Final Expense Insurance",
    description: "Protect your family from the financial burden of end-of-life expenses. Affordable policies that are easy to qualify for.",
    benefits: ["Guaranteed Approval Options", "Fixed Premiums", "Fast Payouts", "Covers Funeral Costs"]
  },
  "genetic-testing": {
    title: "Genetic Testing",
    description: "Proactively manage your health by understanding your genetic predispositions. Personalized testing that guides your medical care.",
    benefits: ["Identify Hereditary Risks", "Personalized Medicine", "Non-invasive Testing", "Fast Results"]
  },
  "home-security-systems": {
    title: "Home Security Systems",
    description: "Protect your home and yourself with modern, easy-to-use security solutions tailored for senior living environments.",
    benefits: ["24/7 Professional Monitoring", "Smart Locks & Cameras", "Fire & Carbon Monoxide Alerts", "Easy-to-use Control Panels"]
  }
};

export default async function QuotePage({ params }: { params: Promise<{ service: string }> }) {
  const resolvedParams = await params;
  const serviceId = resolvedParams.service;
  const service = servicesData[serviceId];

  if (!service) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-28 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <Link href="/#services" className="inline-flex items-center text-sm font-medium text-gray-500 hover:text-primary mb-8 transition-colors">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Services
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          
          {/* Left Column: Service Details */}
          <div>
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 h-full">
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{service.title}</h1>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                {service.description}
              </p>
              
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Key Benefits</h3>
              <ul className="space-y-4">
                {service.benefits.map((benefit, idx) => (
                  <li key={idx} className="flex items-start">
                    <CheckCircle className="w-6 h-6 text-green-500 mr-3 flex-shrink-0" />
                    <span className="text-gray-700">{benefit}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-12 p-6 bg-blue-50 rounded-2xl border border-blue-100">
                <h4 className="font-semibold text-primary mb-2">Why Choose AuraHealth?</h4>
                <p className="text-sm text-gray-600">
                  We partner with top-rated providers across the USA to ensure you receive the highest quality service at the most competitive rates. Your safety, comfort, and satisfaction are guaranteed.
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Lead Form */}
          <div className="relative">
             <div className="absolute inset-0 bg-gradient-to-tr from-blue-100 to-white transform rotate-1 rounded-3xl blur" />
             <div className="relative">
               <LeadForm serviceId={serviceId} />
             </div>
          </div>

        </div>
      </div>
    </div>
  );
}
