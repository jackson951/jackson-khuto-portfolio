import { type FormEvent, useState } from 'react';
import { Mail, Phone, Send } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './BrandIcons';
import { profile } from '../data/portfolio';

export const Contact = () => {
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus('sending');

    const form = event.currentTarget;
    const formData = new FormData(form);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.get('name'),
          email: formData.get('email'),
          message: formData.get('message'),
        }),
      });

      if (!response.ok) {
        throw new Error('Email request failed');
      }

      form.reset();
      setStatus('sent');
    } catch {
      setStatus('error');
    }
  };

  return (
    <section id="contact" className="border-b border-line bg-grid bg-grid">
      <div className="mx-auto max-w-5xl px-6 py-20 md:py-28">
        <div className="font-mono text-xs text-copper">/contact</div>

        <h2 className="mt-4 max-w-xl text-2xl font-semibold leading-snug text-paper sm:text-3xl">
          Open to new roles and good problems to solve.
        </h2>
        <p className="mt-4 max-w-lg font-mono text-sm text-muted">
          If you're hiring, or just want to talk about a system you're
          building, reach out - I usually reply within a day.
        </p>

        <form onSubmit={handleSubmit} className="mt-10 grid max-w-2xl gap-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="grid gap-2 font-mono text-xs text-muted">
              Name
              <input
                name="name"
                type="text"
                autoComplete="name"
                required
                className="rounded-md border border-line bg-ink/70 px-4 py-3 font-sans text-sm text-paper transition-colors placeholder:text-muted/60 focus:border-copper focus:outline-none"
                placeholder="Your name"
              />
            </label>
            <label className="grid gap-2 font-mono text-xs text-muted">
              Email
              <input
                name="email"
                type="email"
                autoComplete="email"
                required
                className="rounded-md border border-line bg-ink/70 px-4 py-3 font-sans text-sm text-paper transition-colors placeholder:text-muted/60 focus:border-copper focus:outline-none"
                placeholder="you@example.com"
              />
            </label>
          </div>

          <label className="grid gap-2 font-mono text-xs text-muted">
            Message
            <textarea
              name="message"
              required
              rows={5}
              className="resize-none rounded-md border border-line bg-ink/70 px-4 py-3 font-sans text-sm leading-6 text-paper transition-colors placeholder:text-muted/60 focus:border-copper focus:outline-none"
              placeholder="Tell me what you are building or hiring for."
            />
          </label>

          <div className="flex flex-wrap items-center gap-4">
            <button
              type="submit"
              disabled={status === 'sending'}
              className="inline-flex items-center gap-2 rounded-md bg-copper px-5 py-2.5 font-mono text-sm font-medium text-ink transition-transform hover:scale-[1.02] hover:bg-copper-bright disabled:cursor-not-allowed disabled:opacity-70 disabled:hover:scale-100"
            >
              <Send size={16} />
              {status === 'sending' ? 'Sending...' : 'Send message'}
            </button>

            {status === 'sent' && (
              <p className="font-mono text-xs text-copper">
                Message sent. I will get back to you soon.
              </p>
            )}
            {status === 'error' && (
              <p className="font-mono text-xs text-muted">
                Something went wrong. You can still email me directly below.
              </p>
            )}
          </div>
        </form>

        <div className="mt-8 flex flex-wrap gap-4">
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
