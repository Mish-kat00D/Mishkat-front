'use client'

import { useState } from 'react'
import Link from 'next/link'
import { IoMenu, IoClose } from 'react-icons/io5'
import UserActions from './UserActions'

const MobileMenu = ({
  navItems,
  user,
}: {
  navItems: string[]
  user: any
}) => {
  const [open, setOpen] = useState(false)

  return (
    <>
      {/* Burger Icon */}
      <button
        onClick={() => setOpen(true)}
        className="lg:hidden text-white hover:text-secondary-500"
        aria-label="Open menu"
      >
        <IoMenu size={26} />
      </button>

      {/* Overlay */}
      {open && (
        <div
          className="fixed inset-0 z-40 bg-black/60"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Drawer */}
      <aside
        className={`
          fixed top-0 right-0 z-50 h-full w-[85%] max-w-sm
          bg-primary-900 p-6
          transform transition-transform duration-300
          ${open ? 'translate-x-0' : 'translate-x-full'}
        `}
      >
        {/* Close */}
        <button
          onClick={() => setOpen(false)}
          className="absolute right-5 top-5 text-white"
        >
          <IoClose size={26} />
        </button>

        {/* Nav */}
        <nav className="mt-20 flex flex-col gap-6">
          {navItems.map((item) => (
            <Link
              key={item}
              href={`/#${item.toLowerCase()}`}
              onClick={() => setOpen(false)}
              className="text-white text-lg font-bold hover:text-secondary-500"
            >
              {item}
            </Link>
          ))}
        </nav>

        {/* User Actions */}
        <div className="mt-10">
          <UserActions user={user} />
        </div>
      </aside>
    </>
  )
}

export default MobileMenu
