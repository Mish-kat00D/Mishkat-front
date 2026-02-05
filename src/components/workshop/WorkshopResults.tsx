"use client";
import { Workshop } from "@/types/workshop";
import Image from "next/image";
import { useState, useEffect, useCallback } from "react";

const WorkshopResultsDesign = ({ results }: { results: Workshop['studentResults'] }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Filter out any invalid results
  const validResults = results?.filter(r => r.imageUrl) || [];

  // Preload all images on mount
  useEffect(() => {
    validResults.forEach((result) => {
      const img = new window.Image();
      img.src = result.imageUrl;
    });
  }, [validResults]);

  const navigate = useCallback((direction: 'left' | 'right') => {
    if (validResults.length === 0 || isTransitioning) return;

    setIsTransitioning(true);
    setCurrentIndex((prevIndex) => {
      if (direction === 'left') {
        return (prevIndex - 1 + validResults.length) % validResults.length;
      }
      return (prevIndex + 1) % validResults.length;
    });

    // Reset transition lock after animation completes
    setTimeout(() => setIsTransitioning(false), 300);
  }, [validResults.length, isTransitioning]);

  if (!validResults || validResults.length === 0) return null;

  // Calculate visible indices
  const lastIndex = (currentIndex - 1 + validResults.length) % validResults.length;
  const nextIndex = (currentIndex + 1) % validResults.length;

  return (
    <section className="w-full flex flex-col gap-4">
      {/* Title */}
      <h2 className="text-white text-center text-[32px] font-bold leading-[48px]">
        Workshop Participants&apos; Results
      </h2>

      {/* Images Row */}
      <div className="relative w-full max-w-[1320px] mx-auto overflow-hidden">
        <div className="flex justify-center items-center gap-8">
          {/* Previous Image (hidden on mobile) */}
          {validResults.length > 2 && (
            <div
              className="hidden md:block w-[320px] h-[240px] rounded-2xl overflow-hidden shadow-2xl border-4 border-white/10 flex-shrink-0 opacity-60 scale-90 transition-all duration-300 ease-out will-change-transform"
            >
              <Image
                src={validResults[lastIndex].imageUrl}
                alt="Workshop result"
                width={320}
                height={240}
                className="w-full h-full object-cover"
                priority={false}
                unoptimized
              />
            </div>
          )}

          {/* Current Image */}
          <div
            className="w-[320px] h-[240px] rounded-2xl overflow-hidden shadow-2xl border-4 border-white/10 flex-shrink-0 transition-all duration-300 ease-out will-change-transform"
          >
            <Image
              src={validResults[currentIndex].imageUrl}
              alt="Workshop result"
              width={320}
              height={240}
              className="w-full h-full object-cover"
              priority
              unoptimized
            />
          </div>

          {/* Next Image (hidden on mobile) */}
          {validResults.length > 1 && (
            <div
              className="hidden md:block w-[320px] h-[240px] rounded-2xl overflow-hidden shadow-2xl border-4 border-white/10 flex-shrink-0 opacity-60 scale-90 transition-all duration-300 ease-out will-change-transform"
            >
              <Image
                src={validResults[nextIndex].imageUrl}
                alt="Workshop result"
                width={320}
                height={240}
                className="w-full h-full object-cover"
                priority={false}
                unoptimized
              />
            </div>
          )}
        </div>

        {/* Left Arrow */}
        <button
          onClick={() => navigate('left')}
          disabled={isTransitioning}
          className="absolute left-0 top-1/2 -translate-y-1/2 w-12 h-12 bg-indigo-950/80 hover:bg-indigo-900/90 rounded-full border border-white/10 flex items-center justify-center cursor-pointer transition-colors duration-200 disabled:opacity-50"
          aria-label="Previous image"
        >
          <span className="border-l-2 border-b-2 border-white w-3 h-3 rotate-45" />
        </button>

        {/* Right Arrow */}
        <button
          onClick={() => navigate('right')}
          disabled={isTransitioning}
          className="absolute right-0 top-1/2 -translate-y-1/2 w-12 h-12 bg-indigo-950/80 hover:bg-indigo-900/90 rounded-full border border-white/10 flex items-center justify-center cursor-pointer transition-colors duration-200 disabled:opacity-50"
          aria-label="Next image"
        >
          <span className="border-r-2 border-t-2 border-white w-3 h-3 rotate-45" />
        </button>
      </div>

      {/* Pagination Dots */}
      <div className="flex justify-center gap-2">
        {validResults.map((_, i) => (
          <button
            key={i}
            onClick={() => {
              if (!isTransitioning) {
                setIsTransitioning(true);
                setCurrentIndex(i);
                setTimeout(() => setIsTransitioning(false), 300);
              }
            }}
            className={`h-2 rounded-full transition-all duration-300 ${i === currentIndex ? 'bg-secondary-500 w-8' : 'bg-white/30 w-2 hover:bg-white/50'
              }`}
            aria-label={`Go to image ${i + 1}`}
          />
        ))}
      </div>
    </section>
  );
};

export default WorkshopResultsDesign;
