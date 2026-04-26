import Link from "next/link";
import { ShieldPlus } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-primary border-t border-blue-900 mt-auto text-white relative overflow-hidden">
      {/* Decorative Blob */}
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-white/5 rounded-full blur-3xl translate-y-1/2 translate-x-1/3 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <ShieldPlus className="w-6 h-6 text-white" />
              <span className="font-bold text-xl text-white">
                Aura<span className="text-blue-200">Health</span>
              </span>
            </Link>
            <p className="text-blue-100/80 max-w-sm leading-relaxed">
              Providing trusted, futuristic, and secure healthcare solutions for seniors across America. Your wellness is our mission.
            </p>
          </div>
          
          <div>
            <h3 className="font-semibold text-white mb-4">Services</h3>
            <ul className="space-y-3">
              <li><Link href="/quote/medical-equipment" className="text-sm text-blue-100/70 hover:text-white transition-colors">Medical Equipment</Link></li>
              <li><Link href="/quote/medical-alert-systems" className="text-sm text-blue-100/70 hover:text-white transition-colors">Medical Alerts</Link></li>
              <li><Link href="/quote/insurance" className="text-sm text-blue-100/70 hover:text-white transition-colors">Senior Insurance</Link></li>
              <li><Link href="/quote/walk-in-bathtub" className="text-sm text-blue-100/70 hover:text-white transition-colors">Walk-in Bathtubs</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-white mb-4">Company</h3>
            <ul className="space-y-3">
              <li><Link href="/#why-us" className="text-sm text-blue-100/70 hover:text-white transition-colors">About Us</Link></li>
              <li><Link href="/#faqs" className="text-sm text-blue-100/70 hover:text-white transition-colors">FAQs</Link></li>
              <li><Link href="#" className="text-sm text-blue-100/70 hover:text-white transition-colors">Privacy Policy</Link></li>
              <li><Link href="#" className="text-sm text-blue-100/70 hover:text-white transition-colors">Terms of Service</Link></li>
            </ul>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t border-white/10">
          <p className="text-sm text-center text-blue-100/50">
            &copy; {new Date().getFullYear()} AuraHealth. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
