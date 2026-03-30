"use client";
import { motion } from "framer-motion";
import * as Si from "react-icons/si";
import { TbBrandFlask } from "react-icons/tb";
import { FaJava } from "react-icons/fa";
import { useState, useEffect } from "react";
import { BACKEND_SKILLS } from "@/data/skillsData";

export function BackendQuadrant({ isDarkMode }) {
  const [positions, setPositions] = useState([]);
  
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 480;
  const isTablet = typeof window !== 'undefined' && window.innerWidth >= 480 && window.innerWidth < 768;
  
  const MAX_RADIUS = isMobile ? 120 : isTablet ? 150 : 180;
  const MIN_RADIUS = isMobile ? 40 : isTablet ? 50 : 60;
  const MIN_ANGLE = -70;
  const MAX_ANGLE = -20;

  useEffect(() => {
    const calculatePositions = () => {
      const calculatedPositions = [];

      for (let i = 0; i < BACKEND_SKILLS.length; i++) {
        const skill = BACKEND_SKILLS[i];
        let attempts = 0;
        const maxAttempts = 50;
        let position;

        while (attempts < maxAttempts) {
          let newAngle = MIN_ANGLE + Math.random() * (MAX_ANGLE - MIN_ANGLE);
          let newRadius =
            MIN_RADIUS + Math.random() * (MAX_RADIUS - MIN_RADIUS);

          let tooClose = false;
          for (const pos of calculatedPositions) {
            const angleDiff = Math.abs(pos.rotation - newAngle);
            const radiusDiff = Math.abs(pos.radius - newRadius);
            if (angleDiff < 15 && radiusDiff < 40) {
              tooClose = true;
              break;
            }
          }

          if (!tooClose) {
            position = {
              radius: newRadius,
              rotation: newAngle,
            };
            break;
          }

          attempts++;
        }

        if (!position) {
          position = {
            radius: Math.min(
              Math.max(skill.baseRadius, MIN_RADIUS),
              MAX_RADIUS
            ),
            rotation: Math.min(Math.max(skill.baseAngle, MIN_ANGLE), MAX_ANGLE),
          };
        }

        calculatedPositions.push(position);
      }

      return calculatedPositions;
    };

    const initialPositions = calculatePositions();
    setPositions(initialPositions);
  }, []);

  return (
    <>
      {BACKEND_SKILLS.map((skill, index) => (
        <SkillItem
          key={skill.name}
          skill={skill}
          isDarkMode={isDarkMode}
          position={
            positions[index] || {
              radius: Math.min(
                Math.max(skill.baseRadius, MIN_RADIUS),
                MAX_RADIUS
              ),
              rotation: Math.min(
                Math.max(skill.baseAngle, MIN_ANGLE),
                MAX_ANGLE
              ),
            }
          }
          index={index}
        />
      ))}
    </>
  );
}

function SkillItem({ skill, isDarkMode, position, index }) {
  const Icon = skill.Icon;
  const x = Math.cos((position.rotation * Math.PI) / 180) * position.radius;
  const y = Math.sin((position.rotation * Math.PI) / 180) * position.radius;

  const itemSize = typeof window !== 'undefined' && window.innerWidth < 480 ? 50 : 60;
  const iconSize = typeof window !== 'undefined' && window.innerWidth < 480 ? 20 : 24;

  return (
    <motion.div
      className="absolute flex flex-col items-center justify-center"
      style={{
        width: itemSize,
        height: itemSize,
        x: x - itemSize/2,
        y: y - itemSize/2,
      }}
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{
        duration: 0.6,
        delay: index * 0.1,
        type: "spring",
        stiffness: 260,
        damping: 20,
      }}
      whileHover={{ scale: 1.1 }}
    >
      <motion.div
        className="flex items-center justify-center w-6 h-6 xs:w-7 xs:h-7 sm:w-8 sm:h-8 mb-0.5 rounded-md bg-opacity-10 dark:bg-opacity-10"
        whileHover={{
          scale: 1.2,
          rotate: [0, -10, 10, -10, 0],
          transition: { duration: 0.5 },
        }}
      >
        <Icon
          size={iconSize}
          color={isDarkMode ? skill.darkColor : skill.lightColor}
          style={{
            filter: isDarkMode ? "brightness(1)" : "brightness(0.85)",
            opacity: isDarkMode ? 0.9 : 1,
          }}
        />
      </motion.div>

      <motion.div
        className={`text-[8px] xs:text-[9px] sm:text-[10px] font-medium text-center line-clamp-1 w-full ${
          isDarkMode ? "text-solarized-base1" : "text-solarized-base01"
        }`}
        initial={{ opacity: 0, y: 5 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: index * 0.1 + 0.3 }}
      >
        {skill.name}
      </motion.div>
    </motion.div>
  );
}
