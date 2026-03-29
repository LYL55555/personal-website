"use client";
import { useTheme } from '@/context/ThemeContext';

const PageTitle = ({ title, compact }) => {
  const { isDarkMode } = useTheme();

  const spacing = compact
    ? "mt-4 sm:mt-5 mb-3 sm:mb-4 text-2xl sm:text-3xl"
    : "mt-8 sm:mt-12 mb-8 sm:mb-12 text-3xl sm:text-4xl";

  return (
    <div className="container mx-auto px-4">
      <h2
        className={`text-center font-bold transition-colors duration-300 ${spacing} ${
          isDarkMode ? "text-solarized-base1" : "text-solarized-base03"
        }`}
      >
        {title}
      </h2>
    </div>
  );
};

export default PageTitle; 