import React from 'react';
import Link from 'next/link';
import prisma from '@/lib/prisma';
import StoryCard from '@/components/ui/StoryCard';
import { Metadata } from 'next';
import { Mic, Heart, PlusCircle } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Stories from Our Grandparents — Oral Culinary History — Heritage Food Atlas',
  description: 'Listen to living domestic kitchen narratives, grandmother heirloom recipes, and oral food lore across India.',
};

export default async function StoriesPage() {
  const stories = await prisma.story.findMany({
    where: { status: 'APPROVED' },
    include: {
      dish: { include: { state: true } },
      user: true,
    },
    orderBy: { createdAt: 'desc' },
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-6 border-b border-[#EADECA]">
        <div className="space-y-2">
          <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#7A3E26]/10 text-[#7A3E26] border border-[#7A3E26]/20">
            Living Oral Archive
          </span>
          <h1 className="font-serif font-bold text-3xl sm:text-4xl text-[#1E1B18]">
            Stories from Our Grandparents
          </h1>
          <p className="text-sm text-neutral-600 max-w-2xl leading-relaxed font-sans">
            Every family hearth in India holds forgotten techniques, regional songs, and ancestral memories. Listen to authentic voice narrations preserved for future generations.
          </p>
        </div>

        <Link
          href="/contribute?type=story"
          className="px-5 py-3 rounded-2xl bg-[#C84B31] hover:bg-[#A33B24] text-white font-bold text-xs flex items-center gap-2 shadow-md transition-all shrink-0"
        >
          <PlusCircle className="w-4 h-4" />
          <span>Contribute an Oral Memory</span>
        </Link>
      </div>

      {/* Stories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {stories.map((story) => (
          <StoryCard key={story.id} story={story as any} />
        ))}
      </div>
    </div>
  );
}
