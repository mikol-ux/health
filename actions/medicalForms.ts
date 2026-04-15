"use server";
import { db } from "../lib/db";
import * as z from "zod";
import { DoctorsreportSchema, InjectionSchema, MedicationsSchema } from "../schemas";
import { requireRole } from "@/lib/auth-guard";
import { UserRole } from "@prisma/client";

export const Injection = async (values: z.infer<typeof InjectionSchema>) => {
  const guard = await requireRole(UserRole.NURSE);
  if (!guard.authorized) return { error: guard.error };

  const validatedFields = InjectionSchema.safeParse(values);
  if (!validatedFields.success) {
    return { error: "invalid fields" };
  }
  const { injection, date, patientId, nurseId } = validatedFields.data;

  await db.injection.create({
    data: {
      injection: injection,
      date: date,
      patientId: patientId as string,
      nurseId: nurseId as string,
    },
  });
  return { success: "uploaded" };
};

export const Medication = async (values: z.infer<typeof MedicationsSchema>) => {
  const guard = await requireRole(UserRole.DOCTOR);
  if (!guard.authorized) return { error: guard.error };

  const validatedFields = MedicationsSchema.safeParse(values);
  if (!validatedFields.success) {
    return { error: "invalid fields" };
  }
  const { medication, date, patientId, docId } = validatedFields.data;

  await db.medications.create({
    data: {
      medication: medication,
      date: date,
      patientId: patientId as string,
      docId: docId as string,
    },
  });
  return { success: "uploaded" };
};

export const medicalReport = async (
  values: z.infer<typeof DoctorsreportSchema>
) => {
  const guard = await requireRole(UserRole.DOCTOR);
  if (!guard.authorized) return { error: guard.error };

  const validatedFields = DoctorsreportSchema.safeParse(values);
  if (!validatedFields.success) {
    return { error: "invalid fields" };
  }
  const {
    date,
    symptoms,
    diagnosis,
    labtest,
    labtestresult,
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
      labtestresult: labtestresult,
      prescription: prescription,
      patientId: patientId as string,
      docId: docId as string,
    },
  });
  return { success: "uploaded" };
};
