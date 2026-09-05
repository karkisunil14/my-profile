import {
  motion,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
} from 'framer-motion';
import { ArrowDown, Mail } from 'lucide-react';
import { FaGithub, FaLinkedin, FaXTwitter } from 'react-icons/fa6';
import { lazy, Suspense, useRef } from 'react';
import MagneticButton from './ui/MagneticButton';
import { profile } from '../data/portfolio';
import useTypewriter from '../hooks/useTypewriter';

const InfrastructureScene = lazy(() => import('../three/InfrastructureScene'));

const socials = [
  { key: 'github', href: profile.social.github, icon: FaGithub, label: 'GitHub' },
  { key: 'linkedin', href: profile.social.linkedin, icon: FaLinkedin, label: 'LinkedIn' },
  { key: 'twitter', href: profile.social.twitter, icon: FaXTwitter, label: 'Twitter' },
  { key: 'email', href: `mailto:${profile.email}`, icon: Mail, label: 'Email' },
].filter(({ href }) => href && !href.includes('your-username'));

const reduceMotion =
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

export default function Hero() {
  const role = useTypewriter(profile.roles);
  const sectionRef = useRef(null);

  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const springMx = useSpring(mx, { stiffness: 50, damping: 20 });
  const springMy = useSpring(my, { stiffness: 50, damping: 20 });

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });

  const contentRotateY = useTransform(springMx, (v) => v * 7);
  const contentRotateX = useTransform(springMy, (v) => v * -7);
  const contentY = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.85], [1, 0]);

  const handleMouseMove = (e) => {
    if (reduceMotion) return;
    const rect = sectionRef.current.getBoundingClientRect();
    mx.set((e.clientX - rect.left) / rect.width - 0.5);
    my.set((e.clientY - rect.top) / rect.height - 0.5);
  };
  const handleMouseLeave = () => {
    mx.set(0);
    my.set(0);
  };

  return (
    <section
      ref={sectionRef}
      id="home"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ perspective: 1200 }}
      className="hero-shell relative flex min-h-svh items-center overflow-hidden pt-24"
    >
      <motion.div
        style={{
          rotateX: contentRotateX,
          rotateY: contentRotateY,
          y: contentY,
          opacity: contentOpacity,
        }}
        className="relative z-10 mx-auto grid w-full max-w-[92rem] items-center gap-8 px-6 lg:grid-cols-[0.82fr_1.18fr] xl:px-10"
      >
        <div className="max-w-2xl">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-4 font-display text-sm font-medium uppercase tracking-[0.3em] text-secondary"
        >
          Hi, I&apos;m
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="font-display text-6xl font-bold leading-[1.02] text-ink sm:text-7xl xl:text-[5.8rem]"
        >
          <span className="text-gradient animate-gradient bg-[length:200%_auto] drop-shadow-[0_0_45px_rgba(139,92,246,0.35)]">
            {profile.name}
          </span>
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="mt-5 flex h-9 items-center font-display text-lg text-muted sm:text-xl"
        >
          <span>{role}</span>
          <span className="ml-1 inline-block h-6 w-[2px] animate-pulse bg-secondary" />
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="mt-7 max-w-xl text-balance font-display text-[1.85rem] font-semibold leading-[1.22] text-ink sm:text-[2.35rem]"
        >
          I build reliable infrastructure—and products people enjoy using.
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.35 }}
          className="mt-5 max-w-xl text-balance text-base leading-relaxed text-muted sm:text-lg"
        >
          {profile.tagline}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.45 }}
          className="mt-9 flex flex-wrap items-center gap-4"
        >
          <MagneticButton
            href="#projects"
            className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-gradient-to-r from-primary to-secondary px-6 py-3 text-sm font-semibold text-white shadow-[0_0_30px_-8px] shadow-primary/70"
          >
            Explore my work
          </MagneticButton>
          <MagneticButton
            href="#contact"
            className="inline-flex items-center gap-2 rounded-full border border-line px-6 py-3 text-sm font-semibold text-ink transition-colors hover:border-primary hover:text-primary"
          >
            Get in touch
          </MagneticButton>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.6 }}
          className="mt-10 flex items-center gap-5"
        >
          {socials.map(({ key, href, icon: Icon, label }) => (
            <a
              key={key}
              href={href}
              target={key === 'email' ? undefined : '_blank'}
              rel="noreferrer"
              aria-label={label}
              className="text-muted transition-colors hover:text-primary"
            >
              <Icon size={20} />
            </a>
          ))}
        </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.92, x: 40 }}
          animate={{ opacity: 1, scale: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
          className="hero-visual"
        >
          <Suspense fallback={<div className="scene-loading" aria-hidden="true" />}>
            <InfrastructureScene />
          </Suspense>
          <div className="hero-balance glass">
            <div><strong>60%</strong><span>DevOps engineering</span></div>
            <div><strong>40%</strong><span>Product building</span></div>
          </div>
        </motion.div>
      </motion.div>

      <motion.a
        href="#about"
        aria-label="Scroll down"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-muted"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
      >
        <ArrowDown size={20} />
      </motion.a>
    </section>
  );
}
