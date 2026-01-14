import Header from '@/components/profile/Header'
import Layout from '@/components/profile/Layout'
import { getDashboardStats } from '@/lib/server/user'
import React from 'react'

const Page = async ({ searchParams }: { searchParams: { page: string } }) => {
  const dashboardStats = await getDashboardStats()
  return (
    <>
      <Header />
      <Layout page={searchParams.page} dashboardStats={dashboardStats} />
    </>
  )
}

export default Page