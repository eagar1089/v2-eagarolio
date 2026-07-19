import { useState, useCallback, useRef } from 'react';
import { motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';
import SGRLogo from './SGRLogo';
import { PORTFOLIO_CONFIG } from '@/config/portfolio';
import { useReducedMotion } from '@/lib/motion';

function AnimatedChild({ children, index }: { children: React.ReactNode; index: number }) {
  const reducedMotion = useReducedMotion();
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{
        delay: reducedMotion ? 0 : index * 0.1 + 0.2,
        duration: reducedMotion ? 0 : 0.6,
        ease: [0.22, 1, 0.36, 1] as unknown as 'easeOut',
      }}
    >
      {children}
    </motion.div>
  );
}

export default function SystemBootHero() {
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });
  const sectionRef = useRef<HTMLElement>(null);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    const rect = sectionRef.current?.getBoundingClientRect();
    if (!rect) return;
    setMousePos({
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100,
    });
  }, []);

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative flex min-h-screen min-h-[100svh] items-center justify-center overflow-hidden py-24 sm:py-28 lg:py-20"
      onMouseMove={handleMouseMove}
    >
      {/* Aurora background layer - responsive */}
      <div className="absolute inset-0 pointer-events-none aurora-layer">
        <div className="aurora-blob" />
        <div className="aurora-blob" />
        <div className="aurora-blob" />
      </div>

      {/* Ambient lighting based on mouse */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(800px circle at ${mousePos.x}% ${mousePos.y}%, rgba(0,100,102,0.08), transparent 50%)`,
        }}
      />

      {/* Topology lines */}
      <svg className="absolute inset-0 w-full h-full opacity-[0.04]" aria-hidden="true">
        <line x1="10%" y1="30%" x2="30%" y2="50%" stroke="#006466" strokeWidth="0.5" />
        <line x1="30%" y1="50%" x2="70%" y2="40%" stroke="#006466" strokeWidth="0.5" />
        <line x1="70%" y1="40%" x2="90%" y2="60%" stroke="#006466" strokeWidth="0.5" />
        <line x1="20%" y1="70%" x2="50%" y2="55%" stroke="#3E1F47" strokeWidth="0.5" />
        <line x1="50%" y1="55%" x2="80%" y2="75%" stroke="#3E1F47" strokeWidth="0.5" />
        <circle cx="30%" cy="50%" r="2" fill="#00D4AA" />
        <circle cx="70%" cy="40%" r="2" fill="#00D4AA" />
        <circle cx="50%" cy="55%" r="2" fill="#00D4AA" />
      </svg>

      <div className="relative z-10 mx-auto w-full max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center text-center">
          {/* Logo */}
          <AnimatedChild index={0}>
            <div className="mb-6 sm:mb-8">
              <SGRLogo size={104} variant="hero" className="sm:h-[120px] sm:w-[120px]" />
            </div>
          </AnimatedChild>

          {/* Name */}
          <AnimatedChild index={1}>
            <h1 className="text-4xl font-bold tracking-tight mb-4 sm:text-5xl md:text-6xl lg:text-7xl">
              <span className="bg-gradient-to-r from-white via-[#B8C2CC] to-[#7D8590] bg-clip-text text-transparent">
                {PORTFOLIO_CONFIG.name}
              </span>
            </h1>
          </AnimatedChild>

          {/* Role */}
          <AnimatedChild index={2}>
            <div className="mb-6">
              <span className="text-lg sm:text-xl font-mono text-[#00D4AA] tracking-wide">
                {PORTFOLIO_CONFIG.role}
              </span>
            </div>
          </AnimatedChild>

          {/* Sub-roles */}
          <AnimatedChild index={3}>
            <div className="mb-8">
              <div className="flex flex-wrap justify-center gap-2 text-xs font-mono text-[#7D8590]">
                {PORTFOLIO_CONFIG.subRoles.map((role) => (
                  <span key={role} className="px-2 py-0.5 rounded bg-[#0C121D] border border-[#1B3A4B]">
                    {role}
                  </span>
                ))}
              </div>
            </div>
          </AnimatedChild>

          {/* Tagline */}
          <AnimatedChild index={5}>
            <p className="max-w-2xl text-base sm:text-lg text-[#B8C2CC] leading-relaxed mb-10">
              {PORTFOLIO_CONFIG.tagline}
            </p>
          </AnimatedChild>

          {/* Bio */}
          <AnimatedChild index={6}>
            <p className="max-w-xl text-sm text-[#7D8590] leading-relaxed mb-12">
              {PORTFOLIO_CONFIG.bio}
            </p>
          </AnimatedChild>

          {/* CTAs */}
          <AnimatedChild index={7}>
            <div className="flex w-full flex-col justify-center gap-3 sm:w-auto sm:flex-row sm:flex-wrap sm:gap-4">
              <a
                href={`https://github.com/${PORTFOLIO_CONFIG.github}`}
                target="_blank"
                rel="noopener noreferrer"
                className="glass-button group"
              >
                Open GitHub
                <ExternalLink size={14} className="group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-transform" />
              </a>
              <a
                href="#resume"
                className="glass-button group"
              >
                View Resume
              </a>
            </div>
          </AnimatedChild>
        </div>

      </div>
    </section>
  );
}
