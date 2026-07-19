import { useEffect, useMemo, useState, type CSSProperties } from 'react';
import { motion } from 'framer-motion';
import {
  ArrowUpRight,
  BookMarked,
  CalendarDays,
  GitFork,
  Moon,
  RefreshCw,
  Star,
  Sun,
  Users,
} from 'lucide-react';
import { PORTFOLIO_CONFIG } from '@/config/portfolio';
import {
  fetchGitHubRepos,
  fetchGitHubUser,
  fetchStarredRepos,
  selectShowcaseRepos,
  type ShowcaseSource,
} from '@/lib/github';
import type { GitHubRepo, GitHubUser } from '@/config/portfolio';

function GitHubIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.4 5.4 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
  );
}

const LANG_COLORS: Record<string, string> = {
  JavaScript: '#f1e05a',
  TypeScript: '#3178c6',
  PHP: '#4F5D95',
  Go: '#00ADD8',
  Python: '#3572A5',
  HTML: '#e34c26',
  CSS: '#563d7c',
  Shell: '#89e051',
  Java: '#b07219',
  default: '#8b949e',
};

const SOURCE_LABELS: Record<ShowcaseSource, string> = {
  top: 'Top repositories',
  starred: 'Starred repositories',
  'top-and-starred': 'Top and starred repositories',
};

function relativeDate(value: string) {
  if (!value) return 'Recently updated';
  const days = Math.max(0, Math.floor((Date.now() - new Date(value).getTime()) / 86400000));
  if (days === 0) return 'Updated today';
  if (days === 1) return 'Updated yesterday';
  if (days < 30) return `Updated ${days} days ago`;
  const months = Math.floor(days / 30);
  if (months < 12) return `Updated ${months} month${months === 1 ? '' : 's'} ago`;
  const years = Math.floor(months / 12);
  return `Updated ${years} year${years === 1 ? '' : 's'} ago`;
}

function SkeletonCard() {
  return (
    <div className="animate-pulse rounded-xl bg-[var(--gh-card)] p-5">
      <div className="h-4 w-2/5 rounded bg-[var(--gh-muted-bg)]" />
      <div className="mt-5 h-3 w-full rounded bg-[var(--gh-muted-bg)]" />
      <div className="mt-2 h-3 w-4/5 rounded bg-[var(--gh-muted-bg)]" />
      <div className="mt-8 h-3 w-1/2 rounded bg-[var(--gh-muted-bg)]" />
    </div>
  );
}

function RepoCard({ repo, index }: { repo: GitHubRepo; index: number }) {
  const owner = repo.owner || PORTFOLIO_CONFIG.github;
  const isOwned = owner.toLowerCase() === PORTFOLIO_CONFIG.github.toLowerCase();

  return (
    <motion.article
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-30px' }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      className="group flex min-h-[180px] min-w-0 flex-col rounded-xl border border-transparent bg-[var(--gh-card)] p-4 opacity-90 transition-all duration-300 hover:-translate-y-1 hover:border-[var(--gh-border)] hover:opacity-100 hover:shadow-[0_16px_45px_rgba(1,4,9,0.16)]"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex min-w-0 items-center gap-2">
          <BookMarked size={17} className="shrink-0 text-[var(--gh-muted)]" />
          <div className="min-w-0">
            {!isOwned && <p className="truncate text-[10px] text-[var(--gh-muted)]">{owner}</p>}
            <h3 className="truncate text-sm font-semibold text-[var(--gh-accent)]">{repo.name}</h3>
          </div>
        </div>
        <span className="shrink-0 rounded-full border border-[var(--gh-border)] px-2 py-0.5 text-[9px] font-medium text-[var(--gh-muted)]">
          Public
        </span>
      </div>

      <p className="mt-3 line-clamp-2 text-xs leading-relaxed text-[var(--gh-muted)]">
        {repo.description || 'Repository details available on GitHub.'}
      </p>

      {repo.topics.length > 0 && (
        <div className="mt-4 flex flex-wrap gap-1.5">
          {repo.topics.slice(0, 3).map((topic) => (
            <span key={topic} className="rounded-full bg-[var(--gh-topic-bg)] px-2 py-0.5 text-[9px] font-medium text-[var(--gh-accent)]">
              {topic}
            </span>
          ))}
        </div>
      )}

      <div className="mt-auto flex flex-wrap items-center gap-x-3 gap-y-2 pt-5 text-[10px] text-[var(--gh-muted)]">
        {repo.language && (
          <span className="flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: LANG_COLORS[repo.language] || LANG_COLORS.default }} />
            {repo.language}
          </span>
        )}
        <span className="flex items-center gap-1"><Star size={11} />{repo.stargazers_count}</span>
        <span className="flex items-center gap-1"><GitFork size={11} />{repo.forks_count}</span>
        <span className="ml-auto flex items-center gap-1"><CalendarDays size={11} />{relativeDate(repo.pushed_at)}</span>
      </div>

      <div className="mt-4 flex items-center gap-2 border-t border-[var(--gh-border)] pt-4">
        <a
          href={repo.html_url}
          target="_blank"
          rel="noopener noreferrer"
          data-cursor="Open"
          className="inline-flex items-center gap-1.5 text-xs font-medium text-[var(--gh-text)] transition-colors hover:text-[var(--gh-accent)]"
        >
          View repository <ArrowUpRight size={13} />
        </a>
        {repo.homepage && (
          <a href={repo.homepage} target="_blank" rel="noopener noreferrer" className="ml-auto text-[10px] text-[var(--gh-accent)] hover:underline">
            Live project
          </a>
        )}
      </div>
    </motion.article>
  );
}

export default function GitHubIntelligence() {
  const [user, setUser] = useState<GitHubUser | null>(null);
  const [repos, setRepos] = useState<GitHubRepo[]>([]);
  const [starred, setStarred] = useState<GitHubRepo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [light, setLight] = useState(false);

  const load = async () => {
    setLoading(true);
    setError(false);
    const [userData, repoData, starredData] = await Promise.all([
      fetchGitHubUser(),
      fetchGitHubRepos(),
      fetchStarredRepos(),
    ]);
    setUser(userData);
    setRepos(repoData);
    setStarred(starredData);
    setError(!userData && repoData.length === 0 && starredData.length === 0);
    setLoading(false);
  };

  useEffect(() => {
    void load();
  }, []);

  const showcase = useMemo(() => selectShowcaseRepos(repos, starred), [repos, starred]);
  const theme = {
    '--gh-bg': light ? '#f6f8fa' : '#0d1117',
    '--gh-card': light ? '#ffffff' : '#161b22',
    '--gh-border': light ? '#d0d7de' : '#30363d',
    '--gh-text': light ? '#1f2328' : '#f0f6fc',
    '--gh-muted': light ? '#656d76' : '#8b949e',
    '--gh-muted-bg': light ? '#d8dee4' : '#21262d',
    '--gh-accent': light ? '#0969da' : '#58a6ff',
    '--gh-topic-bg': light ? '#ddf4ff' : '#121d2f',
  } as CSSProperties;

  return (
    <section id="github" className="px-4 py-14 sm:px-6 sm:py-16 lg:px-10 lg:py-20 xl:px-16">
      <div style={theme} className="mx-auto w-full max-w-5xl overflow-hidden bg-[var(--gh-bg)] text-[var(--gh-text)] transition-colors duration-300">
        <header className="border-b border-[var(--gh-border)] px-5 py-6 sm:px-7">
          <div className="mb-4 font-mono text-[10px] uppercase tracking-[0.3em] text-[var(--gh-accent)]">03 - GitHub Intelligence</div>
          <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex min-w-0 items-center gap-4">
              {user?.avatar_url ? (
                <img src={user.avatar_url} alt={`${PORTFOLIO_CONFIG.github} GitHub avatar`} className="h-14 w-14 rounded-full border border-[var(--gh-border)]" loading="lazy" />
              ) : (
                <span className="flex h-14 w-14 items-center justify-center rounded-full border border-[var(--gh-border)] bg-[var(--gh-card)]"><GitHubIcon size={25} /></span>
              )}
              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <h2 className="text-xl font-semibold sm:text-2xl">GitHub Projects</h2>
                  <span className="rounded-full border border-[var(--gh-border)] bg-[var(--gh-card)] px-2 py-0.5 text-[9px] text-[var(--gh-muted)]">Live</span>
                </div>
                <p className="mt-1 text-xs text-[var(--gh-muted)]">Automatically selected from @{PORTFOLIO_CONFIG.github}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button onClick={() => setLight((value) => !value)} className="flex h-9 w-9 items-center justify-center rounded-md border border-[var(--gh-border)] bg-[var(--gh-card)] text-[var(--gh-muted)] hover:text-[var(--gh-text)]" aria-label={light ? 'Use dark GitHub colors' : 'Use light GitHub colors'}>
                {light ? <Moon size={15} /> : <Sun size={15} />}
              </button>
              <button onClick={() => void load()} className="flex h-9 w-9 items-center justify-center rounded-md border border-[var(--gh-border)] bg-[var(--gh-card)] text-[var(--gh-muted)] hover:text-[var(--gh-text)]" aria-label="Refresh GitHub projects">
                <RefreshCw size={15} className={loading ? 'animate-spin' : ''} />
              </button>
              <a href={`https://github.com/${PORTFOLIO_CONFIG.github}`} target="_blank" rel="noopener noreferrer" className="inline-flex h-9 items-center gap-2 rounded-md border border-[var(--gh-border)] bg-[var(--gh-card)] px-3 text-xs font-medium hover:border-[var(--gh-accent)]">
                <GitHubIcon size={14} /> Profile
              </a>
            </div>
          </div>

          <div className="mt-5 flex flex-wrap items-center gap-3 text-[10px] text-[var(--gh-muted)]">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-[var(--gh-topic-bg)] px-2.5 py-1 font-medium text-[var(--gh-accent)]"><BookMarked size={11} />{SOURCE_LABELS[showcase.source]}</span>
            {user && <span>{user.public_repos} public repositories</span>}
            {user && <span className="inline-flex items-center gap-1"><Users size={11} />{user.followers} followers</span>}
          </div>
        </header>

        <div className="p-5 sm:p-7">
          {error ? (
            <div className="rounded-xl border border-[var(--gh-border)] bg-[var(--gh-card)] px-5 py-12 text-center">
              <p className="text-sm font-medium">GitHub data is temporarily unavailable.</p>
              <button onClick={() => void load()} className="mt-3 text-xs text-[var(--gh-accent)] hover:underline">Retry connection</button>
            </div>
          ) : loading ? (
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2"><SkeletonCard /><SkeletonCard /><SkeletonCard /><SkeletonCard /></div>
          ) : (
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              {showcase.repos.map((repo, index) => <RepoCard key={`${repo.owner || PORTFOLIO_CONFIG.github}/${repo.name}`} repo={repo} index={index} />)}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
