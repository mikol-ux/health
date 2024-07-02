// pages/about.tsx
"use client";
import { motion } from "framer-motion";
import Head from "next/head";
import Image from "next/image";
import pic from "@/public/abouthospital.jpg";
import pic2 from "@/public/aboutstaff.jpg";

export default function About() {
  return (
    <section className="container mx-auto p-4">
      <motion.div
        className="text-center my-8"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h1 className="text-4xl font-bold">About Us</h1>
      </motion.div>

      <section className="my-16">
        <motion.div
          className="max-w-2xl mx-auto text-center"
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: false, amount: 0.5 }}
        >
          <h2 className="text-3xl font-semibold">Our Mission</h2>
          <p className="mt-4 text-lg text-gray-600">
            At Hospital Name, our mission is to provide compassionate and
            comprehensive healthcare services to our community. We strive to
            improve the health and well-being of those we serve with a
            commitment to excellence and a focus on patient-centered care.
          </p>
        </motion.div>
      </section>

      <div className="my-16">
        <motion.div
          className="max-w-5xl mx-auto text-center"
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: false, amount: 0.5 }}
        >
          <h2 className="text-3xl font-semibold mb-8">Our History</h2>
          <div className="flex flex-col md:flex-row justify-evenly items-center gap-4">
            <p className="w-full md:w-1/2 p-4 text-lg text-gray-600">
              Founded in 1950, Hospital Name has been a pillar of health in our
              community for over 70 years. Our state-of-the-art facilities and
              dedicated staff ensure that we provide the highest quality care to
              our patients.
            </p>
            <div className="relative w-full md:w-1/2 h-64">
              <Image
                src={pic}
                alt="profile"
                layout="fill"
                objectFit="cover"
                className="rounded-lg"
              />
            </div>
          </div>
        </motion.div>
      </div>

      <div className="my-14">
        <motion.div
          className="max-w-7xl mx-auto text-center px-10"
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: false, amount: 0.5 }}
        >
          <h2 className="text-3xl font-semibold mb-8">Meet Our Team</h2>
          <div className="flex flex-col md:flex-row justify-evenly items-center gap-4">
            <p className="w-full md:w-1/2 p-4 text-xl text-gray-600">
              Our team of experienced healthcare professionals is dedicated to
              providing personalized care to each of our patients. From our
              doctors to our nurses, everyone at Hospital Name is committed to
              making your health our top priority.
            </p>
            <div className="relative w-full md:w-1/2 h-64">
              <Image
                src={pic2}
                alt="profile"
                layout="fill"
                objectFit="cover"
                className="rounded-lg"
              />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
