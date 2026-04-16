"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Award, Heart, Users, Building2 } from "lucide-react";

const values = [
  { icon: Heart, title: "Compassionate Care", desc: "Treating every patient with empathy and dignity." },
  { icon: Award, title: "Clinical Excellence", desc: "Highest standards of medical quality and safety." },
  { icon: Users, title: "Expert Team", desc: "120+ board-certified specialists across all fields." },
  { icon: Building2, title: "Modern Facilities", desc: "State-of-the-art equipment and technology." },
];

export default function About() {
  return (
    <section id="about" className="py-24 bg-white">
      <div className="container mx-auto px-6">
        {/* Section header */}
        <motion.div
          className="text-center max-w-2xl mx-auto mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <span className="text-sm font-semibold text-sky-500 uppercase tracking-widest">About MedCare</span>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mt-3 mb-4">
            Dedicated to Your Health & Wellbeing
          </h2>
          <p className="text-slate-500 text-lg">
            For over 25 years, MedCare has been the community&apos;s trusted healthcare partner — combining advanced medicine with genuine human care.
          </p>
        </motion.div>

        {/* Main content — image + text */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-20">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="relative rounded-3xl overflow-hidden shadow-xl h-[420px]">
              <Image
                src="/abouthospital.jpg"
                alt="MedCare Hospital"
                fill
                className="object-cover"
              />
            </div>
            {/* Floating badge */}
            <div className="absolute -bottom-6 -right-6 bg-sky-500 text-white rounded-2xl px-6 py-4 shadow-xl">
              <p className="text-3xl font-bold">25+</p>
              <p className="text-sm text-sky-100">Years of Excellence</p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <h3 className="text-2xl font-bold text-slate-800">Our Mission</h3>
            <p className="text-slate-500 leading-relaxed">
              At MedCare, our mission is to deliver compassionate, comprehensive healthcare to every patient who walks through our doors. We believe that exceptional medical care starts with listening — understanding your needs and crafting personalized treatment plans.
            </p>
            <p className="text-slate-500 leading-relaxed">
              Founded in 1999, we&apos;ve grown from a small clinic into a full-service hospital serving thousands of patients annually, while never losing sight of what matters most: you.
            </p>
            <div className="flex flex-wrap gap-3 pt-2">
              {["Accredited Hospital", "ISO Certified", "Award-Winning Care"].map((badge) => (
                <span key={badge} className="px-4 py-1.5 bg-sky-50 text-sky-700 text-sm font-medium rounded-full border border-sky-100">
                  {badge}
                </span>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Values grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {values.map((v, i) => (
            <motion.div
              key={v.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              viewport={{ once: true }}
              className="p-6 bg-slate-50 rounded-2xl hover:bg-sky-50 hover:shadow-md transition-all group"
            >
              <div className="w-12 h-12 bg-sky-100 group-hover:bg-sky-500 rounded-xl flex items-center justify-center mb-4 transition-colors">
                <v.icon className="w-6 h-6 text-sky-500 group-hover:text-white transition-colors" />
              </div>
              <h4 className="font-semibold text-slate-800 mb-2">{v.title}</h4>
              <p className="text-sm text-slate-500">{v.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
