import { useState, useEffect, useCallback } from 'react';
import { AnimatePresence } from 'framer-motion';
import BackgroundSystem from './components/Background';
import PortfolioPreloader from './components/Preloader';
import SystemBootHero from './components/Hero';
import TechStackMap from './components/InfrastructureMap';
import ProjectMissionControl from './components/Projects';
import GitHubIntelligence from './components/GitHubSection';
import { MissionLog } from './components/experience/MissionLog';
import { ResumeConsole } from './components/resume/ResumeConsole';
import { CommunicationUplink } from './components/ResumeContact';
import Footer from './components/ResumeContact';
import SideRails from './components/SideRails';
import MobileNavigation from './components/MobileNav';
import CustomCursor from './components/CustomCursor';

export default function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if this is a direct load
    const hasVisited = sessionStorage.getItem('sgr_preloaded');
    if (hasVisited) {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const sections = Array.from(document.querySelectorAll<HTMLElement>('.portfolio-main > section:not(#hero)'));
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    sections.forEach((section) => section.classList.add('immersive-section'));
    if (reduceMotion || !('IntersectionObserver' in window)) {
      sections.forEach((section) => section.classList.add('is-visible'));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { rootMargin: '0px 0px -12% 0px', threshold: 0.08 }
    );
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  const handlePreloadComplete = useCallback(() => {
    setLoading(false);
    sessionStorage.setItem('sgr_preloaded', 'true');
  }, []);

  return (
    <div className="relative min-h-screen">
      {/* Background */}
      <BackgroundSystem />
      <CustomCursor />

      {/* Preloader */}
      <AnimatePresence>
        {loading && (
          <PortfolioPreloader onComplete={handlePreloadComplete} />
        )}
      </AnimatePresence>

      {/* Lock scroll during loading */}
      {loading && <div className="fixed inset-0 z-[9999] bg-[#070B12]" />}

      {/* Skip to content link */}
      <a
        href="#main-content"
        className="skip-link"
      >
        Skip to content
      </a>

      {/* Navigation */}
      <MobileNavigation />
      <SideRails />

      {/* Main content */}
      <main id="main-content" className="portfolio-main relative z-10">
        {/* 1. System Boot Hero */}
        <SystemBootHero />

        {/* 2. Technology Stack */}
        <TechStackMap />

        {/* 3. Project Mission Control */}
        <ProjectMissionControl />

        {/* 4. GitHub Intelligence */}
        <GitHubIntelligence />

        {/* 5. Career Mission Log */}
        <MissionLog />

        {/* 6. Resume Console */}
        <ResumeConsole />

        {/* 7. Communication Uplink */}
        <CommunicationUplink />

        {/* Footer */}
        <Footer />
      </main>
    </div>
  );
}
