import { Models } from "node-appwrite";

export type Gender = "Male" | "Female" | "Other";

export interface SignupParams {
  fullName: string;
  email: string;
  phone: string;
  password: string;
  gender: Gender;
  customerId?: string;
}

export interface LogInProps {
  email: string;
  password: string;
}

export interface CreateAppointmentParams {
  userId: string;
  customer: string;
  barber: string;
  serviceType: string;
  scheduleDate: Date;
  status: string;
}

export interface Customer extends Models.Document {
  customerId: string;
  fullName: string;
  email: string;
  phone: string;
  gender: Gender;
}

export interface Appointment extends Models.Document {
  customer: Customer;
  scheduleDate: Date;
  serviceType: string;
  userId: string;
  barber: string;
  status: string;
}