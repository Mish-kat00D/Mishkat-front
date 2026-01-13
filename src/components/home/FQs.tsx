import React from 'react'
import GlassAccordion from '../shared/GlassAccordion'

const FQs = () => {
  const faqs = [
    {
      title: "What is Mishkat?",
      content:
        "Mishkat is on a mission to revolutionize design education in the Arab world. We believe that Arab designers have the potential to lead globally, and we're creating the platform to make that happen."
    },
    {
      title: "Where can I watch?",
      content:
        "Our workshops are available on any device through our web platform. Access premium content on desktop, tablet, or mobile — learn anywhere, anytime. Simply create an account and start exploring our workshop library."
    },
    {
      title: "Which workshops are right for me?",
      content:
        "Mishkat offers workshops across all design disciplines  from graphic and UX to interior, motion, and furniture design. Whether you're just starting out or looking to level up your skills, there's something for every designer. With new workshops added regularly, you can learn practical skills, explore different styles, and get inspired every day."
    }
  ];

  return (
    <div className="container mx-auto flex flex-col gap-4 p-6x items-center mt-20 md:mt-32">
      <h2 className="mb-7 text-5xl font-bold text-white text-center">Frequently Asked Questions</h2>
      {faqs.map((faq, index) => (
        <GlassAccordion key={index} name='fqs' title={faq.title} content={faq.content} />
      ))}
    </div>
  )
}

export default FQs