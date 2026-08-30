'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import { AlertTriangle, RotateCcw, Home, Compass } from 'lucide-react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('App Router caught error:', error);
  }, [error]);

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 py-16">
      <div className="max-w-md w-full bg-white rounded-3xl border border-[#EADECA] p-8 text-center shadow-lg space-y-6">
        <div className="w-16 h-16 rounded-2xl bg-red-50 border border-red-200 text-red-600 flex items-center justify-center mx-auto shadow-inner">
          <AlertTriangle className="w-8 h-8" />
        </div>

        <div className="space-y-2">
          <span className="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-red-100 text-red-800 border border-red-200">
            System Notice
          </span>
          <h2 className="font-serif font-bold text-2xl text-[#1E1B18]">
            Something went wrong
          </h2>
          <p className="text-xs text-neutral-600 leading-relaxed font-sans">
            {error?.message || 'An unexpected error occurred while retrieving heritage records.'}
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <button
            onClick={() => reset()}
            className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-[#C84B31] hover:bg-[#A33B24] text-white text-xs font-bold transition-all flex items-center justify-center gap-2 shadow-xs"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Try Again</span>
          </button>
          <Link
            href="/"
            className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-[#F5EFEB] hover:bg-[#EADECA] text-[#1E1B18] text-xs font-bold transition-all flex items-center justify-center gap-2"
          >
            <Home className="w-4 h-4 text-[#7A3E26]" />
            <span>Return Home</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
