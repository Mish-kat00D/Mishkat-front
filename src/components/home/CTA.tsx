import React from 'react'
import RedSpot from '../shared/RedSpot'

const CTA = () => {
  return (
    <section className="min-w-full relative container mx-auto px-4 mt-20 flex flex-col items-center gap-8">
      <RedSpot cl='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 !w-1/3 min-w-[300px]' />
      {/* Title + Subtitle */}
      <div className="flex flex-col items-center gap-4 text-center md:max-w-1/2">
        <h2 className="text-white text-5xl font-bold">
          Ready to Transform Your Architectural Career with AI?
        </h2>
        <p className="text-neutral-300 text-2xl font-medium leading-9">
          Join 5,000+ architects and designers learning faster, building better,
          and connecting with top mentors — all in one AI-powered platform.
        </p>
      </div>

      {/* CTA Button */}
      <button className=" px-6 py-3 bg-secondary-500 rounded-full flex justify-center items-center gap-2 hover:opacity-90 transition">
        <span className="text-white text-lg font-bold leading-relaxed">
          Get Started For Free
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
    </section>
  )
}

export default CTA