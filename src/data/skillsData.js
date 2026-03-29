import { TbFlask } from "react-icons/tb";
import {
  SiSwagger,
  SiNodedotjs,
  SiPython,
  SiPostman,
  SiSwift,
  SiCplusplus,
  SiHtml5,
  SiCss3,
  SiJavascript,
  SiTypescript,
  SiReact,
  SiNextdotjs,
  SiMongodb,
  SiMysql,
  SiPrisma,
  SiPostgresql,
  SiGit,
  SiGithub,
  SiGitlab,
  SiDocker,
  SiKubernetes,
  SiSpring,
  SiDjango,
  SiQt,
  SiAngular,
  SiVuedotjs,
  SiWechat,
  SiLinux,
  SiVite,
  SiNginx,
} from "react-icons/si";
import { FaJava } from "react-icons/fa";
import { VscCode } from "react-icons/vsc";

// Distribution configuration for each quadrant
const QUADRANT_CONFIG = {
  BACKEND: {
    startAngle: -85,
    endAngle: -5,
    baseRadiusStart: 120,
    radiusIncrement: 30,
    radiusOffsetBase: 30,
    radiusOffsetIncrement: 5,
    angleOffsetBase: 10,
    angleOffsetIncrement: 2,
  },
  FRONTEND: {
    startAngle: -175,
    endAngle: -95,
    baseRadiusStart: 120,
    radiusIncrement: 30,
    radiusOffsetBase: 30,
    radiusOffsetIncrement: 5,
    angleOffsetBase: 10,
    angleOffsetIncrement: 2,
  },
  DATABASE: {
    startAngle: 95,
    endAngle: 175,
    baseRadiusStart: 120,
    radiusIncrement: 30,
    radiusOffsetBase: 30,
    radiusOffsetIncrement: 5,
    angleOffsetBase: 10,
    angleOffsetIncrement: 2,
  },
  DEVOPS: {
    startAngle: 5,
    endAngle: 85,
    baseRadiusStart: 120,
    radiusIncrement: 30,
    radiusOffsetBase: 30,
    radiusOffsetIncrement: 5,
    angleOffsetBase: 10,
    angleOffsetIncrement: 2,
  },
};

// Utility function to calculate distribution
const calculateDistribution = (items, quadrantType) => {
  const config = QUADRANT_CONFIG[quadrantType];
  const totalItems = items.length;

  return items.map((item, index) => {
    // Calculate base values
    const progress = index / (totalItems - 1); // 0 to 1
    const baseAngle =
      config.startAngle + (config.endAngle - config.startAngle) * progress;

    // Calculate radius with a cyclic pattern
    const radiusCycle = index % 3; // 0, 1, 2 pattern
    const baseRadius =
      config.baseRadiusStart + config.radiusIncrement * radiusCycle;

    // Calculate offsets based on radius tier
    const radiusTier = Math.floor(
      (baseRadius - config.baseRadiusStart) / config.radiusIncrement
    );
    const radiusOffset =
      config.radiusOffsetBase + radiusTier * config.radiusOffsetIncrement;
    const angleOffset =
      config.angleOffsetBase + radiusTier * config.angleOffsetIncrement;

    return {
      ...item,
      baseRadius,
      baseAngle,
      radiusOffset,
      angleOffset,
    };
  });
};

const BACKEND_ITEMS = [
  {
    name: "Python",
    Icon: SiPython,
    lightColor: "#3776AB",
    darkColor: "#4B8BBF",
  },
  {
    name: "Java",
    Icon: FaJava,
    lightColor: "#007396",
    darkColor: "#0088B5",
  },
  {
    name: "C++",
    Icon: SiCplusplus,
    lightColor: "#00599C",
    darkColor: "#0073C7",
  },
  {
    name: "Spring Boot",
    Icon: SiSpring,
    lightColor: "#6DB33F",
    darkColor: "#7FCC4D",
  },
  {
    name: "Node.js",
    Icon: SiNodedotjs,
    lightColor: "#339933",
    darkColor: "#47B347",
  },
  {
    name: "Flask",
    Icon: TbFlask,
    lightColor: "#000000",
    darkColor: "#FFFFFF",
  },
  {
    name: "Django",
    Icon: SiDjango,
    lightColor: "#092E20",
    darkColor: "#44B78B",
  },
  {
    name: "REST API",
    Icon: SiSwagger,
    lightColor: "#85EA2D",
    darkColor: "#98F046",
  },
  {
    name: "Nginx",
    Icon: SiNginx,
    lightColor: "#009639",
    darkColor: "#00B347",
  },
];

const FRONTEND_ITEMS = [
  {
    name: "HTML",
    Icon: SiHtml5,
    lightColor: "#E34F26",
    darkColor: "#FF6B52",
  },
  {
    name: "CSS",
    Icon: SiCss3,
    lightColor: "#1572B6",
    darkColor: "#2A8FE5",
  },
  {
    name: "JavaScript",
    Icon: SiJavascript,
    lightColor: "#F7DF1E",
    darkColor: "#FFE94A",
  },
  {
    name: "TypeScript",
    Icon: SiTypescript,
    lightColor: "#3178C6",
    darkColor: "#4595E5",
  },
  {
    name: "React",
    Icon: SiReact,
    lightColor: "#61DAFB",
    darkColor: "#7DE3FF",
  },
  {
    name: "Next.js",
    Icon: SiNextdotjs,
    lightColor: "#000000",
    darkColor: "#FFFFFF",
  },
  {
    name: "Angular",
    Icon: SiAngular,
    lightColor: "#DD0031",
    darkColor: "#FF1744",
  },
  {
    name: "Vue",
    Icon: SiVuedotjs,
    lightColor: "#4FC08D",
    darkColor: "#5FD09D",
  },
  {
    name: "WeChat",
    Icon: SiWechat,
    lightColor: "#07C160",
    darkColor: "#1AD16F",
  },
  {
    name: "Vite",
    Icon: SiVite,
    lightColor: "#646CFF",
    darkColor: "#747BFF",
  },
];

const DATABASE_ITEMS = [
  {
    name: "MongoDB",
    Icon: SiMongodb,
    lightColor: "#47A248",
    darkColor: "#59B45A",
  },
  {
    name: "MySQL",
    Icon: SiMysql,
    lightColor: "#4479A1",
    darkColor: "#5C91B9",
  },
  {
    name: "Prisma",
    Icon: SiPrisma,
    lightColor: "#2D3748",
    darkColor: "#3D4B5F",
  },
  {
    name: "PostgreSQL",
    Icon: SiPostgresql,
    lightColor: "#336791",
    darkColor: "#4479A3",
  },
];

const DEVOPS_ITEMS = [
  {
    name: "Git",
    Icon: SiGit,
    lightColor: "#F05032",
    darkColor: "#F05032",
  },
  {
    name: "Docker",
    Icon: SiDocker,
    lightColor: "#2496ED",
    darkColor: "#2496ED",
  },
  {
    name: "VS Code",
    Icon: VscCode,
    lightColor: "#007ACC",
    darkColor: "#007ACC",
  },
  {
    name: "Linux",
    Icon: SiLinux,
    lightColor: "#FCC624",
    darkColor: "#FCC624",
  },
];

// Export the distributed skills
export const BACKEND_SKILLS = calculateDistribution(BACKEND_ITEMS, "BACKEND");
export const FRONTEND_SKILLS = calculateDistribution(
  FRONTEND_ITEMS,
  "FRONTEND"
);
export const DATABASE_SKILLS = calculateDistribution(
  DATABASE_ITEMS,
  "DATABASE"
);
export const DEVOPS_SKILLS = calculateDistribution(DEVOPS_ITEMS, "DEVOPS");
