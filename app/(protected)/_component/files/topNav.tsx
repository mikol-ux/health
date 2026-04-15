"use client";

import { UserButton } from "@/components/auth/user-button";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { UserRole } from "@prisma/client";
import clsx from "clsx";
import {
  Menu, Bell, Search, LayoutDashboard, User, Users,
  CalendarDays, Settings, Home, Syringe, Pill, FileText,
} from "lucide-react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";

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

// Derive a readable page title from the pathname
function getPageTitle(pathname: string) {
  const map: Record<string, string> = {
    "/dashboard": "Dashboard",
    "/create-profile": "Setup Profile",
    "/profile": "My Profile",
    "/patients": "Patients",
    "/patient": "Patient Details",
    "/appointments": "Appointments",
    "/appointment": "Book Appointment",
    "/report": "Medical Reports",
    "/medication": "Medications",
    "/injection": "Injections",
    "/setting": "Settings",
    "/medical_record": "Medical Records",
  };
  for (const [key, label] of Object.entries(map)) {
    if (pathname.startsWith(key)) return label;
  }
  return "Dashboard";
}

export default function DashboardTopNav() {
  const pathname = usePathname();
  const { data: session } = useSession();
  const role = session?.user?.role;
  const navItems = getNavItems(role);
  const pageTitle = getPageTitle(pathname);

  return (
    <header className="h-16 bg-white border-b border-slate-100 flex items-center px-6 gap-4 shrink-0">
      {/* Mobile menu */}
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon" className="lg:hidden">
            <Menu className="w-5 h-5" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-72 bg-slate-900 p-0 border-0">
          <SheetHeader className="px-5 h-16 border-b border-slate-800 flex flex-row items-center">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 bg-sky-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold">M</span>
              </div>
              <SheetTitle className="text-white text-lg font-bold">
                Med<span className="text-sky-400">Care</span>
              </SheetTitle>
            </div>
          </SheetHeader>
          <nav className="px-3 py-4 space-y-0.5">
            {navItems.map((item) => {
              const active = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={clsx(
                    "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all",
                    active
                      ? "bg-sky-500 text-white"
                      : "text-slate-400 hover:bg-slate-800 hover:text-white"
                  )}
                >
                  <item.icon className="w-4 h-4" />
                  {item.label}
                </Link>
              );
            })}
            <div className="pt-3 border-t border-slate-800 mt-3">
              <Link
                href="/"
                className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-slate-400 hover:bg-slate-800 hover:text-white transition-all"
              >
                <Home className="w-4 h-4" />
                Back to Site
              </Link>
            </div>
          </nav>
        </SheetContent>
      </Sheet>

      {/* Page title */}
      <div className="flex-1">
        <h1 className="text-lg font-semibold text-slate-800">{pageTitle}</h1>
      </div>

      {/* Right actions */}
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon" className="text-slate-500 hover:text-slate-800">
          <Bell className="w-5 h-5" />
        </Button>
        <div className="w-px h-6 bg-slate-200 mx-1" />
        <div className="flex items-center gap-2.5">
          <UserButton />
          <div className="hidden sm:block">
            <p className="text-sm font-medium text-slate-800 leading-tight">
              {session?.user?.name ?? "User"}
            </p>
            <p className="text-xs text-slate-400 leading-tight capitalize">
              {role?.toLowerCase() ?? "user"}
            </p>
          </div>
        </div>
      </div>
    </header>
  );
}
