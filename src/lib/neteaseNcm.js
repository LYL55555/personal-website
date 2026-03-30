import { createRequire } from "node:module";

const require = createRequire(import.meta.url);

let ncmApi;

export function getNeteaseApi() {
  if (!ncmApi) {
    ncmApi = require("NeteaseCloudMusicApi");
  }
  return ncmApi;
}

export function neteaseRequestOptions() {
  const cookie = process.env.NETEASE_COOKIE;
  return cookie ? { cookie } : {};
}

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
