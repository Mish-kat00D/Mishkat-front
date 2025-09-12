import React from 'react'
import { IoFlash } from 'react-icons/io5'
import Image from 'next/image'
import HeroImg from '../../../public/HeroImg.png'
import { PiStarFourFill } from 'react-icons/pi'
import { HiOutlineCpuChip } from 'react-icons/hi2'
import { GoPeople, GoVerified } from 'react-icons/go'
import { SlGlobe } from 'react-icons/sl'
import RedSpot from '../shared/RedSpot'

const Hero = () => {
  return (
    <>
      <section id="home" className="container mx-auto my-8 relative flex max-lg:flex-col justify-between items-center gap-5 md:gap-8">
        <div className="flex flex-col justify-center items-start lg:max-w-5/12 gap-5">
          <div className="flex justify-start items-center gap-2">
            <span className='w-8 h-1 bg-secondary-500'></span>
            <p className='text-secondary-500 text-lg'>MISHKAT PLATFORM</p>
          </div>
          <h1 className='text-4xl md:text-6xl text-white font-bold'>Build the Future of Design with AI</h1>
          <p className='text-xl text-neutral-400'>Mishkat offers immersive AI-powered design education, real architectural studio experiences, and tools for the next generation of architects.</p>
          <div className="flex justify-start items-center gap-4">
            <button className='bg-secondary-500 text-white text-lg px-8 py-2 rounded-7'>Join the Studio Program</button>
            <button className='border border-neutral-100 text-neutral-100 text-lg px-8 py-2 rounded-7'>Explore Courses</button>
          </div>
        </div>
        <RedSpot cl='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2' />
        <div className="relative mr-4">
          <Image
            src={HeroImg}
            alt="Hero Image"
            className="w-[342px] h-[382] md:w-[488px] md:h-[507px] lg:h-[545px] rounded-2xl object-cover"
            // width={524}
            // height={545}
          />
          <div className="absolute flex items-center justify-center gap-2 p-2 top-7 -right-3 h-9 bg-white-200 bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-0 outline-1 ou  rounded-5 ">
            <PiStarFourFill className='icon' />
            <p className='text-sm text-white font-bold'>AI Analysis Active </p>
          </div>
          <div className="absolute flex items-center justify-center gap-2 p-2 bottom-5 -left-7 h-9 bg-white-200 bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-0 outline-1 ou  rounded-5 ">
            <IoFlash className='icon' />
            <p className='text-sm text-white font-bold'>Structural Integrity: 98%</p>
          </div>
        </div>
      </section>

      <div className="bg-primary-900 border-t border-t-primary-800 mt-32 min-w-full p-5">
        <div className="container mx-auto flex justify-between items-center flex-wrap gap-5">
          <div className="flex gap-2 items-start justify-center">
            <HiOutlineCpuChip className='icon'/>
            <p className='text-lg text-white font-bold'>AI-Powered Design Tools</p>
          </div>
          <div className="flex gap-2 items-start justify-center">
            <GoPeople  className='icon'/>
            <p className='text-lg text-white font-bold'>Collaborative Studios</p>
          </div>
          <div className="flex gap-2 items-center justify-center">
            <GoVerified className='icon'/>
            <p className='text-lg text-white font-bold'>Industry Certification</p>
          </div>
          <div className="flex gap-2 items-center justify-center">
            <SlGlobe className='icon'/>
            <p className='text-lg text-white font-bold'>Arabic-First Education</p>
          </div>
        </div>
      </div>
    </>
  )
}

export default Hero