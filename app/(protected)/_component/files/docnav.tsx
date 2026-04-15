"use client";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { UserButton } from "@/components/auth/user-button";
import { useSession } from "next-auth/react";
export const DOCbar = () => {
  const pathname = usePathname();
  const profile = useSession();
  const userprofile = profile.data?.user.profile;

  return (
    <nav className="bg-secondary flex justify-between items-center p-4 rounded-xl w-full shadow-sm ">
      <div className="flex gap-x-2">
        {
          <Button
            asChild
            variant={pathname === "/create-profile" ? "default" : "outline"}
          >
            <Link href="/create-profile">DOCTOR</Link>
          </Button>
        }
        <Button asChild variant={pathname === "/user" ? "default" : "outline"}>
          <Link href="/user">USER</Link>
        </Button>
        <Button asChild variant={pathname === "/admin" ? "default" : "outline"}>
          <Link href="/admin">Admin</Link>
        </Button>
        <Button
          asChild
          variant={pathname === "/setting" ? "default" : "outline"}
        >
          <Link href="/setting">Setting</Link>
        </Button>
        <Button
          asChild
          variant={pathname === "/all-users" ? "default" : "outline"}
        >
          <Link href="/all-users">All Users</Link>
        </Button>
      </div>
      <UserButton />
    </nav>
  );
};
