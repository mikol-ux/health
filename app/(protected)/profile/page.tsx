"use client";

import Link from "next/link";
import { useSession } from "next-auth/react";
import { UserRole } from "@prisma/client";
import { User, Phone, MapPin, Calendar, Stethoscope, BadgeCheck, Building2, Heart } from "lucide-react";

const Field = ({ label, value, icon: Icon }: { label: string; value?: string; icon?: React.ElementType }) => (
  <div className="flex items-start gap-3 p-4 bg-slate-50 rounded-xl">
    {Icon && (
      <div className="w-8 h-8 bg-sky-100 rounded-lg flex items-center justify-center shrink-0 mt-0.5">
        <Icon className="w-4 h-4 text-sky-500" />
      </div>
    )}
    <div>
      <p className="text-xs font-medium text-slate-400 uppercase tracking-wider mb-0.5">{label}</p>
      <p className="text-sm font-semibold text-slate-800">{value ?? "—"}</p>
    </div>
  </div>
);

export default function ProfilePage() {
  const { data: session } = useSession();
  const profile = session?.user?.profile;
  const role = session?.user?.role;

  if (!profile) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] gap-4">
        <div className="w-16 h-16 bg-slate-100 rounded-2xl flex items-center justify-center">
          <User className="w-8 h-8 text-slate-400" />
        </div>
        <h2 className="text-xl font-semibold text-slate-700">No profile found</h2>
        <p className="text-slate-500 text-sm">You haven&apos;t set up your profile yet.</p>
        <Link
          href="/create-profile"
          className="px-5 py-2.5 bg-sky-500 text-white text-sm font-semibold rounded-xl hover:bg-sky-600 transition-colors"
        >
          Create Profile
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {/* Header card */}
      <div className="bg-gradient-to-r from-sky-500 to-sky-600 rounded-2xl p-6 text-white flex items-center gap-5">
        <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center shrink-0">
          <User className="w-8 h-8 text-white" />
        </div>
        <div>
          <p className="text-sky-100 text-sm font-medium capitalize">{role?.toLowerCase()}</p>
          <h1 className="text-2xl font-bold">{profile.fullname}</h1>
          <p className="text-sky-100 text-sm mt-0.5">{session?.user?.email}</p>
        </div>
        <div className="ml-auto">
          <Link
            href="/setting"
            className="px-4 py-2 bg-white/20 hover:bg-white/30 text-white text-sm font-medium rounded-xl transition-colors"
          >
            Edit Profile
          </Link>
        </div>
      </div>

      {/* Common fields */}
      <div className="bg-white rounded-2xl border border-slate-100 p-6">
        <h2 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-4">Personal Information</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <Field label="Full Name" value={profile.fullname} icon={User} />
          <Field label="Date of Birth" value={profile.dob} icon={Calendar} />
          <Field label="Gender" value={profile.gender} icon={User} />
          <Field label="Phone" value={profile.phone} icon={Phone} />
          <Field label="Address" value={profile.address} icon={MapPin} />
        </div>
      </div>

      {/* Role-specific fields */}
      {role === UserRole.DOCTOR && (
        <div className="bg-white rounded-2xl border border-slate-100 p-6">
          <h2 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-4">Professional Details</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <Field label="Medical License No." value={profile.medicalLicenseNumber} icon={BadgeCheck} />
            <Field label="Specialization" value={profile.specialization} icon={Stethoscope} />
            <Field label="Years of Experience" value={profile.yearsOfExperience} icon={Calendar} />
          </div>
        </div>
      )}

      {role === UserRole.NURSE && (
        <div className="bg-white rounded-2xl border border-slate-100 p-6">
          <h2 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-4">Professional Details</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <Field label="Nursing License No." value={profile.nursingLicenseNumber} icon={BadgeCheck} />
            <Field label="Department" value={profile.department} icon={Building2} />
            <Field label="Years of Experience" value={profile.yearsOfExperience} icon={Calendar} />
          </div>
        </div>
      )}

      {role === UserRole.STAFF && (
        <div className="bg-white rounded-2xl border border-slate-100 p-6">
          <h2 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-4">Professional Details</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <Field label="Position" value={profile.position} icon={BadgeCheck} />
            <Field label="Department" value={profile.department} icon={Building2} />
          </div>
        </div>
      )}

      {role === UserRole.PATIENT && (
        <div className="bg-white rounded-2xl border border-slate-100 p-6">
          <h2 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-4">Emergency Contact</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <Field label="Next of Kin" value={profile.nextofkin} icon={Heart} />
            <Field label="Next of Kin Phone" value={profile.nextofphone} icon={Phone} />
          </div>
        </div>
      )}
    </div>
  );
}
