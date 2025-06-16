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
    <div className="fixed top-6 left-0 right-0 z-50 flex justify-center">
      <motion.nav
        initial="hidden"
        animate="visible"
        variants={navbarVariants}
        className={cn(
          "relative px-8 py-4 rounded-full border-2 border-transparent shadow-[0_0_0_2px_rgba(255,255,255,0.6),0_16px_32px_rgba(0,0,0,0.12)] dark:shadow-[0_0_0_2px_rgba(255,255,255,0.3),0_16px_32px_rgba(0,0,0,0.3)]",
          className
        )}
        style={{
          background: "rgba(255, 255, 255, 0.08)",
          backdropFilter: "blur(7px) saturate(180%)",
          WebkitBackdropFilter: "blur(20px) saturate(180%)",
        }}
      >
        {/* Glass texture overlay with frosted effect */}
        <div
          className="absolute inset-0 rounded-full pointer-events-none opacity-60"
          style={{
            background: `url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMgAAADICAYAAACtWK6eAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAF6ESURBVHgB7b1ZsB3HeSb4ZZ1zV+wEQCykAJIASHERQNBaKRKySMkxYYVly+6x3fNgR0e4rZn2vIw7RnbMONrd0X5wKMLTT+7psf0w7ocZWz22pZ5Wz0xL1EaJ1M5NJEWR1EKBK0gAF/ae+icr1//PzKpT595zsZE/ULeycquqrP+rf8uso/7lHxPhTZoqqZmzUBteRbXzOQz2fB/Y9CKgjzG7pLezoGZTI5CuR3NNugYNRjZPtyeqQKOh3g9AS/OglVnQ8rzJgz7GaAY4vQnqhT2onn8LqpevRPXSlVArM3iTpktDvEmrpmr2DIZXP43hjp+g2nISatNLGOz6AdSWFxyzE2r+lwj2beTfSQSfowuTzpUu0dsi7B52X7s9qSav0seuXj3UQNkF9eJuvd+BwavbMfzZ1Zh55sY3gbMGehMgE5AansP8wQcxc+WPMbv/UQz3/ABULTMY6H0DAqoNwzc5aNLk0g2bGxx4mESg8Hx9JvdfuVIV8pWye5OnKn1chfRo62nQth860Nj8RgoNjx/E7A9vxtxz12H2xzegWlrEm9SP3gRIBw0WX8W8VpFmdv8AC4cewGD7s3rEliwUSEsIvWFUm71hdrJAaQBCRnN1gDFlbjMM7qAhtNuSpuuAoSJATDXl8yqzV0aiVCFPub3NG2B596NY2vM4Xm3y6hnMHr8Ocz+6GfM/uR6zJ/ZjcHoz3qQyvQmQhKq5M9h48NvYePN9mN39NNT8a5onRxoQDggOEDAA8WkPDAsKDwZyilEAB1IVCxEklOSrCA4VShQrruyxstLEgIKBxuZVRrKQBolyew17DZZHcWbv40bK4NwGzB8/gE0Pvh+Lz9yEwZmNeJMivQkQNKrTMhav..." />`,
            backgroundSize: "200px 200px",
          }}
        />

        {/* Inner glow highlights */}
        <div className="absolute inset-[1px] rounded-full bg-gradient-to-b from-white/20 to-transparent dark:from-white/10 dark:to-transparent pointer-events-none" />

        {/* Additional liquid glass layers */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-br from-white/30 via-white/5 to-transparent dark:from-white/15 dark:via-white/3 dark:to-transparent pointer-events-none" />

        <div className="relative flex items-center space-x-6">
          {menuItems.map((item, index) => (
            <motion.button
              key={item.label}
              onClick={item.action}
              onMouseEnter={() => setActive(item.label)}
              onMouseLeave={() => setActive(null)}
              className="relative px-4 py-2 text-sm font-medium text-gray-700/90 dark:text-white/90 hover:text-gray-900 dark:hover:text-white transition-all duration-300 rounded-full"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {/* Hover background with liquid glass effect */}
              {active === item.label && (
                <motion.div
                  layoutId="activeBackground"
                  className="absolute inset-0 rounded-full bg-white/30 dark:bg-white/10 backdrop-blur-sm border border-white/20 dark:border-white/10 shadow-lg"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.2, ease: "easeOut" }}
                />
              )}
              <span className="relative z-10">{item.label}</span>
            </motion.button>
          ))}

          {/* Apple-style theme toggle with liquid glass */}
          <div className="relative">
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                className="sr-only"
                onChange={toggleThemeChange}
                checked={theme === "dark"}
              />
              <motion.div
                className="relative w-14 h-8 rounded-full border-2 border-transparent shadow-inner backdrop-blur-sm"
                style={{
                  background:
                    theme === "dark"
                      ? "rgba(34, 197, 94, 0.3)"
                      : "rgba(229, 231, 235, 0.3)",
                  backdropFilter: "blur(10px)",
                  WebkitBackdropFilter: "blur(10px)",
                  boxShadow:
                    theme === "dark"
                      ? "0 0 0 1px rgba(255,255,255,0.2), inset 0 2px 4px rgba(0,0,0,0.2)"
                      : "0 0 0 1px rgba(255,255,255,0.4), inset 0 2px 4px rgba(0,0,0,0.1)",
                }}
                whileTap={{ scale: 0.95 }}
              >
                {/* Track glow effect */}
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-transparent via-white/15 to-transparent dark:via-white/8 pointer-events-none" />

                <motion.div
                  className="absolute top-1 w-6 h-6 rounded-full bg-white/95 shadow-lg flex items-center justify-center"
                  style={{
                    backdropFilter: "blur(10px)",
                    WebkitBackdropFilter: "blur(10px)",
                  }}
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
                  {/* Icon container with smooth transition */}
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
                          d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.415 1.415l.708.707a1 1 0 001.415-1.415z"
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
  );
};

export default Navbar;
