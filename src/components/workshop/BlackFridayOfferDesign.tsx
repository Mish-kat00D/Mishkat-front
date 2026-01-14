import { Workshop } from "@/types/workshop";
import { CircleCheck, Zap } from "lucide-react";

const BlackFridayOfferDesign = ({
  price,
  originalPrice,
  currency,
}: {
  price: number;
  originalPrice: number | null;
  currency: string;
}) => {
  const discount = originalPrice ? originalPrice - price : 0;

  const features = [
    "8 hours of recorded training",
    "4 comprehensive modules",
    "Watch anytime, from anywhere",
    "Hands-on projects",
    "Certificate of completion",
  ];

  return (
    <section className="w-full max-w-[672px] mx-auto flex flex-col gap-8">
      {/* Title */}
      <h2 className="text-center text-white text-3xl font-bold leading-[48px]">
        Limited Offer
      </h2>

      {/* Card */}
      <div className="w-full p-10 bg-primary-1000 rounded-3xl border border-white/10 flex flex-col gap-8">
        {/* Badge */}
        <div className="w-fit px-6 py-2 bg-secondary-500 rounded-full flex items-center gap-3">
          <Zap className="w-5 h-5 text-white flex-shrink-0" />
          <span className="text-white text-sm">
            Limited Seats Available
          </span>
        </div>

        {/* Pricing */}
        <div className="flex flex-col gap-3">
          <div className="flex items-end gap-6">
            <span className="text-secondary-500 text-6xl font-bold">
              {price} {currency}
            </span>
            {originalPrice && (
              <span className="text-white/40 text-xl line-through">
                {originalPrice} {currency}
              </span>
            )}
          </div>

          {discount > 0 && (
            <p className="text-white/70 text-lg font-medium">
              Save {discount} {currency} with our offer!
            </p>
          )}
        </div>

        {/* Features */}
        <ul className="flex flex-col gap-3">
          {features.map((feature, index) => (
            <li key={index} className="flex items-center gap-3">
              <CircleCheck className='w-5 h-5 text-secondary-500 flex-shrink-0' />
              <span className="text-white/80 text-base font-medium">
                {feature}
              </span>
            </li>
          ))}
        </ul>

        {/* CTA (design only) */}
        <div className="w-full h-14 bg-secondary-500 rounded-2xl shadow-[0px_4px_6px_-4px_rgba(245,73,0,0.30)] flex items-center justify-center">
          <span className="text-white text-base font-bold">
            Enroll Now
          </span>
        </div>
      </div>
    </section>
  );
};

export default BlackFridayOfferDesign;
