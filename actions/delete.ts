"use server";

import { db } from "@/lib/db";
import { requireRole } from "@/lib/auth-guard";
import { UserRole } from "@prisma/client";

export const Delete = async (id: string) => {
  const guard = await requireRole(
    UserRole.DOCTOR,
    UserRole.NURSE,
    UserRole.STAFF
  );
  if (!guard.authorized) return { error: guard.error };

  await db.appointment.delete({
    where: { id },
  });

  return { success: "Appointment deleted" };
};
