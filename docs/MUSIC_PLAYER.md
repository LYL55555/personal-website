# Music Player Documentation

## Overview
The music player is a feature-rich component that allows users to play music while browsing the portfolio website. It provides a modern, responsive interface with various controls and features.

## Features
- Dynamic playlist loading from `/public/music` directory
- Automatic metadata extraction (including album covers)
- Playback controls (play/pause, next/previous track)
- Volume control with mute toggle
- Progress bar with seek functionality
- Responsive design (mobile & desktop)
- Dark/Light theme support
- Smooth animations using Framer Motion
- Auto-play next track

## Technical Implementation

### Core Technologies
- Next.js for the framework
- React Hooks for state management
- Framer Motion for animations
- Tailwind CSS for styling
- music-metadata for metadata extraction

### Key Components

#### 1. Dynamic Playlist Loading
The player automatically loads MP3 files from the `/public/music` directory using a dedicated API route:
```javascript
// src/app/api/music/route.js
export async function GET() {
  const musicDir = join(process.cwd(), 'public/music');
  const files = await readdir(musicDir);
  return Response.json(musicFiles);
}
```

#### 2. Metadata Extraction
The player extracts metadata including album covers from MP3 files:
```javascript
const extractMetadata = async (trackIndex) => {
  const response = await fetch(playlist[trackIndex].src);
  const buffer = await response.arrayBuffer();
  const metadata = await parseBlob(new Blob([buffer]));
  // Process metadata...
};
```

#### 3. Playback Controls
Implementation of play/pause, next/previous track functionality with smooth transitions:
```javascript
const togglePlay = () => {
  if (isPlaying) {
    audioRef.current.pause();
  } else {
    audioRef.current.play();
  }
  setIsPlaying(!isPlaying);
};
```

#### 4. Volume Control
Volume management with mute toggle functionality:
```javascript
const handleVolumeChange = (e) => {
  const vol = Math.min(Math.max(parseFloat(e.target.value), 0), 1);
  audioRef.current.volume = vol;
  setVolume(vol);
};
```

## Styling
The player uses Tailwind CSS for styling with a responsive design that adapts to both mobile and desktop views. It includes:
- Floating player design
- Backdrop blur effect
- Dynamic theme adaptation
- Smooth hover and click animations

## Usage
To add new music to the player:
1. Place MP3 files in the `/public/music` directory
2. The player will automatically detect and load the new tracks
3. Metadata (including album art) will be extracted automatically

## Future Enhancements

### Playback Features
- [ ] Shuffle mode
- [ ] Repeat modes (single track, playlist)
- [ ] Playlist management
- [ ] Cross-fade between tracks
- [ ] Keyboard shortcuts
- [ ] Mobile gesture controls

### Visual & UI Enhancements
- [ ] Music visualizer effects
  - Spectrum analyzer
  - Waveform display
  - Particle effects synced with music
- [ ] Lyrics display
  - Synchronized lyrics timing
  - Karaoke mode
  - Multiple language support
- [ ] Advanced layout options
  - Minimized mode
  - Dockable player
  - Picture-in-Picture mode
  - Customizable player position
  - Expandable/Collapsible playlist view

### Streaming Integration
- [ ] NetEase Cloud Music integration
  - User playlist import
  - Song details and artwork
  - Streaming support
- [ ] Spotify integration
  - OAuth authentication
  - Playlist synchronization
  - Real-time playback status
- [ ] Custom API integration
  - Centralized music storage
  - Cloud-based playlist management
  - User preferences sync

### Performance Optimizations
- [ ] Audio preloading
- [ ] Adaptive quality streaming
- [ ] Caching system for frequently played tracks
- [ ] Background loading for metadata
- [ ] Memory management for large playlists

### Social Features
- [ ] Share current playing track
- [ ] Collaborative playlists
- [ ] Music recommendations
- [ ] Play history tracking

These enhancements will be implemented based on user feedback and priority. Contributions and suggestions are welcome! 