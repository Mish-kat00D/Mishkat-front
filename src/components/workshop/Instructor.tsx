import Image from "next/image";

export default function Instructor() {
  return (
    <section className="w-full container mx-auto flex flex-col gap-8">
      {/* Title */}
      <h2 className="text-[32px] font-bold leading-[48px]">
        <span className="text-white">Your </span>
        <span className="text-secondary-500">Instructor</span>
      </h2>

      {/* Content */}
      <div className="flex flex-col lg:flex-row gap-6 justify-between items-stretch">
        {/* Left Card */}
        <div className="flex-1 p-8 rounded-3xl bg-primary-1000 border border-cyan-500/30 flex flex-col gap-6">
          {/* Badge + Name */}
          <div className="flex flex-col gap-4">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-secondary-600/50 to-secondary-600/30 border border-red-700/30 w-fit">
              <Image src="/Honor.svg" alt="Honor" width={24} height={24} />
              <span className="text-white/90 text-sm font-semibold flex items-center gap-2">
                Senior Expert
              </span>
            </div>

            {/* Name & Title */}
            <div className="flex flex-col gap-1">
              <p className="text-white text-base">Jailane Atef</p>
              <p className="text-secondary-500 text-base">
                Senior Architect & AI Researcher
              </p>
            </div>
          </div>

          {/* Highlights */}
          <ul className="flex flex-col gap-4 text-white/80 text-base">
            <li className="flex gap-3">
              <span className="text-secondary-500">•</span>
              +10 years of design and teaching experience
            </li>
            <li className="flex gap-3">
              <span className="text-secondary-500">•</span>
              Lecturer at AASTMT
            </li>
            <li className="flex gap-3">
              <span className="text-secondary-500">•</span>
              MSc. in Generative AI & Creativity
            </li>
            <li className="flex gap-3">
              <span className="text-secondary-500">•</span>
              Speaker at the University of Maryland PM Symposium
            </li>
            <li className="flex gap-3">
              <span className="text-secondary-500">•</span>
              Studied Machine Learning & Python at Stanford
            </li>
          </ul>
        </div>

        {/* Right Image Card */}
        <div className="flex-1 p-6 rounded-3xl bg-primary-1000 border border-cyan-500/30 flex items-center justify-center">
          <div className="relative w-full h-[260px] md:h-[326px] rounded-2xl overflow-hidden">
            <Image
              src="/instructorVideo.jpg"
              alt="Instructor"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
