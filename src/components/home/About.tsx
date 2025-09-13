import React from 'react'
import { GoPeople } from 'react-icons/go'
import { IoLayers } from 'react-icons/io5'
import SectionHeader from './SectionHeader'

const About = () => {
  const CardsData = [
    {
      icon: <IoLayers className='icon' />,
      title: "The Platform",
      description: "Mishkat is an Arabic-first educational platform that combines architectural expertise with cutting-edge AI technology to create immersive learning experiences."
    },
    {
      icon: <GoPeople className='icon' />,
      title: "Who It's For",
      description: "Designed for students, professionals, and beginners looking to master architectural design with AI-powered tools and workflows."
    },
    {
      icon: <IoLayers className='icon' />,
      title: "Tools & Skills",
      description: "Learn industry-standard tools including Revit, Rhino, Unreal Engine, Midjourney, and specialized AI architectural workflows."
    }
  ]
  return (
    <section id="about" className="min-w-full mt-40">
      <div className="container mx-auto flex flex-col justify-start items-center gap-12">
        <SectionHeader title="What is Mishkat?" description="A revolutionary platform merging architectural education with artifical intelligence to create the next generation of design professionals." />
        <div className="container mx-auto flex justify-between items-center gap-4">
          {CardsData.map((card, index) => (
            <AboutCard key={index} icon={card.icon} title={card.title} description={card.description} />
          ))}
        </div>
      </div>
    </section>
  )
}

const AboutCard = ({ icon, title, description }: { icon: any, title: string, description: string }) => {
  return (
    <div className="w-96 p-4 bg-Primary-1000 rounded-2xl shadow-[0px_4px_15px_0px_rgba(0,0,0,0.40)] outline-1 outline-offset-[-1px] outline-indigo-600/20 flex flex-col justify-start items-center gap-2 overflow-hidden">
      <div className="flex flex-col justify-start items-start gap-4">
        <div className="flex flex-col justify-start items-start gap-2">
          <div className="w-9 h-9 bg-secondary-30 rounded-lg flex justify-center items-center">
            {icon}
          </div>
          <div className="justify-start text-white text-2xl font-bold font-['Sen'] leading-9">{title}</div>
        </div>
        <div className="justify-start text-neutral-300 text-sm font-semibold font-['Sen'] leading-tight">{description}</div>
      </div>
    </div>
  )
}

export default About