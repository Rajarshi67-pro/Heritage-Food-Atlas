'use client';

import React, { useState, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  UploadCloud,
  Sparkles,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  RefreshCw,
  AlertCircle,
  Camera,
  Square,
  Zap,
} from 'lucide-react';

interface PredictionResult {
  predictedName: string;
  confidence: number;
  cuisine: string;
  state: string;
  matchedDish: any | null;
  detectedFeatures: string[];
  explanation: string;
  isAiLive: boolean;
}

export default function FoodRecognitionWidget() {
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [imageMimeType, setImageMimeType] = useState<string>('image/jpeg');
  const [filenameHint, setFilenameHint] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<PredictionResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isCameraActive, setIsCameraActive] = useState(false);

  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const streamRef = useRef<MediaStream | null>(null);

  const sampleImages = [
    {
      name: 'Patishapta (Winter Crepe)',
      url: '/images/dishes/patishapta.jpg',
      hint: 'patishapta',
    },
    {
      name: 'Dal Baati Churma (Desert Feast)',
      url: '/images/dishes/dal-baati-churma.jpg',
      hint: 'dal-baati',
    },
    {
      name: 'Ukadiche Modak (Ganesh Prasad)',
      url: '/images/dishes/ukadiche-modak.jpg',
      hint: 'modak',
    },
    {
      name: 'Avial (Onam Sadya)',
      url: '/images/dishes/avial.jpg',
      hint: 'avial',
    },
  ];

  const handleFileUpload = (file: File) => {
    if (!file.type.startsWith('image/')) {
      setError('Please select a valid image file (JPEG, PNG, WebP).');
      return;
    }
    setError(null);
    setImageMimeType(file.type);
    setFilenameHint(file.name);

    const reader = new FileReader();
    reader.onload = () => {
      const base64 = reader.result as string;
      setImagePreview(base64);
      analyzeImage(base64, file.type, file.name);
    };
    reader.readAsDataURL(file);
  };

  const handleSampleSelect = (sample: { name: string; url: string; hint: string }) => {
    setError(null);
    setImagePreview(sample.url);
    setImageMimeType('image/jpeg');
    setFilenameHint(sample.hint);
    analyzeImage(sample.url, 'image/jpeg', sample.hint);
  };

  const startCamera = async () => {
    try {
      setError(null);
      const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
      }
      setIsCameraActive(true);
    } catch (err) {
      setError('Camera access not granted or not available.');
    }
  };

  const capturePhoto = () => {
    if (videoRef.current) {
      const canvas = document.createElement('canvas');
      canvas.width = videoRef.current.videoWidth || 640;
      canvas.height = videoRef.current.videoHeight || 480;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
        const dataUrl = canvas.toDataURL('image/jpeg');
        stopCamera();
        setImagePreview(dataUrl);
        analyzeImage(dataUrl, 'image/jpeg', 'camera_capture.jpg');
      }
    }
  };

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((t) => t.stop());
      streamRef.current = null;
    }
    setIsCameraActive(false);
  };

  const analyzeImage = async (base64OrUrl: string, mime: string, hint: string) => {
    setLoading(true);
    setResult(null);
    try {
      const res = await fetch('/api/ai/recognize', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          imageBase64: base64OrUrl,
          mimeType: mime,
          filenameHint: hint,
        }),
      });

      if (!res.ok) {
        throw new Error('Recognition failed');
      }

      const data: PredictionResult = await res.json();
      setResult(data);
    } catch (err: any) {
      setError('Failed to analyze image. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-3xl border border-[#EADECA] p-6 lg:p-8 shadow-xs space-y-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <span className="px-2.5 py-1 rounded-lg text-xs font-bold bg-[#FF7B54]/10 text-[#C84B31] border border-[#FF7B54]/20 flex items-center gap-1 w-fit mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            Live AI Vision Model
          </span>
          <h2 className="font-serif font-bold text-2xl text-[#1E1B18]">
            AI Traditional Food Recognition & Scanner
          </h2>
          <p className="text-xs text-neutral-600 mt-1 max-w-2xl">
            Upload a photo or capture a live frame with your camera. Our AI vision system analyzes regional textures, color hues, and connects directly to archival heritage profiles.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Upload / Live Camera */}
        <div className="lg:col-span-6 space-y-4">
          <input
            type="file"
            ref={fileInputRef}
            onChange={(e) => e.target.files?.[0] && handleFileUpload(e.target.files[0])}
            accept="image/*"
            className="hidden"
          />

          {!isCameraActive ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div
                onClick={() => fileInputRef.current?.click()}
                className="border-2 border-dashed border-[#EADECA] hover:border-[#C84B31] bg-[#FDFBF7] hover:bg-white rounded-3xl p-6 text-center cursor-pointer transition-all space-y-2 group flex flex-col items-center justify-center min-h-[160px]"
              >
                <div className="w-12 h-12 rounded-2xl bg-[#FF7B54]/10 border border-[#FF7B54]/20 flex items-center justify-center text-[#C84B31] group-hover:scale-110 transition-transform">
                  <UploadCloud className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-xs font-bold text-[#1E1B18]">
                    Upload Food Photo
                  </p>
                  <p className="text-[10px] text-neutral-400">
                    PNG, JPG, WebP
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={startCamera}
                className="border-2 border-dashed border-[#2A9D8F]/40 hover:border-[#2A9D8F] bg-[#FDFBF7] hover:bg-white rounded-3xl p-6 text-center cursor-pointer transition-all space-y-2 group flex flex-col items-center justify-center min-h-[160px]"
              >
                <div className="w-12 h-12 rounded-2xl bg-[#2A9D8F]/10 border border-[#2A9D8F]/20 flex items-center justify-center text-[#2A9D8F] group-hover:scale-110 transition-transform">
                  <Camera className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-xs font-bold text-[#1E1B18]">
                    Use Live Camera Scan
                  </p>
                  <p className="text-[10px] text-neutral-400">
                    Capture dish directly
                  </p>
                </div>
              </button>
            </div>
          ) : (
            /* Live Camera Feed */
            <div className="relative rounded-3xl overflow-hidden bg-black aspect-video flex flex-col justify-between p-4 shadow-lg border border-neutral-700">
              <video ref={videoRef} className="absolute inset-0 w-full h-full object-cover" autoPlay playsInline />
              <div className="relative z-10 flex items-center justify-between text-white text-xs">
                <span className="px-2.5 py-1 bg-red-600/80 rounded-full font-bold flex items-center gap-1.5 animate-pulse">
                  <span className="w-2 h-2 rounded-full bg-white" />
                  Live Scanner
                </span>
                <button
                  onClick={stopCamera}
                  className="px-2.5 py-1 bg-black/60 rounded-full hover:bg-black font-semibold text-xs"
                >
                  Cancel
                </button>
              </div>

              <div className="relative z-10 flex justify-center">
                <button
                  type="button"
                  onClick={capturePhoto}
                  className="px-6 py-2.5 bg-[#C84B31] hover:bg-[#A33B24] text-white font-bold text-xs rounded-full shadow-lg flex items-center gap-2 hover:scale-105 transition-transform"
                >
                  <Camera className="w-4 h-4" />
                  <span>Capture & Analyze</span>
                </button>
              </div>
            </div>
          )}

          {/* Preset Sample Gallery */}
          <div className="space-y-2">
            <span className="text-xs font-bold text-[#7A3E26] block">
              Or test with sample heritage dishes:
            </span>
            <div className="grid grid-cols-2 gap-2">
              {sampleImages.map((s, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSampleSelect(s)}
                  className="flex items-center gap-2.5 p-2 rounded-xl border border-[#EADECA] bg-[#FDFBF7] hover:bg-white hover:border-[#C84B31] transition-all text-left group"
                >
                  <div className="relative w-10 h-10 rounded-lg overflow-hidden shrink-0 bg-[#2D1B12]">
                    <Image src={s.url} alt={s.name} fill unoptimized className="object-cover" sizes="40px" />
                  </div>
                  <span className="text-xs font-semibold text-[#1E1B18] group-hover:text-[#C84B31] truncate">
                    {s.name}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Live Analysis Output */}
        <div className="lg:col-span-6">
          {imagePreview ? (
            <div className="bg-[#FDFBF7] border border-[#EADECA] rounded-3xl p-6 space-y-5">
              <div className="relative h-52 w-full rounded-2xl overflow-hidden bg-[#2D1B12] shadow-inner">
                <Image src={imagePreview} alt="Uploaded dish" fill unoptimized className="object-cover" />
                {loading && (
                  <div className="absolute inset-0 bg-black/60 backdrop-blur-xs flex flex-col items-center justify-center text-white text-xs font-bold gap-3">
                    <div className="w-full h-1 bg-[#E9C46A] absolute top-0 animate-[pulse_1.5s_infinite]" />
                    <RefreshCw className="w-7 h-7 animate-spin text-[#E9C46A]" />
                    <span className="text-center px-4 font-serif text-sm text-[#E9C46A]">
                      Extracting culinary contours, tempering signatures, and archival lineage...
                    </span>
                  </div>
                )}
              </div>

              {result && !loading && (
                <div className="space-y-4">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <span className="text-[11px] font-bold text-[#7A3E26] uppercase tracking-wider block">
                        Identified Heritage Dish
                      </span>
                      <h3 className="font-serif font-bold text-2xl text-[#1E1B18]">
                        {result.predictedName}
                      </h3>
                      <p className="text-xs text-neutral-600 font-medium mt-0.5">
                        {result.cuisine} Cuisine • Origin: {result.state}
                      </p>
                    </div>

                    <div className="text-right">
                      <span className="text-[10px] font-bold text-neutral-400 block uppercase">
                        Confidence
                      </span>
                      <span className="font-mono font-bold text-xl text-[#2A9D8F]">
                        {Math.round(result.confidence * 100)}%
                      </span>
                    </div>
                  </div>

                  {/* Confidence Bar */}
                  <div className="w-full bg-neutral-200 rounded-full h-2.5 overflow-hidden">
                    <div
                      className="bg-[#2A9D8F] h-full rounded-full transition-all duration-700"
                      style={{ width: `${result.confidence * 100}%` }}
                    />
                  </div>

                  {/* Detected Features */}
                  <div className="space-y-1.5">
                    <span className="text-[11px] font-bold text-neutral-500 block uppercase">
                      Detected Cultural Features:
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {result.detectedFeatures.map((feat, i) => (
                        <span
                          key={i}
                          className="px-2.5 py-1 rounded-lg text-xs bg-white border border-[#EADECA] font-medium text-[#1E1B18]"
                        >
                          ✓ {feat}
                        </span>
                      ))}
                    </div>
                  </div>

                  <p className="text-xs text-neutral-700 font-serif leading-relaxed italic bg-white p-3.5 rounded-xl border border-[#EADECA]">
                    &ldquo;{result.explanation}&rdquo;
                  </p>

                  {/* Link to Heritage Dish Profile */}
                  {result.matchedDish && (
                    <Link
                      href={`/dishes/${result.matchedDish.slug}`}
                      className="w-full py-3.5 rounded-xl bg-[#C84B31] text-white text-xs font-bold flex items-center justify-center gap-2 hover:bg-[#A33B24] transition-colors shadow-md hover:scale-[1.02]"
                    >
                      <ShieldCheck className="w-4 h-4" />
                      <span>Open Verified Heritage Profile</span>
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  )}
                </div>
              )}

              {error && (
                <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-xs text-red-700 flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{error}</span>
                </div>
              )}
            </div>
          ) : (
            <div className="h-full min-h-[300px] border border-[#EADECA] bg-[#FDFBF7] rounded-3xl p-8 flex flex-col items-center justify-center text-center space-y-3 text-neutral-400">
              <Sparkles className="w-8 h-8 text-[#D4A373]" />
              <p className="text-xs font-medium text-neutral-500 max-w-xs">
                Upload a food photograph, click live camera scan, or choose a sample dish above to preview the AI visual detection report.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
