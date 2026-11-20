import { useEffect, useRef, useState, type PointerEvent as RPointerEvent, type ReactNode } from 'react';
import { animate, motion, useInView, useMotionValue, useSpring, useTransform, type MotionValue } from 'framer-motion';
import { useEnter } from './ui';

const reduced = () => typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const finePointer = () => typeof window !== 'undefined' && window.matchMedia('(hover: hover) and (pointer: fine)').matches;

/** Counts the numeric part of a label (e.g. "5+", "100") up from 0 when it scrolls into view. */
export function CountUp({ value, duration = 1.8 }: { value: string; duration?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { margin: '-40px' });
  const match = value.match(/^(\d+)(.*)$/);
  const target = match ? +match[1] : 0;
  const [n, setN] = useState(match && !reduced() ? 0 : target);

  useEffect(() => {
    if (!match || reduced()) return;
    if (!inView) { setN(0); return; }
    const c = animate(0, target, { duration, ease: [0.22, 0.8, 0.2, 1], onUpdate: v => setN(Math.round(v)) });
    return c.stop;
  }, [inView]);

  return <span ref={ref}>{match ? `${n}${match[2]}` : value}</span>;
}

/** Soft warm light that follows the cursor across the page (desktop only). */
export function CursorLight() {
  const x = useMotionValue(-400);
  const y = useMotionValue(-400);
  const sx = useSpring(x, { stiffness: 120, damping: 22, mass: .6 });
  const sy = useSpring(y, { stiffness: 120, damping: 22, mass: .6 });
  const [on, setOn] = useState(false);

  useEffect(() => {
    if (!finePointer() || reduced()) return;
    setOn(true);
    const move = (e: PointerEvent) => { x.set(e.clientX); y.set(e.clientY); };
    window.addEventListener('pointermove', move, { passive: true });
    return () => window.removeEventListener('pointermove', move);
  }, []);

  if (!on) return null;
  return <motion.div className="cursor-light" style={{ x: sx, y: sy }} aria-hidden="true" />;
}

/** Element that leans gently toward the cursor. */
export function Magnetic({ children, strength = .28, className }: { children: ReactNode; strength?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useSpring(0, { stiffness: 220, damping: 16 });
  const y = useSpring(0, { stiffness: 220, damping: 16 });

  const onMove = (e: RPointerEvent) => {
    if (!finePointer() || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    x.set((e.clientX - (r.left + r.width / 2)) * strength);
    y.set((e.clientY - (r.top + r.height / 2)) * strength);
  };
  const reset = () => { x.set(0); y.set(0); };

  return (
    <motion.div ref={ref} className={`magnetic ${className ?? ''}`} style={{ x, y }} onPointerMove={onMove} onPointerLeave={reset}>
      {children}
    </motion.div>
  );
}

/** 3D tilt + moving glare on hover. Pass-through wrapper for gallery tiles. */
export function useTilt(max = 7) {
  const rx = useSpring(0, { stiffness: 180, damping: 18 });
  const ry = useSpring(0, { stiffness: 180, damping: 18 });
  const gx = useMotionValue(50);
  const gy = useMotionValue(50);
  const glare = useTransform([gx, gy], ([a, b]) => `radial-gradient(circle at ${a}% ${b}%, rgba(255,244,214,.22), transparent 55%)`);

  const onPointerMove = (e: RPointerEvent<HTMLElement>) => {
    if (!finePointer()) return;
    const r = e.currentTarget.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top) / r.height;
    ry.set((px - .5) * max * 2);
    rx.set(-(py - .5) * max * 2);
    gx.set(px * 100); gy.set(py * 100);
  };
  const onPointerLeave = () => { rx.set(0); ry.set(0); };

  return { style: { rotateX: rx, rotateY: ry, transformPerspective: 900 }, glare, handlers: { onPointerMove, onPointerLeave } };
}

/** One word of a scroll-linked heading. */
function Word({ p, range, children }: { key?: number; p: MotionValue<number>; range: [number, number]; children: ReactNode }) {
  const y = useTransform(p, range, ['110%', '0%']);
  const o = useTransform(p, range, [0, 1]);
  return (
    <>
      <span className="word-mask"><motion.span style={{ display: 'inline-block', y, opacity: o }}>{children}</motion.span></span>{' '}
    </>
  );
}

/** Heading whose words rise one by one as you scroll down — and sink back when you scroll up. */
export function WordsReveal({ text, em = [], className, as: Tag = 'h2' }: { text: string; em?: string[]; className?: string; as?: 'h2' | 'p' }) {
  const ref = useRef<HTMLHeadingElement>(null);
  const p = useEnter(ref, '98%', '55%');
  const lines = text.split('\n').map(l => l.split(' '));
  const total = lines.flat().length;
  const step = .55 / Math.max(total - 1, 1);
  let i = 0;
  const content = lines.map((words, li) => (
    <span key={li} style={{ display: 'block' }}>
      {words.map((w, wi) => {
        const idx = i++;
        return <Word key={wi} p={p} range={[idx * step, idx * step + .45]}>{em.includes(w) ? <em className="gold-text">{w}</em> : w}</Word>;
      })}
    </span>
  ));
  return Tag === 'h2'
    ? <h2 ref={ref} className={className}>{content}</h2>
    : <p ref={ref as never} className={className}>{content}</p>;
}
