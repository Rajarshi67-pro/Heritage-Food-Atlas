'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowLeft, RotateCcw, Route } from 'lucide-react';

export default function TrailError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="max-w-xl mx-auto px-4 py-20 text-center space-y-6">
      <div className="w-16 h-16 rounded-2xl bg-sky-50 border border-sky-200 text-[#1A2E40] flex items-center justify-center mx-auto">
        <Route className="w-8 h-8 text-[#E9C46A]" />
      </div>

      <div className="space-y-2">
        <h2 className="font-serif font-bold text-2xl text-[#1E1B18]">
          Unable to Load Trail Route
        </h2>
        <p className="text-xs text-neutral-600 leading-relaxed">
          {error?.message || 'We encountered an issue retrieving this culinary trail route.'}
        </p>
      </div>

      <div className="flex items-center justify-center gap-3">
        <button
          onClick={() => reset()}
          className="px-5 py-2.5 rounded-xl bg-[#1A2E40] hover:bg-neutral-800 text-white text-xs font-bold transition-all flex items-center gap-2"
        >
          <RotateCcw className="w-4 h-4" />
          <span>Retry</span>
        </button>
        <Link
          href="/trails"
          className="px-5 py-2.5 rounded-xl bg-[#F5EFEB] hover:bg-[#EADECA] text-[#1E1B18] text-xs font-bold transition-all flex items-center gap-2"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Trails</span>
        </Link>
      </div>
    </div>
  );
}
