"use client";
import * as Si from "react-icons/si";
import { FaPython, FaDatabase, FaTerminal, FaCode } from "react-icons/fa";
import { TbSql } from "react-icons/tb";

/** Skills data for Tony Lyu. */
export const FRONTEND_SKILLS = [
  { name: "React", Icon: Si.SiReact, lightColor: "#61DAFB", darkColor: "#61DAFB", baseRadius: 100, baseAngle: -140 },
  { name: "Next.js", Icon: Si.SiNextdotjs, lightColor: "#000000", darkColor: "#FFFFFF", baseRadius: 150, baseAngle: -120 },
  { name: "JS", Icon: Si.SiJavascript, lightColor: "#F7DF1E", darkColor: "#F7DF1E", baseRadius: 120, baseAngle: -160 },
  { name: "HTML", Icon: Si.SiHtml5, lightColor: "#E34F26", darkColor: "#E34F26", baseRadius: 80, baseAngle: -170 },
  { name: "Tailwind", Icon: Si.SiTailwindcss, lightColor: "#06B6D4", darkColor: "#06B6D4", baseRadius: 180, baseAngle: -130 },
];

export const BACKEND_SKILLS = [
  { name: "Python", Icon: FaPython, lightColor: "#3776AB", darkColor: "#3776AB", baseRadius: 100, baseAngle: -40 },
  { name: "SQL", Icon: TbSql, lightColor: "#4479A1", darkColor: "#4479A1", baseRadius: 140, baseAngle: -60 },
  { name: "C++", Icon: Si.SiCplusplus, lightColor: "#00599C", darkColor: "#00599C", baseRadius: 120, baseAngle: -20 },
  { name: "Java", Icon: Si.SiOpenjdk, lightColor: "#007396", darkColor: "#007396", baseRadius: 160, baseAngle: -50 },
  { name: "PyTorch", Icon: Si.SiPytorch, lightColor: "#EE4C2C", darkColor: "#EE4C2C", baseRadius: 180, baseAngle: -30 },
];

export const DATABASE_SKILLS = [
  { name: "MongoDB", Icon: Si.SiMongodb, lightColor: "#47A248", darkColor: "#47A248", baseRadius: 100, baseAngle: 120 },
  { name: "MySQL", Icon: Si.SiMysql, lightColor: "#4479A1", darkColor: "#4479A1", baseRadius: 140, baseAngle: 140 },
  { name: "Neo4j", Icon: Si.SiNeo4j, lightColor: "#008CC1", darkColor: "#008CC1", baseRadius: 120, baseAngle: 160 },
  { name: "Elasticsearch", Icon: Si.SiElasticsearch, lightColor: "#005571", darkColor: "#005571", baseRadius: 160, baseAngle: 130 },
  { name: "FAISS", Icon: FaDatabase, lightColor: "#586e75", darkColor: "#93a1a1", baseRadius: 180, baseAngle: 110 },
];

export const DEVOPS_SKILLS = [
  { name: "Docker", Icon: Si.SiDocker, lightColor: "#2496ED", darkColor: "#2496ED", baseRadius: 100, baseAngle: 40 },
  { name: "Git", Icon: Si.SiGit, lightColor: "#F05032", darkColor: "#F05032", baseRadius: 140, baseAngle: 20 },
  { name: "GitHub", Icon: Si.SiGithub, lightColor: "#181717", darkColor: "#FFFFFF", baseRadius: 120, baseAngle: 60 },
  { name: "Hadoop", Icon: Si.SiApachehadoop, lightColor: "#FFFF00", darkColor: "#FFFF00", baseRadius: 160, baseAngle: 30 },
  { name: "AWS", Icon: Si.SiAmazonaws, lightColor: "#FF9900", darkColor: "#FF9900", baseRadius: 180, baseAngle: 50 },
];

const SKILLS_DATA = [
  {
    category: "Languages & Core",
    skills: ["Python", "SQL", "R Programming", "C++", "JS", "HTML", "Java"],
  },
  {
    category: "AI & Machine Learning",
    skills: ["LangChain", "TensorFlow", "PyTorch", "Transformers", "LLM Agents", "NLTK"],
  },
  {
    category: "Data & Infrastructure",
    skills: ["Hadoop", "FAISS", "Neo4j", "Elasticsearch", "SQL Server", "MongoDB"],
  },
  {
    category: "Tools & Analysis",
    skills: ["BeautifulSoup", "Seaborn", "dplyr", "tidyr", "prophet", "Time Series Analysis"],
  },
];

export default SKILLS_DATA;
