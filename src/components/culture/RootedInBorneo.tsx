import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Compass } from 'lucide-react';
import { useCursor } from '../../context/CursorContext';
import { SectionHeader } from '../common/SectionHeader';

interface LocationSpot {
  name: string;
  code: string;
  coords: string;
  tagline: string;
  image: string;
  description: string;
}

const locations: LocationSpot[] = [
  {
    name: 'TAWAU',
    code: 'TWU',
    coords: '04°14\'42"N · 117°53\'28"E',
    tagline: 'The Creative Epicenter & Production Foundry',
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=1200&auto=format&fit=crop',
    description: 'Where C Design was founded. A thriving coastal melting pot of maritime culture, rich heritage, and boundless creative hunger.'
  },
  {
    name: 'SEMPORNA',
    code: 'SCA',
    coords: '04°28\'48"N · 118°36\'40"E',
    tagline: 'Anamorphic Seascapes & Bajau Laut Lore',
    image: 'https://images.unsplash.com/photo-1536240478700-b869070f9279?q=80&w=1200&auto=format&fit=crop',
    description: 'The world purest waters and timeless seafaring traditions. Our primary canvas for landmark cinematography and marine visual poetry.'
  },
  {
    name: 'SABAH',
    code: 'SBH',
    coords: '05°58\'48"N · 116°04\'30"E',
    tagline: 'Ancient Rainforests & Living Indigenous Tapestry',
    image: 'https://images.unsplash.com/photo-1544717305-2782549b5136?q=80&w=1200&auto=format&fit=crop',
    description: 'Home to 30+ ethnic groups, Mount Kinabalu, and prehistoric rainforests. The cultural wellspring that infuses all our productions.'
  },
  {
    name: 'BORNEO',
    code: 'BRN',
    coords: '00°58\'00"N · 114°09\'00"E',
    tagline: 'The Third Largest Island on Earth · Our Global Identity',
    image: 'https://images.unsplash.com/photo-1518173946687-a4c8a383392e?q=80&w=1200&auto=format&fit=crop',
    description: 'A global symbol of untamed nature, human resilience, and cultural diversity. We bring Borneo stories to the world without compromise.'
  }
];

export const RootedInBorneo: React.FC = () => {
  const [activeLocation, setActiveLocation] = useState<number>(0);
  const { setCursorVariant, resetCursor } = useCursor();
  const currentLoc = locations[activeLocation];

  return (
    <section className="py-24 sm:py-32 bg-brand-black text-white relative overflow-hidden">
      {/* Abstract Borneo Weaving Mask Grid in Background */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="w-full h-full borneo-pattern-subtle filter invert" />
      </div>

      <div className="max-w-7xl mx-auto px-6 sm:px-10 relative z-10">
        {/* Section Header */}
        <SectionHeader
          number="09"
          tag="CULTURAL GEOGRAPHY"
          theme="dark"
          title={
            <div className="flex flex-col space-y-1">
              <motion.div
                initial={{ opacity: 0, x: -35 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              >
                ROOTED IN BORNEO.
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 35 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="text-brand-red"
              >
                CREATING BEYOND BORDERS.
              </motion.div>
            </div>
          }
          subtitle={
            <p className="text-base sm:text-xl text-neutral-300 font-medium max-w-xl">
              Our stories begin here. Tawau. Sabah. Borneo. But they don’t stop here.
            </p>
          }
          align="right"
        />

        {/* Typographic Interactive Map Experience */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center pt-8 border-t border-neutral-800">
          {/* Left Column: Huge Typographic Buttons */}
          <div className="lg:col-span-5 space-y-3.5">
            {locations.map((loc, idx) => {
              const isActive = activeLocation === idx;
              return (
                <button
                  key={loc.name}
                  onClick={() => setActiveLocation(idx)}
                  onMouseEnter={() => setCursorVariant('link')}
                  onMouseLeave={resetCursor}
                  className={`w-full text-left p-5 rounded-card border transition-all duration-300 flex items-center justify-between ${
                    isActive
                      ? 'bg-neutral-900 border-brand-red shadow-lg translate-x-2'
                      : 'bg-transparent border-neutral-800 hover:border-neutral-700 hover:bg-neutral-900/50'
                  }`}
                >
                  <div>
                    <div className="flex items-center space-x-3">
                      <span className={`font-mono text-xs font-bold ${isActive ? 'text-brand-red' : 'text-neutral-500'}`}>
                        {loc.code}
                      </span>
                      <span className="font-display text-2xl sm:text-3xl font-black uppercase tracking-tight text-white">
                        {loc.name}
                      </span>
                    </div>
                    <span className="text-[11px] font-mono text-neutral-400 block mt-1">
                      {loc.coords}
                    </span>
                  </div>

                  <div className={`w-3 h-3 rounded-full ${isActive ? 'bg-brand-red' : 'bg-neutral-700'}`} />
                </button>
              );
            })}
          </div>

          {/* Right Column: Visual Showcase & Coordinate Badge */}
          <div className="lg:col-span-7 relative h-[420px] sm:h-[500px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeLocation}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.05 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="relative w-full h-full rounded-card overflow-hidden border border-neutral-700 shadow-2xl"
              >
                <img
                  src={currentLoc.image}
                  alt={currentLoc.name}
                  className="w-full h-full object-cover filter brightness-90 contrast-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />

                {/* Top Badge */}
                <div className="absolute top-6 left-6 flex items-center space-x-2 bg-black/70 backdrop-blur-md px-3.5 py-1.5 rounded text-xs font-mono text-white">
                  <Compass className="w-3.5 h-3.5 text-brand-red" />
                  <span>{currentLoc.coords}</span>
                </div>

                {/* Bottom Narrative Box */}
                <div className="absolute bottom-6 left-6 right-6 text-white space-y-2">
                  <span className="text-xs font-mono font-bold text-brand-red uppercase">
                    {currentLoc.name} · REGIONAL IDENTITY
                  </span>
                  <h4 className="font-display text-2xl font-bold uppercase tracking-tight">
                    {currentLoc.tagline}
                  </h4>
                  <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed font-medium">
                    {currentLoc.description}
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};
