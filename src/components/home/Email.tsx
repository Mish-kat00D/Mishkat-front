"use client";
import React from "react";
import GlassSurface from "../shared/Glass";

const Email = () => {
  return (
    <div className="w-full mt-24">
      <GlassSurface blur={20} displace={20} brightness={50} className='relative container! mx-auto px-4 h-max!' InnerClassName='flex! flex-col! items-center gap-8 p-7!'>
        <div className="flex flex-col justify-evenly items-center gap-8">
          <div className="text-center text-white text-4xl font-bold leading-10">
            Share your email to be updated with upcoming offers.
          </div>

          <div className="flex flex-col items-center gap-4 w-full max-w-md">
            <input
              type="text"
              placeholder="Your favorite design field"
              className="w-full h-14 px-6 bg-blue-900/30 rounded-full outline-none focus:outline-cyan-500/30"
            />

            <input
              type="email"
              placeholder="your@email.com"
              className="w-full h-14 px-6 bg-blue-900/30 rounded-full outline-none focus:outline-cyan-500/30"
            />

            <button className="w-full py-3.5 bg-secondary-500 hover:opacity-90 transition rounded-full text-white text-base font-semibold">
              Send me samples
            </button>
          </div>
        </div>
      </GlassSurface>
    </div>
  );
};

export default Email;
