import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  LayoutDashboard,
  FolderKanban,
  Calendar,
  BookOpen,
  Users,
  Image as ImageIcon,
  MessageSquare,
  Search,
  Plus,
  Edit3,
  Copy,
  Trash2,
  Download,
  Check,
  Phone,
  Mail,
  MessageCircle,
  Settings,
  Share2,
  Sparkles,
  UploadCloud,
} from 'lucide-react';
import {
  getStoredCMSProjects,
  saveCMSProjects,
  getStoredCMSEvents,
  saveCMSEvents,
  getStoredCMSStories,
  getStoredMedia,
  getStoredLeads,
  updateLeadStatus,
  getStoredUsers,
  getStoredSettings,
  saveSettings,
} from '../../data/cmsConfig';
import type {
  CMSProject,
  CMSEvent,
  CMSStory,
  MediaAsset,
  LeadSubmission,
  LeadStatus,
  CMSUser,
  CompanySettings,
  ContentStatus,
} from '../../types/crm';

interface AdminDashboardProps {
  isOpen: boolean;
  onClose: () => void;
}

type AdminTab =
  | 'overview'
  | 'projects'
  | 'events'
  | 'stories'
  | 'media'
  | 'leads'
  | 'seo'
  | 'settings'
  | 'users';

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<AdminTab>('overview');

  // Stores State
  const [projects, setProjects] = useState<CMSProject[]>([]);
  const [events, setEvents] = useState<CMSEvent[]>([]);
  const [stories, setStories] = useState<CMSStory[]>([]);
  const [media, setMedia] = useState<MediaAsset[]>([]);
  const [leads, setLeads] = useState<LeadSubmission[]>([]);
  const [users, setUsers] = useState<CMSUser[]>([]);
  const [settings, setSettings] = useState<CompanySettings>(getStoredSettings());

  // Search & Filter State
  const [searchQuery, setSearchQuery] = useState('');
  const [leadStatusFilter, setLeadStatusFilter] = useState('ALL');
  const [projectStatusFilter, setProjectStatusFilter] = useState('ALL');
  const [mediaCategoryFilter, setMediaCategoryFilter] = useState('ALL');

  // Active Modals & Editors
  const [selectedLead, setSelectedLead] = useState<LeadSubmission | null>(null);
  const [leadNotes, setLeadNotes] = useState('');
  const [editingProject, setEditingProject] = useState<CMSProject | null>(null);
  const [projectStep, setProjectStep] = useState(1);
  const [editingEvent, setEditingEvent] = useState<CMSEvent | null>(null);
  const [viewingMedia, setViewingMedia] = useState<MediaAsset | null>(null);
  const [notification, setNotification] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen) {
      setProjects(getStoredCMSProjects());
      setEvents(getStoredCMSEvents());
      setStories(getStoredCMSStories());
      setMedia(getStoredMedia());
      const loadedLeads = getStoredLeads();
      setLeads(loadedLeads);
      if (loadedLeads.length > 0) {
        setSelectedLead(loadedLeads[0]);
        setLeadNotes(loadedLeads[0].internalNotes || '');
      }
      setUsers(getStoredUsers());
      setSettings(getStoredSettings());
    }
  }, [isOpen]);

  const notify = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 3000);
  };

  if (!isOpen) return null;

  // --- Project Handlers ---
  const handleCreateNewProject = () => {
    const newProj: CMSProject = {
      id: `proj-${Date.now().toString().slice(-4)}`,
      title: 'New Production Title',
      subtitle: 'Cinematic creative production in Sabah',
      slug: `new-production-${Date.now().toString().slice(-4)}`,
      number: `0${projects.length + 1}`,
      category: 'EXPERIENCES',
      year: '2026',
      location: 'Tawau, Sabah',
      status: 'DRAFT',
      isFeatured: false,
      heroImage: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=1200&auto=format&fit=crop',
      summary: 'Executive overview and creative vision of this project.',
      narrative: [
        'Detailed narrative paragraph exploring the brief, challenge, and cultural heart.',
        'Production execution details and staging engineering specifications.'
      ],
      deliverables: ['Stage Scenography', '4K Cinema Capture', 'Broadcast Stream'],
      galleryImages: [
        'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=1200&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1485846234645-a62644f84728?q=80&w=1200&auto=format&fit=crop'
      ],
      credits: {
        creativeDirection: 'C Design Production',
        producer: 'Ron Fatt',
        director: 'Donny'
      },
      seoTitle: 'New Production | C Design Production',
      metaDescription: 'Cinematic creative production and experiential staging in Sabah, Malaysia.',
      views: 0,
      lastUpdated: new Date().toISOString().slice(0, 10)
    };
    setEditingProject(newProj);
    setProjectStep(1);
  };

  const handleSaveProject = (proj: CMSProject) => {
    const exists = projects.some((p) => p.id === proj.id);
    let updated: CMSProject[];
    if (exists) {
      updated = projects.map((p) => (p.id === proj.id ? { ...proj, lastUpdated: new Date().toISOString().slice(0, 10) } : p));
    } else {
      updated = [proj, ...projects];
    }
    setProjects(updated);
    saveCMSProjects(updated);
    setEditingProject(null);
    notify('Project saved successfully.');
  };

  const handleDuplicateProject = (proj: CMSProject) => {
    const duplicate: CMSProject = {
      ...proj,
      id: `${proj.id}-copy-${Date.now().toString().slice(-4)}`,
      title: `${proj.title} (Copy)`,
      slug: `${proj.slug}-copy`,
      status: 'DRAFT',
      isFeatured: false,
      lastUpdated: new Date().toISOString().slice(0, 10)
    };
    const updated = [duplicate, ...projects];
    setProjects(updated);
    saveCMSProjects(updated);
    notify(`Project duplicated as Draft: "${duplicate.title}"`);
  };

  const handleDeleteProject = (id: string) => {
    if (confirm('Are you sure you want to delete this case study?')) {
      const updated = projects.filter((p) => p.id !== id);
      setProjects(updated);
      saveCMSProjects(updated);
      notify('Project deleted.');
    }
  };

  // --- Event Handlers ---
  const handleCreateNewEvent = () => {
    const newEvt: CMSEvent = {
      id: `EVT-${Date.now().toString().slice(-4)}`,
      name: 'New Sabah Cultural Event 2026',
      shortDesc: 'Landmark festival celebration in Borneo.',
      startDate: '2026-10-01',
      endDate: '2026-10-03',
      location: 'Tawau, Sabah',
      venue: 'Tawau Waterfront Arena',
      poster: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=800&auto=format&fit=crop',
      heroImage: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=1600&auto=format&fit=crop',
      registrationUrl: 'https://wa.me/60128188188',
      status: 'UPCOMING',
      organizer: 'C Design Production',
      partners: ['Sabah Tourism Board']
    };
    setEditingEvent(newEvt);
  };

  const handleSaveEvent = (evt: CMSEvent) => {
    const exists = events.some((e) => e.id === evt.id);
    let updated: CMSEvent[];
    if (exists) {
      updated = events.map((e) => (e.id === evt.id ? evt : e));
    } else {
      updated = [evt, ...events];
    }
    setEvents(updated);
    saveCMSEvents(updated);
    setEditingEvent(null);
    notify('Event updated.');
  };

  // Convert Completed Event into Case Study
  const handleConvertEventToCaseStudy = (evt: CMSEvent) => {
    const newProj: CMSProject = {
      id: `case-${evt.id.toLowerCase()}`,
      title: evt.name,
      subtitle: evt.shortDesc,
      slug: evt.name.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      number: `0${projects.length + 1}`,
      category: 'EXPERIENCES',
      year: evt.startDate.slice(0, 4),
      location: evt.location,
      status: 'DRAFT',
      isFeatured: false,
      heroImage: evt.heroImage,
      summary: evt.shortDesc,
      narrative: [
        `Executed by C Design Production from ${evt.startDate} to ${evt.endDate} at ${evt.venue}.`,
        'Full production highlights, arena staging, and community resonance.'
      ],
      deliverables: ['Event Management', 'Stage Engineering', 'Photo/Video Documentation'],
      galleryImages: [evt.poster, evt.heroImage],
      credits: {
        creativeDirection: 'C Design Production',
        client: evt.organizer
      },
      seoTitle: `${evt.name} | C Design Case Study`,
      metaDescription: evt.shortDesc,
      lastUpdated: new Date().toISOString().slice(0, 10)
    };
    const updated = [newProj, ...projects];
    setProjects(updated);
    saveCMSProjects(updated);
    setActiveTab('projects');
    setEditingProject(newProj);
    notify(`Converted "${evt.name}" into Case Study Draft.`);
  };

  // --- Lead CRM Handlers ---
  const handleStatusChange = (id: string, newStatus: LeadStatus) => {
    const updated = updateLeadStatus(id, newStatus, leadNotes, selectedLead?.assignedTo, selectedLead?.followUpDate);
    setLeads(updated);
    if (selectedLead && selectedLead.id === id) {
      setSelectedLead({ ...selectedLead, status: newStatus });
    }
    notify(`Lead status updated to ${newStatus}`);
  };

  const handleSaveLeadNotes = () => {
    if (!selectedLead) return;
    const updated = updateLeadStatus(
      selectedLead.id,
      selectedLead.status,
      leadNotes,
      selectedLead.assignedTo,
      selectedLead.followUpDate
    );
    setLeads(updated);
    setSelectedLead({ ...selectedLead, internalNotes: leadNotes });
    notify('Executive notes saved.');
  };

  const handleExportCSV = () => {
    const headers = ['ID', 'Date', 'Name', 'Company', 'Email', 'Phone', 'Project Type', 'Location', 'Timeline', 'Budget', 'Urgency', 'Size', 'Status', 'Assigned To', 'Follow Up', 'Source', 'Notes'];
    const rows = leads.map((l) => [
      l.id,
      l.createdAt,
      `"${l.contactName}"`,
      `"${l.contactCompany || ''}"`,
      l.contactEmail,
      `"${l.contactPhone}"`,
      `"${l.projectType}"`,
      `"${l.location}"`,
      `"${l.timeline}"`,
      `"${l.budgetRange}"`,
      l.urgency,
      l.leadSize,
      l.status,
      `"${l.assignedTo || ''}"`,
      l.followUpDate || '',
      l.source,
      `"${(l.internalNotes || '').replace(/"/g, '""')}"`
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `CDesign_Leads_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    notify('Leads exported to CSV.');
  };

  return (
    <div className="fixed inset-0 z-50 bg-neutral-950/90 backdrop-blur-md flex items-center justify-center p-2 sm:p-6 overflow-hidden select-none">
      <div className="w-full max-w-7xl h-[95vh] bg-white rounded-xl shadow-2xl flex overflow-hidden border border-neutral-200">
        {/* Left Sidebar Navigation */}
        <aside className="w-64 bg-neutral-900 text-white flex flex-col justify-between p-4 flex-shrink-0 border-r border-neutral-800">
          <div className="space-y-6">
            {/* Brand Logo & Version */}
            <div className="flex items-center space-x-3 px-2 py-1">
              <img src="/logo.png" alt="Logo" className="w-8 h-8 rounded-full shadow" />
              <div>
                <span className="font-display font-black text-sm uppercase tracking-tight block">
                  CDesign Production
                </span>
                <span className="font-mono text-[9px] text-brand-red font-bold uppercase tracking-wider block">
                  CMS CORE V6.0 · ACTIVE
                </span>
              </div>
            </div>

            {/* Navigation Menu */}
            <nav className="space-y-1 text-xs font-mono">
              {[
                { id: 'overview', label: 'DASHBOARD', icon: LayoutDashboard },
                { id: 'projects', label: 'PROJECTS', icon: FolderKanban, badge: projects.length },
                { id: 'events', label: 'EVENTS', icon: Calendar, badge: events.length },
                { id: 'stories', label: 'STORIES & NEWS', icon: BookOpen, badge: stories.length },
                { id: 'media', label: 'MEDIA LIBRARY', icon: ImageIcon, badge: media.length },
                { id: 'leads', label: 'LEADS CRM', icon: MessageSquare, badge: leads.filter((l) => l.status === 'NEW').length, badgeColor: 'bg-brand-red' },
                { id: 'seo', label: 'SEO & SOCIAL', icon: Share2 },
                { id: 'settings', label: 'GLOBAL SETTINGS', icon: Settings },
                { id: 'users', label: 'TEAM & ROLES', icon: Users },
              ].map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id as AdminTab)}
                    className={`w-full flex items-center justify-between px-3 py-2.5 rounded-md font-bold uppercase transition-all ${
                      isActive
                        ? 'bg-brand-red text-white shadow-md'
                        : 'text-neutral-400 hover:text-white hover:bg-neutral-800'
                    }`}
                  >
                    <div className="flex items-center space-x-2.5">
                      <Icon className="w-4 h-4" />
                      <span>{item.label}</span>
                    </div>
                    {item.badge !== undefined && (
                      <span
                        className={`text-[9px] px-1.5 py-0.5 rounded font-bold ${
                          item.badgeColor || (isActive ? 'bg-black/40 text-white' : 'bg-neutral-800 text-neutral-400')
                        }`}
                      >
                        {item.badge}
                      </span>
                    )}
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Quick Create + Close */}
          <div className="space-y-2 pt-4 border-t border-neutral-800 text-xs font-mono">
            <button
              onClick={handleCreateNewProject}
              className="w-full py-2.5 bg-neutral-800 hover:bg-brand-red text-white rounded font-bold uppercase flex items-center justify-center space-x-1.5 transition-colors"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>NEW PROJECT</span>
            </button>

            <button
              onClick={onClose}
              className="w-full py-2 bg-neutral-900 hover:bg-neutral-800 text-neutral-400 hover:text-white rounded flex items-center justify-center space-x-1 transition-colors"
            >
              <X className="w-3.5 h-3.5" />
              <span>EXIT ADMIN</span>
            </button>
          </div>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 flex flex-col bg-neutral-50 overflow-hidden relative">
          {/* Top Bar Notification */}
          <AnimatePresence>
            {notification && (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="absolute top-3 right-6 z-50 bg-brand-black text-white text-xs font-mono px-4 py-2 rounded-md shadow-xl border border-brand-red flex items-center space-x-2"
              >
                <Check className="w-3.5 h-3.5 text-brand-red" />
                <span>{notification}</span>
              </motion.div>
            )}
          </AnimatePresence>

          {/* 1. OVERVIEW DASHBOARD */}
          {activeTab === 'overview' && (
            <div className="flex-1 p-6 sm:p-8 overflow-y-auto space-y-8">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-xs font-mono font-bold text-brand-red uppercase">EXECUTIVE OVERVIEW</span>
                  <h2 className="font-display text-3xl font-black uppercase text-brand-black">
                    PRODUCTION COMMAND CENTER
                  </h2>
                </div>

                <div className="flex items-center space-x-2 text-xs font-mono">
                  <button
                    onClick={handleCreateNewProject}
                    className="px-3.5 py-2 bg-brand-black text-white rounded hover:bg-brand-red font-bold uppercase flex items-center space-x-1.5 transition-colors"
                  >
                    <Plus className="w-3.5 h-3.5 text-brand-red" />
                    <span>+ PROJECT</span>
                  </button>
                  <button
                    onClick={handleCreateNewEvent}
                    className="px-3.5 py-2 bg-brand-black text-white rounded hover:bg-brand-red font-bold uppercase flex items-center space-x-1.5 transition-colors"
                  >
                    <Plus className="w-3.5 h-3.5 text-brand-red" />
                    <span>+ EVENT</span>
                  </button>
                </div>
              </div>

              {/* Metric Cards Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="p-5 bg-white rounded-lg border border-neutral-200 shadow-sm space-y-1">
                  <span className="text-[10px] font-mono text-neutral-400 font-bold uppercase">NEW LEADS</span>
                  <div className="font-display-huge text-4xl font-black text-brand-red">
                    0{leads.filter((l) => l.status === 'NEW').length}
                  </div>
                  <span className="text-[10px] font-mono text-neutral-500">Requires 24h follow-up</span>
                </div>

                <div className="p-5 bg-white rounded-lg border border-neutral-200 shadow-sm space-y-1">
                  <span className="text-[10px] font-mono text-neutral-400 font-bold uppercase">PUBLISHED CASE STUDIES</span>
                  <div className="font-display-huge text-4xl font-black text-brand-black">
                    {projects.filter((p) => p.status === 'PUBLISHED').length}
                  </div>
                  <span className="text-[10px] font-mono text-emerald-600 font-bold">100% Live on Website</span>
                </div>

                <div className="p-5 bg-white rounded-lg border border-neutral-200 shadow-sm space-y-1">
                  <span className="text-[10px] font-mono text-neutral-400 font-bold uppercase">ACTIVE EVENTS</span>
                  <div className="font-display-huge text-4xl font-black text-brand-black">
                    {events.filter((e) => e.status === 'UPCOMING').length}
                  </div>
                  <span className="text-[10px] font-mono text-neutral-500">BICC 2026 Milestone</span>
                </div>

                <div className="p-5 bg-white rounded-lg border border-neutral-200 shadow-sm space-y-1">
                  <span className="text-[10px] font-mono text-neutral-400 font-bold uppercase">MEDIA ASSETS</span>
                  <div className="font-display-huge text-4xl font-black text-brand-black">
                    {media.length}
                  </div>
                  <span className="text-[10px] font-mono text-neutral-500">Centralized Library</span>
                </div>
              </div>

              {/* Recent Enquiries & Top Projects Split */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                {/* Recent Leads */}
                <div className="lg:col-span-7 bg-white p-5 rounded-lg border border-neutral-200 shadow-sm space-y-4">
                  <div className="flex items-center justify-between border-b border-neutral-200 pb-3">
                    <span className="text-xs font-mono font-bold uppercase text-brand-black">
                      RECENT PROJECT ENQUIRIES
                    </span>
                    <button
                      onClick={() => setActiveTab('leads')}
                      className="text-[11px] font-mono text-brand-red hover:underline font-bold"
                    >
                      VIEW ALL PIPELINE →
                    </button>
                  </div>

                  <div className="divide-y divide-neutral-100">
                    {leads.slice(0, 3).map((lead) => (
                      <div key={lead.id} className="py-3 flex items-center justify-between">
                        <div>
                          <span className="text-[10px] font-mono text-neutral-400 block">{lead.createdAt} · {lead.location}</span>
                          <strong className="text-xs font-bold text-brand-black">{lead.contactName}</strong>
                          <span className="text-xs text-neutral-500 ml-1">({lead.projectType})</span>
                        </div>

                        <div className="flex items-center space-x-2">
                          <span className={`px-2 py-0.5 rounded text-[9px] font-mono font-bold uppercase ${
                            lead.status === 'NEW' ? 'bg-brand-red text-white' : 'bg-neutral-100 text-neutral-700'
                          }`}>
                            {lead.status}
                          </span>
                          <a
                            href={`https://wa.me/${lead.contactPhone.replace(/[^0-9]/g, '')}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-1.5 bg-[#25D366] text-white rounded hover:opacity-90"
                            title="WhatsApp Client"
                          >
                            <MessageCircle className="w-3.5 h-3.5 fill-current" />
                          </a>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Top Viewed Case Studies */}
                <div className="lg:col-span-5 bg-white p-5 rounded-lg border border-neutral-200 shadow-sm space-y-4">
                  <div className="flex items-center justify-between border-b border-neutral-200 pb-3">
                    <span className="text-xs font-mono font-bold uppercase text-brand-black">
                      TOP VIEWED PRODUCTIONS
                    </span>
                    <span className="text-[10px] font-mono text-neutral-400">ANALYTICS</span>
                  </div>

                  <div className="space-y-3">
                    {projects.slice(0, 3).map((proj) => (
                      <div key={proj.id} className="flex items-center space-x-3 text-xs">
                        <img src={proj.heroImage} alt={proj.title} className="w-12 h-9 object-cover rounded" />
                        <div className="flex-1 truncate">
                          <strong className="block truncate font-bold text-brand-black">{proj.title}</strong>
                          <span className="font-mono text-[10px] text-neutral-500">{proj.category}</span>
                        </div>
                        <span className="font-mono font-bold text-brand-red text-xs">{proj.views || 480} views</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* 2. PROJECTS MANAGEMENT */}
          {activeTab === 'projects' && (
            <div className="flex-1 p-6 sm:p-8 overflow-y-auto space-y-6">
              <div className="flex items-center justify-between border-b border-neutral-200 pb-4">
                <div>
                  <span className="text-xs font-mono font-bold text-brand-red uppercase">CORE CMS</span>
                  <h2 className="font-display text-3xl font-black uppercase text-brand-black">
                    PROJECTS & CASE STUDIES ({projects.length})
                  </h2>
                </div>

                <button
                  onClick={handleCreateNewProject}
                  className="px-4 py-2.5 bg-brand-red text-white rounded text-xs font-mono font-bold uppercase flex items-center space-x-1.5 shadow hover:bg-brand-black transition-colors"
                >
                  <Plus className="w-4 h-4" />
                  <span>NEW CASE STUDY</span>
                </button>
              </div>

              {/* Status Filter */}
              <div className="flex items-center space-x-2 text-xs font-mono">
                {['ALL', 'PUBLISHED', 'DRAFT', 'REVIEW', 'ARCHIVED'].map((st) => (
                  <button
                    key={st}
                    onClick={() => setProjectStatusFilter(st)}
                    className={`px-3 py-1.5 rounded uppercase font-bold ${
                      projectStatusFilter === st
                        ? 'bg-brand-black text-white'
                        : 'bg-white border border-neutral-200 text-neutral-600 hover:bg-neutral-100'
                    }`}
                  >
                    {st}
                  </button>
                ))}
              </div>

              {/* Projects Table */}
              <div className="bg-white rounded-lg border border-neutral-200 shadow-sm overflow-hidden">
                <table className="w-full text-left text-xs">
                  <thead className="bg-neutral-100 border-b border-neutral-200 text-neutral-600 font-mono uppercase text-[10px]">
                    <tr>
                      <th className="p-3">THUMBNAIL</th>
                      <th className="p-3">PROJECT NAME</th>
                      <th className="p-3">CATEGORY</th>
                      <th className="p-3">YEAR</th>
                      <th className="p-3">STATUS</th>
                      <th className="p-3">FEATURED</th>
                      <th className="p-3">VIEWS</th>
                      <th className="p-3 text-right">ACTIONS</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-neutral-200 font-medium">
                    {projects
                      .filter((p) => projectStatusFilter === 'ALL' || p.status === projectStatusFilter)
                      .map((proj) => (
                        <tr key={proj.id} className="hover:bg-neutral-50 transition-colors">
                          <td className="p-3 w-16">
                            <img src={proj.heroImage} alt={proj.title} className="w-14 h-9 object-cover rounded shadow-sm" />
                          </td>
                          <td className="p-3 font-bold text-brand-black">
                            {proj.title}
                            <span className="block font-mono text-[10px] text-neutral-400 font-normal">
                              /projects/{proj.slug}
                            </span>
                          </td>
                          <td className="p-3 font-mono text-[11px] text-neutral-600">{proj.category}</td>
                          <td className="p-3 font-mono text-neutral-500">{proj.year}</td>
                          <td className="p-3">
                            <span
                              className={`px-2 py-0.5 rounded text-[9px] font-mono font-bold uppercase ${
                                proj.status === 'PUBLISHED'
                                  ? 'bg-emerald-100 text-emerald-800'
                                  : proj.status === 'DRAFT'
                                  ? 'bg-neutral-200 text-neutral-800'
                                  : 'bg-amber-100 text-amber-800'
                              }`}
                            >
                              {proj.status}
                            </span>
                          </td>
                          <td className="p-3">
                            <button
                              onClick={() => {
                                const updated = projects.map((p) =>
                                  p.id === proj.id ? { ...p, isFeatured: !p.isFeatured } : p
                                );
                                setProjects(updated);
                                saveCMSProjects(updated);
                                notify(`Toggled featured for "${proj.title}"`);
                              }}
                              className={`px-2 py-1 rounded text-[10px] font-mono font-bold ${
                                proj.isFeatured ? 'bg-brand-red text-white' : 'bg-neutral-100 text-neutral-400'
                              }`}
                            >
                              {proj.isFeatured ? '★ FEATURED' : '☆ NORMAL'}
                            </button>
                          </td>
                          <td className="p-3 font-mono text-neutral-600">{proj.views || 320}</td>
                          <td className="p-3 text-right">
                            <div className="inline-flex items-center space-x-1.5">
                              <button
                                onClick={() => {
                                  setEditingProject(proj);
                                  setProjectStep(1);
                                }}
                                className="p-1.5 bg-neutral-100 hover:bg-brand-black hover:text-white rounded"
                                title="Edit Project"
                              >
                                <Edit3 className="w-3.5 h-3.5" />
                              </button>
                              <button
                                onClick={() => handleDuplicateProject(proj)}
                                className="p-1.5 bg-neutral-100 hover:bg-brand-black hover:text-white rounded"
                                title="Duplicate Project"
                              >
                                <Copy className="w-3.5 h-3.5" />
                              </button>
                              <button
                                onClick={() => handleDeleteProject(proj.id)}
                                className="p-1.5 bg-neutral-100 hover:bg-brand-red hover:text-white rounded text-neutral-500"
                                title="Delete Project"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* 3. EVENTS MANAGEMENT */}
          {activeTab === 'events' && (
            <div className="flex-1 p-6 sm:p-8 overflow-y-auto space-y-6">
              <div className="flex items-center justify-between border-b border-neutral-200 pb-4">
                <div>
                  <span className="text-xs font-mono font-bold text-brand-red uppercase">EVENTS MODULE</span>
                  <h2 className="font-display text-3xl font-black uppercase text-brand-black">
                    PRODUCTIONS & FESTIVALS ({events.length})
                  </h2>
                </div>

                <button
                  onClick={handleCreateNewEvent}
                  className="px-4 py-2.5 bg-brand-red text-white rounded text-xs font-mono font-bold uppercase flex items-center space-x-1.5 shadow"
                >
                  <Plus className="w-4 h-4" />
                  <span>NEW EVENT</span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {events.map((evt) => (
                  <div key={evt.id} className="bg-white rounded-lg border border-neutral-200 overflow-hidden shadow-sm flex flex-col justify-between">
                    <div className="h-44 relative">
                      <img src={evt.heroImage} alt={evt.name} className="w-full h-full object-cover" />
                      <span className={`absolute top-3 left-3 px-2 py-1 rounded text-[10px] font-mono font-bold uppercase text-white ${
                        evt.status === 'UPCOMING' ? 'bg-brand-red' : 'bg-neutral-800'
                      }`}>
                        {evt.status}
                      </span>
                      <span className="absolute top-3 right-3 bg-black/70 text-white text-[10px] font-mono px-2 py-0.5 rounded">
                        {evt.startDate} → {evt.endDate}
                      </span>
                    </div>

                    <div className="p-5 space-y-3 flex-1">
                      <h3 className="font-display text-lg font-bold uppercase text-brand-black">{evt.name}</h3>
                      <p className="text-xs text-neutral-600 line-clamp-2">{evt.shortDesc}</p>
                      <div className="text-[11px] font-mono text-neutral-500">
                        VENUE: {evt.venue} · {evt.location}
                      </div>
                    </div>

                    <div className="p-4 border-t border-neutral-200 bg-neutral-50 flex items-center justify-between text-xs font-mono">
                      <button
                        onClick={() => handleConvertEventToCaseStudy(evt)}
                        className="px-3 py-1.5 bg-neutral-900 text-white rounded hover:bg-brand-red font-bold uppercase flex items-center space-x-1"
                      >
                        <Sparkles className="w-3 h-3 text-brand-red" />
                        <span>CONVERT TO CASE STUDY</span>
                      </button>

                      <button
                        onClick={() => setEditingEvent(evt)}
                        className="p-1.5 bg-white border border-neutral-300 rounded hover:bg-brand-black hover:text-white"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 4. MEDIA LIBRARY */}
          {activeTab === 'media' && (
            <div className="flex-1 p-6 sm:p-8 overflow-y-auto space-y-6">
              <div className="flex items-center justify-between border-b border-neutral-200 pb-4">
                <div>
                  <span className="text-xs font-mono font-bold text-brand-red uppercase">DIGITAL ASSET MANAGEMENT</span>
                  <h2 className="font-display text-3xl font-black uppercase text-brand-black">
                    MEDIA LIBRARY ({media.length})
                  </h2>
                </div>

                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => notify('Bulk Upload: Drag photos or select folders.')}
                    className="px-4 py-2 bg-brand-black text-white rounded text-xs font-mono font-bold uppercase flex items-center space-x-1.5"
                  >
                    <UploadCloud className="w-4 h-4 text-brand-red" />
                    <span>BULK UPLOAD (50+ PHOTOS)</span>
                  </button>
                </div>
              </div>

              {/* Media Filter Tabs */}
              <div className="flex items-center space-x-2 text-xs font-mono">
                {['ALL', 'IMAGE', 'VIDEO', 'LOGO', 'DOCUMENT'].map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setMediaCategoryFilter(cat)}
                    className={`px-3 py-1.5 rounded uppercase font-bold ${
                      mediaCategoryFilter === cat
                        ? 'bg-brand-black text-white'
                        : 'bg-white border border-neutral-200 text-neutral-600 hover:bg-neutral-100'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              {/* Media Assets Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {media
                  .filter((m) => mediaCategoryFilter === 'ALL' || m.type.toUpperCase() === mediaCategoryFilter)
                  .map((asset) => (
                    <div
                      key={asset.id}
                      onClick={() => setViewingMedia(asset)}
                      className="bg-white rounded-lg border border-neutral-200 overflow-hidden shadow-sm group cursor-pointer hover:border-brand-red transition-all"
                    >
                      <div className="h-36 relative bg-neutral-900">
                        <img src={asset.url} alt={asset.title} className="w-full h-full object-cover" />
                        <span className="absolute bottom-2 left-2 bg-black/70 text-white text-[9px] font-mono px-1.5 py-0.5 rounded">
                          {asset.dimensions || asset.fileSize}
                        </span>
                      </div>
                      <div className="p-3 space-y-1">
                        <span className="text-[11px] font-bold text-brand-black block truncate">{asset.title}</span>
                        <span className="text-[9px] font-mono text-neutral-400 block">
                          USED IN {asset.usedIn.length} PAGES
                        </span>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          )}

          {/* 5. LEADS CRM PIPELINE */}
          {activeTab === 'leads' && (
            <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
              {/* Left: Leads List */}
              <div className="lg:w-1/2 flex flex-col border-r border-neutral-200 bg-white overflow-hidden">
                <div className="p-4 border-b border-neutral-200 space-y-3">
                  <div className="flex items-center justify-between gap-2">
                    <div className="relative flex-1">
                      <Search className="w-4 h-4 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        placeholder="Search leads by name, company, phone..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-9 pr-3 py-2 text-xs bg-neutral-100 border border-neutral-200 rounded focus:bg-white focus:border-brand-red outline-none"
                      />
                    </div>

                    <button
                      onClick={handleExportCSV}
                      className="flex items-center space-x-1.5 px-3 py-2 bg-neutral-900 text-white rounded text-xs font-mono font-bold hover:bg-brand-red transition-colors flex-shrink-0"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>CSV</span>
                    </button>
                  </div>

                  <div className="flex items-center space-x-1.5 overflow-x-auto pb-1 text-[11px] font-mono scrollbar-none">
                    {['ALL', 'NEW', 'QUALIFIED', 'PROPOSAL SENT', 'WON', 'LOST'].map((st) => (
                      <button
                        key={st}
                        onClick={() => setLeadStatusFilter(st)}
                        className={`px-2.5 py-1 rounded-full whitespace-nowrap font-bold uppercase ${
                          leadStatusFilter === st ? 'bg-brand-black text-white' : 'bg-neutral-100 text-neutral-700'
                        }`}
                      >
                        {st}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex-1 overflow-y-auto divide-y divide-neutral-100">
                  {leads
                    .filter((l) => leadStatusFilter === 'ALL' || l.status === leadStatusFilter)
                    .map((lead) => {
                      const isSelected = selectedLead?.id === lead.id;
                      return (
                        <div
                          key={lead.id}
                          onClick={() => {
                            setSelectedLead(lead);
                            setLeadNotes(lead.internalNotes || '');
                          }}
                          className={`p-4 cursor-pointer transition-all ${
                            isSelected ? 'bg-neutral-50 border-l-4 border-brand-red' : 'hover:bg-neutral-50/50'
                          }`}
                        >
                          <div className="flex items-start justify-between">
                            <div>
                              <span className="text-[10px] font-mono text-neutral-400 font-bold">{lead.id} · {lead.createdAt}</span>
                              <h4 className="font-display text-sm font-bold text-brand-black">{lead.contactName}</h4>
                              <span className="text-xs text-neutral-500">{lead.contactCompany || 'Private Entity'}</span>
                            </div>
                            <span className={`px-2 py-0.5 rounded text-[9px] font-mono font-bold uppercase ${
                              lead.status === 'NEW' ? 'bg-brand-red text-white' : 'bg-neutral-200 text-neutral-800'
                            }`}>
                              {lead.status}
                            </span>
                          </div>

                          <div className="mt-2 flex items-center justify-between text-[10px] font-mono text-neutral-600">
                            <span className="font-bold text-neutral-900">{lead.projectType}</span>
                            <span className="font-bold text-brand-red">{lead.budgetRange}</span>
                          </div>
                        </div>
                      );
                    })}
                </div>
              </div>

              {/* Right: Lead Dossier */}
              <div className="lg:w-1/2 p-6 overflow-y-auto bg-white space-y-6">
                {selectedLead ? (
                  <>
                    <div className="flex items-center justify-between border-b border-neutral-200 pb-4">
                      <div>
                        <span className="text-[10px] font-mono text-neutral-400 font-bold uppercase">LEAD DOSSIER</span>
                        <h3 className="font-display text-2xl font-black uppercase text-brand-black">{selectedLead.contactName}</h3>
                        <p className="text-xs text-neutral-600 font-medium">{selectedLead.contactCompany || 'Direct Client'}</p>
                      </div>

                      <select
                        value={selectedLead.status}
                        onChange={(e) => handleStatusChange(selectedLead.id, e.target.value as LeadStatus)}
                        className="text-xs font-mono font-bold p-2 border border-neutral-300 rounded bg-white outline-none focus:border-brand-red"
                      >
                        <option value="NEW">NEW</option>
                        <option value="CONTACTED">CONTACTED</option>
                        <option value="QUALIFIED">QUALIFIED</option>
                        <option value="PROPOSAL SENT">PROPOSAL SENT</option>
                        <option value="WON">WON</option>
                        <option value="LOST">LOST</option>
                        <option value="ARCHIVED">ARCHIVED</option>
                      </select>
                    </div>

                    <div className="grid grid-cols-3 gap-2">
                      <a
                        href={`https://wa.me/${selectedLead.contactPhone.replace(/[^0-9]/g, '')}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-3 bg-[#25D366] text-white rounded text-xs font-bold uppercase flex items-center justify-center space-x-1.5 shadow-sm"
                      >
                        <MessageCircle className="w-4 h-4 fill-current" />
                        <span>WHATSAPP</span>
                      </a>
                      <a
                        href={`tel:${selectedLead.contactPhone}`}
                        className="p-3 bg-neutral-900 text-white rounded text-xs font-bold uppercase flex items-center justify-center space-x-1.5 shadow-sm"
                      >
                        <Phone className="w-4 h-4" />
                        <span>CALL</span>
                      </a>
                      <a
                        href={`mailto:${selectedLead.contactEmail}`}
                        className="p-3 bg-neutral-100 text-neutral-900 border border-neutral-300 rounded text-xs font-bold uppercase flex items-center justify-center space-x-1.5"
                      >
                        <Mail className="w-4 h-4" />
                        <span>EMAIL</span>
                      </a>
                    </div>

                    <div className="grid grid-cols-2 gap-3 text-xs bg-neutral-50 p-4 rounded border border-neutral-200">
                      <div>
                        <span className="font-mono text-neutral-400 text-[10px] block">DISCIPLINE</span>
                        <strong>{selectedLead.projectType}</strong>
                      </div>
                      <div>
                        <span className="font-mono text-neutral-400 text-[10px] block">LOCATION</span>
                        <strong>{selectedLead.location}</strong>
                      </div>
                      <div>
                        <span className="font-mono text-neutral-400 text-[10px] block">TIMELINE</span>
                        <strong>{selectedLead.timeline}</strong>
                      </div>
                      <div>
                        <span className="font-mono text-neutral-400 text-[10px] block">BUDGET RANGE</span>
                        <strong className="text-brand-red">{selectedLead.budgetRange}</strong>
                      </div>
                    </div>

                    {selectedLead.details && (
                      <div className="space-y-1 text-xs">
                        <span className="font-mono text-neutral-400 text-[10px] uppercase font-bold">CLIENT BRIEF</span>
                        <div className="p-3 bg-neutral-50 rounded border border-neutral-200 text-neutral-800 italic">
                          "{selectedLead.details}"
                        </div>
                      </div>
                    )}

                    <div className="space-y-2 text-xs pt-2">
                      <span className="font-mono text-neutral-400 text-[10px] uppercase font-bold">INTERNAL EXECUTIVE NOTES</span>
                      <textarea
                        rows={3}
                        value={leadNotes}
                        onChange={(e) => setLeadNotes(e.target.value)}
                        placeholder="Add production notes, call outcomes, quotation status..."
                        className="w-full p-3 bg-neutral-50 border border-neutral-300 rounded focus:bg-white focus:border-brand-red outline-none"
                      />
                      <button
                        onClick={handleSaveLeadNotes}
                        className="px-4 py-2 bg-brand-black text-white text-xs font-bold uppercase rounded hover:bg-brand-red transition-colors"
                      >
                        SAVE NOTES
                      </button>
                    </div>
                  </>
                ) : (
                  <div className="text-center py-20 text-neutral-400 text-xs">Select a lead to review.</div>
                )}
              </div>
            </div>
          )}

          {/* 6. SEO & SOCIAL SHARE DASHBOARD */}
          {activeTab === 'seo' && (
            <div className="flex-1 p-6 sm:p-8 overflow-y-auto space-y-6">
              <div className="border-b border-neutral-200 pb-4">
                <span className="text-xs font-mono font-bold text-brand-red uppercase">METADATA & SOCIAL CARDS</span>
                <h2 className="font-display text-3xl font-black uppercase text-brand-black">
                  SEARCH ENGINE & SOCIAL PREVIEW
                </h2>
              </div>

              {/* Google SERP Live Card */}
              <div className="bg-white p-6 rounded-lg border border-neutral-200 shadow-sm space-y-4">
                <span className="text-xs font-mono font-bold uppercase text-neutral-400">GOOGLE SEARCH SNIPPET</span>
                <div className="p-4 bg-white rounded border border-neutral-200 max-w-2xl space-y-1">
                  <span className="text-xs text-neutral-600 font-mono">https://cdesignproduction.com/</span>
                  <h4 className="text-base text-[#1a0dab] hover:underline font-medium cursor-pointer">
                    CDesign Production | Creative Production, Events & Film in Sabah
                  </h4>
                  <p className="text-xs text-[#4d5156] leading-relaxed">
                    CDesign Production is a premier Tawau-based creative production company specializing in stadium-scale events, cinematic film production, creative direction, and cultural tourism in Sabah.
                  </p>
                </div>
              </div>

              {/* Social OpenGraph Card */}
              <div className="bg-white p-6 rounded-lg border border-neutral-200 shadow-sm space-y-4">
                <span className="text-xs font-mono font-bold uppercase text-neutral-400">FACEBOOK & WHATSAPP SHARE CARD</span>
                <div className="w-full max-w-md rounded-lg overflow-hidden border border-neutral-300 shadow bg-neutral-900 text-white">
                  <div className="h-48 relative">
                    <img src="/logo.png" alt="OG Image" className="w-full h-full object-contain p-6 bg-brand-black" />
                  </div>
                  <div className="p-4 bg-neutral-800 space-y-1">
                    <span className="text-[10px] font-mono text-neutral-400 uppercase">CDESIGNPRODUCTION.COM</span>
                    <h5 className="font-display text-sm font-bold uppercase">CDesign Production · Born in Borneo. Creating Beyond Borders.</h5>
                    <p className="text-[11px] text-neutral-300 line-clamp-2">We create experiences that move people.</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* 7. GLOBAL SETTINGS */}
          {activeTab === 'settings' && (
            <div className="flex-1 p-6 sm:p-8 overflow-y-auto space-y-6">
              <div className="border-b border-neutral-200 pb-4">
                <span className="text-xs font-mono font-bold text-brand-red uppercase">COMPANY CONFIG</span>
                <h2 className="font-display text-3xl font-black uppercase text-brand-black">
                  CENTRAL CONTACT & COMPANY DETAILS
                </h2>
              </div>

              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  saveSettings(settings);
                  notify('Global company settings saved.');
                }}
                className="max-w-3xl space-y-4 text-xs"
              >
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="font-mono font-bold uppercase text-neutral-600 block mb-1">BRAND NAME</label>
                    <input
                      type="text"
                      value={settings.companyName}
                      onChange={(e) => setSettings({ ...settings, companyName: e.target.value })}
                      className="w-full p-2.5 bg-white border border-neutral-300 rounded focus:border-brand-red outline-none"
                    />
                  </div>

                  <div>
                    <label className="font-mono font-bold uppercase text-neutral-600 block mb-1">OFFICIAL EMAIL</label>
                    <input
                      type="email"
                      value={settings.officialEmail}
                      onChange={(e) => setSettings({ ...settings, officialEmail: e.target.value })}
                      className="w-full p-2.5 bg-white border border-neutral-300 rounded focus:border-brand-red outline-none"
                    />
                  </div>

                  <div>
                    <label className="font-mono font-bold uppercase text-neutral-600 block mb-1">WHATSAPP NUMBER</label>
                    <input
                      type="text"
                      value={settings.whatsappNumber}
                      onChange={(e) => setSettings({ ...settings, whatsappNumber: e.target.value })}
                      className="w-full p-2.5 bg-white border border-neutral-300 rounded focus:border-brand-red outline-none font-mono"
                    />
                  </div>

                  <div>
                    <label className="font-mono font-bold uppercase text-neutral-600 block mb-1">PHONE NUMBER</label>
                    <input
                      type="text"
                      value={settings.phone}
                      onChange={(e) => setSettings({ ...settings, phone: e.target.value })}
                      className="w-full p-2.5 bg-white border border-neutral-300 rounded focus:border-brand-red outline-none"
                    />
                  </div>

                  <div className="col-span-2">
                    <label className="font-mono font-bold uppercase text-neutral-600 block mb-1">HEADQUARTERS ADDRESS</label>
                    <input
                      type="text"
                      value={settings.address}
                      onChange={(e) => setSettings({ ...settings, address: e.target.value })}
                      className="w-full p-2.5 bg-white border border-neutral-300 rounded focus:border-brand-red outline-none"
                    />
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="px-6 py-3 bg-brand-red text-white text-xs font-bold uppercase tracking-wider rounded shadow hover:bg-brand-black transition-colors"
                  >
                    SAVE ALL CONFIGURATION
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* 8. USERS & ROLES */}
          {activeTab === 'users' && (
            <div className="flex-1 p-6 sm:p-8 overflow-y-auto space-y-6">
              <div className="flex items-center justify-between border-b border-neutral-200 pb-4">
                <div>
                  <span className="text-xs font-mono font-bold text-brand-red uppercase">SECURITY & ROLES</span>
                  <h2 className="font-display text-3xl font-black uppercase text-brand-black">
                    TEAM MEMBERS & ACCESS ({users.length})
                  </h2>
                </div>
              </div>

              <div className="bg-white rounded-lg border border-neutral-200 overflow-hidden shadow-sm">
                <table className="w-full text-left text-xs">
                  <thead className="bg-neutral-100 border-b border-neutral-200 text-neutral-600 font-mono uppercase text-[10px]">
                    <tr>
                      <th className="p-3">NAME</th>
                      <th className="p-3">EMAIL</th>
                      <th className="p-3">SYSTEM ROLE</th>
                      <th className="p-3">STATUS</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-neutral-200 font-medium">
                    {users.map((usr) => (
                      <tr key={usr.id} className="hover:bg-neutral-50">
                        <td className="p-3 font-bold text-brand-black">{usr.name}</td>
                        <td className="p-3 font-mono text-neutral-600">{usr.email}</td>
                        <td className="p-3">
                          <span className={`px-2 py-0.5 rounded text-[9px] font-mono font-bold uppercase ${
                            usr.role === 'ADMIN' ? 'bg-brand-red text-white' : 'bg-neutral-200 text-neutral-800'
                          }`}>
                            {usr.role}
                          </span>
                        </td>
                        <td className="p-3 font-mono text-neutral-500">{usr.lastActive}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* PROJECT GUIDED BUILDER MODAL */}
      <AnimatePresence>
        {editingProject && (
          <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-3 sm:p-6">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="w-full max-w-5xl h-[92vh] bg-white rounded-xl shadow-2xl flex flex-col overflow-hidden"
            >
              {/* Guided Header */}
              <div className="px-6 py-4 bg-brand-black text-white flex items-center justify-between border-b border-neutral-800">
                <div className="flex items-center space-x-3">
                  <span className="text-xs font-mono font-bold text-brand-red">STEP 0{projectStep} / 03</span>
                  <span className="font-display font-bold text-lg uppercase tracking-tight">
                    {editingProject.title || 'Untitled Case Study'}
                  </span>
                </div>

                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => setEditingProject(null)}
                    className="p-1.5 text-neutral-400 hover:text-white rounded"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Body Steps */}
              <div className="flex-1 p-6 overflow-y-auto space-y-6">
                {projectStep === 1 && (
                  <div className="space-y-4 max-w-2xl text-xs">
                    <span className="font-mono text-brand-red font-bold uppercase block">01 / BASIC IDENTITY</span>
                    <div>
                      <label className="font-mono font-bold block mb-1">PROJECT TITLE *</label>
                      <input
                        type="text"
                        value={editingProject.title}
                        onChange={(e) => setEditingProject({ ...editingProject, title: e.target.value })}
                        className="w-full p-2.5 bg-neutral-50 border border-neutral-300 rounded font-display text-base font-bold uppercase"
                      />
                    </div>
                    <div>
                      <label className="font-mono font-bold block mb-1">SUBTITLE / TAGLINE</label>
                      <input
                        type="text"
                        value={editingProject.subtitle}
                        onChange={(e) => setEditingProject({ ...editingProject, subtitle: e.target.value })}
                        className="w-full p-2.5 bg-neutral-50 border border-neutral-300 rounded"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="font-mono font-bold block mb-1">CATEGORY</label>
                        <select
                          value={editingProject.category}
                          onChange={(e) => setEditingProject({ ...editingProject, category: e.target.value })}
                          className="w-full p-2.5 bg-neutral-50 border border-neutral-300 rounded font-mono font-bold"
                        >
                          <option value="EXPERIENCES">EXPERIENCES</option>
                          <option value="FILM & CONTENT">FILM & CONTENT</option>
                          <option value="CREATIVE DIRECTION">CREATIVE DIRECTION</option>
                          <option value="CULTURE & TOURISM">CULTURE & TOURISM</option>
                          <option value="IMPACT & COMMUNITY">IMPACT & COMMUNITY</option>
                          <option value="ORIGINALS">ORIGINALS</option>
                        </select>
                      </div>
                      <div>
                        <label className="font-mono font-bold block mb-1">YEAR</label>
                        <input
                          type="text"
                          value={editingProject.year}
                          onChange={(e) => setEditingProject({ ...editingProject, year: e.target.value })}
                          className="w-full p-2.5 bg-neutral-50 border border-neutral-300 rounded font-mono"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {projectStep === 2 && (
                  <div className="space-y-4 max-w-2xl text-xs">
                    <span className="font-mono text-brand-red font-bold uppercase block">02 / HERO MEDIA & STORY</span>
                    <div>
                      <label className="font-mono font-bold block mb-1">HERO IMAGE URL *</label>
                      <input
                        type="text"
                        value={editingProject.heroImage}
                        onChange={(e) => setEditingProject({ ...editingProject, heroImage: e.target.value })}
                        className="w-full p-2.5 bg-neutral-50 border border-neutral-300 rounded"
                      />
                      <div className="mt-2 h-44 rounded overflow-hidden border">
                        <img src={editingProject.heroImage} alt="Preview" className="w-full h-full object-cover" />
                      </div>
                    </div>
                    <div>
                      <label className="font-mono font-bold block mb-1">EXECUTIVE SUMMARY</label>
                      <textarea
                        rows={3}
                        value={editingProject.summary}
                        onChange={(e) => setEditingProject({ ...editingProject, summary: e.target.value })}
                        className="w-full p-2.5 bg-neutral-50 border border-neutral-300 rounded"
                      />
                    </div>
                  </div>
                )}

                {projectStep === 3 && (
                  <div className="space-y-4 max-w-2xl text-xs">
                    <span className="font-mono text-brand-red font-bold uppercase block">03 / SEO METADATA & STATUS</span>
                    <div>
                      <label className="font-mono font-bold block mb-1">SEO TITLE</label>
                      <input
                        type="text"
                        value={editingProject.seoTitle || ''}
                        onChange={(e) => setEditingProject({ ...editingProject, seoTitle: e.target.value })}
                        className="w-full p-2.5 bg-neutral-50 border border-neutral-300 rounded"
                      />
                    </div>
                    <div>
                      <label className="font-mono font-bold block mb-1">META DESCRIPTION</label>
                      <textarea
                        rows={2}
                        value={editingProject.metaDescription || ''}
                        onChange={(e) => setEditingProject({ ...editingProject, metaDescription: e.target.value })}
                        className="w-full p-2.5 bg-neutral-50 border border-neutral-300 rounded"
                      />
                    </div>
                    <div>
                      <label className="font-mono font-bold block mb-1">PUBLICATION STATUS</label>
                      <select
                        value={editingProject.status}
                        onChange={(e) => setEditingProject({ ...editingProject, status: e.target.value as ContentStatus })}
                        className="w-full p-2.5 bg-neutral-50 border border-neutral-300 rounded font-mono font-bold"
                      >
                        <option value="DRAFT">DRAFT (Hidden)</option>
                        <option value="REVIEW">REVIEW</option>
                        <option value="PUBLISHED">PUBLISHED (Live)</option>
                        <option value="ARCHIVED">ARCHIVED</option>
                      </select>
                    </div>
                  </div>
                )}
              </div>

              {/* Step Navigation Bar */}
              <div className="px-6 py-4 bg-neutral-100 border-t border-neutral-200 flex items-center justify-between">
                <button
                  onClick={() => setProjectStep((s) => Math.max(1, s - 1))}
                  disabled={projectStep === 1}
                  className="px-4 py-2 bg-white border border-neutral-300 rounded text-xs font-mono font-bold uppercase disabled:opacity-30"
                >
                  BACK
                </button>

                {projectStep < 3 ? (
                  <button
                    onClick={() => setProjectStep((s) => s + 1)}
                    className="px-6 py-2 bg-brand-black text-white rounded text-xs font-mono font-bold uppercase hover:bg-brand-red"
                  >
                    CONTINUE
                  </button>
                ) : (
                  <button
                    onClick={() => handleSaveProject(editingProject)}
                    className="px-6 py-2 bg-brand-red text-white rounded text-xs font-mono font-bold uppercase hover:bg-brand-black shadow"
                  >
                    SAVE CASE STUDY
                  </button>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* MEDIA DETAILS MODAL */}
      <AnimatePresence>
        {viewingMedia && (
          <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4">
            <motion.div
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              className="w-full max-w-lg bg-white rounded-lg shadow-2xl p-6 space-y-4 text-xs"
            >
              <div className="flex items-center justify-between border-b pb-3">
                <h4 className="font-display text-base font-bold uppercase text-brand-black">{viewingMedia.title}</h4>
                <button onClick={() => setViewingMedia(null)} className="p-1 text-neutral-400 hover:text-black">
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="h-56 rounded overflow-hidden bg-neutral-900">
                <img src={viewingMedia.url} alt={viewingMedia.title} className="w-full h-full object-contain" />
              </div>

              <div className="space-y-1 font-mono text-[11px] text-neutral-600 bg-neutral-50 p-3 rounded">
                <div><strong>DIMENSIONS:</strong> {viewingMedia.dimensions}</div>
                <div><strong>FILE SIZE:</strong> {viewingMedia.fileSize}</div>
                <div><strong>ALT TEXT:</strong> {viewingMedia.altText}</div>
                <div><strong>USED IN:</strong> {viewingMedia.usedIn.join(', ')}</div>
              </div>

              <button
                onClick={() => {
                  if (viewingMedia.usedIn.length > 0) {
                    alert(`Cannot delete: Asset is currently live in ${viewingMedia.usedIn.join(', ')}.`);
                  } else {
                    setMedia(media.filter((m) => m.id !== viewingMedia.id));
                    setViewingMedia(null);
                    notify('Asset removed.');
                  }
                }}
                className="w-full py-2.5 bg-neutral-100 hover:bg-red-50 hover:text-brand-red text-neutral-600 rounded font-mono font-bold uppercase transition-colors"
              >
                SAFE DELETE ASSET
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* EVENT EDIT MODAL */}
      <AnimatePresence>
        {editingEvent && (
          <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4">
            <motion.div
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              className="w-full max-w-lg bg-white rounded-lg shadow-2xl p-6 space-y-4 text-xs"
            >
              <div className="flex items-center justify-between border-b pb-3">
                <h4 className="font-display text-base font-bold uppercase text-brand-black">EDIT EVENT</h4>
                <button onClick={() => setEditingEvent(null)} className="p-1 text-neutral-400 hover:text-black">
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="space-y-3">
                <div>
                  <label className="font-mono font-bold block mb-1">EVENT NAME</label>
                  <input
                    type="text"
                    value={editingEvent.name}
                    onChange={(e) => setEditingEvent({ ...editingEvent, name: e.target.value })}
                    className="w-full p-2.5 bg-neutral-50 border border-neutral-300 rounded"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="font-mono font-bold block mb-1">START DATE</label>
                    <input
                      type="date"
                      value={editingEvent.startDate}
                      onChange={(e) => setEditingEvent({ ...editingEvent, startDate: e.target.value })}
                      className="w-full p-2.5 bg-neutral-50 border border-neutral-300 rounded font-mono"
                    />
                  </div>
                  <div>
                    <label className="font-mono font-bold block mb-1">END DATE</label>
                    <input
                      type="date"
                      value={editingEvent.endDate}
                      onChange={(e) => setEditingEvent({ ...editingEvent, endDate: e.target.value })}
                      className="w-full p-2.5 bg-neutral-50 border border-neutral-300 rounded font-mono"
                    />
                  </div>
                </div>

                <div>
                  <label className="font-mono font-bold block mb-1">VENUE & LOCATION</label>
                  <input
                    type="text"
                    value={editingEvent.venue}
                    onChange={(e) => setEditingEvent({ ...editingEvent, venue: e.target.value })}
                    className="w-full p-2.5 bg-neutral-50 border border-neutral-300 rounded"
                  />
                </div>

                <div>
                  <label className="font-mono font-bold block mb-1">STATUS</label>
                  <select
                    value={editingEvent.status}
                    onChange={(e) => setEditingEvent({ ...editingEvent, status: e.target.value as any })}
                    className="w-full p-2.5 bg-neutral-50 border border-neutral-300 rounded font-mono font-bold"
                  >
                    <option value="UPCOMING">UPCOMING</option>
                    <option value="ONGOING">ONGOING</option>
                    <option value="COMPLETED">COMPLETED</option>
                  </select>
                </div>
              </div>

              <div className="flex items-center justify-end space-x-2 pt-2 border-t">
                <button
                  onClick={() => setEditingEvent(null)}
                  className="px-4 py-2 bg-neutral-100 rounded text-xs font-mono font-bold uppercase"
                >
                  CANCEL
                </button>
                <button
                  onClick={() => handleSaveEvent(editingEvent)}
                  className="px-6 py-2 bg-brand-red text-white rounded text-xs font-mono font-bold uppercase hover:bg-brand-black shadow"
                >
                  SAVE EVENT
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
