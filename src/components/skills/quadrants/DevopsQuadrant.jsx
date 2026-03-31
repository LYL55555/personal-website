"use client";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { DEVOPS_SKILLS } from "@/data/skillsData";

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

export function DevopsQuadrant({ isDarkMode }) {
  const [positions, setPositions] = useState([]);
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
          let newAngle = skill.baseAngle - 10 + Math.random() * 20;
          let newRadius = skill.baseRadius - 20 + Math.random() * 40;

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
            position = { radius: newRadius, rotation: newAngle };
            break;
          }
          attempts++;
        }

        calculatedPositions.push(position || { radius: skill.baseRadius, rotation: skill.baseAngle });
      }
      return calculatedPositions;
    };

    setPositions(calculatePositions());
  }, []);

  return (
    <>
      {DEVOPS_SKILLS.map((skill, index) => (
        <SkillItem
          key={skill.name}
          skill={skill}
          isDarkMode={isDarkMode}
          position={positions[index] || { radius: skill.baseRadius, rotation: skill.baseAngle }}
          index={index}
        />
      ))}
    </>
  );
}
