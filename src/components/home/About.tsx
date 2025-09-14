import React from 'react'
import { GoPeople } from 'react-icons/go'
import { IoLayers } from 'react-icons/io5'
import SectionHeader from './SectionHeader'

const About = () => {
  const CardsData = [
    {
      icon: <IoLayers className="text-secondary-500 w-6 h-6" />,
      title: "The Platform",
      description:
        "Mishkat is an Arabic-first educational platform that combines architectural expertise with cutting-edge AI technology to create immersive learning experiences.",
    },
    {
      icon: <GoPeople className="text-secondary-500 w-6 h-6" />,
      title: "Who It's For",
      description:
        "Designed for students, professionals, and beginners looking to master architectural design with AI-powered tools and workflows.",
    },
    {
      icon: <IoLayers className="text-secondary-500 w-6 h-6" />,
      title: "Tools & Skills",
      description:
        "Learn industry-standard tools including Revit, Rhino, Unreal Engine, Midjourney, and specialized AI architectural workflows.",
    },
  ]

  return (
    <section id="about" className="min-w-full mt-40">
      <div className="container mx-auto px-4 flex flex-col justify-start items-center gap-12">
        <SectionHeader
          title="What is Mishkat?"
          description="A revolutionary platform merging architectural education with artificial intelligence to create the next generation of design professionals."
        />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 w-full items-stretch">
          {CardsData.map((card, index) => (
            <AboutCard
              key={index}
              icon={card.icon}
              title={card.title}
              description={card.description}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

const AboutCard = ({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode
  title: string
  description: string
}) => {
  return (
    <div className="p-6 bg-primary-1000 rounded-2xl shadow-[0px_4px_15px_rgba(0,0,0,0.40)] outline-1 outline-indigo-600/20 flex flex-col gap-4 h-full">
      <div className="w-10 h-10 bg-secondary-30 rounded-lg flex justify-center items-center">
        {icon}
      </div>
      <h3 className="text-white text-xl font-bold font-['Sen']">{title}</h3>
      <p className="text-neutral-300 text-sm font-medium font-['Sen'] leading-snug flex-grow">
        {description}
      </p>
    </div>
  )
}

export default About
