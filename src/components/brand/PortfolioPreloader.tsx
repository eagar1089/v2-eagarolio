import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { SGRLogo } from "./SGRLogo";

// =========================================================================
// Cinematic preloader - runs only on the initial direct load.
//
// Sequence:
//   1. Ring draws around the logo
//   2. SGR illuminates
//   3. Status messages cycle
//   4. Progress reaches 100%
//   5. Logo expands slightly, then the whole screen fades out
// =========================================================================

const STATUSES = [
  "Loading profile",
  "Connecting GitHub",
  "Mapping projects",
  "Starting command centre",
];

interface Props {
  onComplete?: () => void;
}

export function PortfolioPreloader({ onComplete }: Props) {
  const [progress, setProgress] = useState(0);
  const [statusIndex, setStatusIndex] = useState(0);
  const [done, setDone] = useState(false);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    // Prevent scroll during loading
    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = original;
    };
  }, []);

  useEffect(() => {
    // Progress drives the sequence. Total duration ~ 2s on fast, longer otherwise.
    const targetDuration = reduceMotion ? 400 : 2000;
    const stepMs = 30;
    const step = 100 / (targetDuration / stepMs);
    const id = window.setInterval(() => {
      setProgress((p) => {
        const next = Math.min(100, p + step);
        if (next >= 100) window.clearInterval(id);
        return next;
      });
    }, stepMs);
    return () => window.clearInterval(id);
  }, [reduceMotion]);

  useEffect(() => {
    if (reduceMotion) return;
    const id = window.setInterval(() => {
      setStatusIndex((i) => (i + 1) % STATUSES.length);
    }, 480);
    return () => window.clearInterval(id);
  }, [reduceMotion]);

  useEffect(() => {
    if (progress >= 100 && !done) {
      const t = window.setTimeout(() => {
        setDone(true);
        const t2 = window.setTimeout(() => onComplete?.(), 700);
        return () => window.clearTimeout(t2);
      }, 220);
      return () => window.clearTimeout(t);
    }
  }, [progress, done, onComplete]);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          key="preloader"
          role="status"
          aria-live="polite"
          aria-label="Loading portfolio"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } }}
          transition={{ duration: 0.6 }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#070B12]"
        >
          {/* Background grid */}
          <div className="absolute inset-0 bg-grid opacity-60" />
          <div className="absolute inset-0 aurora" />

          {/* Logo with breathing scale at end */}
          <motion.div
            animate={{ scale: progress >= 100 ? 1.08 : 1, opacity: progress >= 100 ? 0.9 : 1 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <SGRLogo size={140} interactive={false} intensity={Math.min(1, progress / 100 + 0.4)} />
          </motion.div>

          {/* Primary status */}
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="mt-6 font-mono text-[11px] uppercase tracking-[0.4em] text-[#B8C2CC]"
          >
            Initializing Infrastructure
          </motion.p>

          {/* Cycling secondary status */}
          <div className="mt-3 h-4 overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.p
                key={statusIndex}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.25 }}
                className="font-mono text-[10px] uppercase tracking-[0.3em] text-[#7D8590]"
              >
                {STATUSES[statusIndex]}
              </motion.p>
            </AnimatePresence>
          </div>

          {/* Progress bar */}
          <div className="mt-8 flex w-64 items-center gap-3">
            <div className="h-[2px] flex-1 overflow-hidden rounded-full bg-white/10">
              <motion.div
                className="h-full bg-gradient-to-r from-[#22d3ee] via-[#6366f1] to-[#a855f7]"
                style={{ width: `${progress}%` }}
                transition={{ duration: 0.2 }}
              />
            </div>
            <span className="font-mono text-[10px] tabular-nums text-[#B8C2CC]">
              {Math.round(progress).toString().padStart(3, "0")}%
            </span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/**
 * Hook that tracks whether the preloader has run in this session.
 * Used to prevent it from replaying on normal navigation.
 */
const STORAGE_KEY = "sgr:preloader:done";

export function usePreloader() {
  const [booted, setBooted] = useState(() => {
    if (typeof window === "undefined") return true;
    try {
      return window.sessionStorage.getItem(STORAGE_KEY) === "1";
    } catch {
      return true;
    }
  });

  useEffect(() => {
    if (booted) return;
    try {
      window.sessionStorage.setItem(STORAGE_KEY, "1");
    } catch {
      /* ignore */
    }
  }, [booted]);

  return { booted, markBooted: () => setBooted(true) };
}
