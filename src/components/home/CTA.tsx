import React from 'react'

const CTA = () => {
  return (
    <section className="mt-20 md:mt-32">
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
        <button className=" px-6 py-3 bg-secondary-500 rounded-full flex justify-center items-center gap-2 hover:opacity-90 transition">
          <span className="text-white text-lg font-bold leading-relaxed">
            Get Started
          </span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="w-6 h-6 text-white"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </section>
  )
}

export default CTA