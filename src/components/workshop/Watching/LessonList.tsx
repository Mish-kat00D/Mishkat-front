import LessonItem from "./LessonItem";

type Lesson = {
  id: string;
  idx: number;
  title: string;
  duration: number;
};

const LessonList = ({
  lessons,
  activeLessonId,
  workshopId,
}: {
  lessons: Lesson[];
  activeLessonId: string;
  workshopId: string;
}) => {
  return (
    <aside className="w-full lg:w-80 h-fit max-h-[543px] bg-primary-1000 border border-indigo-600/20 rounded-2xl p-4 shadow-[0px_4px_15px_rgba(0,0,0,0.40)] flex flex-col gap-4">
      <h3 className="text-white text-lg font-bold">
        Workshop Content
      </h3>

      <div className="flex flex-col gap-3 overflow-y-auto no-scrollbar pr-1">
        {lessons.map((lesson, index) => (
          <LessonItem
            key={lesson.id}
            lesson={lesson}
            index={lesson.idx}
            active={lesson.id === activeLessonId}
            workshopId={workshopId}
          />
        ))}
      </div>
    </aside>
  );
};

export default LessonList;
