"use client";
import { DEFAULT_LOGON_REDIRECT } from "@/routes";
import { signIn } from "next-auth/react";
import React from "react";
import { FaGoogle } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";

export default function LOGIN() {
  const onClick = (provider: "google" | "github") => {
    signIn(provider, {
      callbackUrl: DEFAULT_LOGON_REDIRECT,
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-sm p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center mb-6">Login</h2>
        <button
          onClick={() => onClick("google")}
          className="w-full py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-gray-700 hover:bg-gray-50 flex items-center justify-center"
        >
          <FcGoogle className="h-6 w-6 mr-2" />
          Sign in with Google
        </button>
      </div>
    </div>
  );
}
