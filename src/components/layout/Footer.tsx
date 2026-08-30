'use client';

import React from 'react';
import Link from 'next/link';
import { useI18n } from '@/lib/i18n/context';
import { Heart, ShieldCheck, Sparkles, BookOpen, Compass, MapPin } from 'lucide-react';

export default function Footer() {
  const { t, locale, setLocale } = useI18n();

  return (
    <footer className="bg-[#1E1B18] text-[#F5EFEB] border-t border-[#3A332C] pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-[#3A332C]">
          {/* Brand Column */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#C84B31] to-[#FF7B54] flex items-center justify-center text-white text-xl">
                🍛
              </div>
              <span className="font-serif font-bold text-2xl text-white">
                {t('app_name')}
              </span>
            </div>
            <p className="text-sm text-[#D4A373] leading-relaxed max-w-md font-serif italic">
              &ldquo;{t('tagline')}&rdquo;
            </p>
            <p className="text-xs text-neutral-400 leading-relaxed max-w-md">
              A national digital mission to document, preserve, and safeguard the living culinary biodiversity, ritual food calendars, and oral gastronomic traditions across all Indian states and micro-regions.
            </p>
            <div className="flex items-center gap-2 pt-2">
              <span className="text-xs text-neutral-400 font-medium">Languages:</span>
              <button
                onClick={() => setLocale('en')}
                className={`px-2.5 py-1 text-xs rounded ${locale === 'en' ? 'bg-[#C84B31] text-white font-bold' : 'bg-neutral-800 text-neutral-300'}`}
              >
                English
              </button>
              <button
                onClick={() => setLocale('hi')}
                className={`px-2.5 py-1 text-xs rounded ${locale === 'hi' ? 'bg-[#C84B31] text-white font-bold' : 'bg-neutral-800 text-neutral-300'}`}
              >
                हिन्दी
              </button>
              <button
                onClick={() => setLocale('bn')}
                className={`px-2.5 py-1 text-xs rounded ${locale === 'bn' ? 'bg-[#C84B31] text-white font-bold' : 'bg-neutral-800 text-neutral-300'}`}
              >
                বাংলা
              </button>
            </div>
          </div>

          {/* Quick Exploration */}
          <div>
            <h4 className="font-semibold text-sm text-[#E9C46A] uppercase tracking-wider mb-4">
              Culinary Exploration
            </h4>
            <ul className="space-y-2.5 text-xs text-neutral-300">
              <li>
                <Link href="/map" className="hover:text-[#FF7B54] transition-colors flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-[#FF7B54]" />
                  India Food Map
                </Link>
              </li>
              <li>
                <Link href="/explore" className="hover:text-[#FF7B54] transition-colors flex items-center gap-1.5">
                  <Compass className="w-3.5 h-3.5 text-[#FF7B54]" />
                  Search Heritage Dishes
                </Link>
              </li>
              <li>
                <Link href="/festivals" className="hover:text-[#FF7B54] transition-colors">
                  Harvest & Festival Foods
                </Link>
              </li>
              <li>
                <Link href="/ingredients" className="hover:text-[#FF7B54] transition-colors">
                  Indigenous Ingredients
                </Link>
              </li>
              <li>
                <Link href="/trails" className="hover:text-[#FF7B54] transition-colors">
                  Historic Food Trails
                </Link>
              </li>
            </ul>
          </div>

          {/* AI & Preservation */}
          <div>
            <h4 className="font-semibold text-sm text-[#E9C46A] uppercase tracking-wider mb-4">
              AI & Living Memory
            </h4>
            <ul className="space-y-2.5 text-xs text-neutral-300">
              <li>
                <Link href="/ai/recognize" className="hover:text-[#FF7B54] transition-colors flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-[#FF7B54]" />
                  AI Vision Recognition
                </Link>
              </li>
              <li>
                <Link href="/ai/storyteller" className="hover:text-[#FF7B54] transition-colors flex items-center gap-1.5">
                  <BookOpen className="w-3.5 h-3.5 text-[#FF7B54]" />
                  AI Heritage Storyteller (RAG)
                </Link>
              </li>
              <li>
                <Link href="/stories" className="hover:text-[#FF7B54] transition-colors">
                  Grandparents Oral History
                </Link>
              </li>
              <li>
                <Link href="/contribute" className="hover:text-[#FF7B54] transition-colors">
                  Citizen Contribution Portal
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-[#FF7B54] transition-colors">
                  Preservation Methodology
                </Link>
              </li>
            </ul>
          </div>

          {/* Standards & Trust */}
          <div>
            <h4 className="font-semibold text-sm text-[#E9C46A] uppercase tracking-wider mb-4">
              Curation & Integrity
            </h4>
            <div className="p-3.5 rounded-xl bg-neutral-800/80 border border-neutral-700/60 text-xs space-y-2">
              <div className="flex items-center gap-1.5 text-emerald-400 font-semibold">
                <ShieldCheck className="w-4 h-4" />
                Verified Fact Canon
              </div>
              <p className="text-[11px] text-neutral-400 leading-snug">
                Every dish record is verified through historical literature, GI registries, or community peer review.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-400">
          <p>© {new Date().getFullYear()} Heritage Food Atlas of India. All rights reserved.</p>
          <div className="flex items-center gap-1">
            <span>Built with reverence for</span>
            <Heart className="w-3.5 h-3.5 text-[#C84B31] fill-current" />
            <span>India&apos;s living gastronomic heritage.</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
