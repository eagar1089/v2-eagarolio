import { Github, Linkedin, Mail, FileText, Menu, X } from "lucide-react";
import { portfolio } from "@/config";

import { motion } from "framer-motion";
import { useLocalTime, useScrollSpy } from "../ui/primitives";

const NAV_SECTIONS = [
  { id: "system-boot",      label: "Boot",          num: "01" },
  { id: "command-centre",   label: "Command Centre", num: "02" },
  { id: "capabilities",     label: "Capabilities",  num: "03" },
  { id: "projects",         label: "Projects",      num: "04" },
  { id: "github",           label: "GitHub",        num: "05" },
  { id: "mission-log",      label: "Mission Log",   num: "06" },
  { id: "resume",           label: "Resume",        num: "07" },
  { id: "contact",          label: "Contact",       num: "08" },
];

function scrollTo(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
}

// =========================================================================
// Desktop Social Rail (Left)
// =========================================================================

export function DesktopSocialRail() {
  const links = [
    { id: "github",   label: "GitHub",   href: portfolio.social.github.url, Icon: Github },
    ...(portfolio.social.linkedin.url
      ? [{ id: "linkedin", label: "LinkedIn", href: portfolio.social.linkedin.url, Icon: Linkedin }]
      : []),
    { id: "email", label: "Email", href: `mailto:${portfolio.social.email}`, Icon: Mail },
    ...(portfolio.resume.available
      ? [{ id: "resume", label: "Resume", href: portfolio.resume.path, Icon: FileText }]
      : []),
  ];

  return (
    <aside aria-label="Social links" className="fixed left-6 top-0 z-40 hidden h-screen items-center lg:flex">
      <div className="relative flex flex-col items-center gap-6 py-10">
        {/* Logo */}
        <button
          onClick={() => scrollTo("system-boot")}
          aria-label="Scroll to top"
          className="group relative flex h-8 w-8 items-center justify-center"
        >
          <span className="absolute inset-0 rounded-full border border-white/10 transition-colors group-hover:border-[#22d3ee]/60" />
          <span className="font-mono text-[9px] font-bold tracking-widest gradient-text-cyan-violet">
            {portfolio.brand}
          </span>
        </button>

        {/* Divider */}
        <span aria-hidden className="rail-breath relative block h-16 w-px bg-gradient-to-b from-[#22d3ee]/40 via-white/10 to-transparent" />

        {/* Links */}
        <ul className="flex flex-col items-center gap-5">
          {links.map(({ label, href, Icon }) => (
            <li key={label}>
              <a
                href={href}
                target={href.startsWith("http") ? "_blank" : undefined}
                rel="noopener noreferrer"
                aria-label={label}
                data-cursor="Open"
                className="group relative flex h-9 w-9 items-center justify-center rounded-full border border-white/10 text-[#B8C2CC] transition-all duration-300 hover:border-[#22d3ee]/60 hover:text-white hover:shadow-[0_0_24px_-4px_rgba(34,211,238,0.5)]"
              >
                <Icon className="h-4 w-4" strokeWidth={1.6} />
                <span className="pointer-events-none absolute left-full ml-3 whitespace-nowrap rounded-md border border-white/10 bg-[#0C121D] px-2 py-1 font-mono text-[10px] uppercase tracking-wider text-[#B8C2CC] opacity-0 transition-all duration-300 group-hover:translate-x-1 group-hover:opacity-100" role="tooltip">
                  {label}
                </span>
              </a>
            </li>
          ))}
        </ul>

        {/* Bottom line */}
        <span aria-hidden className="rail-breath relative block h-24 w-px bg-gradient-to-b from-white/10 to-transparent" />
      </div>
    </aside>
  );
}

// =========================================================================
// Desktop Right Rail - email, section, time
// =========================================================================

export function DesktopEmailRail() {
  const sectionIds = NAV_SECTIONS.map((s) => s.id);
  const active = useScrollSpy(sectionIds);
  const activeMeta = NAV_SECTIONS.find((s) => s.id === active) ?? NAV_SECTIONS[0];
  const localTime = useLocalTime(portfolio.location.timezone);

  return (
    <aside aria-label="Contact and navigation" className="fixed right-6 top-0 z-40 hidden h-screen items-center lg:flex">
      <div className="relative flex flex-col items-center gap-6 py-10">
        <span aria-hidden className="rail-breath relative block h-20 w-px bg-gradient-to-b from-transparent via-white/10 to-white/5" />

        {/* Vertical email */}
        <a
          href={`mailto:${portfolio.email}`}
          className="font-mono text-[10px] uppercase tracking-[0.35em] text-[#7D8590] transition-colors hover:text-[#22d3ee]"
          style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}
        >
          {portfolio.email}
        </a>

        {/* Section indicator */}
        <div className="flex flex-col items-center gap-2 py-2">
          <span className="font-mono text-[10px] tabular-nums tracking-widest text-[#B8C2CC]">{activeMeta.num}</span>
          <span aria-hidden className="rail-breath relative block h-8 w-px bg-gradient-to-b from-[#22d3ee] to-transparent" />
          <span
            className="font-mono text-[9px] uppercase tracking-[0.25em] text-[#7D8590]"
            style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}
          >
            {activeMeta.label}
          </span>
        </div>

        {/* Status + time */}
        <div className="flex flex-col items-center gap-1">
          <span className="flex items-center gap-1.5">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#10b981] opacity-75" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[#10b981]" />
            </span>
            <span className="font-mono text-[9px] uppercase tracking-[0.25em] text-[#10b981]">Online</span>
          </span>
          <span className="font-mono text-[9px] tabular-nums text-[#7D8590]">IST {localTime}</span>
        </div>

        <span aria-hidden className="rail-breath relative block h-16 w-px bg-gradient-to-b from-white/10 to-transparent" />
      </div>
    </aside>
  );
}

// =========================================================================
// Mobile Navigation
// =========================================================================

export function MobileNavigation({ open, onToggle }: { open: boolean; onToggle: (o: boolean) => void }) {
  return (
    <>
      <button
        onClick={() => onToggle(!open)}
        aria-label={open ? "Close menu" : "Open menu"}
        aria-expanded={open}
        className="fixed right-4 top-4 z-50 flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-[#0C121D]/80 backdrop-blur-sm lg:hidden"
      >
        {open ? <X className="h-5 w-5 text-white" /> : <Menu className="h-5 w-5 text-white" />}
      </button>

      <motion.nav
        aria-label="Mobile"
        initial={false}
        animate={{ opacity: open ? 1 : 0, pointerEvents: open ? "auto" : "none" }}
        transition={{ duration: 0.3 }}
        className="fixed inset-0 z-40 flex flex-col bg-[#070B12]/95 backdrop-blur-xl lg:hidden"
      >
        <div className="flex flex-1 flex-col items-center justify-center gap-5 p-8">
          {NAV_SECTIONS.map((s, i) => (
            <motion.button
              key={s.id}
              onClick={() => { onToggle(false); setTimeout(() => scrollTo(s.id), 120); }}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: open ? 1 : 0, y: open ? 0 : 10 }}
              transition={{ delay: open ? 0.05 * i : 0, duration: 0.3 }}
              className="group flex items-center gap-4 font-mono text-[13px] uppercase tracking-[0.3em] text-white/70 transition-colors hover:text-white"
            >
              <span className="text-[10px] text-[#7D8590]">{s.num}</span>
              <span>{s.label}</span>
            </motion.button>
          ))}

          <div className="mt-4 flex items-center gap-4">
            <a href={portfolio.social.github.url} aria-label="GitHub" className="rounded-full border border-white/10 p-3 text-white/70 hover:border-[#22d3ee]/60 hover:text-white">
              <Github className="h-4 w-4" />
            </a>
            <a href={`mailto:${portfolio.email}`} aria-label="Email" className="rounded-full border border-white/10 p-3 text-white/70 hover:border-[#22d3ee]/60 hover:text-white">
              <Mail className="h-4 w-4" />
            </a>
            {portfolio.resume.available && (
              <a href={portfolio.resume.path} aria-label="Resume" className="rounded-full border border-white/10 p-3 text-white/70 hover:border-[#22d3ee]/60 hover:text-white">
                <FileText className="h-4 w-4" />
              </a>
            )}
          </div>
        </div>
      </motion.nav>
    </>
  );
}
