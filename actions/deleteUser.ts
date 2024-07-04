"use server";
import { useRouter } from "next/navigation";
import { deleteAppointment } from "@/data/user";
import { db } from "@/lib/db";

export const Delete = async (id: string) => {
  console.log(id);
  await db.patient.delete({
    where: { id },
  });
};
