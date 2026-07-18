import { useEffect } from 'react';

export default function CustomCursor() {
  useEffect(() => {
    const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)');
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (!finePointer.matches || reducedMotion.matches) return;

    const dot = document.createElement('div');
    const ring = document.createElement('div');
    const label = document.createElement('span');
    dot.className = 'cursor-dot';
    ring.className = 'cursor-ring';
    label.className = 'cursor-label';
    dot.setAttribute('aria-hidden', 'true');
    ring.setAttribute('aria-hidden', 'true');
    label.setAttribute('aria-hidden', 'true');
    document.body.append(dot, ring, label);

    let targetX = window.innerWidth / 2;
    let targetY = window.innerHeight / 2;
    let ringX = targetX;
    let ringY = targetY;
    let frame = 0;

    const handleMove = (event: MouseEvent) => {
      targetX = event.clientX;
      targetY = event.clientY;
      dot.style.transform = `translate3d(${targetX}px, ${targetY}px, 0) translate(-50%, -50%)`;

      const target = (event.target as HTMLElement | null)?.closest<HTMLElement>('a, button, [data-cursor]');
      const text = target?.dataset.cursor || '';
      ring.classList.toggle('is-active', Boolean(target));
      label.classList.toggle('is-visible', Boolean(text));
      label.textContent = text;
    };

    const handleClick = (event: MouseEvent) => {
      const ripple = document.createElement('span');
      ripple.className = 'cursor-ripple';
      ripple.setAttribute('aria-hidden', 'true');
      ripple.style.left = `${event.clientX}px`;
      ripple.style.top = `${event.clientY}px`;
      document.body.appendChild(ripple);
      ripple.addEventListener('animationend', () => ripple.remove(), { once: true });
    };

    const animate = () => {
      ringX += (targetX - ringX) * 0.18;
      ringY += (targetY - ringY) * 0.18;
      ring.style.transform = `translate3d(${ringX}px, ${ringY}px, 0) translate(-50%, -50%)`;
      label.style.transform = `translate3d(${ringX + 20}px, ${ringY + 20}px, 0)`;
      frame = requestAnimationFrame(animate);
    };

    window.addEventListener('mousemove', handleMove, { passive: true });
    window.addEventListener('click', handleClick);
    frame = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', handleMove);
      window.removeEventListener('click', handleClick);
      cancelAnimationFrame(frame);
      dot.remove();
      ring.remove();
      label.remove();
      document.querySelectorAll('.cursor-ripple').forEach((element) => element.remove());
    };
  }, []);

  return null;
}
