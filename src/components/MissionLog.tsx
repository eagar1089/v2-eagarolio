import { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { GitCommit, Package, Cpu, BarChart3, Globe } from 'lucide-react';

interface Release {
  version: string;
  date: string;
  title: string;
  focus: string;
  systems: string[];
  tools: string[];
  lessons: string[];
  icon: React.FC<{ size?: number }>;
}

const RELEASES: Release[] = [
  {
    version: 'v1.0',
    date: 'Phase 1',
    title: 'Linux Foundation',
    focus: 'Core Linux administration and server operations',
    systems: ['Ubuntu', 'CentOS', 'Nginx', 'SSH', 'Bash', 'Cron'],
    tools: ['Bash Scripting', 'System Monitoring', 'Log Analysis', 'Production Troubleshooting'],
    lessons: ['Master the manual before automating', 'Logs are the first source of truth', 'Every incident is a learning opportunity'],
    icon: Cpu,
  },
  {
    version: 'v2.0',
    date: 'Phase 2',
    title: 'Automation Engine',
    focus: 'Infrastructure automation and scripting',
    systems: ['Bash', 'Cron', 'Systemd', 'SSH Scripts'],
    tools: ['Bash', 'REST APIs', 'Server-side Automation', 'Scheduled Tasks'],
    lessons: ['Idempotency is non-negotiable', 'Error handling must be exhaustive', 'Documentation is part of the code'],
    icon: GitCommit,
  },
  {
    version: 'v3.0',
    date: 'Phase 3',
    title: 'Monitoring Platform',
    focus: 'Building observability and monitoring dashboards',
    systems: ['Cron Monitoring', 'F5 LiveOps', 'Server Inventory'],
    tools: ['MySQL', 'React', 'DataTables', 'Caching Strategies'],
    lessons: ['Dashboards must tell a story', 'Cache aggressively for performance', 'Historical data reveals patterns'],
    icon: BarChart3,
  },
  {
    version: 'v4.0',
    date: 'Phase 4',
    title: 'Platform Modernisation',
    focus: 'Containerisation and modern stack adoption',
    systems: ['Docker', 'React', 'Express', 'Next.js'],
    tools: ['Docker Compose', 'Git Workflows', 'Nginx Deployment', 'TypeScript'],
    lessons: ['Migration preserves operational continuity', 'Containerisation simplifies environments', 'Modern frontends improve efficiency'],
    icon: Package,
  },
  {
    version: 'v5.0',
    date: 'Phase 5',
    title: 'RCA Research',
    focus: 'Statistical methods for infrastructure root cause analysis',
    systems: ['Linux', 'MySQL', 'MongoDB', 'Elasticsearch', 'Redis'],
    tools: ['Z-score', 'MAD', 'EWMA', 'Percentile Analysis', 'Correlation'],
    lessons: ['Statistics need careful parameter tuning', 'Hybrid approaches beat pure ML', 'Context matters as much as data'],
    icon: BarChart3,
  },
  {
    version: 'vCurrent',
    date: 'Current',
    title: 'Linux and Web Systems',
    focus: 'Linux operations supported by web development experience',
    systems: ['Linux', 'Go', 'PHP', 'Node.js', 'React', 'MySQL', 'Docker'],
    tools: ['Full-Stack Development', 'Infrastructure Design', 'Observability', 'Automation'],
    lessons: ['Operational experience improves application design', 'Reliability comes from careful engineering', 'Continuous learning strengthens both systems and development work'],
    icon: Globe,
  },
];

export default function MissionLog() {
  const [selectedRelease, setSelectedRelease] = useState<string | null>(null);

  const handleSelect = useCallback((version: string) => {
    setSelectedRelease(prev => prev === version ? null : version);
  }, []);

  return (
    <section id="experience" className="px-4 py-14 sm:px-6 sm:py-16 lg:px-10 lg:py-20 xl:px-16">
      <div className="mx-auto w-full max-w-5xl">
        <div className="mb-8 text-center sm:mb-10">
          <span className="text-xs font-mono text-[#0B525B] uppercase tracking-widest">06 - Mission Log</span>
          <h2 className="text-3xl sm:text-4xl font-bold mt-2 mb-4">
            Career Mission Log
          </h2>
          <p className="text-[#7D8590] max-w-xl mx-auto">
            Versioned releases of engineering evolution. Each phase represents a system upgrade in capability and understanding.
          </p>
        </div>

        {/* Release grid */}
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 lg:gap-4">
          {RELEASES.map((release) => {
            const isActive = selectedRelease === release.version;
            const Icon = release.icon;
            return (
              <button
                key={release.version}
                onClick={() => handleSelect(release.version)}
                className={`min-w-0 text-left p-4 sm:p-[18px] rounded-xl border transition-all duration-300 ${
                  isActive
                    ? 'bg-[#0C121D] border-[#00D4AA] shadow-[0_0_20px_rgba(0,212,170,0.1)]'
                    : 'bg-[#0C121D] border-[#1B3A4B] hover:border-[#3E1F47]'
                }`}
                aria-pressed={isActive}
              >
                <div className="mb-2.5 flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-[#070B12] flex items-center justify-center border border-[#1B3A4B]">
                    <Icon size={14} />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono text-[#7D8590]">{release.date}</span>
                    <h3 className="font-semibold text-sm">{release.title}</h3>
                  </div>
                </div>

                <p className="mb-2.5 text-[11px] leading-relaxed text-[#7D8590]">{release.focus}</p>

                <div className="mb-2 flex flex-wrap gap-1">
                  {release.systems.slice(0, 3).map(s => (
                    <span key={s} className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-[#070B12] text-[#B8C2CC] border border-[#1B3A4B]">
                      {s}
                    </span>
                  ))}
                  {release.systems.length > 3 && (
                    <span className="text-[9px] font-mono text-[#7D8590]">+{release.systems.length - 3}</span>
                  )}
                </div>

                {isActive && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    transition={{ duration: 0.3 }}
                    className="pt-3 border-t border-[#1B3A4B] mt-3"
                  >
                    <div className="space-y-3">
                      <div>
                        <h4 className="text-[9px] font-mono text-[#7D8590] uppercase">Tools</h4>
                        <div className="flex flex-wrap gap-1">
                          {release.tools.map(t => (
                            <span key={t} className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-[#070B12] text-[#00D4AA] border border-[#1B3A4B]">
                              {t}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div>
                        <h4 className="text-[9px] font-mono text-[#7D8590] uppercase">Lessons</h4>
                        <ul className="space-y-1">
                          {release.lessons.map(l => (
                            <li key={l} className="text-[10px] text-[#B8C2CC] flex items-start gap-1">
                              <span className="text-[#3E1F47] mt-0.5">›</span>
                              {l}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </motion.div>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
