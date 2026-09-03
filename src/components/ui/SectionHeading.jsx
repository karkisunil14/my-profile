import Reveal from './Reveal';

export default function SectionHeading({ kicker, title, description }) {
  return (
    <Reveal className="mx-auto mb-14 max-w-2xl text-center">
      {kicker && (
        <span className="mb-3 inline-block font-display text-xs font-semibold uppercase tracking-[0.25em] text-primary">
          {kicker}
        </span>
      )}
      <h2 className="font-display text-3xl font-semibold text-ink sm:text-4xl">
        {title}
      </h2>
      {description && (
        <p className="mt-4 text-balance text-muted">{description}</p>
      )}
    </Reveal>
  );
}
