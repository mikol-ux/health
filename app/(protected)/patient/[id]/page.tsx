import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Medical_report from "../../_component/files/Medical-record";
import { testing } from "@/actions/testing";
import Link from "next/link";
import Injection from "../../_component/files/injection";
import Doctors_Report from "../../_component/files/Doctors report";
import { Button } from "@/components/ui/button";
import { UserRole } from "@prisma/client";
import { auth } from "@/auth";
import { User, Phone, MapPin, Calendar, Heart, FilePlus, Syringe } from "lucide-react";

const Field = ({ label, value }: { label: string; value?: string | null }) => (
  <div className="p-4 bg-slate-50 rounded-xl">
    <p className="text-xs font-medium text-slate-400 uppercase tracking-wider mb-1">{label}</p>
    <p className="text-sm font-semibold text-slate-800">{value ?? "—"}</p>
  </div>
);

const Patient = async ({
  params,
  searchParams,
}: {
  params: { id: string };
  searchParams: { [key: string]: string | undefined };
}) => {
  const user = await auth();
  const recenttab = searchParams.tab || "profile";
  const { profile, doctorsreport, medication, injection } = await testing(params.id);

  return (
    <div className="space-y-5">
      {/* Patient header */}
      <div className="bg-gradient-to-r from-slate-800 to-slate-900 rounded-2xl p-6 text-white flex items-center gap-4">
        <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center shrink-0">
          <span className="text-2xl font-bold text-white">
            {profile?.fullname?.charAt(0).toUpperCase() ?? "?"}
          </span>
        </div>
        <div>
          <p className="text-slate-400 text-xs font-medium uppercase tracking-wider mb-0.5">Patient</p>
          <h1 className="text-xl font-bold">{profile?.fullname ?? "Unknown"}</h1>
          <p className="text-slate-400 text-sm">{profile?.gender} · DOB: {profile?.dob}</p>
        </div>
      </div>

      <Tabs defaultValue={recenttab} className="space-y-4">
        <TabsList className="bg-white border border-slate-100 rounded-xl p-1 h-auto gap-1">
          <TabsTrigger value="profile" asChild>
            <Link href={{ query: { tab: "profile" } }}
              className="px-4 py-2 rounded-lg text-sm font-medium data-[state=active]:bg-sky-500 data-[state=active]:text-white transition-colors">
              Profile
            </Link>
          </TabsTrigger>
          <TabsTrigger value="medicalrecord" asChild>
            <Link href={{ query: { tab: "medicalrecord" } }}
              className="px-4 py-2 rounded-lg text-sm font-medium data-[state=active]:bg-sky-500 data-[state=active]:text-white transition-colors">
              Medical Records
            </Link>
          </TabsTrigger>
          <TabsTrigger value="injection" asChild>
            <Link href={{ query: { tab: "injection" } }}
              className="px-4 py-2 rounded-lg text-sm font-medium data-[state=active]:bg-sky-500 data-[state=active]:text-white transition-colors">
              Injections
            </Link>
          </TabsTrigger>
        </TabsList>

        {/* Profile tab */}
        <TabsContent value="profile">
          <div className="bg-white rounded-2xl border border-slate-100 p-6 space-y-4">
            <h2 className="text-sm font-semibold text-slate-400 uppercase tracking-wider">Personal Information</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Field label="Full Name" value={profile?.fullname} />
              <Field label="Date of Birth" value={profile?.dob} />
              <Field label="Gender" value={profile?.gender} />
              <Field label="Phone" value={profile?.phone} />
              <Field label="Address" value={profile?.address} />
              <Field label="Next of Kin" value={profile?.nextofkin} />
              <Field label="Next of Kin Phone" value={profile?.nextofphone} />
            </div>
          </div>
        </TabsContent>

        {/* Medical records tab */}
        <TabsContent value="medicalrecord">
          <div className="space-y-4">
            {user?.user.role === UserRole.DOCTOR && (
              <Link href={`/medical_record/${params.id}`}>
                <Button className="bg-sky-500 hover:bg-sky-600 text-white gap-2">
                  <FilePlus className="w-4 h-4" />
                  Create New Report
                </Button>
              </Link>
            )}
            {doctorsreport.length === 0 ? (
              <div className="bg-white rounded-2xl border border-slate-100 py-16 text-center">
                <p className="text-slate-400 text-sm">No medical records found</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {doctorsreport.map((med) => (
                  <Doctors_Report key={med.id} {...med} />
                ))}
              </div>
            )}
          </div>
        </TabsContent>

        {/* Injections tab */}
        <TabsContent value="injection">
          <div className="space-y-4">
            {user?.user.role === UserRole.NURSE && (
              <Link href={`/injection/${params.id}`}>
                <Button className="bg-sky-500 hover:bg-sky-600 text-white gap-2">
                  <Syringe className="w-4 h-4" />
                  Record Injection
                </Button>
              </Link>
            )}
            {injection.length === 0 ? (
              <div className="bg-white rounded-2xl border border-slate-100 py-16 text-center">
                <p className="text-slate-400 text-sm">No injection records found</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {injection.map((med) => (
                  <Injection key={med.id} {...med} />
                ))}
              </div>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Patient;
