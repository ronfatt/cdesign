import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, Play, Film } from 'lucide-react';
import { projectsData } from '../../data/projectsData';
import type { Project, ProjectCategory } from '../../types';
import { useCursor } from '../../context/CursorContext';
import { useScrollVelocity } from '../../hooks/useScrollVelocity';
import { useIsTouchDevice } from '../../hooks/useMediaQuery';
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
  const isTouch = useIsTouchDevice();

  const filteredProjects = activeCategory === 'ALL'
    ? projectsData
    : projectsData.filter((p) => p.category === activeCategory);

  const handleMouseEnter = (project: Project) => {
    if (isTouch) return;
    setCursorVariant('view_case', 'VIEW');
    if (hoverTimer.current) window.clearTimeout(hoverTimer.current);

    hoverTimer.current = window.setTimeout(() => {
      setActiveHoverVideoId(project.id);
    }, 280);
  };

  const handleMouseLeave = () => {
    if (isTouch) return;
    if (hoverTimer.current) window.clearTimeout(hoverTimer.current);
    setActiveHoverVideoId(null);
    resetCursor();
  };

  return (
    <section id="work" className="py-20 sm:py-32 bg-[#FFFFFF] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-5 sm:px-10">
        {/* Section Header with Responsive View Mode Switcher */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-16 pb-6 sm:pb-8 border-b border-neutral-200 gap-4">
          <div>
            <motion.div
              initial={{ opacity: 0, x: -15 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="flex items-center space-x-2.5 mb-2 sm:mb-3"
            >
              <div className="w-5 sm:w-6 h-[2px] bg-brand-red origin-left" />
              <span className="text-[10px] sm:text-xs font-mono font-bold tracking-[0.2em] sm:tracking-[0.25em] text-neutral-500 uppercase">
                04 — SELECTED WORK
              </span>
            </motion.div>

            <h2 className="font-display-huge text-3xl sm:text-6xl md:text-7xl font-black uppercase text-brand-black tracking-tight leading-none">
              SELECTED WORK
            </h2>
          </div>

          {!isTouch && (
            <div className="flex items-center space-x-2 sm:space-x-3">
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
          )}
        </div>

        {/* Horizontally Scrollable Category Filters on Mobile */}
        <div className="flex items-center space-x-2 overflow-x-auto pb-4 mb-8 sm:mb-12 scrollbar-none snap-x">
          {categories.map((cat) => {
            const isActive = activeCategory === cat.value;
            return (
              <button
                key={cat.label}
                onClick={() => setActiveCategory(cat.value)}
                onMouseEnter={() => setCursorVariant('link')}
                onMouseLeave={resetCursor}
                className={`px-4 py-2 text-xs font-bold uppercase tracking-wider rounded-subtle transition-all duration-200 flex-shrink-0 snap-start border active:scale-95 ${
                  isActive
                    ? 'bg-brand-red text-white border-brand-red shadow-sm'
                    : 'bg-neutral-100 text-neutral-700 border-neutral-200 hover:border-brand-red'
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* View Mode: Scrubber or Editorial Feed */}
        {viewMode === 'scrubber' && !isTouch ? (
          <CinematicProjectScrubber onSelectProject={onSelectProject} />
        ) : (
          /* Editorial Vertical Feed on Mobile & Staggered Grid on Desktop */
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 sm:gap-12 items-start">
            {filteredProjects.map((project, index) => {
              const isLargeSpan = index % 3 === 0;
              const gridSpan = isLargeSpan ? 'md:col-span-12 lg:col-span-8' : 'md:col-span-6 lg:col-span-4';
              const cardHeight = isLargeSpan ? 'h-[360px] sm:h-[540px]' : 'h-[320px] sm:h-[460px]';

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
                  initial={{ opacity: 0, y: 25 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ duration: 0.6, delay: isTouch ? 0.05 : (index % 3) * 0.1, ease: [0.16, 1, 0.3, 1] }}
                  style={{ skewY: isTouch ? '0deg' : `${velocitySkew * 0.3}deg` }}
                  className={`${gridSpan} group cursor-pointer relative active:scale-[0.98] transition-transform`}
                  onClick={() => onSelectProject(project)}
                  onMouseEnter={() => handleMouseEnter(project)}
                  onMouseLeave={handleMouseLeave}
                >
                  {/* Image Container with Red Wipe Mask */}
                  <div className={`relative ${cardHeight} w-full rounded-card overflow-hidden bg-neutral-900 shadow-md border border-neutral-200`}>
                    {/* Sliding Red Wipe Mask on Scroll Reveal */}
                    <motion.div
                      initial={maskInitial}
                      whileInView={maskAnimate}
                      viewport={{ once: true, margin: '-40px' }}
                      transition={{ duration: 0.75, delay: 0.1, ease: [0.76, 0, 0.24, 1] }}
                      className="absolute inset-0 z-20 bg-brand-red pointer-events-none"
                    />

                    {/* Main Image */}
                    <img
                      src={project.heroImage}
                      alt={project.title}
                      className="w-full h-full object-cover filter contrast-105 transition-transform duration-700 ease-out group-hover:scale-[1.045]"
                    />

                    {/* Video Preview on Hover (Desktop) */}
                    <AnimatePresence>
                      {isVideoActive && (
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.35 }}
                          className="absolute inset-0 z-10 bg-black"
                        >
                          <img
                            src={project.heroImage}
                            alt="Video Preview"
                            className="w-full h-full object-cover filter brightness-90 contrast-125 scale-105 transition-transform duration-1000"
                          />
                          <div className="absolute inset-0 bg-black/40" />
                          <div className="absolute top-3 right-3 bg-brand-red text-white text-[9px] font-mono px-2 py-0.5 rounded flex items-center space-x-1">
                            <Play className="w-2.5 h-2.5 fill-current" />
                            <span>PREVIEW</span>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-transparent opacity-85 group-hover:opacity-95 transition-opacity" />

                    {/* Top Badges */}
                    <div className="absolute top-3 sm:top-4 left-3 sm:left-4 right-3 sm:right-4 flex items-center justify-between z-10">
                      <span className="px-2.5 py-1 bg-brand-red text-white text-[9px] sm:text-[10px] font-black uppercase tracking-widest rounded-subtle shadow-md">
                        {project.category}
                      </span>
                      <span className="font-mono text-[10px] sm:text-xs font-bold text-white/90 bg-black/50 backdrop-blur-sm px-2 py-0.5 rounded">
                        {project.year}
                      </span>
                    </div>

                    {/* Bottom Text Details */}
                    <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-8 z-10 text-white transform transition-transform duration-300 group-hover:-translate-y-1">
                      <div className="flex items-center space-x-2 text-[10px] sm:text-[11px] font-mono text-neutral-300 uppercase tracking-wider mb-1.5">
                        <span className="text-brand-red font-bold">{project.number}</span>
                        <span>·</span>
                        <span>{project.location}</span>
                      </div>

                      <h3 className="font-display text-xl sm:text-3xl font-bold uppercase tracking-tight leading-tight text-white group-hover:text-brand-red transition-colors duration-200">
                        {project.title}
                      </h3>

                      <p className="text-xs sm:text-sm text-neutral-300 mt-1 sm:mt-2 line-clamp-2 font-medium">
                        {project.subtitle}
                      </p>

                      {/* Tap / Click Indicator */}
                      <div className="inline-flex items-center space-x-1.5 text-xs font-bold text-brand-red uppercase tracking-widest mt-3 opacity-90 sm:opacity-0 group-hover:opacity-100 transition-opacity">
                        <span>EXPLORE CASE STUDY</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </div>
                    </div>

                    {/* Bottom Red Line Indicator */}
                    <div className="absolute bottom-0 left-0 w-0 h-[2px] bg-brand-red group-hover:w-full transition-all duration-400 ease-out z-20" />
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
