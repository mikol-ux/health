"use client";
import * as z from "zod";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTransition, useState } from "react";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { DoctorsreportSchema } from "@/schemas";
import { FormError } from "@/components/form-error";
import { medicalReport } from "@/actions/medicalForms";
import { useSession } from "next-auth/react";
import { FileText, CheckCircle2 } from "lucide-react";

const FL = ({ children }: { children: React.ReactNode }) => (
  <FormLabel className="text-xs font-medium text-slate-500 uppercase tracking-wider">{children}</FormLabel>
);

const Medical_Reportsubmit = ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = React.use(params);
  const { data: session, update } = useSession();
  const [error, setError] = useState<string | undefined>();
  const [success, setSuccess] = useState<string | undefined>();
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof DoctorsreportSchema>>({
    resolver: zodResolver(DoctorsreportSchema),
    defaultValues: { date: new Date(), symptoms: "", diagnosis: "", labtest: "", labtestresult: "", prescription: "", patientId: id, docId: "" },
  });

  useEffect(() => {
    const docId = session?.user?.profile?.id;
    if (docId) form.setValue("docId", docId);
  }, [session, form]);

  const onSubmit = (values: z.infer<typeof DoctorsreportSchema>) => {
    startTransition(() => {
      medicalReport(values)
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
        <h2 className="text-xl font-bold text-slate-800">Report Created</h2>
        <p className="text-slate-500 text-sm">{success}</p>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto space-y-5">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-sky-100 rounded-xl flex items-center justify-center">
          <FileText className="w-5 h-5 text-sky-500" />
        </div>
        <div>
          <h1 className="text-lg font-bold text-slate-800">Medical Report</h1>
          <p className="text-sm text-slate-400">Create a new medical record for this patient</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-100 p-6">
        <Form {...form}>
          <form className="space-y-5" onSubmit={form.handleSubmit(onSubmit)}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="sm:col-span-2">
                <FormField control={form.control} name="symptoms" render={({ field }) => (
                  <FormItem><FL>Symptoms</FL><FormControl><Textarea {...field} disabled={isPending} rows={3} placeholder="Describe presenting symptoms…" className="rounded-xl border-slate-200 resize-none" /></FormControl><FormMessage /></FormItem>
                )} />
              </div>
              <div className="sm:col-span-2">
                <FormField control={form.control} name="diagnosis" render={({ field }) => (
                  <FormItem><FL>Diagnosis</FL><FormControl><Textarea {...field} disabled={isPending} rows={3} placeholder="Clinical diagnosis…" className="rounded-xl border-slate-200 resize-none" /></FormControl><FormMessage /></FormItem>
                )} />
              </div>
              <FormField control={form.control} name="labtest" render={({ field }) => (
                <FormItem><FL>Lab Test</FL><FormControl><Textarea {...field} disabled={isPending} rows={2} placeholder="Tests ordered…" className="rounded-xl border-slate-200 resize-none" /></FormControl><FormMessage /></FormItem>
              )} />
              <FormField control={form.control} name="labtestresult" render={({ field }) => (
                <FormItem><FL>Lab Result</FL><FormControl><Textarea {...field} disabled={isPending} rows={2} placeholder="Test results…" className="rounded-xl border-slate-200 resize-none" /></FormControl><FormMessage /></FormItem>
              )} />
              <div className="sm:col-span-2">
                <FormField control={form.control} name="prescription" render={({ field }) => (
                  <FormItem><FL>Prescription</FL><FormControl><Textarea {...field} disabled={isPending} rows={2} placeholder="Medications & dosages prescribed…" className="rounded-xl border-slate-200 resize-none" /></FormControl><FormMessage /></FormItem>
                )} />
              </div>
            </div>
            <FormError message={error} />
            <Button type="submit" disabled={isPending} className="w-full bg-sky-500 hover:bg-sky-600 text-white font-semibold rounded-xl">
              {isPending ? "Saving…" : "Save Report"}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default Medical_Reportsubmit;
