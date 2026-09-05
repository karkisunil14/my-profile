import { motion } from 'framer-motion';
import { profile } from '../data/portfolio';

export default function BrandMark({ compact = false }) {
  return (
    <span className={`brand-mark ${compact ? 'brand-mark--compact' : ''}`} aria-hidden="true">
      <span className="brand-mark__ring" />
      <span className="brand-mark__core">{profile.initials}</span>
      <motion.span
        className="brand-mark__orbit"
        animate={{ rotate: 360 }}
        transition={{ duration: 8, ease: 'linear', repeat: Infinity }}
      >
        <span />
      </motion.span>
    </span>
  );
}
