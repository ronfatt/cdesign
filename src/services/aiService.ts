import type { CMSProject, LeadSubmission, MediaAsset } from '../types/crm';

export interface AIProjectDraft {
  title: string;
  subtitle: string;
  category: string;
  year: string;
  location: string;
  summary: string;
  narrative: string[];
  deliverables: string[];
  credits: {
    creativeDirection: string;
    producer: string;
    director: string;
    client?: string;
  };
  seoTitle: string;
  metaDescription: string;
  sourceTrace: { field: string; source: string }[];
}

export interface AILeadAnalysis {
  projectSummary: string;
  suggestedPriority: 'HIGH' | 'MEDIUM' | 'LOW';
  priorityReason: string;
  missingInformation: string[];
  suggestedFollowUpQuestions: string[];
  relevantServices: string[];
  similarProjects: string[];
  draftWhatsApp: string;
  draftEmail: string;
}

export interface AISocialRepurposing {
  facebookPost: string;
  instagramCaption: string;
  linkedInPost: string;
  tiktokCaption: string;
  reelsCaption: string;
  whatsAppBroadcast: string;
  contentSeries: { step: string; title: string; hook: string }[];
}

export interface AISEOSuggestion {
  seoTitle: string;
  metaDescription: string;
  searchIntent: string;
  suggestedKeywords: string[];
  internalLinks: { page: string; anchor: string }[];
  suggestedFAQs: { q: string; a: string }[];
}

export interface AICoverCandidate {
  imageIndex: number;
  imageUrl: string;
  reason: string;
  recommendedFor: 'Desktop Hero' | 'Mobile 4:5 Hero' | 'Social OG Card';
}

export const AIService = {
  // 1. Generate Project from Raw Brief / Event Notes
  analyzeProjectMaterial(rawText: string, fileName?: string): AIProjectDraft {
    const isBicc = /clown|bicc|convention|theatre/i.test(rawText);
    const isFilm = /film|video|cinema|documentary|camera/i.test(rawText);
    const isCampaign = /campaign|brand|launch|identity/i.test(rawText);

    let title = 'Landmark Creative Production';
    let category = 'EXPERIENCES';
    let location = 'Tawau, Sabah';
    let year = '2026';

    if (isBicc) {
      title = 'Borneo International Clown Convention 2026';
      category = 'ORIGINALS';
      location = 'Tawau & Kota Kinabalu, Sabah';
    } else if (isFilm) {
      title = 'Rainforest Echoes & Ocean Depths';
      category = 'FILM & CONTENT';
      location = 'Semporna Archipelago, Sabah';
    } else if (isCampaign) {
      title = 'Sabah Horizons Brand Campaign';
      category = 'CREATIVE DIRECTION';
      location = 'Kota Kinabalu & Kuala Lumpur';
    }

    return {
      title,
      subtitle: 'A high-impact creative convergence engineered from Borneo for the global stage.',
      category,
      year,
      location,
      summary: 'Commissioned to bridge indigenous cultural storytelling with modern stadium-scale scenography and international broadcast capture.',
      narrative: [
        'THE BRIEF: The client required a cohesive 360-degree experiential production that celebrated regional Borneo heritage while maintaining uncompromising cinematic fidelity.',
        'THE PRODUCTION: C Design deployed multi-cam 4K cinema broadcast units, 180 automated DMX kinetic fixtures, and customized spatial acoustic architecture.',
        'THE IMPACT: Attracted international delegates across 25 nations and generated over 3.4M verified digital impressions.'
      ],
      deliverables: [
        'Stage & Scenography Engineering',
        'Multi-Cam 4K Live Broadcast',
        'Documentary Film Archive',
        'VIP & Delegate Protocol Staging'
      ],
      credits: {
        creativeDirection: 'C Design Production',
        producer: 'Ron Fatt',
        director: 'Donny',
        client: isBicc ? 'International Physical Theatre Federation' : 'Sabah Tourism Board'
      },
      seoTitle: `${title} | C Design Production Case Study`,
      metaDescription: `Discover how C Design Production engineered ${title} in ${location}.`,
      sourceTrace: [
        { field: 'Event Title & Year', source: fileName || 'Uploaded Brief.pdf' },
        { field: 'Location & Scope', source: fileName || 'Schedule.docx' }
      ]
    };
  },

  // 2. Generate 5 Headline Styles
  generateTitleOptions(baseTitle: string): { type: string; title: string }[] {
    return [
      { type: 'DIRECT', title: baseTitle },
      { type: 'EDITORIAL', title: `The Making of ${baseTitle}: A Borneo Chronicle` },
      { type: 'CINEMATIC', title: `${baseTitle} — Beyond Borders & Soundscapes` },
      { type: 'EMOTIONAL', title: `Where Joy Meets High Art: ${baseTitle}` },
      { type: 'COMMERCIAL', title: `${baseTitle} · Arena Production & Broadcast Staging` }
    ];
  },

  // 3. Summarize Case Study into 50w, 100w, and Meta descriptions
  generateSummaries(project: CMSProject): {
    fiftyWords: string;
    hundredWords: string;
    portfolioCard: string;
    metaDescription: string;
  } {
    return {
      fiftyWords: `${project.title} represents a landmark production engineered by C Design in ${project.location}. Featuring stadium-scale scenography, 4K broadcast, and indigenous cultural fusion, the project engaged global audiences.`,
      hundredWords: `From Tawau to the international stage, ${project.title} exemplifies C Design Production’s signature approach: blending cinematic photography, kinetic arena lighting, and deep community roots. By deploying custom acoustic engineering and multi-cam broadcast rigs, our team delivered an unforgettable experiential milestone in ${project.location} that moved thousands of live and virtual attendees.`,
      portfolioCard: `${project.subtitle} Engineered in ${project.location}.`,
      metaDescription: `Explore ${project.title} (${project.year}) by C Design Production. Full documentary case study, stage engineering, and video archives.`
    };
  },

  // 4. AI Lead Summary, Priority & Follow-Up Generator
  analyzeLead(lead: LeadSubmission): AILeadAnalysis {
    const isLargeBudget = lead.budgetRange.includes('500,000') || lead.budgetRange.includes('150,000');
    const isImmediate = lead.timeline.includes('Immediate') || lead.timeline.includes('<30');

    let suggestedPriority: 'HIGH' | 'MEDIUM' | 'LOW' = 'MEDIUM';
    let priorityReason = 'Standard project scale with reasonable timeline.';

    if (isLargeBudget || isImmediate) {
      suggestedPriority = 'HIGH';
      priorityReason = 'High commercial investment range and immediate production timeline.';
    } else if (lead.budgetRange.includes('Under RM 15,000')) {
      suggestedPriority = 'LOW';
      priorityReason = 'Small production scope or initial discovery inquiry.';
    }

    const missingInformation: string[] = [];
    if (!lead.location || lead.location.includes('NOT CONFIRMED')) missingInformation.push('Venue / Confirmed City Location');
    if (!lead.details || lead.details.length < 20) missingInformation.push('Detailed Technical Scope / Artist Roster');
    if (!lead.contactCompany) missingInformation.push('Company / Entity Registration');

    const suggestedFollowUpQuestions = [
      'Do you already have a confirmed venue or site booking in Sabah?',
      'Will C Design handle full stage rigging, lighting and multi-cam broadcast?',
      'What is the estimated audience size or target broadcast viewership?',
      'Do you have an existing brand deck or creative reference moodboard?'
    ];

    const draftWhatsApp = `Hi ${lead.contactName}, thank you for reaching out to C Design Production regarding your ${lead.projectType} in ${lead.location}. Our executive director reviewed your brief (${lead.budgetRange}, timeline ${lead.timeline}) and we would love to schedule a 15-minute concept discovery call. What time works best for you this week?`;

    const draftEmail = `Dear ${lead.contactName},\n\nThank you for commissioning C Design Production for your upcoming ${lead.projectType}.\n\nWe have reviewed your project parameters:\n- Location: ${lead.location}\n- Timeline: ${lead.timeline}\n- Scope: ${lead.specificType || 'Full Creative Staging'}\n\nTo help us prepare our initial technical deck and crew allocation, could you confirm if you have finalized the venue?\n\nWarm regards,\nProduction Executive Office\nC Design Production Sdn. Bhd. · Tawau, Sabah`;

    return {
      projectSummary: `${lead.contactName} (${lead.contactCompany || 'Private Entity'}) requested a ${lead.projectType} in ${lead.location} with indicative budget ${lead.budgetRange}. Timeline is targeted for ${lead.timeline}.`,
      suggestedPriority,
      priorityReason,
      missingInformation,
      suggestedFollowUpQuestions,
      relevantServices: ['Event Production', 'Cinematic Film', 'Creative Direction', 'Cultural Staging'],
      similarProjects: ['BICC 2026 Arena Festival', 'Rainforest Echoes Cinema', 'Sabah Tourism Pavilion'],
      draftWhatsApp,
      draftEmail
    };
  },

  // 5. AI Social Repurposing Engine
  repurposeProjectSocial(project: CMSProject, _tone: string = 'CINEMATIC'): AISocialRepurposing {
    return {
      facebookPost: `【 BEHIND THE PRODUCTION: ${project.title.toUpperCase()} 】\n\nBorn in Borneo. Creating beyond borders. From the first acoustic blueprints to stadium-scale staging in ${project.location}, here is how C Design Production engineered ${project.title}.\n\n🎬 Explore the full documentary case study at cdesignproduction.com/projects/${project.slug}\n\n#CDesignProduction #BorneoCreatives #SabahProduction #LiveExperiences`,
      instagramCaption: `Moments that move people. 📽️✨\n\nA visual retrospective of ${project.title} (${project.year}). Engineered in ${project.location}.\n\nSwipe to witness the convergence of lighting, cinema, and cultural resonance.\n.\n.\n#CDesign #SabahCreatives #BICC2026 #EventProductionSabah #Cinematography #Borneo`,
      linkedInPost: `We are proud to share our latest case study: ${project.title}.\n\nExecuting stadium-scale events and documentary cinema in Borneo requires rigorous technical precision, indigenous community protocol, and agile broadcast engineering. C Design Production delivered full-scope staging in ${project.location} for global audiences.\n\nRead the full executive case breakdown: https://cdesignproduction.com/projects/${project.slug}`,
      tiktokCaption: `Setting up stadium lights in Borneo for ${project.title} 🔥 Watch the full transformation! #behindthescenes #productioncompany #sabah #eventlighting #fyp`,
      reelsCaption: `From blueprint to live arena ⚡ ${project.title} by C Design Production. #Borneo #ProductionLife #Cinema`,
      whatsAppBroadcast: `*C DESIGN PRODUCTION · CASE STUDY SPOTLIGHT*\n\nWe have just published our official production breakdown for *${project.title}* (${project.year}).\n\n📍 Location: ${project.location}\n⚡ Scope: ${project.deliverables.join(' · ')}\n\nView the high-res gallery and documentary frames:\nhttps://cdesignproduction.com/projects/${project.slug}`,
      contentSeries: [
        { step: 'POST 01', title: 'The Arrival & Blueprint', hook: 'How the initial concept was conceived in Tawau.' },
        { step: 'POST 02', title: 'Arena Staging & Lighting', hook: '180 automated fixtures and custom acoustic engineering.' },
        { step: 'POST 03', title: 'Cultural Heart & Community', hook: 'Collaborating with indigenous Sabah performers.' },
        { step: 'POST 04', title: 'The Global Broadcast Legacy', hook: 'Broadcasting Borneo creativity to 3.4M international viewers.' }
      ]
    };
  },

  // 6. AI SEO & Brand Health Assistant
  suggestSEO(project: CMSProject): AISEOSuggestion {
    return {
      seoTitle: `${project.title} | Event & Film Production Sabah`,
      metaDescription: `Discover how C Design Production produced ${project.title} in ${project.location}. Full case study, arena scenography, and cinematography.`,
      searchIntent: 'Commercial Event & Film Production Agency in Sabah',
      suggestedKeywords: [
        'Event Production Sabah',
        'Creative Agency Tawau',
        'Video Production Borneo',
        'Stage Engineering Malaysia',
        project.title
      ],
      internalLinks: [
        { page: '/services/event-production', anchor: 'Core Disciplines · Event Production' },
        { page: '/services/film-production', anchor: 'Cinematography & 4K Broadcast' },
        { page: '/contact', anchor: 'Commission a Similar Production' }
      ],
      suggestedFAQs: [
        {
          q: `What services were provided for ${project.title}?`,
          a: `C Design Production provided complete ${project.deliverables.join(', ')}.`
        },
        {
          q: `Can C Design replicate this scale of production in other locations?`,
          a: `Yes. We operate across Tawau, Kota Kinabalu, Peninsular Malaysia, and across Asia.`
        }
      ]
    };
  },

  // 7. AI Best Shot & Cover Suggester
  suggestCoverImages(images: string[], _projectTitle: string): AICoverCandidate[] {
    return [
      {
        imageIndex: 0,
        imageUrl: images[0] || 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=1200',
        reason: 'High visual dynamic range, clear arena lighting scale, and dramatic focal contrast.',
        recommendedFor: 'Desktop Hero'
      },
      {
        imageIndex: 1,
        imageUrl: images[1] || images[0] || 'https://images.unsplash.com/photo-1485846234645-a62644f84728?q=80&w=1200',
        reason: 'Centrally composed human emotional expression; translates cleanly to mobile 4:5 vertical crops.',
        recommendedFor: 'Mobile 4:5 Hero'
      },
      {
        imageIndex: images.length > 2 ? 2 : 0,
        imageUrl: images[images.length > 2 ? 2 : 0] || 'https://images.unsplash.com/photo-1544717305-2782549b5136?q=80&w=1200',
        reason: 'High-contrast landscape framing ideal for 1200×630 OpenGraph social link cards.',
        recommendedFor: 'Social OG Card'
      }
    ];
  },

  // 8. Auto Alt Text Generator
  generateAltText(asset: MediaAsset): string {
    if (asset.tags.includes('Event') || asset.tags.includes('Stage')) {
      return `Arena staging and automated DMX lighting engineered by C Design Production in Sabah.`;
    }
    if (asset.tags.includes('Film') || asset.tags.includes('Cinema')) {
      return `Cinema camera operator capturing anamorphic 4K footage on location in Sabah.`;
    }
    if (asset.tags.includes('Culture')) {
      return `Indigenous Borneo cultural performance and music ensemble in Tawau, Sabah.`;
    }
    return `C Design Production creative archive frame showcasing ${asset.title}.`;
  },

  // 9. Brand Voice Consistency Audit
  checkBrandConsistency(text: string): { warnings: string[]; passed: boolean } {
    const warnings: string[] = [];
    if (/fast-paced world|seamlessly blends|testament to|we are thrilled/i.test(text)) {
      warnings.push('Detected generic AI corporate filler words ("seamlessly blends", "fast-paced world"). Recommend concise, confident editorial language.');
    }
    if (/No\.1 in Malaysia|World's best|Largest in universe/i.test(text)) {
      warnings.push('Unverified claim detected ("No.1 / Best"). Recommend grounded proof statements.');
    }
    return {
      warnings,
      passed: warnings.length === 0
    };
  }
};
