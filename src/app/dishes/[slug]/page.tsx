import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import prisma from '@/lib/prisma';
import StoryCard from '@/components/ui/StoryCard';
import DishCard from '@/components/ui/DishCard';
import DishInteractiveViewer from '@/components/interactive/DishInteractiveViewer';
import {
  MapPin,
  Sparkles,
  ShieldCheck,
  Calendar,
  Layers,
  ChefHat,
  BookOpen,
  Clock,
  ArrowLeft,
  Eye,
} from 'lucide-react';

interface DishDetailPageProps {
  params: { slug: string };
}

export async function generateMetadata({ params }: DishDetailPageProps) {
  const dish = await prisma.dish.findUnique({
    where: { slug: params.slug },
    include: { state: true },
  });

  if (!dish) return { title: 'Dish Not Found — Heritage Food Atlas' };

  return {
    title: `${dish.name} (${dish.cuisineType} Cuisine) — Heritage Food Atlas`,
    description: dish.description,
    openGraph: {
      title: `${dish.name} — Cultural Culinary Heritage of ${dish.state.name}`,
      description: dish.description,
      images: [{ url: dish.imageUrl }],
    },
  };
}

export default async function DishDetailPage({ params }: DishDetailPageProps) {
  const dish = await prisma.dish.findUnique({
    where: { slug: params.slug },
    include: {
      state: true,
      dishIngredients: {
        include: { ingredient: true },
      },
      festivalDishes: {
        include: { festival: true },
      },
      stories: {
        where: { status: 'APPROVED' },
        include: {
          dish: { include: { state: true } },
          user: true,
        },
        orderBy: { createdAt: 'desc' },
      },
      reviews: {
        include: { user: true },
        orderBy: { createdAt: 'desc' },
      },
    },
  });

  if (!dish) {
    notFound();
  }

  const relatedDishes = await prisma.dish.findMany({
    where: {
      id: { not: dish.id },
      OR: [{ stateId: dish.stateId }, { cuisineType: dish.cuisineType }],
    },
    take: 3,
    include: { state: true },
  });

  const localNamesParsed = dish.localNames ? JSON.parse(dish.localNames) : [];
  const galleryImagesParsed = dish.gallery ? JSON.parse(dish.gallery) : [dish.imageUrl];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      {/* Back link */}
      <div>
        <Link
          href="/explore"
          className="inline-flex items-center gap-1.5 text-xs font-bold text-[#7A3E26] hover:text-[#C84B31] transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Exploration</span>
        </Link>
      </div>

      {/* Hero Header & Media Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left: Image showcase */}
        <div className="lg:col-span-6 space-y-4">
          <div className="relative h-80 sm:h-96 w-full rounded-3xl overflow-hidden shadow-md border border-[#EADECA] bg-neutral-100">
            <Image
              src={dish.imageUrl}
              alt={dish.name}
              fill
              className="object-cover"
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />

            {/* Badges */}
            <div className="absolute top-4 left-4 flex flex-wrap gap-2">
              {dish.isGiTagged && (
                <span className="px-3 py-1 rounded-lg text-xs font-bold badge-gi flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5" />
                  GI Tagged
                </span>
              )}
              {dish.verifiedStatus === 'VERIFIED' ? (
                <span className="px-3 py-1 rounded-lg text-xs font-bold badge-verified flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  Verified Archival Record
                </span>
              ) : (
                <span className="px-3 py-1 rounded-lg text-xs font-bold badge-community">
                  Community Heritage
                </span>
              )}
            </div>

            <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-white text-xs">
              <span className="bg-black/50 backdrop-blur-md px-3 py-1.5 rounded-xl font-semibold border border-white/20">
                {dish.cuisineType} Cuisine • {dish.foodCategory}
              </span>
              <span className="flex items-center gap-1 text-white/90 bg-black/40 px-2.5 py-1 rounded-lg">
                <Eye className="w-3.5 h-3.5" />
                {dish.viewsCount} views
              </span>
            </div>
          </div>
        </div>

        {/* Right: Quick Heritage Overview */}
        <div className="lg:col-span-6 space-y-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-xs font-bold text-[#7A3E26]">
              <MapPin className="w-4 h-4 text-[#C84B31]" />
              <span>{dish.state.name}</span>
              {dish.regionName && <span>• {dish.regionName}</span>}
            </div>

            <h1 className="font-serif font-bold text-3xl sm:text-5xl text-[#1E1B18] tracking-tight">
              {dish.name}
            </h1>

            {localNamesParsed.length > 0 && (
              <div className="flex flex-wrap gap-2 pt-1">
                {localNamesParsed.map((ln: any, idx: number) => (
                  <span
                    key={idx}
                    className="px-3 py-1 rounded-xl bg-[#F5EFEB] border border-[#EADECA] text-xs font-serif font-bold text-[#C84B31]"
                  >
                    {ln.name}
                  </span>
                ))}
              </div>
            )}
          </div>

          <p className="text-sm text-neutral-700 leading-relaxed font-sans">
            {dish.description}
          </p>

          <div className="grid grid-cols-2 gap-3 pt-2">
            <div className="p-3.5 bg-[#FDFBF7] rounded-2xl border border-[#EADECA]">
              <span className="text-[10px] font-bold text-neutral-500 uppercase tracking-wider block flex items-center gap-1">
                <Clock className="w-3 h-3 text-[#C84B31]" />
                Seasonality
              </span>
              <span className="text-xs font-bold text-[#1E1B18] block mt-0.5">
                {dish.seasonalAvailability || 'All Season'}
              </span>
            </div>

            <div className="p-3.5 bg-[#FDFBF7] rounded-2xl border border-[#EADECA]">
              <span className="text-[10px] font-bold text-neutral-500 uppercase tracking-wider block flex items-center gap-1">
                <ShieldCheck className="w-3 h-3 text-[#2A9D8F]" />
                Curation Status
              </span>
              <span className="text-xs font-bold text-[#2A9D8F] block mt-0.5">
                {dish.verifiedStatus}
              </span>
            </div>
          </div>

          {dish.giTagDetails && (
            <div className="p-4 rounded-2xl bg-amber-50/80 border border-amber-200/80 space-y-1">
              <span className="text-xs font-bold text-amber-900 flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-[#C84B31]" />
                Geographical Indication Details
              </span>
              <p className="text-xs text-amber-800 leading-relaxed">
                {dish.giTagDetails}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Interactive Studio (Gallery, Walkthrough, Rasa, Reviews) */}
      <DishInteractiveViewer
        dishId={dish.id}
        dishName={dish.name}
        cuisine={dish.cuisineType}
        mainImage={dish.imageUrl}
        galleryImages={galleryImagesParsed}
        preparationText={dish.traditionalPreparation}
        reviews={dish.reviews}
      />

      {/* Deep Archival Sections */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start pt-6 border-t border-[#EADECA]">
        {/* Main Cultural Narrative (Col 8) */}
        <div className="lg:col-span-8 space-y-8">
          {/* 1. Cultural Significance */}
          <section className="bg-white rounded-3xl border border-[#EADECA] p-6 lg:p-8 space-y-4 shadow-xs">
            <div className="flex items-center gap-2 pb-3 border-b border-[#EADECA]">
              <div className="w-8 h-8 rounded-lg bg-[#C84B31]/10 flex items-center justify-center text-[#C84B31]">
                <BookOpen className="w-4 h-4" />
              </div>
              <h2 className="font-serif font-bold text-xl text-[#1E1B18]">
                Cultural Significance & Ritual Lore
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-neutral-700 leading-relaxed font-sans">
              {dish.culturalSignificance}
            </p>
          </section>

          {/* 2. Historical Background */}
          <section className="bg-white rounded-3xl border border-[#EADECA] p-6 lg:p-8 space-y-4 shadow-xs">
            <div className="flex items-center gap-2 pb-3 border-b border-[#EADECA]">
              <div className="w-8 h-8 rounded-lg bg-[#7A3E26]/10 flex items-center justify-center text-[#7A3E26]">
                <Sparkles className="w-4 h-4" />
              </div>
              <h2 className="font-serif font-bold text-xl text-[#1E1B18]">
                Historical Background & Origin Epigraphy
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-neutral-700 leading-relaxed font-sans">
              {dish.historicalBackground}
            </p>
          </section>

          {/* 3. Grandparent Oral Histories for this Dish */}
          {dish.stories && dish.stories.length > 0 && (
            <section className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="font-serif font-bold text-xl text-[#1E1B18]">
                  Oral Histories & Living Memories ({dish.stories.length})
                </h2>
              </div>
              <div className="space-y-4">
                {dish.stories.map((story) => (
                  <StoryCard key={story.id} story={story as any} />
                ))}
              </div>
            </section>
          )}
        </div>

        {/* Sidebar: Traditional Ingredients & Associated Festivals (Col 4) */}
        <div className="lg:col-span-4 space-y-6">
          {/* Associated Festivals */}
          {dish.festivalDishes && dish.festivalDishes.length > 0 && (
            <div className="bg-white rounded-3xl border border-[#EADECA] p-6 space-y-4 shadow-xs">
              <span className="text-xs font-bold text-[#FF7B54] flex items-center gap-1.5 uppercase tracking-wider">
                <Calendar className="w-4 h-4" />
                Festival Associations
              </span>
              <div className="space-y-3">
                {dish.festivalDishes.map((fd) => (
                  <Link
                    key={fd.festival.id}
                    href={`/festivals/${fd.festival.slug}`}
                    className="block p-3 rounded-2xl bg-[#FDFBF7] border border-[#EADECA] hover:border-[#FF7B54] transition-colors group"
                  >
                    <h4 className="font-serif font-bold text-sm text-[#1E1B18] group-hover:text-[#FF7B54]">
                      {fd.festival.name}
                    </h4>
                    <p className="text-[11px] text-neutral-500 mt-0.5">
                      {fd.festival.monthSeason}
                    </p>
                    {fd.ritualRole && (
                      <span className="inline-block mt-1 text-[10px] text-[#C84B31] font-semibold">
                        Role: {fd.ritualRole}
                      </span>
                    )}
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Traditional Ingredients */}
          {dish.dishIngredients && dish.dishIngredients.length > 0 && (
            <div className="bg-white rounded-3xl border border-[#EADECA] p-6 space-y-4 shadow-xs">
              <span className="text-xs font-bold text-[#2A9D8F] flex items-center gap-1.5 uppercase tracking-wider">
                <Layers className="w-4 h-4" />
                Key Indigenous Ingredients
              </span>
              <div className="space-y-2.5">
                {dish.dishIngredients.map((di) => (
                  <Link
                    key={di.ingredient.id}
                    href={`/ingredients/${di.ingredient.slug}`}
                    className="flex items-center justify-between p-2.5 rounded-xl bg-[#FDFBF7] border border-[#EADECA] hover:border-[#2A9D8F] transition-colors group"
                  >
                    <div>
                      <h5 className="font-serif font-bold text-xs text-[#1E1B18] group-hover:text-[#2A9D8F]">
                        {di.ingredient.name}
                      </h5>
                      <span className="text-[10px] text-neutral-500">
                        {di.ingredient.category}
                      </span>
                    </div>
                    <span className="text-xs text-[#2A9D8F] font-bold">→</span>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Related Regional Dishes */}
      {relatedDishes && relatedDishes.length > 0 && (
        <div className="pt-10 border-t border-[#EADECA] space-y-6">
          <h3 className="font-serif font-bold text-2xl text-[#1E1B18]">
            Related Regional Dishes
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {relatedDishes.map((rDish) => (
              <DishCard key={rDish.id} dish={rDish as any} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
