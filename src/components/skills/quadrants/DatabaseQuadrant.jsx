"use client";
import { motion } from "framer-motion";
import { useEffect, useState, useCallback } from "react";
import { DATABASE_SKILLS } from "@/data/skillsData";

const calculateDistance = (x1, y1, x2, y2) => {
  return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
};

const generatePosition = (skill) => {
  const radius =
    Math.random() * (skill.maxRadius - skill.minRadius) + skill.minRadius;
  const rotation =
    Math.random() * (skill.maxAngle - skill.minAngle) + skill.minAngle;
  return { radius, rotation };
};

const isValidPosition = (position, positions, index, minDistance) => {
  const x1 = Math.cos((position.rotation * Math.PI) / 180) * position.radius;
  const y1 = Math.sin((position.rotation * Math.PI) / 180) * position.radius;

  for (let i = 0; i < index; i++) {
    const x2 =
      Math.cos((positions[i].rotation * Math.PI) / 180) * positions[i].radius;
    const y2 =
      Math.sin((positions[i].rotation * Math.PI) / 180) * positions[i].radius;

    if (calculateDistance(x1, y1, x2, y2) < minDistance) {
      return false;
    }
  }
  return true;
};

const SkillItem = ({ skill, isDarkMode, position, index }) => {
  const Icon = skill.Icon;
  const x = Math.cos((position.rotation * Math.PI) / 180) * position.radius;
  const y = Math.sin((position.rotation * Math.PI) / 180) * position.radius;

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

const MIN_DISTANCE = 65;

export function DatabaseQuadrant({ isDarkMode }) {
  const [positions, setPositions] = useState([]);
  const MIN_ANGLE = 110; 
  const MAX_ANGLE = 160;

  const generateOptimalPositions = useCallback(() => {
    const newPositions = [];
    const maxAttempts = 200;

    for (let i = 0; i < DATABASE_SKILLS.length; i++) {
      const skill = DATABASE_SKILLS[i];
      let position;
      let isValid = false;
      let attempts = 0;

      const skillRange = {
        minRadius: skill.baseRadius - 20,
        maxRadius: skill.baseRadius + 20,
        minAngle: Math.max(MIN_ANGLE, skill.baseAngle - 10),
        maxAngle: Math.min(MAX_ANGLE, skill.baseAngle + 10)
      };

      while (!isValid && attempts < maxAttempts) {
        position = {
          radius: Math.random() * (skillRange.maxRadius - skillRange.minRadius) + skillRange.minRadius,
          rotation: Math.random() * (skillRange.maxAngle - skillRange.minAngle) + skillRange.minAngle
        };
        isValid = isValidPosition(position, newPositions, i, MIN_DISTANCE);
        attempts++;
      }

      newPositions.push(position || { radius: skill.baseRadius, rotation: skill.baseAngle });
    }

    return newPositions;
  }, []);

  useEffect(() => {
    setPositions(generateOptimalPositions());
  }, [generateOptimalPositions]);

  return (
    <>
      {DATABASE_SKILLS.map((skill, index) => (
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
