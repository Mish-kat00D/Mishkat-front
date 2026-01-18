import VideoPlayer from "./VideoPlayer";
import LessonList from "./LessonList";
import { Session } from "@/types/session";



const WorkshopWatch = ({ sessions }: { sessions: Session }) => {
  const currentLesson = sessions; // dummy active lesson
  const workshop = sessions.workshop;

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
          id: currentLesson.id,
          title: currentLesson.title,
          duration: currentLesson.duration,
          hlsUrl: currentLesson.videoUrl,
        }} />

        {/* ================= Playlist ================= */}
        <LessonList
          lessons={workshop.sessions.sort((a, b) => a.idx - b.idx).map((session) => ({
            id: session.id!,
            idx: session.idx,
            title: session.title,
            duration: session.duration!,
          }))}
          activeLessonId={currentLesson.id}
          workshopId={workshop.id}
        />
      </div>

    </section>
  );
};

export default WorkshopWatch;
