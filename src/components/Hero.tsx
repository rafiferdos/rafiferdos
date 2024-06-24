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
import { SparklesCore } from "./ui/sparkles";
import { BackgroundGradient } from "./ui/background-gradient";
import Link from "next/link";
import { FlipWords } from "./ui/flip-words";
import { motion } from "framer-motion";

const Hero = () => {
  const { theme } = useContext(ThemeContext);

  const containerVariants = {
    hidden: {
      opacity: 0,
    },
    visible: {
      opacity: 1,
      transition: {
        delay: 0.5,
        duration: 0.5,
      },
    },
  }

  const words = [
    {
      text: "Rafi",
    },
    {
      text: "Ferdos",
    },
  ];

  const positionWords = [
    "MERN_Stack_Developer",
    "React_Developer",
    "Frontend_Developer",
    "Full_Stack_Developer",
    "Programmer",
  ];

  const description =
    "With a passion for crafting intuitive and user-friendly web applications, I'm dedicated to delivering seamless user experiences through clean, maintainable, and optimized code.";

  return (
    <motion.div
      initial='hidden'
      animate='visible'
      variants={containerVariants}
    >
    <div
      className={
        theme === "dark"
          ? "flex items-center justify-center min-h-screen w-full flex-col relative overflow-hidden mx-auto py-32 md:py-36 lg:py-48 bg-black text-white"
          : "flex items-center justify-center min-h-screen w-full flex-col relative overflow-hidden mx-auto py-32 md:py-36 lg:py-48 bg-white text-black"
      }
    >
      <Spotlight className="-top-40 left-0 md:left-60 md:-top-20" fill="blue" />
      <div className="mx-auto container max-w-7xl w-11/12">
        <div className="flex items-center justify-center gap- flex-col-reverse xl:flex-row">
          <div className="p-4 z-10 relative max-w-3xl md:w-4/6 space-y-4">
            <h1 className="lg:text-4xl text-xl md:text-2xl font-bold">
              Hello, I&apos;m
            </h1>
            <h1 className="md:text-6xl text-3xl text-white font-extrabold inline-block">
              <BackgroundGradient>
              <TypewriterEffectSmooth
                words={words}
                cursorClassName="text-blue-500 dark:text-blue-300"
                className='text-white'
                />
                </BackgroundGradient>
            </h1>
            <br />
            <h1 className="md:text-3xl lg:text-4xl text-xl font-semibold inline-block text-primary">
              a <FlipWords words={positionWords} />
            </h1>

            <TextGenerateEffect words={description} />
            <div className="mt-5">
              <Link
                href={
                  "https://drive.google.com/file/d/1sz7Rr962BWTSx6I98NMJkOuyrGbqsVOd/view?usp=drive_link"
                }
              >
                <HoverBorderGradient
                  containerClassName="rounded-full"
                  as="button"
                  className={
                    theme === "dark"
                      ? "text-white bg-black dark:text-white flex items-center space-x-2"
                      : "text-black flex items-center bg-white space-x-2"
                  }
                >
                  <span>Resume</span>
                </HoverBorderGradient>
              </Link>
            </div>
          </div>
          <div className="flex flex-col gap-3">
            <div className="avatar">
              <div className="ring ring-blue-700 ring-offset-4 ring-offset-base-100 rounded-full max-w-[250px] lg:max-w-[350px] sm:max-w-sm mx-auto">
                <Image
                  src={profilePhoto}
                  alt="Hero Image"
                  width={400}
                  height={400}
                />
              </div>
            </div>
            <div className="w-[40rem] h-40 relative mx-auto">
              {/* Gradients */}
              <div className="absolute inset-x-20 top-0 bg-gradient-to-r from-transparent via-indigo-500 to-transparent h-[2px] w-3/4 blur-sm" />
              <div className="absolute inset-x-20 top-0 bg-gradient-to-r from-transparent via-indigo-500 to-transparent h-px w-3/4" />
              <div className="absolute inset-x-60 top-0 bg-gradient-to-r from-transparent via-sky-500 to-transparent h-[5px] w-1/4 blur-sm" />
              <div className="absolute inset-x-60 top-0 bg-gradient-to-r from-transparent via-sky-500 to-transparent h-px w-1/4" />

              {/* Core component */}
              <SparklesCore
                background="transparent"
                minSize={0.4}
                maxSize={1}
                particleDensity={1200}
                className="w-full h-full"
                particleColor={theme === "dark" ? "#fff" : "#000"}
              />

              {/* Radial Gradient to prevent sharp edges */}
              <div
                className={
                  theme === "dark"
                    ? "absolute inset-0 w-full h-full bg-black [mask-image:radial-gradient(350px_200px_at_top,transparent_20%,white)]"
                    : "absolute inset-0 w-full h-full bg-white [mask-image:radial-gradient(350px_200px_at_top,transparent_20%,white)]"
                }
              ></div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </motion.div>
  );
};

export default Hero;
