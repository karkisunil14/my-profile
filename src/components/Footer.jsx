import { motion } from 'framer-motion';
import { ArrowUp } from 'lucide-react';
import { profile } from '../data/portfolio';
import BrandMark from './BrandMark';

export default function Footer() {
  return (
    <footer className="relative border-t border-line px-6 py-8">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 sm:flex-row">
        <div className="flex items-center gap-3">
          <BrandMark compact />
          <p className="text-sm text-muted">© {new Date().getFullYear()} {profile.name}. Designed and built with intention.</p>
        </div>
        <motion.a
          href="#home"
          whileHover={{ y: -3 }}
          aria-label="Back to top"
          className="flex h-9 w-9 items-center justify-center rounded-full border border-line text-muted transition-colors hover:border-primary hover:text-primary"
        >
          <ArrowUp size={16} />
        </motion.a>
      </div>
    </footer>
  );
}
