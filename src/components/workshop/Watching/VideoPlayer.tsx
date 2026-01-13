type Lesson = {
  id: string;
  title: string;
  duration: number;
  hlsUrl: string;
};

const VideoPlayer = ({ lesson }: { lesson: Lesson }) => {
  return (
    <div className="relative w-full h-[543px] rounded-2xl bg-black shadow-[0px_4px_15px_rgba(0,0,0,0.30)] overflow-hidden">
      {/* 
        IMPORTANT:
        This <video> will later be replaced by:
        - hls.js
        - video.js
        - or native HLS (Safari)
      */}
      <video
        key={lesson.id}
        controls
        className="w-full h-full object-contain bg-black"
      >
        <source src={lesson.hlsUrl} type="application/x-mpegURL" />
      </video>

      {/* Overlay title (design only) */}
      <div className="absolute bottom-4 left-4 right-4 bg-black/60 rounded-xl px-4 py-2">
        <p className="text-white text-sm font-medium">
          {lesson.title}
        </p>
      </div>
    </div>
  );
};

export default VideoPlayer;
