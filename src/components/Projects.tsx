import { useState } from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Code2, ChevronDown, ChevronRight, ChevronUp } from 'lucide-react';

interface ArchStep {
  label: string;
  type: 'server' | 'process' | 'api' | 'db' | 'cache' | 'ui';
}

interface Project {
  slug: string;
  name: string;
  purpose: string;
  status: 'active' | 'completed' | 'research' | 'in-progress';
  category: string;
  description: string;
  features: string[];
  challenges: string[];
  technologies: string[];
  architecture: ArchStep[];
  impact: string;
  githubUrl?: string;
  demoUrl?: string;
}

const PROJECTS: Project[] = [
  {
    slug: 'cron-monitoring',
    name: 'Distributed Cron Monitoring Platform',
    purpose: 'Centralised visibility and auditing of cron jobs across approximately 2,000 to 3,000 servers.',
    status: 'active',
    category: 'Infrastructure Monitoring',
    description: 'A comprehensive monitoring platform that tracks, audits, and provides visibility into cron jobs across a large server infrastructure. The system collects daily state data, detects changes through SHA-256 hashing, and provides stakeholder-based reporting with historical change detection.',
    features: [
      'Active and commented cron tracking across thousands of servers',
      'Daily state collection with historical change detection',
      'SHA-256 hashes for precise change identification',
      'Hardware serial number as primary server identity',
      'Normalised cron lines with central exclusion regex',
      'Stakeholder-based reporting with Excel export',
      'Server-level filtering and scalable dashboard queries',
      'Caching layer to avoid repeated large database joins',
    ],
    challenges: [
      'Managing hundreds of cron lines per server across thousands of hosts',
      'Efficient storage and retrieval of tens of thousands of active cron jobs',
      'Detecting meaningful changes while ignoring harmless modifications',
      'Maintaining minimal dependencies on destination servers',
    ],
    technologies: ['Bash', 'PHP', 'MySQL', 'Nginx', 'REST APIs', 'React', 'DataTables', 'SHA-256'],
    architecture: [
      { label: 'Linux Servers', type: 'server' },
      { label: 'Bash Collector', type: 'process' },
      { label: 'Ingestion API', type: 'api' },
      { label: 'Validation', type: 'process' },
      { label: 'Hash Compare', type: 'process' },
      { label: 'MySQL', type: 'db' },
      { label: 'Cache Layer', type: 'cache' },
      { label: 'Dashboard API', type: 'api' },
      { label: 'Responsive UI', type: 'ui' },
    ],
    impact: 'Enables centralised auditing and monitoring of cron job health across the entire server fleet, reducing operational blind spots.',
  },
  {
    slug: 'f5-liveops',
    name: 'F5 LiveOps Dashboard',
    purpose: 'A web dashboard for displaying and searching read-only F5 REST API data.',
    status: 'completed',
    category: 'Operations Platform',
    description: 'A responsive dashboard that consumes read-only F5 REST API responses and presents VIP, pool, node, status, and relationship data through searchable views.',
    features: [
      'Search by VIP IP, port, pool member, node, VIP name, or pool name',
      'Complete relationship flow: Device → VIP → Pool → Members → Node',
      'Live status and remarks tracking',
      'Historical data preservation',
      'No agent required on F5 devices',
      'Backend polling with latest-state caching',
    ],
    challenges: [
      'Building full visibility without installing anything on F5 devices',
      'Ensuring the frontend never directly calls F5 devices',
      'Efficiently polling and caching state from REST APIs',
      'Maintaining accurate historical records of infrastructure changes',
    ],
    technologies: ['F5 REST APIs', 'PHP', 'Node.js', 'MySQL', 'React', 'Express', 'Caching'],
    architecture: [
      { label: 'F5 REST APIs', type: 'api' },
      { label: 'Polling Services', type: 'process' },
      { label: 'State Cache', type: 'cache' },
      { label: 'Historical DB', type: 'db' },
      { label: 'Backend API', type: 'api' },
      { label: 'Operations Dashboard', type: 'ui' },
    ],
    impact: 'Makes read-only F5 API data easier to understand and search from a dashboard.',
  },
  {
    slug: 'server-inventory',
    name: 'Modern Server Inventory Platform',
    purpose: 'Modernise a legacy PHP and MySQL infrastructure inventory platform.',
    status: 'completed',
    category: 'Infrastructure Management',
    description: 'Migration of a legacy PHP, MySQL, AdminLTE and DataTables server inventory application to a modern React and Express architecture. The platform manages server inventory data collection, Linux and hardware information, server ownership mapping, and provides CSV/Excel export with a responsive dashboard redesign.',
    features: [
      'Migration from legacy AdminLTE to React/Express',
      'Server inventory data collection and Linux hardware info',
      'Server ownership and stakeholder mapping',
      'Containerised development environment',
      'Nginx deployment with PHP-FPM integration',
      'Git-based deployment workflow',
      'CSV and Excel export',
      'Responsive dashboard redesign',
    ],
    challenges: [
      'Maintaining functionality during migration from legacy codebase',
      'Designing modern data models for existing inventory data',
      'Ensuring zero data loss during platform transition',
      'Balancing PHP-FPM and Node.js deployment requirements',
    ],
    technologies: ['PHP', 'MySQL', 'React', 'Express', 'Docker', 'Docker Compose', 'Nginx', 'Git'],
    architecture: [
      { label: 'Server Collectors', type: 'server' },
      { label: 'Data Processing', type: 'process' },
      { label: 'Inventory DB', type: 'db' },
      { label: 'API Layer', type: 'api' },
      { label: 'React Dashboard', type: 'ui' },
      { label: 'Export Engine', type: 'process' },
    ],
    impact: 'Modernises critical infrastructure management tools while preserving operational continuity.',
    githubUrl: 'https://github.com/eagar1089',
  },
  {
    slug: 'infra-collector',
    name: 'Infrastructure Data Collector',
    purpose: 'Collect system and infrastructure information using lightweight server-side agents.',
    status: 'completed',
    category: 'Infrastructure Tooling',
    description: 'A lightweight data collection system using Bash or Go-based compiled agents deployed on Linux servers. The collector gathers system and infrastructure information with minimal runtime dependencies, versioning, hash verification, central configuration, and automated scheduled execution.',
    features: [
      'Bash collector for minimal runtime dependency',
      'Go-based compiled agent alternative',
      'REST API ingestion endpoint',
      'Versioning and hash verification',
      'Central configuration management',
      'Linux compatibility across distributions',
      'Automated scheduled execution',
      'Minimal server footprint',
    ],
    challenges: [
      'Ensuring reliable data collection across diverse Linux environments',
      'Maintaining minimal resource usage on production servers',
      'Secure transmission of collected data',
      'Agent version management across thousands of hosts',
    ],
    technologies: ['Bash', 'Go', 'REST APIs', 'Linux', 'Hash Verification', 'Cron', 'Systemd'],
    architecture: [
      { label: 'Linux Agents', type: 'server' },
      { label: 'Data Collection', type: 'process' },
      { label: 'Hash Verify', type: 'process' },
      { label: 'API Ingestion', type: 'api' },
      { label: 'Storage', type: 'db' },
    ],
    impact: 'Provides reliable infrastructure data collection with minimal agent footprint across diverse Linux environments.',
  },
];

function ProjectCard({ project }: { project: Project }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="overflow-hidden rounded-xl border border-[#1B3A4B] bg-[#0C121D]/85 shadow-[0_14px_36px_rgba(0,0,0,0.12)] backdrop-blur-xl">
      {/* Header */}
      <div className="border-b border-[#1B3A4B] p-4 sm:px-5 sm:py-4">
        <div className="mb-2.5 flex items-start justify-between gap-4">
          <div>
            <span className={`text-[10px] font-mono px-2 py-0.5 rounded uppercase tracking-wider ${
              project.status === 'active' ? 'text-[#00D4AA] bg-[#00D4AA] bg-opacity-10' :
              project.status === 'research' ? 'text-[#7B61FF] bg-[#7B61FF] bg-opacity-10' :
              'text-[#7D8590] bg-[#3E1F47] bg-opacity-30'
            }`}>
              {project.status}
            </span>
            <h3 className="mt-2 text-base font-semibold sm:text-lg">{project.name}</h3>
            <span className="text-[10px] font-mono text-[#7D8590]">{project.category}</span>
          </div>
          <button
            onClick={() => setExpanded(!expanded)}
            className="text-[#7D8590] hover:text-[#00D4AA] transition-colors"
            aria-label={expanded ? 'Collapse project' : 'Expand project'}
          >
            {expanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          </button>
        </div>
        <p className="max-w-3xl text-xs leading-relaxed text-[#B8C2CC]">{project.purpose}</p>
      </div>

      {/* Architecture flow */}
      <div className="border-b border-[#1B3A4B] px-4 py-3.5 sm:px-5">
        <h4 className="mb-2.5 text-[9px] font-mono uppercase tracking-wider text-[#7D8590]">Architecture Flow</h4>
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
          {project.architecture.map((step, i) => (
            <div key={i} className="flex shrink-0 items-center gap-1.5">
              <div
                className="flex min-w-[64px] items-center justify-center rounded-md border border-[#1B3A4B] bg-[#070B12] px-2.5 py-1.5"
              >
                <span className="text-[9px] font-mono text-center leading-tight">{step.label}</span>
              </div>
              {i < project.architecture.length - 1 && (
                <ChevronRight size={11} className="shrink-0 text-[#1B3A4B]" />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Expandable content */}
      {expanded && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          transition={{ duration: 0.3 }}
          className="space-y-4 p-4 sm:p-5"
        >
          <div>
            <h5 className="text-[10px] font-mono text-[#7D8590] uppercase tracking-wider mb-2">Description</h5>
            <p className="text-xs text-[#B8C2CC]">{project.description}</p>
          </div>

          <div>
            <h5 className="text-[10px] font-mono text-[#7D8590] uppercase tracking-wider mb-2">Key Features</h5>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {project.features.map(f => (
                <li key={f} className="text-xs text-[#B8C2CC] flex items-start gap-2">
                  <span className="text-[#00D4AA] mt-0.5 flex-shrink-0">›</span>
                  {f}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h5 className="text-[10px] font-mono text-[#7D8590] uppercase tracking-wider mb-2">Challenges</h5>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {project.challenges.map(c => (
                <li key={c} className="text-xs text-[#B8C2CC] flex items-start gap-2">
                  <span className="text-[#3E1F47] mt-0.5 flex-shrink-0">›</span>
                  {c}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h5 className="text-[10px] font-mono text-[#7D8590] uppercase tracking-wider mb-2">Technologies</h5>
            <div className="flex flex-wrap gap-1.5">
              {project.technologies.map(t => (
                <span key={t} className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#070B12] text-[#B8C2CC] border border-[#1B3A4B]">
                  {t}
                </span>
              ))}
            </div>
          </div>

          <div>
            <h5 className="text-[10px] font-mono text-[#7D8590] uppercase tracking-wider mb-2">Operational Impact</h5>
            <p className="text-xs text-[#B8C2CC]">{project.impact}</p>
          </div>
        </motion.div>
      )}

      {/* Actions */}
      <div className="flex flex-wrap gap-2.5 p-4 sm:px-5">
        {project.githubUrl && (
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-mono rounded-lg bg-transparent text-[#00D4AA] border border-[#00D4AA] hover:bg-[#00D4AA] hover:bg-opacity-10 transition-all duration-300"
          >
            <Code2 size={12} />
            Repository
          </a>
        )}
        {project.demoUrl && (
          <a
            href={project.demoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-mono rounded-lg bg-transparent text-[#B8C2CC] border border-[#1B3A4B] hover:border-[#00D4AA] transition-all duration-300"
          >
            <ExternalLink size={12} />
            Live Demo
          </a>
        )}
      </div>
    </div>
  );
}

export default function ProjectMissionControl() {
  return (
    <section id="projects" className="px-4 py-14 sm:px-6 sm:py-16 lg:px-10 lg:py-20 xl:px-16">
      <div className="mx-auto w-full max-w-5xl">
        <div className="mb-8 text-center sm:mb-10">
          <span className="text-xs font-mono text-[#4D194D] uppercase tracking-widest">03 - Mission Control</span>
          <h2 className="text-3xl sm:text-4xl font-bold mt-2 mb-4">
            Project Mission Control
          </h2>
          <p className="text-[#7D8590] max-w-xl mx-auto">
            Each project is a product experience - expand to explore architecture, challenges, and technical decisions.
          </p>
        </div>

        {/* All projects on single page */}
        <div className="space-y-4">
          {PROJECTS.map(project => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
}
