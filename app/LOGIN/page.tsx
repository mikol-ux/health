"use client";
import { DEFAULT_LOGON_REDIRECT } from "@/routes";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { FcGoogle } from "react-icons/fc";
import { ArrowLeft, Heart, Shield, Clock } from "lucide-react";

export default function LoginPage() {
  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      {/* Left panel */}
      <div className="hidden lg:flex flex-col bg-gradient-to-br from-slate-900 to-slate-800 p-12 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-sky-500/10 rounded-full -translate-y-1/2 translate-x-1/2 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-sky-500/10 rounded-full translate-y-1/2 -translate-x-1/2 pointer-events-none" />

        <div className="relative z-10 flex items-center gap-2.5 mb-16">
          <div className="w-10 h-10 bg-sky-500 rounded-xl flex items-center justify-center">
            <span className="text-white font-bold text-lg">M</span>
          </div>
          <span className="text-2xl font-bold">Med<span className="text-sky-400">Care</span></span>
        </div>

        <div className="relative z-10 flex-1">
          <h1 className="text-4xl font-bold mb-4 leading-tight">
            Your healthcare<br />portal awaits
          </h1>
          <p className="text-slate-400 text-lg leading-relaxed max-w-sm">
            Securely access patient records, appointments, and clinical tools all in one place.
          </p>

          <div className="mt-12 space-y-4">
            {[
              { icon: Heart, text: "Patient-centered care" },
              { icon: Shield, text: "Secure & private access" },
              { icon: Clock, text: "24/7 system availability" },
            ].map(({ icon: Icon, text }) => (
              <div key={text} className="flex items-center gap-3 text-slate-300">
                <div className="w-8 h-8 bg-sky-500/20 rounded-lg flex items-center justify-center">
                  <Icon className="w-4 h-4 text-sky-400" />
                </div>
                <span className="text-sm">{text}</span>
              </div>
            ))}
          </div>
        </div>

        <p className="relative z-10 text-slate-500 text-xs">
          © {new Date().getFullYear()} MedCare Hospital. All rights reserved.
        </p>
      </div>

      {/* Right panel */}
      <div className="flex items-center justify-center p-8 bg-slate-50">
        <div className="w-full max-w-sm">
          {/* Mobile logo */}
          <div className="flex items-center gap-2.5 mb-10 lg:hidden">
            <div className="w-9 h-9 bg-sky-500 rounded-xl flex items-center justify-center">
              <span className="text-white font-bold">M</span>
            </div>
            <span className="text-xl font-bold text-slate-800">Med<span className="text-sky-500">Care</span></span>
          </div>

          <div className="mb-8">
            <h2 className="text-2xl font-bold text-slate-900">Welcome back</h2>
            <p className="text-slate-500 mt-1 text-sm">Sign in to access your dashboard</p>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
            <button
              onClick={() => signIn("google", { callbackUrl: DEFAULT_LOGON_REDIRECT })}
              className="w-full flex items-center justify-center gap-3 px-4 py-3 border border-slate-200 rounded-xl hover:bg-slate-50 active:bg-slate-100 transition-colors text-sm font-medium text-slate-700"
            >
              <FcGoogle className="w-5 h-5" />
              Continue with Google
            </button>

            <p className="text-xs text-slate-400 text-center mt-4">
              By signing in you agree to our Terms of Service and Privacy Policy.
            </p>
          </div>

          <Link
            href="/"
            className="flex items-center justify-center gap-2 mt-6 text-sm text-slate-500 hover:text-slate-700 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to home
          </Link>
        </div>
      </div>
    </div>
  );
}
