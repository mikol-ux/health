"use client";
import * as z from "zod";
import React, { useEffect } from "react";
import { useTransition, useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { TimeSchema } from "@/schemas";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { zodResolver } from "@hookform/resolvers/zod";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Create_appointment } from "@/actions/createappointment";
import { FormError } from "@/components/form-error";
import { FormSucces } from "@/components/form-succes";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

interface time {
  time: string;
}

export default function Appointment() {
  const [timeSlot, setTimeSlot] = useState<time[]>([]);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const session = useSession();
  const form = useForm<z.infer<typeof TimeSchema>>({
    resolver: zodResolver(TimeSchema),
    defaultValues: {
      time: "",
      date: new Date(),
      note: "",
      patientId: session.data?.user.profile.id as string,
    },
  });

  useEffect(() => {
    getTime();
  }, []);

  const getTime = () => {
    const timeList = [];
    for (let i = 10; i <= 12; i++) {
      timeList.push({ time: `${i}:00 AM` });
      timeList.push({ time: `${i}:30 AM` });
    }
    for (let i = 1; i <= 6; i++) {
      timeList.push({ time: `${i}:00 PM` });
      timeList.push({ time: `${i}:30 PM` });
    }
    setTimeSlot(timeList);
  };

  const onSubmit = (values: z.infer<typeof TimeSchema>) => {
    startTransition(() => {
      Create_appointment(values)
        .then((data) => {
          if (data.error) {
            setError(data.error);
          }
          if (data.success) {
            setSuccess(data.success);
          }
          router.refresh();
        })
        .catch(() => setError("Something went wrong"));
    });
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-center mb-8">
        Book an Appointment
      </h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="date"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Pick Date</FormLabel>
                  <FormControl>
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      className="rounded-md border w-full"
                      disabled={(date) =>
                        date <= new Date() ||
                        date <
                          new Date(
                            new Date().getTime() + 2 * 24 * 60 * 60 * 1000
                          ) ||
                        isPending
                      }
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="time"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Select Time</FormLabel>
                  <Select
                    disabled={isPending}
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select Time" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {timeSlot.map((timeLog, index) => (
                        <SelectItem key={index} value={timeLog.time}>
                          {timeLog.time}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="note"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Note</FormLabel>
                  <FormControl>
                    <Textarea
                      {...field}
                      disabled={isPending}
                      className="w-full"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormError message={error} />
            <FormSucces message={success} />
          </div>
          <Button type="submit" className="w-full" disabled={isPending}>
            Book Appointment
          </Button>
        </form>
      </Form>
    </div>
  );
}
