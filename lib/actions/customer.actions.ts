"use server";

import { ID, Query } from "node-appwrite";
import { createAdminClient, createSessionClient } from "../appwrite.config";
import { cookies } from "next/headers";
import { parseStringify, sanitizeAppwriteId } from "../utils";
import { type LogInProps, type SignupParams } from "@/types";
import { type Customer } from "@/types/appwrite.types";
import { redirect } from "next/navigation";

const databaseId = process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID;
const collectionId = process.env.CUSTOMER_COLLECTION_ID;

if (!databaseId || typeof databaseId !== "string")
  throw new Error("NEXT_PUBLIC_APPWRITE_DATABASE_ID nije definiran ili nije string.");
if (!collectionId || typeof collectionId !== "string")
  throw new Error("CUSTOMER_COLLECTION_ID nije definiran ili nije string.");

export const getCustomer = async (customerId: string): Promise<Customer> => {
  try {
    const { database } = await createAdminClient();

    const customer = await database.listDocuments(
      databaseId,
      collectionId,
      [Query.equal("customerId", [customerId])]
    );

    if (!customer?.documents?.[0]) {
      throw new Error("Pogreška pri pronalaženju valjanog korisnika.");
    }

    return parseStringify(customer.documents[0]);
  } catch (err) {
    console.error("getCustomer error:", err);
    throw err;
  }
};

export const logIn = async ({ email, password }: LogInProps) => {
  const { account } = await createAdminClient();

  const currentSession = await account.getSession("current").catch(() => null);
  if (currentSession) {
    console.warn("👤 Već postoji aktivna sesija — login nije potreban.");
    return currentSession;
  }

  const session = await account.createEmailPasswordSession(email, password);
  if (!session) throw new Error("Pogreška pri logiranju korisnika.");

  cookies().set("auth-session", session.secret, {
    path: "/",
    httpOnly: true,
    sameSite: "strict",
    secure: true,
  });

  return session;
};

export const signUp = async ({
  password,
  ...customerData
}: SignupParams): Promise<Customer> => {
  const { email, fullName } = customerData;
  const { account, database } = await createAdminClient();

  const newAccount = await account.create(ID.unique(), email, password, fullName);
  if (!newAccount) throw new Error("Pogreška pri stvaranju računa");

  const { customerId: _, ...cleanCustomerData } = customerData;

  const newCustomer = await database.createDocument(
    databaseId,
    collectionId,
    ID.unique(),
    {
      ...cleanCustomerData,
      customerId: newAccount.$id,
    }
  );

  if (!newCustomer) throw new Error("Pogreška pri stvaranju klijenta");

  const session = await account.createEmailPasswordSession(email, password);
  if (!session) throw new Error("Pogreška pri kreiranju sign-up sesije.");

  cookies().set("auth-session", session.secret, {
    path: "/",
    httpOnly: true,
    sameSite: "strict",
    secure: true,
  });

  return parseStringify(newCustomer);
};

export const logout = async () => {
  try {
    const { account } = await createSessionClient();

    cookies().delete("auth-session");
    await account.deleteSession("current");
    redirect("/sign-in");
  } catch (err) {
    console.error("Logout greška:", err);
  }
};

export const getLoggedInUser = async () => {
  try {
    const { account } = await createSessionClient();
    const user = await account.get();

    if (!user?.$id || typeof user.$id !== "string") {
      console.warn("Neispravan user ID:", user?.$id);
      return null;
    }

    return parseStringify(user);
  } catch (err) {
    console.error("getLoggedInUser error:", err);
    return null;
  }
};

export const createCustomerOnServer = async ({
  fullName,
  email,
  phone,
  gender,
  customerId,
  password,
}: SignupParams): Promise<Customer> => {
  const { database } = await createAdminClient();

  if (!customerId) throw new Error("customerId nije definiran!");
  const safeCustomerId = sanitizeAppwriteId(customerId);

  console.log("Šaljem payload Appwrite-u:", {
    fullName,
    email,
    phone,
    gender,
    customerId: safeCustomerId,
  });

  const newCustomer = await database.createDocument(
    databaseId,
    collectionId,
    ID.unique(),
    {
      fullName,
      email,
      phone,
      gender,
      customerId: safeCustomerId,
    }
  );

  return parseStringify(newCustomer);
};