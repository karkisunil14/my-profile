import { AnimatePresence, motion, useScroll, useSpring } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { profile } from '../data/portfolio';
import BrandMark from './BrandMark';

const links = [
  { href: '#projects', label: 'Work' },
  { href: '#experience', label: 'Experience' },
  { href: '#about', label: 'About' },
  { href: '#contact', label: 'Contact' },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 24 });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <motion.div
        className="absolute inset-x-0 top-0 h-[2px] origin-left bg-gradient-to-r from-primary via-secondary to-accent"
        style={{ scaleX: progress }}
      />
      <nav
        className={`mx-auto flex max-w-6xl items-center justify-between px-6 py-4 transition-all duration-300 ${
          // Deliberately more opaque than the site's shared `.glass` utility
          // (which is ~4% white — fine for static cards, but a fixed navbar
          // needs to actually obscure whatever section is scrolling by
          // underneath it, not just tint it).
          scrolled
            ? 'mt-2 max-w-5xl rounded-2xl border border-line bg-bg/90 shadow-lg shadow-black/40 backdrop-blur-xl'
            : ''
        }`}
      >
        <a href="#home" aria-label={`${profile.name} — home`} className="group flex items-center gap-3">
          <BrandMark />
          <span className="hidden sm:block">
            <span className="block font-display text-sm font-semibold leading-none text-ink">{profile.name}</span>
            <span className="mt-1 block text-[10px] uppercase tracking-[.2em] text-muted">DevOps engineer</span>
          </span>
        </a>

        <ul className="hidden items-center gap-8 md:flex">
          {links.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="text-sm text-muted transition-colors hover:text-ink"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <a
          href={profile.resumeUrl}
          target="_blank"
          rel="noreferrer"
          className="hidden rounded-full border border-line px-4 py-2 text-sm text-ink transition-colors hover:border-primary hover:text-primary md:inline-block"
        >
          Resume
        </a>

        <button
          onClick={() => setOpen((v) => !v)}
          className="flex min-h-11 min-w-11 items-center justify-center rounded-full border border-line text-ink md:hidden"
          aria-label="Toggle menu"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="glass mx-4 mt-2 overflow-hidden rounded-2xl md:hidden"
          >
            <ul className="flex flex-col gap-1 p-4">
              {links.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="block rounded-lg px-3 py-2 text-ink transition-colors hover:bg-white/5"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
              <li>
                <a
                  href={profile.resumeUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-1 block rounded-lg px-3 py-2 text-primary"
                >
                  Resume
                </a>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
