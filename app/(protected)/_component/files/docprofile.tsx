"use client";
import React, { useState } from "react";
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
import { DoctorProfile } from "@/schemas";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useTransition } from "react";
import { CardWrapper } from "@/components/auth/card-wrapper";
import { useSession } from "next-auth/react";
import { Create_Profile } from "@/actions/createprofile";
import { FormSucces } from "@/components/form-succes";
import { FormError } from "@/components/form-error";
import { useRouter } from "next/navigation";
import { Create_docfile } from "@/actions/Create_docfile";

export function Doctor_Profile() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const session = useSession();
  const form = useForm<z.infer<typeof DoctorProfile>>({
    resolver: zodResolver(DoctorProfile),
    defaultValues: {
      name: "",
      age: "",
      specialization: "",
    },
  });
  const onSubmit = (values: z.infer<typeof DoctorProfile>) => {
    console.log("clicked");
    setError("");
    setSuccess("");
    startTransition(() => {
      Create_docfile(values)
        .then((data) => {
          if (data?.error) {
            form.reset();
            setError(data?.error);
            setSuccess(data?.success);
          }
          if (data?.success) {
            form.reset();
            setError(data?.error);
            setSuccess(data?.success);
            router.push("/user");
          }
        })
        .catch(() => setError("Something went wrong"));
    });
  };

  return (
    <CardWrapper headerLabel="Hospital" Label="create hospital profile">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isPending}
                      {...field}
                      placeholder="okoye ikechukwu micheal"
                      type="name"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="age"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>AGE</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isPending}
                      {...field}
                      //placeholder="janedoe@example.com"
                      type="text"
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
                  <FormLabel>specialization</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isPending}
                      {...field}
                      placeholder="******"
                      type=""
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormSucces message={success} />
            <FormError message={error} />
          </div>

          <Button type="submit" disabled={isPending}>
            Creat Profile
          </Button>
        </form>
      </Form>
    </CardWrapper>
  );
}
