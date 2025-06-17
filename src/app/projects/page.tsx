"use client";

import ProjectCard from "@/components/ProjectCard";
import { Project } from "@/components/Projects";
import { Spotlight } from "@/components/ui/Spotlight";
import { TextGenerateEffect } from "@/components/ui/text-generate-effect";
import { ThemeContext } from "@/providers/ThemeProvider";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import {
  IoArrowBackOutline,
  IoCodeSlashOutline,
  IoFilterOutline,
  IoGlobeOutline,
  IoGridOutline,
  IoListOutline,
  IoRocketOutline,
  IoSearchOutline,
  IoStatsChartOutline,
} from "react-icons/io5";

interface ProjectData {
  projects: Project[];
}

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

    // Filter by search term
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

    // Filter by technology
    if (selectedTech !== "All") {
      filtered = filtered.filter((project) =>
        project.tech_stack?.includes(selectedTech)
      );
    }

    // Sort projects
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
        {/* Loading Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-cyan-500/10" />

        {/* Loading Animation */}
        <motion.div className="relative z-10 flex flex-col items-center space-y-8">
          {/* Holographic Loading Ring */}
          <div className="relative w-32 h-32">
            <motion.div
              className="absolute inset-0 rounded-full border-4 border-blue-500/30"
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            />
            <motion.div
              className="absolute inset-2 rounded-full border-4 border-purple-500/50 border-t-transparent"
              animate={{ rotate: -360 }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
            />
            <motion.div
              className="absolute inset-4 rounded-full border-4 border-cyan-500/70 border-t-transparent border-r-transparent"
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            />

            {/* Center Pulse */}
            <motion.div
              className="absolute inset-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-500"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.5, 1, 0.5],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          </div>

          {/* Loading Text */}
          <motion.div
            className="text-center space-y-4"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
              Initializing Project Matrix
            </h2>
            <div className="flex items-center space-x-2 text-sm opacity-70">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              >
                ⚡
              </motion.div>
              <span>Loading quantum data streams...</span>
            </div>
          </motion.div>

          {/* Loading Progress Bar */}
          <div className="w-64 h-2 bg-white/10 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-500"
              animate={{
                x: [-256, 256],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              style={{ width: "50%" }}
            />
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
      {/* FUTURISTIC BACKGROUND SYSTEM */}

      {/* Primary Gradient Layer */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-purple-500/10 to-cyan-500/5" />

      {/* Animated Neural Network Background */}
      <div className="absolute inset-0 opacity-20">
        <motion.div
          className="w-full h-full"
          animate={{
            backgroundPosition: ["0% 0%", "100% 100%"],
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: "linear",
          }}
          style={{
            backgroundImage: `
              radial-gradient(circle at 20% 20%, rgba(59, 130, 246, 0.15) 0%, transparent 40%),
              radial-gradient(circle at 80% 80%, rgba(147, 51, 234, 0.15) 0%, transparent 40%),
              radial-gradient(circle at 40% 60%, rgba(6, 182, 212, 0.1) 0%, transparent 40%),
              radial-gradient(circle at 60% 40%, rgba(236, 72, 153, 0.1) 0%, transparent 40%)
            `,
            backgroundSize: "800px 800px",
          }}
        />
      </div>

      {/* Hexagonal Grid Pattern */}
      <div className="absolute inset-0 opacity-10">
        <motion.div
          className="w-full h-full"
          animate={{
            backgroundPosition: ["0px 0px", "60px 35px"],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          }}
          style={{
            backgroundImage: `
              linear-gradient(30deg, rgba(59, 130, 246, 0.3) 12%, transparent 12.5%, transparent 87%, rgba(59, 130, 246, 0.3) 87.5%, rgba(59, 130, 246, 0.3)),
              linear-gradient(150deg, rgba(59, 130, 246, 0.3) 12%, transparent 12.5%, transparent 87%, rgba(59, 130, 246, 0.3) 87.5%, rgba(59, 130, 246, 0.3)),
              linear-gradient(30deg, rgba(59, 130, 246, 0.3) 12%, transparent 12.5%, transparent 87%, rgba(59, 130, 246, 0.3) 87.5%, rgba(59, 130, 246, 0.3)),
              linear-gradient(150deg, rgba(59, 130, 246, 0.3) 12%, transparent 12.5%, transparent 87%, rgba(59, 130, 246, 0.3) 87.5%, rgba(59, 130, 246, 0.3))
            `,
            backgroundSize: "60px 35px",
            backgroundPosition: "0 0, 0 0, 30px 15px, 30px 15px",
          }}
        />
      </div>

      {/* Spotlight Effects */}
      <Spotlight
        className="hidden md:block -top-40 left-0 md:left-60"
        fill={
          theme === "dark"
            ? "rgba(30, 64, 175, 0.2)"
            : "rgba(59, 130, 246, 0.2)"
        }
      />
      <Spotlight
        className="hidden lg:block -top-40 right-0 md:right-60"
        fill={
          theme === "dark"
            ? "rgba(147, 51, 234, 0.2)"
            : "rgba(168, 85, 247, 0.2)"
        }
      />
      <Spotlight
        className="hidden xl:block top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
        fill={
          theme === "dark"
            ? "rgba(6, 182, 212, 0.15)"
            : "rgba(8, 145, 178, 0.15)"
        }
      />

      {/* Quantum Particles System */}
      {[...Array(25)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full pointer-events-none"
          style={{
            width: `${Math.random() * 4 + 1}px`,
            height: `${Math.random() * 4 + 1}px`,
            background: `hsl(${(i * 15 + 180) % 360}, 70%, ${
              50 + Math.random() * 30
            }%)`,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            filter: "blur(0.5px)",
            boxShadow: `0 0 ${Math.random() * 10 + 5}px hsl(${
              (i * 15 + 180) % 360
            }, 70%, 50%)`,
          }}
          animate={{
            y: [0, -100 - Math.random() * 50, 0],
            x: [0, Math.sin(i) * 80 + Math.random() * 40, 0],
            opacity: [0.2, 0.8, 0.2],
            scale: [1, 1.5 + Math.random(), 1],
          }}
          transition={{
            duration: 12 + i * 0.5 + Math.random() * 5,
            repeat: Infinity,
            delay: i * 0.2,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* Data Streams */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={`stream-${i}`}
          className="absolute w-px opacity-30"
          style={{
            height: "100vh",
            left: `${15 + i * 15}%`,
            background: `linear-gradient(to bottom, transparent, rgba(59, 130, 246, 0.5), transparent)`,
          }}
          animate={{
            opacity: [0.1, 0.5, 0.1],
            scaleY: [1, 1.2, 1],
          }}
          transition={{
            duration: 3 + i * 0.5,
            repeat: Infinity,
            delay: i * 0.3,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* MAIN CONTENT */}
      <div className="relative z-10 pt-20 pb-16">
        <div className="max-w-7xl mx-auto px-6">
          {/* HERO HEADER SECTION */}
          <motion.div
            className="text-center mb-20"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            {/* Navigation Breadcrumb */}
            <Link href="/#projects">
              <motion.div
                className="inline-flex items-center gap-3 mb-12 text-sm px-6 py-3 rounded-full backdrop-blur-xl border transition-all duration-300"
                style={{
                  background: "rgba(255, 255, 255, 0.08)",
                  borderColor: "rgba(255, 255, 255, 0.12)",
                  boxShadow: "0 8px 32px rgba(0, 0, 0, 0.1)",
                }}
                whileHover={{
                  scale: 1.05,
                  x: -10,
                  boxShadow: "0 12px 40px rgba(59, 130, 246, 0.2)",
                }}
                whileTap={{ scale: 0.95 }}
              >
                <motion.div
                  animate={{ x: [0, -3, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  <IoArrowBackOutline className="text-blue-400" size={16} />
                </motion.div>
                <span className="opacity-80 hover:opacity-100 transition-opacity">
                  Back to Portfolio Hub
                </span>
                <div className="w-1 h-1 bg-blue-400 rounded-full animate-pulse" />
              </motion.div>
            </Link>

            {/* Main Title with Holographic Effect */}
            <motion.div
              className="relative mb-8"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8, type: "spring", bounce: 0.3 }}
            >
              <motion.h1
                className={`text-6xl md:text-8xl lg:text-9xl font-black relative z-10 ${
                  theme === "dark"
                    ? "text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-500 to-cyan-400"
                    : "text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600"
                }`}
                animate={{
                  backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                style={{
                  backgroundSize: "300% 300%",
                  textShadow: "0 0 50px rgba(59, 130, 246, 0.3)",
                }}
              >
                PROJECT
              </motion.h1>

              {/* Holographic Overlay */}
              <motion.h1
                className="absolute inset-0 text-6xl md:text-8xl lg:text-9xl font-black text-blue-400/20 blur-sm"
                animate={{
                  scale: [1, 1.02, 1],
                  opacity: [0.2, 0.4, 0.2],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                PROJECT
              </motion.h1>
            </motion.div>

            <motion.div
              className="relative mb-8"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{
                duration: 0.8,
                delay: 0.2,
                type: "spring",
                bounce: 0.3,
              }}
            >
              <motion.h2
                className={`text-4xl md:text-6xl lg:text-7xl font-black ${
                  theme === "dark"
                    ? "text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-400"
                    : "text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 via-purple-600 to-pink-600"
                }`}
                animate={{
                  backgroundPosition: ["100% 50%", "0% 50%", "100% 50%"],
                }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                style={{
                  backgroundSize: "300% 300%",
                  textShadow: "0 0 30px rgba(147, 51, 234, 0.3)",
                }}
              >
                NEXUS
              </motion.h2>
            </motion.div>

            {/* Subtitle with Typewriter Effect */}
            <motion.div
              className="text-xl md:text-2xl max-w-4xl mx-auto mb-16 opacity-80"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 0.8, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              <TextGenerateEffect
                words="Welcome to the quantum realm of innovation. Each project represents a breakthrough in digital architecture, engineered with precision and futuristic vision to shape tomorrow's digital landscape."
                className="text-lg md:text-xl leading-relaxed"
              />
            </motion.div>

            {/* Quantum Stats Dashboard */}
            <motion.div
              className="grid grid-cols-2 lg:grid-cols-4 gap-6 max-w-4xl mx-auto"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              {[
                {
                  icon: IoRocketOutline,
                  value: projects.length,
                  label: "Live Projects",
                  color: "from-blue-400 to-cyan-400",
                  delay: 0,
                },
                {
                  icon: IoCodeSlashOutline,
                  value: allTechnologies.length,
                  label: "Technologies",
                  color: "from-purple-400 to-pink-400",
                  delay: 0.2,
                },
                {
                  icon: IoGlobeOutline,
                  value: projects.filter((p) => p.link).length,
                  label: "Deployed",
                  color: "from-green-400 to-emerald-400",
                  delay: 0.4,
                },
                {
                  icon: IoStatsChartOutline,
                  value: "∞",
                  label: "Innovation",
                  color: "from-orange-400 to-red-400",
                  delay: 0.6,
                },
              ].map((stat, index) => (
                <motion.div
                  key={stat.label}
                  className="relative group"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: stat.delay }}
                >
                  <div
                    className="relative p-6 rounded-2xl backdrop-blur-xl border transition-all duration-500 group-hover:scale-105"
                    style={{
                      background: "rgba(255, 255, 255, 0.05)",
                      borderColor: "rgba(255, 255, 255, 0.1)",
                      boxShadow: "0 8px 32px rgba(0, 0, 0, 0.1)",
                    }}
                  >
                    {/* Animated Background Glow */}
                    <motion.div
                      className={`absolute inset-0 rounded-2xl bg-gradient-to-r ${stat.color} opacity-0 group-hover:opacity-20 transition-opacity duration-500`}
                      animate={{
                        scale: [1, 1.05, 1],
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        delay: index * 0.5,
                      }}
                    />

                    <motion.div
                      className={`text-3xl mb-3 bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`}
                      animate={{
                        scale: [1, 1.1, 1],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        delay: index * 0.3,
                      }}
                    >
                      <stat.icon />
                    </motion.div>

                    <motion.div
                      className={`text-3xl lg:text-4xl font-bold mb-2 bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`}
                      animate={
                        stat.value !== "∞"
                          ? {
                              scale: [1, 1.05, 1],
                            }
                          : {
                              rotate: [0, 360],
                            }
                      }
                      transition={{
                        duration: stat.value !== "∞" ? 2 : 8,
                        repeat: Infinity,
                        ease: stat.value !== "∞" ? "easeInOut" : "linear",
                      }}
                    >
                      {stat.value}
                    </motion.div>

                    <div className="text-sm opacity-70 font-medium">
                      {stat.label}
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* QUANTUM CONTROL PANEL */}
          <motion.div
            className="mb-16"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
          >
            {/* Main Controls Row */}
            <div className="flex flex-col xl:flex-row gap-6 mb-8">
              {/* Advanced Search Module */}
              <motion.div
                className="flex-1 relative group"
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div
                  className="relative backdrop-blur-xl border rounded-2xl p-6 transition-all duration-500"
                  style={{
                    background: "rgba(255, 255, 255, 0.08)",
                    borderColor: "rgba(255, 255, 255, 0.12)",
                    boxShadow: "0 8px 32px rgba(0, 0, 0, 0.1)",
                  }}
                >
                  <div className="flex items-center gap-4 mb-4">
                    <IoSearchOutline className="text-blue-400 text-xl" />
                    <h3 className="font-semibold text-lg">Quantum Search</h3>
                    <motion.div
                      className="w-2 h-2 bg-blue-400 rounded-full"
                      animate={{ opacity: [0.5, 1, 0.5] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                  </div>

                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Search projects, technologies, or descriptions..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className={`w-full px-4 py-3 rounded-xl backdrop-blur-sm border transition-all duration-300 ${
                        theme === "dark"
                          ? "bg-white/5 border-white/20 text-white placeholder-gray-400 focus:border-blue-400"
                          : "bg-black/5 border-black/20 text-black placeholder-gray-600 focus:border-blue-600"
                      } focus:outline-none focus:ring-2 focus:ring-blue-500/20`}
                    />
                    <motion.div
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 text-blue-400"
                      animate={{
                        rotate: searchTerm ? [0, 360] : [0, 15, -15, 0],
                        scale: searchTerm ? [1, 1.2, 1] : 1,
                      }}
                      transition={{
                        duration: searchTerm ? 0.5 : 2,
                        repeat: searchTerm ? 1 : Infinity,
                      }}
                    >
                      <IoSearchOutline />
                    </motion.div>
                  </div>
                </div>
              </motion.div>

              {/* View & Sort Controls */}
              <motion.div
                className="flex gap-4"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 1.2 }}
              >
                {/* View Mode Selector */}
                <div
                  className="flex p-2 rounded-xl backdrop-blur-xl border"
                  style={{
                    background: "rgba(255, 255, 255, 0.05)",
                    borderColor: "rgba(255, 255, 255, 0.1)",
                  }}
                >
                  {[
                    { mode: "grid", icon: IoGridOutline, label: "Grid" },
                    { mode: "list", icon: IoListOutline, label: "List" },
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
                    >
                      {viewMode === option.mode && (
                        <motion.div
                          layoutId="viewModeIndicator"
                          className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ duration: 0.3 }}
                        />
                      )}
                      <option.icon className="relative z-10" size={20} />
                    </motion.button>
                  ))}
                </div>

                {/* Sort Selector */}
                <motion.select
                  value={sortBy}
                  onChange={(e) =>
                    setSortBy(e.target.value as "name" | "date" | "tech")
                  }
                  className={`px-4 py-3 rounded-xl backdrop-blur-xl border transition-all duration-300 ${
                    theme === "dark"
                      ? "bg-white/5 border-white/20 text-white"
                      : "bg-black/5 border-black/20 text-black"
                  } focus:outline-none focus:ring-2 focus:ring-blue-500/20 cursor-pointer`}
                  whileHover={{ scale: 1.05 }}
                  style={{
                    boxShadow: "0 8px 32px rgba(0, 0, 0, 0.1)",
                  }}
                >
                  <option value="name">Sort by Name</option>
                  <option value="date">Sort by Date</option>
                  <option value="tech">Sort by Tech Stack</option>
                </motion.select>

                {/* Filter Toggle */}
                <motion.button
                  onClick={() => setShowFilters(!showFilters)}
                  className={`p-3 rounded-xl backdrop-blur-xl border transition-all duration-300 ${
                    showFilters
                      ? "text-white bg-gradient-to-r from-purple-500 to-blue-500"
                      : "text-gray-400 hover:text-white"
                  }`}
                  style={{
                    borderColor: "rgba(255, 255, 255, 0.1)",
                    boxShadow: "0 8px 32px rgba(0, 0, 0, 0.1)",
                  }}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <IoFilterOutline size={20} />
                </motion.button>
              </motion.div>
            </div>

            {/* Technology Filter Panel */}
            <AnimatePresence>
              {showFilters && (
                <motion.div
                  initial={{ opacity: 0, height: 0, y: -20 }}
                  animate={{ opacity: 1, height: "auto", y: 0 }}
                  exit={{ opacity: 0, height: 0, y: -20 }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                  className="overflow-hidden"
                >
                  <div
                    className="p-6 rounded-2xl backdrop-blur-xl border"
                    style={{
                      background: "rgba(255, 255, 255, 0.05)",
                      borderColor: "rgba(255, 255, 255, 0.1)",
                      boxShadow: "0 8px 32px rgba(0, 0, 0, 0.1)",
                    }}
                  >
                    <div className="flex items-center gap-3 mb-6">
                      <motion.div
                        animate={{ rotate: [0, 360] }}
                        transition={{
                          duration: 3,
                          repeat: Infinity,
                          ease: "linear",
                        }}
                      >
                        <IoFilterOutline className="text-purple-400 text-xl" />
                      </motion.div>
                      <h3 className="font-semibold text-lg">
                        Technology Matrix
                      </h3>
                      <div className="text-sm opacity-60">
                        ({filteredProjects.length} of {projects.length}{" "}
                        projects)
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-3">
                      <motion.button
                        onClick={() => setSelectedTech("All")}
                        className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                          selectedTech === "All"
                            ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg"
                            : `${
                                theme === "dark"
                                  ? "bg-white/10 text-gray-300 hover:bg-white/20"
                                  : "bg-black/10 text-gray-700 hover:bg-black/20"
                              } backdrop-blur-sm border border-white/10`
                        }`}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        style={{
                          boxShadow:
                            selectedTech === "All"
                              ? "0 0 20px rgba(59, 130, 246, 0.3)"
                              : "none",
                        }}
                      >
                        All Dimensions ({projects.length})
                      </motion.button>

                      {allTechnologies.map((tech, index) => (
                        <motion.button
                          key={tech.name}
                          onClick={() => setSelectedTech(tech.name)}
                          className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 flex items-center gap-2 ${
                            selectedTech === tech.name
                              ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg"
                              : `${
                                  theme === "dark"
                                    ? "bg-white/10 text-gray-300 hover:bg-white/20"
                                    : "bg-black/10 text-gray-700 hover:bg-black/20"
                                } backdrop-blur-sm border border-white/10`
                          }`}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.3, delay: index * 0.05 }}
                          style={{
                            boxShadow:
                              selectedTech === tech.name
                                ? "0 0 20px rgba(147, 51, 234, 0.3)"
                                : "none",
                          }}
                        >
                          <span>{tech.name}</span>
                          <motion.span
                            className="text-xs px-2 py-1 rounded-full bg-white/20"
                            animate={{ scale: [1, 1.1, 1] }}
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

          {/* PROJECTS QUANTUM GRID */}
          <AnimatePresence mode="wait">
            <motion.div
              key={`${viewMode}-${selectedTech}-${searchTerm}-${sortBy}`}
              initial={{ opacity: 0, y: 60 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -60 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className={
                viewMode === "grid"
                  ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                  : "space-y-8"
              }
            >
              {filteredProjects.length > 0 ? (
                filteredProjects.map((project, index) => (
                  <motion.div
                    key={project.name}
                    initial={{ opacity: 0, y: 80, scale: 0.8 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{
                      duration: 0.6,
                      delay: index * 0.1,
                      type: "spring",
                      stiffness: 100,
                    }}
                    className={viewMode === "list" ? "max-w-4xl mx-auto" : ""}
                  >
                    <ProjectCard project={project} />
                  </motion.div>
                ))
              ) : (
                <motion.div
                  className="col-span-full text-center py-32"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.8 }}
                >
                  <motion.div
                    className="text-8xl mb-8"
                    animate={{
                      rotate: [0, 10, -10, 0],
                      scale: [1, 1.1, 1],
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    🔍
                  </motion.div>

                  <h3 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                    No Projects Found in This Dimension
                  </h3>

                  <p className="text-xl text-gray-500 mb-8 max-w-md mx-auto">
                    The quantum search yielded no results. Try adjusting your
                    parameters or exploring different dimensions.
                  </p>

                  <motion.button
                    onClick={() => {
                      setSearchTerm("");
                      setSelectedTech("All");
                    }}
                    className="px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-2xl font-semibold transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/25"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Reset Quantum Matrix
                  </motion.button>
                </motion.div>
              )}
            </motion.div>
          </AnimatePresence>

          {/* Results Status Display */}
          {filteredProjects.length > 0 && (
            <motion.div
              className="text-center mt-16 opacity-60"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.6 }}
              transition={{ duration: 0.8, delay: 1 }}
            >
              <motion.div
                className="inline-flex items-center gap-4 px-6 py-3 rounded-full backdrop-blur-sm bg-white/5 border border-white/10"
                animate={{
                  boxShadow: [
                    "0 0 20px rgba(0,0,0,0.1)",
                    "0 0 30px rgba(59,130,246,0.2)",
                    "0 0 20px rgba(0,0,0,0.1)",
                  ],
                }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                <motion.div
                  className="w-2 h-2 bg-green-400 rounded-full"
                  animate={{ scale: [1, 1.3, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                />
                <span>
                  Displaying {filteredProjects.length} of {projects.length}{" "}
                  quantum projects
                </span>
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                >
                  ⚡
                </motion.div>
              </motion.div>
            </motion.div>
          )}
        </div>
      </div>

      {/* Bottom Quantum Atmosphere */}
      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-full h-32 bg-gradient-to-t from-blue-500/10 via-purple-500/5 to-transparent blur-3xl" />
    </div>
  );
};

export default AllProjectsPage;
