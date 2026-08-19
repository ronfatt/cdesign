import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ArrowRight, X, Volume2, VolumeX, CheckCircle2 } from 'lucide-react';
import type { Project } from '../../types';
import { projectsData } from '../../data/projectsData';
import { useCursor } from '../../context/CursorContext';
import { MagneticButton } from '../common/MagneticButton';

interface FlagshipCaseStudyProps {
  project: Project;
  onBack: () => void;
  onSelectNextProject: (nextProject: Project) => void;
}

// Documentary Film Frame Timeline Data for BICC
const filmFrameTimeline = [
  {
    day: 'DAY 01',
    title: 'THE ARRIVAL & SACRED FORESTS',
    description: 'Delegates from 25 nations converge at Tawau Hills Rainforest, meeting indigenous Murut and Kadazandusun custodians for an unprecedented intercultural blessing.',
    image: 'https://images.unsplash.com/photo-1544717305-2782549b5136?q=80&w=1600&auto=format&fit=crop',
    timecode: '08:42:15:04',
    badge: 'DAY 01 · RAINFOREST WELCOME'
  },
  {
    day: 'DAY 02',
    title: 'ARENA SCENOGRAPHY & GALA PREMIERE',
    description: '180 automated DMX kinetic fixtures illuminate the main convention arena as master physical theatre directors open the 6-day festival with stadium-scale theatrical poetry.',
    image: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=1600&auto=format&fit=crop',
    timecode: '19:15:40:12',
    badge: 'DAY 02 · GALA ARENA OPENING'
  },
  {
    day: 'DAY 03',
    title: 'PEDIATRIC HOSPITAL WINGS & HUMANITARIAN JOY',
    description: 'Teams deploy into regional hospital wards and interior learning centers, bringing therapeutic laughter and compassion to 8,500 children and their families.',
    image: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=1600&auto=format&fit=crop',
    timecode: '11:05:22:08',
    badge: 'DAY 03 · THERAPEUTIC MISSION'
  },
  {
    day: 'DAY 04',
    title: 'MASTERCLASSES & CROSS-CULTURAL JAM',
    description: 'French and Japanese physical theatre masters jam alongside Sumazau and bamboo percussionists, creating new hybrid performance languages.',
    image: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?q=80&w=1600&auto=format&fit=crop',
    timecode: '16:30:10:20',
    badge: 'DAY 04 · INTERCULTURAL JAM'
  },
  {
    day: 'DAY 05',
    title: 'THE GRAND FINALE & LIVE BROADCAST',
    description: 'Over 18,000 live attendees fill the complex as C Design multi-cam 4K broadcast beams the spectacle to global audiences across 3.4M households.',
    image: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=1600&auto=format&fit=crop',
    timecode: '21:45:00:00',
    badge: 'DAY 05 · GLOBAL BROADCAST'
  }
];

export const FlagshipCaseStudy: React.FC<FlagshipCaseStudyProps> = ({
  project,
  onBack,
  onSelectNextProject,
}) => {
  const [activeFilmDay, setActiveFilmDay] = useState(0);
  const [isSoundOn, setIsSoundOn] = useState(false);
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);
  const { setCursorVariant, resetCursor } = useCursor();

  // Find next project in catalog
  const currentIndex = projectsData.findIndex((p) => p.id === project.id);
  const nextProject = projectsData[(currentIndex + 1) % projectsData.length];

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' as any });
  }, [project.id]);

  // Keyboard navigation for lightbox & ESC
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (lightboxImage) setLightboxImage(null);
        else onBack();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxImage, onBack]);

  return (
    <div className="min-h-screen bg-white text-brand-black selection:bg-brand-red selection:text-white">
      {/* Sticky Floating Case Study Navigation Bar */}
      <nav className="fixed top-0 left-0 right-0 z-40 px-6 sm:px-12 py-5 bg-white/90 backdrop-blur-md border-b border-neutral-200 flex items-center justify-between">
        <button
          onClick={onBack}
          onMouseEnter={() => setCursorVariant('link')}
          onMouseLeave={resetCursor}
          className="group flex items-center space-x-3 text-xs font-bold uppercase tracking-wider text-neutral-800 hover:text-brand-red transition-colors"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span>BACK TO WORK</span>
        </button>

        <div className="hidden md:flex items-center space-x-3 text-xs font-mono text-neutral-500">
          <span className="text-brand-red font-bold">{project.number}</span>
          <span>·</span>
          <span className="font-bold text-brand-black">{project.title}</span>
          <span>·</span>
          <span>{project.year}</span>
        </div>

        <div className="flex items-center space-x-4">
          <button
            onClick={() => setIsSoundOn(!isSoundOn)}
            onMouseEnter={() => setCursorVariant('link')}
            onMouseLeave={resetCursor}
            className="flex items-center space-x-2 px-3 py-1.5 rounded-subtle border border-neutral-300 hover:border-brand-red text-xs font-mono text-neutral-700 transition-colors"
          >
            {isSoundOn ? <Volume2 className="w-3.5 h-3.5 text-brand-red" /> : <VolumeX className="w-3.5 h-3.5 text-neutral-400" />}
            <span>{isSoundOn ? 'SOUND ON' : 'SOUND OFF'}</span>
          </button>
        </div>
      </nav>

      {/* 01. CASE STUDY EXPANDED HERO WITH TITLE INTERSECTION */}
      <section className="relative min-h-[90vh] flex flex-col justify-end pt-36 pb-16 px-6 sm:px-12 max-w-7xl mx-auto overflow-hidden">
        {/* Giant Editorial Title */}
        <div className="relative z-20 space-y-4 mb-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="flex items-center space-x-3"
          >
            <span className="w-3 h-3 bg-brand-red inline-block" />
            <span className="text-xs font-mono font-bold tracking-[0.25em] text-brand-red uppercase">
              FLAGSHIP CASE STUDY · {project.category}
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 35 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="font-display-huge text-4xl sm:text-7xl md:text-8xl xl:text-9xl font-black uppercase tracking-tight text-brand-black leading-[0.88]"
          >
            {project.title}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="text-lg sm:text-2xl font-bold text-neutral-800 max-w-3xl leading-snug font-editorial-sub"
          >
            {project.subtitle}
          </motion.p>
        </div>

        {/* Hero Full-Bleed Image Frame */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="relative h-[480px] sm:h-[620px] rounded-card overflow-hidden shadow-2xl border border-neutral-200"
        >
          <img
            src={project.heroImage}
            alt={project.title}
            className="w-full h-full object-cover filter contrast-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30" />

          {/* Overlay Coordinates & Metadata */}
          <div className="absolute bottom-6 left-6 right-6 flex flex-col sm:flex-row sm:items-end justify-between text-white gap-4">
            <div className="space-y-1">
              <span className="text-[10px] font-mono uppercase tracking-widest text-brand-red bg-white/90 px-2 py-0.5 font-bold rounded">
                LOCATION & ARCHIVE
              </span>
              <p className="text-base font-bold">{project.location}</p>
            </div>

            <div className="text-xs font-mono text-neutral-300">
              <span>CLIENT: {project.client || 'C DESIGN ORIGINALS'}</span>
              <span className="mx-2">·</span>
              <span>YEAR: {project.year}</span>
            </div>
          </div>
        </motion.div>
      </section>

      {/* 02. OVERVIEW & VISION GRID */}
      <section className="py-20 bg-brand-light border-y border-neutral-200">
        <div className="max-w-7xl mx-auto px-6 sm:px-12 grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          <div className="lg:col-span-4 space-y-4">
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-brand-red">
              01 — EXECUTIVE OVERVIEW
            </span>
            <h2 className="font-display text-3xl sm:text-4xl font-black uppercase tracking-tight text-brand-black">
              WHY BORNEO? WHY JOY AS HIGH ART?
            </h2>
          </div>

          <div className="lg:col-span-8 space-y-6 text-neutral-800 text-base sm:text-lg leading-relaxed font-medium">
            <p className="border-l-4 border-brand-red pl-6 italic text-xl sm:text-2xl font-bold text-brand-black">
              “{project.summary}”
            </p>
            {project.narrative.map((paragraph, idx) => (
              <p key={idx} className="text-sm sm:text-base text-neutral-600 leading-relaxed font-normal">
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </section>

      {/* 03. KEY DISCIPLINES & METRICS */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 sm:px-12 space-y-12">
          {/* Metrics Row */}
          {project.metrics && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 border-b border-neutral-200 pb-12">
              {project.metrics.map((metric, idx) => (
                <div key={idx} className="border-l-2 border-brand-red pl-4">
                  <span className="font-display-huge text-4xl sm:text-6xl font-black text-brand-black block">
                    {metric.value}
                  </span>
                  <span className="text-xs font-mono uppercase font-bold text-neutral-500 mt-1 block">
                    {metric.label}
                  </span>
                </div>
              ))}
            </div>
          )}

          {/* Deliverables Grid */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
            <div className="md:col-span-4">
              <span className="text-xs font-mono font-bold uppercase tracking-widest text-brand-red block mb-2">
                02 — SCOPE OF WORK
              </span>
              <h3 className="font-display text-2xl sm:text-3xl font-black uppercase text-brand-black">
                CORE DISCIPLINES DELIVERED
              </h3>
            </div>

            <div className="md:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {project.deliverables.map((deliv, idx) => (
                <div key={idx} className="p-4 bg-brand-light rounded-card border border-neutral-200 flex items-center space-x-3">
                  <CheckCircle2 className="w-4 h-4 text-brand-red flex-shrink-0" />
                  <span className="text-xs sm:text-sm font-bold text-neutral-800 uppercase font-editorial-sub">
                    {deliv}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 04. WOW MOMENT: PINNED 16:9 DOCUMENTARY FILM FRAME */}
      <section className="py-24 bg-brand-black text-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 sm:px-12 space-y-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-neutral-800 pb-6 gap-4">
            <div>
              <span className="text-xs font-mono font-bold tracking-[0.25em] text-brand-red uppercase block mb-2">
                03 — INTERACTIVE DOCUMENTARY CHRONICLES
              </span>
              <h2 className="font-display-huge text-3xl sm:text-5xl font-black uppercase text-white">
                THE 5-DAY CONVERGENCE
              </h2>
            </div>

            <div className="text-xs font-mono text-neutral-400 flex items-center space-x-2">
              <span className="w-2 h-2 rounded-full bg-brand-red animate-pulse" />
              <span>TIMECODE: {filmFrameTimeline[activeFilmDay].timecode}</span>
            </div>
          </div>

          {/* Main 16:9 Pinned Frame Screen */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Film Screen */}
            <div className="lg:col-span-8 relative aspect-video bg-neutral-900 rounded-card overflow-hidden shadow-2xl border border-neutral-800">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeFilmDay}
                  initial={{ opacity: 0, scale: 1.05 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute inset-0"
                >
                  <img
                    src={filmFrameTimeline[activeFilmDay].image}
                    alt={filmFrameTimeline[activeFilmDay].title}
                    className="w-full h-full object-cover filter contrast-110 brightness-95"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30" />

                  {/* Shutter Watermark */}
                  <div className="absolute top-4 left-4 flex items-center space-x-2 text-[10px] font-mono bg-black/70 px-3 py-1 rounded text-neutral-300">
                    <span className="text-brand-red font-bold">LIVE FRAME</span>
                    <span>·</span>
                    <span>{filmFrameTimeline[activeFilmDay].badge}</span>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Right Captions & Day Selector Rail */}
            <div className="lg:col-span-4 space-y-3">
              {filmFrameTimeline.map((item, idx) => {
                const isActive = activeFilmDay === idx;
                return (
                  <button
                    key={item.day}
                    onClick={() => setActiveFilmDay(idx)}
                    onMouseEnter={() => setCursorVariant('link')}
                    onMouseLeave={resetCursor}
                    className={`w-full text-left p-4 rounded-subtle border transition-all duration-300 ${
                      isActive
                        ? 'bg-neutral-900 border-brand-red shadow-lg translate-x-2'
                        : 'bg-transparent border-neutral-800 hover:border-neutral-700 text-neutral-400'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className={`text-xs font-mono font-bold ${isActive ? 'text-brand-red' : 'text-neutral-500'}`}>
                        {item.day}
                      </span>
                      <span className="text-[10px] font-mono text-neutral-500">{item.timecode}</span>
                    </div>

                    <h4 className="font-display text-sm font-bold uppercase tracking-tight text-white mt-1">
                      {item.title}
                    </h4>

                    {isActive && (
                      <motion.p
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        className="text-xs text-neutral-300 mt-2 leading-relaxed"
                      >
                        {item.description}
                      </motion.p>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* 05. PRODUCTION PHOTOGRAPHY MOSAIC GALLERY */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 sm:px-12 space-y-12">
          <div className="flex items-center justify-between border-b border-neutral-200 pb-6">
            <div>
              <span className="text-xs font-mono font-bold tracking-[0.25em] text-brand-red uppercase block mb-2">
                04 — PRODUCTION ARCHIVE
              </span>
              <h2 className="font-display-huge text-3xl sm:text-5xl font-black uppercase text-brand-black">
                PHOTOGRAPHY & MOMENTS
              </h2>
            </div>

            <span className="text-xs font-mono text-neutral-500 hidden sm:inline">
              CLICK IMAGE TO EXPAND
            </span>
          </div>

          {/* Mosaic Layout (Full Bleed, Portrait, Landscape Mix) */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            {project.galleryImages.map((imgUrl, idx) => {
              const span = idx % 3 === 0 ? 'md:col-span-8 h-80 sm:h-96' : 'md:col-span-4 h-80 sm:h-96';
              return (
                <div
                  key={idx}
                  onClick={() => setLightboxImage(imgUrl)}
                  onMouseEnter={() => setCursorVariant('view', 'EXPAND')}
                  onMouseLeave={resetCursor}
                  className={`${span} rounded-card overflow-hidden border border-neutral-200 cursor-pointer group relative shadow-md`}
                >
                  <img
                    src={imgUrl}
                    alt={`Production Frame ${idx + 1}`}
                    className="w-full h-full object-cover filter contrast-105 group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="absolute bottom-3 left-3 bg-black/70 text-white text-[9px] font-mono px-2 py-0.5 rounded">
                    FRAME 0{idx + 1} · HIGH RES
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 06. NEXT PROJECT SEAMLESS TRANSITION */}
      <section className="py-28 bg-brand-black text-white relative overflow-hidden border-t border-neutral-800">
        <div className="max-w-7xl mx-auto px-6 sm:px-12">
          <div className="text-center space-y-6">
            <span className="text-xs font-mono font-bold uppercase tracking-[0.25em] text-brand-red block">
              NEXT CASE STUDY
            </span>

            <h2 className="font-display-huge text-4xl sm:text-7xl md:text-8xl font-black uppercase tracking-tight text-white hover:text-brand-red transition-colors cursor-pointer"
              onClick={() => onSelectNextProject(nextProject)}
            >
              {nextProject.title}
            </h2>

            <p className="text-sm sm:text-base text-neutral-400 font-medium max-w-xl mx-auto">
              {nextProject.subtitle}
            </p>

            <div className="pt-6">
              <MagneticButton
                variant="primary"
                onClick={() => onSelectNextProject(nextProject)}
                cursorText="NEXT"
              >
                <span>EXPLORE NEXT CASE STUDY</span>
                <ArrowRight className="w-4 h-4" />
              </MagneticButton>
            </div>
          </div>
        </div>
      </section>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {lightboxImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4 sm:p-10"
            onClick={() => setLightboxImage(null)}
          >
            <button
              onClick={() => setLightboxImage(null)}
              className="absolute top-6 right-6 text-white p-3 hover:text-brand-red transition-colors"
            >
              <X className="w-6 h-6" />
            </button>

            <motion.img
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              src={lightboxImage}
              alt="Expanded Frame"
              className="max-w-full max-h-[88vh] object-contain rounded shadow-2xl"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
