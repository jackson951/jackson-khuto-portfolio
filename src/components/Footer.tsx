import { profile } from '../data/portfolio';
import { GithubIcon, LinkedinIcon } from './BrandIcons';
import { Link } from './Link';

export const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-ink">
      <div className="mx-auto flex max-w-6xl flex-col gap-5 px-6 py-8 font-mono text-2xs text-slate sm:flex-row sm:items-center sm:justify-between">
        <span>
          © {year} {profile.name}. Designed &amp; built with React, TypeScript &amp; Tailwind.
        </span>
        <div className="flex flex-wrap items-center gap-4">
          {['/projects', '/skills', '/contact'].map((path) => (
            <Link key={path} to={path} className="transition-colors hover:text-copper">
              {path}
            </Link>
          ))}
          <a href={profile.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="transition-colors hover:text-copper">
            <GithubIcon size={15} />
          </a>
          <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="transition-colors hover:text-copper">
            <LinkedinIcon size={15} />
          </a>
          <span className="hidden items-center gap-1.5 sm:flex">
            <kbd className="rounded border border-line px-1 py-px">⌘K</kbd> to navigate
          </span>
        </div>
      </div>
    </footer>
  );
};
