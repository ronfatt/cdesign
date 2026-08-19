import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ArrowRight, ArrowLeft, Check, Send, MessageCircle } from 'lucide-react';
import confetti from 'canvas-confetti';
import { useCursor } from '../../context/CursorContext';
import type { InquiryFormState } from '../../types';

interface ProgressiveInquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialTopic?: string;
}

const creationOptions = [
  { label: 'EVENT & ARENA CONVENTION', category: 'Live Experiences & Staging', bg: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=800&auto=format&fit=crop' },
  { label: 'FILM / CINEMA / MUSIC VIDEO', category: 'Narrative & Commercial Cinema', bg: 'https://images.unsplash.com/photo-1485846234645-a62644f84728?q=80&w=800&auto=format&fit=crop' },
  { label: 'BRAND CAMPAIGN & DIRECTION', category: '360° Creative Systems', bg: 'https://images.unsplash.com/photo-1542744094-24638eff58bb?q=80&w=800&auto=format&fit=crop' },
  { label: 'CULTURAL TOURISM & PAVILION', category: 'Borneo Heritage & Space', bg: 'https://images.unsplash.com/photo-1544717305-2782549b5136?q=80&w=800&auto=format&fit=crop' },
  { label: 'ORIGINAL IP & BICC 2026', category: 'Flagship Festival Collaboration', bg: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=800&auto=format&fit=crop' },
  { label: 'HUMANITARIAN & COMMUNITY', category: 'Therapeutic Arts & Youth', bg: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=800&auto=format&fit=crop' },
  { label: 'SOMETHING BESPOKE', category: 'Uncharted Creative Territory', bg: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=800&auto=format&fit=crop' }
];

const budgetRanges = [
  'Under RM 50,000',
  'RM 50,000 — RM 150,000',
  'RM 150,000 — RM 500,000',
  'RM 500,000 — RM 1,500,000',
  'RM 1,500,000+ (Arena Scale)',
  'Undetermined / Discovery Phase'
];

const timelineOptions = [
  'Immediate (Within 30 Days)',
  '1 — 3 Months',
  '3 — 6 Months',
  '6 — 12 Months',
  '2026 (BICC Milestone)',
  'Flexible / Discovery Phase'
];

export const ProgressiveInquiryModal: React.FC<ProgressiveInquiryModalProps> = ({
  isOpen,
  onClose,
  initialTopic,
}) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [hoveredOptionBg, setHoveredOptionBg] = useState<string | null>(null);
  const { setCursorVariant, resetCursor } = useCursor();

  const [formData, setFormData] = useState<InquiryFormState>({
    projectType: initialTopic || 'EVENT & ARENA CONVENTION',
    details: '',
    budgetRange: 'RM 150,000 — RM 500,000',
    timeline: '3 — 6 Months',
    contactName: '',
    contactEmail: '',
    contactCompany: '',
    contactPhone: '',
    additionalNotes: '',
  });

  useEffect(() => {
    if (initialTopic) {
      setFormData((prev) => ({ ...prev, projectType: initialTopic }));
    }
  }, [initialTopic]);

  const handleNext = () => {
    if (currentStep < 5) {
      setCurrentStep((prev) => prev + 1);
    } else {
      setIsSubmitted(true);
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#F01616', '#111111', '#FFFFFF']
        });
      } catch (e) {
        // safe fallback
      }
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const handleReset = () => {
    setIsSubmitted(false);
    setCurrentStep(1);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-hidden flex items-end sm:items-center justify-center sm:p-6">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/85 backdrop-blur-md"
        />

        {/* Modal Window: Full Height/Sheet on Mobile & Centered on Desktop */}
        <motion.div
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 80, opacity: 0 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full sm:max-w-3xl h-[92vh] sm:h-auto sm:max-h-[90vh] bg-white rounded-t-2xl sm:rounded-card shadow-2xl z-10 overflow-hidden border border-neutral-200 flex flex-col pt-[env(safe-area-inset-top)] pb-[env(safe-area-inset-bottom)]"
        >
          {/* Header Bar */}
          <div className="px-5 sm:px-10 py-4 bg-brand-black text-white flex items-center justify-between border-b border-neutral-800 flex-shrink-0">
            <div className="flex items-center space-x-2.5">
              <div className="w-2.5 h-2.5 bg-brand-red rounded-full animate-pulse" />
              <span className="font-mono text-[11px] sm:text-xs uppercase tracking-widest text-neutral-300 font-bold">
                START A PROJECT · CONVERSATIONAL ENQUIRY
              </span>
            </div>

            <button
              onClick={onClose}
              onMouseEnter={() => setCursorVariant('link')}
              onMouseLeave={resetCursor}
              className="p-2 text-neutral-400 hover:text-white min-h-[44px] min-w-[44px] flex items-center justify-center transition-colors"
              aria-label="Close Enquiry Modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Progress Indicator Bar */}
          {!isSubmitted && (
            <div className="bg-neutral-100 px-5 sm:px-10 py-2.5 border-b border-neutral-200 flex items-center justify-between text-xs font-mono flex-shrink-0">
              <span className="font-bold text-brand-red">STEP 0{currentStep} / 05</span>
              <div className="flex items-center space-x-1.5">
                {[1, 2, 3, 4, 5].map((step) => (
                  <div
                    key={step}
                    className={`w-6 sm:w-8 h-1.5 rounded-full transition-all duration-300 ${
                      step <= currentStep ? 'bg-brand-red' : 'bg-neutral-300'
                    }`}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Scrollable Body Content */}
          <div className="p-5 sm:p-10 flex-1 flex flex-col justify-between overflow-y-auto relative">
            {/* Background Hover Preview on Step 1 (Desktop) */}
            {currentStep === 1 && hoveredOptionBg && (
              <div className="absolute inset-0 z-0 pointer-events-none opacity-5">
                <img src={hoveredOptionBg} alt="Option Background" className="w-full h-full object-cover" />
              </div>
            )}

            {isSubmitted ? (
              /* Success Screen */
              <div className="text-center py-6 sm:py-10 space-y-5 my-auto">
                <div className="w-14 h-14 sm:w-16 sm:h-16 bg-brand-red text-white rounded-full flex items-center justify-center mx-auto shadow-xl">
                  <Check className="w-7 h-7 sm:w-8 sm:h-8" />
                </div>
                
                <div className="space-y-1.5">
                  <h3 className="font-display text-2xl sm:text-4xl font-black uppercase tracking-tight text-brand-black">
                    ENQUIRY TRANSMITTED
                  </h3>
                  <p className="text-xs sm:text-sm text-neutral-600 max-w-md mx-auto">
                    Thank you, <span className="font-bold text-brand-black">{formData.contactName || 'Partner'}</span>. The C Design team in Tawau will review your brief and respond within 24 hours.
                  </p>
                </div>

                <div className="bg-brand-light p-3.5 rounded text-xs font-mono text-neutral-700 max-w-md mx-auto text-left space-y-1 border border-neutral-200">
                  <div><strong>PROJECT:</strong> {formData.projectType}</div>
                  <div><strong>TIMELINE:</strong> {formData.timeline}</div>
                  <div><strong>LOCATION:</strong> Tawau · Sabah HQ</div>
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
                  <a
                    href="https://wa.me/60128188188?text=Hello%20C%20Design%20Production%2C%20I%20just%20submitted%20a%20project%20enquiry%20on%20your%20website."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:w-auto h-12 px-6 bg-[#25D366] text-white text-xs font-bold uppercase tracking-wider rounded flex items-center justify-center space-x-2 active:scale-95 transition-transform shadow-md"
                  >
                    <MessageCircle className="w-4 h-4 fill-current" />
                    <span>DIRECT WHATSAPP CONFIRMATION</span>
                  </a>

                  <button
                    onClick={handleReset}
                    className="w-full sm:w-auto h-12 px-6 bg-brand-black text-white text-xs font-bold uppercase tracking-wider rounded hover:bg-brand-red active:scale-95 transition-colors"
                  >
                    RETURN TO WEBSITE
                  </button>
                </div>
              </div>
            ) : (
              /* Conversational Steps */
              <AnimatePresence mode="wait">
                {/* STEP 1: WHAT ARE WE MAKING? */}
                {currentStep === 1 && (
                  <motion.div
                    key="step1"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-4 sm:space-y-6 relative z-10"
                  >
                    <div className="space-y-1">
                      <span className="text-xs font-mono text-brand-red font-bold uppercase">01 / VISION</span>
                      <h3 className="font-display text-2xl sm:text-4xl font-black uppercase tracking-tight text-brand-black">
                        SO, WHAT ARE WE MAKING?
                      </h3>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-2.5">
                      {creationOptions.map((opt) => {
                        const isSelected = formData.projectType === opt.label;
                        return (
                          <button
                            key={opt.label}
                            onClick={() => setFormData({ ...formData, projectType: opt.label })}
                            onMouseEnter={() => {
                              setHoveredOptionBg(opt.bg);
                              setCursorVariant('link');
                            }}
                            onMouseLeave={() => {
                              setHoveredOptionBg(null);
                              resetCursor();
                            }}
                            className={`p-3.5 sm:p-4 text-left rounded border transition-all duration-200 flex flex-col justify-between active:scale-[0.98] min-h-[58px] ${
                              isSelected
                                ? 'bg-brand-black text-white border-brand-red shadow-md'
                                : 'bg-neutral-50 text-neutral-800 border-neutral-200 hover:border-neutral-400'
                            }`}
                          >
                            <span className="font-display text-xs sm:text-sm font-bold uppercase tracking-tight">
                              {opt.label}
                            </span>
                            <span className={`text-[10px] font-mono mt-0.5 ${isSelected ? 'text-brand-red' : 'text-neutral-500'}`}>
                              {opt.category}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </motion.div>
                )}

                {/* STEP 2: TELL US MORE */}
                {currentStep === 2 && (
                  <motion.div
                    key="step2"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-4 sm:space-y-6 relative z-10"
                  >
                    <div className="space-y-1">
                      <span className="text-xs font-mono text-brand-red font-bold uppercase">02 / CONCEPT</span>
                      <h3 className="font-display text-2xl sm:text-4xl font-black uppercase tracking-tight text-brand-black">
                        TELL US A LITTLE MORE.
                      </h3>
                      <p className="text-xs text-neutral-500">
                        Describe the location, desired aesthetic, target audience, or scale of the production.
                      </p>
                    </div>

                    <textarea
                      rows={4}
                      value={formData.details}
                      onChange={(e) => setFormData({ ...formData, details: e.target.value })}
                      placeholder="e.g. We are producing an international festival in Borneo and require staging engineering, multi-cam broadcast, and documentary capture..."
                      className="w-full p-3.5 text-base sm:text-sm bg-neutral-50 border border-neutral-300 rounded focus:border-brand-red focus:bg-white outline-none font-sans"
                    />
                  </motion.div>
                )}

                {/* STEP 3: WHEN SHOULD IT HAPPEN? */}
                {currentStep === 3 && (
                  <motion.div
                    key="step3"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-4 sm:space-y-6 relative z-10"
                  >
                    <div className="space-y-1">
                      <span className="text-xs font-mono text-brand-red font-bold uppercase">03 / TIMELINE</span>
                      <h3 className="font-display text-2xl sm:text-4xl font-black uppercase tracking-tight text-brand-black">
                        WHEN SHOULD IT HAPPEN?
                      </h3>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      {timelineOptions.map((time) => (
                        <button
                          key={time}
                          onClick={() => setFormData({ ...formData, timeline: time })}
                          className={`p-3.5 sm:p-4 text-left text-xs font-bold uppercase rounded border transition-all active:scale-[0.98] min-h-[48px] ${
                            formData.timeline === time
                              ? 'bg-brand-black text-white border-brand-red shadow-sm'
                              : 'bg-neutral-50 text-neutral-700 border-neutral-200 hover:border-neutral-400'
                          }`}
                        >
                          {time}
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}

                {/* STEP 4: BUDGET RANGE */}
                {currentStep === 4 && (
                  <motion.div
                    key="step4"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-4 sm:space-y-6 relative z-10"
                  >
                    <div className="space-y-1">
                      <span className="text-xs font-mono text-brand-red font-bold uppercase">04 / INVESTMENT</span>
                      <h3 className="font-display text-2xl sm:text-4xl font-black uppercase tracking-tight text-brand-black">
                        WHAT RANGE ARE WE WORKING WITH?
                      </h3>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      {budgetRanges.map((range) => (
                        <button
                          key={range}
                          onClick={() => setFormData({ ...formData, budgetRange: range })}
                          className={`p-3.5 sm:p-4 text-left text-xs font-bold uppercase rounded border transition-all active:scale-[0.98] min-h-[48px] ${
                            formData.budgetRange === range
                              ? 'bg-brand-black text-white border-brand-red shadow-sm'
                              : 'bg-neutral-50 text-neutral-700 border-neutral-200 hover:border-neutral-400'
                          }`}
                        >
                          {range}
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}

                {/* STEP 5: HOW CAN WE REACH YOU? */}
                {currentStep === 5 && (
                  <motion.div
                    key="step5"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-3 sm:space-y-4 relative z-10"
                  >
                    <div className="space-y-1">
                      <span className="text-xs font-mono text-brand-red font-bold uppercase">05 / DIRECT ACCESS</span>
                      <h3 className="font-display text-2xl sm:text-4xl font-black uppercase tracking-tight text-brand-black">
                        HOW CAN WE REACH YOU?
                      </h3>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                      <div>
                        <label className="text-[11px] font-mono font-bold uppercase text-neutral-600 block mb-1">
                          YOUR NAME *
                        </label>
                        <input
                          type="text"
                          required
                          value={formData.contactName}
                          onChange={(e) => setFormData({ ...formData, contactName: e.target.value })}
                          placeholder="e.g. Alex Tan"
                          className="w-full p-3 text-base sm:text-xs bg-neutral-50 border border-neutral-300 rounded focus:border-brand-red focus:bg-white outline-none min-h-[48px]"
                        />
                      </div>

                      <div>
                        <label className="text-[11px] font-mono font-bold uppercase text-neutral-600 block mb-1">
                          EMAIL ADDRESS *
                        </label>
                        <input
                          type="email"
                          required
                          value={formData.contactEmail}
                          onChange={(e) => setFormData({ ...formData, contactEmail: e.target.value })}
                          placeholder="alex@company.com"
                          className="w-full p-3 text-base sm:text-xs bg-neutral-50 border border-neutral-300 rounded focus:border-brand-red focus:bg-white outline-none min-h-[48px]"
                        />
                      </div>

                      <div>
                        <label className="text-[11px] font-mono font-bold uppercase text-neutral-600 block mb-1">
                          COMPANY / ENTITY
                        </label>
                        <input
                          type="text"
                          value={formData.contactCompany}
                          onChange={(e) => setFormData({ ...formData, contactCompany: e.target.value })}
                          placeholder="Organization or Studio"
                          className="w-full p-3 text-base sm:text-xs bg-neutral-50 border border-neutral-300 rounded focus:border-brand-red focus:bg-white outline-none min-h-[48px]"
                        />
                      </div>

                      <div>
                        <label className="text-[11px] font-mono font-bold uppercase text-neutral-600 block mb-1">
                          PHONE / WHATSAPP
                        </label>
                        <input
                          type="tel"
                          value={formData.contactPhone}
                          onChange={(e) => setFormData({ ...formData, contactPhone: e.target.value })}
                          placeholder="+60 12-345 6789"
                          className="w-full p-3 text-base sm:text-xs bg-neutral-50 border border-neutral-300 rounded focus:border-brand-red focus:bg-white outline-none min-h-[48px]"
                        />
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            )}

            {/* Bottom Actions */}
            {!isSubmitted && (
              <div className="flex items-center justify-between pt-4 sm:pt-6 border-t border-neutral-200 mt-4 relative z-10">
                {currentStep > 1 ? (
                  <button
                    onClick={handleBack}
                    className="flex items-center space-x-1.5 text-xs font-bold uppercase text-neutral-600 hover:text-brand-black p-2 min-h-[44px]"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    <span>BACK</span>
                  </button>
                ) : <div />}

                <button
                  onClick={handleNext}
                  className="h-12 px-6 bg-brand-red text-white text-xs font-bold uppercase tracking-wider rounded flex items-center space-x-2 active:scale-95 transition-transform shadow-md"
                >
                  <span>{currentStep === 5 ? 'SEND INQUIRY' : 'CONTINUE'}</span>
                  {currentStep === 5 ? <Send className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
                </button>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
