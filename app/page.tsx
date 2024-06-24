"use client";
import Image from "next/image";
import { FaGithub } from "react-icons/fa";
import { signIn } from "next-auth/react";
import { DEFAULT_LOGON_REDIRECT } from "@/routes";
import {
  FaHeartbeat,
  FaBaby,
  FaAmbulance,
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa";
import heroImage from "../public/hospital.jpeg";
import preggog from "../public/pngtree-cartoon-beauty-pregnant-woman-download-png-image_4567798.jpg";
import mrsdoc from "../public/hyper-realistic.webp";
import mrdoc from "../public/doc doc.jpg";
import cardio from "../public/cardio.jpg";
import groupdoc from "../public/groupdoc.jpg";
import healthymeal from "../public/healthy-meal-breakfast.webp";
import hospital from "../public/hospital.jpeg";
import isto from "../public/mental_health.jpg";
import vaccine from "../public/covid19-vaccination.webp";
import stock from "../public/istockphoto-wxercise.jpg";
import { useState } from "react";
import Link from "next/link";
import { UserButton } from "@/components/auth/user-button";

export default function Home() {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const onClick = (provider: "google" | "github") => {
    signIn(provider, {
      callbackUrl: DEFAULT_LOGON_REDIRECT,
    });
  };

  return (
    <div className="font-sans bg-gray-100">
      <div className="bg-transparent text-slate-900 shadow-md w-full">
        <div className="container mx-auto flex justify-between items-center px-6 py-4">
          <div className="text-2xl font-bold">HealthCarePlus</div>
          <nav className="hidden md:flex space-x-6">
            <Link href="/" className="hover:text-gray-300">
              Home
            </Link>
            <Link href="/about" className="hover:text-gray-300">
              About Us
            </Link>
            <Link href="/dashboard" className="hover:text-gray-300">
              Services
            </Link>
            <Link href="/contact" className="hover:text-gray-300">
              Contact Us
            </Link>
            <Link href="/profile" className="hover:text-gray-300">
              Profile
            </Link>
            {/*  <Link href="/login" className="hover:text-gray-300">
              Login
            </Link> */}
          </nav>
          <div className="">
            <UserButton />
          </div>
          <div className="md:hidden">
            <button onClick={() => setIsNavOpen(!isNavOpen)}>
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d={
                    !isNavOpen
                      ? "M4 6h16M4 12h16m-7 6h7"
                      : "M6 18L18 6M6 6l12 12"
                  }
                ></path>
              </svg>
            </button>
          </div>
        </div>
        {isNavOpen && (
          <div className="md:hidden px-6 py-4 space-y-4 bg-primary">
            <Link href="/home" className="block text-gray-200">
              Home
            </Link>
            <Link href="/about" className="block text-gray-200">
              About Us
            </Link>
            <Link href="/services" className="block text-gray-200">
              Services
            </Link>
            <Link href="/contact" className="block text-gray-200">
              Contact Us
            </Link>
            <UserButton />
          </div>
        )}
      </div>
      <section
        className="relative flex items-center justify-center h-[500px] bg-cover bg-center shadow-lg overflow-hidden"
        style={{ backgroundImage: `url(${cardio.src})` }}
      >
        <div className="absolute inset-0 opacity-50"></div>
        <div className="relative text-center text-white">
          <h1 className="text-4xl md:text-6xl font-bold text-slate-900">
            Your Health, Our Priority
          </h1>
          <p className="mt-4 text-lg md:text-2xl text-slate-900">
            Book appointments with top specialists from the comfort of your
            home.
          </p>
          {/* <a
            href="/appointment"
            className="mt-8 inline-block bg-yellow-500 text-black py-3 px-6 rounded-full text-lg font-semibold hover:bg-yellow-600"
          >
            Book an Appointment
          </a> */}
        </div>
      </section>

      <section className="py-16 bg-white text-center shadow-lg my-8 mx-4">
        <h2 className="text-3xl md:text-4xl font-semibold mb-8">
          Our Services
        </h2>
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 px-6">
          <div className="bg-white p-6 rounded-lg shadow-md transform hover:scale-105 transition-transform">
            <FaHeartbeat className="text-6xl text-red-500 mx-auto mb-4" />
            <h3 className="text-xl font-bold mb-2">Cardiology</h3>
            <p className="text-gray-700">Expert heart care services.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md transform hover:scale-105 transition-transform">
            <FaBaby className="text-6xl text-blue-500 mx-auto mb-4" />
            <h3 className="text-xl font-bold mb-2">Pediatrics</h3>
            <p className="text-gray-700">Comprehensive child care.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md transform hover:scale-105 transition-transform">
            <FaAmbulance className="text-6xl text-green-500 mx-auto mb-4" />
            <h3 className="text-xl font-bold mb-2">Emergency</h3>
            <p className="text-gray-700">24/7 emergency services.</p>
          </div>
        </div>
      </section>

      <section className="py-16 text-center bg-white shadow-lg my-8 mx-4">
        <h2 className="text-3xl md:text-4xl font-semibold mb-8">
          Antenatal and Prenatal Care
        </h2>
        <div className="container mx-auto flex flex-col md:flex-row items-center gap-8 px-6">
          <Image
            src={preggog}
            alt="Prenatal Care"
            width={500}
            height={300}
            className="rounded-lg shadow-md"
          />
          <div className="md:w-1/2 text-left">
            <h3 className="text-2xl font-bold mb-4">
              Comprehensive Antenatal and Prenatal Care
            </h3>
            <p className="text-gray-700 mb-4">
              Our antenatal and prenatal care services ensure that you and your
              baby are in the best health possible throughout your pregnancy. We
              offer regular check-ups, ultrasounds, and personalized care plans
              to meet your specific needs.
            </p>
            <ul className="list-disc list-inside text-gray-700 mb-4">
              <li>Regular health check-ups</li>
              <li>Ultrasound scans</li>
              <li>Nutritional guidance</li>
              <li>Labor and delivery preparation</li>
            </ul>
            <a
              href="/appointment"
              className="inline-block bg-blue-500 text-white py-3 px-6 rounded-full text-lg font-semibold hover:bg-blue-600"
            >
              Schedule a Consultation
            </a>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white text-center shadow-lg my-8 mx-4">
        <h2 className="text-3xl md:text-4xl font-semibold mb-8">Our Doctors</h2>
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-6">
          <div className="bg-white p-6 rounded-lg shadow-md transform hover:scale-105 transition-transform">
            <Image
              src={mrdoc}
              alt="Doctor"
              width={200}
              height={200}
              className="rounded-full mx-auto mb-4"
            />
            <h3 className="text-xl font-bold mb-2">Dr. John Smith</h3>
            <p className="text-gray-700">Cardiologist</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md transform hover:scale-105 transition-transform">
            <Image
              src={mrsdoc}
              alt="Doctor"
              width={200}
              height={200}
              className="rounded-full mx-auto mb-4"
            />
            <h3 className="text-xl font-bold mb-2">Dr. Jane Doe</h3>
            <p className="text-gray-700">Pediatrician</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md transform hover:scale-105 transition-transform">
            <Image
              src={groupdoc}
              alt="Doctor"
              width={200}
              height={200}
              className="rounded-full mx-auto mb-4"
            />
            <h3 className="text-xl font-bold mb-2">Dr. Mike Johnson</h3>
            <p className="text-gray-700">General Surgeon</p>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white text-center shadow-lg my-8 mx-4">
        <h2 className="text-3xl md:text-4xl font-semibold mb-8">Latest News</h2>
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-6">
          <div className="bg-white p-6 rounded-lg shadow-md transform hover:scale-105 transition-transform">
            <Image
              src={cardio}
              alt="News"
              width={300}
              height={200}
              className="rounded-lg mb-4"
            />
            <h3 className="text-xl font-bold mb-2">New Cardiology Wing</h3>
            <p className="text-gray-700">
              We have inaugurated a new cardiology wing with state-of-the-art
              facilities.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md transform hover:scale-105 transition-transform">
            <Image
              src={hospital}
              alt="News"
              width={300}
              height={200}
              className="rounded-lg mb-4"
            />
            <h3 className="text-xl font-bold mb-2">Health Camp</h3>
            <p className="text-gray-700">
              Join us for a free health camp this weekend for check-ups and
              consultations.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md transform hover:scale-105 transition-transform">
            <Image
              src={vaccine}
              alt="News"
              width={300}
              height={200}
              className="rounded-lg mb-4"
            />
            <h3 className="text-xl font-bold mb-2">
              COVID-19 Vaccination Drive
            </h3>
            <p className="text-gray-700">
              We are organizing a vaccination drive to combat COVID-19. Register
              now!
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white text-center shadow-lg my-8 mx-4">
        <h2 className="text-3xl md:text-4xl font-semibold mb-8">Health Tips</h2>
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-6">
          <div className="bg-white p-6 rounded-lg shadow-md transform hover:scale-105 transition-transform">
            <Image
              src={healthymeal}
              alt="Health Tips"
              width={300}
              height={200}
              className="rounded-lg mb-4"
            />
            <h3 className="text-xl font-bold mb-2">Healthy Eating</h3>
            <p className="text-gray-700">
              Discover tips for a balanced diet and maintaining a healthy
              lifestyle.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md transform hover:scale-105 transition-transform">
            <Image
              src={stock}
              alt="Health Tips"
              width={300}
              height={200}
              className="rounded-lg mb-4"
            />
            <h3 className="text-xl font-bold mb-2">Exercise Regularly</h3>
            <p className="text-gray-700">
              Learn about the importance of regular exercise and staying active.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md transform hover:scale-105 transition-transform">
            <Image
              src={isto}
              alt="Health Tips"
              width={300}
              height={200}
              className="rounded-lg mb-4"
            />
            <h3 className="text-xl font-bold mb-2">Mental Health</h3>
            <p className="text-gray-700">
              Find out how to take care of your mental health and wellbeing.
            </p>
          </div>
        </div>
      </section>

      <footer className="bg-blue-700 text-white py-10 shadow-lg">
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 px-6">
          <div>
            <h3 className="text-xl font-bold mb-4">About HospitalApp</h3>
            <p className="text-gray-300">
              HospitalApp is dedicated to providing top-notch healthcare
              services with a focus on patient satisfaction and quality care.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4">Quick Links</h3>
            <nav className="space-y-2">
              <a href="/" className="block hover:underline">
                Home
              </a>
              <a href="/about" className="block hover:underline">
                About Us
              </a>
              <a href="/services" className="block hover:underline">
                Services
              </a>
              <a href="/contact" className="block hover:underline">
                Contact Us
              </a>
              <a href="/privacy" className="block hover:underline">
                Privacy Policy
              </a>
              <a href="/terms" className="block hover:underline">
                Terms of Service
              </a>
            </nav>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4">Follow Us</h3>
            <div className="flex space-x-4">
              <a
                href="https://www.facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-gray-400"
              >
                <FaFacebookF size={24} />
              </a>
              <a
                href="https://www.twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-gray-400"
              >
                <FaTwitter size={24} />
              </a>
              <a
                href="https://www.instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-gray-400"
              >
                <FaInstagram size={24} />
              </a>
              <a
                href="https://www.linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-gray-400"
              >
                <FaLinkedinIn size={24} />
              </a>
            </div>
          </div>
        </div>
        <div className="mt-10 text-center text-gray-400">
          <p>© 2024 HospitalApp. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
