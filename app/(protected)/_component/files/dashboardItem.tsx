import { dashboardData } from "@/actions/deleteUser";
import { auth } from "@/auth";
import { UserRole } from "@prisma/client";
import Link from "next/link";
import {
  Users, UserCheck, CalendarDays,
  Activity, Settings, ArrowRight,
} from "lucide-react";

const PatientDashboard = ({ name }: { name?: string | null }) => (
  <div className="space-y-6">
    {/* Welcome */}
    <div className="bg-gradient-to-r from-sky-500 to-sky-600 rounded-2xl p-6 text-white">
      <p className="text-sky-100 text-sm font-medium mb-1">Welcome back</p>
      <h2 className="text-2xl font-bold mb-4">{name ?? "Patient"}</h2>
      <p className="text-sky-100 text-sm max-w-md">
        Manage your appointments and medical records all in one place.
      </p>
      <Link
        href="/appointment"
        className="inline-flex items-center gap-2 mt-5 px-5 py-2.5 bg-white text-sky-600 font-semibold text-sm rounded-xl hover:bg-sky-50 transition-colors"
      >
        <CalendarDays className="w-4 h-4" />
        Book Appointment
        <ArrowRight className="w-4 h-4" />
      </Link>
    </div>

    {/* Quick links */}
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <Link
        href="/profile"
        className="flex items-center gap-4 p-5 bg-white rounded-2xl border border-slate-100 hover:border-sky-200 hover:shadow-md transition-all group"
      >
        <div className="w-11 h-11 bg-sky-50 group-hover:bg-sky-100 rounded-xl flex items-center justify-center transition-colors">
          <UserCheck className="w-5 h-5 text-sky-500" />
        </div>
        <div>
          <p className="font-semibold text-slate-800 text-sm">My Profile</p>
          <p className="text-xs text-slate-400">View & update your details</p>
        </div>
      </Link>
      <Link
        href="/appointment"
        className="flex items-center gap-4 p-5 bg-white rounded-2xl border border-slate-100 hover:border-emerald-200 hover:shadow-md transition-all group"
      >
        <div className="w-11 h-11 bg-emerald-50 group-hover:bg-emerald-100 rounded-xl flex items-center justify-center transition-colors">
          <CalendarDays className="w-5 h-5 text-emerald-500" />
        </div>
        <div>
          <p className="font-semibold text-slate-800 text-sm">Appointments</p>
          <p className="text-xs text-slate-400">Book or check appointments</p>
        </div>
      </Link>
    </div>
  </div>
);

const StatCard = ({
  label, value, icon: Icon, color, href, sub,
}: {
  label: string;
  value: number;
  icon: React.ElementType;
  color: string;
  href?: string;
  sub?: string;
}) => {
  const inner = (
    <div className={`bg-white rounded-2xl p-6 border border-slate-100 hover:shadow-md transition-all group ${href ? "cursor-pointer" : ""}`}>
      <div className="flex items-start justify-between mb-4">
        <div className={`w-12 h-12 ${color} rounded-xl flex items-center justify-center`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
        {href && (
          <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-sky-500 group-hover:translate-x-1 transition-all" />
        )}
      </div>
      <p className="text-3xl font-bold text-slate-800 mb-1">{value}</p>
      <p className="text-sm font-medium text-slate-500">{label}</p>
      {sub && <p className="text-xs text-slate-400 mt-1">{sub}</p>}
    </div>
  );
  return href ? <Link href={href}>{inner}</Link> : <div>{inner}</div>;
};

const StaffDashboard = async ({
  name, role, totalrecordedpatients, admittedPatients, appointments,
}: {
  name?: string | null;
  role?: string;
  totalrecordedpatients: number;
  admittedPatients: number;
  appointments: number;
}) => {
  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long", year: "numeric", month: "long", day: "numeric",
  });

  return (
    <div className="space-y-6">
      {/* Welcome banner */}
      <div className="bg-gradient-to-r from-slate-800 to-slate-900 rounded-2xl p-6 text-white flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <p className="text-slate-400 text-sm font-medium mb-1">Welcome back</p>
          <h2 className="text-2xl font-bold">{name ?? "Staff"}</h2>
          <p className="text-slate-400 text-sm mt-1 capitalize">{role?.toLowerCase()} · {today}</p>
        </div>
        <div className="flex items-center gap-2 bg-slate-700/50 rounded-xl px-4 py-3">
          <Activity className="w-5 h-5 text-emerald-400" />
          <div>
            <p className="text-xs text-slate-400">System Status</p>
            <p className="text-sm font-semibold text-emerald-400">Operational</p>
          </div>
        </div>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        <StatCard
          label="Total Patients"
          value={totalrecordedpatients}
          icon={Users}
          color="bg-sky-500"
          sub="All registered patients"
        />
        <StatCard
          label="Admitted Patients"
          value={admittedPatients}
          icon={UserCheck}
          color="bg-emerald-500"
          sub="Currently in hospital"
        />
        <StatCard
          label="Appointments"
          value={appointments}
          icon={CalendarDays}
          color="bg-violet-500"
          href="/appointments"
          sub="View all appointments"
        />
      </div>

      {/* Quick actions */}
      <div className="bg-white rounded-2xl border border-slate-100 p-6">
        <h3 className="text-sm font-semibold text-slate-600 uppercase tracking-wider mb-4">Quick Actions</h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[
            { label: "View Patients", href: "/patients", icon: Users, bg: "bg-sky-50", text: "text-sky-600" },
            { label: "Appointments", href: "/appointments", icon: CalendarDays, bg: "bg-violet-50", text: "text-violet-600" },
            { label: "My Profile", href: "/profile", icon: UserCheck, bg: "bg-emerald-50", text: "text-emerald-600" },
            { label: "Settings", href: "/setting", icon: Settings, bg: "bg-slate-50", text: "text-slate-600" },
          ].map((action) => (
            <Link
              key={action.label}
              href={action.href}
              className={`flex flex-col items-center gap-2 p-4 ${action.bg} rounded-xl hover:opacity-80 transition-opacity`}
            >
              <action.icon className={`w-5 h-5 ${action.text}`} />
              <span className={`text-xs font-medium ${action.text} text-center`}>{action.label}</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

const DashBoardItem = async () => {
  const user = await auth();
  const { admittedPatients, totalrecordedpatients, appointments } = await dashboardData();

  if (user?.user.role === UserRole.PATIENT || !user?.user.role) {
    return <PatientDashboard name={user?.user?.name} />;
  }

  return (
    <StaffDashboard
      name={user?.user?.name}
      role={user?.user?.role}
      totalrecordedpatients={totalrecordedpatients}
      admittedPatients={admittedPatients}
      appointments={appointments}
    />
  );
};

export default DashBoardItem;
