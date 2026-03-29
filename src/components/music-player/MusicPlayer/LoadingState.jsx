import React from "react";
import { motion } from "framer-motion";

const LoadingState = ({ isDarkMode }) => {
  return (
    <div
      className={`flex flex-col items-center justify-center h-16 space-y-2 ${
        isDarkMode ? "text-solarized-base0" : "text-solarized-base00"
      }`}
    >
      <motion.div
        className="flex space-x-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <motion.div
          className={`w-2 h-2 rounded-full ${
            isDarkMode ? "bg-solarized-base0" : "bg-solarized-base00"
          }`}
          animate={{ y: [0, -8, 0] }}
          transition={{ duration: 0.8, repeat: Infinity, delay: 0 }}
        />
        <motion.div
          className={`w-2 h-2 rounded-full ${
            isDarkMode ? "bg-solarized-base0" : "bg-solarized-base00"
          }`}
          animate={{ y: [0, -8, 0] }}
          transition={{ duration: 0.8, repeat: Infinity, delay: 0.2 }}
        />
        <motion.div
          className={`w-2 h-2 rounded-full ${
            isDarkMode ? "bg-solarized-base0" : "bg-solarized-base00"
          }`}
          animate={{ y: [0, -8, 0] }}
          transition={{ duration: 0.8, repeat: Infinity, delay: 0.4 }}
        />
      </motion.div>
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="text-sm"
      >
        Loading your playlist...
      </motion.span>
    </div>
  );
};

export default LoadingState;
