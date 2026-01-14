import { getUser } from "@/lib/server/user";
import { UserProfile } from "../profile/Header";
import { redirect } from "next/navigation";

export default async function AuthGuard({ children }: { children: React.ReactNode }) {
  const user: UserProfile | null = await getUser()

  if (!user) {
    redirect("/auth/login");
  }

  return <>{children}</>;
}
