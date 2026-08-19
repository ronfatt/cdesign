import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Film, MapPin } from 'lucide-react';
import { projectsData } from '../../data/projectsData';
import type { Project } from '../../types';
import { useCursor } from '../../context/CursorContext';
import { MagneticButton } from '../common/MagneticButton';

interface CinematicProjectScrubberProps {
  onSelectProject: (project: Project) => void;
}

export const CinematicProjectScrubber: React.FC<CinematicProjectScrubberProps> = ({
  onSelectProject,
}) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const { setCursorVariant, resetCursor } = useCursor();
  const current = projectsData[activeIndex];

  return (
    <div className="bg-brand-black text-white p-6 sm:p-10 rounded-card border border-neutral-800 shadow-2xl space-y-8 my-12">
      {/* Top Header */}
      <div className="flex items-center justify-between border-b border-neutral-800 pb-4">
        <div className="flex items-center space-x-3">
          <Film className="w-4 h-4 text-brand-red animate-pulse" />
          <span className="text-xs font-mono font-bold tracking-[0.2em] text-neutral-300 uppercase">
            CINEMATIC FILM REEL SCRUBBER
          </span>
        </div>

        <div className="text-xs font-mono text-neutral-400">
          FRAME <span className="text-brand-red font-bold">0{activeIndex + 1}</span> / 0{projectsData.length}
        </div>
      </div>

      {/* Main Interactive Stage */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Left Big Project Frame */}
        <div
          className="lg:col-span-8 relative aspect-video rounded-card overflow-hidden bg-neutral-900 border border-neutral-800 cursor-pointer group"
          onClick={() => onSelectProject(current)}
          onMouseEnter={() => setCursorVariant('view_case', 'VIEW')}
          onMouseLeave={resetCursor}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={current.id}
              initial={{ opacity: 0, scale: 1.04 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="absolute inset-0"
            >
              <img
                src={current.heroImage}
                alt={current.title}
                className="w-full h-full object-cover filter contrast-110 brightness-95 group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />

              <div className="absolute top-4 left-4 flex items-center space-x-2">
                <span className="px-2.5 py-1 bg-brand-red text-white text-[9px] font-black uppercase tracking-widest rounded-subtle">
                  {current.category}
                </span>
                <span className="text-[10px] font-mono text-neutral-300 bg-black/60 px-2 py-0.5 rounded">
                  {current.year}
                </span>
              </div>

              <div className="absolute bottom-6 left-6 right-6 text-white space-y-2">
                <div className="flex items-center space-x-2 text-[11px] font-mono text-neutral-300">
                  <MapPin className="w-3.5 h-3.5 text-brand-red" />
                  <span>{current.location}</span>
                </div>
                <h3 className="font-display text-2xl sm:text-3xl font-black uppercase tracking-tight text-white group-hover:text-brand-red transition-colors">
                  {current.title}
                </h3>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Right Details & Scrubber Thumbnails */}
        <div className="lg:col-span-4 space-y-6">
          <div className="space-y-2">
            <span className="text-xs font-mono text-brand-red font-bold uppercase">
              {current.categoryLabel}
            </span>
            <h4 className="font-display text-xl font-bold uppercase tracking-tight text-white">
              {current.subtitle}
            </h4>
            <p className="text-xs text-neutral-400 leading-relaxed line-clamp-3">
              {current.summary}
            </p>
          </div>

          <div className="pt-2">
            <MagneticButton
              variant="primary"
              onClick={() => onSelectProject(current)}
              className="!w-full"
              cursorText="VIEW"
            >
              <span>EXPLORE CASE STUDY</span>
              <ArrowRight className="w-4 h-4" />
            </MagneticButton>
          </div>

          {/* Minimal Film Scrubber Rail */}
          <div className="pt-4 border-t border-neutral-800 space-y-2">
            <div className="flex items-center justify-between text-[10px] font-mono text-neutral-500">
              <span>DRAG / TAP FRAME</span>
              <span>01 — 0{projectsData.length}</span>
            </div>

            <div className="grid grid-cols-6 gap-1.5">
              {projectsData.map((p, idx) => {
                const isActive = activeIndex === idx;
                return (
                  <button
                    key={p.id}
                    onClick={() => setActiveIndex(idx)}
                    onMouseEnter={() => {
                      setActiveIndex(idx);
                      setCursorVariant('link');
                    }}
                    onMouseLeave={resetCursor}
                    className={`h-12 rounded overflow-hidden border transition-all duration-300 relative ${
                      isActive ? 'border-brand-red ring-2 ring-brand-red/50 scale-105' : 'border-neutral-800 opacity-50 hover:opacity-100'
                    }`}
                  >
                    <img src={p.heroImage} alt={p.title} className="w-full h-full object-cover" />
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
