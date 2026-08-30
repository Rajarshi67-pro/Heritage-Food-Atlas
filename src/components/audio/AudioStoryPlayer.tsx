'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, Volume2, VolumeX, FileText, ChevronDown, ChevronUp } from 'lucide-react';

interface AudioStoryPlayerProps {
  audioUrl?: string | null;
  duration?: number | null;
  transcript?: string | null;
  storytellerName: string;
}

export default function AudioStoryPlayer({
  audioUrl,
  duration = 120,
  transcript,
  storytellerName,
}: AudioStoryPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [showTranscript, setShowTranscript] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const totalSecs = duration || 120;

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying) {
      interval = setInterval(() => {
        setCurrentTime((prev) => {
          if (prev >= totalSecs) {
            setIsPlaying(false);
            return 0;
          }
          return prev + 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isPlaying, totalSecs]);

  const togglePlay = () => {
    if (audioRef.current && audioUrl) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch(() => {});
      }
    }
    setIsPlaying(!isPlaying);
  };

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  return (
    <div className="bg-[#F5EFEB] border border-[#EADECA] rounded-xl p-3.5 space-y-2.5">
      {audioUrl && (
        <audio
          ref={audioRef}
          src={audioUrl}
          onEnded={() => {
            setIsPlaying(false);
            setCurrentTime(0);
          }}
          className="hidden"
        />
      )}

      {/* Audio Waveform / Track Header */}
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <button
            onClick={togglePlay}
            className={`w-9 h-9 rounded-full flex items-center justify-center text-white transition-transform hover:scale-105 shadow-xs ${
              isPlaying ? 'bg-[#2A9D8F]' : 'bg-[#C84B31]'
            }`}
            title={isPlaying ? 'Pause Narration' : 'Listen to Oral Narration'}
          >
            {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 ml-0.5" />}
          </button>
          <div>
            <span className="text-xs font-bold text-[#1E1B18] block">
              {isPlaying ? 'Listening to' : 'Listen to'} {storytellerName}
            </span>
            <span className="text-[10px] text-neutral-500 font-mono">
              {formatTime(currentTime)} / {formatTime(totalSecs)}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-1.5">
          {transcript && (
            <button
              onClick={() => setShowTranscript(!showTranscript)}
              className={`px-2 py-1 rounded-md text-[11px] font-semibold flex items-center gap-1 transition-colors ${
                showTranscript
                  ? 'bg-[#C84B31] text-white'
                  : 'bg-white text-[#7A3E26] border border-[#EADECA] hover:bg-neutral-50'
              }`}
            >
              <FileText className="w-3 h-3" />
              <span>Transcript</span>
              {showTranscript ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
            </button>
          )}
        </div>
      </div>

      {/* Animated Waveform Visualizer */}
      <div className="flex items-center gap-1 h-6 bg-white/70 rounded-lg px-2.5 py-1 border border-[#EADECA]/70">
        {Array.from({ length: 28 }).map((_, idx) => {
          const isPassed = (currentTime / totalSecs) * 28 > idx;
          const randomHeight = isPlaying
            ? Math.max(20, Math.sin(idx + currentTime) * 80 + 20)
            : ((idx * 7) % 60) + 20;

          return (
            <div
              key={idx}
              className={`flex-1 rounded-full transition-all duration-200 ${
                isPassed ? 'bg-[#C84B31]' : 'bg-neutral-300'
              }`}
              style={{ height: `${randomHeight}%` }}
            />
          );
        })}
      </div>

      {/* Expandable Transcript */}
      {showTranscript && transcript && (
        <div className="pt-2 border-t border-[#EADECA] text-xs text-neutral-700 font-serif italic bg-white/80 p-3 rounded-lg leading-relaxed">
          &ldquo;{transcript}&rdquo;
        </div>
      )}
    </div>
  );
}
