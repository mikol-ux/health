"use client";

import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { AvatarFallback, Avatar, AvatarImage } from "../ui/avatar";
import { FaUser } from "react-icons/fa";
import { ExitIcon } from "@radix-ui/react-icons";
import { FcGoogle } from "react-icons/fc";
import { FiLogIn } from "react-icons/fi";
import { useSession } from "next-auth/react";
import { signIn, signOut } from "next-auth/react";
import { DEFAULT_LOGON_REDIRECT } from "@/routes";
import { DeleteButton } from "./logout-button";
import { DeleteIcon } from "lucide-react";

export const UserButton = () => {
  const { data: session, status } = useSession();

  if (status === "authenticated") {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger>
          <Avatar>
            <AvatarImage src={session.user.image || ""} />
            <AvatarFallback className="bg-sky-500">
              <FaUser />
            </AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-40" align="end">
          <DropdownMenuItem onClick={() => signOut({ callbackUrl: "/" })}>
            <ExitIcon className="h-4 w-4 mr-2" />
            Logout
          </DropdownMenuItem>
          <DeleteButton>
            <DropdownMenuItem>
              <DeleteIcon className="h-4 w-4 mr-2" />
              Delete Account
            </DropdownMenuItem>
          </DeleteButton>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Avatar>
          <AvatarImage src="" />
          <AvatarFallback className="bg-sky-500">
            <FcGoogle />
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-40" align="end">
        <DropdownMenuItem
          onClick={() =>
            signIn("google", { callbackUrl: DEFAULT_LOGON_REDIRECT })
          }
        >
          <FiLogIn className="h-4 w-4 mr-2" />
          Login with Google
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
