'use client';
import { Hero, About, Community, CTA, FeaturedCourses, FeaturedProgram, Testimonials } from "@/components/home";
import Navbar from "@/components/shared/Navbar";
import RedSpot from "@/components/shared/RedSpot";
import AuthProvider from "@/lib/context/AuthContext";

export default function Home() {
  return (
    <AuthProvider>
      <Navbar />
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
    </AuthProvider>
  );
}
