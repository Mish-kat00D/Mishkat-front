import { Workshop } from "@/types/workshop";
import { CircleCheck, Zap } from "lucide-react";
import BookButton from "./BookButton";

const BlackFridayOfferDesign = ({
  price,
  originalPrice,
  currency,
  workshop,
  enrolled,
  user,
}: {
  price: number;
  originalPrice: number | null;
  currency: string;
  workshop: Workshop;
  enrolled: boolean;
  user: any;
}) => {
  const discount = originalPrice ? originalPrice - price : 0;

  const features = [
    `${workshop.durationHours} hours of recorded training`,
    `${workshop.sessions?.length} comprehensive modules`,
    "Watch anytime, from anywhere",
    "Hands-on projects",
    "Certificate of completion",
  ];

  return (
    <section className="w-full max-w-[672px] mx-auto flex flex-col gap-8">
      {/* Title */}
      <h2 className="text-center text-white text-3xl font-bold leading-[48px]">
        {workshop.isOnSale ? "Limited Offer" : "Join the Workshop Now"}
      </h2>

      {/* Card */}
      <div className="w-full p-10 bg-primary-1000 rounded-3xl border border-white/10 flex flex-col gap-8">
        {/* Badge */}
        {workshop.isOnSale && <div className="w-fit px-6 py-2 bg-secondary-500 rounded-full flex items-center gap-3">
          <Zap className="w-5 h-5 text-white flex-shrink-0" />
          <span className="text-white text-sm">
            Limited Seats Available
          </span>
        </div>}

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

        {/* CTA */}
        <BookButton enrolled={enrolled} isUser={!!user} workshop={workshop} />
      </div>
    </section>
  );
};

export default BlackFridayOfferDesign;
