import React from 'react';
import { ArrowUp, MapPin, Phone, Mail } from 'lucide-react';
import { useCursor } from '../../context/CursorContext';

interface FooterProps {
  onNavigate: (sectionId: string) => void;
  onOpenAdmin?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onOpenAdmin }) => {
  const { setCursorVariant, resetCursor } = useCursor();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-brand-black text-white pt-16 sm:pt-20 pb-12 sm:pb-16 border-t border-neutral-800 relative overflow-hidden pb-[max(3rem,env(safe-area-inset-bottom))]">
      <div className="max-w-7xl mx-auto px-5 sm:px-10 space-y-12 sm:space-y-16">
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 sm:gap-12 pb-12 sm:pb-16 border-b border-neutral-800">
          {/* Col 1: Brand & Creed */}
          <div className="md:col-span-5 space-y-4 sm:space-y-6">
            <div className="flex items-center space-x-3">
              <img
                src="/logo.png"
                alt="CDesign Production Logo"
                className="w-9 h-9 object-contain rounded-full shadow-sm"
              />
              <span className="font-display font-black text-2xl tracking-tight uppercase">
                CDesign Production
              </span>
            </div>

            <p className="text-sm sm:text-base text-neutral-300 font-medium max-w-sm leading-relaxed">
              We create experiences that move people. Born in Borneo. Creating beyond borders.
            </p>

            <div className="flex items-center space-x-2 text-xs font-mono text-neutral-400">
              <MapPin className="w-3.5 h-3.5 text-brand-red flex-shrink-0" />
              <span>TAWAU · SABAH · MALAYSIA (04°14'N · 117°53'E)</span>
            </div>
          </div>

          {/* Col 2: Navigation Links */}
          <div className="md:col-span-3 space-y-3 sm:space-y-4">
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-brand-red block">
              NAVIGATION
            </span>
            <ul className="grid grid-cols-2 md:grid-cols-1 gap-2 text-xs font-bold uppercase tracking-wider text-neutral-300">
              {['hero', 'work', 'services', 'originals', 'impact', 'about'].map((id) => (
                <li key={id}>
                  <button
                    onClick={() => onNavigate(id)}
                    onMouseEnter={() => setCursorVariant('link')}
                    onMouseLeave={resetCursor}
                    className="hover:text-brand-red active:text-brand-red transition-colors py-1 min-h-[32px] flex items-center"
                  >
                    {id.toUpperCase()}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Direct Contact Links with Tap-to-Call / Email */}
          <div className="md:col-span-4 space-y-3 sm:space-y-4">
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-brand-red block">
              HEADQUARTERS & DIRECT ACCESS
            </span>
            <div className="space-y-2 text-xs text-neutral-300">
              <p className="font-medium text-white">C Design Production Sdn. Bhd.</p>
              <p>Tawau Waterfront Creative Quarter, 91000 Tawau, Sabah, Malaysia</p>
              
              <div className="pt-2 flex flex-col space-y-1.5 font-mono">
                <a
                  href="mailto:hello@cdesignproduction.com"
                  className="inline-flex items-center space-x-2 text-neutral-300 hover:text-brand-red active:text-brand-red transition-colors"
                >
                  <Mail className="w-3.5 h-3.5 text-brand-red" />
                  <span>hello@cdesignproduction.com</span>
                </a>
                <a
                  href="tel:+6089772888"
                  className="inline-flex items-center space-x-2 text-neutral-300 hover:text-brand-red active:text-brand-red transition-colors"
                >
                  <Phone className="w-3.5 h-3.5 text-brand-red" />
                  <span>+60 (89) 772-888</span>
                </a>
              </div>
            </div>

            <div className="pt-3 flex flex-wrap items-center gap-3 text-xs font-mono">
              <a href="#instagram" className="hover:text-brand-red font-bold py-1">INSTAGRAM</a>
              <span>·</span>
              <a href="#facebook" className="hover:text-brand-red font-bold py-1">FACEBOOK</a>
              <span>·</span>
              <a href="#youtube" className="hover:text-brand-red font-bold py-1">YOUTUBE</a>
              <span>·</span>
              <a href="#tiktok" className="hover:text-brand-red font-bold py-1">TIKTOK</a>
            </div>
          </div>
        </div>

        {/* Bottom Bar with Back to Top & Admin Access */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-neutral-500">
          <div className="flex items-center space-x-3 text-center sm:text-left">
            <span>© {new Date().getFullYear()} C DESIGN PRODUCTION SDN. BHD.</span>
            {onOpenAdmin && (
              <>
                <span>·</span>
                <button
                  onClick={onOpenAdmin}
                  className="text-neutral-500 hover:text-brand-red transition-colors uppercase font-bold"
                >
                  [ADMIN CRM]
                </button>
              </>
            )}
          </div>

          <button
            onClick={scrollToTop}
            onMouseEnter={() => setCursorVariant('link')}
            onMouseLeave={resetCursor}
            className="flex items-center space-x-2 px-4 py-2.5 rounded bg-neutral-900 hover:bg-brand-red text-white active:scale-95 transition-all min-h-[44px]"
          >
            <span>BACK TO TOP</span>
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>
      </div>
    </footer>
  );
};
