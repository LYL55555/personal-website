import { createRequire } from "node:module";

const require = createRequire(import.meta.url);

let ncmApi;

/**
 * Lazy-load CommonJS NeteaseCloudMusicApi (keep out of client bundles).
 */
export function getNeteaseApi() {
  if (!ncmApi) {
    ncmApi = require("NeteaseCloudMusicApi");
  }
  return ncmApi;
}

/**
 * Set NETEASE_COOKIE to a music.163.com cookie string to improve playable track rate.
 */
export function neteaseRequestOptions() {
  const cookie = process.env.NETEASE_COOKIE;
  return cookie ? { cookie } : {};
}

/** Map frontend `level` query to NeteaseCloudMusicApi song_url `br`. */
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

/** Ordered br fallbacks: start low, escalate on failure. */
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
