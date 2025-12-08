import { Bell, Mail } from 'lucide-react'
import React, { useState } from 'react'
import { BsPhone } from 'react-icons/bs';
import Switch from "react-switch";

const Notification = () => {
  const [settings, setSettings] = useState({
    email: true,
    push: false,
    marketing: false
  })
  const handleChange = (name: string) => (checked: boolean) => {
    setSettings({ ...settings, [name]: checked })
  }
  return (
    <div className='flex flex-col gap-7 items-start w-full '>
      {/* Header */}
      <div className='flex flex-col gap-1'>
        <h1 className='text-neutral-100 text-2xl font-bold'>Notifications</h1>
        <p className='text-neutral-300 text-base'>Manage your notifications</p>
      </div>
      {/* Body */}
      <div className='flex flex-col gap-4 w-full'>
        <Setting icon={<Mail className='w-6 h-6' />} title='Email Notifications' description='Receive notifications via email' checked={settings.email} onChange={handleChange('email')} />
        <Setting icon={<BsPhone className='w-6 h-6' />} title='Push Notifications' description='Receive push notifications on your device' checked={settings.push} onChange={handleChange('push')} />
        <Setting icon={<Bell className='w-6 h-6' />} title='Marketing Communications' description='Receive updates about new features and promotions' checked={settings.marketing} onChange={handleChange('marketing')} />
      </div>
    </div>
  )
}

const Setting = ({ icon, title, description, checked, onChange }: { icon: React.ReactNode, title: string, description: string, checked: boolean, onChange: (checked: boolean) => void }) => {
  return (
    <div className='w-full flex items-center gap-2 px-2 py-4'>
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