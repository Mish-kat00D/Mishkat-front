import { cookies } from "next/headers";

const API_URL = process.env.API_URL!;

export async function getUser() {
  const cookieStore = await cookies(); // no await
  const token = cookieStore.get("accessToken")?.value;

  const res = await fetch(`${API_URL}/auth/profile`, {
    credentials: "include",
    cache: "no-store",
    headers: {
      Cookie: `access_token=${token}`,
    },
  });

  const data = await res.json();
  console.log(data);

  if (!res.ok) return null;
  return data;
}

export async function requireUser() {
  const user = await getUser();
  if (!user) throw new Error("Unauthorized");
  return user;
}
