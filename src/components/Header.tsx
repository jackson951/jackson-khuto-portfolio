import { useEffect, useState } from 'react';
import { Command, Download, Mail, Menu, X } from 'lucide-react';
import { Link } from './Link';

interface NavItem {
  label: string;
  path: string;
}

interface HeaderProps {
  currentPath: string;
  navItems: NavItem[];
  onOpenPalette: () => void;
}

const isActive = (currentPath: string, path: string) =>
  currentPath === path || (path === '/projects' && currentPath.startsWith('/projects/'));

export const Header = ({ currentPath, navItems, onOpenPalette }: HeaderProps) => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 8);
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(max > 0 ? Math.min(1, window.scrollY / max) : 0);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [currentPath]);

  useEffect(() => setOpen(false), [currentPath]);

  return (
    <header className={`sticky top-0 z-50 border-b transition-colors ${scrolled || open ? 'border-line bg-ink/85 backdrop-blur-md' : 'border-transparent bg-ink/60 backdrop-blur-sm'}`}>
      <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-3 focus:rounded focus:bg-copper focus:px-3 focus:py-2 focus:font-mono focus:text-xs focus:text-ink">
        Skip to content
      </a>
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-5 px-6 py-4">
        <Link to="/" className="font-mono text-sm font-semibold text-paper" aria-label="Jackson Khuto, home">
          jackson<span className="text-copper">.</span>khuto
        </Link>

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Primary">
          {navItems.map((item) => {
            const active = isActive(currentPath, item.path);
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`rounded-md px-3 py-2 font-mono text-xs transition-colors ${active ? 'bg-panel text-copper' : 'text-muted hover:bg-panel/70 hover:text-paper'}`}
                aria-current={active ? 'page' : undefined}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
          <button
            type="button"
            onClick={onOpenPalette}
            className="inline-flex items-center gap-1.5 rounded-md border border-line px-2.5 py-2 font-mono text-xs text-muted transition-colors hover:border-copper hover:text-copper"
            aria-label="Open command palette"
            title="Command palette (Ctrl/⌘ + K)"
          >
            <Command size={14} />
            <span className="hidden sm:inline">K</span>
          </button>
          <a href="/Jackson-Khuto-CV.pdf" download className="hidden items-center gap-2 rounded-md border border-line px-3 py-2 font-mono text-xs text-paper transition-colors hover:border-copper hover:text-copper md:inline-flex">
            <Download size={15} />
            CV
          </a>
          <Link to="/contact" className="hidden items-center gap-2 rounded-md bg-copper px-3 py-2 font-mono text-xs font-medium text-ink transition-colors hover:bg-copper-bright md:inline-flex">
            <Mail size={15} />
            Contact
          </Link>
          <button type="button" className="p-1 text-paper lg:hidden" onClick={() => setOpen((value) => !value)} aria-label={open ? 'Close menu' : 'Open menu'} aria-expanded={open} aria-controls="mobile-nav">
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      <div id="mobile-nav" className={`overflow-hidden border-t border-line bg-ink transition-[max-height,opacity] duration-300 lg:hidden ${open ? 'max-h-[38rem] opacity-100' : 'pointer-events-none max-h-0 border-transparent opacity-0'}`} inert={!open}>
        <nav className="grid gap-1 px-6 py-5" aria-label="Mobile">
          {navItems.map((item) => {
            const active = isActive(currentPath, item.path);
            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setOpen(false)}
                className={`rounded-md px-3 py-3 font-mono text-sm transition-colors ${active ? 'bg-panel text-copper' : 'text-muted hover:bg-panel hover:text-paper'}`}
                aria-current={active ? 'page' : undefined}
              >
                {item.label}
              </Link>
            );
          })}
          <a href="/Jackson-Khuto-CV.pdf" download className="mt-3 inline-flex items-center justify-center gap-2 rounded-md border border-line px-3 py-3 font-mono text-sm text-paper transition-colors hover:border-copper hover:text-copper">
            <Download size={16} />
            Download CV
          </a>
        </nav>
      </div>

      <div aria-hidden="true" className="absolute inset-x-0 bottom-[-1px] h-px origin-left bg-copper/80" style={{ transform: `scaleX(${progress})` }} />
    </header>
  );
};
