import {
  AiToolsYouWillMaster,
  Hero,
  Instructor,
  Overview,
  ScheduleDesign,
  StudentReviews,
  WhatYouWillLearn,
  WorkshopResults,
  BlackFridayOfferDesign
} from '@/components/workshop'
import { getUser } from '@/lib/server/user'
import { WorkshopWithUserData } from '@/types/workshop'
import React from 'react'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

const Page = async ({ params }: { params: { id: string } }) => {
  const user = await getUser()

  const res = await fetch(`${process.env.API_URL}/workshops/${params.id}${user ? '/user' : ''}`, {
    headers: {
      'Authorization': `Bearer ${user?.token}`,
      Cookie: cookies().toString()
    }
  });
  if (!res.ok) {
    console.log("workshop data", (await res.json()).message)
    throw new Error('Failed to fetch workshop data')
  }
  const data: WorkshopWithUserData = await res.json();
  console.log("workshop data", data)

  // Redirect enrolled users to their next session
  if (user && data.enrolled && data.nextSession) {
    redirect(`/workshop/${data.id}/watch/${data.nextSession.id}`);
  }
  return (
    <main className='container mx-auto px-4 flex flex-col justify-start items-center gap-11'>
      {/* Hero */}
      <Hero workshop={data} user={user} enrolled={data.enrolled} />
      {/* Overview */}
      <Overview description={data.description} />
      {/* Instructor */}
      <Instructor instructor={data.instructor} {...(data.videoUrl && { videoUrl: data.videoUrl })} />
      {/* What You'll Learn */}
      <WhatYouWillLearn items={data.whatYoullMaster} />
      {/* AI Tools You'll Master */}
      <AiToolsYouWillMaster tools={data.tools} />
      {/* Student Reviews */}
      <StudentReviews reviews={data.reviews} />
      {/* Workshop Results */}
      <WorkshopResults results={data.studentResults} />
      {/* Schedule */}
      <ScheduleDesign sessions={data.sessions} />
      {/* Black Friday Offer */}
      <BlackFridayOfferDesign
        price={data.price}
        originalPrice={data.originalPrice}
        currency={data.currency}
        workshop={data}
        enrolled={data.enrolled}
        user={user}
      />
    </main>
  )
}

export default Page