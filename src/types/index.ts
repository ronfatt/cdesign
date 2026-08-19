export type ProjectCategory = 
  | 'EXPERIENCES' 
  | 'FILM & CONTENT' 
  | 'CREATIVE DIRECTION' 
  | 'CULTURE & TOURISM' 
  | 'IMPACT' 
  | 'ORIGINALS';

export interface Project {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  category: ProjectCategory;
  categoryLabel: string;
  year: string;
  location: string;
  client?: string;
  heroImage: string;
  galleryImages: string[];
  videoPreviewUrl?: string;
  videoFullUrl?: string;
  aspectRatio?: 'landscape' | 'portrait' | 'large' | 'wide';
  summary: string;
  narrative: string[];
  deliverables: string[];
  metrics?: { label: string; value: string }[];
  isFeatured?: boolean;
}

export interface ServiceItem {
  id: string;
  number: string;
  title: string;
  slug: string;
  tagline: string;
  description: string;
  capabilities: string[];
  bgImage: string;
  accentText: string;
}

export interface OriginalItem {
  id: string;
  number: string;
  title: string;
  tagline: string;
  category: string;
  year: string;
  status: 'Flagship IP' | 'In Production' | 'Annual Event' | 'Series';
  description: string;
  image: string;
  accentQuote: string;
}

export interface ImpactPillar {
  id: string;
  key: 'community' | 'education' | 'culture' | 'humanitarian' | 'tourism';
  title: string;
  tag: string;
  description: string;
  statNumber: string;
  statLabel: string;
  mainImage: string;
  secondaryImage: string;
  quote: string;
}

export interface BiccStoryPhase {
  step: number;
  number: string;
  phaseTitle: string;
  headline: string;
  body: string;
  image: string;
  secondaryImage?: string;
  pill: string;
  quote: string;
}

export interface TestimonialItem {
  id: string;
  quote: string;
  author: string;
  role: string;
  organization: string;
  year: string;
  location: string;
}

export interface PartnerLogo {
  name: string;
  category: string;
}

export interface CursorState {
  variant: 'default' | 'view' | 'play' | 'drag' | 'view_case' | 'link' | 'hidden';
  text?: string;
}

export interface InquiryFormState {
  projectType: string;
  details: string;
  budgetRange: string;
  timeline: string;
  contactName: string;
  contactEmail: string;
  contactCompany: string;
  contactPhone: string;
  additionalNotes: string;
}
