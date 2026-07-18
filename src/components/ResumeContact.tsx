import { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { FileText, Download, Mail, ExternalLink } from 'lucide-react';
import { PORTFOLIO_CONFIG } from '@/config/portfolio';

export function ResumeConsole() {
  // Resume exists if path is set (it is in config)
  const resumeExists = true;

  return (
    <section id="resume" className="py-20 px-6">
      <div className="max-w-4xl mx-auto">
        <div className="mb-12 text-center">
          <span className="text-xs font-mono text-[#065A60] uppercase tracking-widest">08 - Resume Console</span>
          <h2 className="text-3xl sm:text-4xl font-bold mt-2 mb-4">
            Resume Console
          </h2>
        </div>

        <div className="bg-[#0C121D] rounded-xl border border-[#1B3A4B] p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Preview */}
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-[#070B12] flex items-center justify-center border border-[#1B3A4B]">
                  <FileText size={18} className="text-[#00D4AA]" />
                </div>
                <div>
                  <h3 className="font-semibold text-sm">{PORTFOLIO_CONFIG.name}</h3>
                  <span className="text-xs font-mono text-[#7D8590]">{PORTFOLIO_CONFIG.role}</span>
                </div>
              </div>

              <div>
                <h4 className="text-[10px] font-mono text-[#7D8590] uppercase tracking-wider mb-3">Technical Focus</h4>
                <div className="flex flex-wrap gap-1.5">
                  {['Linux', 'Infrastructure', 'Docker', 'MySQL', 'React', 'Node.js', 'Bash', 'Nginx', 'Monitoring', 'Go', 'PHP', 'Express', 'TypeScript'].map(t => (
                    <span key={t} className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#070B12] text-[#B8C2CC] border border-[#1B3A4B]">
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="text-[10px] font-mono text-[#7D8590] uppercase tracking-wider mb-3">Key Projects</h4>
                <ul className="space-y-2">
                  {['Cron Monitoring Platform', 'F5 LiveOps Dashboard', 'Server Inventory Platform', 'RCA Research', 'Infrastructure Data Collector'].map(p => (
                    <li key={p} className="text-xs text-[#B8C2CC] flex items-center gap-2">
                      <span className="text-[#00D4AA]">›</span>
                      {p}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="text-[10px] font-mono text-[#7D8590] uppercase tracking-wider mb-3">GitHub</h4>
                <a
                  href={`https://github.com/${PORTFOLIO_CONFIG.github}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-mono text-[#00D4AA] hover:text-[#B8C2CC] transition-colors"
                >
                  <ExternalLink size={12} />
                  @{PORTFOLIO_CONFIG.github}
                </a>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col justify-center space-y-4">
              {resumeExists ? (
                <a
                  href={PORTFOLIO_CONFIG.resumePath}
                  download
                  className="group flex items-center justify-center gap-2 w-full px-6 py-3 bg-gradient-to-r from-[#006466] to-[#065A60] text-white text-sm font-medium rounded-lg border border-[#0B525B] hover:border-[#00D4AA] transition-all duration-300 hover:shadow-[0_0_30px_rgba(0,100,102,0.2)]"
                >
                  <Download size={14} />
                  Download Resume PDF
                </a>
              ) : (
                <div className="flex flex-col items-center justify-center py-8 text-center">
                  <FileText size={24} className="text-[#1B3A4B] mb-3" />
                  <p className="text-xs text-[#7D8590] mb-2">Resume file not yet added</p>
                  <p className="text-[10px] text-[#3E1F47]">
                    Add your PDF to <code className="font-mono bg-[#070B12] px-1 rounded">public/resume/</code>
                  </p>
                </div>
              )}

              <div className="pt-4 border-t border-[#1B3A4B]">
                <h4 className="text-[10px] font-mono text-[#7D8590] uppercase tracking-wider mb-3">Location</h4>
                <p className="text-sm text-[#B8C2CC]">{PORTFOLIO_CONFIG.location}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function CommunicationUplink() {
  const [formState, setFormState] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');

  const handleSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    setFormState('sending');
    // For a production site, integrate with a real form backend
    // This is a placeholder - see README for integration options
    setTimeout(() => {
      setFormState('sent');
      setTimeout(() => setFormState('idle'), 4000);
    }, 1500);
  }, []);

  return (
    <section id="contact" className="py-20 px-6">
      <div className="max-w-4xl mx-auto">
        <div className="mb-12 text-center">
          <span className="text-xs font-mono text-[#4D194D] uppercase tracking-widest">09 - Communication Uplink</span>
          <h2 className="text-3xl sm:text-4xl font-bold mt-2 mb-4">
            Communication Uplink
          </h2>
          <p className="text-[#7D8590] max-w-xl mx-auto">
            Establish connection through any of the following channels.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Contact channels */}
          <div className="bg-[#0C121D] rounded-xl border border-[#1B3A4B] p-6 space-y-4">
            <h3 className="text-sm font-semibold mb-4">Direct Channels</h3>

            <a
              href={`mailto:${PORTFOLIO_CONFIG.email}`}
              className="flex items-center gap-3 p-3 rounded-lg bg-[#070B12] border border-[#1B3A4B] hover:border-[#00D4AA] transition-all duration-300 group"
            >
              <Mail size={16} className="text-[#7D8590] group-hover:text-[#00D4AA] transition-colors" />
              <div>
                <p className="text-xs text-[#B8C2CC]">Email</p>
                <p className="text-[11px] font-mono text-[#7D8590]">{PORTFOLIO_CONFIG.email}</p>
              </div>
            </a>

            <a
              href={`https://github.com/${PORTFOLIO_CONFIG.github}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 p-3 rounded-lg bg-[#070B12] border border-[#1B3A4B] hover:border-[#00D4AA] transition-all duration-300 group"
            >
              <ExternalLink size={16} className="text-[#7D8590] group-hover:text-[#00D4AA] transition-colors" />
              <div>
                <p className="text-xs text-[#B8C2CC]">GitHub</p>
                <p className="text-[11px] font-mono text-[#7D8590]">@{PORTFOLIO_CONFIG.github}</p>
              </div>
            </a>

            <a
              href={PORTFOLIO_CONFIG.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 p-3 rounded-lg bg-[#070B12] border border-[#1B3A4B] hover:border-[#00D4AA] transition-all duration-300 group"
            >
              <ExternalLink size={16} className="text-[#7D8590] group-hover:text-[#00D4AA] transition-colors" />
              <div>
                <p className="text-xs text-[#B8C2CC]">LinkedIn</p>
                <p className="text-[11px] font-mono text-[#7D8590]">{PORTFOLIO_CONFIG.name}</p>
              </div>
            </a>
          </div>

          {/* Contact form */}
          <div className="bg-[#0C121D] rounded-xl border border-[#1B3A4B] p-6">
            <h3 className="text-sm font-semibold mb-4">Message Console</h3>
            {formState === 'sent' ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex flex-col items-center justify-center py-12 text-center"
              >
                <div className="w-10 h-10 rounded-full bg-[#00D4AA] bg-opacity-10 flex items-center justify-center mb-3">
                  <Mail size={18} className="text-[#00D4AA]" />
                </div>
                <p className="text-sm text-[#B8C2CC]">Message prepared</p>
                <p className="text-xs text-[#7D8590] mt-1">In production, this connects to a form backend</p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-3">
                <div>
                  <label htmlFor="contact-name" className="text-[10px] font-mono text-[#7D8590] uppercase tracking-wider block mb-1">
                    Name
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    required
                    className="w-full px-3 py-2 bg-[#070B12] border border-[#1B3A4B] rounded-lg text-sm text-[#B8C2CC] outline-none focus:border-[#00D4AA] transition-colors"
                    placeholder="Your name"
                    disabled={formState === 'sending'}
                  />
                </div>
                <div>
                  <label htmlFor="contact-email" className="text-[10px] font-mono text-[#7D8590] uppercase tracking-wider block mb-1">
                    Email
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    required
                    className="w-full px-3 py-2 bg-[#070B12] border border-[#1B3A4B] rounded-lg text-sm text-[#B8C2CC] outline-none focus:border-[#00D4AA] transition-colors"
                    placeholder="your@email.com"
                    disabled={formState === 'sending'}
                  />
                </div>
                <div>
                  <label htmlFor="contact-message" className="text-[10px] font-mono text-[#7D8590] uppercase tracking-wider block mb-1">
                    Message
                  </label>
                  <textarea
                    id="contact-message"
                    required
                    rows={3}
                    className="w-full px-3 py-2 bg-[#070B12] border border-[#1B3A4B] rounded-lg text-sm text-[#B8C2CC] outline-none focus:border-[#00D4AA] transition-colors resize-none"
                    placeholder="Your message..."
                    disabled={formState === 'sending'}
                  />
                </div>
                <button
                  type="submit"
                  disabled={formState === 'sending'}
                  className="w-full px-4 py-2.5 bg-gradient-to-r from-[#006466] to-[#065A60] text-white text-sm font-medium rounded-lg border border-[#0B525B] hover:border-[#00D4AA] transition-all duration-300 disabled:opacity-50"
                >
                  {formState === 'sending' ? 'Transmitting...' : 'Send Message'}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export default function Footer() {
  return (
    <footer className="py-12 px-6 border-t border-[#1B3A4B]">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <svg width="24" height="24" viewBox="0 0 120 120" className="opacity-50">
              <circle cx="60" cy="60" r="56" fill="none" stroke="#1B3A4B" strokeWidth="2" />
              <text x="60" y="65" textAnchor="middle" fill="#7D8590" fontSize="12" fontWeight="700" fontFamily="'Inter', system-ui">SGR</text>
            </svg>
            <span className="text-xs text-[#7D8590]">
              (c) {new Date().getFullYear()} {PORTFOLIO_CONFIG.name}
            </span>
          </div>

          <div className="flex items-center gap-4">
            {PORTFOLIO_CONFIG.socialLinks.map(link => (
              <a
                key={link.name}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[10px] font-mono text-[#7D8590] hover:text-[#00D4AA] transition-colors"
                aria-label={link.name}
              >
                {link.name}
              </a>
            ))}
          </div>

          <p className="text-[10px] font-mono text-[#3E1F47]">
            Built with React, TypeScript & Tailwind CSS
          </p>
        </div>
      </div>
    </footer>
  );
}
