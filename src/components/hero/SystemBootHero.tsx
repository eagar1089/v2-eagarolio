import { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ArrowUpRight, Github, FileText } from "lucide-react";
import { portfolio } from "@/config";
import { SGRLogo } from "../brand/SGRLogo";
import { MagneticButton } from "../ui/primitives";
import type { GitHubData } from "@/types/github";
import { formatNumber } from "@/lib/utils";

interface Props {
  github: GitHubData | null;
}

const NODES = [
  { label: "Linux", x: "12%", y: "22%" },
  { label: "Docker", x: "84%", y: "20%" },
  { label: "Nginx", x: "8%", y: "72%" },
  { label: "MySQL", x: "88%", y: "70%" },
  { label: "React", x: "78%", y: "45%" },
  { label: "Go", x: "14%", y: "48%" },
];

export function SystemBootHero({ github }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const xSpring = useSpring(mx, { stiffness: 80, damping: 20 });
  const ySpring = useSpring(my, { stiffness: 80, damping: 20 });

  const bgX = useTransform(xSpring, [-0.5, 0.5], ["45%", "55%"]);
  const bgY = useTransform(ySpring, [-0.5, 0.5], ["45%", "55%"]);

  const onMove = (e: React.MouseEvent) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    mx.set((e.clientX - rect.left) / rect.width - 0.5);
    my.set((e.clientY - rect.top) / rect.height - 0.5);
  };
  const onLeave = () => { mx.set(0); my.set(0); };

  return (
    <section
      id="system-boot"
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className="relative flex min-h-screen w-full items-center justify-center overflow-hidden px-4 pt-24 pb-20 sm:px-6 sm:pt-28 sm:pb-24 lg:px-0"
    >
      {/* Grid overlay */}
      <div
        className="absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage: `linear-gradient(to right, rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.5) 1px, transparent 1px)`,
          backgroundSize: "56px 56px",
          maskImage: "radial-gradient(ellipse at center, black 30%, transparent 80%)",
        }}
        aria-hidden
      />
      <div className="aurora" aria-hidden />

      {/* Mouse-responsive lighting (desktop only) */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0 hidden opacity-80 lg:block"
        style={{
          background: useTransform(
            [bgX, bgY],
            ([x, y]) =>
              `radial-gradient(60vmax circle at ${x as string} ${y as string}, rgba(34,211,238,0.12), rgba(139,92,246,0.06) 30%, transparent 60%)`
          ),
        }}
      />

      {/* Floating nodes (desktop only) */}
      <div className="pointer-events-none absolute inset-0 hidden lg:block" aria-hidden>
        {NODES.map((node, i) => (
          <motion.div
            key={node.label}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.2 + i * 0.1, duration: 0.8 }}
            className="absolute"
            style={{ left: node.x, top: node.y }}
          >
            <motion.div
              animate={{ y: [0, -6, 0] }}
              transition={{
                duration: 4 + i * 0.3,
                repeat: Infinity,
                ease: "easeInOut",
                delay: i * 0.4,
              }}
              className="flex items-center gap-2"
            >
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#22d3ee] opacity-60" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-[#22d3ee]/80" />
              </span>
              <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-[#7D8590]">
                {node.label}
              </span>
            </motion.div>
          </motion.div>
        ))}

        {/* Subtle topology lines */}
        <svg className="absolute inset-0 h-full w-full" preserveAspectRatio="none" viewBox="0 0 100 100">
          <defs>
            <linearGradient id="line-grad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#22d3ee" stopOpacity="0.25" />
              <stop offset="100%" stopColor="#a855f7" stopOpacity="0" />
            </linearGradient>
          </defs>
          {NODES.slice(0, 4).map((a, i) => {
            const b = NODES[(i + 1) % NODES.length];
            return (
              <line
                key={i}
                x1={parseFloat(a.x)}
                y1={parseFloat(a.y)}
                x2={parseFloat(b.x)}
                y2={parseFloat(b.y)}
                stroke="url(#line-grad)"
                strokeWidth="0.1"
              />
            );
          })}
        </svg>
      </div>

      {/* Hero content */}
      <div className="relative z-10 mx-auto flex w-full max-w-6xl flex-col items-center text-center">
        {/* Availability pill */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-8 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 backdrop-blur-sm"
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#10b981] opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-[#10b981]" />
          </span>
          <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-[#B8C2CC]">
            {portfolio.availability.label}
          </span>
        </motion.div>

        {/* Animated logo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="mb-10"
        >
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            aria-label="Scroll to top"
            data-cursor="Top"
            className="group"
          >
            <SGRLogo size={180} />
          </button>
        </motion.div>

        {/* Name */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="font-display text-balance text-[2.5rem] font-bold leading-[1.05] tracking-tight sm:text-5xl md:text-6xl lg:text-7xl"
        >
          {portfolio.name}
        </motion.h1>

        {/* Title */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.6 }}
          className="mt-3 flex items-center gap-3"
        >
          <span className="h-px w-8 bg-gradient-to-r from-transparent to-[#22d3ee]" />
          <span className="font-mono text-[11px] uppercase tracking-[0.3em] sm:text-xs">
            <span className="gradient-text-cyan-violet font-semibold">{portfolio.titles.primary}</span>
            <span className="mx-1.5 text-[#7D8590]">·</span>
            <span className="text-[#B8C2CC]">{portfolio.focus.join(" · ")}</span>
          </span>
          <span className="h-px w-8 bg-gradient-to-l from-transparent to-[#a855f7]" />
        </motion.div>

        {/* Tagline */}
        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.8 }}
          className="mt-8 max-w-3xl text-balance text-lg font-light leading-relaxed text-[#B8C2CC] sm:text-xl md:text-2xl lg:text-[28px]"
        >
          {portfolio.tagline}
        </motion.h2>

        {/* Supporting text */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.05, duration: 0.8 }}
          className="mt-4 max-w-2xl text-sm text-[#7D8590] sm:text-base"
        >
          {portfolio.bio}
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="mt-10 flex flex-wrap items-center justify-center gap-3"
        >
          <MagneticButton
            onClick={() => document.getElementById("command-centre")?.scrollIntoView({ behavior: "smooth" })}
          >
            Explore TechStack
            <ArrowUpRight className="h-4 w-4" />
          </MagneticButton>
          <MagneticButton href={portfolio.social.github.url} variant="secondary">
            <Github className="h-4 w-4" />
            Open GitHub
          </MagneticButton>
          <MagneticButton
            onClick={() => document.getElementById("resume")?.scrollIntoView({ behavior: "smooth" })}
            variant="ghost"
          >
            <FileText className="h-4 w-4" />
            View Resume
          </MagneticButton>
        </motion.div>

        {/* GitHub stats strip */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4, duration: 0.8 }}
          className="mt-16 w-full max-w-2xl overflow-hidden rounded-xl border border-white/10 bg-white/5"
        >
          <div className="grid grid-cols-2 gap-px sm:grid-cols-4">
            <Stat label="Public repos" value={github ? String(github.user.public_repos) : "-"} />
            <Stat label="Total stars" value={github ? formatNumber(github.totalStars) : "-"} />
            <Stat label="Followers" value={github ? formatNumber(github.user.followers) : "-"} />
            <Stat
              label="Top language"
              value={
                github
                  ? Object.keys(github.languages).sort((a, b) => github.languages[b] - github.languages[a])[0] ?? "-"
                  : "-"
              }
            />
          </div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.button
          onClick={() => document.getElementById("command-centre")?.scrollIntoView({ behavior: "smooth" })}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.8, duration: 0.6 }}
          className="group mt-16 flex flex-col items-center gap-2 text-[#7D8590] transition-colors hover:text-[#22d3ee]"
          aria-label="Scroll to explore"
        >
          <span className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.4em]">
            Scroll to explore
          </span>
          <motion.span
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
            className="block h-8 w-px bg-gradient-to-b from-[#22d3ee]/60 to-transparent"
          />
        </motion.button>
      </div>
    </section>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col items-center gap-1 bg-[#0C121D] px-6 py-4">
      <span className="font-mono text-[9px] uppercase tracking-[0.25em] text-[#7D8590]">
        {label}
      </span>
      <span className="font-mono text-base font-semibold tabular-nums text-white">
        {value}
      </span>
    </div>
  );
}
