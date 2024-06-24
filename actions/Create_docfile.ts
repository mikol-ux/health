"use server";
//import bcrypt from "bcryptjs";
import { db } from "../lib/db";
import * as z from "zod";
//import { sendVerificationEmail } from "../lib/mail";
import { DoctorProfile } from "../schemas";
import { auth } from "@/auth";
//import { getUserByEmail } from "../data/user";
//import { generateVerificationToken } from "../lib/tokens";
export const Create_docfile = async (values: z.infer<typeof DoctorProfile>) => {
  const session = await auth();
  const validatedFields = DoctorProfile.safeParse(values);
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
  const existingUser = await db.doctor.findFirst({
    where: { doctorId: session?.user.id as string },
  });
  //console.log(existingUser);
  console.log("doctor " + session?.user.profile);
  if (existingUser) {
    return { error: "Profile Already created" };
  }
  await db.doctor.create({
    data: {
      name: name,
      age: age,
      specialization: specialization,
      doctorId: session?.user.id as string,
    },
  });
  return { success: "Profile Created" };
};
