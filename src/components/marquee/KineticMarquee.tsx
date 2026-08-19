import React from 'react';
import { useCursor } from '../../context/CursorContext';

const tickerWords = [
  'EXPERIENCES',
  'FILM & CINEMA',
  'MOVE PEOPLE',
  'CULTURE & TOURISM',
  'CREATIVE DIRECTION',
  'BORNEO',
  'ARENA STAGING',
  'MOVE PEOPLE',
  'IMPACT & HUMANITY',
  'TAWAU · SABAH',
];

export const KineticMarquee: React.FC = () => {
  const { setCursorVariant, resetCursor } = useCursor();

  return (
    <div
      className="py-6 sm:py-8 bg-white border-y-2 border-neutral-900 overflow-hidden select-none group"
      onMouseEnter={() => setCursorVariant('link')}
      onMouseLeave={resetCursor}
    >
      <div className="flex w-max group-hover:[animation-play-state:paused] animate-marquee">
        {[...tickerWords, ...tickerWords].map((word, idx) => {
          const isHighlight = word === 'MOVE PEOPLE';

          return (
            <div key={idx} className="flex items-center space-x-6 sm:space-x-10 px-4 sm:px-6">
              <span
                className={`font-display-huge text-4xl sm:text-6xl md:text-7xl font-black uppercase tracking-tight whitespace-nowrap transition-colors ${
                  isHighlight ? 'text-brand-red underline decoration-brand-red underline-offset-8' : 'text-brand-black'
                }`}
              >
                {word}
              </span>
              <span className="text-brand-red text-2xl sm:text-3xl font-black">×</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
