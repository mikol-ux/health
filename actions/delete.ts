"use server";

import { deleteAppointment } from "@/data/user";
import { db } from "@/lib/db";

export const Delete = async (id: string) => {
  await db.appointment.delete({
    where: { id },
  });
};
