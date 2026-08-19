import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface PageWipeProps {
  isTransitioning: boolean;
  onTransitionComplete?: () => void;
}

export const PageWipe: React.FC<PageWipeProps> = ({ isTransitioning, onTransitionComplete }) => {
  return (
    <AnimatePresence onExitComplete={onTransitionComplete}>
      {isTransitioning && (
        <div className="fixed inset-0 z-50 pointer-events-none overflow-hidden">
          {/* Main Red Wipe Panel */}
          <motion.div
            initial={{ scaleX: 0, transformOrigin: 'right' }}
            animate={{ scaleX: 1, transformOrigin: 'right' }}
            exit={{ scaleX: 0, transformOrigin: 'left' }}
            transition={{
              duration: 0.55,
              ease: [0.76, 0, 0.24, 1],
            }}
            className="absolute inset-0 bg-brand-red flex items-center justify-center"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3, delay: 0.15 }}
              className="text-white text-center"
            >
              <span className="font-display text-4xl sm:text-6xl font-black uppercase tracking-tighter block">
                C DESIGN
              </span>
              <span className="text-xs uppercase tracking-[0.3em] opacity-80 mt-1 block">
                Production · Borneo
              </span>
            </motion.div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
