"use client";

import { useEffect, useRef, useState } from "react";
import Hls, { Level } from "hls.js";

type Props = {
  src: string;
  title?: string;
};

export default function CinematicPlayer({ src, title }: Props) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const hlsRef = useRef<Hls | null>(null);

  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [levels, setLevels] = useState<Level[]>([]);
  const [currentLevel, setCurrentLevel] = useState(-1);

  // -----------------------------
  // HLS Setup
  // -----------------------------
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (video.canPlayType("application/vnd.apple.mpegurl")) {
      video.src = src;
      return;
    }

    if (Hls.isSupported()) {
      const hls = new Hls({
        xhrSetup: xhr => { xhr.withCredentials = true },
      });

      hls.loadSource(src);
      hls.attachMedia(video);

      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        setLevels(hls.levels);
      });

      hlsRef.current = hls;
    }

    return () => hlsRef.current?.destroy();
  }, [src]);

  // -----------------------------
  // Time updates
  // -----------------------------
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const onTime = () =>
      setProgress((video.currentTime / video.duration) * 100);

    const onLoaded = () => setDuration(video.duration);

    video.addEventListener("timeupdate", onTime);
    video.addEventListener("loadedmetadata", onLoaded);

    return () => {
      video.removeEventListener("timeupdate", onTime);
      video.removeEventListener("loadedmetadata", onLoaded);
    };
  }, []);

  // -----------------------------
  // Controls
  // -----------------------------
  const togglePlay = () => {
    const video = videoRef.current!;
    video.paused ? video.play() : video.pause();
    setPlaying(!video.paused);
  };

  const seek = (value: number) => {
    const video = videoRef.current!;
    video.currentTime = (value / 100) * duration;
  };

  const changeQuality = (level: number) => {
    if (!hlsRef.current) return;
    hlsRef.current.currentLevel = level;
    setCurrentLevel(level);
  };

  // -----------------------------
  // UI
  // -----------------------------
  return (
    <div className="relative w-full h-[540px] bg-black rounded-2xl overflow-hidden">
      <video ref={videoRef} className="w-full h-full object-contain" />

      {/* HUD Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/40" />

      {/* Bottom Controls */}
      <div className="absolute bottom-0 left-0 right-0 p-4 space-y-3">
        {/* Progress */}
        <input
          type="range"
          value={progress}
          onChange={e => seek(+e.target.value)}
          className="w-full accent-orange-500"
        />

        {/* Controls Row */}
        <div className="flex items-center justify-between text-white">
          <button onClick={togglePlay}>
            {playing ? "❚❚" : "▶"}
          </button>

          <span className="text-sm opacity-80">{title}</span>

          {/* Quality */}
          <select
            className="bg-black/70 text-white text-sm rounded"
            value={currentLevel}
            onChange={e => changeQuality(+e.target.value)}
          >
            <option value={-1}>AUTO</option>
            {levels.map((l, i) => (
              <option key={i} value={i}>
                {l.height}p
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}
