"use client";

import * as z from "zod";
import React, { useState, useTransition } from "react";
import { RegistrationForm } from "../_component/files/createprofile";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { UserRole } from "@prisma/client";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { RoleSelect } from "@/schemas";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { updateRole } from "@/data/update";
import { Button } from "@/components/ui/button";
import { Stethoscope, User, Users, Syringe, ChevronRight } from "lucide-react";

const roles = [
  { value: UserRole.PATIENT, label: "Patient", description: "Book appointments & manage your health records", icon: User, color: "bg-sky-50 border-sky-200 text-sky-700" },
  { value: UserRole.DOCTOR, label: "Doctor", description: "Manage patients, write reports & prescriptions", icon: Stethoscope, color: "bg-emerald-50 border-emerald-200 text-emerald-700" },
  { value: UserRole.NURSE, label: "Nurse", description: "Record injections & monitor patient care", icon: Syringe, color: "bg-violet-50 border-violet-200 text-violet-700" },
  { value: UserRole.STAFF, label: "Staff", description: "Manage appointments & administrative tasks", icon: Users, color: "bg-amber-50 border-amber-200 text-amber-700" },
];

const Create = () => {
  const router = useRouter();
  const { data: session, update } = useSession();
  const [error, setError] = useState("");
  const [isPending, startTransition] = useTransition();
  const form = useForm<z.infer<typeof RoleSelect>>({
    resolver: zodResolver(RoleSelect),
    defaultValues: { role: UserRole.PATIENT },
  });

  const role = session?.user.role;
  const profile = session?.user.profile;

  const onSubmit = (values: z.infer<typeof RoleSelect>) => {
    startTransition(() => {
      updateRole(values)
        .then((data) => {
          if (data.error) setError(data.error);
          if (data.success) update();
        })
        .catch(() => setError("Something went wrong"));
    });
  };

  if (profile) {
    router.push("/profile");
    return null;
  }

  if (!role) {
    const selectedRole = form.watch("role");
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
        <div className="w-full max-w-2xl">
          <div className="text-center mb-8">
            <div className="w-14 h-14 bg-sky-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <span className="text-white font-bold text-2xl">M</span>
            </div>
            <h1 className="text-2xl font-bold text-slate-900">Welcome to MedCare</h1>
            <p className="text-slate-500 mt-2 text-sm">Select your role to get started</p>
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="role"
                render={({ field }) => (
                  <FormItem>
                    <FormMessage />
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {roles.map((r) => {
                        const Icon = r.icon;
                        const isSelected = field.value === r.value;
                        return (
                          <button
                            key={r.value}
                            type="button"
                            onClick={() => field.onChange(r.value)}
                            className={`text-left p-5 rounded-2xl border-2 transition-all ${
                              isSelected
                                ? "border-sky-500 bg-sky-50 shadow-md shadow-sky-100"
                                : "border-slate-200 bg-white hover:border-slate-300"
                            }`}
                          >
                            <div className="flex items-start gap-3">
                              <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                                isSelected ? "bg-sky-500" : "bg-slate-100"
                              }`}>
                                <Icon className={`w-5 h-5 ${isSelected ? "text-white" : "text-slate-500"}`} />
                              </div>
                              <div>
                                <p className={`font-semibold text-sm ${isSelected ? "text-sky-700" : "text-slate-800"}`}>
                                  {r.label}
                                </p>
                                <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">{r.description}</p>
                              </div>
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </FormItem>
                )}
              />

              {error && <p className="text-sm text-red-500 text-center">{error}</p>}

              <Button
                type="submit"
                disabled={isPending}
                className="w-full bg-sky-500 hover:bg-sky-600 text-white font-semibold rounded-xl py-3 flex items-center justify-center gap-2"
              >
                Continue as {roles.find(r => r.value === selectedRole)?.label}
                <ChevronRight className="w-4 h-4" />
              </Button>
            </form>
          </Form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
      <div className="w-full max-w-2xl">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-slate-900">Complete Your Profile</h1>
          <p className="text-slate-500 mt-2 text-sm">Fill in your details to get started</p>
        </div>
        <div className="bg-white rounded-2xl border border-slate-100 p-6">
          <RegistrationForm />
        </div>
      </div>
    </div>
  );
};

export default Create;
