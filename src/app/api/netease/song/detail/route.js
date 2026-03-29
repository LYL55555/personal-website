import { getNeteaseApi, neteaseRequestOptions } from "@/lib/neteaseNcm";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const ids = searchParams.get("ids");

  if (!ids) {
    return Response.json({ error: "缺少歌曲ID参数" }, { status: 400 });
  }

  try {
    const ncm = getNeteaseApi();
    const res = await ncm.song_detail({
      ids,
      ...neteaseRequestOptions(),
    });

    if (res.status !== 200 || !res.body) {
      throw new Error(`歌曲详情请求失败: ${res.status}`);
    }

    return Response.json(res.body);
  } catch (error) {
    console.error("获取歌曲详情失败:", error);
    return Response.json(
      {
        songs: [
          {
            id: ids,
            name: `歌曲 ID: ${ids}`,
            artists: [{ name: "未知歌手" }],
            album: { name: "未知专辑", picUrl: null },
            duration: 0,
          },
        ],
        code: 200,
      },
      { status: 200 },
    );
  }
}
