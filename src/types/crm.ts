export type LeadStatus = 'NEW' | 'CONTACTED' | 'QUALIFIED' | 'PROPOSAL SENT' | 'WON' | 'LOST' | 'ARCHIVED';

export type LeadUrgency = 'Immediate' | '<30 Days' | '1 — 3 Months' | '3+ Months' | 'Discovery / Flexible';

export type LeadSize = 'Small' | 'Medium' | 'Large' | 'Enterprise / Arena';

export interface LeadSubmission {
  id: string;
  createdAt: string;
  projectType: string;
  specificType?: string;
  scaleMetric?: string; // Attendance or Duration
  campaignGoal?: string;
  location: string;
  timeline: string;
  budgetRange: string;
  contactName: string;
  contactCompany?: string;
  contactEmail: string;
  contactPhone: string;
  preferredContact: 'WhatsApp' | 'Phone' | 'Email';
  details: string;
  referenceFileUrl?: string;
  status: LeadStatus;
  urgency: LeadUrgency;
  leadSize: LeadSize;
  source: string;
  utmSource?: string;
  utmCampaign?: string;
  internalNotes?: string;
}

export interface CompanySettings {
  companyName: string;
  legalName: string;
  tagline: string;
  officialEmail: string;
  phone: string;
  whatsappNumber: string;
  whatsappDisplay: string;
  address: string;
  city: string;
  state: string;
  country: string;
  coordinates: string;
  businessHours: string;
  googleMapsUrl: string;
  instagramUrl: string;
  facebookUrl: string;
  youtubeUrl: string;
  tiktokUrl: string;
}
