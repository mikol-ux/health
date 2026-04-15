"use server";
import { db } from "../lib/db";
import * as z from "zod";
import { reportSchema } from "../schemas";
import { requireRole } from "@/lib/auth-guard";
import { UserRole } from "@prisma/client";

export const Create_Report = async (values: z.infer<typeof reportSchema>) => {
  const guard = await requireRole(UserRole.DOCTOR);
  if (!guard.authorized) return { error: guard.error };

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
