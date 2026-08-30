import React from 'react';

export default function Loading() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center space-y-4 px-4">
      <div className="relative w-16 h-16">
        <div className="w-16 h-16 rounded-full border-4 border-[#EADECA] border-t-[#C84B31] animate-spin" />
        <div className="absolute inset-0 flex items-center justify-center text-xl">
          🍛
        </div>
      </div>
      <div className="text-center space-y-1">
        <h3 className="font-serif font-bold text-sm text-[#1E1B18]">
          Consulting Heritage Food Archives...
        </h3>
        <p className="text-xs text-neutral-500 font-sans">
          Loading authentic regional records and oral histories.
        </p>
      </div>
    </div>
  );
}
