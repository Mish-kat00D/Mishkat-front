"use client"
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
import { useEffect, useState } from 'react'

const Page = async ({ params }: { params: { id: string, lessonId: string } }) => {
  const [data, setData] = useState<Session | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const url = `${process.env.NEXT_PUBLIC_API_URL}/workshop/${params.id}/session/${params.lessonId}`
  useEffect(() => {

    const fetchSessions = async () => {
      setLoading(true)
      const res = await fetch(url, { credentials: "include" })

      if (!res.ok) {
        const error = await res.json();
        console.log(error)
        setLoading(false)
        setError(error.message)
        return
      }

      const data = await res.json()

      if (!data) {
        setLoading(false)
        setError("No data found")
        return
      }

      setData(data)
      setLoading(false)
    }
    fetchSessions()
  }, [url])

  if (loading) {
    return <div>Loading...</div>
  }

  if (error) {
    return <div>{error}</div>
  }

  if (!data) {
    return <div>No data found</div>
  }

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