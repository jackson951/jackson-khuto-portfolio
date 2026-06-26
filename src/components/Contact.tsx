import { Mail, Phone } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './BrandIcons';
import { profile } from '../data/portfolio';

export const Contact = () => {
  return (
    <section id="contact" className="border-b border-line bg-grid bg-grid">
      <div className="mx-auto max-w-5xl px-6 py-20 md:py-28">
        <div className="font-mono text-xs text-copper">/contact</div>

        <h2 className="mt-4 max-w-xl text-2xl font-semibold leading-snug text-paper sm:text-3xl">
          Open to new roles and good problems to solve.
        </h2>
        <p className="mt-4 max-w-lg font-mono text-sm text-muted">
          If you're hiring, or just want to talk about a system you're
          building, reach out — I usually reply within a day.
        </p>

        <div className="mt-10 flex flex-wrap gap-4">
          <a
            href={`mailto:${profile.email}`}
            className="inline-flex items-center gap-2 rounded-md bg-copper px-5 py-2.5 font-mono text-sm font-medium text-ink transition-transform hover:scale-[1.02] hover:bg-copper-bright"
          >
            <Mail size={16} />
            {profile.email}
          </a>
        </div>

        <div className="mt-10 flex flex-wrap gap-x-8 gap-y-3 font-mono text-sm text-muted">
          <a
            href={profile.github}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 transition-colors hover:text-copper"
          >
            <GithubIcon size={15} />
            github.com/jackson951
          </a>
          <a
            href={profile.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 transition-colors hover:text-copper"
          >
            <LinkedinIcon size={15} />
            linkedin.com/in/jackson-khuto
          </a>
          <span className="inline-flex items-center gap-2">
            <Phone size={15} />
            {profile.phone}
          </span>
        </div>
      </div>
    </section>
  );
};
