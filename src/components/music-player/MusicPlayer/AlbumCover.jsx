"use client";

import Image from "next/image";
import { motion, useAnimation } from "framer-motion";
import { useEffect, useRef } from "react";

const AlbumCover = ({ currentCover, isDarkMode, isPlaying }) => {
  const controls = useAnimation();
  const rotationRef = useRef(0);
  const startTimeRef = useRef(null);
  const isMountedRef = useRef(false);

  // Reset spin when cover changes
  const resetRotation = useEffect(() => {
    if (isMountedRef.current) {
      rotationRef.current = 0;
      startTimeRef.current = null;
      controls.set({ rotate: 0 });
    }
  }, [currentCover]);

  useEffect(() => {
    isMountedRef.current = true;
    let animationFrameId;

    const animate = (timestamp) => {
      if (!startTimeRef.current) startTimeRef.current = timestamp;
      const elapsed = timestamp - startTimeRef.current;

      // One full rotation every 4s
      rotationRef.current = (elapsed / 4000) * 360;

      if (isMountedRef.current) {
        controls.set({
          rotate: rotationRef.current,
        });
      }

      if (isPlaying && isMountedRef.current) {
        animationFrameId = requestAnimationFrame(animate);
      }
    };

    if (isPlaying && isMountedRef.current) {
      animationFrameId = requestAnimationFrame(animate);
    }

    return () => {
      isMountedRef.current = false;
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, [isPlaying, controls]);

  return (
    <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 relative flex-shrink-0 order-first">
      {/* Vinyl outer ring */}
      <div className="absolute inset-0 rounded-full border-[10px] sm:border-[12px] border-black">
        {currentCover ? (
          <motion.div
            className="w-full h-full rounded-full overflow-hidden relative"
            animate={controls}
            initial={{ rotate: 0 }}
            transition={{
              type: "tween",
              duration: 0,
            }}
          >
            <Image
              src={currentCover}
              alt="Album Cover"
              fill
              sizes="(max-width: 640px) 16vw, (max-width: 768px) 20vw, 24vw"
              className="object-cover rounded-full"
              priority
              loading="eager"
            />
          </motion.div>
        ) : (
          <div
            className={`w-full h-full flex items-center justify-center rounded-full ${
              isDarkMode ? "bg-solarized-base01" : "bg-solarized-base1"
            }`}
          >
            <div
              className={`w-[60%] h-[60%] rounded-full flex items-center justify-center ${
                isDarkMode ? "bg-solarized-base02" : "bg-solarized-base03"
              }`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className={`h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8 ${
                  isDarkMode ? "text-solarized-base1" : "text-solarized-base2"
                }`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3"
                />
              </svg>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AlbumCover;
