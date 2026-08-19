import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ArrowRight, MapPin } from 'lucide-react';
import { useCursor } from '../../context/CursorContext';

interface FullscreenMenuProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (sectionId: string) => void;
  onOpenInquiry: () => void;
}

interface MenuItem {
  title: string;
  sectionId: string;
  number: string;
  image: string;
  tagline: string;
}

const menuItems: MenuItem[] = [
  {
    title: 'HOME',
    sectionId: 'hero',
    number: '01',
    image: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=1200&auto=format&fit=crop',
    tagline: 'We Create Experiences That Move People.'
  },
  {
    title: 'WORK',
    sectionId: 'work',
    number: '02',
    image: 'https://images.unsplash.com/photo-1485846234645-a62644f84728?q=80&w=1200&auto=format&fit=crop',
    tagline: 'Selected Portfolio & Cinematic Productions'
  },
  {
    title: 'SERVICES',
    sectionId: 'services',
    number: '03',
    image: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?q=80&w=1200&auto=format&fit=crop',
    tagline: 'Experiences, Film, Creative, Culture & Impact'
  },
  {
    title: 'ORIGINALS',
    sectionId: 'originals',
    number: '04',
    image: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=1200&auto=format&fit=crop',
    tagline: 'Proprietary IP & Signature Conventions'
  },
  {
    title: 'IMPACT',
    sectionId: 'impact',
    number: '05',
    image: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=1200&auto=format&fit=crop',
    tagline: 'Creativity With Purpose & Community Roots'
  },
  {
    title: 'ABOUT',
    sectionId: 'about',
    number: '06',
    image: 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?q=80&w=1200&auto=format&fit=crop',
    tagline: 'Born in Borneo. Creating Beyond Borders.'
  },
  {
    title: 'CONTACT',
    sectionId: 'contact',
    number: '07',
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=1200&auto=format&fit=crop',
    tagline: 'Let’s Create Something Worth Remembering.'
  }
];

export const FullscreenMenu: React.FC<FullscreenMenuProps> = ({
  isOpen,
  onClose,
  onNavigate,
  onOpenInquiry,
}) => {
  const [activeHoverIndex, setActiveHoverIndex] = useState<number>(0);
  const { setCursorVariant, resetCursor } = useCursor();

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          className="fixed inset-0 z-50 bg-[#FFFFFF] flex flex-col justify-between overflow-hidden"
        >
          {/* Top Bar */}
          <div className="flex items-center justify-between px-6 sm:px-12 py-6 border-b border-[#EAEAEA] relative z-20">
            <div className="flex items-center space-x-3">
              <img
                src="/logo.png"
                alt="CDesign Production Logo"
                className="w-7 h-7 sm:w-8 sm:h-8 object-contain rounded-full shadow-sm"
              />
              <span className="font-display font-black text-xl tracking-tight uppercase">
                CDesign Production
              </span>
            </div>

            <button
              onClick={onClose}
              onMouseEnter={() => setCursorVariant('link')}
              onMouseLeave={resetCursor}
              className="group flex items-center space-x-2 text-sm font-semibold uppercase tracking-widest px-4 py-2 rounded border border-neutral-300 hover:border-brand-red hover:text-brand-red transition-all"
            >
              <span>CLOSE</span>
              <X className="w-4 h-4 group-hover:rotate-90 transition-transform duration-300" />
            </button>
          </div>

          {/* Menu Main Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 flex-1 relative overflow-y-auto lg:overflow-hidden">
            {/* Left Nav Column */}
            <div className="lg:col-span-7 flex flex-col justify-center px-6 sm:px-16 py-8 relative z-20">
              <div className="space-y-1 sm:space-y-2">
                {menuItems.map((item, index) => (
                  <motion.div
                    key={item.title}
                    initial={{ y: 50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{
                      delay: 0.08 * index,
                      duration: 0.5,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                    onMouseEnter={() => {
                      setActiveHoverIndex(index);
                      setCursorVariant('link');
                    }}
                    onMouseLeave={resetCursor}
                    className="group"
                  >
                    <button
                      onClick={() => {
                        if (item.sectionId === 'contact') {
                          onClose();
                          onOpenInquiry();
                        } else {
                          onNavigate(item.sectionId);
                        }
                      }}
                      className="w-full text-left flex items-baseline justify-between py-2 border-b border-transparent group-hover:border-neutral-200 transition-colors"
                    >
                      <div className="flex items-baseline space-x-4 sm:space-x-6">
                        <span className="text-xs sm:text-sm font-mono text-brand-red font-semibold">
                          {item.number}
                        </span>
                        <span className="font-display-huge text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight uppercase text-[#111111] group-hover:text-brand-red group-hover:translate-x-3 transition-all duration-300">
                          {item.title}
                        </span>
                      </div>
                      <ArrowRight className="w-6 h-6 sm:w-8 sm:h-8 text-brand-red opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 hidden sm:block" />
                    </button>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Right Interactive Image Preview Panel */}
            <div className="hidden lg:flex lg:col-span-5 relative bg-neutral-900 overflow-hidden items-end p-12">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeHoverIndex}
                  initial={{ opacity: 0, scale: 1.08 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute inset-0 z-0"
                >
                  <img
                    src={menuItems[activeHoverIndex].image}
                    alt={menuItems[activeHoverIndex].title}
                    className="w-full h-full object-cover filter brightness-75 contrast-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />
                </motion.div>
              </AnimatePresence>

              {/* Overlay Content */}
              <div className="relative z-10 text-white space-y-2">
                <div className="inline-block px-2.5 py-1 bg-brand-red text-white text-[10px] font-bold uppercase tracking-widest">
                  {menuItems[activeHoverIndex].number} · {menuItems[activeHoverIndex].title}
                </div>
                <p className="text-xl font-medium tracking-tight">
                  {menuItems[activeHoverIndex].tagline}
                </p>
                <div className="flex items-center space-x-2 text-xs text-neutral-400 font-mono pt-2">
                  <MapPin className="w-3.5 h-3.5 text-brand-red" />
                  <span>TAWAU · SABAH · BORNEO</span>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="px-6 sm:px-12 py-4 border-t border-[#EAEAEA] flex flex-col sm:flex-row items-center justify-between text-xs text-neutral-500 font-medium relative z-20 bg-white">
            <div className="flex items-center space-x-6 mb-2 sm:mb-0">
              <span className="text-[#111111] font-semibold">C DESIGN PRODUCTION SDN BHD</span>
              <span>TAWAU, SABAH, MALAYSIA</span>
            </div>
            <div className="flex items-center space-x-4">
              <a href="#instagram" className="hover:text-brand-red transition-colors">INSTAGRAM</a>
              <span>·</span>
              <a href="#facebook" className="hover:text-brand-red transition-colors">FACEBOOK</a>
              <span>·</span>
              <a href="#youtube" className="hover:text-brand-red transition-colors">YOUTUBE</a>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
