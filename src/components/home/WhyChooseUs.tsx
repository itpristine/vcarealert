"use client";

import { motion } from "framer-motion";
import { Zap, MapPin, DollarSign, Award } from "lucide-react";

export default function WhyChooseUs() {
  const features = [
    {
      icon: <Zap className="w-8 h-8 text-primary" />,
      title: "Fast Response Time",
      description: "In an emergency, every second counts. Our response centers answer calls in seconds, ensuring you get help immediately."
    },
    {
      icon: <MapPin className="w-8 h-8 text-primary" />,
      title: "US-Based Specialists",
      description: "Speak with highly trained, compassionate operators located right here in the United States, available 24/7/365."
    },
    {
      icon: <DollarSign className="w-8 h-8 text-primary" />,
      title: "No Hidden Fees",
      description: "Transparent pricing with no long-term contracts, no cancellation fees, and no unexpected equipment charges."
    },
    {
      icon: <Award className="w-8 h-8 text-primary" />,
      title: "FDA Registered",
      description: "Our medical alert systems are fully FDA registered and adhere to the highest industry standards for reliability and safety."
    }
  ];

  return (
    <section id="why-us" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6 tracking-tight leading-tight">
              Why thousands trust <br/><span className="text-primary">vCareAlert</span> every day.
            </h2>
            <p className="text-lg text-gray-600 mb-8 leading-relaxed max-w-lg">
              We don't just provide devices; we provide peace of mind. Our commitment to excellence ensures you receive the best care and technology available.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              {features.map((feature, index) => (
                <div key={index} className="flex flex-col gap-3">
                  <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center mb-2">
                    {feature.icon}
                  </div>
                  <h4 className="text-xl font-bold text-gray-900">{feature.title}</h4>
                  <p className="text-gray-600 text-sm">{feature.description}</p>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="aspect-[4/5] rounded-3xl overflow-hidden bg-gray-100 relative">
              <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-transparent z-10" />
              <img 
                src="https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?q=80&w=2000&auto=format&fit=crop" 
                alt="Compassionate Care" 
                className="w-full h-full object-cover grayscale-[20%]"
              />
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
