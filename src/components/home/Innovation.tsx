"use client";

import { motion } from "framer-motion";
import { Sparkles, Cpu, ActivitySquare } from "lucide-react";

export default function Innovation() {
  return (
    <section id="innovation" className="py-24 bg-primary text-white overflow-hidden relative">
      {/* Decorative Background */}
      <div className="absolute top-0 right-0 w-[400px] md:w-[800px] h-[400px] md:h-[800px] bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[300px] md:w-[600px] h-[300px] md:h-[600px] bg-blue-400/10 rounded-full blur-3xl translate-y-1/3 -translate-x-1/4 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-blue-100 text-sm font-semibold mb-6 border border-white/20">
              <Sparkles className="w-4 h-4" />
              Innovation That Cares
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight leading-tight">
              Pioneering the next era of senior living.
            </h2>
            <p className="text-lg text-blue-100 mb-8 leading-relaxed max-w-lg">
              We leverage advanced analytics, intuitive smart devices, and seamless integrations to provide care that is predictive rather than reactive.
            </p>
            
            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-white/10 flex items-center justify-center">
                  <Cpu className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h4 className="text-xl font-semibold mb-2">Smart Monitoring</h4>
                  <p className="text-blue-200 text-sm md:text-base">Non-intrusive sensors and wearables that keep you connected to help 24/7.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-white/10 flex items-center justify-center">
                  <ActivitySquare className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h4 className="text-xl font-semibold mb-2">Predictive Health Insights</h4>
                  <p className="text-blue-200 text-sm md:text-base">Our systems analyze patterns to alert you and your loved ones before emergencies happen.</p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative px-4 sm:px-0"
          >
            <div className="aspect-square rounded-full bg-gradient-to-tr from-blue-500 to-primary p-1 sm:p-2 shadow-2xl relative mx-auto max-w-[400px] lg:max-w-none">
              <div className="w-full h-full rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center p-6 sm:p-8 md:p-12">
                <div className="grid grid-cols-2 gap-3 sm:gap-4 w-full h-full">
                   <div className="bg-white/10 rounded-3xl col-span-2 overflow-hidden relative">
                     <img src="/innovation-device.jpg" alt="Smart Monitoring Device" className="w-full h-full object-cover" />
                   </div>
                   <div className="bg-white/20 rounded-3xl overflow-hidden relative">
                     <img src="/innovation-active-senior.png" alt="Active Senior" className="w-full h-full object-cover" />
                   </div>
                   <div className="bg-white/10 rounded-3xl overflow-hidden relative">
                     <img src="/innovation-stretching-senior.png" alt="Stretching Senior" className="w-full h-full object-cover" />
                   </div>
                </div>
              </div>
              
              {/* Floating Stat Card */}
              <motion.div 
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute right-0 sm:-right-4 top-1/4 bg-white text-gray-900 p-4 sm:p-5 rounded-2xl shadow-xl max-w-[160px] sm:max-w-[200px]"
              >
                <div className="text-2xl sm:text-3xl font-bold text-primary mb-1">99.9%</div>
                <div className="text-xs sm:text-sm font-medium text-gray-600">System Uptime</div>
              </motion.div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
