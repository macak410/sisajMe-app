
import { Account, Client, ID } from "appwrite";

const client = new Client()
  .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!)
  .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID!);

const account = new Account(client);

export const signUpClient = async (
  email: string,
  password: string,
  fullName: string
) => {
  return account.create(ID.unique(), email, password, fullName);
};

export const logInClient = async (email: string, password: string) => {
  return account.createEmailSession(email, password);
};

export const getCurrentClientUser = async () => {
  return account.get();
};