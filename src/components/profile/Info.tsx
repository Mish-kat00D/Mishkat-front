import { getUser } from '@/lib/server/user'
import React from 'react'

interface InfoProps {
  name: string
  email: string
  phone: string | null
  location: string | null
  website: string | null
  createdAt: string
}

const Info = async () => {
  const user: InfoProps | null = await getUser()
  if (!user) return null

  user.createdAt = new Date(user.createdAt).toLocaleDateString()
  return (
    <div className='flex flex-col gap-7 items-start w-full '>
      {/* Header */}
      <div className='flex flex-col gap-1'>
        <h1 className='text-neutral-100 text-2xl font-bold'>Profile Information</h1>
        <p className='text-neutral-300 text-base'>Manage your personal information and profile details</p>
      </div>
      {/* Body */}
      <div className='flex flex-col md:flex-row gap-4 md:gap-14 w-full'>
        {/* Left */}
        <div className='flex flex-col gap-4 w-1/2'>
          {/* Name */}
          <PaceOfInfo label='Name' value={user?.name ?? 'No Name'} />
          {/* Email */}
          <PaceOfInfo label='Email' value={user?.email ?? 'No Email'} />
          {/* Phone */}
          <PaceOfInfo label='Phone' value={user?.phone ?? 'No Phone'} />
        </div>
        {/* Right */}
        <div className='flex flex-col gap-4 w-1/2'>
          {/* Location */}
          <PaceOfInfo label='Location' value={user?.location ?? 'No Location'} />
          {/* Website */}
          <PaceOfInfo label='Website' value={user?.website ?? 'No Website'} />
          {/* Member Since */}
          <PaceOfInfo label='Member Since' value={user?.createdAt ?? 'No Member Since'} />
        </div>
      </div>
    </div>
  )
}

const PaceOfInfo = ({ label, value }: { label: string, value: string }) => {
  return (
    <div className='flex flex-col gap-1 items-start w-full'>
      <p className='text-neutral-400 text-sm'>{label}</p>
      <p className='text-neutral-100 text-base'>{value}</p>
    </div>
  )
}

export default Info