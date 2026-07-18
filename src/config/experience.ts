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
    id: "v4",
    period: "2024 - Present",
    version: "v4.0",
    title: "Infrastructure Mission Control",
    focus:
      "Designing and operating monitoring platforms, operational dashboards, and automation systems across production Linux infrastructure.",
    systems: [
      "Linux fleet (2,000-3,000 servers)",
      "F5 BIG-IP environment",
      "MySQL, PHP-FPM, Nginx stacks",
    ],
    responsibilities: [
      "Designed and built the Distributed Cron Monitoring Platform",
      "Developed the F5 LiveOps operations dashboard",
      "Led the migration plan for the Server Inventory Platform",
      "Conducted independent RCA research across statistical and ML methods",
      "Maintained and hardened production collectors and ingestion APIs",
    ],
    tools: [
      "Linux",
      "Bash",
      "PHP",
      "Node.js",
      "Go",
      "MySQL",
      "Nginx",
      "React",
      "TypeScript",
      "Tailwind CSS",
      "Docker",
    ],
    lessons: [
      "Good operational data is the foundation of every other system",
      "Minimal collectors win over complex agents in heterogeneous fleets",
      "Dashboards earn trust through consistency, not flashiness",
    ],
    relatedProjects: [
      "distributed-cron-monitoring",
      "f5-liveops",
      "server-inventory-platform",
      "infrastructure-data-collector",
    ],
  },
  {
    id: "v3",
    period: "Earlier",
    version: "v3.0",
    title: "Linux Administration & Backend Systems",
    focus:
      "Linux server administration, production troubleshooting, backend APIs, and data collectors.",
    systems: [
      "Ubuntu and CentOS production servers",
      "Nginx + PHP-FPM stacks",
      "MySQL databases",
    ],
    responsibilities: [
      "Administered Linux servers in production environments",
      "Diagnosed and resolved operational incidents",
      "Developed backend services and REST APIs",
      "Wrote automation scripts for recurring operational tasks",
    ],
    tools: [
      "Ubuntu",
      "CentOS",
      "Bash",
      "Nginx",
      "PHP",
      "PHP-FPM",
      "MySQL",
      "Cron",
    ],
    lessons: [
      "Production systems reward patience and methodical debugging",
      "Automation is only as good as its observability",
    ],
  },
  {
    id: "v2",
    period: "Earlier",
    version: "v2.0",
    title: "Full-Stack Foundations",
    focus: "Building web applications across PHP, Node.js, and modern frontend stacks.",
    systems: ["LAMP stacks", "Node.js + Express services", "React frontends"],
    responsibilities: [
      "Developed full-stack features from schema to UI",
      "Built responsive dashboards with DataTables and React",
      "Integrated third-party APIs",
    ],
    tools: ["PHP", "Node.js", "Express", "React", "JavaScript", "Tailwind CSS"],
    lessons: [
      "A strong backend foundation makes frontend work much easier",
      "Type safety pays off quickly in larger projects",
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
