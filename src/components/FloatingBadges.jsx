import { motion, useTransform } from 'framer-motion';

const badges = [
  { label: 'AWS', pos: 'right-[3%] top-[15%]', depth: 1.4, delay: '0s', color: '#8d63ff' },
  { label: 'Terraform', pos: 'right-[42%] top-[20%]', depth: 0.65, delay: '0.9s', color: '#39d7ff' },
  { label: 'DevOps', pos: 'right-[2%] top-[48%]', depth: 1, delay: '1.8s', color: '#ff7280' },
  { label: 'CI/CD', pos: 'right-[8%] top-[76%]', depth: 1.2, delay: '2.7s', color: '#8d63ff' },
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
    <div className="pointer-events-none absolute inset-0 z-20 hidden xl:block">
      {badges.map((b, i) => (
        <Badge key={b.label} {...b} index={i} mx={mx} my={my} />
      ))}
    </div>
  );
}
