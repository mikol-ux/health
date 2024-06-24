"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Form } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { NextPage } from "next";
import Head from "next/head";
import { FaEnvelope, FaMapMarkerAlt, FaPhone } from "react-icons/fa";

const Contact = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <Head>
        <title>Contact Us - HealthCarePlus</title>
      </Head>

      <header className="bg-primary text-white shadow-md fixed w-full z-10">
        <div className="container mx-auto flex justify-between items-center px-6 py-4">
          <div className="text-2xl font-bold">HealthCarePlus</div>
          <nav className="hidden md:flex space-x-6">
            <a href="/" className="hover:text-gray-300">
              Home
            </a>
            <a href="/about" className="hover:text-gray-300">
              About Us
            </a>
            <a href="/services" className="hover:text-gray-300">
              Services
            </a>
            <a href="#contact" className="hover:text-gray-300">
              Contact Us
            </a>
            <a href="/login" className="hover:text-gray-300">
              Login
            </a>
          </nav>
        </div>
      </header>

      <main className="flex flex-col lg:flex-row mt-20 lg:mt-24 p-4 lg:p-8">
        <div className="lg:w-1/3 bg-white shadow-lg p-6 rounded-lg mb-8 lg:mb-0 lg:mr-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Contact Information
          </h2>
          <div className="flex items-center mb-4">
            <FaPhone className="text-primary mr-4" />
            <div>
              <p className="text-gray-700">Phone</p>
              <p className="text-gray-900 font-semibold">+123 456 7890</p>
            </div>
          </div>
          <div className="flex items-center mb-4">
            <FaEnvelope className="text-primary mr-4" />
            <div>
              <p className="text-gray-700">Email</p>
              <p className="text-gray-900 font-semibold">
                info@healthcareplus.com
              </p>
            </div>
          </div>
          <div className="flex items-center mb-4">
            <FaMapMarkerAlt className="text-primary mr-4" />
            <div>
              <p className="text-gray-700">Address</p>
              <p className="text-gray-900 font-semibold">
                123 Health St., Wellness City, USA
              </p>
            </div>
          </div>
        </div>

        <div className="flex-1 bg-white shadow-lg p-6 rounded-lg">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            Get in Touch
          </h2>
          <form method="POST" className="space-y-6">
            <div className="flex flex-col lg:flex-row gap-4">
              <Input
                id="name"
                name="name"
                type="text"
                placeholder="Your Name"
                required
                className="w-full lg:flex-1 px-4 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-primary focus:border-primary"
              />
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="Email address"
                required
                className="w-full lg:flex-1 px-4 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-primary focus:border-primary"
              />
            </div>
            <Textarea
              id="message"
              name="message"
              rows={6}
              placeholder="Your Message"
              required
              className="w-full px-4 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-primary focus:border-primary"
            />
            <Button
              type="submit"
              className="w-full py-3 bg-primary text-white rounded-md hover:bg-primary-dark"
            >
              Send Message
            </Button>
          </form>
        </div>
      </main>
    </div>
  );
};

export default Contact;
