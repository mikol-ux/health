"use client";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { UserButton } from "@/components/auth/user-button";
import { useSession } from "next-auth/react";
import { UserRole } from "@prisma/client";
export const Navbar = () => {
  const pathname = usePathname();
  const profile = useSession();
  const userprofile = profile.data?.user.profile;
  const role = profile.data?.user.role;
  if (role === UserRole.DOCTOR) {
    return (
      <nav className="bg-secondary flex justify-between items-center p-4 rounded-xl w-full shadow-sm ">
        <div className="flex gap-x-2">
          {!userprofile ? (
            <Button
              asChild
              variant={pathname === "/create-profile" ? "default" : "outline"}
            >
              <Link href="/create-profile">Createprofile</Link>
            </Button>
          ) : (
            <></>
          )}
          <Button
            asChild
            variant={pathname === "/user" ? "default" : "outline"}
          >
            <Link href="/user">DOCTOR</Link>
          </Button>
          <Button
            asChild
            variant={pathname === "/admin" ? "default" : "outline"}
          >
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
          <Button
            asChild
            variant={pathname === "/user" ? "default" : "outline"}
          >
            <Link href="/user">User</Link>
          </Button>
        </div>
        <UserButton />
      </nav>
    );
  }
  if (role === UserRole.NURSE) {
    return (
      <nav className="bg-secondary flex justify-between items-center p-4 rounded-xl w-full shadow-sm ">
        <div className="flex gap-x-2">
          {!userprofile ? (
            <Button
              asChild
              variant={pathname === "/create-profile" ? "default" : "outline"}
            >
              <Link href="/create-profile">Createprofile</Link>
            </Button>
          ) : (
            <></>
          )}
          <Button
            asChild
            variant={pathname === "/user" ? "default" : "outline"}
          >
            <Link href="/user">Nurse</Link>
          </Button>
          <Button
            asChild
            variant={pathname === "/admin" ? "default" : "outline"}
          >
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
          <Button
            asChild
            variant={pathname === "/user" ? "default" : "outline"}
          >
            <Link href="/user">User</Link>
          </Button>
        </div>
        <UserButton />
      </nav>
    );
  }
  return (
    <nav className="bg-secondary flex justify-between items-center p-4 rounded-xl w-full shadow-sm ">
      <div className="flex gap-x-2">
        {!userprofile ? (
          <Button
            asChild
            variant={pathname === "/create-profile" ? "default" : "outline"}
          >
            <Link href="/create-profile">Createprofile</Link>
          </Button>
        ) : (
          <></>
        )}
        <Button
          asChild
          variant={pathname === "/appointment" ? "default" : "outline"}
        >
          <Link href="/appointment">APPOINTMENT</Link>
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
        <Button asChild variant={pathname === "/user" ? "default" : "outline"}>
          <Link href="/user">User</Link>
        </Button>
      </div>
      <UserButton />
    </nav>
  );
};
