'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Layers, MapPin, Sparkles, ArrowRight, Heart } from 'lucide-react';

interface IngredientCardProps {
  ingredient: {
    id: string;
    slug: string;
    name: string;
    regionalNames?: string;
    originRegion: string;
    botanicalName?: string;
    category: string;
    description: string;
    culturalSignificance: string;
    seasonality?: string;
    imageUrl: string;
    healthAspects?: string;
    dishIngredients?: any[];
  };
}

export default function IngredientCard({ ingredient }: IngredientCardProps) {
  const [imgSrc, setImgSrc] = useState(ingredient.imageUrl || '/images/ingredients/gobindobhog.jpg');
  const regionalNamesParsed = ingredient.regionalNames ? JSON.parse(ingredient.regionalNames) : [];
  const primaryRegional = regionalNamesParsed.length > 0 ? regionalNamesParsed[0].name : null;

  return (
    <div className="group bg-white rounded-3xl border border-[#EADECA] overflow-hidden hover:shadow-xl hover:border-[#2A9D8F]/40 transition-all duration-300 flex flex-col justify-between">
      <div>
        <div className="relative h-48 w-full overflow-hidden bg-[#1E2D27]">
          <Image
            src={imgSrc}
            alt={ingredient.name}
            fill
            unoptimized
            onError={() => setImgSrc('/images/ingredients/gobindobhog.jpg')}
            className="object-cover group-hover:scale-105 transition-transform duration-500"
            sizes="(max-width: 768px) 100vw, 33vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-black/30" />

          <div className="absolute top-3 left-3">
            <span className="px-3 py-1 rounded-full text-[10px] font-bold bg-[#2A9D8F] text-white flex items-center gap-1 shadow-sm">
              <Layers className="w-3 h-3" />
              {ingredient.category}
            </span>
          </div>

          <div className="absolute bottom-3 left-3 right-3 text-white text-xs">
            <span className="bg-black/60 backdrop-blur-xs px-2.5 py-1 rounded-lg text-[11px] font-semibold border border-white/15 flex items-center gap-1 w-fit">
              <MapPin className="w-3 h-3 text-[#2A9D8F]" />
              {ingredient.originRegion}
            </span>
          </div>
        </div>

        <div className="p-5 space-y-3">
          <div>
            <h3 className="font-serif font-bold text-lg text-[#1E1B18] group-hover:text-[#2A9D8F] transition-colors leading-tight">
              {ingredient.name}
            </h3>
            {ingredient.botanicalName && (
              <span className="text-[11px] text-neutral-500 italic block mt-0.5 font-serif">
                {ingredient.botanicalName}
              </span>
            )}
          </div>

          <p className="text-xs text-neutral-600 line-clamp-3 leading-relaxed font-sans">
            {ingredient.description}
          </p>

          {ingredient.healthAspects && (
            <div className="p-3 rounded-2xl bg-emerald-50/70 border border-emerald-200/60 text-xs text-emerald-950 space-y-1">
              <span className="font-serif font-bold text-emerald-800 block text-[11px] flex items-center gap-1">
                <Heart className="w-3 h-3 text-emerald-600" />
                Ayurvedic & Health Virtues:
              </span>
              <p className="line-clamp-2 text-[11px] leading-relaxed text-emerald-900">
                {ingredient.healthAspects}
              </p>
            </div>
          )}
        </div>
      </div>

      <div className="px-5 pb-5 pt-2 border-t border-[#EADECA]/60 flex items-center justify-between text-xs">
        <span className="text-[11px] text-neutral-500 font-medium">
          Used in {ingredient.dishIngredients?.length || 1}+ heritage dishes
        </span>
        <Link
          href={`/ingredients/${ingredient.slug}`}
          className="font-bold text-[#2A9D8F] group-hover:translate-x-0.5 transition-transform flex items-center gap-1"
        >
          <span>View Profile</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  );
}
