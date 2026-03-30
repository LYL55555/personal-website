"use client";

import { useEffect, useRef, useState } from "react";

const ProgressControl = ({
  isDarkMode,
  currentTime,
  duration,
  volume,
  title,
  artist,
  onTimeChange,
  onVolumeChange,
  formatTime,
  getVolumeIcon,
}) => {
  const titleRef = useRef(null);
  const [isOverflow, setIsOverflow] = useState(false);
  const [shouldAnimate, setShouldAnimate] = useState(false);
  const timeoutRef = useRef(null);

  useEffect(() => {
    const checkOverflow = () => {
      const element = titleRef.current;
      if (element) {
        const isTextOverflow = element.scrollWidth > element.clientWidth;
        setIsOverflow(isTextOverflow);

        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
        }

        if (isTextOverflow) {
          timeoutRef.current = setTimeout(() => {
            setShouldAnimate(true);
          }, 3000);
        } else {
          setShouldAnimate(false);
        }
      }
    };

    setTimeout(checkOverflow, 100);

    window.addEventListener("resize", checkOverflow);

    return () => {
      window.removeEventListener("resize", checkOverflow);
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [title, artist]);

  const getThumbPosition = () => {
    if (duration === 0) return "0%";
    const percentage = (currentTime / duration) * 100;
    return `${percentage}%`;
  };

  return (
    <div className="flex-1 min-w-0 w-full md:min-w-[200px] order-2 md:order-none">
      <div
        className={`text-sm md:text-sm font-medium mb-0.5 text-center md:text-left relative overflow-hidden ${
          isDarkMode ? "text-solarized-base1" : "text-solarized-base01"
        }`}
      >
        <div
          ref={titleRef}
          className={`whitespace-nowrap inline-block ${
            shouldAnimate ? "animate-marquee" : ""
          }`}
          style={{
            paddingRight: isOverflow ? "50px" : "0",
            transform: "translateZ(0)",
            ...(shouldAnimate && {
              paddingRight: "50px",
              animation: "marquee 15s linear infinite",
            }),
          }}
        >
          {title || "No Track Selected"}
        </div>
      </div>

      <div
        className={`text-xs mb-1 text-center md:text-left whitespace-nowrap overflow-hidden ${
          isDarkMode ? "text-solarized-base0" : "text-solarized-base00"
        }`}
      >
        {artist || "Unknown Artist"}
      </div>

      <div className="flex items-center space-x-1 md:space-x-2">
        <span
          className={`text-[10px] md:text-xs ${
            isDarkMode ? "text-solarized-base1" : "text-solarized-base01"
          }`}
        >
          {formatTime(currentTime)}
        </span>
        <div className="relative w-full">
          <input
            type="range"
            min="0"
            max={duration || 100}
            value={currentTime || 0}
            onChange={onTimeChange}
            className={`w-full h-1.5 md:h-2 rounded-lg appearance-none cursor-pointer
                      ${
                        isDarkMode
                          ? "bg-solarized-base01 accent-solarized-base1"
                          : "bg-solarized-base1 accent-solarized-base01"
                      }`}
            style={{
              background: isDarkMode
                ? `linear-gradient(to right, #93a1a1 ${getThumbPosition()}, #586e75 ${getThumbPosition()})`
                : `linear-gradient(to right, #586e75 ${getThumbPosition()}, #93a1a1 ${getThumbPosition()})`,
            }}
          />
        </div>
        <span
          className={`text-[10px] md:text-xs ${
            isDarkMode ? "text-solarized-base1" : "text-solarized-base01"
          }`}
        >
          {formatTime(duration || 0)}
        </span>
      </div>

      <div className="hidden md:flex items-center justify-center space-x-1.5 mt-1.5">
        <button
          onClick={() =>
            onVolumeChange({ target: { value: volume === 0 ? 1 : 0 } })
          }
          className={`p-1 rounded-full hover:bg-opacity-20 transition-colors duration-300 ${
            isDarkMode ? "hover:bg-solarized-base01" : "hover:bg-solarized-base1"
          }`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className={`h-4 w-4 ${
              isDarkMode ? "text-solarized-base1" : "text-solarized-base01"
            }`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            {getVolumeIcon()}
          </svg>
        </button>
        <input
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={volume}
          onChange={onVolumeChange}
          className="w-16 volume-slider"
          style={{
            "--thumb-color": isDarkMode ? "#93a1a1" : "#586e75",
            "--track-color": isDarkMode ? "#586e75" : "#93a1a1",
            "--track-fill-color": isDarkMode ? "#93a1a1" : "#586e75",
            background: isDarkMode
              ? `linear-gradient(to right, #93a1a1 ${volume * 100}%, #586e75 ${
                  volume * 100
                }%)`
              : `linear-gradient(to right, #586e75 ${volume * 100}%, #93a1a1 ${
                  volume * 100
                }%)`,
          }}
        />
      </div>
    </div>
  );
};

export default ProgressControl;
