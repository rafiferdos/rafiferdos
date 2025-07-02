"use client";

import { ThemeContext } from "@/providers/ThemeProvider";
import { cn } from "@/utils/cn";
import { AnimatePresence, motion } from "framer-motion";
import { Moon, Sun } from "lucide-react";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import { scrollToComponent } from "./scrollToComponent";

const Navbar = ({ className }: { className?: string }) => {
  const { theme, setTheme } = useContext(ThemeContext);
  const [active, setActive] = useState<string | null>(null);
  const [navTheme, setNavTheme] = useState("light"); // 'light' = light background, 'dark' = dark background
  const [mounted, setMounted] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("theme", theme);
      document.documentElement.setAttribute("data-theme", theme);
    }
  }, [theme]);

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: "-80px 0px -90% 0px", // A horizontal line near the top of the viewport
      threshold: 0,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const sectionTheme = entry.target.getAttribute("data-section-theme");
          setNavTheme(sectionTheme === "dark" ? "dark" : "light");
        }
      });
    }, options);

    const sections = document.querySelectorAll("[data-section-theme]");
    sections.forEach((section) => observer.observe(section));

    return () => {
      sections.forEach((section) => observer.unobserve(section));
    };
  }, []);

  const toggleThemeChange = () => {
    setTheme(theme === "dark" ? "light" : "dark");
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
      <div className="fixed top-4 left-0 right-0 z-50 flex justify-center">
        <motion.nav
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{
            duration: 0.7,
            ease: [0.4, 0, 0.2, 1],
          }}
          className={cn(
            "relative flex items-center justify-center gap-x-4 px-4 py-2 rounded-full",
            // Liquid glass effect styles
            "bg-transparent",
            "border-2 border-white/40 dark:border-white/10",
            "backdrop-blur-sm",
            className
          )}
        >
          {menuItems.map((item) => (
            <motion.button
              key={item.label}
              onClick={item.action}
              onMouseEnter={() => setActive(item.label)}
              onMouseLeave={() => setActive(null)}
              className={cn(
                "relative px-3 py-1.5 text-sm font-medium transition-colors",
                navTheme === "dark"
                  ? "text-white hover:text-white"
                  : "text-neutral-700 hover:text-black"
              )}
            >
              {active === item.label && (
                <motion.div
                  layoutId="activePill"
                  className={cn(
                    "absolute inset-0 rounded-full",
                    navTheme === "dark" ? "bg-white/20" : "bg-black/10"
                  )}
                  style={{ borderRadius: 9999 }}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
              <span className="relative z-10">{item.label}</span>
            </motion.button>
          ))}

          {/* Theme Toggle Button */}
          <motion.button
            onClick={toggleThemeChange}
            className="relative flex items-center justify-center w-9 h-9 rounded-full bg-white/50 dark:bg-white/10"
            whileTap={{ scale: 0.9, rotate: 15 }}
            transition={{ type: "spring", stiffness: 400, damping: 15 }}
          >
            <AnimatePresence mode="wait" initial={false}>
              {mounted && (
                <motion.div
                  key={theme}
                  initial={{ y: -20, opacity: 0, rotate: -30 }}
                  animate={{ y: 0, opacity: 1, rotate: 0 }}
                  exit={{ y: 20, opacity: 0, rotate: 30 }}
                  transition={{ duration: 0.2 }}
                >
                  {theme === "dark" ? (
                    <Sun className="h-5 w-5 text-yellow-400" />
                  ) : (
                    <Moon className="h-5 w-5 text-neutral-800" />
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>
        </motion.nav>
      </div>
    </>
  );
};

export default Navbar;
