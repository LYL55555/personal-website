"use client";

import { MusicSourceInterface } from "./MusicSourceInterface";

/** 同一会话内按歌曲去重，避免 Strict Mode / effect 重跑对同一 id 反复打 song/detail */
const METADATA_TTL_MS = 1000 * 60 * 30;
const metadataCache = new Map();
const metadataInflight = new Map();

const DEFAULT_PLAYLIST =
  process.env.NEXT_PUBLIC_NETEASE_PLAYLIST_ID ?? "13583418396";

export class NeteaseMusicSource extends MusicSourceInterface {
  constructor(playlistId = DEFAULT_PLAYLIST) {
    super();
    this.playlistId = playlistId;
    this.apiBaseUrl = "/api/netease"; // 需要创建的API端点
  }

  setPlaylistId(playlistId) {
    this.playlistId = playlistId;
  }

  async getPlaylist() {
    try {
      const response = await fetch(
        `${this.apiBaseUrl}/playlist?id=${this.playlistId}`,
      );
      if (!response.ok) throw new Error("获取网易云歌单失败");
      const data = await response.json();

      // 处理网易云音乐API返回的不同可能的结构
      let tracks = [];

      // 方式1: 标准网易云API返回格式
      if (data.result && Array.isArray(data.result.tracks)) {
        tracks = data.result.tracks;
      }
      // 方式2: 直接歌曲数组
      else if (Array.isArray(data.tracks)) {
        tracks = data.tracks;
      }
      // 方式3: 歌曲数组可能在songs字段中
      else if (Array.isArray(data.songs)) {
        tracks = data.songs;
      }
      // 方式4: 单个歌曲对象
      else if (data.songs && Array.isArray(data.songs)) {
        tracks = data.songs;
      }

      if (!tracks.length) {
        throw new Error("获取的歌单格式不正确或歌单为空");
      }

      return tracks.map((track) => {
        // 处理不同的字段命名（标准API vs 第三方API）
        const artists = track.artists || track.ar || [];
        const album = track.album || track.al || {};
        const name = track.name || track.title || "未知歌曲";

        return {
          id: track.id.toString(),
          name: name,
          artists: artists.map((a) => ({
            id: a.id?.toString() || "",
            name: a.name || "未知歌手",
          })),
          album: {
            id: album.id?.toString() || "",
            name: album.name || "未知专辑",
            picUrl: album.picUrl || null,
          },
          duration: track.duration || track.dt || 0,
          fee: track.fee || 0,
          pop: track.pop || track.popularity || 0,
        };
      });
    } catch (error) {
      console.error("获取歌单失败:", error);
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
        if (!response.ok) throw new Error("获取歌曲详情失败");
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
          console.error("未找到匹配的歌曲详情,返回数据结构:", data);
          throw new Error("获取的歌曲详情格式不正确");
        }

        const metadata = {
          id: song.id.toString(),
          title: song.name,
          artist:
            (song.artists || song.ar)?.map((a) => a.name).join("/") ||
            "未知歌手",
          album: (song.album || song.al)?.name || "未知专辑",
          cover: (song.album || song.al)?.picUrl || null,
          duration: song.duration || (song.dt ? song.dt / 1000 : 0),
        };

        if (metadata.id !== trackId.toString()) {
          console.error("元数据ID不匹配:", {
            expected: trackId,
            got: metadata.id,
          });
          throw new Error("元数据ID不匹配");
        }

        metadataCache.set(key, { data: metadata, ts: Date.now() });
        return metadata;
      } catch (error) {
        console.error("获取歌曲详情失败:", error);
        const fallback = {
          id: key,
          title: `歌曲 ID: ${trackId}`,
          artist: "未知歌手",
          album: "未知专辑",
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

  /**
   * song/url 路由返回的是同源代理音频流（非 JSON），此处只返回可供 audio 使用的路径。
   */
  async getAudioUrl(trackId, level = "lite") {
    const id = encodeURIComponent(trackId);
    const q = level ? `&level=${encodeURIComponent(level)}` : "";
    return `${this.apiBaseUrl}/song/url?id=${id}${q}`;
  }
}
