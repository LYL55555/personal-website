"use client";

export class MusicSourceManager {
  constructor() {
    this.sources = {};
    this.currentSource = null;
  }

  registerSource(name, source) {
    this.sources[name] = source;
  }

  switchSource(name) {
    if (!this.sources[name]) {
      throw new Error(`Music source '${name}' not found`);
    }
    this.currentSource = name;
  }

  getCurrentSource() {
    const s = this.currentSource && this.sources[this.currentSource];
    if (!s) {
      throw new Error("No active music source");
    }
    return s;
  }

  getCurrentSourceName() {
    return this.currentSource ?? "none";
  }
}
