"use client";
import React, { memo } from "react";
import { CodeBracketIcon, PlayCircleIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { useTheme } from "@/context/ThemeContext";

const iconLinkClass = (isDarkMode) =>
  `h-10 w-10 sm:h-12 sm:w-12 border-2 relative rounded-full flex items-center justify-center
   ${
     isDarkMode
       ? "border-solarized-base1 hover:border-solarized-base3"
       : "border-solarized-base1 hover:border-solarized-base03"
   }
   group/link`;

const ProjectCard = memo(({ title, description, gitUrl, playUrl }) => {
  const { isDarkMode } = useTheme();

  return (
    <div
      className={`h-[280px] rounded-xl overflow-hidden transition-all duration-300 hover:scale-105 flex flex-col
                    ${
                      isDarkMode
                        ? "bg-solarized-base02 border border-solarized-base01"
                        : "bg-solarized-base2 border border-solarized-base1"
                    }`}
    >
      <div className="p-4 flex-1 flex flex-col min-h-0">
        <div className="flex justify-between items-start mb-2">
          <h3
            className={`text-xl font-bold ${isDarkMode ? "text-solarized-base1" : "text-solarized-base03"}`}
          >
            {title}
          </h3>
          <div className="flex items-center gap-2">
            {playUrl && (
              <Link
                href={playUrl}
                className={iconLinkClass(isDarkMode)}
                aria-label={`Play ${title}`}
              >
                <PlayCircleIcon
                  className={`h-6 w-6 sm:h-7 sm:w-7 cursor-pointer
                  ${
                    isDarkMode
                      ? "text-solarized-base1 group-hover/link:text-solarized-base3"
                      : "text-solarized-base01 group-hover/link:text-solarized-base03"
                  }`}
                />
              </Link>
            )}
            {gitUrl && (
              <Link
                href={gitUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={iconLinkClass(isDarkMode)}
                aria-label={`View ${title} source on GitHub`}
              >
                <CodeBracketIcon
                  className={`h-6 w-6 sm:h-7 sm:w-7 cursor-pointer
                  ${
                    isDarkMode
                      ? "text-solarized-base1 group-hover/link:text-solarized-base3"
                      : "text-solarized-base01 group-hover/link:text-solarized-base03"
                  }`}
                />
              </Link>
            )}
          </div>
        </div>
        
        <div
          className={`flex-1 overflow-y-auto ${isDarkMode ? "scrollbar-dark" : "scrollbar-light"}`}
        >
          <p
            className={`text-sm whitespace-pre-line leading-relaxed ${
              isDarkMode ? "text-solarized-base0" : "text-solarized-base01"
            }`}
          >
            {description}
          </p>
        </div>
      </div>
    </div>
  );
});

ProjectCard.displayName = "ProjectCard";

export default ProjectCard;
