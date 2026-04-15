"use server";
import { auth } from "@/auth";
import { signOut } from "../auth";
import { db } from "@/lib/db";
export const deleteAccount = async () => {
  const session = await auth();
  await db.user.delete({
    where: { id: session?.user.id },
  });
  await signOut();
};
