import React from 'react';
import prisma from '@/lib/prisma';
import TrailCard from '@/components/ui/TrailCard';
import { Metadata } from 'next';
import { Route } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Heritage Culinary Trails — Heritage Food Atlas',
  description: 'Self-guided historic walking trails exploring century-old sweet dynasties, spice markets, and regional street food capitals.',
};

export default async function TrailsPage() {
  const trails = await prisma.foodTrail.findMany({
    where: { isPublished: true },
    include: {
      stops: { orderBy: { orderIndex: 'asc' } },
      user: true,
    },
    orderBy: { createdAt: 'desc' },
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      <div className="space-y-2">
        <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#1A2E40]/10 text-[#1A2E40] border border-[#1A2E40]/20">
          Cultural Culinary Tourism
        </span>
        <h1 className="font-serif font-bold text-3xl sm:text-4xl text-[#1E1B18]">
          Heritage Food Trails of India
        </h1>
        <p className="text-sm text-neutral-600 max-w-2xl leading-relaxed">
          Embark on curated cultural food trails through Kolkata&apos;s colonial sweetmakers, Old Delhi&apos;s Mughal alleys, Chettinad spice mansions, and coastal spice ports.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {trails.map((trail) => (
          <TrailCard key={trail.id} trail={trail as any} />
        ))}
      </div>
    </div>
  );
}
