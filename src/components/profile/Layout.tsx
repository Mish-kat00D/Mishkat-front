"use client";
import { Bell, ChevronRight, LockKeyhole, MenuIcon, UserRound } from 'lucide-react'
import React, { useState } from 'react'
import Info from './Info'
import Dashboard from './Dashboard'
import Notification from './Notification'
import Security from './Security'
import { BsBarChart } from 'react-icons/bs'
import LogoutButton from './LogoutButton'

const pages = ['Dashboard', 'Profile Info', 'Notifications', 'Security'] as const
type Page = (typeof pages)[number]

const Layout = () => {
  const [activePage, setActivePage] = useState<Page>('Dashboard')

  const renderPage = () => {
    switch (activePage) {
      case 'Profile Info':
        return <Info />
      case 'Dashboard':
        return <Dashboard />
      case 'Notifications':
        return <Notification />
      case 'Security':
        return <Security />
      default:
        return <Dashboard />
    }
  }

  const renderIcon = (page: Page) => {
    switch (page) {
      case 'Profile Info':
        return <UserRound className='w-6 h-6' />
      case 'Dashboard':
        return <BsBarChart className='w-6 h-6' />
      case 'Notifications':
        return <Bell className='w-6 h-6' />
      case 'Security':
        return <LockKeyhole className='w-6 h-6' />
    }
  }

  return (
    <div id='layout' className='container mx-auto flex flex-col md:flex-row justify-between gap-4'>
      {/* SideBar */}
      <div className='bg-primary-900 border border-primary-700 rounded-3xl gap-4 md:w-1/4 w-full overflow-x-auto no-scrollbar whitespace-nowrap max-h-fit'>
        <p className='items-center gap-2 text-white p-4 hidden md:flex'><MenuIcon /> Menu</p>
        <div className="flex md:flex-col gap-4 max-md:m-4 md:mt-5">
          {pages.map((pg) => (
            <button
              key={pg}
              onClick={() => setActivePage(pg)}
              className="text-left w-full"
            >
              <p className={`flex items-center justify-between w-full max-md:border-b-2 md:border-r-2 hover:bg-secondary-10 hover:text-secondary-500 transition px-4 py-2 max-md:hover:border-b-secondary-500 md:hover:border-r-secondary-500 ${activePage === pg ? 'bg-secondary-10 text-secondary-500 max-md:border-b-secondary-500 md:border-r-secondary-500' : 'max-md:border-b-transparent md:border-r-transparent'}`}>
                <span className='flex items-center gap-2'>{renderIcon(pg)}{pg}</span>
                <ChevronRight className='w-4 h-4 hidden md:flex' />
              </p>
            </button>
          ))}
        </div>
        <LogoutButton />
      </div>
      <div className='bg-primary-900 border border-primary-700 rounded-3xl gap-4 md:w-3/4 w-full flex items-center justify-center py-6 px-5'>
        {renderPage()}
      </div>
    </div>
  )
}

export default Layout