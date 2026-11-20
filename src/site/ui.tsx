import { motion, useScroll, useSpring, useTransform, type HTMLMotionProps, type MotionValue } from 'framer-motion';
import { useRef, type ReactNode, type RefObject } from 'react';

export const EASE = [0.22, 0.8, 0.2, 1] as const;

export const scrollToId = (id: string) => {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
};

/**
 * Scroll-linked progress (0 → 1) of an element entering the viewport from below.
 * Tied to scroll position, so it plays forward when scrolling down and rewinds when scrolling up.
 */
export function useEnter(ref: RefObject<HTMLElement | null>, start = '96%', end = '62%'): MotionValue<number> {
  const { scrollYProgress } = useScroll({ target: ref, offset: [`start ${start}`, `start ${end}`] as never });
  return useSpring(scrollYProgress, { stiffness: 140, damping: 26, mass: .4 });
}

/** Maps a delay (in seconds, as used before) to a slice of the scroll range so siblings appear step by step. */
export const stepRange = (delay: number): [number, number] => {
  const a = Math.min(delay * 1.1, .55);
  return [a, Math.min(a + .7, 1)];
};

/** Rises and fades in with the scroll; rewinds when you scroll back up. */
export function Reveal({ children, delay = 0, y = 60, style, ...rest }: { children: ReactNode; delay?: number; y?: number } & HTMLMotionProps<'div'>) {
  const ref = useRef<HTMLDivElement>(null);
  const p = useEnter(ref);
  const [a, b] = stepRange(delay);
  const opacity = useTransform(p, [a, b], [0, 1]);
  const ty = useTransform(p, [a, b], [y, 0]);
  const blur = useTransform(p, [a, b], ['blur(6px)', 'blur(0px)']);
  return (
    <motion.div ref={ref} style={{ opacity, y: ty, filter: blur, ...(style as object) }} {...rest}>
      {children}
    </motion.div>
  );
}

/** Logo mark: a rounded ceiling contour with a single glowing light line inside. */
export function BrandMark({ className = 'brand-mark' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 40 40" fill="none" aria-hidden="true">
      <rect x="5" y="5" width="30" height="30" rx="7" stroke="currentColor" strokeOpacity=".55" strokeWidth="1.5" />
      <path className="bm-glow" d="M12 11.5h16" stroke="#f1dfb7" strokeWidth="6" strokeLinecap="round" opacity=".18" />
      <path className="bm-led" d="M12 11.5h16" stroke="#f1dfb7" strokeWidth="2.2" strokeLinecap="round" />
    </svg>
  );
}

export function Brand({ onClick }: { onClick?: () => void }) {
  return (
    <button className="brand" onClick={onClick} aria-label="Steli Lux — на початок сторінки">
      <BrandMark />
      <span className="brand-word"><b>steli<span>lux</span></b><small>натяжні стелі</small></span>
    </button>
  );
}

/** Hook form of Reveal for elements that are already motion components (cards, tiles). */
export function useReveal<T extends HTMLElement>(delay = 0, y = 70, scaleFrom = 1) {
  const ref = useRef<T>(null);
  const p = useEnter(ref);
  const [a, b] = stepRange(delay);
  const opacity = useTransform(p, [a, b], [0, 1]);
  const ty = useTransform(p, [a, b], [y, 0]);
  const scale = useTransform(p, [a, b], [scaleFrom, 1]);
  return { ref, style: { opacity, y: ty, scale } };
}
