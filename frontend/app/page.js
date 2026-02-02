'use client';

import { useEffect, useRef } from 'react';
import { useTheme } from 'next-themes';
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
  const { theme, setTheme } = useTheme();
  const previousTheme = useRef(null);

  useEffect(() => {
    // Store the current theme and force dark mode
    if (theme !== 'dark') {
      previousTheme.current = theme;
      setTheme('dark');
    }

    // Restore previous theme on unmount
    return () => {
      if (previousTheme.current && previousTheme.current !== 'dark') {
        setTheme(previousTheme.current);
      }
    };
  }, []);
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