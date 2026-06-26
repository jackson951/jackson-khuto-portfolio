import { useEffect, useState } from 'react';
import { Mail, Menu, X } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './BrandIcons';
import { profile } from '../data/portfolio';

const routes = [
  { label: 'about', href: '#about' },
  { label: 'experience', href: '#experience' },
  { label: 'stack', href: '#stack' },
  { label: 'work', href: '#work' },
  { label: 'contact', href: '#contact' },
];

export const Header = () => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 transition-colors ${
        scrolled ? 'bg-ink/90 backdrop-blur-md border-b border-line' : 'bg-transparent'
      }`}
    >
      <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
        <a href="#top" className="font-mono text-sm font-semibold tracking-tight text-paper">
          jackson<span className="text-copper">.</span>khuto
        </a>

        <nav className="hidden items-center gap-8 md:flex">
          {routes.map((r) => (
            <a
              key={r.href}
              href={r.href}
              className="font-mono text-xs text-muted transition-colors hover:text-copper"
            >
              /{r.label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-4 md:flex">
          <a
            href={profile.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="text-muted transition-colors hover:text-paper"
          >
            <GithubIcon size={18} />
          </a>
          <a
            href={profile.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="text-muted transition-colors hover:text-paper"
          >
            <LinkedinIcon size={18} />
          </a>
          <a
            href={`mailto:${profile.email}`}
            aria-label="Email"
            className="text-muted transition-colors hover:text-paper"
          >
            <Mail size={18} />
          </a>
        </div>

        <button
          className="text-paper md:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? 'Close menu' : 'Open menu'}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {open && (
        <div className="border-t border-line bg-ink px-6 py-4 md:hidden">
          <nav className="flex flex-col gap-4">
            {routes.map((r) => (
              <a
                key={r.href}
                href={r.href}
                onClick={() => setOpen(false)}
                className="font-mono text-sm text-muted hover:text-copper"
              >
                /{r.label}
              </a>
            ))}
          </nav>
          <div className="mt-4 flex items-center gap-5 border-t border-line pt-4">
            <a href={profile.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="text-muted hover:text-paper">
              <GithubIcon size={18} />
            </a>
            <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="text-muted hover:text-paper">
              <LinkedinIcon size={18} />
            </a>
            <a href={`mailto:${profile.email}`} aria-label="Email" className="text-muted hover:text-paper">
              <Mail size={18} />
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
