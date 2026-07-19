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
  owner: string;
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
  role: 'DevOps Engineer',
  subRoles: [
    'Linux Administrator',
    'CI/CD Automation',
    'Cloud and Containers',
    'Software Engineering',
  ],
  tagline: 'Automating reliable delivery across Linux, containers, cloud, and CI/CD.',
  bio: 'DevOps-focused engineer with 2+ years of Linux administration experience at Justdial. After completing my BE degree in May 2026, I rejoined Justdial in July 2026 and now combine production operations with CI/CD, container automation, monitoring, and application delivery.',
  email: 'sgrp9801@gmail.com',
  location: 'Bengaluru, India',
  github: 'eagar1089',
  linkedin: 'https://www.linkedin.com/in/sagarparab0189',
  socialLinks: [
    { name: 'GitHub', url: 'https://github.com/eagar1089', icon: 'github' },
    { name: 'LinkedIn', url: 'https://www.linkedin.com/in/sagarparab0189', icon: 'linkedin' },
    { name: 'Codepen', url: 'https://codepen.io/eagar1089', icon: 'codepen' },
  ] as SocialLink[],
  resumePath: '/resume/SagarParab-Resume.pdf',
  logoAnimationIntensity: 'medium',
  backgroundEffectIntensity: 'low',
} as const;

// Compatibility shape for the selected Option A sections.
export const portfolio = {
  name: PORTFOLIO_CONFIG.name,
  email: PORTFOLIO_CONFIG.email,
  bio: PORTFOLIO_CONFIG.bio,
  titles: { primary: PORTFOLIO_CONFIG.role },
  focus: PORTFOLIO_CONFIG.subRoles,
  resume: {
    path: PORTFOLIO_CONFIG.resumePath,
    available: true,
  },
  social: {
    github: {
      username: PORTFOLIO_CONFIG.github,
      url: `https://github.com/${PORTFOLIO_CONFIG.github}`,
    },
    linkedin: {
      username: 'sagarparab0189',
      url: PORTFOLIO_CONFIG.linkedin,
    },
  },
  availability: { label: 'Available for selected opportunities' },
  contact: { recipient: PORTFOLIO_CONFIG.email },
} as const;
