"use server";
import { db } from "@/lib/db";
import { auth } from "@/auth";
export const testing = async (id: string) => {
  console.log(id);

  const profile = await db.patient.findUnique({
    where: { id },
  });
  const doctorsreport = await db.doctorsreport.findMany({
    where: { patientId: id },
  });
  const medication = await db.medications.findMany({
    where: { patientId: id },
  });
  const injection = await db.injection.findMany({
    where: { patientId: id },
  });

  return { profile, doctorsreport, medication, injection };
};
