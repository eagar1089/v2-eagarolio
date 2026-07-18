import { useState, useEffect, useCallback } from 'react';
import { ArrowUp } from 'lucide-react';
import { PORTFOLIO_CONFIG } from '@/config/portfolio';
import SGRLogo from './SGRLogo';

// Simple inline SVG icons to avoid lucide-react version issues
const GithubIcon = ({ size = 16 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>
);
const LinkedinIcon = ({ size = 16 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
);
const CodepenIcon = ({ size = 16 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
  > <polygon points="12 2 22 8.5 22 15.5 12 22 2 15.5 2 8.5 12 2" /> <line x1="12" y1="2" x2="12" y2="8.5" /> <line x1="12" y1="15.5" x2="12" y2="22" /> <polyline points="22 8.5 12 15.5 2 8.5" /> <polyline points="2 15.5 12 8.5 22 15.5" />
  </svg>
);
const FileTextIcon = ({ size = 16 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"/><path d="M14 2v4a2 2 0 0 0 2 2h4"/></svg>
);

export default function SideRails() {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(docHeight > 0 ? (scrollTop / docHeight) * 100 : 0);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const socialLinks = [
    { icon: GithubIcon, url: PORTFOLIO_CONFIG.socialLinks.find(s => s.icon === 'github')?.url || '#', label: 'GitHub' },
    { icon: LinkedinIcon, url: PORTFOLIO_CONFIG.socialLinks.find(s => s.icon === 'linkedin')?.url || '#', label: 'LinkedIn' },
    { icon: CodepenIcon, url: PORTFOLIO_CONFIG.socialLinks.find(s => s.icon === 'codepen')?.url || '#', label: 'Codepen' },
    { icon: FileTextIcon, url: PORTFOLIO_CONFIG.resumePath, label: 'Resume' },
  ];

  return (
    <>
      {/* Desktop logo */}
      <div className="fixed left-5 top-5 z-50 hidden xl:block">
        <SGRLogo size={42} onClick={scrollToTop} />
      </div>

      {/* Left Rail */}
      <aside
        className="fixed left-5 top-1/2 -translate-y-1/2 z-50 hidden xl:flex flex-col items-center gap-5"
        aria-label="Social navigation"
      >
        <div className="relative h-20 w-[2px] overflow-hidden rounded-full bg-white/5">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#00D4AA]/80 to-transparent breathe-glow" />
        </div>

        <nav className="flex flex-col items-center gap-3">
          {socialLinks.map((link) => (
            <a
              key={link.label}
              href={link.url}
              target={link.url.startsWith('http') ? '_blank' : undefined}
              rel="noopener noreferrer"
              className="relative group flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-[#0C121D]/70 hover:border-[#00D4AA]/60 hover:shadow-[0_0_20px_rgba(0,212,170,0.18)] transition-all duration-300"
              aria-label={link.label}
            >
              <span className="text-[#7D8590] group-hover:text-[#00D4AA] transition-all duration-300 group-hover:scale-110">
                <link.icon size={20} />
              </span>
              <span className="absolute left-12 top-1/2 -translate-y-1/2 bg-[#111827] text-[10px] text-[#B8C2CC] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap pointer-events-none font-mono border border-[#1B3A4B]">
                {link.label}
              </span>
            </a>
          ))}
        </nav>

        <div className="relative h-20 w-[2px] overflow-hidden rounded-full bg-white/5">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#00D4AA]/80 to-transparent breathe-glow" />
        </div>

        <button
          onClick={scrollToTop}
          className="text-[#7D8590] hover:text-[#00D4AA] transition-colors duration-300"
          aria-label="Scroll to top"
        >
          <ArrowUp size={18} />
        </button>
      </aside>

      {/* Right Rail */}
      <aside
        className="fixed right-4 top-1/2 -translate-y-1/2 z-50 hidden xl:flex flex-col items-center gap-6"
        aria-label="System status"
      >
        <div className="relative w-[1px] h-12 glow-line">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#312244] to-transparent breathe-glow" />
        </div>

        <a
          href={`mailto:${PORTFOLIO_CONFIG.email}`}
          aria-label={`Email ${PORTFOLIO_CONFIG.email}`}
          className="flex flex-col items-center rounded-full px-2 py-3 transition-colors hover:bg-white/5"
        >
          <span className="text-[10px] font-mono text-[#7D8590] tracking-[0.18em] transition-colors hover:text-[#00D4AA]" style={{ writingMode: 'vertical-rl', textOrientation: 'mixed' }}>
            {PORTFOLIO_CONFIG.email.toUpperCase()}
          </span>
        </a>

        <div className="relative w-[1px] h-12 glow-line">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#312244] to-transparent breathe-glow" />
        </div>

        <div className="font-mono text-xs text-[#7D8590]">
          <span className="text-[#00D4AA]">0</span>
          <span className="text-[#3E1F47] mx-1">/</span>
          <span>12</span>
        </div>

        <div className="w-[2px] h-32 bg-[#111827] rounded-full overflow-hidden">
          <div
            className="w-full bg-gradient-to-t from-[#006466] via-[#00D4AA] to-[#7B61FF] rounded-full transition-all duration-300"
            style={{ height: `${scrollProgress}%` }}
          />
        </div>

        <div className="relative w-[1px] h-12 glow-line">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#312244] to-transparent breathe-glow" />
        </div>
      </aside>
    </>
  );
}
