import Link from "next/link";
import { Phone, Mail, MapPin } from "lucide-react";
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa";

const quickLinks = ["About Us", "Services", "Doctors", "Appointments", "Contact"];
const services = ["Pediatrics", "Surgery", "Orthopedics", "Cardiology", "Emergency Care"];

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-400">
      <div className="container mx-auto px-6 pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 bg-sky-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">M</span>
              </div>
              <span className="text-xl font-bold text-white">
                Med<span className="text-sky-400">Care</span>
              </span>
            </div>
            <p className="text-sm leading-relaxed">
              Providing exceptional, compassionate healthcare to our community since 1999. Your health is our highest priority.
            </p>
            <div className="flex items-center gap-3 pt-2">
              {[FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-8 h-8 bg-slate-800 hover:bg-sky-500 rounded-lg flex items-center justify-center text-slate-400 hover:text-white transition-colors"
                >
                  <Icon className="w-3.5 h-3.5" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold mb-5">Quick Links</h4>
            <ul className="space-y-2.5">
              {quickLinks.map((link) => (
                <li key={link}>
                  <a href="#" className="text-sm hover:text-sky-400 transition-colors">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-white font-semibold mb-5">Services</h4>
            <ul className="space-y-2.5">
              {services.map((s) => (
                <li key={s}>
                  <a href="#" className="text-sm hover:text-sky-400 transition-colors">
                    {s}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-semibold mb-5">Contact Us</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-3 text-sm">
                <MapPin className="w-4 h-4 mt-0.5 text-sky-400 shrink-0" />
                123 Medical Drive, Health City, HC 45678
              </li>
              <li className="flex items-center gap-3 text-sm">
                <Phone className="w-4 h-4 text-sky-400 shrink-0" />
                +1 (234) 567-8900
              </li>
              <li className="flex items-center gap-3 text-sm">
                <Mail className="w-4 h-4 text-sky-400 shrink-0" />
                info@medcare.com
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm">
          <p>&copy; {new Date().getFullYear()} MedCare Hospital. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-sky-400 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-sky-400 transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
