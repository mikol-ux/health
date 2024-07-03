import { UserRole } from "@prisma/client";
import * as z from "zod";
export const SettingSchema = z.object({});
export const ProfileForm = z.object({
  Username: z.string(),
  age: z.string(),
  phoneNumber: z.string(),
  allergies: z.string(),
  helleditarysickness: z.string(),
  pastMarjorsurgeries: z.string(),
  userId: z.optional(z.string()),
});
export const RoleSelect = z.object({
  role: z.enum([
    UserRole.DOCTOR,
    UserRole.NURSE,
    UserRole.STAFF,
    UserRole.PATIENT,
  ]),
});

export const DoctorProfile = z.object({
  name: z.string(),
  age: z.string(),
  specialization: z.string(),
  doctorId: z.optional(z.string()),
});
export const NurseProfile = z.object({
  name: z.string(),
  age: z.string(),
  specialization: z.string(),
  nurseId: z.optional(z.string()),
});
export const TimeSchema = z.object({
  date: z.date(),
  time: z.string().min(1, { message: "Appointment time is needed" }),
  dateTime: z.optional(z.string()),
  note: z.string().min(6, { message: "minimum 6 characters" }),
  patientId: z.string().min(1, "Patient ID is required"),
});
export const reportSchema = z.object({
  date: z.date(),
  symptoms: z.string(),
  diagnosis: z.string(),
  labtest: z.string(),
  labresult: z.optional(z.string()),
  prescription: z.optional(z.string()),
  patientId: z.string(),
  docId: z.string(),
});

export const PatientRegistrationSchema = z.object({
  fullName: z.string().min(1, "Full name is required"),
  dob: z.string().min(1, "Date of Birth is required"),
  gender: z.string().min(1, "Gender is required"),
  phone: z.string().min(1, "Phone number is required"),
  address: z.string().min(1, "Address is required"),
  nextofkin: z.string().min(1, "input next of kin incase of emergency"),
  nextofphone: z.string().min(1, "input next of kin incase of emergency"),
  terms: z
    .boolean()
    .refine(
      (val) => val === true,
      "You must agree to the terms and conditions"
    ),
});

export const DoctorRegistrationSchema = z.object({
  fullName: z.string().min(1, "Full name is required"),
  dob: z.string().min(1, "Date of Birth is required"),
  gender: z.string().min(1, "Gender is required"),
  phone: z.string().min(1, "Phone number is required"),
  address: z.string().min(1, "Address is required"),
  medicalLicenseNumber: z.string().min(1, "Medical License Number is required"),
  specialization: z.string().min(1, "Specialization is required"),
  yearsOfExperience: z.string().min(1, "Years of Experience is required"),
  terms: z
    .boolean()
    .refine(
      (val) => val === true,
      "You must agree to the terms and conditions"
    ),
});

export const NurseRegistrationSchema = z.object({
  fullName: z.string().min(1, "Full name is required"),
  dob: z.string().min(1, "Date of Birth is required"),
  gender: z.string().min(1, "Gender is required"),
  phone: z.string().min(1, "Phone number is required"),
  address: z.string().min(1, "Address is required"),
  nursingLicenseNumber: z.string().min(1, "Nursing License Number is required"),
  department: z.string().min(1, "Department is required"),
  yearsOfExperience: z.string().min(1, "Years of Experience is required"),
  terms: z
    .boolean()
    .refine(
      (val) => val === true,
      "You must agree to the terms and conditions"
    ),
});

export const StaffRegistrationSchema = z.object({
  fullName: z.string().min(1, "Full name is required"),
  dob: z.string().min(1, "Date of Birth is required"),
  gender: z.string().min(1, "Gender is required"),
  phone: z.string().min(1, "Phone number is required"),
  address: z.string().min(1, "Address is required"),
  position: z.string().min(1, "Position is required"),
  department: z.string().min(1, "Department is required"),
  terms: z
    .boolean()
    .refine(
      (val) => val === true,
      "You must agree to the terms and conditions"
    ),
});

// Doctorsreport Form Schema
export const DoctorsreportSchema = z.object({
  date: z.date(),
  symptoms: z.string().min(1, "Symptoms are required"),
  diagnosis: z.string().min(1, "Diagnosis is required"),
  labtest: z.string().optional(),
  labtestresult: z.string().optional(),
  prescription: z.string().optional(),
  patientId: z.string().min(1, "Patient ID is required"),
  docId: z.string().min(1, "Doctor ID is required"),
});

// Appointment Form Schema
export const AppointmentSchema = z.object({
  day: z.date(),
  time: z.string().min(1, "Time is required"),
  daytime: z.string().optional(),
  note: z.string().optional(),
  patientId: z.string().min(1, "Patient ID is required"),
});

// Medications Form Schema
export const MedicationsSchema = z.object({
  medication: z.string().min(1, "Medication is required"),
  date: z.date(),
  patientId: z.string().min(1, "Patient ID is required"),
  docId: z.string().min(1, "Doctor ID is required"),
});

// Injection Form Schema
export const InjectionSchema = z.object({
  injection: z.string().min(1, "Injection is required"),
  date: z.date(),
  patientId: z.string().min(1, "Patient ID is required"),
  nurseId: z.string().min(1, "Nurse ID is required"),
});
