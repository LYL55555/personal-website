"use client";
import { motion } from "framer-motion";
import { useTheme } from "@/context/ThemeContext";
import { FrontendQuadrant } from "./quadrants/FrontendQuadrant";
import { BackendQuadrant } from "./quadrants/BackendQuadrant";
import { DatabaseQuadrant } from "./quadrants/DatabaseQuadrant";
import { DevopsQuadrant } from "./quadrants/DevopsQuadrant";
import { useEffect, useState } from "react";

function SkillCircle() {
  const { isDarkMode } = useTheme();
  const [windowWidth, setWindowWidth] = useState(0);

  // Track viewport width
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    
    // Initial measure
    if (typeof window !== 'undefined') {
      setWindowWidth(window.innerWidth);
      window.addEventListener('resize', handleResize);
    }
    
    return () => {
      if (typeof window !== 'undefined') {
        window.removeEventListener('resize', handleResize);
      }
    };
  }, []);

  // Derive ring size from breakpoint
  const containerHeight = windowWidth < 480 ? 500 : windowWidth < 768 ? 550 : 600;
  const circleRadiuses = windowWidth < 480 
    ? [60, 90, 120] 
    : windowWidth < 768 
      ? [80, 120, 160] 
      : [100, 150, 200];

  return (
    <div className="relative w-full h-[500px] xs:h-[550px] md:h-[600px] flex items-center justify-center px-4 sm:px-8 md:px-16 py-8 sm:py-12 overflow-hidden">
      {/* Background ring */}
      {circleRadiuses.map((radius, index) => (
        <motion.div
          key={radius}
          className={`absolute border ${
            isDarkMode
              ? "border-solarized-base01 border-opacity-40"
              : "border-solarized-base1 border-opacity-60"
          } rounded-full`}
          style={{
            width: radius * 2,
            height: radius * 2,
          }}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1, delay: index * 0.2 }}
        />
      ))}

      {/* Quadrant dividers */}
      <motion.div
        className={`absolute w-[90%] h-[1px] ${
          isDarkMode
            ? "bg-solarized-base01 bg-opacity-40"
            : "bg-solarized-base1 bg-opacity-60"
        }`}
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 1 }}
      />
      <motion.div
        className={`absolute w-[1px] h-[90%] ${
          isDarkMode
            ? "bg-solarized-base01 bg-opacity-40"
            : "bg-solarized-base1 bg-opacity-60"
        }`}
        initial={{ scaleY: 0 }}
        animate={{ scaleY: 1 }}
        transition={{ duration: 1 }}
      />

      {/* Diagonals */}
      <motion.div
        className={`absolute w-[0.5px] h-[90%] origin-center rotate-45 ${
          isDarkMode
            ? "bg-solarized-base01 bg-opacity-20"
            : "bg-solarized-base1 bg-opacity-20"
        }`}
        initial={{ scaleY: 0 }}
        animate={{ scaleY: 1 }}
        transition={{ duration: 1, delay: 0.5 }}
      />
      <motion.div
        className={`absolute w-[0.5px] h-[90%] origin-center -rotate-45 ${
          isDarkMode
            ? "bg-solarized-base01 bg-opacity-20"
            : "bg-solarized-base1 bg-opacity-20"
        }`}
        initial={{ scaleY: 0 }}
        animate={{ scaleY: 1 }}
        transition={{ duration: 1, delay: 0.5 }}
      />

      {/* Center dot */}
      <motion.div
        className={`absolute w-1.5 sm:w-2 h-1.5 sm:h-2 rounded-full ${
          isDarkMode
            ? "bg-solarized-base01 bg-opacity-60"
            : "bg-solarized-base1 bg-opacity-60"
        }`}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, delay: 1.2 }}
      />

      {/* Quadrant panels */}
      <FrontendQuadrant isDarkMode={isDarkMode} />
      <BackendQuadrant isDarkMode={isDarkMode} />
      <DatabaseQuadrant isDarkMode={isDarkMode} />
      <DevopsQuadrant isDarkMode={isDarkMode} />

      {/* Category labels (mobile-tuned) */}
      <motion.div
        className={`absolute bottom-2 xs:bottom-0 left-2 xs:left-0 text-xs xs:text-sm font-medium ${
          isDarkMode ? "text-solarized-base1" : "text-solarized-base01"
        }`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1 }}
      >
        DATABASES
      </motion.div>
      <motion.div
        className={`absolute bottom-2 xs:bottom-0 right-2 xs:right-0 text-xs xs:text-sm font-medium ${
          isDarkMode ? "text-solarized-base1" : "text-solarized-base01"
        }`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1 }}
      >
        DEVOPS
      </motion.div>
      <motion.div
        className={`absolute top-2 xs:top-0 left-2 xs:left-0 text-xs xs:text-sm font-medium ${
          isDarkMode ? "text-solarized-base1" : "text-solarized-base01"
        }`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1 }}
      >
        FRONTEND
      </motion.div>
      <motion.div
        className={`absolute top-2 xs:top-0 right-2 xs:right-0 text-xs xs:text-sm font-medium ${
          isDarkMode ? "text-solarized-base1" : "text-solarized-base01"
        }`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1 }}
      >
        BACKEND
      </motion.div>
    </div>
  );
}

export { SkillCircle as default };
