import { profile } from '../data/portfolio';

export const Footer = ({ onNavigate }: { onNavigate?: (path: string) => void }) => {
  const year = new Date().getFullYear();
  const go = (path: string) => {
    if (onNavigate) {
      onNavigate(path);
    }
  };

  return (
    <footer className="bg-ink">
      <div className="mx-auto flex max-w-6xl flex-col gap-5 px-6 py-8 font-mono text-2xs text-slate sm:flex-row sm:items-center sm:justify-between">
        <span>
          © {year} {profile.name}. Built with React &amp; Tailwind CSS.
        </span>
        <div className="flex flex-wrap items-center gap-4">
          {['/projects', '/skills', '/contact'].map((path) => (
            <button key={path} type="button" onClick={() => go(path)} className="transition-colors hover:text-copper">
              {path}
            </button>
          ))}
          <span className="flex items-center gap-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-copper" />
            v2.0
          </span>
        </div>
      </div>
    </footer>
  );
};
