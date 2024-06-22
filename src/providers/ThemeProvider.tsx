"use client"

import React, { createContext, useState, ReactNode } from 'react';

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
  const [theme, setTheme] = useState<string>(
    localStorage.getItem('theme') || 'light' 
  );

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
