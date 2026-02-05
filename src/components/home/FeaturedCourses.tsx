"use client"
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import SectionHeader from './SectionHeader'
import Link from 'next/link'
import { FaAngleRight } from 'react-icons/fa'
import { useWorkshops } from '@/lib/hooks/useWorkshops'

const FeaturedCourses = () => {
  const { getWorkshops } = useWorkshops()
  const [isLoading, setisLoading] = useState(true)
  const [workshops, setWorkshops] = useState<{
    id: string,
    slug: string,
    imageUrl: string | null,
    title: string,
    description: string,
    tools: { name: string }[]
  }[]>([])

  useEffect(() => {
    const fetchWorkshops = async () => {
      try {
        const data = await getWorkshops()
        setWorkshops(data.data)
        setisLoading(false)
      } catch (error) {
        console.error('Error fetching workshops:', error)
        setisLoading(false)
      }
    }
    fetchWorkshops()
  }, [getWorkshops])

  return (
    <section id="workshops" className="min-w-full mt-20 md:mt-32">
      <div className="container mx-auto flex flex-col justify-start items-center gap-12">
        <SectionHeader title="Workshops" description="Design in Every Way, For Everyone" />
        <div className="container mx-auto flex flex-nowrap overflow-x-auto no-scrollbar justify-evenly items-center lg:items-stretch gap-4">
          {isLoading ? (
            Array.from({ length: 3 }).map((_, index) => (
              <CourseCardSkeleton key={index} />
            ))
          ) : (
            workshops?.map((card, index) => (
              <CourseCard key={index} image={card.imageUrl} title={card.title} description={card.description} slug={card.slug} tags={card.tools} />
            ))
          )}
        </div>
      </div>
    </section>
  )
}

const CourseCardSkeleton = () => (
  <div className="relative lg:h-[444px] min-h-[390px] w-1/3 min-w-[300px] max-lg:container max-lg:mx-auto overflow-hidden rounded-2xl max-sm:rounded-xl bg-primary-900/50 animate-pulse flex flex-col">
    <div className="h-58 max-sm:h-48 w-full bg-primary-800/50" />
    <div className="p-6 flex flex-col gap-4 flex-1">
      <div className="h-6 bg-primary-800/50 rounded w-3/4" />
      <div className="space-y-2">
        <div className="h-4 bg-primary-800/50 rounded w-full" />
        <div className="h-4 bg-primary-800/50 rounded w-5/6" />
      </div>
      <div className="mt-auto flex gap-2">
        <div className="h-6 w-16 bg-primary-800/50 rounded-full" />
        <div className="h-6 w-16 bg-primary-800/50 rounded-full" />
      </div>
    </div>
  </div>
)

const CourseCard = ({ image, title, description, tags, slug }: { image: any, title: string, description: string, tags: { name: string }[], slug: string }) => {
  return (
    <div className="group mobile-hover relative lg:h-[444px] min-h-[390px] w-1/3 min-w-[300px] max-lg:container max-lg:mx-auto overflow-hidden rounded-2xl max-sm:rounded-xl bg-primary-900 shadow-[0px_4px_15px_rgba(0,0,0,0.30)] outline-1 outline-[rgba(172,174,247,0.20)] -outline-offset-1 transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_20px_60px_rgba(0,0,0,0.35)] hover:outline-[rgba(172,174,247,0.40)] flex flex-col">
      <div className="relative h-58 image-hover transition-all duration-500 ease-in-out max-sm:h-48 w-full overflow-hidden">
        <Image
          alt="course image"
          src={image ?? `https://placehold.co/800?text=${title.split(' ').join('+')}&font=Poppins`}
          fill
          unoptimized
          className="object-cover"
          sizes="100vw"
        />
      </div>

      <div className="relative z-10 content-hover md:p-6 p-4 flex flex-col justify-between items-start flex-1">
        <div className="flex flex-col">
          <h3 className="text-white text-xl max-sm:text-lg font-sen font-bold mb-2 line-clamp-2">
            {title}
          </h3>
          <p className="text-neutral-300 text-sm max-sm:text-xs font-medium leading-relaxed mb-2 line-clamp-3">
            {description}
          </p>
        </div>

        <div className="flex flex-nowrap gap-2 tags-hover max-sm:gap-1 mb-4">
          {tags.map((tag, index) => (
            <span
              key={index}
              className="px-2 py-1 bg-white/10 rounded-full outline-1 outline-white/25 -outline-offset-1 backdrop-blur-[30px] text-white text-xs max-sm:text-xs font-sen leading-tight whitespace-nowrap transition-all duration-500 group-hover:bg-white/20"
            >
              {tag.name}
            </span>
          ))}
        </div>

        <Link href={`/workshop/${slug}`} className="w-full flex items-center justify-center gap-2 rounded-full bg-secondary-500 px-5 py-3 max-sm:py-2 font-sen font-medium max-sm:text-sm text-white transition-all duration-300 hover:bg-secondary-600 hover:shadow-lg active:transform active:scale-95">
          <FaAngleRight className="text-white font-extralight transition-transform duration-300 group-hover:translate-x-1" />
          Explore
        </Link>
      </div>
    </div>
  );
};

export default FeaturedCourses