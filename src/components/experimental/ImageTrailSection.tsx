import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, MousePointer } from 'lucide-react';
import { useIsTouchDevice } from '../../hooks/useMediaQuery';

interface TrailImage {
  id: number;
  x: number;
  y: number;
  url: string;
}

const trailImages = [
  'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=400&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1485846234645-a62644f84728?q=80&w=400&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1544717305-2782549b5136?q=80&w=400&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?q=80&w=400&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=400&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=400&auto=format&fit=crop',
];

export const ImageTrailSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [trail, setTrail] = useState<TrailImage[]>([]);
  const isTouch = useIsTouchDevice();
  const lastSpawnPos = useRef({ x: 0, y: 0 });
  const countRef = useRef(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isTouch || !containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const dist = Math.hypot(x - lastSpawnPos.current.x, y - lastSpawnPos.current.y);

    // Spawn every 65px movement
    if (dist > 65) {
      lastSpawnPos.current = { x, y };
      countRef.current += 1;
      const newImg: TrailImage = {
        id: countRef.current,
        x,
        y,
        url: trailImages[countRef.current % trailImages.length],
      };

      setTrail((prev) => [...prev.slice(-8), newImg]);

      // Remove after 850ms
      setTimeout(() => {
        setTrail((prev) => prev.filter((item) => item.id !== newImg.id));
      }, 850);
    }
  };

  return (
    <section
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative py-28 sm:py-36 bg-brand-light border-y border-neutral-200 overflow-hidden select-none"
    >
      {/* Floating Trail Images on Desktop */}
      {!isTouch &&
        trail.map((item) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, scale: 0.5, rotate: (item.id % 2 === 0 ? 1 : -1) * 12 }}
            animate={{ opacity: 1, scale: 1, rotate: (item.id % 2 === 0 ? 1 : -1) * 6 }}
            exit={{ opacity: 0, scale: 0.6 }}
            transition={{ duration: 0.3 }}
            style={{
              left: item.x - 70,
              top: item.y - 70,
            }}
            className="pointer-events-none absolute z-20 w-36 h-36 rounded-card overflow-hidden shadow-2xl border-2 border-white"
          >
            <img src={item.url} alt="Agency Trail" className="w-full h-full object-cover" />
          </motion.div>
        ))}

      <div className="max-w-5xl mx-auto px-6 text-center space-y-6 relative z-10">
        <div className="inline-flex items-center space-x-2 px-3 py-1 bg-white border border-neutral-300 rounded-full text-brand-red text-xs font-mono font-bold tracking-widest uppercase">
          <Sparkles className="w-3.5 h-3.5" />
          <span>EXPERIMENTAL CREATIVE LAB</span>
        </div>

        <h2 className="font-display-huge text-4xl sm:text-6xl md:text-7xl font-black uppercase tracking-tight text-brand-black leading-none">
          MOMENTS IN MOTION.<br />
          <span className="text-brand-red">CAPTURED IN REAL-TIME.</span>
        </h2>

        <p className="text-sm sm:text-base text-neutral-600 max-w-xl mx-auto font-medium">
          Every frame we shoot, every decibel we calibrate, every stage we illuminate is engineered to evoke visceral human resonance.
        </p>

        {!isTouch && (
          <div className="flex items-center justify-center space-x-2 text-xs font-mono text-neutral-400 pt-4">
            <MousePointer className="w-4 h-4 text-brand-red animate-bounce" />
            <span>MOVE CURSOR ACROSS THIS CANVAS TO AWAKEN PRODUCTION FRAMES</span>
          </div>
        )}
      </div>
    </section>
  );
};
