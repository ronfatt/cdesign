import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Quote, Sparkles, MapPin } from 'lucide-react';
import { biccStoryPhases } from '../../data/biccData';
import { useCursor } from '../../context/CursorContext';
import { projectsData } from '../../data/projectsData';
import type { Project } from '../../types';
import { SectionHeader } from '../common/SectionHeader';
import { MagneticButton } from '../common/MagneticButton';

interface BiccScrollStoryProps {
  onSelectProject: (project: Project) => void;
}

export const BiccScrollStory: React.FC<BiccScrollStoryProps> = ({ onSelectProject }) => {
  const [activeStep, setActiveStep] = useState<number>(0);
  const { setCursorVariant, resetCursor } = useCursor();
  const currentPhase = biccStoryPhases[activeStep];
  const biccProject = projectsData.find((p) => p.id === 'bicc-2026') || projectsData[0];

  return (
    <section id="bicc-story" className="py-24 sm:py-32 bg-brand-light relative overflow-hidden border-t border-neutral-200">
      {/* Background SVG Animated Red Story Line with Dashoffset Scroll */}
      <div className="absolute inset-0 pointer-events-none opacity-25">
        <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 1200 800">
          <motion.path
            d="M 50,100 C 300,150 200,450 600,400 C 1000,350 900,700 1150,750"
            fill="none"
            stroke="#F01616"
            strokeWidth="2.5"
            strokeDasharray="10 8"
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 2, ease: [0.16, 1, 0.3, 1] }}
          />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-6 sm:px-10 relative z-10">
        {/* Section Header */}
        <SectionHeader
          number="07"
          tag="DOCUMENTARY CASE STUDY"
          title={
            <>
              BORNEO INTERNATIONAL<br />
              <span className="text-brand-red">CLOWN CONVENTION 2026</span>
            </>
          }
          subtitle={
            <MagneticButton
              variant="primary"
              onClick={() => onSelectProject(biccProject)}
              cursorText="CASE"
            >
              <span>EXPLORE FULL CASE STUDY</span>
              <ArrowRight className="w-4 h-4" />
            </MagneticButton>
          }
          align="right"
        />

        {/* 6-Step Story Chapter Progress Line */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5 mb-10">
          {biccStoryPhases.map((phase, idx) => {
            const isActive = activeStep === idx;
            return (
              <button
                key={phase.step}
                onClick={() => setActiveStep(idx)}
                onMouseEnter={() => setCursorVariant('link')}
                onMouseLeave={resetCursor}
                className={`text-left p-4 rounded-subtle border transition-all duration-300 relative overflow-hidden ${
                  isActive
                    ? 'bg-brand-black text-white border-brand-red shadow-md translate-y-[-2px]'
                    : 'bg-white text-neutral-700 border-neutral-200 hover:border-neutral-400'
                }`}
              >
                {isActive && (
                  <div className="absolute top-0 left-0 right-0 h-[3px] bg-brand-red" />
                )}
                <span className={`font-mono text-xs font-bold block ${isActive ? 'text-brand-red' : 'text-neutral-400'}`}>
                  {phase.number}
                </span>
                <span className="font-display text-xs sm:text-sm font-bold uppercase tracking-tight block mt-1">
                  {phase.phaseTitle}
                </span>
              </button>
            );
          })}
        </div>

        {/* Phase Presentation Container (Documentary Split Experience) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-white rounded-card p-6 sm:p-12 shadow-xl border border-neutral-200">
          {/* Left Column: Documentary Narrative & Quote */}
          <div className="lg:col-span-6 space-y-6">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeStep}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                className="space-y-6"
              >
                <div className="inline-flex items-center space-x-2 px-3 py-1 bg-brand-red/10 border border-brand-red/20 text-brand-red text-[11px] font-mono font-bold uppercase tracking-widest rounded-full">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>PHASE {currentPhase.number} · {currentPhase.pill}</span>
                </div>

                <h3 className="font-display text-2xl sm:text-4xl font-bold uppercase text-brand-black tracking-tight leading-tight">
                  {currentPhase.headline}
                </h3>

                <p className="text-sm sm:text-base text-neutral-700 leading-relaxed font-medium">
                  {currentPhase.body}
                </p>

                {/* Editorial Quote Box */}
                <div className="bg-brand-light border-l-4 border-brand-red p-4 rounded-r-card space-y-2">
                  <Quote className="w-5 h-5 text-brand-red opacity-60" />
                  <p className="text-xs sm:text-sm font-semibold text-neutral-900 italic leading-snug">
                    {currentPhase.quote}
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Red Story Line Progression */}
            <div className="pt-4 flex items-center justify-between text-xs font-mono text-neutral-500 border-t border-neutral-200">
              <div className="flex items-center space-x-2">
                <span className="text-brand-red font-bold">IDEA</span>
                <span>→</span>
                <span>CREATION</span>
                <span>→</span>
                <span>EXPERIENCE</span>
                <span>→</span>
                <span>IMPACT</span>
              </div>
              <span className="font-bold text-brand-black">{activeStep + 1} / 6</span>
            </div>
          </div>

          {/* Right Column: Layered Photography Presentation with Mask Transition */}
          <div className="lg:col-span-6 relative h-[380px] sm:h-[480px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeStep}
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.04 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="relative w-full h-full rounded-card overflow-hidden shadow-2xl border border-neutral-300"
              >
                {/* Main Image */}
                <img
                  src={currentPhase.image}
                  alt={currentPhase.headline}
                  className="w-full h-full object-cover filter contrast-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30" />

                {/* Floating Inset Cultural Snapshot */}
                {currentPhase.secondaryImage && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.4 }}
                    className="absolute -bottom-2 -right-2 sm:bottom-4 sm:right-4 w-36 sm:w-48 h-36 sm:h-48 rounded-card overflow-hidden shadow-2xl border-2 border-white"
                  >
                    <img
                      src={currentPhase.secondaryImage}
                      alt="Cultural Detail"
                      className="w-full h-full object-cover"
                    />
                    <span className="absolute bottom-1 right-1 bg-black/80 text-white text-[8px] font-mono px-1.5 py-0.5 rounded">
                      BTS ARCHIVE
                    </span>
                  </motion.div>
                )}

                {/* Top Location Pill */}
                <div className="absolute top-4 left-4 flex items-center space-x-2 bg-black/60 backdrop-blur-md text-white px-3 py-1.5 rounded text-xs font-mono">
                  <MapPin className="w-3.5 h-3.5 text-brand-red" />
                  <span>TAWAU & KOTA KINABALU · SABAH</span>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};
