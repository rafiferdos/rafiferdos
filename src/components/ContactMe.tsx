import { ThemeContext } from "@/providers/ThemeProvider";
import { useContext } from "react";
import image3D from "../assets/images/rafi-3d.png";
import Image from "next/image";
import Head from "next/head";

const ContactMe = () => {
  const { theme } = useContext(ThemeContext);
  return (
    <>
      <Head>
        <title>Contact Me - Rafi Ferdos</title>
        <meta
          name="description"
          content="Get in touch with Rafi Ferdos, a Full Stack Developer with hands on experience in building web applications."
        />
        <meta
          name="keywords"
          content="Rafi Ferdos, Contact, Full Stack Developer, MERN Stack Developer, Web Developer"
        />
        <meta name="robots" content="index, follow" />
        <meta property="og:title" content="Contact Me - Rafi Ferdos" />
        <meta
          property="og:description"
          content="Get in touch with Rafi Ferdos, a Full Stack Developer with 3 years of experience in building web applications."
        />
        <meta property="og:image" content="../assets/images/rafi-3d.png" />
        <meta property="og:url" content="https://rafiferdos/vercel.app/" />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>
      <div
        className={
          theme === "dark"
            ? "flex items-center justify-center min-h-screen w-full flex-col relative overflow-hidden mx-auto bg-black text-white"
            : "flex items-center justify-center min-h-screen w-full flex-col relative overflow-hidden mx-auto bg-white text-black"
        }
      >
        <div className="flex items-center justify-center flex-col md:flex-row max-w-7xl mx-auto w-11/12">
          <div
            className={
              theme === "dark"
                ? "flex items-center justify-center md:w-1/2 bg-slate-950 rounded-3xl"
                : "flex items-center justify-center md:w-1/2 bg-slate-100 rounded-3xl"
            }
          >
            <Image
              src={image3D}
              alt="Rafi Ferdos 3D"
              width={500}
              height={500}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default ContactMe;
