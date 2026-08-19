import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { X, Search, Download, Check, MessageCircle, Phone, Mail } from 'lucide-react';
import { getStoredLeads, updateLeadStatus, getStoredSettings, saveSettings } from '../../data/cmsConfig';
import { projectsData } from '../../data/projectsData';
import type { LeadSubmission, LeadStatus, CompanySettings } from '../../types/crm';

interface AdminDashboardProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<'leads' | 'cms' | 'settings'>('leads');
  const [leads, setLeads] = useState<LeadSubmission[]>([]);
  const [selectedLead, setSelectedLead] = useState<LeadSubmission | null>(null);
  const [statusFilter, setStatusFilter] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [leadNotes, setLeadNotes] = useState<string>('');
  const [settings, setSettings] = useState<CompanySettings>(getStoredSettings());
  const [settingsSaved, setSettingsSaved] = useState(false);

  useEffect(() => {
    if (isOpen) {
      const loaded = getStoredLeads();
      setLeads(loaded);
      if (loaded.length > 0) {
        setSelectedLead(loaded[0]);
        setLeadNotes(loaded[0].internalNotes || '');
      }
      setSettings(getStoredSettings());
    }
  }, [isOpen]);

  if (!isOpen) return null;

  // Filter Leads
  const filteredLeads = leads.filter((lead) => {
    const matchesStatus = statusFilter === 'ALL' || lead.status === statusFilter;
    const matchesSearch =
      searchQuery === '' ||
      lead.contactName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (lead.contactCompany && lead.contactCompany.toLowerCase().includes(searchQuery.toLowerCase())) ||
      lead.contactEmail.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lead.contactPhone.includes(searchQuery) ||
      lead.projectType.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const handleStatusChange = (id: string, newStatus: LeadStatus) => {
    const updated = updateLeadStatus(id, newStatus, leadNotes);
    setLeads(updated);
    if (selectedLead && selectedLead.id === id) {
      setSelectedLead({ ...selectedLead, status: newStatus, internalNotes: leadNotes });
    }
  };

  const handleSaveNotes = () => {
    if (!selectedLead) return;
    const updated = updateLeadStatus(selectedLead.id, selectedLead.status, leadNotes);
    setLeads(updated);
    setSelectedLead({ ...selectedLead, internalNotes: leadNotes });
  };

  // Export CSV
  const handleExportCSV = () => {
    const headers = ['ID', 'Date', 'Name', 'Company', 'Email', 'Phone', 'Project Type', 'Specific Type', 'Location', 'Timeline', 'Budget', 'Urgency', 'Size', 'Status', 'Source', 'Notes'];
    const rows = filteredLeads.map((l) => [
      l.id,
      l.createdAt,
      `"${l.contactName}"`,
      `"${l.contactCompany || ''}"`,
      l.contactEmail,
      `"${l.contactPhone}"`,
      `"${l.projectType}"`,
      `"${l.specificType || ''}"`,
      `"${l.location}"`,
      `"${l.timeline}"`,
      `"${l.budgetRange}"`,
      l.urgency,
      l.leadSize,
      l.status,
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
  };

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    saveSettings(settings);
    setSettingsSaved(true);
    setTimeout(() => setSettingsSaved(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 bg-neutral-900/95 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 overflow-hidden">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="w-full max-w-7xl h-[94vh] bg-white rounded-card shadow-2xl flex flex-col overflow-hidden border border-neutral-200"
      >
        {/* Admin Header */}
        <div className="px-6 py-4 bg-brand-black text-white flex items-center justify-between border-b border-neutral-800 flex-shrink-0">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2.5">
              <img src="/logo.png" alt="Logo" className="w-7 h-7 object-contain rounded-full" />
              <span className="font-display font-black text-lg tracking-tight uppercase">
                CDesign Admin & Lead CRM
              </span>
            </div>

            {/* Nav Tabs */}
            <div className="hidden sm:flex items-center space-x-1 bg-neutral-800 p-1 rounded-subtle text-xs font-mono">
              <button
                onClick={() => setActiveTab('leads')}
                className={`px-3 py-1.5 rounded-subtle font-bold uppercase transition-colors ${
                  activeTab === 'leads' ? 'bg-brand-red text-white' : 'text-neutral-300 hover:text-white'
                }`}
              >
                LEAD PIPELINE ({leads.length})
              </button>
              <button
                onClick={() => setActiveTab('cms')}
                className={`px-3 py-1.5 rounded-subtle font-bold uppercase transition-colors ${
                  activeTab === 'cms' ? 'bg-brand-red text-white' : 'text-neutral-300 hover:text-white'
                }`}
              >
                PROJECT CATALOG ({projectsData.length})
              </button>
              <button
                onClick={() => setActiveTab('settings')}
                className={`px-3 py-1.5 rounded-subtle font-bold uppercase transition-colors ${
                  activeTab === 'settings' ? 'bg-brand-red text-white' : 'text-neutral-300 hover:text-white'
                }`}
              >
                COMPANY SETTINGS
              </button>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <button
              onClick={onClose}
              className="p-2 rounded bg-neutral-800 hover:bg-brand-red text-white transition-colors"
              aria-label="Close Admin"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Tab 1: Leads Pipeline */}
        {activeTab === 'leads' && (
          <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
            {/* Left Column: Leads List & Filters */}
            <div className="lg:w-1/2 flex flex-col border-r border-neutral-200 bg-neutral-50 overflow-hidden">
              {/* Search & Status Filters */}
              <div className="p-4 border-b border-neutral-200 space-y-3 bg-white">
                <div className="flex items-center justify-between gap-2">
                  <div className="relative flex-1">
                    <Search className="w-4 h-4 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      placeholder="Search leads by name, company, phone, email..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-9 pr-3 py-2 text-xs bg-neutral-100 border border-neutral-200 rounded focus:bg-white focus:border-brand-red outline-none"
                    />
                  </div>

                  <button
                    onClick={handleExportCSV}
                    className="flex items-center space-x-1.5 px-3 py-2 bg-neutral-900 text-white rounded text-xs font-mono font-bold hover:bg-brand-red transition-colors flex-shrink-0"
                    title="Export CSV"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">EXPORT CSV</span>
                  </button>
                </div>

                {/* Status Chips */}
                <div className="flex items-center space-x-1.5 overflow-x-auto pb-1 text-[11px] font-mono scrollbar-none">
                  {['ALL', 'NEW', 'QUALIFIED', 'PROPOSAL SENT', 'WON', 'LOST'].map((st) => (
                    <button
                      key={st}
                      onClick={() => setStatusFilter(st)}
                      className={`px-2.5 py-1 rounded-full whitespace-nowrap font-bold uppercase ${
                        statusFilter === st
                          ? 'bg-brand-black text-white'
                          : 'bg-neutral-200 text-neutral-700 hover:bg-neutral-300'
                      }`}
                    >
                      {st}
                    </button>
                  ))}
                </div>
              </div>

              {/* Leads Feed */}
              <div className="flex-1 overflow-y-auto divide-y divide-neutral-200">
                {filteredLeads.length === 0 ? (
                  <div className="p-10 text-center text-xs text-neutral-500">
                    No leads matching criteria.
                  </div>
                ) : (
                  filteredLeads.map((lead) => {
                    const isSelected = selectedLead?.id === lead.id;
                    return (
                      <div
                        key={lead.id}
                        onClick={() => {
                          setSelectedLead(lead);
                          setLeadNotes(lead.internalNotes || '');
                        }}
                        className={`p-4 cursor-pointer transition-all ${
                          isSelected ? 'bg-white border-l-4 border-brand-red shadow-sm' : 'hover:bg-white/80'
                        }`}
                      >
                        <div className="flex items-start justify-between">
                          <div>
                            <span className="text-[10px] font-mono font-bold text-neutral-400">
                              {lead.id} · {lead.createdAt}
                            </span>
                            <h4 className="font-display text-sm font-bold text-brand-black mt-0.5">
                              {lead.contactName}
                              {lead.contactCompany && (
                                <span className="font-normal text-neutral-600 ml-1.5">
                                  ({lead.contactCompany})
                                </span>
                              )}
                            </h4>
                          </div>

                          <span className={`px-2 py-0.5 rounded text-[9px] font-mono font-bold uppercase ${
                            lead.status === 'NEW' ? 'bg-brand-red text-white' :
                            lead.status === 'QUALIFIED' ? 'bg-blue-600 text-white' :
                            lead.status === 'PROPOSAL SENT' ? 'bg-amber-500 text-white' :
                            lead.status === 'WON' ? 'bg-emerald-600 text-white' : 'bg-neutral-300 text-neutral-800'
                          }`}>
                            {lead.status}
                          </span>
                        </div>

                        <div className="mt-2 flex flex-wrap items-center gap-2 text-[10px] font-mono text-neutral-600">
                          <span className="bg-neutral-200 px-1.5 py-0.5 rounded font-bold text-neutral-800">
                            {lead.projectType}
                          </span>
                          <span>·</span>
                          <span>{lead.location}</span>
                          <span>·</span>
                          <span className="font-bold text-brand-red">{lead.budgetRange}</span>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </div>

            {/* Right Column: Lead Dossier Details */}
            <div className="lg:w-1/2 p-6 overflow-y-auto bg-white space-y-6">
              {selectedLead ? (
                <>
                  <div className="flex items-center justify-between border-b border-neutral-200 pb-4">
                    <div>
                      <span className="text-[10px] font-mono text-neutral-400 font-bold uppercase">LEAD DOSSIER</span>
                      <h3 className="font-display text-2xl font-black uppercase text-brand-black">
                        {selectedLead.contactName}
                      </h3>
                      <p className="text-xs text-neutral-600 font-medium">
                        {selectedLead.contactCompany || 'Private Individual / Direct Lead'}
                      </p>
                    </div>

                    {/* Status Changer */}
                    <div className="flex flex-col items-end space-y-1">
                      <span className="text-[10px] font-mono text-neutral-400">CHANGE STATUS</span>
                      <select
                        value={selectedLead.status}
                        onChange={(e) => handleStatusChange(selectedLead.id, e.target.value as LeadStatus)}
                        className="text-xs font-mono font-bold p-1.5 border border-neutral-300 rounded bg-white outline-none focus:border-brand-red"
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
                  </div>

                  {/* Direct Contact Actions */}
                  <div className="grid grid-cols-3 gap-2">
                    <a
                      href={`https://wa.me/${selectedLead.contactPhone.replace(/[^0-9]/g, '')}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 bg-[#25D366] text-white rounded text-xs font-bold uppercase flex items-center justify-center space-x-1.5 shadow-sm active:scale-95 transition-transform"
                    >
                      <MessageCircle className="w-4 h-4 fill-current" />
                      <span>WHATSAPP</span>
                    </a>

                    <a
                      href={`tel:${selectedLead.contactPhone}`}
                      className="p-3 bg-neutral-900 text-white rounded text-xs font-bold uppercase flex items-center justify-center space-x-1.5 shadow-sm active:scale-95 transition-transform"
                    >
                      <Phone className="w-4 h-4" />
                      <span>CALL</span>
                    </a>

                    <a
                      href={`mailto:${selectedLead.contactEmail}`}
                      className="p-3 bg-neutral-100 text-neutral-900 border border-neutral-300 rounded text-xs font-bold uppercase flex items-center justify-center space-x-1.5 active:scale-95 transition-transform"
                    >
                      <Mail className="w-4 h-4" />
                      <span>EMAIL</span>
                    </a>
                  </div>

                  {/* Parameter Grid */}
                  <div className="grid grid-cols-2 gap-3 text-xs bg-brand-light p-4 rounded-card border border-neutral-200">
                    <div>
                      <span className="font-mono text-neutral-400 text-[10px] block">DISCIPLINE</span>
                      <strong className="text-brand-black">{selectedLead.projectType}</strong>
                    </div>
                    <div>
                      <span className="font-mono text-neutral-400 text-[10px] block">SPECIFIC FORMAT</span>
                      <strong className="text-brand-black">{selectedLead.specificType || 'N/A'}</strong>
                    </div>
                    <div>
                      <span className="font-mono text-neutral-400 text-[10px] block">LOCATION</span>
                      <strong className="text-brand-black">{selectedLead.location}</strong>
                    </div>
                    <div>
                      <span className="font-mono text-neutral-400 text-[10px] block">TIMELINE</span>
                      <strong className="text-brand-black">{selectedLead.timeline}</strong>
                    </div>
                    <div>
                      <span className="font-mono text-neutral-400 text-[10px] block">BUDGET RANGE</span>
                      <strong className="text-brand-red font-bold">{selectedLead.budgetRange}</strong>
                    </div>
                    <div>
                      <span className="font-mono text-neutral-400 text-[10px] block">LEAD CLASSIFICATION</span>
                      <span className="font-mono text-[11px] font-bold">{selectedLead.leadSize} · {selectedLead.urgency}</span>
                    </div>
                  </div>

                  {/* Project Details */}
                  {selectedLead.details && (
                    <div className="space-y-1 text-xs">
                      <span className="font-mono text-neutral-400 text-[10px] uppercase font-bold">CLIENT BRIEF / NOTES</span>
                      <div className="p-3 bg-neutral-50 rounded border border-neutral-200 text-neutral-800 leading-relaxed font-medium">
                        "{selectedLead.details}"
                      </div>
                    </div>
                  )}

                  {/* Internal Notes Editor */}
                  <div className="space-y-2 text-xs pt-2">
                    <span className="font-mono text-neutral-400 text-[10px] uppercase font-bold">INTERNAL EXECUTIVE NOTES</span>
                    <textarea
                      rows={3}
                      value={leadNotes}
                      onChange={(e) => setLeadNotes(e.target.value)}
                      placeholder="Add executive production notes, proposal versions, call outcomes..."
                      className="w-full p-3 bg-neutral-50 border border-neutral-300 rounded focus:bg-white focus:border-brand-red outline-none"
                    />
                    <button
                      onClick={handleSaveNotes}
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

        {/* Tab 2: CMS Project Catalog */}
        {activeTab === 'cms' && (
          <div className="flex-1 p-6 overflow-y-auto space-y-6">
            <div className="flex items-center justify-between border-b border-neutral-200 pb-4">
              <div>
                <span className="text-xs font-mono font-bold text-brand-red uppercase">PROJECT MANAGEMENT</span>
                <h3 className="font-display text-2xl font-black uppercase text-brand-black">PUBLISHED CASE STUDIES</h3>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projectsData.map((project) => (
                <div key={project.id} className="border border-neutral-200 rounded-card overflow-hidden bg-neutral-50 flex flex-col justify-between">
                  <div className="h-40 relative">
                    <img src={project.heroImage} alt={project.title} className="w-full h-full object-cover" />
                    <span className="absolute top-2 left-2 bg-brand-red text-white text-[9px] font-mono px-2 py-0.5 rounded font-bold uppercase">
                      {project.category}
                    </span>
                    <span className="absolute top-2 right-2 bg-black/60 text-white text-[9px] font-mono px-2 py-0.5 rounded">
                      {project.year}
                    </span>
                  </div>

                  <div className="p-4 space-y-2 flex-1">
                    <h4 className="font-display text-base font-bold uppercase text-brand-black">{project.title}</h4>
                    <p className="text-xs text-neutral-600 line-clamp-2">{project.subtitle}</p>
                    <div className="pt-2 text-[10px] font-mono text-neutral-500">
                      SEO SLUG: /projects/{project.id}
                    </div>
                  </div>

                  <div className="p-3 border-t border-neutral-200 bg-white flex items-center justify-between text-xs font-mono">
                    <span className="text-emerald-600 font-bold">● PUBLISHED</span>
                    <span className="text-neutral-500">{project.deliverables.length} Deliverables</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 3: Company Settings */}
        {activeTab === 'settings' && (
          <div className="flex-1 p-6 sm:p-10 overflow-y-auto">
            <form onSubmit={handleSaveSettings} className="max-w-3xl space-y-6">
              <div className="border-b border-neutral-200 pb-4 flex items-center justify-between">
                <div>
                  <span className="text-xs font-mono font-bold text-brand-red uppercase">SYSTEM CONFIG</span>
                  <h3 className="font-display text-2xl font-black uppercase text-brand-black">GLOBAL COMPANY & SEO SETTINGS</h3>
                </div>

                {settingsSaved && (
                  <span className="px-3 py-1 bg-emerald-100 text-emerald-800 text-xs font-mono font-bold rounded flex items-center space-x-1">
                    <Check className="w-3.5 h-3.5" />
                    <span>SAVED TO CMS</span>
                  </span>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div>
                  <label className="font-mono font-bold uppercase text-neutral-600 block mb-1">COMPANY NAME</label>
                  <input
                    type="text"
                    value={settings.companyName}
                    onChange={(e) => setSettings({ ...settings, companyName: e.target.value })}
                    className="w-full p-2.5 bg-neutral-50 border border-neutral-300 rounded focus:border-brand-red outline-none"
                  />
                </div>

                <div>
                  <label className="font-mono font-bold uppercase text-neutral-600 block mb-1">LEGAL ENTITY</label>
                  <input
                    type="text"
                    value={settings.legalName}
                    onChange={(e) => setSettings({ ...settings, legalName: e.target.value })}
                    className="w-full p-2.5 bg-neutral-50 border border-neutral-300 rounded focus:border-brand-red outline-none"
                  />
                </div>

                <div>
                  <label className="font-mono font-bold uppercase text-neutral-600 block mb-1">OFFICIAL EMAIL</label>
                  <input
                    type="email"
                    value={settings.officialEmail}
                    onChange={(e) => setSettings({ ...settings, officialEmail: e.target.value })}
                    className="w-full p-2.5 bg-neutral-50 border border-neutral-300 rounded focus:border-brand-red outline-none"
                  />
                </div>

                <div>
                  <label className="font-mono font-bold uppercase text-neutral-600 block mb-1">TELEPHONE / HOTLINE</label>
                  <input
                    type="text"
                    value={settings.phone}
                    onChange={(e) => setSettings({ ...settings, phone: e.target.value })}
                    className="w-full p-2.5 bg-neutral-50 border border-neutral-300 rounded focus:border-brand-red outline-none"
                  />
                </div>

                <div>
                  <label className="font-mono font-bold uppercase text-neutral-600 block mb-1">WHATSAPP NUMBER (NO SPACES)</label>
                  <input
                    type="text"
                    value={settings.whatsappNumber}
                    onChange={(e) => setSettings({ ...settings, whatsappNumber: e.target.value })}
                    className="w-full p-2.5 bg-neutral-50 border border-neutral-300 rounded focus:border-brand-red outline-none font-mono"
                  />
                </div>

                <div>
                  <label className="font-mono font-bold uppercase text-neutral-600 block mb-1">WHATSAPP DISPLAY TEXT</label>
                  <input
                    type="text"
                    value={settings.whatsappDisplay}
                    onChange={(e) => setSettings({ ...settings, whatsappDisplay: e.target.value })}
                    className="w-full p-2.5 bg-neutral-50 border border-neutral-300 rounded focus:border-brand-red outline-none"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="font-mono font-bold uppercase text-neutral-600 block mb-1">HEADQUARTERS ADDRESS</label>
                  <input
                    type="text"
                    value={settings.address}
                    onChange={(e) => setSettings({ ...settings, address: e.target.value })}
                    className="w-full p-2.5 bg-neutral-50 border border-neutral-300 rounded focus:border-brand-red outline-none"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="font-mono font-bold uppercase text-neutral-600 block mb-1">BRAND POSITIONING STATEMENT</label>
                  <textarea
                    rows={2}
                    value={settings.tagline}
                    onChange={(e) => setSettings({ ...settings, tagline: e.target.value })}
                    className="w-full p-2.5 bg-neutral-50 border border-neutral-300 rounded focus:border-brand-red outline-none"
                  />
                </div>
              </div>

              <div className="pt-4">
                <button
                  type="submit"
                  className="px-6 py-3 bg-brand-red text-white text-xs font-bold uppercase tracking-wider rounded shadow-md hover:bg-brand-black transition-colors"
                >
                  SAVE ALL SETTINGS
                </button>
              </div>
            </form>
          </div>
        )}
      </motion.div>
    </div>
  );
};
