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
import { useCurrentUser } from "../../hooks/use-current-user";
import { FcGoogle } from "react-icons/fc";
import { LogoutButton } from "./logout-button";
import LOgin from "./login";
import { FiLogIn } from "react-icons/fi";
import { useSession } from "next-auth/react";
export const UserButton = () => {
  const user = useCurrentUser();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Avatar>
          <AvatarImage src={user?.image || ""} />
          <AvatarFallback className="bg-sky-500">
            <FaUser />
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-40" align="end">
        <LogoutButton>
          <DropdownMenuItem>
            <ExitIcon className="h-4 w-4 mr-2" />
            Logout
          </DropdownMenuItem>
        </LogoutButton>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
export const LoginButton = () => {
  const user = useCurrentUser();
  const { data: session, status, update } = useSession();

  if (status === "authenticated") {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger>
          <Avatar>
            <AvatarImage src={user?.image || ""} />
            <AvatarFallback className="bg-sky-500">
              <FaUser />
            </AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-40" align="end">
          <LogoutButton>
            <DropdownMenuItem>
              <ExitIcon className="h-4 w-4 mr-2" />
              Logout
            </DropdownMenuItem>
          </LogoutButton>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Avatar>
          <AvatarImage src={user?.image || ""} />
          <AvatarFallback className="bg-sky-500">
            <FcGoogle />
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-40" align="end">
        <LOgin>
          <DropdownMenuItem>
            <ExitIcon className="h-4 w-4 mr-2" />
            <FcGoogle />
          </DropdownMenuItem>
        </LOgin>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
