"use client";
import { motion } from "framer-motion";
import * as Si from "react-icons/si";
import { useEffect, useState, useMemo, useCallback } from "react";

// 计算两点之间的距离
const calculateDistance = (x1, y1, x2, y2) => {
  return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
};

// 生成新的随机位置
const generatePosition = (skill) => {
  const radius =
    Math.random() * (skill.maxRadius - skill.minRadius) + skill.minRadius;
  const rotation =
    Math.random() * (skill.maxAngle - skill.minAngle) + skill.minAngle;
  return { radius, rotation };
};

// 检查位置是否有效
const isValidPosition = (position, positions, skills, index, minDistance) => {
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

const DATABASE_SKILLS = [
  {
    name: "MongoDB",
    Icon: Si.SiMongodb,
    minRadius: 80,
    maxRadius: 120,
    minAngle: 100,
    maxAngle: 120,
    lightColor: "#47A248",
    darkColor: "#59B45A",
  },
  {
    name: "MySQL",
    Icon: Si.SiMysql,
    minRadius: 100,
    maxRadius: 140,
    minAngle: 140,
    maxAngle: 160,
    lightColor: "#4479A1",
    darkColor: "#5C91B9",
  },
  {
    name: "Prisma",
    Icon: Si.SiPrisma,
    minRadius: 80,
    maxRadius: 120,
    minAngle: 120,
    maxAngle: 140,
    lightColor: "#2D3748",
    darkColor: "#3D4B5F",
  },
  {
    name: "PostgreSQL",
    Icon: Si.SiPostgresql,
    minRadius: 160,
    maxRadius: 200,
    minAngle: 160,
    maxAngle: 175,
    lightColor: "#336791",
    darkColor: "#4479A3",
  },
];

const MIN_DISTANCE = 65;

export function DatabaseQuadrant({ isDarkMode }) {
  const [positions, setPositions] = useState([]);
  const MAX_RADIUS = 180; // 减小最大半径
  const MIN_RADIUS = 60; // 减小最小半径
  const MIN_ANGLE = 110; // 调整角度范围
  const MAX_ANGLE = 160; // 左下象限

  const generateOptimalPositions = useCallback(() => {
    const newPositions = [];
    let attempts = 0;
    const maxAttempts = 200;

    for (let i = 0; i < DATABASE_SKILLS.length; i++) {
      let position;
      let isValid = false;
      attempts = 0;

      while (!isValid && attempts < maxAttempts) {
        position = generatePosition(DATABASE_SKILLS[i]);
        isValid = isValidPosition(
          position,
          newPositions,
          DATABASE_SKILLS,
          i,
          MIN_DISTANCE
        );
        attempts++;
      }

      newPositions.push(
        position || {
          radius: DATABASE_SKILLS[i].minRadius,
          rotation: DATABASE_SKILLS[i].minAngle,
        }
      );
    }

    return newPositions;
  }, []);

  useEffect(() => {
    const initialPositions = generateOptimalPositions();
    setPositions(initialPositions);
  }, [generateOptimalPositions]);

  return (
    <>
      {DATABASE_SKILLS.map((skill, index) => (
        <SkillItem
          key={skill.name}
          skill={skill}
          isDarkMode={isDarkMode}
          position={
            positions[index] || {
              radius: skill.minRadius,
              rotation: skill.minAngle,
            }
          }
          index={index}
        />
      ))}
    </>
  );
}
