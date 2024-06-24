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
import { reportSchema } from "@/schemas";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useTransition } from "react";
import { CardWrapper } from "@/components/auth/card-wrapper";
import { useSession } from "next-auth/react";
import { Create_Profile } from "@/actions/createprofile";
import { FormSucces } from "@/components/form-succes";
import { FormError } from "@/components/form-error";
import { useRouter } from "next/navigation";
import { Create_Report } from "@/actions/createReport";

export function CreateProfile({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const session = useSession();

  const form = useForm<z.infer<typeof reportSchema>>({
    resolver: zodResolver(reportSchema),
    defaultValues: {
      date: new Date(),
      symptoms: "",
      diagnosis: "",
      labtest: "",
      labresult: "",
      prescription: "",
      patientId: params.id,
      docId: session.data?.user.docId,
    },
  });
  const onSubmit = (values: z.infer<typeof reportSchema>) => {
    setError("");
    setSuccess("");
    startTransition(() => {
      Create_Report(values)
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
            //  router.push("/user");
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
              name="symptoms"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>SYMTOMS</FormLabel>
                  <FormControl>
                    <Textarea
                      disabled={isPending}
                      {...field}
                      placeholder="okoye ikechukwu micheal"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="diagnosis"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>DIAGNOSIS</FormLabel>
                  <FormControl>
                    <Textarea
                      disabled={isPending}
                      {...field}
                      //placeholder="janedoe@example.com"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="labtest"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>LAB TEST</FormLabel>
                  <FormControl>
                    <Textarea
                      disabled={isPending}
                      {...field}
                      placeholder="******"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="labresult"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>allergies</FormLabel>
                  <FormControl>
                    <Textarea
                      disabled={isPending}
                      {...field}
                      placeholder="******"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="prescription"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>helleditary sickness</FormLabel>
                  <FormControl>
                    <Textarea
                      disabled={isPending}
                      {...field}
                      placeholder="******"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormSucces message={success} />
            <FormError message={error} />
          </div>

          <Button type="submit" className="" disabled={isPending}>
            Creat Profile
          </Button>
        </form>
      </Form>
    </CardWrapper>
  );
}
