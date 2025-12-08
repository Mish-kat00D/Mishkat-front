import { BriefcaseBusiness, Camera, Edit } from 'lucide-react'
import Image from 'next/image'
import React from 'react'
import { CiGlobe, CiLocationOn } from 'react-icons/ci'

const Header = () => {
  return (
    <header className="relative w-full bg-primary-900 border border-primary-700 container mx-auto my-4 rounded-3xl overflow-hidden">
      {/* Background Cover Image */}
      <div className="relative h-48 w-full overflow-hidden bg-primary-900">
        <Image
          src="https://placehold.co/1600x600?text=Cover"
          alt="Cover"
          fill
          unoptimized
          className="object-cover object-center"
          priority
        />
      </div>

      <div className="container mx-auto px-4 mb-4">
        {/* Main Content – Avatar + Info + Edit Button */}
        <div className="-mt-6 flex flex-col md:flex-row justify-between items-center gap-6 md:items-end md:justify-between">
          {/* Avatar + Name Section */}
          <div className="flex flex-col items-center gap-6 md:flex-row">
            {/* Avatar */}
            <div className="relative">
              <div className="w-32 h-32 overflow-hidden rounded-full bg-neutral-200 shadow-lg border-2 border-secondary-500">
                <Image
                  src="https://placehold.co/400x400?text=Avatar"
                  alt="Profile"
                  width={128}
                  height={128}
                  className="h-full w-full object-cover"
                />
              </div>
              {/* Edit Avatar Pencil – hidden on small screens */}
              <button className="absolute bottom-2 right-2 flex h-8 w-8 items-center justify-center rounded-full bg-secondary-500 text-white shadow-md transition hover:bg-secondary-400">
                <Camera className="h-6 w-6" />
              </button>
            </div>

            {/* Name, Title, Company */}
            <div className="text-center self-end md:text-left">
              <h1 className="text-3xl font-bold text-white">John Doe</h1>
              <p className="text-lg text-neutral-100!">Senior Product Designer</p>
              <p className="text-lg text-neutral-100!">Acme Corporation</p>
            </div>
          </div>

          {/* Edit Profile Button */}
          <button className="justify-center self-center items-center gap-2 rounded-full bg-secondary-500 px-5 py-3 font-medium text-white transition hover:bg-secondary-700 flex">
            <Edit className="h-4 w-4" />
            Edit Profile
          </button>
        </div>

        {/* Biography */}
        <div className="mt-6 text-center md:text-left text-neutral-700 dark:text-neutral-300">
          <p className="text-base leading-relaxed">
            Passionate designer focused on creating intuitive and beautiful digital experiences.
            Love coffee, minimalist UI, and long walks on the beach with Figma open.
          </p>
        </div>

        {/* Info Rows – Work, Location, Website */}
        <div className="mt-8 flex flex-col gap-4 text-neutral-600 w-max dark:text-neutral-400 md:flex-row justify-center md:justify-start max-md:mx-auto">
          <div className="flex items-center gap-3">
            <BriefcaseBusiness className="h-5 w-5 text-primary-500" />
            <span>Acme Corporation</span>
          </div>
          <div className="flex items-center gap-3">
            <CiLocationOn className="h-5 w-5 text-primary-500" />
            <span>San Francisco, CA</span>
          </div>
          <div className="flex items-center gap-3">
            <CiGlobe className="h-5 w-5 text-primary-500" />
            <a
              href="https://example.com"
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-4 hover:text-primary-500 transition"
            >
              example.com
            </a>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header