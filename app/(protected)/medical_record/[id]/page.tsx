"use client";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTransition, useState } from "react";

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
  InjectionSchema,
  DoctorsreportSchema,
} from "@/schemas";
import { UserRole } from "@prisma/client";
import { FormSucces } from "@/components/form-succes";
import { FormError } from "@/components/form-error";
import { medicalReport } from "@/actions/medicalForms";
type props = {
  id: string;
};
const Medical_Reportsubmit = ({ params }: { params: { id: string } }) => {
  const { data: session, update } = useSession();
  const [error, setError] = useState<string | undefined>();
  const [success, setSuccess] = useState<string | undefined>();
  const [isPending, startTransition] = useTransition();
  const form = useForm<z.infer<typeof DoctorsreportSchema>>({
    resolver: zodResolver(DoctorsreportSchema),
    defaultValues: {
      date: new Date(),
      symptoms: "",
      diagnosis: "",
      labtest: "",
      labtestresult: "",
      prescription: "",
      patientId: params.id as string,
      docId: session?.user.profile.id as string,
    },
  });
  const onSubmit = (values: z.infer<typeof DoctorsreportSchema>) => {
    startTransition(() => {
      setSuccess("");
      medicalReport(values)
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
  return (
    <Card className="w-[600px]">
      <CardHeader>
        <p className="text-2xl font-semibold text-center">
          injection given today
        </p>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
            <div className="space-y-4">
              <FormField
                control={form.control}
                name="symptoms"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Symptoms</FormLabel>
                    <FormControl>
                      <Textarea
                        {...field}
                        placeholder="john doe"
                        disabled={isPending}
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
                    <FormLabel>Diagnosis</FormLabel>
                    <FormControl>
                      <Textarea
                        {...field}
                        placeholder="john doe"
                        disabled={isPending}
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
                    <FormLabel>Lab Test</FormLabel>
                    <FormControl>
                      <Textarea
                        {...field}
                        placeholder="john doe"
                        disabled={isPending}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="labtestresult"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Lab result</FormLabel>
                    <FormControl>
                      <Textarea
                        {...field}
                        placeholder="john doe"
                        disabled={isPending}
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
                    <FormLabel>Prescriptions</FormLabel>
                    <FormControl>
                      <Textarea
                        {...field}
                        placeholder="prescription"
                        disabled={isPending}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormSucces message={success} />
            <FormError message={error} />
            <Button type="submit">Save</Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default Medical_Reportsubmit;
