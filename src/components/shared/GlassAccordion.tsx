"use client"
import React, { useState } from 'react'
import GlassSurface from './Glass'
import { ChevronDown, ChevronUp } from 'lucide-react'

const GlassAccordion = ({ title, content }: { title: string, content: string }) => {
  const [open, setOpen] = useState(false)
  return (
    <GlassSurface blur={20} displace={20} brightness={50} className='w-full! h-max! rounded-2xl px-6'>
      <details className='w-full' onToggle={() => setOpen(!open)}>
        <summary className='flex items-center justify-between h-[66px]'>
          <h2 className='text-lg text-white'>{title}</h2>
          {open ? <ChevronUp className='text-secondary-500' size={20} /> : <ChevronDown className='text-secondary-500' size={20} />}
        </summary>
        <p className='my-4 text-[#99A1Af] text-lg'>
          {content}
        </p>
      </details>
    </GlassSurface>
  )
}

export default GlassAccordion