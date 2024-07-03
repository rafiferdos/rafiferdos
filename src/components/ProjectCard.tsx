"use client";

import Image from "next/image";
import React, { useContext } from "react";

import { ThemeContext } from "@/providers/ThemeProvider";
import Link from "next/link";
import { Project } from "./Projects";
import { CardBody, CardContainer, CardItem } from "./ui/3d-card";

type ProjectCardProps = {
  project: Project;
};

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  const { theme } = useContext(ThemeContext);
  const { name, description, image, link } = project;
  return (
    <CardContainer className="inter-var">
      <CardBody
        className={
          theme === "light"
            ? "bg-gray-50 relative group/card dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1] w-auto sm:w-[30rem] h-auto rounded-xl p-6 border h-[10rem]]"
            : "bg-gray-950 relative group/card hover:shadow-2xl hover:shadow-emerald-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1] w-auto sm:w-[30rem] h-auto rounded-xl p-6 border h-[10rem]]"
        }
      >
        <CardItem
          translateZ="50"
          className={
            theme === "dark"
              ? "text-xl font-bold text-neutral-600 dark:text-white"
              : "text-xl font-bold text-neutral-900 dark:text-black"
          }
        >
          Project:{" "}
          <span className={theme === "dark" ? "text-white" : "text-black"}>
            {name}
          </span>
        </CardItem>
        <CardItem
          as="p"
          translateZ="60"
          className={
            theme === "dark"
              ? "text-neutral-500 text-sm max-w-sm mt-2 dark:text-neutral-300"
              : "text-neutral-600 text-sm max-w-sm mt-2 dark:text-neutral-400"
          }
        >
          {description}
        </CardItem>
        <CardItem translateZ="100" className="w-full mt-4">
          <Image
            src={image}
            height="1000"
            width="1000"
            className="h-60 w-full object-cover rounded-xl group-hover/card:shadow-xl"
            alt="thumbnail"
          />
        </CardItem>
        <div className="flex justify-between items-center mt-20">
          <CardItem
            translateZ={20}
            as={Link}
            href={link}
            target="__blank"
            className="px-4 py-2 rounded-xl text-xs font-normal dark:text-white"
          >
            View Live →
          </CardItem>
          <CardItem
            translateZ={20}
            as="button"
            className="px-4 py-2 rounded-xl bg-black dark:bg-white dark:text-black text-white text-xs font-bold"
          >
            Github
          </CardItem>
        </div>
      </CardBody>
    </CardContainer>
  );
};

export default ProjectCard;
