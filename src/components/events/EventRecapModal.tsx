import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Play, Calendar, MapPin, Users, Award, ExternalLink, MessageCircle, ChevronLeft, ChevronRight } from 'lucide-react';
import type { CMSEvent } from '../../types/crm';

interface EventRecapModalProps {
  event: CMSEvent | null;
  onClose: () => void;
  onOpenInquiry?: (topic?: string) => void;
}

export const EventRecapModal: React.FC<EventRecapModalProps> = ({ event, onClose, onOpenInquiry }) => {
  const [activePhotoIndex, setActivePhotoIndex] = useState<number | null>(null);

  if (!event) return null;

  // Auto-normalize Google Drive, Dropbox, and CDN direct image links
  const normalizeImageUrl = (url: string) => {
    if (!url) return url;
    // Google Drive share link format: https://drive.google.com/file/d/FILE_ID/view...
    if (url.includes('drive.google.com/file/d/')) {
      const match = url.match(/\/file\/d\/([a-zA-Z0-9_-]+)/);
      if (match && match[1]) {
        return `https://lh3.googleusercontent.com/d/${match[1]}`;
      }
    }
    // Google Drive uc export format
    if (url.includes('drive.google.com/open?id=')) {
      const match = url.match(/id=([a-zA-Z0-9_-]+)/);
      if (match && match[1]) {
        return `https://lh3.googleusercontent.com/d/${match[1]}`;
      }
    }
    // Dropbox direct link format
    if (url.includes('dropbox.com') && url.includes('?dl=0')) {
      return url.replace('?dl=0', '?raw=1');
    }
    return url;
  };

  // Extract YouTube embed URL if applicable
  const getEmbedVideoUrl = (url?: string) => {
    if (!url) return null;
    if (url.includes('youtube.com/watch?v=')) {
      const videoId = url.split('v=')[1]?.split('&')[0];
      return `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`;
    }
    if (url.includes('youtu.be/')) {
      const videoId = url.split('youtu.be/')[1]?.split('?')[0];
      return `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`;
    }
    if (url.includes('vimeo.com/')) {
      const videoId = url.split('vimeo.com/')[1]?.split('?')[0];
      return `https://player.vimeo.com/video/${videoId}?autoplay=1`;
    }
    return url;
  };

  const embedUrl = getEmbedVideoUrl(event.highlightVideoUrl);
  const rawPhotos = event.galleryImages && event.galleryImages.length > 0 ? event.galleryImages : [event.heroImage, event.poster];
  const photos = rawPhotos.map(normalizeImageUrl);

  return (
    <div className="fixed inset-0 z-50 bg-neutral-950/95 backdrop-blur-md flex items-center justify-center p-2 sm:p-6 overflow-hidden select-none">
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.96 }}
        className="w-full max-w-5xl max-h-[92vh] bg-white rounded-xl shadow-2xl flex flex-col overflow-hidden text-brand-black border border-neutral-800"
      >
        {/* Header Bar */}
        <div className="px-6 py-4 bg-brand-black text-white flex items-center justify-between border-b border-neutral-800 flex-shrink-0">
          <div className="flex items-center space-x-3">
            <span className={`px-2.5 py-0.5 rounded text-[10px] font-mono font-bold uppercase tracking-wider ${
              event.status === 'COMPLETED' ? 'bg-neutral-800 text-neutral-300 border border-neutral-700' : 'bg-brand-red text-white'
            }`}>
              {event.status === 'COMPLETED' ? 'EVENT ARCHIVE & RECAP' : 'UPCOMING PRODUCTION'}
            </span>
            <h3 className="font-display text-lg font-black uppercase tracking-tight truncate max-w-md sm:max-w-lg">
              {event.name}
            </h3>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-neutral-400 hover:text-white rounded transition-colors"
            title="Close Event Showcase"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-8">
          {/* 1. HIGHLIGHT VIDEO PLAYER SECTION */}
          {embedUrl ? (
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs font-bold text-brand-red uppercase flex items-center space-x-1.5">
                  <Play className="w-3.5 h-3.5 fill-current" />
                  <span>OFFICIAL EVENT HIGHLIGHT REEL / VIDEO</span>
                </span>
                <span className="font-mono text-[10px] text-neutral-500 uppercase">
                  4K Master Cinema Stream
                </span>
              </div>

              <div className="relative w-full aspect-video bg-black rounded-lg overflow-hidden shadow-xl border border-neutral-300">
                {embedUrl.startsWith('http') && (embedUrl.includes('youtube') || embedUrl.includes('vimeo')) ? (
                  <iframe
                    src={embedUrl}
                    title={event.name}
                    className="w-full h-full border-0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                ) : (
                  <video
                    src={event.highlightVideoUrl}
                    controls
                    autoPlay
                    className="w-full h-full object-cover"
                  />
                )}
              </div>
            </div>
          ) : (
            <div className="relative h-72 sm:h-96 rounded-lg overflow-hidden shadow-lg bg-neutral-900 border border-neutral-300">
              <img src={event.heroImage} alt={event.name} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex items-end p-6">
                <div className="text-white space-y-1">
                  <span className="font-mono text-xs text-brand-red font-bold uppercase">{event.location}</span>
                  <h2 className="font-display text-2xl sm:text-3xl font-black uppercase">{event.name}</h2>
                </div>
              </div>
            </div>
          )}

          {/* 2. KEY EVENT METRICS & DETAILS GRID */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 bg-neutral-50 p-5 rounded-lg border border-neutral-200 text-xs font-mono">
            <div className="space-y-1">
              <span className="text-[10px] text-neutral-400 font-bold uppercase flex items-center space-x-1">
                <Calendar className="w-3 h-3 text-brand-red" />
                <span>DATES</span>
              </span>
              <strong className="block text-brand-black">{event.startDate} → {event.endDate}</strong>
            </div>

            <div className="space-y-1">
              <span className="text-[10px] text-neutral-400 font-bold uppercase flex items-center space-x-1">
                <MapPin className="w-3 h-3 text-brand-red" />
                <span>VENUE & LOCATION</span>
              </span>
              <strong className="block text-brand-black truncate">{event.venue}, {event.location}</strong>
            </div>

            <div className="space-y-1">
              <span className="text-[10px] text-neutral-400 font-bold uppercase flex items-center space-x-1">
                <Users className="w-3 h-3 text-brand-red" />
                <span>SCALE / ATTENDANCE</span>
              </span>
              <strong className="block text-brand-black truncate">{event.attendees || '1,000+ Delegates'}</strong>
            </div>

            <div className="space-y-1">
              <span className="text-[10px] text-neutral-400 font-bold uppercase flex items-center space-x-1">
                <Award className="w-3 h-3 text-brand-red" />
                <span>PRODUCED BY</span>
              </span>
              <strong className="block text-brand-black truncate">{event.organizer}</strong>
            </div>
          </div>

          {/* 3. EVENT RECAP & NARRATIVE HIGHLIGHTS */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <div className="lg:col-span-8 space-y-3 text-xs leading-relaxed">
              <span className="font-mono text-brand-red font-bold uppercase block text-[11px]">
                PRODUCTION OVERVIEW & CULTURAL IMPACT
              </span>
              <p className="text-neutral-700 text-sm font-medium leading-relaxed">
                {event.recapSummary || event.shortDesc}
              </p>
              {event.highlights && event.highlights.length > 0 && (
                <div className="p-4 bg-brand-light rounded border border-neutral-200 space-y-2 mt-3">
                  <strong className="font-mono text-brand-red uppercase text-[10px] block">KEY PRODUCTION MILESTONES:</strong>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-neutral-800 font-medium">
                    {event.highlights.map((h, i) => (
                      <li key={i} className="flex items-center space-x-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-brand-red flex-shrink-0" />
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            <div className="lg:col-span-4 p-5 bg-neutral-900 text-white rounded-lg space-y-4 flex flex-col justify-between">
              <div className="space-y-2 text-xs">
                <span className="font-mono text-brand-red font-bold uppercase text-[10px]">EVENT PARTNERS</span>
                <div className="space-y-1.5 font-mono text-[11px] text-neutral-300">
                  {event.partners.map((p, idx) => (
                    <div key={idx} className="pb-1 border-b border-neutral-800">
                      • {p}
                    </div>
                  ))}
                </div>
              </div>

              {event.status === 'UPCOMING' && event.registrationUrl ? (
                <a
                  href={event.registrationUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 bg-brand-red hover:bg-white hover:text-brand-black text-white font-mono font-bold text-xs uppercase tracking-wider rounded text-center transition-colors flex items-center justify-center space-x-2 shadow"
                >
                  <MessageCircle className="w-4 h-4 fill-current" />
                  <span>REGISTER / INQUIRE TICKETS</span>
                </a>
              ) : (
                <button
                  onClick={() => {
                    onClose();
                    if (onOpenInquiry) onOpenInquiry(`Stage & Event Production (${event.name})`);
                  }}
                  className="w-full py-3 bg-brand-red hover:bg-white hover:text-brand-black text-white font-mono font-bold text-xs uppercase tracking-wider rounded text-center transition-colors flex items-center justify-center space-x-2 shadow"
                >
                  <ExternalLink className="w-4 h-4" />
                  <span>PLAN A SIMILAR EVENT</span>
                </button>
              )}
            </div>
          </div>

          {/* 4. HIGH-RESOLUTION PHOTO SHOWCASE GALLERY */}
          <div className="space-y-4 pt-4 border-t border-neutral-200">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <span className="font-mono text-xs font-bold text-brand-red uppercase block">PHOTO SHOWCASE</span>
                <h4 className="font-display text-xl font-black uppercase text-brand-black">
                  EVENT GALLERY ({photos.length} HIGHLIGHT PHOTOS)
                </h4>
              </div>

              <div className="flex items-center space-x-3">
                {event.fullAlbumUrl && (
                  <a
                    href={event.fullAlbumUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3.5 py-2 bg-neutral-900 hover:bg-brand-red text-white text-xs font-mono font-bold uppercase rounded-lg transition-colors flex items-center space-x-1.5 shadow"
                    title="Open full cloud album"
                  >
                    <span>📂 VIEW FULL GOOGLE DRIVE ALBUM</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                )}
                <span className="text-[10px] font-mono text-neutral-400">CLICK TO ZOOM</span>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
              {photos.map((imgUrl, idx) => (
                <div
                  key={idx}
                  onClick={() => setActivePhotoIndex(idx)}
                  className="h-36 sm:h-44 rounded-lg overflow-hidden bg-neutral-900 border border-neutral-200 hover:border-brand-red transition-all cursor-pointer group relative"
                >
                  <img src={imgUrl} alt={`Photo ${idx + 1}`} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white text-xs font-mono font-bold">
                    VIEW FULL
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>

      {/* Lightbox for Gallery Photos */}
      <AnimatePresence>
        {activePhotoIndex !== null && (
          <div className="fixed inset-0 z-60 bg-black/95 flex items-center justify-center p-4">
            <div className="relative max-w-5xl max-h-[90vh] flex flex-col items-center">
              <button
                onClick={() => setActivePhotoIndex(null)}
                className="absolute -top-10 right-0 p-1 text-white hover:text-brand-red"
              >
                <X className="w-6 h-6" />
              </button>

              <img
                src={photos[activePhotoIndex]}
                alt="Enlarged Showcase"
                className="max-h-[80vh] max-w-full object-contain rounded shadow-2xl"
              />

              <div className="flex items-center justify-between w-full mt-3 text-white font-mono text-xs">
                <button
                  onClick={() => setActivePhotoIndex((activePhotoIndex - 1 + photos.length) % photos.length)}
                  className="p-2 bg-neutral-800 hover:bg-brand-red rounded flex items-center space-x-1"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span>PREV</span>
                </button>

                <span>PHOTO {activePhotoIndex + 1} / {photos.length}</span>

                <button
                  onClick={() => setActivePhotoIndex((activePhotoIndex + 1) % photos.length)}
                  className="p-2 bg-neutral-800 hover:bg-brand-red rounded flex items-center space-x-1"
                >
                  <span>NEXT</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
