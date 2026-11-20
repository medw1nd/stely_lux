import { motion, type HTMLMotionProps } from 'framer-motion';
import type { ReactNode } from 'react';

export const EASE = [0.22, 0.8, 0.2, 1] as const;

export const scrollToId = (id: string) => {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
};

/** Fade-and-rise when the element scrolls into view. */
export function Reveal({ children, delay = 0, y = 34, ...rest }: { children: ReactNode; delay?: number; y?: number } & HTMLMotionProps<'div'>) {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 1.1, ease: EASE, delay }}
      {...rest}
    >
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
