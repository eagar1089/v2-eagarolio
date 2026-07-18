import { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

interface ArchNode {
  label: string;
  type: 'source' | 'collector' | 'process' | 'storage' | 'api' | 'cache' | 'ui';
}

interface ArchFlow {
  id: string;
  name: string;
  nodes: ArchNode[];
  description: string;
}

const FLOWS: ArchFlow[] = [
  {
    id: 'cron',
    name: 'Cron Monitoring Data Flow',
    description: 'From server-side Bash collectors through the full pipeline to the responsive monitoring dashboard.',
    nodes: [
      { label: 'Linux Servers', type: 'source' },
      { label: 'Bash Collector', type: 'collector' },
      { label: 'API Ingestion', type: 'api' },
      { label: 'Validation', type: 'process' },
      { label: 'Hash Compare', type: 'process' },
      { label: 'MySQL Storage', type: 'storage' },
      { label: 'Cache Layer', type: 'cache' },
      { label: 'Dashboard API', type: 'api' },
      { label: 'Responsive UI', type: 'ui' },
    ],
  },
  {
    id: 'f5',
    name: 'F5 LiveOps Data Flow',
    description: 'From F5 REST APIs through backend polling and caching to the operations dashboard. Nothing installed on F5 devices.',
    nodes: [
      { label: 'F5 REST APIs', type: 'api' },
      { label: 'Polling Services', type: 'process' },
      { label: 'Latest Cache', type: 'cache' },
      { label: 'Historical DB', type: 'storage' },
      { label: 'Backend API', type: 'api' },
      { label: 'Ops Dashboard', type: 'ui' },
    ],
  },
  {
    id: 'inventory',
    name: 'Server Inventory Data Flow',
    description: 'From server-side data collection through processing to the React dashboard and export system.',
    nodes: [
      { label: 'Server Collectors', type: 'collector' },
      { label: 'Data Processing', type: 'process' },
      { label: 'Inventory DB', type: 'storage' },
      { label: 'API Layer', type: 'api' },
      { label: 'React Dashboard', type: 'ui' },
      { label: 'Export Engine', type: 'process' },
    ],
  },
  {
    id: 'rca',
    name: 'RCA Analysis Pipeline',
    description: 'From metric collection through statistical analysis, anomaly detection, and correlation to the RCA dashboard.',
    nodes: [
      { label: 'Metric Collection', type: 'collector' },
      { label: 'Baseline Engine', type: 'process' },
      { label: 'Statistical Analysis', type: 'process' },
      { label: 'Anomaly Detection', type: 'process' },
      { label: 'Correlation', type: 'process' },
      { label: 'RCA Dashboard', type: 'ui' },
    ],
  },
];

const typeColors: Record<string, string> = {
  source: '#00D4AA',
  collector: '#006466',
  process: '#3E1F47',
  storage: '#312244',
  api: '#7B61FF',
  cache: '#065A60',
  ui: '#00D4AA',
};

export default function ArchitectureExplorer() {
  const [selectedFlow, setSelectedFlow] = useState<ArchFlow>(FLOWS[0]);
  const [hoveredNode, setHoveredNode] = useState<number | null>(null);

  const handleSelect = useCallback((flow: ArchFlow) => {
    setSelectedFlow(flow);
    setHoveredNode(null);
  }, []);

  return (
    <section id="architecture" className="py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="mb-12 text-center">
          <span className="text-xs font-mono text-[#144552] uppercase tracking-widest">Architecture Explorer</span>
          <h2 className="text-3xl sm:text-4xl font-bold mt-2 mb-4">
            Architecture Explorer
          </h2>
          <p className="text-[#7D8590] max-w-xl mx-auto">
            Interactive data flow diagrams for major infrastructure projects. Explore how data moves through each system.
          </p>
        </div>

        {/* Flow selector */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {FLOWS.map(flow => (
            <button
              key={flow.id}
              onClick={() => handleSelect(flow)}
              className={`px-4 py-2 text-xs font-mono rounded-lg border transition-all duration-300 ${
                selectedFlow.id === flow.id
                  ? 'text-white bg-[#0C121D] border-[#00D4AA]'
                  : 'text-[#7D8590] border-[#1B3A4B] hover:border-[#3E1F47] hover:text-[#B8C2CC] bg-transparent'
              }`}
              aria-pressed={selectedFlow.id === flow.id}
            >
              {flow.name}
            </button>
          ))}
        </div>

        {/* Architecture diagram */}
        <div className="bg-[#0C121D] rounded-xl border border-[#1B3A4B] p-6 mb-6">
          <p className="text-xs text-[#7D8590] mb-8 text-center">{selectedFlow.description}</p>

          {/* Flow diagram */}
          <div className="overflow-x-auto pb-4">
            <div className="flex items-center gap-1 min-w-fit px-4">
              {selectedFlow.nodes.map((node, i) => (
                <div key={i} className="flex items-center gap-1">
                  {/* Node */}
                  <button
                    onMouseEnter={() => setHoveredNode(i)}
                    onMouseLeave={() => setHoveredNode(null)}
                    className={`flex flex-col items-center gap-2 px-4 py-3 rounded-xl border transition-all duration-300 min-w-[90px] ${
                      hoveredNode === i
                        ? 'bg-[#070B12] border-[#00D4AA] shadow-[0_0_15px_rgba(0,212,170,0.1)]'
                        : 'bg-[#070B12] border-[#1B3A4B] hover:border-[#3E1F47]'
                    }`}
                    aria-label={`${node.label} - ${node.type}`}
                  >
                    <span className="text-[9px] font-mono uppercase tracking-widest" style={{ color: typeColors[node.type] }}>
                      {node.type.slice(0, 3)}
                    </span>
                    <span className="text-[10px] font-mono text-[#B8C2CC] text-center leading-tight">
                      {node.label}
                    </span>
                    <span className="text-[8px] font-mono" style={{ color: typeColors[node.type] }}>
                      {node.type}
                    </span>
                  </button>

                  {/* Arrow */}
                  {i < selectedFlow.nodes.length - 1 && (
                    <ArrowRight
                      size={12}
                      className="text-[#1B3A4B] flex-shrink-0 mx-1"
                    />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Node details */}
          {hoveredNode !== null && (
            <motion.div
              key={hoveredNode}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2 }}
              className="mt-6 pt-4 border-t border-[#1B3A4B]"
            >
              <div className="flex items-center gap-3">
                <div>
                  <h4 className="text-sm font-medium">{selectedFlow.nodes[hoveredNode].label}</h4>
                  <p className="text-[10px] font-mono" style={{ color: typeColors[selectedFlow.nodes[hoveredNode].type] }}>
                    {selectedFlow.nodes[hoveredNode].type.toUpperCase()}
                  </p>
                </div>
              </div>
            </motion.div>
          )}
        </div>

        {/* Legend */}
        <div className="flex flex-wrap justify-center gap-4 text-[10px] font-mono">
          {Object.entries(typeColors).map(([type, color]) => (
            <div key={type} className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full" style={{ backgroundColor: color }} />
              <span className="text-[#7D8590]">{type}</span>
            </div>
          ))}
        </div>

        {/* Accessible text equivalent */}
        <div className="sr-only">
          <h3>{selectedFlow.name}</h3>
          <p>{selectedFlow.description}</p>
          <ol>
            {selectedFlow.nodes.map((node, i) => (
              <li key={i}>
                {i + 1}. {node.label} ({node.type})
                {i < selectedFlow.nodes.length - 1 && ' then'}
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
