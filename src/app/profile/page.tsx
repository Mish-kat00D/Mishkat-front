import Header from '@/components/profile/Header'
import Layout from '@/components/profile/Layout'
import React from 'react'

const Page = async ({ searchParams }: { searchParams: { page: string } }) => {
  return (
    <>
      <Header />
      <Layout page={searchParams.page} />
    </>
  )
}

export default Page