"use client";

import { motion } from "framer-motion";
import { Search, Link as LinkIcon, ShieldCheck } from "lucide-react";

export default function HowItWorks() {
  const steps = [
    {
      icon: <Search className="w-10 h-10 text-white" />,
      title: "Choose a Device",
      description: "Select from our range of home, mobile, or smartwatch systems tailored to your lifestyle and medical needs."
    },
    {
      icon: <LinkIcon className="w-10 h-10 text-white" />,
      title: "Get Connected",
      description: "Our systems are plug-and-play. We set up your account so you're connected to our response center immediately."
    },
    {
      icon: <ShieldCheck className="w-10 h-10 text-white" />,
      title: "Stay Protected",
      description: "Enjoy 24/7/365 peace of mind knowing our trained specialists are just a button press away, ready to assist."
    }
  ];

  return (
    <section id="how-it-works" className="py-24 bg-gray-50 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-20">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-3xl md:text-5xl font-bold text-gray-900 mb-6 tracking-tight"
          >
            How It Works
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-lg text-gray-600 max-w-2xl mx-auto"
          >
            Securing your independence is simple. Get started in three easy steps.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
          {/* Connecting Line */}
          <div className="hidden md:block absolute top-12 left-[15%] right-[15%] h-0.5 bg-gray-200" />
          
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="relative flex flex-col items-center text-center"
            >
              <div className="w-24 h-24 rounded-full bg-primary flex items-center justify-center mb-8 shadow-xl shadow-primary/30 z-10 border-4 border-white">
                {step.icon}
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">{step.title}</h3>
              <p className="text-gray-600 leading-relaxed max-w-sm">{step.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
