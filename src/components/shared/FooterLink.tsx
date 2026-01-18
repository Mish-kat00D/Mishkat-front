"use client"
import React from 'react'

const FooterLink = ({ item }: { item: { name: string, href: string } }) => {
  return (
    <button
      key={item.name}
      onClick={() => {
        window.scrollTo({ top: document.getElementById(item.href)?.offsetTop, behavior: 'smooth' })
      }}
      className="text-neutral-300 text-base font-semibold cursor-pointer hover:text-white transition"
    >
      {item.name}
    </button>
  )
}

export default FooterLink