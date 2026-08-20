import type {
  CompanySettings,
  LeadSubmission,
  CMSProject,
  CMSEvent,
  CMSStory,
  MediaAsset,
  CMSPartner,
  CMSTestimonial,
  CMSUser,
} from '../types/crm';
import { projectsData } from './projectsData';

export const initialCompanySettings: CompanySettings = {
  companyName: 'CDesign Production',
  legalName: 'C Design Production Sdn. Bhd.',
  tagline: 'We Create Experiences That Move People. Born in Borneo. Creating Beyond Borders.',
  officialEmail: 'hello@cdesignproduction.com',
  phone: '+60 (89) 772-888',
  whatsappNumber: '60128188188',
  whatsappDisplay: '+60 12-818 8188',
  address: 'Tawau Waterfront Creative Quarter, 91000 Tawau',
  city: 'Tawau',
  state: 'Sabah',
  country: 'Malaysia',
  coordinates: "04°14'N · 117°53'E",
  businessHours: 'Monday – Friday: 09:00 – 18:00 (MYT)',
  googleMapsUrl: 'https://maps.google.com/?q=Tawau,Sabah,Malaysia',
  instagramUrl: 'https://instagram.com',
  facebookUrl: 'https://facebook.com',
  youtubeUrl: 'https://youtube.com',
  tiktokUrl: 'https://tiktok.com',
};

export const initialSeedUsers: CMSUser[] = [
  { id: 'USR-01', name: 'Ron Fatt', email: 'ron@cdesignproduction.com', role: 'ADMIN', lastActive: 'Active Now' },
  { id: 'USR-02', name: 'Donny (Creative Dir)', email: 'donny@cdesignproduction.com', role: 'EDITOR', lastActive: '2h ago' },
  { id: 'USR-03', name: 'Sarah (Sales & BD)', email: 'sarah@cdesignproduction.com', role: 'SALES', lastActive: '5h ago' },
];

export const initialSeedLeads: LeadSubmission[] = [
  {
    id: 'LEAD-2026-001',
    createdAt: '2026-08-18 14:32',
    projectType: 'EVENT & ARENA CONVENTION',
    specificType: 'International Convention / Festival',
    scaleMetric: '1000+ Attendees',
    location: 'Tawau & Kota Kinabalu, Sabah',
    timeline: '2026 (BICC Milestone)',
    budgetRange: 'RM 500,000 — RM 1,500,000',
    contactName: 'Datuk Marcus Lee',
    contactCompany: 'Sabah Tourism & Cultural Board',
    contactEmail: 'marcus.lee@sabahtourism.com',
    contactPhone: '+60 19-881 2233',
    preferredContact: 'WhatsApp',
    details: 'Looking for 360-degree event production for international delegate reception and main arena stage engineering.',
    status: 'QUALIFIED',
    urgency: '1 — 3 Months',
    leadSize: 'Enterprise / Arena',
    source: 'Organic Search',
    assignedTo: 'Ron Fatt',
    followUpDate: '2026-08-22',
    utmSource: 'google',
    utmCampaign: 'event_production_sabah',
    internalNotes: 'Executive meeting scheduled with founder for arena technical layout.'
  },
  {
    id: 'LEAD-2026-002',
    createdAt: '2026-08-19 09:15',
    projectType: 'FILM / CINEMA / MUSIC VIDEO',
    specificType: 'Documentary Cinema',
    scaleMetric: 'Long-form (30-45 min)',
    location: 'Semporna Archipelago',
    timeline: '1 — 3 Months',
    budgetRange: 'RM 150,000 — RM 500,000',
    contactName: 'Chloe Dupont',
    contactCompany: 'Blue Horizon Films (Paris)',
    contactEmail: 'c.dupont@bluehorizon.fr',
    contactPhone: '+33 6 42 89 01 12',
    preferredContact: 'Email',
    details: 'Underwater anamorphic cinematography crew and Bajau Laut indigenous cultural production fixers.',
    status: 'NEW',
    urgency: '1 — 3 Months',
    leadSize: 'Large',
    source: 'Instagram Reel',
    assignedTo: 'Donny (Creative Dir)',
    followUpDate: '2026-08-21',
    utmSource: 'instagram',
    utmCampaign: 'rainforest_echoes_bts',
    internalNotes: 'French crew requesting RED V-Raptor and drone permit coordination.'
  },
  {
    id: 'LEAD-2026-003',
    createdAt: '2026-08-19 11:40',
    projectType: 'BRAND CAMPAIGN & DIRECTION',
    specificType: 'Brand Campaign',
    campaignGoal: 'Brand Refresh & Commercial Expansion',
    location: 'Kuala Lumpur / Selangor',
    timeline: '3 — 6 Months',
    budgetRange: 'RM 50,000 — RM 150,000',
    contactName: 'Raymond Goh',
    contactCompany: 'Equator Retail Group',
    contactEmail: 'raymond.goh@equatorgroup.my',
    contactPhone: '+60 12-332 9901',
    preferredContact: 'WhatsApp',
    details: 'Full visual identity and national television/digital launch campaign for new regional lifestyle brand.',
    status: 'PROPOSAL SENT',
    urgency: '<30 Days',
    leadSize: 'Medium',
    source: 'Direct WhatsApp',
    assignedTo: 'Sarah (Sales & BD)',
    followUpDate: '2026-08-20',
    internalNotes: 'Proposal deck v1 sent on Aug 19. Waiting for board signoff.'
  }
];

export const initialSeedEvents: CMSEvent[] = [
  {
    id: 'EVT-2026-01',
    name: 'Borneo International Clown Convention 2026',
    shortDesc: 'Asia’s premier physical theatre, therapeutic arts and cultural festival in Tawau, Sabah.',
    startDate: '2026-09-12',
    endDate: '2026-09-17',
    location: 'Tawau, Sabah',
    venue: 'Tawau Waterfront Arena & Rainforest Pavilions',
    poster: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=800&auto=format&fit=crop',
    heroImage: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=1600&auto=format&fit=crop',
    registrationUrl: 'https://wa.me/60128188188?text=Register%20BICC%202026',
    status: 'UPCOMING',
    organizer: 'C Design Production',
    partners: ['Sabah Tourism Board', 'Ministry of Tourism, Arts & Culture', 'International Clown Federation'],
    highlights: ['25 Participating Nations', 'Pediatric Hospital Charity Tour', 'Live Arena Broadcast']
  },
  {
    id: 'EVT-2025-02',
    name: 'Borneo Rainforest Cinema Lab 2025',
    shortDesc: '3-day documentary cinematography masterclass and field expedition in Tawau Hills.',
    startDate: '2025-11-04',
    endDate: '2025-11-07',
    location: 'Tawau Hills National Park',
    venue: 'C Design Field Camp',
    poster: 'https://images.unsplash.com/photo-1485846234645-a62644f84728?q=80&w=800&auto=format&fit=crop',
    heroImage: 'https://images.unsplash.com/photo-1544717305-2782549b5136?q=80&w=1600&auto=format&fit=crop',
    status: 'COMPLETED',
    organizer: 'C Design Originals',
    partners: ['RED Cinema Asia', 'Sabah Parks'],
    highlights: ['48 Emerging Cinematographers', 'RED V-Raptor Workflow', 'Indigenous Soundscapes']
  }
];

export const initialSeedStories: CMSStory[] = [
  {
    id: 'STR-01',
    title: 'Behind the Scenes: Engineering Stadium Scenography for BICC 2026',
    slug: 'engineering-stadium-scenography-bicc-2026',
    excerpt: 'How our engineering and lighting team built an automated 180-DMX fixture arena in Tawau.',
    category: 'Behind the Scenes',
    author: 'Donny',
    date: '2026-08-15',
    heroImage: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=1200&auto=format&fit=crop',
    content: 'Building world-class arena scenography requires meticulous acoustic calibration and kinetic lighting rigs. In this deep dive, our technical directors walk through the blueprints for BICC 2026.',
    status: 'PUBLISHED',
    relatedProjectId: 'bicc-2026'
  },
  {
    id: 'STR-02',
    title: 'Capturing Underwater Anamorphic Cinema in Semporna',
    slug: 'capturing-underwater-anamorphic-cinema-semporna',
    excerpt: 'Field notes on diving with Bajau Laut freedivers using custom cinema underwater housings.',
    category: 'Production Insight',
    author: 'Ron Fatt',
    date: '2026-08-10',
    heroImage: 'https://images.unsplash.com/photo-1544717305-2782549b5136?q=80&w=1200&auto=format&fit=crop',
    content: 'The clarity of Celebes Sea waters presents unique optical opportunities and lighting challenges. We share our lens choices and respect protocols when filming indigenous communities.',
    status: 'PUBLISHED',
    relatedProjectId: 'semporna-ocean-doc'
  }
];

export const initialSeedMedia: MediaAsset[] = [
  {
    id: 'MED-01',
    title: 'BICC 2026 Main Arena Poster',
    url: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=1200&auto=format&fit=crop',
    type: 'image',
    dimensions: '1920 × 1080',
    fileSize: '1.4 MB',
    altText: 'BICC 2026 Arena Lighting Stage Staging in Tawau',
    project: 'bicc-2026',
    tags: ['Event', 'Stage', 'Arena', 'BICC'],
    usedIn: ['Homepage', 'BICC 2026 Case Study', 'Services/Experiences'],
    uploadDate: '2026-08-10'
  },
  {
    id: 'MED-02',
    title: 'Rainforest Echoes Cinema Frame',
    url: 'https://images.unsplash.com/photo-1485846234645-a62644f84728?q=80&w=1200&auto=format&fit=crop',
    type: 'image',
    dimensions: '2560 × 1440',
    fileSize: '2.1 MB',
    altText: 'Cinematographer operating RED cinema camera in Sabah rainforest',
    project: 'rainforest-echoes',
    tags: ['Film', 'Cinema', 'BTS'],
    usedIn: ['Homepage', 'Services/Film Production', 'Stories'],
    uploadDate: '2026-08-12'
  },
  {
    id: 'MED-03',
    title: 'CDesign Official Brand Logo Emblem',
    url: '/logo.png',
    type: 'logo',
    dimensions: '512 × 512',
    fileSize: '48 KB',
    altText: 'CDesign Production Circular Red Logo Emblem',
    project: 'global',
    tags: ['Brand', 'Logo', 'Emblem'],
    usedIn: ['Navbar', 'Footer', 'Admin', 'Favicon'],
    uploadDate: '2026-08-01'
  }
];

export const initialSeedPartners: CMSPartner[] = [
  { id: 'PTR-01', name: 'Sabah Tourism Board', logo: 'https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?q=80&w=200&auto=format&fit=crop', category: 'GOVERNMENT', website: 'https://sabahtourism.com', featured: true },
  { id: 'PTR-02', name: 'RED Digital Cinema', logo: 'https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?q=80&w=200&auto=format&fit=crop', category: 'PARTNER', website: 'https://red.com', featured: true },
  { id: 'PTR-03', name: 'Ministry of Tourism, Arts & Culture', logo: 'https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?q=80&w=200&auto=format&fit=crop', category: 'GOVERNMENT', featured: true },
];

export const initialSeedTestimonials: CMSTestimonial[] = [
  {
    id: 'TST-01',
    quote: 'C Design Production delivered stadium scenography and broadcast engineering that set an international standard for creative events in Borneo.',
    author: 'Dato Sri Haji Ismail',
    role: 'Director of Cultural Infrastructure',
    company: 'Sabah Tourism Board',
    featured: true
  },
  {
    id: 'TST-02',
    quote: 'From rainforest indigenous protocol to 4K underwater cinema, their production precision and speed are unparalleled in Southeast Asia.',
    author: 'Jean-Luc Moreau',
    role: 'Executive Producer',
    company: 'Cinéma Mondial Paris',
    featured: true
  }
];

// LocalStorage Keys
const LEADS_KEY = 'cdesign_leads_v6';
const PROJECTS_KEY = 'cdesign_projects_v6';
const EVENTS_KEY = 'cdesign_events_v6';
const STORIES_KEY = 'cdesign_stories_v6';
const MEDIA_KEY = 'cdesign_media_v6';
const PARTNERS_KEY = 'cdesign_partners_v6';
const TESTIMONIALS_KEY = 'cdesign_testimonials_v6';
const USERS_KEY = 'cdesign_users_v6';
const SETTINGS_KEY = 'cdesign_settings_v6';

// Projects Store
export function getStoredCMSProjects(): CMSProject[] {
  try {
    const data = localStorage.getItem(PROJECTS_KEY);
    if (!data) {
      const initial: CMSProject[] = projectsData.map((p) => ({
        id: p.id,
        title: p.title,
        subtitle: p.subtitle,
        slug: p.id,
        number: p.number,
        category: p.category,
        year: p.year,
        location: p.location,
        client: p.client,
        status: 'PUBLISHED',
        isFeatured: Boolean(p.isFeatured),
        heroImage: p.heroImage,
        summary: p.summary,
        narrative: p.narrative,
        deliverables: p.deliverables,
        metrics: p.metrics,
        galleryImages: p.galleryImages,
        credits: {
          creativeDirection: 'C Design Production',
          producer: 'Ron Fatt',
          director: 'Donny',
          client: p.client
        },
        seoTitle: `${p.title} | CDesign Production Case Study`,
        metaDescription: p.subtitle,
        ogImage: p.heroImage,
        views: Math.floor(Math.random() * 800) + 240,
        lastUpdated: '2026-08-19'
      }));
      localStorage.setItem(PROJECTS_KEY, JSON.stringify(initial));
      return initial;
    }
    return JSON.parse(data);
  } catch {
    return [];
  }
}

export function saveCMSProjects(projects: CMSProject[]) {
  try {
    localStorage.setItem(PROJECTS_KEY, JSON.stringify(projects));
  } catch (e) {
    console.error('Failed to save CMS projects', e);
  }
}

// Events Store
export function getStoredCMSEvents(): CMSEvent[] {
  try {
    const data = localStorage.getItem(EVENTS_KEY);
    if (!data) {
      localStorage.setItem(EVENTS_KEY, JSON.stringify(initialSeedEvents));
      return initialSeedEvents;
    }
    return JSON.parse(data);
  } catch {
    return initialSeedEvents;
  }
}

export function saveCMSEvents(events: CMSEvent[]) {
  try {
    localStorage.setItem(EVENTS_KEY, JSON.stringify(events));
  } catch (e) {
    console.error('Failed to save CMS events', e);
  }
}

// Stories Store
export function getStoredCMSStories(): CMSStory[] {
  try {
    const data = localStorage.getItem(STORIES_KEY);
    if (!data) {
      localStorage.setItem(STORIES_KEY, JSON.stringify(initialSeedStories));
      return initialSeedStories;
    }
    return JSON.parse(data);
  } catch {
    return initialSeedStories;
  }
}

export function saveCMSStories(stories: CMSStory[]) {
  try {
    localStorage.setItem(STORIES_KEY, JSON.stringify(stories));
  } catch (e) {
    console.error('Failed to save stories', e);
  }
}

// Media Store
export function getStoredMedia(): MediaAsset[] {
  try {
    const data = localStorage.getItem(MEDIA_KEY);
    if (!data) {
      localStorage.setItem(MEDIA_KEY, JSON.stringify(initialSeedMedia));
      return initialSeedMedia;
    }
    return JSON.parse(data);
  } catch {
    return initialSeedMedia;
  }
}

export function saveMedia(media: MediaAsset[]) {
  try {
    localStorage.setItem(MEDIA_KEY, JSON.stringify(media));
  } catch (e) {
    console.error('Failed to save media', e);
  }
}

// Partners Store
export function getStoredPartners(): CMSPartner[] {
  try {
    const data = localStorage.getItem(PARTNERS_KEY);
    if (!data) {
      localStorage.setItem(PARTNERS_KEY, JSON.stringify(initialSeedPartners));
      return initialSeedPartners;
    }
    return JSON.parse(data);
  } catch {
    return initialSeedPartners;
  }
}

export function savePartners(partners: CMSPartner[]) {
  try {
    localStorage.setItem(PARTNERS_KEY, JSON.stringify(partners));
  } catch (e) {
    console.error('Failed to save partners', e);
  }
}

// Testimonials Store
export function getStoredTestimonials(): CMSTestimonial[] {
  try {
    const data = localStorage.getItem(TESTIMONIALS_KEY);
    if (!data) {
      localStorage.setItem(TESTIMONIALS_KEY, JSON.stringify(initialSeedTestimonials));
      return initialSeedTestimonials;
    }
    return JSON.parse(data);
  } catch {
    return initialSeedTestimonials;
  }
}

export function saveTestimonials(testimonials: CMSTestimonial[]) {
  try {
    localStorage.setItem(TESTIMONIALS_KEY, JSON.stringify(testimonials));
  } catch (e) {
    console.error('Failed to save testimonials', e);
  }
}

// Users Store
export function getStoredUsers(): CMSUser[] {
  try {
    const data = localStorage.getItem(USERS_KEY);
    if (!data) {
      localStorage.setItem(USERS_KEY, JSON.stringify(initialSeedUsers));
      return initialSeedUsers;
    }
    return JSON.parse(data);
  } catch {
    return initialSeedUsers;
  }
}

export function saveUsers(users: CMSUser[]) {
  try {
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
  } catch (e) {
    console.error('Failed to save users', e);
  }
}

// Leads Store
export function getStoredLeads(): LeadSubmission[] {
  try {
    const data = localStorage.getItem(LEADS_KEY);
    if (!data) {
      localStorage.setItem(LEADS_KEY, JSON.stringify(initialSeedLeads));
      return initialSeedLeads;
    }
    return JSON.parse(data);
  } catch {
    return initialSeedLeads;
  }
}

export function saveLead(lead: LeadSubmission) {
  try {
    const existing = getStoredLeads();
    const updated = [lead, ...existing];
    localStorage.setItem(LEADS_KEY, JSON.stringify(updated));
    return updated;
  } catch (e) {
    console.error('Failed to save lead', e);
    return [];
  }
}

export function updateLeadStatus(id: string, status: LeadSubmission['status'], notes?: string, assignedTo?: string, followUpDate?: string) {
  try {
    const existing = getStoredLeads();
    const updated = existing.map((item) => {
      if (item.id === id) {
        return {
          ...item,
          status,
          internalNotes: notes !== undefined ? notes : item.internalNotes,
          assignedTo: assignedTo !== undefined ? assignedTo : item.assignedTo,
          followUpDate: followUpDate !== undefined ? followUpDate : item.followUpDate
        };
      }
      return item;
    });
    localStorage.setItem(LEADS_KEY, JSON.stringify(updated));
    return updated;
  } catch (e) {
    console.error('Failed to update lead', e);
    return [];
  }
}

// Global Settings Store
export function getStoredSettings(): CompanySettings {
  try {
    const data = localStorage.getItem(SETTINGS_KEY);
    if (!data) {
      localStorage.setItem(SETTINGS_KEY, JSON.stringify(initialCompanySettings));
      return initialCompanySettings;
    }
    return JSON.parse(data);
  } catch {
    return initialCompanySettings;
  }
}

export function saveSettings(settings: CompanySettings) {
  try {
    localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
  } catch (e) {
    console.error('Failed to save settings', e);
  }
}

// Full Database JSON Backup & Restore
export interface CMSDatabaseBackup {
  version: string;
  timestamp: string;
  companySettings: CompanySettings;
  projects: CMSProject[];
  events: CMSEvent[];
  stories: CMSStory[];
  media: MediaAsset[];
  leads: LeadSubmission[];
  partners: CMSPartner[];
  testimonials: CMSTestimonial[];
  users: CMSUser[];
}

export function exportFullDatabaseJSON(): string {
  const data: CMSDatabaseBackup = {
    version: '7.0',
    timestamp: new Date().toISOString(),
    companySettings: getStoredSettings(),
    projects: getStoredCMSProjects(),
    events: getStoredCMSEvents(),
    stories: getStoredCMSStories(),
    media: getStoredMedia(),
    leads: getStoredLeads(),
    partners: getStoredPartners(),
    testimonials: getStoredTestimonials(),
    users: getStoredUsers()
  };
  return JSON.stringify(data, null, 2);
}

export function importFullDatabaseJSON(jsonStr: string): boolean {
  try {
    const data: CMSDatabaseBackup = JSON.parse(jsonStr);
    if (!data.projects || !data.companySettings) {
      throw new Error('Invalid C Design CMS backup file format.');
    }
    if (data.projects) saveCMSProjects(data.projects);
    if (data.events) saveCMSEvents(data.events);
    if (data.stories) saveCMSStories(data.stories);
    if (data.media) saveMedia(data.media);
    if (data.leads) localStorage.setItem(LEADS_KEY, JSON.stringify(data.leads));
    if (data.partners) savePartners(data.partners);
    if (data.testimonials) saveTestimonials(data.testimonials);
    if (data.users) saveUsers(data.users);
    if (data.companySettings) saveSettings(data.companySettings);
    return true;
  } catch (e) {
    console.error('Failed to import database JSON', e);
    return false;
  }
}

