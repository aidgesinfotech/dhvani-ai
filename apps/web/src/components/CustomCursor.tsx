import { useEffect, useRef, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

/**
 * Soft gold/blue spotlight + small round custom cursor.
 */
export function CustomCursor() {
  const reduce = useReducedMotion();
  const glowRef = useRef<HTMLDivElement>(null);
  const target = useRef({ x: -9999, y: -9999 });
  const current = useRef({ x: -9999, y: -9999 });
  const glowVisible = useRef(false);
  const raf = useRef(0);

  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [hover, setHover] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (reduce) return;
    const isFine = window.matchMedia('(pointer: fine)').matches;
    if (!isFine) return;

    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

    const tick = () => {
      current.current.x = lerp(current.current.x, target.current.x, 0.12);
      current.current.y = lerp(current.current.y, target.current.y, 0.12);

      const el = glowRef.current;
      if (el) {
        const { x, y } = current.current;
        el.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%)`;
        el.style.opacity = glowVisible.current ? '1' : '0';
      }
      raf.current = requestAnimationFrame(tick);
    };
    raf.current = requestAnimationFrame(tick);

    const onMove = (e: MouseEvent) => {
      target.current = { x: e.clientX, y: e.clientY };
      setPos({ x: e.clientX, y: e.clientY });
      setVisible(true);
      if (!glowVisible.current) {
        glowVisible.current = true;
        current.current = { x: e.clientX, y: e.clientY };
      }
    };
    const onOver = (e: MouseEvent) => {
      const t = e.target as HTMLElement | null;
      const interactive = t?.closest('a, button, input, textarea, select, [data-cursor="hover"]');
      setHover(Boolean(interactive));
    };
    const onLeave = () => {
      setVisible(false);
      glowVisible.current = false;
    };

    window.addEventListener('mousemove', onMove, { passive: true });
    window.addEventListener('mouseover', onOver);
    document.addEventListener('mouseleave', onLeave);

    return () => {
      cancelAnimationFrame(raf.current);
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseover', onOver);
      document.removeEventListener('mouseleave', onLeave);
    };
  }, [reduce]);

  if (reduce) return null;

  return (
    <>
      {/* Soft ambient glow */}
      <div
        ref={glowRef}
        className="pointer-events-none fixed top-0 left-0 z-[5] hidden md:block"
        aria-hidden
        style={{
          width: 'min(42vw, 28rem)',
          height: 'min(42vw, 28rem)',
          opacity: 0,
          willChange: 'transform, opacity',
          background:
            'radial-gradient(circle at center, rgba(209,169,8,0.07) 0%, rgba(55,24,200,0.06) 38%, rgba(55,24,200,0.02) 55%, transparent 70%)',
          transition: 'opacity 0.35s ease',
        }}
      />

      {/* Round cursor */}
      <motion.div
        className="pointer-events-none fixed top-0 left-0 z-[9999] hidden md:block"
        animate={{
          x: pos.x - (hover ? 18 : 6),
          y: pos.y - (hover ? 18 : 6),
          width: hover ? 36 : 12,
          height: hover ? 36 : 12,
          opacity: visible ? 1 : 0,
        }}
        transition={{ type: 'spring', stiffness: 500, damping: 28, mass: 0.4 }}
        style={{
          borderRadius: '9999px',
          border: '1px solid rgba(209,169,8,0.95)',
          background: hover ? 'rgba(209,169,8,0.12)' : 'rgba(209,169,8,0.9)',
        }}
      />
    </>
  );
}
