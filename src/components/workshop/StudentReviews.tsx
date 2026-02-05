import { Workshop } from "@/types/workshop";
import { PiStarBold, PiStarFill } from "react-icons/pi";

const Stars = ({ rating }: { rating: number }) => {
  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        star <= rating ? (
          <PiStarFill key={star} className="w-5 h-5 text-secondary-500" />
        ) : (
          <PiStarBold key={star} className="w-5 h-5 text-secondary-500" />
        )
      ))}
    </div>
  );
};

const ReviewCard = ({ review }: { review: Workshop['reviews'][0] }) => {
  return (
    <div className="min-w-[320px] max-w-[380px] flex-shrink-0 rounded-2xl bg-primary-900/20 border border-indigo-300/20 shadow-[0px_4px_20px_rgba(0,0,0,0.35)] px-4 py-6 flex flex-col items-center gap-5">
      {/* Quote */}
      <p className="text-center flex-1 text-neutral-300 text-xl font-medium leading-8">
        “{review.content}”
      </p>

      {/* Divider */}
      <div className="w-44 h-[3px] bg-gradient-to-r from-[#9533040D] via-[#FF5300] to-[#FB56070D]" />

      {/* Author */}
      <div className="flex flex-col items-center gap-1">
        <p className="text-white text-lg font-bold">
          {review.reviewerName}
        </p>
        <p className="text-neutral-400 text-sm font-bold">
          {review.reviewerTitle}
        </p>
      </div>

      {/* Rating */}
      <Stars rating={review.rating} />
    </div>
  );
};

const StudentReviews = ({ reviews }: { reviews: Workshop['reviews'] }) => {
  if (!reviews || reviews.length === 0) return null;
  return (
    <section className="w-full flex flex-col gap-6">
      {/* Title */}
      <h2 className="text-white text-[32px] text-center font-bold leading-[48px]">
        What Our Students Say
      </h2>

      {/* Horizontal Scroll */}
      <div className="flex justify-evenly gap-4 overflow-x-auto no-scrollbar pb-2">
        {reviews.map((review, index) => (
          <ReviewCard key={index} review={review} />
        ))}
      </div>
    </section>
  );
};

export default StudentReviews;
