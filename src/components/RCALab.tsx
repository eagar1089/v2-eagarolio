import { useState, useCallback } from 'react';
import { motion } from 'framer-motion';

interface ResearchArea {
  id: string;
  name: string;
  focus: string;
  methods: string[];
  applications: string[];
  hypothesis: string;
}

const RESEARCH_AREAS: ResearchArea[] = [
  {
    id: 'statistical',
    name: 'Statistical Methods',
    focus: 'Applying robust statistical techniques to identify anomalies in infrastructure metrics.',
    methods: ['Rolling Averages', 'Median', 'Standard Deviation', 'Z-score', 'MAD', 'Robust Z-score', 'EWMA', 'p95/p99 Percentiles'],
    applications: ['CPU/Memory baselines', 'Network traffic patterns', 'Error rate detection', 'Response time analysis'],
    hypothesis: 'Statistical thresholds can reliably detect infrastructure anomalies before they impact users.',
  },
  {
    id: 'rule-based',
    name: 'Rule-Based Systems',
    focus: 'Encoding known failure patterns and operational heuristics into automated detection rules.',
    methods: ['Threshold alerts', 'Pattern matching', 'State transition rules', 'Dependency mapping'],
    applications: ['Cron job failure detection', 'Service health checks', 'Configuration drift detection', 'Capacity warnings'],
    hypothesis: 'Explicit rules capture known-unknowns better than statistical methods alone.',
  },
  {
    id: 'ml',
    name: 'Machine Learning Approaches',
    focus: 'Exploring how ML can learn normal infrastructure behaviour and detect novel anomalies.',
    methods: ['Unsupervised clustering', 'Autoencoders', 'Isolation forests', 'Time-series forecasting'],
    applications: ['Multi-metric anomaly correlation', 'Predictive failure detection', 'Automated baselining', 'Noise reduction'],
    hypothesis: 'ML can detect anomalies that traditional rules and statistics miss.',
  },
  {
    id: 'hybrid',
    name: 'Hybrid Reasoning',
    focus: 'Combining rule-based precision with statistical robustness and ML flexibility.',
    methods: ['Rule + Statistic fusion', 'Confidence scoring', 'Human-in-the-loop feedback', 'Ensemble decision making'],
    applications: ['Root cause ranking', 'False positive reduction', 'Alert enrichment', 'Automated triage'],
    hypothesis: 'Hybrid systems outperform single-approach methods for infrastructure RCA.',
  },
];

export default function RCALab() {
  const [selectedArea, setSelectedArea] = useState<string | null>(null);

  const handleSelect = useCallback((id: string) => {
    setSelectedArea(prev => prev === id ? null : id);
  }, []);

  return (
    <section id="research" className="py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="mb-12 text-center">
          <span className="text-xs font-mono text-[#7B61FF] uppercase tracking-widest">07 - Research Lab</span>
          <h2 className="text-3xl sm:text-4xl font-bold mt-2 mb-4">
            RCA Research Laboratory
          </h2>
          <p className="text-[#7D8590] max-w-xl mx-auto">
            Active research into root cause analysis methods for infrastructure systems. This is experimental work, not a production product.
          </p>
        </div>

        {/* Target systems */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {['Linux Systems', 'MySQL', 'MongoDB', 'Elasticsearch', 'Redis', 'Application Infrastructure'].map(s => (
            <span key={s} className="text-[10px] font-mono px-3 py-1.5 rounded-full bg-[#0C121D] border border-[#1B3A4B] text-[#B8C2CC]">
              {s}
            </span>
          ))}
        </div>

        {/* Research areas */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {RESEARCH_AREAS.map((area) => {
            const isActive = selectedArea === area.id;
            return (
              <button
                key={area.id}
                onClick={() => handleSelect(area.id)}
                className={`text-left p-6 rounded-xl border transition-all duration-300 ${
                  isActive
                    ? 'bg-[#0C121D] border-[#7B61FF] shadow-[0_0_30px_rgba(123,97,255,0.1)]'
                    : 'bg-[#0C121D] border-[#1B3A4B] hover:border-[#3E1F47]'
                }`}
                aria-pressed={isActive}
              >
                <h3 className={`text-lg font-semibold mb-2 ${isActive ? 'text-[#7B61FF]' : 'text-white'}`}>
                  {area.name}
                </h3>
                <p className="text-xs text-[#7D8590] mb-4">{area.focus}</p>

                <div className="space-y-3">
                  <div>
                    <span className="text-[10px] font-mono text-[#7D8590] uppercase">Methods</span>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {area.methods.map(m => (
                        <span key={m} className="text-[9px] font-mono px-2 py-0.5 rounded bg-[#070B12] text-[#B8C2CC] border border-[#1B3A4B]">
                          {m}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <span className="text-[10px] font-mono text-[#7D8590] uppercase">Applications</span>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {area.applications.map(a => (
                        <span key={a} className="text-[9px] font-mono px-2 py-0.5 rounded bg-[#070B12] text-[#00D4AA] border border-[#1B3A4B]">
                          {a}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {isActive && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    transition={{ duration: 0.3 }}
                    className="mt-4 pt-4 border-t border-[#1B3A4B]"
                  >
                    <span className="text-[10px] font-mono text-[#7D8590] uppercase">Research Hypothesis</span>
                    <p className="text-xs text-[#B8C2CC] mt-1">{area.hypothesis}</p>
                  </motion.div>
                )}
              </button>
            );
          })}
        </div>

        {/* Research status */}
        <div className="mt-12 p-6 bg-[#070B12] rounded-xl border border-[#1B3A4B] text-center">
          <p className="text-xs text-[#7D8590]">
            <span className="text-[#7B61FF] font-medium">Research Status:</span> Active exploration of statistical methods, rule-based systems, and hybrid approaches for infrastructure root cause analysis. Not a deployed production system.
          </p>
          <p className="text-[10px] text-[#3E1F47] mt-2">
            Focus areas: Anomaly detection, baseline generation, correlation analysis, and human validation loops.
          </p>
        </div>
      </div>
    </section>
  );
}
