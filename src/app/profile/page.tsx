'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useAuth } from '@/lib/auth-context';
import DishCard from '@/components/ui/DishCard';
import { User, Bookmark, UploadCloud, Clock, CheckCircle2, XCircle, ShieldCheck, PlusCircle } from 'lucide-react';

export default function ProfilePage() {
  const { user, loading: authLoading } = useAuth();
  const [favorites, setFavorites] = useState<any[]>([]);
  const [contributions, setContributions] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState<'FAVORITES' | 'CONTRIBUTIONS'>('FAVORITES');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user && !authLoading) {
      window.location.href = '/auth/login';
      return;
    }

    if (user) {
      Promise.all([
        fetch('/api/favorites').then((r) => r.json()),
        fetch('/api/contributions').then((r) => r.json()),
      ])
        .then(([favData, contData]) => {
          if (favData.favorites) setFavorites(favData.favorites);
          if (contData.contributions) setContributions(contData.contributions);
        })
        .catch(console.error)
        .finally(() => setLoading(false));
    }
  }, [user, authLoading]);

  if (authLoading || (!user && loading)) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center text-xs text-neutral-500">
        Loading user profile...
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Profile Banner */}
      <div className="bg-white rounded-3xl border border-[#EADECA] p-6 sm:p-8 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#C84B31] to-[#FF7B54] text-white flex items-center justify-center font-serif font-bold text-2xl shadow-md">
            {user?.name[0]}
          </div>
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <h1 className="font-serif font-bold text-2xl text-[#1E1B18]">
                {user?.name}
              </h1>
              <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                user?.role === 'ADMIN' ? 'bg-[#2A9D8F] text-white' : 'bg-[#C84B31]/10 text-[#C84B31]'
              }`}>
                {user?.role}
              </span>
            </div>
            <p className="text-xs text-neutral-500 font-mono">{user?.email}</p>
            {user?.bio && <p className="text-xs text-neutral-700 italic pt-1">{user.bio}</p>}
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/contribute"
            className="px-4 py-2.5 rounded-xl bg-[#C84B31] hover:bg-[#A33B24] text-white text-xs font-bold transition-all shadow-xs flex items-center gap-1.5"
          >
            <PlusCircle className="w-4 h-4" />
            <span>New Contribution</span>
          </Link>
          {user?.role === 'ADMIN' && (
            <Link
              href="/admin"
              className="px-4 py-2.5 rounded-xl bg-[#2A9D8F] hover:bg-[#238276] text-white text-xs font-bold transition-all shadow-xs flex items-center gap-1.5"
            >
              <ShieldCheck className="w-4 h-4" />
              <span>Admin Portal</span>
            </Link>
          )}
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-3 border-b border-[#EADECA] pb-3">
        <button
          onClick={() => setActiveTab('FAVORITES')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            activeTab === 'FAVORITES'
              ? 'bg-[#C84B31] text-white shadow-xs'
              : 'text-[#1E1B18]/70 hover:bg-[#F5EFEB]'
          }`}
        >
          <Bookmark className="w-4 h-4" />
          <span>Bookmarked Dishes ({favorites.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('CONTRIBUTIONS')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            activeTab === 'CONTRIBUTIONS'
              ? 'bg-[#C84B31] text-white shadow-xs'
              : 'text-[#1E1B18]/70 hover:bg-[#F5EFEB]'
          }`}
        >
          <UploadCloud className="w-4 h-4" />
          <span>My Contributions ({contributions.length})</span>
        </button>
      </div>

      {/* Tab Content */}
      {activeTab === 'FAVORITES' && (
        <div>
          {favorites.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {favorites.map((fav) => (
                <DishCard key={fav.id} dish={fav.dish} initialFavorited={true} />
              ))}
            </div>
          ) : (
            <div className="p-12 text-center bg-white rounded-3xl border border-[#EADECA] space-y-3">
              <Bookmark className="w-10 h-10 text-neutral-300 mx-auto" />
              <h3 className="font-serif font-bold text-base text-[#1E1B18]">
                No Bookmarked Dishes Yet
              </h3>
              <p className="text-xs text-neutral-500 max-w-sm mx-auto">
                Explore the India Food Map or search heritage dishes and click the bookmark icon to curate your personal culinary archive.
              </p>
              <Link
                href="/explore"
                className="inline-block px-4 py-2 bg-[#C84B31] text-white rounded-xl text-xs font-bold"
              >
                Browse Heritage Dishes
              </Link>
            </div>
          )}
        </div>
      )}

      {activeTab === 'CONTRIBUTIONS' && (
        <div className="space-y-4">
          {contributions.length > 0 ? (
            contributions.map((c) => (
              <div
                key={c.id}
                className="bg-white rounded-2xl border border-[#EADECA] p-5 shadow-xs flex items-center justify-between gap-4"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded text-[10px] font-bold bg-[#F5EFEB] text-[#7A3E26] uppercase">
                      {c.type}
                    </span>
                    <span className="text-xs text-neutral-400">
                      {new Date(c.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  <h4 className="font-serif font-bold text-base text-[#1E1B18]">
                    {c.title}
                  </h4>
                  {c.adminNotes && (
                    <p className="text-xs text-neutral-600 bg-amber-50 p-2 rounded-lg border border-amber-200">
                      Curator note: {c.adminNotes}
                    </p>
                  )}
                </div>

                <div className="shrink-0">
                  {c.status === 'APPROVED' ? (
                    <span className="px-3 py-1 rounded-xl bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-bold flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      Published
                    </span>
                  ) : c.status === 'REJECTED' ? (
                    <span className="px-3 py-1 rounded-xl bg-red-50 text-red-700 border border-red-200 text-xs font-bold flex items-center gap-1.5">
                      <XCircle className="w-3.5 h-3.5" />
                      Revision Needed
                    </span>
                  ) : (
                    <span className="px-3 py-1 rounded-xl bg-amber-50 text-amber-800 border border-amber-200 text-xs font-bold flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5" />
                      Pending Review
                    </span>
                  )}
                </div>
              </div>
            ))
          ) : (
            <div className="p-12 text-center bg-white rounded-3xl border border-[#EADECA] space-y-3">
              <UploadCloud className="w-10 h-10 text-neutral-300 mx-auto" />
              <h3 className="font-serif font-bold text-base text-[#1E1B18]">
                No Submissions Yet
              </h3>
              <p className="text-xs text-neutral-500 max-w-sm mx-auto">
                Contribute traditional family recipes, grandmother memories, or indigenous ingredients to help preserve India&apos;s culinary heritage.
              </p>
              <Link
                href="/contribute"
                className="inline-block px-4 py-2 bg-[#C84B31] text-white rounded-xl text-xs font-bold"
              >
                Submit a Contribution
              </Link>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
