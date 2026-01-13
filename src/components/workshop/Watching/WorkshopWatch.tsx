import VideoPlayer from "./VideoPlayer";
import LessonList from "./LessonList";

const workshop = {
  title: "Computational Design and Digital Fabrication",
  description:
    "Design smarter, fabricate faster — AI-enhanced digital production for architects",
  lessons: [
    {
      id: "l1",
      title: "Introduction to Computational Design",
      duration: 780,
      hlsUrl: "https://example.com/signed/lesson-1/master.m3u8",
    },
    {
      id: "l2",
      title: "Parametric Modeling Basics",
      duration: 920,
      hlsUrl: "https://example.com/signed/lesson-2/master.m3u8",
    },
    {
      id: "l3",
      title: "Digital Fabrication Workflows",
      duration: 1100,
      hlsUrl: "https://example.com/signed/lesson-3/master.m3u8",
    },
    {
      id: "l4",
      title: "Digital Fabrication Workflows",
      duration: 1100,
      hlsUrl: "https://example.com/signed/lesson-3/master.m3u8",
    },
    {
      id: "l5",
      title: "Digital Fabrication Workflows",
      duration: 1100,
      hlsUrl: "https://example.com/signed/lesson-3/master.m3u8",
    },
    {
      id: "l6",
      title: "Digital Fabrication Workflows",
      duration: 1100,
      hlsUrl: "https://example.com/signed/lesson-3/master.m3u8",
    },
    {
      id: "l7",
      title: "Digital Fabrication Workflows",
      duration: 1100,
      hlsUrl: "https://example.com/signed/lesson-3/master.m3u8",
    },
    {
      id: "l8",
      title: "Digital Fabrication Workflows",
      duration: 1100,
      hlsUrl: "https://example.com/signed/lesson-3/master.m3u8",
    },
    {
      id: "l9",
      title: "Digital Fabrication Workflows",
      duration: 1100,
      hlsUrl: "https://example.com/signed/lesson-3/master.m3u8",
    },
    {
      id: "l10",
      title: "Digital Fabrication Workflows",
      duration: 1100,
      hlsUrl: "https://example.com/signed/lesson-3/master.m3u8",
    },
  ],
};

const WorkshopWatch = () => {
  const currentLesson = workshop.lessons[0]; // dummy active lesson

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
            {workshop.description}
          </p>
        </div>
      </div>

      <div className="flex max-lg:flex-col gap-6 justify-between">
        {/* Player */}
        <VideoPlayer lesson={currentLesson} />

        {/* ================= Playlist ================= */}
        <LessonList
          lessons={workshop.lessons}
          activeLessonId={currentLesson.id}
        />
      </div>

    </section>
  );
};

export default WorkshopWatch;
