import { useState, useCallback } from 'react';
import { Menu, X } from 'lucide-react';
import { PORTFOLIO_CONFIG } from '@/config/portfolio';
import SGRLogo from './SGRLogo';

const NAV_LINKS = [
  { label: 'Home', href: '#hero' },
  { label: 'Tech Stack', href: '#tech-stack' },
  { label: 'GitHub', href: '#github' },
  { label: 'Experience', href: '#mission-log' },
  { label: 'Resume', href: '#resume' },
  { label: 'Contact', href: '#contact' },
];

export default function MobileNavigation() {
  const [open, setOpen] = useState(false);

  const handleNavClick = useCallback((href: string) => {
    setOpen(false);
    const el = document.querySelector(href);
    el?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  return (
    <>
      {/* Hamburger */}
      <button
        onClick={() => setOpen(!open)}
        className="fixed top-4 right-4 z-50 p-2 bg-[#0C121D] border border-[#1B3A4B] rounded-lg xl:hidden"
        aria-label="Toggle navigation"
        aria-expanded={open}
      >
        {open ? <X size={18} className="text-[#B8C2CC]" /> : <Menu size={18} className="text-[#B8C2CC]" />}
      </button>

      {/* Logo (mobile) */}
      <div className="fixed top-4 left-4 z-50 xl:hidden">
        <SGRLogo size={32} />
      </div>

      {/* Menu overlay */}
      {open && (
        <div className="fixed inset-0 z-40 bg-[#070B12] bg-opacity-95 xl:hidden">
          <nav className="flex flex-col items-center justify-center h-full gap-2 p-6">
            {NAV_LINKS.map((link) => (
              <button
                key={link.href}
                onClick={() => handleNavClick(link.href)}
                className="text-sm font-mono text-[#B8C2CC] hover:text-[#00D4AA] transition-colors py-2"
              >
                {link.label}
              </button>
            ))}

            <div className="mt-6 flex gap-4">
              {PORTFOLIO_CONFIG.socialLinks.map(link => (
                <a
                  key={link.name}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-mono text-[#7D8590] hover:text-[#00D4AA] transition-colors"
                >
                  {link.name}
                </a>
              ))}
            </div>
          </nav>
        </div>
      )}
    </>
  );
}
