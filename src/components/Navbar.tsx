"use client";

import { ThemeContext } from "@/providers/ThemeProvider";
import { cn } from "@/utils/cn";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import { scrollToComponent } from "./scrollToComponent";

const Navbar = ({ className }: { className?: string }) => {
  const { theme, setTheme } = useContext(ThemeContext);
  const [active, setActive] = useState<string | null>(null);
  const [isToggleHovered, setIsToggleHovered] = useState(false);
  const router = useRouter();

  useEffect(() => {
    localStorage.setItem("theme", theme);
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

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
      {/* Ultra Advanced SVG Filters */}
      <svg style={{ position: "absolute", width: 0, height: 0 }}>
        <defs>
          {/* Liquid Crystal Morphing */}
          <filter
            id="liquidCrystalMorph"
            x="-50%"
            y="-50%"
            width="200%"
            height="200%"
          >
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.004"
              numOctaves="6"
              seed="15"
              result="crystalNoise"
            >
              <animate
                attributeName="baseFrequency"
                values="0.004;0.012;0.004"
                dur="20s"
                repeatCount="indefinite"
              />
            </feTurbulence>
            <feDisplacementMap
              in="SourceGraphic"
              in2="crystalNoise"
              scale="2"
              result="crystalDistorted"
            >
              <animate
                attributeName="scale"
                values="2;6;2"
                dur="15s"
                repeatCount="indefinite"
              />
            </feDisplacementMap>
            <feGaussianBlur
              in="crystalDistorted"
              stdDeviation="0.2"
              result="crystalBlurred"
            />
            <feColorMatrix
              in="crystalBlurred"
              type="saturate"
              values="1.5"
              result="crystalSaturated"
            />
            <feComposite
              in="crystalSaturated"
              in2="SourceAlpha"
              operator="in"
            />
          </filter>

          {/* Holographic Prism Effect */}
          <filter id="holoPrism" x="-30%" y="-30%" width="160%" height="160%">
            <feConvolveMatrix
              order="3"
              kernelMatrix="0 -1 0 -1 5 -1 0 -1 0"
              result="sharpen"
            />
            <feColorMatrix in="sharpen" type="hueRotate" result="hueShift">
              <animate
                attributeName="values"
                values="0;360;0"
                dur="8s"
                repeatCount="indefinite"
              />
            </feColorMatrix>
            <feGaussianBlur in="hueShift" stdDeviation="0.1" />
          </filter>

          {/* Quantum Field Generator */}
          <pattern
            id="quantumField"
            x="0"
            y="0"
            width="40"
            height="40"
            patternUnits="userSpaceOnUse"
          >
            <circle cx="20" cy="20" r="1.5" fill="rgba(255,255,255,0.2)">
              <animate
                attributeName="r"
                values="1.5;3;1.5"
                dur="4s"
                repeatCount="indefinite"
              />
            </circle>
            <circle cx="10" cy="10" r="1" fill="rgba(59,130,246,0.3)">
              <animate
                attributeName="r"
                values="1;2;1"
                dur="3s"
                repeatCount="indefinite"
                begin="0.5s"
              />
            </circle>
            <circle cx="30" cy="30" r="1" fill="rgba(147,51,234,0.3)">
              <animate
                attributeName="r"
                values="1;2.5;1"
                dur="5s"
                repeatCount="indefinite"
                begin="1s"
              />
            </circle>
            <circle cx="5" cy="35" r="0.8" fill="rgba(236,72,153,0.4)">
              <animate
                attributeName="r"
                values="0.8;1.8;0.8"
                dur="3.5s"
                repeatCount="indefinite"
                begin="1.5s"
              />
            </circle>
          </pattern>

          {/* Prismatic Gradient */}
          <linearGradient
            id="prismaticFlow"
            x1="0%"
            y1="0%"
            x2="100%"
            y2="100%"
          >
            <stop offset="0%" stopColor="#ff6b6b">
              <animate
                attributeName="stop-color"
                values="#ff6b6b;#4ecdc4;#45b7d1;#96ceb4;#feca57;#ff9ff3;#ff6b6b"
                dur="6s"
                repeatCount="indefinite"
              />
            </stop>
            <stop offset="25%" stopColor="#4ecdc4">
              <animate
                attributeName="stop-color"
                values="#4ecdc4;#45b7d1;#96ceb4;#feca57;#ff9ff3;#ff6b6b;#4ecdc4"
                dur="6s"
                repeatCount="indefinite"
              />
            </stop>
            <stop offset="50%" stopColor="#45b7d1">
              <animate
                attributeName="stop-color"
                values="#45b7d1;#96ceb4;#feca57;#ff9ff3;#ff6b6b;#4ecdc4;#45b7d1"
                dur="6s"
                repeatCount="indefinite"
              />
            </stop>
            <stop offset="75%" stopColor="#96ceb4">
              <animate
                attributeName="stop-color"
                values="#96ceb4;#feca57;#ff9ff3;#ff6b6b;#4ecdc4;#45b7d1;#96ceb4"
                dur="6s"
                repeatCount="indefinite"
              />
            </stop>
            <stop offset="100%" stopColor="#feca57">
              <animate
                attributeName="stop-color"
                values="#feca57;#ff9ff3;#ff6b6b;#4ecdc4;#45b7d1;#96ceb4;#feca57"
                dur="6s"
                repeatCount="indefinite"
              />
            </stop>
          </linearGradient>

          {/* Dimensional Portal */}
          <radialGradient id="dimensionalPortal" cx="50%" cy="50%">
            <stop offset="0%" stopColor="rgba(255,255,255,0.8)" />
            <stop offset="30%" stopColor="rgba(59,130,246,0.6)" />
            <stop offset="60%" stopColor="rgba(147,51,234,0.4)" />
            <stop offset="80%" stopColor="rgba(236,72,153,0.3)" />
            <stop offset="100%" stopColor="transparent" />
            <animateTransform
              attributeName="gradientTransform"
              type="rotate"
              values="0 50 50;360 50 50"
              dur="12s"
              repeatCount="indefinite"
            />
          </radialGradient>

          {/* Neural Network Pattern */}
          <pattern
            id="neuralNet"
            x="0"
            y="0"
            width="60"
            height="60"
            patternUnits="userSpaceOnUse"
          >
            <g stroke="rgba(255,255,255,0.1)" strokeWidth="0.5" fill="none">
              <path d="M30,10 L50,30 L30,50 L10,30 Z">
                <animate
                  attributeName="stroke-opacity"
                  values="0.1;0.4;0.1"
                  dur="4s"
                  repeatCount="indefinite"
                />
              </path>
              <path d="M15,15 L45,15 L45,45 L15,45 Z">
                <animate
                  attributeName="stroke-opacity"
                  values="0.1;0.3;0.1"
                  dur="5s"
                  repeatCount="indefinite"
                  begin="1s"
                />
              </path>
              <circle cx="30" cy="30" r="3" fill="rgba(255,255,255,0.2)">
                <animate
                  attributeName="r"
                  values="3;5;3"
                  dur="3s"
                  repeatCount="indefinite"
                />
              </circle>
            </g>
          </pattern>
        </defs>
      </svg>

      <div className="fixed top-6 left-0 right-0 z-50 flex justify-center">
        <motion.nav
          id="navbar"
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
          className={cn(
            "relative px-8 py-4 rounded-full border-4 border-transparent",
            "shadow-[0_0_0_2px_rgba(255,255,255,0.6),0_16px_32px_rgba(0,0,0,0.12)]",
            "dark:shadow-[0_0_0_2px_rgba(255,255,255,0.3),0_16px_32px_rgba(0,0,0,0.3)]",
            "cursor-pointer overflow-hidden backdrop-blur-xl",
            className
          )}
          style={{
            background: "rgba(255, 255, 255, 0.08)",
            WebkitBackdropFilter: "blur(20px) saturate(500%)",
            backdropFilter: "blur(20px) saturate(500%)",
          }}
        >
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

            {/* 🌟 PEAK CREATIVITY: QUANTUM DIMENSIONAL THEME TOGGLE 🌟 */}
            <motion.div
              className="relative w-24 h-12 perspective-1000"
              onHoverStart={() => setIsToggleHovered(true)}
              onHoverEnd={() => setIsToggleHovered(false)}
            >
              <motion.button
                onClick={toggleThemeChange}
                className="relative w-full h-full rounded-2xl overflow-hidden group"
                style={{
                  background: "rgba(0, 0, 0, 0.05)",
                  backdropFilter: "blur(40px) saturate(300%)",
                  WebkitBackdropFilter: "blur(40px) saturate(300%)",
                  border: "1px solid rgba(255, 255, 255, 0.08)",
                  boxShadow: `
                    0 0 0 1px rgba(255, 255, 255, 0.1),
                    0 20px 40px rgba(0, 0, 0, 0.1),
                    inset 0 1px 0 rgba(255, 255, 255, 0.2),
                    inset 0 -1px 0 rgba(0, 0, 0, 0.1)
                  `,
                  filter: "url(#liquidCrystalMorph)",
                  WebkitFilter: "url(#liquidCrystalMorph)",
                  transformStyle: "preserve-3d",
                }}
                animate={{
                  rotateY: isToggleHovered ? 15 : 0,
                  rotateX: isToggleHovered ? -5 : 0,
                  scale: isToggleHovered ? 1.05 : 1,
                }}
                whileTap={{
                  scale: 0.95,
                  rotateZ: theme === "dark" ? -180 : 180,
                }}
                transition={{
                  type: "spring",
                  stiffness: 400,
                  damping: 25,
                  duration: 0.6,
                }}
              >
                {/* Quantum Field Background */}
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background: "url(#quantumField)",
                    opacity: 0.4,
                  }}
                />

                {/* Neural Network Overlay */}
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background: "url(#neuralNet)",
                    opacity: 0.3,
                    mixBlendMode: "overlay",
                  }}
                />

                {/* Prismatic Flow Layer */}
                <motion.div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background: "url(#prismaticFlow)",
                    opacity: 0.15,
                    mixBlendMode: "color-dodge",
                  }}
                  animate={{
                    opacity: isToggleHovered ? 0.25 : 0.15,
                  }}
                />

                {/* Dimensional Portal in Center */}
                <motion.div
                  className="absolute inset-2 rounded-xl pointer-events-none"
                  style={{
                    background: "url(#dimensionalPortal)",
                    filter: "url(#holoPrism)",
                  }}
                  animate={{
                    scale: [1, 1.1, 1],
                    rotate: [0, 5, 0],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />

                {/* Floating Quantum Orbs */}
                {[...Array(12)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-1.5 h-1.5 rounded-full pointer-events-none"
                    style={{
                      background: `hsl(${
                        (i * 30 + (theme === "dark" ? 240 : 45)) % 360
                      }, 70%, 60%)`,
                      boxShadow: `0 0 8px hsl(${
                        (i * 30 + (theme === "dark" ? 240 : 45)) % 360
                      }, 70%, 60%)`,
                      left: "50%",
                      top: "50%",
                    }}
                    animate={{
                      x: [
                        0,
                        Math.cos((i * 30 * Math.PI) / 180) * 30,
                        Math.cos(((i * 30 + 180) * Math.PI) / 180) * 25,
                        0,
                      ],
                      y: [
                        0,
                        Math.sin((i * 30 * Math.PI) / 180) * 20,
                        Math.sin(((i * 30 + 180) * Math.PI) / 180) * 15,
                        0,
                      ],
                      opacity: [0.3, 1, 0.6, 0.3],
                      scale: [0.8, 1.5, 1, 0.8],
                    }}
                    transition={{
                      duration: 8 + i * 0.3,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: i * 0.2,
                    }}
                  />
                ))}

                {/* Central Energy Core */}
                <motion.div
                  className="absolute top-1/2 left-1/2 w-6 h-6 -mt-3 -ml-3 rounded-full"
                  style={{
                    background:
                      theme === "dark"
                        ? "radial-gradient(circle, rgba(147, 51, 234, 0.9), rgba(79, 70, 229, 0.7), rgba(59, 130, 246, 0.5))"
                        : "radial-gradient(circle, rgba(251, 191, 36, 0.9), rgba(245, 158, 11, 0.7), rgba(249, 115, 22, 0.5))",
                    boxShadow:
                      theme === "dark"
                        ? "0 0 20px rgba(147, 51, 234, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.3)"
                        : "0 0 20px rgba(251, 191, 36, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.3)",
                    border: "1px solid rgba(255, 255, 255, 0.2)",
                  }}
                  animate={{
                    scale: [1, 1.3, 1],
                    rotate: [0, 360],
                    boxShadow:
                      theme === "dark"
                        ? [
                            "0 0 20px rgba(147, 51, 234, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.3)",
                            "0 0 30px rgba(147, 51, 234, 0.8), inset 0 1px 0 rgba(255, 255, 255, 0.5)",
                            "0 0 20px rgba(147, 51, 234, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.3)",
                          ]
                        : [
                            "0 0 20px rgba(251, 191, 36, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.3)",
                            "0 0 30px rgba(251, 191, 36, 0.8), inset 0 1px 0 rgba(255, 255, 255, 0.5)",
                            "0 0 20px rgba(251, 191, 36, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.3)",
                          ],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  {/* Core Inner Rings */}
                  {[...Array(3)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute inset-0 rounded-full border pointer-events-none"
                      style={{
                        borderColor: "rgba(255, 255, 255, 0.3)",
                        borderWidth: "1px",
                      }}
                      animate={{
                        scale: [1, 1.5 + i * 0.3, 1],
                        opacity: [0.8, 0.2, 0.8],
                        rotate: [0, -360],
                      }}
                      transition={{
                        duration: 2 + i * 0.5,
                        repeat: Infinity,
                        ease: "linear",
                        delay: i * 0.3,
                      }}
                    />
                  ))}
                </motion.div>

                {/* Energy Trails */}
                {[...Array(8)].map((_, i) => (
                  <motion.div
                    key={`trail-${i}`}
                    className="absolute w-0.5 h-8 pointer-events-none"
                    style={{
                      background: `linear-gradient(to bottom, 
                        hsl(${
                          (i * 45 + (theme === "dark" ? 240 : 45)) % 360
                        }, 70%, 60%), 
                        transparent)`,
                      left: "50%",
                      top: "50%",
                      transformOrigin: "bottom center",
                      transform: `rotate(${i * 45}deg) translateY(-20px)`,
                    }}
                    animate={{
                      scaleY: [0.5, 1.5, 0.5],
                      opacity: [0.3, 0.8, 0.3],
                      rotate: [i * 45, i * 45 + 360, i * 45],
                    }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: i * 0.1,
                    }}
                  />
                ))}

                {/* Click Ripple Effect */}
                <motion.div
                  className="absolute inset-0 rounded-2xl pointer-events-none"
                  style={{
                    background: "rgba(255, 255, 255, 0.1)",
                  }}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 0, opacity: 0 }}
                  whileTap={{
                    scale: [0, 2, 0],
                    opacity: [0, 0.5, 0],
                  }}
                  transition={{ duration: 0.6 }}
                />

                {/* Holographic Scan Lines */}
                <motion.div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background: `repeating-linear-gradient(
                      0deg,
                      transparent,
                      transparent 2px,
                      rgba(255, 255, 255, 0.03) 2px,
                      rgba(255, 255, 255, 0.03) 4px
                    )`,
                  }}
                  animate={{
                    backgroundPosition: ["0px 0px", "0px 20px"],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                />
              </motion.button>
            </motion.div>
          </div>
        </motion.nav>
      </div>
    </>
  );
};

export default Navbar;
