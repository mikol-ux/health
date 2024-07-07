"use client";

import { motion } from "framer-motion";
import React from "react";
import { AuroraBackground } from "@/components/ui/Aurora";
import doc from "@/public/pngdoc.png";
import Image from "next/image";
import Link from "next/link";
export default function AuroraBackgroundDemo() {
  return (
    <div className="relative bg-slate-100 dark:bg-gray-900 w-full">
      <div className="container mx-auto px-6 py-10">
        <div className="flex flex-col-reverse md:flex-row items-center">
          <div className="w-full md:w-1/2 text-center md:text-left">
            <motion.div
              initial={{ opacity: 0.0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                delay: 0.3,
                duration: 0.8,
                ease: "easeInOut",
              }}
              className="relative flex flex-col gap-4 items-center justify-center px-4"
            >
              <div className="text-3xl md:text-7xl font-bold dark:text-white text-center">
                {/* Background lights are cool you know. */} STOP THIS
              </div>
              <div className="font-extralight text-base md:text-4xl dark:text-neutral-200 py-4">
                {/* And this, is chemical burn. */} PLEASE MY LOVE
              </div>
              <Link href="/appointment">
                {/* <button className="bg-black dark:bg-white rounded-full w-fit text-white dark:text-black px-4 py-2">
                  Book Appointment
                </button> */}
              </Link>
            </motion.div>
          </div>
          <div className="w-full md:w-1/2">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <Image
                src="/Love.jpg"
                height={580}
                width={580}
                alt="doc"
                className="object-contain"
              />
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
