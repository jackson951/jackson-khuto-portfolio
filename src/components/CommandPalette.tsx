import { useEffect, useMemo, useRef, useState, type ReactNode } from 'react';
import { ArrowRight, Copy, CornerDownLeft, Download, FileText, Search } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './BrandIcons';
import { githubHandle, projects, site } from '../data/site';

interface Command {
  id: string;
  group: 'Pages' | 'Projects' | 'Actions';
  label: string;
  hint?: string;
  icon: ReactNode;
  run: () => void;
}

interface CommandPaletteProps {
  open: boolean;
  onClose: () => void;
  onNavigate: (path: string) => void;
  pages: { label: string; path: string }[];
}

export const CommandPalette = ({ open, onClose, onNavigate, pages }: CommandPaletteProps) => {
  const [query, setQuery] = useState('');
  const [active, setActive] = useState(0);
  const [toast, setToast] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLUListElement>(null);

  const commands = useMemo<Command[]>(() => {
    const go = (path: string) => () => {
      onNavigate(path);
      onClose();
    };
    return [
      ...pages.map((page) => ({
        id: `page:${page.path}`,
        group: 'Pages' as const,
        label: page.label,
        hint: page.path,
        icon: <FileText size={15} />,
        run: go(page.path),
      })),
      ...projects.map((project) => ({
        id: `project:${project.id}`,
        group: 'Projects' as const,
        label: project.name,
        hint: project.description,
        icon: <ArrowRight size={15} />,
        run: go(project.path),
      })),
      {
        id: 'copy-email',
        group: 'Actions',
        label: 'Copy email address',
        hint: site.email,
        icon: <Copy size={15} />,
        run: () => {
          navigator.clipboard?.writeText(site.email).then(
            () => setToast('Email copied to clipboard'),
            () => setToast(site.email),
          );
        },
      },
      {
        id: 'cv',
        group: 'Actions',
        label: 'Download CV',
        hint: 'PDF',
        icon: <Download size={15} />,
        run: () => {
          const link = document.createElement('a');
          link.href = site.cvPath;
          link.download = '';
          link.click();
          onClose();
        },
      },
      {
        id: 'github',
        group: 'Actions',
        label: 'Open GitHub',
        hint: githubHandle,
        icon: <GithubIcon size={15} />,
        run: () => {
          window.open(site.github, '_blank', 'noopener,noreferrer');
          onClose();
        },
      },
      {
        id: 'linkedin',
        group: 'Actions',
        label: 'Open LinkedIn',
        icon: <LinkedinIcon size={15} />,
        run: () => {
          window.open(site.linkedin, '_blank', 'noopener,noreferrer');
          onClose();
        },
      },
    ];
  }, [pages, onNavigate, onClose]);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return commands;
    return commands.filter((command) => `${command.label} ${command.hint ?? ''} ${command.group}`.toLowerCase().includes(q));
  }, [commands, query]);

  useEffect(() => {
    if (!open) return;
    setQuery('');
    setActive(0);
    setToast(null);
    const previous = document.activeElement as HTMLElement | null;
    const frame = requestAnimationFrame(() => inputRef.current?.focus());
    const overflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      cancelAnimationFrame(frame);
      document.body.style.overflow = overflow;
      previous?.focus?.();
    };
  }, [open]);

  useEffect(() => setActive(0), [query]);

  useEffect(() => {
    listRef.current?.querySelector<HTMLElement>(`[data-index="${active}"]`)?.scrollIntoView({ block: 'nearest' });
  }, [active]);

  if (!open) return null;

  const onKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'ArrowDown') {
      event.preventDefault();
      setActive((index) => (results.length ? (index + 1) % results.length : 0));
    } else if (event.key === 'ArrowUp') {
      event.preventDefault();
      setActive((index) => (results.length ? (index - 1 + results.length) % results.length : 0));
    } else if (event.key === 'Enter') {
      event.preventDefault();
      results[active]?.run();
    } else if (event.key === 'Escape') {
      event.preventDefault();
      onClose();
    } else if (event.key === 'Tab') {
      // Keep focus inside the dialog.
      event.preventDefault();
    }
  };

  let lastGroup: string | null = null;

  return (
    <div className="fixed inset-0 z-[100] flex items-start justify-center bg-black/60 px-4 pt-[12vh] backdrop-blur-sm animate-fade" onMouseDown={onClose}>
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Command palette"
        className="w-full max-w-xl overflow-hidden rounded-xl border border-line bg-panel shadow-2xl shadow-black/50 animate-pop"
        onMouseDown={(event) => event.stopPropagation()}
        onKeyDown={onKeyDown}
      >
        <div className="flex items-center gap-3 border-b border-line px-4">
          <Search size={16} className="shrink-0 text-slate" aria-hidden="true" />
          <input
            ref={inputRef}
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search pages, projects, actions…"
            className="w-full bg-transparent py-4 font-mono text-sm text-paper placeholder:text-slate focus:outline-none"
            role="combobox"
            aria-expanded="true"
            aria-controls="command-list"
            aria-activedescendant={results[active] ? `cmd-${results[active].id}` : undefined}
          />
          <kbd className="hidden shrink-0 rounded border border-line px-1.5 py-0.5 font-mono text-[10px] text-slate sm:block">ESC</kbd>
        </div>
        <ul ref={listRef} id="command-list" role="listbox" className="max-h-[50vh] overflow-y-auto p-2">
          {results.length === 0 && <li className="px-3 py-8 text-center font-mono text-xs text-slate">No results for “{query}”</li>}
          {results.map((command, index) => {
            const header = command.group !== lastGroup ? command.group : null;
            lastGroup = command.group;
            return (
              <li key={command.id} role="presentation">
                {header && <p className="px-3 pb-1.5 pt-3 font-mono text-[10px] uppercase tracking-[0.16em] text-slate">{header}</p>}
                <div
                  id={`cmd-${command.id}`}
                  role="option"
                  aria-selected={index === active}
                  data-index={index}
                  onMouseMove={() => setActive(index)}
                  onClick={() => command.run()}
                  className={`flex cursor-pointer items-center gap-3 rounded-md px-3 py-2.5 ${index === active ? 'bg-ink text-copper' : 'text-muted'}`}
                >
                  <span className="shrink-0">{command.icon}</span>
                  <span className="shrink-0 font-mono text-sm text-paper">{command.label}</span>
                  {command.hint && <span className="min-w-0 truncate font-mono text-xs text-slate">{command.hint}</span>}
                  {index === active && <CornerDownLeft size={14} className="ml-auto shrink-0" aria-hidden="true" />}
                </div>
              </li>
            );
          })}
        </ul>
        <div className="flex items-center justify-between border-t border-line px-4 py-2.5 font-mono text-[10px] text-slate">
          <span aria-live="polite">{toast ?? `${results.length} result${results.length === 1 ? '' : 's'}`}</span>
          <span className="hidden sm:inline">↑↓ navigate · ↵ select</span>
        </div>
      </div>
    </div>
  );
};
