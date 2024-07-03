

import { ThemeContext } from "@/providers/ThemeProvider";
import { use, useContext, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { TextGenerateEffect } from "./ui/text-generate-effect";
import ProjectCard from "./ProjectCard";

const Projects = () => {
  const { theme } = useContext(ThemeContext);
  const words = `Here are my top best projects including full CRUD applications, RESTful APIs, and more.`

    const [projects, setProjects] = useState([]);

    useEffect(() => {
      fetch('projects_data.json')
        .then((response) => response.json())
        .then((data) => {
          setProjects(data);
        });
    }, [])

  return (
    <div
      className={
        theme === "dark"
          ? "flex items-center justify-center min-h-screen w-full flex-col relative overflow-hidden mx-auto bg-black text-white"
          : "flex items-center justify-center min-h-screen w-full flex-col relative overflow-hidden mx-auto bg-white text-black"
      }
    >
      <div>
        <motion.div
          initial={{
            opacity: 0,
            y: 20,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 1,
          }}
          className="div"
        >
          <div className="h-[30rem] w-full bg-black dark:bg-grid-white/[0.2] bg-grid-white/[0.2] relative flex items-center justify-center">
            <div className="absolute pointer-events-none inset-0 flex items-center justify-center bg-black [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
            <div className="flex flex-col items-center justify-center px-8">
              <p className="text-4xl sm:text-7xl font-bold relative z-20 bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-500">
                Projects
              </p>
              <div className="text-center text-base md:text-lg font-normal text-neutral-500 max-w-2xl mx-auto">
                <TextGenerateEffect words={words} />
              </div>
            </div>
          </div>
        </motion.div>
          <div className="flex items-center justify-center">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-16 lg:gap-20">
                {
                    projects.map((project, index) => {
                        return (
                            <ProjectCard key={index} project={project} />
                        )
                    })
                }
            </div>
          </div>
      </div>
    </div>
  );
};

export default Projects;
