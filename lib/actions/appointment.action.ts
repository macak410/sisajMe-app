"use server";

import { type CreateAppointmentParams } from "@/types";
import { revalidatePath } from "next/cache";
import { ID, Query } from "node-appwrite";
import { createAdminClient } from "../appwrite.config";
import { parseStringify } from "../utils";

const databaseId = process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID;
const collectionId = process.env.APPOINTMENT_COLLECTION_ID;

if (!databaseId || typeof databaseId !== "string") {
  throw new Error("NEXT_PUBLIC_APPWRITE_DATABASE_ID nije definiran ili nije string.");
}
if (!collectionId || typeof collectionId !== "string") {
  throw new Error("APPOINTMENT_COLLECTION_ID nije definiran ili nije string.");
}

export const createAppointment = async (
  newAppointment: CreateAppointmentParams
) => {
  try {
    const { database } = await createAdminClient();

    const appointment = await database.createDocument(
      databaseId,
      collectionId,
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

    const existingAppointment = await database.getDocument(
      databaseId,
      collectionId,
      appointmentId
    );

    if (!existingAppointment) throw new Error("Termin nije pronađen");

    if (existingAppointment.userId !== userId)
      throw new Error("Neovlašteno: Nemate dopuštenje za uređivanje ovog termina");

    const editedAppointment = await database.updateDocument(
      databaseId,
      collectionId,
      appointmentId,
      appointment
    );

    if (!editedAppointment) throw new Error("Uređivanje nije uspjelo");

    revalidatePath("/account/appointments");
    revalidatePath("/account/reservations");

    return parseStringify(editedAppointment);
  } catch (error) {
    console.error("Greška pri uređivanju:", error);
  }
};

export const deleteAppointment = async (
  appointmentId: string,
  userId: string
) => {
  try {
    const { database } = await createAdminClient();

    const existingAppointment = await database.getDocument(
      databaseId,
      collectionId,
      appointmentId
    );

    if (!existingAppointment) throw new Error("Termin nije pronađen");

    if (existingAppointment.userId !== userId)
      throw new Error("Neovlašteno: Nemate dopuštenje za brisanje ovog termina");

    const deleted = await database.deleteDocument(
      databaseId,
      collectionId,
      appointmentId
    );

    if (!deleted) throw new Error("Brisanje nije uspjelo");

    revalidatePath("/account/appointments");
  } catch (error) {
    console.error("Greška pri brisanju termina:", error);
  }
};

export const getAppointment = async (appointmentId: string) => {
  try {
    const { database } = await createAdminClient();

    const appointment = await database.getDocument(
      databaseId,
      collectionId,
      appointmentId
    );

    return parseStringify(appointment);
  } catch (error) {
    console.error("Greška pri dohvaćanju termina:", error);
  }
};

export const getAppointments = async () => {
  try {
    const { database } = await createAdminClient();

    const rawAppointments = await database.listDocuments(
      databaseId,
      collectionId,
      [Query.orderDesc("scheduleDate")]
    );

    const appointments = await Promise.all(
      rawAppointments.documents.map(async (appt) => {
        try {
          const customerDoc = await database.getDocument(
            databaseId,
            process.env.CUSTOMER_COLLECTION_ID!,
            appt.customer // pretpostavljamo da je ovo customerId kao string
          );

          return {
            ...appt,
            customer: parseStringify(customerDoc),
          };
        } catch (err) {
          console.warn("Greška pri dohvaćanju korisnika:", err);
          return { ...appt, customer: null };
        }
      })
    );

    return parseStringify(appointments);
  } catch (error) {
    console.error("Greška pri listanju svih termina:", error);
    return [];
  }
};

export const getCustomerAppointments = async (userId: string) => {
  try {
    const { database } = await createAdminClient();

    const appointments = await database.listDocuments(
      databaseId,
      collectionId,
      [Query.equal("userId", userId), Query.orderDesc("scheduleDate")]
    );

    return parseStringify(appointments.documents);
  } catch (error) {
    console.error("Greška pri dohvaćanju korisničkih termina:", error);
    return [];
  }
};