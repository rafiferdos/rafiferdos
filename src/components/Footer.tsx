"use client";

import { ThemeContext } from "@/providers/ThemeProvider";
import { motion } from "framer-motion";
import Link from "next/link";
import { useContext } from "react";
const Footer = () => {
  const { theme } = useContext(ThemeContext);

  const socialLinks = [
    {
      name: "GitHub",
      url: "https://github.com/rafiferdos",
      icon: "🐱",
      color: "hover:text-gray-300",
    },
    {
      name: "LinkedIn",
      url: "https://linkedin.com/in/rafiferdos",
      icon: "💼",
      color: "hover:text-blue-400",
    },
    {
      name: "Twitter",
      url: "https://twitter.com/rafiferdos",
      icon: "🐦",
      color: "hover:text-sky-400",
    },
    {
      name: "Email",
      url: "mailto:rafiferdos@gmail.com",
      icon: "📧",
      color: "hover:text-red-400",
    },
  ];

  const quickLinks = [
    { name: "About", href: "#about" },
    { name: "Skills", href: "#skills" },
    { name: "Projects", href: "#projects" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <>
      {/* SVG filters for footer liquid glass effects */}
      <svg style={{ position: "absolute", width: 0, height: 0 }}>
        <defs>
          {/* Footer liquid glass distortion */}
          <filter
            id="footerLiquidGlass"
            x="-20%"
            y="-20%"
            width="140%"
            height="140%"
          >
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.005"
              numOctaves="4"
              seed="25"
              result="footerNoise"
            >
              <animate
                attributeName="baseFrequency"
                values="0.005;0.015;0.005"
                dur="18s"
                repeatCount="indefinite"
              />
            </feTurbulence>
            <feDisplacementMap
              in="SourceGraphic"
              in2="footerNoise"
              scale="3"
              xChannelSelector="R"
              yChannelSelector="G"
              result="footerDistorted"
            >
              <animate
                attributeName="scale"
                values="3;8;3"
                dur="12s"
                repeatCount="indefinite"
              />
            </feDisplacementMap>
            <feGaussianBlur
              in="footerDistorted"
              stdDeviation="0.4"
              result="footerBlurred"
            />
            <feComposite in="footerBlurred" in2="SourceAlpha" operator="in" />
          </filter>

          {/* Social button liquid glass */}
          <filter
            id="socialButtonGlass"
            x="-25%"
            y="-25%"
            width="150%"
            height="150%"
          >
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.008"
              numOctaves="3"
              seed="30"
              result="socialNoise"
            >
              <animate
                attributeName="baseFrequency"
                values="0.008;0.020;0.008"
                dur="10s"
                repeatCount="indefinite"
              />
            </feTurbulence>
            <feDisplacementMap
              in="SourceGraphic"
              in2="socialNoise"
              scale="2"
              result="socialDistorted"
            >
              <animate
                attributeName="scale"
                values="2;5;2"
                dur="8s"
                repeatCount="indefinite"
              />
            </feDisplacementMap>
            <feGaussianBlur in="socialDistorted" stdDeviation="0.2" />
          </filter>

          {/* Flowing glass gradient */}
          <linearGradient
            id="footerGlassFlow"
            x1="0%"
            y1="0%"
            x2="100%"
            y2="0%"
          >
            <stop offset="0%" stopColor="rgba(255,255,255,0.1)" />
            <stop offset="50%" stopColor="rgba(255,255,255,0.3)" />
            <stop offset="100%" stopColor="rgba(255,255,255,0.1)" />
            <animateTransform
              attributeName="gradientTransform"
              type="translate"
              values="-200 0;200 0;-200 0"
              dur="8s"
              repeatCount="indefinite"
            />
          </linearGradient>

          {/* Glass highlight pattern */}
          <pattern
            id="glassPattern"
            x="0"
            y="0"
            width="100"
            height="100"
            patternUnits="userSpaceOnUse"
          >
            <circle
              cx="50"
              cy="25"
              r="15"
              fill="none"
              stroke="rgba(255,255,255,0.1)"
              strokeWidth="1"
            >
              <animate
                attributeName="r"
                values="15;25;15"
                dur="6s"
                repeatCount="indefinite"
              />
            </circle>
            <circle cx="20" cy="70" r="10" fill="rgba(255,255,255,0.05)">
              <animate
                attributeName="r"
                values="10;18;10"
                dur="4s"
                repeatCount="indefinite"
                begin="1s"
              />
            </circle>
            <circle
              cx="80"
              cy="80"
              r="8"
              fill="none"
              stroke="rgba(255,255,255,0.08)"
              strokeWidth="0.5"
            >
              <animate
                attributeName="r"
                values="8;15;8"
                dur="5s"
                repeatCount="indefinite"
                begin="2s"
              />
            </circle>
          </pattern>

          {/* Radial glass highlight */}
          <radialGradient id="footerRadialGlass" cx="50%" cy="0%" r="100%">
            <stop offset="0%" stopColor="rgba(255,255,255,0.2)" />
            <stop offset="50%" stopColor="rgba(255,255,255,0.1)" />
            <stop offset="100%" stopColor="transparent" />
          </radialGradient>
        </defs>
      </svg>

      <motion.footer
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        viewport={{ once: true }}
        className={`relative mt-20 overflow-hidden ${
          theme === "dark" ? "text-white" : "text-gray-800"
        }`}
      >
        {/* Main Footer Container with Liquid Glass */}
        <div
          className="relative backdrop-blur-2xl border-t-2 border-transparent"
          style={{
            background: "rgba(255, 255, 255, 0.06)",
            WebkitBackdropFilter: "blur(25px) saturate(200%)",
            backdropFilter: "blur(25px) saturate(200%)",
            borderImage:
              "linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent) 1",
            filter: "url(#footerLiquidGlass)",
            WebkitFilter: "url(#footerLiquidGlass)",
          }}
        >
          {/* Glass pattern overlay */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: "url(#glassPattern)",
              opacity: 0.3,
            }}
          />

          {/* Flowing glass highlight */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: "url(#footerGlassFlow)",
              mixBlendMode: "overlay",
            }}
          />

          {/* Radial glass glow from top */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: "url(#footerRadialGlass)",
            }}
          />

          {/* Corner glass highlights */}
          <div className="absolute top-0 left-8 w-16 h-16 bg-white/10 rounded-full blur-xl mix-blend-overlay pointer-events-none" />
          <div className="absolute top-0 right-8 w-16 h-16 bg-white/10 rounded-full blur-xl mix-blend-overlay pointer-events-none" />
          <div className="absolute bottom-4 left-12 w-12 h-12 bg-white/05 rounded-full blur-lg mix-blend-overlay pointer-events-none" />
          <div className="absolute bottom-4 right-12 w-12 h-12 bg-white/05 rounded-full blur-lg mix-blend-overlay pointer-events-none" />

          <div className="relative container mx-auto px-6 py-12">
            <div className="grid md:grid-cols-3 gap-12">
              {/* Brand Section */}
              <motion.div
                className="space-y-4"
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <motion.h3
                  className="text-2xl font-bold bg-gradient-to-r from-blue-400 via-purple-500 to-cyan-400 bg-clip-text text-transparent"
                  animate={{
                    backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                  }}
                  transition={{ duration: 4, repeat: Infinity }}
                >
                  Rafi Ferdos
                </motion.h3>
                <p className="text-sm opacity-80 leading-relaxed max-w-xs">
                  Full-Stack Developer passionate about creating digital
                  experiences that blend functionality with aesthetics.
                </p>

                {/* Animated status indicator */}
                <motion.div
                  className="flex items-center space-x-2"
                  animate={{ opacity: [0.7, 1, 0.7] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                  <span className="text-xs opacity-70">
                    Available for projects
                  </span>
                </motion.div>
              </motion.div>

              {/* Quick Links */}
              <motion.div
                className="space-y-4"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <h4 className="text-lg font-semibold opacity-90">
                  Quick Links
                </h4>
                <div className="space-y-2">
                  {quickLinks.map((link, index) => (
                    <motion.div
                      key={link.name}
                      whileHover={{ x: 5 }}
                      transition={{ type: "spring", stiffness: 400 }}
                    >
                      <Link
                        href={link.href}
                        className="block text-sm opacity-70 hover:opacity-100 transition-all duration-300 hover:text-blue-400"
                      >
                        {link.name}
                      </Link>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* Social Links with Liquid Glass Buttons */}
              <motion.div
                className="space-y-4"
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
              >
                <h4 className="text-lg font-semibold opacity-90">Connect</h4>
                <div className="grid grid-cols-2 gap-3">
                  {socialLinks.map((social, index) => (
                    <motion.a
                      key={social.name}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`group relative p-3 rounded-xl text-center transition-all duration-300 ${social.color}`}
                      style={{
                        background: "rgba(255, 255, 255, 0.08)",
                        backdropFilter: "blur(15px) saturate(150%)",
                        border: "1px solid rgba(255, 255, 255, 0.12)",
                        boxShadow: `
                            0 4px 16px rgba(0, 0, 0, 0.1),
                            inset 0 1px 0 rgba(255, 255, 255, 0.2),
                            inset 0 -1px 0 rgba(0, 0, 0, 0.1)
                          `,
                        filter: "url(#socialButtonGlass)",
                        WebkitFilter: "url(#socialButtonGlass)",
                      }}
                      whileHover={{
                        scale: 1.05,
                        boxShadow: `
                            0 8px 25px rgba(0, 0, 0, 0.15),
                            inset 0 1px 0 rgba(255, 255, 255, 0.3),
                            inset 0 -1px 0 rgba(0, 0, 0, 0.1)
                          `,
                      }}
                      whileTap={{ scale: 0.95 }}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{
                        duration: 0.4,
                        delay: index * 0.1,
                        type: "spring",
                        stiffness: 300,
                      }}
                    >
                      {/* Glass highlight overlay */}
                      <div
                        className="absolute inset-0 rounded-xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                        style={{
                          background: `linear-gradient(135deg, 
                              rgba(255, 255, 255, 0.2) 0%, 
                              transparent 30%, 
                              transparent 70%, 
                              rgba(255, 255, 255, 0.1) 100%)`,
                        }}
                      />

                      {/* Floating particles on hover */}
                      {[...Array(3)].map((_, i) => (
                        <motion.div
                          key={i}
                          className="absolute w-1 h-1 bg-white/40 rounded-full pointer-events-none opacity-0 group-hover:opacity-100"
                          style={{
                            left: `${30 + i * 20}%`,
                            top: `${20 + i * 15}%`,
                          }}
                          animate={{
                            y: [0, -10, 0],
                            scale: [1, 1.5, 1],
                          }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            delay: i * 0.2,
                          }}
                        />
                      ))}

                      <div className="relative z-10">
                        <div className="text-xl mb-1">{social.icon}</div>
                        <div className="text-xs font-medium opacity-80 group-hover:opacity-100">
                          {social.name}
                        </div>
                      </div>

                      {/* Ripple effect on click */}
                      <motion.div
                        className="absolute inset-0 rounded-xl pointer-events-none"
                        style={{
                          background: "rgba(255, 255, 255, 0.1)",
                        }}
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 0, opacity: 0 }}
                        whileTap={{
                          scale: [0, 1.5, 0],
                          opacity: [0, 0.3, 0],
                        }}
                        transition={{ duration: 0.5 }}
                      />
                    </motion.a>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Bottom Section with Liquid Glass Separator */}
            <motion.div
              className="relative mt-12 pt-8"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              {/* Liquid glass separator line */}
              <div
                className="absolute top-0 left-0 right-0 h-px"
                style={{
                  background: "url(#footerGlassFlow)",
                  opacity: 0.6,
                }}
              />

              <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
                <motion.p
                  className="text-sm opacity-60"
                  animate={{ opacity: [0.6, 0.8, 0.6] }}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  © 2024 Rafi Ferdos. Crafted with 💙 and creativity.
                </motion.p>

                {/* Animated back to top button */}
                <motion.button
                  onClick={() =>
                    window.scrollTo({ top: 0, behavior: "smooth" })
                  }
                  className="group relative px-4 py-2 rounded-full text-sm font-medium transition-all duration-300"
                  style={{
                    background: "rgba(255, 255, 255, 0.1)",
                    backdropFilter: "blur(10px)",
                    border: "1px solid rgba(255, 255, 255, 0.15)",
                  }}
                  whileHover={{
                    scale: 1.05,
                    background: "rgba(255, 255, 255, 0.15)",
                  }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span className="flex items-center space-x-2">
                    <span>Back to top</span>
                    <motion.span
                      animate={{ y: [0, -2, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >
                      ↑
                    </motion.span>
                  </span>
                </motion.button>
              </div>
            </motion.div>
          </div>

          {/* Floating glass orbs */}
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 rounded-full pointer-events-none"
              style={{
                background: "rgba(255, 255, 255, 0.2)",
                left: `${10 + i * 10}%`,
                top: `${20 + Math.sin(i) * 30}%`,
                filter: "blur(1px)",
              }}
              animate={{
                y: [0, -20, 0],
                opacity: [0.2, 0.6, 0.2],
                scale: [1, 1.3, 1],
              }}
              transition={{
                duration: 4 + i * 0.5,
                repeat: Infinity,
                delay: i * 0.3,
                ease: "easeInOut",
              }}
            />
          ))}
        </div>
      </motion.footer>
    </>
  );
};

export default Footer;
