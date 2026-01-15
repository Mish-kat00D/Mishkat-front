import Link from "next/link";

type Lesson = {
  id: string;
  title: string;
  duration: number;
};

const formatDuration = (seconds: number) => {
  const min = Math.floor(seconds / 60);
  const sec = seconds % 60;
  return `${min}:${sec.toString().padStart(2, "0")}`;
};

const LessonItem = ({
  lesson,
  index,
  active,
  workshopId,
}: {
  lesson: Lesson;
  index: number;
  active: boolean;
  workshopId: string;
}) => {
  return (
    <Link
      href={`/workshop/${workshopId}/watch/${lesson.id}`}
      className={`
        px-3 py-2 rounded-xl border flex items-center gap-3 cursor-pointer
        ${active
          ? "bg-primary-900 border-secondary-500"
          : "bg-primary-900/70 border-indigo-300/20"}
      `}
    >
      <div className="w-8 h-8 rounded-full border border-secondary-500 flex items-center justify-center text-xs text-white">
        {index}
      </div>

      <div className="flex-1 flex flex-col gap-0.5">
        <span className="text-white text-sm font-medium">
          {lesson.title}
        </span>
        <span className="text-neutral-300 text-xs">
          {formatDuration(lesson.duration)}
        </span>
      </div>
    </Link>
  );
};

export default LessonItem;
