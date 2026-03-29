import { createRequire } from "node:module";

const require = createRequire(import.meta.url);

let ncmApi;

/**
 * 懒加载 CommonJS 包 NeteaseCloudMusicApi（避免在客户端打包）
 */
export function getNeteaseApi() {
  if (!ncmApi) {
    ncmApi = require("NeteaseCloudMusicApi");
  }
  return ncmApi;
}

/**
 * 若设置 NETEASE_COOKIE（浏览器里 music.163.com 的 Cookie 字符串），可提升可播放曲目比例。
 */
export function neteaseRequestOptions() {
  const cookie = process.env.NETEASE_COOKIE;
  return cookie ? { cookie } : {};
}

/** 与前端 `level` 查询参数对应，传给 NeteaseCloudMusicApi song_url 的 br */
export function levelToBr(level) {
  switch (level) {
    case "lite":
      return 64000;
    case "low":
      return 96000;
    case "standard":
      return 128000;
    case "higher":
    case "exhigh":
      return 320000;
    case "lossless":
    case "hires":
      return 999000;
    default:
      return 320000;
  }
}

/** 按音质依次尝试 br，优先省流、失败再升码率 */
export function brCandidatesForLevel(level) {
  const hi = levelToBr("higher");
  switch (level) {
    case "lite":
      return [levelToBr("lite"), levelToBr("standard"), hi];
    case "low":
      return [levelToBr("low"), levelToBr("standard"), hi];
    case "standard":
      return [levelToBr("standard"), hi];
    default:
      return [levelToBr(level)];
  }
}
