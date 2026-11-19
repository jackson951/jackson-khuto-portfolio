import { Download, Mail } from 'lucide-react';
import { githubHandle, site } from '../data/site';
import { GithubIcon, LinkedinIcon } from './BrandIcons';
import { Link } from './Link';
import { Logo } from './Logo';

export const Footer = () => {
  const year = new Date().getFullYear();
  const linkClass = 'inline-flex items-center gap-2 transition-colors hover:text-copper';

  return (
    <footer className="bg-ink">
      <div className="mx-auto grid max-w-6xl gap-8 px-6 py-10 md:grid-cols-[1.2fr_1fr] md:items-start">
        <div>
          <p className="font-mono text-sm font-semibold text-paper">
            <Logo />
          </p>
          <p className="mt-2 max-w-sm text-sm leading-6 text-muted">{site.tagline} Based in {site.location}.</p>
        </div>
        <ul className="grid gap-3 font-mono text-xs text-muted sm:grid-cols-2" aria-label="Contact and links">
          <li>
            <a href={`mailto:${site.email}`} className={`${linkClass} break-all`}>
              <Mail size={15} aria-hidden="true" /> {site.email}
            </a>
          </li>
          <li>
            <a href={site.github} target="_blank" rel="noopener noreferrer" className={linkClass}>
              <GithubIcon size={15} /> {githubHandle}
            </a>
          </li>
          <li>
            <a href={site.linkedin} target="_blank" rel="noopener noreferrer" className={linkClass}>
              <LinkedinIcon size={15} /> LinkedIn
            </a>
          </li>
          <li>
            <a href={site.cvPath} download className={linkClass}>
              <Download size={15} aria-hidden="true" /> Download CV (PDF)
            </a>
          </li>
        </ul>
      </div>
      <div className="border-t border-line">
        <div className="mx-auto flex max-w-6xl flex-col gap-3 px-6 py-5 font-mono text-2xs text-slate sm:flex-row sm:items-center sm:justify-between">
          <span>
            © {year} {site.name}
          </span>
          <nav className="flex flex-wrap gap-4" aria-label="Footer">
            {[
              ['/services', 'Services'],
              ['/projects', 'Projects'],
              ['/about', 'About'],
              ['/contact', 'Contact'],
            ].map(([path, label]) => (
              <Link key={path} to={path} className="transition-colors hover:text-copper">
                {label}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </footer>
  );
};
