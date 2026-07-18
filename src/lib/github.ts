import { PORTFOLIO_CONFIG } from '@/config/portfolio';
import type { GitHubRepo, GitHubUser } from '@/config/portfolio';

const GITHUB_API = 'https://api.github.com';
const CACHE_KEY_USER = 'sgr_github_user';
const CACHE_KEY_REPOS = 'sgr_github_repos';
const CACHE_TTL = 3600000; // 1 hour

interface CacheEntry<T> {
  data: T;
  timestamp: number;
}

function getCache<T>(key: string): T | null {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return null;
    const entry: CacheEntry<T> = JSON.parse(raw);
    if (Date.now() - entry.timestamp > CACHE_TTL) return null;
    return entry.data;
  } catch {
    return null;
  }
}

function setCache<T>(key: string, data: T): void {
  try {
    localStorage.setItem(key, JSON.stringify({ data, timestamp: Date.now() }));
  } catch {
    // localStorage full or unavailable
  }
}

export async function fetchGitHubUser(): Promise<GitHubUser | null> {
  const cached = getCache<GitHubUser>(CACHE_KEY_USER);
  if (cached) return cached;

  try {
    const res = await fetch(`${GITHUB_API}/users/${PORTFOLIO_CONFIG.github}`, {
      headers: { Accept: 'application/vnd.github+json' },
    });
    if (!res.ok) return null;
    const data = await res.json();
    const user: GitHubUser = {
      avatar_url: data.avatar_url,
      name: data.name,
      bio: data.bio,
      public_repos: data.public_repos,
      followers: data.followers,
      following: data.following,
      html_url: data.html_url,
      updated_at: data.updated_at,
    };
    setCache(CACHE_KEY_USER, user);
    return user;
  } catch {
    return null;
  }
}

export async function fetchGitHubRepos(): Promise<GitHubRepo[]> {
  const cached = getCache<GitHubRepo[]>(CACHE_KEY_REPOS);
  if (cached) return cached;

  try {
    const res = await fetch(
      `${GITHUB_API}/users/${PORTFOLIO_CONFIG.github}/repos?per_page=100&sort=updated`,
      {
        headers: { Accept: 'application/vnd.github+json' },
      }
    );
    if (!res.ok) return [];
    const data = await res.json();
    const repos: GitHubRepo[] = data.map((repo: Record<string, unknown>) => ({
      name: repo.name,
      description: repo.description || null,
      html_url: repo.html_url,
      stargazers_count: repo.stargazers_count || 0,
      forks_count: repo.forks_count || 0,
      language: (repo.language as string) || null,
      topics: (repo.topics as string[]) || [],
      updated_at: repo.updated_at,
      pushed_at: repo.pushed_at,
      archived: repo.archived || false,
      fork: repo.fork || false,
      homepage: repo.homepage || '',
      default_branch: repo.default_branch || 'main',
    }));
    setCache(CACHE_KEY_REPOS, repos);
    return repos;
  } catch {
    return [];
  }
}

export function selectFeaturedRepos(repos: GitHubRepo[]): GitHubRepo[] {
  const featured = PORTFOLIO_CONFIG.featuredRepos;
  const result: GitHubRepo[] = [];

  // First: manually featured
  for (const name of featured) {
    const found = repos.find(r => r.name === name);
    if (found) result.push(found);
  }

  // Then: non-fork, non-archived, with description and recent activity
  const rest = repos.filter(
    r => !result.find(f => f.name === r.name) && !r.fork && !r.archived && r.description
  );

  rest.sort((a, b) => {
    const aScore = a.stargazers_count * 3 + (a.description ? 1 : 0);
    const bScore = b.stargazers_count * 3 + (b.description ? 1 : 0);
    return bScore - aScore;
  });

  for (const r of rest) {
    if (result.length >= 8) break;
    result.push(r);
  }

  return result;
}

export function getLanguageDistribution(repos: GitHubRepo[]): Record<string, number> {
  const dist: Record<string, number> = {};
  for (const repo of repos) {
    if (repo.language) {
      dist[repo.language] = (dist[repo.language] || 0) + 1;
    }
  }
  return dist;
}

export function aggregateRepoStats(repos: GitHubRepo[]): {
  totalStars: number;
  totalForks: number;
  languages: string[];
} {
  const langs = new Set<string>();
  let stars = 0;
  let forks = 0;
  for (const r of repos) {
    stars += r.stargazers_count;
    forks += r.forks_count;
    if (r.language) langs.add(r.language);
  }
  return { totalStars: stars, totalForks: forks, languages: [...langs] };
}
