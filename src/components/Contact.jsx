import { motion } from 'framer-motion';
import { Mail, Send } from 'lucide-react';
import { FaGithub, FaLinkedin, FaXTwitter } from 'react-icons/fa6';
import { useState } from 'react';
import Reveal from './ui/Reveal';
import SectionHeading from './ui/SectionHeading';
import { profile } from '../data/portfolio';

const socials = [
  { key: 'github', href: profile.social.github, icon: FaGithub, label: 'GitHub' },
  { key: 'linkedin', href: profile.social.linkedin, icon: FaLinkedin, label: 'LinkedIn' },
  { key: 'twitter', href: profile.social.twitter, icon: FaXTwitter, label: 'Twitter' },
];

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    const subject = encodeURIComponent(`Portfolio contact from ${form.name || 'a visitor'}`);
    const body = encodeURIComponent(`${form.message}\n\n— ${form.name} (${form.email})`);
    window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`;
  };

  return (
    <section id="contact" className="relative mx-auto max-w-4xl px-6 py-28">
      <SectionHeading
        kicker="05 — Contact"
        title="Let's build something together"
        description="Have a role, project, or just want to say hi? My inbox is open."
      />

      <Reveal>
        <div className="glass grid gap-10 rounded-3xl p-8 sm:p-10 md:grid-cols-5">
          <div className="md:col-span-2">
            <h3 className="font-display text-xl font-semibold text-ink">
              Get in touch
            </h3>
            <p className="mt-2 text-sm text-muted">
              Prefer email? Reach me directly, or find me on these platforms.
            </p>
            <a
              href={`mailto:${profile.email}`}
              className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline"
            >
              <Mail size={16} /> {profile.email}
            </a>
            <div className="mt-6 flex gap-4">
              {socials.map(({ key, href, icon: Icon, label }) => (
                <a
                  key={key}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={label}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-line text-muted transition-colors hover:border-primary hover:text-primary"
                >
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4 md:col-span-3">
            <div className="grid gap-4 sm:grid-cols-2">
              <input
                required
                type="text"
                placeholder="Your name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="rounded-xl border border-line bg-white/[0.03] px-4 py-3 text-sm text-ink placeholder:text-muted/70 focus:border-primary focus:outline-none"
              />
              <input
                required
                type="email"
                placeholder="Your email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="rounded-xl border border-line bg-white/[0.03] px-4 py-3 text-sm text-ink placeholder:text-muted/70 focus:border-primary focus:outline-none"
              />
            </div>
            <textarea
              required
              rows={4}
              placeholder="Your message"
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              className="w-full rounded-xl border border-line bg-white/[0.03] px-4 py-3 text-sm text-ink placeholder:text-muted/70 focus:border-primary focus:outline-none"
            />
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-primary to-secondary px-6 py-3 text-sm font-semibold text-white"
            >
              Send message <Send size={16} />
            </motion.button>
          </form>
        </div>
      </Reveal>
    </section>
  );
}
