import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const parseStringify = (value: any) => JSON.parse(JSON.stringify(value));

export function capitalizeFirstLetter(word: string) {
  return word.charAt(0).toUpperCase() + word.slice(1);
}

export function encryptKey(passkey: string) {
  return btoa(passkey);
}

export function decryptKey(passkey: string) {
  return atob(passkey);
}

export const filterTime = (time: Date) => {
  const hour = time.getHours();
  return hour >= 9 && hour < 21;
};

export const sanitizeAppwriteId = (id: unknown): string => {
  const isValidString = typeof id === "string";
  if (!isValidString) {
    console.warn("⚠️ ID nije string:", id);
    return "";
  }

  try {
    if (id.startsWith("test-")) {
      console.log("🧪 Testni ID detektiran");
    }
  } catch (err) {
    console.error("🔥 Greška u startsWith:", err);
  }

  const cleaned = id
    .replace(/[^a-zA-Z0-9._-]/g, "")
    .replace(/^[^a-zA-Z0-9]/, "")
    .slice(0, 36);

  console.log("✅ Sanitizirani ID:", cleaned);
  return cleaned;
};

export const safeStartsWith = (input: unknown, prefix: string): boolean =>
  typeof input === "string" && input.startsWith(prefix);