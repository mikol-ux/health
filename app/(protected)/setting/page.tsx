"use client";
import React, { useState, useTransition } from "react";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useSession } from "next-auth/react";
import { PatientUpdateSchema, DoctorUpdateSchema, NurseUpdateSchema, StaffUpdateSchema } from "@/schemas";
import { UserRole } from "@prisma/client";
import { Update_Profile } from "@/actions/createprofile";
import { Settings, CheckCircle2, AlertCircle } from "lucide-react";

type RegistrationFormValues = {
  fullName: string; dob: string; gender: string; phone: string; address: string;
  medicalLicenseNumber?: string; specialization?: string; yearsOfExperience?: string;
  nursingLicenseNumber?: string; department?: string; position?: string;
  nextofkin?: string; nextofphone?: string;
};

const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div className="bg-white rounded-2xl border border-slate-100 p-6 space-y-4">
    <h2 className="text-xs font-semibold text-slate-400 uppercase tracking-wider">{title}</h2>
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">{children}</div>
  </div>
);

const FL = ({ children }: { children: React.ReactNode }) => (
  <FormLabel className="text-xs font-medium text-slate-500 uppercase tracking-wider">{children}</FormLabel>
);

export default function SettingsPage() {
  const { data: session, update } = useSession();
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isPending, startTransition] = useTransition();
  const role = session?.user?.role;
  const profile = session?.user?.profile;

  const schema =
    role === UserRole.DOCTOR ? DoctorUpdateSchema :
    role === UserRole.NURSE ? NurseUpdateSchema :
    role === UserRole.STAFF ? StaffUpdateSchema : PatientUpdateSchema;

  const form = useForm<RegistrationFormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      fullName: profile?.fullname ?? "",
      dob: profile?.dob ?? "",
      gender: profile?.gender ?? "",
      phone: profile?.phone ?? "",
      address: profile?.address ?? "",
      ...(role === UserRole.DOCTOR && {
        medicalLicenseNumber: profile?.medicalLicenseNumber ?? "",
        specialization: profile?.specialization ?? "",
        yearsOfExperience: profile?.yearsOfExperience ?? "",
      }),
      ...(role === UserRole.NURSE && {
        nursingLicenseNumber: profile?.nursingLicenseNumber ?? "",
        department: profile?.department ?? "",
        yearsOfExperience: profile?.yearsOfExperience ?? "",
      }),
      ...(role === UserRole.STAFF && {
        position: profile?.position ?? "",
        department: profile?.department ?? "",
      }),
      ...(role === UserRole.PATIENT && {
        nextofkin: profile?.nextofkin ?? "",
        nextofphone: profile?.nextofphone ?? "",
      }),
    },
  });

  const onSubmit = (values: RegistrationFormValues) => {
    setError(""); setSuccess("");
    startTransition(() => {
      Update_Profile(Object.fromEntries(Object.entries(values).filter(([, v]) => v !== undefined)) as Required<RegistrationFormValues>)
        .then((data) => {
          if (data?.error) setError(data.error);
          if (data?.success) { update(); setSuccess(data.success); }
        })
        .catch(() => setError("Something went wrong"));
    });
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-slate-100 rounded-xl flex items-center justify-center">
          <Settings className="w-5 h-5 text-slate-600" />
        </div>
        <div>
          <h1 className="text-lg font-bold text-slate-800">Settings</h1>
          <p className="text-sm text-slate-400">Update your profile information</p>
        </div>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
          <Section title="Personal Information">
            <FormField control={form.control} name="fullName" render={({ field }) => (
              <FormItem><FL>Full Name</FL><FormControl><Input {...field} disabled={isPending} className="rounded-xl border-slate-200" /></FormControl><FormMessage /></FormItem>
            )} />
            <FormField control={form.control} name="dob" render={({ field }) => (
              <FormItem><FL>Date of Birth</FL><FormControl><Input {...field} type="date" disabled={isPending} className="rounded-xl border-slate-200" /></FormControl><FormMessage /></FormItem>
            )} />
            <FormField control={form.control} name="gender" render={({ field }) => (
              <FormItem>
                <FL>Gender</FL>
                <FormControl>
                  <select {...field} disabled={isPending} className="w-full h-10 px-3 rounded-xl border border-slate-200 bg-white text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-sky-500">
                    <option value="">Select gender…</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )} />
            <FormField control={form.control} name="phone" render={({ field }) => (
              <FormItem><FL>Phone</FL><FormControl><Input {...field} disabled={isPending} className="rounded-xl border-slate-200" /></FormControl><FormMessage /></FormItem>
            )} />
            <div className="sm:col-span-2">
              <FormField control={form.control} name="address" render={({ field }) => (
                <FormItem><FL>Address</FL><FormControl><Textarea {...field} disabled={isPending} rows={2} className="rounded-xl border-slate-200 resize-none" /></FormControl><FormMessage /></FormItem>
              )} />
            </div>
          </Section>

          {role === UserRole.DOCTOR && (
            <Section title="Professional Details">
              <FormField control={form.control} name="medicalLicenseNumber" render={({ field }) => (
                <FormItem><FL>Medical License No.</FL><FormControl><Input {...field} disabled={isPending} className="rounded-xl border-slate-200" /></FormControl><FormMessage /></FormItem>
              )} />
              <FormField control={form.control} name="specialization" render={({ field }) => (
                <FormItem><FL>Specialization</FL><FormControl><Input {...field} disabled={isPending} className="rounded-xl border-slate-200" /></FormControl><FormMessage /></FormItem>
              )} />
              <FormField control={form.control} name="yearsOfExperience" render={({ field }) => (
                <FormItem><FL>Years of Experience</FL><FormControl><Input {...field} type="number" disabled={isPending} className="rounded-xl border-slate-200" /></FormControl><FormMessage /></FormItem>
              )} />
            </Section>
          )}

          {role === UserRole.NURSE && (
            <Section title="Professional Details">
              <FormField control={form.control} name="nursingLicenseNumber" render={({ field }) => (
                <FormItem><FL>Nursing License No.</FL><FormControl><Input {...field} disabled={isPending} className="rounded-xl border-slate-200" /></FormControl><FormMessage /></FormItem>
              )} />
              <FormField control={form.control} name="department" render={({ field }) => (
                <FormItem><FL>Department</FL><FormControl><Input {...field} disabled={isPending} className="rounded-xl border-slate-200" /></FormControl><FormMessage /></FormItem>
              )} />
              <FormField control={form.control} name="yearsOfExperience" render={({ field }) => (
                <FormItem><FL>Years of Experience</FL><FormControl><Input {...field} type="number" disabled={isPending} className="rounded-xl border-slate-200" /></FormControl><FormMessage /></FormItem>
              )} />
            </Section>
          )}

          {role === UserRole.STAFF && (
            <Section title="Professional Details">
              <FormField control={form.control} name="position" render={({ field }) => (
                <FormItem><FL>Position</FL><FormControl><Input {...field} disabled={isPending} className="rounded-xl border-slate-200" /></FormControl><FormMessage /></FormItem>
              )} />
              <FormField control={form.control} name="department" render={({ field }) => (
                <FormItem><FL>Department</FL><FormControl><Input {...field} disabled={isPending} className="rounded-xl border-slate-200" /></FormControl><FormMessage /></FormItem>
              )} />
            </Section>
          )}

          {role === UserRole.PATIENT && (
            <Section title="Emergency Contact">
              <FormField control={form.control} name="nextofkin" render={({ field }) => (
                <FormItem><FL>Next of Kin</FL><FormControl><Input {...field} disabled={isPending} className="rounded-xl border-slate-200" /></FormControl><FormMessage /></FormItem>
              )} />
              <FormField control={form.control} name="nextofphone" render={({ field }) => (
                <FormItem><FL>Next of Kin Phone</FL><FormControl><Input {...field} disabled={isPending} className="rounded-xl border-slate-200" /></FormControl><FormMessage /></FormItem>
              )} />
            </Section>
          )}

          {success && (
            <div className="flex items-center gap-2.5 p-4 bg-emerald-50 border border-emerald-100 rounded-xl text-emerald-700 text-sm">
              <CheckCircle2 className="w-4 h-4 shrink-0" />{success}
            </div>
          )}
          {error && (
            <div className="flex items-center gap-2.5 p-4 bg-red-50 border border-red-100 rounded-xl text-red-600 text-sm">
              <AlertCircle className="w-4 h-4 shrink-0" />{error}
            </div>
          )}

          <Button type="submit" disabled={isPending} className="bg-sky-500 hover:bg-sky-600 text-white font-semibold rounded-xl px-8">
            {isPending ? "Saving…" : "Save Changes"}
          </Button>
        </form>
      </Form>
    </div>
  );
}
