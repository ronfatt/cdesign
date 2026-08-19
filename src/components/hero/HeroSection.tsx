import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, Play, Compass } from 'lucide-react';
import { useCursor } from '../../context/CursorContext';
import { useIsTouchDevice } from '../../hooks/useMediaQuery';
import { MagneticButton } from '../common/MagneticButton';

interface HeroSectionProps {
  onPlayShowreel: () => void;
  onNavigateWork: () => void;
  isLoaded?: boolean;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onPlayShowreel,
  onNavigateWork,
  isLoaded = true,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { setCursorVariant, resetCursor } = useCursor();
  const isTouch = useIsTouchDevice();

  // Mouse parallax state with clamped bounds
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (isTouch) return;
    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      const x = (e.clientX / innerWidth - 0.5) * 2; // -1 to 1
      const y = (e.clientY / innerHeight - 0.5) * 2;
      setMousePos({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [isTouch]);

  // Scroll transformation (0-600px scroll)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  const headlineScale = useTransform(scrollYProgress, [0, 0.7], [1, 0.94]);
  const headlineY = useTransform(scrollYProgress, [0, 0.7], [0, -50]);
  const collageScale = useTransform(scrollYProgress, [0, 0.7], [1, 1.08]);
  const collageOpacity = useTransform(scrollYProgress, [0, 0.85], [1, 0.15]);
  const indicatorOpacity = useTransform(scrollYProgress, [0, 0.25], [1, 0]);

  return (
    <section
      ref={containerRef}
      id="hero"
      className="relative min-h-screen flex flex-col justify-between pt-28 pb-12 sm:pt-36 sm:pb-16 px-6 sm:px-10 max-w-7xl mx-auto overflow-hidden"
    >
      {/* Background Subtle Borneo Grid Texture */}
      <div className="absolute inset-0 borneo-pattern-subtle pointer-events-none" />

      {/* Main Grid Content */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center flex-1 z-10">
        {/* Left Column: Line-by-Line Staged Headline Reveal */}
        <motion.div
          style={{ scale: headlineScale, y: headlineY }}
          className="lg:col-span-7 flex flex-col justify-center space-y-6 sm:space-y-8 text-left"
        >
          {/* Section Kicker + Horizontal Thin Red Line */}
          <div className="flex items-center space-x-3">
            <motion.div
              initial={{ scaleX: 0 }}
              animate={isLoaded ? { scaleX: 1 } : { scaleX: 0 }}
              transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="w-8 h-[2px] bg-brand-red origin-left"
            />
            <motion.span
              initial={{ opacity: 0, x: -10 }}
              animate={isLoaded ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 }}
              transition={{ duration: 0.6, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="text-xs font-mono font-bold tracking-[0.25em] text-neutral-600 uppercase"
            >
              CREATIVE PRODUCTION · BORNEO
            </motion.span>
          </div>

          {/* Staged Line-by-Line Reveal Typography */}
          <div className="font-display-huge text-5xl sm:text-7xl md:text-8xl xl:text-[6.5rem] font-bold text-brand-black leading-[0.88] tracking-tight">
            {/* Line 1 */}
            <div className="overflow-hidden">
              <motion.div
                initial={{ y: '110%' }}
                animate={isLoaded ? { y: '0%' } : { y: '110%' }}
                transition={{ duration: 0.75, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
              >
                WE CREATE
              </motion.div>
            </div>

            {/* Line 2 */}
            <div className="overflow-hidden">
              <motion.div
                initial={{ y: '110%' }}
                animate={isLoaded ? { y: '0%' } : { y: '110%' }}
                transition={{ duration: 0.75, delay: 0.48, ease: [0.16, 1, 0.3, 1] }}
              >
                EXPERIENCES
              </motion.div>
            </div>

            {/* Line 3 with Red Sweep on MOVE */}
            <div className="overflow-hidden">
              <motion.div
                initial={{ y: '110%' }}
                animate={isLoaded ? { y: '0%' } : { y: '110%' }}
                transition={{ duration: 0.75, delay: 0.62, ease: [0.16, 1, 0.3, 1] }}
                className="flex items-center space-x-3 flex-wrap"
              >
                <span>THAT</span>
                <span className="relative inline-block text-brand-red px-1">
                  <span>MOVE</span>
                  {/* Subtle Red Underline Sweep */}
                  <motion.span
                    initial={{ scaleX: 0 }}
                    animate={isLoaded ? { scaleX: 1 } : { scaleX: 0 }}
                    transition={{ duration: 0.6, delay: 0.95, ease: [0.16, 1, 0.3, 1] }}
                    className="absolute -bottom-1 left-0 right-0 h-[4px] bg-brand-red origin-left"
                  />
                </span>
                <span>PEOPLE.</span>
              </motion.div>
            </div>
          </div>

          {/* Supporting Text */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isLoaded ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.7, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="border-l-2 border-brand-red pl-4 sm:pl-6 max-w-lg space-y-1"
          >
            <p className="text-base sm:text-xl font-bold text-brand-black tracking-tight">
              Born in Borneo. Creating Beyond Borders.
            </p>
            <p className="text-xs sm:text-sm text-neutral-600 font-medium leading-relaxed">
              We design stadium-scale conventions, cinematic films, and transformative cultural narratives from Tawau, Sabah for the global stage.
            </p>
          </motion.div>

          {/* Interactive Magnetic CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isLoaded ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.7, delay: 0.95, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-wrap items-center gap-4 pt-2"
          >
            <MagneticButton
              variant="primary"
              onClick={onNavigateWork}
              cursorText="WORK"
            >
              <span>VIEW OUR WORK</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform duration-300" />
            </MagneticButton>

            {/* Play Showreel Button with Magnetic Hover & Expanding Circle */}
            <button
              onClick={onPlayShowreel}
              onMouseEnter={() => setCursorVariant('play', 'PLAY')}
              onMouseLeave={resetCursor}
              className="group inline-flex items-center space-x-3.5 px-6 py-3.5 bg-white text-brand-black border border-neutral-300 text-xs sm:text-sm font-bold uppercase tracking-wider rounded-subtle hover:border-brand-red transition-all duration-300 shadow-sm"
            >
              <div className="w-7 h-7 rounded-full bg-brand-red/10 text-brand-red group-hover:bg-brand-red group-hover:text-white flex items-center justify-center transition-all duration-300 group-hover:scale-110">
                <Play className="w-3.5 h-3.5 translate-x-0.5 group-hover:translate-x-1 transition-transform" />
              </div>
              <span className="group-hover:translate-x-1 transition-transform duration-300">
                PLAY SHOWREEL
              </span>
            </button>
          </motion.div>
        </motion.div>

        {/* Right Column: Layered Cinematic Image Collage with Layered Cursor Parallax & Clip-Path Reveals */}
        <motion.div
          style={{ scale: collageScale, opacity: collageOpacity }}
          className="lg:col-span-5 relative h-[420px] sm:h-[500px] lg:h-[560px] w-full flex items-center justify-center select-none"
        >
          {/* Layer 1: Background Atmospheric Rainforest / Ocean (Range ±5px) */}
          <motion.div
            initial={{ opacity: 0, scale: 1.05 }}
            animate={isLoaded ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 1.05 }}
            transition={{ duration: 0.9, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
            style={{
              x: isTouch ? 0 : mousePos.x * 5,
              y: isTouch ? 0 : mousePos.y * 5,
            }}
            className="absolute top-0 right-0 w-3/4 h-3/5 rounded-card overflow-hidden shadow-lg z-0 border border-neutral-200"
          >
            <img
              src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=1000&auto=format&fit=crop"
              alt="Borneo Landscape"
              className="w-full h-full object-cover filter brightness-90 contrast-105"
            />
            <div className="absolute bottom-2 right-2 bg-black/70 backdrop-blur-sm text-white text-[9px] font-mono px-2 py-0.5 rounded">
              04°15'N · 117°53'E
            </div>
          </motion.div>

          {/* Layer 2: Midground Stage & Lighting Production (Range ±10px) */}
          <motion.div
            initial={{ opacity: 0, scale: 1.05 }}
            animate={isLoaded ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 1.05 }}
            transition={{ duration: 0.9, delay: 0.75, ease: [0.16, 1, 0.3, 1] }}
            style={{
              x: isTouch ? 0 : mousePos.x * -10,
              y: isTouch ? 0 : mousePos.y * -10,
            }}
            className="absolute bottom-4 left-0 w-4/5 h-3/5 rounded-card overflow-hidden shadow-2xl z-10 border border-neutral-200"
          >
            <img
              src="https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=1000&auto=format&fit=crop"
              alt="Arena Production Stage"
              className="w-full h-full object-cover filter brightness-95 contrast-115"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            <div className="absolute bottom-3 left-3 text-white">
              <span className="text-[9px] font-mono uppercase tracking-widest text-brand-red bg-white/90 px-1.5 py-0.5 font-bold rounded">
                BICC 2026
              </span>
              <p className="text-xs font-bold mt-1">Arena Scenography</p>
            </div>
          </motion.div>

          {/* Layer 3: Foreground Cinema Camera & Lens Rig (Range ±16px) */}
          <motion.div
            initial={{ opacity: 0, scale: 1.05 }}
            animate={isLoaded ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 1.05 }}
            transition={{ duration: 0.9, delay: 0.9, ease: [0.16, 1, 0.3, 1] }}
            style={{
              x: isTouch ? 0 : mousePos.x * 16,
              y: isTouch ? 0 : mousePos.y * 16,
            }}
            className="absolute -top-4 -left-2 sm:left-4 w-44 sm:w-52 h-44 sm:h-52 rounded-card overflow-hidden shadow-2xl z-20 border-2 border-white"
          >
            <img
              src="https://images.unsplash.com/photo-1485846234645-a62644f84728?q=80&w=800&auto=format&fit=crop"
              alt="Cinema Camera Rig"
              className="w-full h-full object-cover"
            />
            <div className="absolute top-2 left-2 bg-brand-red text-white text-[8px] font-black uppercase tracking-widest px-2 py-0.5 rounded">
              ANAMORPHIC CINE
            </div>
          </motion.div>

          {/* Layer 4: Cultural Graphic Badge Floating */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isLoaded ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8, delay: 1.05, ease: [0.16, 1, 0.3, 1] }}
            style={{
              x: isTouch ? 0 : mousePos.x * -12,
              y: isTouch ? 0 : mousePos.y * 12,
            }}
            className="absolute bottom-12 right-2 bg-brand-black text-white p-3.5 rounded-card shadow-2xl z-30 max-w-[170px] border border-neutral-700"
          >
            <div className="flex items-center space-x-2 text-[10px] font-mono text-brand-red">
              <Compass className="w-3 h-3 animate-spin" style={{ animationDuration: '10s' }} />
              <span>TAWAU, SABAH</span>
            </div>
            <p className="text-[11px] font-bold mt-1 text-white leading-tight">
              International Creative Production Studio
            </p>
          </motion.div>
        </motion.div>
      </div>

      {/* Bottom Scroll Indicator */}
      <motion.div
        style={{ opacity: indicatorOpacity }}
        className="flex items-center justify-between pt-8 sm:pt-12 border-t border-neutral-200 z-10 text-neutral-500 text-xs font-mono"
      >
        <div className="flex items-center space-x-3">
          <div className="w-1.5 h-1.5 bg-brand-red rounded-full animate-ping" />
          <span className="uppercase font-semibold tracking-wider text-neutral-800">
            SCROLL TO EXPLORE
          </span>
          <div className="w-8 h-[1px] bg-brand-red" />
        </div>

        <div className="hidden sm:flex items-center space-x-6 text-[11px]">
          <span>CREATIVE PRODUCTION</span>
          <span>·</span>
          <span>FILM & CINEMA</span>
          <span>·</span>
          <span>CULTURE & IMPACT</span>
        </div>

        <span className="font-mono text-brand-red font-bold">01 / 15</span>
      </motion.div>
    </section>
  );
};
