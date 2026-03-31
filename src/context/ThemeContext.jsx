"use client";
import { createContext, useContext, useEffect } from "react";

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
  const isDarkMode = true;

  useEffect(() => {
    safeLocalStorage.setItem("theme", "dark");
    safeLocalStorage.setItem("userThemeChoice", "true");
  }, []);

  useEffect(() => {
    try {
      const root = document.documentElement;

      root.classList.add("theme-transition");
      root.classList.add("dark");
      root.classList.remove("light");
      safeLocalStorage.setItem("theme", "dark");
      safeLocalStorage.setItem("userThemeChoice", "true");

      setTimeout(() => {
        root.classList.remove("theme-transition");
      }, 550);
    } catch (error) {
      log(`Error updating DOM: ${error}`);
    }
  }, []);

  const toggleTheme = () => {
    log("Theme is locked to dark mode.");
  };

  const resetToSystemTheme = () => {
    log("Theme is locked to dark mode.");
  };

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
