"use client"

import React, { createContext, useState, ReactNode, useEffect } from 'react';

interface ThemeContextType {
  theme: string;
  setTheme: React.Dispatch<React.SetStateAction<string>>;
}

export const ThemeContext = createContext<ThemeContextType>({
  theme: 'dark', // Default theme
  setTheme: () => {} // Empty function for now
});

interface ThemeProviderProps {
  children: ReactNode;
}

// Move the logic for reading the theme from localStorage outside of the component
const getInitialTheme = () => {
  if (typeof window !== 'undefined') {
    const storedTheme = localStorage.getItem('theme');
    return storedTheme ? storedTheme : 'light';
  }
  return 'dark'; // Default to 'light' if window is not defined
};

const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [theme, setTheme] = useState<string>(getInitialTheme()); // Set initial theme based on localStorage

  useEffect(() => {
    // Update localStorage whenever the t
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const themes: ThemeContextType = {
    theme,
    setTheme,
  };

  return (
    <ThemeContext.Provider value={themes}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;