import { db } from "../lib/db";
export const getUserByEmail = async (email: any) => {
  try {
    const user = await db.user.findUnique({
      where: { email },
    });
    return user;
  } catch (error) {
    return null;
  }
};
export const getUserById = async (id: any) => {
  try {
    const user = await db.user.findUnique({
      where: { id },
    });
    return user;
  } catch (error) {
    return null;
  }
};
export const getUserAppointment = async (id: any) => {
  try {
    const user = await db.appointment.findFirst({
      where: { patientId: id },
    });
    return user;
  } catch (error) {
    return null;
  }
};
export const getPatientId = async (id: any) => {
  try {
    const user = await db.patient.findFirst({
      where: { id: id },
    });
    return user;
  } catch (error) {
    return null;
  }
};
export const deleteAppointment = async (id: any) => {
  try {
    const user = await db.appointment.delete({
      where: { id },
    });
    return user;
  } catch (error) {
    return null;
  }
};
