import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Globe, MapPin, Film } from 'lucide-react';
import { useCursor } from '../../context/CursorContext';

const stats = [
  {
    number: '15+',
    label: 'YEARS CREATIVE EXPERIENCE',
    subtext: 'Pioneering live spatial design & cinema in Sabah.',
    icon: Sparkles,
  },
  {
    number: '100+',
    label: 'PROJECTS DELIVERED',
    subtext: 'Stadium conventions, films, and experiential campaigns.',
    icon: Film,
  },
  {
    number: 'GLOBAL',
    label: 'CREATIVE NETWORK',
    subtext: '20+ international delegate partnerships across 5 continents.',
    icon: Globe,
  },
  {
    number: 'BORNEO',
    label: 'TAWAU · SABAH',
    subtext: 'Authentically rooted in Borneo, broadcasting globally.',
    icon: MapPin,
  },
];

export const LiveStats: React.FC = () => {
  const { setCursorVariant, resetCursor } = useCursor();

  return (
    <section className="bg-brand-light py-20 sm:py-28 border-y border-neutral-200 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 sm:px-10">
        {/* Subtle Section Tag */}
        <div className="flex items-center space-x-3 mb-12 sm:mb-16">
          <span className="w-2 h-2 bg-brand-red" />
          <span className="text-xs font-mono font-bold tracking-[0.2em] text-neutral-500 uppercase">
            03 · BRAND FOOTPRINT & SCALE
          </span>
        </div>

        {/* 4-Column Editorial Stat Layout (Not a generic dashboard card) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 relative">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 35 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.6, delay: index * 0.12, ease: [0.16, 1, 0.3, 1] }}
                onMouseEnter={() => setCursorVariant('link')}
                onMouseLeave={resetCursor}
                className="group relative flex flex-col justify-between border-t border-neutral-300 pt-6"
              >
                {/* Animated Red Line on Hover */}
                <div className="absolute top-0 left-0 w-0 h-[2px] bg-brand-red group-hover:w-full transition-all duration-500 ease-out" />

                <div>
                  <div className="flex items-center justify-between text-neutral-400 mb-4">
                    <span className="font-mono text-xs font-bold text-brand-red">0{index + 1}</span>
                    <Icon className="w-4 h-4 text-neutral-400 group-hover:text-brand-red transition-colors" />
                  </div>

                  {/* Huge Editorial Number */}
                  <div className="font-display-huge text-5xl sm:text-6xl lg:text-5xl xl:text-6xl font-black tracking-tight text-brand-black group-hover:text-brand-red transition-colors duration-300">
                    {stat.number}
                  </div>

                  {/* Label */}
                  <h3 className="font-editorial-sub text-sm sm:text-base font-black tracking-tight uppercase text-neutral-900 mt-2">
                    {stat.label}
                  </h3>
                </div>

                {/* Subtext */}
                <p className="text-xs text-neutral-600 font-medium mt-4 leading-relaxed">
                  {stat.subtext}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
