import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useSpring,
} from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { FaGithub } from 'react-icons/fa6';
import { useNavigate } from 'react-router-dom';

const gradients = [
  'from-primary/40 via-secondary/30 to-accent/30',
  'from-secondary/40 via-primary/30 to-accent/30',
  'from-accent/40 via-primary/30 to-secondary/30',
];

const spring = { stiffness: 200, damping: 20, mass: 0.4 };

export default function ProjectCard({ project, index }) {
  const navigate = useNavigate();
  const clickable = Boolean(project.slug);

  const rotateX = useSpring(useMotionValue(0), spring);
  const rotateY = useSpring(useMotionValue(0), spring);
  const glareX = useMotionValue(50);
  const glareY = useMotionValue(50);
  const glareBg = useMotionTemplate`radial-gradient(500px circle at ${glareX}% ${glareY}%, rgba(255,255,255,0.12), transparent 70%)`;

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    rotateY.set((px - 0.5) * 14);
    rotateX.set((0.5 - py) * 14);
    glareX.set(px * 100);
    glareY.set(py * 100);
  };

  const handleMouseLeave = () => {
    rotateX.set(0);
    rotateY.set(0);
  };

  const goToDetail = () => {
    if (clickable) navigate(`/projects/${project.slug}`);
  };

  const stopBubble = (e) => e.stopPropagation();

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.4 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={goToDetail}
      role={clickable ? 'link' : undefined}
      tabIndex={clickable ? 0 : undefined}
      onKeyDown={
        clickable
          ? (e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                goToDetail();
              }
            }
          : undefined
      }
      style={{ rotateX, rotateY, transformPerspective: 900 }}
      whileHover={{ y: -6 }}
      className={`glass group relative flex h-full flex-col overflow-hidden rounded-2xl transition-shadow hover:shadow-[0_20px_60px_-20px] hover:shadow-primary/40 ${
        clickable ? 'cursor-pointer' : ''
      }`}
    >
      <motion.div
        style={{ background: glareBg }}
        className="pointer-events-none absolute inset-0 z-10 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
      />

      <div
        className={`relative flex h-40 items-center justify-center overflow-hidden bg-gradient-to-br ${
          gradients[index % gradients.length]
        }`}
      >
        {project.image ? (
          <img
            src={project.image}
            alt=""
            className="h-24 w-24 object-contain transition-transform duration-500 group-hover:scale-110"
          />
        ) : (
          <span className="font-display text-4xl font-bold text-white/90 transition-transform duration-500 group-hover:scale-110">
            {project.title
              .split(' ')
              .map((w) => w[0])
              .slice(0, 2)
              .join('')}
          </span>
        )}
        {project.status ? (
          <span className="absolute right-3 top-3 rounded-full bg-black/30 px-3 py-1 text-[10px] font-semibold uppercase tracking-wide text-white backdrop-blur">
            {project.status}
          </span>
        ) : (
          project.featured && (
            <span className="absolute right-3 top-3 rounded-full bg-black/30 px-3 py-1 text-[10px] font-semibold uppercase tracking-wide text-white backdrop-blur">
              Featured
            </span>
          )
        )}
      </div>

      <div className="flex flex-1 flex-col p-6" style={{ transform: 'translateZ(30px)' }}>
        <div className="flex items-center gap-1.5">
          <h3 className="font-display text-lg font-semibold text-ink">{project.title}</h3>
          {clickable && (
            <ArrowUpRight
              size={16}
              className="text-primary opacity-0 transition-opacity group-hover:opacity-100"
            />
          )}
        </div>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">
          {project.description}
        </p>

        <div className="mt-4 flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-line px-2.5 py-1 text-xs text-muted"
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="relative z-20 mt-5 flex items-center gap-4 border-t border-line pt-4">
          <a
            href={project.github}
            target="_blank"
            rel="noreferrer"
            onClick={stopBubble}
            className="inline-flex items-center gap-1.5 text-sm text-muted transition-colors hover:text-primary"
          >
            <FaGithub size={16} /> Code
          </a>
          {project.live && project.live !== '#' && (
            <a
              href={project.live}
              target="_blank"
              rel="noreferrer"
              onClick={stopBubble}
              className="inline-flex items-center gap-1.5 text-sm text-muted transition-colors hover:text-primary"
            >
              <ArrowUpRight size={16} /> Live
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
}
