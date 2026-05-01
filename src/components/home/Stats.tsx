"use client";

import { motion } from "framer-motion";
import { Users, PhoneCall, Calendar } from "lucide-react";

export default function Stats() {
  const stats = [
    { value: "500,000+", label: "Customers Protected", icon: <Users className="w-8 h-8 text-primary" /> },
    { value: "24/7/365", label: "US-Based Support", icon: <PhoneCall className="w-8 h-8 text-primary" /> },
    { value: "15+ Years", label: "of Dedicated Service", icon: <Calendar className="w-8 h-8 text-primary" /> }
  ];

  return (
    <section className="py-20 bg-primary/5 border-y border-primary/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center divide-y md:divide-y-0 md:divide-x divide-gray-200">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="flex flex-col items-center pt-8 md:pt-0"
            >
              <div className="mb-4 p-4 bg-white rounded-full shadow-sm border border-gray-100">
                {stat.icon}
              </div>
              <div className="text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight mb-2">
                {stat.value}
              </div>
              <div className="text-lg font-medium text-gray-500">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
