"use client";
import { useEffect, useState } from "react";
import VideoPlayer from "./VideoPlayer";
import LessonList from "./LessonList";
import { Session } from "@/types/session";

interface WorkshopWatchProps {
  workshopId: string;
  lessonId: string;
}

const WorkshopWatch = ({ workshopId, lessonId }: WorkshopWatchProps) => {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSession = async () => {
      try {
        setLoading(true);
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/workshop/${workshopId}/session/${lessonId}`,
          {
            credentials: "include",
          }
        );

        if (!res.ok) {
          const err = await res.json();
          throw new Error(err.message || "Failed to fetch session");
        }

        const data = await res.json();
        setSession(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchSession();
  }, [workshopId, lessonId]);

  if (loading) {
    return (
      <section className="w-full max-w-[1320px] mx-auto flex flex-col gap-6">
        <div className="flex-1 flex flex-col gap-4 animate-pulse">
          <div className="h-10 bg-neutral-700 rounded w-3/4"></div>
          <div className="h-6 bg-neutral-700 rounded w-1/2"></div>
        </div>
        <div className="flex max-lg:flex-col gap-6 justify-between">
          <div className="aspect-video bg-neutral-700 rounded-xl w-full lg:w-2/3"></div>
          <div className="w-full lg:w-1/3 bg-neutral-800 rounded-xl h-96"></div>
        </div>
      </section>
    );
  }

  if (error || !session) {
    return (
      <section className="w-full max-w-[1320px] mx-auto text-center py-10">
        <p className="text-red-400">{error || "Session not found"}</p>
      </section>
    );
  }

  const workshop = session.workshop;

  return (
    <section className="w-full max-w-[1320px] mx-auto flex flex-col gap-6">
      {/* ================= Main Video ================= */}
      <div className="flex-1 flex flex-col gap-4">
        {/* Title */}
        <div className="flex flex-col gap-2">
          <h1 className="text-white text-[40px] font-bold">
            {workshop.title}
          </h1>
          <p className="text-neutral-200 text-[20px]">
            {workshop.subtitle}
          </p>
        </div>
      </div>

      <div className="flex max-lg:flex-col gap-6 justify-between">
        {/* Player */}
        <VideoPlayer lesson={{
          id: session.id,
          title: session.title,
          duration: session.duration,
          hlsUrl: session.videoUrl,
        }} />

        {/* ================= Playlist ================= */}
        <LessonList
          lessons={workshop.sessions.sort((a, b) => a.idx - b.idx).map((s) => ({
            id: s.id!,
            idx: s.idx,
            title: s.title,
            duration: s.duration!,
          }))}
          activeLessonId={session.id}
          workshopId={workshop.id}
        />
      </div>

    </section>
  );
};

export default WorkshopWatch;
