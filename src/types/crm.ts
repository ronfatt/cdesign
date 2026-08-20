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
  assignedTo?: string;
  followUpDate?: string;
  utmSource?: string;
  utmCampaign?: string;
  internalNotes?: string;
}

export type ContentStatus = 'DRAFT' | 'REVIEW' | 'PUBLISHED' | 'ARCHIVED';

export interface CMSProject {
  id: string;
  title: string;
  subtitle: string;
  slug: string;
  number: string;
  category: string;
  year: string;
  location: string;
  client?: string;
  status: ContentStatus;
  isFeatured: boolean;
  heroImage: string;
  heroVideo?: string;
  summary: string;
  narrative: string[];
  deliverables: string[];
  metrics?: { label: string; value: string }[];
  galleryImages: string[];
  credits?: {
    director?: string;
    producer?: string;
    creativeDirection?: string;
    photography?: string;
    videography?: string;
    client?: string;
  };
  seoTitle?: string;
  metaDescription?: string;
  ogImage?: string;
  views?: number;
  lastUpdated?: string;
}

export type EventStatus = 'UPCOMING' | 'ONGOING' | 'COMPLETED';

export interface CMSEvent {
  id: string;
  name: string;
  shortDesc: string;
  startDate: string;
  endDate: string;
  location: string;
  venue: string;
  poster: string;
  heroImage: string;
  highlightVideoUrl?: string;
  galleryImages?: string[];
  recapSummary?: string;
  attendees?: string;
  registrationUrl?: string;
  status: EventStatus;
  organizer: string;
  partners: string[];
  highlights?: string[];
}

export interface CMSStory {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  category: 'Behind the Scenes' | 'Production Insight' | 'Culture' | 'Event Recap' | 'Company News';
  author: string;
  date: string;
  heroImage: string;
  content: string;
  status: ContentStatus;
  relatedProjectId?: string;
}

export interface MediaAsset {
  id: string;
  title: string;
  url: string;
  type: 'image' | 'video' | 'document' | 'logo';
  dimensions?: string;
  fileSize: string;
  altText: string;
  project?: string;
  tags: string[];
  usedIn: string[];
  uploadDate: string;
}

export interface CMSPartner {
  id: string;
  name: string;
  logo: string;
  category: 'CLIENT' | 'PARTNER' | 'SPONSOR' | 'GOVERNMENT' | 'MEDIA';
  website?: string;
  featured: boolean;
}

export interface CMSTestimonial {
  id: string;
  quote: string;
  author: string;
  role: string;
  company: string;
  photo?: string;
  featured: boolean;
}

export interface CMSUser {
  id: string;
  name: string;
  email: string;
  role: 'ADMIN' | 'EDITOR' | 'SALES';
  avatar?: string;
  lastActive: string;
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
