import { motion } from 'framer-motion';
import { ArrowLeft, ArrowUpRight, Check } from 'lucide-react';
import { FaGithub } from 'react-icons/fa6';
import { Link, useParams } from 'react-router-dom';
import Reveal from '../components/ui/Reveal';
import { profile, projects } from '../data/portfolio';

const gradients = [
  'from-primary/40 via-secondary/30 to-accent/30',
  'from-secondary/40 via-primary/30 to-accent/30',
  'from-accent/40 via-primary/30 to-secondary/30',
];

export default function ProjectDetail() {
  const { slug } = useParams();
  const index = projects.findIndex((p) => p.slug === slug);
  const project = index >= 0 ? projects[index] : null;

  if (!project) {
    return (
      <div className="mx-auto flex min-h-svh max-w-2xl flex-col items-center justify-center px-6 text-center">
        <p className="font-display text-sm font-semibold uppercase tracking-[0.25em] text-secondary">
          404
        </p>
        <h1 className="mt-3 font-display text-3xl font-semibold text-ink">
          Project not found
        </h1>
        <p className="mt-3 text-muted">
          That project doesn&apos;t exist or hasn&apos;t been published yet.
        </p>
        <Link
          to="/"
          className="mt-8 inline-flex items-center gap-2 rounded-full border border-line px-6 py-3 text-sm font-semibold text-ink transition-colors hover:border-primary hover:text-primary"
        >
          <ArrowLeft size={16} /> Back to portfolio
        </Link>
      </div>
    );
  }

  return (
    <div className="relative min-h-svh">
      <header className="mx-auto flex max-w-4xl items-center justify-between px-6 py-8">
        <Link to="/" className="font-display text-lg font-semibold text-ink">
          {profile.initials}
          <span className="text-primary">.</span>
        </Link>
        <Link
          to="/#projects"
          className="inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-primary"
        >
          <ArrowLeft size={16} /> Back to projects
        </Link>
      </header>

      <main className="mx-auto max-w-4xl px-6 pb-28">
        <Reveal>
          <div className="flex flex-wrap items-center gap-3">
            <span className="font-display text-xs font-semibold uppercase tracking-[0.25em] text-secondary">
              {project.category}
            </span>
            {project.status && (
              <span className="rounded-full border border-accent/40 bg-accent/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-wide text-accent">
                {project.status}
              </span>
            )}
          </div>
          <h1 className="mt-3 font-display text-4xl font-bold text-ink sm:text-5xl">
            {project.title}
          </h1>
          <p className="mt-5 max-w-2xl text-lg text-muted">{project.description}</p>

          <div className="mt-6 flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-line px-3 py-1 text-xs text-muted"
              >
                {tag}
              </span>
            ))}
          </div>

          {(project.github || (project.live && project.live !== '#')) && (
            <div className="mt-8 flex flex-wrap items-center gap-4">
              {project.github && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-primary to-secondary px-6 py-3 text-sm font-semibold text-white shadow-[0_0_30px_-8px] shadow-primary/70"
                >
                  <FaGithub size={16} /> View code
                </a>
              )}
              {project.live && project.live !== '#' && (
                <a
                  href={project.live}
                  target="_blank"
                  rel="noreferrer"
                  className={
                    project.github
                      ? 'inline-flex items-center gap-2 rounded-full border border-line px-6 py-3 text-sm font-semibold text-ink transition-colors hover:border-primary hover:text-primary'
                      : 'inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-primary to-secondary px-6 py-3 text-sm font-semibold text-white shadow-[0_0_30px_-8px] shadow-primary/70'
                  }
                >
                  <ArrowUpRight size={16} /> View live
                </a>
              )}
            </div>
          )}
        </Reveal>

        <Reveal delay={0.1}>
          <div
            className={`mt-14 flex h-56 items-center justify-center overflow-hidden rounded-3xl bg-gradient-to-br sm:h-72 ${
              gradients[index % gradients.length]
            }`}
          >
            {project.image ? (
              <img
                src={project.image}
                alt=""
                className="h-40 w-40 object-contain sm:h-52 sm:w-52"
              />
            ) : (
              <span className="font-display text-6xl font-bold text-white/90 sm:text-7xl">
                {project.title
                  .split(' ')
                  .map((w) => w[0])
                  .slice(0, 2)
                  .join('')}
              </span>
            )}
          </div>
        </Reveal>

        {project.longDescription && (
          <Reveal delay={0.15} className="mt-16">
            <h2 className="font-display text-2xl font-semibold text-ink">
              What it does
            </h2>
            <div className="mt-5 space-y-4 text-muted">
              {project.longDescription.map((p, i) => (
                <p key={i} className="leading-relaxed">
                  {p}
                </p>
              ))}
            </div>
          </Reveal>
        )}

        {project.screenshots && (
          <Reveal delay={0.18} className="mt-16">
            <h2 className="font-display text-2xl font-semibold text-ink">
              See it in action
            </h2>
            <p className="mt-3 max-w-2xl text-muted">
              Official App Store screenshots, walked through screen by
              screen — more to come as the rest of the app is finished.
            </p>

            <div className="mt-8 space-y-14">
              {project.screenshots.map((shot, i) => (
                <div
                  key={shot.src}
                  className={`flex flex-col gap-8 sm:items-center ${
                    i % 2 === 1 ? 'sm:flex-row-reverse' : 'sm:flex-row'
                  }`}
                >
                  <div className="glass mx-auto w-full max-w-[280px] shrink-0 overflow-hidden rounded-2xl p-2 sm:mx-0">
                    <img
                      src={shot.src}
                      alt={shot.alt}
                      loading="lazy"
                      className="w-full rounded-xl border border-line"
                    />
                  </div>
                  <div>
                    {shot.title && (
                      <h3 className="font-display text-lg font-semibold text-ink">
                        {shot.title}
                      </h3>
                    )}
                    {shot.caption && (
                      <p className="mt-2 text-muted">{shot.caption}</p>
                    )}
                    {shot.details && (
                      <ul className="mt-4 space-y-2">
                        {shot.details.map((detail) => (
                          <li
                            key={detail}
                            className="flex items-start gap-2 text-sm text-ink"
                          >
                            <Check
                              size={15}
                              className="mt-0.5 shrink-0 text-secondary"
                            />
                            {detail}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
        )}

        {project.features && (
          <Reveal delay={0.2} className="mt-16">
            <h2 className="font-display text-2xl font-semibold text-ink">
              Key features
            </h2>
            <ul className="mt-5 grid gap-3 sm:grid-cols-2">
              {project.features.map((feature) => (
                <motion.li
                  key={feature}
                  whileHover={{ x: 4 }}
                  className="glass flex items-start gap-3 rounded-xl px-4 py-3 text-sm text-ink"
                >
                  <Check size={16} className="mt-0.5 shrink-0 text-secondary" />
                  {feature}
                </motion.li>
              ))}
            </ul>
          </Reveal>
        )}

        <Reveal delay={0.25} className="mt-20 text-center">
          <Link
            to="/#projects"
            className="inline-flex items-center gap-2 rounded-full border border-line px-6 py-3 text-sm font-semibold text-ink transition-colors hover:border-primary hover:text-primary"
          >
            <ArrowLeft size={16} /> Back to all projects
          </Link>
        </Reveal>
      </main>
    </div>
  );
}
