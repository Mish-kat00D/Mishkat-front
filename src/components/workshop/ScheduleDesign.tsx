"use client"
import { Workshop } from "@/types/workshop";
import GlassAccordion from "../shared/GlassAccordion";

const ScheduleDesign = ({ sessions }: { sessions: Workshop['sessions'] }) => {
  if (!sessions || sessions.length === 0) return null;
  console.log("sessions", sessions)

  return (
    <section className="w-full flex flex-col gap-6">
      {/* Title */}
      <h2 className="text-white text-3xl font-bold leading-[48px]">
        Schedule
      </h2>

      {/* Schedule List */}
      <div className="flex flex-col gap-6">
        {sessions.map((session, index) => (
          <GlassAccordion key={index} name='schedule' title={`${session.title} - ${session.duration} Minutes`} content={session.content} />
        ))}
      </div>
    </section>
  );
};

export default ScheduleDesign;
