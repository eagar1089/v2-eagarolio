import { useState, useCallback, useRef } from 'react';
import { motion } from 'framer-motion';
import { Cloud, Code, ExternalLink, GitBranch, Server } from 'lucide-react';
import SGRLogo from './SGRLogo';
import { PORTFOLIO_CONFIG } from '@/config/portfolio';
import { useReducedMotion } from '@/lib/motion';

function AnimatedChild({
  children,
  index,
  ready,
  kind = 'content',
}: {
  children: React.ReactNode;
  index: number;
  ready: boolean;
  kind?: 'logo' | 'content' | 'actions';
}) {
  const reducedMotion = useReducedMotion();
  const hidden = kind === 'logo'
    ? { opacity: 0, scale: 0.72, rotate: -10, y: 18, filter: 'blur(10px)' }
    : kind === 'actions'
      ? { opacity: 0, scale: 0.96, y: 18, filter: 'blur(5px)' }
      : { opacity: 0, scale: 1, rotate: 0, y: 24, filter: 'blur(7px)' };

  return (
    <motion.div
      className="w-full min-w-0"
      initial={hidden}
      animate={ready ? { opacity: 1, scale: 1, rotate: 0, y: 0, filter: 'blur(0px)' } : hidden}
      transition={{
        delay: reducedMotion || !ready ? 0 : index * 0.09,
        duration: reducedMotion ? 0 : kind === 'logo' ? 0.95 : 0.72,
        ease: [0.22, 1, 0.36, 1] as unknown as 'easeOut',
      }}
    >
      {children}
    </motion.div>
  );
}

export default function SystemBootHero({ ready = true }: { ready?: boolean }) {
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });
  const sectionRef = useRef<HTMLElement>(null);
  const roleIcons = [Server, GitBranch, Cloud, Code];
  const roleTones = ['neon-cyan', 'neon-violet', 'neon-cyan', 'neon-magenta'];

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
      <motion.div
        className="absolute inset-0 pointer-events-none aurora-layer"
        initial={{ opacity: 0, scale: 1.08 }}
        animate={ready ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 1.08 }}
        transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="aurora-blob" />
        <div className="aurora-blob" />
        <div className="aurora-blob" />
      </motion.div>

      {/* Ambient lighting based on mouse */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(800px circle at ${mousePos.x}% ${mousePos.y}%, rgba(0,100,102,0.08), transparent 50%)`,
        }}
      />

      {/* Topology lines */}
      <motion.svg
        className="absolute inset-0 h-full w-full"
        aria-hidden="true"
        initial={{ opacity: 0 }}
        animate={{ opacity: ready ? 0.04 : 0 }}
        transition={{ duration: 1.2, delay: ready ? 0.35 : 0 }}
      >
        <line x1="10%" y1="30%" x2="30%" y2="50%" stroke="#006466" strokeWidth="0.5" />
        <line x1="30%" y1="50%" x2="70%" y2="40%" stroke="#006466" strokeWidth="0.5" />
        <line x1="70%" y1="40%" x2="90%" y2="60%" stroke="#006466" strokeWidth="0.5" />
        <line x1="20%" y1="70%" x2="50%" y2="55%" stroke="#3E1F47" strokeWidth="0.5" />
        <line x1="50%" y1="55%" x2="80%" y2="75%" stroke="#3E1F47" strokeWidth="0.5" />
        <circle cx="30%" cy="50%" r="2" fill="#00D4AA" />
        <circle cx="70%" cy="40%" r="2" fill="#00D4AA" />
        <circle cx="50%" cy="55%" r="2" fill="#00D4AA" />
      </motion.svg>

      <div className="relative z-10 mx-auto w-full max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center text-center">
          {/* Logo */}
          <AnimatedChild index={0} ready={ready} kind="logo">
            <div className="mb-6 flex justify-center sm:mb-8">
              <SGRLogo
                size={144}
                variant="hero"
                className="h-[124px] w-[124px] sm:h-[144px] sm:w-[144px]"
              />
            </div>
          </AnimatedChild>

          {/* Name */}
          <AnimatedChild index={1} ready={ready}>
            <h1 className="mb-4 text-4xl font-bold tracking-[-0.04em] drop-shadow-[0_12px_45px_rgba(0,212,170,0.12)] sm:text-5xl md:text-6xl lg:text-7xl">
              <span className="bg-gradient-to-r from-white via-[#B8C2CC] to-[#7D8590] bg-clip-text text-transparent">
                {PORTFOLIO_CONFIG.name}
              </span>
            </h1>
          </AnimatedChild>

          {/* Role */}
          <AnimatedChild index={2} ready={ready}>
            <div className="mb-6">
              <span className="inline-flex items-center gap-2 text-lg font-mono tracking-wide text-[#5eead4] [text-shadow:0_0_18px_rgba(45,212,191,0.45)] sm:text-xl">
                <Server className="h-5 w-5" aria-hidden="true" />
                {PORTFOLIO_CONFIG.role}
              </span>
            </div>
          </AnimatedChild>

          {/* Sub-roles */}
          <AnimatedChild index={3} ready={ready}>
            <div className="mx-auto mb-8 max-w-2xl">
              <div className="flex flex-wrap justify-center gap-2 text-xs font-mono text-[#7D8590]">
                {PORTFOLIO_CONFIG.subRoles.map((role, index) => {
                  const Icon = roleIcons[index % roleIcons.length];
                  return (
                  <span key={role} className={`neon-pill ${roleTones[index % roleTones.length]}`}>
                    <Icon className="h-3.5 w-3.5" aria-hidden="true" />
                    {role}
                  </span>
                  );
                })}
              </div>
            </div>
          </AnimatedChild>

          {/* Tagline */}
          <AnimatedChild index={4} ready={ready}>
            <p className="mx-auto mb-8 max-w-2xl text-base font-medium leading-relaxed text-white/90 [text-shadow:0_2px_20px_rgba(0,0,0,0.7)] sm:text-lg">
              {PORTFOLIO_CONFIG.tagline}
            </p>
          </AnimatedChild>

          {/* Bio */}
          <AnimatedChild index={5} ready={ready}>
            <p className="mx-auto mb-12 max-w-xl text-sm leading-relaxed text-[#B8C2CC] [text-shadow:0_2px_18px_rgba(0,0,0,0.75)]">
              {PORTFOLIO_CONFIG.bio}
            </p>
          </AnimatedChild>

          {/* CTAs */}
          <AnimatedChild index={6} ready={ready} kind="actions">
            <div className="mx-auto flex w-full max-w-sm flex-col justify-center gap-3 sm:max-w-none sm:flex-row sm:flex-wrap sm:gap-4">
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
