import { AnimatePresence, motion } from 'framer-motion';
import { useMemo, useState } from 'react';
import Reveal from './ui/Reveal';
import SectionHeading from './ui/SectionHeading';
import ProjectCard from './ProjectCard';
import { projects } from '../data/portfolio';

export default function Projects() {
  const categories = useMemo(
    () => ['All', ...new Set(projects.map((p) => p.category))],
    [],
  );
  const [active, setActive] = useState('All');

  const filtered =
    active === 'All' ? projects : projects.filter((p) => p.category === active);

  return (
    <section id="projects" className="relative mx-auto max-w-6xl px-6 py-28">
      <SectionHeading
        kicker="03 — Projects"
        title="Things I've built"
        description="A selection of projects — replace these with your own work, links, and results."
      />

      {categories.length > 2 && (
        <Reveal className="mb-10 flex flex-wrap justify-center gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActive(cat)}
              className={`relative rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                active === cat ? 'text-white' : 'text-muted hover:text-ink'
              }`}
            >
              {active === cat && (
                <motion.span
                  layoutId="pill"
                  className="absolute inset-0 rounded-full bg-gradient-to-r from-primary to-secondary"
                  transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                />
              )}
              <span className="relative">{cat}</span>
            </button>
          ))}
        </Reveal>
      )}

      <motion.div layout className="flex flex-wrap justify-center gap-6">
        <AnimatePresence mode="popLayout">
          {filtered.map((project, i) => (
            <div
              key={project.title}
              className="w-full sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)]"
            >
              <ProjectCard project={project} index={i} />
            </div>
          ))}
        </AnimatePresence>
      </motion.div>
    </section>
  );
}
