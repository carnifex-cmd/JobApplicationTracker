'use client';

import {
  Navbar,
  HeroSection,
  ProblemSolution,
  FeaturesSection,
  DifferentiatorSection,
  CTASection,
  Footer,
} from '../components/landing';

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-[#0D1117]">
      <Navbar />
      <HeroSection />
      <ProblemSolution />
      <FeaturesSection />
      <DifferentiatorSection />
      <CTASection />
      <Footer />
    </main>
  );
}