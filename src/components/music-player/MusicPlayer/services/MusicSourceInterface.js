"use client";

export class MusicSourceInterface {
  async getPlaylist() {
    throw new Error("Method not implemented");
  }

  async getMetadata(trackId) {
    throw new Error("Method not implemented");
  }

  async getAudioUrl(trackId) {
    throw new Error("Method not implemented");
  }
}
