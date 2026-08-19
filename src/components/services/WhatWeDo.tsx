import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ChevronDown, Check, X, Sparkles } from 'lucide-react';
import { servicesData } from '../../data/servicesData';
import { useCursor } from '../../context/CursorContext';
import { useIsTouchDevice } from '../../hooks/useMediaQuery';
import { SectionHeader } from '../common/SectionHeader';
import { MagneticButton } from '../common/MagneticButton';

interface WhatWeDoProps {
  onOpenInquiry: (serviceName?: string) => void;
}

export const WhatWeDo: React.FC<WhatWeDoProps> = ({ onOpenInquiry }) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [activeFullscreenIndex, setActiveFullscreenIndex] = useState<number | null>(null);
  const [expandedMobileIndex, setExpandedMobileIndex] = useState<number | null>(0);
  const { setCursorVariant, resetCursor } = useCursor();
  const isTouch = useIsTouchDevice();

  return (
    <section id="services" className="py-24 sm:py-32 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 sm:px-10">
        {/* Section Header */}
        <SectionHeader
          number="06"
          tag="CORE DISCIPLINES"
          title="WHAT WE DO"
          subtitle="From stadium-scale international conventions and anamorphic cinema to grassroots cultural archiving, we execute creative production without boundaries."
          align="right"
        />

        {/* Desktop Interactive Rows with Fullscreen Takeover Capability */}
        {!isTouch ? (
          <div className="divide-y divide-neutral-200 border-b border-neutral-200 relative">
            {servicesData.map((service, index) => {
              const isHovered = hoveredIndex === index;
              const isDimmed = hoveredIndex !== null && hoveredIndex !== index;

              return (
                <motion.div
                  key={service.id}
                  initial={{ opacity: 0, y: 25 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ duration: 0.5, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
                  onMouseEnter={() => {
                    setHoveredIndex(index);
                    setCursorVariant('view', 'EXPAND');
                  }}
                  onMouseLeave={() => {
                    setHoveredIndex(null);
                    resetCursor();
                  }}
                  onClick={() => setActiveFullscreenIndex(index)}
                  className={`relative h-[130px] sm:h-[145px] px-6 sm:px-10 flex items-center justify-between transition-all duration-400 overflow-hidden cursor-pointer group ${
                    isDimmed ? 'opacity-30' : 'opacity-100'
                  }`}
                >
                  {/* Background Media Clip-Path Hover Reveal */}
                  <AnimatePresence>
                    {isHovered && (
                      <motion.div
                        initial={{ clipPath: 'inset(100% 0 0 0)', opacity: 0 }}
                        animate={{ clipPath: 'inset(0% 0 0 0)', opacity: 1 }}
                        exit={{ clipPath: 'inset(0% 0 100% 0)', opacity: 0 }}
                        transition={{ duration: 0.55, ease: [0.76, 0, 0.24, 1] }}
                        className="absolute inset-0 z-0 overflow-hidden"
                      >
                        <img
                          src={service.bgImage}
                          alt={service.title}
                          className="w-full h-full object-cover filter brightness-50 contrast-125 scale-105"
                        />
                        <div className="absolute inset-0 bg-brand-black/45 backdrop-blur-[1px]" />
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Foreground Content */}
                  <div className="relative z-10 w-full flex items-center justify-between gap-6">
                    {/* Left: Number & Title */}
                    <div className="flex items-baseline space-x-6 sm:space-x-12">
                      <span className="font-mono text-sm sm:text-base font-bold text-brand-red">
                        {service.number}
                      </span>
                      <div>
                        <h3
                          className={`font-display-huge text-3xl sm:text-5xl lg:text-6xl font-black uppercase tracking-tight transition-all duration-300 ${
                            isHovered ? 'text-white translate-x-3' : 'text-brand-black'
                          }`}
                        >
                          {service.title}
                        </h3>
                        <p
                          className={`text-xs sm:text-sm font-medium mt-1 transition-colors ${
                            isHovered ? 'text-neutral-200' : 'text-neutral-500'
                          }`}
                        >
                          {service.tagline}
                        </p>
                      </div>
                    </div>

                    {/* Right: Capabilities & Arrow */}
                    <div className="flex items-center space-x-8">
                      <div className="hidden xl:flex flex-wrap max-w-sm gap-2">
                        {service.capabilities.slice(0, 3).map((cap, i) => (
                          <span
                            key={i}
                            className={`text-[10px] uppercase font-mono px-2.5 py-1 rounded transition-colors ${
                              isHovered
                                ? 'bg-white/20 text-white'
                                : 'bg-neutral-100 text-neutral-600'
                            }`}
                          >
                            {cap}
                          </span>
                        ))}
                      </div>

                      <div
                        className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 ${
                          isHovered
                            ? 'bg-brand-red text-white rotate-45 scale-110 shadow-lg'
                            : 'bg-neutral-100 text-neutral-700'
                        }`}
                      >
                        <ArrowRight className="w-5 h-5" />
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        ) : (
          /* Mobile Touch Accordion */
          <div className="divide-y divide-neutral-200 border-y border-neutral-200">
            {servicesData.map((service, index) => {
              const isExpanded = expandedMobileIndex === index;
              return (
                <div key={service.id} className="py-5">
                  <button
                    onClick={() => setExpandedMobileIndex(isExpanded ? null : index)}
                    className="w-full flex items-center justify-between text-left"
                  >
                    <div className="flex items-baseline space-x-4">
                      <span className="font-mono text-xs text-brand-red font-bold">{service.number}</span>
                      <span className="font-display text-2xl font-bold uppercase text-brand-black">
                        {service.title}
                      </span>
                    </div>
                    <ChevronDown
                      className={`w-5 h-5 text-neutral-600 transition-transform duration-300 ${
                        isExpanded ? 'rotate-180 text-brand-red' : ''
                      }`}
                    />
                  </button>

                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                        className="pt-4 space-y-4 overflow-hidden"
                      >
                        <div className="h-44 rounded-card overflow-hidden">
                          <img src={service.bgImage} alt={service.title} className="w-full h-full object-cover" />
                        </div>
                        <p className="text-xs text-neutral-600 leading-relaxed font-medium">{service.description}</p>
                        <div className="space-y-1.5 pt-2">
                          {service.capabilities.map((cap, idx) => (
                            <div key={idx} className="flex items-center space-x-2 text-xs font-semibold text-neutral-800">
                              <Check className="w-3.5 h-3.5 text-brand-red" />
                              <span>{cap}</span>
                            </div>
                          ))}
                        </div>
                        <button
                          onClick={() => onOpenInquiry(service.title)}
                          className="w-full mt-3 py-3 bg-brand-red text-white text-xs font-bold uppercase rounded"
                        >
                          INQUIRE ABOUT {service.title}
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Desktop Fullscreen Takeover Modal Preview (Requirement 17, 18) */}
      <AnimatePresence>
        {activeFullscreenIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-brand-black/95 text-white flex flex-col justify-between p-6 sm:p-12 overflow-y-auto"
          >
            {/* Top Bar */}
            <div className="flex items-center justify-between border-b border-neutral-800 pb-6 z-20">
              <div className="flex items-center space-x-3">
                <span className="font-mono text-xs font-bold text-brand-red">
                  {servicesData[activeFullscreenIndex].number}
                </span>
                <span className="text-xs font-mono uppercase tracking-widest text-neutral-400">
                  DISCIPLINE IMMERSIVE PREVIEW
                </span>
              </div>

              <button
                onClick={() => setActiveFullscreenIndex(null)}
                className="flex items-center space-x-2 px-4 py-2 rounded border border-neutral-700 hover:border-brand-red text-xs font-bold uppercase tracking-wider transition-colors"
              >
                <span>CLOSE PREVIEW</span>
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Background Full Bleed Media */}
            <div className="absolute inset-0 z-0">
              <img
                src={servicesData[activeFullscreenIndex].bgImage}
                alt={servicesData[activeFullscreenIndex].title}
                className="w-full h-full object-cover filter brightness-40 contrast-125"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
            </div>

            {/* Center Content */}
            <div className="relative z-10 max-w-4xl py-12 space-y-6">
              <span className="px-3 py-1 bg-brand-red text-white text-[10px] font-black uppercase tracking-widest rounded-subtle">
                {servicesData[activeFullscreenIndex].accentText}
              </span>

              <h2 className="font-display-huge text-5xl sm:text-7xl md:text-8xl font-black uppercase tracking-tight text-white leading-none">
                {servicesData[activeFullscreenIndex].title}
              </h2>

              <p className="text-lg sm:text-2xl font-bold text-neutral-200 max-w-2xl font-editorial-sub">
                {servicesData[activeFullscreenIndex].tagline}
              </p>

              <p className="text-sm sm:text-base text-neutral-300 max-w-2xl leading-relaxed">
                {servicesData[activeFullscreenIndex].description}
              </p>

              <div className="pt-4 grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-2xl">
                {servicesData[activeFullscreenIndex].capabilities.map((cap, idx) => (
                  <div key={idx} className="flex items-center space-x-2.5 text-xs sm:text-sm font-bold text-white bg-black/50 backdrop-blur-md p-3 rounded border border-neutral-700">
                    <Sparkles className="w-4 h-4 text-brand-red flex-shrink-0" />
                    <span>{cap}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom Action Bar */}
            <div className="relative z-10 flex items-center justify-between pt-6 border-t border-neutral-800">
              <span className="text-xs font-mono text-neutral-400">
                PRODUCING IN SABAH & NATIONWIDE
              </span>

              <MagneticButton
                variant="primary"
                onClick={() => {
                  const serviceTitle = servicesData[activeFullscreenIndex].title;
                  setActiveFullscreenIndex(null);
                  onOpenInquiry(serviceTitle);
                }}
                cursorText="INQUIRE"
              >
                <span>COMMISSION THIS SERVICE</span>
                <ArrowRight className="w-4 h-4" />
              </MagneticButton>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
