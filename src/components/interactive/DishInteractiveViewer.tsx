'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import {
  Sparkles,
  Camera,
  ChefHat,
  CheckCircle2,
  Play,
  Pause,
  RotateCcw,
  Star,
  MessageSquare,
  Activity,
  Heart,
} from 'lucide-react';
import { useAuth } from '@/lib/auth-context';

interface DishInteractiveViewerProps {
  dishId: string;
  dishName: string;
  cuisine: string;
  mainImage: string;
  galleryImages?: string[];
  preparationText: string;
  reviews?: any[];
}

export default function DishInteractiveViewer({
  dishId,
  dishName,
  cuisine,
  mainImage,
  galleryImages = [],
  preparationText,
  reviews = [],
}: DishInteractiveViewerProps) {
  const { user } = useAuth();
  const allImages = [mainImage, ...galleryImages.filter((img) => img !== mainImage)];
  const [activePhoto, setActivePhoto] = useState(allImages[0]);
  const [activeTab, setActiveTab] = useState<'GALLERY' | 'COOKING_MODE' | 'AYURVEDA' | 'REVIEWS'>('GALLERY');

  // Cooking Walkthrough state
  const rawSteps = preparationText
    ? preparationText.split('. ').filter((s) => s.trim().length > 5).map((s) => s.trim())
    : ['Prepare traditional ingredients and clay vessel.', 'Slow simmer on wood or low heat.', 'Finish with fragrant regional tempering.'];
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const [timerSecs, setTimerSecs] = useState(300); // 5 mins default
  const [isTimerRunning, setIsTimerRunning] = useState(false);

  // Review state
  const [userRating, setUserRating] = useState(5);
  const [reviewComment, setReviewComment] = useState('');
  const [submittingReview, setSubmittingReview] = useState(false);
  const [reviewList, setReviewList] = useState<any[]>(reviews);
  const [reviewSuccess, setReviewSuccess] = useState(false);

  const toggleStep = (idx: number) => {
    if (completedSteps.includes(idx)) {
      setCompletedSteps(completedSteps.filter((s) => s !== idx));
    } else {
      setCompletedSteps([...completedSteps, idx]);
    }
  };

  React.useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isTimerRunning && timerSecs > 0) {
      interval = setInterval(() => setTimerSecs((s) => s - 1), 1000);
    } else if (timerSecs === 0) {
      setIsTimerRunning(false);
    }
    return () => clearInterval(interval);
  }, [isTimerRunning, timerSecs]);

  const handleReviewSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      window.location.href = '/auth/login';
      return;
    }
    setSubmittingReview(true);
    try {
      const res = await fetch('/api/reviews', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ dishId, rating: userRating, comment: reviewComment }),
      });
      if (res.ok) {
        const data = await res.json();
        setReviewList([data.review, ...reviewList]);
        setReviewComment('');
        setReviewSuccess(true);
        setTimeout(() => setReviewSuccess(false), 4000);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setSubmittingReview(false);
    }
  };

  const formatTimer = (s: number) => {
    const m = Math.floor(s / 60);
    const sec = s % 60;
    return `${m}:${sec < 10 ? '0' : ''}${sec}`;
  };

  return (
    <div className="bg-white rounded-3xl border border-[#EADECA] p-6 lg:p-8 shadow-xs space-y-6">
      {/* Interactive Sub-Header Navigation */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-[#EADECA]">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-[#C84B31] animate-pulse" />
          <h3 className="font-serif font-bold text-lg text-[#1E1B18]">
            Interactive Heritage Studio: {dishName}
          </h3>
        </div>

        <div className="flex flex-wrap items-center gap-1.5 bg-[#F5EFEB] p-1.5 rounded-2xl border border-[#EADECA]">
          <button
            onClick={() => setActiveTab('GALLERY')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
              activeTab === 'GALLERY' ? 'bg-[#C84B31] text-white shadow-xs' : 'text-neutral-600 hover:text-[#C84B31]'
            }`}
          >
            <Camera className="w-3.5 h-3.5" />
            <span>Photo Gallery ({allImages.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('COOKING_MODE')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
              activeTab === 'COOKING_MODE' ? 'bg-[#C84B31] text-white shadow-xs' : 'text-neutral-600 hover:text-[#C84B31]'
            }`}
          >
            <ChefHat className="w-3.5 h-3.5" />
            <span>Interactive Cooking Walkthrough</span>
          </button>

          <button
            onClick={() => setActiveTab('AYURVEDA')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
              activeTab === 'AYURVEDA' ? 'bg-[#C84B31] text-white shadow-xs' : 'text-neutral-600 hover:text-[#C84B31]'
            }`}
          >
            <Activity className="w-3.5 h-3.5" />
            <span>Ayurvedic Rasa Profile</span>
          </button>

          <button
            onClick={() => setActiveTab('REVIEWS')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
              activeTab === 'REVIEWS' ? 'bg-[#C84B31] text-white shadow-xs' : 'text-neutral-600 hover:text-[#C84B31]'
            }`}
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span>Reviews ({reviewList.length})</span>
          </button>
        </div>
      </div>

      {/* 1. Photo Gallery Tab */}
      {activeTab === 'GALLERY' && (
        <div className="space-y-4">
          <div className="relative h-80 sm:h-96 w-full rounded-3xl overflow-hidden bg-neutral-100 border border-[#EADECA] shadow-inner">
            <Image
              src={activePhoto}
              alt={dishName}
              fill
              className="object-cover transition-all duration-500"
              sizes="(max-width: 1024px) 100vw, 80vw"
            />
          </div>

          <div className="flex items-center gap-3 overflow-x-auto pb-2">
            {allImages.map((imgUrl, i) => (
              <button
                key={i}
                onClick={() => setActivePhoto(imgUrl)}
                className={`relative w-20 h-20 rounded-2xl overflow-hidden shrink-0 border-2 transition-all ${
                  activePhoto === imgUrl
                    ? 'border-[#C84B31] ring-2 ring-[#C84B31]/40 scale-105 shadow-md'
                    : 'border-transparent opacity-70 hover:opacity-100'
                }`}
              >
                <Image src={imgUrl} alt={`${dishName} angle ${i + 1}`} fill className="object-cover" />
              </button>
            ))}
          </div>
        </div>
      )}

      {/* 2. Interactive Cooking Walkthrough Mode */}
      {activeTab === 'COOKING_MODE' && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 bg-[#FDFBF7] border border-[#EADECA] rounded-2xl">
            <div className="space-y-0.5">
              <span className="text-xs font-bold text-[#C84B31] uppercase tracking-wider block">
                Heirloom Hearth Walkthrough
              </span>
              <p className="text-xs text-neutral-600">
                {completedSteps.length} of {rawSteps.length} steps completed
              </p>
            </div>

            {/* Built-in Cooking Countdown Timer */}
            <div className="flex items-center gap-3 bg-white px-4 py-2 rounded-xl border border-[#EADECA]">
              <span className="font-mono font-bold text-sm text-[#1E1B18]">
                ⏱️ {formatTimer(timerSecs)}
              </span>
              <button
                onClick={() => setIsTimerRunning(!isTimerRunning)}
                className={`p-1.5 rounded-lg text-white ${isTimerRunning ? 'bg-amber-600' : 'bg-[#2A9D8F]'}`}
                title={isTimerRunning ? 'Pause timer' : 'Start simmer timer'}
              >
                {isTimerRunning ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
              </button>
              <button
                onClick={() => {
                  setIsTimerRunning(false);
                  setTimerSecs(300);
                }}
                className="p-1.5 text-neutral-500 hover:text-[#C84B31]"
                title="Reset timer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          <div className="space-y-3">
            {rawSteps.map((step, idx) => {
              const isDone = completedSteps.includes(idx);
              return (
                <div
                  key={idx}
                  onClick={() => toggleStep(idx)}
                  className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-start gap-3.5 ${
                    isDone
                      ? 'bg-emerald-50/70 border-emerald-300 text-emerald-950 line-through opacity-80'
                      : 'bg-[#FDFBF7] border-[#EADECA] hover:border-[#C84B31] text-[#1E1B18]'
                  }`}
                >
                  <div className={`w-6 h-6 rounded-lg flex items-center justify-center font-bold text-xs shrink-0 transition-colors ${
                    isDone ? 'bg-emerald-600 text-white' : 'bg-[#EADECA] text-[#7A3E26]'
                  }`}>
                    {isDone ? <CheckCircle2 className="w-4 h-4" /> : idx + 1}
                  </div>
                  <p className="text-xs sm:text-sm leading-relaxed font-sans flex-1">
                    {step}.
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* 3. Ayurvedic Rasa Profile */}
      {activeTab === 'AYURVEDA' && (
        <div className="space-y-6">
          <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl text-xs text-emerald-900 leading-relaxed font-sans">
            According to classical Ayurvedic Charaka Samhita traditions, balanced nutrition is attained through the equilibrium of <strong>Shad Rasa</strong> (the six primal tastes) aligned with regional bio-seasons.
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            <div className="p-4 bg-[#FDFBF7] border border-[#EADECA] rounded-2xl space-y-2">
              <div className="flex items-center justify-between text-xs font-bold">
                <span className="text-[#C84B31]">Madhura (Sweet)</span>
                <span>80%</span>
              </div>
              <div className="w-full bg-neutral-200 rounded-full h-2">
                <div className="bg-[#C84B31] h-full rounded-full w-4/5" />
              </div>
              <span className="text-[10px] text-neutral-500 block">Nourishing, grounding (Earth & Water)</span>
            </div>

            <div className="p-4 bg-[#FDFBF7] border border-[#EADECA] rounded-2xl space-y-2">
              <div className="flex items-center justify-between text-xs font-bold">
                <span className="text-[#FF7B54]">Amla (Sour)</span>
                <span>45%</span>
              </div>
              <div className="w-full bg-neutral-200 rounded-full h-2">
                <div className="bg-[#FF7B54] h-full rounded-full w-[45%]" />
              </div>
              <span className="text-[10px] text-neutral-500 block">Stimulates digestive agni (Earth & Fire)</span>
            </div>

            <div className="p-4 bg-[#FDFBF7] border border-[#EADECA] rounded-2xl space-y-2">
              <div className="flex items-center justify-between text-xs font-bold">
                <span className="text-[#E9C46A]">Lavana (Salty)</span>
                <span>35%</span>
              </div>
              <div className="w-full bg-neutral-200 rounded-full h-2">
                <div className="bg-[#E9C46A] h-full rounded-full w-[35%]" />
              </div>
              <span className="text-[10px] text-neutral-500 block">Hydration and mineral balance</span>
            </div>

            <div className="p-4 bg-[#FDFBF7] border border-[#EADECA] rounded-2xl space-y-2">
              <div className="flex items-center justify-between text-xs font-bold">
                <span className="text-amber-700">Katu (Pungent)</span>
                <span>50%</span>
              </div>
              <div className="w-full bg-neutral-200 rounded-full h-2">
                <div className="bg-amber-700 h-full rounded-full w-1/2" />
              </div>
              <span className="text-[10px] text-neutral-500 block">Clears circulation (Fire & Air)</span>
            </div>

            <div className="p-4 bg-[#FDFBF7] border border-[#EADECA] rounded-2xl space-y-2">
              <div className="flex items-center justify-between text-xs font-bold">
                <span className="text-[#2A9D8F]">Tikta (Bitter)</span>
                <span>30%</span>
              </div>
              <div className="w-full bg-neutral-200 rounded-full h-2">
                <div className="bg-[#2A9D8F] h-full rounded-full w-[30%]" />
              </div>
              <span className="text-[10px] text-neutral-500 block">Detoxifying, cooling (Air & Space)</span>
            </div>

            <div className="p-4 bg-[#FDFBF7] border border-[#EADECA] rounded-2xl space-y-2">
              <div className="flex items-center justify-between text-xs font-bold">
                <span className="text-[#1A2E40]">Kashaya (Astringent)</span>
                <span>25%</span>
              </div>
              <div className="w-full bg-neutral-200 rounded-full h-2">
                <div className="bg-[#1A2E40] h-full rounded-full w-1/4" />
              </div>
              <span className="text-[10px] text-neutral-500 block">Toning and purifying (Air & Earth)</span>
            </div>
          </div>
        </div>
      )}

      {/* 4. Reviews & Cultural Memories Tab */}
      {activeTab === 'REVIEWS' && (
        <div className="space-y-6">
          {/* Submission form */}
          <form onSubmit={handleReviewSubmit} className="p-4 bg-[#FDFBF7] border border-[#EADECA] rounded-2xl space-y-3">
            <h4 className="font-serif font-bold text-xs text-[#1E1B18] uppercase tracking-wider">
              Share Your Cultural Experience or Family Variation
            </h4>

            {reviewSuccess && (
              <div className="p-2.5 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-800 font-medium">
                Thank you! Your review has been recorded in the archive.
              </div>
            )}

            <div className="flex items-center gap-2">
              <span className="text-xs text-neutral-600 font-medium">Heritage Rating:</span>
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    type="button"
                    key={star}
                    onClick={() => setUserRating(star)}
                    className={`p-1 ${userRating >= star ? 'text-amber-500 fill-amber-500' : 'text-neutral-300'}`}
                  >
                    <Star className="w-4 h-4 fill-current" />
                  </button>
                ))}
              </div>
            </div>

            <textarea
              required
              rows={2}
              value={reviewComment}
              onChange={(e) => setReviewComment(e.target.value)}
              placeholder="Have you tasted this authentic preparation? Share regional nuances..."
              className="w-full px-3.5 py-2 rounded-xl border border-[#EADECA] text-xs focus:border-[#C84B31] bg-white"
            />

            <div className="flex justify-end">
              <button
                type="submit"
                disabled={submittingReview}
                className="px-4 py-2 bg-[#C84B31] hover:bg-[#A33B24] text-white text-xs font-bold rounded-xl shadow-xs transition-all"
              >
                {submittingReview ? 'Submitting...' : 'Post Cultural Memory'}
              </button>
            </div>
          </form>

          {/* Existing reviews */}
          <div className="space-y-3">
            {reviewList.length > 0 ? (
              reviewList.map((r, i) => (
                <div key={i} className="p-3.5 rounded-2xl bg-[#FDFBF7] border border-[#EADECA] space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-[#1E1B18]">
                      {r.user?.name || 'Heritage Explorer'}
                    </span>
                    <div className="flex items-center text-amber-500 text-xs">
                      {Array.from({ length: r.rating || 5 }).map((_, sIdx) => (
                        <Star key={sIdx} className="w-3 h-3 fill-current" />
                      ))}
                    </div>
                  </div>
                  <p className="text-xs text-neutral-700 italic font-serif leading-relaxed">
                    &ldquo;{r.comment}&rdquo;
                  </p>
                </div>
              ))
            ) : (
              <p className="text-xs text-neutral-500 italic text-center py-4">
                Be the first to share an ancestral memory or tasting experience for this dish.
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
