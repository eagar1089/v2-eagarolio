import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Github, Star, GitFork, ExternalLink, Calendar, Clock, AlertCircle } from "lucide-react";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid,
} from "recharts";
import { portfolio } from "@/config";
import { fetchGitHubData, selectFeaturedRepositories } from "@/lib/github";
import { formatNumber, timeAgo } from "@/lib/utils";
import type { GitHubData } from "@/types/github";

function SectionHeader({ kicker, title, description }: {
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
// GitHub Intelligence System
// =========================================================================

export function GitHubIntelligence() {
  const [data, setData] = useState<GitHubData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [lastFetched, setLastFetched] = useState<number | null>(null);

  const load = async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await fetchGitHubData();
      setData(result);
      setLastFetched(result.fetchedAt);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to fetch GitHub data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, []);

  const featured = useMemo(
    () => (data ? selectFeaturedRepositories(data, portfolio.featuredRepositories) : []),
    [data]
  );

  const languageData = useMemo(() => {
    if (!data) return [];
    return Object.entries(data.languages)
      .map(([name, share]) => ({ name, share: Math.round(share * 100) }))
      .sort((a, b) => b.share - a.share)
      .slice(0, 8);
  }, [data]);

  const starsData = useMemo(() => {
    if (!data) return [];
    return [...data.repos]
      .filter((r) => r.stargazers_count > 0)
      .sort((a, b) => b.stargazers_count - a.stargazers_count)
      .slice(0, 6)
      .map((r) => ({ name: r.name.length > 12 ? r.name.slice(0, 12) + "…" : r.name, stars: r.stargazers_count }));
  }, [data]);

  return (
    <section
      id="github"
      className="relative mx-auto w-full max-w-7xl px-4 py-20 sm:px-6 sm:py-24 lg:px-0"
      aria-label="GitHub intelligence"
    >
      <SectionHeader
        kicker="05 · GitHub Intelligence"
        title="Live signal from the source."
        description="Real data from the GitHub API - cached for an hour, retried on failure. Nothing fabricated."
      />

      {/* Profile card + aggregates */}
      <div className="mt-10 grid gap-6 lg:mt-12 lg:grid-cols-[1fr_2fr] lg:gap-8">
        <div className="panel relative overflow-hidden p-5 sm:p-6">
          {loading && !data ? (
            <ProfileSkeleton />
          ) : data ? (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex items-center gap-4">
                <div className="relative">
                  <div className="absolute inset-0 rounded-full bg-gradient-to-br from-[#22d3ee] to-[#a855f7] opacity-50 blur-md" />
                  <img
                    src={data.user.avatar_url}
                    alt={data.user.name ?? data.user.login}
                    className="relative h-16 w-16 rounded-full border-2 border-white/20"
                    loading="lazy"
                  />
                </div>
                <div>
                  <p className="font-display text-lg font-semibold">
                    {data.user.name ?? data.user.login}
                  </p>
                  <p className="font-mono text-xs text-[#7D8590]">@{data.user.login}</p>
                </div>
              </div>
              {data.user.bio && (
                <p className="mt-4 text-sm leading-relaxed text-[#B8C2CC]">{data.user.bio}</p>
              )}

              <div className="mt-5 grid grid-cols-3 gap-2 border-t border-white/10 pt-5">
                <Stat label="Repos" value={formatNumber(data.user.public_repos)} />
                <Stat label="Followers" value={formatNumber(data.user.followers)} />
                <Stat label="Following" value={formatNumber(data.user.following)} />
              </div>

              <a
                href={data.user.html_url}
                target="_blank"
                rel="noopener noreferrer"
                data-cursor="Open"
                className="mt-5 inline-flex items-center gap-2 rounded-full border border-white/15 px-4 py-2 text-sm text-white hover:border-[#22d3ee]/60"
              >
                <Github className="h-4 w-4" />
                View GitHub profile
                <ExternalLink className="h-3 w-3 opacity-60" />
              </a>

              {lastFetched && (
                <p className="mt-4 flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-widest text-[#7D8590]">
                  <Clock className="h-3 w-3" />
                  Updated {timeAgo(new Date(lastFetched))}
                </p>
              )}
            </motion.div>
          ) : (
            <ErrorBlock error={error} onRetry={load} />
          )}
        </div>

        {/* Aggregate stats + language chart */}
        <div className="grid gap-4">
          {data && (
            <>
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                <BigStat label="Total stars" value={formatNumber(data.totalStars)} Icon={Star} tone="#f59e0b" />
                <BigStat label="Total forks" value={formatNumber(data.totalForks)} Icon={GitFork} tone="#22d3ee" />
                <BigStat label="Languages" value={String(languageData.length)} Icon={Github} tone="#a855f7" />
                <BigStat label="Repos" value={String(data.repos.length)} Icon={Github} tone="#10b981" />
              </div>

              <div className="panel p-4 sm:p-5">
                <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-[#7D8590]">
                  Language distribution
                </div>
                <div className="mt-3 h-36 w-full sm:h-40">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={languageData} margin={{ top: 5, right: 8, bottom: 5, left: -10 }}>
                      <defs>
                        <linearGradient id="langGrad" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#22d3ee" stopOpacity={0.9} />
                          <stop offset="100%" stopColor="#a855f7" stopOpacity={0.6} />
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="2 4" stroke="rgba(255,255,255,0.05)" vertical={false} />
                      <XAxis
                        dataKey="name"
                        tick={{ fill: "#7D8590", fontSize: 9, fontFamily: "ui-monospace, monospace" }}
                        axisLine={{ stroke: "rgba(255,255,255,0.08)" }}
                        tickLine={false}
                      />
                      <YAxis
                        tick={{ fill: "#7D8590", fontSize: 9, fontFamily: "ui-monospace, monospace" }}
                        axisLine={{ stroke: "rgba(255,255,255,0.08)" }}
                        tickLine={false}
                      />
                      <Tooltip
                        cursor={{ fill: "rgba(34,211,238,0.05)" }}
                        contentStyle={{
                          background: "#0C121D",
                          border: "1px solid rgba(255,255,255,0.1)",
                          borderRadius: 8,
                          fontFamily: "ui-monospace, monospace",
                          fontSize: 11,
                        }}
                        labelStyle={{ color: "#22d3ee" }}
                      />
                      <Bar dataKey="share" fill="url(#langGrad)" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Featured repositories */}
      <div className="mt-12">
        <h3 className="font-display text-xl font-semibold sm:text-2xl">
          Featured repositories
        </h3>
        <p className="mt-1 text-sm text-[#B8C2CC]">
          Manually curated and sorted by stars and recency. Live statistics from GitHub.
        </p>

        {loading && !data ? (
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="panel animate-pulse p-5">
                <div className="h-4 w-3/4 rounded bg-white/10" />
                <div className="mt-3 h-3 w-full rounded bg-white/5" />
                <div className="mt-2 h-3 w-2/3 rounded bg-white/5" />
              </div>
            ))}
          </div>
        ) : featured.length > 0 ? (
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {featured.map((repo, i) => (
              <RepoCard key={repo.id} repo={repo} index={i} />
            ))}
          </div>
        ) : (
          <p className="mt-6 text-sm text-[#B8C2CC]">
            No public repositories to display yet.
          </p>
        )}
      </div>

      {/* Stars chart */}
      {starsData.length > 0 && (
        <div className="mt-12">
          <h3 className="font-display text-xl font-semibold sm:text-2xl">
            Top repositories by stars
          </h3>
          <div className="panel mt-6 p-4 sm:p-5">
            <div className="h-48 w-full sm:h-56">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={starsData} layout="vertical" margin={{ top: 5, right: 20, bottom: 5, left: 20 }}>
                  <CartesianGrid strokeDasharray="2 4" stroke="rgba(255,255,255,0.05)" horizontal={false} />
                  <XAxis
                    type="number"
                    tick={{ fill: "#7D8590", fontSize: 10, fontFamily: "ui-monospace, monospace" }}
                    axisLine={{ stroke: "rgba(255,255,255,0.08)" }}
                    tickLine={false}
                  />
                  <YAxis
                    type="category"
                    dataKey="name"
                    tick={{ fill: "#B8C2CC", fontSize: 11, fontFamily: "ui-monospace, monospace" }}
                    axisLine={{ stroke: "rgba(255,255,255,0.08)" }}
                    tickLine={false}
                    width={110}
                  />
                  <Tooltip
                    cursor={{ fill: "rgba(245,158,11,0.08)" }}
                    contentStyle={{
                      background: "#0C121D",
                      border: "1px solid rgba(255,255,255,0.1)",
                      borderRadius: 8,
                      fontFamily: "ui-monospace, monospace",
                      fontSize: 11,
                    }}
                    labelStyle={{ color: "#f59e0b" }}
                  />
                  <Bar dataKey="stars" fill="#f59e0b" radius={[0, 4, 4, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <p className="sr-only">
              Top repositories by stars: {starsData.map((s) => `${s.name} ${s.stars}`).join(", ")}
            </p>
          </div>
        </div>
      )}
    </section>
  );
}

// =========================================================================
// Sub-components
// =========================================================================

function RepoCard({ repo, index }: { repo: NonNullable<GitHubData>["repos"][0]; index: number }) {
  return (
    <motion.a
      href={repo.html_url}
      target="_blank"
      rel="noopener noreferrer"
      data-cursor="Open"
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ delay: index * 0.05, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="panel panel-hover-glow group relative block overflow-hidden p-4 sm:p-5 transition-colors"
    >
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <Github className="h-3.5 w-3.5 text-[#7D8590]" />
            <h4 className="truncate font-display text-base font-semibold text-white group-hover:text-[#22d3ee]">
              {repo.name}
            </h4>
          </div>
          {repo.description && (
            <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-[#B8C2CC]">
              {repo.description}
            </p>
          )}
        </div>
        <ExternalLink className="h-4 w-4 shrink-0 text-[#7D8590] transition-colors group-hover:text-[#22d3ee]" />
      </div>

      <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1.5 font-mono text-[10px] uppercase tracking-widest text-[#7D8590]">
        {repo.language && (
          <span className="flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-[#22d3ee]" />
            {repo.language}
          </span>
        )}
        <span className="flex items-center gap-1.5">
          <Star className="h-3 w-3" />
          {repo.stargazers_count}
        </span>
        <span className="flex items-center gap-1.5">
          <GitFork className="h-3 w-3" />
          {repo.forks_count}
        </span>
        <span className="flex items-center gap-1.5">
          <Calendar className="h-3 w-3" />
          {timeAgo(repo.updated_at)}
        </span>
      </div>

      {repo.topics && repo.topics.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-1.5">
          {repo.topics.slice(0, 5).map((t) => (
            <span
              key={t}
              className="rounded-full border border-white/10 bg-white/5 px-2 py-0.5 font-mono text-[9px] uppercase tracking-widest text-[#B8C2CC]"
            >
              {t}
            </span>
          ))}
        </div>
      )}

      {repo.homepage && (
        <div className="mt-3 flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-widest text-[#22d3ee]">
          <ExternalLink className="h-3 w-3" />
          {repo.homepage.replace(/^https?:\/\//, "").replace(/\/$/, "")}
        </div>
      )}
    </motion.a>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div className="font-mono text-[9px] uppercase tracking-[0.25em] text-[#7D8590]">{label}</div>
      <div className="mt-1 font-mono text-base font-semibold tabular-nums text-white sm:text-lg">{value}</div>
    </div>
  );
}

function BigStat({ label, value, Icon, tone }: { label: string; value: string; Icon: React.ComponentType<{ className?: string }>; tone: string }) {
  return (
    <div className="panel p-4">
      <span className="inline-block" style={{ color: tone }}>
        <Icon className="h-4 w-4" />
      </span>
      <div className="mt-3 font-mono text-xl font-semibold tabular-nums text-white sm:text-2xl">{value}</div>
      <div className="font-mono text-[10px] uppercase tracking-[0.25em] text-[#7D8590]">{label}</div>
    </div>
  );
}

function ProfileSkeleton() {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <div className="h-16 w-16 animate-pulse rounded-full bg-white/10" />
        <div className="space-y-2">
          <div className="h-4 w-32 animate-pulse rounded bg-white/10" />
          <div className="h-3 w-24 animate-pulse rounded bg-white/5" />
        </div>
      </div>
      <div className="h-3 w-full animate-pulse rounded bg-white/5" />
      <div className="h-3 w-3/4 animate-pulse rounded bg-white/5" />
    </div>
  );
}

function ErrorBlock({ error, onRetry }: { error: string | null; onRetry: () => void }) {
  return (
    <div role="alert" className="flex flex-col items-start gap-3">
      <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-[#f43f5e]">
        <AlertCircle className="h-3.5 w-3.5" />
        GitHub unavailable
      </div>
      <p className="text-sm text-[#B8C2CC]">
        {error ?? "Could not fetch GitHub data. This is usually due to rate limits."}
      </p>
      <button
        onClick={onRetry}
        className="rounded-full border border-white/15 px-4 py-1.5 text-xs text-white/80 hover:border-[#22d3ee]/60"
      >
        Retry
      </button>
    </div>
  );
}
