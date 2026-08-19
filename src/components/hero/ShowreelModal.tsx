import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, Volume2, VolumeX, X } from 'lucide-react';
import { useCursor } from '../../context/CursorContext';

interface ShowreelModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ShowreelModal: React.FC<ShowreelModalProps> = ({ isOpen, onClose }) => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState(0);
  const currentTime = '00:14';
  const durationTime = '02:45';
  const { setCursorVariant, resetCursor } = useCursor();

  useEffect(() => {
    let interval: number;
    if (isOpen && isPlaying) {
      interval = window.setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) return 0;
          return prev + 0.5;
        });
      }, 200);
    }
    return () => window.clearInterval(interval);
  }, [isOpen, isPlaying]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          className="fixed inset-0 z-50 bg-black flex items-center justify-center p-4 sm:p-8"
        >
          {/* Top Bar */}
          <div className="absolute top-6 left-6 right-6 flex items-center justify-between z-20 text-white">
            <div className="flex items-center space-x-3">
              <span className="w-2.5 h-2.5 rounded-full bg-brand-red animate-pulse" />
              <span className="font-mono text-xs uppercase tracking-widest text-neutral-300">
                C DESIGN SHOWREEL · 4K DIRECTORS CUT
              </span>
            </div>

            <button
              onClick={onClose}
              onMouseEnter={() => setCursorVariant('link')}
              onMouseLeave={resetCursor}
              className="flex items-center space-x-2 px-4 py-2 bg-neutral-900/80 hover:bg-brand-red rounded text-xs font-bold uppercase tracking-wider transition-colors"
            >
              <span>CLOSE</span>
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Video Container (Expanding rectangle) */}
          <motion.div
            initial={{ scale: 0.85, opacity: 0, y: 30 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.85, opacity: 0, y: 30 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-5xl aspect-video bg-neutral-900 rounded-card overflow-hidden shadow-2xl border border-neutral-800"
          >
            {/* Cinematic Video Simulation with High-Quality Production Footage */}
            <div className="absolute inset-0">
              <img
                src="https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=1800&auto=format&fit=crop"
                alt="Showreel Visual Master"
                className="w-full h-full object-cover filter contrast-125 brightness-90 scale-105 transition-transform duration-1000"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/40" />

              {/* Centered Watermark & Anamorphic Letterbox */}
              <div className="absolute top-4 left-4 z-10 flex items-center space-x-2 text-[10px] font-mono tracking-widest text-neutral-400 bg-black/60 px-3 py-1 rounded">
                <span>REC ● 24FPS</span>
                <span>·</span>
                <span>TAWAU / BORNEO</span>
              </div>
            </div>

            {/* Play/Pause Large Center Overlay Trigger */}
            <div
              className="absolute inset-0 flex items-center justify-center cursor-pointer"
              onClick={() => setIsPlaying(!isPlaying)}
            >
              {!isPlaying && (
                <motion.div
                  initial={{ scale: 0.5, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="w-20 h-20 rounded-full bg-brand-red/90 flex items-center justify-center text-white shadow-2xl backdrop-blur-sm"
                >
                  <Play className="w-8 h-8 translate-x-0.5" />
                </motion.div>
              )}
            </div>

            {/* Bottom Controls Bar */}
            <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 bg-gradient-to-t from-black via-black/80 to-transparent z-10">
              {/* Scrubber Progress Bar */}
              <div
                className="w-full h-1.5 bg-neutral-700 rounded-full mb-4 cursor-pointer overflow-hidden relative group"
                onClick={(e) => {
                  const rect = e.currentTarget.getBoundingClientRect();
                  const clickX = e.clientX - rect.left;
                  const newProgress = (clickX / rect.width) * 100;
                  setProgress(newProgress);
                }}
              >
                <div
                  className="h-full bg-brand-red transition-all duration-100"
                  style={{ width: `${progress}%` }}
                />
              </div>

              <div className="flex items-center justify-between text-white text-xs font-mono">
                <div className="flex items-center space-x-4">
                  <button
                    onClick={() => setIsPlaying(!isPlaying)}
                    className="p-2 hover:text-brand-red transition-colors"
                  >
                    {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                  </button>

                  <button
                    onClick={() => setIsMuted(!isMuted)}
                    className="p-2 hover:text-brand-red transition-colors"
                  >
                    {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                  </button>

                  <span className="text-neutral-400">
                    {currentTime} / {durationTime}
                  </span>
                </div>

                <div className="flex items-center space-x-3 text-[11px] text-neutral-400">
                  <span className="hidden sm:inline">PROD. C DESIGN TAWAU</span>
                  <span className="px-2 py-0.5 bg-white/10 rounded">4K UHD</span>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
