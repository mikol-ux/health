"use client";

import { UserButton } from "@/components/auth/user-button";
import { Separator } from "@/components/ui/separator";
import { UserRole } from "@prisma/client";
import clsx from "clsx";
import {
  Banknote,
  Folder,
  HomeIcon,
  Settings,
  LayoutDashboard,
} from "lucide-react";

import { useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaRegClock, FaTasks } from "react-icons/fa";

export default function DashboardSideBar() {
  const pathname = usePathname();
  const { data: session, update } = useSession();
  if (session?.user.role === UserRole.PATIENT || !session?.user.role) {
    return (
      <div className="lg:block hidden border-r h-full">
        <div className="flex h-full max-h-screen flex-col gap-2 ">
          <div className="flex h-[55px] items-center justify-between border-b px-3 w-full">
            <Link
              className="flex items-center gap-2 font-semibold ml-1"
              href="/"
            >
              <span className="">
                Dash Board <LayoutDashboard />
              </span>
            </Link>
          </div>
          <div className="flex-1 overflow-auto py-2 ">
            <nav className="grid items-start px-4 text-sm font-medium">
              <Link
                className={clsx(
                  "flex items-center gap-2 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50",
                  {
                    "flex items-center gap-2 rounded-lg bg-gray-100 px-3 py-2 text-gray-900  transition-all hover:text-gray-900 dark:bg-gray-800 dark:text-gray-50 dark:hover:text-gray-50":
                      pathname === "/dashboard",
                  }
                )}
                href="/"
              >
                <div className="border rounded-lg dark:bg-black dark:border-gray-800 border-gray-400 p-1 bg-white">
                  <HomeIcon className="h-3 w-3" />
                </div>
                Home
              </Link>
              <Link
                className={clsx(
                  "flex items-center gap-2 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50",
                  {
                    "flex items-center gap-2 rounded-lg bg-gray-100 px-3 py-2 text-gray-900  transition-all hover:text-gray-900 dark:bg-gray-800 dark:text-gray-50 dark:hover:text-gray-50":
                      pathname === "/profile",
                  }
                )}
                href="/profile"
              >
                <div className="border rounded-lg dark:bg-black dark:border-gray-800 border-gray-400 p-1 bg-white">
                  <Folder className="h-3 w-3" />
                </div>
                Profile
              </Link>
              <Link
                className={clsx(
                  "flex items-center gap-2 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50",
                  {
                    "flex items-center gap-2 rounded-lg bg-gray-100 px-3 py-2 text-gray-900  transition-all hover:text-gray-900 dark:bg-gray-800 dark:text-gray-50 dark:hover:text-gray-50":
                      pathname === "/appointment",
                  }
                )}
                href="/appointment"
              >
                <div className="border rounded-lg dark:bg-black dark:border-gray-800 border-gray-400 p-1 bg-white">
                  <FaRegClock className="h-3 w-3" />
                </div>
                appointment
              </Link>

              <Separator className="my-3" />
              <Link
                className={clsx(
                  "flex items-center gap-2 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50",
                  {
                    "flex items-center gap-2 rounded-lg bg-gray-100 px-3 py-2 text-gray-900  transition-all hover:text-gray-900 dark:bg-gray-800 dark:text-gray-50 dark:hover:text-gray-50":
                      pathname === "/setting",
                  }
                )}
                href="/setting"
                id="onboarding"
              >
                <div className="border rounded-lg dark:bg-black dark:border-gray-800 border-gray-400 p-1 bg-white">
                  <Settings className="h-3 w-3" />
                </div>
                setting
              </Link>
              <div
                className={clsx(
                  "flex items-center gap-2 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50",
                  {
                    "flex items-center gap-2 rounded-lg bg-gray-100 px-3 py-2 text-gray-900  transition-all hover:text-gray-900 dark:bg-gray-800 dark:text-gray-50 dark:hover:text-gray-50":
                      pathname === "/reviews",
                  }
                )}
                id="onboarding"
              >
                <div className="border rounded-lg dark:bg-black dark:border-gray-800 border-gray-400 p-1 bg-white">
                  <UserButton />
                </div>
                User options
              </div>
            </nav>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="lg:block hidden border-r h-full">
      <div className="flex h-full max-h-screen flex-col gap-2 ">
        <div className="flex h-[55px] items-center justify-between border-b px-3 w-full">
          <Link className="flex items-center gap-2 font-semibold ml-1" href="/">
            <span className="">
              Dash Board <LayoutDashboard />
            </span>
          </Link>
        </div>
        <div className="flex-1 overflow-auto py-2 ">
          <nav className="grid items-start px-4 text-sm font-medium">
            <Link
              className={clsx(
                "flex items-center gap-2 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50",
                {
                  "flex items-center gap-2 rounded-lg bg-gray-100 px-3 py-2 text-gray-900  transition-all hover:text-gray-900 dark:bg-gray-800 dark:text-gray-50 dark:hover:text-gray-50":
                    pathname === "/dashboard",
                }
              )}
              href="/"
            >
              <div className="border rounded-lg dark:bg-black dark:border-gray-800 border-gray-400 p-1 bg-white">
                <HomeIcon className="h-3 w-3" />
              </div>
              Home
            </Link>
            <Link
              className={clsx(
                "flex items-center gap-2 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50",
                {
                  "flex items-center gap-2 rounded-lg bg-gray-100 px-3 py-2 text-gray-900  transition-all hover:text-gray-900 dark:bg-gray-800 dark:text-gray-50 dark:hover:text-gray-50":
                    pathname === "/profile",
                }
              )}
              href="/profile"
            >
              <div className="border rounded-lg dark:bg-black dark:border-gray-800 border-gray-400 p-1 bg-white">
                <Folder className="h-3 w-3" />
              </div>
              Profile
            </Link>
            <Link
              className={clsx(
                "flex items-center gap-2 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50",
                {
                  "flex items-center gap-2 rounded-lg bg-gray-100 px-3 py-2 text-gray-900  transition-all hover:text-gray-900 dark:bg-gray-800 dark:text-gray-50 dark:hover:text-gray-50":
                    pathname === "/patients",
                }
              )}
              href="/patients"
            >
              <div className="border rounded-lg dark:bg-black dark:border-gray-800 border-gray-400 p-1 bg-white">
                <FaTasks className="h-3 w-3" />
              </div>
              patients
            </Link>
            <Link
              className={clsx(
                "flex items-center gap-2 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50",
                {
                  "flex items-center gap-2 rounded-lg bg-gray-100 px-3 py-2 text-gray-900  transition-all hover:text-gray-900 dark:bg-gray-800 dark:text-gray-50 dark:hover:text-gray-50":
                    pathname === "appointments",
                }
              )}
              href="/appointments"
            >
              <div className="border rounded-lg dark:bg-black dark:border-gray-800 border-gray-400 p-1 bg-white">
                <Banknote className="h-3 w-3" />
              </div>
              Appointments
            </Link>
            <Separator className="my-3" />
            <Link
              className={clsx(
                "flex items-center gap-2 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50",
                {
                  "flex items-center gap-2 rounded-lg bg-gray-100 px-3 py-2 text-gray-900  transition-all hover:text-gray-900 dark:bg-gray-800 dark:text-gray-50 dark:hover:text-gray-50":
                    pathname === "/setting",
                }
              )}
              href="/setting"
              id="onboarding"
            >
              <div className="border rounded-lg dark:bg-black dark:border-gray-800 border-gray-400 p-1 bg-white">
                <Settings className="h-3 w-3" />
              </div>
              setting
            </Link>
            <div
              className={clsx(
                "flex items-center gap-2 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50",
                {
                  "flex items-center gap-2 rounded-lg bg-gray-100 px-3 py-2 text-gray-900  transition-all hover:text-gray-900 dark:bg-gray-800 dark:text-gray-50 dark:hover:text-gray-50":
                    pathname === "/reviews",
                }
              )}
              id="onboarding"
            >
              <div className="border rounded-lg dark:bg-black dark:border-gray-800 border-gray-400 p-1 bg-white">
                <UserButton />
              </div>
              User options
            </div>
          </nav>
        </div>
      </div>
    </div>
  );
}
