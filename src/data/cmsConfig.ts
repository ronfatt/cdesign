import type { CompanySettings, LeadSubmission } from '../types/crm';

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
    internalNotes: 'Proposal deck v1 sent on Aug 19. Waiting for board signoff.'
  }
];

const LEADS_STORAGE_KEY = 'cdesign_production_leads';
const SETTINGS_STORAGE_KEY = 'cdesign_production_settings';

export function getStoredLeads(): LeadSubmission[] {
  try {
    const data = localStorage.getItem(LEADS_STORAGE_KEY);
    if (!data) {
      localStorage.setItem(LEADS_STORAGE_KEY, JSON.stringify(initialSeedLeads));
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
    localStorage.setItem(LEADS_STORAGE_KEY, JSON.stringify(updated));
    return updated;
  } catch (e) {
    console.error('Failed to save lead', e);
    return [];
  }
}

export function updateLeadStatus(id: string, status: LeadSubmission['status'], notes?: string) {
  try {
    const existing = getStoredLeads();
    const updated = existing.map((item) => {
      if (item.id === id) {
        return {
          ...item,
          status,
          internalNotes: notes !== undefined ? notes : item.internalNotes
        };
      }
      return item;
    });
    localStorage.setItem(LEADS_STORAGE_KEY, JSON.stringify(updated));
    return updated;
  } catch (e) {
    console.error('Failed to update lead', e);
    return [];
  }
}

export function getStoredSettings(): CompanySettings {
  try {
    const data = localStorage.getItem(SETTINGS_STORAGE_KEY);
    if (!data) {
      localStorage.setItem(SETTINGS_STORAGE_KEY, JSON.stringify(initialCompanySettings));
      return initialCompanySettings;
    }
    return JSON.parse(data);
  } catch {
    return initialCompanySettings;
  }
}

export function saveSettings(settings: CompanySettings) {
  try {
    localStorage.setItem(SETTINGS_STORAGE_KEY, JSON.stringify(settings));
  } catch (e) {
    console.error('Failed to save settings', e);
  }
}
