"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import ProjectCard from "@/components/projects/ProjectCard";
import GAME_DATA from "@/data/gameData";
import { useTheme } from "@/context/ThemeContext";

export default function GamesSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const { isDarkMode } = useTheme();

  const cardVariants = {
    initial: { y: 50, opacity: 0 },
    animate: { y: 0, opacity: 1 },
  };

  return (
    <section
      id="games"
      className="flex flex-col items-center"
      aria-label="Games"
    >
      <p
        className={`text-center text-sm max-w-2xl mb-6 leading-relaxed transition-colors duration-300
          ${isDarkMode ? "text-solarized-base1" : "text-solarized-base01"}`}
      ></p>
      <ul
        ref={ref}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6 w-full max-w-[1200px]"
      >
        {GAME_DATA.map((game, index) => (
          <motion.li
            key={game.id}
            variants={cardVariants}
            initial="initial"
            animate={isInView ? "animate" : "initial"}
            transition={{ duration: 0.3, delay: index * 0.15 }}
          >
            <ProjectCard
              imgUrl={game.image}
              title={game.title}
              description={game.description}
              playUrl={game.playUrl}
              gitUrl={game.gitUrl}
            />
          </motion.li>
        ))}
      </ul>
    </section>
  );
}
