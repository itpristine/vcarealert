"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ShieldPlus, Menu, X } from "lucide-react";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    // Check on mount
    handleScroll();

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav 
      className={`fixed top-0 z-50 w-full transition-all duration-300 ${
        isScrolled || isMobileMenuOpen
          ? "bg-white border-b border-gray-100 shadow-sm" 
          : "bg-transparent border-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <Link href="/" className="flex items-center gap-2 relative z-50">
            <span className="font-bold text-2xl tracking-tight text-gray-900">
              vCare<span className="text-primary">Alert</span>
            </span>
          </Link>
          
          {/* Desktop Nav */}
          <div className="hidden md:flex space-x-8">
            <Link href="/#products" className="text-sm font-medium text-gray-600 hover:text-primary transition-colors">
              Products
            </Link>
            <Link href="/#how-it-works" className="text-sm font-medium text-gray-600 hover:text-primary transition-colors">
              How It Works
            </Link>
            <Link href="/#why-us" className="text-sm font-medium text-gray-600 hover:text-primary transition-colors">
              Why Choose Us
            </Link>
            <Link href="/#faqs" className="text-sm font-medium text-gray-600 hover:text-primary transition-colors">
              FAQs
            </Link>
          </div>

          <div className="hidden md:flex items-center">
            <Link 
              href="/quote"
              className="inline-flex items-center justify-center px-6 py-2.5 border border-transparent text-sm font-medium rounded-full text-white bg-primary hover:bg-blue-600 transition-colors shadow-sm shadow-primary/20"
            >
              Get a Free Quote
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-gray-900 p-2 focus:outline-none"
            >
              {isMobileMenuOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav Overlay */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-20 left-0 w-full bg-white/95 backdrop-blur-md border-b border-gray-100 shadow-lg px-4 py-6 flex flex-col space-y-6 animate-in slide-in-from-top-2">
          <Link href="/#products" onClick={() => setIsMobileMenuOpen(false)} className="text-lg font-medium text-gray-900">
            Products
          </Link>
          <Link href="/#how-it-works" onClick={() => setIsMobileMenuOpen(false)} className="text-lg font-medium text-gray-900">
            How It Works
          </Link>
          <Link href="/#why-us" onClick={() => setIsMobileMenuOpen(false)} className="text-lg font-medium text-gray-900">
            Why Choose Us
          </Link>
          <Link href="/#faqs" onClick={() => setIsMobileMenuOpen(false)} className="text-lg font-medium text-gray-900">
            FAQs
          </Link>
          <div className="pt-4 border-t border-gray-100">
            <Link 
              href="/quote"
              onClick={() => setIsMobileMenuOpen(false)}
              className="flex items-center justify-center w-full px-6 py-4 text-base font-medium rounded-full text-white bg-primary hover:bg-blue-600 transition-colors"
            >
              Get a Free Quote
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
