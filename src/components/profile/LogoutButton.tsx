"use client"
import { useAuth } from "@/lib/hooks/useAuth"
import { useRouter } from "next/navigation"
import { LiaSignOutAltSolid } from "react-icons/lia"

const LogoutButton = () => {
  const router = useRouter()
  const { logout, loading } = useAuth()
  const handleLogout = async () => {
    await logout()
    router.push('/login')
  }
  return (
    <button disabled={loading} onClick={handleLogout} className='mt-10 border border-primary-700 hover:border-secondary-50 hover:bg-secondary-50 transition rounded-full px-4 py-2 mx-auto hidden md:flex items-center justify-center gap-2 text-white m-4 disabled:opacity-50'><LiaSignOutAltSolid className='w-4 h-4' />Sign Out</button>
  )
}

export default LogoutButton