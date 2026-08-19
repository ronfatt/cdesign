import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Quote, ChevronLeft, ChevronRight, MapPin } from 'lucide-react';
import { testimonialsData } from '../../data/testimonialsData';
import { useCursor } from '../../context/CursorContext';

export const TestimonialSection: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const { setCursorVariant, resetCursor } = useCursor();

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonialsData.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonialsData.length) % testimonialsData.length);
  };

  const current = testimonialsData[currentIndex];

  return (
    <section className="py-24 sm:py-32 bg-[#FFFFFF] relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-6 sm:px-10">
        {/* Section Tag */}
        <div className="flex items-center justify-between mb-16 pb-6 border-b border-neutral-200">
          <div className="flex items-center space-x-3">
            <span className="w-2.5 h-2.5 bg-brand-red" />
            <span className="text-xs font-mono font-bold tracking-[0.25em] text-neutral-500 uppercase">
              13 · VOICES & IMPACT
            </span>
          </div>

          <div className="flex items-center space-x-3">
            <button
              onClick={handlePrev}
              onMouseEnter={() => setCursorVariant('link')}
              onMouseLeave={resetCursor}
              className="w-10 h-10 rounded-full border border-neutral-300 hover:border-brand-red hover:bg-brand-red hover:text-white flex items-center justify-center transition-all"
              aria-label="Previous Testimonial"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={handleNext}
              onMouseEnter={() => setCursorVariant('link')}
              onMouseLeave={resetCursor}
              className="w-10 h-10 rounded-full border border-neutral-300 hover:border-brand-red hover:bg-brand-red hover:text-white flex items-center justify-center transition-all"
              aria-label="Next Testimonial"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Oversized Quote Block with Mask Reveal */}
        <div className="min-h-[280px] sm:min-h-[320px] flex flex-col justify-between">
          <AnimatePresence mode="wait">
            <motion.div
              key={current.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="space-y-8"
            >
              <Quote className="w-10 h-10 sm:w-14 sm:h-14 text-brand-red opacity-80" />

              <p className="font-display text-2xl sm:text-4xl md:text-5xl font-bold uppercase tracking-tight text-brand-black leading-snug">
                “{current.quote}”
              </p>

              {/* Author & Organization Details */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between border-t border-neutral-200 pt-6 gap-2 text-xs font-mono">
                <div>
                  <span className="font-bold text-sm text-neutral-900 block font-editorial-sub uppercase">
                    {current.author}
                  </span>
                  <span className="text-neutral-500 mt-0.5 block">
                    {current.role} · {current.organization}
                  </span>
                </div>

                <div className="flex items-center space-x-2 text-neutral-500">
                  <MapPin className="w-3.5 h-3.5 text-brand-red" />
                  <span>{current.location}</span>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};
