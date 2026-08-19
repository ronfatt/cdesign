import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { impactPillars } from '../../data/impactData';
import { useCursor } from '../../context/CursorContext';
import { SectionHeader } from '../common/SectionHeader';

export const CreativityWithPurpose: React.FC = () => {
  const [activeTab, setActiveTab] = useState<number>(0);
  const { setCursorVariant, resetCursor } = useCursor();
  const currentPillar = impactPillars[activeTab];

  return (
    <section id="impact" className="py-24 sm:py-32 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 sm:px-10">
        {/* Section Header */}
        <SectionHeader
          number="10"
          tag="COMMUNITY & PURPOSE"
          title={
            <>
              CREATIVITY<br />
              <span className="text-brand-red">WITH PURPOSE.</span>
            </>
          }
          subtitle="Storytelling is not a luxury; it is an instrument of empathy, therapy, education, and regional empowerment across Borneo."
          align="right"
        />

        {/* Split Screen Interactive Module */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center bg-brand-light p-6 sm:p-12 rounded-card border border-neutral-200 shadow-md">
          {/* Left Column: Interactive Categories List */}
          <div className="lg:col-span-5 space-y-3">
            {impactPillars.map((pillar, idx) => {
              const isActive = activeTab === idx;
              return (
                <button
                  key={pillar.id}
                  onClick={() => setActiveTab(idx)}
                  onMouseEnter={() => {
                    setActiveTab(idx);
                    setCursorVariant('link');
                  }}
                  onMouseLeave={resetCursor}
                  className={`w-full text-left p-4 sm:p-5 rounded-subtle border transition-all duration-300 flex items-center justify-between ${
                    isActive
                      ? 'bg-white border-brand-red shadow-md translate-x-2'
                      : 'bg-transparent border-neutral-200 hover:border-neutral-300 hover:bg-white/50'
                  }`}
                >
                  <div className="flex items-center space-x-4">
                    <span className={`font-mono text-xs font-bold ${isActive ? 'text-brand-red' : 'text-neutral-400'}`}>
                      0{idx + 1}
                    </span>
                    <span className="font-display text-base sm:text-lg font-bold uppercase tracking-tight text-brand-black">
                      {pillar.title}
                    </span>
                  </div>
                  <ArrowRight
                    className={`w-4 h-4 transition-all duration-300 ${
                      isActive ? 'text-brand-red translate-x-1 opacity-100' : 'text-neutral-300 opacity-0'
                    }`}
                  />
                </button>
              );
            })}
          </div>

          {/* Right Column: Dynamic Photo & Animated Stat Display */}
          <div className="lg:col-span-7 space-y-6">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                className="space-y-6"
              >
                {/* Visual Image with scale transition */}
                <div className="relative h-64 sm:h-80 rounded-card overflow-hidden shadow-lg border border-neutral-200">
                  <motion.img
                    src={currentPillar.mainImage}
                    alt={currentPillar.title}
                    initial={{ scale: 1.06 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                    className="w-full h-full object-cover filter contrast-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                  
                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <span className="text-[10px] font-mono font-black uppercase tracking-widest text-brand-red bg-white/95 px-2 py-0.5 rounded shadow">
                      {currentPillar.tag}
                    </span>
                    <p className="text-xs sm:text-sm font-semibold italic mt-2 text-white/90">
                      "{currentPillar.quote}"
                    </p>
                  </div>
                </div>

                {/* Stat Box & Staggered Description */}
                <div className="grid grid-cols-1 sm:grid-cols-12 gap-6 items-center bg-white p-6 rounded-card border border-neutral-200">
                  <div className="sm:col-span-5 border-l-4 border-brand-red pl-4">
                    <motion.span
                      initial={{ scale: 0.9, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ duration: 0.4, delay: 0.1 }}
                      className="font-display-huge text-4xl sm:text-5xl font-black text-brand-black block"
                    >
                      {currentPillar.statNumber}
                    </motion.span>
                    <span className="text-xs font-mono uppercase font-semibold text-neutral-500 mt-1 block">
                      {currentPillar.statLabel}
                    </span>
                  </div>

                  <motion.div
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: 0.2 }}
                    className="sm:col-span-7 text-xs sm:text-sm text-neutral-700 leading-relaxed font-medium"
                  >
                    {currentPillar.description}
                  </motion.div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};
