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

      // 创建新的预加载音频元素
      const audioElement = new Audio();
      audioElement.preload = "auto";
      audioElement.src = `/api/netease/song/url?id=${trackId}&level=${audioQuality}`;

      // 开始加载
      await audioElement.load();

      // 存储预加载信息
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

  // 组件卸载时清理
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
