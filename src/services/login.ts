import { pb } from "./pocketpase";

export async function login(password: string) {
  try {
    const authData = await pb
      .collection("users")
      .authWithPassword("generated-user", password);
  } catch (e) {
    console.log(e);
  }

  return pb.authStore.isValid;
}