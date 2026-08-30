import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import prisma from '@/lib/prisma';
import DishCard from '@/components/ui/DishCard';
import { MapPin, ArrowLeft, Layers, Sparkles, Activity, Clock, BookOpen } from 'lucide-react';

interface IngredientDetailPageProps {
  params: { slug: string };
}

export default async function IngredientDetailPage({ params }: IngredientDetailPageProps) {
  const ingredient = await prisma.ingredient.findUnique({
    where: { slug: params.slug },
    include: {
      dishIngredients: {
        include: {
          dish: {
            include: { state: true },
          },
        },
      },
    },
  });

  if (!ingredient) {
    notFound();
  }

  const regionalNamesParsed = ingredient.regionalNames ? JSON.parse(ingredient.regionalNames) : [];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      <div>
        <Link
          href="/ingredients"
          className="inline-flex items-center gap-1.5 text-xs font-bold text-[#7A3E26] hover:text-[#C84B31] transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Ingredients</span>
        </Link>
      </div>

      {/* Hero */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <div className="lg:col-span-5">
          <div className="relative h-80 w-full rounded-3xl overflow-hidden shadow-md border border-[#EADECA] bg-neutral-100">
            <Image
              src={ingredient.imageUrl}
              alt={ingredient.name}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 40vw"
            />
            <div className="absolute top-4 left-4">
              <span className="px-3 py-1 rounded-xl text-xs font-bold bg-[#2A9D8F] text-white">
                {ingredient.category}
              </span>
            </div>
          </div>
        </div>

        <div className="lg:col-span-7 space-y-4">
          <div className="space-y-1">
            {ingredient.originRegion && (
              <div className="flex items-center gap-1.5 text-xs font-bold text-[#7A3E26]">
                <MapPin className="w-4 h-4 text-[#C84B31]" />
                <span>Origin: {ingredient.originRegion}</span>
              </div>
            )}

            <h1 className="font-serif font-bold text-3xl sm:text-4xl text-[#1E1B18]">
              {ingredient.name}
            </h1>

            {ingredient.botanicalName && (
              <p className="text-sm font-serif italic text-neutral-500">
                Botanical Taxon: {ingredient.botanicalName}
              </p>
            )}

            {regionalNamesParsed.length > 0 && (
              <div className="flex flex-wrap gap-2 pt-2">
                {regionalNamesParsed.map((rn: any, i: number) => (
                  <span
                    key={i}
                    className="px-2.5 py-0.5 rounded-lg bg-[#F5EFEB] border border-[#EADECA] text-xs font-serif font-semibold text-[#7A3E26]"
                  >
                    {rn.name}
                  </span>
                ))}
              </div>
            )}
          </div>

          <p className="text-xs sm:text-sm text-neutral-700 leading-relaxed">
            {ingredient.description}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            {ingredient.seasonality && (
              <div className="p-3 bg-[#FDFBF7] border border-[#EADECA] rounded-2xl space-y-1">
                <span className="text-[10px] font-bold text-neutral-500 uppercase tracking-wider flex items-center gap-1">
                  <Clock className="w-3 h-3 text-[#C84B31]" />
                  Harvest Season
                </span>
                <p className="text-xs font-bold text-[#1E1B18]">{ingredient.seasonality}</p>
              </div>
            )}

            {ingredient.healthAspects && (
              <div className="p-3 bg-emerald-50/80 border border-emerald-200/80 rounded-2xl space-y-1">
                <span className="text-[10px] font-bold text-emerald-800 uppercase tracking-wider flex items-center gap-1">
                  <Activity className="w-3 h-3 text-emerald-600" />
                  Ayurvedic & Health Properties
                </span>
                <p className="text-xs font-medium text-emerald-900">{ingredient.healthAspects}</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Cultural Significance */}
      <section className="bg-white rounded-3xl border border-[#EADECA] p-6 lg:p-8 space-y-3">
        <h2 className="font-serif font-bold text-xl text-[#1E1B18] flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-[#2A9D8F]" />
          Cultural & Ritual Significance
        </h2>
        <p className="text-xs sm:text-sm text-neutral-700 leading-relaxed">
          {ingredient.culturalSignificance}
        </p>
      </section>

      {/* Associated Dishes */}
      {ingredient.dishIngredients && ingredient.dishIngredients.length > 0 && (
        <section className="space-y-6 pt-6 border-t border-[#EADECA]">
          <h2 className="font-serif font-bold text-2xl text-[#1E1B18]">
            Associated Heritage Dishes ({ingredient.dishIngredients.length})
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {ingredient.dishIngredients.map((di) => (
              <DishCard key={di.dish.id} dish={di.dish as any} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
