"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Stethoscope, Home, BellRing, ShieldPlus, Bath, ScrollText, Dna, Lock } from "lucide-react";

const services = [
  {
    id: "durable-medical-equipment",
    title: "Durable Medical Equipment",
    description: "High-quality, reliable medical equipment for your daily mobility and health monitoring needs.",
    icon: <Stethoscope className="w-8 h-8 text-primary" />,
  },
  {
    id: "reverse-mortgage",
    title: "Reverse Mortgage",
    description: "Unlock the value of your home securely to fund your retirement and healthcare expenses.",
    icon: <Home className="w-8 h-8 text-primary" />,
  },
  {
    id: "medical-alert-systems",
    title: "Medical Alert Systems",
    description: "24/7 emergency response systems ensuring you're never alone when you need help most.",
    icon: <BellRing className="w-8 h-8 text-primary" />,
  },
  {
    id: "insurance-for-seniors",
    title: "Insurance for Seniors",
    description: "Comprehensive health and life insurance plans tailored specifically for senior citizens.",
    icon: <ShieldPlus className="w-8 h-8 text-primary" />,
  },
  {
    id: "walk-in-bathtub",
    title: "Walk-In Bathtub",
    description: "Safe, accessible, and therapeutic bathing solutions to prevent falls and improve comfort.",
    icon: <Bath className="w-8 h-8 text-primary" />,
  },
  {
    id: "final-expense",
    title: "Final Expense",
    description: "Protect your loved ones from financial burden with our affordable final expense coverage.",
    icon: <ScrollText className="w-8 h-8 text-primary" />,
  },
  {
    id: "genetic-testing",
    title: "Genetic Testing",
    description: "Advanced DNA screening to identify potential health risks and personalize your care plan.",
    icon: <Dna className="w-8 h-8 text-primary" />,
  },
  {
    id: "home-security-systems",
    title: "Home Security Systems",
    description: "State-of-the-art security installations to keep your home safe from intruders and emergencies.",
    icon: <Lock className="w-8 h-8 text-primary" />,
  }
];

export default function ServicesGrid() {
  return (
    <section id="services" className="py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 tracking-tight"
          >
            Specialized Services
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-lg text-gray-600 max-w-2xl mx-auto"
          >
            Explore our comprehensive suite of solutions designed to protect your health, wealth, and peace of mind.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              className="group relative bg-gray-50 rounded-3xl p-8 hover:bg-white border border-transparent hover:border-gray-100 hover:shadow-xl transition-all duration-300 flex flex-col h-full"
            >
              <div className="mb-6 w-16 h-16 rounded-2xl bg-white shadow-sm flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                {service.icon}
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">{service.title}</h3>
              <p className="text-gray-600 mb-8 flex-grow">{service.description}</p>
              
              <Link 
                href={`/quote/${service.id}`}
                className="mt-auto inline-flex items-center text-primary font-semibold hover:text-blue-800 transition-colors group-hover:gap-2"
              >
                Get a Quote
                <ArrowRight className="w-4 h-4 ml-1 transition-all" />
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
