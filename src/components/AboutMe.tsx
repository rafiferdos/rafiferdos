import { ThemeContext } from "@/providers/ThemeProvider";
import { useContext } from "react";
import profileImage from "../assets/images/profile-pic2.jpg";
import Image from "next/image";
import { Meteors } from "./ui/meteors";
import { Button } from "./ui/moving-border";
import Link from "next/link";
import { AiFillInstagram } from "react-icons/ai";
import {
  IoIosCheckmarkCircleOutline,
  IoLogoFacebook,
  IoLogoGithub,
  IoLogoLinkedin,
} from "react-icons/io";

const AboutMe = () => {
  const { theme } = useContext(ThemeContext);
  return (
    <div
      className={
        theme === "dark"
          ? "flex items-center md:flex-row justify-center min-h-screen w-full flex-col relative overflow-hidden mx-auto bg-black text-white"
          : "flex items-center md:flex-row justify-center min-h-screen w-full flex-col relative overflow-hidden mx-auto bg-white text-black"
      }
      id="projects"
    >
      <div className="w-11/12 mx-auto max-w-7xl flex gap-8 justify-center flex-col md:flex-row items-center md:items-stretch">
        <div
          className={
            theme === "dark"
              ? "flex flex-col items-center justify-center w-full md:w-5/12 bg-gray-950 py-8 md:py-16 px-4 rounded-3xl relative overflow-hidden"
              : "flex flex-col items-center justify-center w-full md:w-5/12 bg-gray-100 py-8 md:py-16 px-4 rounded-3xl relative overflow-hidden"
          }
        >
          <Image
            src={profileImage}
            className="mask mask-squircle w-48 z-20"
            alt="Rafi Ferdos"
          />
          <h1 className="text-xl md:text-2xl lg:text-4xl font-bold mt-4">
            Rafi Ferdos
          </h1>
          <p className="opacity-70 mb-8">rafiferdos@gmail.com</p>
          <Link
            href={
              "https://drive.google.com/file/d/1sz7Rr962BWTSx6I98NMJkOuyrGbqsVOd/view?usp=drive_link"
            }
            target="_blank"
          >
            <Button>Resume</Button>
          </Link>
          <div className="divider mt-8 opacity-70">Social Links</div>
          <div className="flex items-center justify-center gap-3 *:text-3xl">
            <Link href={"https://github.com/rafiferdos"} target="_blank">
              <IoLogoGithub />
            </Link>
            <Link href={"https://facebook.com/rafiferdos2"} target="_blank">
              <IoLogoFacebook />
            </Link>
            <Link href={"https://linkedin.com/in/rafiferdos"} target="_blank">
              <IoLogoLinkedin />
            </Link>
            <Link href={"https://instagram.com/rafiferdos/"} target="_blank">
              <AiFillInstagram />
            </Link>
          </div>
          <Meteors number={50} />
        </div>

        <div className="flex flex-col w-full md:w-7/12 gap-8">
          <div
            className={
              theme === "dark"
                ? "flex flex-col w-full bg-gray-950 py-7 px-4 md:px-12 lg:px-16 rounded-3xl"
                : "flex flex-col w-full bg-gray-100 py-7 px-4 md:px-12 lg:px-16 rounded-3xl"
            }
          >
            <h1 className="text-xl md:text-2xl text-left lg:text-4xl font-bold">
              Who am I?
            </h1>
            <div className="flex items-center my-5 text-green-400 gap-1">
              <IoIosCheckmarkCircleOutline />
              <p>Open to Work</p>
            </div>
            <p className="text-start opacity-70">
              I&apos;m born and raised in beautiful Bangladesh 🇧🇩 & I&apos;m a
              MERN-Stack Developer with experience in building web applications.
              I&apos;m passionate about learning new technologies and building
              new things. I&apos;m also a problem solver and have a good
              understanding of web technologies.
            </p>
          </div>
          <div className={
              theme === "dark"
                ? "flex flex-col w-full bg-gray-950 py-7 px-4 md:px-12 lg:px-16 rounded-3xl"
                : "flex flex-col w-full bg-gray-100 py-7 px-4 md:px-12 lg:px-16 rounded-3xl"
            }>
            <h1 className="text-xl md:text-2xl text-left lg:text-4xl font-bold">
              Education
            </h1>
            <div className="my-6">
              <p>2022 - Present</p>
              <h2 className="text-lg md:text-xl font-bold my-2">BSc in CSE</h2>
              <h3 className="font-bold">Daffodil International University</h3>
              <p className="opacity-70">
                I&apos;m currently studying Computer Science & Engineering with my passion and dedication for become a full stack developer.
              </p>
            </div>
            <div className="my-6">
              <p>2018 - 2020</p>
              <h2 className="text-lg md:text-xl font-bold my-2">Science</h2>
              <h3 className="font-bold">Nawabganj Govt College</h3>
              <p className="opacity-70">
                Studied and completed my Higher Secondary School Certificate (HSC) in Science. With an amazing experience and memories of my college life.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutMe;
