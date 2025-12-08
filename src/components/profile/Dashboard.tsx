import { Clock, Star } from 'lucide-react'
import Image from 'next/image'
import React from 'react'
import { PiBookOpenText, PiMedal } from 'react-icons/pi'
import { TbTargetArrow } from 'react-icons/tb'

const Dashboard = () => {
  return (
    <div className='flex flex-col gap-7 items-start w-full'>
      {/* Stats */}
      <div className="flex flex-col gap-4 w-full">
        {/* Header */}
        <div className="flex items-center gap-2">
          {/* Logo */}
          <div className="p-4 rounded-full bg-secondary-10 text-secondary-500">
            <TbTargetArrow className='w-6 h-6' />
          </div>
          {/* Title */}
          <h3 className='text-2xl md:text-3xl text-neutral-100 text-nowrap'>Your Progress So Far</h3>
        </div>
        {/* Cards List */}
        <div className="flex flex-col md:flex-row md:flex-wrap items-center justify-center md:justify-start gap-4">
          {/* Courses Completed Card */}
          <div className="flex items-center gap-2 min-w-[320px] px-4 py-6 rounded-2xl bg-primary-900 border border-primary-800">
            {/* Logo */}
            <div className="p-4 rounded-full bg-secondary-10 text-secondary-500">
              <PiBookOpenText className='w-6 h-6' />
            </div>
            {/* Data */}
            <div className="flex flex-col gap-1 items-start justify-center">
              {/* Title */}
              <div className="text-sm text-neutral-400">Courses Completed</div>
              {/* value */}
              <div className="text-xl text-secondary-500">4</div>
            </div>
          </div>
          {/* Total Hours Learned Card */}
          <div className="flex items-center gap-2 min-w-[320px] px-4 py-6 rounded-2xl bg-primary-900 border border-primary-800">
            {/* Logo */}
            <div className="p-4 rounded-full bg-secondary-10 text-secondary-500">
              <Clock className='w-6 h-6' />
            </div>
            {/* Data */}
            <div className="flex flex-col gap-1 items-start justify-center">
              {/* Title */}
              <div className="text-sm text-neutral-400">Total Hours Learned</div>
              {/* value */}
              <div className="text-xl text-secondary-500">70 <span className="text-sm text-neutral-400">hr</span></div>
            </div>
          </div>
          {/*  Certificates Earned Card */}
          <div className="flex items-center gap-2 min-w-[320px] px-4 py-6 rounded-2xl bg-primary-900 border border-primary-800">
            {/* Logo */}
            <div className="p-4 rounded-full bg-secondary-10 text-secondary-500">
              <PiMedal className='w-6 h-6' />
            </div>
            {/* Data */}
            <div className="flex flex-col gap-1 items-start justify-center">
              {/* Title */}
              <div className="text-sm text-neutral-400">Certificates Earned</div>
              {/* value */}
              <div className="text-xl text-secondary-500">3</div>
            </div>
          </div>
        </div>
      </div>
      {/* Workshopes */}
      <div className="flex flex-col gap-4 w-full">
        {/* Header */}
        <div className="flex items-center gap-2">
          {/* Logo */}
          <div className="p-4 rounded-full bg-secondary-10 text-secondary-500">
            <PiBookOpenText className='w-6 h-6' />
          </div>
          {/* Title */}
          <h3 className='text-2xl md:text-3xl text-neutral-100 text-nowrap'>My Workshops</h3>
        </div>
        {/* Workshop List */}
        <div className="flex flex-col md:flex-row md:flex-wrap items-center justify-center md:justify-start gap-4">
          {/* Workshop */}
          <div className="flex items-start flex-col gap-y-4 w-[318px] h-[567px] pb-6 rounded-2xl bg-primary-900 border border-primary-800">
            {/* Image */}
            <div className="relative w-full h-[259px] overflow-hidden bg-primary-900">
              <Image
                src="https://placehold.co/600x600"
                alt="Course Cover"
                fill
                unoptimized
                className="object-cover object-center w-full h-full rounded-2xl"
                priority
              />
            </div>
            {/* Data - 1 */}
            <div className="flex flex-col items-center max-md:px-2 md:max-w-[90%] gap-6 mx-auto">
              {/* Title & Description */}
              <div className="flex flex-col gap-2 max-w-[90%]">
                {/* Title */}
                <h4 className="text-xl text-white">AI Workflows for Arab Designers</h4>
                {/* Description */}
                <p className="text-xs text-neutral-300">Master AI-powered design tools optimized for Arabic typography and regional architectural styles.</p>
              </div>
              {/* Tools List */}
              <div className="flex items-center justify-start gap-[6px]">
                {/* Tool */}
                <span className="text-xs text-white text-nowrap p-2 rounded-full bg-nois border border-white/25">Midjourney</span>
                <span className="text-xs text-white text-nowrap p-2 rounded-full bg-nois border border-white/25">Dall-E</span>
                <span className="text-xs text-white text-nowrap p-2 rounded-full bg-nois border border-white/25">Stable Diffusion</span>
              </div>
            </div>
            {/* Data - 2 */}
            <div className="gap-y-4 flex flex-col items-center max-md:px-2 md:max-w-[90%] w-full mx-auto">
              {/* Progress Bar */}
              <div className="w-full bg-[#ACAEF766] rounded-full h-4">
                {/* Progress */}
                <div className="w-[70%] h-full rounded-full bg-secondary-500"></div>
              </div>
              {/* Meta Data */}
              <div className="flex items-center justify-between w-full max-md:px-2 md:max-w-[90%]">
                {/* Lessons */}
                <div className="text-xs flex gap-1 text-neutral-300"><PiBookOpenText className="w-4 h-4 text-secondary-500" />10/20</div>
                {/* Time */}
                <div className="text-xs flex gap-1 text-neutral-300"><Clock className="w-4 h-4 text-secondary-500" />10h 20m</div>
                {/* Rating */}
                <div className="text-xs flex gap-1 text-neutral-300"><Star className="w-4 h-4 text-secondary-500" />4.5</div>
              </div>
              {/* Contenue Button */}
              <button className="w-full py-1 px-2 mx-1 rounded-full bg-secondary-500 text-white text-xs">Continue Learning</button>
            </div>
          </div>
          {/* Workshop */}
          <div className="flex items-start flex-col gap-y-4 w-[318px] h-[567px] pb-6 rounded-2xl bg-primary-900 border border-primary-800">
            {/* Image */}
            <div className="relative w-full h-[259px] overflow-hidden bg-primary-900">
              <Image
                src="https://placehold.co/600x600"
                alt="Course Cover"
                fill
                unoptimized
                className="object-cover object-center w-full h-full rounded-2xl"
                priority
              />
            </div>
            {/* Data - 1 */}
            <div className="flex flex-col items-center max-md:px-2 md:max-w-[90%] gap-6 mx-auto">
              {/* Title & Description */}
              <div className="flex flex-col gap-2 max-w-[90%]">
                {/* Title */}
                <h4 className="text-xl text-white">AI Workflows for Arab Designers</h4>
                {/* Description */}
                <p className="text-xs text-neutral-300">Master AI-powered design tools optimized for Arabic typography and regional architectural styles.</p>
              </div>
              {/* Tools List */}
              <div className="flex items-center justify-start gap-[6px]">
                {/* Tool */}
                <span className="text-xs text-white text-nowrap p-2 rounded-full bg-nois border border-white/25">Midjourney</span>
                <span className="text-xs text-white text-nowrap p-2 rounded-full bg-nois border border-white/25">Dall-E</span>
                <span className="text-xs text-white text-nowrap p-2 rounded-full bg-nois border border-white/25">Stable Diffusion</span>
              </div>
            </div>
            {/* Data - 2 */}
            <div className="gap-y-4 flex flex-col items-center max-md:px-2 md:max-w-[90%] w-full mx-auto">
              {/* Progress Bar */}
              <div className="w-full bg-[#ACAEF766] rounded-full h-4">
                {/* Progress */}
                <div className="w-[70%] h-full rounded-full bg-secondary-500"></div>
              </div>
              {/* Meta Data */}
              <div className="flex items-center justify-between w-full max-md:px-2 md:max-w-[90%]">
                {/* Lessons */}
                <div className="text-xs flex gap-1 text-neutral-300"><PiBookOpenText className="w-4 h-4 text-secondary-500" />10/20</div>
                {/* Time */}
                <div className="text-xs flex gap-1 text-neutral-300"><Clock className="w-4 h-4 text-secondary-500" />10h 20m</div>
                {/* Rating */}
                <div className="text-xs flex gap-1 text-neutral-300"><Star className="w-4 h-4 text-secondary-500" />4.5</div>
              </div>
              {/* Contenue Button */}
              <button className="w-full py-1 px-2 mx-1 rounded-full bg-secondary-500 text-white text-xs">Continue Learning</button>
            </div>
          </div>
          {/* Workshop */}
          <div className="flex items-start flex-col gap-y-4 w-[318px] h-[567px] pb-6 rounded-2xl bg-primary-900 border border-primary-800">
            {/* Image */}
            <div className="relative w-full h-[259px] overflow-hidden bg-primary-900">
              <Image
                src="https://placehold.co/600x600"
                alt="Course Cover"
                fill
                unoptimized
                className="object-cover object-center w-full h-full rounded-2xl"
                priority
              />
            </div>
            {/* Data - 1 */}
            <div className="flex flex-col items-center max-md:px-2 md:max-w-[90%] gap-6 mx-auto">
              {/* Title & Description */}
              <div className="flex flex-col gap-2 max-w-[90%]">
                {/* Title */}
                <h4 className="text-xl text-white">AI Workflows for Arab Designers</h4>
                {/* Description */}
                <p className="text-xs text-neutral-300">Master AI-powered design tools optimized for Arabic typography and regional architectural styles.</p>
              </div>
              {/* Tools List */}
              <div className="flex items-center justify-start gap-[6px]">
                {/* Tool */}
                <span className="text-xs text-white text-nowrap p-2 rounded-full bg-nois border border-white/25">Midjourney</span>
                <span className="text-xs text-white text-nowrap p-2 rounded-full bg-nois border border-white/25">Dall-E</span>
                <span className="text-xs text-white text-nowrap p-2 rounded-full bg-nois border border-white/25">Stable Diffusion</span>
              </div>
            </div>
            {/* Data - 2 */}
            <div className="gap-y-4 flex flex-col items-center max-md:px-2 md:max-w-[90%] w-full mx-auto">
              {/* Progress Bar */}
              <div className="w-full bg-[#ACAEF766] rounded-full h-4">
                {/* Progress */}
                <div className="w-[70%] h-full rounded-full bg-secondary-500"></div>
              </div>
              {/* Meta Data */}
              <div className="flex items-center justify-between w-full max-md:px-2 md:max-w-[90%]">
                {/* Lessons */}
                <div className="text-xs flex gap-1 text-neutral-300"><PiBookOpenText className="w-4 h-4 text-secondary-500" />10/20</div>
                {/* Time */}
                <div className="text-xs flex gap-1 text-neutral-300"><Clock className="w-4 h-4 text-secondary-500" />10h 20m</div>
                {/* Rating */}
                <div className="text-xs flex gap-1 text-neutral-300"><Star className="w-4 h-4 text-secondary-500" />4.5</div>
              </div>
              {/* Contenue Button */}
              <button className="w-full py-1 px-2 rounded-full bg-secondary-500 text-white text-xs">Continue Learning</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard