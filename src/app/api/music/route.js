import { readdir } from 'fs/promises';
import { join } from 'path';

export async function GET() {
  try {
    const musicDir = join(process.cwd(), 'public/music');
    const files = await readdir(musicDir);
    
    // 过滤出MP3文件并格式化数据
    const musicFiles = files
      .filter(file => file.endsWith('.mp3'))
      .map(file => ({
        title: file.replace('.mp3', ''),
        src: `/music/${file}`,
        cover: null
      }));

    return Response.json(musicFiles);
  } catch (error) {
    console.error('Error reading music directory:', error);
    return Response.json({ error: 'Failed to load music files' }, { status: 500 });
  }
} 