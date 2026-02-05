import {
  WorkshopWatch,
  AiToolsYouWillMaster,
  Instructor,
  Overview,
  StudentReviews,
  WhatYouWillLearn,
  WorkshopResults,
} from '@/components/workshop'
import { Session } from '@/types/session';
import { cookies } from 'next/headers';

async function getSessionData(workshopId: string, lessonId: string): Promise<Session> {
  const cookieHeader = cookies().toString();

  const res = await fetch(
    `${process.env.API_URL}/workshop/${workshopId}/session/${lessonId}`,
    {
      headers: { Cookie: cookieHeader },
      cache: 'no-store',
    }
  );


  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || 'Failed to fetch session data');
  }

  return res.json();
}

const Page = async ({ params }: { params: { id: string; lessonId: string } }) => {
  const data = await getSessionData(params.id, params.lessonId);

  return (
    <main className='flex flex-col justify-start items-center gap-11'>
      {/* Workshop Watch - fetches its own data client-side */}
      <WorkshopWatch workshopId={params.id} lessonId={params.lessonId} />
      {/* Overview */}
      <Overview description={data.workshop.description} />
      {/* Instructor */}
      <Instructor instructor={data.workshop.instructor} videoUrl={data.workshop.videoUrl!} />
      {/* What You'll Learn */}
      <WhatYouWillLearn items={data.workshop.whatYoullMaster} />
      {/* AI Tools You'll Master */}
      <AiToolsYouWillMaster tools={data.workshop.tools} />
      {/* Student Reviews */}
      <StudentReviews reviews={data.workshop.reviews} />
      {/* Workshop Results */}
      <WorkshopResults results={data.workshop.studentResults} />
    </main>
  );
};

export default Page;