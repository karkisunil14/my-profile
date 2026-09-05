import { motion } from 'framer-motion';
import Reveal from './ui/Reveal';
import SectionHeading from './ui/SectionHeading';
import { skills } from '../data/portfolio';

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06 } },
};
const item = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

export default function Skills() {
  return (
    <section id="skills" className="relative mx-auto max-w-6xl px-6 py-28">
      <SectionHeading
        kicker="04 — Skills"
        title="Tools I build with"
        description="A snapshot of the languages, frameworks, and tools I reach for most."
      />

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {skills.map((group, i) => (
          <Reveal key={group.category} delay={i * 0.08}>
            <div className="glass h-full rounded-2xl p-6 transition-colors hover:border-primary/40">
              <h3 className="font-display text-sm font-semibold uppercase tracking-wide text-secondary">
                {group.category}
              </h3>
              <motion.ul
                variants={container}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                className="mt-4 flex flex-wrap gap-2"
              >
                {group.items.map((skill) => (
                  <motion.li
                    key={skill}
                    variants={item}
                    className="rounded-full border border-line bg-white/[0.03] px-3 py-1 text-sm text-ink transition-colors hover:border-primary hover:text-primary"
                  >
                    {skill}
                  </motion.li>
                ))}
              </motion.ul>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
