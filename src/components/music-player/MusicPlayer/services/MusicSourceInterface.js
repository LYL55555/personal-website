"use client";

/**
 * Music source contract
 * @interface MusicSource
 */
export class MusicSourceInterface {
  /**
   * Load playlist rows
   * @returns {Promise<Array<{
   *   id: string,
   *   title: string,
   *   src: string,
   *   cover?: string | null
   * }>>}
   */
  async getPlaylist() {
    throw new Error('Method not implemented');
  }

  /**
   * Track metadata (incl. cover)
   * @param {string} trackId
   * @returns {Promise<{
   *   title: string,
   *   artist?: string,
   *   album?: string,
   *   cover?: string | null,
   *   duration?: number
   * }>}
   */
  async getMetadata(trackId) {
    throw new Error('Method not implemented');
  }

  /**
   * Resolve playable audio URL
   * @param {string} trackId
   * @returns {Promise<string>}
   */
  async getAudioUrl(trackId) {
    throw new Error('Method not implemented');
  }
} 