import { skills } from '../data/portfolio';

const items = skills.flatMap((group) => group.items);
const loop = [...items, ...items];

export default function TechMarquee() {
  return (
    <div className="relative overflow-hidden border-y border-line bg-white/[0.02] py-5">
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-bg to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-bg to-transparent" />
      <div className="flex w-max animate-marquee gap-10">
        {loop.map((item, i) => (
          <span
            key={`${item}-${i}`}
            className="font-display text-sm font-medium uppercase tracking-widest text-muted"
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
