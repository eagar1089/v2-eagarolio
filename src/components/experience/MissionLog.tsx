import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { BookOpen, Briefcase, ExternalLink, GraduationCap, Wrench } from "lucide-react";
import { missionLog } from "@/config";

export function SectionHeader({ kicker, title, description }: {
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

export function MissionLog() {
  return (
    <section id="mission-log" className="relative mx-auto w-full max-w-5xl" aria-label="Career timeline">
      <SectionHeader
        kicker="05 - Mission Log"
        title="The journey, mapped out."
        description="Education, career decisions, and professional growth across Linux administration and web development."
      />

      <div className="relative mt-10 sm:mt-12">
        <motion.div
          className="absolute bottom-6 left-4 top-6 w-px bg-gradient-to-b from-transparent via-[#22d3ee]/45 to-transparent md:left-1/2 md:-translate-x-1/2"
          initial={{ scaleY: 0, opacity: 0 }}
          whileInView={{ scaleY: 1, opacity: 1 }}
          viewport={{ once: true, amount: 0.08 }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          style={{ transformOrigin: "top" }}
          aria-hidden="true"
        />
        <div className="space-y-6 md:space-y-7">
          {missionLog.map((entry, index) => (
            <MissionEntry key={entry.id} entry={entry} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

function MissionEntry({ entry, index }: { entry: typeof missionLog[number]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });
  const isEducation = entry.id === "diploma" || entry.id === "be-degree";

  return (
    <motion.article
      ref={ref}
      initial={{ opacity: 0, x: index % 2 === 0 ? -34 : 34, y: 18 }}
      animate={inView ? { opacity: 1, x: 0, y: 0 } : {}}
      transition={{ duration: 0.75, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
      className="relative grid min-w-0 grid-cols-[1.75rem_minmax(0,1fr)] gap-3 md:grid-cols-[minmax(0,1fr)_3rem_minmax(0,1fr)] md:gap-0"
    >
      <div className="relative z-10 col-start-1 row-start-1 flex justify-center pt-5 md:col-start-2">
        <motion.div
          className="flex h-7 w-7 items-center justify-center rounded-full border border-[#22d3ee]/40 bg-[#070B12]"
          animate={inView ? { boxShadow: ["0 0 0 rgba(34,211,238,0)", "0 0 22px rgba(34,211,238,0.28)", "0 0 0 rgba(34,211,238,0)"] } : {}}
          transition={{ duration: 2.6, repeat: Infinity, delay: index * 0.35 }}
        >
          <div className="h-2 w-2 rounded-full bg-[#22d3ee] shadow-[0_0_10px_rgba(34,211,238,0.6)]" />
        </motion.div>
      </div>

      <div className={`col-start-2 row-start-1 min-w-0 ${index % 2 === 0 ? "md:col-start-1 md:pr-5" : "md:col-start-3 md:pl-5"}`}>
        <div className="panel h-full p-4 hover:-translate-y-1 sm:p-[1.125rem]">
          <div className="flex flex-wrap items-center gap-2">
            <span className="rounded-full border border-[#22d3ee]/40 bg-[#22d3ee]/10 px-2.5 py-0.5 font-mono text-[9px] uppercase tracking-[0.22em] text-[#22d3ee]">
              {entry.period}
            </span>
            {isEducation && <GraduationCap className="h-3.5 w-3.5 text-[#a855f7]" aria-hidden="true" />}
          </div>

          <h3 className="mt-2.5 font-display text-lg font-semibold text-white">{entry.title}</h3>
          <p className="mt-1.5 text-[13px] leading-relaxed text-[#B8C2CC]">{entry.focus}</p>

          {entry.systems.length > 0 && (
            <div className="mt-3.5">
              <div className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.25em] text-[#7D8590]">
                <Wrench className="h-3 w-3" /> Focus
              </div>
              <div className="mt-1.5 flex flex-wrap gap-1.5">
                {entry.systems.map((item) => (
                  <span key={item} className="rounded-full border border-white/10 bg-white/5 px-2 py-0.5 font-mono text-[10px] text-[#B8C2CC]">{item}</span>
                ))}
              </div>
            </div>
          )}

          {entry.responsibilities.length > 0 && (
            <div className="mt-3.5">
              <div className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.25em] text-[#7D8590]">
                <Briefcase className="h-3 w-3" /> Milestones
              </div>
              <ul className="mt-1.5 space-y-1">
                {entry.responsibilities.map((item) => (
                  <li key={item} className="flex gap-2 text-[13px] leading-snug text-[#B8C2CC]">
                    <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-[#22d3ee]" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {entry.projectHighlights && entry.projectHighlights.length > 0 && (
            <div className="mt-4 border-t border-white/10 pt-3.5">
              <div className="flex items-center justify-between gap-3">
                <div className="font-mono text-[10px] uppercase tracking-[0.25em] text-[#22d3ee]">Project highlights</div>
                <span className="font-mono text-[9px] text-[#7D8590]">{entry.projectHighlights.length} projects</span>
              </div>
              <div className="mt-2.5 grid gap-2">
                {entry.projectHighlights.map((project, projectIndex) => {
                  const current = project.status === "current";
                  const degree = project.status === "degree";
                  const content = (
                    <>
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <div className="flex flex-wrap items-center gap-2">
                            <h4 className="text-[13px] font-semibold text-white/90">{project.name}</h4>
                            <span className={`rounded-full px-2 py-0.5 font-mono text-[8px] uppercase tracking-[0.16em] ${
                              current
                                ? "bg-[#22d3ee]/15 text-[#22d3ee]"
                                : degree
                                  ? "bg-[#a855f7]/15 text-[#c084fc]"
                                  : "bg-emerald-400/10 text-emerald-300"
                            }`}>
                              {current ? "Current" : degree ? "BE project" : "Completed"}
                            </span>
                          </div>
                          <p className="mt-1 text-[11px] leading-relaxed text-[#7D8590]">{project.description}</p>
                        </div>
                        {project.url && <ExternalLink className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#22d3ee]/70" />}
                      </div>
                    </>
                  );

                  return (
                    <motion.div
                      key={project.name}
                      initial={{ opacity: 0, y: 10 }}
                      animate={inView ? { opacity: 1, y: 0 } : {}}
                      transition={{ duration: 0.45, delay: 0.24 + projectIndex * 0.07 }}
                      whileHover={{ y: -2 }}
                      className={`rounded-lg border p-3 transition-colors ${
                        current
                          ? "border-[#22d3ee]/35 bg-gradient-to-r from-[#22d3ee]/10 to-transparent shadow-[0_0_24px_rgba(34,211,238,0.07)]"
                          : degree
                            ? "border-[#a855f7]/20 bg-[#a855f7]/[0.045] hover:border-[#a855f7]/40"
                            : "border-white/10 bg-white/[0.025] hover:border-emerald-400/30"
                      }`}
                    >
                      {project.url ? (
                        <a href={project.url} target="_blank" rel="noopener noreferrer" className="block" aria-label={`Open ${project.name} on GitHub`}>
                          {content}
                        </a>
                      ) : content}
                    </motion.div>
                  );
                })}
              </div>
            </div>
          )}

          {entry.lessons.length > 0 && (
            <div className="mt-3.5">
              <div className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.25em] text-[#7D8590]">
                <BookOpen className="h-3 w-3" /> Growth
              </div>
              <ul className="mt-1.5 space-y-1">
                {entry.lessons.map((item) => (
                  <li key={item} className="flex gap-2 text-[13px] leading-snug text-[#B8C2CC]">
                    <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-[#a855f7]" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </motion.article>
  );
}
