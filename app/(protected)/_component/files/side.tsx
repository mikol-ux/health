"use client";

import { useState } from "react";
import { Nav } from "./nav";

type Props = {};

import {
  ShoppingCart,
  LayoutDashboard,
  UsersRound,
  Settings,
  ChevronRight,
  User,
  AlarmClock,
  Heart,
  Calendar,
} from "lucide-react";
import { Button } from "@/components/ui/button";

import { useWindowWidth } from "@react-hook/window-size";
import { useSession } from "next-auth/react";
import { UserRole } from "@prisma/client";
type LucideIcon = typeof LayoutDashboard;
export default function SideNavbar({}: Props) {
  const { data: session, update, status } = useSession();
  const [isCollapsed, setIsCollapsed] = useState(false);

  const onlyWidth = useWindowWidth();

  const links: {
    title: string;
    href: string;
    icon: LucideIcon;
    variant: "default" | "ghost";
  }[] =
    session?.user.role === UserRole.PATIENT
      ? [
          {
            title: "Dashboard",
            href: "/",
            icon: LayoutDashboard,
            variant: "default",
          },
          {
            title: "Users",
            href: "/profile",
            icon: UsersRound,
            variant: "ghost",
          },
          {
            title: "Orders",
            href: "/appointment",
            icon: AlarmClock,
            variant: "ghost",
          },
          {
            title: "Settings",
            href: "/settings",
            icon: Settings,
            variant: "ghost",
          },
        ]
      : session?.user.role === UserRole.DOCTOR
      ? [
          {
            title: "Dashboard",
            href: "/",
            icon: LayoutDashboard,
            variant: "default",
          },
          {
            title: "Appointments",
            href: "/appointments",
            icon: Calendar,
            variant: "ghost",
          },
          {
            title: "patients",
            href: "/patients",
            icon: Heart,
            variant: "ghost",
          },
          {
            title: "Settings",
            href: "/settings",
            icon: Settings,
            variant: "ghost",
          },
        ]
      : session?.user.role === UserRole.STAFF
      ? [
          {
            title: "Dashboard",
            href: "/",
            icon: LayoutDashboard,
            variant: "default",
          },
          {
            title: "Appointments",
            href: "/appointments",
            icon: Calendar,
            variant: "ghost",
          },
          {
            title: "patients",
            href: "/patients",
            icon: Heart,
            variant: "ghost",
          },
          {
            title: "Settings",
            href: "/settings",
            icon: Settings,
            variant: "ghost",
          },
        ]
      : session?.user.role === UserRole.NURSE
      ? [
          {
            title: "Dashboard",
            href: "/",
            icon: LayoutDashboard,
            variant: "default",
          },
          {
            title: "Appointments",
            href: "/appointments",
            icon: Calendar,
            variant: "ghost",
          },
          {
            title: "patients",
            href: "/patients",
            icon: Heart,
            variant: "ghost",
          },
          {
            title: "Settings",
            href: "/settings",
            icon: Settings,
            variant: "ghost",
          },
        ]
      : [];

  const mobileWidth = onlyWidth < 768;

  function toggleSidebar() {
    setIsCollapsed(!isCollapsed);
  }

  return (
    <div className="relative min-w-[80px] border-r px-3  pb-10 pt-24 ">
      {!mobileWidth && (
        <div className="absolute right-[-20px] top-7">
          <Button
            onClick={toggleSidebar}
            variant="secondary"
            className=" rounded-full p-2"
          >
            <ChevronRight />
          </Button>
        </div>
      )}
      <Nav isCollapsed={mobileWidth ? true : isCollapsed} links={links} />
    </div>
  );
}
