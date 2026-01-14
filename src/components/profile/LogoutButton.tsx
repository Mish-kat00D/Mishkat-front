"use client"
import { useAuth } from "@/lib/hooks/useAuth"
import { LiaSignOutAltSolid } from "react-icons/lia"

const LogoutButton = () => {
  const { logout } = useAuth()
  const handleLogout = () => {
    logout()
  }
  return (
    <button onClick={handleLogout} className='mt-10 border border-primary-700 hover:border-secondary-50 hover:bg-secondary-50 transition rounded-full px-4 py-2 mx-auto hidden md:flex items-center justify-center gap-2 text-white m-4'><LiaSignOutAltSolid className='w-4 h-4' />Sign Out</button>
  )
}

export default LogoutButton