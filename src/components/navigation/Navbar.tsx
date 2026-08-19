import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Menu } from 'lucide-react';
import { useCursor } from '../../context/CursorContext';
import { MagneticButton } from '../common/MagneticButton';

interface NavbarProps {
  onOpenMenu: () => void;
  onOpenInquiry: () => void;
  activeSection: string;
  onNavigate: (sectionId: string) => void;
  isLoaded?: boolean;
}

const navLinks = [
  { label: 'HOME', sectionId: 'hero' },
  { label: 'WORK', sectionId: 'work' },
  { label: 'SERVICES', sectionId: 'services' },
  { label: 'ORIGINALS', sectionId: 'originals' },
  { label: 'IMPACT', sectionId: 'impact' },
  { label: 'ABOUT', sectionId: 'about' },
];

export const Navbar: React.FC<NavbarProps> = ({
  onOpenMenu,
  onOpenInquiry,
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
      setIsScrolled(currentScrollY > 40);

      if (currentScrollY > lastScrollY.current && currentScrollY > 150) {
        setIsScrollingDown(true); // scrolling down -> compress
      } else {
        setIsScrollingDown(false); // scrolling up -> expand
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
      transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-400 ${
        isScrolled
          ? isScrollingDown
            ? 'py-2.5 bg-white/95 backdrop-blur-md border-b border-neutral-200/80 shadow-sm'
            : 'py-3.5 bg-white/95 backdrop-blur-md border-b border-neutral-200/80 shadow-sm'
          : 'py-6 bg-transparent border-b border-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-10 flex items-center justify-between">
        {/* Brand Logo with Initial Load Animation */}
        <button
          onClick={() => onNavigate('hero')}
          onMouseEnter={() => setCursorVariant('link')}
          onMouseLeave={resetCursor}
          className="flex items-center space-x-3 text-left group"
        >
          <img
            src="/logo.png"
            alt="CDesign Production Logo"
            className="w-8 h-8 sm:w-9 sm:h-9 object-contain rounded-full shadow-sm group-hover:scale-105 transition-transform duration-300"
          />
          <div>
            <span className="font-display font-black text-lg sm:text-xl tracking-tight uppercase text-brand-black block leading-none">
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
        <div className="flex items-center space-x-4">
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
            className="flex items-center space-x-2 p-2 rounded border border-neutral-300 hover:border-brand-red text-brand-black hover:text-brand-red transition-all duration-300"
            aria-label="Open Fullscreen Menu"
          >
            <Menu className="w-5 h-5" />
            <span className="text-xs font-bold uppercase tracking-wider hidden lg:inline">MENU</span>
          </button>
        </div>
      </div>
    </motion.header>
  );
};
