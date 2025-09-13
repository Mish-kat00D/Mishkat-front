import Image from 'next/image'
import React from 'react'
import Course1Img from '../../../public/course-1.png'
import Course2Img from '../../../public/course-2.png'
import Course3Img from '../../../public/course-3.png'
import SectionHeader from './SectionHeader'
import Link from 'next/link'
import { FaAngleRight } from 'react-icons/fa'

const FeaturedCourses = () => {
  const CardsData = [
    {
      image: Course1Img,
      title: "AI Workflows for Arab Designers",
      description: "Master AI-powered design tools optimized for Arabic typography and regional architectural styles.",
      link: '/course/1',
      tags: ['Midjourney', 'DALL-E', 'Stable Diffusion']
    },
    {
      image: Course2Img,
      title: "Interactive Prototyping for Architects",
      description: "Create immersive architectural experiences with real-time rendering and interactive elements.",
      link: '/course/1',
      tags: ['Unreal Engine', 'Unity', 'WebXR']
    },
    {
      image: Course3Img,
      title: "Computational Design and Digital Fabrication",
      description: "Learn parametric modeling techniques and prepare designs for digital fabrication methods.",
      link: '/course/1',
      tags: ['Grasshopper', 'Rhino', '3D Printing']
    }
  ]
  return (
    <section id="courses" className="min-w-full mt-40">
      <div className="container mx-auto flex flex-col justify-start items-center gap-12">
        <SectionHeader title="Featured Courses" description="Discover our most popular courses designed to equip you with cutting-edge skills for the future of architecture." />
        <div className="container mx-auto flex max-lg:flex-col px-2 justify-between items-center lg:items-stretch gap-4">
          {CardsData.map((card, index) => (
            <CourseCard key={index} image={card.image} title={card.title} description={card.description} link={card.link} tags={card.tags}/>
          ))}
        </div>
      </div>
    </section>
  )
}

const CourseCard = ({ image, title, description, tags, link }: { image: any, title: string, description: string, tags: string[], link: string }) => {
  return (
    <div className="group relative lg:h-[444px] min-h-[390px] max-lg:container max-lg:mx-auto overflow-hidden rounded-2xl max-sm:rounded-xl bg-primary-900 shadow-[0px_4px_15px_rgba(0,0,0,0.30)] outline-1 outline-[rgba(172,174,247,0.20)] -outline-offset-1 transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_20px_60px_rgba(0,0,0,0.35)] hover:outline-[rgba(172,174,247,0.40)] flex flex-col">
      {/* Image Container */}
      <div className="relative h-58  transition-all duration-500 ease-in-out group-hover:h-48 max-sm:h-48 w-full overflow-hidden">
        <Image
          alt="course image"
          src={image ?? "https://placehold.co/429x287"}
          fill
          className="object-cover"
          sizes="100vw"
        />
      </div>

      {/* Content Container */}
      <div className="relative z-10 md:p-6 p-4 flex flex-col justify-between items-start transition-all duration-500 ease-in-out group-hover:-translate-y-4 md:group-hover:-translate-y-4 flex-1">
        {/* Sliding Content */}
        <div className="flex flex-col">
          <h3 className="text-white text-xl max-sm:text-lg font-sen font-bold mb-2 line-clamp-2">
            {title}
          </h3>
          <p className="text-neutral-300 text-sm max-sm:text-xs font-medium leading-relaxed mb-2 line-clamp-3">
            {description}
          </p>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 max-sm:gap-1 transition-all duration-500 ease-in-out group-hover:-translate-y-8">
          {tags.map((tag, index) => (
            <span
              key={index}
              className="px-2 py-1 bg-white/10 rounded-full outline-1 outline-white/25 -outline-offset-1 backdrop-blur-[30px] text-white text-xs max-sm:text-xs font-sen leading-tight whitespace-nowrap transition-all duration-500 group-hover:bg-white/20"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* CTA Button */}
      <div className="pointer-events-none absolute inset-x-0 p-4 bottom-0 z-20 max-sm:p-2">
        <Link href={link} className="pointer-events-auto w-full flex items-center justify-center gap-2 rounded-full bg-secondary-500 px-5 py-3 max-sm:py-2 font-sen font-medium max-sm:text-sm text-white transition-all duration-500 ease-in-out translate-y-6 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 hover:bg-secondary-600 hover:shadow-lg active:transform active:scale-95">
          <FaAngleRight className="text-white font-extralight transition-transform duration-500 ease-in-out group-hover:translate-x-1" />
          Explore
        </Link>
      </div>
    </div>
  );
};

export default FeaturedCourses