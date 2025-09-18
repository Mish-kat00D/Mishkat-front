import { Hero, About, Community, CTA, FeaturedCourses, FeaturedProgram, Testimonials } from "@/components/home";
import RedSpot from "@/components/shared/RedSpot";

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <div className="relative overflow-x-clip">
        <RedSpot cl='absolute -top-2/5 -right-1/4'/>
        <FeaturedProgram />
      </div>
      <FeaturedCourses />
      <Testimonials />
      <Community />
      <CTA />
    </>
  );
}
