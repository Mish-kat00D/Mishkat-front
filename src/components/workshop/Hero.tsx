import { Workshop } from '@/types/workshop'
import { Calendar, CircleCheck, Clock } from 'lucide-react'
import Image from 'next/image'
import React from 'react'
import { GoPeople } from 'react-icons/go'

const Hero = ({ workshop }: { workshop: Workshop }) => {
  const {
    title,
    subtitle,
    imageUrl,
    instructor,
    price,
    originalPrice,
    currency,
    durationHours,
    // startDate, // TODO: Add to backend
    // endDate,   // TODO: Add to backend
    // seats,     // TODO: Add to backend
  } = workshop

  const discount = originalPrice ? originalPrice - price : 0

  return (
    <div className="flex flex-col justify-start items-center gap-6 w-full my-4">
      <div className="flex flex-col justify-start items-start gap-2 w-full">
        <h1 className='text-[40px] font-bold text-white'>{title}</h1>
        <p className='text-neutral-200 text-xl'>{subtitle || workshop.description.split('\n')[0]}</p>
      </div>
      <div className="flex flex-col lg:flex-row justify-between items-stretch gap-4 w-full">
        <div className="relative lg:flex-1 max-lg:w-full self-stretch min-h-[543px]">
          <Image
            src={imageUrl || "/workshop.png"}
            alt={title}
            fill
            unoptimized
            className='object-cover rounded-2xl h-full'
          />
        </div>
        <div className="flex flex-col justify-between items-center max-lg:w-full h-full px-6 py-6 border border-[#3034EB33] shadow-[0_4px_15px_rgba(0,0,0,0.40)] bg-primary-1000 rounded-2xl">
          <div className="flex flex-col justify-start items-start gap-6 w-full">
            <div className='flex flex-col justify-start items-start gap-6 w-full'>
              <div className="border-b border-b-secondary-500 pb-4 w-full flex justify-start items-center gap-3">
                <div className="relative w-16 h-16 flex-shrink-0">
                  <Image
                    src={instructor?.imgUrl || "/Ahmed.png"}
                    alt={instructor?.name || "Instructor"}
                    fill
                    unoptimized
                    className='object-cover rounded-full'
                  />
                </div>
                <div className='flex flex-col justify-start items-start gap-0.5'>
                  <h3 className='text-neutral-200 font-semibold text-base'>{instructor?.name}</h3>
                  <p className='text-neutral-300 text-sm font-normal'>{instructor?.title}</p>
                </div>
              </div>
              <div className='flex justify-start items-start gap-4 flex-wrap w-full'>
                <div className='flex justify-start items-center gap-2'>
                  <GoPeople className="text-secondary-500 w-5 h-5 flex-shrink-0" />
                  <span className="text-neutral-100 text-sm font-medium">Limited Seats</span>
                </div>
                {/* <div className='flex justify-start items-center gap-2'>
                  <Calendar className="text-secondary-500 w-5 h-5 flex-shrink-0" />
                  <span className="text-neutral-100 text-sm font-medium">March 15–21</span>
                </div> */}
                {durationHours && (
                  <div className='flex justify-start items-center gap-2'>
                    <Clock className="text-secondary-500 w-5 h-5 flex-shrink-0" />
                    <span className="text-neutral-100 text-sm font-medium">{durationHours} hours</span>
                  </div>
                )}
              </div>
            </div>
            <div className='flex flex-col justify-start items-start gap-2 w-full'>
              <div className='flex justify-start items-center gap-4'>
                <span className="text-3xl font-bold text-secondary-500">{price} {currency}</span>
                {originalPrice && (
                  <span className="text-base font-normal text-white/40 line-through">{originalPrice} {currency}</span>
                )}
              </div>
              {discount > 0 && (
                <p className='text-base font-medium text-white/70'>Save {discount} {currency} with our offer!</p>
              )}
            </div>
            <div className='flex flex-col justify-start items-start gap-3 w-full'>
              <div className='flex justify-start items-center gap-3'>
                <CircleCheck className='w-5 h-5 text-secondary-500 flex-shrink-0' />
                <span className='text-base font-medium text-white/80'>{durationHours || 8} hours of content</span>
              </div>
              <div className='flex justify-start items-center gap-3'>
                <CircleCheck className='w-5 h-5 text-secondary-500 flex-shrink-0' />
                <span className='text-base font-medium text-white/80'>Lifetime access</span>
              </div>
              <div className='flex justify-start items-center gap-3'>
                <CircleCheck className='w-5 h-5 text-secondary-500 flex-shrink-0' />
                <span className='text-base font-medium text-white/80'>Unreal Engine 5</span>
              </div>
              <div className='flex justify-start items-center gap-3'>
                <CircleCheck className='w-5 h-5 text-secondary-500 flex-shrink-0' />
                <span className='text-base font-medium text-white/80'>Private community access</span>
              </div>
            </div>
          </div>
          <button className='w-full py-3 px-6 bg-secondary-500 rounded-full text-white font-bold text-lg mt-6 hover:bg-secondary-600 transition-colors'>
            Book Now
          </button>
        </div>
      </div>
    </div>
  )
}

export default Hero