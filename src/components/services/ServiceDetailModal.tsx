import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ArrowRight, Check, HelpCircle, Sparkles, Layers } from 'lucide-react';
import type { ServiceItem } from '../../types';
import { projectsData } from '../../data/projectsData';

interface ServiceDetailModalProps {
  service: ServiceItem | null;
  onClose: () => void;
  onOpenInquiry: (serviceName?: string) => void;
}

const serviceFAQs: Record<string, { q: string; a: string }[]> = {
  'EXPERIENCES': [
    {
      q: 'Do you handle event productions outside of Tawau?',
      a: 'Yes. While our headquarters and core production workshop are in Tawau, we produce stadium conventions, festivals, and gala experiences across Kota Kinabalu, Sabah, Peninsular Malaysia, and internationally.'
    },
    {
      q: 'What scale of events can C Design manage?',
      a: 'We manage everything from intimate executive VIP launches (100 guests) to multi-thousand attendee international festivals and arena conventions like BICC 2026.'
    },
    {
      q: 'Do you provide full stage lighting, audio, and LED engineering?',
      a: 'Yes. We provide complete 360-degree technical production: structural rigging, automated DMX lighting, acoustic sound engineering, multi-cam live broadcast, and spatial scenography.'
    }
  ],
  'FILM & CONTENT': [
    {
      q: 'What cinema camera systems and lenses do you shoot on?',
      a: 'We own and operate cinema rigs including RED V-Raptor, Sony FX6/FX9, anamorphic lenses, FPV cinematic drones, and underwater cinema housings tailored for Borneo maritime and rainforest conditions.'
    },
    {
      q: 'Can you produce corporate commercials and documentaries from script to delivery?',
      a: 'Yes. Our film department handles creative treatment, storyboarding, scriptwriting, location permits, indigenous community fixers, filming, color grading, sound design, and broadcast master delivery.'
    }
  ],
  'CREATIVE DIRECTION': [
    {
      q: 'How does creative direction work for new brands or campaigns?',
      a: 'We build comprehensive 360-degree creative systems: brand narrative, visual identity, campaign strategy, launch event choreography, and digital content pipelines designed to move audiences emotionally.'
    }
  ],
  'CULTURE & TOURISM': [
    {
      q: 'How do you incorporate indigenous Sabah cultures into modern events?',
      a: 'With utmost reverence and direct community collaboration. We work closely with indigenous custodians (Kadazandusun, Murut, Bajau Laut, Suluk) to ensure cultural authenticity, respectful protocol, and fair economic partnership.'
    }
  ],
  'IMPACT & COMMUNITY': [
    {
      q: 'Can corporate clients collaborate with C Design on CSR programmes?',
      a: 'Yes. We co-create high-impact social, educational, and pediatric therapeutic art programmes that generate genuine social impact alongside verified brand goodwill.'
    }
  ]
};

const productionProcess = [
  { step: '01', title: 'DISCOVER', desc: 'Understanding your commercial goal, brand ethos, target audience, and emotional heartbeat.' },
  { step: '02', title: 'CONCEPT', desc: 'Developing bespoke scenography, scripts, visual treatments, and structural engineering blueprints.' },
  { step: '03', title: 'PRODUCE', desc: 'Deploying technical crews, cinema rigs, staging hardware, and multi-disciplinary talent.' },
  { step: '04', title: 'DELIVER', desc: 'Executing flawless live staging, 4K broadcast capture, and rapid content turnarounds.' },
  { step: '05', title: 'MOVE PEOPLE', desc: 'Measuring audience resonance, media impressions, and lasting cultural legacy.' }
];

export const ServiceDetailModal: React.FC<ServiceDetailModalProps> = ({
  service,
  onClose,
  onOpenInquiry,
}) => {
  if (!service) return null;

  const faqs = serviceFAQs[service.title] || serviceFAQs['EXPERIENCES'];
  const relevantProjects = projectsData.filter((p) => p.category.includes(service.title.split(' ')[0]) || p.isFeatured).slice(0, 2);

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-hidden flex items-end sm:items-center justify-center sm:p-6">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/85 backdrop-blur-md"
        />

        <motion.div
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 80, opacity: 0 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full sm:max-w-4xl h-[92vh] sm:h-auto sm:max-h-[90vh] bg-white rounded-t-2xl sm:rounded-card shadow-2xl z-10 overflow-hidden border border-neutral-200 flex flex-col pt-[env(safe-area-inset-top)] pb-[env(safe-area-inset-bottom)]"
        >
          {/* Header Bar */}
          <div className="px-5 sm:px-10 py-4 bg-brand-black text-white flex items-center justify-between border-b border-neutral-800 flex-shrink-0">
            <div className="flex items-center space-x-3">
              <span className="font-mono text-xs font-bold text-brand-red">{service.number}</span>
              <span className="font-mono text-xs uppercase tracking-widest text-neutral-300 font-bold">
                {service.title} · SERVICE SPECIFICATION
              </span>
            </div>

            <button
              onClick={onClose}
              className="p-2 text-neutral-400 hover:text-white min-h-[44px] min-w-[44px] flex items-center justify-center"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Scrollable Content */}
          <div className="p-5 sm:p-10 flex-1 overflow-y-auto space-y-10">
            {/* Hero Summary */}
            <div className="space-y-4">
              <span className="px-3 py-1 bg-brand-red/10 text-brand-red text-xs font-mono font-bold uppercase rounded-full">
                {service.accentText}
              </span>
              <h2 className="font-display-huge text-3xl sm:text-5xl font-black uppercase tracking-tight text-brand-black">
                {service.title}
              </h2>
              <p className="text-base sm:text-xl font-bold text-neutral-800 font-editorial-sub">
                {service.tagline}
              </p>
              <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed max-w-2xl">
                {service.description}
              </p>
            </div>

            {/* Core Capabilities */}
            <div className="space-y-4">
              <h3 className="font-display text-lg font-bold uppercase text-brand-black flex items-center space-x-2">
                <Sparkles className="w-4 h-4 text-brand-red" />
                <span>CORE DELIVERABLES & CAPABILITIES</span>
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {service.capabilities.map((cap, idx) => (
                  <div key={idx} className="p-3.5 bg-brand-light rounded border border-neutral-200 flex items-center space-x-3">
                    <Check className="w-4 h-4 text-brand-red flex-shrink-0" />
                    <span className="text-xs font-bold text-neutral-800 uppercase">{cap}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* 5-Step Process */}
            <div className="space-y-4 pt-4 border-t border-neutral-200">
              <h3 className="font-display text-lg font-bold uppercase text-brand-black flex items-center space-x-2">
                <Layers className="w-4 h-4 text-brand-red" />
                <span>HOW WE EXECUTE · 5-PHASE DISCIPLINE</span>
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-5 gap-3">
                {productionProcess.map((proc) => (
                  <div key={proc.step} className="p-3 bg-neutral-50 rounded border border-neutral-200 space-y-1">
                    <span className="font-mono text-xs text-brand-red font-bold">{proc.step}</span>
                    <h4 className="font-display text-xs font-bold uppercase text-brand-black">{proc.title}</h4>
                    <p className="text-[11px] text-neutral-600 leading-tight">{proc.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Relevant Projects Showcase */}
            {relevantProjects.length > 0 && (
              <div className="space-y-4 pt-4 border-t border-neutral-200">
                <h3 className="font-display text-lg font-bold uppercase text-brand-black flex items-center space-x-2">
                  <Sparkles className="w-4 h-4 text-brand-red" />
                  <span>SELECTED PROOF OF WORK</span>
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {relevantProjects.map((p) => (
                    <div key={p.id} className="p-3 bg-neutral-50 rounded border border-neutral-200 flex items-center space-x-3">
                      <img src={p.heroImage} alt={p.title} className="w-16 h-12 object-cover rounded" />
                      <div>
                        <span className="font-display text-xs font-bold uppercase block text-brand-black">{p.title}</span>
                        <span className="text-[10px] font-mono text-brand-red">{p.category} · {p.year}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* FAQs */}
            <div className="space-y-4 pt-4 border-t border-neutral-200">
              <h3 className="font-display text-lg font-bold uppercase text-brand-black flex items-center space-x-2">
                <HelpCircle className="w-4 h-4 text-brand-red" />
                <span>FREQUENTLY ASKED QUESTIONS</span>
              </h3>
              <div className="space-y-3">
                {faqs.map((faq, idx) => (
                  <div key={idx} className="p-4 bg-brand-light rounded border border-neutral-200 space-y-1.5">
                    <h4 className="text-xs sm:text-sm font-bold text-brand-black font-editorial-sub">
                      {faq.q}
                    </h4>
                    <p className="text-xs text-neutral-600 leading-relaxed">
                      {faq.a}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom Commission Bar */}
            <div className="p-6 bg-brand-black text-white rounded-card flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <span className="text-[10px] font-mono font-bold text-brand-red uppercase">COMMISSION SERVICE</span>
                <h4 className="font-display text-xl font-bold uppercase">READY TO PRODUCE {service.title}?</h4>
              </div>

              <button
                onClick={() => {
                  onClose();
                  onOpenInquiry(service.title);
                }}
                className="h-12 px-6 bg-brand-red text-white text-xs font-bold uppercase tracking-wider rounded flex items-center justify-center space-x-2 active:scale-95 transition-transform shadow-md"
              >
                <span>COMMISSION THIS SERVICE</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
