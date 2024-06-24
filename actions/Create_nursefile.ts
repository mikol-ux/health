"use server";
//import bcrypt from "bcryptjs";
import { db } from "../lib/db";
import * as z from "zod";
//import { sendVerificationEmail } from "../lib/mail";
import { DoctorProfile, NurseProfile } from "../schemas";
import { auth } from "@/auth";
//import { getUserByEmail } from "../data/user";
//import { generateVerificationToken } from "../lib/tokens";
export const Create_nursefile = async (
  values: z.infer<typeof NurseProfile>
) => {
  const session = await auth();
  const validatedFields = NurseProfile.safeParse(values);
  if (!validatedFields.success) {
    return { error: "invalid fields" };
  }
  const { name, age, specialization } = validatedFields.data;
  /*  const ProfileData ={
    Username: Username,
      age: age,
      phoneNumber: phoneNumber,
      allergies: allergies,
      helleditarysickness: helleditarysickness,
      pastMarjorsurgeries: pastMarjorsurgeries,
  } */
  const existingUser = await db.nurse.findFirst({
    where: { nurseId: session?.user.id as string },
  });
  //console.log(existingUser);
  console.log("doctor " + session?.user.profile);
  if (existingUser) {
    return { error: "Profile Already created" };
  }
  await db.nurse.create({
    data: {
      name: name,
      age: age,
      specialization: specialization,
      nurseId: session?.user.id as string,
    },
  });
  return { success: "Profile Created" };
};
