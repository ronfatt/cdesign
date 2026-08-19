import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, MessageCircle } from 'lucide-react';
import { useCursor } from '../../context/CursorContext';
import { useIsTouchDevice } from '../../hooks/useMediaQuery';

interface StartProjectCTAProps {
  onOpenInquiry: (intent?: string) => void;
}

const inquiryOptions = [
  "I'M PLANNING AN EVENT",
  "I NEED A FILM OR VIDEO",
  "I WANT TO BUILD A CAMPAIGN",
  "I'M LOOKING FOR A CREATIVE PARTNER",
  "SPONSORSHIP / FESTIVAL COLLABORATION",
  "OTHER CREATIVE ENQUIRY",
];

export const StartProjectCTA: React.FC<StartProjectCTAProps> = ({ onOpenInquiry }) => {
  const { setCursorVariant, resetCursor } = useCursor();
  const isTouch = useIsTouchDevice();

  return (
    <section id="contact" className="py-20 sm:py-36 bg-brand-red text-white relative overflow-hidden">
      {/* Background Graphic Grid */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="w-full h-full borneo-pattern-subtle filter invert" />
      </div>

      <div className="max-w-7xl mx-auto px-5 sm:px-10 relative z-10">
        {/* Top Kicker */}
        <div className="flex items-center space-x-2.5 mb-6 sm:mb-10">
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            className="w-6 sm:w-8 h-[2px] bg-white origin-left"
          />
          <span className="text-[10px] sm:text-xs font-mono font-bold tracking-[0.2em] sm:tracking-[0.25em] text-white/90 uppercase">
            14 — START A PRODUCTION
          </span>
        </div>

        {/* Headline */}
        <div className="mb-10 sm:mb-16">
          <div className="font-display-huge text-[clamp(2.4rem,10vw,6.5rem)] font-black uppercase tracking-tight leading-[0.9] sm:leading-[0.88] text-white">
            <div className="overflow-hidden">
              <motion.div
                initial={{ y: '100%' }}
                whileInView={{ y: '0%' }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              >
                LET'S CREATE
              </motion.div>
            </div>
            <div className="overflow-hidden">
              <motion.div
                initial={{ y: '100%' }}
                whileInView={{ y: '0%' }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              >
                SOMETHING
              </motion.div>
            </div>
            <div className="overflow-hidden">
              <motion.div
                initial={{ y: '100%' }}
                whileInView={{ y: '0%' }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              >
                WORTH REMEMBERING.
              </motion.div>
            </div>
          </div>

          <p className="text-xs sm:text-lg text-white/90 font-medium max-w-xl mt-4 sm:mt-6 leading-relaxed">
            Tell us about your ambition. Whether you're producing a stadium festival in Asia or an international documentary, we bring uncompromising craft from Tawau to the world.
          </p>

          {/* Quick Action Trigger on Mobile */}
          {isTouch && (
            <div className="pt-6 flex flex-col gap-3">
              <button
                onClick={() => onOpenInquiry()}
                className="h-14 bg-white text-brand-black text-xs font-bold uppercase tracking-wider rounded-subtle flex items-center justify-center space-x-2 active:scale-95 transition-transform shadow-xl"
              >
                <span>START A PROJECT</span>
                <ArrowRight className="w-4 h-4 text-brand-red" />
              </button>

              <a
                href="https://wa.me/60128188188?text=Hello%20C%20Design%20Production%2C%20I%20would%20like%20to%20inquire%20about%20a%20project."
                target="_blank"
                rel="noopener noreferrer"
                className="h-12 bg-black/30 border border-white/30 text-white text-xs font-bold uppercase tracking-wider rounded-subtle flex items-center justify-center space-x-2 active:scale-95 transition-transform"
              >
                <MessageCircle className="w-4 h-4" />
                <span>CHAT ON WHATSAPP (+60 12-818 8188)</span>
              </a>
            </div>
          )}
        </div>

        {/* Desktop Interactive Option Rows */}
        {!isTouch && (
          <div className="divide-y divide-white/20 border-y border-white/20">
            {inquiryOptions.map((option, idx) => (
              <motion.button
                key={option}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.08 * idx, ease: [0.16, 1, 0.3, 1] }}
                onClick={() => onOpenInquiry(option)}
                onMouseEnter={() => setCursorVariant('link')}
                onMouseLeave={resetCursor}
                whileHover={{ x: 6 }}
                className="w-full py-6 sm:py-8 px-4 sm:px-8 text-left flex items-center justify-between group relative overflow-hidden transition-all duration-300 rounded-subtle"
              >
                <span className="absolute inset-0 bg-white transform -translate-x-full group-hover:translate-x-0 transition-transform duration-400 ease-out z-0" />

                <div className="relative z-10 flex items-center space-x-6 sm:space-x-8">
                  <span className="font-mono text-xs sm:text-sm font-bold text-white/70 group-hover:text-brand-red transition-colors duration-300">
                    0{idx + 1}
                  </span>
                  <span className="font-display text-xl sm:text-3xl md:text-4xl font-bold uppercase tracking-tight text-white group-hover:text-brand-red transition-colors duration-300">
                    {option}
                  </span>
                </div>

                <div className="relative z-10 w-10 h-10 sm:w-12 sm:h-12 rounded-full border border-white/40 group-hover:border-brand-red group-hover:bg-brand-red text-white flex items-center justify-center transition-all duration-300 shadow-sm">
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </div>
              </motion.button>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
