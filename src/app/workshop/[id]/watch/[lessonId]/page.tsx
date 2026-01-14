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
import { Session } from '@/types/session';
import React from 'react'
import { cookies } from 'next/headers'

const Page = async ({ params }: { params: { id: string, lessonId: string } }) => {
  console.log(`${process.env.API_URL}/workshop/${params.id}/session/${params.lessonId}`)
  const res = await fetch(`${process.env.API_URL}/workshop/${params.id}/session/${params.lessonId}`, {
    headers: {
      Cookie: cookies().toString(),
    },
    cache: 'no-store',
  });
  if (!res.ok) {
    const error = await res.json();
    console.log(error)
    throw new Error(error.message)
  }
  const data: Session = await res.json();

  console.log("session data", data)
  return (
    <main className='container mx-auto flex flex-col justify-start items-center gap-11 px-6 my-4'>
      {/* Workshop Watch */}
      <WorkshopWatch sessions={data} />
      {/* Overview */}
      <Overview description={data.workshop.description} />
      {/* Instructor */}
      <Instructor instructor={data.workshop.instructor} />
      {/* What You'll Learn */}
      <WhatYouWillLearn items={data.workshop.whatYoullMaster} />
      {/* AI Tools You'll Master */}
      <AiToolsYouWillMaster tools={data.workshop.tools} />
      {/* Student Reviews */}
      <StudentReviews reviews={data.workshop.reviews} />
      {/* Workshop Results */}
      <WorkshopResults results={data.workshop.studentResults} />
      {/* Schedule */}
      <ScheduleDesign sessions={data.workshop.sessions} />
      {/* Black Friday Offer */}
      <BlackFridayOfferDesign price={data.workshop.price} originalPrice={data.workshop.originalPrice} currency={data.workshop.currency} />
    </main>
  )
}

export default Page