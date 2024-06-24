"use client";
import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { FaGithub, FaGoogle } from "react-icons/fa";

import { Button } from "@/components/ui/button";
import { signIn } from "next-auth/react";
import { DEFAULT_LOGON_REDIRECT } from "@/routes";

export default function LOgin() {
  const onClick = (provider: "google" | "github") => {
    signIn(provider, {
      callbackUrl: DEFAULT_LOGON_REDIRECT,
    });
  };
  return (
    <span onClick={() => onClick("google")} className="p-1">
      <span className="text-md">
        LOGIN
        <FaGoogle />
      </span>
    </span>
  );
}
