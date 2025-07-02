"use client";

import { ThemeContext } from "@/providers/ThemeProvider";
import { motion } from "framer-motion";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import ProjectCard from "./ProjectCard";
import { HoverBorderGradient } from "./ui/hover-border-gradient";
import { TextGenerateEffect } from "./ui/text-generate-effect";

export interface Project {
  name: string;
  description: string;
  image: string;
  link: string;
  github_link: string;
  tech_stack?: string[];
  features?: string[];
  challenge?: string;
  completion_date?: string;
  screenshots?: string[];
}

interface ProjectData {
  projects: Project[];
}

const Projects = () => {
  const { theme } = useContext(ThemeContext);
  const words = `Showcasing my latest innovative projects with cutting-edge technologies and futuristic design patterns.`;

  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("projects_data.json")
      .then((response) => response.json())
      .then((data: ProjectData) => {
        // Show only the latest 3 projects
        setProjects(data.projects.slice(0, 3));
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching projects:", error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div
        className={`min-h-screen flex items-center justify-center ${
          theme === "dark" ? "bg-black text-white" : "bg-white text-black"
        }`}
      >
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full"
        />
      </div>
    );
  }

  return (
    <div
      className={`flex items-center justify-center min-h-screen w-full flex-col relative overflow-hidden mx-auto ${
        theme === "dark" ? "bg-black text-white" : "bg-white text-black"
      }`}
      id="projects"
    >
      {/* Futuristic Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-500/5 to-purple-500/10" />

      {/* Animated Circuit Pattern */}
      <div className="absolute inset-0 opacity-20">
        <motion.div
          className="w-full h-full"
          animate={{
            backgroundPosition: ["0px 0px", "100px 100px"],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          }}
          style={{
            backgroundImage: `
              linear-gradient(45deg, rgba(59, 130, 246, 0.1) 1px, transparent 1px),
              linear-gradient(-45deg, rgba(147, 51, 234, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: "30px 30px",
          }}
        />
      </div>

      {/* Floating Orbs */}
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-3 h-3 rounded-full pointer-events-none"
          style={{
            background: `hsl(${(i * 45 + 200) % 360}, 70%, 50%)`,
            left: `${10 + i * 10}%`,
            top: `${20 + Math.sin(i) * 30}%`,
            filter: "blur(1px)",
          }}
          animate={{
            y: [0, -40, 0],
            x: [0, Math.sin(i) * 30, 0],
            opacity: [0.3, 0.8, 0.3],
            scale: [1, 1.5, 1],
          }}
          transition={{
            duration: 6 + i * 0.5,
            repeat: Infinity,
            delay: i * 0.3,
            ease: "easeInOut",
          }}
        />
      ))}

      <div className="relative z-10 w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="div"
        >
          {/* Hero Section */}
          <div
            className={`h-[20rem] md:h-[30rem] w-full relative flex items-center justify-center ${
              theme === "dark" ? "bg-grid-white/[0.2]" : "bg-grid-black/[0.2]"
            }`}
          >
            <div
              className={`absolute pointer-events-none inset-0 flex items-center justify-center ${
                theme === "dark"
                  ? "bg-black [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"
                  : "bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,white)]"
              }`}
            />
            <div className="flex flex-col items-center justify-center px-8 relative z-10">
              <motion.p
                className={`text-4xl sm:text-7xl font-bold relative z-20 bg-clip-text text-transparent ${
                  theme === "dark"
                    ? "bg-gradient-to-b from-white to-gray-500"
                    : "bg-gradient-to-b from-black to-gray-600"
                }`}
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.8, type: "spring" }}
              >
                Featured Projects
              </motion.p>

              <motion.div
                className="text-center text-base md:text-lg font-normal text-neutral-500 max-w-2xl mx-auto mt-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
              >
                <TextGenerateEffect words={words} />
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* Projects Grid */}
        <motion.div
          className="flex items-center justify-center w-11/12 mx-auto mb-16"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-4 md:gap-12 lg:gap-20 auto-rows-fr">
            {projects.map((project, index) => (
              <motion.div
                key={`${project.name}-${index}`}
                initial={{ opacity: 0, y: 60, scale: 0.8 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{
                  duration: 0.6,
                  delay: 0.7 + index * 0.2,
                  type: "spring",
                  stiffness: 100,
                }}
              >
                <ProjectCard project={project} />
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Show All Projects Button */}
        <motion.div
          className="flex justify-center mb-20"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 1.2 }}
        >
          <Link href="/projects">
            <HoverBorderGradient
              containerClassName="rounded-full"
              className="bg-black dark:bg-white text-white dark:text-black flex items-center space-x-3 px-8 py-4 text-lg font-semibold"
            >
              <motion.span
                animate={{
                  backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="bg-gradient-to-r from-blue-400 via-purple-500 to-cyan-400 bg-clip-text text-transparent"
                style={{ backgroundSize: "200% 200%" }}
              >
                Explore All Projects
              </motion.span>

              <motion.div
                animate={{
                  x: [0, 5, 0],
                  scale: [1, 1.1, 1],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 7l5 5m0 0l-5 5m5-5H6"
                  />
                </svg>
              </motion.div>
            </HoverBorderGradient>
          </Link>
        </motion.div>
      </div>
    </div>
  );
};

export default Projects;
