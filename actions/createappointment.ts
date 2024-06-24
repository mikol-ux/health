"use server";
//import bcrypt from "bcryptjs";
import { db } from "../lib/db";
import * as z from "zod";
//import { sendVerificationEmail } from "../lib/mail";
import { TimeSchema } from "../schemas";
import { auth } from "@/auth";
import { getPatientId, getUserAppointment } from "@/data/user";
export const Create_appointment = async (
  values: z.infer<typeof TimeSchema>
) => {
  const user = await auth();
  const combinedDate = values.date
    .toISOString()
    .split("T")[0]
    .replace(/-/g, ""); // Format date (YYYYMMDD)
  const formattedTime = values.time.replace(/:/g, ""); // Format time (HHMM)
  const newCombinedId = combinedDate + formattedTime;
  if (values.date === new Date()) {
    return { error: "it is already today" };
  }
  // rebuild so that it cant book today
  const patientId = await getPatientId(user?.user.id);
  if (!patientId) return { error: "you dont have a profile" };
  const userID = await getUserAppointment(patientId?.id);
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
      patientId: patientId?.id as string,
    },
  });
  return { success: "apointment has been booked successfully" };
};
