import { useEffect, useState } from 'react';
import { Download, Mail, Menu, X } from 'lucide-react';
import { profile } from '../data/portfolio';

interface NavItem {
  label: string;
  path: string;
}

interface HeaderProps {
  currentPath: string;
  navItems: NavItem[];
  onNavigate: (path: string) => void;
}

export const Header = ({ currentPath, navItems, onNavigate }: HeaderProps) => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const go = (path: string) => {
    setOpen(false);
    onNavigate(path);
  };

  return (
    <header className={`sticky top-0 z-50 border-b transition-colors ${scrolled || open ? 'border-line bg-ink/90 backdrop-blur-md' : 'border-transparent bg-ink/70 backdrop-blur-sm'}`}>
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-5 px-6 py-4">
        <button type="button" onClick={() => go('/')} className="font-mono text-sm font-semibold text-paper">
          jackson<span className="text-copper">.</span>khuto
        </button>

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Primary navigation">
          {navItems.map((item) => {
            const active = currentPath === item.path || (item.path === '/projects' && currentPath.startsWith('/projects/'));
            return (
              <button
                key={item.path}
                type="button"
                onClick={() => go(item.path)}
                className={`rounded-md px-3 py-2 font-mono text-xs transition-colors ${
                  active ? 'bg-panel text-copper' : 'text-muted hover:bg-panel/70 hover:text-paper'
                }`}
                aria-current={active ? 'page' : undefined}
              >
                {item.label}
              </button>
            );
          })}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <a href="/Jackson-Khuto-CV.pdf" download className="inline-flex items-center gap-2 rounded-md border border-line px-3 py-2 font-mono text-xs text-paper transition-colors hover:border-copper hover:text-copper">
            <Download size={15} />
            CV
          </a>
          <a href={`mailto:${profile.email}`} className="inline-flex items-center gap-2 rounded-md bg-copper px-3 py-2 font-mono text-xs font-medium text-ink transition-colors hover:bg-copper-bright">
            <Mail size={15} />
            Contact
          </a>
        </div>

        <button type="button" className="text-paper lg:hidden" onClick={() => setOpen((value) => !value)} aria-label={open ? 'Close menu' : 'Open menu'} aria-expanded={open}>
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      <div className={`overflow-hidden border-t border-line bg-ink transition-[max-height,opacity] duration-300 lg:hidden ${open ? 'max-h-[38rem] opacity-100' : 'max-h-0 opacity-0'}`}>
        <nav className="grid gap-1 px-6 py-5" aria-label="Mobile navigation">
          {navItems.map((item) => {
            const active = currentPath === item.path || (item.path === '/projects' && currentPath.startsWith('/projects/'));
            return (
              <button
                key={item.path}
                type="button"
                onClick={() => go(item.path)}
                className={`rounded-md px-3 py-3 text-left font-mono text-sm transition-colors ${
                  active ? 'bg-panel text-copper' : 'text-muted hover:bg-panel hover:text-paper'
                }`}
                aria-current={active ? 'page' : undefined}
              >
                {item.label}
              </button>
            );
          })}
          <a href="/Jackson-Khuto-CV.pdf" download className="mt-3 inline-flex items-center justify-center gap-2 rounded-md border border-line px-3 py-3 font-mono text-sm text-paper transition-colors hover:border-copper hover:text-copper">
            <Download size={16} />
            Download CV
          </a>
        </nav>
      </div>
    </header>
  );
};
