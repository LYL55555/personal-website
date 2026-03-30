import { useState, useEffect, useCallback, useRef } from "react";

function parseLyric(lrc) {
  if (!lrc) return [];

  const lyric = lrc.replace(/^\uFEFF/, "").replace(/^\s+|\s+$/g, "");
  const lines = lyric.split("\n");
  const timeExp = /\[(\d{2,}):(\d{2})(?:\.(\d{2,3}))?\]/g;
  const result = [];

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (!line) continue;

    timeExp.lastIndex = 0;
    const timeMatches = [];
    let match;

    while ((match = timeExp.exec(line)) !== null) {
      const minutes = parseInt(match[1], 10);
      const seconds = parseInt(match[2], 10);
      const milliseconds = match[3] ? parseInt(match[3].padEnd(3, "0"), 10) : 0;
      const time = minutes * 60 + seconds + milliseconds / 1000;
      timeMatches.push(time);
    }

    timeExp.lastIndex = 0;
    const text = line.replace(timeExp, "").trim();
    if (!text) continue;

    for (let j = 0; j < timeMatches.length; j++) {
      result.push({
        time: timeMatches[j],
        text: text,
      });
    }
  }

  result.sort((a, b) => a.time - b.time);
  return result;
}

function lyricKey(trackId) {
  if (trackId == null || trackId === "") return null;
  return String(trackId);
}

export const useLyricCache = () => {
  const [cache, setCache] = useState({});
  const cacheRef = useRef(cache);
  useEffect(() => {
    cacheRef.current = cache;
  }, [cache]);

  const [currentTrackId, setCurrentTrackId] = useState(null);
  const [lyricPendingById, setLyricPendingById] = useState({});

  const fetchLyrics = useCallback(async (trackId) => {
    const id = lyricKey(trackId);
    if (!id) return { lyrics: [], translatedLyrics: [], songInfo: null };

    const cached = cacheRef.current[id];
    if (cached) return cached;

    setLyricPendingById((p) => ({ ...p, [id]: true }));
    try {
      const response = await fetch(
        `/api/netease/lyric?id=${encodeURIComponent(id)}`,
      );
      if (!response.ok) throw new Error("Failed to fetch lyrics");

      const data = await response.json();

      const result = {
        lyrics: [],
        translatedLyrics: [],
        songInfo: null,
      };

      if (data.lrc && data.lrc.lyric) {
        result.lyrics = parseLyric(data.lrc.lyric);
        if (data.tlyric && data.tlyric.lyric) {
          result.translatedLyrics = parseLyric(data.tlyric.lyric);
        }
      }

      setCache((prev) => {
        const next = { ...prev, [id]: result };
        cacheRef.current = next;
        return next;
      });

      return result;
    } catch (error) {
      console.error("Lyric fetch failed:", error);
      return { lyrics: [], translatedLyrics: [], songInfo: null };
    } finally {
      setLyricPendingById((p) => {
        const next = { ...p };
        delete next[id];
        return next;
      });
    }
  }, []);

  const preloadLyrics = useCallback(
    async (trackId) => {
      const id = lyricKey(trackId);
      if (!id || cacheRef.current[id]) return;

      setCurrentTrackId(id);
      await fetchLyrics(id);
    },
    [fetchLyrics],
  );

  const getLyrics = useCallback(
    (trackId) => {
      const id = lyricKey(trackId);
      if (!id) return { lyrics: [], translatedLyrics: [], songInfo: null };
      return cache[id] || { lyrics: [], translatedLyrics: [], songInfo: null };
    },
    [cache],
  );

  const findLyricIndex = useCallback((lyrics, currentTime) => {
    if (!lyrics || !lyrics.length) return -1;

    if (currentTime < lyrics[0].time) return -1;

    if (currentTime >= lyrics[lyrics.length - 1].time) return lyrics.length - 1;

    let left = 0;
    let right = lyrics.length - 1;

    while (left <= right) {
      const mid = Math.floor((left + right) / 2);

      if (mid === lyrics.length - 1) return mid;

      if (
        currentTime >= lyrics[mid].time &&
        currentTime < lyrics[mid + 1].time
      ) {
        return mid;
      }

      if (currentTime < lyrics[mid].time) {
        right = mid - 1;
      } else {
        left = mid + 1;
      }
    }

    return -1;
  }, []);

  const clearCache = useCallback((trackId) => {
    const id = lyricKey(trackId);
    if (id) {
      setCache((prev) => {
        const newCache = { ...prev };
        delete newCache[id];
        cacheRef.current = newCache;
        return newCache;
      });
    } else {
      cacheRef.current = {};
      setCache({});
    }
  }, []);

  const hasCache = useCallback(
    (trackId) => {
      const id = lyricKey(trackId);
      return id ? !!cache[id] : false;
    },
    [cache],
  );

  return {
    preloadLyrics,
    getLyrics,
    findLyricIndex,
    clearCache,
    lyricPendingById,
    hasCache,
    currentTrackId,
  };
};
