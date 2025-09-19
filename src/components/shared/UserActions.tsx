"use client";
import Image from 'next/image';
import Link from 'next/link';
import React from 'react'
import { IoNotifications } from 'react-icons/io5';

const UserActions = ({ user }: { user: any }) => {
  return (
    <>
      {user ? (
        <div className="flex justify-end items-center gap-4">
          <div className="p-2 bg-Primary-900 rounded-lg outline-1 outline-offset-[-1px] outline-indigo-300/20 flex justify-start items-center gap-2">
            <div className="w-8 h-8 flex justify-center items-center">
              <IoNotifications className='text-white hover:text-secondary-500 w-6 h-6' />
            </div>
          </div>
          <Link href="/profile" className="flex justify-start items-center gap-2">
            <Image alt='Profile' className="w-12 h-12 rounded-full" width={48} height={48} unoptimized src={user.profileImage ?? "https://placehold.co/48x48"}></Image>
          </Link>
        </div>
      ) : (
        <div className="h-10 inline-flex justify-end items-center gap-4">
          <Link href='/auth/login' className="px-6 py-2 rounded-[999px] outline-1 outline-offset-[-1px] outline-neutral-100 hover:bg-secondary-20 flex justify-start items-center gap-2">
            <div className="justify-start text-neutral-100 text-base font-medium font-['Sen'] leading-normal">Log in</div>
          </Link>
          <Link href='/auth/signup' className="px-6 py-2 bg-secondary-500 hover:bg-secondary-700 rounded-[999px] flex justify-start items-center gap-2">
            <div className="justify-start text-neutral-100 text-base font-medium font-['Sen'] leading-normal">Sign Up</div>
          </Link>
        </div>
      )}
    </>
  )
}

export default UserActions