"use client"
import Link from 'next/link'
import React from 'react'

const FooterLink = ({ item }: { item: { name: string, href: string } }) => {
  return (
    <div data-property-1="Default" className="flex justify-center items-center gap-2">
      <Link href={item.href} className="justify-start text-white hover:text-secondary-500 text-xl font-bold font-['Sen']">{item.name}</Link>
    </div>
  )
}

export default FooterLink