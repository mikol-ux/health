"use client";

import * as z from "zod";
import React, { useState, useTransition } from "react";
import { RegistrationForm } from "../_component/files/createprofile";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { UserRole } from "@prisma/client";
import { Doctor_Profile } from "../_component/files/docprofile";
import { Nurse_Profile } from "../_component/files/nurseprofile";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { RoleSelect } from "@/schemas";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { updateRole } from "@/data/update";
import { Button } from "@/components/ui/button";

const Create = () => {
  const router = useRouter();
  const { data: session, status, update } = useSession();
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isPending, startTransition] = useTransition();
  const form = useForm<z.infer<typeof RoleSelect>>({
    resolver: zodResolver(RoleSelect),
    defaultValues: {
      role: UserRole.PATIENT,
    },
  });

  const role = session?.user.role;
  const profile = session?.user.profile;
  const onSubmit = (values: z.infer<typeof RoleSelect>) => {
    startTransition(() => {
      updateRole(values)
        .then((data) => {
          if (data.error) {
            setError(data.error);
          }
          if (data.success) {
            update();
            setSuccess(data.success);
          }
        })
        .catch(() => setError("Something went wrong"));
    });
  };
  console.log({ role: role });

  if (!role) {
    return (
      <div>
        <Form {...form}>
          <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="role"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Role</FormLabel>
                  <Select
                    disabled={isPending}
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="select a role" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value={UserRole.DOCTOR}>Doctor</SelectItem>
                      <SelectItem value={UserRole.NURSE}>NURSE</SelectItem>
                      <SelectItem value={UserRole.STAFF}>STAFF</SelectItem>
                      <SelectItem value={UserRole.PATIENT}>PATIENT</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">Save</Button>
          </form>
        </Form>
      </div>
    );
  }
  if (profile) {
    return router.push("/profile");
  }
  return (
    <div>
      <RegistrationForm />
    </div>
  );
};
export default Create;
