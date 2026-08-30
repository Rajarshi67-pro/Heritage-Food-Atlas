'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { INDIA_STATES_META, StateMapMeta } from '@/data/indiaGeoData';
import { MapPin, Utensils, Sparkles, Layers, ArrowRight, Compass, ShieldCheck } from 'lucide-react';

interface StateData {
  id: string;
  code: string;
  name: string;
  hindiName?: string | null;
  bengaliName?: string | null;
  zone: string;
  description: string;
  latitude: number;
  longitude: number;
  capital?: string | null;
  signatureFlavor?: string;
  traditionalGrain?: string;
  dishes: {
    id: string;
    slug: string;
    name: string;
    foodCategory: string;
    cuisineType: string;
    imageUrl: string;
    isGiTagged: boolean;
  }[];
}

const ZONE_COLORS: Record<string, { bg: string; text: string; border: string; badge: string }> = {
  East: { bg: 'bg-amber-50', text: 'text-amber-900', border: 'border-amber-300', badge: 'bg-amber-600' },
  South: { bg: 'bg-emerald-50', text: 'text-emerald-900', border: 'border-emerald-300', badge: 'bg-emerald-600' },
  West: { bg: 'bg-orange-50', text: 'text-orange-900', border: 'border-orange-300', badge: 'bg-orange-600' },
  North: { bg: 'bg-sky-50', text: 'text-sky-900', border: 'border-sky-300', badge: 'bg-sky-600' },
  Northeast: { bg: 'bg-teal-50', text: 'text-teal-900', border: 'border-teal-300', badge: 'bg-teal-600' },
  Central: { bg: 'bg-purple-50', text: 'text-purple-900', border: 'border-purple-300', badge: 'bg-purple-600' },
};

export default function IndiaFoodMap() {
  const [states, setStates] = useState<StateData[]>([]);
  const [selectedStateCode, setSelectedStateCode] = useState<string>('WB');
  const [selectedZone, setSelectedZone] = useState<string>('ALL');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/regions/map-data')
      .then((res) => res.json())
      .then((data) => {
        if (data.states) {
          setStates(data.states);
        }
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  const activeState = states.find((s) => s.code === selectedStateCode) || states[0];

  const filteredStates = selectedZone === 'ALL'
    ? states
    : states.filter((s) => s.zone.toLowerCase() === selectedZone.toLowerCase());

  const zones = ['ALL', 'East', 'South', 'West', 'North', 'Northeast'];

  return (
    <div className="bg-white rounded-3xl border border-[#EADECA] p-6 lg:p-8 shadow-sm space-y-6">
      {/* Zone Filter Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-[#EADECA]">
        <div>
          <h2 className="font-serif font-bold text-2xl text-[#1E1B18] flex items-center gap-2">
            <Compass className="w-6 h-6 text-[#C84B31]" />
            Interactive India Culinary Map
          </h2>
          <p className="text-xs text-neutral-500 mt-0.5">
            Select a state or geographical zone to explore regional foodways, staple grains, and heirloom dishes.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-1.5 bg-[#F5EFEB] p-1.5 rounded-2xl border border-[#EADECA]">
          {zones.map((z) => (
            <button
              key={z}
              onClick={() => setSelectedZone(z)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                selectedZone === z
                  ? 'bg-[#C84B31] text-white shadow-xs'
                  : 'text-[#1E1B18]/70 hover:text-[#C84B31] hover:bg-white'
              }`}
            >
              {z === 'ALL' ? 'All India' : `${z} Zone`}
            </button>
          ))}
        </div>
      </div>

      {/* Main Grid: State Selector Grid & Dynamic State Culinary Profile */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Interactive State Map Cards */}
        <div className="lg:col-span-6 space-y-3">
          <div className="flex items-center justify-between text-xs text-neutral-500 px-1 font-medium">
            <span>Click any state below to view its culinary profile:</span>
            <span>{filteredStates.length} States Documented</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 max-h-[540px] overflow-y-auto pr-1">
            {filteredStates.map((st) => {
              const isSelected = st.code === selectedStateCode;
              const zoneStyle = ZONE_COLORS[st.zone] || ZONE_COLORS.East;
              return (
                <button
                  key={st.code}
                  onClick={() => setSelectedStateCode(st.code)}
                  className={`text-left p-3.5 rounded-2xl border transition-all flex flex-col justify-between ${
                    isSelected
                      ? 'border-[#C84B31] bg-[#C84B31]/10 shadow-sm ring-2 ring-[#C84B31]/30'
                      : 'border-[#EADECA] bg-[#FDFBF7] hover:border-[#C84B31]/50 hover:bg-white'
                  }`}
                >
                  <div className="flex items-start justify-between gap-1 mb-2">
                    <span className="font-serif font-bold text-sm text-[#1E1B18] leading-tight">
                      {st.name}
                    </span>
                    <span className={`px-1.5 py-0.5 rounded text-[9px] font-bold uppercase text-white ${zoneStyle.badge}`}>
                      {st.zone}
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-[11px] text-neutral-500 font-medium">
                    <span className="flex items-center gap-1 text-[#C84B31] font-semibold">
                      <Utensils className="w-3 h-3" />
                      {st.dishes.length} Dishes
                    </span>
                    <span className="text-[10px] uppercase font-bold text-neutral-400">
                      {st.code}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Right Column: Selected State Detailed Culinary Profile */}
        <div className="lg:col-span-6">
          {activeState ? (
            <div className="bg-[#FDFBF7] border border-[#EADECA] rounded-3xl p-6 lg:p-7 space-y-6 shadow-xs">
              {/* Header */}
              <div className="flex items-start justify-between gap-4 pb-4 border-b border-[#EADECA]">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-[#C84B31] text-white">
                      {activeState.zone} India
                    </span>
                    {activeState.capital && (
                      <span className="text-xs text-neutral-500 font-medium">
                        Capital: {activeState.capital}
                      </span>
                    )}
                  </div>
                  <h3 className="font-serif font-bold text-2xl text-[#1E1B18] mt-1.5">
                    {activeState.name}
                  </h3>
                  {activeState.bengaliName && activeState.hindiName && (
                    <p className="text-xs text-[#7A3E26] font-serif font-semibold mt-0.5">
                      {activeState.bengaliName} • {activeState.hindiName}
                    </p>
                  )}
                </div>

                <div className="w-12 h-12 rounded-2xl bg-[#FF7B54]/20 border border-[#FF7B54]/30 flex items-center justify-center text-xl shrink-0">
                  🗺️
                </div>
              </div>

              {/* Cultural Summary */}
              <p className="text-xs text-neutral-700 leading-relaxed font-sans">
                {activeState.description}
              </p>

              {/* Signature Flavor & Traditional Grain Highlights */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="p-3.5 bg-white rounded-2xl border border-[#EADECA] space-y-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#C84B31] flex items-center gap-1">
                    <Sparkles className="w-3 h-3" />
                    Signature Tempering & Aroma
                  </span>
                  <p className="text-xs font-bold text-[#1E1B18]">
                    {activeState.signatureFlavor || 'Indigenous Spices & Cold-Pressed Oils'}
                  </p>
                </div>

                <div className="p-3.5 bg-white rounded-2xl border border-[#EADECA] space-y-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#2A9D8F] flex items-center gap-1">
                    <Layers className="w-3 h-3" />
                    Traditional Heritage Grains
                  </span>
                  <p className="text-xs font-bold text-[#1E1B18]">
                    {activeState.traditionalGrain || 'Native Rice & Millets'}
                  </p>
                </div>
              </div>

              {/* Documented Dishes Showcase */}
              <div className="space-y-3 pt-2">
                <div className="flex items-center justify-between">
                  <h4 className="font-serif font-bold text-sm text-[#1E1B18]">
                    Documented Dishes ({activeState.dishes.length})
                  </h4>
                  <Link
                    href={`/explore?state=${activeState.code}`}
                    className="text-xs font-bold text-[#C84B31] hover:underline flex items-center gap-1"
                  >
                    <span>View in Explore</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {activeState.dishes.map((dish) => (
                    <Link
                      key={dish.id}
                      href={`/dishes/${dish.slug}`}
                      className="group/item flex items-center gap-3 p-2.5 bg-white rounded-2xl border border-[#EADECA] hover:border-[#C84B31] hover:shadow-md transition-all"
                    >
                      <div className="relative w-14 h-14 rounded-xl overflow-hidden shrink-0 bg-neutral-100">
                        <Image
                          src={dish.imageUrl}
                          alt={dish.name}
                          fill
                          className="object-cover group-hover/item:scale-105 transition-transform"
                          sizes="60px"
                        />
                      </div>
                      <div className="overflow-hidden">
                        <h5 className="font-serif font-bold text-xs text-[#1E1B18] group-hover/item:text-[#C84B31] truncate transition-colors">
                          {dish.name}
                        </h5>
                        <p className="text-[10px] text-neutral-500 truncate">
                          {dish.foodCategory} • {dish.cuisineType}
                        </p>
                        {dish.isGiTagged && (
                          <span className="inline-block mt-0.5 text-[9px] font-bold text-[#C84B31]">
                            ★ GI Tagged
                          </span>
                        )}
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="p-8 text-center text-xs text-neutral-500">
              Loading state gastronomic data...
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
