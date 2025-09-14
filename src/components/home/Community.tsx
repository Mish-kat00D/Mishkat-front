import React from 'react'
import SectionHeader from './SectionHeader'
import Discord from './Discord'
import { MdMicNone } from 'react-icons/md'
import DiscordIco from '../../../public/Discord.svg'
import Image from 'next/image'
import { SlVolume2 } from 'react-icons/sl'
import { FaAngleRight } from 'react-icons/fa'

const Community = () => {
  return (
    <section id='community' className="w-full mt-24 p-4">
      <div className="container mx-auto flex flex-col justify-start items-center gap-8">
        <SectionHeader title="Community & Mentorship" description="Join our thriving Discord community where all mentorship, collaboration, and learning happens in real-time." />
        <div className="flex flex-col justify-start items-center max-w-full gap-4">
          <Discord />
          <div className="w-full flex flex-col items-center gap-4">
            {/* Voice Channels Section */}
            <div className="w-full p-4 bg-primary-1000 rounded-2xl shadow-[0px_4px_25px_1px_rgba(0,0,0,0.35)] outline-1 outline-offset-[-1px] outline-indigo-300/10 flex flex-col gap-6">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-3.5">
                  {/* Icon Placeholder */}
                  <MdMicNone className="w-6 h-6 text-neutral-300 " />
                  <div className="text-neutral-100 text-base font-semibold">Voice Channels</div>
                </div>
                <div className="text-primary-200 text-base font-semibold">Live now</div>
              </div>

              <div className="flex gap-4 max-md:flex-col">
                {/* Rooms */}
                {
                  [
                    {
                      title: "Parametric Design Session",
                      participants: "8 participants",
                      status: "Starts in 45m"
                    },
                    {
                      title: "Project Feedback Room",
                      participants: "3 participants",
                      status: "Active now"
                    },
                  ].map((room, index) => (
                    <div key={index} className="px-4 py-3 bg-primary-900 rounded-lg shadow-[0px_4px_20px_rgba(0,0,0,0.40)] outline-1 outline-offset-[-1px] outline-indigo-300/10 flex items-center gap-2">
                      <div className="p-2 bg-secondary-10 rounded-full">
                        <SlVolume2 className="w-6 h-6 text-secondary-500" />
                      </div>
                      <div className="flex flex-col gap-1">
                        <div className="text-neutral-100 text-sm font-bold">{room.title}</div>
                        <div className="flex gap-2 text-white text-xs">
                          <span>{room.participants}</span>
                          <span>{room.status}</span>
                        </div>
                      </div>
                    </div>
                  )
                  )
                }
              </div>
            </div>

            {/* Join Discord CTA */}
            <div className="flex flex-col items-center gap-6 md:max-w-1/2">
              <button className=" h-11 px-6 py-5 bg-secondary-500 hover:bg-secondary-800 rounded-full flex justify-center items-center gap-2">
                <Image src={DiscordIco} alt="discord" className="w-6 h-4" />
                <div className="text-white text-lg font-bold text-nowrap">Join Our Discord Community</div>
                <FaAngleRight className="text-white font-extralight" />
              </button>
              <div className="text-center text-neutral-300 text-xl font-medium leading-loose">
                Connect with mentors, collaborate on projects, and join our growing
                community of over 5,000 architects and designers.
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Community