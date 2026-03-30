import {
  getNeteaseApi,
  neteaseRequestOptions,
  brCandidatesForLevel,
} from "@/lib/neteaseNcm";

const UA =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36";

/** Netease http:80 CDN is flaky from some networks; prefer https */
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
 * Uses local NeteaseCloudMusicApi (no deprecated 402 public proxy).
 */
export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");
  const level = searchParams.get("level") || "lite";

  if (!id) {
    return Response.json({ error: "Missing song id" }, { status: 400 });
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

  // If server-side CDN fetch fails, redirect so the browser can try (often better reachability)
  if (lastNormalizedUrl) {
    return Response.redirect(lastNormalizedUrl, 302);
  }

  return Response.json(
    {
      success: false,
      error: "No playable URL (retry with NETEASE_COOKIE if configured)",
      id,
      level,
    },
    { status: 404 },
  );
}
