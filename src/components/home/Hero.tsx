"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Activity, ShieldCheck, Play, CheckCircle2 } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative min-h-[90vh] flex items-center pt-32 pb-20 overflow-hidden bg-gray-50">
      {/* Dynamic Background Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>
      
      {/* Gradient Orbs */}
      <div className="absolute top-0 right-0 -translate-y-1/4 translate-x-1/4 w-[300px] md:w-[500px] h-[300px] md:h-[500px] bg-primary/20 rounded-full blur-[100px] opacity-60 mix-blend-multiply pointer-events-none" />
      <div className="absolute bottom-0 left-0 translate-y-1/4 -translate-x-1/4 w-[300px] md:w-[500px] h-[300px] md:h-[500px] bg-accent/20 rounded-full blur-[100px] opacity-60 mix-blend-multiply pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
        
        {/* Text Content */}
        <div className="lg:col-span-6 relative z-20 text-center lg:text-left">
          
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-gray-900 tracking-tight leading-[1.1] mb-6"
          >
            Independence <br className="hidden sm:block" />
            <span className="relative inline-block mt-2">
              <span className="relative z-10 text-transparent bg-clip-text bg-gradient-to-r from-primary via-blue-500 to-accent">
                Never Felt Safer
              </span>
              <motion.span 
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
                className="absolute bottom-1 sm:bottom-2 left-0 h-3 sm:h-4 bg-accent/20 -z-10 rounded-full transform -rotate-1"
              ></motion.span>
            </span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-base sm:text-lg lg:text-xl text-gray-600 mb-10 max-w-lg mx-auto lg:mx-0 leading-relaxed font-medium"
          >
            Experience unparalleled peace of mind with our advanced, discrete, and responsive medical alert systems. 24/7 protection, wherever life takes you.
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="flex flex-col sm:flex-row justify-center lg:justify-start gap-4 mb-12"
          >
            <Link 
              href="/quote"
              className="group relative inline-flex justify-center items-center gap-3 px-6 sm:px-8 py-4 rounded-2xl bg-gray-900 text-white font-bold text-base sm:text-lg overflow-hidden transition-transform hover:scale-[1.02] shadow-xl shadow-gray-900/20"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-primary to-blue-600 translate-y-[100%] group-hover:translate-y-[0%] transition-transform duration-300 ease-out"></div>
              <span className="relative z-10 flex items-center gap-2">
                Get Your Free Quote
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </span>
            </Link>
            
            <Link 
              href="#how-it-works"
              className="inline-flex justify-center items-center gap-3 px-6 sm:px-8 py-4 rounded-2xl bg-white text-gray-800 font-bold text-base sm:text-lg border-2 border-gray-100 hover:border-gray-200 hover:bg-gray-50 transition-all"
            >
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gray-100 rounded-full flex items-center justify-center">
                <Play className="w-3 h-3 sm:w-4 sm:h-4 text-gray-900 fill-gray-900 ml-0.5" />
              </div>
              See How It Works
            </Link>
          </motion.div>
        </div>

        {/* Dynamic Image Grid */}
        <div className="lg:col-span-6 relative h-[350px] sm:h-[450px] lg:h-[600px] mt-8 lg:mt-0 w-full max-w-[500px] lg:max-w-none mx-auto">
          
          <motion.div 
            initial={{ opacity: 0, y: 50, rotate: -5 }}
            animate={{ opacity: 1, y: 0, rotate: -2 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="absolute top-0 right-0 w-[85%] sm:w-4/5 h-[250px] sm:h-[320px] lg:h-[450px] rounded-[1.5rem] lg:rounded-[2rem] overflow-hidden shadow-2xl border-4 border-white z-10"
          >
            <img 
              src="https://images.unsplash.com/photo-1581056771107-24ca5f033842?q=80&w=1000&auto=format&fit=crop" 
              alt="Elderly using medical alert" 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-gray-900/60 via-transparent to-transparent"></div>
            <div className="absolute bottom-4 sm:bottom-6 left-4 sm:left-6 right-4 sm:right-6">
              <div className="bg-white/20 backdrop-blur-md border border-white/30 rounded-xl p-3 sm:p-4 flex items-center gap-3 sm:gap-4 text-white">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-white/30 rounded-full flex items-center justify-center flex-shrink-0">
                  <Activity className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                </div>
                <div>
                  <div className="font-bold text-sm sm:text-base">24/7 Monitoring</div>
                  <div className="text-xs sm:text-sm text-white/80">12s average response</div>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: -50, rotate: 5 }}
            animate={{ opacity: 1, x: 0, rotate: 3 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="absolute bottom-0 left-0 w-[70%] sm:w-3/5 h-[200px] sm:h-[260px] lg:h-[350px] rounded-[1.5rem] lg:rounded-[2rem] overflow-hidden shadow-2xl border-4 border-white z-20"
          >
            <img 
              src="https://images.unsplash.com/photo-1579586337278-3befd40fd17a?q=80&w=1000&auto=format&fit=crop" 
              alt="Medical Alert Smartwatch" 
              className="w-full h-full object-cover"
            />
            <div className="absolute top-3 sm:top-4 left-3 sm:left-4">
              <div className="bg-white px-3 sm:px-4 py-1.5 sm:py-2 rounded-full shadow-lg flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-green-500" />
                <span className="text-xs sm:text-sm font-bold text-gray-900">Fall Detection</span>
              </div>
            </div>
          </motion.div>
          
        </div>
      </div>
    </section>
  );
}
