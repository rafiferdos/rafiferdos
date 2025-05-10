"use client";

import { ThemeContext } from "@/providers/ThemeProvider";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import { FaExternalLinkAlt, FaGithub } from "react-icons/fa";
import { IoArrowBackOutline } from "react-icons/io5";
import { Project } from "./Projects";
import { Button } from "./ui/moving-border";
import { Spotlight } from "./ui/Spotlight";
import { TextGenerateEffect } from "./ui/text-generate-effect";

interface ProjectDetailsProps {
  projectName: string;
}

const ProjectDetails = ({ projectName }: ProjectDetailsProps) => {
  const { theme } = useContext(ThemeContext);
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/projects_data.json")
      .then((response) => response.json())
      .then((data) => {
        const foundProject = data.projects.find(
          (p: Project) =>
            p.name.toLowerCase().replace(/ /g, "-") ===
            projectName.toLowerCase().replace(/ /g, "-")
        );
        setProject(foundProject || null);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching project data:", error);
        setLoading(false);
      });
  }, [projectName]);

  // Loading state
  if (loading) {
    return (
      <div
        className={`min-h-screen flex items-center justify-center ${
          theme === "dark" ? "bg-black text-white" : "bg-white text-black"
        }`}
      >
        <div className="w-10 h-10 rounded-full border-2 border-t-blue-500 border-r-transparent border-b-blue-300 border-l-transparent animate-spin"></div>
      </div>
    );
  }

  // Project not found state
  if (!project) {
    return (
      <div
        className={`min-h-screen flex items-center justify-center ${
          theme === "dark" ? "bg-black text-white" : "bg-white text-black"
        }`}
      >
        <div className="text-center max-w-md">
          <h1 className="text-xl font-bold mb-3">Project Not Found</h1>
          <Link href="/#projects">
            <Button className="px-4 py-1 text-sm">Return to Projects</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`min-h-screen pt-20 pb-16 relative ${
        theme === "dark" ? "bg-black text-white" : "bg-white text-black"
      }`}
    >
      {/* Add spotlight effect */}
      <Spotlight
        className="hidden md:block -top-40 left-0 md:left-60"
        fill={
          theme === "dark"
            ? "rgba(30, 64, 175, 0.15)"
            : "rgba(59, 130, 246, 0.15)"
        }
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10">
        {/* Back button */}
        <Link href="/#projects">
          <div className="inline-flex items-center gap-2 mb-8 text-sm opacity-70 hover:opacity-100 transition-opacity">
            <IoArrowBackOutline />
            <span>Back</span>
          </div>
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          {/* Project Title with gradient effect */}
          <h1
            className={`text-3xl sm:text-4xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r ${
              theme === "dark"
                ? "from-blue-400 to-blue-600"
                : "from-blue-600 to-blue-800"
            }`}
          >
            {project.name}
          </h1>

          {/* Project Image with animation */}
          <motion.div
            className="mb-8 rounded-lg overflow-hidden border border-gray-700 shadow-lg"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <Image
              src={project.image}
              alt={project.name}
              width={1200}
              height={600}
              className="w-full object-cover h-auto max-h-[400px]"
              priority
            />
          </motion.div>

          {/* Main content grid */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
            {/* Project Description & Details (Left Column) */}
            <div className="md:col-span-8 order-2 md:order-1">
              {/* Overview section */}
              <section className="mb-10">
                <h2
                  className={`text-xl font-bold mb-4 ${
                    theme === "dark" ? "text-blue-400" : "text-blue-600"
                  }`}
                >
                  Overview
                </h2>
                <div
                  className={`rounded-lg p-6 backdrop-blur-sm ${
                    theme === "dark"
                      ? "bg-gray-900/30 border border-gray-800"
                      : "bg-gray-50/70 border border-gray-200"
                  }`}
                >
                  <div className="prose max-w-none text-base opacity-90">
                    <TextGenerateEffect words={project.description} />
                  </div>
                </div>
              </section>

              {/* Main Challenge section */}
              {project.challenge && (
                <section className="mb-10">
                  <h2
                    className={`text-xl font-bold mb-4 ${
                      theme === "dark" ? "text-blue-400" : "text-blue-600"
                    }`}
                  >
                    Main Challenge
                  </h2>
                  <div
                    className={`rounded-lg p-6 backdrop-blur-sm ${
                      theme === "dark"
                        ? "bg-gray-900/30 border border-gray-800"
                        : "bg-gray-50/70 border border-gray-200"
                    }`}
                  >
                    <p className="italic">{project.challenge}</p>
                  </div>
                </section>
              )}

              {/* Features section with animation */}
              {project.features && project.features.length > 0 && (
                <section className="mb-10">
                  <h2
                    className={`text-xl font-bold mb-4 ${
                      theme === "dark" ? "text-blue-400" : "text-blue-600"
                    }`}
                  >
                    Key Features
                  </h2>
                  <div
                    className={`rounded-lg p-6 backdrop-blur-sm ${
                      theme === "dark"
                        ? "bg-gray-900/30 border border-gray-800"
                        : "bg-gray-50/70 border border-gray-200"
                    }`}
                  >
                    <ul className="space-y-3">
                      {project.features.map((feature, index) => (
                        <motion.li
                          key={index}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className="flex items-start"
                        >
                          <span
                            className={`inline-flex items-center justify-center rounded-full h-6 w-6 min-w-6 mr-3 mt-0.5 text-xs ${
                              theme === "dark"
                                ? "bg-blue-900 text-blue-300"
                                : "bg-blue-100 text-blue-700"
                            }`}
                          >
                            {index + 1}
                          </span>
                          <span>{feature}</span>
                        </motion.li>
                      ))}
                    </ul>
                  </div>
                </section>
              )}

              {/* Screenshots section (if there are more than one) */}
              {project.screenshots && project.screenshots.length > 1 && (
                <section className="mb-10">
                  <h2
                    className={`text-xl font-bold mb-4 ${
                      theme === "dark" ? "text-blue-400" : "text-blue-600"
                    }`}
                  >
                    More Screenshots
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {project.screenshots.slice(1).map((screenshot, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.2 }}
                        className="rounded-lg overflow-hidden"
                      >
                        <Image
                          src={screenshot}
                          alt={`${project.name} screenshot ${index + 2}`}
                          width={600}
                          height={400}
                          className="w-full h-auto hover:scale-105 transition-transform duration-300"
                        />
                      </motion.div>
                    ))}
                  </div>
                </section>
              )}
            </div>

            {/* Project Info Sidebar (Right Column) */}
            <div className="md:col-span-4 order-1 md:order-2 mb-8 md:mb-0">
              <div className="sticky top-24">
                {/* Project Links */}
                <div
                  className={`rounded-lg p-5 mb-6 ${
                    theme === "dark"
                      ? "bg-gray-900/30 border border-gray-800"
                      : "bg-gray-50/70 border border-gray-200"
                  }`}
                >
                  <div className="flex flex-col gap-3">
                    <Link
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Button className="w-full flex items-center justify-center gap-2 text-sm py-2">
                        <FaExternalLinkAlt size={12} /> Live Preview
                      </Button>
                    </Link>

                    <Link
                      href={project.github_link}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Button className="w-full flex items-center justify-center gap-2 bg-transparent border border-gray-600 text-sm py-2">
                        <FaGithub size={14} /> Source Code
                      </Button>
                    </Link>
                  </div>
                </div>

                {/* Tech Stack section */}
                {project.tech_stack && project.tech_stack.length > 0 && (
                  <div
                    className={`rounded-lg p-5 mb-6 ${
                      theme === "dark"
                        ? "bg-gray-900/30 border border-gray-800"
                        : "bg-gray-50/70 border border-gray-200"
                    }`}
                  >
                    <h3 className="text-lg font-semibold mb-3">Tech Stack</h3>
                    <div className="flex flex-wrap gap-2">
                      {project.tech_stack.map((tech, index) => (
                        <motion.span
                          key={index}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className={`px-3 py-1.5 rounded-full text-xs font-medium ${
                            theme === "dark"
                              ? "bg-blue-900/40 text-blue-300 border border-blue-800/50"
                              : "bg-blue-100 text-blue-700"
                          }`}
                        >
                          {tech}
                        </motion.span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Project Info */}
                <div
                  className={`rounded-lg p-5 ${
                    theme === "dark"
                      ? "bg-gray-900/30 border border-gray-800"
                      : "bg-gray-50/70 border border-gray-200"
                  }`}
                >
                  <h3 className="text-lg font-semibold mb-3">Project Info</h3>
                  <div className="space-y-3">
                    {project.completion_date && (
                      <div className="flex justify-between items-center">
                        <span className="text-sm opacity-70">Completed:</span>
                        <span className="font-medium">
                          {project.completion_date}
                        </span>
                      </div>
                    )}
                    <div className="flex justify-between items-center">
                      <span className="text-sm opacity-70">Type:</span>
                      <span className="font-medium">Web Application</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ProjectDetails;
