import React from 'react';
import HeritageChatbot from '@/components/ai/HeritageChatbot';
import { Metadata } from 'next';
import { BookOpen, ShieldCheck, HelpCircle } from 'lucide-react';

export const metadata: Metadata = {
  title: 'AI Heritage Storyteller (RAG) — Heritage Food Atlas',
  description: 'Ask deep questions about Indian culinary history, festival associations, and Ayurvedic gastronomic wisdom.',
};

export default function AIStorytellerPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      <div className="space-y-2 text-center max-w-2xl mx-auto">
        <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#2A9D8F]/10 text-[#2A9D8F] border border-[#2A9D8F]/20 inline-block">
          Retrieval-Augmented Generation (RAG)
        </span>
        <h1 className="font-serif font-bold text-3xl sm:text-4xl text-[#1E1B18]">
          AI Heritage Storyteller
        </h1>
        <p className="text-sm text-neutral-600 leading-relaxed font-sans">
          An AI assistant dedicated specifically to Indian gastronomic anthropology, grounded in verified temple literature, historical travelogues, and regional culinary canons.
        </p>
      </div>

      <HeritageChatbot />
    </div>
  );
}
