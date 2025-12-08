import React from 'react'

const Info = () => {
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
          <PaceOfInfo label='Name' value='John Doe' />
          {/* Email */}
          <PaceOfInfo label='Email' value='john.doe@example.com' />
          {/* Phone */}
          <PaceOfInfo label='Phone' value='+1234567890' />
        </div>
        {/* Right */}
        <div className='flex flex-col gap-4 w-1/2'>
          {/* Location */}
          <PaceOfInfo label='Location' value='123 Main St, Anytown, USA' />
          {/* Website */}
          <PaceOfInfo label='Website' value='https://www.example.com' />
          {/* Member Since */}
          <PaceOfInfo label='Member Since' value='2022-01-01' />
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