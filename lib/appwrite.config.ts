"use server";

import { cookies } from "next/headers";
import * as sdk from "node-appwrite";

export async function createSessionClient() {
  const client = new sdk.Client()
    .setEndpoint(process.env.NEXT_PUBLIC_ENDPOINT!)
    .setProject(process.env.NEXT_PUBLIC_PROJECT_ID!);

  const session = cookies().get("auth-session");
  if (!session || !session.value) {
    throw new Error("Nema valjane sesije");
  }

  client.setSession(session.value);

  return {
    get account() {
      return new sdk.Account(client);
    },
  };
}

export async function createAdminClient() {
  const client = new sdk.Client()
    .setEndpoint(process.env.NEXT_PUBLIC_ENDPOINT!)
    .setProject(process.env.NEXT_PUBLIC_PROJECT_ID!)
    .setKey(process.env.NEXT_API_KEY!);

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
