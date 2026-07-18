export const MOTION_TOKENS = {
  duration: {
    fast: 0.15,
    normal: 0.3,
    medium: 0.5,
    slow: 0.8,
    cinematic: 1.2,
  },
  easing: {
    default: [0.22, 1, 0.36, 1] as [number, number, number, number],
    out: [0, 0, 0.2, 1] as [number, number, number, number],
    inOut: [0.645, 0.045, 0.355, 1] as [number, number, number, number],
    spring: { type: 'spring', stiffness: 300, damping: 30, mass: 0.5 },
  },
  distance: {
    small: 8,
    medium: 20,
    large: 40,
    xlarge: 60,
  },
  stagger: {
    fast: 0.05,
    normal: 0.08,
    slow: 0.12,
  },
};

export function useReducedMotion(): boolean {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}
