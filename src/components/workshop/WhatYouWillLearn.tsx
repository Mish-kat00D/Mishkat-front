import GlassSurface from "../shared/Glass";

const learnItems = [
  "Foundations of AI in design",
  "Crafting effective prompts",
  "Using Stable Diffusion, ComfyUI",
  "Generative AI for ideation",
  "AI-based rendering and storytelling",
  "AI ethics and responsible usage",
];

const LearnItem = ({ text }: { text: string }) => {
  return (
    <GlassSurface blur={20} displace={20} brightness={50} className='relative container! mx-auto h-max! rounded-[10.2px]! px-0!' InnerClassName='flex justify-start! items-center! gap-[10.2px]! p-[10.2px]!'>
      {/* Icon */}
      <div className="relative w-6 h-6 flex-shrink-0">
        <div className="absolute inset-0 m-auto w-5 h-5 border-[2px] border-secondary-500 rounded-full" />
        <div className="absolute inset-0 m-auto w-2.5 h-2.5 border-b-[2px] border-secondary-500 rounded-full" />
      </div>

      {/* Text */}
      <p className="text-white text-base font-semibold leading-6">
        {text}
      </p>
    </GlassSurface>
  );
};

const WhatYouWillLearn = () => {
  return (
    <section className="w-full flex flex-col gap-6">
      {/* Title */}
      <h2 className="text-white text-[32px] font-bold leading-[48px]">
        What You&apos;ll Learn
      </h2>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {learnItems.map((item) => (
          <LearnItem key={item} text={item} />
        ))}
      </div>
    </section>
  );
};

export default WhatYouWillLearn;
