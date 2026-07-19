import { useState } from "react";
import { motion } from "framer-motion";
import { FileText, Download, Maximize2, Mail, Send, Check, AlertCircle } from "lucide-react";
import { portfolio } from "@/config";
import { cn } from "@/lib/utils";

function GitHubIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.4 5.4 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
  );
}

function LinkedInIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6Z" />
      <rect width="4" height="12" x="2" y="9" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

// =========================================================================
// Section Header
// =========================================================================

function SectionHeader({ kicker, title, description }: {
  kicker: string; title: string; description?: string;
}) {
  return (
    <header className="mx-auto max-w-3xl">
      <motion.span
        initial={{ opacity: 0, y: 8 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="font-mono text-[10px] uppercase tracking-[0.4em] text-[#22d3ee]"
      >
        {kicker}
      </motion.span>
      <motion.h2
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, delay: 0.05 }}
        className="mt-3 font-display text-balance text-3xl font-semibold leading-[1.1] tracking-tight sm:text-4xl lg:text-5xl"
      >
        {title}
      </motion.h2>
      {description && (
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="mt-4 max-w-2xl text-[15px] leading-relaxed text-[#B8C2CC]"
        >
          {description}
        </motion.p>
      )}
    </header>
  );
}

// =========================================================================
// Resume Console
// =========================================================================

export function ResumeConsole() {
  const available = portfolio.resume.available;

  return (
    <section
      id="resume"
      className="relative mx-auto w-full max-w-5xl"
      aria-label="Resume console"
    >
      <SectionHeader
        kicker="05 - Resume Console"
        title="The résumé, packaged as an operational asset."
        description="Preview, download, or read a summary of focus areas, projects, and skill clusters."
      />

      <div className="mt-9 grid gap-5 lg:mt-10 lg:grid-cols-[1.28fr_0.92fr] lg:gap-6">
        <div className="panel relative overflow-hidden border border-white/10 p-0 shadow-[0_24px_70px_rgba(0,0,0,0.18)]">
          {available ? (
            <>
              <div className="flex items-center justify-between border-b border-white/10 bg-white/[0.03] px-4 py-3 sm:px-5">
                <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.25em] text-[#7D8590]">
                  <FileText className="h-3.5 w-3.5" />
                  resume.pdf
                </div>
                <div className="flex items-center gap-2">
                  <a
                    href={portfolio.resume.path}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 rounded-md border border-white/10 bg-white/5 px-2.5 py-1 font-mono text-[10px] uppercase tracking-widest text-white/80 hover:border-[#22d3ee]/40"
                  >
                    <Maximize2 className="h-3 w-3" />
                    Full screen
                  </a>
                  <a
                    href={portfolio.resume.path}
                    download
                    className="inline-flex items-center gap-1.5 rounded-md border border-[#22d3ee]/40 bg-[#22d3ee]/10 px-2.5 py-1 font-mono text-[10px] uppercase tracking-widest text-[#22d3ee] hover:bg-[#22d3ee]/20"
                  >
                    <Download className="h-3 w-3" />
                    Download
                  </a>
                </div>
              </div>
              <div className="h-[440px] bg-white/5 sm:h-[500px] lg:h-[520px]">
                <iframe
                  src={portfolio.resume.path}
                  title="Resume preview"
                  className="h-full w-full"
                  loading="lazy"
                />
              </div>
            </>
          ) : (
            <div className="flex aspect-[8.5/11] min-h-[300px] flex-col items-center justify-center gap-4 p-6 text-center sm:p-8">
              <div className="flex h-14 w-14 items-center justify-center rounded-full border border-white/10 bg-white/5">
                <FileText className="h-6 w-6 text-[#7D8590]" />
              </div>
              <div>
                <p className="font-display text-lg font-semibold text-white">
                  Resume not yet attached
                </p>
                <p className="mt-2 max-w-sm text-sm text-[#B8C2CC]">
                  Place a PDF at <code className="rounded bg-white/10 px-1.5 py-0.5 font-mono text-xs">{portfolio.resume.path}</code> and set <code className="rounded bg-white/10 px-1.5 py-0.5 font-mono text-xs">resume.available = true</code> in the configuration.
                </p>
              </div>
            </div>
          )}
        </div>

        <div className="space-y-3.5">
          <div className="panel p-4 sm:p-5">
            <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-[#22d3ee]">
              Profile summary
            </p>
            <h3 className="mt-3 font-display text-xl font-semibold">{portfolio.name}</h3>
            <p className="mt-1 font-mono text-xs text-[#B8C2CC]">{portfolio.titles.primary}</p>
            <p className="mt-3 text-sm leading-relaxed text-[#B8C2CC]">{portfolio.bio}</p>

            <div className="mt-4 border-t border-white/10 pt-3.5">
              <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-[#7D8590]">Focus</p>
              <div className="mt-2 flex flex-wrap gap-2">
                {portfolio.focus.map((f) => (
                  <span
                    key={f}
                    className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 font-mono text-[11px] text-[#B8C2CC]"
                  >
                    {f}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="panel p-4 sm:p-5">
            <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-[#a855f7]">
              Quick channels
            </p>
            <div className="mt-3 space-y-1.5">
              <ChannelRow Icon={GitHubIcon} label="GitHub" value={`@${portfolio.social.github.username}`} href={portfolio.social.github.url} />
              {portfolio.social.linkedin.url && (
                <ChannelRow Icon={LinkedInIcon} label="LinkedIn" value={portfolio.social.linkedin.username || "Profile"} href={portfolio.social.linkedin.url} />
              )}
              <ChannelRow Icon={Mail} label="Email" value={portfolio.email} href={`mailto:${portfolio.email}`} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ChannelRow({ Icon, label, value, href }: { Icon: React.ComponentType<{ className?: string }>; label: string; value: string; href: string }) {
  return (
    <a
      href={href}
      target={href.startsWith("http") ? "_blank" : undefined}
      rel="noopener noreferrer"
      data-cursor="Open"
      className="flex items-center justify-between gap-3 rounded-lg border border-white/10 bg-white/[0.02] px-3 py-2.5 text-sm transition-all hover:border-[#22d3ee]/40 hover:bg-white/[0.04]"
    >
      <span className="flex items-center gap-3">
        <Icon className="h-4 w-4 text-[#B8C2CC]" />
        <span className="text-white/80">{label}</span>
      </span>
      <span className="truncate font-mono text-[11px] text-[#B8C2CC]">{value}</span>
    </a>
  );
}

// =========================================================================
// Communication Uplink
// =========================================================================

type FormState = "idle" | "sending" | "success" | "error";

interface FormData {
  name: string;
  email: string;
  message: string;
}

export function CommunicationUplink() {
  const [form, setForm] = useState<FormData>({ name: "", email: "", message: "" });
  const [state, setState] = useState<FormState>("idle");
  const [honeypot, setHoneypot] = useState("");

  const validate = (): string | null => {
    if (!form.name.trim()) return "Name is required.";
    if (!/^\S+@\S+\.\S+$/.test(form.email)) return "A valid email is required.";
    if (form.message.trim().length < 10) return "Please write a message longer than 10 characters.";
    if (honeypot) return "Submission rejected.";
    return null;
  };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const err = validate();
    if (err) {
      setState("error");
      return;
    }

    // Opens mail client - does NOT pretend to send directly
    const subject = encodeURIComponent(`Portfolio contact from ${form.name}`);
    const body = encodeURIComponent(
      `From: ${form.name} <${form.email}>\n\n${form.message}`
    );
    window.location.href = `mailto:${portfolio.contact.recipient}?subject=${subject}&body=${body}`;

    setState("success");
  };

  return (
    <section
      id="contact"
      className="relative mx-auto w-full max-w-5xl px-4 py-20 sm:px-6 sm:py-24 lg:px-0"
      aria-label="Communication uplink"
    >
      <SectionHeader
        kicker="08 · Communication Uplink"
        title="Open a channel."
        description="Email is the most reliable way to reach me. The form below opens your mail client with your message ready to send."
      />

      <div className="mt-10 grid gap-6 lg:mt-12 lg:grid-cols-[1fr_1.2fr] lg:gap-8">
        {/* Status panel */}
        <div className="panel relative overflow-hidden p-5 sm:p-6">
          <div className="flex items-center gap-3">
            <span className="relative flex h-3 w-3">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#10b981] opacity-75" />
              <span className="relative inline-flex h-3 w-3 rounded-full bg-[#10b981]" />
            </span>
            <span className="font-mono text-[11px] uppercase tracking-[0.3em] text-[#10b981]">
              Uplink active
            </span>
          </div>

          <h3 className="mt-4 font-display text-xl font-semibold sm:text-2xl">
            {portfolio.availability.label}
          </h3>
          <p className="mt-2 text-sm text-[#B8C2CC]">
            Best response time within 24-48 hours.
          </p>

          <div className="mt-6 space-y-2">
            <ChannelRow Icon={Mail} label="Email" value={portfolio.email} href={`mailto:${portfolio.email}`} />
            <ChannelRow Icon={GitHubIcon} label="GitHub" value={`@${portfolio.social.github.username}`} href={portfolio.social.github.url} />
            {portfolio.social.linkedin.url && (
              <ChannelRow Icon={LinkedInIcon} label="LinkedIn" value={portfolio.social.linkedin.username || "Profile"} href={portfolio.social.linkedin.url} />
            )}
          </div>

          <div className="mt-6 rounded-lg border border-white/10 bg-white/[0.02] p-4">
            <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-[#7D8590]">
              Response window
            </p>
            <p className="mt-1 font-mono text-sm text-white">
              IST · 10:00 - 20:00 · Mon-Fri
            </p>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={submit} className="panel p-5 sm:p-6" noValidate>
          <div className="space-y-4">
            <FormField
              id="contact-name"
              label="Name"
              value={form.name}
              onChange={(v) => setForm({ ...form, name: v })}
              placeholder="Your name"
              disabled={state === "sending"}
            />
            <FormField
              id="contact-email"
              label="Email"
              type="email"
              value={form.email}
              onChange={(v) => setForm({ ...form, email: v })}
              placeholder="you@example.com"
              disabled={state === "sending"}
            />
            <FormField
              id="contact-message"
              label="Message"
              textarea
              value={form.message}
              onChange={(v) => setForm({ ...form, message: v })}
              placeholder="Tell me about your TechStack challenge…"
              disabled={state === "sending"}
            />

            {/* Honeypot */}
            <input
              type="text"
              name="website"
              value={honeypot}
              onChange={(e) => setHoneypot(e.target.value)}
              tabIndex={-1}
              autoComplete="off"
              aria-hidden
              className="absolute -left-[9999px] h-px w-px overflow-hidden"
            />
          </div>

          <div className="mt-6 flex flex-col items-start gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div role="status" aria-live="polite">
              {state === "success" && (
                <span className="inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-[#10b981]">
                  <Check className="h-3 w-3" />
                  Mail client opened
                </span>
              )}
              {state === "error" && (
                <span className="inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-[#f43f5e]">
                  <AlertCircle className="h-3 w-3" />
                  Please check the form
                </span>
              )}
            </div>
            <button
              type="submit"
              disabled={state === "sending"}
              data-cursor="Send"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-medium text-[#070B12] transition-all hover:bg-[#22d3ee]/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#22d3ee]/60 disabled:opacity-50"
            >
              <Send className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              Open mail client
            </button>
          </div>

          <p className="mt-4 text-xs text-[#7D8590]">
            This form opens your mail client with your message - it does not pretend to send a message directly.
          </p>
        </form>
      </div>
    </section>
  );
}

function FormField({
  id,
  label,
  value,
  onChange,
  placeholder,
  type = "text",
  textarea,
  disabled,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  type?: string;
  textarea?: boolean;
  disabled?: boolean;
}) {
  const cls =
    "w-full rounded-lg border border-white/10 bg-[#070B12]/40 px-4 py-3 text-sm text-white placeholder-[#7D8590] transition-all focus:border-[#22d3ee]/60 focus:bg-[#0C121D]/80 focus:outline-none disabled:opacity-50";
  return (
    <div>
      <label htmlFor={id} className="font-mono text-[10px] uppercase tracking-[0.25em] text-[#B8C2CC]">
        {label}
      </label>
      {textarea ? (
        <textarea
          id={id}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          rows={5}
          disabled={disabled}
          className={cn(cls, "mt-1.5 resize-y")}
        />
      ) : (
        <input
          id={id}
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          disabled={disabled}
          className={cn(cls, "mt-1.5")}
        />
      )}
    </div>
  );
}
