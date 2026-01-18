"use client"
import { Bell, Mail, Loader2, AlertCircle } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { BsPhone } from 'react-icons/bs';
import Switch from "react-switch";

const Notification = () => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [settings, setSettings] = useState({
    email: true,
    push: false,
    marketing: false
  })

  useEffect(() => {
    const fetchSettings = async () => {
      setLoading(true)
      setError(null)
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/profile/notification-settings`, {
          credentials: 'include'
        })
        if (!response.ok) throw new Error('Failed to load notification settings')
        const data = await response.json()
        setSettings(data)
      } catch (err: any) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }
    fetchSettings()
  }, [])

  const updateSettings = async (newSettings: typeof settings) => {
    setLoading(true)
    setError(null)
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/profile/notification-settings`, {
        credentials: 'include',
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newSettings)
      })
      if (!response.ok) throw new Error('Failed to update settings')
      const data = await response.json()
      setSettings(data)
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (name: string) => (checked: boolean) => {
    const newSettings = { ...settings, [name]: checked }
    setSettings(newSettings)
    updateSettings({ email: newSettings.email, push: newSettings.push, marketing: newSettings.marketing })
  }

  return (
    <div className='flex flex-col gap-7 items-start w-full '>
      <div className='flex flex-col gap-1'>
        <div className="flex items-center gap-3">
          <h1 className='text-neutral-100 text-2xl font-bold'>Notifications</h1>
          {loading && <Loader2 className="w-5 h-5 text-secondary-500 animate-spin" />}
        </div>
        <p className='text-neutral-300 text-base'>Manage your notifications</p>
      </div>

      {error && (
        <div className="w-full flex items-center gap-2 p-4 rounded-lg bg-red-500/10 border border-red-500/20 text-red-500">
          <AlertCircle className="w-5 h-5" />
          <p className="text-sm font-medium">{error}</p>
        </div>
      )}

      <div className='flex flex-col gap-4 w-full'>
        <Setting icon={<Mail className='w-6 h-6' />} title='Email Notifications' description='Receive notifications via email' checked={settings.email} onChange={handleChange('email')} disabled={loading} />
        <Setting icon={<BsPhone className='w-6 h-6' />} title='Push Notifications' description='Receive push notifications on your device' checked={settings.push} onChange={handleChange('push')} disabled={loading} />
        <Setting icon={<Bell className='w-6 h-6' />} title='Marketing Communications' description='Receive updates about new features and promotions' checked={settings.marketing} onChange={handleChange('marketing')} disabled={loading} />
      </div>
    </div>
  )
}

const Setting = ({ icon, title, description, checked, onChange, disabled }: { icon: React.ReactNode, title: string, description: string, checked: boolean, onChange: (checked: boolean) => void, disabled?: boolean }) => {
  return (
    <div className={`w-full flex items-center gap-2 px-2 py-4 transition-opacity ${disabled ? 'opacity-50 pointer-events-none' : ''}`}>
      <div className="flex items-center justify-center text-secondary-500">
        {icon}
      </div>
      <div className="flex flex-col items-start justify-between flex-1">
        <p className="text-neutral-100 text-base">{title}</p>
        <p className="text-neutral-300 text-sm font-normal">{description}</p>
      </div>
      <Switch
        checked={checked}
        onChange={onChange}
        disabled={disabled}
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
    </div>
  )
}

export default Notification