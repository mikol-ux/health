"use client";
import { motion } from "framer-motion";
import Head from "next/head";
import Image from "next/image";
import pic from "@/public/abouthospital.jpg";
import pic2 from "@/public/aboutstaff.jpg";
import service1 from "@/public/Pediatrics.jpg";
import service2 from "@/public/SurgicalProcedure.jpg";
import service3 from "@/public/orthopedics.jpg";

export default function About() {
  return (
    <section className="my-16 p-4">
      <motion.div
        className="max-w-5xl mx-auto text-center"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <h2 className="text-3xl font-semibold mb-8">Some of our Services</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <div className="flex flex-col items-center">
            <div className="relative w-full h-64">
              <Image
                src={service1}
                alt="Service 1"
                layout="fill"
                objectFit="cover"
                className="rounded-lg"
              />
            </div>
            <h3 className="text-xl font-medium mt-4">Pediatric</h3>
            <p className="mt-2 text-gray-600">
              Our pediatric department offers specialized care for infants,
              children, and adolescents. We provide a wide range of services
              including routine check-ups, immunizations, and treatment for
              acute and chronic illnesses, ensuring the best care for your
              child.
            </p>
          </div>
          <div className="flex flex-col items-center">
            <div className="relative w-full h-64">
              <Image
                src={service2}
                alt="Service 2"
                layout="fill"
                objectFit="cover"
                className="rounded-lg"
              />
            </div>
            <h3 className="text-xl font-medium mt-4">Surgery</h3>
            <p className="mt-2 text-gray-600">
              Our surgical department is equipped with advanced technology and
              staffed by experienced surgeons. We offer a variety of surgical
              procedures, from minimally invasive surgeries to complex
              operations, ensuring the highest standards of care and safety.
            </p>
          </div>
          <div className="flex flex-col items-center">
            <div className="relative w-full h-64">
              <Image
                src={service3}
                alt="Service 3"
                layout="fill"
                objectFit="cover"
                className="rounded-lg"
              />
            </div>
            <h3 className="text-xl font-medium mt-4">Orthopedic</h3>
            <p className="mt-2 text-gray-600">
              Our orthopedic department provides comprehensive care for all
              musculoskeletal conditions. From fractures and sports injuries to
              joint replacements and spine surgery, our team is dedicated to
              helping you regain mobility and live pain-free.
            </p>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
