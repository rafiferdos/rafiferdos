"use client";

import { ThemeContext } from "@/providers/ThemeProvider";
import { cn } from "@/utils/cn";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import React, { useContext, useEffect, useState } from "react";
import { scrollToComponent } from "./scrollToComponent";

const Navbar = ({ className }: { className?: string }) => {
  const { theme, setTheme } = useContext(ThemeContext);
  const [active, setActive] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    localStorage.setItem("theme", theme);
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  const toggleThemeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTheme(e.target.checked ? "dark" : "light");
  };

  const menuItems = [
    { label: "Skills", action: () => scrollToComponent("skills") },
    { label: "Projects", action: () => scrollToComponent("projects") },
    { label: "About Me", action: () => scrollToComponent("about_me") },
    { label: "Contact", action: () => scrollToComponent("contact") },
    { label: "Blog", action: () => router.push("/blog") },
  ];

  return (
    <>
      {/*
        =============================================================================
          SVG filters to create a stronger “liquid distortion” effect on the corners
        =============================================================================
      */}
      <svg style={{ position: "absolute", width: 0, height: 0 }}>
        <defs>
          {/* Turbulence-based distortion */}
          <filter id="appleLiquidGlass" x="0" y="0" width="100%" height="100%">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.005"
              numOctaves="2"
              seed="2"
              result="turbulence"
            />
            <feDisplacementMap
              in="SourceGraphic"
              in2="turbulence"
              scale="20"
              xChannelSelector="R"
              yChannelSelector="G"
              result="distorted"
            />
          </filter>
          {/*
            You can animate or tweak scale/frequencies for different intensities.
            Example:
            <animate attributeName="scale" begin="navbar.mouseover" dur="0.3s" to="30" fill="freeze" />
            <animate attributeName="scale" begin="navbar.mouseout" dur="0.3s" to="20" fill="freeze" />
          */}
        </defs>
      </svg>

      <div className="fixed top-6 left-0 right-0 z-50 flex justify-center">
        <motion.nav
          id="navbar"
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
          className={cn(
            "relative px-8 py-4 rounded-full border-2 border-transparent",
            "shadow-[0_0_0_2px_rgba(255,255,255,0.6),0_16px_32px_rgba(0,0,0,0.12)]",
            "dark:shadow-[0_0_0_2px_rgba(255,255,255,0.3),0_16px_32px_rgba(0,0,0,0.3)]",
            "cursor-pointer overflow-hidden backdrop-blur-xl",
            className
          )}
          style={{
            background: "rgba(255, 255, 255, 0.08)",
            WebkitBackdropFilter: "blur(20px) saturate(180%)",
            backdropFilter: "blur(20px) saturate(180%)",
          }}
        >
          {/*
            Corners are selectively distorted using an absolutely positioned element
            that only covers corners, with the filter applied.
          */}
          <div
            className="pointer-events-none absolute inset-0 rounded-full"
            style={{
              filter: "url(#appleLiquidGlass)",
              WebkitFilter: "url(#appleLiquidGlass)",
            }}
          />

          {/* Subtle corner highlights to accentuate the liquid effect */}
          <div className="absolute top-0 left-2 w-10 h-10 bg-white/20 rounded-full blur-lg mix-blend-overlay pointer-events-none" />
          <div className="absolute top-0 right-2 w-10 h-10 bg-white/20 rounded-full blur-lg mix-blend-overlay pointer-events-none" />
          <div className="absolute bottom-0 left-3 w-8 h-8 bg-white/10 rounded-full blur-md mix-blend-overlay pointer-events-none" />
          <div className="absolute bottom-0 right-3 w-8 h-8 bg-white/10 rounded-full blur-md mix-blend-overlay pointer-events-none" />

          <div className="relative flex items-center space-x-6">
            {menuItems.map((item) => (
              <motion.button
                key={item.label}
                onClick={item.action}
                onMouseEnter={() => setActive(item.label)}
                onMouseLeave={() => setActive(null)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="relative px-4 py-2 text-sm font-medium text-gray-700/90 dark:text-white/90 transition-all rounded-full hover:text-gray-900 dark:hover:text-white"
              >
                {active === item.label && (
                  <motion.div
                    layoutId="activeBackground"
                    className="absolute inset-0 rounded-full bg-white/20 dark:bg-white/10 backdrop-blur-sm border border-white/20 dark:border-white/10 shadow-lg"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.2, ease: "easeOut" }}
                  />
                )}
                <span className="relative z-10">{item.label}</span>
              </motion.button>
            ))}

            {/* Theme toggle button */}
            <div className="relative">
              <label className="inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  className="sr-only"
                  onChange={toggleThemeChange}
                  checked={theme === "dark"}
                />
                <motion.div
                  className="relative w-14 h-8 rounded-full border-2 border-transparent shadow-inner backdrop-blur-sm overflow-hidden"
                  style={{
                    background:
                      theme === "dark"
                        ? "rgba(34, 197, 94, 0.3)"
                        : "rgba(229, 231, 235, 0.3)",
                    boxShadow:
                      theme === "dark"
                        ? "0 0 0 1px rgba(255,255,255,0.2), inset 0 2px 4px rgba(0,0,0,0.2)"
                        : "0 0 0 1px rgba(255,255,255,0.4), inset 0 2px 4px rgba(0,0,0,0.1)",
                  }}
                  whileTap={{ scale: 0.95 }}
                >
                  <motion.div
                    className="absolute top-1 w-6 h-6 rounded-full bg-white/95 shadow-lg flex items-center justify-center z-10"
                    animate={{
                      x: theme === "dark" ? 24 : 4,
                      boxShadow:
                        theme === "dark"
                          ? "0 2px 8px rgba(0,0,0,0.25), 0 1px 3px rgba(0,0,0,0.15)"
                          : "0 2px 8px rgba(0,0,0,0.2), 0 1px 3px rgba(0,0,0,0.1)",
                    }}
                    transition={{
                      type: "spring",
                      stiffness: 700,
                      damping: 30,
                      mass: 0.8,
                    }}
                  >
                    <motion.div
                      animate={{
                        rotate: theme === "dark" ? 0 : 180,
                        scale: theme === "dark" ? 1 : 0.9,
                      }}
                      transition={{ duration: 0.3 }}
                    >
                      {theme === "dark" ? (
                        <svg
                          className="w-3.5 h-3.5 text-gray-600"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                        </svg>
                      ) : (
                        <svg
                          className="w-3.5 h-3.5 text-yellow-500"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707a1 1 0 001.415-1.415zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
                            clipRule="evenodd"
                          />
                        </svg>
                      )}
                    </motion.div>
                  </motion.div>
                </motion.div>
              </label>
            </div>
          </div>
        </motion.nav>
      </div>
    </>
  );
};

export default Navbar;
