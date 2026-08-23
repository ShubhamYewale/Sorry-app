import { useEffect, useRef, useState } from 'react';
import { Volume2, VolumeX, Play, Pause } from 'lucide-react';

interface MusicPlayerProps {
  src: string;
  isPlaying: boolean;
  onTogglePlay: () => void;
}

export function MusicPlayer({ src, isPlaying, onTogglePlay }: MusicPlayerProps) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const audio = new Audio(src);
    audio.loop = true;
    audio.preload = 'metadata';
    audioRef.current = audio;

    const handleCanPlay = () => setIsLoaded(true);
    const handleError = () => {
      setHasError(true);
      setIsLoaded(false);
    };

    audio.addEventListener('canplaythrough', handleCanPlay);
    audio.addEventListener('error', handleError);

    return () => {
      audio.removeEventListener('canplaythrough', handleCanPlay);
      audio.removeEventListener('error', handleError);
      audio.pause();
      audioRef.current = null;
    };
  }, [src]);

  useEffect(() => {
    if (!audioRef.current || hasError) return;
    if (isPlaying) {
      void audioRef.current.play().catch(() => {
        setHasError(true);
      });
    } else {
      audioRef.current.pause();
    }
  }, [isPlaying, hasError]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.muted = isMuted;
    }
  }, [isMuted]);

  if (!isLoaded || hasError) {
    return null;
  }

  return (
    <div className="fixed bottom-4 right-4 z-50 flex items-center gap-2 rounded-full glass px-3 py-2 shadow-lg">
      <button
        type="button"
        onClick={onTogglePlay}
        className="rounded-full p-2 text-white transition-transform active:scale-95 focus-visible:outline focus-visible:outline-2 focus-visible:outline-white/70"
        aria-label={isPlaying ? 'Pause music' : 'Play music'}
      >
        {isPlaying ? <Pause size={18} /> : <Play size={18} />}
      </button>
      <button
        type="button"
        onClick={() => setIsMuted((m) => !m)}
        className="rounded-full p-2 text-white transition-transform active:scale-95 focus-visible:outline focus-visible:outline-2 focus-visible:outline-white/70"
        aria-label={isMuted ? 'Unmute music' : 'Mute music'}
      >
        {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
      </button>
    </div>
  );
}
