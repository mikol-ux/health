"use client";
import * as z from "zod";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTransition, useState } from "react";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { InjectionSchema } from "@/schemas";
import { FormSucces } from "@/components/form-succes";
import { FormError } from "@/components/form-error";
import { Injection } from "@/actions/medicalForms";
import { useSession } from "next-auth/react";
import { Syringe, CheckCircle2 } from "lucide-react";

const Injections = ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = React.use(params);
  const { data: session, update } = useSession();
  const [error, setError] = useState<string | undefined>();
  const [success, setSuccess] = useState<string | undefined>();
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof InjectionSchema>>({
    resolver: zodResolver(InjectionSchema),
    defaultValues: { date: new Date(), injection: "", patientId: id, nurseId: "" },
  });

  useEffect(() => {
    const nurseId = session?.user?.profile?.id;
    if (nurseId) form.setValue("nurseId", nurseId);
  }, [session, form]);

  const onSubmit = (values: z.infer<typeof InjectionSchema>) => {
    startTransition(() => {
      Injection(values)
        .then((data) => {
          if (data.error) setError(data.error);
          if (data.success) { update(); setSuccess(data.success); }
        })
        .catch(() => setError("Something went wrong"));
    });
  };

  if (success) {
    return (
      <div className="max-w-xl mx-auto flex flex-col items-center justify-center py-20 text-center gap-4">
        <div className="w-16 h-16 bg-emerald-100 rounded-2xl flex items-center justify-center">
          <CheckCircle2 className="w-8 h-8 text-emerald-500" />
        </div>
        <h2 className="text-xl font-bold text-slate-800">Injection Recorded</h2>
        <p className="text-slate-500 text-sm">{success}</p>
      </div>
    );
  }

  return (
    <div className="max-w-xl mx-auto space-y-5">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-violet-100 rounded-xl flex items-center justify-center">
          <Syringe className="w-5 h-5 text-violet-500" />
        </div>
        <div>
          <h1 className="text-lg font-bold text-slate-800">Record Injection</h1>
          <p className="text-sm text-slate-400">Document injection administered today</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-100 p-6">
        <Form {...form}>
          <form className="space-y-5" onSubmit={form.handleSubmit(onSubmit)}>
            <FormField control={form.control} name="injection" render={({ field }) => (
              <FormItem>
                <FormLabel className="text-xs font-medium text-slate-500 uppercase tracking-wider">Injection Details</FormLabel>
                <FormControl>
                  <Textarea
                    {...field}
                    disabled={isPending}
                    rows={4}
                    placeholder="Describe the injection, dosage, and any relevant notes…"
                    className="rounded-xl border-slate-200 resize-none"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )} />
            <FormError message={error} />
            <Button type="submit" disabled={isPending} className="w-full bg-violet-500 hover:bg-violet-600 text-white font-semibold rounded-xl">
              {isPending ? "Saving…" : "Record Injection"}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default Injections;
