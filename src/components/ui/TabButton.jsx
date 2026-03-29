"use client";

import React from "react";
import { motion } from "framer-motion";

/** 与 html.dark 一致，避免 ThemeContext mounted 前 isDarkMode 恒 false 导致选中态白字配浅色底 */
const TabButton = ({ children, selectTab, active }) => {
  return (
    <motion.button
      onClick={selectTab}
      className={`relative px-4 py-2 rounded-lg text-sm sm:text-base font-medium transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-solarized-blueUi/50 dark:focus:ring-solarized-accentGh/50 ${
        active
          ? "transform-none border-2 border-solarized-blue bg-solarized-base2 text-solarized-base03 shadow-md dark:border-transparent dark:bg-gradient-to-r dark:from-solarized-accentGh dark:to-[#3178c6] dark:text-white dark:shadow-lg"
          : "text-solarized-base01 hover:bg-solarized-base1/10 hover:text-solarized-blueUi hover:-translate-y-0.5 dark:text-solarized-base1 dark:hover:bg-solarized-base01/20 dark:hover:text-white"
      }`}
      whileHover={{ scale: active ? 1 : 1.02 }}
      whileTap={{ scale: 0.98 }}
      initial={false}
      animate={{
        y: active ? -2 : 0,
        transition: { duration: 0.2 },
      }}
    >
      <span className="relative z-10">{children}</span>
    </motion.button>
  );
};

export default TabButton;
