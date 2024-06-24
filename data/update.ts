"use server";
import * as z from "zod";
import { db } from "../lib/db";
import { getUserByEmail, getUserById } from "../data/user";
import { auth } from "@/auth";
import { RoleSelect } from "@/schemas";
export const updateRole = async (values: z.infer<typeof RoleSelect>) => {
  const user = await auth();
  if (!user) {
    return { error: "Unauthorizzzed" };
  }
  const dbUser = await getUserById(user.user.id);
  if (!dbUser) {
    return { error: "Unauthoried" };
  }

  await db.user.update({
    where: { id: dbUser.id },
    data: {
      role: values.role,
    },
  });

  return { success: "Settings updated" };
};
