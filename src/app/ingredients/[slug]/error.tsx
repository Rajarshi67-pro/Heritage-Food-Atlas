'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowLeft, RotateCcw, Layers } from 'lucide-react';

export default function IngredientError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="max-w-xl mx-auto px-4 py-20 text-center space-y-6">
      <div className="w-16 h-16 rounded-2xl bg-emerald-50 border border-emerald-200 text-[#2A9D8F] flex items-center justify-center mx-auto">
        <Layers className="w-8 h-8" />
      </div>

      <div className="space-y-2">
        <h2 className="font-serif font-bold text-2xl text-[#1E1B18]">
          Unable to Load Ingredient Profile
        </h2>
        <p className="text-xs text-neutral-600 leading-relaxed">
          {error?.message || 'We encountered an issue retrieving this ingredient record.'}
        </p>
      </div>

      <div className="flex items-center justify-center gap-3">
        <button
          onClick={() => reset()}
          className="px-5 py-2.5 rounded-xl bg-[#2A9D8F] hover:bg-[#238276] text-white text-xs font-bold transition-all flex items-center gap-2"
        >
          <RotateCcw className="w-4 h-4" />
          <span>Retry</span>
        </button>
        <Link
          href="/ingredients"
          className="px-5 py-2.5 rounded-xl bg-[#F5EFEB] hover:bg-[#EADECA] text-[#1E1B18] text-xs font-bold transition-all flex items-center gap-2"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Ingredients</span>
        </Link>
      </div>
    </div>
  );
}
