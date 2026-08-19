import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ArrowRight, CheckCircle2, Sparkles } from 'lucide-react';
import type { Project } from '../../types';
import { useCursor } from '../../context/CursorContext';

interface ProjectDrawerProps {
  project: Project | null;
  onClose: () => void;
  onOpenInquiry: (projectName?: string) => void;
}

export const ProjectDrawer: React.FC<ProjectDrawerProps> = ({
  project,
  onClose,
  onOpenInquiry,
}) => {
  const { setCursorVariant, resetCursor } = useCursor();

  if (!project) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-hidden flex justify-end">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        />

        {/* Drawer Content */}
        <motion.div
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-3xl bg-white text-brand-black h-full shadow-2xl z-10 overflow-y-auto flex flex-col justify-between"
        >
          {/* Header Bar */}
          <div className="sticky top-0 bg-white/95 backdrop-blur-md px-6 sm:px-10 py-5 border-b border-neutral-200 flex items-center justify-between z-20">
            <div className="flex items-center space-x-3">
              <span className="font-mono text-xs font-bold text-brand-red">{project.number}</span>
              <span className="text-xs uppercase tracking-widest font-mono text-neutral-500 font-semibold">
                {project.categoryLabel}
              </span>
            </div>

            <button
              onClick={onClose}
              onMouseEnter={() => setCursorVariant('link')}
              onMouseLeave={resetCursor}
              className="flex items-center space-x-2 text-xs font-bold uppercase tracking-wider px-3 py-1.5 rounded border border-neutral-300 hover:border-brand-red hover:text-brand-red transition-all"
            >
              <span>CLOSE</span>
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Main Body */}
          <div className="px-6 sm:px-10 py-8 space-y-10">
            {/* Title & Metadata */}
            <div className="space-y-4">
              <span className="inline-block px-2.5 py-1 bg-brand-red text-white text-[10px] font-black uppercase tracking-widest rounded-subtle">
                {project.category}
              </span>
              <h2 className="font-display text-3xl sm:text-5xl font-black uppercase tracking-tight text-brand-black leading-tight">
                {project.title}
              </h2>
              <p className="text-base sm:text-lg font-medium text-neutral-700">
                {project.subtitle}
              </p>

              {/* Metadata Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-4 border-t border-b border-neutral-200 py-4 text-xs font-mono">
                <div>
                  <span className="text-neutral-400 block">YEAR</span>
                  <span className="font-bold text-neutral-900">{project.year}</span>
                </div>
                <div>
                  <span className="text-neutral-400 block">LOCATION</span>
                  <span className="font-bold text-neutral-900">{project.location}</span>
                </div>
                <div>
                  <span className="text-neutral-400 block">CLIENT / PARTNER</span>
                  <span className="font-bold text-neutral-900">{project.client || 'C Design Initiative'}</span>
                </div>
              </div>
            </div>

            {/* Hero Image */}
            <div className="rounded-card overflow-hidden shadow-lg border border-neutral-200">
              <img
                src={project.heroImage}
                alt={project.title}
                className="w-full h-[360px] object-cover"
              />
            </div>

            {/* Summary & Narrative */}
            <div className="space-y-6">
              <h3 className="font-display text-xl font-bold uppercase tracking-tight text-neutral-900">
                THE CHALLENGE & VISION
              </h3>
              <p className="text-sm sm:text-base text-neutral-800 leading-relaxed font-medium">
                {project.summary}
              </p>
              {project.narrative.map((paragraph, idx) => (
                <p key={idx} className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
                  {paragraph}
                </p>
              ))}
            </div>

            {/* Deliverables */}
            <div className="bg-brand-light p-6 rounded-card border border-neutral-200 space-y-4">
              <h4 className="font-display text-sm font-black uppercase tracking-widest text-brand-black flex items-center space-x-2">
                <Sparkles className="w-4 h-4 text-brand-red" />
                <span>KEY DELIVERABLES & DISCIPLINES</span>
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {project.deliverables.map((item, idx) => (
                  <div key={idx} className="flex items-center space-x-2.5 text-xs font-semibold text-neutral-800">
                    <CheckCircle2 className="w-3.5 h-3.5 text-brand-red flex-shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Key Metrics */}
            {project.metrics && (
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {project.metrics.map((metric, idx) => (
                  <div key={idx} className="border-l-2 border-brand-red pl-3 py-1">
                    <span className="font-display text-2xl font-black text-brand-black block">
                      {metric.value}
                    </span>
                    <span className="text-[11px] font-mono uppercase text-neutral-500 block mt-0.5">
                      {metric.label}
                    </span>
                  </div>
                ))}
              </div>
            )}

            {/* Production Gallery Images */}
            {project.galleryImages.length > 0 && (
              <div className="space-y-4">
                <h4 className="font-display text-base font-bold uppercase tracking-tight text-neutral-900">
                  PRODUCTION FRAMES & DOCUMENTATION
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {project.galleryImages.map((imgUrl, idx) => (
                    <div key={idx} className="rounded-card overflow-hidden border border-neutral-200 h-52">
                      <img
                        src={imgUrl}
                        alt={`${project.title} gallery ${idx + 1}`}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Bottom Action Footer */}
          <div className="sticky bottom-0 bg-brand-black text-white px-6 sm:px-10 py-5 flex items-center justify-between border-t border-neutral-800">
            <div>
              <span className="text-[10px] font-mono text-brand-red uppercase tracking-widest block font-bold">
                COLLABORATE WITH US
              </span>
              <p className="text-xs font-bold text-neutral-200">
                Interested in creating a similar production?
              </p>
            </div>

            <button
              onClick={() => {
                onClose();
                onOpenInquiry(project.title);
              }}
              onMouseEnter={() => setCursorVariant('link')}
              onMouseLeave={resetCursor}
              className="inline-flex items-center space-x-2 px-5 py-2.5 bg-brand-red text-white text-xs font-bold uppercase tracking-wider rounded-subtle hover:bg-white hover:text-brand-black transition-colors shadow-md"
            >
              <span>INQUIRE NOW</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
