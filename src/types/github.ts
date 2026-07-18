// =========================================================================
// GitHub type definitions
// =========================================================================

export interface GitHubUser {
  login: string;
  id: number;
  avatar_url: string;
  html_url: string;
  name?: string | null;
  bio?: string | null;
  public_repos: number;
  followers: number;
  following: number;
  created_at: string;
  location?: string | null;
  blog?: string | null;
  company?: string | null;
}

export interface GitHubRepo {
  id: number;
  name: string;
  full_name: string;
  description?: string | null;
  html_url: string;
  homepage?: string | null;
  language?: string | null;
  stargazers_count: number;
  watchers_count: number;
  forks_count: number;
  open_issues_count: number;
  topics?: string[];
  fork: boolean;
  archived: boolean;
  private: boolean;
  pushed_at: string;
  updated_at: string;
  created_at: string;
}

export type GitHubLanguageMap = Record<string, number>;

export interface GitHubData {
  user: GitHubUser;
  repos: GitHubRepo[];
  totalStars: number;
  totalForks: number;
  languages: GitHubLanguageMap;
  fetchedAt: number;
}

export type GitHubState =
  | { status: "idle" }
  | { status: "loading" }
  | { status: "success"; data: GitHubData }
  | { status: "error"; error: string };
