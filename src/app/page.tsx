import { Hero, About, Community, CTA, FeaturedCourses, FeaturedProgram, Testimonials } from "@/components/home";
import Email from "@/components/home/Email";
import FQs from "@/components/home/FQs";
import RedSpot from "@/components/shared/RedSpot";

export default function Home() {
  return (
    <>
      <Hero />
      <FeaturedCourses />
      <Testimonials />
      <Email />
      <CTA />
      <FQs />
    </>
  );
}
