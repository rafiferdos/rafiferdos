"use client";

import ProjectCard from "@/components/ProjectCard";
import { Project } from "@/components/Projects";
import { TextGenerateEffect } from "@/components/ui/text-generate-effect";
import { ThemeContext } from "@/providers/ThemeProvider";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import {
  IoArrowBackOutline,
  IoFilterOutline,
  IoGridOutline,
  IoInfiniteOutline,
  IoListOutline,
  IoSearchOutline,
} from "react-icons/io5";
import {
  RiCircleLine,
  RiCpuLine,
  RiFocus3Line,
  RiPlanetLine,
  RiRadarLine,
  RiSpaceShipLine,
  RiSparklingLine,
} from "react-icons/ri";

interface ProjectData {
  projects: Project[];
}

// Custom Spotlight component since it might not be available
const CustomSpotlight = ({
  className,
  fill,
}: {
  className: string;
  fill: string;
}) => (
  <div
    className={className}
    style={{
      background: `radial-gradient(ellipse 600px 400px at 50% 0%, ${fill}, transparent)`,
      pointerEvents: "none",
    }}
  />
);

const AllProjectsPage = () => {
  const { theme } = useContext(ThemeContext);
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [filteredProjects, setFilteredProjects] = useState<Project[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTech, setSelectedTech] = useState<string>("All");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [sortBy, setSortBy] = useState<"name" | "date" | "tech">("name");
  const [showFilters, setShowFilters] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const [quantumParticles, setQuantumParticles] = useState<
    Array<{
      width: number;
      height: number;
      brightness: number;
      left: number;
      top: number;
      boxShadow: number;
      yOffset: number;
      xOffset: number;
      scale: number;
      duration: number;
    }>
  >([]);

  useEffect(() => {
    setIsClient(true);
    // Generate quantum particle properties only on client
    const particles = Array.from({ length: 50 }, (_, i) => ({
      width: Math.random() * 3 + 1,
      height: Math.random() * 3 + 1,
      brightness: 60 + Math.random() * 30,
      left: Math.random() * 100,
      top: Math.random() * 100,
      boxShadow: Math.random() * 20 + 10,
      yOffset: -200 - Math.random() * 100,
      xOffset: Math.sin(i) * 150 + Math.random() * 100,
      scale: 2 + Math.random(),
      duration: 15 + i * 0.3 + Math.random() * 10,
    }));
    setQuantumParticles(particles);
  }, []);

  useEffect(() => {
    fetch("/projects_data.json")
      .then((response) => response.json())
      .then((data: ProjectData) => {
        setProjects(data.projects);
        setFilteredProjects(data.projects);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching projects:", error);
        setLoading(false);
      });
  }, []);

  // Get unique technologies with count
  const allTechnologies = Array.from(
    new Set(projects.flatMap((project) => project.tech_stack || []))
  ).map((tech) => ({
    name: tech,
    count: projects.filter((p) => p.tech_stack?.includes(tech)).length,
  }));

  // Filter and search logic
  useEffect(() => {
    let filtered = projects;

    if (searchTerm) {
      filtered = filtered.filter(
        (project) =>
          project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          project.description
            .toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
          project.tech_stack?.some((tech) =>
            tech.toLowerCase().includes(searchTerm.toLowerCase())
          )
      );
    }

    if (selectedTech !== "All") {
      filtered = filtered.filter((project) =>
        project.tech_stack?.includes(selectedTech)
      );
    }

    filtered = filtered.sort((a, b) => {
      if (sortBy === "name") {
        return a.name.localeCompare(b.name);
      } else if (sortBy === "date") {
        return (b.completion_date || "").localeCompare(a.completion_date || "");
      } else {
        return (b.tech_stack?.length || 0) - (a.tech_stack?.length || 0);
      }
    });

    setFilteredProjects(filtered);
  }, [projects, searchTerm, selectedTech, sortBy]);

  if (loading) {
    return (
      <div
        className={`min-h-screen flex items-center justify-center relative overflow-hidden ${
          theme === "dark" ? "bg-black text-white" : "bg-white text-black"
        }`}
      >
        {/* Ultra Futuristic Loading Background */}
        <div className="absolute inset-0">
          {/* Holographic Matrix Background */}
          <div
            className="absolute inset-0 opacity-20"
            style={{
              background: `
                radial-gradient(circle at 20% 80%, rgba(59, 130, 246, 0.3) 0%, transparent 50%),
                radial-gradient(circle at 80% 20%, rgba(147, 51, 234, 0.3) 0%, transparent 50%),
                radial-gradient(circle at 40% 40%, rgba(6, 182, 212, 0.25) 0%, transparent 50%),
                conic-gradient(from 0deg at 50% 50%, rgba(59, 130, 246, 0.1), rgba(147, 51, 234, 0.1), rgba(236, 72, 153, 0.1), rgba(59, 130, 246, 0.1))
              `,
            }}
          />

          {/* Animated Circuit Lines */}
          {[...Array(15)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute"
              style={{
                width: "1px",
                height: "100vh",
                left: `${5 + i * 6}%`,
                background: `linear-gradient(to bottom, transparent, rgba(59, 130, 246, 0.5), transparent)`,
              }}
              animate={{
                opacity: [0.2, 0.8, 0.2],
                scaleY: [0.5, 1.2, 0.5],
                filter: [
                  "brightness(1) hue-rotate(0deg)",
                  "brightness(1.5) hue-rotate(180deg)",
                  "brightness(1) hue-rotate(360deg)",
                ],
              }}
              transition={{
                duration: 4 + i * 0.3,
                repeat: Infinity,
                delay: i * 0.2,
                ease: "easeInOut",
              }}
            />
          ))}
        </div>

        {/* Quantum Loading System */}
        <motion.div className="relative z-10 flex flex-col items-center space-y-12">
          {/* Multi-Ring Holographic Loader */}
          <div className="relative w-48 h-48">
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute inset-0 rounded-full"
                style={{
                  border: `2px solid rgba(${
                    i % 2 === 0 ? "59, 130, 246" : "147, 51, 234"
                  }, ${0.3 + i * 0.1})`,
                  borderTop: `2px solid rgba(${
                    i % 2 === 0 ? "147, 51, 234" : "59, 130, 246"
                  }, 0.8)`,
                  filter: "drop-shadow(0 0 10px currentColor)",
                }}
                animate={{
                  rotate: i % 2 === 0 ? 360 : -360,
                  scale: [1, 1.05, 1],
                }}
                transition={{
                  rotate: {
                    duration: 2 - i * 0.2,
                    repeat: Infinity,
                    ease: "linear",
                  },
                  scale: { duration: 3, repeat: Infinity, delay: i * 0.2 },
                }}
              />
            ))}

            {/* Central Quantum Core */}
            <motion.div
              className="absolute inset-8 rounded-full flex items-center justify-center"
              style={{
                background:
                  "conic-gradient(from 0deg, rgba(59, 130, 246, 0.8), rgba(147, 51, 234, 0.8), rgba(236, 72, 153, 0.8), rgba(59, 130, 246, 0.8))",
              }}
              animate={{
                rotate: [0, 360],
                scale: [1, 1.15, 1],
                boxShadow: [
                  "0 0 30px rgba(59, 130, 246, 0.5)",
                  "0 0 50px rgba(147, 51, 234, 0.8)",
                  "0 0 30px rgba(59, 130, 246, 0.5)",
                ],
              }}
              transition={{
                rotate: { duration: 4, repeat: Infinity, ease: "linear" },
                scale: { duration: 2, repeat: Infinity },
                boxShadow: { duration: 3, repeat: Infinity },
              }}
            >
              <RiSpaceShipLine className="text-4xl text-white" />
            </motion.div>
          </div>

          {/* Loading Status */}
          <motion.div
            className="text-center space-y-6"
            animate={{ opacity: [0.6, 1, 0.6] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <div className="flex items-center space-x-3">
              <motion.div
                animate={{ rotate: 360, scale: [1, 1.3, 1] }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              >
                <RiCircuitLine className="text-2xl text-blue-400" />
              </motion.div>
              <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-400 via-purple-500 to-cyan-400 bg-clip-text text-transparent">
                Initializing Quantum Matrix
              </h2>
            </div>

            <div className="flex items-center justify-center space-x-2 text-sm opacity-70">
              <span>Syncing with digital dimensions</span>
              <motion.div
                animate={{ opacity: [0, 1, 0] }}
                transition={{ duration: 1, repeat: Infinity }}
              >
                <RiSparklingLine />
              </motion.div>
            </div>
          </motion.div>

          {/* Quantum Progress Bars */}
          <div className="space-y-3 w-80">
            {["Neural Networks", "Data Streams", "Holographic Interface"].map(
              (label, i) => (
                <div key={label} className="space-y-1">
                  <div className="flex justify-between text-xs opacity-60">
                    <span>{label}</span>
                    <span>100%</span>
                  </div>
                  <div className="h-1 bg-white/10 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-500"
                      animate={{
                        x: [-320, 320],
                        opacity: [0.5, 1, 0.5],
                      }}
                      transition={{
                        duration: 2 + i * 0.3,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: i * 0.5,
                      }}
                      style={{ width: "40%" }}
                    />
                  </div>
                </div>
              )
            )}
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div
      className={`min-h-screen relative overflow-hidden ${
        theme === "dark" ? "bg-black text-white" : "bg-white text-black"
      }`}
    >
      {/* ULTIMATE FUTURISTIC BACKGROUND SYSTEM */}

      {/* Space for Navbar */}
      <div className="h-20" />

      {/* Holographic Matrix Grid */}
      <div className="fixed inset-0 pointer-events-none">
        <div
          className="absolute inset-0 opacity-15"
          style={{
            background: `
              radial-gradient(circle at 25% 25%, rgba(59, 130, 246, 0.4) 0%, transparent 25%),
              radial-gradient(circle at 75% 25%, rgba(147, 51, 234, 0.4) 0%, transparent 25%),
              radial-gradient(circle at 25% 75%, rgba(236, 72, 153, 0.4) 0%, transparent 25%),
              radial-gradient(circle at 75% 75%, rgba(6, 182, 212, 0.4) 0%, transparent 25%),
              conic-gradient(from 0deg at 50% 50%, 
                rgba(59, 130, 246, 0.1) 0deg, 
                rgba(147, 51, 234, 0.1) 90deg, 
                rgba(236, 72, 153, 0.1) 180deg, 
                rgba(6, 182, 212, 0.1) 270deg, 
                rgba(59, 130, 246, 0.1) 360deg)
            `,
          }}
        />

        {/* Neural Network Lines */}
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute"
            style={{
              width: i % 3 === 0 ? "2px" : "1px",
              height: "100vh",
              left: `${3 + i * 4.8}%`,
              background: `linear-gradient(to bottom, 
                transparent 0%, 
                rgba(${
                  i % 4 === 0
                    ? "59, 130, 246"
                    : i % 4 === 1
                    ? "147, 51, 234"
                    : i % 4 === 2
                    ? "236, 72, 153"
                    : "6, 182, 212"
                }, 0.3) 20%, 
                rgba(${
                  i % 4 === 0
                    ? "59, 130, 246"
                    : i % 4 === 1
                    ? "147, 51, 234"
                    : i % 4 === 2
                    ? "236, 72, 153"
                    : "6, 182, 212"
                }, 0.6) 50%, 
                rgba(${
                  i % 4 === 0
                    ? "59, 130, 246"
                    : i % 4 === 1
                    ? "147, 51, 234"
                    : i % 4 === 2
                    ? "236, 72, 153"
                    : "6, 182, 212"
                }, 0.3) 80%, 
                transparent 100%)`,
              filter: `hue-rotate(${i * 30}deg) brightness(${
                1 + Math.sin(i) * 0.3
              })`,
            }}
            animate={{
              opacity: [0.3, 0.8, 0.3],
              scaleY: [0.8, 1.2, 0.8],
              filter: [
                `hue-rotate(${i * 30}deg) brightness(1)`,
                `hue-rotate(${i * 30 + 180}deg) brightness(1.5)`,
                `hue-rotate(${i * 30 + 360}deg) brightness(1)`,
              ],
            }}
            transition={{
              duration: 5 + i * 0.2,
              repeat: Infinity,
              delay: i * 0.1,
              ease: "easeInOut",
            }}
          />
        ))}

        {/* Quantum Particles Storm */}
        {isClient &&
          quantumParticles.map((particle, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full pointer-events-none"
              style={{
                width: `${particle.width}px`,
                height: `${particle.height}px`,
                background: `hsl(${(i * 20 + 200) % 360}, 80%, ${
                  particle.brightness
                }%)`,
                left: `${particle.left}%`,
                top: `${particle.top}%`,
                boxShadow: `0 0 ${particle.boxShadow}px currentColor`,
              }}
              animate={{
                y: [0, particle.yOffset, 0],
                x: [0, particle.xOffset, 0],
                opacity: [0.2, 0.9, 0.2],
                scale: [1, particle.scale, 1],
                rotate: [0, 360],
              }}
              transition={{
                duration: particle.duration,
                repeat: Infinity,
                delay: i * 0.1,
                ease: "easeInOut",
              }}
            />
          ))}

        {/* Holographic Scan Lines */}
        <motion.div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `repeating-linear-gradient(
              0deg,
              transparent,
              transparent 4px,
              rgba(59, 130, 246, 0.03) 4px,
              rgba(59, 130, 246, 0.03) 8px
            )`,
          }}
          animate={{
            backgroundPosition: ["0px 0px", "0px 40px"],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      </div>

      {/* Spotlight Effects */}
      <CustomSpotlight
        className="absolute -top-40 left-0 md:left-60"
        fill={
          theme === "dark"
            ? "rgba(59, 130, 246, 0.25)"
            : "rgba(59, 130, 246, 0.25)"
        }
      />
      <CustomSpotlight
        className="absolute -top-40 right-0 md:right-60"
        fill={
          theme === "dark"
            ? "rgba(147, 51, 234, 0.25)"
            : "rgba(168, 85, 247, 0.25)"
        }
      />

      {/* MAIN CONTENT */}
      <div className="relative z-10 pt-10 pb-16">
        <div className="max-w-7xl mx-auto px-6">
          {/* HYPER-FUTURISTIC HEADER */}
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: -80 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
          >
            {/* Navigation Portal */}
            <Link href="/#projects">
              <motion.div
                className="inline-flex items-center gap-4 mb-12 px-8 py-4 rounded-full transition-all duration-500 group"
                style={{
                  background:
                    "linear-gradient(135deg, rgba(59, 130, 246, 0.15), rgba(147, 51, 234, 0.15))",
                  backdropFilter: "blur(20px) saturate(200%)",
                  border: "1px solid rgba(255, 255, 255, 0.1)",
                  boxShadow:
                    "0 20px 40px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.2)",
                }}
                whileHover={{
                  scale: 1.05,
                  x: -15,
                  boxShadow:
                    "0 25px 50px rgba(59, 130, 246, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.3)",
                }}
                whileTap={{ scale: 0.95 }}
              >
                <motion.div
                  className="p-2 rounded-full bg-gradient-to-r from-blue-500 to-purple-500"
                  animate={{
                    rotate: [0, -10, 10, 0],
                    scale: [1, 1.1, 1],
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <IoArrowBackOutline className="text-white" size={18} />
                </motion.div>
                <span className="text-sm font-medium opacity-90 group-hover:opacity-100 transition-opacity">
                  Return to Command Center
                </span>
                <motion.div
                  animate={{
                    scale: [1, 1.3, 1],
                    opacity: [0.5, 1, 0.5],
                  }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  <RiCircuitLine className="text-blue-400" size={16} />
                </motion.div>
              </motion.div>
            </Link>

            {/* Ultimate Title System */}
            <motion.div
              className="relative mb-12"
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1, type: "spring", bounce: 0.4 }}
            >
              <motion.h1
                className="text-7xl md:text-9xl lg:text-[12rem] font-black relative z-10 leading-none"
                style={{
                  background:
                    "linear-gradient(45deg, #3b82f6, #9333ea, #ec4899, #06b6d4, #3b82f6)",
                  backgroundSize: "400% 400%",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                  textShadow: "0 0 100px rgba(59, 130, 246, 0.5)",
                  filter: "drop-shadow(0 0 20px rgba(147, 51, 234, 0.3))",
                }}
                animate={{
                  backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                NEXUS
              </motion.h1>

              {/* Holographic Echo */}
              <motion.h1
                className="absolute inset-0 text-7xl md:text-9xl lg:text-[12rem] font-black text-blue-400/20 blur-sm leading-none"
                animate={{
                  scale: [1, 1.03, 1],
                  opacity: [0.2, 0.5, 0.2],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                NEXUS
              </motion.h1>
            </motion.div>

            <motion.div
              className="text-xl md:text-2xl max-w-5xl mx-auto mb-20 opacity-90"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 0.9, y: 0 }}
              transition={{ duration: 1, delay: 0.3 }}
            >
              <TextGenerateEffect
                words="Enter the quantum realm where innovation transcends reality. Each project is a gateway to the future, engineered with cosmic precision and interdimensional creativity."
                className="text-lg md:text-xl leading-relaxed bg-gradient-to-r from-gray-300 via-white to-gray-300 bg-clip-text text-transparent"
              />
            </motion.div>

            {/* Quantum Stats Command Center */}
            <motion.div
              className="grid grid-cols-2 lg:grid-cols-4 gap-4 max-w-5xl mx-auto"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.6 }}
            >
              {[
                {
                  icon: RiSpaceShipLine,
                  value: projects.length,
                  label: "Quantum Projects",
                  color: "from-blue-400 to-cyan-400",
                  bg: "rgba(59, 130, 246, 0.1)",
                },
                {
                  icon: RiCpuLine,
                  value: allTechnologies.length,
                  label: "Neural Networks",
                  color: "from-purple-400 to-pink-400",
                  bg: "rgba(147, 51, 234, 0.1)",
                },
                {
                  icon: RiPlanetLine,
                  value: projects.filter((p) => p.link).length,
                  label: "Live Portals",
                  color: "from-green-400 to-emerald-400",
                  bg: "rgba(34, 197, 94, 0.1)",
                },
                {
                  icon: IoInfiniteOutline,
                  value: "∞",
                  label: "Possibilities",
                  color: "from-orange-400 to-red-400",
                  bg: "rgba(249, 115, 22, 0.1)",
                },
              ].map((stat, index) => (
                <motion.div
                  key={stat.label}
                  className="relative group"
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.8 + index * 0.1 }}
                  whileHover={{ scale: 1.05, y: -5 }}
                >
                  <div
                    className="relative p-6 rounded-2xl backdrop-blur-xl border transition-all duration-500"
                    style={{
                      background: `linear-gradient(135deg, ${stat.bg}, rgba(255, 255, 255, 0.05))`,
                      borderColor: "rgba(255, 255, 255, 0.15)",
                      boxShadow:
                        "0 15px 35px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.2)",
                    }}
                  >
                    <motion.div
                      className={`text-4xl mb-4 bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`}
                      animate={{
                        scale: [1, 1.2, 1],
                        rotate: stat.value === "∞" ? [0, 360] : [0, 10, -10, 0],
                      }}
                      transition={{
                        duration: stat.value === "∞" ? 8 : 3,
                        repeat: Infinity,
                        ease: stat.value === "∞" ? "linear" : "easeInOut",
                        delay: index * 0.2,
                      }}
                    >
                      <stat.icon />
                    </motion.div>

                    <motion.div
                      className={`text-3xl font-bold mb-2 bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`}
                      animate={{
                        scale: [1, 1.05, 1],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        delay: index * 0.3,
                      }}
                    >
                      {stat.value}
                    </motion.div>

                    <div className="text-sm opacity-70 font-medium">
                      {stat.label}
                    </div>

                    {/* Quantum Glow Effect */}
                    <motion.div
                      className="absolute inset-0 rounded-2xl pointer-events-none"
                      style={{
                        background: `linear-gradient(135deg, ${stat.bg}, transparent)`,
                        opacity: 0,
                      }}
                      animate={{
                        opacity: [0, 0.3, 0],
                        scale: [1, 1.05, 1],
                      }}
                      transition={{
                        duration: 4,
                        repeat: Infinity,
                        delay: index * 0.5,
                      }}
                    />
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* QUANTUM CONTROL INTERFACE */}
          <motion.div
            className="mb-12"
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1 }}
          >
            {/* Advanced Control Matrix */}
            <div className="flex flex-col xl:flex-row gap-4 mb-6">
              {/* Quantum Search Module */}
              <motion.div
                className="flex-1 relative group"
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div
                  className="relative backdrop-blur-xl rounded-2xl p-6 transition-all duration-500"
                  style={{
                    background:
                      "linear-gradient(135deg, rgba(59, 130, 246, 0.1), rgba(147, 51, 234, 0.1))",
                    border: "1px solid rgba(255, 255, 255, 0.15)",
                    boxShadow:
                      "0 20px 40px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.2)",
                  }}
                >
                  <div className="flex items-center gap-4 mb-4">
                    <motion.div
                      animate={{ rotate: 360, scale: [1, 1.2, 1] }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                    >
                      <RiRadarLine className="text-blue-400 text-2xl" />
                    </motion.div>
                    <h3 className="font-bold text-lg">
                      Neural Search Interface
                    </h3>
                    <motion.div
                      className="w-2 h-2 bg-blue-400 rounded-full"
                      animate={{ opacity: [0.3, 1, 0.3], scale: [1, 1.5, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                  </div>

                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Search across quantum dimensions..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className={`w-full px-6 py-4 rounded-xl backdrop-blur-sm border-2 transition-all duration-300 ${
                        theme === "dark"
                          ? "bg-black/20 border-white/20 text-white placeholder-gray-400 focus:border-blue-400 focus:bg-black/30"
                          : "bg-white/30 border-black/20 text-black placeholder-gray-600 focus:border-blue-600 focus:bg-white/50"
                      } focus:outline-none focus:ring-2 focus:ring-blue-500/30 font-medium`}
                      style={{
                        boxShadow:
                          "inset 0 2px 4px rgba(0, 0, 0, 0.1), 0 8px 16px rgba(0, 0, 0, 0.1)",
                      }}
                    />
                    <motion.div
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 text-blue-400"
                      animate={{
                        rotate: searchTerm ? [0, 360] : [0, 15, -15, 0],
                        scale: searchTerm ? [1, 1.3, 1] : [1, 1.1, 1],
                      }}
                      transition={{
                        duration: searchTerm ? 0.8 : 2,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                    >
                      <IoSearchOutline size={20} />
                    </motion.div>
                  </div>
                </div>
              </motion.div>

              {/* Control Panel */}
              <motion.div
                className="flex gap-3"
                initial={{ opacity: 0, x: 60 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 1.2 }}
              >
                {/* View Mode Matrix */}
                <div
                  className="flex p-2 rounded-xl backdrop-blur-xl"
                  style={{
                    background:
                      "linear-gradient(135deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.05))",
                    border: "1px solid rgba(255, 255, 255, 0.15)",
                    boxShadow: "0 8px 16px rgba(0, 0, 0, 0.1)",
                  }}
                >
                  {[
                    { mode: "grid", icon: IoGridOutline, label: "Matrix Grid" },
                    { mode: "list", icon: IoListOutline, label: "Data Stream" },
                  ].map((option) => (
                    <motion.button
                      key={option.mode}
                      onClick={() =>
                        setViewMode(option.mode as "grid" | "list")
                      }
                      className={`relative p-3 rounded-lg transition-all duration-300 ${
                        viewMode === option.mode
                          ? "text-white"
                          : "text-gray-400 hover:text-white"
                      }`}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      title={option.label}
                    >
                      {viewMode === option.mode && (
                        <motion.div
                          layoutId="viewModeIndicator"
                          className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ duration: 0.3 }}
                          style={{
                            boxShadow: "0 0 20px rgba(59, 130, 246, 0.5)",
                          }}
                        />
                      )}
                      <option.icon className="relative z-10" size={20} />
                    </motion.button>
                  ))}
                </div>

                {/* Sort Quantum Selector */}
                <motion.select
                  value={sortBy}
                  onChange={(e) =>
                    setSortBy(e.target.value as "name" | "date" | "tech")
                  }
                  className={`px-4 py-3 rounded-xl backdrop-blur-xl border-2 transition-all duration-300 font-medium ${
                    theme === "dark"
                      ? "bg-black/20 border-white/20 text-white focus:border-blue-400 focus:bg-black/30"
                      : "bg-white/30 border-black/20 text-black focus:border-blue-600 focus:bg-white/50"
                  } focus:outline-none focus:ring-2 focus:ring-blue-500/30 cursor-pointer`}
                  whileHover={{ scale: 1.02 }}
                  style={{
                    boxShadow:
                      "0 8px 16px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.1)",
                  }}
                >
                  <option value="name">Sort by Designation</option>
                  <option value="date">Sort by Timeline</option>
                  <option value="tech">Sort by Complexity</option>
                </motion.select>

                {/* Filter Portal Toggle */}
                <motion.button
                  onClick={() => setShowFilters(!showFilters)}
                  className={`p-3 rounded-xl backdrop-blur-xl border-2 transition-all duration-300 ${
                    showFilters
                      ? "text-white border-purple-500/50"
                      : "text-gray-400 hover:text-white border-white/20 hover:border-white/30"
                  }`}
                  style={{
                    background: showFilters
                      ? "linear-gradient(135deg, rgba(147, 51, 234, 0.3), rgba(236, 72, 153, 0.3))"
                      : "rgba(255, 255, 255, 0.05)",
                    boxShadow: showFilters
                      ? "0 0 30px rgba(147, 51, 234, 0.4)"
                      : "0 8px 16px rgba(0, 0, 0, 0.1)",
                  }}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <motion.div
                    animate={{ rotate: showFilters ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <IoFilterOutline size={20} />
                  </motion.div>
                </motion.button>
              </motion.div>
            </div>

            {/* Quantum Filter Interface */}
            <AnimatePresence>
              {showFilters && (
                <motion.div
                  initial={{ opacity: 0, height: 0, y: -30 }}
                  animate={{ opacity: 1, height: "auto", y: 0 }}
                  exit={{ opacity: 0, height: 0, y: -30 }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                  className="overflow-hidden"
                >
                  <div
                    className="p-6 rounded-2xl backdrop-blur-xl border"
                    style={{
                      background:
                        "linear-gradient(135deg, rgba(147, 51, 234, 0.1), rgba(236, 72, 153, 0.1))",
                      borderColor: "rgba(255, 255, 255, 0.15)",
                      boxShadow:
                        "0 20px 40px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.2)",
                    }}
                  >
                    <div className="flex items-center gap-4 mb-6">
                      <motion.div
                        animate={{ rotate: [0, 360] }}
                        transition={{
                          duration: 4,
                          repeat: Infinity,
                          ease: "linear",
                        }}
                      >
                        <RiCircleLine className="text-purple-400 text-2xl" />
                      </motion.div>
                      <h3 className="font-bold text-lg">
                        Dimensional Filter Matrix
                      </h3>
                      <div
                        className="text-sm px-3 py-1 rounded-full font-medium"
                        style={{
                          background: "rgba(147, 51, 234, 0.2)",
                          color: "#a855f7",
                        }}
                      >
                        {filteredProjects.length} of {projects.length}{" "}
                        dimensions active
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      <motion.button
                        onClick={() => setSelectedTech("All")}
                        className={`px-5 py-3 rounded-full text-sm font-bold transition-all duration-300 ${
                          selectedTech === "All"
                            ? "text-white shadow-2xl"
                            : `${
                                theme === "dark"
                                  ? "text-gray-300 hover:text-white"
                                  : "text-gray-700 hover:text-black"
                              } hover:shadow-lg`
                        }`}
                        style={{
                          background:
                            selectedTech === "All"
                              ? "linear-gradient(135deg, #3b82f6, #8b5cf6)"
                              : "rgba(255, 255, 255, 0.1)",
                          border:
                            selectedTech === "All"
                              ? "1px solid rgba(59, 130, 246, 0.5)"
                              : "1px solid rgba(255, 255, 255, 0.1)",
                          boxShadow:
                            selectedTech === "All"
                              ? "0 0 30px rgba(59, 130, 246, 0.4)"
                              : "none",
                          backdropFilter: "blur(10px)",
                        }}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        All Dimensions ({projects.length})
                      </motion.button>

                      {allTechnologies.map((tech, index) => (
                        <motion.button
                          key={tech.name}
                          onClick={() => setSelectedTech(tech.name)}
                          className={`px-4 py-3 rounded-full text-sm font-bold transition-all duration-300 flex items-center gap-2 ${
                            selectedTech === tech.name
                              ? "text-white shadow-2xl"
                              : `${
                                  theme === "dark"
                                    ? "text-gray-300 hover:text-white"
                                    : "text-gray-700 hover:text-black"
                                } hover:shadow-lg`
                          }`}
                          style={{
                            background:
                              selectedTech === tech.name
                                ? "linear-gradient(135deg, #8b5cf6, #ec4899)"
                                : "rgba(255, 255, 255, 0.1)",
                            border:
                              selectedTech === tech.name
                                ? "1px solid rgba(139, 92, 246, 0.5)"
                                : "1px solid rgba(255, 255, 255, 0.1)",
                            boxShadow:
                              selectedTech === tech.name
                                ? "0 0 30px rgba(139, 92, 246, 0.4)"
                                : "none",
                            backdropFilter: "blur(10px)",
                          }}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          initial={{ opacity: 0, x: -30 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.4, delay: index * 0.03 }}
                        >
                          <span>{tech.name}</span>
                          <motion.span
                            className="text-xs px-2 py-1 rounded-full bg-white/30 font-bold"
                            animate={{ scale: [1, 1.15, 1] }}
                            transition={{
                              duration: 2,
                              repeat: Infinity,
                              delay: index * 0.1,
                            }}
                          >
                            {tech.count}
                          </motion.span>
                        </motion.button>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* QUANTUM PROJECTS MATRIX */}
          <AnimatePresence mode="wait">
            <motion.div
              key={`${viewMode}-${selectedTech}-${searchTerm}-${sortBy}`}
              initial={{ opacity: 0, y: 80 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -80 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className={
                viewMode === "grid"
                  ? "grid grid-cols-1 lg:grid-cols-2 gap-6"
                  : "space-y-6"
              }
            >
              {filteredProjects.length > 0 ? (
                filteredProjects.map((project, index) => (
                  <motion.div
                    key={project.name}
                    initial={{ opacity: 0, y: 100, scale: 0.8 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{
                      duration: 0.8,
                      delay: index * 0.1,
                      type: "spring",
                      stiffness: 100,
                    }}
                    className={viewMode === "list" ? "max-w-6xl mx-auto" : ""}
                  >
                    <ProjectCard project={project} />
                  </motion.div>
                ))
              ) : (
                <motion.div
                  className="col-span-full text-center py-40"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 1 }}
                >
                  <motion.div
                    className="text-9xl mb-8"
                    animate={{
                      rotate: [0, 10, -10, 0],
                      scale: [1, 1.1, 1],
                    }}
                    transition={{ duration: 3, repeat: Infinity }}
                  >
                    <RiFocus3Line className="mx-auto text-purple-400" />
                  </motion.div>

                  <h3 className="text-5xl font-bold mb-6 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-400 bg-clip-text text-transparent">
                    No Signals in This Dimension
                  </h3>

                  <p className="text-xl text-gray-500 mb-10 max-w-2xl mx-auto leading-relaxed">
                    The quantum search matrix found no matching frequencies.
                    Recalibrate your parameters to explore different dimensional
                    layers.
                  </p>

                  <motion.button
                    onClick={() => {
                      setSearchTerm("");
                      setSelectedTech("All");
                    }}
                    className="px-10 py-4 rounded-2xl font-bold text-lg transition-all duration-300"
                    style={{
                      background: "linear-gradient(135deg, #3b82f6, #8b5cf6)",
                      boxShadow: "0 20px 40px rgba(59, 130, 246, 0.3)",
                    }}
                    whileHover={{
                      scale: 1.05,
                      boxShadow: "0 25px 50px rgba(59, 130, 246, 0.4)",
                    }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Reset Dimensional Matrix
                  </motion.button>
                </motion.div>
              )}
            </motion.div>
          </AnimatePresence>

          {/* Quantum Status Display */}
          {filteredProjects.length > 0 && (
            <motion.div
              className="text-center mt-20 opacity-70"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.7 }}
              transition={{ duration: 1, delay: 1.5 }}
            >
              <motion.div
                className="inline-flex items-center gap-4 px-8 py-4 rounded-full backdrop-blur-sm border"
                style={{
                  background: "rgba(255, 255, 255, 0.05)",
                  borderColor: "rgba(255, 255, 255, 0.1)",
                }}
                animate={{
                  boxShadow: [
                    "0 0 20px rgba(0,0,0,0.1)",
                    "0 0 40px rgba(59,130,246,0.2)",
                    "0 0 20px rgba(0,0,0,0.1)",
                  ],
                }}
                transition={{ duration: 4, repeat: Infinity }}
              >
                <motion.div
                  className="w-3 h-3 bg-green-400 rounded-full"
                  animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
                <span className="font-medium">
                  Matrix Active: {filteredProjects.length} of {projects.length}{" "}
                  quantum projects synchronized
                </span>
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
                >
                  <RiSparklingLine className="text-blue-400" />
                </motion.div>
              </motion.div>
            </motion.div>
          )}
        </div>
      </div>

      {/* Quantum Atmosphere */}
      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-full h-40 bg-gradient-to-t from-blue-500/10 via-purple-500/5 to-transparent blur-3xl" />
    </div>
  );
};

export default AllProjectsPage;
