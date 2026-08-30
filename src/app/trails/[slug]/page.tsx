import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import prisma from '@/lib/prisma';
import { MapPin, Clock, ArrowLeft, Route, Utensils, Compass, Navigation } from 'lucide-react';

interface TrailDetailPageProps {
  params: { slug: string };
}

export default async function TrailDetailPage({ params }: TrailDetailPageProps) {
  const trail = await prisma.foodTrail.findUnique({
    where: { slug: params.slug },
    include: {
      stops: {
        orderBy: { orderIndex: 'asc' },
        include: { specialtyDish: true },
      },
      user: true,
    },
  });

  if (!trail) {
    notFound();
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      <div>
        <Link
          href="/trails"
          className="inline-flex items-center gap-1.5 text-xs font-bold text-[#7A3E26] hover:text-[#1A2E40] transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to All Trails</span>
        </Link>
      </div>

      {/* Hero */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <div className="lg:col-span-6">
          <div className="relative h-80 w-full rounded-3xl overflow-hidden shadow-md border border-[#EADECA] bg-neutral-100">
            <Image
              src={trail.imageUrl}
              alt={trail.title}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
            <div className="absolute top-4 left-4">
              <span className="px-3 py-1 rounded-xl text-xs font-bold bg-[#1A2E40] text-white flex items-center gap-1.5 shadow-sm">
                <MapPin className="w-3.5 h-3.5 text-[#E9C46A]" />
                {trail.cityState}
              </span>
            </div>
          </div>
        </div>

        <div className="lg:col-span-6 space-y-4">
          <h1 className="font-serif font-bold text-3xl sm:text-4xl text-[#1E1B18]">
            {trail.title}
          </h1>

          <p className="text-sm text-neutral-700 leading-relaxed font-sans">
            {trail.description}
          </p>

          <div className="grid grid-cols-2 gap-3 pt-2">
            <div className="p-3.5 bg-[#FDFBF7] border border-[#EADECA] rounded-2xl">
              <span className="text-[10px] font-bold text-neutral-500 uppercase tracking-wider block">
                Estimated Duration
              </span>
              <span className="text-xs font-bold text-[#1E1B18] mt-0.5 block">
                {trail.estimatedDuration}
              </span>
            </div>

            <div className="p-3.5 bg-[#FDFBF7] border border-[#EADECA] rounded-2xl">
              <span className="text-[10px] font-bold text-neutral-500 uppercase tracking-wider block">
                Recommended Timing
              </span>
              <span className="text-xs font-bold text-[#1E1B18] mt-0.5 block">
                {trail.bestTime}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Itinerary Waypoints */}
      <section className="space-y-6 pt-6 border-t border-[#EADECA]">
        <div className="flex items-center justify-between">
          <h2 className="font-serif font-bold text-2xl text-[#1E1B18] flex items-center gap-2">
            <Route className="w-6 h-6 text-[#1A2E40]" />
            Trail Itinerary ({trail.stops.length} Historic Stops)
          </h2>
        </div>

        <div className="space-y-6">
          {trail.stops.map((stop, idx) => (
            <div
              key={stop.id}
              className="bg-white rounded-3xl border border-[#EADECA] p-6 lg:p-7 shadow-xs space-y-4 flex flex-col md:flex-row md:items-start gap-6"
            >
              <div className="w-12 h-12 rounded-2xl bg-[#1A2E40] text-[#E9C46A] flex items-center justify-center font-bold text-lg shrink-0 shadow-sm">
                #{stop.orderIndex}
              </div>

              <div className="flex-1 space-y-2">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <h3 className="font-serif font-bold text-lg text-[#1E1B18]">
                    {stop.placeName}
                  </h3>
                  <span className="px-3 py-1 rounded-xl bg-orange-50 text-[#C84B31] border border-orange-200 text-xs font-bold w-fit">
                    Must Taste: {stop.specialtyDishName}
                  </span>
                </div>

                <p className="text-xs sm:text-sm text-neutral-700 leading-relaxed font-serif italic">
                  &ldquo;{stop.historicalNote}&rdquo;
                </p>

                <div className="flex items-center gap-4 text-xs text-neutral-500 pt-2 font-mono">
                  <span className="flex items-center gap-1">
                    <Navigation className="w-3.5 h-3.5 text-[#2A9D8F]" />
                    Geo: {stop.latitude.toFixed(4)}, {stop.longitude.toFixed(4)}
                  </span>
                  {stop.specialtyDish && (
                    <Link
                      href={`/dishes/${stop.specialtyDish.slug}`}
                      className="font-sans font-bold text-[#C84B31] hover:underline flex items-center gap-1"
                    >
                      <Utensils className="w-3 h-3" />
                      <span>View Dish Heritage Record →</span>
                    </Link>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
