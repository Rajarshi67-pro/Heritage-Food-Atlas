'use client';

import React, { useState, useEffect } from 'react';
import { useAuth } from '@/lib/auth-context';
import {
  ShieldCheck,
  CheckCircle2,
  XCircle,
  Clock,
  BookOpen,
  Utensils,
  Mic,
  Layers,
  Users,
  Eye,
  PlusCircle,
  RefreshCw,
  AlertCircle,
} from 'lucide-react';

export default function AdminDashboardPage() {
  const { user, isAdmin, loading: authLoading } = useAuth();
  const [metrics, setMetrics] = useState<any>(null);
  const [popularDishes, setPopularDishes] = useState<any[]>([]);
  const [contributions, setContributions] = useState<any[]>([]);
  const [stories, setStories] = useState<any[]>([]);
  const [knowledgeDocs, setKnowledgeDocs] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState<'METRICS' | 'CONTRIBUTIONS' | 'STORIES' | 'KNOWLEDGE'>('METRICS');
  const [loading, setLoading] = useState(true);
  const [actionMessage, setActionMessage] = useState<string | null>(null);

  // New Knowledge Doc form state
  const [newDocTitle, setNewDocTitle] = useState('');
  const [newDocTopic, setNewDocTopic] = useState('Festival & Culture');
  const [newDocContent, setNewDocContent] = useState('');
  const [newDocSource, setNewDocSource] = useState('');
  const [newDocState, setNewDocState] = useState('National');

  const fetchData = async () => {
    setLoading(true);
    try {
      const [mRes, cRes, sRes, kRes] = await Promise.all([
        fetch('/api/admin/metrics'),
        fetch('/api/admin/contributions'),
        fetch('/api/admin/stories'),
        fetch('/api/admin/knowledge-base'),
      ]);

      if (mRes.ok) {
        const mData = await mRes.json();
        setMetrics(mData.metrics);
        setPopularDishes(mData.popularDishes || []);
      }
      if (cRes.ok) {
        const cData = await cRes.json();
        setContributions(cData.contributions || []);
      }
      if (sRes.ok) {
        const sData = await sRes.json();
        setStories(sData.stories || []);
      }
      if (kRes.ok) {
        const kData = await kRes.json();
        setKnowledgeDocs(kData.documents || []);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!authLoading && !isAdmin) {
      window.location.href = '/auth/login';
      return;
    }
    if (isAdmin) {
      fetchData();
    }
  }, [isAdmin, authLoading]);

  const handleModerateContribution = async (id: string, status: 'APPROVED' | 'REJECTED') => {
    try {
      const res = await fetch(`/api/admin/contributions/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      });
      if (res.ok) {
        setActionMessage(`Contribution #${id} successfully marked as ${status}`);
        fetchData();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleModerateStory = async (id: string, status: 'APPROVED' | 'REJECTED') => {
    try {
      const res = await fetch(`/api/admin/stories/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      });
      if (res.ok) {
        setActionMessage(`Oral Story #${id} successfully marked as ${status}`);
        fetchData();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleAddKnowledgeDoc = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/admin/knowledge-base', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: newDocTitle,
          topic: newDocTopic,
          content: newDocContent,
          source: newDocSource,
          state: newDocState,
        }),
      });
      if (res.ok) {
        setActionMessage('New archival document added to AI Storyteller RAG corpus!');
        setNewDocTitle('');
        setNewDocContent('');
        setNewDocSource('');
        fetchData();
      }
    } catch (err) {
      console.error(err);
    }
  };

  if (authLoading || loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center text-xs text-neutral-500">
        Loading curator admin portal...
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#EADECA]">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#2A9D8F] text-white flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5" />
              Senior Curator Portal
            </span>
          </div>
          <h1 className="font-serif font-bold text-3xl text-[#1E1B18] mt-1.5">
            Heritage Food Atlas — Admin & Moderation
          </h1>
          <p className="text-xs text-neutral-600 font-sans">
            Review community submissions, moderate oral histories, and manage the verified RAG knowledge base.
          </p>
        </div>

        <button
          onClick={fetchData}
          className="px-4 py-2 bg-white border border-[#EADECA] hover:border-[#C84B31] rounded-xl text-xs font-bold text-[#1E1B18] flex items-center gap-1.5"
        >
          <RefreshCw className="w-3.5 h-3.5 text-[#C84B31]" />
          <span>Refresh Data</span>
        </button>
      </div>

      {actionMessage && (
        <div className="p-3.5 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-800 flex items-center justify-between">
          <span>{actionMessage}</span>
          <button onClick={() => setActionMessage(null)} className="font-bold text-emerald-900">
            ✕
          </button>
        </div>
      )}

      {/* Admin Nav Tabs */}
      <div className="flex flex-wrap items-center gap-2 border-b border-[#EADECA] pb-3">
        <button
          onClick={() => setActiveTab('METRICS')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            activeTab === 'METRICS' ? 'bg-[#C84B31] text-white shadow-xs' : 'text-neutral-600 hover:bg-[#F5EFEB]'
          }`}
        >
          Overview & Metrics
        </button>

        <button
          onClick={() => setActiveTab('CONTRIBUTIONS')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
            activeTab === 'CONTRIBUTIONS' ? 'bg-[#C84B31] text-white shadow-xs' : 'text-neutral-600 hover:bg-[#F5EFEB]'
          }`}
        >
          <span>Community Submissions</span>
          {metrics?.pendingContributions > 0 && (
            <span className="px-1.5 py-0.2 rounded-full bg-amber-500 text-white text-[10px]">
              {metrics.pendingContributions}
            </span>
          )}
        </button>

        <button
          onClick={() => setActiveTab('STORIES')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
            activeTab === 'STORIES' ? 'bg-[#C84B31] text-white shadow-xs' : 'text-neutral-600 hover:bg-[#F5EFEB]'
          }`}
        >
          <span>Oral Histories Queue</span>
          {metrics?.pendingStories > 0 && (
            <span className="px-1.5 py-0.2 rounded-full bg-amber-500 text-white text-[10px]">
              {metrics.pendingStories}
            </span>
          )}
        </button>

        <button
          onClick={() => setActiveTab('KNOWLEDGE')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            activeTab === 'KNOWLEDGE' ? 'bg-[#C84B31] text-white shadow-xs' : 'text-neutral-600 hover:bg-[#F5EFEB]'
          }`}
        >
          AI Knowledge Base (RAG)
        </button>
      </div>

      {/* Tab 1: Overview Metrics */}
      {activeTab === 'METRICS' && metrics && (
        <div className="space-y-8">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            <div className="p-4 bg-white rounded-2xl border border-[#EADECA] shadow-xs">
              <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider block">
                Dishes
              </span>
              <span className="font-serif font-bold text-2xl text-[#C84B31] mt-1 block">
                {metrics.totalDishes}
              </span>
            </div>

            <div className="p-4 bg-white rounded-2xl border border-[#EADECA] shadow-xs">
              <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider block">
                States Covered
              </span>
              <span className="font-serif font-bold text-2xl text-[#2A9D8F] mt-1 block">
                {metrics.totalStates}
              </span>
            </div>

            <div className="p-4 bg-white rounded-2xl border border-[#EADECA] shadow-xs">
              <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider block">
                Ingredients
              </span>
              <span className="font-serif font-bold text-2xl text-[#7A3E26] mt-1 block">
                {metrics.totalIngredients}
              </span>
            </div>

            <div className="p-4 bg-white rounded-2xl border border-[#EADECA] shadow-xs">
              <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider block">
                Oral Stories
              </span>
              <span className="font-serif font-bold text-2xl text-[#FF7B54] mt-1 block">
                {metrics.totalStories}
              </span>
            </div>

            <div className="p-4 bg-white rounded-2xl border border-[#EADECA] shadow-xs">
              <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider block">
                Pending Reviews
              </span>
              <span className="font-serif font-bold text-2xl text-amber-600 mt-1 block">
                {metrics.pendingContributions + metrics.pendingStories}
              </span>
            </div>

            <div className="p-4 bg-white rounded-2xl border border-[#EADECA] shadow-xs">
              <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider block">
                Registered Users
              </span>
              <span className="font-serif font-bold text-2xl text-[#1A2E40] mt-1 block">
                {metrics.totalUsers}
              </span>
            </div>
          </div>

          {/* Popular Dishes */}
          <div className="bg-white rounded-3xl border border-[#EADECA] p-6 space-y-4">
            <h3 className="font-serif font-bold text-lg text-[#1E1B18] flex items-center gap-2">
              <Eye className="w-5 h-5 text-[#C84B31]" />
              Most Explored Heritage Dishes
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {popularDishes.map((dish) => (
                <div
                  key={dish.id}
                  className="p-3.5 rounded-2xl bg-[#FDFBF7] border border-[#EADECA] flex items-center justify-between"
                >
                  <div>
                    <h4 className="font-serif font-bold text-xs text-[#1E1B18]">{dish.name}</h4>
                    <p className="text-[10px] text-neutral-500">{dish.cuisineType} Cuisine</p>
                  </div>
                  <span className="text-xs font-mono font-bold text-[#C84B31]">
                    {dish.viewsCount} views
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Community Submissions Moderation */}
      {activeTab === 'CONTRIBUTIONS' && (
        <div className="space-y-4">
          <h3 className="font-serif font-bold text-lg text-[#1E1B18]">
            Submissions Moderation Queue ({contributions.length})
          </h3>

          {contributions.length > 0 ? (
            contributions.map((c) => (
              <div
                key={c.id}
                className="bg-white rounded-2xl border border-[#EADECA] p-5 shadow-xs space-y-3"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="px-2.5 py-0.5 rounded text-[10px] font-bold bg-[#F5EFEB] text-[#7A3E26]">
                        {c.type}
                      </span>
                      <span className="text-xs text-neutral-400">
                        Submitted by {c.user?.name} ({c.user?.email}) on{' '}
                        {new Date(c.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                    <h4 className="font-serif font-bold text-base text-[#1E1B18] mt-1">
                      {c.title}
                    </h4>
                  </div>

                  <div className="flex items-center gap-2">
                    {c.status === 'PENDING' ? (
                      <>
                        <button
                          onClick={() => handleModerateContribution(c.id, 'APPROVED')}
                          className="px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold flex items-center gap-1 shadow-xs"
                        >
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>Approve</span>
                        </button>
                        <button
                          onClick={() => handleModerateContribution(c.id, 'REJECTED')}
                          className="px-3 py-1.5 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-bold flex items-center gap-1 shadow-xs"
                        >
                          <XCircle className="w-3.5 h-3.5" />
                          <span>Reject</span>
                        </button>
                      </>
                    ) : (
                      <span className={`px-3 py-1 rounded-xl text-xs font-bold ${
                        c.status === 'APPROVED' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-red-50 text-red-700 border border-red-200'
                      }`}>
                        {c.status}
                      </span>
                    )}
                  </div>
                </div>

                <div className="p-3 bg-[#FDFBF7] rounded-xl border border-[#EADECA] text-xs font-mono text-neutral-700 overflow-x-auto">
                  <pre>{JSON.stringify(JSON.parse(c.dataPayload || '{}'), null, 2)}</pre>
                </div>
              </div>
            ))
          ) : (
            <div className="p-8 text-center bg-white rounded-2xl border border-[#EADECA] text-xs text-neutral-500">
              No submissions in queue.
            </div>
          )}
        </div>
      )}

      {/* Tab 3: Oral Histories Moderation */}
      {activeTab === 'STORIES' && (
        <div className="space-y-4">
          <h3 className="font-serif font-bold text-lg text-[#1E1B18]">
            Grandparent Oral Histories Queue ({stories.length})
          </h3>

          {stories.length > 0 ? (
            stories.map((s) => (
              <div
                key={s.id}
                className="bg-white rounded-2xl border border-[#EADECA] p-5 shadow-xs space-y-3"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#7A3E26] text-white">
                        {s.generation}
                      </span>
                      <span className="text-xs text-neutral-500 font-medium">
                        • Narrated by {s.storytellerName} ({s.location})
                      </span>
                    </div>
                    <h4 className="font-serif font-bold text-base text-[#1E1B18] mt-1">
                      {s.title}
                    </h4>
                  </div>

                  <div className="flex items-center gap-2">
                    {s.status === 'PENDING' ? (
                      <>
                        <button
                          onClick={() => handleModerateStory(s.id, 'APPROVED')}
                          className="px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold flex items-center gap-1 shadow-xs"
                        >
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>Approve</span>
                        </button>
                        <button
                          onClick={() => handleModerateStory(s.id, 'REJECTED')}
                          className="px-3 py-1.5 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-bold flex items-center gap-1 shadow-xs"
                        >
                          <XCircle className="w-3.5 h-3.5" />
                          <span>Reject</span>
                        </button>
                      </>
                    ) : (
                      <span className={`px-3 py-1 rounded-xl text-xs font-bold ${
                        s.status === 'APPROVED' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-red-50 text-red-700 border border-red-200'
                      }`}>
                        {s.status}
                      </span>
                    )}
                  </div>
                </div>

                <p className="text-xs text-neutral-700 font-serif italic bg-[#FDFBF7] p-3 rounded-xl border border-[#EADECA]">
                  &ldquo;{s.content}&rdquo;
                </p>
              </div>
            ))
          ) : (
            <div className="p-8 text-center bg-white rounded-2xl border border-[#EADECA] text-xs text-neutral-500">
              No oral stories in queue.
            </div>
          )}
        </div>
      )}

      {/* Tab 4: AI Knowledge Base */}
      {activeTab === 'KNOWLEDGE' && (
        <div className="space-y-8">
          <div className="bg-white rounded-3xl border border-[#EADECA] p-6 space-y-4">
            <h3 className="font-serif font-bold text-lg text-[#1E1B18] flex items-center gap-2">
              <PlusCircle className="w-5 h-5 text-[#2A9D8F]" />
              Add Verified Archival Document to RAG Corpus
            </h3>

            <form onSubmit={handleAddKnowledgeDoc} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="sm:col-span-2">
                  <label className="text-xs font-bold text-[#1E1B18] block mb-1">Document Title *</label>
                  <input
                    type="text"
                    required
                    value={newDocTitle}
                    onChange={(e) => setNewDocTitle(e.target.value)}
                    placeholder="e.g. The Epigraphic History of Pongal Boiling Rites"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#EADECA] text-xs"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-[#1E1B18] block mb-1">Topic Category</label>
                  <select
                    value={newDocTopic}
                    onChange={(e) => setNewDocTopic(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#EADECA] text-xs"
                  >
                    <option value="History">History & Origins</option>
                    <option value="Festival & Culture">Festival & Culture</option>
                    <option value="Fermentation & Science">Fermentation & Nutrition</option>
                    <option value="Philosophy">Ayurvedic Philosophy</option>
                    <option value="GI Tag">GI Tag & Protection</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-[#1E1B18] block mb-1">Verified Archival Content *</label>
                <textarea
                  required
                  rows={4}
                  value={newDocContent}
                  onChange={(e) => setNewDocContent(e.target.value)}
                  placeholder="Paste historical analysis, temple epigraphy notes, literature excerpts..."
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#EADECA] text-xs"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-[#1E1B18] block mb-1">Primary Source Reference *</label>
                  <input
                    type="text"
                    required
                    value={newDocSource}
                    onChange={(e) => setNewDocSource(e.target.value)}
                    placeholder="e.g. Archaeological Survey of India; Chola Epigraphs Vol. 4"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#EADECA] text-xs"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-[#1E1B18] block mb-1">State / Region</label>
                  <input
                    type="text"
                    value={newDocState}
                    onChange={(e) => setNewDocState(e.target.value)}
                    placeholder="e.g. Tamil Nadu, West Bengal, National"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#EADECA] text-xs"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="px-5 py-2.5 rounded-xl bg-[#2A9D8F] hover:bg-[#238276] text-white text-xs font-bold shadow-sm"
              >
                Save to RAG Knowledge Corpus
              </button>
            </form>
          </div>

          <div className="space-y-4">
            <h3 className="font-serif font-bold text-lg text-[#1E1B18]">
              Existing Grounded RAG Documents ({knowledgeDocs.length})
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {knowledgeDocs.map((doc) => (
                <div
                  key={doc.id}
                  className="bg-white rounded-2xl border border-[#EADECA] p-5 shadow-xs space-y-2.5"
                >
                  <div className="flex items-center justify-between">
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#F5EFEB] text-[#2A9D8F]">
                      {doc.topic}
                    </span>
                    <span className="text-[10px] text-neutral-400">{doc.state || 'National'}</span>
                  </div>
                  <h4 className="font-serif font-bold text-sm text-[#1E1B18]">{doc.title}</h4>
                  <p className="text-xs text-neutral-600 line-clamp-3 leading-relaxed">
                    {doc.content}
                  </p>
                  <span className="text-[10px] text-neutral-400 block pt-1 border-t border-[#F5EFEB]">
                    Source: {doc.source}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
