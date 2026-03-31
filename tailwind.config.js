/** @type {import('tailwindcss').Config} */
const colors = require("tailwindcss/colors");

/** Solarized + site tokens (aligns with layout / components using text-solarized-*) */
const solarized = {
  /* 全局新配色：深蓝黑 + 石墨卡片 + 深蓝灰边框 */
  base03: "#0B0F14", // 背景主色（dark）
  base02: "#111827", // 卡片背景（dark）
  base01: "#1F2937", // 边框/弱对比
  base00: "#9CA3AF", // 次文字
  base0: "#9CA3AF", // 为兼容旧 token，次文字同值
  base1: "#E5E7EB", // 主文字
  base2: "#111827", // 兼容旧 light 模式 token
  base3: "#0B0F14", // 兼容旧 light 模式 token
  base03Deep: "#0A0E13",
  yellow: "#F59E0B",
  orange: "#F97316",
  red: "#EF4444",
  magenta: "#EC4899",
  violet: "#8B5CF6",
  blue: "#3B82F6", // 强调色（主蓝）
  cyan: "#3B82F6", // 兼容旧 cyan token
  green: "#22C55E",
  accentGh: "#3B82F6",
  blueUi: "#3B82F6",
  ghBorder: "#1F2937",
  ghWash: "#111827",
  ghInk: "#0B0F14",
  ghMuted: "#9CA3AF",
  ghDim: "#9CA3AF",
  borderLight: "#1F2937",
  cardWash: "#111827",
  mist: "#9CA3AF",
};

module.exports = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      screens: {
        xs: "480px",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        solarized,
        primary: colors.blue,
        secondary: colors.amber,
        sky: colors.sky,
        stone: colors.stone,
        neutral: colors.neutral,
        gray: colors.gray,
        slate: colors.slate,
        background: {
          light: "#f9fafb",
          dark: "#121212",
        },
        surface: {
          light: "#ffffff",
          dark: "#1e1e1e",
        },
        text: {
          light: "#111827",
          dark: "#f3f4f6",
        },
      },
    },
  },
  plugins: [],
};
