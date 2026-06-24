"use client";

import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X, Phone } from "lucide-react";

export default function FloatingContact() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 50, scale: 0.9 }}
          transition={{ duration: 0.3 }}
          className="fixed bottom-6 right-6 z-40"
        >
          <a 
            href="tel:+18664221401" 
            className="flex items-center justify-center w-14 h-14 bg-primary text-white rounded-full shadow-lg hover:bg-blue-600 transition-all hover:scale-110 shadow-primary/30"
            aria-label="Call Us Now"
          >
            <Phone className="w-6 h-6" />
          </a>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
