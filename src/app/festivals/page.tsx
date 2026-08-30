import React from 'react';
import prisma from '@/lib/prisma';
import FestivalCard from '@/components/ui/FestivalCard';
import { Metadata } from 'next';
import { Calendar } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Festival Food Explorer — Heritage Food Atlas',
  description: 'Explore the culinary traditions of Poush Sankranti, Onam Sadya, Pongal, Magh Bihu, Chhath Puja, and regional harvest feasts.',
};

export default async function FestivalsPage() {
  const festivals = await prisma.festival.findMany({
    include: {
      festivalDishes: {
        include: { dish: true },
      },
    },
    orderBy: { name: 'asc' },
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      <div className="space-y-2">
        <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#FF7B54]/10 text-[#FF7B54] border border-[#FF7B54]/20">
          Sacred Calendars & Harvest Rites
        </span>
        <h1 className="font-serif font-bold text-3xl sm:text-4xl text-[#1E1B18]">
          Festival & Harvest Food Explorer
        </h1>
        <p className="text-sm text-neutral-600 max-w-2xl leading-relaxed">
          In India, food is the living grammar of festivals. Explore how seasonal agricultural cycles, solstices, and sacred fasts give rise to regional feasts.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {festivals.map((fest) => (
          <FestivalCard key={fest.id} festival={fest as any} />
        ))}
      </div>
    </div>
  );
}
