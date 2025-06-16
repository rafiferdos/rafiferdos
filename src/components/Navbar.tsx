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

  const toggleThemeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTheme(e.target.checked ? "dark" : "light");
  };

  useEffect(() => {
    localStorage.setItem("theme", theme);
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  const navbarVariants = {
    hidden: { y: -100, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.8, ease: [0.23, 1, 0.32, 1] },
    },
  };

  const menuItems = [
    { label: "Skills", action: () => scrollToComponent("skills") },
    { label: "Projects", action: () => scrollToComponent("projects") },
    { label: "About Me", action: () => scrollToComponent("about_me") },
    { label: "Contact", action: () => scrollToComponent("contact") },
    { label: "Blog", action: () => router.push("/blog") },
  ];

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={navbarVariants}
      className={cn(
        "fixed top-6 left-1/2 transform -translate-x-1/2 z-50",
        className
      )}
    >
      <nav className="relative px-6 py-3 rounded-2xl backdrop-blur-3xl bg-white/10 dark:bg-black/10 border border-white/20 dark:border-white/10 shadow-2xl shadow-black/5 dark:shadow-white/5">
        {/* Liquid glass overlay */}
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/20 via-white/5 to-transparent dark:from-white/10 dark:via-white/5 dark:to-transparent pointer-events-none" />

        {/* Inner glow */}
        <div className="absolute inset-0 rounded-2xl shadow-inner shadow-white/20 dark:shadow-white/10 pointer-events-none" />

        <div className="relative flex items-center space-x-8">
          {menuItems.map((item, index) => (
            <motion.button
              key={item.label}
              onClick={item.action}
              onMouseEnter={() => setActive(item.label)}
              onMouseLeave={() => setActive(null)}
              className="relative px-3 py-2 text-sm font-medium text-gray-800/90 dark:text-white/90 hover:text-gray-900 dark:hover:text-white transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {/* Hover background */}
              {active === item.label && (
                <motion.div
                  layoutId="activeBackground"
                  className="absolute inset-0 rounded-xl bg-white/30 dark:bg-white/10 backdrop-blur-sm"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.15 }}
                />
              )}
              <span className="relative z-10">{item.label}</span>
            </motion.button>
          ))}

          {/* Theme toggle */}
          <div className="relative">
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                className="sr-only"
                onChange={toggleThemeChange}
                checked={theme === "dark"}
              />
              <motion.div
                className="relative w-12 h-6 rounded-full bg-white/20 dark:bg-white/10 border border-white/30 dark:border-white/20 backdrop-blur-sm shadow-inner"
                whileTap={{ scale: 0.95 }}
              >
                <motion.div
                  className="absolute top-0.5 w-5 h-5 rounded-full bg-gradient-to-br from-white to-gray-100 dark:from-gray-700 dark:to-gray-900 shadow-lg flex items-center justify-center"
                  animate={{ x: theme === "dark" ? 24 : 2 }}
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                >
                  {theme === "dark" ? (
                    <svg
                      className="w-3 h-3 text-yellow-400"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                    </svg>
                  ) : (
                    <svg
                      className="w-3 h-3 text-yellow-500"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.415 1.415l.708.707a1 1 0 001.415-1.415z"
                        clipRule="evenodd"
                      />
                    </svg>
                  )}
                </motion.div>
              </motion.div>
            </label>
          </div>
        </div>
      </nav>
    </motion.div>
  );
};

export default Navbar;
