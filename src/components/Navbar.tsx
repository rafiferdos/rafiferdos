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
    <>
      {/* SVG Filter for corner liquid glass effect */}
      <svg style={{ position: "absolute", width: 0, height: 0 }}>
        <defs>
          <filter id="corner-frosted" primitiveUnits="objectBoundingBox">
            {/* Create a radial gradient mask for corners only */}
            <feGaussianBlur
              in="SourceGraphic"
              stdDeviation="0.01"
              result="blur"
            />
            <feImage
              href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Cdefs%3E%3CradialGradient id='corner-mask' cx='0' cy='0' r='0.3'%3E%3Cstop offset='0%25' stop-color='white'/%3E%3Cstop offset='100%25' stop-color='black'/%3E%3C/radialGradient%3E%3CradialGradient id='corner-mask2' cx='100' cy='0' r='0.3'%3E%3Cstop offset='0%25' stop-color='white'/%3E%3Cstop offset='100%25' stop-color='black'/%3E%3C/radialGradient%3E%3CradialGradient id='corner-mask3' cx='0' cy='100' r='0.3'%3E%3Cstop offset='0%25' stop-color='white'/%3E%3Cstop offset='100%25' stop-color='black'/%3E%3C/radialGradient%3E%3CradialGradient id='corner-mask4' cx='100' cy='100' r='0.3'%3E%3Cstop offset='0%25' stop-color='white'/%3E%3Cstop offset='100%25' stop-color='black'/%3E%3C/radialGradient%3E%3C/defs%3E%3Crect width='100' height='100' fill='url(%23corner-mask)'/%3E%3Crect width='100' height='100' fill='url(%23corner-mask2)' style='mix-blend-mode: multiply'/%3E%3Crect width='100' height='100' fill='url(%23corner-mask3)' style='mix-blend-mode: multiply'/%3E%3Crect width='100' height='100' fill='url(%23corner-mask4)' style='mix-blend-mode: multiply'/%3E%3C/svg%3E"
              x="0"
              y="0"
              width="1"
              height="1"
              result="corner-mask"
            />
            <feDisplacementMap
              in="blur"
              in2="corner-mask"
              scale="2"
              xChannelSelector="R"
              yChannelSelector="G"
              result="displaced"
            >
              <animate
                attributeName="scale"
                to="3"
                dur="0.3s"
                begin="navbar.mouseover"
                fill="freeze"
              />
              <animate
                attributeName="scale"
                to="2"
                dur="0.3s"
                begin="navbar.mouseout"
                fill="freeze"
              />
            </feDisplacementMap>
            <feComposite in="SourceGraphic" in2="displaced" operator="over" />
          </filter>
        </defs>
      </svg>

      <div className="fixed top-6 left-0 right-0 z-50 flex justify-center">
        <motion.nav
          id="navbar"
          initial="hidden"
          animate="visible"
          variants={navbarVariants}
          className={cn(
            "relative px-8 py-4 rounded-full border-2 border-transparent shadow-[0_0_0_2px_rgba(255,255,255,0.6),0_16px_32px_rgba(0,0,0,0.12)] dark:shadow-[0_0_0_2px_rgba(255,255,255,0.3),0_16px_32px_rgba(0,0,0,0.3)] cursor-pointer outline-none overflow-hidden",
            className
          )}
          style={{
            background: "rgba(255, 255, 255, 0.08)",
            backdropFilter: "blur(20px) saturate(180%)",
            WebkitBackdropFilter: "blur(20px) saturate(180%)",
          }}
        >
          {/* Corner distortion overlay - only affects corners */}
          <div
            className="absolute inset-0 rounded-full pointer-events-none"
            style={{
              backdropFilter: "url(#corner-frosted)",
              WebkitBackdropFilter: "url(#corner-frosted)",
            }}
          />

          {/* Corner highlights for glass effect */}
          <div className="absolute top-0 left-4 w-8 h-8 rounded-full bg-gradient-radial from-white/40 to-transparent dark:from-white/20 pointer-events-none" />
          <div className="absolute top-0 right-4 w-8 h-8 rounded-full bg-gradient-radial from-white/40 to-transparent dark:from-white/20 pointer-events-none" />
          <div className="absolute bottom-0 left-4 w-6 h-6 rounded-full bg-gradient-radial from-white/30 to-transparent dark:from-white/15 pointer-events-none" />
          <div className="absolute bottom-0 right-4 w-6 h-6 rounded-full bg-gradient-radial from-white/30 to-transparent dark:from-white/15 pointer-events-none" />

          {/* Main glass overlay */}
          <div className="absolute inset-[1px] rounded-full bg-gradient-to-b from-white/10 to-transparent dark:from-white/5 dark:to-transparent pointer-events-none" />

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
                {active === item.label && (
                  <motion.div
                    layoutId="activeBackground"
                    className="absolute inset-0 rounded-full bg-white/20 dark:bg-white/8 backdrop-blur-sm border border-white/20 dark:border-white/10 shadow-lg"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.2, ease: "easeOut" }}
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
                  {/* Corner distortion for toggle */}
                  <div
                    className="absolute inset-0 rounded-full pointer-events-none opacity-50"
                    style={{
                      backdropFilter: "url(#corner-frosted)",
                      WebkitBackdropFilter: "url(#corner-frosted)",
                    }}
                  />

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
