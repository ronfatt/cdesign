import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, Play, Compass, MapPin } from 'lucide-react';
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

  // Desktop-only mouse parallax state with clamped bounds
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (isTouch) return;
    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      const x = (e.clientX / innerWidth - 0.5) * 2;
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

  const headlineScale = useTransform(scrollYProgress, [0, 0.7], [1, isTouch ? 0.98 : 0.94]);
  const headlineY = useTransform(scrollYProgress, [0, 0.7], [0, isTouch ? -20 : -50]);
  const collageScale = useTransform(scrollYProgress, [0, 0.7], [1, isTouch ? 1.02 : 1.08]);
  const collageOpacity = useTransform(scrollYProgress, [0, 0.85], [1, 0.2]);

  return (
    <section
      ref={containerRef}
      id="hero"
      className="relative min-h-[92vh] sm:min-h-screen flex flex-col justify-between pt-24 sm:pt-36 pb-10 sm:pb-16 px-5 sm:px-10 max-w-7xl mx-auto overflow-hidden"
    >
      {/* Background Subtle Borneo Grid Texture */}
      <div className="absolute inset-0 borneo-pattern-subtle pointer-events-none opacity-40" />

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 lg:gap-8 items-center flex-1 z-10">
        {/* Left Column: Line-by-Line Staged Headline Reveal */}
        <motion.div
          style={{ scale: headlineScale, y: headlineY }}
          className="lg:col-span-7 flex flex-col justify-center space-y-5 sm:space-y-7 text-left"
        >
          {/* Section Kicker + Horizontal Thin Red Line */}
          <div className="flex items-center space-x-2.5">
            <motion.div
              initial={{ scaleX: 0 }}
              animate={isLoaded ? { scaleX: 1 } : { scaleX: 0 }}
              transition={{ duration: 0.45, delay: 0.05, ease: [0.16, 1, 0.3, 1] }}
              className="w-6 sm:w-8 h-[2px] bg-brand-red origin-left"
            />
            <motion.span
              initial={{ opacity: 0, x: -10 }}
              animate={isLoaded ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 }}
              transition={{ duration: 0.45, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="text-[10px] sm:text-xs font-mono font-bold tracking-[0.2em] sm:tracking-[0.25em] text-neutral-600 uppercase"
            >
              CREATIVE PRODUCTION · BORNEO
            </motion.span>
          </div>

          {/* Staged Line-by-Line Reveal Typography with Mobile Clamp */}
          <div className="font-display-huge text-[clamp(2.5rem,11vw,6.5rem)] font-bold text-brand-black leading-[0.9] sm:leading-[0.88] tracking-tight">
            {/* Line 1 */}
            <div className="overflow-hidden">
              <motion.div
                initial={{ y: '110%' }}
                animate={isLoaded ? { y: '0%' } : { y: '110%' }}
                transition={{ duration: 0.5, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
              >
                WE CREATE
              </motion.div>
            </div>

            {/* Line 2 */}
            <div className="overflow-hidden">
              <motion.div
                initial={{ y: '110%' }}
                animate={isLoaded ? { y: '0%' } : { y: '110%' }}
                transition={{ duration: 0.5, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
              >
                EXPERIENCES
              </motion.div>
            </div>

            {/* Line 3 with Red Sweep on MOVE */}
            <div className="overflow-hidden">
              <motion.div
                initial={{ y: '110%' }}
                animate={isLoaded ? { y: '0%' } : { y: '110%' }}
                transition={{ duration: 0.5, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
                className="flex items-center space-x-2 sm:space-x-3 flex-wrap"
              >
                <span>THAT</span>
                <span className="relative inline-block text-brand-red px-1">
                  <span>MOVE</span>
                  {/* Red Underline Sweep */}
                  <motion.span
                    initial={{ scaleX: 0 }}
                    animate={isLoaded ? { scaleX: 1 } : { scaleX: 0 }}
                    transition={{ duration: 0.45, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
                    className="absolute -bottom-0.5 sm:-bottom-1 left-0 right-0 h-[3px] sm:h-[4px] bg-brand-red origin-left"
                  />
                </span>
                <span>PEOPLE.</span>
              </motion.div>
            </div>
          </div>

          {/* Supporting Statement */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={isLoaded ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }}
            transition={{ duration: 0.5, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="space-y-2 max-w-xl"
          >
            <p className="text-base sm:text-2xl font-bold tracking-tight text-neutral-900 font-editorial-sub">
              Born in Borneo. Creating Beyond Borders.
            </p>
            <p className="text-xs sm:text-base text-neutral-600 font-medium leading-relaxed">
              We are a premier creative production studio engineering stadium-scale festivals, cinematic films, brand systems, and cultural landmarks from Tawau, Sabah across Asia.
            </p>
          </motion.div>

          {/* Action CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={isLoaded ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }}
            transition={{ duration: 0.5, delay: 0.55, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 pt-2"
          >
            <MagneticButton
              variant="primary"
              onClick={onNavigateWork}
              className="!h-12 !w-full sm:!w-auto !text-xs sm:!text-sm active:scale-95 transition-transform"
              cursorText="WORK"
            >
              <span>VIEW OUR WORK</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform duration-300" />
            </MagneticButton>

            <button
              onClick={onPlayShowreel}
              onMouseEnter={() => setCursorVariant('play', 'PLAY')}
              onMouseLeave={resetCursor}
              className="h-12 w-full sm:w-auto inline-flex items-center justify-center space-x-3 px-5 bg-white text-brand-black border border-neutral-300 text-xs sm:text-sm font-bold uppercase tracking-wider rounded-subtle hover:border-brand-red active:scale-95 transition-all duration-300 shadow-sm"
            >
              <div className="w-6 h-6 rounded-full bg-brand-red/10 text-brand-red flex items-center justify-center">
                <Play className="w-3 h-3 translate-x-0.5 fill-current" />
              </div>
              <span>PLAY SHOWREEL</span>
            </button>
          </motion.div>
        </motion.div>

        {/* Right Column: Mobile Single Dominant Visual vs Desktop 4-Layer Collage */}
        <motion.div
          style={{ scale: collageScale, opacity: collageOpacity }}
          className="lg:col-span-5 relative w-full flex items-center justify-center select-none"
        >
          {isTouch ? (
            /* Mobile Single High-Impact Dominant Visual (4:5 Ratio) */
            <div className="relative w-full aspect-[4/5] sm:aspect-[4/3] rounded-card overflow-hidden shadow-2xl border border-neutral-200">
              <img
                src="https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=1000&auto=format&fit=crop"
                alt="C Design Production Arena"
                className="w-full h-full object-cover filter contrast-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />

              <div className="absolute top-3 left-3 flex items-center space-x-1.5 bg-black/60 backdrop-blur-sm text-white px-2.5 py-1 rounded text-[10px] font-mono">
                <MapPin className="w-3 h-3 text-brand-red" />
                <span>TAWAU · SABAH</span>
              </div>

              <div className="absolute bottom-4 left-4 right-4 text-white space-y-1">
                <span className="text-[9px] font-mono uppercase tracking-widest text-brand-red bg-white/95 px-2 py-0.5 font-bold rounded">
                  FEATURED PRODUCTION
                </span>
                <h4 className="font-display text-lg font-bold uppercase">BICC 2026 ARENA</h4>
                <p className="text-xs text-neutral-300 font-medium line-clamp-1">
                  Stadium Scenography & Intercultural Festival
                </p>
              </div>
            </div>
          ) : (
            /* Desktop Layered Multi-Plane Parallax Collage */
            <div className="relative h-[480px] lg:h-[560px] w-full flex items-center justify-center">
              {/* Layer 1: Background Rainforest */}
              <motion.div
                initial={{ opacity: 0, scale: 1.05 }}
                animate={isLoaded ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 1.05 }}
                transition={{ duration: 0.9, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
                style={{
                  x: mousePos.x * 5,
                  y: mousePos.y * 5,
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

              {/* Layer 2: Midground Stage */}
              <motion.div
                initial={{ opacity: 0, scale: 1.05 }}
                animate={isLoaded ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 1.05 }}
                transition={{ duration: 0.9, delay: 0.75, ease: [0.16, 1, 0.3, 1] }}
                style={{
                  x: mousePos.x * -10,
                  y: mousePos.y * -10,
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

              {/* Layer 3: Foreground Cinema Camera */}
              <motion.div
                initial={{ opacity: 0, scale: 1.05 }}
                animate={isLoaded ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 1.05 }}
                transition={{ duration: 0.9, delay: 0.9, ease: [0.16, 1, 0.3, 1] }}
                style={{
                  x: mousePos.x * 16,
                  y: mousePos.y * 16,
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

              {/* Layer 4: Cultural Badge */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isLoaded ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.8, delay: 1.05, ease: [0.16, 1, 0.3, 1] }}
                style={{
                  x: mousePos.x * -12,
                  y: mousePos.y * 12,
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
            </div>
          )}
        </motion.div>
      </div>

      {/* Bottom Scroll Indicator */}
      <div className="flex items-center justify-between pt-6 sm:pt-10 border-t border-neutral-200 z-10 text-neutral-500 text-xs font-mono">
        <div className="flex items-center space-x-2">
          <div className="w-1.5 h-1.5 bg-brand-red rounded-full animate-ping" />
          <span className="uppercase font-semibold tracking-wider text-neutral-800 text-[11px]">
            SCROLL TO EXPLORE
          </span>
        </div>

        <div className="hidden sm:flex items-center space-x-6 text-[11px]">
          <span>CREATIVE PRODUCTION</span>
          <span>·</span>
          <span>FILM & CINEMA</span>
          <span>·</span>
          <span>CULTURE & IMPACT</span>
        </div>

        <span className="font-mono text-brand-red font-bold">01 / 15</span>
      </div>
    </section>
  );
};
