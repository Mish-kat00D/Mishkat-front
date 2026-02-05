import { Hero, About, Community, CTA, FeaturedCourses, FeaturedProgram, Testimonials } from "@/components/home";
import Email from "@/components/home/Email";
import FQs from "@/components/home/FQs";
import RedSpot from "@/components/shared/RedSpot";

export default function Home() {
  return (
    <main className="container mx-auto px-4">
      <Hero />
      <FeaturedCourses />
      <Testimonials />
      <Email />
      <FQs />
      <CTA />
    </main>
  );
}
