"use server";
//import bcrypt from "bcryptjs";
import { db } from "../lib/db";
import * as z from "zod";
//import { sendVerificationEmail } from "../lib/mail";
import { ProfileForm, reportSchema } from "../schemas";
import { auth } from "@/auth";
//import { getUserByEmail } from "../data/user";
//import { generateVerificationToken } from "../lib/tokens";
export const Create_Report = async (values: z.infer<typeof reportSchema>) => {
  const session = await auth();
  const validatedFields = reportSchema.safeParse(values);
  if (!validatedFields.success) {
    return { error: "invalid fields" };
  }
  const {
    date,
    symptoms,
    diagnosis,
    labtest,
    labresult,
    prescription,
    patientId,
    docId,
  } = validatedFields.data;
  await db.doctorsreport.create({
    data: {
      date: date,
      symptoms: symptoms,
      diagnosis: diagnosis,
      labtest: labtest,
      labtestresult: labresult as string,
      prescription: prescription as string,
      patientId: patientId as string,
      docId: docId as string,
    },
  });
  return { success: "Profile Created" };
};
