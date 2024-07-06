import { ThemeContext } from "@/providers/ThemeProvider";
import { useContext } from "react";
import image3D from "../assets/images/rafi-3d.png";
import Image from "next/image";
import Head from "next/head";
import Form from "./Form";
import { SparklesCore } from "./ui/sparkles";

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
            ? "flex flex-grow items-center justify-center min-h-screen w-full flex-col relative overflow-hidden mx-auto bg-black text-white bg-dot-white/[0.4]"
            : "flex flex-grow items-center justify-center min-h-screen w-full flex-col relative overflow-hidden mx-auto bg-white text-black bg-dot-black/[0.4]"
        }
      >
        <h1 className="text-center lg:text-6xl md:text-3xl text-xl font-bold my-10 md:my-16">Contact</h1>
        <FollowerPointerCard
        title={
          <TitleComponent
            title={blogContent.author}
            avatar={blogContent.authorAvatar}
          />
        }
      >

        <div
          className={
            theme === "dark"
              ? "absolute pointer-events-none inset-0 flex items-center justify-center bg-black [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"
              : "absolute pointer-events-none inset-0 flex items-center justify-center bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,white)]"
          }
        ></div>

        <div className="max-w-7xl mx-auto w-11/12 gap-10 project-card-container grid-cols-2">
          <div
            className={
              theme === "dark"
                ? "flex items-center justify-center bg-blue-900/10 backdrop-blur-sm rounded-3xl transition-all hover:shadow-xl project-card-body"
                : "flex items-center justify-center bg-blue-100/10 backdrop-blur-sm rounded-3xl transition-all hover:shadow-xl project-card-body"
            }
          >
            <div className="w-full absolute h-full">
              <SparklesCore
                id="tsparticlesfullpage"
                background="transparent"
                minSize={0.6}
                maxSize={2.4}
                particleDensity={100}
                className="w-full h-full"
                particleColor="#0000FF"
              />
            </div>
            <Image
              className="z-20"
              src={image3D}
              alt="Rafi Ferdos 3D"
              width={500}
              height={500}
            />
          </div>
      </FollowerPointerCard>
          <div
            className={
              theme === "dark"
                ? "flex flex-col items-center justify-center bg-slate-950 rounded-3xl transition-all hover:shadow-xl pt-10 h-full project-card-body"
                : "flex flex-col items-center justify-center bg-slate-100 rounded-3xl transition-all hover:shadow-xl pt-10 h-full project-card-body"
            }
          >
            <h3 className="text-center lg:text-4xl md:text-2xl text-lg font-bold">Let&apos;s talk!</h3>
            <Form />
          </div>
        </div>
      </div>
    </>
  );
};

export default ContactMe;
