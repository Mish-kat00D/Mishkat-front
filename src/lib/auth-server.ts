import { cookies } from "next/headers";

const API_URL = process.env.API_URL!;

export async function getUser() {
  const cookieStore = await cookies();
  console.log(cookieStore.toString());
  const token = cookieStore.get('access_token')?.value;

  const res = await fetch(`${API_URL}/auth/profile`, {
    credentials: "include",
    cache: "no-store",
    headers: {
      Cookie: `access_token=${token}`
    },
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
