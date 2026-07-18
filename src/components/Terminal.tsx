import { useState, useRef, useEffect, useCallback } from 'react';
import { X, Terminal as TerminalIcon } from 'lucide-react';
import { PORTFOLIO_CONFIG } from '@/config/portfolio';

const COMMANDS: Record<string, string | ((input: string) => string)> = {
  help: () => `Available commands:
  about        - Who I am
  whoami       - Quick identity
  skills       - Engineering capabilities
  projects     - Featured work
  github       - GitHub profile
  experience   - Career timeline
  resume       - Resume info
  contact      - How to reach me
  clear        - Clear terminal`,
  about: `I design infrastructure tools, automation workflows, monitoring platforms, and operational dashboards that turn complex systems into clear, dependable experiences.

I work across Linux systems, backend services, database architectures, and operational observability - building the infrastructure that modern digital experiences depend on.`,
  whoami: `${PORTFOLIO_CONFIG.name} - DevOps Engineer, Linux Administrator, Infrastructure Builder`,
  skills: `Infrastructure: Linux, Ubuntu, CentOS, Nginx, PHP-FPM, Bash, Cron
DevOps: Docker, Docker Compose, Git, GitHub, CI/CD
Backend: PHP, Node.js, Express, Go, REST APIs
Frontend: React, Next.js, TypeScript, Tailwind CSS
Databases: MySQL, Schema Design, Caching, Query Optimisation
Observability: Monitoring, Anomaly Detection, RCA, Z-score, EWMA`,
  projects: `1. Distributed Cron Monitoring Platform
   Centralised cron monitoring across thousands of servers
2. F5 LiveOps Dashboard
   Modern operations platform for F5 BIG-IP infrastructure
3. Modern Server Inventory Platform
   Legacy PHP/MySQL to React/Express migration
4. AI-Based Root Cause Analysis Research
   Statistical methods and anomaly detection for infrastructure
5. Infrastructure Data Collector
   Lightweight server-side agents and data collection`,
  github: `GitHub: ${PORTFOLIO_CONFIG.github}
Link: https://github.com/${PORTFOLIO_CONFIG.github}

Check the GitHub Intelligence section for live repository data.`,
  experience: `DevOps Engineering - Linux, Infrastructure, Automation
Platform Engineering - Monitoring, Observability, Dashboards
Backend Development - PHP, Node.js, Express, Go
Frontend Development - React, Next.js, TypeScript
Database Engineering - MySQL, Schema Design, Caching
RCA Research - Statistical Methods, Anomaly Detection`,
  resume: `Resume is available for download in the Resume Console section.
Path: ${PORTFOLIO_CONFIG.resumePath}`,
  contact: `Email: ${PORTFOLIO_CONFIG.email}
GitHub: https://github.com/${PORTFOLIO_CONFIG.github}
LinkedIn: ${PORTFOLIO_CONFIG.linkedin}`,
  clear: 'clear',
};

interface TerminalLine {
  type: 'input' | 'output' | 'system';
  content: string;
}

export default function IdentityTerminal() {
  const [lines, setLines] = useState<TerminalLine[]>([
    { type: 'system', content: 'SGR Infrastructure Terminal v1.0.0' },
    { type: 'system', content: 'Type "help" for available commands.' },
    { type: 'system', content: '' },
  ]);
  const [input, setInput] = useState('');
  const [open, setOpen] = useState(false);
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [lines]);

  const executeCommand = useCallback((cmd: string) => {
    const trimmed = cmd.trim().toLowerCase();
    if (!trimmed) return;

    const newLines: TerminalLine[] = [
      { type: 'input', content: `$ ${cmd}` },
    ];

    const handler = COMMANDS[trimmed];
    if (handler === 'clear') {
      setLines([]);
      return;
    }
    if (typeof handler === 'function') {
      newLines.push({ type: 'output', content: handler(cmd) });
    } else if (handler) {
      newLines.push({ type: 'output', content: handler });
    } else {
      newLines.push({ type: 'output', content: `Command not found: ${trimmed}. Type "help" for available commands.` });
    }

    setLines(prev => [...prev, ...newLines]);
    setHistory(prev => [...prev, cmd]);
    setHistoryIndex(-1);
    setInput('');
  }, []);

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      executeCommand(input);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (history.length > 0) {
        const newIndex = historyIndex === -1 ? history.length - 1 : Math.max(0, historyIndex - 1);
        setHistoryIndex(newIndex);
        setInput(history[newIndex]);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex >= 0) {
        const newIndex = historyIndex + 1;
        if (newIndex >= history.length) {
          setHistoryIndex(-1);
          setInput('');
        } else {
          setHistoryIndex(newIndex);
          setInput(history[newIndex]);
        }
      }
    }
  }, [input, history, historyIndex, executeCommand]);

  const quickCommands = ['help', 'about', 'skills', 'projects', 'github', 'clear'];

  return (
    <section id="terminal" className="py-20 px-6">
      <div className="max-w-4xl mx-auto">
        {!open ? (
          <button
            onClick={() => setOpen(true)}
            className="group flex items-center gap-3 px-6 py-3 bg-[#0C121D] border border-[#1B3A4B] rounded-lg hover:border-[#00D4AA] transition-all duration-300 text-sm font-mono text-[#7D8590] hover:text-[#00D4AA]"
          >
            <TerminalIcon size={16} />
            Open Identity Terminal
            <span className="text-[10px] text-[#3E1F47] ml-2 opacity-0 group-hover:opacity-100 transition-opacity">
              Press to interact
            </span>
          </button>
        ) : (
          <div className="relative rounded-xl overflow-hidden bg-[#070B12] border border-[#1B3A4B] shadow-[0_0_60px_rgba(0,100,102,0.1)]">
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-2 bg-[#0C121D] border-b border-[#1B3A4B]">
              <div className="flex items-center gap-2">
                <TerminalIcon size={14} className="text-[#00D4AA]" />
                <span className="text-xs font-mono text-[#B8C2CC]">sgr-terminal</span>
              </div>
              <button
                onClick={() => setOpen(false)}
                className="text-[#7D8590] hover:text-white transition-colors"
                aria-label="Close terminal"
              >
                <X size={14} />
              </button>
            </div>

            {/* Terminal body */}
            <div className="p-4 h-80 overflow-y-auto font-mono text-sm" onClick={() => inputRef.current?.focus()}>
              {lines.map((line, i) => (
                <div key={i} className={`mb-1 ${
                  line.type === 'input' ? 'text-[#00D4AA]' : 
                  line.type === 'system' ? 'text-[#7D8590]' : 
                  'text-[#B8C2CC]'
                }`}>
                  {line.type === 'output' ? line.content.split('\n').map((p, j) => (
                    <p key={j}>{p}</p>
                  )) : line.content}
                </div>
              ))}
              <div ref={bottomRef} />
            </div>

            {/* Quick commands (mobile) */}
            <div className="px-4 py-2 bg-[#0C121D] border-t border-[#1B3A4B] flex flex-wrap gap-2">
              {quickCommands.map(cmd => (
                <button
                  key={cmd}
                  onClick={() => executeCommand(cmd)}
                  className="text-[10px] font-mono text-[#7D8590] hover:text-[#00D4AA] px-2 py-1 rounded bg-[#070B12] border border-[#1B3A4B] hover:border-[#00D4AA] transition-colors"
                >
                  {cmd}
                </button>
              ))}
            </div>

            {/* Input */}
            <div className="flex items-center px-4 py-3 bg-[#0C121D] border-t border-[#1B3A4B]">
              <span className="text-[#00D4AA] font-mono text-sm mr-2">$</span>
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                className="flex-1 bg-transparent text-[#B8C2CC] font-mono text-sm outline-none placeholder-[#3E1F47]"
                placeholder="Type a command..."
                autoFocus
              />
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
