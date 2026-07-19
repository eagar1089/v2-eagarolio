import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Activity, Sigma, AlertTriangle, GitMerge, Brain } from "lucide-react";
import { rcaMethods, type RCAMethod } from "@/config";
import { cn } from "@/lib/utils";
import { SectionHeader } from "../terminal/IdentityTerminal";

// =========================================================================
// RCA Research Lab - interactive method explorer.
// Framed as research, not a deployed AI product.
// =========================================================================

const CATEGORIES: { id: RCAMethod["category"]; label: string; Icon: React.ComponentType<{ className?: string }> }[] = [
  { id: "statistical", label: "Statistical", Icon: Sigma },
  { id: "rule-based",  label: "Rule-based",  Icon: GitMerge },
  { id: "ml",          label: "ML-assisted", Icon: Brain },
];

// A small synthetic demo dataset so visitors can see each method's output.
const SAMPLE = [12, 13, 11, 14, 13, 12, 15, 31, 12, 13, 11, 14, 13, 58, 12, 13, 12, 11, 14, 12];

function mean(arr: number[]): number {
  return arr.reduce((a, b) => a + b, 0) / arr.length;
}
function median(arr: number[]): number {
  const sorted = [...arr].sort((a, b) => a - b);
  const m = Math.floor(sorted.length / 2);
  return sorted.length % 2 ? sorted[m] : (sorted[m - 1] + sorted[m]) / 2;
}
function stddev(arr: number[]): number {
  const m = mean(arr);
  return Math.sqrt(arr.reduce((a, b) => a + (b - m) ** 2, 0) / arr.length);
}
function mad(arr: number[]): number {
  const med = median(arr);
  return median(arr.map((v) => Math.abs(v - med)));
}
function percentile(arr: number[], p: number): number {
  const sorted = [...arr].sort((a, b) => a - b);
  const idx = (p / 100) * (sorted.length - 1);
  const lo = Math.floor(idx);
  const hi = Math.ceil(idx);
  return sorted[lo] + (sorted[hi] - sorted[lo]) * (idx - lo);
}

export function RCALab() {
  const [active, setActive] = useState(rcaMethods[0].id);
  const [category, setCategory] = useState<RCAMethod["category"] | "all">("all");
  const method = rcaMethods.find((m) => m.id === active) ?? rcaMethods[0];

  const filtered = useMemo(
    () => (category === "all" ? rcaMethods : rcaMethods.filter((m) => m.category === category)),
    [category]
  );

  // Compute quick statistics for the sample dataset.
  const stats = useMemo(() => {
    const m = mean(SAMPLE);
    const med = median(SAMPLE);
    const sd = stddev(SAMPLE);
    const md = mad(SAMPLE);
    const p95 = percentile(SAMPLE, 95);
    const p99 = percentile(SAMPLE, 99);
    return { mean: m, median: med, stddev: sd, mad: md, p95, p99 };
  }, []);

  return (
    <section
      id="rca-lab"
      className="relative mx-auto w-full max-w-7xl px-6 py-24 lg:px-0"
      aria-label="Root cause analysis research lab"
    >
      <SectionHeader
        kicker="08 · RCA Research Lab"
        title="A catalogue of methods, not a product."
        description="Independent research into how rule-based systems, statistical methods, and ML can support infrastructure root-cause analysis. Human validation remains essential."
      />

      {/* Research banner */}
      <div className="mt-10 flex flex-col gap-4 rounded-xl border border-[#f59e0b]/30 bg-[#f59e0b]/5 p-5 sm:flex-row sm:items-center">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#f59e0b]/15">
          <AlertTriangle className="h-5 w-5 text-[#f59e0b]" />
        </div>
        <div className="flex-1">
          <p className="font-display text-sm font-semibold text-white">
            Research stage
          </p>
          <p className="mt-1 text-sm text-[#B8C2CC]">
            This section is an ongoing research catalogue. It is not a deployed production AI product.
            Every method below is described honestly - including its limitations.
          </p>
        </div>
      </div>

      {/* Category filter */}
      <div className="mt-8 flex flex-wrap gap-2">
        <button
          onClick={() => setCategory("all")}
          aria-pressed={category === "all"}
          className={cn(
            "rounded-full border px-4 py-2 font-mono text-[11px] uppercase tracking-[0.2em] transition-all",
            category === "all"
              ? "border-[#22d3ee]/60 bg-[#22d3ee]/10 text-white"
              : "border-white/10 bg-white/5 text-[#B8C2CC] hover:border-white/30"
          )}
        >
          All methods
        </button>
        {CATEGORIES.map(({ id, label, Icon }) => (
          <button
            key={id}
            onClick={() => setCategory(id)}
            aria-pressed={category === id}
            className={cn(
              "inline-flex items-center gap-2 rounded-full border px-4 py-2 font-mono text-[11px] uppercase tracking-[0.2em] transition-all",
              category === id
                ? "border-[#22d3ee]/60 bg-[#22d3ee]/10 text-white"
                : "border-white/10 bg-white/5 text-[#B8C2CC] hover:border-white/30"
            )}
          >
            <Icon className="h-3 w-3" />
            {label}
          </button>
        ))}
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_1.3fr]">
        {/* Method list */}
        <div className="space-y-2">
          {filtered.map((m) => {
            const isActive = m.id === active;
            return (
              <button
                key={m.id}
                onClick={() => setActive(m.id)}
                aria-pressed={isActive}
                className={cn(
                  "group relative w-full overflow-hidden rounded-lg border p-4 text-left transition-all",
                  isActive
                    ? "border-[#22d3ee]/50 bg-[#22d3ee]/5"
                    : "border-white/10 bg-white/[0.02] hover:border-white/25"
                )}
              >
                <div className="flex items-center justify-between">
                  <p className={cn("font-display text-base font-semibold", isActive ? "text-white" : "text-white/90")}>
                    {m.name}
                  </p>
                  <span
                    className="rounded-full border px-2 py-0.5 font-mono text-[9px] uppercase tracking-widest"
                    style={{
                      color: m.category === "statistical" ? "#22d3ee" : m.category === "rule-based" ? "#f59e0b" : "#a855f7",
                      borderColor: m.category === "statistical" ? "rgba(34,211,238,0.4)" : m.category === "rule-based" ? "rgba(245,158,11,0.4)" : "rgba(168,85,247,0.4)",
                    }}
                  >
                    {m.category}
                  </span>
                </div>
                <p className="mt-1 line-clamp-1 text-xs text-[#B8C2CC]">{m.explanation}</p>
              </button>
            );
          })}
        </div>

        {/* Active method detail */}
        <AnimatePresence mode="wait">
          <motion.div
            key={method.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="panel relative overflow-hidden p-6 lg:p-8"
          >
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-[#22d3ee]/40 bg-[#22d3ee]/10">
                <Activity className="h-5 w-5 text-[#22d3ee]" />
              </div>
              <div>
                <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-[#22d3ee]">
                  Method
                </p>
                <h3 className="font-display text-2xl font-semibold">{method.name}</h3>
              </div>
            </div>

            {/* Formula */}
            <div className="mt-6 rounded-lg border border-white/10 bg-[#070B12]/50 p-4">
              <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-[#7D8590]">
                Formula
              </p>
              <p className="mt-2 font-mono text-lg text-white sm:text-xl">
                {method.formula}
              </p>
            </div>

            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <DetailCell label="Explanation" text={method.explanation} tone="#22d3ee" />
              <DetailCell label="Use case"    text={method.useCase}    tone="#10b981" />
              <DetailCell label="Limitation"  text={method.limitation} tone="#f43f5e" />
              <DetailCell
                label="Related methods"
                text={method.related.map((id) => rcaMethods.find((m) => m.id === id)?.name ?? id).join(", ") || "-"}
                tone="#a855f7"
              />
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Live demo on the sample dataset */}
      <div className="mt-12">
        <h3 className="font-display text-xl font-semibold sm:text-2xl">
          Live demonstration
        </h3>
        <p className="mt-2 text-sm text-[#B8C2CC]">
          A small synthetic dataset - with two intentional outliers - shows how each statistic behaves.
        </p>
        <div className="mt-6 grid gap-3 sm:grid-cols-3 lg:grid-cols-6">
          <StatCell label="Mean"   value={stats.mean.toFixed(2)} />
          <StatCell label="Median" value={stats.median.toFixed(2)} />
          <StatCell label="σ"      value={stats.stddev.toFixed(2)} />
          <StatCell label="MAD"    value={stats.mad.toFixed(2)} />
          <StatCell label="p95"    value={stats.p95.toFixed(2)} />
          <StatCell label="p99"    value={stats.p99.toFixed(2)} />
        </div>

        {/* Dataset visualisation */}
        <div className="panel mt-4 p-5">
          <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-[#7D8590]">
            Sample dataset (n={SAMPLE.length})
          </p>
          <div className="mt-4 flex h-32 items-end gap-1">
            {SAMPLE.map((v, i) => {
              const max = Math.max(...SAMPLE);
              const height = (v / max) * 100;
              const outlier = v > stats.mean + 2 * stats.stddev;
              return (
                <div
                  key={i}
                  className="flex-1 rounded-sm transition-all"
                  style={{
                    height: `${height}%`,
                    background: outlier
                      ? "linear-gradient(180deg, #f43f5e, #f43f5e88)"
                      : "linear-gradient(180deg, #22d3ee, #22d3ee55)",
                  }}
                  aria-label={`Sample ${i + 1}: ${v}${outlier ? " (outlier)" : ""}`}
                />
              );
            })}
          </div>
          <div className="mt-3 flex items-center gap-4 font-mono text-[10px] uppercase tracking-widest text-[#7D8590]">
            <span className="flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-sm bg-[#22d3ee]" />
              Normal
            </span>
            <span className="flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-sm bg-[#f43f5e]" />
              Outlier (&gt; μ + 2σ)
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

function DetailCell({ label, text, tone }: { label: string; text: string; tone: string }) {
  return (
    <div className="rounded-lg border border-white/10 bg-white/[0.02] p-4">
      <p className="font-mono text-[10px] uppercase tracking-[0.3em]" style={{ color: tone }}>
        {label}
      </p>
      <p className="mt-2 text-sm leading-relaxed text-[#B8C2CC]">{text}</p>
    </div>
  );
}

function StatCell({ label, value }: { label: string; value: string }) {
  return (
    <div className="panel p-4 text-center">
      <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-[#7D8590]">{label}</p>
      <p className="mt-1 font-mono text-xl font-semibold tabular-nums text-white">{value}</p>
    </div>
  );
}
