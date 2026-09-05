import { motion } from 'framer-motion';
import { ArrowUpRight, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import Reveal from './ui/Reveal';
import SectionHeading from './ui/SectionHeading';
import { projects } from '../data/portfolio';

export default function Projects() {
  const project = projects[0];

  return (
    <section id="projects" className="relative mx-auto max-w-7xl px-6 py-28">
      <SectionHeading
        kicker="01 — Selected work"
        title="Products are the proof"
        description="A closer look at how I turn infrastructure, real-time systems, and thoughtful interfaces into working products."
      />

      <Reveal>
        <article className="project-feature glass overflow-hidden rounded-[2rem]">
          <div className="grid min-h-[38rem] lg:grid-cols-[0.88fr_1.12fr]">
            <div className="flex flex-col justify-between p-7 sm:p-10 lg:p-12">
              <div>
                <div className="mb-8 flex items-center justify-between gap-4">
                  <span className="rounded-full border border-secondary/30 bg-secondary/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-secondary">Featured product</span>
                  <span className="text-sm text-muted">{project.status}</span>
                </div>
                <img src={project.image} alt="" className="mb-7 h-16 w-16 rounded-2xl object-contain shadow-[0_18px_45px_-18px_rgba(57,215,255,.8)]" />
                <h3 className="font-display text-4xl font-semibold text-ink sm:text-5xl">{project.title}</h3>
                <p className="mt-5 max-w-xl text-lg leading-relaxed text-muted">{project.description}</p>
                <div className="mt-8 grid gap-3 text-sm text-ink sm:grid-cols-2">
                  {['Real-time availability', 'Explainable matching', 'Invite coordination', 'Mobile-first experience'].map((item) => (
                    <div key={item} className="flex items-center gap-2"><CheckCircle2 size={16} className="text-secondary" /> {item}</div>
                  ))}
                </div>
              </div>
              <div className="mt-10">
                <div className="mb-6 flex flex-wrap gap-2">
                  {project.tags.map((tag) => <span key={tag} className="rounded-full border border-line px-3 py-1.5 text-xs text-muted">{tag}</span>)}
                </div>
                <Link to={`/projects/${project.slug}`} className="group inline-flex min-h-12 items-center gap-2 rounded-full bg-gradient-to-r from-primary via-[#6f8cff] to-secondary px-6 py-3 font-semibold text-white shadow-[0_16px_45px_-18px_rgba(57,215,255,.8)]">
                  View case study <ArrowUpRight size={18} className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                </Link>
              </div>
            </div>

            <div className="project-stage relative min-h-[36rem] overflow-hidden p-5 sm:p-8">
              <div className="project-orbit" aria-hidden="true" />
              {project.screenshots.map((screen, index) => (
                <motion.figure
                  key={screen.src}
                  initial={{ opacity: 0, y: 40, rotate: 0 }}
                  whileInView={{ opacity: 1, y: 0, rotate: index === 0 ? -5 : 5 }}
                  viewport={{ once: true, amount: 0.35 }}
                  transition={{ duration: 0.8, delay: index * 0.14, ease: [0.22, 1, 0.36, 1] }}
                  whileHover={{ y: -12, rotate: index === 0 ? -2 : 2, scale: 1.025 }}
                  className={`project-phone project-phone--${index + 1}`}
                >
                  <img src={screen.src} alt={screen.alt} />
                </motion.figure>
              ))}
              <div className="project-signal project-signal--one">SUPABASE REALTIME</div>
              <div className="project-signal project-signal--two">EXPO + TYPESCRIPT</div>
            </div>
          </div>
        </article>
      </Reveal>
    </section>
  );
}
