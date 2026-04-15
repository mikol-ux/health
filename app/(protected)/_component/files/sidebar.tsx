"use client";

import { UserButton } from "@/components/auth/user-button";
import { UserRole } from "@prisma/client";
import clsx from "clsx";
import {
  LayoutDashboard,
  User,
  Users,
  CalendarDays,
  Settings,
  Home,
  Syringe,
  Pill,
  FileText,
  LogOut,
} from "lucide-react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { logout } from "@/actions/logout";

const patientNav = [
  { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { label: "My Profile", href: "/profile", icon: User },
  { label: "Appointment", href: "/appointment", icon: CalendarDays },
  { label: "Settings", href: "/setting", icon: Settings },
];

const staffNav = [
  { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { label: "My Profile", href: "/profile", icon: User },
  { label: "Patients", href: "/patients", icon: Users },
  { label: "Appointments", href: "/appointments", icon: CalendarDays },
  { label: "Settings", href: "/setting", icon: Settings },
];

const doctorNav = [
  { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { label: "My Profile", href: "/profile", icon: User },
  { label: "Patients", href: "/patients", icon: Users },
  { label: "Appointments", href: "/appointments", icon: CalendarDays },
  { label: "Medical Reports", href: "/report", icon: FileText },
  { label: "Medications", href: "/medication", icon: Pill },
  { label: "Settings", href: "/setting", icon: Settings },
];

const nurseNav = [
  { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { label: "My Profile", href: "/profile", icon: User },
  { label: "Patients", href: "/patients", icon: Users },
  { label: "Appointments", href: "/appointments", icon: CalendarDays },
  { label: "Injections", href: "/injection", icon: Syringe },
  { label: "Settings", href: "/setting", icon: Settings },
];

function getNavItems(role: UserRole | undefined) {
  switch (role) {
    case UserRole.DOCTOR: return doctorNav;
    case UserRole.NURSE: return nurseNav;
    case UserRole.STAFF: return staffNav;
    default: return patientNav;
  }
}

export default function DashboardSideBar() {
  const pathname = usePathname();
  const { data: session } = useSession();
  const role = session?.user?.role;
  const navItems = getNavItems(role);

  return (
    <aside className="hidden lg:flex flex-col w-64 bg-slate-900 text-slate-300 h-full shrink-0">
      {/* Logo */}
      <div className="flex items-center gap-2.5 px-5 h-16 border-b border-slate-800 shrink-0">
        <div className="w-8 h-8 bg-sky-500 rounded-lg flex items-center justify-center">
          <span className="text-white font-bold">M</span>
        </div>
        <span className="text-lg font-bold text-white">
          Med<span className="text-sky-400">Care</span>
        </span>
      </div>

      {/* Role badge */}
      <div className="px-5 pt-5 pb-3">
        <span className="inline-flex items-center px-2.5 py-1 rounded-md bg-slate-800 text-xs font-medium text-sky-400 uppercase tracking-wider">
          {role ?? "User"}
        </span>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-2 space-y-0.5 overflow-y-auto scrollbar-thin">
        {navItems.map((item) => {
          const active = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={clsx(
                "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all",
                active
                  ? "bg-sky-500 text-white shadow-lg shadow-sky-500/20"
                  : "text-slate-400 hover:bg-slate-800 hover:text-white"
              )}
            >
              <item.icon className="w-4 h-4 shrink-0" />
              {item.label}
            </Link>
          );
        })}
      </nav>

      {/* Bottom — user + logout */}
      <div className="px-3 pb-4 pt-3 border-t border-slate-800 space-y-2 shrink-0">
        <Link
          href="/"
          className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-slate-400 hover:bg-slate-800 hover:text-white transition-all"
        >
          <Home className="w-4 h-4 shrink-0" />
          Back to Site
        </Link>
        <div className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-slate-800 transition-all cursor-pointer">
          <UserButton />
          <div className="min-w-0">
            <p className="text-sm font-medium text-white truncate">
              {session?.user?.name ?? "User"}
            </p>
            <p className="text-xs text-slate-500 truncate">
              {session?.user?.email}
            </p>
          </div>
        </div>
      </div>
    </aside>
  );
}
