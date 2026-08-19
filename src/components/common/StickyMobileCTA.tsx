import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, MessageCircle } from 'lucide-react';
import { useIsTouchDevice } from '../../hooks/useMediaQuery';

interface StickyMobileCTAProps {
  onOpenInquiry: () => void;
}

export const StickyMobileCTA: React.FC<StickyMobileCTAProps> = ({ onOpenInquiry }) => {
  const [isVisible, setIsVisible] = useState(false);
  const isTouch = useIsTouchDevice();

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const docHeight = document.documentElement.scrollHeight;
      const windowHeight = window.innerHeight;

      // Show after scrolling past hero (350px) and hide when near bottom final CTA (within 600px of footer)
      const nearBottom = scrollY + windowHeight >= docHeight - 550;
      if (scrollY > 350 && !nearBottom) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Only render on touch/mobile devices
  if (!isTouch) return null;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 80, opacity: 0 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="fixed bottom-0 left-0 right-0 z-40 p-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] bg-white/95 backdrop-blur-md border-t border-neutral-200 shadow-2xl flex items-center gap-2"
        >
          {/* Primary Red CTA Button */}
          <button
            onClick={onOpenInquiry}
            className="flex-1 h-12 bg-brand-red text-white text-xs font-bold uppercase tracking-wider rounded-subtle flex items-center justify-center space-x-2 active:scale-95 transition-transform shadow-md"
          >
            <span>START A PROJECT</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          {/* Quick WhatsApp Action Button */}
          <a
            href="https://wa.me/60128188188?text=Hello%20C%20Design%20Production%2C%20I%20would%20like%20to%20inquire%20about%20a%20project."
            target="_blank"
            rel="noopener noreferrer"
            className="h-12 px-3.5 bg-[#25D366] text-white rounded-subtle flex items-center justify-center space-x-1.5 text-xs font-bold uppercase active:scale-95 transition-transform shadow-md"
            aria-label="Chat on WhatsApp"
          >
            <MessageCircle className="w-4 h-4 fill-current" />
            <span className="hidden sm:inline">WHATSAPP</span>
          </a>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
