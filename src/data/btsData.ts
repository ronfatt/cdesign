export interface BTSItem {
  id: string;
  title: string;
  role: string;
  image: string;
  aspect: 'portrait' | 'landscape' | 'square';
  caption: string;
}

export const btsItems: BTSItem[] = [
  {
    id: 'bts-1',
    title: 'ON SET CINEMATOGRAPHY',
    role: 'Camera Crew & Gaffer Rigging',
    image: 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?q=80&w=1200&auto=format&fit=crop',
    aspect: 'portrait',
    caption: 'Mounting anamorphic lenses during the Semporna sunrise shoot.'
  },
  {
    id: 'bts-2',
    title: 'ARENA LIGHTING REHEARSAL',
    role: 'Scenography & Technical Direction',
    image: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?q=80&w=1200&auto=format&fit=crop',
    aspect: 'landscape',
    caption: 'Fine-tuning 180 automated DMX fixtures for the BICC opening ceremony.'
  },
  {
    id: 'bts-3',
    title: 'DIRECTOR’S MONITOR',
    role: 'Creative Direction & Storyboarding',
    image: 'https://images.unsplash.com/photo-1485846234645-a62644f84728?q=80&w=1200&auto=format&fit=crop',
    aspect: 'square',
    caption: 'Reviewing takes in real-time on set in the Tawau Hills rainforest.'
  },
  {
    id: 'bts-4',
    title: 'LIVE AUDIO MASTERY',
    role: 'Sound Engineering & Spatial Arrays',
    image: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?q=80&w=1200&auto=format&fit=crop',
    aspect: 'landscape',
    caption: 'Calibrating multi-channel line-array acoustic distribution.'
  },
  {
    id: 'bts-5',
    title: 'POST-PRODUCTION SUITE',
    role: 'Color Grading & VFX Compositing',
    image: 'https://images.unsplash.com/photo-1536240478700-b869070f9279?q=80&w=1200&auto=format&fit=crop',
    aspect: 'portrait',
    caption: 'Mastering the final 4K HDR master output in our Tawau studio.'
  }
];
