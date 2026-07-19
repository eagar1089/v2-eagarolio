// =========================================================================
// Experience + skills + RCA research - editable central config.
// =========================================================================

export interface MissionEntry {
  id: string;
  period: string;
  version: string;
  title: string;
  focus: string;
  systems: string[];
  responsibilities: string[];
  tools: string[];
  lessons: string[];
  relatedProjects?: string[]; // project slugs
}

export const missionLog: MissionEntry[] = [
  {
    id: "diploma",
    period: "2021",
    version: "v1.0",
    title: "Diploma Completed",
    focus: "Completed my diploma and prepared to begin a professional career in Linux system administration.",
    systems: ["Diploma", "Technical foundations"],
    responsibilities: ["Completed diploma studies in 2021"],
    tools: [],
    lessons: ["Built the technical foundation for entering infrastructure operations"],
  },
  {
    id: "justdial-first",
    period: "November 2021 - February 2022",
    version: "v2.0",
    title: "Joined Justdial - Linux Administrator",
    focus: "Started my professional career at Justdial as a Linux Administrator.",
    systems: ["Linux administration", "Production troubleshooting", "System operations"],
    responsibilities: [
      "Joined Justdial in November 2021",
      "Worked on Linux administration and operational support",
      "Left in February 2022 to continue higher education",
    ],
    tools: ["Linux", "Troubleshooting"],
    lessons: ["Gained initial hands-on experience supporting production systems"],
  },
  {
    id: "education-break",
    period: "February 2022 - June 2022",
    version: "v3.0",
    title: "Higher Education",
    focus: "Stepped away from full-time work to continue pursuing a degree and strengthen my academic foundation.",
    systems: ["Degree studies", "Continued learning"],
    responsibilities: ["Focused on higher education before returning to professional work"],
    tools: [],
    lessons: ["Committed to balancing long-term education with professional growth"],
  },
  {
    id: "justdial-current",
    period: "June 2022 - Present",
    version: "v4.0",
    title: "Rejoined Justdial - Linux Administrator",
    focus: "Rejoined Justdial while pursuing a degree and continue working as a Linux Administrator, with additional hands-on web development experience.",
    systems: ["Linux administration", "Application deployment", "Web development", "Production support"],
    responsibilities: [
      "Rejoined Justdial in June 2022 while pursuing a degree",
      "Administer and troubleshoot Linux-based application environments",
      "Contribute to web development projects alongside infrastructure responsibilities",
      "Support application deployment, permissions, services, and logs",
      "Collaborate with development teams to resolve production issues",
    ],
    tools: ["Linux", "Nginx", "Bash", "PHP", "JavaScript", "React", "MySQL"],
    lessons: [
      "Developed an understanding of both how applications are built and how they run in production",
      "Continued learning across infrastructure, deployment, and application development",
    ],
  },
];

// =========================================================================
// Capability clusters
// =========================================================================

export interface CapabilityCluster {
  id: string;
  name: string;
  description: string;
  technologies: {
    id: string;
    name: string;
    usedIn?: string[]; // project slugs
  }[];
}

export const capabilities: CapabilityCluster[] = [
  {
    id: "infrastructure",
    name: "Infrastructure & Operations",
    description:
      "Daily operation of Linux systems, Nginx / PHP-FPM stacks, and production troubleshooting.",
    technologies: [
      { id: "linux",    name: "Linux",        usedIn: ["distributed-cron-monitoring", "infrastructure-data-collector"] },
      { id: "ubuntu",   name: "Ubuntu",       usedIn: ["distributed-cron-monitoring", "infrastructure-data-collector"] },
      { id: "centos",   name: "CentOS",       usedIn: ["distributed-cron-monitoring", "infrastructure-data-collector"] },
      { id: "nginx",    name: "Nginx",        usedIn: ["server-inventory-platform"] },
      { id: "php-fpm",  name: "PHP-FPM",      usedIn: ["server-inventory-platform"] },
      { id: "cron",     name: "Cron",         usedIn: ["distributed-cron-monitoring"] },
      { id: "bash",     name: "Bash",         usedIn: ["distributed-cron-monitoring", "infrastructure-data-collector"] },
    ],
  },
  {
    id: "devops",
    name: "DevOps & Automation",
    description:
      "Containerised development, CI/CD concepts, deployments, and infrastructure automation.",
    technologies: [
      { id: "docker",         name: "Docker",         usedIn: ["server-inventory-platform"] },
      { id: "docker-compose", name: "Docker Compose", usedIn: ["server-inventory-platform"] },
      { id: "git",            name: "Git",            usedIn: [] },
      { id: "github",         name: "GitHub",         usedIn: [] },
      { id: "cicd",           name: "CI/CD concepts", usedIn: [] },
      { id: "deploy",         name: "Deployments",    usedIn: ["server-inventory-platform"] },
    ],
  },
  {
    id: "backend",
    name: "Backend",
    description: "APIs, collectors, background jobs, and integrations.",
    technologies: [
      { id: "php",      name: "PHP",        usedIn: ["server-inventory-platform", "distributed-cron-monitoring"] },
      { id: "nodejs",   name: "Node.js",    usedIn: ["f5-liveops", "distributed-cron-monitoring"] },
      { id: "express",  name: "Express",    usedIn: ["f5-liveops", "server-inventory-platform"] },
      { id: "go",       name: "Go",         usedIn: ["infrastructure-data-collector"] },
      { id: "rest-api", name: "REST APIs",  usedIn: ["distributed-cron-monitoring", "f5-liveops", "infrastructure-data-collector"] },
    ],
  },
  {
    id: "frontend",
    name: "Frontend & Dashboards",
    description:
      "Responsive operational dashboards and data visualisation.",
    technologies: [
      { id: "react",      name: "React",        usedIn: ["f5-liveops", "server-inventory-platform", "distributed-cron-monitoring"] },
      { id: "nextjs",     name: "Next.js",      usedIn: [] },
      { id: "typescript", name: "TypeScript",   usedIn: ["f5-liveops", "server-inventory-platform", "distributed-cron-monitoring"] },
      { id: "tailwind",   name: "Tailwind CSS", usedIn: ["f5-liveops", "server-inventory-platform", "distributed-cron-monitoring"] },
      { id: "datatables", name: "DataTables",   usedIn: ["server-inventory-platform"] },
      { id: "dataviz",    name: "Data Visualisation", usedIn: [] },
    ],
  },
  {
    id: "databases",
    name: "Databases",
    description: "Schema design, query optimisation, historical data, and caching.",
    technologies: [
      { id: "mysql",   name: "MySQL",               usedIn: ["distributed-cron-monitoring", "f5-liveops", "server-inventory-platform"] },
      { id: "schema",  name: "Schema design",       usedIn: ["distributed-cron-monitoring", "f5-liveops", "server-inventory-platform"] },
      { id: "query",   name: "Query optimisation",  usedIn: ["distributed-cron-monitoring", "server-inventory-platform"] },
      { id: "history", name: "Historical storage",  usedIn: ["distributed-cron-monitoring", "f5-liveops"] },
      { id: "cache",   name: "Caching strategies",  usedIn: ["distributed-cron-monitoring", "f5-liveops"] },
    ],
  },
  {
    id: "observability",
    name: "Observability & RCA",
    description: "Monitoring, log analysis, and root cause analysis research.",
    technologies: [
      { id: "monitoring", name: "Monitoring",      usedIn: ["distributed-cron-monitoring"] },
      { id: "logs",       name: "Log analysis",    usedIn: ["ai-rca-research"] },
      { id: "anomaly",    name: "Anomaly detection", usedIn: ["ai-rca-research"] },
      { id: "zscore",     name: "Z-score",         usedIn: ["ai-rca-research"] },
      { id: "mad",        name: "MAD",             usedIn: ["ai-rca-research"] },
      { id: "ewma",       name: "EWMA",            usedIn: ["ai-rca-research"] },
      { id: "p95",        name: "p95 / p99",       usedIn: ["ai-rca-research"] },
    ],
  },
];

// =========================================================================
// RCA research catalogue
// =========================================================================

export interface RCAMethod {
  id: string;
  name: string;
  formula: string;
  explanation: string;
  useCase: string;
  limitation: string;
  related: string[];
  category: "statistical" | "rule-based" | "ml";
}

export const rcaMethods: RCAMethod[] = [
  {
    id: "average",
    name: "Rolling Average",
    formula: "μₜ = (1/w) · Σ xₜ₋ᵢ",
    explanation: "The mean of the last w samples. Simple baseline for slow-moving metrics.",
    useCase: "CPU utilisation, steady-state memory usage",
    limitation: "Sensitive to outliers and slow to respond to sudden shifts.",
    related: ["median", "stddev"],
    category: "statistical",
  },
  {
    id: "median",
    name: "Median",
    formula: "median(x)",
    explanation: "The middle value. Robust to outliers.",
    useCase: "Response time distributions with long tails",
    limitation: "Doesn't capture magnitude of extremes.",
    related: ["average", "mad"],
    category: "statistical",
  },
  {
    id: "stddev",
    name: "Standard Deviation",
    formula: "σ = √( (1/N) Σ (xᵢ - μ)² )",
    explanation: "Measures spread around the mean.",
    useCase: "Understanding normal variation in throughput",
    limitation: "Assumes roughly normal distribution; sensitive to outliers.",
    related: ["zscore", "average"],
    category: "statistical",
  },
  {
    id: "zscore",
    name: "Z-score",
    formula: "z = (x - μ) / σ",
    explanation: "Distance of a sample from the mean in standard deviations.",
    useCase: "Flagging unusual spikes in error rate",
    limitation: "Breaks down with non-normal data or shifting baselines.",
    related: ["stddev", "robust-z"],
    category: "statistical",
  },
  {
    id: "mad",
    name: "Median Absolute Deviation (MAD)",
    formula: "MAD = median(|xᵢ - median(x)|)",
    explanation: "A robust measure of spread based on the median.",
    useCase: "Metrics with frequent outlierss",
    limitation: "Less intuitive than standard deviation for non-statisticians.",
    related: ["median", "robust-z"],
    category: "statistical",
  },
  {
    id: "robust-z",
    name: "Robust Z-score",
    formula: "z* = 0.6745 · (x - median) / MAD",
    explanation: "Z-score variant that resists outliers by using median and MAD.",
    useCase: "Detecting anomalies in noisy operational data",
    limitation: "Can over-flag in highly variable environments.",
    related: ["mad", "zscore"],
    category: "statistical",
  },
  {
    id: "ewma",
    name: "EWMA",
    formula: "Sₜ = α · xₜ + (1 - α) · Sₜ₋₁",
    explanation: "Exponentially Weighted Moving Average; recent samples weigh more.",
    useCase: "Smoothing CPU or request rate for alerting",
    limitation: "Lag depends on α; tuning is empirical.",
    related: ["average"],
    category: "statistical",
  },
  {
    id: "p95",
    name: "p95 / p99 Percentiles",
    formula: "percentile(x, 0.95)",
    explanation: "Value below which 95% / 99% of samples fall.",
    useCase: "Tail latency of APIs and query times",
    limitation: "Requires enough samples to be meaningful.",
    related: ["median"],
    category: "statistical",
  },
  {
    id: "rolling",
    name: "Rolling Windows",
    formula: "f(xₜ₋w+1 … xₜ)",
    explanation: "Compute any statistic over the most recent w samples.",
    useCase: "Feeding any of the above methods with recent context",
    limitation: "Window size is a major tuning knob.",
    related: ["average", "median", "stddev"],
    category: "statistical",
  },
  {
    id: "baseline",
    name: "Baseline Detection",
    formula: "-",
    explanation: "Identifying normal operating ranges per time of day / week.",
    useCase: "Distinguishing expected load from real anomalies",
    limitation: "Requires historical data and can miss novel patterns.",
    related: ["average", "median", "ewma"],
    category: "rule-based",
  },
  {
    id: "correlation",
    name: "Correlation Analysis",
    formula: "ρ(X, Y)",
    explanation: "Measure how two metrics move together.",
    useCase: "Linking CPU to error rate, or connections to latency",
    limitation: "Correlation ≠ causation; can be coincidental.",
    related: ["zscore", "ewma"],
    category: "rule-based",
  },
];
