import Link from "next/link";


export default function Footer() {
  return (
    <footer className="bg-gray-50 border-t border-gray-100 mt-auto text-gray-600 relative overflow-hidden">
      {/* Decorative Blob */}
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-primary/5 rounded-full blur-3xl translate-y-1/2 translate-x-1/3 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <span className="font-bold text-xl text-gray-900">
                vCare<span className="text-primary">Alert</span>
              </span>
            </Link>
            <p className="text-gray-500 max-w-sm leading-relaxed">
              Providing trusted, futuristic, and secure medical alert solutions for seniors across America. Your safety is our priority.
            </p>
          </div>
          
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Products</h3>
            <ul className="space-y-3">
              <li><Link href="/#products" className="text-sm text-gray-500 hover:text-primary transition-colors">Home System</Link></li>
              <li><Link href="/#products" className="text-sm text-gray-500 hover:text-primary transition-colors">Mobile Systems</Link></li>
              <li><Link href="/#products" className="text-sm text-gray-500 hover:text-primary transition-colors">Smartwatch</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Company</h3>
            <ul className="space-y-3">
              <li><Link href="/#why-us" className="text-sm text-gray-500 hover:text-primary transition-colors">Why Choose Us</Link></li>
              <li><Link href="/#how-it-works" className="text-sm text-gray-500 hover:text-primary transition-colors">How It Works</Link></li>
              <li><Link href="/#faqs" className="text-sm text-gray-500 hover:text-primary transition-colors">FAQs</Link></li>
              <li><Link href="#" className="text-sm text-gray-500 hover:text-primary transition-colors">Privacy Policy</Link></li>
              <li><Link href="#" className="text-sm text-gray-500 hover:text-primary transition-colors">Terms of Service</Link></li>
            </ul>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t border-gray-200">
          <p className="text-sm text-center text-gray-400">
            &copy; {new Date().getFullYear()} vCareAlert. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
