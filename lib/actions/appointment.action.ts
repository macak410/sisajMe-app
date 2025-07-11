"use server";

import { type CreateAppointmentParams } from "@/types";
import { revalidatePath } from "next/cache";
import { ID, Query } from "node-appwrite";
import { createAdminClient } from "../appwrite.config";
import { parseStringify } from "../utils";

const { DATABASE_ID, APPOINTMENT_COLLECTION_ID } = process.env;

export const createAppointment = async (
  newAppointment: CreateAppointmentParams
) => {
  try {
    const { database } = await createAdminClient();

    const appointment = await database.createDocument(
      DATABASE_ID!,
      APPOINTMENT_COLLECTION_ID!,
      ID.unique(),
      newAppointment
    );

    return parseStringify(appointment);
  } catch (err) {
    console.error("Nije uspjelo kreiranje termina:", err);
  }
};

export const editAppointment = async (
  appointmentId: string,
  userId: string,
  appointment: CreateAppointmentParams
) => {
  try {
    const { database } = await createAdminClient();

    // Authorization
    const existingAppointment = await database.getDocument(
      DATABASE_ID!,
      APPOINTMENT_COLLECTION_ID!,
      appointmentId
    );

    if (!existingAppointment) throw new Error("Termin nije pronađen");

    if (existingAppointment.userId !== userId)
      throw new Error(
        "Neovlašteno: Nemate dopuštenje za uređivanje ovog termina"
      );

    // Edit Appointment
    const editedAppointment = await database.updateDocument(
      DATABASE_ID!,
      APPOINTMENT_COLLECTION_ID!,
      appointmentId,
      appointment
    );

    if (!editedAppointment) throw Error;

    revalidatePath("/account/appointments");
    return parseStringify(editedAppointment);
  } catch (error) {
    console.error(error);
  }
};

export const deleteAppointment = async (
  appointmentId: string,
  userId: string
) => {
  try {
    const { database } = await createAdminClient();

    // Authorization
    const existingAppointment = await database.getDocument(
      DATABASE_ID!,
      APPOINTMENT_COLLECTION_ID!,
      appointmentId
    );

    if (!existingAppointment) throw new Error("Termin nije pronađen");

    if (existingAppointment.userId !== userId)
      throw new Error(
        "Neovlašteno: Nemate dopuštenje za uređivanje ovog termina"
      );

    const deleteAppointment = await database.deleteDocument(
      DATABASE_ID!,
      APPOINTMENT_COLLECTION_ID!,
      appointmentId
    );

    if (!deleteAppointment) throw Error;

    revalidatePath("/account/appointments");
  } catch (error) {
    console.error(error);
  }
};

export const getAppointment = async (appointmentId: string) => {
  try {
    const { database } = await createAdminClient();

    const appointment = await database.getDocument(
      DATABASE_ID!,
      APPOINTMENT_COLLECTION_ID!,
      appointmentId
    );

    return parseStringify(appointment);
  } catch (error) {
    console.error(
      "Došlo je do pogreške prilikom dohvaćanja postojećeg korisnika:",
      error
    );
  }
};

export const getAppointments = async () => {
  try {
    const { database } = await createAdminClient();

    const appointments = await database.listDocuments(
      DATABASE_ID!,
      APPOINTMENT_COLLECTION_ID!,
      [Query.orderDesc("$updatedAt")]
    );

    return parseStringify(appointments.documents);
  } catch (error) {
    console.error(error);
  }
};

export const getCustomerAppointments = async (userId: string) => {
  try {
    const { database } = await createAdminClient();

    const appointments = await database.listDocuments(
      DATABASE_ID!,
      APPOINTMENT_COLLECTION_ID!,
      [Query.equal("userId", userId), Query.orderDesc("$updatedAt")]
    );

    return parseStringify(appointments.documents);
  } catch (error) {
    console.error("Greška pri dohvaćanju termina za korisnike:", error);
    return [];
  }
};
