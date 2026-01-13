export default function Loading() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-primary-1000">

      {/* Background noise overlay */}
      <div className="absolute inset-0 bg-nois opacity-40 pointer-events-none" />

      {/* Loader */}
      <div className="relative flex flex-col items-center gap-6">

        {/* Spinner */}
        <div className="relative w-16 h-16">
          <span className="absolute inset-0 rounded-full border-4 border-primary-30" />
          <span className="absolute inset-0 rounded-full border-4 border-secondary-500 border-t-transparent animate-spin" />
        </div>

        {/* Text */}
        <p className="text-neutral-300 text-sm tracking-wide">
          Loading experience…
        </p>
      </div>
    </div>
  )
}
