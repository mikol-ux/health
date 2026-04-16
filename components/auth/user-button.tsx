"use client";

import { DropdownMenu, DropdownMenuItem, DropdownMenuContent, DropdownMenuTrigger, DropdownMenuSeparator } from "../ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { FaUser } from "react-icons/fa";
import { LogOut } from "lucide-react";
import { useSession, signOut, signIn } from "next-auth/react";
import { DEFAULT_LOGON_REDIRECT } from "@/routes";
import { FcGoogle } from "react-icons/fc";
import { FiLogIn } from "react-icons/fi";

export const UserButton = () => {
  const { data: session, status } = useSession();

  if (status === "authenticated") {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button className="focus:outline-none focus:ring-2 focus:ring-sky-500 rounded-full">
            <Avatar className="w-8 h-8">
              <AvatarImage src={session.user.image || ""} />
              <AvatarFallback className="bg-sky-500 text-white text-xs font-semibold">
                {session.user.name?.charAt(0).toUpperCase() ?? <FaUser className="w-3 h-3" />}
              </AvatarFallback>
            </Avatar>
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-48 rounded-xl border-slate-100 shadow-lg" align="end">
          <div className="px-3 py-2 border-b border-slate-100">
            <p className="text-sm font-semibold text-slate-800 truncate">{session.user.name}</p>
            <p className="text-xs text-slate-400 truncate">{session.user.email}</p>
          </div>
          <div className="p-1">
            <DropdownMenuItem
              onClick={() => signOut({ callbackUrl: "/" })}
              className="flex items-center gap-2 rounded-lg text-red-500 focus:text-red-500 focus:bg-red-50 cursor-pointer"
            >
              <LogOut className="w-4 h-4" />
              Sign out
            </DropdownMenuItem>
          </div>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="focus:outline-none focus:ring-2 focus:ring-sky-500 rounded-full">
          <Avatar className="w-8 h-8">
            <AvatarFallback className="bg-slate-200">
              <FaUser className="w-3 h-3 text-slate-500" />
            </AvatarFallback>
          </Avatar>
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-48 rounded-xl" align="end">
        <DropdownMenuItem
          onClick={() => signIn("google", { callbackUrl: DEFAULT_LOGON_REDIRECT })}
          className="flex items-center gap-2 cursor-pointer"
        >
          <FcGoogle className="w-4 h-4" />
          Sign in with Google
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
