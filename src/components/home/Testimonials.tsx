import React from 'react'
import SectionHeader from './SectionHeader'
import { TiStarFullOutline, TiStarOutline } from 'react-icons/ti'
import Ali from '../../../public/Ali.png'
import Ahmed from '../../../public/Ahmed.png'
import Hassan from '../../../public/Hassan.png'
import { BiSolidQuoteRight } from 'react-icons/bi'

const Testimonials = () => {
  const Reviews = [
    {
      comment: "It was such a great and insightful workshop, I gained so much knowledge. Thank you.",
      name: "Nada Saeed Abu-Sekinah",
      title: "Interior Designer",
      stars: 4
    },
    {
      comment: "I really appreciated the workshop.it was well-structured, clear, and very informative.",
      name: "Nour Eldin Abdou Moustafa",
      title: "Architecture",
      stars: 4
    },
    {
      comment: "I appreciate your efforts on the workshop, it turned out very useful.",
      name: "Salma Ibrahim Alhabibi",
      title: "Interior Architecture",
      stars: 4
    },
  ]
  return (
    <section id='testimonials' className="w-full mt-20 md:mt-32 p-4">
      <div className="container mx-auto flex flex-col justify-start items-center gap-y-8">
        <SectionHeader title="What Our Students Say" description="Hear from designers who have transformed their practice with Mishkat's workshops." />
        <div className="flex items-center gap-4 justify-between flex-nowrap max-w-full overflow-x-auto no-scrollbar">
          {Reviews.map((review, index) => (
            <ReviewCard key={index} comment={review.comment} name={review.name} title={review.title} stars={review.stars} />
          ))}
        </div>
      </div>
    </section>
  )
}

const ReviewCard = ({ comment, name, title, stars }: { comment: string, name: string, title: string, stars: number }) => {
  const fullStars = stars < 0 ? 0 : stars > 5 ? 5 : stars;
  const emptyStars = 5 - fullStars;

  return (
    <div className="h-[340px] w-2/5 min-w-[250px] flex flex-col justify-even items-center gap-4 p-4 bg-primary-900 rounded-2xl shadow-[0px_0px_4px_0px_rgba(0,0,0,0.35)] outline-1 outline-[#ACAEF7]/20 relative overflow-hidden">
      <BiSolidQuoteRight className='absolute top-1 -left-2 text-white/20 w-16 h-16' />

      <p className='text-neutral-300 text-base lg:text-xl flex-1 leading-[30px] text-center line-clamp-6 flex items-center justify-center'>"{comment}"</p>

      <span className="bg-[radial-gradient(circle_at_center,theme(colors.secondary.500),transparent)] h-1 w-44 block mx-auto"></span>

      <h3 className='text-white text-lg'>{name}</h3>

      <p className='text-neutral-400 text-sm'>{title}</p>

      <div className="flex justify-center items-center gap-1">
        {
          [...Array(fullStars).keys()].map((star) => <TiStarFullOutline className='icon' key={star} />)
        }
        {
          [...Array(emptyStars).keys()].map((star) => <TiStarOutline className='icon' key={star} />)
        }
      </div>
    </div>
  )
}

export default Testimonials