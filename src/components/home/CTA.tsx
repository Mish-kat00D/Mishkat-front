import React from 'react'
import CTAButton from './CTAButton'

const CTA = () => {
  return (
    <section id="CTA" className="mt-20 md:mt-32">
      <div className='relative container! mx-auto px-4 h-max! glass flex! flex-col! items-center gap-8 p-7!'>
        {/* Title + Subtitle */}
        <div className="flex flex-col items-center gap-4 text-center md:max-w-1/2">
          <h2 className="text-white text-5xl font-bold">
            Ready to Transform Your Design Career?
          </h2>
          <p className="text-neutral-300 text-2xl font-medium leading-9">
            Join to learn faster, build better, and connect with top mentors all in all design disciplines
          </p>
        </div>

        {/* CTA Button */}
        <CTAButton />
      </div>
    </section>
  )
}

export default CTA