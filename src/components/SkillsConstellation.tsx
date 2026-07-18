import { useState, useCallback } from 'react';
import { motion } from 'framer-motion';

interface SkillCategory {
  name: string;
  color: string;
  skills: string[];
}

const SKILL_CATEGORIES: SkillCategory[] = [
  {
    name: 'Infrastructure',
    color: '#00D4AA',
    skills: ['Linux', 'Ubuntu', 'CentOS', 'Nginx', 'PHP-FPM', 'Cron', 'Bash', 'Systemd', 'SSH', 'Production Troubleshooting'],
  },
  {
    name: 'DevOps',
    color: '#7B61FF',
    skills: ['Docker', 'Docker Compose', 'Git', 'GitHub', 'CI/CD', 'Nginx Deployments', 'Environment Management'],
  },
  {
    name: 'Backend',
    color: '#006466',
    skills: ['PHP', 'Node.js', 'Express', 'Go', 'REST APIs', 'Background Jobs', 'API Integrations'],
  },
  {
    name: 'Frontend',
    color: '#3E1F47',
    skills: ['React', 'Next.js', 'TypeScript', 'JavaScript', 'Tailwind CSS', 'DataTables', 'Responsive Dashboards'],
  },
  {
    name: 'Databases',
    color: '#4D194D',
    skills: ['MySQL', 'Schema Design', 'Query Optimisation', 'Caching Strategies', 'Historical Data Storage'],
  },
  {
    name: 'Observability',
    color: '#312244',
    skills: ['System Monitoring', 'Log Analysis', 'Anomaly Detection', 'Z-score', 'MAD', 'EWMA', 'Percentile Analysis'],
  },
];

export default function CapabilityConstellation() {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const handleCategoryClick = useCallback((name: string) => {
    setActiveCategory(prev => prev === name ? null : name);
  }, []);

  return (
    <section id="skills" className="py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="mb-12 text-center">
          <span className="text-xs font-mono text-[#7B61FF] uppercase tracking-widest">03 - Capabilities</span>
          <h2 className="text-3xl sm:text-4xl font-bold mt-2 mb-4">
            Engineering Capability Constellation
          </h2>
          <p className="text-[#7D8590] max-w-xl mx-auto">
            Interactive technology clusters showing where infrastructure disciplines intersect. Click to explore.
          </p>
        </div>

        {/* Interactive constellation - responsive height */}
        <div className="relative h-64 sm:h-80 lg:h-96 bg-[#0C121D] rounded-xl border border-[#1B3A4B] overflow-hidden mb-8">
          {/* Connection lines */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none" aria-hidden="true">
            {SKILL_CATEGORIES.map((cat, i) => {
              const angle = (i / SKILL_CATEGORIES.length) * Math.PI * 2;
              const x1 = 50 + Math.cos(angle) * 35;
              const y1 = 50 + Math.sin(angle) * 35;
              const x2 = 50;
              const y2 = 50;
              return (
                <line
                  key={cat.name}
                  x1={`${x1}%`}
                  y1={`${y1}%`}
                  x2={`${x2}%`}
                  y2={`${y2}%`}
                  stroke={activeCategory === cat.name ? cat.color : 'rgba(0,100,102,0.1)'}
                  strokeWidth={activeCategory === cat.name ? '2' : '1'}
                  strokeDasharray={activeCategory === cat.name ? '0' : '4 4'}
                />
              );
            })}
          </svg>

          {/* Central node */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 rounded-full bg-gradient-to-br from-[#006466] to-[#3E1F47] flex items-center justify-center">
            <span className="text-[10px] sm:text-xs font-mono text-white">SGR</span>
          </div>

          {/* Orbiting categories */}
          {SKILL_CATEGORIES.map((cat, i) => {
            const angle = (i / SKILL_CATEGORIES.length) * Math.PI * 2;
            const x = 50 + Math.cos(angle) * 35;
            const y = 50 + Math.sin(angle) * 35;
            const isActive = activeCategory === cat.name;

            return (
              <button
                key={cat.name}
                onClick={() => handleCategoryClick(cat.name)}
                className="absolute transform -translate-x-1/2 -translate-y-1/2 group"
                style={{ left: `${x}%`, top: `${y}%` }}
                aria-pressed={isActive}
              >
                <div
                  className={`w-10 h-10 sm:w-12 sm:h-12 lg:w-14 lg:h-14 rounded-xl flex items-center justify-center border transition-all duration-300 ${
                    isActive
                      ? 'bg-[#070B12] shadow-[0_0_30px_rgba(0,212,170,0.2)]'
                      : 'bg-[#070B12] border-[#1B3A4B] hover:border-[#3E1F47]'
                  }`}
                  style={isActive ? { borderColor: cat.color } : undefined}
                >
                  <span className="text-[9px] font-mono text-center leading-tight px-1">
                    {cat.name.split(' ').map(w => w[0]).join('')}
                  </span>
                </div>
                <span className={`absolute -bottom-5 left-1/2 -translate-x-1/2 text-[9px] font-mono whitespace-nowrap transition-colors ${
                  isActive ? 'text-[#00D4AA]' : 'text-[#7D8590] group-hover:text-[#B8C2CC]'
                }`}>
                  {cat.name}
                </span>
              </button>
            );
          })}
        </div>

        {/* Active category detail */}
        {activeCategory && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="bg-[#0C121D] rounded-xl border border-[#1B3A4B] p-6"
          >
            <h3 className="text-lg font-semibold mb-4">{activeCategory}</h3>
            <div className="flex flex-wrap gap-2">
              {SKILL_CATEGORIES.find(c => c.name === activeCategory)?.skills.map(skill => (
                <span
                  key={skill}
                  className="text-xs font-mono px-3 py-1 rounded-full bg-[#070B12] border border-[#1B3A4B] text-[#B8C2CC]"
                  style={{ borderColor: SKILL_CATEGORIES.find(c => c.name === activeCategory)?.color + '40' }}
                >
                  {skill}
                </span>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
}
