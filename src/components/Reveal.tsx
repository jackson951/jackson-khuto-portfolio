import { useEffect, useRef, useState, type ReactNode } from 'react';

/** Fades and lifts its children into view the first time they scroll on screen. */
export const Reveal = ({ children, delay = 0, className = '' }: { children: ReactNode; delay?: number; className?: string }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    if (!('IntersectionObserver' in window)) {
      setVisible(true);
      return;
    }

    let done = false;
    const show = () => {
      if (done) return;
      done = true;
      setVisible(true);
      observer.disconnect();
      window.removeEventListener('scroll', check);
    };
    // Anything at or above the viewport must be visible, even if a fast scroll
    // (or a jump) skipped past it without IntersectionObserver ever reporting it.
    const check = () => {
      if (node.getBoundingClientRect().top < window.innerHeight * 0.95) show();
    };
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting || entry.boundingClientRect.top < 0) show();
    });
    observer.observe(node);
    window.addEventListener('scroll', check, { passive: true });
    check();
    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', check);
    };
  }, []);

  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={`reveal transition-[opacity,transform] duration-700 ease-out-expo ${visible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'} ${className}`}
    >
      {children}
    </div>
  );
};
