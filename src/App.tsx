import { useState, useEffect, useCallback } from 'react';
import { AnimatePresence } from 'framer-motion';
import BackgroundSystem from './components/Background';
import PortfolioPreloader from './components/Preloader';
import SystemBootHero from './components/Hero';
import InfrastructureMap from './components/InfrastructureMap';
import CapabilityConstellation from './components/SkillsConstellation';
import ProjectMissionControl from './components/Projects';
import ArchitectureExplorer from './components/ArchitectureExplorer';
import GitHubIntelligence from './components/GitHubSection';
import MissionLog from './components/MissionLog';
import RCALab from './components/RCALab';
import { ResumeConsole, CommunicationUplink } from './components/ResumeContact';
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

        {/* 2. Infrastructure Command Centre */}
        <InfrastructureMap />

        {/* 4. Capability Constellation */}
        <CapabilityConstellation />

        {/* 5. Project Mission Control */}
        <ProjectMissionControl />

        {/* 6. Architecture Explorer */}
        <ArchitectureExplorer />

        {/* 7. GitHub Intelligence */}
        <GitHubIntelligence />

        {/* 7. Career Mission Log */}
        <MissionLog />

        {/* 8. RCA Research Lab */}
        <RCALab />

        {/* 9. Resume Console */}
        <ResumeConsole />

        {/* 10. Communication Uplink */}
        <CommunicationUplink />

        {/* 11. Footer */}
        <Footer />
      </main>
    </div>
  );
}
