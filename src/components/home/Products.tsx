"use client";

import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import Link from "next/link";

const products = [
  {
    id: "home-system",
    title: "Home System",
    description: "Enables independent living with quick access to trained response specialists 24/7/365.",
    features: ["No landline required", "Water-resistant pendant", "Two-way voice communication", "1,000 ft range"],
    image: "/Home-Cellular-System-with-Help-Buttons-Trans@2x.avif",
  },
  {
    id: "mobile-system",
    title: "Mobile Systems",
    description: "Peace of mind on the go with 24/7/365 help wherever you are.",
    features: ["Advanced GPS tracking", "Fall detection available", "Lightweight & wearable", "Cellular connection"],
    image: "/Mobile-Systems@2x.avif",
  },
  {
    id: "smartwatch",
    title: "Smartwatch",
    description: "Supports a healthy, active lifestyle while keeping you connected to assistance 24/7/365.",
    features: ["Heart rate & step counter", "Built-in fall detection", "Discreet SOS button", "Weather forecasts"],
    image: "/Smartwatch-Trans@2x.avif",
  }
];

export default function Products() {
  return (
    <section id="products" className="py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-3xl md:text-5xl font-bold text-gray-900 mb-6 tracking-tight"
          >
            Choose Your Protection
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-lg text-gray-600 max-w-2xl mx-auto"
          >
            Whether you're at home or on the go, we have a medical alert system designed for your lifestyle.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {products.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-gray-50 rounded-3xl p-8 hover:bg-white border border-transparent hover:border-gray-100 hover:shadow-2xl transition-all duration-300 flex flex-col h-full group"
            >
              <div className="mb-8 h-56 w-full rounded-2xl bg-white shadow-sm flex items-center justify-center group-hover:scale-105 transition-transform duration-500 border border-gray-100 p-6 overflow-hidden">
                <img src={product.image} alt={product.title} className="w-full h-full object-contain" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">{product.title}</h3>
              <p className="text-gray-600 mb-8 h-20">{product.description}</p>
              
              <ul className="space-y-4 mb-8 flex-grow">
                {product.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700 font-medium">{feature}</span>
                  </li>
                ))}
              </ul>

              <Link 
                href={`/quote/${product.id}`}
                className="w-full mt-auto inline-flex justify-center items-center px-6 py-4 rounded-xl bg-gray-900 text-white font-semibold hover:bg-primary transition-colors group-hover:shadow-lg group-hover:shadow-primary/20"
              >
                Get a Quote
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
