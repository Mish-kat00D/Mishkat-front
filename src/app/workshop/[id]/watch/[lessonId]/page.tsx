import {
  WorkshopWatch,
  AiToolsYouWillMaster,
  Instructor,
  Overview,
  ScheduleDesign,
  StudentReviews,
  WhatYouWillLearn,
  WorkshopResults,
  BlackFridayOfferDesign
} from '@/components/workshop'
import React from 'react'

const Page = async ({ params }: { params: { id: string } }) => {
  // const id = params.id
  return (
    <main className='container mx-auto flex flex-col justify-start items-center gap-11 px-6 my-4'>
      {/* Workshop Watch */}
      <WorkshopWatch />
      {/* Overview */}
      <Overview />
      {/* Instructor */}
      <Instructor />
      {/* What You'll Learn */}
      <WhatYouWillLearn />
      {/* AI Tools You'll Master */}
      <AiToolsYouWillMaster />
      {/* Student Reviews */}
      <StudentReviews />
      {/* Workshop Results */}
      <WorkshopResults />
      {/* Schedule */}
      <ScheduleDesign />
      {/* Black Friday Offer */}
      <BlackFridayOfferDesign />
    </main>
  )
}

export default Page