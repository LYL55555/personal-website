"use client";
import React from "react";
import { useTheme } from '@/context/ThemeContext';

const ProjectTag = ({ name, onClick, isSelected }) => {
  const { isDarkMode } = useTheme();
  
  const buttonStyles = isSelected
    ? isDarkMode
      ? "text-solarized-base3 border-solarized-blue"
      : "text-solarized-base03 border-solarized-blue"
    : isDarkMode
      ? "text-solarized-base0 border-solarized-base01 hover:border-solarized-base1"
      : "text-solarized-base01 border-solarized-base1 hover:border-solarized-base03";

  return (
    <button
      className={`${buttonStyles} rounded-full border-2 px-4 sm:px-6 py-2 sm:py-3 text-sm sm:text-base cursor-pointer transition-colors`}
      onClick={() => onClick(name)}
    >
      {name}
    </button>
  );
};

export default ProjectTag;
