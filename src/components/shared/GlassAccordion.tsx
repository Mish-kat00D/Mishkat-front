"use client"
import React, { useState } from 'react'
import { ChevronDown, ChevronUp } from 'lucide-react'

const GlassAccordion = ({ title, content, name }: { title: string, content: string, name: string }) => {
  const [open, setOpen] = useState(false)
  return (
    <div className='w-full! h-max! rounded-2xl px-6 glass'>
      <details name={name} className='w-full' onToggle={() => setOpen(!open)}>
        <summary className='flex items-center justify-between h-[66px]'>
          <h2 className='text-lg text-white'>{title}</h2>
          {open ? <ChevronUp className='text-secondary-500' size={20} /> : <ChevronDown className='text-secondary-500' size={20} />}
        </summary>
        <p className='my-4 text-[#99A1Af] text-lg'>
          {content}
        </p>
      </details>
    </div>
  )
}

export default GlassAccordion