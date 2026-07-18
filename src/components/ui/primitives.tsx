import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
  type MouseEvent as ReactMouseEvent,
} from "react";
import {
  motion,
  useInView,
  useMotionValue,
  useReducedMotion,
  useSpring,
  type Variants,
  type Transition,
} from "framer-motion";
import { cn } from "@/lib/utils";

// =========================================================================
// ReducedMotionProvider
// =========================================================================

interface ReducedMotionCtx {
  reduce: boolean;
}

const ReducedMotionContext = createContext<ReducedMotionCtx>({ reduce: false });

export function ReducedMotionProvider({ children }: { children: ReactNode }) {
  const reduce = useReducedMotion() ?? false;
  return (
    <ReducedMotionContext.Provider value={{ reduce }}>
      {children}
    </ReducedMotionContext.Provider>
  );
}

export function useReducedMotionContext() {
  return useContext(ReducedMotionContext);
}

// =========================================================================
// AnimatedSection
// =========================================================================

export interface AnimatedSectionProps {
  children: ReactNode;
  className?: string;
  id?: string;
  delay?: number;
  as?: "section" | "div" | "article";
}

export function AnimatedSection({
  children,
  className,
  id,
  delay = 0,
  as: Tag = "section",
}: AnimatedSectionProps) {
  const ref = useRef<HTMLElement | null>(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px -10% 0px" });
  const { reduce } = useReducedMotionContext();

  const variants: Variants = {
    hidden:  reduce ? { opacity: 1 } : { opacity: 0, y: 24, filter: "blur(10px)" },
    visible: reduce
      ? { opacity: 1 }
      : {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1], delay },
        },
  };

  return (
    <motion.div
      ref={ref as never}
      id={id}
      className={className}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={variants}
    >
      {/* @ts-ignore polymorphic tag */}
      <Tag>{children}</Tag>
    </motion.div>
  );
}

// =========================================================================
// MagneticButton
// =========================================================================

interface MagneticButtonProps {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: "primary" | "secondary" | "ghost";
  className?: string;
  disabled?: boolean;
  type?: "button" | "submit";
  "aria-label"?: string;
}

export function MagneticButton({
  children,
  href,
  onClick,
  variant = "primary",
  className,
  disabled,
  type = "button",
  ...rest
}: MagneticButtonProps) {
  const ref = useRef<HTMLButtonElement | HTMLAnchorElement | null>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 180, damping: 18 });
  const springY = useSpring(y, { stiffness: 180, damping: 18 });
  const { reduce } = useReducedMotionContext();

  const onMove = (e: ReactMouseEvent<HTMLElement>) => {
    if (reduce) return;
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const mx = e.clientX - (rect.left + rect.width / 2);
    const my = e.clientY - (rect.top + rect.height / 2);
    x.set(mx * 0.18);
    y.set(my * 0.18);
  };

  const onLeave = () => {
    x.set(0);
    y.set(0);
  };

  const base =
    "group relative inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 font-medium text-sm transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#22d3ee]/60 disabled:opacity-40 disabled:pointer-events-none";

  const variants: Record<string, string> = {
    primary:
      "bg-white text-[#070B12] hover:bg-[#22d3ee]/90 shadow-[0_0_0_1px_rgba(255,255,255,0.1),0_10px_40px_-10px_rgba(34,211,238,0.4)]",
    secondary:
      "border border-white/15 text-white hover:border-[#22d3ee]/60 hover:bg-white/5",
    ghost:
      "text-white/80 hover:text-white hover:bg-white/5",
  };

  const content = (
    <>
      <span className="relative z-10">{children}</span>
      {/* Subtle border illumination on hover */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-full opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(200px circle at var(--mx,50%) var(--my,50%), rgba(34,211,238,0.25), transparent 40%)",
        }}
      />
    </>
  );

  const commonProps = {
    ref: ref as never,
    onMouseMove: onMove,
    onMouseLeave: onLeave,
    className: cn(base, variants[variant], className),
    ...rest,
  };

  const motionStyle = reduce ? undefined : { x: springX, y: springY };

  if (href) {
    return (
      <motion.a href={href} target="_blank" rel="noopener noreferrer" style={motionStyle} {...commonProps}>
        {content}
      </motion.a>
    );
  }

  return (
    <motion.button type={type} onClick={onClick} disabled={disabled} style={motionStyle} {...commonProps}>
      {content}
    </motion.button>
  );
}

// =========================================================================
// ScrollProgress - exposes scroll progress on document
// =========================================================================

export function ScrollProgress() {
  const { reduce } = useReducedMotionContext();

  useEffect(() => {
    if (reduce) return;
    const bar = document.createElement("div");
    bar.className = "sgr-scroll-progress";
    bar.setAttribute("aria-hidden", "true");
    bar.style.cssText = `
      position: fixed; top: 0; left: 0; height: 2px; width: 0%;
      background: linear-gradient(90deg, #22d3ee, #a855f7);
      z-index: 90; pointer-events: none; transition: width 80ms linear;
    `;
    document.body.appendChild(bar);

    const onScroll = () => {
      const h = document.documentElement;
      const max = h.scrollHeight - h.clientHeight;
      const pct = max > 0 ? (h.scrollTop / max) * 100 : 0;
      bar.style.width = `${pct}%`;
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      bar.remove();
    };
  }, [reduce]);

  return null;
}

// =========================================================================
// CustomCursor
// =========================================================================

export function CustomCursor() {
  const { reduce } = useReducedMotionContext();
  const [label, setLabel] = useState<string>("");
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    if (reduce) return;
    const mq = window.matchMedia("(hover: hover) and (pointer: fine)");
    if (!mq.matches) return;

    document.body.classList.add("custom-cursor");

    const dot = document.createElement("div");
    const ring = document.createElement("div");
    const text = document.createElement("span");

    dot.setAttribute("aria-hidden", "true");
    ring.setAttribute("aria-hidden", "true");
    text.setAttribute("aria-hidden", "true");

    dot.style.cssText = `
      position: fixed; top: 0; left: 0; width: 6px; height: 6px;
      background: #22d3ee; border-radius: 50%;
      transform: translate(-50%, -50%); pointer-events: none; z-index: 9999;
      mix-blend-mode: screen;
      transition: transform 120ms ease, opacity 120ms ease;
    `;
    ring.style.cssText = `
      position: fixed; top: 0; left: 0; width: 28px; height: 28px;
      border: 1px solid rgba(34, 211, 238, 0.55);
      border-radius: 50%;
      transform: translate(-50%, -50%); pointer-events: none; z-index: 9998;
      transition: width 180ms ease, height 180ms ease, border-color 180ms ease, opacity 180ms ease;
      backdrop-filter: blur(2px);
    `;
    text.style.cssText = `
      position: fixed; top: 0; left: 0;
      transform: translate(14px, 14px);
      font-family: ui-monospace, monospace;
      font-size: 10px; letter-spacing: 0.1em;
      color: #22d3ee; background: rgba(7,11,18,0.9);
      padding: 2px 6px; border-radius: 4px;
      border: 1px solid rgba(34,211,238,0.4);
      pointer-events: none; z-index: 10000;
      opacity: 0; transition: opacity 120ms ease;
      white-space: nowrap;
    `;

    document.body.appendChild(dot);
    document.body.appendChild(ring);
    document.body.appendChild(text);

    let targetX = window.innerWidth / 2;
    let targetY = window.innerHeight / 2;
    let ringX = targetX;
    let ringY = targetY;

    const onMove = (e: MouseEvent) => {
      targetX = e.clientX;
      targetY = e.clientY;
      dot.style.transform = `translate(${targetX}px, ${targetY}px) translate(-50%, -50%)`;

      const target = e.target as HTMLElement | null;
      const cursorTarget = target?.closest<HTMLElement>("[data-cursor]");
      if (cursorTarget) {
        const labelAttr = cursorTarget.getAttribute("data-cursor");
        setLabel(labelAttr || "");
        setExpanded(true);
        ring.style.width = "56px";
        ring.style.height = "56px";
        ring.style.borderColor = "rgba(168, 85, 247, 0.8)";
      } else {
        setLabel("");
        setExpanded(false);
        ring.style.width = "28px";
        ring.style.height = "28px";
        ring.style.borderColor = "rgba(34, 211, 238, 0.55)";
      }
    };

    const onDown = () => {
      dot.style.transform += " scale(0.6)";
    };
    const onUp = () => {
      dot.style.transform = `translate(${targetX}px, ${targetY}px) translate(-50%, -50%)`;
    };

    let raf = 0;
    const tick = () => {
      ringX += (targetX - ringX) * 0.18;
      ringY += (targetY - ringY) * 0.18;
      ring.style.transform = `translate(${ringX}px, ${ringY}px) translate(-50%, -50%)`;
      text.style.transform = `translate(${ringX + 22}px, ${ringY + 22}px)`;
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup", onUp);

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
      cancelAnimationFrame(raf);
      document.body.classList.remove("custom-cursor");
      dot.remove();
      ring.remove();
      text.remove();
    };
  }, [reduce]);

  // Render label overlay (React-controlled) - the element itself was created above,
  // so we just mirror the label into it via a side effect.
  useEffect(() => {
    const el = document.querySelector<HTMLSpanElement>("body > span[aria-hidden]");
    if (el) {
      el.textContent = label;
      el.style.opacity = expanded ? "1" : "0";
    }
  }, [label, expanded]);

  return null;
}

// =========================================================================
// Error / loading states
// =========================================================================

export function ErrorState({ title = "Something went wrong", message, retry }: {
  title?: string;
  message?: string;
  retry?: () => void;
}) {
  return (
    <div role="alert" className="panel p-8 text-center">
      <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-[#f43f5e]">
        {title}
      </p>
      {message && <p className="mt-2 text-sm text-[#B8C2CC]">{message}</p>}
      {retry && (
        <button
          onClick={retry}
          className="mt-4 rounded-full border border-white/15 px-4 py-1.5 text-xs text-white/80 hover:border-[#22d3ee]/60"
        >
          Retry
        </button>
      )}
    </div>
  );
}

export function LoadingSkeleton({ className }: { className?: string }) {
  return (
    <div
      aria-busy
      aria-label="Loading"
      className={cn(
        "animate-pulse rounded-lg bg-gradient-to-r from-white/5 via-white/10 to-white/5 bg-[length:200%_100%]",
        className
      )}
      style={{ animation: "pulse 1.8s ease-in-out infinite" }}
    />
  );
}

// =========================================================================
// Utility: useScrollSpy - tracks which section is in view.
// =========================================================================

export function useScrollSpy(ids: string[], offset = 100): string {
  const [active, setActive] = useState(ids[0]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActive(entry.target.id);
          }
        });
      },
      { rootMargin: `-${offset}px 0px -55% 0px`, threshold: 0 }
    );

    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [ids, offset]);

  return active;
}

// =========================================================================
// Local time indicator (used in side rail)
// =========================================================================

export function useLocalTime(timezone = "Asia/Kolkata") {
  const [time, setTime] = useState(() =>
    new Intl.DateTimeFormat("en-GB", {
      timeZone: timezone,
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    }).format(new Date())
  );

  useEffect(() => {
    const id = window.setInterval(() => {
      setTime(
        new Intl.DateTimeFormat("en-GB", {
          timeZone: timezone,
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
        }).format(new Date())
      );
    }, 30_000);
    return () => window.clearInterval(id);
  }, [timezone]);

  return time;
}

// =========================================================================
// Smooth transitions helper
// =========================================================================

export const premium: Transition = {
  duration: 0.8,
  ease: [0.22, 1, 0.36, 1],
};
