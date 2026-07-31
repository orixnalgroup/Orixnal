import React, { useState, useRef } from 'react';
import { Volume2, VolumeX, Play, Pause, Loader2, Sparkles } from 'lucide-react';

interface AudioPlayerProps {
  textToRead: string;
  title?: string;
  className?: string;
}

export const AudioPlayer: React.FC<AudioPlayerProps> = ({ textToRead, title = 'Listen to Briefing', className = '' }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [useFallbackSpeech, setUseFallbackSpeech] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const handlePlayPause = async () => {
    if (isPlaying) {
      if (audioRef.current) {
        audioRef.current.pause();
      }
      if (window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
      setIsPlaying(false);
      return;
    }

    if (audioUrl && audioRef.current) {
      audioRef.current.play();
      setIsPlaying(true);
      return;
    }

    // Attempt Gemini TTS API
    setIsLoading(true);
    try {
      const res = await fetch('/api/tts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: textToRead, voice: 'Kore' }),
      });

      const data = await res.json();

      if (data.audio) {
        const src = `data:audio/wav;base64,${data.audio}`;
        setAudioUrl(src);
        const newAudio = new Audio(src);
        audioRef.current = newAudio;
        newAudio.onended = () => setIsPlaying(false);
        newAudio.play();
        setIsPlaying(true);
      } else {
        throw new Error('Fallback to Web Speech');
      }
    } catch (err) {
      // Native Web Speech API fallback
      setUseFallbackSpeech(true);
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
        const utterance = new SpeechSynthesisUtterance(textToRead.slice(0, 500));
        utterance.rate = 0.95;
        utterance.pitch = 1.0;
        utterance.onend = () => setIsPlaying(false);
        utterance.onerror = () => setIsPlaying(false);
        window.speechSynthesis.speak(utterance);
        setIsPlaying(true);
      } else {
        alert('Audio reading is not supported on this browser.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={`inline-flex items-center gap-3 bg-neutral-100 hover:bg-purple-50/80 transition-all border border-neutral-200/80 px-4 py-2 rounded-full ${className}`}>
      <button
        onClick={handlePlayPause}
        disabled={isLoading}
        className="w-9 h-9 rounded-full orixnal-gradient-bg text-white flex items-center justify-center hover:scale-105 active:scale-95 transition-transform shadow-sm disabled:opacity-50"
        title={isPlaying ? 'Pause Audio' : 'Play Audio Briefing'}
      >
        {isLoading ? (
          <Loader2 className="w-4 h-4 animate-spin" />
        ) : isPlaying ? (
          <Pause className="w-4 h-4 fill-current" />
        ) : (
          <Play className="w-4 h-4 ml-0.5 fill-current" />
        )}
      </button>

      <div className="flex flex-col">
        <div className="flex items-center gap-1.5 text-xs font-semibold text-neutral-800">
          <Sparkles className="w-3 h-3 text-purple-600" />
          <span>{title}</span>
        </div>
        <span className="text-[11px] text-neutral-500 font-medium">
          {isLoading ? 'Generating Audio...' : isPlaying ? 'Playing Audio...' : 'Audio Briefing'}
        </span>
      </div>
    </div>
  );
};
