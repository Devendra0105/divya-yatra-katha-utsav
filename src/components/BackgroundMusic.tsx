// src/components/BackgroundMusic.tsx
import { useEffect, useRef } from 'react';

export default function BackgroundMusic() {
  // Keep a stable audio element reference between renders
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Create the element only once
    const audio = new Audio('/audio/music.mp3');
    audioRef.current = audio;

    // • soft volume (0 = muted, 1 = max)
    audio.volume = 0.15;               // ~15 % – adjust as you like
    // • autoplay when the page is allowed to do so
    audio.autoplay = true;
    // • do not loop – let it finish naturally
    audio.loop = false;

    // Mobile browsers block autoplay unless the media is *muted*.
    // By keeping the volume low we still get sound, but we also add a
    // tiny user‑interaction fallback: if the first play is rejected,
    // try again on the first click/touch.
    const tryPlay = () => {
      audio.play().catch(() => {
        // Playback blocked → wait for a user gesture
        const onFirstInteraction = () => {
          audio.play().catch(() => {/* still blocked, give up */});
          window.removeEventListener('click', onFirstInteraction);
          window.removeEventListener('touchstart', onFirstInteraction);
        };
        window.addEventListener('click', onFirstInteraction, { once: true });
        window.addEventListener('touchstart', onFirstInteraction, { once: true });
      });
    };

    tryPlay();

    // Clean‑up when the component unmounts (e.g. navigation away)
    return () => {
      audio.pause();
      audio.src = '';
      audioRef.current = null;
    };
  }, []);

  // We don’t render anything visible; the <audio> element is managed in JS.
  return null;
}