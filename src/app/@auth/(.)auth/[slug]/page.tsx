import AuthModal from '@/components/auth/AuthModal';
import React from 'react'

export async function generateStaticParams() {
  return [
    { slug: 'login' },
    { slug: 'signup' },
    { slug: 'forget-password' },
    { slug: 'verify-code' },
    { slug: 'reset-password' },
    { slug: 'reset-password-success' },
  ]
}

const Page = async ({ params }: { params: Promise<{ slug: string }> }) => {
  let { slug } = await params
  slug = ['signup', 'login', 'forget-password', 'verify-code', 'reset-password' , 'reset-password-success'].includes(slug) ? slug : 'signup';
  console.log(slug)
  return (
    <AuthModal slug={slug as 'login' | 'signup' | 'forget-password' | 'verify-code' | 'reset-password' | 'reset-password-success'} />
  ) 
}

export default Page