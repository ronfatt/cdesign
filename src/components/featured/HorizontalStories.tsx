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

  // Track active slide based on scroll progress
  useEffect(() => {
    const unsubscribe = scrollYProgress.on('change', (v) => {
      const idx = Math.min(Math.floor(v * featuredStories.length), featuredStories.length - 1);
      setActiveStoryIndex(idx);
    });
    return () => unsubscribe();
  }, [scrollYProgress, featuredStories.length]);

  return (
    <section
      ref={targetRef}
      className={`relative bg-brand-black text-white ${
        isTouch ? 'py-20' : 'h-[300vh]'
      }`}
    >
      {/* Pinned Viewport Container for Desktop */}
      <div className={isTouch ? 'px-6' : 'sticky top-0 h-screen flex flex-col justify-between py-10 px-6 sm:px-12 overflow-hidden'}>
        {/* Section Header with Dynamic Counter */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between border-b border-neutral-800 pb-5 mb-6 z-10">
          <div>
            <div className="flex items-center space-x-3 mb-2">
              <motion.div
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                className="w-6 h-[2px] bg-brand-red origin-left"
              />
              <span className="text-xs font-mono font-bold tracking-[0.25em] text-neutral-400 uppercase">
                05 — FEATURED STORIES
              </span>
            </div>
            <h2 className="font-display-huge text-4xl sm:text-6xl font-black uppercase tracking-tight text-white">
              FEATURED STORIES
            </h2>
          </div>

          <div className="text-xs font-mono text-neutral-400 mt-2 sm:mt-0 flex items-center space-x-4">
            <span className="text-brand-red font-bold text-sm">
              0{activeStoryIndex + 1} / 0{featuredStories.length}
            </span>
            <span className="hidden sm:inline">·</span>
            <span className="hidden sm:inline">SCROLL TO ADVANCE</span>
          </div>
        </div>

        {/* Stories Cards Rail */}
        {isTouch ? (
          /* Mobile Native Horizontal Swipe with visible next card edge */
          <div className="flex space-x-5 overflow-x-auto pb-6 scrollbar-none snap-x snap-mandatory">
            {featuredStories.map((story) => (
              <div
                key={story.id}
                onClick={() => onSelectProject(story)}
                className="w-[82vw] flex-shrink-0 snap-center rounded-card overflow-hidden bg-neutral-900 border border-neutral-800"
              >
                <div className="h-60 relative">
                  <img src={story.heroImage} alt={story.title} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
                  <span className="absolute top-3 left-3 bg-brand-red text-white text-[9px] font-black uppercase px-2 py-0.5 rounded">
                    {story.number}
                  </span>
                </div>
                <div className="p-5 space-y-2">
                  <span className="text-xs font-mono text-brand-red uppercase font-bold">{story.category}</span>
                  <h3 className="font-display text-xl font-bold uppercase">{story.title}</h3>
                  <p className="text-xs text-neutral-400 line-clamp-2">{story.summary}</p>
                </div>
              </div>
            ))}
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
                    {/* Background Image with subtle scale parallax */}
                    <img
                      src={story.heroImage}
                      alt={story.title}
                      className={`w-full h-full object-cover filter contrast-110 brightness-90 transition-transform duration-700 ${
                        isActive ? 'scale-100' : 'scale-105'
                      } group-hover:scale-105`}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />

                    {/* Top Bar */}
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

                    {/* Bottom Content */}
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

        {/* Bottom Thin Red Progress Bar */}
        <div className="border-t border-neutral-800 pt-4 flex items-center justify-between text-xs font-mono text-neutral-500">
          <span>05 — FEATURED STORIES</span>
          <div className="w-64 h-1 bg-neutral-800 rounded-full overflow-hidden hidden sm:block">
            <motion.div
              style={{ scaleX: scrollYProgress, transformOrigin: 'left' }}
              className="h-full bg-brand-red transition-transform duration-100"
            />
          </div>
          <span>BORNEO TO THE WORLD</span>
        </div>
      </div>
    </section>
  );
};
