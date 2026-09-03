import { motion } from 'framer-motion';
import { Award, Briefcase, GraduationCap } from 'lucide-react';
import Reveal from './ui/Reveal';
import SectionHeading from './ui/SectionHeading';
import { certifications, experience } from '../data/portfolio';

export default function Experience() {
  return (
    <section id="experience" className="relative mx-auto max-w-4xl px-6 py-28">
      <SectionHeading
        kicker="04 — Experience"
        title="Where I've been"
        description="Work history, education, and certifications."
      />

      <div className="relative">
        <motion.div
          initial={{ scaleY: 0 }}
          whileInView={{ scaleY: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: 'easeInOut' }}
          style={{ originY: 0 }}
          className="absolute left-5 top-0 h-full w-px bg-gradient-to-b from-primary via-secondary to-transparent sm:left-1/2"
        />

        <div className="space-y-12">
          {experience.map((entry, i) => {
            const Icon = entry.type === 'work' ? Briefcase : GraduationCap;
            const alignRight = i % 2 === 1;
            return (
              <Reveal key={entry.title + entry.org} delay={0.1}>
                <div
                  className={`relative flex items-start gap-6 sm:gap-0 ${
                    alignRight ? 'sm:flex-row-reverse sm:text-right' : ''
                  }`}
                >
                  <div className="absolute left-5 top-1 z-10 -translate-x-1/2 sm:left-1/2">
                    <div className="glass flex h-9 w-9 items-center justify-center rounded-full text-primary">
                      <Icon size={16} />
                    </div>
                  </div>

                  <div className="w-full pl-14 sm:w-1/2 sm:pl-0">
                    <div
                      className={`glass rounded-2xl p-6 ${
                        alignRight ? 'sm:mr-10' : 'sm:ml-10'
                      }`}
                    >
                      {entry.period && (
                        <span className="text-xs font-semibold uppercase tracking-wide text-secondary">
                          {entry.period}
                        </span>
                      )}
                      <h3 className="mt-1 font-display text-lg font-semibold text-ink">
                        {entry.title}
                      </h3>
                      <p className="text-sm text-muted">{entry.org}</p>
                      {entry.points.length > 0 && (
                        <ul
                          className={`mt-3 space-y-1.5 text-sm text-muted ${
                            alignRight ? 'sm:text-right' : ''
                          }`}
                        >
                          {entry.points.map((point) => (
                            <li key={point}>{point}</li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>

      <Reveal delay={0.15} className="mt-16">
        <div className="glass rounded-2xl p-6 sm:p-8">
          <h3 className="flex items-center justify-center gap-2 font-display text-sm font-semibold uppercase tracking-wide text-secondary">
            <Award size={16} /> Certifications
          </h3>
          <div className="mt-5 flex flex-wrap justify-center gap-3">
            {certifications.map((cert) => (
              <span
                key={cert}
                className="rounded-full border border-line bg-white/[0.03] px-4 py-2 text-sm text-ink transition-colors hover:border-primary hover:text-primary"
              >
                {cert}
              </span>
            ))}
          </div>
        </div>
      </Reveal>
    </section>
  );
}
