import { useEffect, useState, useCallback } from 'react';

interface SGRLogoProps {
  size?: number;
  animated?: boolean;
  onClick?: () => void;
  className?: string;
  variant?: 'default' | 'minimal' | 'hero';
}

export default function SGRLogo({
  size = 120,
  animated = true,
  onClick,
  className = '',
  variant = 'default',
}: SGRLogoProps) {
  const [hovered, setHovered] = useState(false);
  const [clicked, setClicked] = useState(false);

  const handleClick = useCallback(() => {
    setClicked(true);
    setTimeout(() => setClicked(false), 600);
    onClick?.();
  }, [onClick]);

  useEffect(() => {
    if (clicked) {
      const t = setTimeout(() => setClicked(false), 600);
      return () => clearTimeout(t);
    }
  }, [clicked]);

  const strokeWidth = size > 80 ? 1.2 : 0.8;
  const textFontSize = size > 80 ? '11' : '8';
  const particleSize = size > 80 ? 1.5 : 1;

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 120 120"
      className={`${className} ${onClick ? 'cursor-pointer' : ''}`}
      onClick={handleClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      role="img"
      aria-label="SGR Logo - Sagar Parab"
      style={{ transition: 'transform 0.4s cubic-bezier(0.22, 1, 0.36, 1)' }}
    >
      <defs>
        <linearGradient id="sgrGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#006466" />
          <stop offset="50%" stopColor="#212F45" />
          <stop offset="100%" stopColor="#3E1F47" />
        </linearGradient>
        <linearGradient id="sgrTextGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#00D4AA" />
          <stop offset="100%" stopColor="#7B61FF" />
        </linearGradient>
        <filter id="sgrGlow">
          <feGaussianBlur stdDeviation="2" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Outer ring */}
      <circle
        cx="60"
        cy="60"
        r="56"
        fill="none"
        stroke="url(#sgrGrad)"
        strokeWidth={strokeWidth}
        strokeDasharray={hovered ? '0' : '283 3'}
        strokeLinecap="round"
        style={{
          transformOrigin: '60px 60px',
          transition: 'stroke-dasharray 0.6s ease',
          animation: animated ? `sgrSpin ${hovered ? '8s' : '20s'} linear infinite` : 'none',
        }}
      />

      {/* Inner dashed ring */}
      <circle
        cx="60"
        cy="60"
        r="48"
        fill="none"
        stroke="rgba(0,100,102,0.2)"
        strokeWidth={strokeWidth * 0.5}
        strokeDasharray="4 8"
        style={{
          transformOrigin: '60px 60px',
          animation: animated ? `sgrSpinReverse 30s linear infinite` : 'none',
        }}
      />

      {/* Main circle fill */}
      <circle
        cx="60"
        cy="60"
        r="44"
        fill="rgba(7,11,18,0.9)"
        stroke="rgba(0,100,102,0.3)"
        strokeWidth={strokeWidth}
      />

      {/* Scanning beam */}
      {animated && (
        <line
          x1="16"
          y1="60"
          x2="104"
          y2="60"
          stroke="url(#sgrTextGrad)"
          strokeWidth="0.4"
          opacity="0.3"
          style={{
            animation: `sgrScan 4s ease-in-out infinite`,
          }}
        />
      )}

      {/* Cross-hair marks */}
      <line x1="60" y1="12" x2="60" y2="18" stroke="rgba(0,100,102,0.3)" strokeWidth={strokeWidth * 0.6} />
      <line x1="60" y1="102" x2="60" y2="108" stroke="rgba(0,100,102,0.3)" strokeWidth={strokeWidth * 0.6} />
      <line x1="12" y1="60" x2="18" y2="60" stroke="rgba(0,100,102,0.3)" strokeWidth={strokeWidth * 0.6} />
      <line x1="102" y1="60" x2="108" y2="60" stroke="rgba(0,100,102,0.3)" strokeWidth={strokeWidth * 0.6} />

      {/* Orbiting particles */}
      {animated && (
        <>
          <circle
            r={particleSize}
            fill="#00D4AA"
            opacity="0.6"
            style={{
              animation: `sgrOrbit1 12s linear infinite`,
              transformOrigin: '60px 60px',
            }}
          >
            <animateMotion dur="12s" repeatCount="indefinite" path="M 60 4 A 56 56 0 1 1 59.9 4" />
          </circle>
          <circle
            r={particleSize * 0.7}
            fill="#7B61FF"
            opacity="0.5"
            style={{
              animation: `sgrOrbit2 18s linear infinite`,
              transformOrigin: '60px 60px',
            }}
          >
            <animateMotion dur="18s" repeatCount="indefinite" path="M 60 4 A 56 56 0 1 0 59.9 4" />
          </circle>
          <circle
            r={particleSize * 0.5}
            fill="#006466"
            opacity="0.4"
            style={{
              animation: `sgrOrbit3 25s linear infinite`,
              transformOrigin: '60px 60px',
            }}
          >
            <animateMotion dur="25s" repeatCount="indefinite" path="M 60 4 A 56 56 0 1 1 59.9 4" />
          </circle>
        </>
      )}

      {/* Infrastructure nodes */}
      {variant === 'hero' && (
        <>
          <circle cx="30" cy="40" r="2" fill="rgba(0,212,170,0.3)" />
          <circle cx="90" cy="35" r="1.5" fill="rgba(123,97,255,0.3)" />
          <circle cx="85" cy="85" r="1.5" fill="rgba(0,100,102,0.3)" />
          <circle cx="28" cy="80" r="2" fill="rgba(0,212,170,0.2)" />
          {/* Connection lines */}
          <line x1="30" y1="40" x2="60" y2="60" stroke="rgba(0,212,170,0.08)" strokeWidth="0.5" />
          <line x1="90" y1="35" x2="60" y2="60" stroke="rgba(123,97,255,0.08)" strokeWidth="0.5" />
          <line x1="85" y1="85" x2="60" y2="60" stroke="rgba(0,100,102,0.08)" strokeWidth="0.5" />
          <line x1="28" y1="80" x2="60" y2="60" stroke="rgba(0,212,170,0.08)" strokeWidth="0.5" />
        </>
      )}

      {/* Inner energy glow on hover */}
      <circle
        cx="60"
        cy="60"
        r="40"
        fill="url(#sgrGrad)"
        opacity={hovered ? 0.08 : 0.03}
        filter="url(#sgrGlow)"
        style={{ transition: 'opacity 0.4s ease' }}
      />

      {/* SGR Text */}
      <text
        x="60"
        y={variant === 'minimal' ? '65' : '64'}
        textAnchor="middle"
        dominantBaseline="middle"
        fontSize={textFontSize}
        fontWeight="800"
        fontFamily="'Inter', system-ui, sans-serif"
        fill="url(#sgrTextGrad)"
        letterSpacing="2"
        style={{
          transition: 'fill 0.3s ease',
          transform: clicked ? 'scale(1.1)' : 'scale(1)',
          transformOrigin: '60px 60px',
          animation: clicked ? 'sgrPulse 0.6s ease' : 'none',
        }}
      >
        SGR
      </text>

      {/* Status indicator */}
      <circle
        cx="92"
        cy="28"
        r="3"
        fill="#00D4AA"
        opacity="0.8"
        style={{
          animation: animated ? 'breathe 3s ease-in-out infinite' : 'none',
        }}
      />
      <circle
        cx="92"
        cy="28"
        r="5"
        fill="none"
        stroke="#00D4AA"
        strokeWidth="0.5"
        opacity="0.3"
      />

      <style>{`
        @keyframes sgrSpin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes sgrSpinReverse {
          from { transform: rotate(360deg); }
          to { transform: rotate(0deg); }
        }
        @keyframes sgrScan {
          0%, 100% { opacity: 0; transform: translateY(-30px); }
          10% { opacity: 0.3; }
          50% { opacity: 0.3; transform: translateY(30px); }
          60% { opacity: 0; }
        }
        @keyframes sgrPulse {
          0% { opacity: 1; }
          50% { opacity: 0.5; }
          100% { opacity: 1; }
        }
      `}</style>
    </svg>
  );
}
