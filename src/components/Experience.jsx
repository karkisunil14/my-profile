import { motion } from 'framer-motion';
import { Award, Briefcase, GraduationCap } from 'lucide-react';
import Reveal from './ui/Reveal';
import SectionHeading from './ui/SectionHeading';
import { certifications, experience } from '../data/portfolio';

const technology = [
  ['Linux', 'SQL', 'CI/CD', 'Bash', 'Git'],
  ['Linux', 'Splunk', 'ServiceNow', 'Jenkins', 'Shell'],
  ['UNIX', 'SQL', 'Control-M', 'Shell'],
  ['JavaScript', 'Python', 'React', 'Node.js'],
  ['Computer science', 'Systems'],
];

export default function Experience() {
  return (
    <section id="experience" className="relative mx-auto max-w-6xl px-6 py-28">
      <SectionHeading kicker="02 — Experience" title="Where I've been" description="Experience shaped by reliability, ownership, and continuous improvement." />
      <div className="experience-track relative">
        <motion.div initial={{ scaleY: 0 }} whileInView={{ scaleY: 1 }} viewport={{ once: true, amount: 0.15 }} transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }} style={{ originY: 0 }} className="experience-line" />
        <div className="space-y-12 md:space-y-16">
          {experience.map((entry, i) => {
            const Icon = entry.type === 'work' ? Briefcase : GraduationCap;
            return (
              <Reveal key={entry.title + entry.org} delay={0.06}>
                <div className={`experience-row ${i % 2 === 1 ? 'experience-row--right' : ''}`}>
                  <div className="experience-node"><Icon size={17} /></div>
                  <article className="experience-card glass">
                    <div className="flex gap-4">
                      <div className="experience-icon"><Icon size={22} /></div>
                      <div>
                        {entry.period && <p className="text-xs font-bold uppercase tracking-[0.12em] text-secondary">{entry.period}</p>}
                        <h3 className="mt-1 font-display text-xl font-semibold text-ink">{entry.title}</h3>
                        <p className="text-sm text-muted">{entry.org}</p>
                      </div>
                    </div>
                    {entry.points.length > 0 && (
                      <ul className="mt-5 space-y-2 text-sm leading-relaxed text-muted">
                        {entry.points.slice(0, 3).map((point) => <li key={point} className="flex gap-2"><span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-secondary" />{point}</li>)}
                      </ul>
                    )}
                    <div className="mt-5 flex flex-wrap gap-2">
                      {technology[i].map((tag) => <span key={tag} className="rounded-lg border border-line bg-white/[.025] px-2.5 py-1.5 text-xs text-muted">{tag}</span>)}
                    </div>
                  </article>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
      <Reveal delay={0.1} className="mt-20">
        <div className="glass rounded-3xl p-7 sm:p-9">
          <h3 className="flex items-center justify-center gap-2 font-display text-sm font-semibold uppercase tracking-[.14em] text-secondary"><Award size={17} /> Certifications</h3>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            {certifications.map((cert) => <span key={cert} className="rounded-full border border-line bg-white/[0.03] px-4 py-2 text-sm text-ink transition hover:-translate-y-1 hover:border-primary/60">{cert}</span>)}
          </div>
        </div>
      </Reveal>
    </section>
  );
}
