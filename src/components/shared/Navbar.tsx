"use client";
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import NavLogo from '../../../public/NavLogo.png'
import { useAuth } from '@/lib/context/AuthContext'
import { IoMenu, IoNotifications } from 'react-icons/io5';
import isMobileOrTablet from '@/lib/is-mobile-or-tablet';
import { useDeviceType } from '@/lib/hooks/useDeviceType';

const Navbar = () => {
  const { user, login, logout } = useAuth();
  const navItems = ['Programs', 'Courses', 'Community', 'About'];

  return (
    <div className="w-full position-sticky px-14 py-3.5 bg-primary-900 text-red-700 flex justify-between items-center overflow-hidden">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex justify-center items-center gap-4">
            <Link href="/" className="flex justify-center items-center gap-2">
                <Image src={NavLogo} alt="Logo" width={132.66} height={60} />
            </Link>
        </div>
        {useDeviceType() === "desktop" ? (
          <>
            <div className="w-[463px] flex justify-start items-center gap-6">
            {navItems.map((item, index) => (
              <NavItem key={index} text={item} href={`/#${item.toLowerCase()}`} />
            ))}
            </div>
            <>
              {user ? (
                <div className="flex justify-end items-center gap-4">
                  <div className="p-2 bg-Primary-900 rounded-lg outline-1 outline-offset-[-1px] outline-indigo-300/20 flex justify-start items-center gap-2">
                      <div className="w-8 h-8 flex justify-center items-center">
                          <IoNotifications className='text-white hover:text-secondary-500 w-6 h-6' />
                      </div>
                  </div>
                  <Link href="/profile" className="flex justify-start items-center gap-2">
                      <Image alt='Profile' className="w-12 h-12 rounded-full" width={48} height={48} unoptimized src="https://placehold.co/48x48"></Image>
                  </Link>
                </div>
              ) : (
                <div className="h-10 inline-flex justify-end items-center gap-4">
                  <button onClick={login} className="px-6 py-2 rounded-[999px] outline-1 outline-offset-[-1px] outline-neutral-100 hover:bg-secondary-20 flex justify-start items-center gap-2">
                    <div className="justify-start text-neutral-100 text-base font-medium font-['Sen'] leading-normal">Log in</div>
                  </button>
                  <button className="px-6 py-2 bg-secondary-500 hover:bg-secondary-700 rounded-[999px] flex justify-start items-center gap-2">
                    <div className="justify-start text-neutral-100 text-base font-medium font-['Sen'] leading-normal">Sign Up</div>
                  </button>
                </div>
              )}
            </>
          </>) : (
            <IoMenu  className='text-white hover:text-secondary-500 w-6 h-6'/>
          )}
      </div>
    </div>
  )
}

const NavItem = ({ text, href }: { text: string, href: string }) => {
  return (
    <div data-property-1="Default" className="flex justify-center items-center gap-2">
        <Link href={href} className="justify-start text-white hover:text-secondary-500 text-xl font-bold font-['Sen']">{text}</Link>
    </div>
  )
}

export default Navbar
