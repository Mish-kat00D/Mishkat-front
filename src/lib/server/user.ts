import { cookies } from "next/headers";

export async function getUser() {
  const cookieHeader = cookies().toString();

  const res = await fetch(`${process.env.API_URL}/profile`, {
    headers: { Cookie: cookieHeader },
    cache: "no-store",
  });

  if (!res.ok) return null;
  return res.json();
}
