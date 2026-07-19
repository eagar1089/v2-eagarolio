import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Briefcase, BookOpen, ChevronRight, Wrench } from "lucide-react";
import { missionLog, projects } from "@/config";

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
  return (
    <section
      id="mission-log"
      className="relative mx-auto w-full max-w-5xl px-4 py-20 sm:px-6 sm:py-24 lg:px-0"
      aria-label="Career mission log"
    >
      <SectionHeader
        kicker="06 · Mission Log"
        title="The journey, mapped out."
        description="Key phases of focus, systems worked on, tools used, and lessons learned along the way."
      />

      <div className="mt-12 relative sm:mt-16">
        {/* Vertical line - left on mobile, center on desktop */}
        <div className="absolute left-5 top-4 bottom-0 w-px bg-gradient-to-b from-[#22d3ee]/60 via-[#a855f7]/40 to-[#10b981]/20 sm:left-1/2" />

        <div className="space-y-10 sm:space-y-14">
          {missionLog.map((m, i) => (
            <MissionEntry key={m.id} entry={m} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function MissionEntry({ entry, index }: { entry: typeof missionLog[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
      className="relative pl-14 sm:pl-0"
    >
      {/* Timeline dot */}
      <div className="absolute left-5 top-6 z-10 -translate-x-1/2 sm:left-1/2">
        <div className="flex h-10 w-10 items-center justify-center rounded-full border border-[#22d3ee]/40 bg-[#070B12]">
          <div className="h-3 w-3 rounded-full bg-[#22d3ee] shadow-[0_0_12px_rgba(34,211,238,0.6)]" />
        </div>
      </div>

      {/* Content card - full width on mobile, half-width alternating on desktop */}
      <div
        className={`
          ml-0 sm:ml-0 sm:w-[calc(50%-32px)]
          ${index % 2 === 0 ? "sm:mr-auto sm:pr-10" : "sm:ml-auto sm:pl-10"}
        `}
      >
        <div className="panel p-5 sm:p-6">
          {/* Header */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="rounded-full border border-[#22d3ee]/40 bg-[#22d3ee]/10 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.25em] text-[#22d3ee]">
              {entry.period}
            </span>
          </div>

          <h3 className="mt-3 font-display text-xl font-semibold text-white sm:text-2xl">
            {entry.title}
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-[#B8C2CC]">{entry.focus}</p>

          {/* Systems */}
          <div className="mt-4">
            <div className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.25em] text-[#7D8590]">
              <Wrench className="h-3 w-3" />
              Systems
            </div>
            <div className="mt-2 flex flex-wrap gap-2">
              {entry.systems.map((s) => (
                <span
                  key={s}
                  className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 font-mono text-[11px] text-[#B8C2CC]"
                >
                  {s}
                </span>
              ))}
            </div>
          </div>

          {/* Responsibilities */}
          <div className="mt-4">
            <div className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.25em] text-[#7D8590]">
              <Briefcase className="h-3 w-3" />
              What I did
            </div>
            <ul className="mt-2 space-y-1.5">
              {entry.responsibilities.slice(0, 4).map((r) => (
                <li key={r} className="flex gap-2 text-sm text-[#B8C2CC]">
                  <span className="mt-1.5 block h-1 w-1 shrink-0 rounded-full bg-[#22d3ee]" />
                  <span>{r}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Lessons */}
          {entry.lessons.length > 0 && (
            <div className="mt-4">
              <div className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.25em] text-[#7D8590]">
                <BookOpen className="h-3 w-3" />
                Lessons
              </div>
              <ul className="mt-2 space-y-1.5">
                {entry.lessons.map((l) => (
                  <li key={l} className="flex gap-2 text-sm text-[#B8C2CC]">
                    <span className="mt-1.5 block h-1 w-1 shrink-0 rounded-full bg-[#a855f7]" />
                    <span>{l}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Related projects */}
          {entry.relatedProjects && entry.relatedProjects.length > 0 && (
            <div className="mt-5 border-t border-white/10 pt-4">
              <div className="font-mono text-[10px] uppercase tracking-[0.25em] text-[#7D8590]">
                Related projects
              </div>
              <div className="mt-2 flex flex-wrap gap-2">
                {entry.relatedProjects.map((slug) => {
                  const p = projects.find((x) => x.slug === slug);
                  if (!p) return null;
                  return (
                    <a
                      key={slug}
                      href="#projects"
                      className="group inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-white/80 hover:border-[#22d3ee]/40 hover:text-white"
                    >
                      {p.name.split(" ").slice(0, 3).join(" ")}
                      <ChevronRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5" />
                    </a>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Spacer for the other side on desktop */}
      <div className="hidden sm:block sm:w-[calc(50%-32px)]" />
    </motion.div>
  );
}
