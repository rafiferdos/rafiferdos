"use client";

import AboutMe from "@/components/AboutMe";
import ContactMe from "@/components/ContactMe";
import Hero from "@/components/Hero";
import Projects from "@/components/Projects";
import Skills from "@/components/Skills";
import { ThemeContext } from "@/providers/ThemeProvider";
import { useContext } from "react";

export default function Home() {
  const { theme } = useContext(ThemeContext);
  return (
    <div
      className={`min-h-screen antialiased lg:space-y-24 md:space-y-20 space-y-16 ${
        theme === "dark" ? "bg-black" : "bg-white"
      }`}
    >
      <Hero />
      <Skills />
      <Projects />
      <AboutMe />
      <ContactMe />
    </div>
  );
}
