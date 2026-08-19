import React from 'react';
import { motion } from 'framer-motion';
import { btsItems } from '../../data/btsData';
import { useCursor } from '../../context/CursorContext';
import { SectionHeader } from '../common/SectionHeader';

export const TeamBTSCollage: React.FC = () => {
  const { setCursorVariant, resetCursor } = useCursor();

  const manifestoWords = ['WE', 'CREATE', 'WITH', 'PEOPLE', 'FOR', 'PEOPLE.'];

  return (
    <section id="about" className="py-24 sm:py-32 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 sm:px-10">
        {/* Section Header */}
        <SectionHeader
          number="11"
          tag="COLLECTIVE & ETHOS"
          title="WE ARE C DESIGN."
          subtitle={
            <div className="font-editorial-sub text-lg sm:text-xl font-black uppercase tracking-tight text-neutral-900 leading-snug flex flex-wrap gap-x-2">
              {manifestoWords.map((word, idx) => (
                <motion.span
                  key={idx}
                  initial={{ opacity: 0.2, y: 5 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: idx * 0.08, ease: [0.16, 1, 0.3, 1] }}
                  className={word === 'PEOPLE.' || word === 'FOR' ? 'text-brand-red' : 'text-brand-black'}
                >
                  {word}
                </motion.span>
              ))}
            </div>
          }
          align="right"
        />

        {/* Staggered BTS Photographic Collage Grid with Layered Parallax */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 sm:gap-8 items-stretch">
          {/* Collage Item 1: Large Left */}
          <motion.div
            initial={{ opacity: 0, y: 35 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
            className="md:col-span-7 bg-neutral-900 rounded-card overflow-hidden relative min-h-[380px] sm:min-h-[460px] group border border-neutral-200"
            onMouseEnter={() => setCursorVariant('view', 'BTS')}
            onMouseLeave={resetCursor}
          >
            <img
              src={btsItems[0].image}
              alt={btsItems[0].title}
              className="w-full h-full object-cover filter contrast-110 group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
            <div className="absolute bottom-6 left-6 right-6 text-white space-y-1">
              <span className="text-[10px] font-mono text-brand-red font-bold uppercase tracking-widest bg-black/60 px-2 py-0.5 rounded">
                {btsItems[0].role}
              </span>
              <h4 className="font-display text-2xl font-bold uppercase tracking-tight">
                {btsItems[0].title}
              </h4>
              <p className="text-xs text-neutral-300 font-medium">{btsItems[0].caption}</p>
            </div>
          </motion.div>

          {/* Collage Item 2: Right Top */}
          <motion.div
            initial={{ opacity: 0, y: 35 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="md:col-span-5 bg-neutral-900 rounded-card overflow-hidden relative min-h-[300px] sm:min-h-[320px] group border border-neutral-200"
            onMouseEnter={() => setCursorVariant('view', 'STAGE')}
            onMouseLeave={resetCursor}
          >
            <img
              src={btsItems[1].image}
              alt={btsItems[1].title}
              className="w-full h-full object-cover filter contrast-110 group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
            <div className="absolute bottom-4 left-4 right-4 text-white space-y-1">
              <span className="text-[10px] font-mono text-brand-red font-bold uppercase tracking-widest bg-black/60 px-2 py-0.5 rounded">
                {btsItems[1].role}
              </span>
              <h4 className="font-display text-xl font-bold uppercase tracking-tight">
                {btsItems[1].title}
              </h4>
              <p className="text-xs text-neutral-300 font-medium">{btsItems[1].caption}</p>
            </div>
          </motion.div>

          {/* Collage Item 3: Center Creed Card */}
          <motion.div
            initial={{ opacity: 0, y: 35 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="md:col-span-4 bg-brand-light rounded-card p-6 sm:p-8 flex flex-col justify-between border border-neutral-200"
          >
            <div className="space-y-4">
              <img
                src="/logo.png"
                alt="CDesign Production Emblem"
                className="w-9 h-9 object-contain rounded-full shadow-sm"
              />
              <h4 className="font-display text-2xl font-bold uppercase tracking-tight text-brand-black">
                OUR PRODUCTION CREED
              </h4>
              <p className="text-xs sm:text-sm text-neutral-700 leading-relaxed font-medium">
                We believe exceptional creative production demands equal parts rigorous technical discipline and deep human empathy.
              </p>
            </div>
            <div className="pt-4 border-t border-neutral-300 text-xs font-mono font-bold text-neutral-500">
              TAWAU STUDIO · 24/7
            </div>
          </motion.div>

          {/* Collage Item 4: Bottom Right */}
          <motion.div
            initial={{ opacity: 0, y: 35 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="md:col-span-8 bg-neutral-900 rounded-card overflow-hidden relative min-h-[300px] group border border-neutral-200"
            onMouseEnter={() => setCursorVariant('view', 'AUDIO')}
            onMouseLeave={resetCursor}
          >
            <img
              src={btsItems[3].image}
              alt={btsItems[3].title}
              className="w-full h-full object-cover filter contrast-110 group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
            <div className="absolute bottom-6 left-6 right-6 text-white space-y-1">
              <span className="text-[10px] font-mono text-brand-red font-bold uppercase tracking-widest bg-black/60 px-2 py-0.5 rounded">
                {btsItems[3].role}
              </span>
              <h4 className="font-display text-2xl font-bold uppercase tracking-tight">
                {btsItems[3].title}
              </h4>
              <p className="text-xs text-neutral-300 font-medium">{btsItems[3].caption}</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
