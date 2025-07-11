import { Account, Client, ID } from "appwrite";

const client = new Client()
  .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!) 
  .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID!);

export const account = new Account(client);

/**
 * Signup korisnika u Appwrite Auth
 */
export const signUpClient = async (
  email: string,
  password: string,
  fullName: string
) => {
  return account.create(ID.unique(), email, password, fullName);
};

/**
 * Login korisnika putem e-maila i lozinke
 */
// export const logInClient = async (email: string, password: string) => {
//   return account.createSession(email, password);
// };

export const logInClient = async (email: string, password: string) => {
  try {
    console.log("▶️ Login pokušaj:", email);
    const session = await account.createEmailPasswordSession(email, password);
    console.log("✅ Session:", session);
    return session;
  } catch (err) {
    console.error("❌ Login error:", err);
    throw err;
  }
};

/**
 * Dohvaćanje trenutno prijavljenog korisnika
 */
export const getCurrentClientUser = async () => {
  return account.get();
};

/**
 * Logout korisnika iz trenutne sesije
 */
export const logOutClient = async () => {
  return account.deleteSession("current");
};