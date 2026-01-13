import React from 'react'
import ExploreMoreButton from './ExploreMoreButton'

const Hero = () => {
  return (
    <>
      <section id="home" className="container mx-auto px-2 mt-8 relative flex max-lg:flex-col justify-center items-center gap-5 md:gap-8">
        <div className="flex flex-col justify-center items-center text-center gap-5">
          <div className="flex justify-start items-center gap-2">
            <span className='w-8 h-1 bg-secondary-500'></span>
            <p className='text-secondary-500 text-lg'>MISHKAT PLATFORM</p>
          </div>
          <h1 className='text-4xl md:text-6xl text-white font-bold max-md:text-center'>Empowering Arab Designers to Lead the Creative World</h1>
          <p className='text-xl text-neutral-400 max-md:text-center'>Join interactive workshops and courses across all design disciplines</p>
          <div className="flex justify-start items-center max-md:flex-col max-md:justify-center max-md:w-full">
            <ExploreMoreButton />
          </div>
        </div>
      </section>
    </>
  )
}

export default Hero