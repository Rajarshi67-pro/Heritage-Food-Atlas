'use client';

import React, { useState, useEffect, useCallback, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import DishCard from '@/components/ui/DishCard';
import { Search, Filter, RotateCcw, Sparkles, ShieldCheck, Layers, Utensils } from 'lucide-react';

function ExploreContent() {
  const searchParams = useSearchParams();
  const initialState = searchParams.get('state') || 'ALL';
  const initialSearch = searchParams.get('search') || '';

  const [search, setSearch] = useState(initialSearch);
  const [selectedState, setSelectedState] = useState(initialState);
  const [selectedCuisine, setSelectedCuisine] = useState('ALL');
  const [selectedCategory, setSelectedCategory] = useState('ALL');
  const [selectedSeason, setSelectedSeason] = useState('ALL');
  const [giOnly, setGiOnly] = useState(false);
  const [verifiedOnly, setVerifiedOnly] = useState(false);

  const [dishes, setDishes] = useState<any[]>([]);
  const [statesList, setStatesList] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch states for dropdown
  useEffect(() => {
    fetch('/api/regions/map-data')
      .then((res) => res.json())
      .then((data) => {
        if (data.states) setStatesList(data.states);
      })
      .catch(console.error);
  }, []);

  const fetchDishes = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (search.trim()) params.set('search', search.trim());
      if (selectedState !== 'ALL') params.set('state', selectedState);
      if (selectedCuisine !== 'ALL') params.set('cuisine', selectedCuisine);
      if (selectedCategory !== 'ALL') params.set('category', selectedCategory);
      if (selectedSeason !== 'ALL') params.set('season', selectedSeason);
      if (giOnly) params.set('giOnly', 'true');
      if (verifiedOnly) params.set('verifiedOnly', 'true');

      const res = await fetch(`/api/dishes?${params.toString()}`);
      if (res.ok) {
        const data = await res.json();
        setDishes(data.dishes || []);
      }
    } catch (err) {
      console.error('Error searching dishes:', err);
    } finally {
      setLoading(false);
    }
  }, [search, selectedState, selectedCuisine, selectedCategory, selectedSeason, giOnly, verifiedOnly]);

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchDishes();
    }, 250);
    return () => clearTimeout(timer);
  }, [fetchDishes]);

  const resetFilters = () => {
    setSearch('');
    setSelectedState('ALL');
    setSelectedCuisine('ALL');
    setSelectedCategory('ALL');
    setSelectedSeason('ALL');
    setGiOnly(false);
    setVerifiedOnly(false);
  };

  const categories = ['ALL', 'Main', 'Dessert', 'Festival Food', 'Staple', 'Beverage', 'Street Food', 'Snack'];
  const seasons = ['ALL', 'Winter', 'Summer', 'Monsoon', 'Harvest', 'All Season'];
  const cuisines = ['ALL', 'Bengali', 'Odia', 'Assamese', 'Tamil Nadu', 'Kerala', 'Karnataka', 'Rajasthani', 'Punjabi', 'Bihari', 'Maharashtrian', 'Gujarati', 'Kashmiri', 'Hyderabadi'];

  return (
    <div className="space-y-8">
      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by dish name, state, ingredient (e.g. rice, patishapta, onam, mustard oil)..."
          className="w-full pl-12 pr-4 py-4 rounded-2xl border border-[#EADECA] bg-white text-sm text-[#1E1B18] placeholder:text-neutral-400 focus:outline-hidden focus:border-[#C84B31] shadow-xs transition-all"
        />
      </div>

      {/* Multi-Filter Toolbar */}
      <div className="bg-[#F5EFEB] border border-[#EADECA] rounded-2xl p-5 space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-[#7A3E26] flex items-center gap-1.5 uppercase tracking-wider">
            <Filter className="w-3.5 h-3.5" />
            Heritage Filters
          </span>
          <button
            onClick={resetFilters}
            className="text-xs font-semibold text-[#C84B31] hover:underline flex items-center gap-1"
          >
            <RotateCcw className="w-3 h-3" />
            Reset All
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
          {/* State */}
          <div>
            <label className="text-[11px] font-bold text-neutral-600 block mb-1">State / UT</label>
            <select
              value={selectedState}
              onChange={(e) => setSelectedState(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-[#EADECA] bg-white text-xs text-[#1E1B18] focus:border-[#C84B31]"
            >
              <option value="ALL">All States of India</option>
              {statesList.map((st) => (
                <option key={st.code} value={st.code}>
                  {st.name}
                </option>
              ))}
            </select>
          </div>

          {/* Cuisine */}
          <div>
            <label className="text-[11px] font-bold text-neutral-600 block mb-1">Cuisine Lineage</label>
            <select
              value={selectedCuisine}
              onChange={(e) => setSelectedCuisine(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-[#EADECA] bg-white text-xs text-[#1E1B18] focus:border-[#C84B31]"
            >
              {cuisines.map((c) => (
                <option key={c} value={c}>
                  {c === 'ALL' ? 'All Cuisines' : `${c} Cuisine`}
                </option>
              ))}
            </select>
          </div>

          {/* Food Category */}
          <div>
            <label className="text-[11px] font-bold text-neutral-600 block mb-1">Course / Category</label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-[#EADECA] bg-white text-xs text-[#1E1B18] focus:border-[#C84B31]"
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat === 'ALL' ? 'All Categories' : cat}
                </option>
              ))}
            </select>
          </div>

          {/* Seasonality */}
          <div>
            <label className="text-[11px] font-bold text-neutral-600 block mb-1">Season / Calendar</label>
            <select
              value={selectedSeason}
              onChange={(e) => setSelectedSeason(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-[#EADECA] bg-white text-xs text-[#1E1B18] focus:border-[#C84B31]"
            >
              {seasons.map((s) => (
                <option key={s} value={s}>
                  {s === 'ALL' ? 'All Seasons' : s}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Checkbox Badges */}
        <div className="flex flex-wrap items-center gap-4 pt-2 border-t border-[#EADECA]">
          <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold text-[#1E1B18]">
            <input
              type="checkbox"
              checked={giOnly}
              onChange={(e) => setGiOnly(e.target.checked)}
              className="rounded text-[#C84B31] focus:ring-[#C84B31]"
            />
            <span className="flex items-center gap-1 text-[#C84B31]">
              <Sparkles className="w-3.5 h-3.5" />
              GI-Tagged Specialties Only
            </span>
          </label>

          <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold text-[#1E1B18]">
            <input
              type="checkbox"
              checked={verifiedOnly}
              onChange={(e) => setVerifiedOnly(e.target.checked)}
              className="rounded text-[#2A9D8F] focus:ring-[#2A9D8F]"
            />
            <span className="flex items-center gap-1 text-[#2A9D8F]">
              <ShieldCheck className="w-3.5 h-3.5" />
              Verified Archival Records Only
            </span>
          </label>
        </div>
      </div>

      {/* Results Header */}
      <div className="flex items-center justify-between text-xs text-neutral-600 font-medium">
        <span>
          Showing <strong className="text-[#1E1B18]">{dishes.length}</strong> authentic heritage dishes
        </span>
      </div>

      {/* Dishes Grid or Loading/Empty States */}
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, idx) => (
            <div
              key={idx}
              className="h-80 rounded-2xl bg-white border border-[#EADECA] animate-pulse p-4 space-y-4"
            >
              <div className="h-44 bg-neutral-200 rounded-xl" />
              <div className="h-4 bg-neutral-200 rounded w-3/4" />
              <div className="h-3 bg-neutral-200 rounded w-1/2" />
            </div>
          ))}
        </div>
      ) : dishes.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {dishes.map((dish) => (
            <DishCard key={dish.id} dish={dish} />
          ))}
        </div>
      ) : (
        <div className="p-12 text-center bg-white rounded-3xl border border-[#EADECA] space-y-4 max-w-lg mx-auto">
          <Utensils className="w-12 h-12 text-neutral-300 mx-auto" />
          <h3 className="font-serif font-bold text-lg text-[#1E1B18]">
            No Heritage Dishes Matched Your Filter
          </h3>
          <p className="text-xs text-neutral-500 leading-relaxed">
            Try resetting your search query or selecting &quot;All States&quot; and &quot;All Cuisines&quot; to explore India&apos;s full culinary catalog.
          </p>
          <button
            onClick={resetFilters}
            className="px-5 py-2 rounded-xl bg-[#C84B31] text-white text-xs font-bold hover:bg-[#A33B24] transition-colors"
          >
            Reset Filters
          </button>
        </div>
      )}
    </div>
  );
}

export default function ExplorePage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Header */}
      <div className="space-y-2">
        <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#C84B31]/10 text-[#C84B31] border border-[#C84B31]/20">
          Search & Discovery
        </span>
        <h1 className="font-serif font-bold text-3xl sm:text-4xl text-[#1E1B18]">
          Explore India&apos;s Heritage Dishes
        </h1>
        <p className="text-sm text-neutral-600 max-w-2xl leading-relaxed">
          Filter by state, culinary school, seasonal availability, or search specific traditional ingredients and festival associations.
        </p>
      </div>

      <Suspense
        fallback={
          <div className="p-12 text-center text-xs text-neutral-500">
            Loading discovery catalog...
          </div>
        }
      >
        <ExploreContent />
      </Suspense>
    </div>
  );
}
