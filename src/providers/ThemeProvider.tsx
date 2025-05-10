"use client";

import React, { createContext, ReactNode, useEffect, useState } from "react";

interface ThemeContextType {
  theme: string;
  setTheme: React.Dispatch<React.SetStateAction<string>>;
}

export const ThemeContext = createContext<ThemeContextType>({
  theme: "dark", // Default theme
  setTheme: () => {}, // Empty function for now
});

interface ThemeProviderProps {
  children: ReactNode;
}

// Move the logic for reading the theme from localStorage outside of the component
const getInitialTheme = () => {
  if (typeof window !== "undefined") {
    // Check localStorage first
    const storedTheme = localStorage.getItem("theme");
    if (storedTheme) {
      return storedTheme;
    }

    // If no theme in localStorage, check system preference
    if (
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches
    ) {
      return "dark";
    }

    return "light";
  }
  return "dark"; // Default to dark if window is not defined
};

const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [theme, setTheme] = useState<string>(getInitialTheme()); // Set initial theme based on localStorage
  useEffect(() => {
    // Update localStorage whenever the theme changes
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);

    // Apply theme-specific classes to body
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
      document.body.classList.add("dark-theme");
      document.body.classList.remove("light-theme");
    } else {
      document.documentElement.classList.remove("dark");
      document.body.classList.add("light-theme");
      document.body.classList.remove("dark-theme");
    }
  }, [theme]);

  // Listen for system theme changes
  useEffect(() => {
    if (typeof window !== "undefined") {
      const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

      const handleChange = (e: MediaQueryListEvent) => {
        // Only update if user hasn't manually set a theme preference
        if (!localStorage.getItem("theme")) {
          setTheme(e.matches ? "dark" : "light");
        }
      };

      mediaQuery.addEventListener("change", handleChange);

      return () => {
        mediaQuery.removeEventListener("change", handleChange);
      };
    }
  }, [setTheme]);

  const themes: ThemeContextType = {
    theme,
    setTheme,
  };

  return (
    <ThemeContext.Provider value={themes}>{children}</ThemeContext.Provider>
  );
};

export default ThemeProvider;
