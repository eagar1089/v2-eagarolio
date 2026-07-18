import { useMemo, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Github, GitBranch, Layers, Network, Target, AlertTriangle, Sparkles, Compass, Globe } from "lucide-react";
import { projects, type Project } from "@/config";
import { cn } from "@/lib/utils";

// =========================================================================
// Section Header
// =========================================================================

function SectionHeader({ kicker, title, description }: {
  kicker: string;
  title: string;
  description?: string;
}) {
  return (
    <header className="mx-auto max-w-3xl">
      <motion.span
        initial={{ opacity: 0, y: 8 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="font-mono text-[10px] uppercase tracking-[0.4em] text-[#22d3ee]"
      >
        {kicker}
      </motion.span>
      <motion.h2
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, delay: 0.05 }}
        className="mt-3 font-display text-balance text-3xl font-semibold leading-[1.1] tracking-tight sm:text-4xl lg:text-5xl"
      >
        {title}
      </motion.h2>
      {description && (
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="mt-4 max-w-2xl text-[15px] leading-relaxed text-[#B8C2CC]"
        >
          {description}
        </motion.p>
      )}
    </header>
  );
}

// =========================================================================
// Project Mission Control - ALL projects on ONE scrollable page
// =========================================================================

const STATUS_LABEL: Record<Project["status"], string> = {
  production: "Production",
  research: "Research",
  migration: "Migration",
  active: "Active",
};

const STATUS_COLOR: Record<Project["status"], string> = {
  production: "#10b981",
  research: "#a855f7",
  migration: "#f59e0b",
  active: "#22d3ee",
};

export function ProjectMissionControl() {
  return (
    <section
      id="projects"
      className="relative mx-auto w-full max-w-7xl px-4 py-20 sm:px-6 sm:py-24 lg:px-0"
      aria-label="Project case studies"
    >
      <SectionHeader
        kicker="04 · Project Case Studies"
        title="Case studies, not project cards."
        description="Each project is treated as a miniature product - with architecture, constraints, decisions, and a live data-flow diagram."
      />

      {/* All projects, one after another */}
      <div className="mt-16 space-y-20 sm:mt-20 sm:space-y-28">
        {projects.map((project, i) => (
          <ProjectCaseStudy key={project.slug} project={project} index={i} />
        ))}
      </div>
    </section>
  );
}

// =========================================================================
// Single Project Case Study
// =========================================================================

function ProjectCaseStudy({ project, index }: { project: Project; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-8% 0px -8% 0px" });

  const layout = useMemo(() => {
    const count = project.architecture.nodes.length;
    return project.architecture.nodes.map((n, i) => {
      const x = 8 + (i / Math.max(1, count - 1)) * 84;
      const y = 50 + Math.sin((i / Math.max(1, count - 1)) * Math.PI * 1.2) * 20;
      return { id: n.id, x, y };
    });
  }, [project.architecture.nodes]);

  const getPos = (id: string) => layout.find((p) => p.id === id) ?? { x: 50, y: 50 };
  const [hoverNode, setHoverNode] = useState<string | null>(null);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.8, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* Separator between projects */}
      {index > 0 && (
        <div className="mb-12 flex items-center gap-4 sm:mb-16">
          <span className="h-px flex-1 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
          <span className="font-mono text-[10px] uppercase tracking-[0.4em] text-[#7D8590]">
            {String(index + 1).padStart(2, "0")} / {projects.length}
          </span>
          <span className="h-px flex-1 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
        </div>
      )}

      {/* Project header */}
      <div className="grid gap-8 lg:grid-cols-[1.4fr_1fr]">
        <div>
          <div className="flex flex-wrap items-center gap-2 sm:gap-3">
            <span
              className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.25em]"
              style={{ color: STATUS_COLOR[project.status] }}
            >
              <span
                className="h-1.5 w-1.5 rounded-full"
                style={{ background: STATUS_COLOR[project.status] }}
              />
              {STATUS_LABEL[project.status]}
            </span>
            <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-[#7D8590]">
              {project.category}
            </span>
            <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-[#7D8590]">
              {project.year}
            </span>
          </div>

          <h3 className="mt-4 font-display text-2xl font-semibold leading-tight sm:text-3xl lg:text-[40px]">
            {project.name}
          </h3>
          <p className="mt-2 text-base text-[#B8C2CC] sm:text-lg">{project.tagline}</p>
          <p className="mt-4 text-[15px] leading-relaxed text-[#B8C2CC]">
            {project.purpose}
          </p>

          <dl className="mt-5 grid grid-cols-2 gap-3 text-sm">
            <Detail label="Role" value={project.role} />
            <Detail label="Category" value={project.category} />
          </dl>

          <div className="mt-5 flex flex-wrap gap-2 sm:mt-6 sm:gap-3">
            {project.repository && (
              <a
                href={`https://github.com/eagar1089/${project.repository}`}
                target="_blank"
                rel="noopener noreferrer"
                data-cursor="Open"
                className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm text-white hover:border-[#22d3ee]/60"
              >
                <Github className="h-4 w-4" />
                Repository
              </a>
            )}
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                data-cursor="Open"
                className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm text-white hover:border-[#22d3ee]/60"
              >
                <Globe className="h-4 w-4" />
                Live demo
              </a>
            )}
            <a
              href={`#arch-${project.slug}`}
              className="inline-flex items-center gap-2 rounded-full border border-[#22d3ee]/40 bg-[#22d3ee]/5 px-4 py-2 text-sm text-[#22d3ee] hover:bg-[#22d3ee]/10"
            >
              <Network className="h-4 w-4" />
              Architecture
            </a>
          </div>
        </div>

        {/* Highlights + stack */}
        <div className="space-y-4">
          <div className="panel p-4 sm:p-5">
            <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.3em] text-[#22d3ee]">
              <Sparkles className="h-3.5 w-3.5" />
              Highlights
            </div>
            <ul className="mt-3 space-y-2">
              {project.highlights.map((h) => (
                <li key={h} className="flex gap-2 text-sm text-[#B8C2CC]">
                  <span className="mt-1.5 block h-1 w-1 shrink-0 rounded-full bg-[#22d3ee]" />
                  <span>{h}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="panel p-4 sm:p-5">
            <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.3em] text-[#a855f7]">
              <Layers className="h-3.5 w-3.5" />
              Stack
            </div>
            <div className="mt-3 flex flex-wrap gap-2">
              {project.stack.map((s) => (
                <span
                  key={s}
                  className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 font-mono text-[11px] text-[#B8C2CC]"
                >
                  {s}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Engineering story - 4 column grid */}
      <div className="mt-10 grid gap-4 sm:mt-12 sm:grid-cols-2 lg:grid-cols-4">
        <StoryCard
          icon={Target}
          title="Problem"
          tone="#f43f5e"
          items={[project.problem]}
        />
        <StoryCard
          icon={AlertTriangle}
          title="Constraints"
          tone="#f59e0b"
          items={project.constraints}
        />
        <StoryCard
          icon={Compass}
          title="Approach"
          tone="#22d3ee"
          items={project.approach}
        />
        <StoryCard
          icon={Sparkles}
          title="Challenges"
          tone="#a855f7"
          items={project.challenges}
        />
      </div>

      {/* Architecture diagram */}
      <div id={`arch-${project.slug}`} className="mt-10 sm:mt-12">
        <div className="panel relative overflow-hidden p-4 sm:p-6">
          <div>
            <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.3em] text-[#22d3ee]">
              <Network className="h-3.5 w-3.5" />
              System architecture
            </div>
            <h4 className="mt-2 font-display text-lg font-semibold sm:text-xl">
              {project.name}
            </h4>
            <p className="mt-1 max-w-2xl text-sm text-[#B8C2CC]">
              {project.architecture.summary}
            </p>
          </div>

          <div className="relative mt-6 aspect-[16/10] w-full overflow-hidden rounded-lg border border-white/10 bg-[#070B12]/50 sm:mt-8 sm:aspect-[16/7]">
            <div
              className="absolute inset-0 opacity-[0.03]"
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
              role="img"
              aria-label={project.architecture.summary}
            >
              {project.architecture.edges.map(([a, b], i) => {
                const p1 = getPos(a);
                const p2 = getPos(b);
                const active = hoverNode === a || hoverNode === b;
                return (
                  <motion.line
                    key={`${a}-${b}-${i}`}
                    x1={p1.x}
                    y1={p1.y}
                    x2={p2.x}
                    y2={p2.y}
                    stroke={active ? "#22d3ee" : "rgba(255,255,255,0.12)"}
                    strokeWidth={active ? 0.5 : 0.2}
                    initial={{ pathLength: 0 }}
                    animate={inView ? { pathLength: 1 } : {}}
                    transition={{ duration: 0.9, delay: i * 0.05, ease: [0.22, 1, 0.36, 1] }}
                  />
                );
              })}
            </svg>

            {project.architecture.nodes.map((node) => {
              const pos = getPos(node.id);
              const active = hoverNode === node.id;
              return (
                <div
                  key={node.id}
                  onMouseEnter={() => setHoverNode(node.id)}
                  onMouseLeave={() => setHoverNode(null)}
                  onFocus={() => setHoverNode(node.id)}
                  onBlur={() => setHoverNode(null)}
                  tabIndex={0}
                  aria-label={node.description ? `${node.label}: ${node.description}` : node.label}
                  className="absolute -translate-x-1/2 -translate-y-1/2"
                  style={{ left: `${pos.x}%`, top: `${pos.y}%` }}
                >
                  <motion.div
                    whileHover={{ scale: 1.08 }}
                    className={cn(
                      "relative flex flex-col items-center gap-0.5 rounded-md border bg-[#0C121D] px-2 py-1 text-center transition-all duration-300 sm:px-3 sm:py-2",
                      active
                        ? "border-[#22d3ee]/60 shadow-[0_0_30px_-6px_rgba(34,211,238,0.6)]"
                        : "border-white/10"
                    )}
                  >
                    <span
                      className={cn(
                        "font-mono font-medium uppercase tracking-widest transition-colors",
                        "text-[7px] sm:text-[10px]",
                        active ? "text-[#22d3ee]" : "text-white/90"
                      )}
                    >
                      {node.label}
                    </span>
                    {active && node.description && (
                      <motion.span
                        initial={{ opacity: 0, y: -4 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="absolute top-full mt-2 w-44 rounded-md border border-white/10 bg-[#0C121D] p-2 text-[10px] leading-snug text-[#B8C2CC] shadow-xl sm:w-48"
                      >
                        {node.description}
                      </motion.span>
                    )}
                  </motion.div>
                </div>
              );
            })}
          </div>

          <p className="sr-only">
            Architecture flow: {project.architecture.nodes.map((n) => n.label).join(", then ")}.
          </p>
        </div>
      </div>

      {/* Data flow + outcome / future */}
      <div className="mt-8 grid gap-6 sm:mt-10 lg:grid-cols-[1fr_1fr]">
        <div className="panel p-4 sm:p-6">
          <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.3em] text-[#22d3ee]">
            <GitBranch className="h-3.5 w-3.5" />
            Data flow
          </div>
          <ol className="mt-4 space-y-3">
            {project.dataFlow.map((step, i) => (
              <li key={i} className="flex gap-3">
                <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-[#22d3ee]/40 font-mono text-[10px] text-[#22d3ee]">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="text-sm text-[#B8C2CC]">{step}</span>
              </li>
            ))}
          </ol>
        </div>

        <div className="space-y-4">
          <div className="panel p-4 sm:p-6">
            <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-[#10b981]">
              Outcome
            </div>
            <ul className="mt-3 space-y-2">
              {project.outcome.map((o) => (
                <li key={o} className="flex gap-2 text-sm text-[#B8C2CC]">
                  <span className="mt-1.5 block h-1 w-1 shrink-0 rounded-full bg-[#10b981]" />
                  <span>{o}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="panel p-4 sm:p-6">
            <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-[#a855f7]">
              Future work
            </div>
            <ul className="mt-3 space-y-2">
              {project.future.map((f) => (
                <li key={f} className="flex gap-2 text-sm text-[#B8C2CC]">
                  <span className="mt-1.5 block h-1 w-1 shrink-0 rounded-full bg-[#a855f7]" />
                  <span>{f}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Deep-dive sections */}
      {project.sections.length > 0 && (
        <div className="mt-8 grid gap-4 sm:mt-10 sm:grid-cols-2 lg:grid-cols-3">
          {project.sections.map((s) => (
            <div key={s.id} className="panel p-4 sm:p-5">
              <h4 className="font-display text-base font-semibold sm:text-lg">{s.title}</h4>
              <p className="mt-2 text-sm leading-relaxed text-[#B8C2CC]">{s.body}</p>
            </div>
          ))}
        </div>
      )}
    </motion.div>
  );
}

// =========================================================================
// Helpers
// =========================================================================

function Detail({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="font-mono text-[10px] uppercase tracking-[0.25em] text-[#7D8590]">{label}</dt>
      <dd className="mt-1 text-sm text-white">{value}</dd>
    </div>
  );
}

function StoryCard({
  icon: Icon,
  title,
  tone,
  items,
}: {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  tone: string;
  items: string[];
}) {
  return (
    <div className="panel p-4 sm:p-5">
      <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.3em]" style={{ color: tone }}>
        <Icon className="h-3.5 w-3.5" />
        {title}
      </div>
      <ul className="mt-3 space-y-2">
        {items.map((item, i) => (
          <li key={i} className="flex gap-2 text-sm text-[#B8C2CC]">
            <span className="mt-1.5 block h-1 w-1 shrink-0 rounded-full" style={{ background: tone }} />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
