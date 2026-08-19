import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ArrowRight, X, Volume2, VolumeX, CheckCircle2, MessageCircle, Copy, Check } from 'lucide-react';
import type { Project } from '../../types';
import { projectsData } from '../../data/projectsData';
import { useCursor } from '../../context/CursorContext';
import { MagneticButton } from '../common/MagneticButton';

interface FlagshipCaseStudyProps {
  project: Project;
  onBack: () => void;
  onSelectNextProject: (nextProject: Project) => void;
  onOpenInquiry: (initialTopic?: string) => void;
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
  onOpenInquiry,
}) => {
  const [activeFilmDay, setActiveFilmDay] = useState(0);
  const [isSoundOn, setIsSoundOn] = useState(false);
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);
  const [copiedLink, setCopiedLink] = useState(false);
  const { setCursorVariant, resetCursor } = useCursor();

  const currentIndex = projectsData.findIndex((p) => p.id === project.id);
  const nextProject = projectsData[(currentIndex + 1) % projectsData.length];

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' as any });
  }, [project.id]);

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

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  return (
    <div className="min-h-screen bg-white text-brand-black selection:bg-brand-red selection:text-white">
      {/* Sticky Floating Case Study Navigation Bar */}
      <nav className="fixed top-0 left-0 right-0 z-40 px-5 sm:px-12 py-4 sm:py-5 bg-white/90 backdrop-blur-md border-b border-neutral-200 flex items-center justify-between">
        <button
          onClick={onBack}
          onMouseEnter={() => setCursorVariant('link')}
          onMouseLeave={resetCursor}
          className="group flex items-center space-x-2.5 text-xs font-bold uppercase tracking-wider text-neutral-800 hover:text-brand-red transition-colors min-h-[44px]"
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

        <div className="flex items-center space-x-2.5 sm:space-x-4">
          <button
            onClick={handleCopyLink}
            className="flex items-center space-x-1.5 px-3 py-1.5 rounded-subtle border border-neutral-300 hover:border-brand-red text-xs font-mono text-neutral-700 transition-colors"
            title="Copy Case Study Link"
          >
            {copiedLink ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
            <span className="hidden sm:inline">{copiedLink ? 'COPIED' : 'SHARE'}</span>
          </button>

          <button
            onClick={() => setIsSoundOn(!isSoundOn)}
            onMouseEnter={() => setCursorVariant('link')}
            onMouseLeave={resetCursor}
            className="flex items-center space-x-2 px-3 py-1.5 rounded-subtle border border-neutral-300 hover:border-brand-red text-xs font-mono text-neutral-700 transition-colors"
          >
            {isSoundOn ? <Volume2 className="w-3.5 h-3.5 text-brand-red" /> : <VolumeX className="w-3.5 h-3.5 text-neutral-400" />}
            <span className="hidden sm:inline">{isSoundOn ? 'SOUND ON' : 'SOUND OFF'}</span>
          </button>
        </div>
      </nav>

      {/* 01. CASE STUDY EXPANDED HERO */}
      <section className="relative min-h-[90vh] flex flex-col justify-end pt-32 sm:pt-36 pb-12 sm:pb-16 px-5 sm:px-12 max-w-7xl mx-auto overflow-hidden">
        <div className="relative z-20 space-y-3 sm:space-y-4 mb-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="flex items-center space-x-2.5"
          >
            <span className="w-3 h-3 bg-brand-red inline-block" />
            <span className="text-[10px] sm:text-xs font-mono font-bold tracking-[0.25em] text-brand-red uppercase">
              FLAGSHIP CASE STUDY · {project.category}
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 35 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="font-display-huge text-3xl sm:text-7xl md:text-8xl xl:text-9xl font-black uppercase tracking-tight text-brand-black leading-[0.9] sm:leading-[0.88]"
          >
            {project.title}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="text-base sm:text-2xl font-bold text-neutral-800 max-w-3xl leading-snug font-editorial-sub"
          >
            {project.subtitle}
          </motion.p>
        </div>

        {/* Hero Image Frame */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="relative h-[380px] sm:h-[620px] rounded-card overflow-hidden shadow-2xl border border-neutral-200"
        >
          <img
            src={project.heroImage}
            alt={project.title}
            className="w-full h-full object-cover filter contrast-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30" />

          <div className="absolute bottom-4 sm:bottom-6 left-4 sm:left-6 right-4 sm:right-6 flex flex-col sm:flex-row sm:items-end justify-between text-white gap-3">
            <div className="space-y-0.5">
              <span className="text-[9px] font-mono uppercase tracking-widest text-brand-red bg-white/90 px-2 py-0.5 font-bold rounded">
                LOCATION & ARCHIVE
              </span>
              <p className="text-sm sm:text-base font-bold">{project.location}</p>
            </div>

            <div className="text-[11px] sm:text-xs font-mono text-neutral-300">
              <span>CLIENT: {project.client || 'C DESIGN ORIGINALS'}</span>
              <span className="mx-2">·</span>
              <span>YEAR: {project.year}</span>
            </div>
          </div>
        </motion.div>
      </section>

      {/* 02. OVERVIEW & VISION GRID */}
      <section className="py-16 sm:py-20 bg-brand-light border-y border-neutral-200">
        <div className="max-w-7xl mx-auto px-5 sm:px-12 grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 items-start">
          <div className="lg:col-span-4 space-y-3 sm:space-y-4">
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-brand-red">
              01 — EXECUTIVE OVERVIEW
            </span>
            <h2 className="font-display text-2xl sm:text-4xl font-black uppercase tracking-tight text-brand-black">
              WHY BORNEO? WHY JOY AS HIGH ART?
            </h2>
          </div>

          <div className="lg:col-span-8 space-y-5 text-neutral-800 text-sm sm:text-lg leading-relaxed font-medium">
            <p className="border-l-4 border-brand-red pl-4 sm:pl-6 italic text-lg sm:text-2xl font-bold text-brand-black">
              “{project.summary}”
            </p>
            {project.narrative.map((paragraph, idx) => (
              <p key={idx} className="text-xs sm:text-base text-neutral-600 leading-relaxed font-normal">
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </section>

      {/* 03. KEY DISCIPLINES & METRICS */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-5 sm:px-12 space-y-10 sm:space-y-12">
          {project.metrics && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 border-b border-neutral-200 pb-10 sm:pb-12">
              {project.metrics.map((metric, idx) => (
                <div key={idx} className="border-l-2 border-brand-red pl-3 sm:pl-4">
                  <span className="font-display-huge text-3xl sm:text-6xl font-black text-brand-black block">
                    {metric.value}
                  </span>
                  <span className="text-[10px] sm:text-xs font-mono uppercase font-bold text-neutral-500 mt-1 block">
                    {metric.label}
                  </span>
                </div>
              ))}
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 sm:gap-8 items-start">
            <div className="md:col-span-4">
              <span className="text-xs font-mono font-bold uppercase tracking-widest text-brand-red block mb-2">
                02 — SCOPE OF WORK
              </span>
              <h3 className="font-display text-2xl sm:text-3xl font-black uppercase text-brand-black">
                CORE DISCIPLINES DELIVERED
              </h3>
            </div>

            <div className="md:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              {project.deliverables.map((deliv, idx) => (
                <div key={idx} className="p-3.5 sm:p-4 bg-brand-light rounded-card border border-neutral-200 flex items-center space-x-2.5 sm:space-x-3">
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

      {/* 04. PINNED 16:9 DOCUMENTARY FILM FRAME */}
      <section className="py-20 sm:py-24 bg-brand-black text-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-5 sm:px-12 space-y-8 sm:space-y-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-neutral-800 pb-5 gap-3">
            <div>
              <span className="text-[10px] sm:text-xs font-mono font-bold tracking-[0.25em] text-brand-red uppercase block mb-1.5">
                03 — INTERACTIVE DOCUMENTARY CHRONICLES
              </span>
              <h2 className="font-display-huge text-2xl sm:text-5xl font-black uppercase text-white">
                THE 5-DAY CONVERGENCE
              </h2>
            </div>

            <div className="text-xs font-mono text-neutral-400 flex items-center space-x-2">
              <span className="w-2 h-2 rounded-full bg-brand-red animate-pulse" />
              <span>TIMECODE: {filmFrameTimeline[activeFilmDay].timecode}</span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-center">
            <div className="lg:col-span-8 relative aspect-video bg-neutral-900 rounded-card overflow-hidden shadow-2xl border border-neutral-800">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeFilmDay}
                  initial={{ opacity: 0, scale: 1.05 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute inset-0"
                >
                  <img
                    src={filmFrameTimeline[activeFilmDay].image}
                    alt={filmFrameTimeline[activeFilmDay].title}
                    className="w-full h-full object-cover filter contrast-110 brightness-95"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30" />

                  <div className="absolute top-3 left-3 flex items-center space-x-1.5 text-[9px] sm:text-[10px] font-mono bg-black/70 px-2.5 py-1 rounded text-neutral-300">
                    <span className="text-brand-red font-bold">LIVE FRAME</span>
                    <span>·</span>
                    <span>{filmFrameTimeline[activeFilmDay].badge}</span>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            <div className="lg:col-span-4 space-y-2.5">
              {filmFrameTimeline.map((item, idx) => {
                const isActive = activeFilmDay === idx;
                return (
                  <button
                    key={item.day}
                    onClick={() => setActiveFilmDay(idx)}
                    className={`w-full text-left p-3.5 rounded-subtle border transition-all duration-200 active:scale-[0.98] ${
                      isActive
                        ? 'bg-neutral-900 border-brand-red shadow-lg'
                        : 'bg-transparent border-neutral-800 hover:border-neutral-700 text-neutral-400'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className={`text-xs font-mono font-bold ${isActive ? 'text-brand-red' : 'text-neutral-500'}`}>
                        {item.day}
                      </span>
                      <span className="text-[10px] font-mono text-neutral-500">{item.timecode}</span>
                    </div>

                    <h4 className="font-display text-xs sm:text-sm font-bold uppercase tracking-tight text-white mt-0.5">
                      {item.title}
                    </h4>

                    {isActive && (
                      <p className="text-[11px] text-neutral-300 mt-1.5 leading-relaxed">
                        {item.description}
                      </p>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* 05. HIGH-INTENT CONTEXTUAL CTA: PLANNING SOMETHING SIMILAR? */}
      <section className="py-14 sm:py-20 bg-brand-light border-y border-neutral-200">
        <div className="max-w-5xl mx-auto px-5 sm:px-10 flex flex-col md:flex-row md:items-center justify-between gap-6 bg-white p-6 sm:p-10 rounded-card shadow-lg border border-neutral-200">
          <div className="space-y-1.5">
            <span className="text-[10px] font-mono font-bold tracking-widest text-brand-red uppercase">
              PRODUCE WITH C DESIGN
            </span>
            <h3 className="font-display text-2xl sm:text-3xl font-black uppercase text-brand-black">
              PLANNING A PROJECT LIKE {project.title}?
            </h3>
            <p className="text-xs sm:text-sm text-neutral-600 max-w-lg">
              Commission our director and staging engineering team from Tawau, Sabah for your next landmark production.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <button
              onClick={() => onOpenInquiry(`${project.title} (${project.category})`)}
              className="h-12 px-6 bg-brand-red text-white text-xs font-bold uppercase tracking-wider rounded flex items-center justify-center space-x-2 shadow-md active:scale-95 transition-transform"
            >
              <span>START A SIMILAR PROJECT</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <a
              href={`https://wa.me/60128188188?text=Hello%20C%20Design%2C%20I%20saw%20the%20${encodeURIComponent(project.title)}%20case%20study%20and%20would%20like%20to%20inquire%20about%20a%20similar%20production.`}
              target="_blank"
              rel="noopener noreferrer"
              className="h-12 px-4 bg-[#25D366] text-white rounded flex items-center justify-center space-x-1.5 text-xs font-bold uppercase shadow-sm active:scale-95 transition-transform"
            >
              <MessageCircle className="w-4 h-4 fill-current" />
              <span>WHATSAPP</span>
            </a>
          </div>
        </div>
      </section>

      {/* 06. PRODUCTION PHOTOGRAPHY MOSAIC GALLERY */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-5 sm:px-12 space-y-10">
          <div className="flex items-center justify-between border-b border-neutral-200 pb-5">
            <div>
              <span className="text-xs font-mono font-bold tracking-[0.25em] text-brand-red uppercase block mb-1.5">
                04 — PRODUCTION ARCHIVE
              </span>
              <h2 className="font-display-huge text-2xl sm:text-5xl font-black uppercase text-brand-black">
                PHOTOGRAPHY & MOMENTS
              </h2>
            </div>

            <span className="text-xs font-mono text-neutral-500 hidden sm:inline">
              CLICK IMAGE TO EXPAND
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 sm:gap-6">
            {project.galleryImages.map((imgUrl, idx) => {
              const span = idx % 3 === 0 ? 'md:col-span-8 h-64 sm:h-96' : 'md:col-span-4 h-64 sm:h-96';
              return (
                <div
                  key={idx}
                  onClick={() => setLightboxImage(imgUrl)}
                  className={`${span} rounded-card overflow-hidden border border-neutral-200 cursor-pointer group relative shadow-md active:scale-[0.98] transition-transform`}
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

      {/* 07. NEXT PROJECT SEAMLESS TRANSITION */}
      <section className="py-24 sm:py-28 bg-brand-black text-white relative overflow-hidden border-t border-neutral-800">
        <div className="max-w-7xl mx-auto px-5 sm:px-12">
          <div className="text-center space-y-5">
            <span className="text-xs font-mono font-bold uppercase tracking-[0.25em] text-brand-red block">
              NEXT CASE STUDY
            </span>

            <h2
              className="font-display-huge text-3xl sm:text-7xl md:text-8xl font-black uppercase tracking-tight text-white hover:text-brand-red transition-colors cursor-pointer"
              onClick={() => onSelectNextProject(nextProject)}
            >
              {nextProject.title}
            </h2>

            <p className="text-xs sm:text-base text-neutral-400 font-medium max-w-xl mx-auto">
              {nextProject.subtitle}
            </p>

            <div className="pt-4">
              <MagneticButton
                variant="primary"
                onClick={() => onSelectNextProject(nextProject)}
                className="!h-12 !px-8"
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
              className="absolute top-5 right-5 text-white p-3 hover:text-brand-red transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center"
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
