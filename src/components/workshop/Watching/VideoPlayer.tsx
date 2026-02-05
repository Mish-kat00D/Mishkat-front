"use client";

import { useEffect, useRef, useState } from "react";
import Hls from "hls.js";

type Lesson = {
  id: string;
  title: string;
  duration: number;
  hlsUrl: string | null;
};

const VideoPlayer = ({ lesson }: { lesson: Lesson }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const hlsRef = useRef<Hls | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !lesson.hlsUrl) return;

    // Cleanup previous HLS instance
    if (hlsRef.current) {
      hlsRef.current.destroy();
      hlsRef.current = null;
    }

    // Check if HLS.js is supported (Chrome, Firefox, Edge)
    if (Hls.isSupported()) {
      console.log("Using HLS.js for playback");
      const hls = new Hls({
        xhrSetup: (xhr) => {
          xhr.withCredentials = true;
        },
      });

      hlsRef.current = hls;
      hls.loadSource(lesson.hlsUrl);
      hls.attachMedia(video);

      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        console.log("HLS manifest loaded successfully");
        setError(null);
      });

      hls.on(Hls.Events.ERROR, (event, data) => {
        console.error("HLS Error:", data.type, data.details);
        if (data.fatal) {
          switch (data.type) {
            case Hls.ErrorTypes.NETWORK_ERROR:
              console.error("Network error, trying to recover...");
              hls.startLoad();
              break;
            case Hls.ErrorTypes.MEDIA_ERROR:
              console.error("Media error, trying to recover...");
              hls.recoverMediaError();
              break;
            default:
              setError("Failed to load video");
              hls.destroy();
              break;
          }
        }
      });

      return () => {
        hls.destroy();
        hlsRef.current = null;
      };
    }
    // Safari (native HLS support)
    else if (video.canPlayType("application/vnd.apple.mpegurl")) {
      console.log("Using native HLS (Safari)");
      video.src = lesson.hlsUrl;

      video.addEventListener("error", () => {
        setError("Failed to load video");
      });
    }
    // No HLS support
    else {
      console.error("HLS is not supported in this browser");
      setError("Your browser does not support HLS video playback");
    }
  }, [lesson.hlsUrl, lesson.id]);

  if (!lesson.hlsUrl) {
    return (
      <div className="relative w-full h-[543px] rounded-2xl bg-black/90 shadow-[0px_4px_15px_rgba(0,0,0,0.30)] flex items-center justify-center">
        <p className="text-gray-300 text-sm">
          Video is not available for this lesson
        </p>
        <div className="absolute bottom-4 left-4 right-4 bg-black/60 rounded-xl px-4 py-2">
          <p className="text-white text-sm font-medium">{lesson.title}</p>
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
        autoPlay={false}
        playsInline
        className="w-full h-full object-contain bg-black"
      />
      {error && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/80">
          <p className="text-red-400 text-sm">{error}</p>
        </div>
      )}
    </div>
  );
};

export default VideoPlayer;
