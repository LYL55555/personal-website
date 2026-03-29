"use client";
import { useTheme } from '@/context/ThemeContext';

const SectionTitle = ({ title }) => {
  const { isDarkMode } = useTheme();
  
  return (
    <h2 className={`text-center text-3xl sm:text-4xl font-bold mb-8 sm:mb-12 transition-colors duration-300
                  ${isDarkMode ? 'text-solarized-base1' : 'text-solarized-base03'}`}>
      {title}
    </h2>
  );
};

export default SectionTitle; 