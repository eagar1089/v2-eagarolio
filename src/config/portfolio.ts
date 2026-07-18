export interface SocialLink {
  name: string;
  url: string;
  icon: string;
}

export interface Project {
  slug: string;
  name: string;
  purpose: string;
  status: 'active' | 'completed' | 'research' | 'in-progress';
  category: string;
  role: string;
  description: string;
  architecture: ArchitectureStep[];
  technologies: string[];
  challenges: string[];
  decisions: string[];
  githubUrl?: string;
  demoUrl?: string;
  features: string[];
  impact: string;
}

export interface ArchitectureStep {
  label: string;
  description: string;
  type: 'source' | 'process' | 'storage' | 'api' | 'ui' | 'cache';
}

export interface SkillCluster {
  name: string;
  color: string;
  items: SkillItem[];
}

export interface SkillItem {
  name: string;
  projects: string[];
}

export interface ExperienceEntry {
  period: string;
  role: string;
  focus: string;
  systems: string[];
  responsibilities: string[];
  tools: string[];
  lessons: string[];
  relatedProjects?: string[];
}

export interface RCAMethod {
  name: string;
  formula: string;
  explanation: string;
  useCase: string;
  limitation: string;
  relatedMetric: string;
}

export interface GitHubRepo {
  name: string;
  description: string | null;
  html_url: string;
  stargazers_count: number;
  forks_count: number;
  language: string | null;
  topics: string[];
  updated_at: string;
  pushed_at: string;
  archived: boolean;
  fork: boolean;
  homepage: string;
  default_branch: string;
}

export interface GitHubUser {
  avatar_url: string;
  name: string | null;
  bio: string | null;
  public_repos: number;
  followers: number;
  following: number;
  html_url: string;
  updated_at: string;
}

export const PORTFOLIO_CONFIG = {
  name: 'Sagar Parab',
  brand: 'S9r',
  role: 'Linux Administrator',
  subRoles: [
    'Linux Administrator',
    'Automation Specialist',
    'Cloud Engineer',
    'Full-Stack Developer',
  ],
  tagline: 'Building reliable systems behind modern digital experiences.',
  bio: 'I design infrastructure tools, automation workflows, monitoring platforms, and operational dashboards that turn complex systems into clear, dependable experiences.',
  email: 'sagar.parab@email.com',
  location: 'India',
  github: 'eagar1089',
  linkedin: 'https://www.linkedin.com/in/sagarparab0189',
  socialLinks: [
    { name: 'GitHub', url: 'https://github.com/eagar1089', icon: 'github' },
    { name: 'LinkedIn', url: 'https://www.linkedin.com/in/sagarparab0189', icon: 'linkedin' },
    { name: 'Codepen', url: 'https://codepen.io/eagar1089', icon: 'codepen' },
  ] as SocialLink[],
  resumePath: '/resume/Sagar_Parab_Resume.pdf',
  featuredRepos: [
    'cron-monitoring-platform',
    'f5-liveops-dashboard',
    'server-inventory-platform',
    'rca-research',
    'infra-collector',
  ],
  logoAnimationIntensity: 'medium',
  backgroundEffectIntensity: 'low',
} as const;
