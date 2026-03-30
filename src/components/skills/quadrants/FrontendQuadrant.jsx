"use client";
import { motion } from "framer-motion";
import * as SiIcons from "react-icons/si";
import { useEffect, useState } from "react";

function calculateDistance(x1, y1, x2, y2) {
  return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
}

function generatePosition(minRadius, maxRadius, minAngle, maxAngle) {
  const radius = Math.random() * (maxRadius - minRadius) + minRadius;
  const rotation = Math.random() * (maxAngle - minAngle) + minAngle;
  return { radius, rotation };
}

const SkillItem = ({ skill, isDarkMode, position, index }) => {
  const Icon = SiIcons[skill.iconName];
  const x = Math.cos((position.rotation * Math.PI) / 180) * position.radius;
  const y = Math.sin((position.rotation * Math.PI) / 180) * position.radius;

  if (!Icon) return null;

  const iconColor =
    skill.lightColor && skill.darkColor
      ? isDarkMode
        ? skill.darkColor
        : skill.lightColor
      : skill.color;

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
          color={iconColor}
          style={{
            filter: isDarkMode ? "brightness(0.9)" : "brightness(0.8)",
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
};

const FRONTEND_SKILLS = [
  {
    name: "HTML",
    iconName: "SiHtml5",
    minRadius: 60,
    maxRadius: 180,
    minAngle: -175,
    maxAngle: -155,
    color: "#E34F26",
  },
  {
    name: "CSS",
    iconName: "SiCss3",
    minRadius: 80,
    maxRadius: 200,
    minAngle: -150,
    maxAngle: -90,
    color: "#1572B6",
  },
  {
    name: "JavaScript",
    iconName: "SiJavascript",
    minRadius: 120,
    maxRadius: 240,
    minAngle: -170,
    maxAngle: -110,
    color: "#F7DF1E",
  },
  {
    name: "TypeScript",
    iconName: "SiTypescript",
    minRadius: 180,
    maxRadius: 300,
    minAngle: -145,
    maxAngle: -125,
    color: "#3178C6",
  },
  {
    name: "React",
    iconName: "SiReact",
    minRadius: 140,
    maxRadius: 260,
    minAngle: -130,
    maxAngle: -110,
    color: "#61DAFB",
  },
  {
    name: "Next.js",
    iconName: "SiNextdotjs",
    minRadius: 200,
    maxRadius: 320,
    minAngle: -140,
    maxAngle: -100,
    lightColor: "#000000",
    darkColor: "#FFFFFF",
  },
];

const MIN_DISTANCE = 65;

export function FrontendQuadrant({ isDarkMode }) {
  const [positions, setPositions] = useState([]);
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 480;
  const isTablet = typeof window !== 'undefined' && window.innerWidth >= 480 && window.innerWidth < 768;
  
  const MAX_RADIUS = isMobile ? 120 : isTablet ? 150 : 180;
  const MIN_RADIUS = isMobile ? 40 : isTablet ? 50 : 60;
  const MIN_ANGLE = -160;
  const MAX_ANGLE = -110;

  useEffect(() => {
    const calculatePositions = () => {
      const calculatedPositions = [];

      for (let i = 0; i < FRONTEND_SKILLS.length; i++) {
        const skill = FRONTEND_SKILLS[i];
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
      {FRONTEND_SKILLS.map((skill, index) => (
        <SkillItem
          key={skill.name}
          skill={skill}
          isDarkMode={isDarkMode}
          position={positions[index] || { radius: 0, rotation: 0 }}
          index={index}
        />
      ))}
    </>
  );
}
