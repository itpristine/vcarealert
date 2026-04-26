"use client";

import { motion } from "framer-motion";
import { Heart, Shield, Clock, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function WhyWeExist() {
  const features = [
    {
      icon: <Heart className="w-8 h-8 text-white" />,
      title: "Compassionate Care",
      description: "We believe every senior deserves dignified, compassionate, and attentive care tailored to their unique needs and personal history.",
      colSpan: "sm:col-span-2",
      bgClass: "bg-white/10 backdrop-blur-md border-white/20 hover:bg-white/15"
    },
    {
      icon: <Shield className="w-7 h-7 text-white" />,
      title: "Uncompromising Security",
      description: "Our solutions are built on trust.",
      colSpan: "col-span-1",
      bgClass: "bg-white/10 backdrop-blur-md border-white/20 hover:bg-white/15"
    },
    {
      icon: <Clock className="w-7 h-7 text-white" />,
      title: "Always Accessible",
      description: "24/7 support when you need it.",
      colSpan: "col-span-1",
      bgClass: "bg-white/10 backdrop-blur-md border-white/20 hover:bg-white/15"
    }
  ];

  return (
    <section id="why-us" className="py-24 bg-primary text-white relative overflow-hidden">
      {/* Decorative Background */}
      <div className="absolute top-0 left-0 w-[400px] md:w-[600px] h-[400px] md:h-[600px] bg-white/5 rounded-full blur-3xl -translate-y-1/2 -translate-x-1/4 pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[300px] md:w-[500px] h-[300px] md:h-[500px] bg-blue-400/10 rounded-full blur-3xl translate-y-1/3 translate-x-1/4 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          
          {/* Left Content */}
          <div className="lg:col-span-5">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-sm font-bold text-blue-200 tracking-widest uppercase mb-3">
                Why We Exist
              </h2>
              <h3 className="text-4xl md:text-5xl font-extrabold text-white mb-6 tracking-tight leading-tight">
                Redefining the <br/> aging experience.
              </h3>
              <p className="text-lg text-blue-100 leading-relaxed mb-8">
                The narrative of aging is changing. It's no longer about slowing down; it's about moving forward with confidence. MediLife technology disappears into the background, silent until you need it, ensuring that "alone" never means "isolated."
              </p>
              
              <Link 
                href="#services" 
                className="inline-flex items-center gap-2 text-white font-semibold hover:text-blue-200 transition-colors group"
              >
                See how we help
                <ArrowRight className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>
          </div>

          {/* Right Bento Grid */}
          <div className="lg:col-span-7">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.15 }}
                  className={`${feature.colSpan} ${feature.bgClass} p-8 md:p-10 rounded-[2rem] shadow-sm border transition-all group`}
                >
                  <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mb-6 shadow-sm border border-white/10 group-hover:scale-110 transition-transform duration-300">
                    {feature.icon}
                  </div>
                  <h4 className="text-2xl font-bold text-white mb-3">{feature.title}</h4>
                  <p className="text-blue-100 leading-relaxed">{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
