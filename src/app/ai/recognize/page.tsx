import React from 'react';
import FoodRecognitionWidget from '@/components/ai/FoodRecognitionWidget';
import { Metadata } from 'next';
import { Sparkles, ShieldCheck, Zap } from 'lucide-react';

export const metadata: Metadata = {
  title: 'AI Food Recognition — Heritage Food Atlas',
  description: 'Identify traditional Indian dishes with AI vision and connect directly with verified cultural heritage profiles.',
};

export default function AIRecognizePage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      <div className="space-y-2 text-center max-w-2xl mx-auto">
        <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#FF7B54]/10 text-[#C84B31] border border-[#FF7B54]/20 inline-block">
          AI Vision Identifier
        </span>
        <h1 className="font-serif font-bold text-3xl sm:text-4xl text-[#1E1B18]">
          AI Traditional Food Recognition
        </h1>
        <p className="text-sm text-neutral-600 leading-relaxed font-sans">
          Upload any picture of traditional Indian food to analyze regional textures, tempering signatures, and culinary lineage.
        </p>
      </div>

      <FoodRecognitionWidget />

      {/* Preservation note */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4">
        <div className="p-5 rounded-2xl bg-white border border-[#EADECA] space-y-2">
          <div className="w-8 h-8 rounded-lg bg-[#C84B31]/10 flex items-center justify-center text-[#C84B31]">
            <Sparkles className="w-4 h-4" />
          </div>
          <h3 className="font-serif font-bold text-sm text-[#1E1B18]">
            Multi-Tiered Vision Model
          </h3>
          <p className="text-xs text-neutral-600 leading-relaxed">
            Uses advanced multimodal vision models with intelligent fallback heuristic analysis to guarantee 100% operational uptime.
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-[#EADECA] space-y-2">
          <div className="w-8 h-8 rounded-lg bg-[#2A9D8F]/10 flex items-center justify-center text-[#2A9D8F]">
            <ShieldCheck className="w-4 h-4" />
          </div>
          <h3 className="font-serif font-bold text-sm text-[#1E1B18]">
            Database Grounding
          </h3>
          <p className="text-xs text-neutral-600 leading-relaxed">
            Predictions are immediately verified and bound to concrete archival database records with cultural and historical citations.
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-[#EADECA] space-y-2">
          <div className="w-8 h-8 rounded-lg bg-[#E9C46A]/20 flex items-center justify-center text-[#7A3E26]">
            <Zap className="w-4 h-4" />
          </div>
          <h3 className="font-serif font-bold text-sm text-[#1E1B18]">
            Confidence Transparency
          </h3>
          <p className="text-xs text-neutral-600 leading-relaxed">
            Transparently displays probability metrics and key visual markers used to classify the regional tradition.
          </p>
        </div>
      </div>
    </div>
  );
}
