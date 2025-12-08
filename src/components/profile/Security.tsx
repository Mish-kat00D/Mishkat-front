import { LockKeyhole } from 'lucide-react'
import React, { useState } from 'react'
import { LiaSignOutAltSolid } from 'react-icons/lia'
import { MdOutlineShield } from 'react-icons/md'
import Switch from 'react-switch'

const Security = () => {
  const [tfa, setTfa] = useState(false)

  const handleLogout = () => {

  }

  return (
    <div className='flex flex-col gap-7 items-start w-full'>
      {/* Header */}
      <div className="flex items-center justify-between w-full">
        <div className='flex flex-col gap-1'>
          <h1 className='text-neutral-100 text-2xl font-bold'>Security</h1>
          <p className='text-neutral-300 text-base'>Manage your security</p>
        </div>
        <button onClick={handleLogout} className='border border-primary-700 hover:border-secondary-50 hover:bg-secondary-50 transition rounded-full px-4 py-2 md:hidden flex items-center justify-center gap-2 text-white'><LiaSignOutAltSolid className='w-4 h-4' />Sign Out</button>
      </div>
      {/* Body */}
      <div className='flex flex-col gap-4 w-full'>
        <Setting icon={<LockKeyhole className='w-6 h-6' />} title='Password Reset' description='Last changed 3 months ago' button={<button className='bg-secondary-500 hover:bg-secondary-700 text-white px-[10px] py-[6px] text-xs rounded-full'>Change Password</button>} />
        <Setting
          icon={<MdOutlineShield className='w-6 h-6' />}
          title='Tow-Factor Authentications'
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

export default Security