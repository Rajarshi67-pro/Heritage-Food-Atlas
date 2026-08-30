'use client';

import React from 'react';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html>
      <body className="min-h-screen bg-[#FDFBF7] text-[#1E1B18] flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-3xl border border-[#EADECA] p-8 text-center shadow-xl space-y-6">
          <div className="w-16 h-16 rounded-2xl bg-red-100 text-red-600 flex items-center justify-center text-2xl mx-auto">
            ⚠️
          </div>

          <div className="space-y-2">
            <h2 className="font-serif font-bold text-2xl text-[#1E1B18]">
              Application Error
            </h2>
            <p className="text-xs text-neutral-600 leading-relaxed font-sans">
              An unexpected global error occurred in the Heritage Food Atlas.
            </p>
          </div>

          <button
            onClick={() => reset()}
            className="px-6 py-2.5 rounded-xl bg-[#C84B31] text-white text-xs font-bold shadow-md hover:bg-[#A33B24] transition-all"
          >
            Reload Heritage Atlas
          </button>
        </div>
      </body>
    </html>
  );
}
