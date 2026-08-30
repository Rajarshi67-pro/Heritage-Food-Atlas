import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import prisma from '@/lib/prisma';
import DishCard from '@/components/ui/DishCard';
import { Calendar, ArrowLeft, Sparkles, BookOpen, Utensils } from 'lucide-react';

interface FestivalDetailPageProps {
  params: { slug: string };
}

export default async function FestivalDetailPage({ params }: FestivalDetailPageProps) {
  const festival = await prisma.festival.findUnique({
    where: { slug: params.slug },
    include: {
      festivalDishes: {
        include: {
          dish: {
            include: { state: true },
          },
        },
      },
    },
  });

  if (!festival) {
    notFound();
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      <div>
        <Link
          href="/festivals"
          className="inline-flex items-center gap-1.5 text-xs font-bold text-[#7A3E26] hover:text-[#FF7B54] transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Festivals</span>
        </Link>
      </div>

      {/* Hero */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <div className="lg:col-span-6">
          <div className="relative h-80 w-full rounded-3xl overflow-hidden shadow-md border border-[#EADECA] bg-neutral-100">
            <Image
              src={festival.imageUrl}
              alt={festival.name}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
            <div className="absolute top-4 left-4">
              <span className="px-3 py-1 rounded-xl text-xs font-bold bg-[#FF7B54] text-white flex items-center gap-1.5 shadow-sm">
                <Calendar className="w-3.5 h-3.5" />
                {festival.monthSeason}
              </span>
            </div>
          </div>
        </div>

        <div className="lg:col-span-6 space-y-4">
          <h1 className="font-serif font-bold text-3xl sm:text-5xl text-[#1E1B18]">
            {festival.name}
          </h1>

          <p className="text-sm text-neutral-700 leading-relaxed font-sans">
            {festival.description}
          </p>

          <div className="p-4 bg-orange-50/70 border border-orange-200/70 rounded-2xl space-y-1.5">
            <span className="text-xs font-bold text-[#C84B31] flex items-center gap-1.5 uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              Spiritual & Harvest Significance
            </span>
            <p className="text-xs text-neutral-700 leading-relaxed font-serif">
              {festival.significance}
            </p>
          </div>
        </div>
      </div>

      {/* Featured Festive & Sacred Offerings */}
      {festival.festivalDishes && festival.festivalDishes.length > 0 && (
        <section className="space-y-6 pt-6 border-t border-[#EADECA]">
          <div className="flex items-center justify-between">
            <h2 className="font-serif font-bold text-2xl text-[#1E1B18] flex items-center gap-2">
              <Utensils className="w-6 h-6 text-[#FF7B54]" />
              Sacred & Festive Dishes ({festival.festivalDishes.length})
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {festival.festivalDishes.map((fd) => (
              <DishCard key={fd.dish.id} dish={fd.dish as any} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
