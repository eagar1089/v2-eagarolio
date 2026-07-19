import { PORTFOLIO_CONFIG } from '@/config/portfolio';
import type { GitHubRepo, GitHubUser } from '@/config/portfolio';

const GITHUB_API = 'https://api.github.com';
const CACHE_KEY_USER = 'sgr_github_user_v2';
const CACHE_KEY_REPOS = 'sgr_github_repos_v2';
const CACHE_KEY_STARRED = 'sgr_github_starred_v2';
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
    const repos: GitHubRepo[] = data.map(mapRepo);
    setCache(CACHE_KEY_REPOS, repos);
    return repos;
  } catch {
    return [];
  }
}

function mapRepo(repo: Record<string, any>): GitHubRepo {
  return {
    name: String(repo.name || ''),
    owner: String(repo.owner?.login || ''),
    description: repo.description || null,
    html_url: String(repo.html_url || ''),
    stargazers_count: Number(repo.stargazers_count || 0),
    forks_count: Number(repo.forks_count || 0),
    language: repo.language || null,
    topics: Array.isArray(repo.topics) ? repo.topics : [],
    updated_at: String(repo.updated_at || ''),
    pushed_at: String(repo.pushed_at || ''),
    archived: Boolean(repo.archived),
    fork: Boolean(repo.fork),
    homepage: String(repo.homepage || ''),
    default_branch: String(repo.default_branch || 'main'),
  };
}

export async function fetchStarredRepos(): Promise<GitHubRepo[]> {
  const cached = getCache<GitHubRepo[]>(CACHE_KEY_STARRED);
  if (cached) return cached;

  try {
    const res = await fetch(
      `${GITHUB_API}/users/${PORTFOLIO_CONFIG.github}/starred?per_page=100&sort=created&direction=desc`,
      { headers: { Accept: 'application/vnd.github+json' } }
    );
    if (!res.ok) return [];
    const repos = (await res.json()).map(mapRepo);
    setCache(CACHE_KEY_STARRED, repos);
    return repos;
  } catch {
    return [];
  }
}

export type ShowcaseSource = 'top' | 'starred' | 'top-and-starred';

export function selectShowcaseRepos(
  ownedRepos: GitHubRepo[],
  starredRepos: GitHubRepo[],
  limit = 6
): { repos: GitHubRepo[]; source: ShowcaseSource } {
  const eligibleOwned = ownedRepos
    .filter((repo) => !repo.fork && !repo.archived && repo.description)
    .sort((a, b) => {
      const engagement = (b.stargazers_count - a.stargazers_count) * 5
        + (b.forks_count - a.forks_count) * 2;
      if (engagement !== 0) return engagement;
      return new Date(b.pushed_at).getTime() - new Date(a.pushed_at).getTime();
    });

  const selected = eligibleOwned.slice(0, limit);
  const selectedNames = new Set(selected.map((repo) => `${repo.owner}/${repo.name}`));
  const eligibleStarred = starredRepos.filter(
    (repo) => !repo.archived && repo.description && !selectedNames.has(`${repo.owner}/${repo.name}`)
  );

  for (const repo of eligibleStarred) {
    if (selected.length >= limit) break;
    selected.push(repo);
  }

  const usedStarred = selected.some((repo) => repo.owner !== PORTFOLIO_CONFIG.github);
  return {
    repos: selected,
    source: usedStarred && eligibleOwned.length ? 'top-and-starred' : usedStarred ? 'starred' : 'top',
  };
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
