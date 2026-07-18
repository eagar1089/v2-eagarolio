import { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Server, Cpu, Database, Cloud, Code, Monitor, Wifi, Shield } from 'lucide-react';

interface InfraNode {
  id: string;
  name: string;
  icon: React.FC<{ size?: number; className?: string }>;
  tools: string[];
  responsibilities: string[];
  projects: string[];
  learning: string[];
  color: string;
}

const INFRA_NODES: InfraNode[] = [
  {
    id: 'linux',
    name: 'Linux Operations',
    icon: Server,
    tools: ['Ubuntu', 'CentOS', 'SSH', 'Systemd', 'Bash', 'Cron', 'Nginx', 'PHP-FPM'],
    responsibilities: ['Server administration', 'Production troubleshooting', 'System monitoring', 'Log analysis'],
    projects: ['Cron Monitoring', 'Server Inventory', 'Data Collector'],
    learning: ['Advanced kernel tuning', 'eBPF', 'Container runtimes'],
    color: '#00D4AA',
  },
  {
    id: 'automation',
    name: 'Automation',
    icon: Cpu,
    tools: ['Bash', 'Python', 'Cron', 'Systemd', 'REST APIs', 'CI/CD'],
    responsibilities: ['TechStack automation', 'Server-side automation', 'Deployment workflows', 'Scheduled tasks'],
    projects: ['Data Collector', 'Cron Monitoring', 'Server Inventory'],
    learning: ['Go-based agents', 'TechStack as Code', 'Policy automation'],
    color: '#7B61FF',
  },
  {
    id: 'monitoring',
    name: 'Monitoring',
    icon: Monitor,
    tools: ['Custom dashboards', 'Log analysis', 'REST APIs', 'MySQL', 'Caching'],
    responsibilities: ['System monitoring', 'Dashboard development', 'Alerting', 'Historical tracking'],
    projects: ['Cron Monitoring', 'F5 LiveOps', 'RCA Research'],
    learning: ['Advanced observability', 'eBPF monitoring', 'Distributed tracing'],
    color: '#006466',
  },
  {
    id: 'databases',
    name: 'Databases',
    icon: Database,
    tools: ['MySQL', 'Query optimisation', 'Schema design', 'Caching strategies', 'Data modelling'],
    responsibilities: ['Database schema design', 'Query optimisation', 'Historical data storage', 'Inventory systems'],
    projects: ['Cron Monitoring', 'Server Inventory', 'F5 LiveOps'],
    learning: ['Advanced indexing', 'Read replicas', 'Sharding strategies'],
    color: '#4D194D',
  },
  {
    id: 'backend',
    name: 'Backend Systems',
    icon: Code,
    tools: ['PHP', 'Node.js', 'Express', 'Go', 'REST APIs', 'Background jobs'],
    responsibilities: ['REST API development', 'Data collectors', 'API integrations', 'Background processing'],
    projects: ['Cron Monitoring', 'F5 LiveOps', 'Data Collector'],
    learning: ['Microservices', 'gRPC', 'Event sourcing'],
    color: '#3E1F47',
  },
  {
    id: 'frontend',
    name: 'Frontend Dashboards',
    icon: Monitor,
    tools: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'DataTables', 'Charts'],
    responsibilities: ['Responsive dashboards', 'Data visualisation', 'Admin interfaces', 'Interactive components'],
    projects: ['Cron Monitoring', 'F5 LiveOps', 'Server Inventory'],
    learning: ['Advanced animation', 'WebGL visualisation', 'PWA'],
    color: '#312244',
  },
  {
    id: 'networking',
    name: 'Networking',
    icon: Wifi,
    tools: ['Nginx', 'F5 BIG-IP', 'HTTP/S', 'VIPs', 'Load balancing'],
    responsibilities: ['F5 TechStack management', 'Load balancer configuration', 'VIP management', 'Traffic routing'],
    projects: ['F5 LiveOps'],
    learning: ['Service mesh', 'Advanced L4/L7', 'Traffic management'],
    color: '#1B3A4B',
  },
  {
    id: 'devops',
    name: 'DevOps',
    icon: Cloud,
    tools: ['Docker', 'Docker Compose', 'Git', 'GitHub', 'CI/CD', 'Nginx deployments'],
    responsibilities: ['Containerisation', 'Environment management', 'Deployment automation', 'TechStack monitoring'],
    projects: ['Server Inventory', 'Data Collector', 'Cron Monitoring'],
    learning: ['Kubernetes', 'Terraform', 'Cloud platforms'],
    color: '#0B525B',
  },
];

export default function TechStackMap() {
  const [selectedNode, setSelectedNode] = useState<InfraNode | null>(null);

  const handleSelect = useCallback((node: InfraNode) => {
    setSelectedNode(prev => prev?.id === node.id ? null : node);
  }, []);

  const nodePositions = [
    { x: 50, y: 10 },  // Linux - top
    { x: 15, y: 30 },  // Automation - left
    { x: 85, y: 30 },  // Monitoring - right
    { x: 10, y: 70 },  // Databases - bottom-left
    { x: 50, y: 50 },  // Backend - center
    { x: 90, y: 70 },  // Frontend - bottom-right
    { x: 35, y: 85 },  // Networking - bottom-center-left
    { x: 70, y: 85 },  // DevOps - bottom-center-right
  ];

  return (
    <section id="tech-stack" className="px-4 py-14 sm:px-6 sm:py-16 lg:px-10 lg:py-20 xl:px-16" aria-label="Technology stack">
      <div className="mx-auto w-full max-w-7xl">
        {/* Header */}
        <div className="mb-8 text-center sm:mb-10">
          <span className="text-xs font-mono text-[#00D4AA] uppercase tracking-widest">02 - Tech Stack</span>
          <h2 className="text-3xl sm:text-4xl font-bold mt-2 mb-4">
            Technology Stack
          </h2>
          <p className="text-sm text-[#7D8590] max-w-xl mx-auto">
            An interactive map of the technologies, platforms, and engineering tools used across my projects.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-5 lg:grid-cols-[minmax(0,1.85fr)_minmax(280px,1fr)] lg:gap-6">
          {/* System Map */}
          <div className="min-w-0">
            <div className="relative aspect-[4/3] max-h-[540px] min-h-[360px] overflow-hidden rounded-2xl bg-[radial-gradient(circle_at_50%_50%,rgba(0,100,102,0.08),transparent_58%)] p-3 sm:p-4">
              {/* Connection lines */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none" aria-hidden="true">
                {INFRA_NODES.map((node, i) => {
                  const pos = nodePositions[i];
                  const center = nodePositions[4]; // Backend center
                  return (
                    <line
                      key={node.id}
                      x1={`${pos.x}%`}
                      y1={`${pos.y}%`}
                      x2={`${center.x}%`}
                      y2={`${center.y}%`}
                      stroke={selectedNode?.id === node.id ? node.color : 'rgba(0,100,102,0.1)'}
                      strokeWidth={selectedNode?.id === node.id ? '1.5' : '0.5'}
                      strokeDasharray={selectedNode?.id === node.id ? '0' : '4 4'}
                      style={{ transition: 'all 0.4s ease' }}
                    />
                  );
                })}
              </svg>

              {/* Nodes */}
              {INFRA_NODES.map((node, i) => {
                const pos = nodePositions[i];
                const isSelected = selectedNode?.id === node.id;
                const Icon = node.icon;
                return (
                  <button
                    key={node.id}
                    onClick={() => handleSelect(node)}
                    className="absolute transform -translate-x-1/2 -translate-y-1/2 group"
                    style={{ left: `${pos.x}%`, top: `${pos.y}%` }}
                    aria-label={`Select ${node.name}`}
                  >
                    <div
                      className={`flex h-11 w-11 items-center justify-center rounded-xl border transition-all duration-300 sm:h-12 sm:w-12 ${
                        isSelected
                          ? 'bg-[#0C121D] border-[#00D4AA] shadow-[0_0_20px_rgba(0,212,170,0.2)]'
                          : 'bg-[#070B12] border-[#1B3A4B] hover:border-[#00D4AA] hover:shadow-[0_0_15px_rgba(0,100,102,0.15)]'
                      }`}
                    >
                      <Icon size={20} className={isSelected ? 'text-[#00D4AA]' : 'text-[#7D8590] group-hover:text-[#00D4AA] transition-colors'} />
                    </div>
                    <span className={`absolute -bottom-5 left-1/2 -translate-x-1/2 text-[9px] font-mono whitespace-nowrap transition-colors ${
                      isSelected ? 'text-[#00D4AA]' : 'text-[#7D8590] group-hover:text-[#B8C2CC]'
                    }`}>
                      {node.name}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Detail Panel */}
          <div className="min-w-0 overflow-hidden border-t border-white/10 bg-gradient-to-br from-white/[0.035] to-transparent p-4 backdrop-blur-xl sm:p-5 lg:border-l lg:border-t-0 lg:pl-7">
            {selectedNode ? (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
              >
                <div className="mb-5 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ borderColor: selectedNode.color }}>
                    <span style={{ color: selectedNode.color }}><selectedNode.icon size={18} /></span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-sm">{selectedNode.name}</h3>
                    <span className="text-[10px] font-mono text-[#7D8590]" style={{ color: selectedNode.color }}>
                      Active System
                    </span>
                  </div>
                </div>

                <div className="space-y-3.5">
                  <div>
                    <h4 className="text-[10px] font-mono text-[#7D8590] uppercase tracking-wider mb-2">Tools</h4>
                    <div className="flex flex-wrap gap-1">
                      {selectedNode.tools.map(t => (
                        <span key={t} className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#070B12] text-[#B8C2CC] border border-[#1B3A4B]">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="text-[10px] font-mono text-[#7D8590] uppercase tracking-wider mb-2">Responsibilities</h4>
                    <ul className="space-y-1">
                      {selectedNode.responsibilities.map(r => (
                        <li key={r} className="text-xs text-[#B8C2CC] flex items-start gap-2">
                          <span style={{ color: selectedNode.color }}>›</span>
                          {r}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="text-[10px] font-mono text-[#7D8590] uppercase tracking-wider mb-2">Related Projects</h4>
                    <div className="flex flex-wrap gap-1">
                      {selectedNode.projects.map(p => (
                        <span key={p} className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#070B12] text-[#B8C2CC] border border-[#1B3A4B]">
                          {p}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="text-[10px] font-mono text-[#7D8590] uppercase tracking-wider mb-2">Learning Focus</h4>
                    <ul className="space-y-1">
                      {selectedNode.learning.map(l => (
                        <li key={l} className="text-xs text-[#7D8590] flex items-start gap-2">
                          <span style={{ color: selectedNode.color }}>›</span>
                          {l}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            ) : (
              <div className="flex flex-col items-center justify-center h-full text-center py-12">
                <Shield size={24} className="text-[#1B3A4B] mb-4" />
                <p className="text-sm text-[#7D8590] mb-2">No system selected</p>
                <p className="text-xs text-[#3E1F47]">Select a node on the system map to view details</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
