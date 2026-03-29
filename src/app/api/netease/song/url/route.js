import {
  getNeteaseApi,
  neteaseRequestOptions,
  brCandidatesForLevel,
} from "@/lib/neteaseNcm";

const UA =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36";

/** 网易返回的 http:80 CDN 在部分网络/机房连不上，优先走 https */
function normalizeNeteaseCdnUrl(url) {
  if (!url || typeof url !== "string") return url;
  try {
    const u = new URL(url);
    if (
      u.hostname.endsWith(".126.net") ||
      u.hostname === "music.126.net"
    ) {
      if (u.protocol === "http:") u.protocol = "https:";
    }
    return u.toString();
  } catch {
    return url;
  }
}

const FETCH_AUDIO_MS = 45_000;

async function fetchUrlAsAudioResponse(audioUrl) {
  try {
    const audioResponse = await fetch(audioUrl, {
      headers: {
        "User-Agent": UA,
        Referer: "https://music.163.com/",
      },
      redirect: "follow",
      signal:
        typeof AbortSignal !== "undefined" && AbortSignal.timeout
          ? AbortSignal.timeout(FETCH_AUDIO_MS)
          : undefined,
    });

    if (!audioResponse.ok) return null;

    const type = audioResponse.headers.get("Content-Type") || "";
    if (type.includes("text/html") || type.includes("application/json")) {
      return null;
    }

    const audioData = await audioResponse.arrayBuffer();
    if (!audioData.byteLength) return null;

    const headers = new Headers();
    headers.set("Content-Type", type || "audio/mpeg");
    headers.set("Access-Control-Allow-Origin", "*");
    headers.set("Cache-Control", "public, max-age=3600");

    return new Response(audioData, { status: 200, headers });
  } catch {
    return null;
  }
}

async function resolvePlayableUrl(ncm, id, br, opts) {
  try {
    const res = await ncm.song_url({
      id,
      br,
      ...opts,
    });
    const row = res?.body?.data?.[0];
    if (!row?.url) return null;
    return row.url;
  } catch {
    return null;
  }
}

/**
 * GET /api/netease/song/url?id=...&level=lite|standard|higher|...
 * 使用本地 NeteaseCloudMusicApi 直连网易接口，不再依赖已 402 的 vercel 公共代理。
 */
export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");
  const level = searchParams.get("level") || "lite";

  if (!id) {
    return Response.json({ error: "缺少歌曲ID参数" }, { status: 400 });
  }

  const ncm = getNeteaseApi();
  const opts = neteaseRequestOptions();
  const brList = brCandidatesForLevel(level);

  let lastNormalizedUrl = null;

  for (const br of brList) {
    const audioUrl = await resolvePlayableUrl(ncm, id, br, opts);
    if (!audioUrl) continue;

    const normalized = normalizeNeteaseCdnUrl(audioUrl);
    lastNormalizedUrl = normalized;

    const proxied = await fetchUrlAsAudioResponse(normalized);
    if (proxied) return proxied;
  }

  // 服务端拉 CDN 超时或不可达时，让浏览器直接请求（用户侧常比 Vercel/部分机房更易连通）
  if (lastNormalizedUrl) {
    return Response.redirect(lastNormalizedUrl, 302);
  }

  return Response.json(
    {
      success: false,
      error: "无可播放地址（可配置 NETEASE_COOKIE 后重试）",
      id,
      level,
    },
    { status: 404 },
  );
}
