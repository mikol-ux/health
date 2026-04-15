"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { CalendarDays, ShieldCheck, Clock3, Star } from "lucide-react";

const stats = [
  { value: "15k+", label: "Patients Treated" },
  { value: "120+", label: "Specialists" },
  { value: "25+", label: "Years Experience" },
  { value: "98%", label: "Satisfaction Rate" },
];

export default function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-screen bg-gradient-to-br from-sky-50 via-white to-slate-50 flex items-center pt-16"
    >
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-sky-100/60 rounded-full blur-3xl -translate-y-1/4 translate-x-1/4 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-sky-100/40 rounded-full blur-3xl translate-y-1/4 -translate-x-1/4 pointer-events-none" />

      <div className="container mx-auto px-6 py-20 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left — Text */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="space-y-6"
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-sky-100 text-sky-700 rounded-full text-sm font-medium">
              <Star className="w-3.5 h-3.5 fill-sky-500 text-sky-500" />
              Trusted Healthcare Since 1999
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 leading-tight">
              Your Health Is{" "}
              <span className="text-sky-500">Our Priority</span>
            </h1>

            <p className="text-lg text-slate-500 max-w-lg leading-relaxed">
              World-class medical care with compassionate professionals. Book
              appointments, manage your records, and get the care you deserve —
              all in one place.
            </p>

            <div className="flex flex-wrap gap-4 pt-2">
              <Link
                href="/LOGIN"
                className="inline-flex items-center gap-2 px-6 py-3 bg-sky-500 hover:bg-sky-600 text-white font-semibold rounded-xl transition-colors shadow-lg shadow-sky-200"
              >
                <CalendarDays className="w-4 h-4" />
                Book Appointment
              </Link>
              <a
                href="#services"
                className="inline-flex items-center gap-2 px-6 py-3 bg-white hover:bg-slate-50 text-slate-700 font-semibold rounded-xl border border-slate-200 transition-colors"
              >
                Our Services
              </a>
            </div>

            {/* Trust badges */}
            <div className="flex flex-wrap gap-4 pt-4">
              <div className="flex items-center gap-2 text-sm text-slate-500">
                <ShieldCheck className="w-4 h-4 text-emerald-500" />
                Certified & Accredited
              </div>
              <div className="flex items-center gap-2 text-sm text-slate-500">
                <Clock3 className="w-4 h-4 text-sky-500" />
                24/7 Emergency Care
              </div>
            </div>
          </motion.div>

          {/* Right — Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative flex justify-center"
          >
            <div className="relative w-full max-w-md">
              {/* Image card */}
              <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                <Image
                  src="/pngdoc.png"
                  width={500}
                  height={560}
                  alt="Doctor"
                  className="object-contain w-full bg-gradient-to-b from-sky-100 to-sky-50"
                />
              </div>

              {/* Floating card — availability */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.5 }}
                className="absolute -left-6 top-10 bg-white rounded-2xl shadow-xl p-4 flex items-center gap-3"
              >
                <div className="w-10 h-10 bg-emerald-100 rounded-xl flex items-center justify-center">
                  <div className="w-3 h-3 bg-emerald-500 rounded-full animate-pulse" />
                </div>
                <div>
                  <p className="text-xs text-slate-400">Doctors Available</p>
                  <p className="text-sm font-bold text-slate-800">24 / 7</p>
                </div>
              </motion.div>

              {/* Floating card — patients */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.5 }}
                className="absolute -right-6 bottom-16 bg-white rounded-2xl shadow-xl p-4"
              >
                <p className="text-xs text-slate-400 mb-1">Happy Patients</p>
                <p className="text-2xl font-bold text-sky-500">15,000+</p>
                <div className="flex mt-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-3 h-3 fill-amber-400 text-amber-400"
                    />
                  ))}
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Stats row */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-20 pt-12 border-t border-slate-100"
        >
          {stats.map((s) => (
            <div key={s.label} className="text-center">
              <p className="text-3xl font-bold text-sky-500">{s.value}</p>
              <p className="text-sm text-slate-500 mt-1">{s.label}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
