import React from 'react';
import Link from 'next/link';
import { Compass, MapPin, Home, ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-[75vh] flex items-center justify-center px-4 py-16">
      <div className="max-w-lg w-full bg-white rounded-3xl border border-[#EADECA] p-8 sm:p-10 text-center shadow-lg space-y-6">
        <div className="w-20 h-20 rounded-3xl bg-[#FF7B54]/10 border border-[#FF7B54]/20 text-[#C84B31] flex items-center justify-center text-3xl mx-auto shadow-inner">
          🍛
        </div>

        <div className="space-y-2">
          <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#C84B31]/10 text-[#C84B31] border border-[#C84B31]/20">
            404 — Record Not Found
          </span>
          <h1 className="font-serif font-bold text-3xl text-[#1E1B18]">
            Lost in the Spice Roads?
          </h1>
          <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed font-sans max-w-sm mx-auto">
            The culinary record, dish profile, or historic trail you are seeking could not be found in the verified archive.
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          <Link
            href="/"
            className="px-5 py-2.5 rounded-xl bg-[#C84B31] hover:bg-[#A33B24] text-white text-xs font-bold transition-all flex items-center gap-2 shadow-xs"
          >
            <Home className="w-4 h-4" />
            <span>Home Atlas</span>
          </Link>
          <Link
            href="/map"
            className="px-5 py-2.5 rounded-xl bg-[#F5EFEB] hover:bg-[#EADECA] text-[#1E1B18] text-xs font-bold transition-all flex items-center gap-2"
          >
            <MapPin className="w-4 h-4 text-[#C84B31]" />
            <span>India Food Map</span>
          </Link>
          <Link
            href="/explore"
            className="px-5 py-2.5 rounded-xl bg-[#F5EFEB] hover:bg-[#EADECA] text-[#1E1B18] text-xs font-bold transition-all flex items-center gap-2"
          >
            <Compass className="w-4 h-4 text-[#2A9D8F]" />
            <span>Search Dishes</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
