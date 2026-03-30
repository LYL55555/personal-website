import { getNeteaseApi, neteaseRequestOptions } from "@/lib/neteaseNcm";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const trackId = searchParams.get("id");

  if (!trackId) {
    return Response.json(
      {
        code: 400,
        message: "Missing track ID",
      },
      { status: 400 },
    );
  }

  try {
    const ncm = getNeteaseApi();
    const res = await ncm.lyric({
      id: trackId,
      ...neteaseRequestOptions(),
    });

    if (res.status !== 200) {
      throw new Error(`Lyric request failed: ${res.status}`);
    }

    return Response.json(res.body);
  } catch (error) {
    return Response.json(
      {
        code: 500,
        message: error.message || "Failed to fetch lyrics",
      },
      { status: 500 },
    );
  }
}
