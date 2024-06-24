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
  MedicationsSchema,
} from "@/schemas";
import { UserRole } from "@prisma/client";
import { FormSucces } from "@/components/form-succes";
import { FormError } from "@/components/form-error";
import { Medication } from "@/actions/medicalForms";

const MedicationForm = ({ params }: { params: { id: string } }) => {
  const { data: session, update } = useSession();
  const [error, setError] = useState<string | undefined>();
  const [success, setSuccess] = useState<string | undefined>();
  const [isPending, startTransition] = useTransition();
  const form = useForm<z.infer<typeof MedicationsSchema>>({
    resolver: zodResolver(MedicationsSchema),
    defaultValues: {
      date: new Date(),
      medication: "",
      patientId: params.id,
      docId: session?.user.profile.id,
    },
  });
  const onSubmit = (values: z.infer<typeof MedicationsSchema>) => {
    startTransition(() => {
      Medication(values)
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
                name="medication"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Medication</FormLabel>
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

export default MedicationForm;
