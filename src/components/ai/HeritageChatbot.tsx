'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Send, Sparkles, BookOpen, ShieldCheck, HelpCircle, Utensils, RefreshCw } from 'lucide-react';

interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
  sources?: { title: string; source: string; state?: string | null }[];
  relatedDishes?: { name: string; slug: string; cuisineType: string }[];
}

export default function HeritageChatbot() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: 'assistant',
      content: 'Namaste! I am your AI Heritage Storyteller. Ask me about India’s culinary history, harvest festival associations, sacred temple canons, and the ancient wisdom behind traditional recipes.',
    },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const presetQuestions = [
    'What is the history of Pakhala Bhata?',
    'Why is Pongal associated with harvest?',
    'What foods are traditionally eaten during Poush Sankranti?',
    'What is the Ayurvedic philosophy behind the Onam Sadya?',
    'How did Dal Baati Churma originate in the Rajasthan desert?',
  ];

  const handleSend = async (questionText?: string) => {
    const q = questionText || input;
    if (!q.trim() || loading) return;

    const userMsg: ChatMessage = { role: 'user', content: q };
    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    try {
      const res = await fetch('/api/ai/storyteller', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question: q }),
      });

      if (!res.ok) throw new Error('Storyteller query failed');

      const data = await res.json();
      const assistantMsg: ChatMessage = {
        role: 'assistant',
        content: data.answer,
        sources: data.sources,
        relatedDishes: data.relatedDishes,
      };

      setMessages((prev) => [...prev, assistantMsg]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content: 'I apologize, but I encountered an error while searching the verified heritage archives. Please try asking again.',
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-3xl border border-[#EADECA] p-6 lg:p-8 shadow-sm space-y-6">
      <div className="flex items-start justify-between gap-4 pb-4 border-b border-[#EADECA]">
        <div>
          <span className="px-2.5 py-1 rounded-lg text-xs font-bold bg-[#2A9D8F]/10 text-[#2A9D8F] border border-[#2A9D8F]/20 flex items-center gap-1 w-fit mb-2">
            <BookOpen className="w-3.5 h-3.5" />
            Grounded RAG Storyteller
          </span>
          <h2 className="font-serif font-bold text-2xl text-[#1E1B18]">
            AI Culinary Heritage Storyteller
          </h2>
          <p className="text-xs text-neutral-600 mt-1 max-w-2xl">
            Grounded in historical literature, temple records, and verified state culinary archives. Formulated to avoid hallucinations and cite authentic sources.
          </p>
        </div>
      </div>

      {/* Preset Starters */}
      <div className="space-y-2">
        <span className="text-xs font-bold text-[#7A3E26] flex items-center gap-1.5">
          <HelpCircle className="w-3.5 h-3.5 text-[#C84B31]" />
          Explore Curated Research Questions:
        </span>
        <div className="flex flex-wrap gap-2">
          {presetQuestions.map((pq, i) => (
            <button
              key={i}
              onClick={() => handleSend(pq)}
              disabled={loading}
              className="text-left px-3 py-1.5 rounded-xl border border-[#EADECA] bg-[#FDFBF7] hover:bg-[#C84B31] hover:text-white hover:border-[#C84B31] text-xs font-medium text-[#1E1B18] transition-all"
            >
              {pq}
            </button>
          ))}
        </div>
      </div>

      {/* Chat Messages Log */}
      <div className="border border-[#EADECA] bg-[#FDFBF7] rounded-3xl p-4 sm:p-6 min-h-[380px] max-h-[500px] overflow-y-auto space-y-4">
        {messages.map((m, idx) => (
          <div
            key={idx}
            className={`flex flex-col ${m.role === 'user' ? 'items-end' : 'items-start'}`}
          >
            <div
              className={`max-w-2xl rounded-2xl p-4 text-xs leading-relaxed ${
                m.role === 'user'
                  ? 'bg-[#C84B31] text-white font-medium shadow-xs'
                  : 'bg-white border border-[#EADECA] text-[#1E1B18] shadow-xs space-y-3'
              }`}
            >
              {m.role === 'assistant' && (
                <div className="flex items-center gap-1.5 text-[#2A9D8F] font-bold text-[11px] pb-1 border-b border-[#F5EFEB]">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Archival Storyteller</span>
                </div>
              )}

              <div className="whitespace-pre-wrap font-sans text-xs">
                {m.content}
              </div>

              {/* Cited Archival Sources */}
              {m.sources && m.sources.length > 0 && (
                <div className="pt-2 border-t border-[#F5EFEB] space-y-1">
                  <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider block flex items-center gap-1">
                    <ShieldCheck className="w-3 h-3 text-[#2A9D8F]" />
                    Cited Historical Sources:
                  </span>
                  <ul className="space-y-1">
                    {m.sources.map((s, sIdx) => (
                      <li key={sIdx} className="text-[11px] text-[#7A3E26] font-medium">
                        • <span className="font-semibold">{s.title}</span> — {s.source}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Linked Related Dishes */}
              {m.relatedDishes && m.relatedDishes.length > 0 && (
                <div className="pt-2 border-t border-[#F5EFEB]">
                  <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider block mb-1">
                    Related Archive Dishes:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {m.relatedDishes.map((rd, rIdx) => (
                      <Link
                        key={rIdx}
                        href={`/dishes/${rd.slug}`}
                        className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-[#F5EFEB] border border-[#EADECA] text-[11px] font-bold text-[#C84B31] hover:bg-[#C84B31] hover:text-white transition-colors"
                      >
                        <Utensils className="w-3 h-3" />
                        <span>{rd.name}</span>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}

        {loading && (
          <div className="flex items-center gap-2 p-3.5 bg-white border border-[#EADECA] rounded-2xl w-fit text-xs text-[#2A9D8F] font-semibold animate-pulse">
            <RefreshCw className="w-4 h-4 animate-spin" />
            <span>Consulting verified historical texts & culinary registers...</span>
          </div>
        )}
      </div>

      {/* Input Bar */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSend();
        }}
        className="flex items-center gap-2"
      >
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask any question about Indian food heritage, festivals, or history..."
          className="flex-1 px-4 py-3 rounded-2xl border border-[#EADECA] bg-[#FDFBF7] text-xs text-[#1E1B18] placeholder:text-neutral-400 focus:outline-hidden focus:border-[#C84B31] focus:bg-white transition-all shadow-inner"
        />
        <button
          type="submit"
          disabled={!input.trim() || loading}
          className="px-5 py-3 rounded-2xl bg-[#C84B31] hover:bg-[#A33B24] disabled:opacity-50 text-white font-bold text-xs flex items-center gap-1.5 transition-all shadow-xs"
        >
          <span>Ask</span>
          <Send className="w-3.5 h-3.5" />
        </button>
      </form>
    </div>
  );
}
