"use server";
import { db } from "../lib/db";
import * as z from "zod";
import {
  DoctorRegistrationSchema,
  NurseRegistrationSchema,
  PatientRegistrationSchema,
  ProfileForm,
  StaffRegistrationSchema,
  DoctorUpdateSchema,
  NurseUpdateSchema,
  PatientUpdateSchema,
  StaffUpdateSchema,
} from "../schemas";
import { auth } from "@/auth";
import { UserRole } from "@prisma/client";

export const Create_Profile = async (
  values:
    | z.infer<typeof PatientRegistrationSchema>
    | z.infer<typeof DoctorRegistrationSchema>
    | z.infer<typeof NurseRegistrationSchema>
    | z.infer<typeof StaffRegistrationSchema>
) => {
  const session = await auth();

  /*  const ProfileData ={
    Username: Username,
      age: age,
      phoneNumber: phoneNumber,
      allergies: allergies,
      helleditarysickness: helleditarysickness,
      pastMarjorsurgeries: pastMarjorsurgeries,
  } */
  if (session?.user.role === UserRole.DOCTOR) {
    const validatedFields = DoctorRegistrationSchema.safeParse(values);
    if (!validatedFields.success) {
      return { error: "invalid fields" };
    }
    const {
      fullName,
      dob,
      gender,
      phone,
      address,
      medicalLicenseNumber,
      specialization,
      yearsOfExperience,
    } = validatedFields.data;
    const existingUser = await db.doctor.findFirst({
      where: { userId: session?.user.id as string },
    });
    //console.log(existingUser);
    console.log("doctor " + session?.user.profile);
    if (existingUser) {
      return { error: "Profile Already created" };
    }
    await db.doctor.create({
      data: {
        fullname: fullName,
        dob: dob,
        gender: gender,
        phone: phone,
        address: address,
        medicalLicenseNumber: medicalLicenseNumber,
        specialization: specialization,
        yearsOfExperience: yearsOfExperience,
        userId: session?.user.id as string,
      },
    });
    return { success: "Medical Profile Created" };
  }
  if (session?.user.role === UserRole.NURSE) {
    const validatedFields = NurseRegistrationSchema.safeParse(values);
    if (!validatedFields.success) {
      return { error: "invalid fields" };
    }
    const {
      fullName,
      dob,
      gender,
      phone,
      address,
      nursingLicenseNumber,
      department,
      yearsOfExperience,
    } = validatedFields.data;
    const existingUser = await db.nurse.findFirst({
      where: { userId: session?.user.id as string },
    });
    //console.log(existingUser);
    console.log("doctor " + session?.user.profile);
    if (existingUser) {
      return { error: "Profile Already created" };
    }
    await db.nurse.create({
      data: {
        fullname: fullName,
        dob: dob,
        gender: gender,
        phone: phone,
        address: address,
        nursingLicenseNumber: nursingLicenseNumber,
        department: department,
        yearsOfExperience: yearsOfExperience,
        userId: session?.user.id as string,
      },
    });
    return { success: "Nursing Profile Created" };
  }
  if (session?.user.role === UserRole.STAFF) {
    const validatedFields = StaffRegistrationSchema.safeParse(values);
    if (!validatedFields.success) {
      return { error: "invalid fields" };
    }
    const { fullName, dob, gender, phone, address, position, department } =
      validatedFields.data;
    const existingUser = await db.staff.findFirst({
      where: { userId: session?.user.id as string },
    });
    //console.log(existingUser);
    console.log("doctor " + session?.user.profile);
    if (existingUser) {
      return { error: "Profile Already created" };
    }
    await db.staff.create({
      data: {
        fullname: fullName,
        dob: dob,
        gender: gender,
        phone: phone,
        address: address,
        position: position,
        department: department,
        userId: session?.user.id as string,
      },
    });
    return { success: "Staff Profile Created" };
  }
  if (session?.user.role === UserRole.PATIENT) {
    const validatedFields = PatientRegistrationSchema.safeParse(values);
    if (!validatedFields.success) {
      return { error: "invalid fields" };
    }
    const { fullName, dob, gender, phone, address, nextofkin, nextofphone } =
      validatedFields.data;
    const existingUser = await db.patient.findFirst({
      where: { userId: session?.user.id as string },
    });
    //console.log(existingUser);
    console.log("doctor " + session?.user.profile);
    if (existingUser) {
      return { error: "Profile Already created" };
    }
    await db.patient.create({
      data: {
        fullname: fullName,
        dob: dob,
        gender: gender,
        phone: phone,
        address: address,
        admitted: false,
        nextofkin: nextofkin,
        nextofphone: nextofphone,
        userId: session?.user.id as string,
      },
    });
    return { success: "Patient Profile Created" };
  }
};

//
//
//
//
//
//
//

export const Update_Profile = async (
  values:
    | z.infer<typeof PatientUpdateSchema>
    | z.infer<typeof DoctorUpdateSchema>
    | z.infer<typeof NurseUpdateSchema>
    | z.infer<typeof StaffUpdateSchema>
) => {
  const user = await auth();

  /*  const ProfileData ={
    Username: Username,
      age: age,
      phoneNumber: phoneNumber,
      allergies: allergies,
      helleditarysickness: helleditarysickness,
      pastMarjorsurgeries: pastMarjorsurgeries,
  } */
  if (user?.user.role === UserRole.DOCTOR) {
    const validatedFields = DoctorUpdateSchema.safeParse(values);
    if (!validatedFields.success) {
      return { error: "invalid fields" };
    }
    const {
      fullName,
      dob,
      gender,
      phone,
      address,
      medicalLicenseNumber,
      specialization,
      yearsOfExperience,
    } = validatedFields.data;

    await db.doctor.update({
      where: { id: user.user.profile.id },
      data: {
        fullname: fullName,
        dob: dob,
        gender: gender,
        phone: phone,
        address: address,
        medicalLicenseNumber: medicalLicenseNumber,
        specialization: specialization,
        yearsOfExperience: yearsOfExperience,
      },
    });
    return { success: "Profile Updated" };
  }
  if (user?.user.role === UserRole.NURSE) {
    const validatedFields = NurseUpdateSchema.safeParse(values);
    if (!validatedFields.success) {
      return { error: "invalid fields" };
    }
    const {
      fullName,
      dob,
      gender,
      phone,
      address,
      nursingLicenseNumber,
      department,
      yearsOfExperience,
    } = validatedFields.data;

    await db.nurse.update({
      where: { id: user.user.profile.id },
      data: {
        fullname: fullName,
        dob: dob,
        gender: gender,
        phone: phone,
        address: address,
        nursingLicenseNumber: nursingLicenseNumber,
        department: department,
        yearsOfExperience: yearsOfExperience,
      },
    });
    return { success: "Profile Updated" };
  }
  if (user?.user.role === UserRole.STAFF) {
    const validatedFields = StaffUpdateSchema.safeParse(values);
    if (!validatedFields.success) {
      return { error: "invalid fields" };
    }
    const { fullName, dob, gender, phone, address, position, department } =
      validatedFields.data;

    await db.staff.update({
      where: { id: user.user.profile.id },
      data: {
        fullname: fullName,
        dob: dob,
        gender: gender,
        phone: phone,
        address: address,
        position: position,
        department: department,
      },
    });
    return { success: "Profile Updated" };
  }
  if (user?.user.role === UserRole.PATIENT) {
    const validatedFields = PatientUpdateSchema.safeParse(values);
    if (!validatedFields.success) {
      return { error: "invalid fields" };
    }
    const { fullName, dob, gender, phone, address, nextofkin, nextofphone } =
      validatedFields.data;

    await db.patient.update({
      where: { id: user.user.profile.id },
      data: {
        fullname: fullName,
        dob: dob,
        gender: gender,
        phone: phone,
        address: address,
        admitted: false,
        nextofkin: nextofkin,
        nextofphone: nextofphone,
      },
    });
    return { success: "Profile Updated" };
  }
};
