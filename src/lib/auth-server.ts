import { cookies } from "next/headers";

const API_URL = process.env.API_URL!;

export async function getUser() {
  const cookieStore = await cookies();
  console.log(cookieStore.toString());
  const res = await fetch(`${API_URL}/auth/profile`, {
    credentials: "include",
    cache: "no-store",
  });
  
  console.log(await res.json());

  if (!res.ok) return null;
  return res.json();
}

export async function requireUser() {
  const user = await getUser();
  if (!user) throw new Error("Unauthorized");
  return user;
}
