import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, Play, Film } from 'lucide-react';
import { projectsData } from '../../data/projectsData';
import type { Project, ProjectCategory } from '../../types';
import { useCursor } from '../../context/CursorContext';
import { useScrollVelocity } from '../../hooks/useScrollVelocity';
import { CinematicProjectScrubber } from './CinematicProjectScrubber';

interface SelectedWorkProps {
  onSelectProject: (project: Project) => void;
}

const categories: { label: string; value: 'ALL' | ProjectCategory }[] = [
  { label: 'ALL WORK', value: 'ALL' },
  { label: 'EXPERIENCES', value: 'EXPERIENCES' },
  { label: 'FILM & CONTENT', value: 'FILM & CONTENT' },
  { label: 'CULTURE & TOURISM', value: 'CULTURE & TOURISM' },
  { label: 'IMPACT', value: 'IMPACT' },
  { label: 'ORIGINALS', value: 'ORIGINALS' },
];

export const SelectedWork: React.FC<SelectedWorkProps> = ({ onSelectProject }) => {
  const [activeCategory, setActiveCategory] = useState<'ALL' | ProjectCategory>('ALL');
  const [activeHoverVideoId, setActiveHoverVideoId] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'grid' | 'scrubber'>('grid');
  const hoverTimer = useRef<number | null>(null);
  const { setCursorVariant, resetCursor } = useCursor();
  const velocitySkew = useScrollVelocity();

  const filteredProjects = activeCategory === 'ALL'
    ? projectsData
    : projectsData.filter((p) => p.category === activeCategory);

  const handleMouseEnter = (project: Project) => {
    setCursorVariant('view_case', 'VIEW');
    if (hoverTimer.current) window.clearTimeout(hoverTimer.current);

    // Trigger video preview only after 280ms hover
    hoverTimer.current = window.setTimeout(() => {
      setActiveHoverVideoId(project.id);
    }, 280);
  };

  const handleMouseLeave = () => {
    if (hoverTimer.current) window.clearTimeout(hoverTimer.current);
    setActiveHoverVideoId(null);
    resetCursor();
  };

  return (
    <section id="work" className="py-24 sm:py-32 bg-[#FFFFFF] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 sm:px-10">
        {/* Standardized Section Header with View Mode Switcher */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 pb-8 border-b border-neutral-200 gap-6">
          <div>
            <motion.div
              initial={{ opacity: 0, x: -15 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="flex items-center space-x-3 mb-3"
            >
              <div className="w-6 h-[2px] bg-brand-red origin-left" />
              <span className="text-xs font-mono font-bold tracking-[0.25em] text-neutral-500 uppercase">
                04 — SELECTED WORK
              </span>
            </motion.div>

            <h2 className="font-display-huge text-4xl sm:text-6xl md:text-7xl font-black uppercase text-brand-black tracking-tight leading-none">
              SELECTED WORK
            </h2>
          </div>

          <div className="flex items-center space-x-3">
            <button
              onClick={() => setViewMode('grid')}
              onMouseEnter={() => setCursorVariant('link')}
              onMouseLeave={resetCursor}
              className={`px-3.5 py-1.5 rounded-subtle text-xs font-mono font-bold uppercase transition-colors ${
                viewMode === 'grid' ? 'bg-brand-black text-white' : 'bg-neutral-100 text-neutral-600 hover:text-brand-black'
              }`}
            >
              EDITORIAL GRID
            </button>
            <button
              onClick={() => setViewMode('scrubber')}
              onMouseEnter={() => setCursorVariant('link')}
              onMouseLeave={resetCursor}
              className={`flex items-center space-x-1.5 px-3.5 py-1.5 rounded-subtle text-xs font-mono font-bold uppercase transition-colors ${
                viewMode === 'scrubber' ? 'bg-brand-red text-white' : 'bg-neutral-100 text-neutral-600 hover:text-brand-red'
              }`}
            >
              <Film className="w-3.5 h-3.5" />
              <span>FILM SCRUBBER</span>
            </button>
          </div>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-12">
          {categories.map((cat) => {
            const isActive = activeCategory === cat.value;
            return (
              <button
                key={cat.label}
                onClick={() => setActiveCategory(cat.value)}
                onMouseEnter={() => setCursorVariant('link')}
                onMouseLeave={resetCursor}
                className={`px-4 py-2 text-xs font-bold uppercase tracking-wider rounded-subtle transition-all duration-300 border ${
                  isActive
                    ? 'bg-brand-red text-white border-brand-red shadow-sm'
                    : 'bg-neutral-100 text-neutral-700 border-neutral-200 hover:border-brand-red hover:text-brand-red'
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Render View Mode: Grid or Scrubber */}
        {viewMode === 'scrubber' ? (
          <CinematicProjectScrubber onSelectProject={onSelectProject} />
        ) : (
          /* Staggered Editorial Project Grid */
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 sm:gap-12 items-start">
            {filteredProjects.map((project, index) => {
              const isLargeSpan = index % 3 === 0;
              const gridSpan = isLargeSpan ? 'md:col-span-12 lg:col-span-8' : 'md:col-span-6 lg:col-span-4';
              const cardHeight = isLargeSpan ? 'h-[440px] sm:h-[540px]' : 'h-[380px] sm:h-[460px]';

              // Alternating Red Mask Reveal Directions
              const maskPattern = index % 4;
              const maskInitial =
                maskPattern === 1
                  ? { scaleX: 1, originX: 0 }
                  : maskPattern === 3
                  ? { scaleX: 1, originX: 1 }
                  : { scaleY: 1, originY: 1 };

              const maskAnimate =
                maskPattern === 1
                  ? { scaleX: 0, originX: 1 }
                  : maskPattern === 3
                  ? { scaleX: 0, originX: 0 }
                  : { scaleY: 0, originY: 0 };

              const isVideoActive = activeHoverVideoId === project.id;

              return (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 35 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{ duration: 0.7, delay: (index % 3) * 0.12, ease: [0.16, 1, 0.3, 1] }}
                  style={{ skewY: `${velocitySkew * 0.3}deg` }}
                  className={`${gridSpan} group cursor-pointer relative`}
                  onClick={() => onSelectProject(project)}
                  onMouseEnter={() => handleMouseEnter(project)}
                  onMouseLeave={handleMouseLeave}
                >
                  {/* Image Container with Red Wipe Mask & Hover Zoom */}
                  <div className={`relative ${cardHeight} w-full rounded-card overflow-hidden bg-neutral-900 shadow-md border border-neutral-200`}>
                    {/* Sliding Red Wipe Mask */}
                    <motion.div
                      initial={maskInitial}
                      whileInView={maskAnimate}
                      viewport={{ once: true, margin: '-50px' }}
                      transition={{ duration: 0.85, delay: 0.15, ease: [0.76, 0, 0.24, 1] }}
                      className="absolute inset-0 z-20 bg-brand-red pointer-events-none"
                    />

                    {/* Main Image with 1.08 -> 1 scale on scroll entry */}
                    <motion.img
                      src={project.heroImage}
                      alt={project.title}
                      initial={{ scale: 1.08 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                      className="w-full h-full object-cover filter contrast-105 transition-transform duration-700 ease-out group-hover:scale-[1.045]"
                    />

                    {/* Simulated Video Preview Overlay on Hover */}
                    <AnimatePresence>
                      {isVideoActive && (
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.4 }}
                          className="absolute inset-0 z-10 bg-black"
                        >
                          <img
                            src={project.heroImage}
                            alt="Video Preview"
                            className="w-full h-full object-cover filter brightness-90 contrast-125 scale-105 transition-transform duration-1000"
                          />
                          <div className="absolute inset-0 bg-black/40" />
                          <div className="absolute top-4 right-4 bg-brand-red text-white text-[9px] font-mono px-2 py-0.5 rounded flex items-center space-x-1">
                            <Play className="w-2.5 h-2.5 fill-current" />
                            <span>PREVIEW</span>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />

                    {/* Top Badges */}
                    <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-10">
                      <span className="px-2.5 py-1 bg-brand-red text-white text-[10px] font-black uppercase tracking-widest rounded-subtle shadow-md">
                        {project.category}
                      </span>
                      <span className="font-mono text-xs font-bold text-white/90 bg-black/50 backdrop-blur-sm px-2.5 py-1 rounded">
                        {project.year}
                      </span>
                    </div>

                    {/* Bottom Text Details with Staggered Entrance */}
                    <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8 z-10 text-white transform transition-transform duration-300 group-hover:-translate-y-1">
                      <div className="flex items-center space-x-2 text-[11px] font-mono text-neutral-300 uppercase tracking-wider mb-2">
                        <span className="text-brand-red font-bold">{project.number}</span>
                        <span>·</span>
                        <span>{project.location}</span>
                      </div>

                      <h3 className="font-display text-2xl sm:text-3xl lg:text-3xl font-bold uppercase tracking-tight leading-tight text-white group-hover:text-brand-red transition-colors duration-300">
                        {project.title}
                      </h3>

                      <p className="text-xs sm:text-sm text-neutral-300 mt-2 line-clamp-2 font-medium">
                        {project.subtitle}
                      </p>

                      {/* View CTA link indicator */}
                      <div className="inline-flex items-center space-x-2 text-xs font-bold text-brand-red uppercase tracking-widest mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <span>EXPLORE CASE STUDY</span>
                        <ArrowUpRight className="w-4 h-4" />
                      </div>
                    </div>

                    {/* Bottom Animated Red Line Growing Across */}
                    <div className="absolute bottom-0 left-0 w-0 h-[2px] bg-brand-red group-hover:w-full transition-all duration-500 ease-out z-20" />
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};
