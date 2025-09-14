import React from 'react'

const SectionHeader = ({title, description}: {title: string, description: string}) => {
  return (
    <div className="flex flex-col justify-start items-center gap-6">
      <div className="w-full flex flex-col justify-start items-center gap-2">
        <div className="justify-start text-center text-white text-4xl md:text-6xl font-bold font-['Sen']">{title}</div>
        <div className="w-32 h-1 rounded-full! bg-secondary-500" />
      </div>
      <div className="text-center justify-start text-neutral-300 text-xl font-normal font-['Sen'] leading-loose">{description}</div>
    </div>
  )
}

export default SectionHeader