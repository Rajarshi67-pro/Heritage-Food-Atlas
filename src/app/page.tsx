import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import prisma from '@/lib/prisma';
import DishCard from '@/components/ui/DishCard';
import FestivalCard from '@/components/ui/FestivalCard';
import StoryCard from '@/components/ui/StoryCard';
import TrailCard from '@/components/ui/TrailCard';
import IndiaFoodMap from '@/components/map/IndiaFoodMap';
import FoodRecognitionWidget from '@/components/ai/FoodRecognitionWidget';
import HeritageChatbot from '@/components/ai/HeritageChatbot';
import HeritageQuiz from '@/components/interactive/HeritageQuiz';
import {
  Sparkles,
  MapPin,
  BookOpen,
  ArrowRight,
  ShieldCheck,
  Compass,
  Mic,
  Calendar,
  Layers,
  Award,
} from 'lucide-react';

export const revalidate = 60; // ISR cache revalidation

export default async function HomePage() {
  const [featuredDishes, festivals, stories, trails, stats] = await Promise.all([
    prisma.dish.findMany({
      take: 6,
      orderBy: { viewsCount: 'desc' },
      include: {
        state: true,
        _count: { select: { stories: true, favorites: true } },
      },
    }),
    prisma.festival.findMany({
      take: 3,
      include: {
        festivalDishes: { include: { dish: true } },
      },
    }),
    prisma.story.findMany({
      where: { status: 'APPROVED' },
      take: 2,
      include: {
        dish: { include: { state: true } },
        user: true,
      },
      orderBy: { createdAt: 'desc' },
    }),
    prisma.foodTrail.findMany({
      where: { isPublished: true },
      take: 2,
      include: {
        stops: { orderBy: { orderIndex: 'asc' } },
        user: true,
      },
    }),
    Promise.all([
      prisma.dish.count(),
      prisma.state.count(),
      prisma.story.count({ where: { status: 'APPROVED' } }),
      prisma.dish.count({ where: { isGiTagged: true } }),
    ]),
  ]);

  const [dishCount, stateCount, storyCount, giCount] = stats;

  return (
    <div className="space-y-20 pb-20">
      {/* 1. Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#F5EFEB] to-[#FDFBF7] pt-12 pb-20 border-b border-[#EADECA]">
        {/* Background Subtle Motifs */}
        <div className="absolute inset-0 bg-mandala opacity-60 pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 text-center">
          {/* Tagline Pill */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-[#EADECA] shadow-xs">
            <span className="text-sm">🇮🇳</span>
            <span className="text-xs font-bold text-[#7A3E26] tracking-wide uppercase">
              National Digital Culinary Archive
            </span>
          </div>

          {/* Main Hero Header */}
          <div className="max-w-4xl mx-auto space-y-4">
            <h1 className="font-serif font-bold text-4xl sm:text-6xl text-[#1E1B18] tracking-tight leading-[1.15]">
              Preserving Not Just <span className="text-[#C84B31] italic">What</span> India Eats, But{' '}
              <span className="text-[#2A9D8F] italic">Why</span> India Eats It.
            </h1>
            <p className="text-base sm:text-lg text-neutral-600 max-w-2xl mx-auto font-sans leading-relaxed">
              An AI-powered digital sanctuary connecting geography, harvest calendars, ancestral memory, and ancient Ayurvedic gastronomy across India.
            </p>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <Link
              href="/map"
              className="px-6 py-3.5 rounded-2xl bg-[#C84B31] hover:bg-[#A33B24] text-white font-bold text-sm shadow-md hover:shadow-lg transition-all flex items-center gap-2"
            >
              <MapPin className="w-4 h-4" />
              <span>Explore India Food Map</span>
            </Link>
            <Link
              href="/ai/recognize"
              className="px-6 py-3.5 rounded-2xl bg-[#FF7B54]/15 hover:bg-[#FF7B54]/25 text-[#C84B31] border border-[#FF7B54]/30 font-bold text-sm transition-all flex items-center gap-2"
            >
              <Sparkles className="w-4 h-4" />
              <span>AI Food Recognition</span>
            </Link>
            <Link
              href="/ai/storyteller"
              className="px-6 py-3.5 rounded-2xl bg-white hover:bg-[#F5EFEB] text-[#1E1B18] border border-[#EADECA] font-bold text-sm transition-all flex items-center gap-2 shadow-xs"
            >
              <BookOpen className="w-4 h-4 text-[#2A9D8F]" />
              <span>Ask Heritage Storyteller</span>
            </Link>
          </div>

          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto pt-8">
            <div className="p-4 bg-white/90 backdrop-blur-xs rounded-2xl border border-[#EADECA] shadow-xs">
              <span className="font-serif font-bold text-3xl text-[#C84B31] block">
                {dishCount}+
              </span>
              <span className="text-xs font-semibold text-neutral-600">
                Documented Dishes
              </span>
            </div>
            <div className="p-4 bg-white/90 backdrop-blur-xs rounded-2xl border border-[#EADECA] shadow-xs">
              <span className="font-serif font-bold text-3xl text-[#2A9D8F] block">
                {stateCount}
              </span>
              <span className="text-xs font-semibold text-neutral-600">
                States & UTs Covered
              </span>
            </div>
            <div className="p-4 bg-white/90 backdrop-blur-xs rounded-2xl border border-[#EADECA] shadow-xs">
              <span className="font-serif font-bold text-3xl text-[#E9C46A] block">
                {storyCount}+
              </span>
              <span className="text-xs font-semibold text-neutral-600">
                Oral History Narrations
              </span>
            </div>
            <div className="p-4 bg-white/90 backdrop-blur-xs rounded-2xl border border-[#EADECA] shadow-xs">
              <span className="font-serif font-bold text-3xl text-[#7A3E26] block">
                {giCount}+
              </span>
              <span className="text-xs font-semibold text-neutral-600">
                GI-Tagged Specialties
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Interactive India Food Map Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <IndiaFoodMap />
      </section>

      {/* 3. Featured Regional Dishes Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <div className="flex items-center gap-1.5 text-xs font-bold text-[#C84B31] uppercase tracking-wider mb-1">
              <Compass className="w-3.5 h-3.5" />
              Gastronomic Treasures
            </div>
            <h2 className="font-serif font-bold text-3xl text-[#1E1B18]">
              Living Culinary Biodiversity
            </h2>
            <p className="text-xs text-neutral-600 mt-1 max-w-xl">
              Authentic heirloom recipes shaped by regional soil microclimates, native grains, and multi-generational wisdom.
            </p>
          </div>

          <Link
            href="/explore"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-[#C84B31] hover:underline"
          >
            <span>View All Documented Dishes</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredDishes.map((dish) => (
            <DishCard key={dish.id} dish={dish as any} />
          ))}
        </div>
      </section>

      {/* 4. Interactive Heritage Culinary Quiz */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <HeritageQuiz />
      </section>

      {/* 5. AI Vision Food Recognition Spotlight */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FoodRecognitionWidget />
      </section>

      {/* 6. Festival Food Explorer Highlight */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <div className="flex items-center gap-1.5 text-xs font-bold text-[#FF7B54] uppercase tracking-wider mb-1">
              <Calendar className="w-3.5 h-3.5" />
              Ritual Calendars & Harvest Feasts
            </div>
            <h2 className="font-serif font-bold text-3xl text-[#1E1B18]">
              Sacred Festival Food Traditions
            </h2>
            <p className="text-xs text-neutral-600 mt-1 max-w-xl">
              Explore how agricultural harvests, celestial solstices, and spiritual rites determine sacred feast menus.
            </p>
          </div>

          <Link
            href="/festivals"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-[#FF7B54] hover:underline"
          >
            <span>Explore All Festivals</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {festivals.map((fest) => (
            <FestivalCard key={fest.id} festival={fest as any} />
          ))}
        </div>
      </section>

      {/* 7. Grandparents Oral History Archive Spotlight */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <div className="flex items-center gap-1.5 text-xs font-bold text-[#7A3E26] uppercase tracking-wider mb-1">
              <Mic className="w-3.5 h-3.5 text-[#C84B31]" />
              Oral History Preservation
            </div>
            <h2 className="font-serif font-bold text-3xl text-[#1E1B18]">
              Stories from Our Grandparents
            </h2>
            <p className="text-xs text-neutral-600 mt-1 max-w-xl">
              Preserving domestic culinary lore, earthen hearth memories, and grandmother narrations before they are forgotten.
            </p>
          </div>

          <Link
            href="/stories"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-[#7A3E26] hover:underline"
          >
            <span>Listen to All Stories</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {stories.map((story) => (
            <StoryCard key={story.id} story={story as any} />
          ))}
        </div>
      </section>

      {/* 8. AI Heritage Storyteller RAG Chatbot Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <HeritageChatbot />
      </section>

      {/* 9. Culinary Trails Spotlight */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <div className="flex items-center gap-1.5 text-xs font-bold text-[#1A2E40] uppercase tracking-wider mb-1">
              <MapPin className="w-3.5 h-3.5 text-[#E9C46A]" />
              Culinary Tourism & Gastronomic Walks
            </div>
            <h2 className="font-serif font-bold text-3xl text-[#1E1B18]">
              Historic Food Trails & Routes
            </h2>
            <p className="text-xs text-neutral-600 mt-1 max-w-xl">
              Curated walking routes through historic food alleys, spice quarters, and century-old sweet dynasties.
            </p>
          </div>

          <Link
            href="/trails"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-[#1A2E40] hover:underline"
          >
            <span>View All Culinary Trails</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {trails.map((trail) => (
            <TrailCard key={trail.id} trail={trail as any} />
          ))}
        </div>
      </section>
    </div>
  );
}
