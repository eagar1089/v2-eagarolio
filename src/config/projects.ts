// =========================================================================
// Project configuration - each project is a real case study.
// No fabricated metrics, impact numbers, or deployments.
// =========================================================================

export type ProjectStatus = "production" | "research" | "migration" | "active";

export interface ProjectArchitectureNode {
  id: string;
  label: string;
  description?: string;
}

export interface Project {
  slug: string;
  name: string;
  tagline: string;
  purpose: string;
  status: ProjectStatus;
  role: string;
  category:
    | "monitoring"
    | "operations"
    | "inventory"
    | "research"
    | "automation";
  repository?: string; // GitHub repo name under the user
  liveUrl?: string;
  year: string;

  highlights: string[];
  stack: string[];

  problem: string;
  constraints: string[];
  approach: string[];
  challenges: string[];
  outcome: string[];
  future: string[];

  architecture: {
    summary: string;
    nodes: ProjectArchitectureNode[];
    edges: [string, string][];
  };

  dataFlow: string[];

  sections: {
    id: string;
    title: string;
    body: string;
  }[];
}

export const projects: Project[] = [
  {
    slug: "distributed-cron-monitoring",
    name: "Distributed Cron Monitoring Platform",
    tagline: "Visibility across thousands of servers and tens of thousands of cron jobs.",
    purpose:
      "Centralised visibility and auditing of cron jobs across approximately 2,000-3,000 servers, tracking active and commented lines with daily state collection and historical change detection.",
    status: "production",
    role: "Designer and developer - collectors, APIs, and dashboard",
    category: "monitoring",
    repository: undefined, // replace with real repo when public
    year: "2024",

    highlights: [
      "Covers 2,000-3,000 servers",
      "Tens of thousands of active cron lines tracked",
      "Active and commented state distinguished",
      "Daily state collection with SHA-256 change detection",
      "Jira mapping and stakeholder reporting",
      "Excel export and server-level filtering",
    ],

    stack: [
      "Bash",
      "PHP",
      "Node.js",
      "MySQL",
      "Nginx",
      "React",
      "TypeScript",
      "Tailwind CSS",
    ],

    problem:
      "Cron jobs across thousands of servers were audited manually. There was no single source of truth for which jobs were running, which were commented out, and what had changed between collection runs.",

    constraints: [
      "Minimal dependencies on destination servers",
      "Hardware serial number as the primary server identity",
      "Primary IP stored as a secondary identifier only",
      "Central exclusion regex configuration",
      "Collection runs must be auditable",
    ],

    approach: [
      "Lightweight Bash collector per server with no extra packages",
      "Normalise each cron line and compute a SHA-256 hash for change detection",
      "Secure ingestion API validates and persists state into MySQL",
      "Cached API layer keeps dashboard queries responsive",
      "Responsive dashboard with server-level filtering and exports",
    ],

    challenges: [
      "Volume: hundreds of cron lines per server, tens of thousands of jobs in total",
      "Normalising crontab syntax variations across distributions",
      "Handling commented vs. active lines without losing historical context",
      "Keeping dashboard queries fast against a growing historical dataset",
    ],

    outcome: [
      "Single auditable view of cron state across the entire fleet",
      "Detectable drift between daily collection runs",
      "Exportable reports for stakeholders and audits",
    ],

    future: [
      "Alerting on unexpected cron changes",
      "Jira-linked ownership dashboards",
      "Role-based scoping per team",
    ],

    architecture: {
      summary:
        "Server-side collectors push normalised cron state to a central ingestion API, which persists to MySQL. A cached API layer powers a responsive monitoring dashboard.",
      nodes: [
        { id: "servers",   label: "Linux Servers",     description: "Each server runs a lightweight Bash collector." },
        { id: "collector", label: "Bash Collector",    description: "Reads /etc/crontab and /var/spool/cron, normalises lines." },
        { id: "api",       label: "Ingestion API",     description: "Authenticates, validates, and persists payloads." },
        { id: "hash",      label: "Hash Comparison",   description: "SHA-256 of each normalised line for change detection." },
        { id: "db",        label: "MySQL",             description: "Stores current state and historical diffs." },
        { id: "cache",     label: "Cache Layer",       description: "Avoids repeated joins on large tables." },
        { id: "dash-api",  label: "Dashboard API",     description: "REST endpoints consumed by the UI." },
        { id: "ui",        label: "Responsive Dashboard", description: "Filtering, exports, Jira mapping." },
      ],
      edges: [
        ["servers", "collector"],
        ["collector", "api"],
        ["api", "hash"],
        ["hash", "db"],
        ["db", "cache"],
        ["cache", "dash-api"],
        ["dash-api", "ui"],
      ],
    },

    dataFlow: [
      "Collectors run on a schedule per server",
      "Each run produces a signed, timestamped payload",
      "The ingestion API hashes and persists state",
      "Diffs against the previous run are recorded",
      "Dashboard queries the cache for instant response",
    ],

    sections: [
      {
        id: "identity",
        title: "Identity model",
        body:
          "Every server is identified by its hardware serial number. IP addresses are stored as secondary metadata so that re-IP or DHCP changes do not break historical continuity.",
      },
      {
        id: "normalisation",
        title: "Cron normalisation",
        body:
          "Cron lines are trimmed, comments preserved, and whitespace collapsed before hashing. This makes change detection stable across trivial edits.",
      },
      {
        id: "exclusions",
        title: "Central exclusions",
        body:
          "A server-side regex list allows the operations team to exclude noise (test entries, temporary jobs) without touching individual servers.",
      },
    ],
  },

  {
    slug: "f5-liveops",
    name: "F5 LiveOps Dashboard",
    tagline: "Search and understand F5 BIG-IP infrastructure in seconds.",
    purpose:
      "A modern operations console for searching and understanding F5 BIG-IP relationships - VIPs, pools, members, nodes, and live status - without touching the devices directly.",
    status: "production",
    role: "Backend and frontend developer",
    category: "operations",
    repository: undefined,
    year: "2024",

    highlights: [
      "Search by VIP IP, VIP:port, pool member, node IP, VIP name, or pool name",
      "Full relationship graph: Device → VIP → Pool → Members → Node",
      "Live status and historical remarks",
      "No software installed on F5 devices",
      "Frontend never calls F5 devices directly",
    ],

    stack: ["F5 iControl REST", "Node.js", "Express", "MySQL", "React", "TypeScript", "WebSocket"],

    problem:
      "Engineers needed a fast way to trace a single IP through the entire F5 topology - VIP, pool, members, nodes, and status - across multiple devices. The existing process was manual and slow.",

    constraints: [
      "Nothing may be installed on F5 devices",
      "Frontend never talks to F5 directly",
      "Polling must be rate-limited and polite",
      "Relationships must stay consistent even as configs change",
    ],

    approach: [
      "Backend collectors poll F5 iControl REST endpoints on a schedule",
      "Latest state is cached in memory for instant reads",
      "Every state is persisted permanently for historical lookups",
      "Frontend consumes a dedicated backend API",
      "Live updates pushed over WebSocket / SSE",
    ],

    challenges: [
      "Modelling a many-to-many relationship graph cleanly",
      "Keeping the live cache consistent with the permanent store",
      "Providing search across several different identifier types from one input",
    ],

    outcome: [
      "IP-to-topology lookups go from minutes to seconds",
      "Historical remarks and change history are preserved",
      "Operators can trace issues without logging into F5 devices",
    ],

    future: [
      "Correlation with upstream monitoring alerts",
      "Change-window diffing across snapshots",
    ],

    architecture: {
      summary:
        "Backend collectors poll F5 REST APIs. State is cached for live reads and persisted for history. The frontend consumes a dedicated API with optional live updates.",
      nodes: [
        { id: "f5",     label: "F5 REST APIs",      description: "iControl REST on each BIG-IP device." },
        { id: "poll",   label: "Polling Collectors", description: "Scheduled backend jobs fetching state." },
        { id: "cache",  label: "Latest-State Cache", description: "In-memory for instant reads." },
        { id: "db",     label: "Historical DB",      description: "Every snapshot persisted permanently." },
        { id: "api",    label: "Backend API",        description: "The only data source the UI knows about." },
        { id: "live",   label: "Live Push",          description: "WebSocket / SSE to the UI." },
        { id: "ui",     label: "Operations Dashboard", description: "Search, graph view, history." },
      ],
      edges: [
        ["f5", "poll"],
        ["poll", "cache"],
        ["poll", "db"],
        ["cache", "api"],
        ["db", "api"],
        ["api", "live"],
        ["live", "ui"],
        ["api", "ui"],
      ],
    },

    dataFlow: [
      "Pollers hit F5 iControl REST endpoints on a schedule",
      "Responses are normalised into relationship records",
      "Latest state replaces the cache; the full record is persisted",
      "The UI queries the backend API and optionally subscribes to live updates",
    ],

    sections: [
      {
        id: "search",
        title: "Unified search",
        body:
          "A single search box accepts VIP IP, VIP:port, pool member IP, node IP, VIP name, or pool name and resolves to the full relationship graph.",
      },
      {
        id: "safety",
        title: "Device safety",
        body:
          "The dashboard only reads from F5 via read-only REST. No write operations, no agents, no SSH - nothing installed on the devices themselves.",
      },
    ],
  },

  {
    slug: "server-inventory-platform",
    name: "Modern Server Inventory Platform",
    tagline: "Migrating a legacy inventory system into a modern stack.",
    purpose:
      "Modernise an existing PHP and MySQL infrastructure inventory platform while keeping operations running - planning a migration from AdminLTE and DataTables to a React and Express stack.",
    status: "migration",
    role: "Platform engineer and migration lead",
    category: "inventory",
    repository: undefined,
    year: "2024",

    highlights: [
      "Existing PHP / MySQL / AdminLTE / DataTables application",
      "Migration planning toward React and Express",
      "Containerised development environment",
      "Nginx + PHP-FPM deployment",
      "Git-based deployment workflow",
      "CSV and Excel export",
    ],

    stack: ["PHP", "MySQL", "AdminLTE", "DataTables", "Nginx", "PHP-FPM", "Docker", "React", "Express", "TypeScript"],

    problem:
      "The current inventory platform works but relies on a legacy UI stack. Reporting, filtering, and exports are slower than they need to be, and the codebase is hard to extend.",

    constraints: [
      "No disruption to active inventory consumers",
      "Preserve existing data schema during migration",
      "Maintain current deployment footprint",
    ],

    approach: [
      "Keep the PHP backend running while introducing a new React frontend",
      "Introduce Express-based APIs for new features",
      "Run both stacks in a containerised development environment",
      "Nginx proxies to the appropriate backend depending on route",
      "Gradually shift features to the new stack",
    ],

    challenges: [
      "Mapping legacy schema semantics to a modernised model",
      "Keeping existing exports working during the transition",
      "Retraining stakeholders on the new dashboard",
    ],

    outcome: [
      "Clear migration plan with parallel-running stacks",
      "Responsive redesign prototype validated with stakeholders",
    ],

    future: [
      "Full retirement of the AdminLTE frontend",
      "Unified API surface for other internal tools",
    ],

    architecture: {
      summary:
        "The legacy PHP + MySQL backend continues serving existing pages. A new React + Express stack is introduced alongside it, with Nginx routing traffic by path.",
      nodes: [
        { id: "collectors", label: "Server Collectors", description: "Scripts collecting hardware and OS metadata." },
        { id: "php",        label: "Legacy PHP App",    description: "Running on PHP-FPM behind Nginx." },
        { id: "express",    label: "Express API",       description: "New backend services for the redesigned UI." },
        { id: "db",         label: "Inventory DB",      description: "Shared MySQL instance." },
        { id: "nginx",      label: "Nginx",             description: "Routes traffic by path prefix." },
        { id: "react",      label: "React Dashboard",   description: "Redesigned UI with filtering and exports." },
      ],
      edges: [
        ["collectors", "php"],
        ["collectors", "express"],
        ["php", "db"],
        ["express", "db"],
        ["nginx", "php"],
        ["nginx", "express"],
        ["nginx", "react"],
        ["express", "react"],
      ],
    },

    dataFlow: [
      "Collectors push system and hardware data into MySQL",
      "Legacy PHP reads the same DB for its pages",
      "Express exposes the same data via a modern API",
      "React dashboard consumes the new API",
    ],

    sections: [
      {
        id: "migration",
        title: "Migration strategy",
        body:
          "The migration is staged: parallel stacks today, unified API tomorrow, legacy retirement once the new UI has feature parity and stakeholder sign-off.",
      },
      {
        id: "deploy",
        title: "Deployment",
        body:
          "Docker Compose for development, Nginx + PHP-FPM + Git-based deploys for production. No change to the underlying hosting model during migration.",
      },
    ],
  },

  {
    slug: "ai-rca-research",
    name: "AI-Based Root Cause Analysis Research",
    tagline: "Exploring rule-based, statistical, and ML-assisted RCA.",
    purpose:
      "Research into how rule-based systems, statistical methods, anomaly detection, and machine learning can support infrastructure root-cause analysis across Linux, MySQL, MongoDB, Elasticsearch, and Redis.",
    status: "research",
    role: "Independent research and systems design",
    category: "research",
    repository: undefined,
    year: "2024-present",

    highlights: [
      "Linux, MySQL, MongoDB, Elasticsearch, Redis RCA",
      "Statistical baselines: mean, median, stddev",
      "Z-score, MAD, robust Z-score, EWMA",
      "p95 / p99 percentile analysis",
      "Baseline detection and correlation",
      "Hybrid rule-based + ML reasoning",
    ],

    stack: ["Python", "Statistics", "Pandas", "Linux", "MySQL", "MongoDB", "Elasticsearch", "Redis"],

    problem:
      "Infrastructure incidents often have multiple contributing factors. Purely manual RCA is slow; purely ML-driven RCA can be opaque. A hybrid approach may be more practical.",

    constraints: [
      "Research-stage - not yet a deployed production AI product",
      "Each method has known limitations that must be acknowledged",
      "Human validation remains essential",
    ],

    approach: [
      "Build a catalogue of statistical methods suited to infrastructure metrics",
      "Prototype each method against sample operational datasets",
      "Identify where rule-based logic complements statistical signals",
      "Explore how an ML layer can rank probable root causes",
    ],

    challenges: [
      "Noisy, non-stationary metrics",
      "Seasonality in operational systems",
      "Correlation ≠ causation",
      "Explainability of ML suggestions",
    ],

    outcome: [
      "Documented method catalogue with use cases and limitations",
      "Prototype notebooks demonstrating each technique",
    ],

    future: [
      "Apply to a production dataset with permission",
      "Build explainability into the ML ranking",
    ],

    architecture: {
      summary:
        "Metrics flow through statistical baselines and anomaly detectors. Rules contribute known failure patterns. An ML layer ranks probable causes and presents them for human validation.",
      nodes: [
        { id: "metrics",    label: "Metrics & Logs",      description: "OS, DB, and application signals." },
        { id: "baseline",   label: "Baseline Generation", description: "Rolling mean, median, stddev." },
        { id: "anomaly",    label: "Anomaly Detection",   description: "Z-score, MAD, EWMA, p95/p99." },
        { id: "rules",      label: "Rule-Based Patterns", description: "Known failure modes per system." },
        { id: "correlate",  label: "Correlation",         description: "Cross-signal relationships." },
        { id: "rank",       label: "ML Ranking",          description: "Probable causes, ranked." },
        { id: "validate",   label: "Human Validation",    description: "Engineer confirms or overrides." },
      ],
      edges: [
        ["metrics", "baseline"],
        ["baseline", "anomaly"],
        ["anomaly", "correlate"],
        ["rules", "correlate"],
        ["correlate", "rank"],
        ["rank", "validate"],
      ],
    },

    dataFlow: [
      "Operational metrics and logs are ingested",
      "Baselines and anomalies are computed over rolling windows",
      "Rule-based patterns flag known failure modes",
      "Correlation narrows the candidate causes",
      "ML ranks them; an engineer validates",
    ],

    sections: [
      {
        id: "methods",
        title: "Methods catalogue",
        body:
          "Each statistical method is documented with its formula, when it works well, when it fails, and which infrastructure metrics it suits.",
      },
      {
        id: "hybrid",
        title: "Hybrid reasoning",
        body:
          "Rules capture experience; statistics capture deviation from normal; ML ranks the combinations. None of them replace the engineer.",
      },
    ],
  },

  {
    slug: "infrastructure-data-collector",
    name: "Infrastructure Data Collector",
    tagline: "Lightweight agents that feed operational data into central systems.",
    purpose:
      "A minimal-footprint collector for system and infrastructure information - usable as a Bash script or a compiled Go agent, with REST ingestion and central configuration.",
    status: "active",
    role: "Designer and developer",
    category: "automation",
    repository: undefined,
    year: "2024",

    highlights: [
      "Bash or compiled Go implementation",
      "Minimal runtime dependencies",
      "REST ingestion API",
      "Hash verification for payload integrity",
      "Central configuration per fleet",
      "Linux compatibility across distributions",
    ],

    stack: ["Bash", "Go", "REST API", "Linux", "Docker"],

    problem:
      "Collecting consistent infrastructure metadata across heterogeneous Linux environments without adding heavy dependencies to each server.",

    constraints: [
      "Must run on minimal installations",
      "Must not disrupt production workloads",
      "Must support versioning and safe upgrades",
    ],

    approach: [
      "Bash version for zero-dependency environments",
      "Go version where a compiled binary is acceptable",
      "Both emit the same payload schema",
      "Central REST API validates and persists",
      "Configuration and exclusion rules live server-side",
    ],

    challenges: [
      "Distribution-specific commands and paths",
      "Detecting hardware reliably in virtualised environments",
      "Keeping payloads small and cheap to transmit",
    ],

    outcome: [
      "One schema, two implementations, shared ingestion API",
      "Rolling upgrades without breaking existing collectors",
    ],

    future: [
      "Signed payloads for higher-trust environments",
      "Pluggable modules for new data sources",
    ],

    architecture: {
      summary:
        "Lightweight collectors run on schedule. A central REST API validates and persists the payload. Configuration lives server-side.",
      nodes: [
        { id: "host",   label: "Linux Host",       description: "Runs either Bash or Go collector." },
        { id: "agent",  label: "Collector Agent",   description: "Bash or compiled Go binary." },
        { id: "api",    label: "REST Ingestion",    description: "Validates, hashes, persists." },
        { id: "store",  label: "Central Store",     description: "Inventory DB." },
        { id: "config", label: "Central Config",    description: "Exclusions, versions, modules." },
      ],
      edges: [
        ["host", "agent"],
        ["agent", "api"],
        ["api", "store"],
        ["config", "agent"],
      ],
    },

    dataFlow: [
      "Collector runs on a schedule",
      "Payload is built and hashed",
      "POSTed to the ingestion API",
      "API validates, persists, records the run",
    ],

    sections: [
      {
        id: "modes",
        title: "Two implementations, one schema",
        body:
          "Bash for maximum compatibility. Go for performance and easier distribution. Both speak the same JSON schema to the same API.",
      },
      {
        id: "upgrades",
        title: "Safe upgrades",
        body:
          "Version negotiation happens at the API. Older collectors keep working while newer ones opt into new fields.",
      },
    ],
  },
];
