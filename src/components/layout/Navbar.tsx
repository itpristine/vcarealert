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
            <div className="bg-primary/10 p-2 rounded-xl">
              <ShieldPlus className="w-8 h-8 text-primary" />
            </div>
            <span className="font-bold text-2xl tracking-tight text-gray-900">
              Aura<span className="text-primary">Health</span>
            </span>
          </Link>
          
          {/* Desktop Nav */}
          <div className="hidden md:flex space-x-8">
            <Link href="/#services" className="text-sm font-medium text-gray-600 hover:text-primary transition-colors">
              Services
            </Link>
            <Link href="/#why-us" className="text-sm font-medium text-gray-600 hover:text-primary transition-colors">
              Why Us
            </Link>
            <Link href="/#innovation" className="text-sm font-medium text-gray-600 hover:text-primary transition-colors">
              Innovation
            </Link>
            <Link href="/#faqs" className="text-sm font-medium text-gray-600 hover:text-primary transition-colors">
              FAQs
            </Link>
          </div>

          <div className="hidden md:flex items-center">
            <a href="tel:+18001234567" className="inline-flex items-center justify-center px-6 py-2.5 border border-transparent text-sm font-medium rounded-full text-white bg-primary hover:bg-blue-800 transition-colors shadow-sm shadow-primary/20">
              Call 1-800-123-4567
            </a>
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
        <div className="md:hidden absolute top-20 left-0 w-full bg-white border-b border-gray-100 shadow-lg px-4 py-6 flex flex-col space-y-6 animate-in slide-in-from-top-2">
          <Link href="/#services" onClick={() => setIsMobileMenuOpen(false)} className="text-lg font-medium text-gray-900">
            Services
          </Link>
          <Link href="/#why-us" onClick={() => setIsMobileMenuOpen(false)} className="text-lg font-medium text-gray-900">
            Why Us
          </Link>
          <Link href="/#innovation" onClick={() => setIsMobileMenuOpen(false)} className="text-lg font-medium text-gray-900">
            Innovation
          </Link>
          <Link href="/#faqs" onClick={() => setIsMobileMenuOpen(false)} className="text-lg font-medium text-gray-900">
            FAQs
          </Link>
          <div className="pt-4 border-t border-gray-100">
            <a href="tel:+18001234567" className="flex items-center justify-center w-full px-6 py-4 text-base font-medium rounded-full text-white bg-primary hover:bg-blue-800 transition-colors">
              Call 1-800-123-4567
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}
