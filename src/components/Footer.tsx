import { profile } from '../data/portfolio';

export const Footer = () => {
  const year = new Date().getFullYear();
  return (
    <footer className="bg-ink">
      <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-3 px-6 py-8 font-mono text-2xs text-slate sm:flex-row">
        <span>
          © {year} {profile.name}. Built with React &amp; Tailwind CSS.
        </span>
        <span className="flex items-center gap-1.5">
          <span className="h-1.5 w-1.5 rounded-full bg-copper" />
          status: open to work
        </span>
      </div>
    </footer>
  );
};
