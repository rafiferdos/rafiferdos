import { ThemeContext } from "@/providers/ThemeProvider";
import { useContext } from "react";
import profileImage from "../assets/images/profile-pic2.jpg";
import Image from "next/image";
import { Meteors } from "./ui/meteors";
import { Button } from "./ui/moving-border";
import Link from "next/link";
import { AiFillInstagram } from "react-icons/ai";
import { IoLogoFacebook, IoLogoGithub, IoLogoLinkedin } from "react-icons/io";

const AboutMe = () => {
  const { theme } = useContext(ThemeContext);
  return (
    <div
      className={
        theme === "dark"
          ? "flex items-center md:flex-row justify-center min-h-screen w-full flex-col relative overflow-hidden mx-auto bg-black text-white gap-8"
          : "flex items-center md:flex-row justify-center min-h-screen w-full flex-col relative overflow-hidden mx-auto bg-white text-black gap-8"
      }
      id="projects"
    >
      <div className="w-11/12 mx-auto max-w-7xl flex">
        <div
          className={
            theme === "dark"
              ? "flex flex-col items-center justify-center w-5/12 bg-gray-950 py-8 md:py-16 px-4 rounded-2xl relative overflow-hidden"
              : "flex flex-col items-center justify-center w-5/12 bg-gray-100 py-8 md:py-16 px-4 rounded-2xl relative overflow-hidden"
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

        <div className="flex flex-col w-7/12">
          <div className="flex w-2/6">3</div>
          <div className="flex w-4/6">4</div>
        </div>
      </div>
    </div>
  );
};

export default AboutMe;
