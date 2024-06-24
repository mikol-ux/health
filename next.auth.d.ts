import { Doctor, Nurse, Patient, Staff, UserRole } from "@prisma/client";
import NextAuth, { type DefaultSession } from "next-auth";
export type ExtendedUser = DefaultSession["user"] & {
  role: UserRole;
  isTwoFactorEnabled: boolean;
  isOAuth: boolean;
  profile: any;
  // userId: String;
  // medicalLicenseNumber: String;
  // specialization: String;
  // yearsOfExperience: Int;
  // nursingLicenseNumber: String;
  // department: String;
  // yearsOfExperience: Int;
  // position: String;
  // department: String;
  // patientId: String;
  // docId: any;
  // NurId: String;
};
declare module "next-auth" {
  interface Session {
    user: ExtendedUser;
  }
}
