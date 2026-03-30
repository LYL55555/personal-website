import { useRef, useCallback } from "react";

export const useAudioHover = (audioSrc) => {
  const audioRef = useRef(null);
  const isPlayingRef = useRef(false);
  const fadeIntervalRef = useRef(null);

  const clearFadeInterval = () => {
    if (fadeIntervalRef.current != null) {
      clearInterval(fadeIntervalRef.current);
      fadeIntervalRef.current = null;
    }
  };

  const playAudio = useCallback(() => {
    if (!audioRef.current) {
      audioRef.current = new Audio(audioSrc);
      audioRef.current.loop = true;
      audioRef.current.volume = 0.2;
      audioRef.current.preload = "auto";
    }

    if (!isPlayingRef.current) {
      clearFadeInterval();
      const audio = audioRef.current;
      if (!audio) return;
      audio.volume = 0;
      audio
        .play()
        .then(() => {
          fadeIntervalRef.current = window.setInterval(() => {
            const a = audioRef.current;
            if (!a) {
              clearFadeInterval();
              return;
            }
            if (a.volume < 0.2) {
              a.volume = Math.min(0.2, a.volume + 0.02);
            } else {
              clearFadeInterval();
            }
          }, 50);
        })
        .catch((error) => {
          console.log("Audio playback failed:", error);
        });
      isPlayingRef.current = true;
    }
  }, [audioSrc]);

  const stopAudio = useCallback(() => {
    if (!audioRef.current || !isPlayingRef.current) return;

    clearFadeInterval();
    fadeIntervalRef.current = window.setInterval(() => {
      const a = audioRef.current;
      if (!a) {
        clearFadeInterval();
        return;
      }
      if (a.volume > 0.02) {
        a.volume = Math.max(0, a.volume - 0.02);
      } else {
        a.pause();
        a.currentTime = 0;
        a.volume = 0.2;
        clearFadeInterval();
      }
    }, 50);
    isPlayingRef.current = false;
  }, []);

  const cleanup = useCallback(() => {
    clearFadeInterval();
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current = null;
      isPlayingRef.current = false;
    }
  }, []);

  return {
    playAudio,
    stopAudio,
    cleanup,
  };
};
