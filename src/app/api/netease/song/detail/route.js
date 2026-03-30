import { getNeteaseApi, neteaseRequestOptions } from "@/lib/neteaseNcm";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const ids = searchParams.get("ids");

  if (!ids) {
    return Response.json({ error: "Missing song id" }, { status: 400 });
  }

  try {
    const ncm = getNeteaseApi();
    const res = await ncm.song_detail({
      ids,
      ...neteaseRequestOptions(),
    });

    if (res.status !== 200 || !res.body) {
      throw new Error(`Song detail request failed: ${res.status}`);
    }

    return Response.json(res.body);
  } catch (error) {
    console.error("Song detail failed:", error);
    return Response.json(
      {
        songs: [
          {
            id: ids,
            name: `Track ID: ${ids}`,
            artists: [{ name: "Unknown Artist" }],
            album: { name: "Unknown Album", picUrl: null },
            duration: 0,
          },
        ],
        code: 200,
      },
      { status: 200 },
    );
  }
}
