import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ArrowRight, ArrowLeft, Check, Send } from 'lucide-react';
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
  'Undetermined / IP Collaboration'
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
      <div className="fixed inset-0 z-50 overflow-hidden flex items-center justify-center p-4 sm:p-6">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/85 backdrop-blur-md"
        />

        {/* Modal Window with Expanding White Canvas Feel */}
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-3xl bg-white rounded-card shadow-2xl z-10 overflow-hidden border border-neutral-200 flex flex-col min-h-[580px]"
        >
          {/* Header Bar */}
          <div className="px-6 sm:px-10 py-5 bg-brand-black text-white flex items-center justify-between border-b border-neutral-800">
            <div className="flex items-center space-x-3">
              <div className="w-2.5 h-2.5 bg-brand-red rounded-full animate-pulse" />
              <span className="font-mono text-xs uppercase tracking-widest text-neutral-300 font-bold">
                START A PROJECT · CONVERSATIONAL ENQUIRY
              </span>
            </div>

            <button
              onClick={onClose}
              onMouseEnter={() => setCursorVariant('link')}
              onMouseLeave={resetCursor}
              className="p-1 text-neutral-400 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Progress Indicator Bar */}
          {!isSubmitted && (
            <div className="bg-neutral-100 px-6 sm:px-10 py-3 border-b border-neutral-200 flex items-center justify-between text-xs font-mono">
              <span className="font-bold text-brand-red">STEP 0{currentStep} — 05</span>
              <div className="flex items-center space-x-2">
                {[1, 2, 3, 4, 5].map((step) => (
                  <div
                    key={step}
                    className={`w-7 h-1.5 rounded-full transition-all duration-300 ${
                      step <= currentStep ? 'bg-brand-red' : 'bg-neutral-300'
                    }`}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Body Content */}
          <div className="p-6 sm:p-10 flex-1 flex flex-col justify-between relative overflow-hidden">
            {/* Background Hover Preview on Step 1 */}
            {currentStep === 1 && hoveredOptionBg && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.08 }}
                className="absolute inset-0 z-0 pointer-events-none"
              >
                <img src={hoveredOptionBg} alt="Option Background" className="w-full h-full object-cover" />
              </motion.div>
            )}

            {isSubmitted ? (
              /* Success State */
              <div className="text-center py-10 space-y-6">
                <div className="w-16 h-16 bg-brand-red text-white rounded-full flex items-center justify-center mx-auto shadow-xl">
                  <Check className="w-8 h-8" />
                </div>
                <div className="space-y-2">
                  <h3 className="font-display text-3xl sm:text-4xl font-black uppercase tracking-tight text-brand-black">
                    ENQUIRY TRANSMITTED
                  </h3>
                  <p className="text-sm text-neutral-600 max-w-md mx-auto">
                    Thank you, <span className="font-bold text-brand-black">{formData.contactName || 'Partner'}</span>. The C Design executive team in Tawau will review your vision and respond within 24 hours.
                  </p>
                </div>
                <div className="bg-brand-light p-4 rounded text-xs font-mono text-neutral-600 max-w-md mx-auto text-left space-y-1.5 border border-neutral-200">
                  <div><strong>PROJECT:</strong> {formData.projectType}</div>
                  <div><strong>TIMELINE:</strong> {formData.timeline}</div>
                  <div><strong>LOCATION:</strong> Tawau · Sabah HQ</div>
                </div>
                <button
                  onClick={handleReset}
                  className="px-8 py-3.5 bg-brand-black text-white text-xs font-bold uppercase tracking-wider rounded-subtle hover:bg-brand-red transition-colors"
                >
                  RETURN TO WEBSITE
                </button>
              </div>
            ) : (
              /* Staged Conversational Flow */
              <AnimatePresence mode="wait">
                {/* STEP 1: WHAT ARE WE MAKING? */}
                {currentStep === 1 && (
                  <motion.div
                    key="step1"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-6 relative z-10"
                  >
                    <div className="space-y-1">
                      <span className="text-xs font-mono text-brand-red font-bold uppercase">01 / VISION</span>
                      <h3 className="font-display-huge text-3xl sm:text-4xl font-black uppercase tracking-tight text-brand-black">
                        SO, WHAT ARE WE MAKING?
                      </h3>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
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
                            className={`p-4 text-left rounded border transition-all duration-200 flex flex-col justify-between ${
                              isSelected
                                ? 'bg-brand-black text-white border-brand-red shadow-md scale-[1.01]'
                                : 'bg-neutral-50 text-neutral-800 border-neutral-200 hover:border-neutral-400'
                            }`}
                          >
                            <span className="font-display text-sm font-bold uppercase tracking-tight">
                              {opt.label}
                            </span>
                            <span className={`text-[10px] font-mono mt-1 ${isSelected ? 'text-brand-red' : 'text-neutral-500'}`}>
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
                    className="space-y-6 relative z-10"
                  >
                    <div className="space-y-1">
                      <span className="text-xs font-mono text-brand-red font-bold uppercase">02 / CONCEPT</span>
                      <h3 className="font-display-huge text-3xl sm:text-4xl font-black uppercase tracking-tight text-brand-black">
                        TELL US A LITTLE MORE.
                      </h3>
                      <p className="text-xs text-neutral-500">
                        Describe the location, desired aesthetic, target audience, or scale of the production.
                      </p>
                    </div>

                    <textarea
                      rows={5}
                      value={formData.details}
                      onChange={(e) => setFormData({ ...formData, details: e.target.value })}
                      placeholder="e.g. We are producing an international festival in Borneo and require staging engineering, multi-cam broadcast, and documentary capture..."
                      className="w-full p-4 text-xs sm:text-sm bg-neutral-50 border border-neutral-300 rounded focus:border-brand-red focus:bg-white outline-none font-sans"
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
                    className="space-y-6 relative z-10"
                  >
                    <div className="space-y-1">
                      <span className="text-xs font-mono text-brand-red font-bold uppercase">03 / TIMELINE</span>
                      <h3 className="font-display-huge text-3xl sm:text-4xl font-black uppercase tracking-tight text-brand-black">
                        WHEN SHOULD IT HAPPEN?
                      </h3>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {timelineOptions.map((time) => (
                        <button
                          key={time}
                          onClick={() => setFormData({ ...formData, timeline: time })}
                          className={`p-4 text-left text-xs font-bold uppercase rounded border transition-all ${
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
                    className="space-y-6 relative z-10"
                  >
                    <div className="space-y-1">
                      <span className="text-xs font-mono text-brand-red font-bold uppercase">04 / INVESTMENT</span>
                      <h3 className="font-display-huge text-3xl sm:text-4xl font-black uppercase tracking-tight text-brand-black">
                        WHAT RANGE ARE WE WORKING WITH?
                      </h3>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {budgetRanges.map((range) => (
                        <button
                          key={range}
                          onClick={() => setFormData({ ...formData, budgetRange: range })}
                          className={`p-4 text-left text-xs font-bold uppercase rounded border transition-all ${
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
                    className="space-y-4 relative z-10"
                  >
                    <div className="space-y-1">
                      <span className="text-xs font-mono text-brand-red font-bold uppercase">05 / DIRECT ACCESS</span>
                      <h3 className="font-display-huge text-3xl sm:text-4xl font-black uppercase tracking-tight text-brand-black">
                        HOW CAN WE REACH YOU?
                      </h3>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
                          className="w-full p-3 text-xs bg-neutral-50 border border-neutral-300 rounded focus:border-brand-red focus:bg-white outline-none"
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
                          className="w-full p-3 text-xs bg-neutral-50 border border-neutral-300 rounded focus:border-brand-red focus:bg-white outline-none"
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
                          className="w-full p-3 text-xs bg-neutral-50 border border-neutral-300 rounded focus:border-brand-red focus:bg-white outline-none"
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
                          className="w-full p-3 text-xs bg-neutral-50 border border-neutral-300 rounded focus:border-brand-red focus:bg-white outline-none"
                        />
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            )}

            {/* Bottom Step Actions */}
            {!isSubmitted && (
              <div className="flex items-center justify-between pt-6 border-t border-neutral-200 mt-6 relative z-10">
                {currentStep > 1 ? (
                  <button
                    onClick={handleBack}
                    className="flex items-center space-x-2 text-xs font-bold uppercase text-neutral-600 hover:text-brand-black"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    <span>BACK</span>
                  </button>
                ) : <div />}

                <button
                  onClick={handleNext}
                  className="flex items-center space-x-2 px-6 py-3 bg-brand-red text-white text-xs font-bold uppercase tracking-wider rounded hover:bg-brand-black transition-colors shadow-md"
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
