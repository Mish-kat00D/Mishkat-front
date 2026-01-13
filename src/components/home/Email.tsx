"use client";
import React from "react";

const Email = () => {
  const handleSubmit = (e: any) => {
    e.preventDefault();
    console.log("Form submitted", e.target.field.value, e.target.email.value);
  };
  return (
    <div className="w-full mt-20 md:mt-32">
      <div className='relative container! mx-auto px-4 h-max! glass flex! flex-col! items-center gap-8 p-7!'>
        <div className="flex flex-col justify-evenly items-center gap-8">
          <div className="text-center text-white text-4xl font-bold leading-10">
            Share your email to be updated with upcoming offers.
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col items-center gap-4 w-full max-w-2xl">
            <input
              type="text"
              name="field"
              placeholder="Your favorite design field"
              className="w-full h-14 px-6 bg-blue-900/30 rounded-full outline-none focus:outline-cyan-500/30"
            />

            <input
              type="email"
              name="email"
              placeholder="your@email.com"
              className="w-full h-14 px-6 bg-blue-900/30 rounded-full outline-none focus:outline-cyan-500/30"
            />

            <button className="w-full py-3.5 bg-secondary-500 hover:opacity-90 transition rounded-full text-white text-base font-semibold">
              Send me samples
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Email;
