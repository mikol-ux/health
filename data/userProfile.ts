import { db } from "@/lib/db";

export const getProfileByuserId = async (userId: string) => {
  try {
    const profile = await db.patient.findFirst({
      where: { userId },
    });
    // console.log(profile);
    return profile;
  } catch {
    return null; // {error:"null"}
  }
};
export const getDoctorByuserId = async (doctorId: string) => {
  try {
    const profile = await db.doctor.findFirst({
      where: { userId: doctorId },
    });
    // console.log(profile);
    return profile;
  } catch {
    return null; // {error:"null"}
  }
};
export const getNurseByuserId = async (nurseId: string) => {
  try {
    const profile = await db.nurse.findFirst({
      where: { userId: nurseId },
    });
    // console.log(profile);
    return profile;
  } catch {
    return null; // {error:"null"}
  }
};
export const getStaffByuserId = async (staffId: string) => {
  try {
    const profile = await db.staff.findFirst({
      where: { userId: staffId },
    });
    // console.log(profile);
    return profile;
  } catch {
    return null; // {error:"null"}
  }
};
export const getPatientByuserId = async (patientId: any) => {
  try {
    const profile = await db.patient.findFirst({
      where: { userId: patientId },
    });
    // console.log(profile);
    return profile;
  } catch {
    return null; // {error:"null"}
  }
};
