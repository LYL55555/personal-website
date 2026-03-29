import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";

const PlaylistView = ({
  isDarkMode,
  playlist,
  currentTrackIndex,
  onTrackSelect,
  onClose,
}) => {
  const playlistRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (playlistRef.current && !playlistRef.current.contains(event.target)) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);

  return (
    <motion.div
      ref={playlistRef}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      className={`absolute bottom-full mb-2 left-0 right-0 max-h-[70vh] overflow-y-auto rounded-lg shadow-lg ${
        isDarkMode
          ? "bg-solarized-base03 text-solarized-base0 scrollbar-dark"
          : "bg-solarized-base3 text-solarized-base00 scrollbar-light"
      }`}
    >
      <div
        className="sticky top-0 flex justify-between items-center p-3 border-b border-opacity-20 backdrop-blur-md z-10
        ${isDarkMode ? 'border-solarized-base01 bg-solarized-base03/90' : 'border-solarized-base1 bg-solarized-base3/90'}"
      >
        <h3 className="text-sm font-medium">Current Playlist</h3>
        <button
          onClick={onClose}
          className={`p-1 rounded-full hover:bg-opacity-20 transition-colors ${
            isDarkMode ? "hover:bg-solarized-base01" : "hover:bg-solarized-base1"
          }`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>

      <div className="p-2">
        {playlist.map((track, index) => (
          <button
            key={track.id}
            onClick={() => onTrackSelect(index)}
            className={`w-full flex items-center p-2 rounded-md text-left transition-colors ${
              index === currentTrackIndex
                ? isDarkMode
                  ? "bg-solarized-base02"
                  : "bg-solarized-base2"
                : "hover:bg-opacity-50 " +
                  (isDarkMode ? "hover:bg-solarized-base02" : "hover:bg-solarized-base2")
            }`}
          >
            <div className="min-w-[24px] text-xs opacity-50">{index + 1}</div>
            <div className="flex-1 min-w-0">
              <div className="text-sm font-medium truncate">{track.name}</div>
              <div className="text-xs opacity-75 truncate">
                {Array.isArray(track.artists)
                  ? track.artists.map((artist) => artist.name).join(", ")
                  : track.artist || "Unknown Artist"}
              </div>
            </div>
            {track.duration > 0 && (
              <div className="text-xs opacity-50 ml-2">
                {Math.floor(track.duration / 1000 / 60)}:
                {String(Math.floor((track.duration / 1000) % 60)).padStart(
                  2,
                  "0",
                )}
              </div>
            )}
          </button>
        ))}
      </div>
    </motion.div>
  );
};

export default PlaylistView;
