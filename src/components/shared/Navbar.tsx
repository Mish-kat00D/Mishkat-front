import Image from 'next/image'
import Link from 'next/link'
import React, { Suspense } from 'react'
import NavLogo from '../../../public/NavLogo.svg'
import UserActions from './UserActions';
import MobileMenu from './MobileMenu';

const Navbar = async () => {
  const navItems = ['Workshops', 'About'];

  return (
    <div className="w-full position-fixed top-0 h-[90px] px-14 py-3.5 bg-primary-900 text-red-700 flex justify-between items-center overflow-hidden">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex justify-center items-center gap-4">
          <Link href="/" className="flex justify-center items-center gap-2">
            <Image src={NavLogo} alt="Logo" width={132.66} height={60} />
          </Link>
        </div>
        <div className="w-[463px] max-lg:hidden flex justify-center items-center gap-6">
          {navItems.map((item, index) => (
            <NavItem key={index} text={item} href={`/#${item.toLowerCase()}`} />
          ))}
        </div>
        <div className="max-lg:hidden flex justify-start items-center gap-6">
          <Suspense fallback={null}>
            <UserActions />
          </Suspense>
        </div>
        <MobileMenu navItems={navItems} />
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
