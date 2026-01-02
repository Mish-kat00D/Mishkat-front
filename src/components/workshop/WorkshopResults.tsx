"use client";
import { useState } from "react";

const ImageComponent = ({ url }: { url: string }) => {
  if (!url) return null;
  return (
    <>
      <div
        className="
                w-[320px] h-[240px]
                rounded-2xl
                overflow-hidden
                shadow-2xl
                border-4 border-white/10
                bg-black/0
                relative
              "
      >
        <img
          src={url}
          alt="Workshop result"
          className="w-full h-full object-cover"
        />

        {/* Soft gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-black/0 via-black/0 to-black/0" />
      </div>
    </>
  )
}

const WorkshopResultsDesign = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleLeftArrowClick = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  const handleRightArrowClick = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const images = [
    "https://placehold.co/317x238?text=Img1",
    "https://placehold.co/317x238?text=Img2",
    "https://placehold.co/317x238?text=Img3",
    "https://placehold.co/317x238?text=Img4",
    "https://placehold.co/317x238?text=Img5",
    "https://placehold.co/317x238?text=Img6",
    "https://placehold.co/317x238?text=Img7",
  ];

  const current = images[currentIndex];
  const last = currentIndex === 0 ? images[images.length - 1] : images[currentIndex - 1];
  const next = currentIndex === images.length - 1 ? images[0] : images[currentIndex + 1];

  return (
    <section className="w-full flex flex-col gap-4">
      {/* Title */}
      <h2 className="text-white text-[32px] font-bold leading-[48px]">
        Workshop Participants&apos; Results
      </h2>

      {/* Images Row */}
      <div className="relative w-full max-w-[1320px] mx-auto">
        <div className="flex justify-center gap-8 [&>*:nth-child(odd)]:hidden md:[&>*:nth-child(odd)]:block">
          {/* Card */}
          <ImageComponent url={last} />
          <ImageComponent url={current} />
          <ImageComponent url={next} />
        </div>

        {/* Left Arrow */}
        <div onClick={handleLeftArrowClick} className="absolute left-0 top-1/2 -translate-y-1/2 w-12 h-12 bg-indigo-950/80 rounded-full border border-white/10 flex items-center justify-center cursor-pointer">
          <span className="border-l-2 border-b-2 border-white w-3 h-3 rotate-45" />
        </div>

        {/* Right Arrow */}
        <div onClick={handleRightArrowClick} className="absolute right-0 top-1/2 -translate-y-1/2 w-12 h-12 bg-indigo-950/80 rounded-full border border-white/10 flex items-center justify-center cursor-pointer">
          <span className="border-r-2 border-t-2 border-white w-3 h-3 rotate-45" />
        </div>
      </div>

      {/* Pagination Dots */}
      <div className="flex justify-center gap-2">
        {images.map((_, i) => (
          <div key={i} className={`h-2 rounded-full transition-all duration-300 ${i === currentIndex ? 'bg-secondary-500 w-8' : 'bg-white/30 w-2'}`} />
        ))}
      </div>
    </section>
  );
};

export default WorkshopResultsDesign;
