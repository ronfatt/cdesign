import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ArrowRight, MapPin, MessageCircle } from 'lucide-react';
import { useCursor } from '../../context/CursorContext';

interface FullscreenMenuProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (sectionId: string) => void;
  onOpenInquiry: () => void;
  onOpenAdmin?: () => void;
}

interface MenuItem {
  title: string;
  sectionId: string;
  number: string;
  tagline: string;
}

const menuItems: MenuItem[] = [
  {
    title: 'HOME',
    sectionId: 'hero',
    number: '01',
    tagline: 'We Create Experiences That Move People.'
  },
  {
    title: 'WORK',
    sectionId: 'work',
    number: '02',
    tagline: 'Selected Portfolio & Cinematic Productions'
  },
  {
    title: 'SERVICES',
    sectionId: 'services',
    number: '03',
    tagline: 'Experiences, Film, Creative, Culture & Impact'
  },
  {
    title: 'EVENTS',
    sectionId: 'events',
    number: '04',
    tagline: 'Upcoming Festivals, Conventions & Video Recaps'
  },
  {
    title: 'ORIGINALS',
    sectionId: 'originals',
    number: '05',
    tagline: 'Proprietary IP & Signature Conventions'
  },
  {
    title: 'IMPACT',
    sectionId: 'impact',
    number: '06',
    tagline: 'Creativity With Purpose & Community Roots'
  },
  {
    title: 'ABOUT',
    sectionId: 'about',
    number: '07',
    tagline: 'The Team, Ethos & Behind The Scenes'
  },
  {
    title: 'CONTACT',
    sectionId: 'contact',
    number: '08',
    tagline: 'Commission a Project / Partnership'
  },
];

export const FullscreenMenu: React.FC<FullscreenMenuProps> = ({
  isOpen,
  onClose,
  onNavigate,
  onOpenInquiry,
  onOpenAdmin,
}) => {
  const { setCursorVariant, resetCursor } = useCursor();

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-50 bg-[#FFFFFF] flex flex-col justify-between overflow-y-auto pt-[env(safe-area-inset-top)] pb-[env(safe-area-inset-bottom)]"
        >
          {/* Top Header Bar */}
          <div className="flex items-center justify-between px-5 sm:px-12 py-5 border-b border-[#EAEAEA] relative z-20">
            <div className="flex items-center space-x-3">
              <img
                src="/logo.png"
                alt="CDesign Production Logo"
                className="w-7 h-7 sm:w-8 sm:h-8 object-contain rounded-full shadow-sm"
              />
              <span className="font-display font-black text-lg sm:text-xl tracking-tight uppercase">
                CDesign Production
              </span>
            </div>

            <div className="flex items-center space-x-2">
              {onOpenAdmin && (
                <button
                  onClick={() => {
                    onClose();
                    onOpenAdmin();
                  }}
                  onMouseEnter={() => setCursorVariant('link')}
                  onMouseLeave={resetCursor}
                  className="flex items-center space-x-1.5 text-xs font-mono font-bold uppercase tracking-wider px-3.5 py-2 rounded bg-neutral-100 hover:bg-neutral-200 text-brand-black border border-neutral-300 transition-colors min-h-[44px]"
                >
                  <span>ADMIN / LOGIN</span>
                </button>
              )}

              <button
                onClick={onClose}
                onMouseEnter={() => setCursorVariant('link')}
                onMouseLeave={resetCursor}
                className="flex items-center space-x-2 text-xs font-bold uppercase tracking-widest px-3.5 py-2 rounded border border-neutral-300 hover:border-brand-red hover:text-brand-red active:scale-95 transition-all min-h-[44px]"
              >
                <span>CLOSE</span>
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Menu Items List */}
          <div className="flex-1 flex flex-col justify-center px-6 sm:px-16 py-8 relative z-20 max-w-4xl mx-auto w-full">
            <div className="space-y-2 sm:space-y-3">
              {menuItems.map((item, index) => (
                <motion.div
                  key={item.title}
                  initial={{ y: 30, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{
                    delay: 0.05 * index,
                    duration: 0.45,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                >
                  <button
                    onClick={() => {
                      onNavigate(item.sectionId);
                      onClose();
                    }}
                    className="w-full text-left py-2.5 sm:py-3 flex items-center justify-between group border-b border-neutral-100 active:translate-x-1 transition-transform"
                  >
                    <div className="flex items-baseline space-x-4 sm:space-x-8">
                      <span className="font-mono text-xs sm:text-sm font-bold text-brand-red">
                        {item.number}
                      </span>
                      <span className="font-display-huge text-3xl sm:text-5xl md:text-6xl font-black uppercase tracking-tight text-brand-black group-hover:text-brand-red transition-colors duration-200">
                        {item.title}
                      </span>
                    </div>

                    <ArrowRight className="w-5 h-5 text-neutral-300 group-hover:text-brand-red group-hover:translate-x-2 transition-all duration-300" />
                  </button>
                </motion.div>
              ))}
            </div>

            {/* Direct Quick Actions inside Menu */}
            <div className="pt-8 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <button
                onClick={() => {
                  onClose();
                  onOpenInquiry();
                }}
                className="h-12 px-6 bg-brand-red text-white text-xs font-bold uppercase tracking-wider rounded flex items-center justify-center space-x-2 shadow-md active:scale-95 transition-transform"
              >
                <span>START A PROJECT</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              {onOpenAdmin && (
                <button
                  onClick={() => {
                    onClose();
                    onOpenAdmin();
                  }}
                  className="h-12 px-5 bg-neutral-900 hover:bg-neutral-800 text-white text-xs font-mono font-bold uppercase tracking-wider rounded flex items-center justify-center space-x-2 shadow-md active:scale-95 transition-transform"
                >
                  <span>ADMIN DASHBOARD / LOGIN</span>
                </button>
              )}

              <a
                href="https://wa.me/60128188188?text=Hello%20C%20Design%20Production%2C%20I%20would%20like%20to%20inquire%20about%20a%20project."
                target="_blank"
                rel="noopener noreferrer"
                className="h-12 px-5 bg-[#25D366] text-white text-xs font-bold uppercase tracking-wider rounded flex items-center justify-center space-x-2 shadow-md active:scale-95 transition-transform"
              >
                <MessageCircle className="w-4 h-4 fill-current" />
                <span>CHAT ON WHATSAPP</span>
              </a>
            </div>
          </div>

          {/* Bottom Footer Bar inside Menu */}
          <div className="px-6 sm:px-12 py-5 bg-brand-light border-t border-[#EAEAEA] flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs font-mono text-neutral-500">
            <div className="flex items-center space-x-2 text-brand-black">
              <MapPin className="w-3.5 h-3.5 text-brand-red" />
              <span>TAWAU · SABAH · MALAYSIA (04°14'N · 117°53'E)</span>
            </div>

            <div className="flex items-center space-x-4">
              <a href="#instagram" className="hover:text-brand-red font-bold">INSTAGRAM</a>
              <span>·</span>
              <a href="#facebook" className="hover:text-brand-red font-bold">FACEBOOK</a>
              <span>·</span>
              <a href="#youtube" className="hover:text-brand-red font-bold">YOUTUBE</a>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
