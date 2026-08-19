import React from 'react';
import { ArrowUp, MapPin } from 'lucide-react';
import { useCursor } from '../../context/CursorContext';

interface FooterProps {
  onNavigate: (sectionId: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const { setCursorVariant, resetCursor } = useCursor();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-brand-black text-white pt-20 pb-12 border-t border-neutral-800 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 space-y-16">
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-16 border-b border-neutral-800">
          {/* Col 1: Brand & Creed */}
          <div className="md:col-span-5 space-y-6">
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

            <p className="text-base text-neutral-300 font-medium max-w-sm leading-relaxed">
              We create experiences that move people. Born in Borneo. Creating beyond borders.
            </p>

            <div className="flex items-center space-x-3 text-xs font-mono text-neutral-400">
              <MapPin className="w-3.5 h-3.5 text-brand-red" />
              <span>TAWAU · SABAH · MALAYSIA (04°14'N · 117°53'E)</span>
            </div>
          </div>

          {/* Col 2: Navigation Links */}
          <div className="md:col-span-3 space-y-4">
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-brand-red block">
              NAVIGATION
            </span>
            <ul className="space-y-2 text-xs font-bold uppercase tracking-wider text-neutral-300">
              {['hero', 'work', 'services', 'originals', 'impact', 'about'].map((id) => (
                <li key={id}>
                  <button
                    onClick={() => onNavigate(id)}
                    onMouseEnter={() => setCursorVariant('link')}
                    onMouseLeave={resetCursor}
                    className="hover:text-brand-red transition-colors"
                  >
                    {id.toUpperCase()}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Contact & Socials */}
          <div className="md:col-span-4 space-y-4">
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-brand-red block">
              HEADQUARTERS & ENQUIRIES
            </span>
            <div className="space-y-2 text-xs text-neutral-300">
              <p className="font-medium text-white">C Design Production Sdn. Bhd.</p>
              <p>Tawau Waterfront Creative Quarter, 91000 Tawau, Sabah, Malaysia</p>
              <p className="text-neutral-400 pt-2 font-mono">hello@cdesignproduction.com</p>
              <p className="text-neutral-400 font-mono">+60 (89) 772-888</p>
            </div>

            <div className="pt-4 flex items-center space-x-4 text-xs font-mono">
              <a href="#instagram" className="hover:text-brand-red transition-colors">INSTAGRAM</a>
              <span>·</span>
              <a href="#facebook" className="hover:text-brand-red transition-colors">FACEBOOK</a>
              <span>·</span>
              <a href="#youtube" className="hover:text-brand-red transition-colors">YOUTUBE</a>
              <span>·</span>
              <a href="#tiktok" className="hover:text-brand-red transition-colors">TIKTOK</a>
            </div>
          </div>
        </div>

        {/* Bottom Bar with Back to Top */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 text-xs font-mono text-neutral-500">
          <div>
            © {new Date().getFullYear()} C DESIGN PRODUCTION SDN. BHD. ALL RIGHTS RESERVED.
          </div>

          <button
            onClick={scrollToTop}
            onMouseEnter={() => setCursorVariant('link')}
            onMouseLeave={resetCursor}
            className="group flex items-center space-x-2 px-4 py-2 rounded bg-neutral-900 hover:bg-brand-red text-white transition-colors"
          >
            <span>BACK TO TOP</span>
            <ArrowUp className="w-4 h-4 group-hover:-translate-y-1 transition-transform" />
          </button>
        </div>
      </div>
    </footer>
  );
};
