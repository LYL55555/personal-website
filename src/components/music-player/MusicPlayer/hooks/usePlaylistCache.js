import { useState, useEffect } from "react";

const CACHE_KEY = "netease_playlist_cache";
const CACHE_EXPIRY = 1000 * 60 * 60; // 1 hour

export const usePlaylistCache = (playlistId) => {
  const [cachedData, setCachedData] = useState(null);

  // Load cache on mount
  useEffect(() => {
    const loadCache = () => {
      try {
        const cached = localStorage.getItem(CACHE_KEY);
        if (cached) {
          const { data, timestamp, id } = JSON.parse(cached);
          const isExpired = Date.now() - timestamp > CACHE_EXPIRY;
          const isSamePlaylist = id === playlistId;

          if (!isExpired && isSamePlaylist) {
            console.log("Using cached playlist data");
            setCachedData(data);
            return data;
          } else {
            console.log("Cache expired or different playlist");
            localStorage.removeItem(CACHE_KEY);
          }
        }
      } catch (error) {
        console.error("Error loading cache:", error);
        localStorage.removeItem(CACHE_KEY);
      }
      return null;
    };

    loadCache();
  }, [playlistId]);

  const updateCache = (newData) => {
    try {
      const cacheData = {
        data: newData,
        timestamp: Date.now(),
        id: playlistId,
      };
      localStorage.setItem(CACHE_KEY, JSON.stringify(cacheData));
      setCachedData(newData);
    } catch (error) {
      console.error("Error updating cache:", error);
    }
  };

  return { cachedData, updateCache };
};
