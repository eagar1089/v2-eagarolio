import { useMemo, useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { capabilities, projects } from "@/config";
import { cn } from "@/lib/utils";
import { SectionHeader } from "../terminal/IdentityTerminal";

// =========================================================================
// Infrastructure Command Centre - Interactive node map + detail panel
// =========================================================================

const NODES = [
  { id: "linux",   label: "Linux Ops",       x: 22, y: 22, cluster: "infrastructure" },
  { id: "auto",    label: "Automation",      x: 50, y: 18, cluster: "delivery" },
  { id: "mon",     label: "Monitoring",      x: 78, y: 26, cluster: "observability" },
  { id: "db",      label: "Databases",       x: 18, y: 55, cluster: "databases" },
  { id: "be",      label: "Backend",         x: 50, y: 50, cluster: "backend" },
  { id: "fe",      label: "Dashboards",      x: 82, y: 58, cluster: "frontend" },
  { id: "net",     label: "Networking",      x: 30, y: 82, cluster: "infrastructure" },
  { id: "delivery", label: "Web Delivery",    x: 62, y: 82, cluster: "delivery" },
  { id: "rca",     label: "RCA Research",    x: 80, y: 86, cluster: "observability" },
];

const EDGES: [string, string][] = [
  ["linux", "auto"], ["linux", "db"], ["linux", "net"],
  ["auto",  "be"],   ["auto", "delivery"],
  ["be",    "db"],   ["be", "fe"],
  ["fe",    "mon"],
  ["mon",   "rca"],
  ["delivery","mon"],
  ["net",   "delivery"],
];

export function InfrastructureMap() {
  const [selected, setSelected] = useState<string>("be");
  const activeNode = NODES.find((n) => n.id === selected) ?? NODES[4];
  const activeCluster = capabilities.find((c) => c.id === activeNode.cluster);

  const relatedProjects = useMemo(() => {
    if (!activeCluster) return [];
    const techNames = activeCluster.technologies.map((t) => t.name.toLowerCase());
    return projects.filter((p) =>
      p.stack.some((s) => techNames.includes(s.toLowerCase()))
    ).slice(0, 3);
  }, [activeCluster]);

  const mapRef = useRef<HTMLDivElement>(null);
  const inView = useInView(mapRef, { once: true, margin: "-10%" });

  return (
    <section
      id="command-centre"
      className="relative mx-auto w-full max-w-6xl px-4 py-20 sm:px-6 sm:py-24 lg:px-0"
      aria-label="Infrastructure command centre"
    >
      <SectionHeader
        kicker="02 · Infrastructure Command Centre"
        title="An operating map of the engineering landscape."
        description="Select a node to see the tools, related projects, and responsibilities that connect to each area."
      />

      <div className="mt-10 flex flex-col gap-6 lg:mt-12 lg:grid lg:grid-cols-[1.5fr_1fr] lg:gap-8">
        {/* Map */}
        <div className="panel relative aspect-[4/3] overflow-hidden" ref={mapRef}>
          <div
            className="absolute inset-0 opacity-[0.02]"
            style={{
              backgroundImage: `linear-gradient(to right, rgba(255,255,255,0.4) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.4) 1px, transparent 1px)`,
              backgroundSize: "24px 24px",
            }}
            aria-hidden
          />
          <svg
            viewBox="0 0 100 100"
            className="absolute inset-0 h-full w-full"
            preserveAspectRatio="none"
            aria-hidden
          >
            <defs>
              <linearGradient id="edge-grad" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#22d3ee" stopOpacity="0.6" />
                <stop offset="100%" stopColor="#a855f7" stopOpacity="0.3" />
              </linearGradient>
            </defs>
            {EDGES.map(([a, b]) => {
              const n1 = NODES.find((n) => n.id === a)!;
              const n2 = NODES.find((n) => n.id === b)!;
              const active = selected === a || selected === b;
              return (
                <motion.line
                  key={`${a}-${b}`}
                  x1={n1.x} y1={n1.y} x2={n2.x} y2={n2.y}
                  stroke={active ? "url(#edge-grad)" : "rgba(255,255,255,0.08)"}
                  strokeWidth={active ? 0.35 : 0.2}
                  initial={{ pathLength: 0 }}
                  animate={inView ? { pathLength: 1 } : {}}
                  transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                />
              );
            })}
          </svg>

          {NODES.map((node) => {
            const active = node.id === selected;
            return (
              <button
                key={node.id}
                onClick={() => setSelected(node.id)}
                data-cursor="Explore"
                aria-pressed={active}
                className="absolute -translate-x-1/2 -translate-y-1/2"
                style={{ left: `${node.x}%`, top: `${node.y}%` }}
              >
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.2 }}
                  className="flex flex-col items-center gap-1"
                >
                  <span
                    className={cn(
                      "relative flex h-8 w-8 items-center justify-center rounded-full border transition-all duration-500 sm:h-10 sm:w-10",
                      active
                        ? "border-[#22d3ee] bg-[#22d3ee]/10 shadow-[0_0_30px_-4px_rgba(34,211,238,0.6)]"
                        : "border-white/15 bg-white/[0.02] hover:border-white/40"
                    )}
                  >
                    <span
                      className={cn(
                        "h-1.5 w-1.5 rounded-full transition-all sm:h-2 sm:w-2",
                        active ? "bg-[#22d3ee]" : "bg-white/30 group-hover:bg-white/60"
                      )}
                    />
                    {active && (
                      <span className="absolute inset-0 animate-ping rounded-full bg-[#22d3ee]/30" />
                    )}
                  </span>
                  <span
                    className={cn(
                      "font-mono text-[8px] uppercase tracking-[0.15em] transition-colors sm:text-[10px]",
                      active ? "text-[#22d3ee]" : "text-[#B8C2CC]"
                    )}
                  >
                    {node.label}
                  </span>
                </motion.div>
              </button>
            );
          })}
        </div>

        {/* Details panel */}
        <div className="panel relative overflow-hidden p-5 sm:p-6">
          <motion.div
            key={activeNode.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="flex items-center gap-3">
              <span className="h-2 w-2 rounded-full bg-[#22d3ee]" />
              <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-[#22d3ee]">
                Active node
              </span>
            </div>
            <h3 className="mt-3 font-display text-xl font-semibold sm:text-2xl">
              {activeNode.label}
            </h3>
            {activeCluster && (
              <p className="mt-2 text-sm text-[#B8C2CC]">
                {activeCluster.description}
              </p>
            )}

            {activeCluster && (
              <div className="mt-5">
                <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-[#7D8590]">
                  Technologies
                </p>
                <div className="mt-2 flex flex-wrap gap-2">
                  {activeCluster.technologies.map((t) => (
                    <span
                      key={t.id}
                      className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 font-mono text-[11px] text-[#B8C2CC]"
                    >
                      {t.name}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {relatedProjects.length > 0 && (
              <div className="mt-5">
                <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-[#7D8590]">
                  Related projects
                </p>
                <ul className="mt-2 space-y-1">
                  {relatedProjects.map((p) => (
                    <li key={p.slug}>
                      <a
                        href="#projects"
                        className="group flex items-center gap-2 text-sm text-white/80 hover:text-[#22d3ee]"
                      >
                        <span className="h-1 w-1 rounded-full bg-[#22d3ee]" />
                        {p.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// =========================================================================
// Capability Constellation - cluster filter + radial tech display
// =========================================================================

export function CapabilityConstellation() {
  const [activeCluster, setActiveCluster] = useState<string>("infrastructure");
  const [hoverTech, setHoverTech] = useState<string | null>(null);
  const active = capabilities.find((c) => c.id === activeCluster)!;
  const containerRef = useRef<HTMLDivElement>(null);
  const inView = useInView(containerRef, { once: true, margin: "-10%" });

  const techPositions = useMemo(() => {
    const count = active.technologies.length;
    return active.technologies.map((t, i) => {
      const angle = (i / count) * Math.PI * 2 - Math.PI / 2;
      const radius = 35;
      return {
        tech: t,
        x: 50 + Math.cos(angle) * radius,
        y: 50 + Math.sin(angle) * radius,
      };
    });
  }, [active]);

  return (
    <section
      id="capabilities"
      className="relative mx-auto w-full max-w-6xl px-4 py-20 sm:px-6 sm:py-24 lg:px-0"
      aria-label="Engineering capabilities"
    >
      <SectionHeader
        kicker="03 · Engineering Capabilities"
        title="Technology clusters, not skill bars."
        description="Select a cluster to explore its technologies. Hover highlights connections."
      />

      {/* Cluster filter */}
      <div className="mt-8 flex flex-wrap gap-2 sm:mt-10">
        {capabilities.map((c) => (
          <button
            key={c.id}
            onClick={() => setActiveCluster(c.id)}
            aria-pressed={c.id === activeCluster}
            className={cn(
              "rounded-full border px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.2em] transition-all sm:px-4 sm:py-2 sm:text-[11px]",
              c.id === activeCluster
                ? "border-[#22d3ee]/60 bg-[#22d3ee]/10 text-white"
                : "border-white/10 bg-white/5 text-[#B8C2CC] hover:border-white/30"
            )}
          >
            {c.name}
          </button>
        ))}
      </div>

      <div ref={containerRef} className="mt-8 grid gap-6 sm:mt-10 lg:grid-cols-[1.2fr_1fr] lg:gap-8">
        {/* Constellation */}
        <div className="panel relative aspect-square max-w-[400px] self-center overflow-hidden sm:max-w-none">
          <div
            className="absolute inset-0 opacity-[0.02]"
            style={{
              backgroundImage: `linear-gradient(to right, rgba(255,255,255,0.4) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.4) 1px, transparent 1px)`,
              backgroundSize: "24px 24px",
            }}
            aria-hidden
          />

          {/* Center hub */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
            <div className="flex h-20 w-20 flex-col items-center justify-center rounded-full border border-[#22d3ee]/40 bg-[#0C121D] shadow-[0_0_50px_-10px_rgba(34,211,238,0.5)] sm:h-24 sm:w-24">
              <span className="font-mono text-[8px] uppercase tracking-[0.25em] text-[#7D8590] sm:text-[9px]">
                Cluster
              </span>
              <span className="mt-0.5 font-display text-sm font-semibold gradient-text-cyan-violet sm:text-base">
                {active.name.split(" ")[0]}
              </span>
            </div>
          </div>

          {/* Connecting lines */}
          <svg
            viewBox="0 0 100 100"
            className="absolute inset-0 h-full w-full pointer-events-none"
            preserveAspectRatio="none"
            aria-hidden
          >
            {techPositions.map(({ tech, x, y }) => (
              <motion.line
                key={`${active.id}-${tech.id}`}
                initial={{ pathLength: 0, opacity: 0 }}
                animate={inView ? { pathLength: 1, opacity: 0.4 } : {}}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                x1="50" y1="50" x2={x} y2={y}
                stroke={hoverTech === tech.id ? "#22d3ee" : "rgba(255,255,255,0.15)"}
                strokeWidth={hoverTech === tech.id ? 0.4 : 0.2}
              />
            ))}
          </svg>

          {/* Tech nodes */}
          {techPositions.map(({ tech, x, y }, i) => (
            <motion.div
              key={tech.id}
              initial={{ opacity: 0, scale: 0.6 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.4, delay: i * 0.03, ease: [0.22, 1, 0.36, 1] }}
              className="absolute -translate-x-1/2 -translate-y-1/2"
              style={{ left: `${x}%`, top: `${y}%` }}
              onMouseEnter={() => setHoverTech(tech.id)}
              onMouseLeave={() => setHoverTech(null)}
            >
              <div
                className={cn(
                  "flex flex-col items-center justify-center rounded-full border text-center transition-all duration-300",
                  "h-14 w-14 sm:h-20 sm:w-20",
                  hoverTech === tech.id
                    ? "border-[#22d3ee] bg-[#22d3ee]/10 shadow-[0_0_30px_-4px_rgba(34,211,238,0.6)]"
                    : "border-white/15 bg-[#0C121D]/80 hover:border-white/30"
                )}
              >
                <span
                  className={cn(
                    "px-1 font-mono font-medium uppercase tracking-widest transition-colors",
                    "text-[8px] sm:text-[10px]",
                    hoverTech === tech.id ? "text-[#22d3ee]" : "text-white/80"
                  )}
                >
                  {tech.name}
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Cluster description + tech list */}
        <div className="panel relative p-5 sm:p-6">
          <motion.div
            key={active.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-[#22d3ee]">
              {active.technologies.length} technologies
            </span>
            <h3 className="mt-2 font-display text-xl font-semibold sm:text-2xl">{active.name}</h3>
            <p className="mt-3 text-sm text-[#B8C2CC]">{active.description}</p>

            <div className="mt-5">
              <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-[#7D8590]">
                Tech list
              </p>
              <ul className="mt-3 space-y-2">
                {active.technologies.map((t) => (
                  <li
                    key={t.id}
                    onMouseEnter={() => setHoverTech(t.id)}
                    onMouseLeave={() => setHoverTech(null)}
                    className={cn(
                      "flex items-center justify-between rounded-lg border border-white/10 bg-white/[0.02] px-3 py-2 transition-all",
                      hoverTech === t.id && "border-[#22d3ee]/40 bg-[#22d3ee]/5"
                    )}
                  >
                    <span className="text-sm text-white">{t.name}</span>
                    {t.usedIn && t.usedIn.length > 0 && (
                      <span className="font-mono text-[10px] uppercase tracking-widest text-[#7D8590]">
                        {t.usedIn.length} project{t.usedIn.length > 1 ? "s" : ""}
                      </span>
                    )}
                  </li>
                ))}
              </ul>
            </div>

            <p className="sr-only">
              Cluster {active.name} includes:{" "}
              {active.technologies.map((t) => t.name).join(", ")}.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
