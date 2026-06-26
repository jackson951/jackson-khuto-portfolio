import { profile, education } from '../data/portfolio';

const principles = [
  {
    title: 'Systems, not just features',
    body: 'I think about architecture, data integrity, and maintainability from the first line of code — not just whether a feature works today.',
  },
  {
    title: 'APIs as contracts',
    body: 'Whether the layer is ASP.NET Core, Spring Boot, or Express — I design APIs to be predictable, documented, and secure by default.',
  },
  {
    title: 'Full lifecycle ownership',
    body: 'Design, build, test, deploy, and maintain. Understanding what happens downstream changes how I write the code upstream.',
  },
];

export const About = () => {
  return (
    <section id="about" className="border-b border-line">
      <div className="mx-auto max-w-5xl px-6 py-20 md:py-28">
        <div className="font-mono text-xs text-copper">/about</div>

        <h2 className="mt-4 max-w-2xl text-2xl font-semibold leading-snug text-paper sm:text-3xl">
          A full-stack engineer who treats clean code and clean interfaces
          as the same discipline.
        </h2>

        <p className="mt-6 max-w-2xl font-mono text-sm leading-7 text-muted sm:text-base">
          {profile.summary}
        </p>

        <p className="mt-4 max-w-2xl font-mono text-xs text-slate">
          {education.degree} · {education.school} · {education.period}
        </p>

        <div className="mt-14 grid gap-px overflow-hidden rounded-lg border border-line bg-line sm:grid-cols-3">
          {principles.map((p) => (
            <div key={p.title} className="bg-panel p-6">
              <h3 className="font-mono text-sm font-semibold text-paper">{p.title}</h3>
              <p className="mt-3 text-sm leading-6 text-muted">{p.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
