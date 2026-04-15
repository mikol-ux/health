"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X, Phone } from "lucide-react";

const navLinks = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Testimonials", href: "#testimonials" },
  { label: "Contact", href: "#contact" },
];

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-white shadow-md" : "bg-white/95 backdrop-blur-sm"
      }`}
    >
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5">
            <div className="w-9 h-9 bg-sky-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">M</span>
            </div>
            <span className="text-xl font-bold text-slate-800">
              Med<span className="text-sky-500">Care</span>
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="px-4 py-2 text-sm font-medium text-slate-600 hover:text-sky-600 hover:bg-sky-50 rounded-lg transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* CTAs */}
          <div className="hidden md:flex items-center gap-3">
            <a
              href="tel:+1234567890"
              className="flex items-center gap-1.5 text-sm text-slate-600 hover:text-sky-600 transition-colors"
            >
              <Phone className="w-4 h-4" />
              <span>+1 234 567 890</span>
            </a>
            <Link
              href="/LOGIN"
              className="px-5 py-2 text-sm font-semibold bg-sky-500 hover:bg-sky-600 text-white rounded-lg transition-colors"
            >
              Staff Login
            </Link>
          </div>

          {/* Mobile toggle */}
          <button
            className="md:hidden p-2 rounded-lg text-slate-600 hover:bg-slate-100"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden border-t bg-white px-6 pb-4 pt-2 space-y-1">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className="block px-4 py-2.5 text-sm font-medium text-slate-600 hover:text-sky-600 hover:bg-sky-50 rounded-lg transition-colors"
            >
              {link.label}
            </a>
          ))}
          <div className="pt-2 border-t mt-2">
            <Link
              href="/LOGIN"
              className="block text-center px-4 py-2.5 text-sm font-semibold bg-sky-500 text-white rounded-lg hover:bg-sky-600 transition-colors"
            >
              Staff Login
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
