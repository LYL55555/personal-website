import {
  getNeteaseApi,
  neteaseRequestOptions,
} from "@/lib/neteaseNcm";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const playlistId = searchParams.get("id");

  if (!playlistId) {
    return Response.json(
      {
        code: 400,
        message: "Missing playlist ID",
      },
      { status: 400 }
    );
  }

  try {
    const ncm = getNeteaseApi();
    const res = await ncm.playlist_detail({
      id: playlistId,
      ...neteaseRequestOptions(),
    });

    if (res.status !== 200 || !res.body || res.body.code !== 200) {
      throw new Error(
        `获取歌单失败: ${res.status} / code ${res.body?.code ?? "?"}`
      );
    }

    const playlist = res.body.playlist;
    if (!playlist) {
      throw new Error("歌单数据为空");
    }

    const mergedData = {
      code: 200,
      result: {
        ...playlist,
        tracks: playlist.tracks || [],
      },
    };

    return Response.json(mergedData);
  } catch (error) {
    return Response.json(
      {
        code: 500,
        message: error.message || "获取歌单失败",
      },
      { status: 500 }
    );
  }
}
