import { forwardRef, type SVGProps } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

// =========================================================================
// SGR Brand Mark
//
// A technical insignia combining an orbital system, a server topology node,
// and the SGR monogram. Built from pure SVG + CSS animation for performance.
// =========================================================================

export interface SGRLogoProps extends SVGProps<SVGSVGElement> {
  size?: number;
  intensity?: number; // 0-1, controls animation energy
  interactive?: boolean;
  onClick?: () => void;
}

export const SGRLogo = forwardRef<SVGSVGElement, SGRLogoProps>(function SGRLogo(
  { size = 120, intensity = 1, interactive = true, onClick, className, ...rest },
  ref
) {
  const reduceMotion = useReducedMotion();
  const animated = !reduceMotion && intensity > 0;

  const ringDuration = 22 / Math.max(0.3, intensity); // seconds
  const ringDurationFast = ringDuration * 0.55;

  return (
    <svg
      ref={ref}
      viewBox="0 0 120 120"
      width={size}
      height={size}
      role="img"
      aria-label="SGR - Sagar Parab"
      className={cn(
        "relative select-none",
        interactive && "cursor-pointer transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:scale-[1.04] active:scale-[0.98]",
        className
      )}
      onClick={onClick}
      {...rest}
    >
      <defs>
        {/* Cyan → violet gradient */}
        <linearGradient id="sgr-grad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%"   stopColor="#22d3ee" />
          <stop offset="55%"  stopColor="#6366f1" />
          <stop offset="100%" stopColor="#a855f7" />
        </linearGradient>

        <radialGradient id="sgr-core" cx="50%" cy="50%" r="50%">
          <stop offset="0%"   stopColor="#22d3ee" stopOpacity="0.95" />
          <stop offset="55%"  stopColor="#0B525B" stopOpacity="0.45" />
          <stop offset="100%" stopColor="#070B12" stopOpacity="0" />
        </radialGradient>

        <linearGradient id="sgr-scan" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%"   stopColor="#22d3ee" stopOpacity="0" />
          <stop offset="50%"  stopColor="#22d3ee" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#22d3ee" stopOpacity="0" />
        </linearGradient>

        <filter id="sgr-glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="1.6" result="b" />
          <feMerge>
            <feMergeNode in="b" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>

        <clipPath id="sgr-clip">
          <circle cx="60" cy="60" r="50" />
        </clipPath>
      </defs>

      {/* Outer ambient halo */}
      <circle cx="60" cy="60" r="58" fill="url(#sgr-core)" opacity={0.55 * intensity} />

      {/* Technical tick marks around the outer ring */}
      <g opacity="0.55" stroke="#B8C2CC" strokeWidth="0.6">
        {Array.from({ length: 48 }).map((_, i) => {
          const angle = (i * 360) / 48;
          const long = i % 6 === 0;
          const r1 = 54;
          const r2 = long ? 58 : 56.5;
          const rad = (angle * Math.PI) / 180;
          const x1 = 60 + r1 * Math.cos(rad);
          const y1 = 60 + r1 * Math.sin(rad);
          const x2 = 60 + r2 * Math.cos(rad);
          const y2 = 60 + r2 * Math.sin(rad);
          return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} />;
        })}
      </g>

      {/* Outer dashed rotating ring */}
      <g style={{ transformOrigin: "60px 60px", animation: animated ? `ring-rotate ${ringDuration}s linear infinite` : "none" }}>
        <circle
          cx="60" cy="60" r="52"
          fill="none"
          stroke="url(#sgr-grad)"
          strokeWidth="1"
          strokeDasharray="2 5"
          opacity="0.85"
        />
      </g>

      {/* Middle solid ring with small nodes */}
      <g style={{ transformOrigin: "60px 60px", animation: animated ? `ring-rotate-reverse ${ringDurationFast}s linear infinite` : "none" }}>
        <circle
          cx="60" cy="60" r="46"
          fill="none"
          stroke="url(#sgr-grad)"
          strokeWidth="0.8"
          opacity="0.9"
        />
        {/* 4 cardinal nodes */}
        {[0, 90, 180, 270].map((deg) => {
          const rad = (deg * Math.PI) / 180;
          const x = 60 + 46 * Math.cos(rad);
          const y = 60 + 46 * Math.sin(rad);
          return (
            <g key={deg}>
              <circle cx={x} cy={y} r="2.2" fill="#22d3ee" />
              <circle cx={x} cy={y} r="4" fill="#22d3ee" opacity="0.2" />
            </g>
          );
        })}
      </g>

      {/* Inner static ring with fine markings */}
      <circle
        cx="60" cy="60" r="40"
        fill="none"
        stroke="rgba(255,255,255,0.18)"
        strokeWidth="0.5"
      />
      <g opacity="0.5" stroke="#B8C2CC" strokeWidth="0.4">
        {Array.from({ length: 24 }).map((_, i) => {
          const angle = (i * 360) / 24;
          const r1 = 38;
          const r2 = 40;
          const rad = (angle * Math.PI) / 180;
          return (
            <line
              key={i}
              x1={60 + r1 * Math.cos(rad)}
              y1={60 + r1 * Math.sin(rad)}
              x2={60 + r2 * Math.cos(rad)}
              y2={60 + r2 * Math.sin(rad)}
            />
          );
        })}
      </g>

      {/* Orbiting particles */}
      {animated && (
        <g>
          {[
            { r: 46, dur: 9,  color: "#22d3ee", size: 1.4, delay: 0 },
            { r: 46, dur: 13, color: "#a855f7", size: 1.2, delay: -4 },
            { r: 40, dur: 7,  color: "#22d3ee", size: 1.1, delay: -2 },
          ].map((p, i) => (
            <circle
              key={i}
              cx="60"
              cy="60"
              r={p.size}
              fill={p.color}
              filter="url(#sgr-glow)"
              style={{
                transformOrigin: "60px 60px",
                animation: `orbit ${p.dur}s linear infinite`,
                animationDelay: `${p.delay}s`,
                ["--orbit-r" as string]: `${p.r}px`,
              } as React.CSSProperties}
            />
          ))}
        </g>
      )}

      {/* Scanning beam (clipped to inner disc) */}
      <g clipPath="url(#sgr-clip)">
        <rect
          x="20" y="20" width="80" height="12"
          fill="url(#sgr-scan)"
          opacity={animated ? 0.55 : 0}
          style={{ animation: animated ? "scan 3.6s cubic-bezier(0.4,0,0.2,1) infinite" : "none" }}
        />
      </g>

      {/* Core disc */}
      <circle cx="60" cy="60" r="34" fill="#0C121D" stroke="url(#sgr-grad)" strokeWidth="1" />
      <circle cx="60" cy="60" r="34" fill="url(#sgr-core)" opacity="0.6" />

      {/* SGR Monogram */}
      <text
        x="60"
        y="64"
        textAnchor="middle"
        fontFamily="ui-monospace, SFMono-Regular, Menlo, monospace"
        fontSize="16"
        fontWeight="700"
        letterSpacing="1.5"
        fill="url(#sgr-grad)"
        filter="url(#sgr-glow)"
      >
        SGR
      </text>

      {/* Tiny technical label under the monogram */}
      <text
        x="60"
        y="78"
        textAnchor="middle"
        fontFamily="ui-monospace, SFMono-Regular, Menlo, monospace"
        fontSize="4"
        letterSpacing="2"
        fill="#7D8590"
      >
        TechStack
      </text>

      {/* Cardinal micro-marks outside the core */}
      <g stroke="#7D8590" strokeWidth="0.6">
        <line x1="60" y1="14" x2="60" y2="18" />
        <line x1="60" y1="102" x2="60" y2="106" />
        <line x1="14" y1="60" x2="18" y2="60" />
        <line x1="102" y1="60" x2="106" y2="60" />
      </g>
    </svg>
  );
});

/**
 * A motion-wrapped version for use with Framer Motion layout animations.
 */
export const SGRLogoMotion = motion.create(SGRLogo);
