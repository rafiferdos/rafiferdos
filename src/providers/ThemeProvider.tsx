"use client"

import React, { createContext, useState, ReactNode, useEffect } from 'react';

interface ThemeContextType {
  theme: string;
  setTheme: React.Dispatch<React.SetStateAction<string>>;
}

export const ThemeContext = createContext<ThemeContextType>({
  theme: 'light', // Default theme
  setTheme: () => {} // Empty function for now
});

interface ThemeProviderProps {
  children: ReactNode;
}

const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [theme, setTheme] = useState<string>('light'); // Set default theme to 'light'

  useEffect(() => {
    // Access localStorage only when the component mounts in the browser
    const storedTheme = localStorage.getItem('theme');
    if (storedTheme) {
      setTheme(storedTheme);
    }
  }, []);

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
