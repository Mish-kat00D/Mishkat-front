import React from 'react';

const Overview: React.FC = () => {
  return (
    <div className="self-stretch inline-flex flex-col justify-start items-start gap-2">
      <div className="self-stretch justify-start text-white text-[32px] font-bold font-['Sen'] leading-[48px]">
        Workshop Overview
      </div>
      <div className="self-stretch justify-start text-neutral-200 text-xl font-normal font-['Sen'] leading-8">
        This intensive 24-hour workshop introduces Arab designers to AI-driven design workflows, covering concept-to-execution with tools like Stable Diffusion, ComfyUI, and prompt engineering techniques.
      </div>
    </div>
  );
};

export default Overview;
