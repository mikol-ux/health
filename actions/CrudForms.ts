"use server";
import { deleteAppointment } from "@/data/user";
import { db } from "@/lib/db";

export const Delete = async (id: string, schema: string) => {
  if (schema === "injection") {
    await db.injection.delete({
      where: { id },
    });
  }
  if (schema === "medication") {
    await db.medications.delete({
      where: { id },
    });
  }
  if (schema === "doctorsreport") {
    await db.doctorsreport.delete({
      where: { id },
    });
  }
};
