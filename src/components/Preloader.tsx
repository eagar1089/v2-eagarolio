import { useEffect, useState, useRef } from 'react';
import { useReducedMotion } from '@/lib/motion';
import SGRLogo from './SGRLogo';

const STATUS_MESSAGES = [
  'Loading profile...',
  'Connecting GitHub...',
  'Mapping projects...',
  'Starting command centre...',
];

interface PortfolioPreloaderProps {
  onComplete: () => void;
}

export default function PortfolioPreloader({ onComplete }: PortfolioPreloaderProps) {
  const reducedMotion = useReducedMotion();
  const [progress, setProgress] = useState(0);
  const [statusIndex, setStatusIndex] = useState(0);
  const [revealed, setRevealed] = useState(false);
  const [done, setDone] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout>[]>([]);

  useEffect(() => {
    if (reducedMotion) {
      const t = setTimeout(() => {
        setDone(true);
        setTimeout(onComplete, 200);
      }, 400);
      return () => clearTimeout(t);
    }

    // Progress animation
    const progressTimer = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressTimer);
          return 100;
        }
        return prev + Math.random() * 8 + 2;
      });
    }, 100);

    // Status cycling
    const statusTimer = setInterval(() => {
      setStatusIndex(i => Math.min(i + 1, STATUS_MESSAGES.length - 1));
    }, 400);

    // Completion
    const completeTimer = setTimeout(() => {
      clearInterval(progressTimer);
      clearInterval(statusTimer);
      setProgress(100);
      setRevealed(true);
      setTimeout(() => {
        setDone(true);
        setTimeout(onComplete, 500);
      }, 400);
    }, 2000);

    timerRef.current = [completeTimer];

    return () => {
      clearInterval(progressTimer);
      clearInterval(statusTimer);
      clearTimeout(completeTimer);
      timerRef.current.forEach(clearTimeout);
    };
  }, [reducedMotion, onComplete]);

  const displayProgress = Math.min(Math.round(progress), 100);

  if (done) return null;

  return (
    <div
      className="fixed inset-0 z-[10000] flex flex-col items-center justify-center bg-[#070B12]"
      role="status"
      aria-label="Loading portfolio"
      aria-live="polite"
    >
      {/* Noise */}
      <div className="noise-overlay" />

      {/* Logo container */}
      <div
        className={`relative transition-all duration-700 ease-out ${
          revealed ? 'scale-110 opacity-0' : 'scale-100 opacity-100'
        }`}
      >
        <SGRLogo
          size={reducedMotion ? 80 : 100}
          animated={!reducedMotion}
          variant="hero"
        />
      </div>

      {/* Progress */}
      <div className="mt-8 flex flex-col items-center gap-3">
        {/* Percentage */}
        <div
          className="font-mono text-lg font-semibold text-[#00D4AA] tabular-nums"
          style={{ opacity: revealed ? 0 : 1, transition: 'opacity 0.3s' }}
        >
          {displayProgress}%
        </div>

        {/* Progress bar */}
        <div
          className="w-40 h-[2px] bg-[#111827] rounded-full overflow-hidden"
          style={{ opacity: revealed ? 0 : 1, transition: 'opacity 0.3s' }}
        >
          <div
            className="h-full bg-gradient-to-r from-[#006466] to-[#00D4AA] rounded-full"
            style={{
              width: `${displayProgress}%`,
              transition: 'width 0.1s ease-out',
            }}
          />
        </div>

        {/* Status text */}
        <div
          className="flex flex-col items-center gap-1"
          style={{ opacity: revealed ? 0 : 1, transition: 'opacity 0.3s' }}
        >
          <span className="text-xs text-[#B8C2CC] font-mono">
            Initializing Infrastructure
          </span>
          <span
            key={statusIndex}
            className="text-[10px] text-[#7D8590] font-mono"
            style={{
              animation: !reducedMotion ? 'fadeInUp 0.3s ease-out' : 'none',
            }}
          >
            {STATUS_MESSAGES[statusIndex]}
          </span>
        </div>
      </div>

      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(4px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
