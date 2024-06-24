"use client";
import React, { useState, useTransition } from "react";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { CardWrapper } from "@/components/auth/card-wrapper";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import {
  PatientRegistrationSchema,
  DoctorRegistrationSchema,
  NurseRegistrationSchema,
  StaffRegistrationSchema,
} from "@/schemas";
import { UserRole } from "@prisma/client";
import { Create_Profile } from "@/actions/createprofile";
type RegistrationFormValues = {
  fullName: string;
  dob: string;
  gender: string;
  phone: string;
  address: string;
  terms: boolean;
  medicalLicenseNumber?: string;
  specialization?: string;
  yearsOfExperience?: string;
  nursingLicenseNumber?: string;
  department?: string;
  position?: string;
  nextofkin?: string;
  nextofphone?: string;
};

export function RegistrationForm() {
  const router = useRouter();
  const { data: session, update } = useSession();
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();

  const form = useForm<RegistrationFormValues>({
    resolver: zodResolver(
      session?.user.role === UserRole.DOCTOR
        ? DoctorRegistrationSchema
        : session?.user.role === UserRole.NURSE
        ? NurseRegistrationSchema
        : session?.user.role === UserRole.STAFF
        ? StaffRegistrationSchema
        : PatientRegistrationSchema
    ),
    defaultValues: {
      fullName: "",
      dob: "",
      gender: "",
      phone: "",
      address: "",
      terms: false,
      ...(session?.user.role === UserRole.DOCTOR && {
        medicalLicenseNumber: "",
        specialization: "",
        yearsOfExperience: "",
      }),
      ...(session?.user.role === UserRole.NURSE && {
        nursingLicenseNumber: "",
        department: "",
        yearsOfExperience: "",
      }),
      ...(session?.user.role === UserRole.STAFF && {
        position: "",
        department: "",
      }),
      ...(session?.user.role === UserRole.PATIENT && {
        nextofkin: "",
        nextofphone: "",
      }),
    },
  });

  const onSubmit = (values: RegistrationFormValues) => {
    const filteredValues = Object.fromEntries(
      Object.entries(values).filter(([_, v]) => v !== undefined)
    );

    startTransition(() => {
      Create_Profile(filteredValues as Required<RegistrationFormValues>)
        .then((data) => {
          if (data?.error) {
            setError(data?.error);
          }
          if (data?.success) {
            update();
            setSuccess(data?.success);
          }
        })
        .catch(() => setError("Something went wrong"));
    });
  };
  /* if (session?.user.profile) {
    return router.push("/profile");
  } */
  return (
    <CardWrapper headerLabel="Hospital" Label="Registration">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="fullName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full Name</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isPending}
                      {...field}
                      placeholder="Full Name"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="dob"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Date of Birth</FormLabel>
                  <FormControl>
                    <Input disabled={isPending} type="date" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="gender"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Gender</FormLabel>
                  <FormControl>
                    <select disabled={isPending} {...field}>
                      <option value="">Select...</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="other">Other</option>
                    </select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone Number</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isPending}
                      {...field}
                      placeholder="Phone Number"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Address</FormLabel>
                  <FormControl>
                    <Textarea
                      disabled={isPending}
                      {...field}
                      placeholder="Address"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {session?.user.role === UserRole.DOCTOR && (
              <>
                <FormField
                  control={form.control}
                  name="medicalLicenseNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Medical License Number</FormLabel>
                      <FormControl>
                        <Input
                          disabled={isPending}
                          {...field}
                          placeholder="Medical License Number"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="specialization"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Specialization</FormLabel>
                      <FormControl>
                        <Input
                          disabled={isPending}
                          {...field}
                          placeholder="Specialization"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="yearsOfExperience"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Years of Experience</FormLabel>
                      <FormControl>
                        <Input
                          disabled={isPending}
                          type="number"
                          {...field}
                          placeholder="Years of Experience"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </>
            )}
            {session?.user.role === UserRole.NURSE && (
              <>
                <FormField
                  control={form.control}
                  name="nursingLicenseNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nursing License Number</FormLabel>
                      <FormControl>
                        <Input
                          disabled={isPending}
                          {...field}
                          placeholder="Nursing License Number"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="department"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Department</FormLabel>
                      <FormControl>
                        <Input
                          disabled={isPending}
                          {...field}
                          placeholder="Department"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="yearsOfExperience"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Years of Experience</FormLabel>
                      <FormControl>
                        <Input
                          disabled={isPending}
                          type="number"
                          {...field}
                          placeholder="Years of Experience"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </>
            )}
            {session?.user.role === UserRole.STAFF && (
              <>
                <FormField
                  control={form.control}
                  name="position"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Position</FormLabel>
                      <FormControl>
                        <Input
                          disabled={isPending}
                          {...field}
                          placeholder="Position"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="department"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Department</FormLabel>
                      <FormControl>
                        <Input
                          disabled={isPending}
                          {...field}
                          placeholder="Department"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </>
            )}
            {session?.user.role === UserRole.PATIENT && (
              <>
                <FormField
                  control={form.control}
                  name="nextofkin"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>next of kin</FormLabel>
                      <FormControl>
                        <Input
                          disabled={isPending}
                          {...field}
                          placeholder="nextofkin"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="nextofphone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>next of kin number</FormLabel>
                      <FormControl>
                        <Input
                          disabled={isPending}
                          {...field}
                          placeholder="nextofphone"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </>
            )}

            <FormField
              control={form.control}
              name="terms"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    <Checkbox
                      disabled={isPending}
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                    terms and conditions
                  </FormLabel>
                  <FormMessage />
                </FormItem>
              )}
            />
            {success && <div className="text-green-600">{success}</div>}
            {error && <div className="text-red-600">{error}</div>}
          </div>
          <Button type="submit" disabled={isPending}>
            Create Prfile
          </Button>
        </form>
      </Form>
    </CardWrapper>
  );
}
