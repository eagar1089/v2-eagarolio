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
      className="relative mx-auto w-full max-w-5xl"
      aria-label="Career mission log"
    >
      <SectionHeader
        kicker="05 - Mission Log"
        title="The journey, mapped out."
        description="Key phases of focus, systems worked on, tools used, and lessons learned along the way."
      />

      <div className="relative mt-10 sm:mt-12">
        <div
          className="absolute bottom-6 left-4 top-6 w-px bg-gradient-to-b from-transparent via-[#22d3ee]/45 to-transparent md:left-1/2 md:-translate-x-1/2"
          aria-hidden="true"
        />
        <div className="space-y-6 md:space-y-7">
          {missionLog.map((m, index) => (
            <MissionEntry key={m.id} entry={m} index={index} />
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
      className="relative grid min-w-0 grid-cols-[1.75rem_minmax(0,1fr)] gap-3 md:grid-cols-[minmax(0,1fr)_3rem_minmax(0,1fr)] md:gap-0"
    >
      {/* Timeline dot */}
      <div className="relative z-10 col-start-1 row-start-1 flex justify-center pt-5 md:col-start-2">
        <div className="flex h-7 w-7 items-center justify-center rounded-full border border-[#22d3ee]/40 bg-[#070B12]">
          <div className="h-2 w-2 rounded-full bg-[#22d3ee] shadow-[0_0_10px_rgba(34,211,238,0.6)]" />
        </div>
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
                {entry.relatedProjects.map((slug) => {
                  const p = projects.find((x) => x.slug === slug);
                  if (!p) return null;
                  return (
                    <a
                      key={slug}
                      href="#projects"
                      className="group inline-flex items-center gap-1 rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-[11px] text-white/80 hover:border-[#22d3ee]/40 hover:text-white"
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

    </motion.div>
  );
}
