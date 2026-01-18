import { Bell, ChevronRight, LockKeyhole, MenuIcon, UserRound } from 'lucide-react'
import React from 'react'
import Info from './Info'
import Dashboard from './Dashboard'
import Notification from './Notification'
import Security from './Security'
import { BsBarChart } from 'react-icons/bs'
import Link from 'next/link'
import LogoutButton from './LogoutButton'

const Layout = ({ page, dashboardStats }: { page: string, dashboardStats?: any }) => {
  const pages = ['Dashboard', 'Profile Info', 'Notifications', 'Security'] as const
  type Page = (typeof pages)[number]

  const renderPage = () => {
    switch (page) {
      case 'Profile Info':
        return <Info />
      case 'Dashboard':
        return <Dashboard data={dashboardStats} />
      case 'Notifications':
        return <Notification />
      case 'Security':
        return <Security />
      default:
        return <Dashboard data={dashboardStats} />
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
        {/* <ChevronRight className='w-4 h-4 md:hidden flex absolute pointer-events-none top-1/2 -translate-y-1/2 right-2 z-10' /> */}
        <p className='items-center gap-2 text-white p-4 hidden md:flex'><MenuIcon /> Menu</p>
        <div className="flex md:flex-col gap-4 max-md:m-4 md:mt-5">
          {pages.map((pg) => (
            <Link href={`/profile?page=${pg}#layout`} key={pg}>
              <p className={`flex items-center justify-between w-full max-md:border-b-2 md:border-r-2 hover:bg-secondary-10 hover:text-secondary-500 transition px-4 py-2 max-md:hover:border-b-secondary-500 md:hover:border-r-secondary-500 ${page == pg ? 'bg-secondary-10 text-secondary-500 max-md:border-b-secondary-500 md:border-r-secondary-500' : 'max-md:border-b-transparent md:border-r-transparent'}`}><span className='flex items-center gap-2'>{renderIcon(pg)}{pg}</span><ChevronRight className='w-4 h-4 hidden md:flex' /></p>
            </Link>
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