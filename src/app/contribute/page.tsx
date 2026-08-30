'use client';

import React, { useState } from 'react';
import { useAuth } from '@/lib/auth-context';
import AudioStoryRecorder from '@/components/audio/AudioStoryRecorder';
import { PlusCircle, CheckCircle2, AlertCircle, Utensils, Mic, Layers, ShieldCheck } from 'lucide-react';

export default function ContributePage() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<'DISH' | 'STORY' | 'INGREDIENT'>('DISH');
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Dish form state
  const [dishName, setDishName] = useState('');
  const [stateCode, setStateCode] = useState('WB');
  const [cuisineType, setCuisineType] = useState('Bengali');
  const [foodCategory, setFoodCategory] = useState('Main');
  const [description, setDescription] = useState('');
  const [culturalSignificance, setCulturalSignificance] = useState('');
  const [historicalBackground, setHistoricalBackground] = useState('');
  const [traditionalPreparation, setTraditionalPreparation] = useState('');

  // Story form state
  const [storyTitle, setStoryTitle] = useState('');
  const [storytellerName, setStorytellerName] = useState('');
  const [generation, setGeneration] = useState('Grandmother');
  const [location, setLocation] = useState('');
  const [community, setCommunity] = useState('');
  const [storyContent, setStoryContent] = useState('');
  const [recordedAudio, setRecordedAudio] = useState<string | null>(null);
  const [recordedDuration, setRecordedDuration] = useState<number | null>(null);

  // Ingredient form state
  const [ingName, setIngName] = useState('');
  const [ingCategory, setIngCategory] = useState('Grain');
  const [ingOrigin, setIngOrigin] = useState('');
  const [ingDesc, setIngDesc] = useState('');
  const [ingSignificance, setIngSignificance] = useState('');

  const handleDishSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      window.location.href = '/auth/login';
      return;
    }
    setLoading(true);
    setSuccessMessage(null);
    setErrorMessage(null);

    try {
      const res = await fetch('/api/contributions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'DISH',
          title: `New Dish Submission: ${dishName}`,
          dataPayload: {
            name: dishName,
            stateCode,
            cuisineType,
            foodCategory,
            description,
            culturalSignificance,
            historicalBackground,
            traditionalPreparation,
          },
        }),
      });

      if (!res.ok) throw new Error('Failed to submit dish');

      setSuccessMessage('Thank you! Your dish submission has been received and queued for Curatorial Review.');
      setDishName('');
      setDescription('');
      setCulturalSignificance('');
      setHistoricalBackground('');
      setTraditionalPreparation('');
    } catch (err: any) {
      setErrorMessage(err.message || 'Submission failed');
    } finally {
      setLoading(false);
    }
  };

  const handleStorySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      window.location.href = '/auth/login';
      return;
    }
    setLoading(true);
    setSuccessMessage(null);
    setErrorMessage(null);

    try {
      const res = await fetch('/api/stories', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: storyTitle,
          storytellerName,
          generation,
          community,
          location,
          content: storyContent,
          audioUrl: recordedAudio,
          audioDuration: recordedDuration,
        }),
      });

      if (!res.ok) throw new Error('Failed to submit oral story');

      setSuccessMessage('Your family oral story has been submitted for Curatorial Review and archival preservation.');
      setStoryTitle('');
      setStorytellerName('');
      setLocation('');
      setCommunity('');
      setStoryContent('');
      setRecordedAudio(null);
    } catch (err: any) {
      setErrorMessage(err.message || 'Submission failed');
    } finally {
      setLoading(false);
    }
  };

  const handleIngredientSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      window.location.href = '/auth/login';
      return;
    }
    setLoading(true);
    setSuccessMessage(null);
    setErrorMessage(null);

    try {
      const res = await fetch('/api/contributions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'INGREDIENT',
          title: `New Ingredient: ${ingName}`,
          dataPayload: {
            name: ingName,
            category: ingCategory,
            originRegion: ingOrigin,
            description: ingDesc,
            culturalSignificance: ingSignificance,
          },
        }),
      });

      if (!res.ok) throw new Error('Failed to submit ingredient');

      setSuccessMessage('Your indigenous ingredient documentation has been queued for Curatorial Review.');
      setIngName('');
      setIngOrigin('');
      setIngDesc('');
      setIngSignificance('');
    } catch (err: any) {
      setErrorMessage(err.message || 'Submission failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10 space-y-8">
      {/* Header */}
      <div className="space-y-2 text-center">
        <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#C84B31]/10 text-[#C84B31] border border-[#C84B31]/20 inline-block">
          Citizen Culinary Archiving
        </span>
        <h1 className="font-serif font-bold text-3xl sm:text-4xl text-[#1E1B18]">
          Contribute to India&apos;s Culinary Archive
        </h1>
        <p className="text-xs sm:text-sm text-neutral-600 max-w-xl mx-auto leading-relaxed">
          Preserve your family&apos;s ancestral recipes, grandmother oral memories, and forgotten regional ingredients. All entries undergo curatorial review before publication.
        </p>
      </div>

      {!user && (
        <div className="p-4 bg-amber-50 border border-amber-200 rounded-2xl text-xs text-amber-900 flex items-center justify-between">
          <span>You must be logged in to contribute to the heritage registry.</span>
          <a href="/auth/login" className="font-bold underline text-[#C84B31]">
            Login or Register →
          </a>
        </div>
      )}

      {/* Tabs */}
      <div className="flex items-center justify-center gap-2 bg-[#F5EFEB] p-1.5 rounded-2xl border border-[#EADECA] max-w-md mx-auto">
        <button
          onClick={() => {
            setActiveTab('DISH');
            setSuccessMessage(null);
            setErrorMessage(null);
          }}
          className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
            activeTab === 'DISH'
              ? 'bg-[#C84B31] text-white shadow-xs'
              : 'text-[#1E1B18]/70 hover:text-[#C84B31]'
          }`}
        >
          <Utensils className="w-3.5 h-3.5" />
          <span>Traditional Dish</span>
        </button>

        <button
          onClick={() => {
            setActiveTab('STORY');
            setSuccessMessage(null);
            setErrorMessage(null);
          }}
          className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
            activeTab === 'STORY'
              ? 'bg-[#C84B31] text-white shadow-xs'
              : 'text-[#1E1B18]/70 hover:text-[#C84B31]'
          }`}
        >
          <Mic className="w-3.5 h-3.5" />
          <span>Oral Story</span>
        </button>

        <button
          onClick={() => {
            setActiveTab('INGREDIENT');
            setSuccessMessage(null);
            setErrorMessage(null);
          }}
          className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
            activeTab === 'INGREDIENT'
              ? 'bg-[#C84B31] text-white shadow-xs'
              : 'text-[#1E1B18]/70 hover:text-[#C84B31]'
          }`}
        >
          <Layers className="w-3.5 h-3.5" />
          <span>Ingredient</span>
        </button>
      </div>

      {/* Status Messages */}
      {successMessage && (
        <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl text-xs text-emerald-800 flex items-center gap-2.5">
          <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
          <div>
            <p className="font-bold">{successMessage}</p>
            <p className="text-[11px] text-emerald-700 mt-0.5">
              You can track your submission status in your Profile Archive.
            </p>
          </div>
        </div>
      )}

      {errorMessage && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-2xl text-xs text-red-700 flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{errorMessage}</span>
        </div>
      )}

      {/* Forms Container */}
      <div className="bg-white rounded-3xl border border-[#EADECA] p-6 sm:p-8 shadow-xs">
        {/* 1. Dish Submission Form */}
        {activeTab === 'DISH' && (
          <form onSubmit={handleDishSubmit} className="space-y-4">
            <h3 className="font-serif font-bold text-lg text-[#1E1B18] pb-2 border-b border-[#EADECA]">
              Submit Traditional Heirloom Dish
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-bold text-[#1E1B18] block mb-1">Dish Name *</label>
                <input
                  type="text"
                  required
                  value={dishName}
                  onChange={(e) => setDishName(e.target.value)}
                  placeholder="e.g. Chak-Hao Kheer"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#EADECA] text-xs focus:border-[#C84B31]"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-[#1E1B18] block mb-1">State / UT *</label>
                <select
                  value={stateCode}
                  onChange={(e) => setStateCode(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#EADECA] text-xs focus:border-[#C84B31]"
                >
                  <option value="WB">West Bengal</option>
                  <option value="OD">Odisha</option>
                  <option value="AS">Assam</option>
                  <option value="TN">Tamil Nadu</option>
                  <option value="KL">Kerala</option>
                  <option value="KA">Karnataka</option>
                  <option value="AP">Andhra Pradesh & Telangana</option>
                  <option value="MH">Maharashtra</option>
                  <option value="GJ">Gujarat</option>
                  <option value="RJ">Rajasthan</option>
                  <option value="PB">Punjab</option>
                  <option value="UP">Uttar Pradesh</option>
                  <option value="BR">Bihar</option>
                  <option value="JK">Jammu & Kashmir</option>
                  <option value="GA">Goa</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-bold text-[#1E1B18] block mb-1">Cuisine School</label>
                <input
                  type="text"
                  value={cuisineType}
                  onChange={(e) => setCuisineType(e.target.value)}
                  placeholder="e.g. Manipuri, Chettinad, Awadhi"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#EADECA] text-xs focus:border-[#C84B31]"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-[#1E1B18] block mb-1">Food Category</label>
                <select
                  value={foodCategory}
                  onChange={(e) => setFoodCategory(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#EADECA] text-xs focus:border-[#C84B31]"
                >
                  <option value="Main">Main Course</option>
                  <option value="Dessert">Dessert / Confectionery</option>
                  <option value="Festival Food">Festival Food</option>
                  <option value="Staple">Staple</option>
                  <option value="Beverage">Beverage</option>
                  <option value="Street Food">Street Food</option>
                </select>
              </div>
            </div>

            <div>
              <label className="text-xs font-bold text-[#1E1B18] block mb-1">Summary Description *</label>
              <textarea
                required
                rows={3}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Describe the dish, its texture, flavor profile, and context..."
                className="w-full px-3.5 py-2.5 rounded-xl border border-[#EADECA] text-xs focus:border-[#C84B31]"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-[#1E1B18] block mb-1">Cultural Significance & Rituals</label>
              <textarea
                rows={3}
                value={culturalSignificance}
                onChange={(e) => setCulturalSignificance(e.target.value)}
                placeholder="Why is it prepared? Associated festivals, temple rituals, or familial customs..."
                className="w-full px-3.5 py-2.5 rounded-xl border border-[#EADECA] text-xs focus:border-[#C84B31]"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-[#1E1B18] block mb-1">Traditional Cooking Technique</label>
              <textarea
                rows={3}
                value={traditionalPreparation}
                onChange={(e) => setTraditionalPreparation(e.target.value)}
                placeholder="Traditional vessels (e.g. earthen handi, brass deg), tempering methods, ancestral steps..."
                className="w-full px-3.5 py-2.5 rounded-xl border border-[#EADECA] text-xs focus:border-[#C84B31]"
              />
            </div>

            <button
              type="submit"
              disabled={loading || !user}
              className="w-full py-3.5 rounded-xl bg-[#C84B31] hover:bg-[#A33B24] disabled:opacity-50 text-white text-xs font-bold transition-all shadow-md flex items-center justify-center gap-2"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Submit Dish for Curatorial Review</span>
            </button>
          </form>
        )}

        {/* 2. Oral History Story Form with Voice Recording */}
        {activeTab === 'STORY' && (
          <form onSubmit={handleStorySubmit} className="space-y-4">
            <h3 className="font-serif font-bold text-lg text-[#1E1B18] pb-2 border-b border-[#EADECA]">
              Contribute a Grandparent Oral Memory
            </h3>

            {/* Audio Recorder Widget */}
            <AudioStoryRecorder
              onAudioReady={(base64, dur) => {
                setRecordedAudio(base64);
                setRecordedDuration(dur);
              }}
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-bold text-[#1E1B18] block mb-1">Story Title *</label>
                <input
                  type="text"
                  required
                  value={storyTitle}
                  onChange={(e) => setStoryTitle(e.target.value)}
                  placeholder="e.g. The Winter Earthen Handi of Birbhum"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#EADECA] text-xs focus:border-[#C84B31]"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-[#1E1B18] block mb-1">Storyteller Name *</label>
                <input
                  type="text"
                  required
                  value={storytellerName}
                  onChange={(e) => setStorytellerName(e.target.value)}
                  placeholder="e.g. Grandmother Shobhana Devi"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#EADECA] text-xs focus:border-[#C84B31]"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-[#1E1B18] block mb-1">Generation / Role</label>
                <select
                  value={generation}
                  onChange={(e) => setGeneration(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#EADECA] text-xs focus:border-[#C84B31]"
                >
                  <option value="Grandmother">Grandmother (Dadi / Nani / Thakurma)</option>
                  <option value="Grandfather">Grandfather (Dada / Nana / Dadu)</option>
                  <option value="Village Elder">Village Elder / Temple Cook</option>
                  <option value="Family Archivist">Family Archivist</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-bold text-[#1E1B18] block mb-1">Location / Village *</label>
                <input
                  type="text"
                  required
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="e.g. Bolpur, West Bengal"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#EADECA] text-xs focus:border-[#C84B31]"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-bold text-[#1E1B18] block mb-1">Oral Memory Narrative *</label>
              <textarea
                required
                rows={5}
                value={storyContent}
                onChange={(e) => setStoryContent(e.target.value)}
                placeholder="Narrate the memory, hearth traditions, songs, seasonal preparations, or words of wisdom..."
                className="w-full px-3.5 py-2.5 rounded-xl border border-[#EADECA] text-xs focus:border-[#C84B31]"
              />
            </div>

            <button
              type="submit"
              disabled={loading || !user}
              className="w-full py-3.5 rounded-xl bg-[#C84B31] hover:bg-[#A33B24] disabled:opacity-50 text-white text-xs font-bold transition-all shadow-md flex items-center justify-center gap-2"
            >
              <Mic className="w-4 h-4" />
              <span>Submit Oral Story to National Archive</span>
            </button>
          </form>
        )}

        {/* 3. Ingredient Form */}
        {activeTab === 'INGREDIENT' && (
          <form onSubmit={handleIngredientSubmit} className="space-y-4">
            <h3 className="font-serif font-bold text-lg text-[#1E1B18] pb-2 border-b border-[#EADECA]">
              Document an Indigenous Regional Ingredient
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-bold text-[#1E1B18] block mb-1">Ingredient Name *</label>
                <input
                  type="text"
                  required
                  value={ingName}
                  onChange={(e) => setIngName(e.target.value)}
                  placeholder="e.g. Tulaipanji Aromatic Rice"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#EADECA] text-xs focus:border-[#C84B31]"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-[#1E1B18] block mb-1">Category</label>
                <select
                  value={ingCategory}
                  onChange={(e) => setIngCategory(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#EADECA] text-xs focus:border-[#C84B31]"
                >
                  <option value="Grain">Grain / Heirloom Crop</option>
                  <option value="Spice">Spice / Seasoning</option>
                  <option value="Vegetable">Indigenous Vegetable / Shoot</option>
                  <option value="Oil">Cold-Pressed Oil</option>
                  <option value="Sweetener">Natural Sweetener</option>
                  <option value="Herb">Herb / Medicinal Leaf</option>
                </select>
              </div>
            </div>

            <div>
              <label className="text-xs font-bold text-[#1E1B18] block mb-1">Origin / Micro-Region</label>
              <input
                type="text"
                value={ingOrigin}
                onChange={(e) => setIngOrigin(e.target.value)}
                placeholder="e.g. Raiganj, Uttar Dinajpur, West Bengal"
                className="w-full px-3.5 py-2.5 rounded-xl border border-[#EADECA] text-xs focus:border-[#C84B31]"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-[#1E1B18] block mb-1">Description & Characteristics *</label>
              <textarea
                required
                rows={3}
                value={ingDesc}
                onChange={(e) => setIngDesc(e.target.value)}
                placeholder="Describe aroma, grain length, harvesting method, botanical traits..."
                className="w-full px-3.5 py-2.5 rounded-xl border border-[#EADECA] text-xs focus:border-[#C84B31]"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-[#1E1B18] block mb-1">Cultural Significance & Dishes</label>
              <textarea
                rows={3}
                value={ingSignificance}
                onChange={(e) => setIngSignificance(e.target.value)}
                placeholder="What heirloom dishes is it traditionally used for? Ayurvedic benefits..."
                className="w-full px-3.5 py-2.5 rounded-xl border border-[#EADECA] text-xs focus:border-[#C84B31]"
              />
            </div>

            <button
              type="submit"
              disabled={loading || !user}
              className="w-full py-3.5 rounded-xl bg-[#2A9D8F] hover:bg-[#238276] disabled:opacity-50 text-white text-xs font-bold transition-all shadow-md flex items-center justify-center gap-2"
            >
              <Layers className="w-4 h-4" />
              <span>Submit Ingredient for Review</span>
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
