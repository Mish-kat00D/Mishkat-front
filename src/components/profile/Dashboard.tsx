"use client";
import { Clock, Star } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { PiBookOpenText, PiMedal } from 'react-icons/pi'
import { TbTargetArrow } from 'react-icons/tb'

interface WorkshopData {
  id: string;
  slug: string;
  title: string;
  description: string;
  imageUrl: string | null;
  tools: { id: string; name: string }[];
  durationHours: number | null;
  progress: number;
  completedSessions: number;
  totalSessions: number;
  nextSessionId: string | null;
}

interface DashboardData {
  coursesCompleted: number;
  certificatesEarned: number;
  totalHoursLearned: number;
  workshops: WorkshopData[];
}

// Client-side fetch function
async function getDashboardStats(): Promise<DashboardData | null> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/profile/dashboard`, {
    credentials: 'include',
    cache: 'no-store',
  });

  if (!res.ok) return null;
  return res.json();
}

// Skeleton Components
const StatCardSkeleton = () => (
  <div className="flex items-center gap-2 min-w-[320px] px-4 py-6 rounded-2xl bg-primary-900 border border-primary-800 animate-pulse">
    <div className="p-4 rounded-full bg-primary-800 w-14 h-14" />
    <div className="flex flex-col gap-2">
      <div className="h-4 w-24 bg-primary-800 rounded" />
      <div className="h-6 w-16 bg-primary-800 rounded" />
    </div>
  </div>
);

const WorkshopCardSkeleton = () => (
  <div className="flex items-start flex-col gap-y-4 w-[318px] h-[567px] pb-6 rounded-2xl bg-primary-900 border border-primary-800 animate-pulse">
    <div className="w-full h-[259px] bg-primary-800 rounded-t-2xl" />
    <div className="flex flex-1 flex-col items-start justify-between max-md:px-2 md:max-w-[90%] gap-6 mx-auto w-full px-4">
      <div className="flex flex-col gap-2 w-full">
        <div className="h-6 w-3/4 bg-primary-800 rounded" />
        <div className="h-4 w-full bg-primary-800 rounded" />
        <div className="h-4 w-2/3 bg-primary-800 rounded" />
      </div>
      <div className="flex gap-2">
        <div className="h-8 w-20 bg-primary-800 rounded-full" />
        <div className="h-8 w-20 bg-primary-800 rounded-full" />
      </div>
    </div>
    <div className="gap-y-4 flex flex-col items-center max-md:px-2 md:max-w-[90%] w-full mx-auto mt-auto px-4">
      <div className="w-full bg-primary-800 rounded-full h-4" />
      <div className="h-4 w-24 bg-primary-800 rounded" />
      <div className="flex justify-between w-full">
        <div className="h-4 w-12 bg-primary-800 rounded" />
        <div className="h-4 w-12 bg-primary-800 rounded" />
        <div className="h-4 w-12 bg-primary-800 rounded" />
      </div>
      <div className="w-full h-8 bg-primary-800 rounded-full" />
    </div>
  </div>
);

const Dashboard = () => {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getDashboardStats()
      .then(setData)
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className='flex flex-col gap-7 items-start w-full'>
      {/* Stats */}
      <div className="flex flex-col gap-4 w-full">
        {/* Header */}
        <div className="flex items-center gap-2">
          <div className="p-4 rounded-full bg-secondary-10 text-secondary-500">
            <TbTargetArrow className='w-6 h-6' />
          </div>
          <h3 className='text-2xl md:text-3xl text-neutral-100 text-nowrap'>Your Progress So Far</h3>
        </div>
        {/* Cards List */}
        <div className="flex flex-col md:flex-row md:flex-wrap items-center justify-center md:justify-start gap-4">
          {loading ? (
            <>
              <StatCardSkeleton />
              <StatCardSkeleton />
              <StatCardSkeleton />
            </>
          ) : (
            <>
              {/* Courses Completed Card */}
              <div className="flex items-center gap-2 min-w-[320px] px-4 py-6 rounded-2xl bg-primary-900 border border-primary-800">
                <div className="p-4 rounded-full bg-secondary-10 text-secondary-500">
                  <PiBookOpenText className='w-6 h-6' />
                </div>
                <div className="flex flex-col gap-1 items-start justify-center">
                  <div className="text-sm text-neutral-400">Courses Completed</div>
                  <div className="text-xl text-secondary-500">{data?.coursesCompleted ?? 0}</div>
                </div>
              </div>
              {/* Total Hours Learned Card */}
              <div className="flex items-center gap-2 min-w-[320px] px-4 py-6 rounded-2xl bg-primary-900 border border-primary-800">
                <div className="p-4 rounded-full bg-secondary-10 text-secondary-500">
                  <Clock className='w-6 h-6' />
                </div>
                <div className="flex flex-col gap-1 items-start justify-center">
                  <div className="text-sm text-neutral-400">Total Hours Learned</div>
                  <div className="text-xl text-secondary-500">{data?.totalHoursLearned ?? 0} <span className="text-sm text-neutral-400">hr</span></div>
                </div>
              </div>
              {/* Certificates Earned Card */}
              <div className="flex items-center gap-2 min-w-[320px] px-4 py-6 rounded-2xl bg-primary-900 border border-primary-800">
                <div className="p-4 rounded-full bg-secondary-10 text-secondary-500">
                  <PiMedal className='w-6 h-6' />
                </div>
                <div className="flex flex-col gap-1 items-start justify-center">
                  <div className="text-sm text-neutral-400">Certificates Earned</div>
                  <div className="text-xl text-secondary-500">{data?.certificatesEarned ?? 0}</div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Workshops */}
      <div className="flex flex-col gap-4 w-full">
        {/* Header */}
        <div className="flex items-center gap-2">
          <div className="p-4 rounded-full bg-secondary-10 text-secondary-500">
            <PiBookOpenText className='w-6 h-6' />
          </div>
          <h3 className='text-2xl md:text-3xl text-neutral-100 text-nowrap'>My Workshops</h3>
        </div>
        {/* Workshop List */}
        <div className="flex flex-col md:flex-row md:flex-wrap items-center justify-center md:justify-start gap-4">
          {loading ? (
            <>
              <WorkshopCardSkeleton />
              <WorkshopCardSkeleton />
            </>
          ) : data?.workshops?.length ? (
            data.workshops.map((workshop) => (
              <div key={workshop.id} className="flex items-start flex-col gap-y-4 w-[318px] h-[567px] pb-6 rounded-2xl bg-primary-900 border border-primary-800">
                {/* Image */}
                <div className="relative w-full h-[259px] overflow-hidden bg-primary-900">
                  <Image
                    src={workshop.imageUrl || "https://placehold.co/600x600"}
                    alt="Course Cover"
                    fill
                    unoptimized
                    className="object-cover object-center w-full h-full rounded-2xl"
                    priority
                  />
                </div>
                {/* Data - 1 */}
                <div className="flex flex-1 flex-col items-start justify-between max-md:px-2 md:max-w-[90%] gap-6 mx-auto">
                  <div className="flex flex-col gap-2 max-w-[90%]">
                    <h4 className="text-xl text-white">{workshop.title}</h4>
                    <p className="text-xs text-neutral-300 line-clamp-2">{workshop.description}</p>
                  </div>
                  <div className="flex items-center justify-start gap-[6px] overflow-hidden w-full">
                    {workshop.tools?.slice(0, 3).map((tool) => (
                      <span key={tool.id} className="text-xs text-white text-nowrap p-2 rounded-full bg-nois border border-white/25">{tool.name}</span>
                    ))}
                  </div>
                </div>
                {/* Data - 2 */}
                <div className="gap-y-4 flex flex-col items-center max-md:px-2 md:max-w-[90%] w-full mx-auto mt-auto">
                  <div className="w-full bg-[#ACAEF766] rounded-full h-4">
                    <div className="h-full rounded-full bg-secondary-500 transition-all duration-300" style={{ width: `${workshop.progress}%` }} />
                  </div>
                  <div className="text-sm text-neutral-300 text-center">{workshop.progress}% Complete</div>
                  <div className="flex items-center justify-between w-full max-md:px-2 md:max-w-[90%]">
                    <div className="text-xs flex gap-1 text-neutral-300"><PiBookOpenText className="w-4 h-4 text-secondary-500" />{workshop.completedSessions}/{workshop.totalSessions}</div>
                    <div className="text-xs flex gap-1 text-neutral-300"><Clock className="w-4 h-4 text-secondary-500" />{workshop.durationHours || 10}h</div>
                    <div className="text-xs flex gap-1 text-neutral-300"><Star className="w-4 h-4 text-secondary-500" />4.5</div>
                  </div>
                  <Link
                    href={workshop.nextSessionId
                      ? `/workshop/${workshop.slug}/watch/${workshop.nextSessionId}`
                      : `/workshop/${workshop.slug}`
                    }
                    className="w-full py-1 px-2 mx-1 rounded-full bg-secondary-500 text-white text-xs font-semibold text-center"
                  >
                    {workshop.progress > 0 ? 'Continue Learning' : 'Start Learning'}
                  </Link>
                </div>
              </div>
            ))
          ) : (
            <div className="text-neutral-400">No workshops enrolled yet.</div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Dashboard