"use client";

import Navbar from "@/components/Navbar";
import ThemeProvider, { ThemeContext } from "@/providers/ThemeProvider";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Inter } from "next/font/google";
import Head from "next/head"; // Import the Head component
import { useContext, useEffect } from "react";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { theme } = useContext(ThemeContext);

  useEffect(() => {
    // Set the background color based on the theme
    document.body.style.backgroundColor = theme === "dark" ? "#000000" : "";
  }, [theme]);
  return (
    <html lang="en">
      <Head>
        <title>Rafi Ferdos</title>
        <meta name="description" content="Rafi Ferdos portfolio website" />
      </Head>
      <body className={inter.className}>
        <ThemeProvider>
          <Navbar />
          {children}
          <SpeedInsights />
        </ThemeProvider>
      </body>
    </html>
  );
}
