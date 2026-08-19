import React from 'react';
import { partnerLogos } from '../../data/testimonialsData';
import { useCursor } from '../../context/CursorContext';

export const PartnerLogos: React.FC = () => {
  const { setCursorVariant, resetCursor } = useCursor();

  return (
    <section className="py-16 sm:py-20 bg-brand-light border-y border-neutral-200 overflow-hidden select-none">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 mb-8 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <span className="w-2 h-2 bg-brand-red" />
          <span className="text-xs font-mono font-bold tracking-[0.2em] text-neutral-500 uppercase">
            12 · TRUSTED COLLABORATORS & PARTNERS
          </span>
        </div>
        <span className="text-[11px] font-mono text-neutral-400">GLOBAL NETWORK</span>
      </div>

      {/* Infinite Looping Partner Strip */}
      <div
        className="flex w-max group-hover:[animation-play-state:paused] animate-marquee"
        onMouseEnter={() => setCursorVariant('link')}
        onMouseLeave={resetCursor}
      >
        {[...partnerLogos, ...partnerLogos].map((partner, idx) => (
          <div
            key={idx}
            className="flex flex-col items-center justify-center px-8 sm:px-12 py-4 mx-4 bg-white rounded-card border border-neutral-200 shadow-sm hover:border-brand-red transition-all duration-300 min-w-[220px] group/item"
          >
            <span className="font-display text-sm sm:text-base font-bold uppercase tracking-tight text-neutral-700 group-hover/item:text-brand-red transition-colors text-center">
              {partner.name}
            </span>
            <span className="text-[10px] font-mono uppercase text-neutral-400 mt-1">
              {partner.category}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
};
