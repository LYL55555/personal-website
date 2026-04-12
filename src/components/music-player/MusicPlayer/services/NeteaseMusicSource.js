"use client";

import { MusicSourceInterface } from "./MusicSourceInterface";

const METADATA_TTL_MS = 1000 * 60 * 30;
const metadataCache = new Map();
const metadataInflight = new Map();

const DEFAULT_PLAYLIST =
  process.env.NEXT_PUBLIC_NETEASE_PLAYLIST_ID ?? "2747910283";

export class NeteaseMusicSource extends MusicSourceInterface {
  constructor(playlistId = DEFAULT_PLAYLIST) {
    super();
    this.playlistId = playlistId;
    this.apiBaseUrl = "/api/netease";
  }

  setPlaylistId(playlistId) {
    this.playlistId = playlistId;
  }

  async getPlaylist() {
    try {
      // Try to fetch as playlist first
      const playlistResponse = await fetch(
        `${this.apiBaseUrl}/playlist?id=${this.playlistId}`,
      );
      
      let tracks = [];
      if (playlistResponse.ok) {
        const data = await playlistResponse.json();
        if (data.result && Array.isArray(data.result.tracks)) {
          tracks = data.result.tracks;
        } else if (Array.isArray(data.tracks)) {
          tracks = data.tracks;
        } else if (Array.isArray(data.songs)) {
          tracks = data.songs;
        }
      }

      // If no tracks found, try to fetch as a single song detail
      if (!tracks.length) {
        const songResponse = await fetch(
          `${this.apiBaseUrl}/song/detail?ids=${this.playlistId}`,
        );
        if (songResponse.ok) {
          const songData = await songResponse.json();
          if (songData.songs && Array.isArray(songData.songs) && songData.songs.length > 0) {
            tracks = songData.songs;
          }
        }
      }

      if (!tracks.length) {
        throw new Error("Invalid or empty playlist/song payload");
      }

      return tracks.map((track) => {
        const artists = track.artists || track.ar || [];
        const album = track.album || track.al || {};
        const name = track.name || track.title || "Unknown Track";

        return {
          id: track.id.toString(),
          name: name,
          artists: artists.map((a) => ({
            id: a.id?.toString() || "",
            name: a.name || "Unknown Artist",
          })),
          album: {
            id: album.id?.toString() || "",
            name: album.name || "Unknown Album",
            picUrl: album.picUrl || null,
          },
          duration: track.duration || track.dt || 0,
          fee: track.fee || 0,
          pop: track.pop || track.popularity || 0,
        };
      });
    } catch (error) {
      console.error("Playlist fetch failed:", error);
      return [];
    }
  }

  async getMetadata(trackId) {
    const key = String(trackId);
    const hit = metadataCache.get(key);
    if (hit && Date.now() - hit.ts < METADATA_TTL_MS) {
      return hit.data;
    }
    const pending = metadataInflight.get(key);
    if (pending) return pending;

    const task = (async () => {
      try {
        const response = await fetch(
          `${this.apiBaseUrl}/song/detail?ids=${trackId}`,
        );
        if (!response.ok) throw new Error("Failed to fetch song detail");
        const data = await response.json();

        let song = null;

        if (data.songs && data.songs.length > 0) {
          song = data.songs.find((s) => s.id.toString() === trackId.toString());
        } else if (
          data.result &&
          data.result.songs &&
          data.result.songs.length > 0
        ) {
          song = data.result.songs.find(
            (s) => s.id.toString() === trackId.toString(),
          );
        } else if (
          data.result &&
          data.result.tracks &&
          data.result.tracks.length > 0
        ) {
          song = data.result.tracks.find(
            (t) => t.id.toString() === trackId.toString(),
          );
        }

        if (!song) {
          console.error("No matching song detail; payload:", data);
          throw new Error("Unexpected song detail shape");
        }

        const metadata = {
          id: song.id.toString(),
          title: song.name,
          artist:
            (song.artists || song.ar)?.map((a) => a.name).join("/") ||
            "Unknown Artist",
          album: (song.album || song.al)?.name || "Unknown Album",
          cover: (song.album || song.al)?.picUrl || null,
          duration: song.duration || (song.dt ? song.dt / 1000 : 0),
        };

        if (metadata.id !== trackId.toString()) {
          console.error("Metadata id mismatch:", {
            expected: trackId,
            got: metadata.id,
          });
          throw new Error("Metadata id mismatch");
        }

        metadataCache.set(key, { data: metadata, ts: Date.now() });
        return metadata;
      } catch (error) {
        console.error("Song detail fetch failed:", error);
        const fallback = {
          id: key,
          title: `Track ID: ${trackId}`,
          artist: "Unknown Artist",
          album: "Unknown Album",
          cover: null,
          duration: 0,
        };
        metadataCache.set(key, { data: fallback, ts: Date.now() });
        return fallback;
      } finally {
        metadataInflight.delete(key);
      }
    })();

    metadataInflight.set(key, task);
    return task;
  }

  async getAudioUrl(trackId, level = "lite") {
    const id = encodeURIComponent(trackId);
    const q = level ? `&level=${encodeURIComponent(level)}` : "";
    return `${this.apiBaseUrl}/song/url?id=${id}${q}`;
  }
}
