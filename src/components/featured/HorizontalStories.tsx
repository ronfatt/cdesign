import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, MapPin } from 'lucide-react';
import type { Project } from '../../types';
import { projectsData } from '../../data/projectsData';
import { useCursor } from '../../context/CursorContext';
import { useIsTouchDevice } from '../../hooks/useMediaQuery';

interface HorizontalStoriesProps {
  onSelectProject: (project: Project) => void;
}

export const HorizontalStories: React.FC<HorizontalStoriesProps> = ({ onSelectProject }) => {
  const targetRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const { setCursorVariant, resetCursor } = useCursor();
  const isTouch = useIsTouchDevice();
  const [activeStoryIndex, setActiveStoryIndex] = useState(0);

  const featuredStories = projectsData.filter((p) => p.isFeatured).slice(0, 4);

  // Desktop horizontal scroll mapping
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ['start start', 'end end'],
  });

  const x = useTransform(scrollYProgress, [0, 1], ['0%', '-68%']);

  // Desktop scroll sync
  useEffect(() => {
    if (isTouch) return;
    const unsubscribe = scrollYProgress.on('change', (v) => {
      const idx = Math.min(Math.floor(v * featuredStories.length), featuredStories.length - 1);
      setActiveStoryIndex(idx);
    });
    return () => unsubscribe();
  }, [scrollYProgress, featuredStories.length, isTouch]);

  // Mobile scroll snap sync
  const handleMobileScroll = () => {
    if (!scrollContainerRef.current) return;
    const scrollLeft = scrollContainerRef.current.scrollLeft;
    const itemWidth = scrollContainerRef.current.offsetWidth * 0.86;
    const currentIndex = Math.min(Math.round(scrollLeft / itemWidth), featuredStories.length - 1);
    setActiveStoryIndex(currentIndex);
  };

  return (
    <section
      ref={targetRef}
      className={`relative bg-brand-black text-white ${
        isTouch ? 'py-16' : 'h-[300vh]'
      }`}
    >
      {/* Container */}
      <div className={isTouch ? 'px-5' : 'sticky top-0 h-screen flex flex-col justify-between py-10 px-6 sm:px-12 overflow-hidden'}>
        {/* Section Header with Dynamic Counter */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between border-b border-neutral-800 pb-4 sm:pb-5 mb-6 z-10">
          <div>
            <div className="flex items-center space-x-2.5 mb-2">
              <motion.div
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                className="w-5 sm:w-6 h-[2px] bg-brand-red origin-left"
              />
              <span className="text-[10px] sm:text-xs font-mono font-bold tracking-[0.2em] sm:tracking-[0.25em] text-neutral-400 uppercase">
                05 — FEATURED STORIES
              </span>
            </div>
            <h2 className="font-display-huge text-3xl sm:text-6xl font-black uppercase tracking-tight text-white">
              FEATURED STORIES
            </h2>
          </div>

          <div className="text-xs font-mono text-neutral-400 mt-2 sm:mt-0 flex items-center space-x-3">
            <span className="text-brand-red font-bold text-sm">
              0{activeStoryIndex + 1} / 0{featuredStories.length}
            </span>
            <span className="text-neutral-500">·</span>
            <span className="text-[11px]">{isTouch ? 'SWIPE HORIZONTALLY' : 'SCROLL TO ADVANCE'}</span>
          </div>
        </div>

        {/* Stories Cards Rail */}
        {isTouch ? (
          /* Mobile Native Horizontal Swipe (86vw with visible next card peek) */
          <div className="space-y-4">
            <div
              ref={scrollContainerRef}
              onScroll={handleMobileScroll}
              className="flex space-x-4 overflow-x-auto pb-4 scrollbar-none snap-x snap-mandatory -mx-5 px-5"
            >
              {featuredStories.map((story) => (
                <div
                  key={story.id}
                  onClick={() => onSelectProject(story)}
                  className="w-[86vw] flex-shrink-0 snap-center rounded-card overflow-hidden bg-neutral-900 border border-neutral-800 active:scale-[0.98] transition-transform"
                >
                  <div className="h-56 relative">
                    <img src={story.heroImage} alt={story.title} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />
                    
                    <span className="absolute top-3 left-3 bg-brand-red text-white text-[9px] font-black uppercase px-2 py-0.5 rounded">
                      {story.number}
                    </span>
                    <span className="absolute top-3 right-3 bg-black/60 text-white text-[9px] font-mono px-2 py-0.5 rounded flex items-center space-x-1">
                      <MapPin className="w-2.5 h-2.5 text-brand-red" />
                      <span>{story.location}</span>
                    </span>
                  </div>

                  <div className="p-5 space-y-2">
                    <span className="text-xs font-mono text-brand-red uppercase font-bold">{story.category}</span>
                    <h3 className="font-display text-xl font-bold uppercase line-clamp-1">{story.title}</h3>
                    <p className="text-xs text-neutral-400 line-clamp-2 leading-relaxed">{story.summary}</p>
                    
                    <div className="pt-2 flex items-center space-x-2 text-xs font-bold text-brand-red uppercase">
                      <span>EXPLORE CASE</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Mobile Red Progress Bar */}
            <div className="w-full h-1 bg-neutral-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-brand-red transition-all duration-300"
                style={{ width: `${((activeStoryIndex + 1) / featuredStories.length) * 100}%` }}
              />
            </div>
          </div>
        ) : (
          /* Desktop Pinned Horizontal Rail */
          <div
            className="flex-1 flex items-center"
            onMouseEnter={() => setCursorVariant('drag', 'DRAG')}
            onMouseLeave={resetCursor}
          >
            <motion.div style={{ x }} className="flex space-x-12 pl-4 pr-24">
              {featuredStories.map((story, idx) => {
                const isActive = idx === activeStoryIndex;
                return (
                  <div
                    key={story.id}
                    onClick={() => onSelectProject(story)}
                    className="w-[75vw] max-w-4xl h-[460px] rounded-card overflow-hidden bg-neutral-900 border border-neutral-800 relative group flex-shrink-0 cursor-pointer shadow-2xl transition-all duration-500"
                  >
                    <img
                      src={story.heroImage}
                      alt={story.title}
                      className={`w-full h-full object-cover filter contrast-110 brightness-90 transition-transform duration-700 ${
                        isActive ? 'scale-100' : 'scale-105'
                      } group-hover:scale-105`}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />

                    <div className="absolute top-6 left-6 right-6 flex items-center justify-between z-10">
                      <div className="flex items-center space-x-3">
                        <span className="font-mono text-2xl font-black text-brand-red">
                          {story.number}
                        </span>
                        <span className="px-3 py-1 bg-white/10 backdrop-blur-md rounded text-xs font-bold uppercase tracking-wider text-neutral-200">
                          {story.category}
                        </span>
                      </div>

                      <div className="flex items-center space-x-2 text-xs font-mono text-neutral-300">
                        <MapPin className="w-3.5 h-3.5 text-brand-red" />
                        <span>{story.location}</span>
                      </div>
                    </div>

                    <div className="absolute bottom-6 left-6 right-6 z-10 space-y-3">
                      <h3 className="font-display text-3xl sm:text-4xl font-black uppercase text-white group-hover:text-brand-red transition-colors duration-300">
                        {story.title}
                      </h3>
                      <p className="text-sm text-neutral-300 max-w-2xl font-medium line-clamp-2">
                        {story.summary}
                      </p>

                      <div className="pt-2 flex items-center space-x-2 text-xs font-bold text-brand-red uppercase tracking-wider">
                        <span>VIEW FEATURED STORY</span>
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform duration-300" />
                      </div>
                    </div>
                  </div>
                );
              })}
            </motion.div>
          </div>
        )}

        {/* Bottom Desktop Progress Bar */}
        {!isTouch && (
          <div className="border-t border-neutral-800 pt-4 flex items-center justify-between text-xs font-mono text-neutral-500">
            <span>05 — FEATURED STORIES</span>
            <div className="w-64 h-1 bg-neutral-800 rounded-full overflow-hidden">
              <motion.div
                style={{ scaleX: scrollYProgress, transformOrigin: 'left' }}
                className="h-full bg-brand-red transition-transform duration-100"
              />
            </div>
            <span>BORNEO TO THE WORLD</span>
          </div>
        )}
      </div>
    </section>
  );
};
