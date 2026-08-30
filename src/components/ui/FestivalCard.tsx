'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Calendar, MapPin, Sparkles, ArrowRight } from 'lucide-react';

interface FestivalCardProps {
  festival: {
    id: string;
    slug: string;
    name: string;
    regionalNames?: string;
    monthSeason: string;
    significance: string;
    description: string;
    imageUrl: string;
    associatedStates?: string;
    festivalDishes?: any[];
  };
}

export default function FestivalCard({ festival }: FestivalCardProps) {
  const [imgSrc, setImgSrc] = useState(festival.imageUrl || '/images/festivals/poush-sankranti.jpg');
  const regionalNamesParsed = festival.regionalNames ? JSON.parse(festival.regionalNames) : [];
  const primaryRegional = regionalNamesParsed.length > 0 ? regionalNamesParsed[0].name : null;

  return (
    <div className="group bg-white rounded-3xl border border-[#EADECA] overflow-hidden hover:shadow-xl hover:border-[#FF7B54]/40 transition-all duration-300 flex flex-col justify-between">
      <div>
        <div className="relative h-48 w-full overflow-hidden bg-[#2D1B12]">
          <Image
            src={imgSrc}
            alt={festival.name}
            fill
            unoptimized
            onError={() => setImgSrc('/images/festivals/poush-sankranti.jpg')}
            className="object-cover group-hover:scale-105 transition-transform duration-500"
            sizes="(max-width: 768px) 100vw, 33vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-black/30" />

          <div className="absolute top-3 left-3">
            <span className="px-3 py-1 rounded-full text-[10px] font-bold bg-[#FF7B54] text-white flex items-center gap-1 shadow-sm">
              <Calendar className="w-3 h-3" />
              {festival.monthSeason}
            </span>
          </div>
        </div>

        <div className="p-5 space-y-3">
          <div>
            <h3 className="font-serif font-bold text-lg text-[#1E1B18] group-hover:text-[#FF7B54] transition-colors leading-tight">
              {festival.name}
            </h3>
            {primaryRegional && (
              <span className="text-xs font-serif text-[#FF7B54] font-semibold block mt-0.5">
                {primaryRegional}
              </span>
            )}
          </div>

          <p className="text-xs text-neutral-600 line-clamp-3 leading-relaxed font-sans">
            {festival.description}
          </p>

          <div className="p-3 rounded-2xl bg-[#FDFBF7] border border-[#EADECA] text-xs text-neutral-700 space-y-1">
            <span className="font-serif font-bold text-[#7A3E26] block text-[11px]">
              Ritual Significance:
            </span>
            <p className="line-clamp-2 text-[11px] leading-relaxed italic">
              &ldquo;{festival.significance}&rdquo;
            </p>
          </div>
        </div>
      </div>

      <div className="px-5 pb-5 pt-2 border-t border-[#EADECA]/60 flex items-center justify-between text-xs">
        <span className="text-[11px] text-neutral-500 font-medium">
          {festival.festivalDishes?.length || 1} sacred feast dishes
        </span>
        <Link
          href={`/festivals/${festival.slug}`}
          className="font-bold text-[#FF7B54] group-hover:translate-x-0.5 transition-transform flex items-center gap-1"
        >
          <span>Explore Rituals</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  );
}
