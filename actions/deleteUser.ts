"use server";

import { db } from "@/lib/db";

export const Delete = async (id: string) => {
  await db.patient.delete({
    where: { id },
  });
};

export const dashboardData = async () => {
  const admittedPatients = await db.patient.count({
    where: { admitted: true },
  });
  const totalrecordedpatients = await db.patient.count();
  const appointments = await db.appointment.count();

  return { admittedPatients, totalrecordedpatients, appointments };
};
