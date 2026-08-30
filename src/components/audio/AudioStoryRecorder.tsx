'use client';

import React, { useState, useRef } from 'react';
import { Mic, Square, Play, Trash2, CheckCircle } from 'lucide-react';

interface AudioStoryRecorderProps {
  onAudioReady: (audioBase64: string, durationSecs: number) => void;
}

export default function AudioStoryRecorder({ onAudioReady }: AudioStoryRecorderProps) {
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [hasRecorded, setHasRecorded] = useState(false);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      chunksRef.current = [];

      mediaRecorder.ondataavailable = (e) => {
        if (e.data.size > 0) chunksRef.current.push(e.data);
      };

      mediaRecorder.onstop = () => {
        const blob = new Blob(chunksRef.current, { type: 'audio/webm' });
        const url = URL.createObjectURL(blob);
        setAudioUrl(url);
        setHasRecorded(true);

        const reader = new FileReader();
        reader.readAsDataURL(blob);
        reader.onloadend = () => {
          const base64data = reader.result as string;
          onAudioReady(base64data, recordingTime);
        };
      };

      mediaRecorder.start();
      setIsRecording(true);
      setRecordingTime(0);

      timerRef.current = setInterval(() => {
        setRecordingTime((prev) => prev + 1);
      }, 1000);
    } catch (err) {
      alert('Microphone access is required to record oral history. Please enable permissions.');
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      mediaRecorderRef.current.stream.getTracks().forEach((t) => t.stop());
      setIsRecording(false);
      if (timerRef.current) clearInterval(timerRef.current);
    }
  };

  const resetRecording = () => {
    setHasRecorded(false);
    setAudioUrl(null);
    setRecordingTime(0);
  };

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  return (
    <div className="p-4 bg-amber-50/70 border border-amber-200/80 rounded-2xl space-y-3">
      <div className="flex items-center justify-between">
        <span className="text-xs font-bold text-amber-900 flex items-center gap-1.5">
          <Mic className="w-4 h-4 text-[#C84B31]" />
          Record Elder&apos;s Voice Narration
        </span>
        {isRecording && (
          <span className="flex items-center gap-1.5 text-xs text-red-600 font-bold animate-pulse">
            <span className="w-2 h-2 rounded-full bg-red-600" />
            REC {formatTime(recordingTime)}
          </span>
        )}
      </div>

      {!hasRecorded ? (
        <div className="flex items-center justify-center py-4">
          {!isRecording ? (
            <button
              type="button"
              onClick={startRecording}
              className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#C84B31] text-white text-xs font-bold shadow-md hover:bg-[#A33B24] transition-all hover:scale-105"
            >
              <Mic className="w-4 h-4" />
              <span>Start Voice Recording</span>
            </button>
          ) : (
            <button
              type="button"
              onClick={stopRecording}
              className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-red-600 text-white text-xs font-bold shadow-md hover:bg-red-700 transition-all hover:scale-105"
            >
              <Square className="w-4 h-4" />
              <span>Stop Recording ({formatTime(recordingTime)})</span>
            </button>
          )}
        </div>
      ) : (
        <div className="space-y-2">
          <div className="flex items-center justify-between bg-white p-3 rounded-xl border border-amber-200">
            <div className="flex items-center gap-2 text-xs font-medium text-emerald-700">
              <CheckCircle className="w-4 h-4" />
              <span>Audio Recorded ({formatTime(recordingTime)})</span>
            </div>
            <div className="flex items-center gap-2">
              {audioUrl && (
                <audio controls src={audioUrl} className="h-8 max-w-[200px]" />
              )}
              <button
                type="button"
                onClick={resetRecording}
                className="p-1.5 text-red-600 hover:bg-red-50 rounded-lg"
                title="Discard and re-record"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
