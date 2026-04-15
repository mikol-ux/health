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
import { useRouter } from "next/navigation";

export default function LOgin({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const onClick = (provider: "google" | "github") => {
    signIn(provider, {
      callbackUrl: DEFAULT_LOGON_REDIRECT,
    });
    router.refresh();
  };
  return (
    <span onClick={() => onClick("google")} className="cursor-pointer">
      {children}
    </span>
  );
}
