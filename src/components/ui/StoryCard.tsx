'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Mic, MapPin, User, ArrowRight, Play, Heart } from 'lucide-react';
import AudioStoryPlayer from '@/components/audio/AudioStoryPlayer';

interface StoryCardProps {
  story: {
    id: string;
    title: string;
    storytellerName: string;
    generation: string;
    community?: string;
    location: string;
    content: string;
    audioUrl?: string;
    audioDuration?: number;
    transcript?: string;
    mediaUrl?: string;
    dish?: { name: string; slug: string; state?: { name: string } };
    user?: { name: string };
  };
}

export default function StoryCard({ story }: StoryCardProps) {
  const [imgSrc, setImgSrc] = useState(story.mediaUrl || '/images/dishes/patishapta.jpg');

  return (
    <div className="bg-white rounded-3xl border border-[#EADECA] p-6 space-y-5 hover:shadow-lg hover:border-[#7A3E26]/40 transition-all">
      <div className="flex items-start justify-between gap-4">
        <div className="space-y-1">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#FF7B54]/15 text-[#C84B31] border border-[#FF7B54]/20 flex items-center gap-1">
              <Mic className="w-3 h-3" />
              {story.generation}
            </span>
            {story.community && (
              <span className="text-[11px] text-neutral-500 font-medium">
                • {story.community}
              </span>
            )}
          </div>
          <h3 className="font-serif font-bold text-xl text-[#1E1B18] leading-tight">
            {story.title}
          </h3>
        </div>

        {story.dish && (
          <Link
            href={`/dishes/${story.dish.slug}`}
            className="px-3 py-1 rounded-xl bg-[#F5EFEB] border border-[#EADECA] text-xs font-bold text-[#7A3E26] hover:text-[#C84B31] transition-colors shrink-0"
          >
            {story.dish.name}
          </Link>
        )}
      </div>

      <div className="flex items-center gap-2 text-xs text-neutral-500">
        <span className="font-semibold text-[#1E1B18]">
          Voice: {story.storytellerName}
        </span>
        <span>•</span>
        <span className="flex items-center gap-1">
          <MapPin className="w-3 h-3 text-[#C84B31]" />
          {story.location}
        </span>
      </div>

      <p className="text-xs sm:text-sm text-neutral-700 font-serif leading-relaxed italic bg-[#FDFBF7] p-4 rounded-2xl border border-[#EADECA]">
        &ldquo;{story.content}&rdquo;
      </p>

      {/* Audio Player if audio recording exists */}
      {story.audioUrl && (
        <AudioStoryPlayer
          audioUrl={story.audioUrl}
          storytellerName={story.storytellerName}
          transcript={story.transcript}
        />
      )}
    </div>
  );
}
