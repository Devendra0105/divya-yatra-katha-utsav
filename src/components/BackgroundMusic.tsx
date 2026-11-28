// src/components/BackgroundMusic.tsx
import { useEffect, useRef } from 'react';

export default function BackgroundMusic() {
  // Keep a stable audio element reference between renders
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Create the element only once
    const audio = new Audio('/audio/music.mp3');
    audioRef.current = audio;

    // Softer volume & muted autoplay fallback for mobile browsers
    audio.volume = 0.10; // a touch softer than before
    audio.muted = true; // start muted so autoplay is allowed
    audio.autoplay = true;
    audio.loop = false;

    const tryPlay = async () => {
      try {
        await audio.play();
        // Once playback succeeds, un‑mute for the soft background
        audio.muted = false;
      } catch {
        // Wait for first user interaction, then try again
        const onFirstInteraction = async () => {
          await audio.play().catch(() => {});
          audio.muted = false;
          window.removeEventListener('click', onFirstInteraction);
          window.removeEventListener('touchstart', onFirstInteraction);
        };
        window.addEventListener('click', onFirstInteraction, { once: true });
        window.addEventListener('touchstart', onFirstInteraction, { once: true });
      }
    };
    tryPlay();

    // Clean‑up when the component unmounts (e.g. navigation away)
    return () => {
      audio.pause();
      audio.src = '';
      audioRef.current = null;
    };
  }, []); // re‑mount on navigation triggers a fresh play

  // No visible UI – the <audio> element is managed in JS
  return null;
}
