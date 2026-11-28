import { useEffect, useRef } from "react";

export default function BackgroundMusic() {
  // keep a stable reference so we don’t recreate the element on every render
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // 1️⃣ create the audio element once
    const audio = new Audio("/audio/music.mp3"); // ensure this file exists
    audioRef.current = audio;

    // 2️⃣ muted autoplay (allowed on all mobile browsers)
    audio.muted = true;      // required for autoplay
    audio.volume = 0.10;     // soft volume
    audio.autoplay = true;
    audio.loop = true;       // <‑‑ make it loop continuously

    // 3️⃣ try to play immediately (most browsers will allow muted playback)
    const start = async () => {
      try {
        await audio.play(); // succeeds because it is muted
      } catch {
        // muted playback can still fail on very strict browsers – fallback to click listener
      }
    };
    start();

    // 4️⃣ user‑interaction fallback – un‑mute on the first click/touch
    const onFirstInteraction = async () => {
      if (audioRef.current) {
        audioRef.current.muted = false; // become audible
        try {
          await audioRef.current.play(); // resume if paused
        } catch {
          // ignore – if the browser still blocks it, the user can tap again
        }
      }
      window.removeEventListener("click", onFirstInteraction);
      window.removeEventListener("touchstart", onFirstInteraction);
    };
    window.addEventListener("click", onFirstInteraction, { once: true });
    window.addEventListener("touchstart", onFirstInteraction, { once: true });

    // 5️⃣ clean up when the component unmounts (navigation away, SPA reload)
    return () => {
      audio.pause();
      audio.src = "";
      audioRef.current = null;
    };
  }, []); // run only once for the whole SPA lifetime

  // No visible UI – the <audio> element lives entirely in JS
  return null; // (or <audio ref={audioRef as any} className="hidden" /> for debugging)
}