import React from 'react';
import IndiaFoodMap from '@/components/map/IndiaFoodMap';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Interactive India Food Map — Heritage Food Atlas',
  description: 'Explore regional culinary traditions, staple grains, and heritage dishes across all Indian states and Union Territories.',
};

export default function MapPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      <div className="space-y-2">
        <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#C84B31]/10 text-[#C84B31] border border-[#C84B31]/20">
          Geographical Food Heritage
        </span>
        <h1 className="font-serif font-bold text-3xl sm:text-4xl text-[#1E1B18]">
          India Regional Gastronomic Atlas
        </h1>
        <p className="text-sm text-neutral-600 max-w-3xl leading-relaxed">
          From the cold-pressed mustard oil traditions of the Eastern river deltas to the coconut and kokum shores of the Malabar and Konkan coasts, discover how India&apos;s culinary topography mirrors its land and climate.
        </p>
      </div>

      <IndiaFoodMap />
    </div>
  );
}
