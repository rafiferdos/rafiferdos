"use client";

import { Button } from "@/components/ui/moving-border";
import { SparklesCore } from "@/components/ui/sparkles";
import { Spotlight } from "@/components/ui/Spotlight";
import { TextGenerateEffect } from "@/components/ui/text-generate-effect";
import { ThemeContext } from "@/providers/ThemeProvider";
import { motion } from "framer-motion";
import Link from "next/link";
import { use, useContext, useEffect, useState } from "react";
import { FaClock, FaTag, FaUser } from "react-icons/fa";
import { IoArrowBackOutline } from "react-icons/io5";
import ReactMarkdown from "react-markdown";

// Define the page props to match Next.js 15's expectations
interface PageProps {
  params: Promise<{ slug: string }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}

interface BlogPost {
  id: number;
  title: string;
  slug: string;
  date: string;
  category: string;
  excerpt: string;
  content: string;
  image: string;
  author: string;
  tags: string[];
}

export default function BlogPostPage(props: PageProps) {
  // Unwrap the params Promise using React.use()
  const params = use(props.params);
  const { theme } = useContext(ThemeContext);
  const [blog, setBlog] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/blogs_data.json")
      .then((response) => response.json())
      .then((data) => {
        const foundBlog = data.blogs.find(
          (b: BlogPost) => b.slug === params.slug
        );
        setBlog(foundBlog || null);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching blog post:", error);
        setLoading(false);
      });
  }, [params.slug]);
  if (loading) {
    return (
      <div
        className={`min-h-screen pt-20 pb-16 flex items-center justify-center ${
          theme === "dark" ? "bg-black text-white" : "bg-white text-black"
        } relative overflow-hidden`}
      >
        {/* Background elements */}
        <SparklesCore
          id="loadingSparks"
          background="transparent"
          minSize={0.4}
          maxSize={1}
          particleDensity={20}
          className="w-full h-full absolute inset-0"
          particleColor={theme === "dark" ? "#ffffff" : "#000000"}
        />

        {/* Loading spinner with pulsing effect */}
        <div className="relative z-10">
          <div className="w-16 h-16 relative">
            <div className="absolute inset-0 rounded-full border-t-2 border-r-transparent border-l-transparent border-b-2 border-blue-500 animate-spin"></div>
            <div className="absolute inset-[6px] rounded-full border-r-2 border-l-transparent border-t-transparent border-b-2 border-purple-500 animate-spin"></div>
            <div className="absolute inset-0 rounded-full bg-blue-500/20 animate-pulse"></div>
          </div>
          <p className="text-center mt-4 animate-pulse">Loading article...</p>
        </div>
      </div>
    );
  }

  if (!blog) {
    return (
      <div
        className={`min-h-screen pt-20 pb-16 flex items-center justify-center ${
          theme === "dark" ? "bg-black text-white" : "bg-white text-black"
        } relative overflow-hidden`}
      >
        {/* Background elements */}
        <SparklesCore
          id="notFoundSparks"
          background="transparent"
          minSize={0.4}
          maxSize={1}
          particleDensity={15}
          className="w-full h-full absolute inset-0"
          particleColor={theme === "dark" ? "#ffffff" : "#000000"}
        />

        <Spotlight
          className="hidden md:block -top-40 left-0 md:left-60"
          fill={
            theme === "dark"
              ? "rgba(59, 130, 246, 0.15)"
              : "rgba(59, 130, 246, 0.15)"
          }
        />

        {/* Not found message */}
        <motion.div
          className="text-center relative z-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div
            className={`
            mb-6 w-24 h-24 rounded-full mx-auto flex items-center justify-center
            ${
              theme === "dark"
                ? "bg-blue-900/30 border border-blue-800"
                : "bg-blue-100 border border-blue-200"
            }
          `}
          >
            <span className="text-4xl">🔍</span>
          </div>
          <h1
            className={`text-2xl font-bold mb-4 ${
              theme === "dark" ? "text-blue-300" : "text-blue-700"
            }`}
          >
            Article Not Found
          </h1>
          <p className="mb-6 max-w-md opacity-80">
            We couldn't find the blog post you're looking for. It might have
            been moved or deleted.
          </p>
          <Link href="/blog">
            <Button
              borderRadius="1.5rem"
              className={`px-6 py-2 ${
                theme === "dark"
                  ? "bg-gradient-to-r from-blue-600 to-purple-600"
                  : "bg-gradient-to-r from-blue-500 to-purple-500"
              } text-white`}
            >
              Return to Blog
            </Button>
          </Link>
        </motion.div>
      </div>
    );
  }
  return (
    <div
      className={`min-h-screen pt-32 pb-16 relative overflow-hidden ${
        theme === "dark" ? "bg-black text-white" : "bg-white text-black"
      }`}
    >
      {/* Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Sparkles */}
        <SparklesCore
          id="blogPostSparks"
          background="transparent"
          minSize={0.6}
          maxSize={1.4}
          particleDensity={theme === "dark" ? 25 : 15}
          className="w-full h-full"
          particleColor={theme === "dark" ? "#ffffff" : "#000000"}
        />

        {/* Spotlight */}
        <Spotlight
          className="hidden md:block top-40 left-0"
          fill={
            theme === "dark"
              ? "rgba(59, 130, 246, 0.45)"
              : "rgba(59, 130, 246, 0.15)"
          }
        />

        {/* Grid Pattern */}
        <div
          className={`hidden lg:block absolute inset-0 w-full h-full ${
            theme === "dark"
              ? "bg-grid-white/[0.05] -z-10"
              : "bg-grid-black/[0.02] -z-10"
          }`}
          style={{
            backgroundSize: "30px 30px",
            backgroundImage:
              "linear-gradient(to right, rgba(128,128,128,0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(128,128,128,0.05) 1px, transparent 1px)",
            maskImage:
              "radial-gradient(ellipse at center, rgba(0, 0, 0, 1) 0%, transparent 80%)",
          }}
        />

        {/* Color orbs */}
        <div className="hidden md:block absolute top-1/4 right-40 w-72 h-72 rounded-full bg-blue-600/20 blur-[80px] opacity-50"></div>
        <div className="hidden md:block absolute bottom-1/4 left-40 w-80 h-80 rounded-full bg-purple-600/20 blur-[100px] opacity-40"></div>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6">
        {/* Back button */}
        <div className="mb-8">
          <Link href="/blog">
            <Button
              borderRadius="1.5rem"
              className={`inline-flex items-center gap-2 text-sm py-2 px-4 ${
                theme === "dark"
                  ? "bg-blue-900/30 hover:bg-blue-800/50"
                  : "bg-blue-50 hover:bg-blue-100"
              }`}
            >
              <IoArrowBackOutline className="text-lg" />
              <span>Back to Blog</span>
            </Button>
          </Link>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className={`
            rounded-2xl overflow-hidden shadow-xl mb-10
            ${
              theme === "dark"
                ? "bg-gray-900/30 backdrop-blur-md border border-gray-800 shadow-blue-900/20"
                : "bg-white/80 backdrop-blur-md border border-gray-200 shadow-blue-200/30"
            }
          `}
        >
          {/* Featured Image with Overlay */}
          <div className="relative h-72 sm:h-96 w-full">
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url(${blog.image})` }}
            ></div>
            <div
              className={`absolute inset-0 ${
                theme === "dark"
                  ? "bg-gradient-to-b from-transparent via-black/50 to-black"
                  : "bg-gradient-to-b from-transparent via-white/50 to-white"
              }`}
            ></div>

            {/* Category badge */}
            <div className="absolute top-6 right-6">
              <span
                className={`
                inline-block px-4 py-2 rounded-full text-sm font-medium backdrop-blur-sm
                ${
                  theme === "dark"
                    ? "bg-blue-900/70 text-blue-200"
                    : "bg-blue-100/90 text-blue-800"
                }
              `}
              >
                {blog.category}
              </span>
            </div>

            {/* Title overlay on image */}
            <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-10">
              <motion.h1
                className={`text-3xl sm:text-4xl md:text-5xl font-bold bg-clip-text text-transparent ${
                  theme === "dark"
                    ? "bg-gradient-to-r from-white via-blue-100 to-blue-200"
                    : "bg-gradient-to-r from-blue-900 via-blue-700 to-blue-500"
                } mb-4`}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.8 }}
              >
                {blog.title}
              </motion.h1>
            </div>
          </div>

          {/* Blog Info Bar */}
          <div
            className={`
            relative px-6 py-4 border-b flex flex-wrap gap-y-2 items-center justify-between
            ${theme === "dark" ? "border-gray-800" : "border-gray-200"}
          `}
          >
            {/* Author info */}
            <div className="flex items-center">
              <div
                className={`
                flex items-center justify-center w-10 h-10 rounded-full mr-3
                ${
                  theme === "dark"
                    ? "bg-gradient-to-br from-blue-500 to-purple-600"
                    : "bg-gradient-to-br from-blue-600 to-purple-700"
                }
              `}
              >
                <span className="text-white font-bold">
                  {blog.author.charAt(0)}
                </span>
              </div>
              <div>
                <div className="flex items-center gap-1">
                  <FaUser className="text-xs opacity-70" />
                  <span className="font-medium">{blog.author}</span>
                </div>
                <div className="flex items-center gap-1 text-xs opacity-70 mt-0.5">
                  <FaClock className="text-xs" />
                  <span>{blog.date}</span>
                </div>
              </div>
            </div>

            {/* Reading time estimate */}
            <div
              className={`
              px-3 py-1 rounded-full text-xs
              ${
                theme === "dark"
                  ? "bg-gray-800 text-gray-300"
                  : "bg-gray-100 text-gray-700"
              }
            `}
            >
              {Math.ceil(blog.content.length / 1000)} min read
            </div>
          </div>

          {/* Blog Excerpt */}
          <div className="px-6 sm:px-10 py-8">
            <p className="text-lg font-light italic opacity-90 border-l-4 pl-4 border-blue-500">
              <TextGenerateEffect words={blog.excerpt} />
            </p>
          </div>
        </motion.div>

        {/* Blog Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className={`
            rounded-2xl overflow-hidden p-6 sm:p-10 mb-10
            ${
              theme === "dark"
                ? "bg-gray-900/30 backdrop-blur-md border border-gray-800"
                : "bg-white/80 backdrop-blur-md border border-gray-200"
            }
          `}
        >
          <div
            className={`prose max-w-none ${
              theme === "dark"
                ? "prose-invert prose-headings:text-blue-300 prose-a:text-blue-400 prose-strong:text-blue-200 prose-code:text-blue-300 prose-pre:bg-gray-900 prose-pre:border prose-pre:border-gray-800"
                : "prose-headings:text-blue-700 prose-a:text-blue-600 prose-strong:text-blue-700 prose-code:text-blue-600 prose-pre:bg-gray-50 prose-pre:border prose-pre:border-gray-200"
            }`}
          >
            <ReactMarkdown>{blog.content}</ReactMarkdown>
          </div>
        </motion.div>

        {/* Tags and Share */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className={`
            rounded-2xl p-6 sm:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6
            ${
              theme === "dark"
                ? "bg-gray-900/30 backdrop-blur-md border border-gray-800"
                : "bg-white/80 backdrop-blur-md border border-gray-200"
            }
          `}
        >
          {/* Tags */}
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-4">
              <FaTag
                className={`${
                  theme === "dark" ? "text-blue-400" : "text-blue-600"
                }`}
              />
              <h3 className="font-medium">Topics</h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {blog.tags.map((tag, index) => (
                <motion.span
                  key={index}
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.4 + index * 0.05 }}
                  className={`
                    px-3 py-1.5 rounded-full text-xs 
                    ${
                      theme === "dark"
                        ? "bg-blue-900/40 text-blue-300 border border-blue-800/50"
                        : "bg-blue-100 text-blue-700 border border-blue-200/50"
                    }
                    hover:scale-105 transition-all duration-200
                  `}
                >
                  {tag}
                </motion.span>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="w-full md:w-auto">
            <Link href="/blog">
              <Button
                className={`w-full md:w-auto px-6 py-2 ${
                  theme === "dark"
                    ? "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                    : "bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600"
                } text-white`}
                borderRadius="1.5rem"
              >
                Explore More Articles
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
