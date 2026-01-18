"use client";

const CTAButton = () => {
  return (
    <button onClick={() => window.scrollTo({ top: document.getElementById('workshops')?.offsetTop, behavior: 'smooth' })} className=" px-6 py-3 bg-secondary-500 rounded-full flex justify-center items-center gap-2 hover:opacity-90 transition">
      <span className="text-white text-lg font-bold leading-relaxed">
        Get Started
      </span>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={2}
        stroke="currentColor"
        className="w-6 h-6 text-white"
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
      </svg>
    </button>
  )
}

export default CTAButton