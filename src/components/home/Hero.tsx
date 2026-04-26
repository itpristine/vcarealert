"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Activity, ShieldCheck, HeartPulse } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative min-h-[90vh] flex items-center pt-28 pb-16 overflow-hidden bg-white">
      {/* Abstract Background Shapes */}
      <div className="absolute top-0 right-0 -translate-y-1/4 translate-x-1/4 w-[400px] md:w-[800px] h-[400px] md:h-[800px] bg-blue-50 rounded-full blur-3xl opacity-50 pointer-events-none" />
      <div className="absolute bottom-0 left-0 translate-y-1/4 -translate-x-1/4 w-[300px] md:w-[600px] h-[300px] md:h-[600px] bg-gray-50 rounded-full blur-3xl opacity-50 pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-12 items-center">
        
        {/* Text Content */}
        <div className="max-w-2xl mt-8 md:mt-0">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-primary text-sm font-semibold mb-6 border border-blue-100"
          >
            <Activity className="w-4 h-4" />
            Next-Gen Senior Care
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-gray-900 tracking-tight leading-tight mb-6"
          >
            The Future of <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-400">
              Senior Healthcare
            </span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-base sm:text-lg text-gray-600 mb-8 max-w-lg leading-relaxed"
          >
            Experience unparalleled peace of mind with our advanced, secure, and compassionate healthcare solutions. We bring tomorrow's care to you today.
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <Link 
              href="#services"
              className="inline-flex justify-center items-center gap-2 px-8 py-4 rounded-full bg-primary text-white font-medium hover:bg-blue-800 transition-all shadow-lg shadow-primary/30 hover:shadow-xl hover:shadow-primary/40 hover:-translate-y-0.5"
            >
              Explore Services
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link 
              href="#why-us"
              className="inline-flex justify-center items-center gap-2 px-8 py-4 rounded-full bg-white text-gray-700 font-medium hover:bg-gray-50 border border-gray-200 transition-all hover:border-gray-300"
            >
              Learn More
            </Link>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="mt-10 sm:mt-12 flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6 text-sm text-gray-500 font-medium"
          >
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-green-500" />
              Trusted by 10k+ Seniors
            </div>
            <div className="flex items-center gap-2">
              <HeartPulse className="w-5 h-5 text-red-400" />
              24/7 Support
            </div>
          </motion.div>
        </div>

        {/* Image Grid / Visual */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative px-4 sm:px-0"
        >
          <div className="aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl relative bg-gray-100 border border-white/20">
            {/* The image src will be updated once generated */}
            <img 
              src="/hero-nurse-patient.jpg" 
              alt="Compassionate Senior Care" 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
          </div>
          
          {/* Floating Card */}
          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="absolute -bottom-4 left-6 sm:-bottom-6 sm:-left-6 bg-white p-4 sm:p-6 rounded-2xl shadow-xl border border-gray-100 max-w-[240px] sm:max-w-xs"
          >
            <div className="flex items-center gap-3 sm:gap-4 mb-3">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-50 rounded-full flex items-center justify-center flex-shrink-0">
                <ShieldCheck className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
              </div>
              <div>
                <div className="text-sm font-bold text-gray-900 leading-tight">Secure & Reliable</div>
                <div className="text-xs text-gray-500">A+ Rated Services</div>
              </div>
            </div>
            <div className="w-full bg-gray-100 rounded-full h-2">
              <div className="bg-primary h-2 rounded-full w-full" />
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
