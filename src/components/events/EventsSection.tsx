import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, MapPin, Play, MessageCircle, ArrowUpRight, Sparkles } from 'lucide-react';
import { getStoredCMSEvents } from '../../data/cmsConfig';
import type { CMSEvent } from '../../types/crm';
import { useCursor } from '../../context/CursorContext';

interface EventsSectionProps {
  onSelectEvent: (event: CMSEvent) => void;
  onOpenInquiry?: (topic?: string) => void;
}

export const EventsSection: React.FC<EventsSectionProps> = ({ onSelectEvent }) => {
  const [events, setEvents] = useState<CMSEvent[]>([]);
  const [filter, setFilter] = useState<string>('ALL');
  const { setCursorVariant, resetCursor } = useCursor();

  useEffect(() => {
    setEvents(getStoredCMSEvents());
  }, []);

  const filteredEvents = events.filter((evt) => {
    if (filter === 'ALL') return true;
    return evt.status === filter;
  });

  return (
    <section id="events" className="py-24 sm:py-32 bg-white text-brand-black relative overflow-hidden border-t border-neutral-200">
      {/* Background Subtle Watermark */}
      <div className="absolute right-4 top-12 font-display-huge text-8xl sm:text-[14rem] font-black text-neutral-100/60 select-none pointer-events-none tracking-tighter">
        EVENTS
      </div>

      <div className="max-w-7xl mx-auto px-5 sm:px-12 relative z-10 space-y-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="flex items-center space-x-2">
              <span className="w-2 h-2 rounded-full bg-brand-red animate-pulse" />
              <span className="font-mono text-xs sm:text-sm font-bold uppercase tracking-widest text-brand-red">
                CULTURE · FESTIVALS · PRODUCTIONS
              </span>
            </div>
            <h2 className="font-display text-3xl sm:text-5xl font-black uppercase tracking-tight text-brand-black leading-tight">
              PRODUCTIONS & FESTIVALS
            </h2>
            <p className="text-neutral-600 text-sm sm:text-base font-medium leading-relaxed">
              From stadium-scale international conventions to immersive rainforest cinema labs. Discover upcoming milestones and explore our completed event archives with 4K highlight reels and photo galleries.
            </p>
          </div>

          {/* Status Filter Pills */}
          <div className="flex items-center space-x-2 font-mono text-xs overflow-x-auto pb-1 scrollbar-none">
            {[
              { id: 'ALL', label: 'ALL EVENTS' },
              { id: 'UPCOMING', label: '🔴 UPCOMING' },
              { id: 'ONGOING', label: '🟡 IN PROGRESS' },
              { id: 'COMPLETED', label: '⚪ COMPLETED ARCHIVES' }
            ].map((tab) => {
              const isActive = filter === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setFilter(tab.id as any)}
                  onMouseEnter={() => setCursorVariant('link')}
                  onMouseLeave={resetCursor}
                  className={`px-4 py-2 rounded-full font-bold uppercase tracking-wider transition-all whitespace-nowrap ${
                    isActive
                      ? 'bg-brand-black text-white shadow-md'
                      : 'bg-neutral-100 hover:bg-neutral-200 text-neutral-700 border border-neutral-300/60'
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Events Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredEvents.map((evt, idx) => {
              const isUpcoming = evt.status === 'UPCOMING';
              const isCompleted = evt.status === 'COMPLETED';

              return (
                <motion.div
                  key={evt.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.4, delay: idx * 0.1 }}
                  className="bg-neutral-50 rounded-2xl overflow-hidden border border-neutral-200 shadow-sm hover:shadow-xl transition-all flex flex-col justify-between group"
                >
                  {/* Hero Cover Frame */}
                  <div
                    onClick={() => onSelectEvent(evt)}
                    onMouseEnter={() => setCursorVariant('play')}
                    onMouseLeave={resetCursor}
                    className="relative h-64 sm:h-72 overflow-hidden bg-neutral-900 cursor-pointer"
                  >
                    <img
                      src={evt.heroImage}
                      alt={evt.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                    />

                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                    {/* Status Badge */}
                    <div className="absolute top-4 left-4 flex items-center space-x-2">
                      <span
                        className={`px-3 py-1 rounded-full text-[10px] font-mono font-black uppercase tracking-wider text-white shadow-md ${
                          isUpcoming
                            ? 'bg-brand-red animate-pulse'
                            : isCompleted
                            ? 'bg-neutral-800 border border-neutral-600'
                            : 'bg-amber-600'
                        }`}
                      >
                        {isUpcoming ? '● UPCOMING' : isCompleted ? '✓ COMPLETED RECAP' : '● IN PROGRESS'}
                      </span>

                      {evt.attendees && (
                        <span className="px-2.5 py-1 rounded-full text-[10px] font-mono font-bold bg-black/60 backdrop-blur-md text-white border border-white/20">
                          {evt.attendees}
                        </span>
                      )}
                    </div>

                    {/* Play Highlight Button Overlay */}
                    <div className="absolute bottom-4 right-4 flex items-center space-x-2 bg-white/90 backdrop-blur-md text-brand-black px-3.5 py-1.5 rounded-full font-mono text-[11px] font-black uppercase tracking-wider group-hover:bg-brand-red group-hover:text-white transition-colors shadow">
                      <Play className="w-3.5 h-3.5 fill-current" />
                      <span>{isCompleted ? 'WATCH HIGHLIGHT & PHOTOS' : 'EXPLORE EVENT'}</span>
                    </div>

                    {/* Date Tag */}
                    <div className="absolute bottom-4 left-4 text-white font-mono text-xs font-bold flex items-center space-x-1.5">
                      <Calendar className="w-3.5 h-3.5 text-brand-red" />
                      <span>{evt.startDate} → {evt.endDate}</span>
                    </div>
                  </div>

                  {/* Body Details */}
                  <div className="p-6 sm:p-8 space-y-4 flex-1 flex flex-col justify-between">
                    <div className="space-y-2">
                      <div className="flex items-center space-x-1.5 text-xs font-mono text-neutral-500">
                        <MapPin className="w-3.5 h-3.5 text-brand-red flex-shrink-0" />
                        <span className="truncate">{evt.venue} · {evt.location}</span>
                      </div>

                      <h3
                        onClick={() => onSelectEvent(evt)}
                        className="font-display text-xl sm:text-2xl font-black uppercase text-brand-black hover:text-brand-red transition-colors cursor-pointer leading-tight"
                      >
                        {evt.name}
                      </h3>

                      <p className="text-neutral-600 text-xs sm:text-sm font-medium line-clamp-3 leading-relaxed">
                        {evt.recapSummary || evt.shortDesc}
                      </p>
                    </div>

                    {/* Footer Actions */}
                    <div className="pt-4 border-t border-neutral-200 flex items-center justify-between gap-3 text-xs font-mono">
                      <button
                        onClick={() => onSelectEvent(evt)}
                        onMouseEnter={() => setCursorVariant('link')}
                        onMouseLeave={resetCursor}
                        className="px-4 py-2.5 bg-neutral-900 hover:bg-brand-red text-white font-bold uppercase rounded-lg transition-colors flex items-center space-x-1.5 shadow"
                      >
                        <Sparkles className="w-3.5 h-3.5 text-brand-red" />
                        <span>{isCompleted ? 'VIEW 4K RECAP & GALLERY' : 'EVENT SHOWCASE'}</span>
                      </button>

                      {isUpcoming && evt.registrationUrl ? (
                        <a
                          href={evt.registrationUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          onMouseEnter={() => setCursorVariant('link')}
                          onMouseLeave={resetCursor}
                          className="px-4 py-2.5 bg-[#25D366] hover:bg-[#1EBE5D] text-white font-bold uppercase rounded-lg transition-colors flex items-center space-x-1.5 shadow"
                        >
                          <MessageCircle className="w-3.5 h-3.5 fill-current" />
                          <span>REGISTER</span>
                          <ArrowUpRight className="w-3 h-3" />
                        </a>
                      ) : null}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};
