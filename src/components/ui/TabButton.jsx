"use client";

import React from "react";
import { motion } from "framer-motion";

/**
 * Tab chrome: do not transition color/background (avoids stacked transitions with
 * .theme-transition on .theme-color-scope * and “flicker” when toggling themes).
 * Dark active: solid bg so we never show light-mode cream (base2) with inherited light text.
 */
const TabButton = ({ children, selectTab, active }) => {
  return (
    <motion.button
      onClick={selectTab}
      type="button"
      className={`relative px-4 py-2 rounded-lg text-sm sm:text-base font-medium ease-in-out focus:outline-none focus:ring-2 focus:ring-solarized-blueUi/50 dark:focus:ring-solarized-accentGh/50 motion-reduce:transition-none transition-[transform,box-shadow,border-color] duration-200 ${
        active
          ? "border-2 border-solarized-blue bg-solarized-base2 text-solarized-base1 shadow-md dark:border-solarized-blue dark:bg-solarized-base02 dark:text-solarized-base1 dark:shadow-lg"
          : "border-2 border-transparent text-solarized-base01 hover:bg-solarized-base1/15 hover:text-solarized-blueUi hover:-translate-y-0.5 dark:text-solarized-base1 dark:hover:bg-solarized-base01/25 dark:hover:text-solarized-base3"
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
