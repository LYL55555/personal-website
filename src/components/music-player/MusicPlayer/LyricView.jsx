import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MdClose } from "react-icons/md";

const LyricView = ({
  isDarkMode,
  currentTrackId,
  fallbackTitle,
  fallbackArtist,
  currentTime,
  isVisible,
  onClose,
  onSeek,
  albumCover,
  getLyrics,
  preloadLyrics,
  findLyricIndex,
  lyricLoading,
  hasLyricCache,
}) => {
  const [currentIndex, setCurrentIndex] = useState(-1);
  /** 模糊：CSS filter blur(px)，越大越糊，与「透明度」无关 */
  const [backgroundBlur, setBackgroundBlur] = useState(8);
  /** 封面图层不透明度：越大背景越实；与 Blur 滑块无关 */
  const [backgroundOpacity, setBackgroundOpacity] = useState(1);
  const lyricsContainerRef = useRef(null);
  const viewRef = useRef(null);

  // 处理点击外部关闭
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (viewRef.current && !viewRef.current.contains(event.target)) {
        onClose();
      }
    };

    if (isVisible) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isVisible, onClose]);

  // 预加载歌词数据
  useEffect(() => {
    if (currentTrackId) {
      preloadLyrics(currentTrackId);
    }
  }, [currentTrackId, preloadLyrics]);

  // 根据当前播放时间更新当前歌词
  useEffect(() => {
    if (!currentTrackId) return;

    const { lyrics } = getLyrics(currentTrackId);
    if (!lyrics || !lyrics.length) return;

    const index = findLyricIndex(lyrics, currentTime);
    if (index !== currentIndex) {
      setCurrentIndex(index);
    }
  }, [currentTime, currentTrackId, getLyrics, findLyricIndex, currentIndex]);

  // 自动滚动到当前歌词
  useEffect(() => {
    if (currentIndex >= 0 && lyricsContainerRef.current) {
      const container = lyricsContainerRef.current;
      const items = container.getElementsByClassName("lyric-item");

      if (items.length > currentIndex) {
        const currentItem = items[currentIndex];
        const containerHeight = container.clientHeight;
        const itemTop = currentItem.offsetTop;
        const itemHeight = currentItem.clientHeight;

        // 当前行对齐在约 36% 高度处（偏上），避免总在正中间
        const lineAnchorRatio = 0.36;
        const targetScrollTop =
          itemTop - containerHeight * lineAnchorRatio + itemHeight / 2;

        // 使用平滑滚动
        container.scrollTo({
          top: targetScrollTop,
          behavior: "smooth",
        });
      }
    }
  }, [currentIndex]);

  // 处理点击歌词跳转
  const handleLyricClick = (time) => {
    if (onSeek && typeof onSeek === "function") {
      onSeek(time);
    }
  };

  // 调整背景模糊度
  const handleBlurChange = (e) => {
    setBackgroundBlur(parseInt(e.target.value, 10));
  };

  // 从缓存中获取当前歌曲的歌词数据
  const { lyrics, translatedLyrics, songInfo } = currentTrackId
    ? getLyrics(currentTrackId)
    : { lyrics: [], translatedLyrics: [], songInfo: null };

  const displayTitle = songInfo?.name ?? fallbackTitle ?? null;
  const displayArtist = songInfo?.artist ?? fallbackArtist ?? null;

  // 显示加载状态
  const loading = lyricLoading && !hasLyricCache(currentTrackId);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.2 }}
          className="w-full aspect-square rounded-lg shadow-xl overflow-hidden"
          ref={viewRef}
          style={{
            minWidth: "400px",
            maxWidth: "750px",
            minHeight: "400px",
            maxHeight: "750px",
            pointerEvents: "auto",
          }}
        >
          {/* 背景封面 */}
          {albumCover && (
            <div
              className="absolute inset-0 bg-center bg-cover z-0"
              style={{
                backgroundImage: `url(${albumCover})`,
                filter: `blur(${backgroundBlur}px)`,
                opacity: backgroundOpacity,
                transform: "scale(1.1)", // 避免模糊边缘
              }}
            />
          )}

          {/* 暗色遮罩增强文字可读性 */}
          <div
            className={`absolute inset-0 z-0 ${
              isDarkMode ? "bg-solarized-base03/28" : "bg-solarized-base3/28"
            }`}
          ></div>

          <div className="relative w-full h-full flex flex-col z-10">
            {/* 顶部栏 - 增加透明度 */}
            <div
              className={`sticky top-0 flex flex-wrap justify-between items-center p-3 z-10 backdrop-blur-sm ${
                isDarkMode
                  ? "bg-solarized-base03/30 text-solarized-base1" // Solarized dark颜色系列
                  : "bg-solarized-base3/30 text-solarized-base00"
              }`}
            >
              <div className="flex-1 flex flex-col pr-2 min-w-0">
                {displayTitle || displayArtist ? (
                  <>
                    {displayTitle ? (
                      <h3
                        className={`text-sm md:text-base font-medium truncate ${
                          isDarkMode
                            ? "text-solarized-base1 opacity-90"
                            : "text-solarized-base03 opacity-90"
                        }`}
                      >
                        {displayTitle}
                      </h3>
                    ) : null}
                    {displayArtist ? (
                      <div
                        className={`text-xs md:text-sm truncate ${
                          isDarkMode
                            ? "text-solarized-base0 opacity-80"
                            : "text-solarized-base01 opacity-90"
                        }`}
                      >
                        {displayArtist}
                      </div>
                    ) : null}
                  </>
                ) : (
                  <h3
                    className={`text-sm md:text-base font-medium ${
                      isDarkMode
                        ? "text-solarized-base1 opacity-80"
                        : "text-solarized-base03 opacity-80"
                    }`}
                  >
                    Now Playing
                  </h3>
                )}
              </div>
              <div className="flex items-center gap-3 flex-shrink-0">
                {/* 控制区域 - 更加简洁，移除翻译按钮 */}
                <div className="flex items-center gap-3">
                  <div
                    className={`flex items-center gap-2 rounded-lg border px-2.5 py-2 bg-transparent ${
                      isDarkMode ? "border-solarized-base01/45" : "border-solarized-base1/45"
                    }`}
                    title="背景封面模糊强度"
                  >
                    <span
                      className={`whitespace-nowrap text-xs font-semibold uppercase tracking-wide ${
                        isDarkMode ? "text-solarized-base1" : "text-solarized-base01"
                      }`}
                    >
                      Blur
                    </span>
                    <input
                      type="range"
                      min="0"
                      max="20"
                      value={backgroundBlur}
                      onChange={handleBlurChange}
                      aria-label="背景模糊"
                      className={`h-2 w-[5.5rem] shrink-0 cursor-pointer appearance-none rounded-full sm:w-32 [&::-webkit-slider-runnable-track]:h-2 [&::-webkit-slider-runnable-track]:rounded-full ${
                        isDarkMode
                          ? "[accent-color:#2aa198] [&::-webkit-slider-runnable-track]:bg-transparent [&::-moz-range-track]:h-2 [&::-moz-range-track]:rounded-full [&::-moz-range-track]:bg-transparent"
                          : "[accent-color:#268bd2] [&::-webkit-slider-runnable-track]:bg-transparent [&::-moz-range-track]:h-2 [&::-moz-range-track]:rounded-full [&::-moz-range-track]:bg-transparent"
                      }`}
                    />
                    <span
                      className={`min-w-[1.25rem] text-right text-xs font-mono font-semibold tabular-nums ${
                        isDarkMode ? "text-solarized-cyan" : "text-solarized-blue"
                      }`}
                    >
                      {backgroundBlur}
                    </span>
                  </div>
                </div>

                {/* 关闭按钮 - 简化 */}
                <button
                  onClick={onClose}
                  className={`p-1 rounded-full hover:bg-opacity-20 transition-colors opacity-80 ${
                    isDarkMode
                      ? "text-solarized-base1 hover:bg-solarized-base01"
                      : "hover:bg-solarized-base1" // Solarized dark颜色系列
                  }`}
                  aria-label="Close"
                >
                  <MdClose className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* 加载状态 */}
            {loading && (
              <div className="flex-1 flex items-center justify-center">
                <div
                  className={`animate-spin w-8 h-8 border-2 rounded-full opacity-70 ${
                    isDarkMode
                      ? "border-solarized-base01/60 border-t-solarized-cyan/80" // Solarized dark颜色组合
                      : "border-solarized-base1/50 border-t-solarized-blue/70"
                  }`}
                ></div>
              </div>
            )}

            {/* 歌词内容 */}
            {!loading && (
              <div
                ref={lyricsContainerRef}
                className={`flex-1 overflow-y-auto p-4 scrollbar-${
                  isDarkMode ? "dark" : "light"
                } overscroll-behavior-y-contain`}
              >
                {!lyrics || lyrics.length === 0 ? (
                  <div className="flex items-center justify-center h-full">
                    <p
                      className={`text-sm opacity-70 ${
                        isDarkMode ? "text-solarized-base1" : "text-solarized-base00" // Solarized dark颜色
                      }`}
                    >
                      No lyrics available
                    </p>
                  </div>
                ) : (
                  <div className="min-h-full flex flex-col items-center">
                    {/* 顶部垫高，配合 lineAnchorRatio 让当前行不必落在视口正中 */}
                    <div className="h-[22vh]"></div>

                    {lyrics.map((line, index) => (
                      <div
                        key={`${line.time}-${index}`}
                        className={`lyric-item flex flex-col items-center mb-5 transition-all duration-300 cursor-pointer hover:opacity-100 ${
                          index === currentIndex
                            ? `text-base md:text-xl scale-105`
                            : "text-sm md:text-base opacity-60 hover:opacity-80"
                        }`}
                        onClick={() => handleLyricClick(line.time)}
                      >
                        <p
                          className={`text-center px-4 py-1.5 rounded-full ${
                            index === currentIndex
                              ? isDarkMode
                                ? "bg-gradient-to-r from-solarized-blue/40 via-solarized-blue/25 to-transparent"
                                : "bg-gradient-to-r from-solarized-blue/40 via-solarized-cyan/25 to-transparent"
                              : ""
                          }`}
                          style={{
                            animation:
                              index === currentIndex
                                ? "pulse 2s infinite"
                                : "none",
                            textShadow: isDarkMode
                              ? "0 0 8px rgba(0,0,0,0.5)"
                              : "0 0 8px rgba(255,255,255,0.5)",
                          }}
                        >
                          {index === currentIndex ? (
                            <span
                              className="lyric-gradient-text"
                              style={{
                                color: isDarkMode ? "white" : "#000000",
                                fontWeight: "600",
                                textShadow: isDarkMode
                                  ? "0 0 10px rgba(38, 139, 210, 0.7)"
                                  : "0 0 10px rgba(38, 139, 210, 0.6)",
                              }}
                            >
                              {line.text}
                            </span>
                          ) : (
                            <span
                              style={{
                                color: isDarkMode ? "white" : "#000000",
                              }}
                            >
                              {line.text}
                            </span>
                          )}
                        </p>
                      </div>
                    ))}

                    <div className="h-[22vh]"></div>
                  </div>
                )}
              </div>
            )}

            <div
              className={`absolute bottom-3 left-0 right-0 text-center text-xs md:text-sm opacity-50 ${
                isDarkMode ? "text-solarized-base1" : "text-solarized-base01"
              }`}
            >
              Click lyrics to seek
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LyricView;
