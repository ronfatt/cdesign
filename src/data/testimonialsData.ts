import type { TestimonialItem, PartnerLogo } from '../types';

export const testimonialsData: TestimonialItem[] = [
  {
    id: 'test-1',
    quote: 'C Design transformed our flagship convention into an emotional tour-de-force. Their ability to fuse world-class stage engineering with intimate cultural warmth is completely unmatched.',
    author: 'Dato’ Azman Iskandar',
    role: 'Managing Director',
    organization: 'Borneo Tourism & Cultural Arts Initiative',
    year: '2025',
    location: 'Kota Kinabalu, Sabah'
  },
  {
    id: 'test-2',
    quote: 'Working with C Design on our film production redefined what we thought was possible in Southeast Asia. From anamorphic aesthetics to sheer logistical grit in remote Borneo, they deliver at highest global standards.',
    author: 'Claire Vandeberg',
    role: 'Executive Producer',
    organization: 'Equator Horizon Films',
    year: '2025',
    location: 'Singapore & London'
  },
  {
    id: 'test-3',
    quote: 'What makes C Design rare is their heart. When they produce a project, they do not just stage lights and run cameras—they create a shared community legacy that lives on for years.',
    author: 'Marcus Lindqvist',
    role: 'Artistic Director',
    organization: 'Nordic Physical Theatre Federation',
    year: '2024',
    location: 'Stockholm, Sweden'
  }
];

export const partnerLogos: PartnerLogo[] = [
  { name: 'SABAH TOURISM BOARD', category: 'Cultural Patron' },
  { name: 'BORNEO CONVENTION HUB', category: 'Venue Partner' },
  { name: 'APEX ASIA SUMMIT', category: 'Corporate Client' },
  { name: 'GLOBAL ARTS ALLIANCE', category: 'International IP' },
  { name: 'EQUATOR HORIZON FILMS', category: 'Film Co-Production' },
  { name: 'BORNEO HOPE FOUNDATION', category: 'Humanitarian Partner' },
  { name: 'ISLAND WAVE RECORDS', category: 'Audio Production' },
  { name: 'TAWAU MUNICIPAL ARTS', category: 'Civic Partner' }
];
