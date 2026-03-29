"use client";

import Link from "next/link";
import PageTitle from "@/components/ui/PageTitle";
import PageContainer from "@/components/layout/PageContainer";
import SnakeGame from "@/components/game/SnakeGame";
import { useTheme } from "@/context/ThemeContext";

export default function SnakeGamePage() {
  const { isDarkMode } = useTheme();

  return (
    <PageContainer>
      <div className="container mx-auto px-4 max-w-4xl">
        <Link
          href="/game"
          className={`group inline-flex items-center gap-1.5 text-sm font-medium mb-2 rounded-full pl-1 pr-3 py-1.5 -ml-1 transition-colors duration-300
            focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#268bd2] focus-visible:ring-offset-2
            dark:focus-visible:ring-[#2aa198] dark:focus-visible:ring-offset-[#002b36]
            ${
              isDarkMode
                ? "text-[#93a1a1] hover:text-[#fdf6e3] hover:bg-[#073642]/80"
                : "text-[#586e75] hover:text-[#002b36] hover:bg-[#eee8d5]"
            }`}
        >
          <span
            className={`flex h-7 w-7 items-center justify-center rounded-full text-base transition-transform duration-200 group-hover:-translate-x-0.5 ${
              isDarkMode ? "bg-[#073642]" : "bg-[#eee8d5]"
            }`}
            aria-hidden
          >
            ←
          </span>
          All games
        </Link>
      </div>
      <PageTitle title="Snake" compact />
      <div className="container mx-auto px-4 max-w-4xl pb-10">
        <SnakeGame />
      </div>
    </PageContainer>
  );
}
