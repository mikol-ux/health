"use client";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { UserButton } from "@/components/auth/user-button";
import { useSession } from "next-auth/react";
import { UserRole } from "@prisma/client";
import Social from "./auth/social";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export const Navbar = () => {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const pathname = usePathname();
  const profile = useSession();
  const role = profile.data?.user.role;
  /*   if (role === UserRole.DOCTOR) {
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
            variant={pathname === "/profile" ? "default" : "outline"}
          >
            <Link href="/profile">profile</Link>
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
        <Button
          asChild
          variant={pathname === "/profile" ? "default" : "outline"}
        >
          <Link href="/profile">profile</Link>
        </Button>
      </div>
      <UserButton />
    </nav>
  ); */
  return (
    <div className="bg-primary text-white shadow-md w-full">
      <div className="container mx-auto flex justify-between items-center px-6 py-4">
        <div className="text-2xl font-bold">HealthCarePlus</div>
        <nav className="hidden md:flex space-x-6">
          <Link href="/" className="hover:text-gray-300">
            Home
          </Link>
          <Link href="/about" className="hover:text-gray-300">
            About Us
          </Link>
          <Link href="/dashboard" className="hover:text-gray-300">
            Services
          </Link>
          <Link href="/contact" className="hover:text-gray-300">
            Contact Us
          </Link>
          <Link href="/profile" className="hover:text-gray-300">
            Profile
          </Link>
          {/*  <Link href="/login" className="hover:text-gray-300">
              Login
            </Link> */}
        </nav>
        <div className="">
          <UserButton />
        </div>
        <div className="md:hidden">
          <button onClick={() => setIsNavOpen(!isNavOpen)}>
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d={
                  !isNavOpen ? "M4 6h16M4 12h16m-7 6h7" : "M6 18L18 6M6 6l12 12"
                }
              ></path>
            </svg>
          </button>
        </div>
      </div>
      {isNavOpen && (
        <div className="md:hidden px-6 py-4 space-y-4 bg-primary">
          <Link href="/home" className="block text-gray-200">
            Home
          </Link>
          <Link href="/about" className="block text-gray-200">
            About Us
          </Link>
          <Link href="/services" className="block text-gray-200">
            Services
          </Link>
          <Link href="/contact" className="block text-gray-200">
            Contact Us
          </Link>
          <UserButton />
        </div>
      )}
    </div>
  );
};
