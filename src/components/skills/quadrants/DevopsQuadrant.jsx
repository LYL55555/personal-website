"use client";
import { motion } from "framer-motion";
import {
  SiDocker,
  SiGit,
  SiGithub,
  SiGitlab,
  SiIterm2,
  SiJest,
  SiKubernetes,
  SiPostman,
  SiPuppeteer,
  SiTailwindcss,
  SiVercel,
  SiWebpack,
} from "react-icons/si";
import { BiLogoVisualStudio } from "react-icons/bi";
import { FaAws } from "react-icons/fa";
import { useEffect, useState } from "react";

// Euclidean distance between two points
function calculateDistance(x1, y1, x2, y2) {
  return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
}

// Sample a new random position
function generatePosition(minRadius, maxRadius, minAngle, maxAngle) {
  const radius = Math.random() * (maxRadius - minRadius) + minRadius;
  const rotation = Math.random() * (maxAngle - minAngle) + minAngle;
  return { radius, rotation };
}

const SkillItem = ({ skill, isDarkMode, position, index }) => {
  const Icon = skill.Icon;
  const x = Math.cos((position.rotation * Math.PI) / 180) * position.radius;
  const y = Math.sin((position.rotation * Math.PI) / 180) * position.radius;

  if (!Icon) return null;

  return (
    <motion.div
      className="absolute flex flex-col items-center justify-center"
      style={{
        width: 60,
        height: 60,
        x: x - 30,
        y: y - 30,
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
        className="flex items-center justify-center w-8 h-8 mb-0.5 rounded-md bg-opacity-10 dark:bg-opacity-10"
        whileHover={{
          scale: 1.2,
          rotate: [0, -10, 10, -10, 0],
          transition: { duration: 0.5 },
        }}
      >
        <Icon
          size={24}
          color={isDarkMode ? skill.darkColor : skill.lightColor}
          style={{
            filter: isDarkMode ? "brightness(1)" : "brightness(0.85)",
            opacity: isDarkMode ? 0.9 : 1,
          }}
        />
      </motion.div>

      <motion.div
        className={`text-[10px] font-medium text-center ${
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

const DEVOPS_SKILLS = [
  {
    name: "Git",
    Icon: SiGit,
    baseRadius: 120,
    baseAngle: 5,
    radiusOffset: 20,
    angleOffset: 20,
    lightColor: "#F05032",
    darkColor: "#F05032",
  },
  {
    name: "GitHub",
    Icon: SiGithub,
    baseRadius: 200,
    baseAngle: 30,
    radiusOffset: 20,
    angleOffset: 20,
    lightColor: "#181717",
    darkColor: "#FFFFFF",
  },
  {
    name: "GitLab",
    Icon: SiGitlab,
    baseRadius: 160,
    baseAngle: 15,
    radiusOffset: 20,
    angleOffset: 10,
    lightColor: "#FC6D26",
    darkColor: "#FC6D26",
  },
  {
    name: "VS Code",
    Icon: BiLogoVisualStudio,
    baseRadius: 280,
    baseAngle: 40,
    radiusOffset: 20,
    angleOffset: 20,
    lightColor: "#007ACC",
    darkColor: "#0098FF",
  },
  {
    name: "Jest",
    Icon: SiJest,
    baseRadius: 200,
    baseAngle: 50,
    radiusOffset: 20,
    angleOffset: 20,
    lightColor: "#C21325",
    darkColor: "#E91E32",
  },
  {
    name: "Puppeteer",
    Icon: SiPuppeteer,
    baseRadius: 120,
    baseAngle: 35,
    radiusOffset: 20,
    angleOffset: 20,
    lightColor: "#40B5A4",
    darkColor: "#50D6C2",
  },
  {
    name: "iTerm",
    Icon: SiIterm2,
    baseRadius: 80,
    baseAngle: 10,
    radiusOffset: 20,
    angleOffset: 20,
    lightColor: "#666666",
    darkColor: "#A9ABAC",
  },
  {
    name: "Vercel",
    Icon: SiVercel,
    baseRadius: 140,
    baseAngle: 45,
    radiusOffset: 20,
    angleOffset: 20,
    lightColor: "#171717",
    darkColor: "#CCCCCC",
  },
  {
    name: "Kubernetes",
    Icon: SiKubernetes,
    baseRadius: 240,
    baseAngle: 60,
    radiusOffset: 20,
    angleOffset: 20,
    lightColor: "#326CE5",
    darkColor: "#4D7EE8",
  },
  {
    name: "Docker",
    Icon: SiDocker,
    baseRadius: 200,
    baseAngle: 35,
    radiusOffset: 20,
    angleOffset: 10,
    lightColor: "#2496ED",
    darkColor: "#40A6EF",
  },
  {
    name: "Postman",
    Icon: SiPostman,
    baseRadius: 160,
    baseAngle: 25,
    radiusOffset: 20,
    angleOffset: 15,
    lightColor: "#FF6C37",
    darkColor: "#FF8F66",
  },
  {
    name: "AWS",
    Icon: FaAws,
    baseRadius: 240,
    baseAngle: 20,
    radiusOffset: 20,
    angleOffset: 15,
    lightColor: "#FF9900",
    darkColor: "#FFA826",
  },
];

const MIN_DISTANCE = 65;

export function DevopsQuadrant({ isDarkMode }) {
  const [positions, setPositions] = useState([]);
  const MAX_RADIUS = 240;
  const MIN_RADIUS = 80;
  const MIN_ANGLE = 15;
  const MAX_ANGLE = 85;

  useEffect(() => {
    const calculatePositions = () => {
      const calculatedPositions = [];

      for (let i = 0; i < DEVOPS_SKILLS.length; i++) {
        const skill = DEVOPS_SKILLS[i];
        let attempts = 0;
        const maxAttempts = 50;
        let position;

        while (attempts < maxAttempts) {
          // Random angle inside bottom-right quadrant
          let newAngle = MIN_ANGLE + Math.random() * (MAX_ANGLE - MIN_ANGLE);
          // Random radius between min and max
          let newRadius =
            MIN_RADIUS + Math.random() * (MAX_RADIUS - MIN_RADIUS);

          // Reject if too close to existing bubbles
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

        // Fallback grid slot if no free spot
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
      {DEVOPS_SKILLS.map((skill, index) => (
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
