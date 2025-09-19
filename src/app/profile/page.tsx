import { getUser } from "@/lib/auth-server"

const Page = async () => {
  const user = await getUser()

  return (
    <h1>Hi {user.name} 👀</h1>
  )
}

export default Page