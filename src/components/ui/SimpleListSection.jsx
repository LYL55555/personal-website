"use client";
import React from "react";
import { useTheme } from "@/context/ThemeContext";

const SimpleListSection = ({ id, title, items }) => {
  const { isDarkMode } = useTheme();

  return (
    <section id={id} className="py-12 sm:py-16 scroll-mt-20">
      <div className="max-w-5xl mx-auto px-4">
        <h3 className={`text-2xl sm:text-3xl font-bold mb-8 ${isDarkMode ? "text-solarized-base1" : "text-solarized-base03"}`}>
          {title}
        </h3>
        <ul className="space-y-6">
          {items.map((item, index) => (
            <li key={index} className="border-l-4 border-solarized-blue pl-6 py-1">
              <h4 className={`text-xl font-semibold ${isDarkMode ? "text-solarized-base1" : "text-solarized-base01"}`}>
                {item.title}
              </h4>
              {item.subtitle && (
                <p className={`text-sm mb-2 ${isDarkMode ? "text-solarized-base0" : "text-solarized-base01"} italic`}>
                  {item.subtitle}
                </p>
              )}
              <p
                className={`text-base leading-relaxed whitespace-pre-line ${
                  isDarkMode ? "text-solarized-base0" : "text-solarized-base01"
                }`}
              >
                {item.description}
              </p>
              {item.link && (
                <a 
                  href={item.link} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="inline-flex items-center gap-1.5 mt-3 text-solarized-blue hover:underline font-medium text-sm"
                >
                  Learn more →
                </a>
              )}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default SimpleListSection;
