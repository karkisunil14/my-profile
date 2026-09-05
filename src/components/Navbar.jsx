import { AnimatePresence, motion, useReducedMotion, useScroll, useSpring } from 'framer-motion';
import { ArrowDownToLine, ArrowUpRight, Menu, X } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
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
  const toggleRef = useRef(null);
  const navRef = useRef(null);
  const reducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 24 });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (event) => {
      if (event.key === 'Escape') {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };
    const onFocus = (event) => {
      if (!navRef.current?.contains(event.target)) setOpen(false);
    };
    const desktop = window.matchMedia('(min-width: 768px)');
    const onResize = () => { if (desktop.matches) setOpen(false); };
    window.addEventListener('keydown', onKey);
    document.addEventListener('focusin', onFocus);
    desktop.addEventListener('change', onResize);
    return () => {
      window.removeEventListener('keydown', onKey);
      document.removeEventListener('focusin', onFocus);
      desktop.removeEventListener('change', onResize);
    };
  }, [open]);

  return (
    <header ref={navRef} className={`fixed inset-x-0 top-0 z-50 px-4 pt-2 sm:px-6 ${scrolled || open ? 'bg-bg pb-2' : ''}`}>
      <AnimatePresence>
        {open && <motion.div aria-hidden="true" onClick={() => setOpen(false)}
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          transition={{ duration: reducedMotion ? 0 : 0.18 }}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm md:hidden" />}
      </AnimatePresence>
      <motion.div
        className="absolute inset-x-0 top-0 h-[2px] origin-left bg-gradient-to-r from-primary via-secondary to-accent"
        style={{ scaleX: progress }}
      />
      <nav
        aria-label="Main navigation"
        className={`relative mx-auto flex max-w-6xl items-center justify-between rounded-2xl border px-4 py-2 transition-colors duration-200 sm:px-5 ${
          // Deliberately more opaque than the site's shared `.glass` utility
          // (which is ~4% white — fine for static cards, but a fixed navbar
          // needs to actually obscure whatever section is scrolling by
          // underneath it, not just tint it).
          scrolled || open
            ? 'border-line bg-bg shadow-lg shadow-black/20'
            : 'border-transparent'
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
          ref={toggleRef}
          onClick={() => setOpen((v) => !v)}
          className="flex min-h-11 min-w-11 items-center justify-center rounded-full border border-line text-ink md:hidden"
          aria-label={open ? 'Close navigation menu' : 'Open navigation menu'}
          aria-expanded={open}
          aria-controls="mobile-navigation"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-navigation"
            initial={{ opacity: 0, y: reducedMotion ? 0 : -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: reducedMotion ? 0 : -8 }}
            transition={{ duration: reducedMotion ? 0 : 0.18 }}
            className="relative mt-3 max-h-[calc(100dvh-120px)] overflow-y-auto rounded-3xl border border-white/10 bg-[#0d1422] p-3 shadow-2xl shadow-black/50 md:hidden"
          >
            <p className="px-4 pb-3 pt-3 text-[10px] font-semibold uppercase tracking-[.22em] text-muted">Explore</p>
            <ul className="flex flex-col gap-1">
              {links.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="flex min-h-14 items-center justify-between rounded-xl px-4 py-3 font-display text-xl text-ink transition-colors hover:bg-white/5 focus-visible:bg-white/5 focus-visible:outline focus-visible:outline-secondary"
                  >
                    {link.label}
                    <ArrowUpRight size={18} className="text-muted" aria-hidden="true" />
                  </a>
                </li>
              ))}
              <li>
                <a
                  href={profile.resumeUrl}
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => setOpen(false)}
                  className="mt-3 flex min-h-12 items-center justify-center gap-2 rounded-xl border border-primary/30 bg-primary/15 px-4 py-3 text-sm font-semibold text-ink"
                >
                  <ArrowDownToLine size={17} aria-hidden="true" /> View resume
                </a>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
