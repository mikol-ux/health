"use server";
import { db } from "../lib/db";
import * as z from "zod";
import { TimeSchema } from "../schemas";
import { requireRole } from "@/lib/auth-guard";
import { UserRole } from "@prisma/client";
import { getUserAppointment } from "@/data/user";

export const Create_appointment = async (
  values: z.infer<typeof TimeSchema>
) => {
  const guard = await requireRole(UserRole.PATIENT);
  if (!guard.authorized) return { error: guard.error };

  const combinedDate = values.date
    .toISOString()
    .split("T")[0]
    .replace(/-/g, ""); // Format date (YYYYMMDD)
  const formattedTime = values.time.replace(/:/g, ""); // Format time (HHMM)
  const newCombinedId = combinedDate + formattedTime;
  if (values.date === new Date()) {
    return { error: "it is already today" };
  }
  const userID = await getUserAppointment(values.patientId as string);
  if (userID) {
    return { error: "you already have an appointment booked" };
  }
  const uniquetime = await db.appointment.findFirst({
    where: { daytime: newCombinedId },
  });
  if (uniquetime) {
    return { error: "time already booked" };
  }
  await db.appointment.create({
    data: {
      day: values.date,
      time: values.time,
      note: values.note,
      daytime: newCombinedId,
      patientId: values.patientId as string,
    },
  });
  return { success: "apointment has been booked successfully" };
};
