import { cookies } from "next/headers";

export async function getUser() {
  const cookieHeader = cookies().toString();

  const url = `${process.env.API_URL ?? "https://mish-kat.org/api"}/profile`
  const res = await fetch(url, {
    headers: { Cookie: cookieHeader },
    cache: "no-store",
  });

  if (!res.ok) return null;
  return res.json();
}

