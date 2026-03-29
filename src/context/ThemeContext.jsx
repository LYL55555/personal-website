"use client";
import { createContext, useContext, useState, useEffect } from "react";

const ThemeContext = createContext();

// 开发环境打印日志，生产环境不打印
const isDev = process.env.NODE_ENV === "development";
const log = (message) => {
  if (isDev) console.log(message);
};

// 安全访问 localStorage
const safeLocalStorage = {
  getItem: (key) => {
    try {
      return localStorage.getItem(key);
    } catch (error) {
      log(`Error accessing localStorage: ${error}`);
      return null;
    }
  },
  setItem: (key, value) => {
    try {
      localStorage.setItem(key, value);
    } catch (error) {
      log(`Error setting localStorage: ${error}`);
    }
  },
  removeItem: (key) => {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      log(`Error removing from localStorage: ${error}`);
    }
  },
};

export function ThemeProvider({ children }) {
  const [mounted, setMounted] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false); // 默认值在服务器端和客户端保持一致

  // 获取系统主题偏好
  const getSystemTheme = () => {
    try {
      return window.matchMedia("(prefers-color-scheme: dark)").matches;
    } catch (error) {
      log(`Error detecting system theme: ${error}`);
      return false;
    }
  };

  // 只在客户端执行主题初始化
  useEffect(() => {
    const savedTheme = safeLocalStorage.getItem("theme");
    const userChoice = safeLocalStorage.getItem("userThemeChoice");
    const systemDarkMode = getSystemTheme();

    log(
      `初始化主题 - 保存的主题: ${savedTheme}, 用户选择: ${userChoice}, 系统暗黑模式: ${systemDarkMode}`
    );

    if (savedTheme && userChoice === "true") {
      // 用户手动选择的主题优先
      log(`使用用户选择的主题: ${savedTheme}`);
      setIsDarkMode(savedTheme === "dark");
    } else {
      // 否则跟随系统主题，并删除任何可能残留的主题设置
      log(`跟随系统主题: ${systemDarkMode ? "暗黑" : "光亮"}`);
      safeLocalStorage.removeItem("theme");
      safeLocalStorage.removeItem("userThemeChoice");
      setIsDarkMode(systemDarkMode);
    }
    setMounted(true);
  }, []);

  // 监听系统主题变化
  useEffect(() => {
    if (!mounted) return;

    // 只在没有用户手动设置的情况下跟随系统主题
    if (safeLocalStorage.getItem("userThemeChoice") !== "true") {
      try {
        const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

        const handleChange = (e) => {
          log(`系统主题变化为: ${e.matches ? "暗黑" : "光亮"}`);
          setIsDarkMode(e.matches);
          // 清除任何可能残留的localStorage设置
          safeLocalStorage.removeItem("theme");
        };

        mediaQuery.addEventListener("change", handleChange);
        return () => mediaQuery.removeEventListener("change", handleChange);
      } catch (error) {
        log(`Error setting up media query listener: ${error}`);
      }
    }
  }, [mounted]);

  useEffect(() => {
    if (!mounted) return;

    // 更新 DOM 和 localStorage
    try {
      const root = document.documentElement;

      // 添加过渡类，使主题切换更平滑
      root.classList.add("theme-transition");

      if (isDarkMode) {
        root.classList.add("dark");
        root.classList.remove("light");

        // 只有在用户手动切换时才保存到localStorage
        if (safeLocalStorage.getItem("userThemeChoice") === "true") {
          safeLocalStorage.setItem("theme", "dark");
        }
      } else {
        root.classList.remove("dark");
        root.classList.add("light");

        // 只有在用户手动切换时才保存到localStorage
        if (safeLocalStorage.getItem("userThemeChoice") === "true") {
          safeLocalStorage.setItem("theme", "light");
        }
      }

      // 移除过渡类（略长于 globals 里 theme 过渡时长）
      setTimeout(() => {
        root.classList.remove("theme-transition");
      }, 550);
    } catch (error) {
      log(`Error updating DOM: ${error}`);
    }
  }, [isDarkMode, mounted]);

  const toggleTheme = () => {
    // 标记用户已手动切换主题
    safeLocalStorage.setItem("userThemeChoice", "true");
    const newMode = !isDarkMode;
    log(`用户手动切换主题为: ${newMode ? "暗黑" : "光亮"}`);
    setIsDarkMode(newMode);
  };

  // 重置为跟随系统主题
  const resetToSystemTheme = () => {
    safeLocalStorage.removeItem("theme");
    safeLocalStorage.removeItem("userThemeChoice");
    const systemTheme = getSystemTheme();
    log(`重置为系统主题: ${systemTheme ? "暗黑" : "光亮"}`);
    setIsDarkMode(systemTheme);
  };

  // 在客户端水合完成前返回一个基础渲染
  if (!mounted) {
    return (
      <ThemeContext.Provider
        value={{
          isDarkMode: false,
          toggleTheme: () => {},
          resetToSystemTheme: () => {},
        }}
      >
        {children}
      </ThemeContext.Provider>
    );
  }

  return (
    <ThemeContext.Provider
      value={{
        isDarkMode,
        toggleTheme,
        resetToSystemTheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
