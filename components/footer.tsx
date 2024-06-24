import Link from "next/link";
import React from "react";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaTwitter,
} from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-blue-700 text-white py-10 shadow-lg">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 px-6">
        <div>
          <h3 className="text-xl font-bold mb-4">About HospitalApp</h3>
          <p className="text-gray-300">
            HospitalApp is dedicated to providing top-notch healthcare services
            with a focus on patient satisfaction and quality care.
          </p>
        </div>
        <div>
          <h3 className="text-xl font-bold mb-4">Quick Links</h3>
          <nav className="space-y-2">
            <Link href="/" className="block hover:underline">
              Home
            </Link>
            <Link href="/about" className="block hover:underline">
              About Us
            </Link>
            <Link href="/services" className="block hover:underline">
              Services
            </Link>
            <Link href="/contact" className="block hover:underline">
              Contact Us
            </Link>
            <Link href="/privacy" className="block hover:underline">
              Privacy Policy
            </Link>
            <Link href="/terms" className="block hover:underline">
              Terms of Service
            </Link>
          </nav>
        </div>
        <div>
          <h3 className="text-xl font-bold mb-4">Follow Us</h3>
          <div className="flex space-x-4">
            <Link
              href="https://www.facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-gray-400"
            >
              <FaFacebookF size={24} />
            </Link>
            <Link
              href="https://www.twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-gray-400"
            >
              <FaTwitter size={24} />
            </Link>
            <Link
              href="https://www.instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-gray-400"
            >
              <FaInstagram size={24} />
            </Link>
            <Link
              href="https://www.linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-gray-400"
            >
              <FaLinkedinIn size={24} />
            </Link>
          </div>
        </div>
      </div>
      <div className="mt-10 text-center text-gray-400">
        <p>© 2024 HospitalApp. All rights reserved.</p>
      </div>
    </footer>
  );
}
