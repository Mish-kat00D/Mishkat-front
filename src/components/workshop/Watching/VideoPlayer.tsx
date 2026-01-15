"use client";

import { useEffect, useRef } from "react";
import Hls from "hls.js";

type Lesson = {
  id: string;
  title: string;
  duration: number;
  hlsUrl: string | null;
};

const VideoPlayer = ({ lesson }: { lesson: Lesson }) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (!videoRef.current) return;
    if (!lesson.hlsUrl) return;

    const video = videoRef.current;

    // Safari (native HLS)
    if (video.canPlayType("application/vnd.apple.mpegurl")) {
      video.src = lesson.hlsUrl;
      return;
    }

    // HLS.js (Chrome, Firefox, Edge)
    if (Hls.isSupported()) {
      const hls = new Hls({
        xhrSetup: (xhr) => {
          xhr.withCredentials = true; // 🔐 send cookies
        },
      });

      hls.loadSource(lesson.hlsUrl);
      hls.attachMedia(video);

      return () => {
        hls.destroy();
      };
    }
  }, [lesson.hlsUrl]);

  // ----------------------------
  // Fallback UI (no HLS URL)
  // ----------------------------
  if (!lesson.hlsUrl) {
    return (
      <div className="relative w-full h-[543px] rounded-2xl bg-black/90 shadow-[0px_4px_15px_rgba(0,0,0,0.30)] flex items-center justify-center">
        <p className="text-gray-300 text-sm">
          Video is not available for this lesson
        </p>

        {/* Overlay title */}
        <div className="absolute bottom-4 left-4 right-4 bg-black/60 rounded-xl px-4 py-2">
          <p className="text-white text-sm font-medium">
            {lesson.title}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full h-[543px] rounded-2xl bg-black shadow-[0px_4px_15px_rgba(0,0,0,0.30)] overflow-hidden">
      <video
        ref={videoRef}
        key={lesson.id}
        controls
        className="w-full h-full object-contain bg-black"
      />

      {/* Overlay title */}
      <div className="absolute bottom-4 left-4 right-4 bg-black/60 rounded-xl px-4 py-2">
        <p className="text-white text-sm font-medium">
          {lesson.title}
        </p>
      </div>
    </div>
  );
};

export default VideoPlayer;
