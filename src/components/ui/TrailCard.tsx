'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { MapPin, Clock, Compass, ArrowRight, Route } from 'lucide-react';

interface TrailCardProps {
  trail: {
    id: string;
    slug: string;
    title: string;
    cityState: string;
    description: string;
    estimatedDuration: string;
    bestTime: string;
    imageUrl: string;
    stops?: any[];
  };
}

export default function TrailCard({ trail }: TrailCardProps) {
  const [imgSrc, setImgSrc] = useState(trail.imageUrl || '/images/trails/kolkata-trail.jpg');

  return (
    <div className="group bg-white rounded-3xl border border-[#EADECA] overflow-hidden hover:shadow-xl hover:border-[#1A2E40]/40 transition-all duration-300 flex flex-col justify-between">
      <div>
        <div className="relative h-52 w-full overflow-hidden bg-[#1E252D]">
          <Image
            src={imgSrc}
            alt={trail.title}
            fill
            unoptimized
            onError={() => setImgSrc('/images/trails/kolkata-trail.jpg')}
            className="object-cover group-hover:scale-105 transition-transform duration-500"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30" />

          <div className="absolute top-3 left-3">
            <span className="px-3 py-1 rounded-full text-[10px] font-bold bg-[#1A2E40] text-[#E9C46A] border border-[#E9C46A]/30 flex items-center gap-1 shadow-sm">
              <Route className="w-3 h-3" />
              {trail.stops?.length || 3} Heritage Stops
            </span>
          </div>

          <div className="absolute bottom-3 left-3 right-3 text-white text-xs">
            <span className="bg-black/60 backdrop-blur-xs px-2.5 py-1 rounded-lg text-[11px] font-semibold border border-white/15 flex items-center gap-1 w-fit">
              <MapPin className="w-3 h-3 text-[#E9C46A]" />
              {trail.cityState}
            </span>
          </div>
        </div>

        <div className="p-5 space-y-3">
          <h3 className="font-serif font-bold text-xl text-[#1E1B18] group-hover:text-[#1A2E40] transition-colors leading-tight">
            {trail.title}
          </h3>

          <p className="text-xs text-neutral-600 line-clamp-3 leading-relaxed font-sans">
            {trail.description}
          </p>

          <div className="grid grid-cols-2 gap-2 pt-1 text-xs">
            <div className="p-2.5 bg-[#FDFBF7] rounded-xl border border-[#EADECA]">
              <span className="text-[10px] font-bold text-neutral-500 uppercase block flex items-center gap-1">
                <Clock className="w-3 h-3 text-[#C84B31]" />
                Duration
              </span>
              <span className="text-xs font-semibold text-[#1E1B18] truncate block mt-0.5">
                {trail.estimatedDuration}
              </span>
            </div>

            <div className="p-2.5 bg-[#FDFBF7] rounded-xl border border-[#EADECA]">
              <span className="text-[10px] font-bold text-neutral-500 uppercase block flex items-center gap-1">
                <Compass className="w-3 h-3 text-[#2A9D8F]" />
                Best Season
              </span>
              <span className="text-xs font-semibold text-[#1E1B18] truncate block mt-0.5">
                {trail.bestTime}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="px-5 pb-5 pt-2 border-t border-[#EADECA]/60 flex items-center justify-between text-xs">
        <span className="text-[11px] text-neutral-500 font-medium">
          Self-guided heritage walking route
        </span>
        <Link
          href={`/trails/${trail.slug}`}
          className="font-bold text-[#1A2E40] group-hover:translate-x-0.5 transition-transform flex items-center gap-1"
        >
          <span>View Trail Map</span>
          <ArrowRight className="w-3.5 h-3.5 text-[#C84B31]" />
        </Link>
      </div>
    </div>
  );
}
