'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Sparkles, MapPin, Eye, Bookmark, Clock, ShieldCheck, Heart } from 'lucide-react';
import { useAuth } from '@/lib/auth-context';

export interface DishCardProps {
  dish: {
    id: string;
    slug: string;
    name: string;
    localNames?: string;
    cuisineType: string;
    foodCategory: string;
    description: string;
    imageUrl: string;
    seasonalAvailability?: string;
    isGiTagged: boolean;
    verifiedStatus: string;
    viewsCount: number;
    state?: { name: string; code: string };
    _count?: { favorites?: number; stories?: number };
  };
  initialFavorited?: boolean;
}

export default function DishCard({ dish, initialFavorited = false }: DishCardProps) {
  const { user } = useAuth();
  const [isFavorited, setIsFavorited] = useState(initialFavorited);
  const [imgSrc, setImgSrc] = useState(dish.imageUrl || '/images/dishes/hyderabadi-biryani.jpg');

  const localNamesParsed = dish.localNames ? JSON.parse(dish.localNames) : [];
  const primaryLocal = localNamesParsed.length > 0 ? localNamesParsed[0].name : null;

  const toggleFavorite = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!user) {
      window.location.href = '/auth/login';
      return;
    }
    setIsFavorited(!isFavorited);
    try {
      await fetch('/api/favorites', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ dishId: dish.id }),
      });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="group bg-white rounded-3xl border border-[#EADECA] overflow-hidden hover:shadow-xl hover:border-[#C84B31]/40 transition-all duration-300 flex flex-col justify-between">
      <div>
        {/* Card Real Photograph Showcase */}
        <div className="relative h-52 w-full overflow-hidden bg-[#2D1B12]">
          <Image
            src={imgSrc}
            alt={dish.name}
            fill
            unoptimized
            onError={() => setImgSrc('/images/dishes/hyderabadi-biryani.jpg')}
            className="object-cover group-hover:scale-105 transition-transform duration-500"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-black/30" />

          {/* Badges Top */}
          <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none">
            <div className="flex flex-wrap gap-1.5 pointer-events-auto">
              {dish.isGiTagged && (
                <span className="px-2.5 py-1 rounded-full text-[10px] font-bold badge-gi flex items-center gap-1 shadow-sm">
                  <Sparkles className="w-3 h-3" />
                  GI Tagged
                </span>
              )}
              {dish.verifiedStatus === 'VERIFIED' && (
                <span className="px-2.5 py-1 rounded-full text-[10px] font-bold badge-verified flex items-center gap-1 shadow-sm">
                  <ShieldCheck className="w-3 h-3" />
                  VERIFIED
                </span>
              )}
            </div>

            <button
              onClick={toggleFavorite}
              title="Bookmark dish"
              className={`p-2 rounded-full backdrop-blur-md transition-colors pointer-events-auto shadow-sm ${
                isFavorited
                  ? 'bg-red-500 text-white'
                  : 'bg-white/80 text-[#1E1B18] hover:bg-white hover:text-[#C84B31]'
              }`}
            >
              <Bookmark className={`w-3.5 h-3.5 ${isFavorited ? 'fill-current' : ''}`} />
            </button>
          </div>

          {/* Category & Cuisine Pill Bottom */}
          <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs text-white">
            <span className="bg-black/60 backdrop-blur-xs px-2.5 py-1 rounded-lg text-[11px] font-semibold border border-white/15">
              {dish.cuisineType} Cuisine
            </span>
            <span className="bg-[#C84B31]/90 backdrop-blur-xs px-2.5 py-1 rounded-lg text-[11px] font-semibold text-white">
              {dish.foodCategory}
            </span>
          </div>
        </div>

        {/* Content Box */}
        <div className="p-5 space-y-3">
          {dish.state && (
            <div className="flex items-center gap-1.5 text-xs font-bold text-[#7A3E26]">
              <MapPin className="w-3.5 h-3.5 text-[#C84B31]" />
              <span>{dish.state.name}</span>
            </div>
          )}

          <div>
            <h3 className="font-serif font-bold text-lg text-[#1E1B18] group-hover:text-[#C84B31] transition-colors leading-tight">
              {dish.name}
            </h3>
            {primaryLocal && (
              <span className="text-xs font-serif text-[#C84B31] font-semibold block mt-0.5">
                {primaryLocal}
              </span>
            )}
          </div>

          <p className="text-xs text-neutral-600 line-clamp-2 leading-relaxed font-sans">
            {dish.description}
          </p>

          {dish.seasonalAvailability && (
            <div className="flex items-center gap-1.5 text-[11px] text-amber-900 bg-amber-50/80 px-2.5 py-1 rounded-lg border border-amber-200/60 w-fit">
              <Clock className="w-3 h-3 text-amber-700" />
              <span>Season: {dish.seasonalAvailability}</span>
            </div>
          )}
        </div>
      </div>

      {/* Footer link & view count */}
      <div className="px-5 pb-5 pt-2 flex items-center justify-between border-t border-[#EADECA]/60 text-xs text-neutral-500">
        <span className="flex items-center gap-1">
          <Eye className="w-3.5 h-3.5" />
          {dish.viewsCount}
        </span>
        <Link
          href={`/dishes/${dish.slug}`}
          className="font-bold text-[#C84B31] group-hover:translate-x-0.5 transition-transform flex items-center gap-1"
        >
          <span>Explore</span>
          <span>→</span>
        </Link>
      </div>
    </div>
  );
}
