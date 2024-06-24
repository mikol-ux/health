"use client";
import * as z from "zod";
import React, { useEffect } from "react";
import { useTransition } from "react";
import { useState } from "react";
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
interface time {
  time: string;
}
export default function Appointment() {
  const [timeSlot, setTimeSlot] = useState<time[]>([]);
  const [conbined, setCombined] = useState<string>();
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const router = useRouter();

  const [isPending, startTransition] = useTransition();
  const form = useForm<z.infer<typeof TimeSchema>>({
    resolver: zodResolver(TimeSchema),
    defaultValues: {
      time: "",
      date: new Date(),
      note: "",
    },
  });
  useEffect(() => {
    getTime();
  }, []);
  const getTime = () => {
    const timeList = [];
    for (let i = 10; i <= 12; i++) {
      timeList.push({ time: i + ": 00 AM" });
      timeList.push({ time: i + ": 30 AM" });
    }
    for (let i = 1; i <= 6; i++) {
      timeList.push({ time: i + ": 00 PM" });
      timeList.push({ time: i + ": 30 PM" });
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
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="space-y-4">
          <FormField
            control={form.control}
            name="date"
            render={({ field }) => (
              <FormItem>
                <FormLabel>pick date</FormLabel>
                <FormControl>
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                    className="rounded-md border"
                    disabled={(date) =>
                      date <= new Date() ||
                      date <
                        new Date(
                          new Date().getTime() + 2 * 24 * 60 * 60 * 1000
                        ) ||
                      isPending
                    }
                    // initialFocus
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* <FormField
            control={form.control}
            name="time"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Two Factor Code</FormLabel>
                <FormControl>
                  <select
                    {...form.register("time", { required: true })}
                    disabled={isPending}
                  >
                    {timeSlot.map((option, index) => (
                      <option key={index} value={option.time}>
                        {option.time}
                      </option>
                    ))}
                  </select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          /> */}
          <FormField
            control={form.control}
            name="time"
            render={({ field }) => (
              <FormItem>
                <FormLabel>select time</FormLabel>
                <Select
                  disabled={isPending}
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="select time" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {timeSlot.map((timeLog) => (
                      <SelectItem value={timeLog.time}>
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
                  <Textarea {...field} disabled={isPending} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormError message={error} />
          <FormSucces message={success} />
        </div>

        <Button type="submit" className="w-full">
          appointment
        </Button>
      </form>
    </Form>
  );
}
