import type { Metadata } from "next";
import { Shield, Eye, Database, Handshake, Lock, HeartPulse, Phone, Mail, FileText } from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "Learn about how vCareAlert collects, uses, protects, and handles your personal, medical, and location data. Your safety and privacy are our highest priorities.",
  alternates: {
    canonical: "https://www.vcarealert.com/privacy",
  },
};

const SECTIONS = [
  { id: "introduction", label: "1. Introduction", icon: Shield },
  { id: "information-collected", label: "2. Information We Collect", icon: Database },
  { id: "use-of-information", label: "3. How We Use Information", icon: Eye },
  { id: "sharing-of-information", label: "4. Information Sharing", icon: Handshake },
  { id: "data-security", label: "5. Data Security", icon: Lock },
  { id: "hipaa-compliance", label: "6. HIPAA & Medical Info", icon: HeartPulse },
  { id: "rights-and-choices", label: "7. Your Rights & Choices", icon: FileText },
];

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-gray-50/50">
      {/* Premium Hero Header */}
      <div className="relative overflow-hidden bg-gradient-to-b from-sky-50/40 via-slate-50 to-white pt-32 pb-20 lg:pt-36 lg:pb-24 border-b border-slate-100">
        {/* Dynamic Blobs */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl translate-x-1/3 -translate-y-1/3 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-accent/5 rounded-full blur-3xl -translate-x-1/3 translate-y-1/3 pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-semibold mb-6">
              <Shield className="w-4 h-4 text-primary animate-pulse" />
              Privacy Shield Protection
            </div>
            <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-6 text-slate-900">
              Privacy Policy
            </h1>
            <p className="text-lg text-slate-600 leading-relaxed font-light">
              At vCareAlert, we provide life-saving emergency monitoring systems. To deliver these essential services, we collect and process certain personal, location, and medical data. This policy outlines our legal commitments to securing your information.
            </p>
            <p className="text-sm text-slate-400 mt-6 font-medium">
              Last updated: June 24, 2026
            </p>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Sticky Navigation Sidebar */}
          <aside className="lg:col-span-4 lg:sticky lg:top-24 h-fit">
            <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
              <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4 px-2">
                Table of Contents
              </h2>
              <nav className="space-y-1.5">
                {SECTIONS.map((section) => {
                  const IconComponent = section.icon;
                  return (
                    <a
                      key={section.id}
                      href={`#${section.id}`}
                      className="group flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-slate-600 hover:text-primary hover:bg-primary/5 transition-all"
                    >
                      <IconComponent className="w-4 h-4 text-slate-400 group-hover:text-primary transition-colors" />
                      <span>{section.label}</span>
                    </a>
                  );
                })}
              </nav>

              <hr className="my-6 border-gray-100" />

              {/* Direct Help Widget */}
              <div className="bg-slate-50 rounded-xl p-4 border border-slate-100">
                <h3 className="font-semibold text-sm text-slate-900 mb-2">Privacy Inquiries</h3>
                <p className="text-xs text-slate-500 mb-4 leading-relaxed">
                  Have questions about your data security or subscription privacy?
                </p>
                <div className="space-y-2">
                  <a
                    href="tel:18664221401"
                    className="flex items-center gap-2 text-xs font-bold text-slate-900 hover:text-primary transition-colors"
                  >
                    <Phone className="w-3.5 h-3.5 text-primary" />
                    1-866-422-1401
                  </a>
                  <div className="flex items-center gap-2 text-xs text-slate-500">
                    <Mail className="w-3.5 h-3.5 text-slate-400" />
                    info@vcarealert.com
                  </div>
                </div>
              </div>
            </div>
          </aside>

          {/* Policy Detail Sections */}
          <main className="lg:col-span-8 space-y-12">
            
            {/* Section 1: Introduction */}
            <section id="introduction" className="scroll-mt-24 bg-white rounded-2xl border border-gray-100 p-8 shadow-sm hover:border-primary/20 transition-all">
              <div className="flex items-center gap-3.5 mb-6">
                <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center text-primary">
                  <Shield className="w-5 h-5" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">1. Introduction</h2>
              </div>
              <div className="prose max-w-none text-gray-600 space-y-4 leading-relaxed">
                <p>
                  vCareAlert (“we”, “us”, or “our”) respects the privacy of our subscribers, users, and website visitors. This Privacy Policy describes how we collect, use, store, share, and protect your information when you subscribe to our medical alert services, use our mobile application, visit our website, or interact with our emergency response systems.
                </p>
                <p>
                  By accessing or using our services, you consent to the data collection and usage practices described in this policy. If you do not agree with these practices, please contact us immediately to cancel your services.
                </p>
              </div>
            </section>

            {/* Section 2: Information We Collect */}
            <section id="information-collected" className="scroll-mt-24 bg-white rounded-2xl border border-gray-100 p-8 shadow-sm hover:border-primary/20 transition-all">
              <div className="flex items-center gap-3.5 mb-6">
                <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center text-primary">
                  <Database className="w-5 h-5" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">2. Information We Collect</h2>
              </div>
              <div className="prose max-w-none text-gray-600 space-y-4 leading-relaxed">
                <p>
                  To provide dynamic and life-saving monitoring, we must collect information that can identify you. This includes:
                </p>
                <ul className="list-disc pl-5 space-y-2 text-sm">
                  <li>
                    <strong className="text-gray-800">Subscriber Profile:</strong> Name, physical address (billing and monitoring location), phone number, email address, date of birth, gender, and preferred language.
                  </li>
                  <li>
                    <strong className="text-gray-800">Emergency Contacts:</strong> Names, relationships, and phone numbers of family members, caregivers, or friends whom we notify in an emergency.
                  </li>
                  <li>
                    <strong className="text-gray-800">Device Location & Telemetry:</strong> Real-time GPS coordinate history, Wi-Fi triangulation, cellular signal strength, accelerometer/movement data (for automatic fall detection), and battery/system health metrics.
                  </li>
                  <li>
                    <strong className="text-gray-800">Medical Disclosures:</strong> Information you voluntarily share (e.g., preexisting conditions, lockbox codes, keyholder info, primary physician details) that helps emergency services treat you.
                  </li>
                  <li>
                    <strong className="text-gray-800">Billing Information:</strong> Credit card numbers, expiration dates, and billing addresses processed securely via PCI-compliant payment gateways.
                  </li>
                </ul>
              </div>
            </section>

            {/* Section 3: How We Use Information */}
            <section id="use-of-information" className="scroll-mt-24 bg-white rounded-2xl border border-gray-100 p-8 shadow-sm hover:border-primary/20 transition-all">
              <div className="flex items-center gap-3.5 mb-6">
                <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center text-primary">
                  <Eye className="w-5 h-5" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">3. How We Use Information</h2>
              </div>
              <div className="prose max-w-none text-gray-600 space-y-4 leading-relaxed">
                <p>
                  We use your personal, location, and medical data for operations that directly support your safety:
                </p>
                <ul className="list-disc pl-5 space-y-2 text-sm">
                  <li>
                    <strong className="text-gray-800">Emergency Dispatch:</strong> Routing your device calls, location, and medical info to certified 24/7 central monitoring centers and public safety answering points (PSAPs/911 operators).
                  </li>
                  <li>
                    <strong className="text-gray-800">Fall Detection Calibration:</strong> Analyzing sensor data from devices to continuously refine fall-detection algorithms and reduce false alarms.
                  </li>
                  <li>
                    <strong className="text-gray-800">Account Management:</strong> Processing payments, validating subscription details, and verifying emergency contact availability.
                  </li>
                  <li>
                    <strong className="text-gray-800">Service Communication:</strong> Informing you or your designated contacts of device system alerts, low batteries, network outages, or updates.
                  </li>
                </ul>
              </div>
            </section>

            {/* Section 4: Information Sharing */}
            <section id="sharing-of-information" className="scroll-mt-24 bg-white rounded-2xl border border-gray-100 p-8 shadow-sm hover:border-primary/20 transition-all">
              <div className="flex items-center gap-3.5 mb-6">
                <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center text-primary">
                  <Handshake className="w-5 h-5" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">4. Information Sharing</h2>
              </div>
              <div className="prose max-w-none text-gray-600 space-y-4 leading-relaxed">
                <p>
                  We do not sell, rent, or trade your personal data to marketing third parties. We share information only under the following strict scenarios:
                </p>
                <ul className="list-disc pl-5 space-y-2 text-sm">
                  <li>
                    <strong className="text-gray-800">First Responders:</strong> Police department, fire department, ambulance services, or emergency medical technicians (EMTs) who are dispatched to protect you.
                  </li>
                  <li>
                    <strong className="text-gray-800">Emergency Monitoring Services:</strong> Our designated UL-listed monitoring partners who receive the alarm signal and speak to you over the two-way voice console.
                  </li>
                  <li>
                    <strong className="text-gray-800">Service Providers:</strong> Cellular carrier networks (e.g., AT&T, Verizon) that facilitate the connection, and secure cloud storage providers.
                  </li>
                  <li>
                    <strong className="text-gray-800">Legal Compliance:</strong> If required by law, subpoena, court order, or to protect the safety, properties, and rights of vCareAlert, our subscribers, or the general public.
                  </li>
                </ul>
              </div>
            </section>

            {/* Section 5: Data Security */}
            <section id="data-security" className="scroll-mt-24 bg-white rounded-2xl border border-gray-100 p-8 shadow-sm hover:border-primary/20 transition-all">
              <div className="flex items-center gap-3.5 mb-6">
                <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center text-primary">
                  <Lock className="w-5 h-5" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">5. Data Security</h2>
              </div>
              <div className="prose max-w-none text-gray-600 space-y-4 leading-relaxed">
                <p>
                  We secure your transmission and account details using robust technological safeguards:
                </p>
                <p>
                  All online communications with our customer portal and signup pages are encrypted using Secure Socket Layer (SSL/TLS) protocols. Data stored in our database servers is encrypted at rest and accessible only by authorized employees with verified permissions.
                </p>
                <p className="text-sm text-gray-500">
                  Please remember that no method of transmission over the Internet, or method of electronic storage, is 100% secure. While we strive to use commercially acceptable means to protect your personal information, we cannot guarantee its absolute security.
                </p>
              </div>
            </section>

            {/* Section 6: HIPAA & Medical Information */}
            <section id="hipaa-compliance" className="scroll-mt-24 bg-white rounded-2xl border border-gray-100 p-8 shadow-sm hover:border-primary/20 transition-all">
              <div className="flex items-center gap-3.5 mb-6">
                <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center text-primary">
                  <HeartPulse className="w-5 h-5" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">6. HIPAA & Medical Information</h2>
              </div>
              <div className="prose max-w-none text-gray-600 space-y-4 leading-relaxed">
                <p>
                  vCareAlert is a provider of personal safety and emergency monitoring equipment. While medical alert providers are generally not classified as covered entities under the Health Insurance Portability and Accountability Act (HIPAA), we protect all physical and health details you supply with the same level of care as medical professionals.
                </p>
                <p>
                  Your medical history, lockbox codes, and list of health conditions are strictly restricted. They are shared only with the emergency dispatcher and dispatched responders to help them treat you safely.
                </p>
              </div>
            </section>

            {/* Section 7: Your Rights & Choices */}
            <section id="rights-and-choices" className="scroll-mt-24 bg-white rounded-2xl border border-gray-100 p-8 shadow-sm hover:border-primary/20 transition-all">
              <div className="flex items-center gap-3.5 mb-6">
                <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center text-primary">
                  <FileText className="w-5 h-5" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">7. Your Rights & Choices</h2>
              </div>
              <div className="prose max-w-none text-gray-600 space-y-4 leading-relaxed">
                <p>
                  You hold rights regarding how we maintain your personal file:
                </p>
                <ul className="list-disc pl-5 space-y-2 text-sm">
                  <li>
                    <strong className="text-gray-800">Update Profile:</strong> You can contact our support line at any time to revise emergency contacts, phone numbers, or medication lists.
                  </li>
                  <li>
                    <strong className="text-gray-800">Location Control:</strong> GPS tracking is a core requirement of our cellular mobile systems to coordinate rescue operations. If you wish to disable GPS tracking, you must terminate mobile service.
                  </li>
                  <li>
                    <strong className="text-gray-800">Opt-Out:</strong> You can opt-out of promotional marketing emails or mailers by clicking the "Unsubscribe" button or notifying customer service.
                  </li>
                </ul>
              </div>
            </section>

            {/* Contact Card */}
            <div className="bg-gradient-to-br from-slate-900 to-slate-950 text-white rounded-2xl p-8 border border-slate-800 shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-2xl pointer-events-none" />
              <h3 className="text-2xl font-bold mb-3">Questions about your privacy?</h3>
              <p className="text-slate-400 text-sm leading-relaxed mb-6 max-w-xl">
                We are committed to resolving any inquiries regarding how your data is handled. Please contact our data privacy officer:
              </p>
              <div className="flex flex-col sm:flex-row gap-6">
                <a
                  href="tel:18664221401"
                  className="flex items-center gap-3 bg-white/10 hover:bg-white/15 px-5 py-3 rounded-xl border border-white/15 transition-all text-sm font-semibold w-fit"
                >
                  <Phone className="w-4 h-4 text-primary" />
                  1-866-422-1401 (Toll-Free)
                </a>
                <div className="flex items-center gap-3 px-5 py-3 rounded-xl text-sm font-semibold text-slate-300">
                  <Mail className="w-4 h-4 text-primary" />
                  info@vcarealert.com
                </div>
              </div>
            </div>

          </main>
        </div>
      </div>
    </div>
  );
}
