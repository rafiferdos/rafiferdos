"use client";

import { ThemeContext } from "@/providers/ThemeProvider";
import { Spotlight } from "./ui/Spotlight";
import { useContext } from "react";
import { TypewriterEffectSmooth } from "./ui/typewriter-effect";
import { TextGenerateEffect } from "./ui/text-generate-effect";
import Image from "next/image";
import profilePhoto from "../assets/images/profile-pic.png";
import { HoverBorderGradient } from "./ui/hover-border-gradient";
import { LuDownload } from "react-icons/lu";

const Hero = () => {
  const { theme } = useContext(ThemeContext);

  const words = [
    {
      text: "a",
    },
    {
      text: "MERN-Stack",
    },
    {
      text: "Developer",
    },
  ];

  const description =
    "With a passion for crafting intuitive and user-friendly web applications, I'm dedicated to delivering seamless user experiences through clean, maintainable, and optimized code.";

  return (
    <div
      className={
        theme === "dark"
          ? "flex items-center justify-center min-h-screen w-full flex-col relative overflow-hidden mx-auto py-10 md:py-0 bg-black text-white"
          : "flex items-center justify-center min-h-screen w-full flex-col relative overflow-hidden mx-auto py-10 md:py-0 bg-white text-black"
      }
    >
      <Spotlight className="-top-40 left-0 md:left-60 md:-top-20" fill="blue" />
      <div className="mx-auto container max-w-7xl w-11/12">
        <div className="flex items-center justify-center gap-8 flex-col md:flex-row">
          <div className="p-4 z-10 relative max-w-3xl md:w-4/6 space-y-4">
            <h1 className="lg:text-7xl">
              Hello, I&apos;m Rafi Ferdos
              <TypewriterEffectSmooth
                words={words}
                cursorClassName="text-blue-500 dark:text-blue-300"
                className={theme === "dark" ? "text-white" : "text-black"}
              />
            </h1>
            <TextGenerateEffect words={description} />
            <HoverBorderGradient
              containerClassName="rounded-full"
              as="button"
              className={
                theme === "dark"
                  ? "text-white bg-black dark:text-white flex items-center space-x-2"
                  : "text-black flex items-center bg-white space-x-2"
              }
            >
              <span className="flex items-center justify-center gap-1">Resume <LuDownload /></span>
            </HoverBorderGradient>
          </div>
          <div>
            <Image
              src={profilePhoto}
              alt="Hero Image"
              width={400}
              height={400}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
