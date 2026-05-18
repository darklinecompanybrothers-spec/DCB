import React, { useState } from 'react';
import { motion, animate, useMotionValue } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

const PROJECTS_DATA = [
  {
    id: 'aurora',
    title: 'Aurora Commerce Engine',
    category: 'E-Commerce Platform',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1400&q=80',
    stack: ['React', 'Node.js', 'Stripe'],
    accent: { r: 236, g: 72, b: 153 },
    size: 'tall',
  },
  {
    id: 'helix',
    title: 'Helix Talent OS',
    category: 'SaaS Dashboard',
    image: 'https://images.unsplash.com/photo-1551281044-8b45c0f2bcf9?auto=format&fit=crop&w=1400&q=80',
    stack: ['React', 'TypeScript', 'Supabase'],
    accent: { r: 34, g: 211, b: 238 },
    size: 'wide',
  },
  {
    id: 'nova',
    title: 'Nova Private Clinic',
    category: 'Medical Booking Suite',
    image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=1400&q=80',
    stack: ['Next.js', 'Prisma', 'PostgreSQL'],
    accent: { r: 168, g: 85, b: 247 },
    size: 'medium',
  },
  {
    id: 'vertex',
    title: 'Vertex Estates',
    category: 'Luxury Real Estate',
    image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=1400&q=80',
    stack: ['React', 'Mapbox', 'Framer Motion'],
    accent: { r: 16, g: 185, b: 129 },
    size: 'tall',
  },
  {
    id: 'mirage',
    title: 'Mirage Hospitality',
    category: 'Restaurant Experience',
    image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1400&q=80',
    stack: ['Vite', 'GSAP', 'Sanity'],
    accent: { r: 245, g: 158, b: 11 },
    size: 'medium',
  },
  {
    id: 'quantum',
    title: 'Quantum Legal Vault',
    category: 'Enterprise Portal',
    image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1400&q=80',
    stack: ['React', 'Node.js', 'Redis'],
    accent: { r: 59, g: 130, b: 246 },
    size: 'wide',
  },
];

const cardHeights = {
  tall: 420,
  medium: 340,
  wide: 300,
};

const rgba = (c, a) => `rgba(${c.r},${c.g},${c.b},${a})`;

const ProjectCard = ({ project, index }) => {
  const [isHover, setIsHover] = useState(false);
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);

  const onMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    rotateX.set(py * -8);
    rotateY.set(px * 9);
  };

  const onLeave = () => {
    setIsHover(false);
    animate(rotateX, 0, { duration: 0.35, ease: 'easeOut' });
    animate(rotateY, 0, { duration: 0.35, ease: 'easeOut' });
  };

  return (
    <motion.article
      onMouseMove={onMove}
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={onLeave}
      className="group relative mb-6 break-inside-avoid overflow-hidden rounded-2xl border"
      style={{
        background: 'rgba(255,255,255,0.03)',
        backdropFilter: 'blur(12px)',
        borderColor: isHover ? rgba(project.accent, 0.55) : 'rgba(255,255,255,0.10)',
        rotateX,
        rotateY,
        transformStyle: 'preserve-3d',
        transformPerspective: 1000,
      }}
      animate={{
        y: [0, -6, 0, 4, 0],
        boxShadow: isHover
          ? `0 0 0 1px ${rgba(project.accent, 0.25)}, 0 22px 70px ${rgba(project.accent, 0.28)}, 0 0 90px ${rgba(project.accent, 0.2)}`
          : '0 16px 36px rgba(0,0,0,0.35)',
      }}
      transition={{
        y: { duration: 6 + index * 0.7, repeat: Infinity, ease: 'easeInOut', delay: index * 0.15 },
        boxShadow: { duration: 0.28 },
      }}
    >
      <div className="relative overflow-hidden" style={{ height: cardHeights[project.size] }}>
        <motion.img
          src={project.image}
          alt={project.title}
          className="h-full w-full object-cover"
          style={{
            filter: isHover
              ? 'grayscale(0%) saturate(110%) brightness(1)'
              : 'grayscale(45%) saturate(70%) brightness(0.62) hue-rotate(190deg)',
          }}
          animate={{ scale: isHover ? 1.06 : 1.0 }}
          transition={{ duration: 0.45, ease: 'easeOut' }}
        />

        <motion.div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(to top, rgba(5,5,8,0.9), rgba(5,5,8,${isHover ? 0.2 : 0.55}))`,
          }}
          transition={{ duration: 0.35 }}
        />

        <motion.div
          className="absolute -inset-10 rounded-[36px] blur-3xl"
          style={{ background: `radial-gradient(circle, ${rgba(project.accent, 0.32)} 0%, transparent 70%)` }}
          animate={{ opacity: isHover ? 1 : 0.12 }}
          transition={{ duration: 0.3 }}
        />

        <div className="absolute bottom-0 left-0 right-0 p-5">
          <p className="mb-1 text-[11px] uppercase tracking-[0.22em] text-neutral-400">{project.category}</p>
          <h3 className="text-xl font-bold text-white">{project.title}</h3>

          <motion.div
            className="mt-4 flex flex-wrap gap-2"
            initial={false}
            animate={{ opacity: isHover ? 1 : 0, y: isHover ? 0 : 10 }}
            transition={{ duration: 0.25 }}
          >
            {project.stack.map((tech) => (
              <span
                key={tech}
                className="rounded-full border px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.12em]"
                style={{
                  borderColor: rgba(project.accent, 0.36),
                  background: rgba(project.accent, 0.14),
                  color: '#fff',
                }}
              >
                {tech}
              </span>
            ))}
          </motion.div>
        </div>
      </div>
    </motion.article>
  );
};

const ProjectArchive = ({
  onNavigate,
  sectionId = 'portfolio',
  overline = '-- Our Legacy',
  title = 'DIGITAL ARTIFACTS',
  subtitle = 'A curated archive of premium builds. Each artifact is engineered as a performance system, not just a pretty interface.',
  showCta = true,
  ctaLabel = 'View Full Archive',
}) => {
  return (
    <section id={sectionId} className="relative overflow-hidden bg-transparent py-20 md:py-32">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at 50% 5%, rgba(168,85,247,0.08), transparent 60%)' }}
      />
      <div className="absolute left-0 right-0 top-0 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 md:px-6">
        <div className="mb-14">
          <p
            className="mb-4 text-xs uppercase tracking-[0.28em] text-neutral-400"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            {overline}
          </p>
          <h2
            className="mb-4 text-4xl font-black leading-none md:text-6xl"
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              background: 'linear-gradient(90deg, #f5f3ff 0%, #a855f7 45%, #67e8f9 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            {title}
          </h2>
          <p className="max-w-3xl text-base text-neutral-400 md:text-lg" style={{ fontFamily: "'Inter', sans-serif" }}>
            {subtitle}
          </p>
        </div>

        <div className="columns-1 md:columns-2 xl:columns-3" style={{ columnGap: '1.5rem' }}>
          {PROJECTS_DATA.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>

        {showCta && (
          <div className="mt-10 flex justify-center md:justify-end">
            <button
              onClick={() => onNavigate?.('portfolio')}
              className="group inline-flex items-center gap-2 rounded-lg border border-white/15 bg-white/[0.04] px-6 py-3 text-xs font-bold uppercase tracking-[0.16em] text-white transition-all duration-300 hover:border-purple-400/60 hover:bg-purple-500/10"
            >
              {ctaLabel}
              <ArrowRight size={14} className="transition-transform duration-300 group-hover:translate-x-1" />
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default ProjectArchive;

