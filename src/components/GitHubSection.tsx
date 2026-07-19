import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Star, GitFork, Clock } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { PORTFOLIO_CONFIG } from '@/config/portfolio';
import { fetchGitHubUser, fetchGitHubRepos, selectFeaturedRepos, getLanguageDistribution, aggregateRepoStats } from '@/lib/github';
import type { GitHubUser, GitHubRepo } from '@/config/portfolio';

const LANG_COLORS: Record<string, string> = {
  JavaScript: '#f1e05a',
  TypeScript: '#3178c6',
  PHP: '#4F5D95',
  Go: '#00ADD8',
  Python: '#3572A5',
  HTML: '#e34c26',
  CSS: '#563d7c',
  Shell: '#89e051',
  Ruby: '#701516',
  Java: '#b07219',
  default: '#7D8590',
};

function LoadingSkeleton() {
  return (
    <div className="space-y-4 animate-pulse">
      <div className="h-4 bg-[#1B3A4B] rounded w-3/4" />
      <div className="h-4 bg-[#1B3A4B] rounded w-1/2" />
      <div className="h-32 bg-[#1B3A4B] rounded" />
    </div>
  );
}

function ErrorState({ message, onRetry }: { message: string; onRetry?: () => void }) {
  return (
    <div className="flex flex-col items-center justify-center py-12 text-center">
      <p className="text-sm text-[#7D8590] mb-2">{message}</p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="text-xs font-mono text-[#00D4AA] hover:text-white transition-colors mt-2"
        >
          Retry connection
        </button>
      )}
    </div>
  );
}

export default function GitHubIntelligence() {
  const [user, setUser] = useState<GitHubUser | null>(null);
  const [repos, setRepos] = useState<GitHubRepo[]>([]);
  const [featuredRepos, setFeaturedRepos] = useState<GitHubRepo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<string | null>(null);

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      const [userData, reposData] = await Promise.all([
        fetchGitHubUser(),
        fetchGitHubRepos(),
      ]);
      if (!userData && reposData.length === 0) {
        setError('Unable to connect to GitHub API. Showing cached data.');
      }
      setUser(userData);
      setRepos(reposData);
      setFeaturedRepos(selectFeaturedRepos(reposData));
      if (userData) setLastUpdated(userData.updated_at);
    } catch {
      setError('GitHub API connection failed.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const langDist = getLanguageDistribution(repos);
  const stats = aggregateRepoStats(repos);

  const chartData = Object.entries(langDist)
    .sort(([, a], [, b]) => b - a)
    .map(([name, value]) => ({ name, value }));

  return (
    <section id="github" className="py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="mb-12 text-center">
          <span className="text-xs font-mono text-[#312244] uppercase tracking-widest">05 - GitHub Intelligence</span>
          <h2 className="text-3xl sm:text-4xl font-bold mt-2 mb-4">
            GitHub Intelligence System
          </h2>
          <p className="text-[#7D8590] max-w-xl mx-auto">
            Live data from <span className="font-mono text-[#00D4AA]">@{PORTFOLIO_CONFIG.github}</span>. Real statistics, no fabrication.
          </p>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <LoadingSkeleton />
            <LoadingSkeleton />
            <LoadingSkeleton />
          </div>
        ) : error && !user && repos.length === 0 ? (
          <ErrorState message={error} onRetry={fetchData} />
        ) : (
          <>
            {/* User profile */}
            {user && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="mb-8 bg-[#0C121D] rounded-xl border border-[#1B3A4B] p-6"
              >
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                  <img
                    src={user.avatar_url}
                    alt={`${user.name || PORTFOLIO_CONFIG.github} GitHub avatar`}
                    className="w-16 h-16 rounded-full border-2 border-[#1B3A4B]"
                    loading="lazy"
                  />
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-1">
                      <h3 className="font-semibold">{user.name || PORTFOLIO_CONFIG.github}</h3>
                      <a
                        href={user.html_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#7D8590] hover:text-[#00D4AA] transition-colors"
                      >
                        <ExternalLink size={14} />
                      </a>
                    </div>
                    {user.bio && <p className="text-sm text-[#B8C2CC] mb-2">{user.bio}</p>}
                    <div className="flex flex-wrap gap-4 text-xs font-mono text-[#7D8590]">
                      <span className="flex items-center gap-1">
                        <Clock size={12} />
                        Repos: {user.public_repos}
                      </span>
                      <span>Followers: {user.followers}</span>
                      <span>Following: {user.following}</span>
                      {lastUpdated && (
                        <span className="text-[#3E1F47]" title={lastUpdated}>
                          Updated: {new Date(lastUpdated).toLocaleDateString()}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Stats + Chart */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-8">
              {/* Stats */}
              <div className="bg-[#0C121D] rounded-xl border border-[#1B3A4B] p-6">
                <h4 className="text-[10px] font-mono text-[#7D8590] uppercase tracking-wider mb-4">Repository Statistics</h4>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-[#B8C2CC]">Total Repositories</span>
                    <span className="text-sm font-mono font-semibold">{repos.length}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-[#B8C2CC] flex items-center gap-1">
                      <Star size={12} className="text-[#f1e05a]" />
                      Total Stars
                    </span>
                    <span className="text-sm font-mono font-semibold">{stats.totalStars}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-[#B8C2CC] flex items-center gap-1">
                      <GitFork size={12} className="text-[#B8C2CC]" />
                      Total Forks
                    </span>
                    <span className="text-sm font-mono font-semibold">{stats.totalForks}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-[#B8C2CC]">Languages</span>
                    <span className="text-sm font-mono font-semibold">{stats.languages.length}</span>
                  </div>
                </div>
              </div>

              {/* Language chart */}
              <div className="lg:col-span-2 bg-[#0C121D] rounded-xl border border-[#1B3A4B] p-6">
                <h4 className="text-[10px] font-mono text-[#7D8590] uppercase tracking-wider mb-4">Language Distribution</h4>
                {chartData.length > 0 ? (
                  <ResponsiveContainer width="100%" height={140}>
                    <BarChart data={chartData} layout="vertical" margin={{ left: 0, right: 20 }}>
                      <XAxis type="number" hide />
                      <YAxis
                        dataKey="name"
                        type="category"
                        axisLine={false}
                        tickLine={false}
                        tick={{ fill: '#7D8590', fontSize: 10, fontFamily: 'monospace' }}
                        width={80}
                      />
                      <Tooltip
                        contentStyle={{
                          background: '#0C121D',
                          border: '1px solid #1B3A4B',
                          borderRadius: '6px',
                          fontSize: '11px',
                          fontFamily: 'monospace',
                          color: '#B8C2CC',
                        }}
                      />
                      <Bar dataKey="value" radius={[0, 4, 4, 0]}>
                        {chartData.map((entry) => (
                          <Cell key={entry.name} fill={LANG_COLORS[entry.name] || LANG_COLORS.default} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                ) : (
                  <p className="text-xs text-[#7D8590]">No language data available</p>
                )}
              </div>
            </div>

            {/* Featured repos */}
            <div>
              <h3 className="text-sm font-semibold mb-4">Repositories</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {featuredRepos.map(repo => (
                  <a
                    key={repo.name}
                    href={repo.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group bg-[#0C121D] rounded-xl border border-[#1B3A4B] p-4 hover:border-[#00D4AA] transition-all duration-300"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="text-sm font-medium group-hover:text-[#00D4AA] transition-colors">{repo.name}</h4>
                      <ExternalLink size={12} className="text-[#7D8590] group-hover:text-[#00D4AA] transition-colors" />
                    </div>
                    {repo.description && (
                      <p className="text-[11px] text-[#7D8590] mb-3 line-clamp-2">{repo.description}</p>
                    )}
                    <div className="flex items-center gap-3 text-[10px] font-mono text-[#7D8590]">
                      {repo.language && (
                        <span className="flex items-center gap-1">
                          <span className="w-2 h-2 rounded-full" style={{ backgroundColor: LANG_COLORS[repo.language] || LANG_COLORS.default }} />
                          {repo.language}
                        </span>
                      )}
                      <span className="flex items-center gap-0.5">
                        <Star size={10} /> {repo.stargazers_count}
                      </span>
                      <span className="flex items-center gap-0.5">
                        <GitFork size={10} /> {repo.forks_count}
                      </span>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </section>
  );
}
