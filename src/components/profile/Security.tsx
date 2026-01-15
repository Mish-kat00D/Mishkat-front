"use client"
import { useAuth } from '@/lib/hooks/useAuth'
import { LockKeyhole, X } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { LiaSignOutAltSolid } from 'react-icons/lia'
import { MdOutlineShield } from 'react-icons/md'
import Switch from 'react-switch'
import { useRouter } from 'next/navigation'

const Security = () => {
  const { logout, loading } = useAuth()
  const [tfa, setTfa] = useState(false)
  const [isLoading, setIsLoading] = useState(loading)
  const [error, setError] = useState<string | null>(null)
  const [showModal, setShowModal] = useState(false)
  const router = useRouter()

  const handleLogout = async () => {
    await logout()
    router.push('/')
  }

  useEffect(() => {
    setIsLoading(loading)
  }, [loading])

  useEffect(() => {
    const fetchTfa = async () => {
      setIsLoading(true)
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/profile/tfa`, {
          credentials: 'include'
        })
        if (!response.ok) throw new Error('Failed to load TFA status')
        const data = await response.json()
        setTfa(data.enabled)
      } catch (err: any) {
        setError(err.message)
      } finally {
        setIsLoading(false)
      }
    }
    fetchTfa()
  }, [])

  return (
    <>
      <div className='flex flex-col gap-7 items-start w-full'>
        {/* Header */}
        <div className="flex items-center justify-between w-full">
          <div className='flex flex-col gap-1'>
            <h1 className='text-neutral-100 text-2xl font-bold'>Security</h1>
            <p className='text-neutral-300 text-base'>Manage your security</p>
          </div>
          <button disabled={isLoading} onClick={handleLogout} className='border border-primary-700 hover:border-secondary-50 hover:bg-secondary-50 transition rounded-full px-4 py-2 md:hidden flex items-center justify-center gap-2 text-white disabled:opacity-50'><LiaSignOutAltSolid className='w-4 h-4' />Sign Out</button>
        </div>
        {/* Body */}
        <div className='flex flex-col gap-4 w-full'>
          <Setting icon={<LockKeyhole className='w-6 h-6' />} title='Password Reset' description='Last changed 3 months ago' button={<button onClick={() => setShowModal(true)} className='bg-secondary-500 hover:bg-secondary-700 text-white px-[10px] py-[6px] text-xs rounded-full'>Change Password</button>} />
          <Setting
            icon={<MdOutlineShield className='w-6 h-6' />}
            title='Two-Factor Authentication'
            description='Add an extra layer of security to your account'
            button={
              <Switch
                checked={tfa}
                onChange={setTfa}
                onColor="#fb5607"
                onHandleColor="#fff"
                uncheckedIcon={false}
                checkedIcon={false}
                height={24}
                width={48}
                boxShadow='none'
                activeBoxShadow='none'
                className="react-switch"
                onFocusCapture={() => { }}
                onBlurCapture={() => { }}
              />
            }
          />
        </div>
      </div>
      {showModal && <ChangePasswordModal onClose={() => { setShowModal(false) }} onSubmit={() => { setShowModal(false) }} />}
    </>
  )
}

const Setting = ({ icon, title, description, button }: { icon: React.ReactNode, title: string, description: string, button: React.ReactNode }) => {
  return (
    <div className='w-full flex items-center gap-2 px-2 py-4'>
      <div className="flex items-center justify-center text-secondary-500">
        {icon}
      </div>
      <div className="flex flex-col items-start justify-between flex-1">
        <p className="text-neutral-100 text-base">{title}</p>
        <p className="text-neutral-300 text-sm font-normal">{description}</p>
      </div>
      {button}
    </div>
  )
}

const ChangePasswordModal = ({ onClose, onSubmit }: { onClose: () => void, onSubmit: () => void }) => {
  const { changePassword } = useAuth()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError(null)
    const formData = new FormData(e.currentTarget)
    const currentPassword = formData.get('currentPassword') as string
    const newPassword = formData.get('newPassword') as string
    const confirmNewPassword = formData.get('confirmNewPassword') as string

    if (newPassword !== confirmNewPassword) {
      setError("New passwords do not match")
      return
    }

    setLoading(true)
    try {
      await changePassword({ oldPassword: currentPassword, newPassword })
      onSubmit()
    } catch (err: any) {
      setError(err.message || "Failed to change password")
    } finally {
      setLoading(false)
    }
  }

  return (<div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 text-left">
    <div className="bg-white no-scrollbar dark:bg-primary-900 rounded-3xl w-full max-w-2xl max-h-[90vh] overflow-y-auto flex flex-col shadow-2xl border border-white/10">
      {/* Header */}
      <div className="flex justify-between items-center p-6 border-b border-gray-200 dark:border-primary-700">
        <h2 className="text-2xl font-bold dark:text-white">Change Password</h2>
        <button
          onClick={onClose}
          className="p-2 hover:bg-gray-100 dark:hover:bg-primary-800 rounded-full transition"
        >
          <X className="w-6 h-6 dark:text-white" />
        </button>
      </div>
      <form onSubmit={handleSubmit} className="flex flex-col gap-6 p-6">
        {error && <div className="p-3 text-sm text-red-500 bg-red-100 rounded-xl dark:bg-red-900/30">{error}</div>}
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium dark:text-neutral-300">Current Password</label>
          <input
            type="password"
            name="currentPassword"
            required
            className="p-3 rounded-xl border border-gray-200 dark:border-primary-700 bg-transparent dark:text-white focus:ring-2 focus:ring-secondary-500 outline-none transition"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium dark:text-neutral-300">New Password</label>
          <input
            type="password"
            name="newPassword"
            required
            className="p-3 rounded-xl border border-gray-200 dark:border-primary-700 bg-transparent dark:text-white focus:ring-2 focus:ring-secondary-500 outline-none transition"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium dark:text-neutral-300">Confirm New Password</label>
          <input
            type="password"
            name="confirmNewPassword"
            required
            className="p-3 rounded-xl border border-gray-200 dark:border-primary-700 bg-transparent dark:text-white focus:ring-2 focus:ring-secondary-500 outline-none transition"
          />
        </div>
        <div className="flex justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="px-6 py-2 rounded-xl text-neutral-600 dark:text-neutral-300 hover:bg-gray-100 dark:hover:bg-primary-800 transition"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading}
            className="px-6 py-2 rounded-xl bg-secondary-500 text-white hover:bg-secondary-600 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Changing...' : 'Change Password'}
          </button>
        </div>
      </form>
    </div>
  </div>
  )
}

export default Security