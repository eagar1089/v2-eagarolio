import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion, useInView } from "framer-motion";
import { Briefcase, BookOpen, ChevronRight, Network, Wrench, X } from "lucide-react";
import { missionLog, projects, type Project } from "@/config";

const GitHubIcon = ({ className = "" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.4 5.4 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

// =========================================================================
// Section Header
// =========================================================================

export function SectionHeader({ kicker, title, description }: {
  kicker: string; title: string; description?: string;
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
// Mission Log - clean vertical timeline, fully responsive
// =========================================================================

export function MissionLog() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <section
      id="mission-log"
      className="relative mx-auto w-full max-w-5xl"
      aria-label="Career mission log"
    >
      <SectionHeader
        kicker="04 - Mission Log"
        title="The journey, mapped out."
        description="Career phases and the projects built within them. Select a project to explore its architecture, decisions, and outcomes."
      />

      <div className="relative mt-10 sm:mt-12">
        <motion.div
          className="absolute bottom-6 left-4 top-6 w-px bg-gradient-to-b from-transparent via-[#22d3ee]/45 to-transparent md:left-1/2 md:-translate-x-1/2"
          aria-hidden="true"
          initial={{ scaleY: 0, opacity: 0 }}
          whileInView={{ scaleY: 1, opacity: 1 }}
          viewport={{ once: true, amount: 0.08 }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          style={{ transformOrigin: "top" }}
        />
        <div className="space-y-6 md:space-y-7">
          {missionLog.map((m, index) => (
            <MissionEntry key={m.id} entry={m} index={index} onSelectProject={setSelectedProject} />
          ))}
        </div>
      </div>

      <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
    </section>
  );
}

function MissionEntry({
  entry,
  index,
  onSelectProject,
}: {
  entry: typeof missionLog[0];
  index: number;
  onSelectProject: (project: Project) => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: index % 2 === 0 ? -34 : 34, y: 18 }}
      animate={inView ? { opacity: 1, x: 0, y: 0 } : {}}
      transition={{ duration: 0.75, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
      className="relative grid min-w-0 grid-cols-[1.75rem_minmax(0,1fr)] gap-3 md:grid-cols-[minmax(0,1fr)_3rem_minmax(0,1fr)] md:gap-0"
    >
      {/* Timeline dot */}
      <div className="relative z-10 col-start-1 row-start-1 flex justify-center pt-5 md:col-start-2">
        <motion.div
          className="flex h-7 w-7 items-center justify-center rounded-full border border-[#22d3ee]/40 bg-[#070B12]"
          animate={inView ? { boxShadow: ["0 0 0 rgba(34,211,238,0)", "0 0 22px rgba(34,211,238,0.28)", "0 0 0 rgba(34,211,238,0)"] } : {}}
          transition={{ duration: 2.6, repeat: Infinity, delay: index * 0.35 }}
        >
          <div className="h-2 w-2 rounded-full bg-[#22d3ee] shadow-[0_0_10px_rgba(34,211,238,0.6)]" />
        </motion.div>
      </div>

      {/* Content card - connected timeline on desktop, single rail on mobile */}
      <div
        className={`col-start-2 row-start-1 min-w-0 md:col-span-1 ${
          index % 2 === 0 ? "md:col-start-1 md:pr-5" : "md:col-start-3 md:pl-5"
        }`}
      >
        <div className="panel h-full p-4 hover:-translate-y-1 sm:p-[1.125rem]">
          {/* Header */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="rounded-full border border-[#22d3ee]/40 bg-[#22d3ee]/10 px-2.5 py-0.5 font-mono text-[9px] uppercase tracking-[0.22em] text-[#22d3ee]">
              {entry.period}
            </span>
          </div>

          <h3 className="mt-2.5 font-display text-lg font-semibold text-white">
            {entry.title}
          </h3>
          <p className="mt-1.5 text-[13px] leading-relaxed text-[#B8C2CC]">{entry.focus}</p>

          {/* Systems */}
          <div className="mt-3.5">
            <div className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.25em] text-[#7D8590]">
              <Wrench className="h-3 w-3" />
              Systems
            </div>
            <div className="mt-1.5 flex flex-wrap gap-1.5">
              {entry.systems.map((s) => (
                <span
                  key={s}
                  className="rounded-full border border-white/10 bg-white/5 px-2 py-0.5 font-mono text-[10px] text-[#B8C2CC]"
                >
                  {s}
                </span>
              ))}
            </div>
          </div>

          {/* Responsibilities */}
          <div className="mt-3.5">
            <div className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.25em] text-[#7D8590]">
              <Briefcase className="h-3 w-3" />
              What I did
            </div>
            <ul className="mt-1.5 space-y-1">
              {entry.responsibilities.slice(0, 4).map((r) => (
                <li key={r} className="flex gap-2 text-[13px] leading-snug text-[#B8C2CC]">
                  <span className="mt-1.5 block h-1 w-1 shrink-0 rounded-full bg-[#22d3ee]" />
                  <span>{r}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Lessons */}
          {entry.lessons.length > 0 && (
            <div className="mt-3.5">
              <div className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.25em] text-[#7D8590]">
                <BookOpen className="h-3 w-3" />
                Lessons
              </div>
              <ul className="mt-1.5 space-y-1">
                {entry.lessons.map((l) => (
                  <li key={l} className="flex gap-2 text-[13px] leading-snug text-[#B8C2CC]">
                    <span className="mt-1.5 block h-1 w-1 shrink-0 rounded-full bg-[#a855f7]" />
                    <span>{l}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Related projects */}
          {entry.relatedProjects && entry.relatedProjects.length > 0 && (
            <div className="mt-4 border-t border-white/10 pt-3">
              <div className="font-mono text-[10px] uppercase tracking-[0.25em] text-[#7D8590]">
                Related projects
              </div>
              <div className="mt-1.5 flex flex-wrap gap-1.5">
                {entry.relatedProjects.map((slug, projectIndex) => {
                  const p = projects.find((x) => x.slug === slug);
                  if (!p) return null;
                  return (
                    <motion.button
                      key={slug}
                      type="button"
                      onClick={() => onSelectProject(p)}
                      initial={{ opacity: 0, y: 8 }}
                      animate={inView ? { opacity: 1, y: 0 } : {}}
                      transition={{ delay: 0.3 + projectIndex * 0.06 }}
                      whileHover={{ y: -2, scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="group inline-flex items-center gap-1 rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-[11px] text-white/80 hover:border-[#22d3ee]/50 hover:bg-[#22d3ee]/10 hover:text-white"
                      aria-label={`Explore ${p.name}`}
                    >
                      {p.name.split(" ").slice(0, 3).join(" ")}
                      <ChevronRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5" />
                    </motion.button>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>

    </motion.div>
  );
}

function ProjectModal({ project, onClose }: { project: Project | null; onClose: () => void }) {
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!project) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", closeOnEscape);
    window.setTimeout(() => closeButtonRef.current?.focus(), 80);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [project, onClose]);

  if (typeof document === "undefined") return null;

  return createPortal(
    <AnimatePresence>
      {project && (
        <motion.div
          className="fixed inset-0 z-[10020] flex items-center justify-center bg-[#03060b]/85 p-3 backdrop-blur-md sm:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) onClose();
          }}
        >
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="project-dialog-title"
            className="relative max-h-[92vh] w-full max-w-5xl overflow-y-auto rounded-2xl border border-white/10 bg-[#0a101a]/95 shadow-[0_30px_100px_rgba(0,0,0,0.65)]"
            initial={{ opacity: 0, y: 38, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.97 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="sticky top-0 z-10 flex items-center justify-between border-b border-white/10 bg-[#0a101a]/90 px-4 py-3 backdrop-blur-xl sm:px-6">
              <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-[#22d3ee]">Project Mission Control</span>
              <button
                ref={closeButtonRef}
                type="button"
                onClick={onClose}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 text-[#B8C2CC] transition-colors hover:border-[#22d3ee]/50 hover:text-white"
                aria-label="Close project details"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="p-5 sm:p-7 lg:p-8">
              <div className="grid gap-6 lg:grid-cols-[1.25fr_0.75fr]">
                <div>
                  <div className="flex flex-wrap gap-2 font-mono text-[10px] uppercase tracking-[0.2em] text-[#7D8590]">
                    <span className="text-[#22d3ee]">{project.status}</span>
                    <span>{project.category}</span>
                    <span>{project.year}</span>
                  </div>
                  <h3 id="project-dialog-title" className="mt-3 font-display text-2xl font-semibold sm:text-3xl">{project.name}</h3>
                  <p className="mt-2 text-base text-[#B8C2CC]">{project.tagline}</p>
                  <p className="mt-4 text-sm leading-relaxed text-[#B8C2CC]">{project.purpose}</p>
                  <p className="mt-4 font-mono text-[11px] text-[#7D8590]">Role: {project.role}</p>
                </div>
                <div className="rounded-xl bg-white/[0.035] p-4">
                  <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-[#a855f7]">Technology stack</p>
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {project.stack.map((item) => (
                      <span key={item} className="rounded-full border border-white/10 px-2.5 py-1 font-mono text-[10px] text-[#B8C2CC]">{item}</span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-7 grid gap-4 md:grid-cols-2">
                <ModalList title="Problem" items={[project.problem]} tone="text-rose-400" />
                <ModalList title="Highlights" items={project.highlights} tone="text-[#22d3ee]" />
                <ModalList title="Approach" items={project.approach} tone="text-emerald-400" />
                <ModalList title="Challenges" items={project.challenges} tone="text-amber-400" />
              </div>

              <div className="mt-6 rounded-xl border border-white/10 bg-[#070B12]/70 p-4 sm:p-5">
                <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.25em] text-[#22d3ee]">
                  <Network className="h-3.5 w-3.5" /> Architecture flow
                </div>
                <p className="mt-2 text-sm text-[#B8C2CC]">{project.architecture.summary}</p>
                <div className="mt-4 flex gap-2 overflow-x-auto pb-2">
                  {project.architecture.nodes.map((node, index) => (
                    <div key={node.id} className="flex shrink-0 items-center gap-2">
                      <div className="min-w-28 rounded-lg border border-white/10 bg-white/[0.03] px-3 py-2">
                        <p className="font-mono text-[10px] text-white/90">{node.label}</p>
                        {node.description && <p className="mt-1 max-w-40 text-[10px] leading-snug text-[#7D8590]">{node.description}</p>}
                      </div>
                      {index < project.architecture.nodes.length - 1 && <ChevronRight className="h-4 w-4 shrink-0 text-[#22d3ee]/60" />}
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-6 grid gap-4 md:grid-cols-2">
                <ModalList title="Outcomes" items={project.outcome} tone="text-[#22d3ee]" />
                <ModalList title="Next steps" items={project.future} tone="text-[#a855f7]" />
              </div>

              {project.repository && (
                <a
                  href={`https://github.com/eagar1089/${project.repository}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="glass-button mt-7"
                >
                  <GitHubIcon className="h-4 w-4" /> Open repository
                </a>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
}

function ModalList({ title, items, tone }: { title: string; items: string[]; tone: string }) {
  return (
    <div className="rounded-xl bg-white/[0.03] p-4">
      <p className={`font-mono text-[10px] uppercase tracking-[0.25em] ${tone}`}>{title}</p>
      <ul className="mt-3 space-y-2">
        {items.map((item) => (
          <li key={item} className="flex gap-2 text-[13px] leading-relaxed text-[#B8C2CC]">
            <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-current" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
