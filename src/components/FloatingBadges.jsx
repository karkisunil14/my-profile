import { motion, useTransform } from 'framer-motion';

const badges = [
  { label: 'AWS', pos: 'right-[6%] top-[12%] sm:right-[10%] lg:right-[16%]', depth: 1.6, delay: '0s', color: '#8b5cf6' },
  { label: 'Terraform', pos: 'right-[26%] top-[24%] sm:right-[30%] lg:right-[36%]', depth: 0.7, delay: '0.9s', color: '#22d3ee' },
  { label: 'DevOps', pos: 'right-[14%] top-[46%] sm:right-[18%] lg:right-[24%]', depth: 1.1, delay: '1.8s', color: '#f472b6' },
  { label: 'CI/CD', pos: 'right-[2%] top-[62%] sm:right-[4%] lg:right-[8%]', depth: 1.4, delay: '2.7s', color: '#8b5cf6' },
];

function Badge({ label, pos, depth, delay, color, index, mx, my }) {
  const x = useTransform(mx, (v) => v * 90 * depth);
  const y = useTransform(my, (v) => v * 90 * depth);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.4 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: 0.8 + index * 0.15, ease: 'backOut' }}
      style={{
        x,
        y,
        animationDelay: delay,
        borderColor: `${color}66`,
        boxShadow: `0 0 22px -6px ${color}`,
      }}
      className={`glass absolute animate-float rounded-full px-4 py-2 font-display text-xs font-semibold text-ink shadow-lg backdrop-blur-md sm:text-sm ${pos}`}
    >
      {label}
    </motion.div>
  );
}

export default function FloatingBadges({ mx, my }) {
  return (
    <div className="pointer-events-none absolute inset-0 hidden sm:block">
      {badges.map((b, i) => (
        <Badge key={b.label} {...b} index={i} mx={mx} my={my} />
      ))}
    </div>
  );
}
