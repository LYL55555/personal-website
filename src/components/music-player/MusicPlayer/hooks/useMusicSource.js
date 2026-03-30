"use client";

import { useState } from "react";
import { MusicSourceManager } from "../services/MusicSourceManager";

const CACHE_EXPIRY = 1000 * 60 * 60; // 1 hour
const LEGACY_CACHE_KEY = "netease_playlist_cache";

const musicSourceManager = new MusicSourceManager();

function playlistCacheKey() {
  return `music_playlist_v2_${musicSourceManager.getCurrentSourceName()}`;
}

function samePlaylistByIds(a, b) {
  if (!Array.isArray(a) || !Array.isArray(b) || a.length !== b.length) {
    return false;
  }
  return a.every((t, i) => String(t.id) === String(b[i]?.id));
}

export const useMusicSource = () => {
  const [playlist, setPlaylist] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadPlaylist = async () => {
    try {
      try {
        localStorage.removeItem(LEGACY_CACHE_KEY);
      } catch {
        /* ignore */
      }

      const key = playlistCacheKey();
      const cached = localStorage.getItem(key);
      if (cached) {
        const { data, timestamp } = JSON.parse(cached);
        const isExpired = Date.now() - timestamp > CACHE_EXPIRY;
        const isEmpty = !Array.isArray(data) || data.length === 0;

        if (!isExpired && !isEmpty) {
          setPlaylist((prev) =>
            samePlaylistByIds(prev, data) ? prev : data
          );
          setIsLoading(false);
          refreshPlaylistInBackground();
          return;
        }
        if (isExpired) {
          localStorage.removeItem(key);
        }
      }

      await loadFromSource();
    } catch (err) {
      setError(err.message);
      setPlaylist([]);
      setIsLoading(false);
    }
  };

  const loadFromSource = async () => {
    setIsLoading(true);
    try {
      const source = musicSourceManager.getCurrentSource();
      const newPlaylist = await source.getPlaylist();

      const key = playlistCacheKey();
      if (Array.isArray(newPlaylist) && newPlaylist.length > 0) {
        localStorage.setItem(
          key,
          JSON.stringify({
            data: newPlaylist,
            timestamp: Date.now(),
          }),
        );
      } else {
        localStorage.removeItem(key);
      }

      setPlaylist((prev) =>
        samePlaylistByIds(prev, newPlaylist) ? prev : newPlaylist
      );
      setError(null);
    } catch (err) {
      setError(err.message);
      setPlaylist([]);
    } finally {
      setIsLoading(false);
    }
  };

  const refreshPlaylistInBackground = async () => {
    try {
      const source = musicSourceManager.getCurrentSource();
      const newPlaylist = await source.getPlaylist();
      const key = playlistCacheKey();

      setPlaylist((prev) => {
        if (JSON.stringify(newPlaylist) === JSON.stringify(prev)) {
          return prev;
        }
        if (Array.isArray(newPlaylist) && newPlaylist.length > 0) {
          localStorage.setItem(
            key,
            JSON.stringify({
              data: newPlaylist,
              timestamp: Date.now(),
            }),
          );
        }
        return newPlaylist;
      });
    } catch {
      return;
    }
  };

  const loadMetadata = async (trackId) => {
    try {
      const source = musicSourceManager.getCurrentSource();
      return await source.getMetadata(trackId);
    } catch (err) {
      return null;
    }
  };

  const getAudioUrl = async (trackId) => {
    try {
      const source = musicSourceManager.getCurrentSource();
      const url = await source.getAudioUrl(trackId);
      return url;
    } catch (err) {
      return `https://music.163.com/song/media/outer/url?id=${trackId}.mp3`;
    }
  };

  const switchSource = async (sourceName) => {
    try {
      musicSourceManager.switchSource(sourceName);
      await loadPlaylist();
    } catch (err) {
      setError(err.message);
    }
  };

  return {
    playlist,
    isLoading,
    error,
    loadMetadata,
    getAudioUrl,
    switchSource,
    registerSource: musicSourceManager.registerSource.bind(musicSourceManager),
    reloadPlaylist: loadPlaylist,
  };
};
