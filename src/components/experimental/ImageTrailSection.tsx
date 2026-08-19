import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Film, ArrowRight } from 'lucide-react';
import { useCursor } from '../../context/CursorContext';

interface ImageTrailSectionProps {
  onOpenShowreel?: () => void;
}

export const ImageTrailSection: React.FC<ImageTrailSectionProps> = ({ onOpenShowreel }) => {
  const { setCursorVariant, resetCursor } = useCursor();

  return (
    <section className="relative py-20 sm:py-28 bg-brand-light border-y border-neutral-200 overflow-hidden select-none">
      {/* Background Subtle Wave Texture */}
      <div className="absolute inset-0 opacity-5 pointer-events-none borneo-pattern-subtle" />

      <div className="max-w-5xl mx-auto px-6 text-center space-y-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-flex items-center space-x-2 px-3 py-1 bg-white border border-neutral-300 rounded-full text-brand-red text-xs font-mono font-bold tracking-widest uppercase shadow-sm"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>PRODUCTION EXCELLENCE & CRAFT</span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="font-display-huge text-3xl sm:text-6xl md:text-7xl font-black uppercase tracking-tight text-brand-black leading-tight"
        >
          MOMENTS IN MOTION.<br />
          <span className="text-brand-red">CAPTURED IN HIGH RES.</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-xs sm:text-base text-neutral-600 max-w-xl mx-auto font-medium leading-relaxed"
        >
          Every frame we shoot, every decibel we calibrate, every stage we illuminate is engineered to evoke visceral human resonance across Borneo and beyond.
        </motion.p>

        {onOpenShowreel && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="pt-4 flex justify-center"
          >
            <button
              onClick={onOpenShowreel}
              onMouseEnter={() => setCursorVariant('play', 'PLAY')}
              onMouseLeave={resetCursor}
              className="h-12 px-6 bg-brand-black text-white text-xs font-bold uppercase tracking-wider rounded flex items-center space-x-2 hover:bg-brand-red active:scale-95 transition-all shadow-md"
            >
              <Film className="w-4 h-4 text-brand-red" />
              <span>WATCH PRODUCTION REEL</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </motion.div>
        )}
      </div>
    </section>
  );
};
