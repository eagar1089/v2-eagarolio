import { useEffect, useState, useCallback } from 'react';
import { useReducedMotion } from '@/lib/motion';

export default function BackgroundSystem() {
  const reducedMotion = useReducedMotion();
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isMobile, setIsMobile] = useState(false);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    setMousePos({
      x: (e.clientX / window.innerWidth) * 100,
      y: (e.clientY / window.innerHeight) * 100,
    });
  }, []);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    if (reducedMotion || isMobile) return;
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [reducedMotion, isMobile, handleMouseMove]);

  return (
    <>
      {/* Layer 1: Base */}
      <div className="fixed inset-0 bg-[#070B12]" />

      {/* Layer 2: Technical grid */}
      <div className="fixed inset-0 technical-grid pointer-events-none opacity-[0.03]" />

      {/* Layer 3: Noise overlay - subtle */}
      <div className="noise-overlay opacity-[0.01]" />

      {/* Layer 4: Aurora lighting - responsive */}
      {!isMobile && (
        <div className="aurora-layer">
          <div className="aurora-blob" />
          <div className="aurora-blob" />
          <div className="aurora-blob" />
        </div>
      )}

      {/* Layer 5: Mouse-responsive gradient - desktop only */}
      {!reducedMotion && !isMobile && (
        <div
          className="fixed inset-0 pointer-events-none opacity-[0.02]"
          style={{
            background: `radial-gradient(600px circle at ${mousePos.x}% ${mousePos.y}%, rgba(0,100,102,0.15), transparent 40%)`,
            transition: 'background 0.3s ease',
          }}
        />
      )}
    </>
  );
}
