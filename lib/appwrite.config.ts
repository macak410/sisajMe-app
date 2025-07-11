"use server";

import { cookies } from "next/headers";
import * as sdk from "node-appwrite";

export async function createSessionClient() {
  const endpoint = process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT;
  const project = process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID;

  if (!endpoint || typeof endpoint !== "string") {
    throw new Error("❌ NEXT_PUBLIC_ENDPOINT nije definiran ili nije string.");
  }

  if (!project || typeof project !== "string") {
    throw new Error("❌ NEXT_PUBLIC_PROJECT_ID nije definiran ili nije string.");
  }

  const client = new sdk.Client()
    .setEndpoint(endpoint)
    .setProject(project);

  const session = cookies().get("auth-session");
  if (!session?.value) {
    throw new Error("❌ Nema valjane sesije");
  }

  client.setSession(session.value);

  return {
    get account() {
      return new sdk.Account(client);
    },
  };
}

export async function createAdminClient() {
  const endpoint = process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT;
  const project = process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID;
  const apiKey = process.env.NEXT_API_KEY;

  if (!endpoint) throw new Error("❌ NEXT_PUBLIC_APPWRITE_ENDPOINT nije definirana.");
  if (!project) throw new Error("❌ NEXT_PUBLIC_APPWRITE_PROJECT_ID nije definiran.");
  if (!apiKey) throw new Error("❌ NEXT_API_KEY nije definiran.");

  const client = new sdk.Client()
    .setEndpoint(endpoint)
    .setProject(project)
    .setKey(apiKey);

  return {
    get account() {
      return new sdk.Account(client);
    },
    get database() {
      return new sdk.Databases(client);
    },
    get user() {
      return new sdk.Users(client);
    },
  };
}
