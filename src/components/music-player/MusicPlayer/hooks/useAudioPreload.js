"use client";

import { useState, useEffect } from "react";

export const useAudioPreload = () => {
  const [preloadTrack, setPreloadTrack] = useState(null);
  const [isPreloading, setIsPreloading] = useState(false);

  const preloadNextAudio = async (trackId, audioQuality = "lite") => {
    if (!trackId || isPreloading || preloadTrack?.id === trackId) {
      return;
    }

    try {
      setIsPreloading(true);

      const audioElement = new Audio();
      audioElement.preload = "auto";
      audioElement.src = `/api/netease/song/url?id=${trackId}&level=${audioQuality}`;

      await audioElement.load();

      setPreloadTrack({
        id: trackId,
        audio: audioElement,
      });
    } catch (error) {
      console.warn("Failed to preload track:", error);
    } finally {
      setIsPreloading(false);
    }
  };

  const clearPreload = () => {
    if (preloadTrack?.audio) {
      preloadTrack.audio.src = "";
      preloadTrack.audio.load();
    }
    setPreloadTrack(null);
  };

  useEffect(() => {
    return () => {
      clearPreload();
    };
  }, []);

  return {
    preloadNextAudio,
    clearPreload,
    isPreloading,
    preloadedTrackId: preloadTrack?.id,
  };
};
