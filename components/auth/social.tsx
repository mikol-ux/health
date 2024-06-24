"use client";
import { signIn } from "next-auth/react";
import React, { useState } from "react";
import { FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { Button } from "../ui/button";
import { DEFAULT_LOGON_REDIRECT } from "../../routes";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function Social() {
  const onClick = (provider: "google") => {
    signIn(provider, {
      callbackUrl: DEFAULT_LOGON_REDIRECT,
    });
  };

  return (
    <span className="flex items-center w-full gap-x-2">
      <Button
        size="lg"
        className="text-black m-2"
        variant="outline"
        onClick={() => onClick("google")}
      >
        <FaGithub className="h-5 w-5" />
      </Button>
    </span>
  );
}
