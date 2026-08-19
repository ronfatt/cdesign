import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';
import { originalsData } from '../../data/originalsData';
import { useCursor } from '../../context/CursorContext';
import { useIsTouchDevice } from '../../hooks/useMediaQuery';
import { SectionHeader } from '../common/SectionHeader';

interface OriginalsCarouselProps {
  onOpenInquiry: (ipName?: string) => void;
}

export const OriginalsCarousel: React.FC<OriginalsCarouselProps> = ({ onOpenInquiry }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const { setCursorVariant, resetCursor } = useCursor();
  const isTouch = useIsTouchDevice();

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % originalsData.length);
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + originalsData.length) % originalsData.length);
  };

  const currentOriginal = originalsData[activeIndex];

  return (
    <section id="originals" className="py-24 sm:py-32 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 sm:px-10">
        {/* Section Header */}
        <SectionHeader
          number="08"
          tag="PROPRIETARY INTELLECTUAL PROPERTY"
          title="C DESIGN ORIGINALS"
          subtitle={
            <h3 className="font-editorial-sub text-lg sm:text-xl font-black uppercase tracking-tight text-neutral-900 leading-snug">
              WE DON'T JUST PRODUCE PROJECTS.<br />
              <span className="text-brand-red">WE CREATE OUR OWN.</span>
            </h3>
          }
          align="right"
        />

        {/* Carousel Presentation Container */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Column: Interactive 3D Depth Card View */}
          <div
            className="lg:col-span-7 relative h-[420px] sm:h-[500px] flex items-center justify-center select-none"
            onMouseEnter={() => setCursorVariant('drag', 'DRAG')}
            onMouseLeave={resetCursor}
          >
            {originalsData.map((item, idx) => {
              const offset = idx - activeIndex;
              const isCurrent = idx === activeIndex;
              const isVisible = Math.abs(offset) <= 2;

              if (!isVisible) return null;

              return (
                <motion.div
                  key={item.id}
                  onClick={() => setActiveIndex(idx)}
                  animate={{
                    x: offset * (isTouch ? 40 : 70),
                    scale: isCurrent ? 1 : 0.94 - Math.abs(offset) * 0.04,
                    zIndex: 20 - Math.abs(offset),
                    opacity: isCurrent ? 1 : 0.72 - Math.abs(offset) * 0.15,
                    rotateY: offset * -8,
                  }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute w-[85%] sm:w-[460px] h-[360px] sm:h-[440px] rounded-card overflow-hidden shadow-2xl bg-neutral-900 border border-neutral-300 cursor-pointer"
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover filter contrast-110 brightness-90 transition-transform duration-700 hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />

                  {/* Badges on Card */}
                  <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-10">
                    <span className="px-3 py-1 bg-brand-red text-white text-[10px] font-black uppercase tracking-widest rounded-subtle shadow-md">
                      {item.status}
                    </span>
                    <span className="text-xs font-mono font-bold text-white bg-black/60 backdrop-blur-md px-2.5 py-1 rounded">
                      {item.year}
                    </span>
                  </div>

                  {/* Card Title Bottom */}
                  <div className="absolute bottom-4 left-4 right-4 z-10 text-white space-y-1">
                    <span className="text-xs font-mono text-brand-red font-bold">{item.number}</span>
                    <h4 className="font-display text-xl sm:text-2xl font-bold uppercase tracking-tight line-clamp-1">
                      {item.title}
                    </h4>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Right Column: Detailed Narrative & Controls */}
          <div className="lg:col-span-5 space-y-6">
            <div className="flex items-center space-x-2">
              <span className="px-3 py-1 bg-neutral-100 text-brand-black text-xs font-mono font-bold uppercase rounded">
                {currentOriginal.category}
              </span>
              <span className="text-xs font-mono font-bold text-brand-red">
                {currentOriginal.status}
              </span>
            </div>

            <h3 className="font-display text-3xl sm:text-4xl font-black uppercase tracking-tight text-brand-black leading-tight">
              {currentOriginal.title}
            </h3>

            <p className="text-base font-semibold text-neutral-800">
              {currentOriginal.tagline}
            </p>

            <p className="text-sm text-neutral-600 leading-relaxed font-medium">
              {currentOriginal.description}
            </p>

            {/* Accent Quote */}
            <div className="border-l-2 border-brand-red pl-4 py-1 italic text-xs font-semibold text-neutral-700">
              "{currentOriginal.accentQuote}"
            </div>

            {/* Carousel Controls & Pagination */}
            <div className="flex items-center justify-between pt-6 border-t border-neutral-200">
              <div className="flex items-center space-x-4">
                <button
                  onClick={handlePrev}
                  onMouseEnter={() => setCursorVariant('link')}
                  onMouseLeave={resetCursor}
                  className="w-10 h-10 rounded-full border border-neutral-300 hover:border-brand-red hover:bg-brand-red hover:text-white flex items-center justify-center transition-all"
                  aria-label="Previous IP"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>

                <button
                  onClick={handleNext}
                  onMouseEnter={() => setCursorVariant('link')}
                  onMouseLeave={resetCursor}
                  className="w-10 h-10 rounded-full border border-neutral-300 hover:border-brand-red hover:bg-brand-red hover:text-white flex items-center justify-center transition-all"
                  aria-label="Next IP"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>

                <span className="font-mono text-sm font-bold text-brand-black">
                  0{activeIndex + 1} / 0{originalsData.length}
                </span>
              </div>

              <button
                onClick={() => onOpenInquiry(currentOriginal.title)}
                onMouseEnter={() => setCursorVariant('link')}
                onMouseLeave={resetCursor}
                className="inline-flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-brand-red hover:text-brand-black transition-colors"
              >
                <span>PARTNER ON THIS IP</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
