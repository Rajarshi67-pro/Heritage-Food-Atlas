import React from 'react';
import { Metadata } from 'next';
import { ShieldCheck, Heart, Sparkles, BookOpen, Layers, MapPin } from 'lucide-react';

export const metadata: Metadata = {
  title: 'About the Mission — Heritage Food Atlas',
  description: 'Learn about the culinary anthropology, methodology, and oral history preservation framework behind the Heritage Food Atlas of India.',
};

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12 space-y-12">
      {/* Header */}
      <div className="space-y-3 text-center">
        <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#C84B31]/10 text-[#C84B31] border border-[#C84B31]/20 inline-block">
          Preservation Mission & Philosophy
        </span>
        <h1 className="font-serif font-bold text-3xl sm:text-5xl text-[#1E1B18]">
          Preserving the Living Soul of Indian Gastronomy
        </h1>
        <p className="font-serif text-base text-[#7A3E26] italic max-w-xl mx-auto">
          &ldquo;Preserving not just what India eats, but why India eats it.&rdquo;
        </p>
      </div>

      {/* Main Narrative */}
      <div className="bg-white rounded-3xl border border-[#EADECA] p-6 sm:p-10 shadow-xs space-y-6 text-xs sm:text-sm text-neutral-700 leading-relaxed font-sans">
        <p>
          India&apos;s culinary heritage is among the oldest, richest, and most ecologically sophisticated on Earth. Unlike generic recipe catalogs that reduce cooking to sterile ingredient lists and cooking times, <strong>Heritage Food Atlas</strong> treats Indian food as a living convergence of <strong>Geography, Ritual Calendars, Agrarian Cycles, Ancient Epigraphy, and Domestic Memory</strong>.
        </p>

        <h3 className="font-serif font-bold text-xl text-[#1E1B18] pt-2">
          The Five Pillars of Our Archival Framework
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
          <div className="p-4 rounded-2xl bg-[#FDFBF7] border border-[#EADECA] space-y-2">
            <span className="text-xs font-bold text-[#C84B31] flex items-center gap-1.5 uppercase tracking-wider">
              <MapPin className="w-4 h-4" />
              1. Terroir & Agro-Climates
            </span>
            <p className="text-xs text-neutral-600">
              Connecting dishes directly to regional soil types, micro-climates, monsoon patterns, and indigenous seed varieties.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-[#FDFBF7] border border-[#EADECA] space-y-2">
            <span className="text-xs font-bold text-[#2A9D8F] flex items-center gap-1.5 uppercase tracking-wider">
              <BookOpen className="w-4 h-4" />
              2. Epigraphy & Literature
            </span>
            <p className="text-xs text-neutral-600">
              Cross-referencing preparations against medieval texts, temple inscriptions (such as Chola temple endowments and Jagannath temple records), and regional literature.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-[#FDFBF7] border border-[#EADECA] space-y-2">
            <span className="text-xs font-bold text-[#FF7B54] flex items-center gap-1.5 uppercase tracking-wider">
              <Heart className="w-4 h-4" />
              3. Living Oral History
            </span>
            <p className="text-xs text-neutral-600">
              Audio recordings and transcripts of domestic grandmother narratives, preserving maternal wisdom before it is lost.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-[#FDFBF7] border border-[#EADECA] space-y-2">
            <span className="text-xs font-bold text-[#1A2E40] flex items-center gap-1.5 uppercase tracking-wider">
              <Sparkles className="w-4 h-4 text-[#E9C46A]" />
              4. Grounded Responsible AI
            </span>
            <p className="text-xs text-neutral-600">
              Deploying vision recognition and RAG conversational intelligence strictly bounded by verified historical facts.
            </p>
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-amber-50 border border-amber-200 text-xs text-amber-900 space-y-2 mt-4">
          <div className="flex items-center gap-2 font-bold text-[#C84B31]">
            <ShieldCheck className="w-4 h-4" />
            <span>Anti-Hallucination Curation Standard</span>
          </div>
          <p className="text-amber-800 leading-relaxed">
            All database entries, AI responses, and educational summaries are peer-verified. When historical provenance is based on oral folklore rather than stone epigraphy, it is transparently labeled as community oral memory.
          </p>
        </div>
      </div>
    </div>
  );
}
