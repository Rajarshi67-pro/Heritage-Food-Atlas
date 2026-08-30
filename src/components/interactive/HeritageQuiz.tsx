'use client';

import React, { useState } from 'react';
import { Sparkles, CheckCircle2, XCircle, RotateCcw, Trophy, Award, ArrowRight } from 'lucide-react';

interface QuizQuestion {
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  stateBadge: string;
}

const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    question: 'Which sweet was originally crafted in 1858 in honour of Lady Canning, wife of India\'s first Viceroy?',
    options: ['Ledikeni', 'Rasagola', 'Mysore Pak', 'Sandesh'],
    correctIndex: 0,
    explanation: 'Confectioner Bhim Chandra Nag crafted "Ledikeni" in North Kolkata in 1858 in honor of Lady Charlotte Canning.',
    stateBadge: 'West Bengal',
  },
  {
    question: 'What fermented summer rice preparation is offered to Lord Jagannath as Dahi Pakhala in Puri?',
    options: ['Pakhala Bhata', 'Bisi Bele Bath', 'Ven Pongal', 'Panta Bhat'],
    correctIndex: 0,
    explanation: 'Pakhala Bhata is soaked in unglazed earthen pots overnight to create natural probiotic cooling torani water.',
    stateBadge: 'Odisha',
  },
  {
    question: 'Why do Tamil families boil over newly harvested rice and milk in clay pots during Thai Pongal?',
    options: [
      'To test clay pot quality',
      'The boil-over symbolizes boundless abundance & gratitude to Surya',
      'To evaporate excess moisture',
      'As a preservation method',
    ],
    correctIndex: 1,
    explanation: 'The word "Pongal" means to boil over. The overflowing milk signifies prosperity and harvest blessings.',
    stateBadge: 'Tamil Nadu',
  },
  {
    question: 'How did Rajasthani soldiers historically bake Baatis during long desert military campaigns?',
    options: [
      'Burying dough balls under scorching desert sand',
      'Carrying heavy clay tandoors on horses',
      'Frying in water',
      'Smoking over eucalyptus leaves',
    ],
    correctIndex: 0,
    explanation: 'Rajput soldiers buried dough balls under hot desert sand at dawn, retrieving them baked by evening before dipping in pure ghee.',
    stateBadge: 'Rajasthan',
  },
  {
    question: 'Which sacred steamed lotus-bud dumpling is offered in a count of 21 during Ganesh Chaturthi?',
    options: ['Ukadiche Modak', 'Kozhukattai', 'Patishapta', 'Ada Pradhaman'],
    correctIndex: 0,
    explanation: 'Ukadiche Modak is handcrafted with 21 pleats of Ambemohar rice flour dough encasing fresh coconut and jaggery.',
    stateBadge: 'Maharashtra',
  },
];

export default function HeritageQuiz() {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedOpt, setSelectedOpt] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);

  const currentQ = QUIZ_QUESTIONS[currentIdx];

  const handleSelect = (idx: number) => {
    if (isAnswered) return;
    setSelectedOpt(idx);
    setIsAnswered(true);
    if (idx === currentQ.correctIndex) {
      setScore((s) => s + 1);
    }
  };

  const handleNext = () => {
    if (currentIdx < QUIZ_QUESTIONS.length - 1) {
      setCurrentIdx((c) => c + 1);
      setSelectedOpt(null);
      setIsAnswered(false);
    } else {
      setIsCompleted(true);
    }
  };

  const resetQuiz = () => {
    setCurrentIdx(0);
    setSelectedOpt(null);
    setIsAnswered(false);
    setScore(0);
    setIsCompleted(false);
  };

  return (
    <div className="bg-gradient-to-br from-[#1E1B18] via-[#2A231C] to-[#1E1B18] text-white rounded-3xl p-6 lg:p-8 border border-[#EADECA]/20 shadow-xl space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between gap-4 pb-4 border-b border-neutral-700">
        <div>
          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-[#FF7B54] text-white flex items-center gap-1 w-fit mb-1.5">
            <Sparkles className="w-3 h-3" />
            Interactive Quest
          </span>
          <h3 className="font-serif font-bold text-2xl text-white">
            Test Your Indian Culinary Heritage IQ
          </h3>
          <p className="text-xs text-neutral-400">
            Uncover forgotten temple canons, royal banquet secrets, and agrarian food lore.
          </p>
        </div>

        {!isCompleted && (
          <div className="text-right">
            <span className="text-[10px] font-bold text-neutral-400 uppercase block">
              Question
            </span>
            <span className="font-serif font-bold text-xl text-[#E9C46A]">
              {currentIdx + 1} / {QUIZ_QUESTIONS.length}
            </span>
          </div>
        )}
      </div>

      {!isCompleted ? (
        <div className="space-y-5">
          <div className="space-y-2">
            <span className="px-2.5 py-0.5 rounded text-[10px] font-bold bg-neutral-800 text-[#E9C46A] border border-neutral-700 inline-block">
              {currentQ.stateBadge}
            </span>
            <h4 className="font-serif font-bold text-lg sm:text-xl text-white leading-snug">
              {currentQ.question}
            </h4>
          </div>

          {/* Options Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {currentQ.options.map((opt, idx) => {
              let btnStyle = 'bg-neutral-800/80 border-neutral-700 hover:bg-neutral-700/80 hover:border-[#FF7B54] text-neutral-200';
              if (isAnswered) {
                if (idx === currentQ.correctIndex) {
                  btnStyle = 'bg-emerald-950/80 border-emerald-500 text-emerald-300 font-bold ring-2 ring-emerald-500/50';
                } else if (idx === selectedOpt) {
                  btnStyle = 'bg-red-950/80 border-red-500 text-red-300 font-bold ring-2 ring-red-500/50';
                } else {
                  btnStyle = 'bg-neutral-900/60 border-neutral-800 text-neutral-500 opacity-60';
                }
              }

              return (
                <button
                  key={idx}
                  onClick={() => handleSelect(idx)}
                  disabled={isAnswered}
                  className={`p-4 rounded-2xl border text-left text-xs font-semibold transition-all flex items-center justify-between gap-2 ${btnStyle}`}
                >
                  <span>{opt}</span>
                  {isAnswered && idx === currentQ.correctIndex && (
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  )}
                  {isAnswered && idx === selectedOpt && idx !== currentQ.correctIndex && (
                    <XCircle className="w-4 h-4 text-red-400 shrink-0" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Explanation Banner */}
          {isAnswered && (
            <div className="p-4 rounded-2xl bg-neutral-800/90 border border-neutral-700 space-y-3 animate-in fade-in">
              <div className="flex items-start gap-2 text-xs text-neutral-300 leading-relaxed font-serif">
                <span className="font-bold text-[#E9C46A]">Archival Fact:</span>
                <span>{currentQ.explanation}</span>
              </div>

              <div className="flex justify-end">
                <button
                  onClick={handleNext}
                  className="px-5 py-2.5 rounded-xl bg-[#C84B31] hover:bg-[#A33B24] text-white text-xs font-bold transition-all flex items-center gap-1.5 shadow-md"
                >
                  <span>{currentIdx < QUIZ_QUESTIONS.length - 1 ? 'Next Question' : 'View Results'}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          )}
        </div>
      ) : (
        /* Quiz Results Certificate */
        <div className="text-center py-6 space-y-4 max-w-md mx-auto">
          <div className="w-16 h-16 rounded-full bg-[#E9C46A]/20 border border-[#E9C46A]/40 flex items-center justify-center text-[#E9C46A] mx-auto">
            <Trophy className="w-8 h-8" />
          </div>

          <div>
            <h4 className="font-serif font-bold text-2xl text-white">
              Quest Completed!
            </h4>
            <p className="text-xs text-neutral-400 mt-1">
              You scored <strong className="text-[#E9C46A] text-sm">{score}</strong> out of {QUIZ_QUESTIONS.length}
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-neutral-800/80 border border-neutral-700 text-xs text-[#E9C46A] font-semibold flex items-center justify-center gap-2">
            <Award className="w-4 h-4" />
            <span>
              {score === 5
                ? 'Master Culinary Anthropologist Certificate'
                : score >= 3
                ? 'Certified Regional Food Explorer'
                : 'Aspiring Heritage Enthusiast'}
            </span>
          </div>

          <button
            onClick={resetQuiz}
            className="px-5 py-2.5 rounded-xl bg-[#C84B31] hover:bg-[#A33B24] text-white text-xs font-bold transition-all inline-flex items-center gap-2"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Replay Quest</span>
          </button>
        </div>
      )}
    </div>
  );
}
