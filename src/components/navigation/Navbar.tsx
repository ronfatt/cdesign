import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Menu } from 'lucide-react';
import { useCursor } from '../../context/CursorContext';
import { MagneticButton } from '../common/MagneticButton';

interface NavbarProps {
  onOpenMenu: () => void;
  onOpenInquiry: () => void;
  onOpenAdmin?: () => void;
  activeSection: string;
  onNavigate: (sectionId: string) => void;
  isLoaded?: boolean;
}

const navLinks = [
  { label: 'HOME', sectionId: 'hero' },
  { label: 'WORK', sectionId: 'work' },
  { label: 'SERVICES', sectionId: 'services' },
  { label: 'EVENTS', sectionId: 'events' },
  { label: 'ORIGINALS', sectionId: 'originals' },
  { label: 'IMPACT', sectionId: 'impact' },
  { label: 'ABOUT', sectionId: 'about' },
];

export const Navbar: React.FC<NavbarProps> = ({
  onOpenMenu,
  onOpenInquiry,
  onOpenAdmin,
  activeSection,
  onNavigate,
  isLoaded = true,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isScrollingDown, setIsScrollingDown] = useState(false);
  const lastScrollY = useRef(0);
  const { setCursorVariant, resetCursor } = useCursor();

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setIsScrolled(currentScrollY > 30);

      if (currentScrollY > lastScrollY.current && currentScrollY > 120) {
        setIsScrollingDown(true);
      } else {
        setIsScrollingDown(false);
      }

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={isLoaded ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
      transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 pt-[env(safe-area-inset-top)] ${
        isScrolled
          ? isScrollingDown
            ? 'py-2 sm:py-2.5 bg-white/95 backdrop-blur-md border-b border-neutral-200/80 shadow-sm'
            : 'py-3 sm:py-3.5 bg-white/95 backdrop-blur-md border-b border-neutral-200/80 shadow-sm'
          : 'py-4 sm:py-6 bg-transparent border-b border-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-10 flex items-center justify-between">
        {/* Brand Logo with Official Circular Emblem */}
        <button
          onClick={() => onNavigate('hero')}
          onMouseEnter={() => setCursorVariant('link')}
          onMouseLeave={resetCursor}
          className="flex items-center space-x-2.5 sm:space-x-3 text-left group active:scale-98 transition-transform"
        >
          <img
            src="/logo.png"
            alt="CDesign Production Logo"
            className="w-8 h-8 sm:w-9 sm:h-9 object-contain rounded-full shadow-sm group-hover:scale-105 transition-transform duration-300"
          />
          <div>
            <span className="font-display font-black text-base sm:text-xl tracking-tight uppercase text-brand-black block leading-none">
              CDesign
            </span>
            <span className="text-[9px] font-mono tracking-widest text-neutral-500 uppercase block mt-0.5">
              Production · Tawau
            </span>
          </div>
        </button>

        {/* Desktop Navigation Links with Rolling Text Effect */}
        <nav className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => {
            const isActive = activeSection === link.sectionId;
            return (
              <button
                key={link.label}
                onClick={() => onNavigate(link.sectionId)}
                onMouseEnter={() => setCursorVariant('link')}
                onMouseLeave={resetCursor}
                className="relative py-1 text-xs font-bold tracking-widest uppercase transition-colors group"
              >
                <div className="nav-link-roll">
                  <div className="nav-link-roll-inner">
                    <span className={isActive ? 'text-brand-red' : 'text-brand-black group-hover:text-brand-red'}>
                      {link.label}
                    </span>
                    <span className="text-brand-red">
                      {link.label}
                    </span>
                  </div>
                </div>

                {isActive && (
                  <motion.div
                    layoutId="activeNavIndicator"
                    className="absolute -bottom-0.5 left-0 right-0 h-[2px] bg-brand-red"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
              </button>
            );
          })}
        </nav>

        {/* Right CTA & Menu Trigger */}
        <div className="flex items-center space-x-2 sm:space-x-3">
          {onOpenAdmin && (
            <button
              onClick={onOpenAdmin}
              onMouseEnter={() => setCursorVariant('link')}
              onMouseLeave={resetCursor}
              className="px-2.5 py-1.5 sm:px-3 sm:py-2 text-[11px] sm:text-xs font-mono font-bold uppercase tracking-wider text-neutral-600 hover:text-brand-red bg-neutral-100 hover:bg-neutral-200/80 rounded border border-neutral-200 transition-colors"
              title="Open Admin Dashboard"
            >
              ADMIN
            </button>
          )}

          <div className="hidden sm:block">
            <MagneticButton
              variant="primary"
              onClick={onOpenInquiry}
              className="!px-4 !py-2 !text-xs shadow-sm"
              cursorText="START"
            >
              <span>START A PROJECT</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </MagneticButton>
          </div>

          <button
            onClick={onOpenMenu}
            onMouseEnter={() => setCursorVariant('link')}
            onMouseLeave={resetCursor}
            className="flex items-center space-x-1.5 p-2 sm:px-3 sm:py-2 rounded border border-neutral-300 hover:border-brand-red text-brand-black hover:text-brand-red active:scale-95 transition-all duration-200 min-w-[44px] min-h-[44px] justify-center"
            aria-label="Open Fullscreen Menu"
          >
            <Menu className="w-5 h-5 text-brand-black" />
            <span className="text-xs font-bold uppercase tracking-wider hidden lg:inline">MENU</span>
          </button>
        </div>
      </div>
    </motion.header>
  );
};
