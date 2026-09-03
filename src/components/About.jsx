import Reveal from './ui/Reveal';
import SectionHeading from './ui/SectionHeading';
import Counter from './ui/Counter';
import { about, profile } from '../data/portfolio';

export default function About() {
  return (
    <section id="about" className="relative mx-auto max-w-6xl px-6 py-28">
      <SectionHeading
        kicker="01 — About me"
        title="A little about who I am"
        description={profile.location}
      />

      <div className="grid gap-12 md:grid-cols-5 md:items-center">
        <Reveal className="md:col-span-3">
          <div className="space-y-5 text-lg leading-relaxed text-muted">
            {about.paragraphs.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        </Reveal>

        <Reveal delay={0.1} className="md:col-span-2">
          <div className="grid grid-cols-2 gap-4">
            {about.stats.map((stat) => (
              <div
                key={stat.label}
                className="glass rounded-2xl px-5 py-6 text-center transition-transform hover:-translate-y-1"
              >
                <div className="font-display text-3xl font-bold text-gradient">
                  <Counter to={stat.value} suffix={stat.suffix} />
                </div>
                <div className="mt-2 text-xs text-muted">{stat.label}</div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
