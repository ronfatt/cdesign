import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ArrowRight, ArrowLeft, Check, Send, MessageCircle, Edit3, MapPin, Calendar, DollarSign } from 'lucide-react';
import confetti from 'canvas-confetti';
import { useCursor } from '../../context/CursorContext';
import { saveLead } from '../../data/cmsConfig';
import type { LeadSubmission, LeadSize, LeadUrgency } from '../../types/crm';

interface ProgressiveInquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialTopic?: string;
  initialLocation?: string;
}

const creationCategories = [
  { id: 'EVENT', label: 'EVENT / EXPERIENCE', category: 'Stadium Festivals, Conferences & Galas', bg: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=800&auto=format&fit=crop' },
  { id: 'FILM', label: 'FILM / VIDEO', category: 'Commercials, Cinema & Documentaries', bg: 'https://images.unsplash.com/photo-1485846234645-a62644f84728?q=80&w=800&auto=format&fit=crop' },
  { id: 'CAMPAIGN', label: 'CAMPAIGN / CREATIVE', category: '360° Brand Strategy & Creative Direction', bg: 'https://images.unsplash.com/photo-1542744094-24638eff58bb?q=80&w=800&auto=format&fit=crop' },
  { id: 'CULTURE', label: 'CULTURAL PROJECT', category: 'Borneo Heritage, Tourism & Pavilions', bg: 'https://images.unsplash.com/photo-1544717305-2782549b5136?q=80&w=800&auto=format&fit=crop' },
  { id: 'COMMUNITY', label: 'COMMUNITY / CSR PROJECT', category: 'Therapeutic Arts & Youth Programmes', bg: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=800&auto=format&fit=crop' },
  { id: 'PARTNERSHIP', label: 'SPONSORSHIP / PARTNERSHIP', category: 'BICC 2026 & Original IP Collaborations', bg: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=800&auto=format&fit=crop' },
  { id: 'OTHER', label: 'OTHER BESPOKE ENQUIRY', category: 'Uncharted Creative Territory', bg: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=800&auto=format&fit=crop' },
];

const eventTypes = [
  'Corporate Event / Conference',
  'International Convention',
  'Festival & Concert',
  'Brand Launch',
  'Gala Dinner / Award Night',
  'Community / Cultural Gathering',
  'Other Event Format'
];

const attendanceOptions = ['Under 100', '100 — 300', '300 — 500', '500 — 1,000', '1,000+ (Arena Scale)', 'Not Sure Yet'];

const filmTypes = [
  'Commercial / TVC',
  'Corporate Film',
  'Music Video',
  'Event Highlight Reel',
  'Documentary Cinema',
  'Social Media Content Series',
  'AI / Hybrid Virtual Production',
  'Other Video Format'
];

const durationOptions = ['15 — 30 sec', '30 — 60 sec', '1 — 3 min', '3 — 5 min', 'Long-form / Documentary', 'Not Sure Yet'];

const campaignTypes = [
  'Brand Launch Campaign',
  'Visual Identity & Creative Direction',
  'Social Media Campaign',
  'Content & Digital Narrative',
  'Tourism Campaign',
  'Other Creative Direction'
];

const businessGoals = [
  'Brand Awareness & Prestige',
  'Ticket / Product Sales',
  'National / International Launch',
  'Event Promotion',
  'Brand Refresh',
  'Community Engagement'
];

const locationOptions = [
  'TAWAU, SABAH',
  'SEMPORNA ARCHIPELAGO',
  'KOTA KINABALU / OTHER SABAH',
  'KUALA LUMPUR / SELANGOR',
  'OTHER MALAYSIA',
  'INTERNATIONAL',
  'NOT CONFIRMED YET'
];

const timelineOptions = [
  'Immediate (< 30 Days)',
  '1 — 3 Months',
  '3 — 6 Months',
  '6 — 12 Months',
  '2026 (BICC Milestone)',
  'Flexible / Discovery Phase'
];

const budgetRanges = [
  'Under RM 15,000',
  'RM 15,000 — RM 50,000',
  'RM 50,000 — RM 150,000',
  'RM 150,000 — RM 500,000',
  'RM 500,000+ (Arena / Major)',
  'Undetermined / Discovery Phase'
];

export const ProgressiveInquiryModal: React.FC<ProgressiveInquiryModalProps> = ({
  isOpen,
  onClose,
  initialTopic,
  initialLocation,
}) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [isReviewing, setIsReviewing] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submittedLead, setSubmittedLead] = useState<LeadSubmission | null>(null);
  const { setCursorVariant, resetCursor } = useCursor();

  const [formData, setFormData] = useState({
    category: 'EVENT',
    projectType: initialTopic || 'EVENT / EXPERIENCE',
    specificType: 'Corporate Event / Conference',
    scaleMetric: '300 — 500',
    campaignGoal: 'Brand Awareness & Prestige',
    location: initialLocation || 'TAWAU, SABAH',
    customLocation: '',
    timeline: '3 — 6 Months',
    budgetRange: 'RM 50,000 — RM 150,000',
    contactName: '',
    contactCompany: '',
    contactEmail: '',
    contactPhone: '',
    preferredContact: 'WhatsApp' as 'WhatsApp' | 'Phone' | 'Email',
    details: '',
    referenceFileUrl: '',
  });

  useEffect(() => {
    if (initialTopic) {
      const match = creationCategories.find((c) => c.label.includes(initialTopic) || initialTopic.includes(c.id));
      if (match) {
        setFormData((prev) => ({
          ...prev,
          category: match.id,
          projectType: match.label,
        }));
      }
    }
    if (initialLocation) {
      setFormData((prev) => ({ ...prev, location: initialLocation }));
    }
  }, [initialTopic, initialLocation]);

  const handleNext = () => {
    if (currentStep < 5) {
      setCurrentStep((prev) => prev + 1);
    } else {
      setIsReviewing(true);
    }
  };

  const handleBack = () => {
    if (isReviewing) {
      setIsReviewing(false);
    } else if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const handleFinalSubmit = () => {
    // Determine internal qualification
    let leadSize: LeadSize = 'Medium';
    if (formData.budgetRange.includes('500,000+') || formData.scaleMetric.includes('1,000+')) {
      leadSize = 'Enterprise / Arena';
    } else if (formData.budgetRange.includes('150,000 — RM 500,000')) {
      leadSize = 'Large';
    } else if (formData.budgetRange.includes('Under RM 15,000')) {
      leadSize = 'Small';
    }

    let urgency: LeadUrgency = '1 — 3 Months';
    if (formData.timeline.includes('Immediate')) urgency = 'Immediate';
    else if (formData.timeline.includes('1 — 3')) urgency = '1 — 3 Months';
    else if (formData.timeline.includes('3 — 6')) urgency = '3+ Months';
    else if (formData.timeline.includes('Flexible')) urgency = 'Discovery / Flexible';

    const newLead: LeadSubmission = {
      id: `LEAD-${Date.now().toString().slice(-6)}`,
      createdAt: new Date().toISOString().replace('T', ' ').slice(0, 16),
      projectType: formData.projectType,
      specificType: formData.specificType,
      scaleMetric: formData.scaleMetric,
      campaignGoal: formData.campaignGoal,
      location: formData.customLocation ? `${formData.location} (${formData.customLocation})` : formData.location,
      timeline: formData.timeline,
      budgetRange: formData.budgetRange,
      contactName: formData.contactName,
      contactCompany: formData.contactCompany,
      contactEmail: formData.contactEmail,
      contactPhone: formData.contactPhone,
      preferredContact: formData.preferredContact,
      details: formData.details,
      referenceFileUrl: formData.referenceFileUrl,
      status: 'NEW',
      urgency,
      leadSize,
      source: 'Direct Web Funnel',
      utmSource: new URLSearchParams(window.location.search).get('utm_source') || undefined,
      utmCampaign: new URLSearchParams(window.location.search).get('utm_campaign') || undefined,
    };

    saveLead(newLead);
    setSubmittedLead(newLead);
    setIsReviewing(false);
    setIsSubmitted(true);

    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#F01616', '#111111', '#FFFFFF']
      });
    } catch {
      // fallback
    }
  };

  const handleReset = () => {
    setIsSubmitted(false);
    setIsReviewing(false);
    setCurrentStep(1);
    onClose();
  };

  if (!isOpen) return null;

  // Dynamic WhatsApp prefilled URL
  const whatsappText = encodeURIComponent(
    `Hi C Design Production, I am ${formData.contactName || 'a client'}${formData.contactCompany ? ` from ${formData.contactCompany}` : ''}. I submitted an enquiry for a ${formData.projectType} (${formData.specificType}) in ${formData.location}, budget ${formData.budgetRange}. Looking forward to discussing!`
  );
  const whatsappUrl = `https://wa.me/60128188188?text=${whatsappText}`;

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
                START A PROJECT · ADAPTIVE LEAD FUNNEL
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
              <span className="font-bold text-brand-red">
                {isReviewing ? 'REVIEW & TRANSMIT' : `STEP 0${currentStep} / 05`}
              </span>
              <div className="flex items-center space-x-1.5">
                {[1, 2, 3, 4, 5].map((step) => (
                  <div
                    key={step}
                    className={`w-6 sm:w-8 h-1.5 rounded-full transition-all duration-300 ${
                      isReviewing || step <= currentStep ? 'bg-brand-red' : 'bg-neutral-300'
                    }`}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Scrollable Body Content */}
          <div className="p-5 sm:p-10 flex-1 flex flex-col justify-between overflow-y-auto relative">
            {isSubmitted ? (
              /* Success Screen */
              <div className="text-center py-6 sm:py-10 space-y-5 my-auto">
                <div className="w-14 h-14 sm:w-16 sm:h-16 bg-brand-red text-white rounded-full flex items-center justify-center mx-auto shadow-xl">
                  <Check className="w-7 h-7 sm:w-8 sm:h-8" />
                </div>
                
                <div className="space-y-1.5">
                  <span className="text-xs font-mono text-brand-red font-bold uppercase tracking-widest">
                    REFERENCE: {submittedLead?.id}
                  </span>
                  <h3 className="font-display text-2xl sm:text-4xl font-black uppercase tracking-tight text-brand-black">
                    ENQUIRY TRANSMITTED
                  </h3>
                  <p className="text-xs sm:text-sm text-neutral-600 max-w-md mx-auto">
                    Thank you, <span className="font-bold text-brand-black">{formData.contactName || 'Partner'}</span>. Our production director in Tawau will review your vision and reply within 24 hours.
                  </p>
                </div>

                <div className="bg-brand-light p-4 rounded text-xs font-mono text-neutral-700 max-w-md mx-auto text-left space-y-1.5 border border-neutral-200">
                  <div><strong>PROJECT:</strong> {formData.projectType} · {formData.specificType}</div>
                  <div><strong>LOCATION:</strong> {formData.location}</div>
                  <div><strong>TIMELINE:</strong> {formData.timeline}</div>
                  <div><strong>BUDGET:</strong> {formData.budgetRange}</div>
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
                  <a
                    href={whatsappUrl}
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
            ) : isReviewing ? (
              /* Review & Confirmation Card */
              <div className="space-y-5">
                <div className="space-y-1 border-b border-neutral-200 pb-3">
                  <span className="text-xs font-mono text-brand-red font-bold uppercase">FINAL REVIEW</span>
                  <h3 className="font-display text-2xl sm:text-3xl font-black uppercase tracking-tight text-brand-black">
                    CONFIRM YOUR BRIEF
                  </h3>
                  <p className="text-xs text-neutral-500">
                    Review your parameters before sending directly to the C Design executive team.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div className="p-3.5 bg-neutral-50 rounded border border-neutral-200 flex items-start justify-between">
                    <div>
                      <span className="font-mono text-neutral-400 uppercase text-[10px] block">DISCIPLINE & SCOPE</span>
                      <strong className="text-brand-black text-sm block mt-0.5">{formData.projectType}</strong>
                      <span className="text-neutral-600 block">{formData.specificType} ({formData.scaleMetric})</span>
                    </div>
                    <button onClick={() => { setIsReviewing(false); setCurrentStep(1); }} className="text-brand-red p-1"><Edit3 className="w-3.5 h-3.5" /></button>
                  </div>

                  <div className="p-3.5 bg-neutral-50 rounded border border-neutral-200 flex items-start justify-between">
                    <div>
                      <span className="font-mono text-neutral-400 uppercase text-[10px] block">LOCATION & TIMELINE</span>
                      <strong className="text-brand-black text-sm block mt-0.5">{formData.location}</strong>
                      <span className="text-neutral-600 block">{formData.timeline}</span>
                    </div>
                    <button onClick={() => { setIsReviewing(false); setCurrentStep(3); }} className="text-brand-red p-1"><Edit3 className="w-3.5 h-3.5" /></button>
                  </div>

                  <div className="p-3.5 bg-neutral-50 rounded border border-neutral-200 flex items-start justify-between">
                    <div>
                      <span className="font-mono text-neutral-400 uppercase text-[10px] block">BUDGET RANGE</span>
                      <strong className="text-brand-black text-sm block mt-0.5">{formData.budgetRange}</strong>
                    </div>
                    <button onClick={() => { setIsReviewing(false); setCurrentStep(4); }} className="text-brand-red p-1"><Edit3 className="w-3.5 h-3.5" /></button>
                  </div>

                  <div className="p-3.5 bg-neutral-50 rounded border border-neutral-200 flex items-start justify-between">
                    <div>
                      <span className="font-mono text-neutral-400 uppercase text-[10px] block">PRIMARY CONTACT</span>
                      <strong className="text-brand-black text-sm block mt-0.5">{formData.contactName} ({formData.contactCompany || 'Private'})</strong>
                      <span className="text-neutral-600 block">{formData.contactPhone} · {formData.contactEmail}</span>
                    </div>
                    <button onClick={() => { setIsReviewing(false); setCurrentStep(5); }} className="text-brand-red p-1"><Edit3 className="w-3.5 h-3.5" /></button>
                  </div>
                </div>

                {formData.details && (
                  <div className="p-3.5 bg-neutral-50 rounded border border-neutral-200 text-xs">
                    <span className="font-mono text-neutral-400 uppercase text-[10px] block mb-1">PROJECT DETAILS / GOALS</span>
                    <p className="text-neutral-700 italic">"{formData.details}"</p>
                  </div>
                )}
              </div>
            ) : (
              /* Staged Adaptive Conversational Steps */
              <AnimatePresence mode="wait">
                {/* STEP 1: PRIMARY CREATION DISCIPLINE */}
                {currentStep === 1 && (
                  <motion.div
                    key="step1"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-4 sm:space-y-5 relative z-10"
                  >
                    <div className="space-y-1">
                      <span className="text-xs font-mono text-brand-red font-bold uppercase">01 / DISCIPLINE</span>
                      <h3 className="font-display text-2xl sm:text-4xl font-black uppercase tracking-tight text-brand-black">
                        WHAT ARE WE CREATING?
                      </h3>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-2.5">
                      {creationCategories.map((opt) => {
                        const isSelected = formData.category === opt.id;
                        return (
                          <button
                            key={opt.id}
                            onClick={() => setFormData({
                              ...formData,
                              category: opt.id,
                              projectType: opt.label,
                              specificType: opt.id === 'EVENT' ? eventTypes[0] : opt.id === 'FILM' ? filmTypes[0] : campaignTypes[0]
                            })}
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

                {/* STEP 2: DYNAMIC ADAPTIVE QUESTIONS BASED ON STEP 1 */}
                {currentStep === 2 && (
                  <motion.div
                    key="step2"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-5 relative z-10"
                  >
                    <div className="space-y-1">
                      <span className="text-xs font-mono text-brand-red font-bold uppercase">02 / SCOPE & SCALE</span>
                      <h3 className="font-display text-2xl sm:text-4xl font-black uppercase tracking-tight text-brand-black">
                        {formData.category === 'EVENT' ? 'EVENT FORMAT & ATTENDANCE' :
                         formData.category === 'FILM' ? 'PRODUCTION TYPE & DURATION' :
                         formData.category === 'CAMPAIGN' ? 'CAMPAIGN SCOPE & OBJECTIVES' :
                         'PROJECT PARAMETERS'}
                      </h3>
                    </div>

                    {/* Format Selector */}
                    <div className="space-y-2">
                      <label className="text-[11px] font-mono font-bold uppercase text-neutral-600 block">
                        SELECT EXACT TYPE *
                      </label>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {(formData.category === 'EVENT' ? eventTypes :
                          formData.category === 'FILM' ? filmTypes :
                          campaignTypes).map((item) => (
                          <button
                            key={item}
                            onClick={() => setFormData({ ...formData, specificType: item })}
                            className={`p-3 text-left text-xs font-bold uppercase rounded border transition-all ${
                              formData.specificType === item
                                ? 'bg-brand-black text-white border-brand-red shadow-sm'
                                : 'bg-neutral-50 text-neutral-700 border-neutral-200 hover:border-neutral-400'
                            }`}
                          >
                            {item}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Metric Scale */}
                    <div className="space-y-2 pt-2">
                      <label className="text-[11px] font-mono font-bold uppercase text-neutral-600 block">
                        {formData.category === 'EVENT' ? 'EXPECTED ATTENDANCE' :
                         formData.category === 'FILM' ? 'TARGET DURATION' :
                         'PRIMARY BUSINESS OBJECTIVE'}
                      </label>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                        {(formData.category === 'EVENT' ? attendanceOptions :
                          formData.category === 'FILM' ? durationOptions :
                          businessGoals).map((metric) => (
                          <button
                            key={metric}
                            onClick={() => setFormData({
                              ...formData,
                              scaleMetric: metric,
                              campaignGoal: metric
                            })}
                            className={`p-2.5 text-center text-xs font-bold uppercase rounded border transition-all ${
                              formData.scaleMetric === metric
                                ? 'bg-brand-red text-white border-brand-red shadow-sm'
                                : 'bg-neutral-50 text-neutral-700 border-neutral-200 hover:border-neutral-400'
                            }`}
                          >
                            {metric}
                          </button>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* STEP 3: LOCATION & TIMELINE */}
                {currentStep === 3 && (
                  <motion.div
                    key="step3"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-5 relative z-10"
                  >
                    <div className="space-y-1">
                      <span className="text-xs font-mono text-brand-red font-bold uppercase">03 / GEOGRAPHY & TIMELINE</span>
                      <h3 className="font-display text-2xl sm:text-4xl font-black uppercase tracking-tight text-brand-black">
                        WHERE & WHEN SHOULD IT HAPPEN?
                      </h3>
                    </div>

                    <div className="space-y-2">
                      <label className="text-[11px] font-mono font-bold uppercase text-neutral-600 flex items-center space-x-1.5">
                        <MapPin className="w-3.5 h-3.5 text-brand-red" />
                        <span>PROJECT LOCATION</span>
                      </label>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {locationOptions.map((loc) => (
                          <button
                            key={loc}
                            onClick={() => setFormData({ ...formData, location: loc })}
                            className={`p-3 text-left text-xs font-bold uppercase rounded border transition-all ${
                              formData.location === loc
                                ? 'bg-brand-black text-white border-brand-red shadow-sm'
                                : 'bg-neutral-50 text-neutral-700 border-neutral-200 hover:border-neutral-400'
                            }`}
                          >
                            {loc}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-2 pt-2">
                      <label className="text-[11px] font-mono font-bold uppercase text-neutral-600 flex items-center space-x-1.5">
                        <Calendar className="w-3.5 h-3.5 text-brand-red" />
                        <span>ESTIMATED TIMELINE</span>
                      </label>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                        {timelineOptions.map((time) => (
                          <button
                            key={time}
                            onClick={() => setFormData({ ...formData, timeline: time })}
                            className={`p-2.5 text-center text-xs font-bold uppercase rounded border transition-all ${
                              formData.timeline === time
                                ? 'bg-brand-red text-white border-brand-red shadow-sm'
                                : 'bg-neutral-50 text-neutral-700 border-neutral-200 hover:border-neutral-400'
                            }`}
                          >
                            {time}
                          </button>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* STEP 4: BUDGET RANGE & SCOPE */}
                {currentStep === 4 && (
                  <motion.div
                    key="step4"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-5 relative z-10"
                  >
                    <div className="space-y-1">
                      <span className="text-xs font-mono text-brand-red font-bold uppercase">04 / INVESTMENT</span>
                      <h3 className="font-display text-2xl sm:text-4xl font-black uppercase tracking-tight text-brand-black">
                        WHAT RANGE ARE WE WORKING WITH?
                      </h3>
                      <p className="text-xs text-neutral-500">
                        Indicative commercial range to help us structure the technical setup and crew deployment.
                      </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      {budgetRanges.map((range) => (
                        <button
                          key={range}
                          onClick={() => setFormData({ ...formData, budgetRange: range })}
                          className={`p-3.5 text-left text-xs font-bold uppercase rounded border transition-all flex items-center justify-between ${
                            formData.budgetRange === range
                              ? 'bg-brand-black text-white border-brand-red shadow-sm'
                              : 'bg-neutral-50 text-neutral-700 border-neutral-200 hover:border-neutral-400'
                          }`}
                        >
                          <span>{range}</span>
                          <DollarSign className={`w-4 h-4 ${formData.budgetRange === range ? 'text-brand-red' : 'text-neutral-400'}`} />
                        </button>
                      ))}
                    </div>

                    {/* Brief textarea */}
                    <div className="space-y-1.5 pt-2">
                      <label className="text-[11px] font-mono font-bold uppercase text-neutral-600 block">
                        BRIEF OVERVIEW / KEY DELIVERABLES
                      </label>
                      <textarea
                        rows={3}
                        value={formData.details}
                        onChange={(e) => setFormData({ ...formData, details: e.target.value })}
                        placeholder="Tell us about the desired vibe, specific artist requests, stage dimensions, or commercial goals..."
                        className="w-full p-3 text-xs bg-neutral-50 border border-neutral-300 rounded focus:border-brand-red focus:bg-white outline-none"
                      />
                    </div>
                  </motion.div>
                )}

                {/* STEP 5: DIRECT CLIENT CONTACT & PREFERRED CHANNEL */}
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
                      <h3 className="font-display text-2xl sm:text-4xl font-black uppercase tracking-tight text-brand-black">
                        HOW CAN WE REACH YOU?
                      </h3>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="text-[11px] font-mono font-bold uppercase text-neutral-600 block mb-1">
                          YOUR NAME *
                        </label>
                        <input
                          type="text"
                          required
                          value={formData.contactName}
                          onChange={(e) => setFormData({ ...formData, contactName: e.target.value })}
                          placeholder="e.g. Datuk / Alex Tan"
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
                          ORGANISATION / BRAND
                        </label>
                        <input
                          type="text"
                          value={formData.contactCompany}
                          onChange={(e) => setFormData({ ...formData, contactCompany: e.target.value })}
                          placeholder="Company, Ministry or Studio"
                          className="w-full p-3 text-base sm:text-xs bg-neutral-50 border border-neutral-300 rounded focus:border-brand-red focus:bg-white outline-none min-h-[48px]"
                        />
                      </div>

                      <div>
                        <label className="text-[11px] font-mono font-bold uppercase text-neutral-600 block mb-1">
                          PHONE / WHATSAPP *
                        </label>
                        <input
                          type="tel"
                          required
                          value={formData.contactPhone}
                          onChange={(e) => setFormData({ ...formData, contactPhone: e.target.value })}
                          placeholder="+60 12-345 6789"
                          className="w-full p-3 text-base sm:text-xs bg-neutral-50 border border-neutral-300 rounded focus:border-brand-red focus:bg-white outline-none min-h-[48px]"
                        />
                      </div>
                    </div>

                    {/* Preferred Contact Channel */}
                    <div className="pt-2">
                      <label className="text-[11px] font-mono font-bold uppercase text-neutral-600 block mb-1.5">
                        PREFERRED RESPONSE CHANNEL
                      </label>
                      <div className="grid grid-cols-3 gap-2">
                        {(['WhatsApp', 'Phone', 'Email'] as const).map((channel) => (
                          <button
                            key={channel}
                            type="button"
                            onClick={() => setFormData({ ...formData, preferredContact: channel })}
                            className={`p-2.5 text-center text-xs font-bold uppercase rounded border transition-all ${
                              formData.preferredContact === channel
                                ? 'bg-brand-black text-white border-brand-red shadow-sm'
                                : 'bg-neutral-50 text-neutral-700 border-neutral-200 hover:border-neutral-400'
                            }`}
                          >
                            {channel}
                          </button>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            )}

            {/* Bottom Actions */}
            {!isSubmitted && (
              <div className="flex items-center justify-between pt-4 sm:pt-6 border-t border-neutral-200 mt-4 relative z-10">
                <button
                  onClick={handleBack}
                  className={`flex items-center space-x-1.5 text-xs font-bold uppercase text-neutral-600 hover:text-brand-black p-2 min-h-[44px] ${
                    currentStep === 1 && !isReviewing ? 'opacity-0 pointer-events-none' : ''
                  }`}
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>BACK</span>
                </button>

                {isReviewing ? (
                  <button
                    onClick={handleFinalSubmit}
                    className="h-12 px-8 bg-brand-red text-white text-xs font-bold uppercase tracking-wider rounded flex items-center space-x-2 active:scale-95 transition-transform shadow-lg"
                  >
                    <span>SUBMIT BRIEF</span>
                    <Send className="w-4 h-4" />
                  </button>
                ) : (
                  <button
                    onClick={handleNext}
                    className="h-12 px-6 bg-brand-red text-white text-xs font-bold uppercase tracking-wider rounded flex items-center space-x-2 active:scale-95 transition-transform shadow-md"
                  >
                    <span>{currentStep === 5 ? 'REVIEW SUMMARY' : 'CONTINUE'}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                )}
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
