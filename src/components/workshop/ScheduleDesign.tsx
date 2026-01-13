"use client"
import { useState } from "react";
import GlassAccordion from "../shared/GlassAccordion";

const ScheduleDesign = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const days = [
    {
      title: "Day 1: Introduction to AI in Design",
      content: "Explore the fundamentals of AI and its transformative role in modern design workflows.",
    },
    {
      title: "Day 2: Generative AI for Ideation",
      content: "Learn to leverage generative tools to brainstorm and visualize concepts rapidly.",
    },
    {
      title: "Day 3: Advanced Prompt Engineering",
      content: "Deep dive into crafting precise prompts to achieve specific aesthetic and functional results.",
    },
    {
      title: "Day 4: AI-Based Rendering Techniques",
      content: "Master the integration of AI into rendering pipelines for high-fidelity architectural visuals.",
    },
    {
      title: "Day 5: Ethical Considerations in AI Design",
      content: "Analyze the ethical landscape, including intellectual property and the future of the profession.",
    },
    {
      title: "Day 6: Final Project and Showcase",
      content: "Apply your skills to a final project and present your work to peers and mentors.",
    },
  ];

  const handleToggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="w-full flex flex-col gap-6">
      {/* Title */}
      <h2 className="text-white text-3xl font-bold leading-[48px]">
        Schedule
      </h2>

      {/* Schedule List */}
      <div className="flex flex-col gap-6">
        {days.map((day, index) => (
          <GlassAccordion key={index} name='schedule' title={day.title} content={day.content} />
        ))}
      </div>
    </section>
  );
};

export default ScheduleDesign;
