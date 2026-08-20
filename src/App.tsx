import { useState, useEffect, useRef } from 'react';
import { CursorProvider } from './context/CursorContext';
import { CustomCursor } from './components/cursor/CustomCursor';
import { PageWipe } from './components/transitions/PageWipe';
import { Navbar } from './components/navigation/Navbar';
import { FullscreenMenu } from './components/navigation/FullscreenMenu';
import { HeroSection } from './components/hero/HeroSection';
import { ShowreelModal } from './components/hero/ShowreelModal';
import { LiveStats } from './components/stats/LiveStats';
import { SelectedWork } from './components/work/SelectedWork';
import { FlagshipCaseStudy } from './components/casestudy/FlagshipCaseStudy';
import { HorizontalStories } from './components/featured/HorizontalStories';
import { WhatWeDo } from './components/services/WhatWeDo';
import { BiccScrollStory } from './components/bicc/BiccScrollStory';
import { EventsSection } from './components/events/EventsSection';
import { OriginalsCarousel } from './components/originals/OriginalsCarousel';
import { RootedInBorneo } from './components/culture/RootedInBorneo';
import { CreativityWithPurpose } from './components/impact/CreativityWithPurpose';
import { ImageTrailSection } from './components/experimental/ImageTrailSection';
import { KineticMarquee } from './components/marquee/KineticMarquee';
import { TeamBTSCollage } from './components/about/TeamBTSCollage';
import { PartnerLogos } from './components/partners/PartnerLogos';
import { TestimonialSection } from './components/testimonials/TestimonialSection';
import { StartProjectCTA } from './components/cta/StartProjectCTA';
import { ProgressiveInquiryModal } from './components/contact/ProgressiveInquiryModal';
import { EventRecapModal } from './components/events/EventRecapModal';
import { AdminDashboard } from './components/admin/AdminDashboard';
import { Footer } from './components/footer/Footer';
import { StickyMobileCTA } from './components/common/StickyMobileCTA';
import { useSmoothScroll } from './hooks/useSmoothScroll';
import type { Project } from './types';
import type { CMSEvent } from './types/crm';

export function AppContent() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isShowreelOpen, setIsShowreelOpen] = useState(false);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [activeCaseStudy, setActiveCaseStudy] = useState<Project | null>(null);
  const [activeEventRecap, setActiveEventRecap] = useState<CMSEvent | null>(null);
  const [isInquiryOpen, setIsInquiryOpen] = useState(false);
  const [inquiryTopic, setInquiryTopic] = useState<string | undefined>(undefined);
  const [isWiping, setIsWiping] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const [isPageLoaded, setIsPageLoaded] = useState(false);

  const previousScrollY = useRef(0);

  // Initialize Lenis Smooth Scroll
  useSmoothScroll();

  // Staged entrance trigger & Admin shortcut listener
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsPageLoaded(true);
    }, 100);

    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && (e.key === 'a' || e.key === 'A')) {
        e.preventDefault();
        setIsAdminOpen((prev) => !prev);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      clearTimeout(timer);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  // Open Full Case Study with snappy transition
  const handleOpenCaseStudy = (project: Project) => {
    previousScrollY.current = window.scrollY;
    setIsWiping(true);

    setTimeout(() => {
      setActiveCaseStudy(project);
      setTimeout(() => {
        setIsWiping(false);
      }, 150);
    }, 220);
  };

  // Close Case Study and restore scroll position instantly
  const handleCloseCaseStudy = () => {
    setIsWiping(true);

    setTimeout(() => {
      setActiveCaseStudy(null);
      setTimeout(() => {
        window.scrollTo({ top: previousScrollY.current, behavior: 'instant' as any });
        setIsWiping(false);
      }, 150);
    }, 200);
  };

  // Direct & Instant Smooth Navigation (No blocking wipe pause)
  const handleNavigate = (sectionId: string) => {
    if (activeCaseStudy) {
      setActiveCaseStudy(null);
    }
    setIsMenuOpen(false);

    // Instant direct scroll to section
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    } else if (sectionId === 'hero') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleOpenInquiry = (topic?: string) => {
    setInquiryTopic(topic);
    setIsInquiryOpen(true);
  };

  // Intersection Observer for Active Section Highlight
  useEffect(() => {
    if (activeCaseStudy) return;

    const sections = ['hero', 'work', 'services', 'originals', 'impact', 'about', 'contact'];
    const handleScroll = () => {
      const scrollY = window.scrollY + 200;
      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollY >= top && scrollY < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [activeCaseStudy]);

  return (
    <div className="relative min-h-screen bg-white text-brand-black overflow-x-hidden selection:bg-brand-red selection:text-white">
      {/* Global Interactive Custom Cursor */}
      <CustomCursor />

      {/* Cinematic Red Panel Page Wipe Transition */}
      <PageWipe isTransitioning={isWiping} />

      {/* RENDER FULL CINEMATIC CASE STUDY IF ACTIVE */}
      {activeCaseStudy ? (
        <FlagshipCaseStudy
          project={activeCaseStudy}
          onBack={handleCloseCaseStudy}
          onSelectNextProject={(next) => handleOpenCaseStudy(next)}
          onOpenInquiry={(topic) => handleOpenInquiry(topic)}
        />
      ) : (
        <>
          {/* Sticky Header Navbar */}
          <Navbar
            activeSection={activeSection}
            onNavigate={handleNavigate}
            onOpenMenu={() => setIsMenuOpen(true)}
            onOpenInquiry={() => handleOpenInquiry()}
            onOpenAdmin={() => setIsAdminOpen(true)}
            isLoaded={isPageLoaded}
          />

          {/* Fullscreen Staggered Navigation Overlay */}
          <FullscreenMenu
            isOpen={isMenuOpen}
            onClose={() => setIsMenuOpen(false)}
            onNavigate={handleNavigate}
            onOpenInquiry={() => handleOpenInquiry()}
            onOpenAdmin={() => setIsAdminOpen(true)}
          />

          {/* 02. Hero Section with Staged Entrance & Layered Parallax */}
          <HeroSection
            onPlayShowreel={() => setIsShowreelOpen(true)}
            onNavigateWork={() => handleNavigate('work')}
            isLoaded={isPageLoaded}
          />

          {/* 03. Live Statistics & Brand Scale */}
          <LiveStats />

          {/* 04. Selected Work with Alternating Red Mask Reveals, Film Scrubber & Case Study Triggers */}
          <SelectedWork onSelectProject={(p) => handleOpenCaseStudy(p)} />

          {/* 05. Featured Stories (Horizontal Pinned Scroll) */}
          <HorizontalStories onSelectProject={(p) => handleOpenCaseStudy(p)} />

          {/* 06. What We Do (5 Horizontal Service Rows with Fullscreen Takeover Preview) */}
          <WhatWeDo onOpenInquiry={(service) => handleOpenInquiry(service)} />

          {/* 07. BICC 2026 Scroll Story (6-Phase Documentary Narrative & Red Story Line) */}
          <BiccScrollStory onSelectProject={(p) => handleOpenCaseStudy(p)} />

          {/* 07.5 Productions & Festivals Events Section (Live CMS Events with 4K Highlight Video & Photo Gallery) */}
          <EventsSection
            onSelectEvent={(evt) => setActiveEventRecap(evt)}
            onOpenInquiry={(topic) => handleOpenInquiry(topic)}
          />

          {/* 08. C Design Originals (Draggable 3D Cover Carousel) */}
          <OriginalsCarousel onOpenInquiry={(ip) => handleOpenInquiry(ip)} />

          {/* 09. Rooted in Borneo (Typographic Graphic Map & Split Headline) */}
          <RootedInBorneo />

          {/* 10. Creativity With Purpose (Split Screen Impact Switcher) */}
          <CreativityWithPurpose />

          {/* 11. Production Excellence Section */}
          <ImageTrailSection onOpenShowreel={() => setIsShowreelOpen(true)} />

          {/* 12. Kinetic Marquee Strip */}
          <KineticMarquee />

          {/* 13. Team / Behind The Scenes Photographic Collage */}
          <TeamBTSCollage />

          {/* 14. Partner & Client Infinite Loop */}
          <PartnerLogos />

          {/* 15. Testimonial Experience with Mask Reveal */}
          <TestimonialSection />

          {/* 16. Start a Project High-Voltage Red Section */}
          <StartProjectCTA onOpenInquiry={(intent) => handleOpenInquiry(intent)} />

          {/* 17. Production Footer with Admin Trigger */}
          <Footer
            onNavigate={handleNavigate}
            onOpenAdmin={() => setIsAdminOpen(true)}
          />
        </>
      )}

      {/* Cinematic Fullscreen Showreel Modal */}
      <ShowreelModal
        isOpen={isShowreelOpen}
        onClose={() => setIsShowreelOpen(false)}
      />

      {/* 5-Step Progressive Project Inquiry Modal */}
      <ProgressiveInquiryModal
        isOpen={isInquiryOpen}
        onClose={() => setIsInquiryOpen(false)}
        initialTopic={inquiryTopic}
      />

      {/* Touch-Optimized Sticky Bottom Action for Mobile */}
      <StickyMobileCTA onOpenInquiry={() => handleOpenInquiry()} />

      {/* Public Event Showcase & Video Recap Modal */}
      <EventRecapModal
        event={activeEventRecap}
        onClose={() => setActiveEventRecap(null)}
        onOpenInquiry={(topic) => handleOpenInquiry(topic)}
      />

      {/* Admin CRM & CMS Configuration Dashboard */}
      <AdminDashboard
        isOpen={isAdminOpen}
        onClose={() => setIsAdminOpen(false)}
      />
    </div>
  );
}

export default function App() {
  return (
    <CursorProvider>
      <AppContent />
    </CursorProvider>
  );
}
