"use client";
import { createContext, useContext, useState, useEffect } from "react";

const ThemeContext = createContext();

const isDev = process.env.NODE_ENV === "development";
const log = (message) => {
  if (isDev) console.log(message);
};

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
  const [isDarkMode, setIsDarkMode] = useState(false); // Same default on server and client

  const getSystemTheme = () => {
    try {
      return window.matchMedia("(prefers-color-scheme: dark)").matches;
    } catch (error) {
      log(`Error detecting system theme: ${error}`);
      return false;
    }
  };

  useEffect(() => {
    const savedTheme = safeLocalStorage.getItem("theme");
    const userChoice = safeLocalStorage.getItem("userThemeChoice");
    const systemDarkMode = getSystemTheme();

    log(
      `Init theme — saved: ${savedTheme}, userChoice: ${userChoice}, systemDark: ${systemDarkMode}`,
    );

    if (savedTheme && userChoice === "true") {
      log(`Using user-selected theme: ${savedTheme}`);
      setIsDarkMode(savedTheme === "dark");
    } else {
      log(`Following system theme: ${systemDarkMode ? "dark" : "light"}`);
      safeLocalStorage.removeItem("theme");
      safeLocalStorage.removeItem("userThemeChoice");
      setIsDarkMode(systemDarkMode);
    }
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    if (safeLocalStorage.getItem("userThemeChoice") !== "true") {
      try {
        const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

        const handleChange = (e) => {
          log(`System theme changed to: ${e.matches ? "dark" : "light"}`);
          setIsDarkMode(e.matches);
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

    try {
      const root = document.documentElement;

      root.classList.add("theme-transition");

      if (isDarkMode) {
        root.classList.add("dark");
        root.classList.remove("light");

        if (safeLocalStorage.getItem("userThemeChoice") === "true") {
          safeLocalStorage.setItem("theme", "dark");
        }
      } else {
        root.classList.remove("dark");
        root.classList.add("light");

        if (safeLocalStorage.getItem("userThemeChoice") === "true") {
          safeLocalStorage.setItem("theme", "light");
        }
      }

      setTimeout(() => {
        root.classList.remove("theme-transition");
      }, 550);
    } catch (error) {
      log(`Error updating DOM: ${error}`);
    }
  }, [isDarkMode, mounted]);

  const toggleTheme = () => {
    safeLocalStorage.setItem("userThemeChoice", "true");
    const newMode = !isDarkMode;
    log(`User toggled theme to: ${newMode ? "dark" : "light"}`);
    setIsDarkMode(newMode);
  };

  const resetToSystemTheme = () => {
    safeLocalStorage.removeItem("theme");
    safeLocalStorage.removeItem("userThemeChoice");
    const systemTheme = getSystemTheme();
    log(`Reset to system theme: ${systemTheme ? "dark" : "light"}`);
    setIsDarkMode(systemTheme);
  };

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
