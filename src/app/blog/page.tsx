"use client";

import { Button } from "@/components/ui/moving-border";
import { SparklesCore } from "@/components/ui/sparkles";
import { Spotlight } from "@/components/ui/Spotlight";
import { TextGenerateEffect } from "@/components/ui/text-generate-effect";
import { ThemeContext } from "@/providers/ThemeProvider";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";

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

const BlogPage = () => {
  const { theme } = useContext(ThemeContext);
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [hoveredBlog, setHoveredBlog] = useState<number | null>(null);

  useEffect(() => {
    fetch("/blogs_data.json")
      .then((response) => response.json())
      .then((data) => {
        setBlogs(data.blogs);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching blogs:", error);
        setLoading(false);
      });
  }, []);

  // Get all unique categories
  const categories = Array.from(new Set(blogs.map((blog) => blog.category)));

  // Filter blogs by selected category
  const filteredBlogs = selectedCategory
    ? blogs.filter((blog) => blog.category === selectedCategory)
    : blogs;

  return (
    <div
      className={`min-h-screen pt-32 pb-16 ${
        theme === "dark" ? "bg-black text-white" : "bg-white text-black"
      } relative overflow-hidden`}
    >
      {/* Background Elements */}
      <div className="absolute inset-0">
        {/* Sparkles */}
        <SparklesCore
          id="blogSparks"
          background="transparent"
          minSize={0.4}
          maxSize={1}
          particleDensity={theme === "dark" ? 50 : 30}
          className="w-full h-full"
          particleColor={theme === "dark" ? "#ffffff" : "#000000"}
        />

        {/* Spotlight */}
        <Spotlight
          className="hidden md:block -top-40 left-0 md:left-60"
          fill={
            theme === "dark"
              ? "rgba(45, 85, 255, 0.15)"
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
      </div>

      <div className="relative z-10">
        <motion.div
          className="max-w-7xl mx-auto px-4 sm:px-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7 }}
        >
          {/* Header */}
          <motion.div
            className="relative text-center mb-16"
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <div className="absolute -top-24 left-1/2 transform -translate-x-1/2 w-96 h-96 rounded-full blur-[120px] opacity-20 bg-gradient-to-r from-blue-500 to-purple-600 pointer-events-none"></div>
            <motion.h1
              className={`text-5xl md:text-6xl lg:text-7xl font-bold bg-clip-text text-transparent ${
                theme === "dark"
                  ? "bg-gradient-to-br from-blue-400 via-indigo-400 to-purple-400"
                  : "bg-gradient-to-br from-blue-700 via-indigo-600 to-purple-700"
              } mb-6`}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8, type: "spring" }}
            >
              Future Blog
            </motion.h1>
            <div className="text-center text-base md:text-xl font-normal max-w-3xl mx-auto mb-8">
              <TextGenerateEffect words="Discover the latest insights on emerging technologies, web development, and the digital frontier." />
            </div>

            {/* Categories Filter */}
            <div className="flex flex-wrap justify-center gap-3 mb-10">
              <motion.button
                className={`px-4 py-2 rounded-full text-sm border transition-all ${
                  selectedCategory === null
                    ? theme === "dark"
                      ? "bg-blue-500/20 border-blue-500/50 text-blue-200"
                      : "bg-blue-500/20 border-blue-500/50 text-blue-700"
                    : theme === "dark"
                    ? "border-gray-700 hover:border-blue-500/50 hover:bg-blue-900/20"
                    : "border-gray-300 hover:border-blue-500/50 hover:bg-blue-100/50"
                }`}
                onClick={() => setSelectedCategory(null)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
              >
                All
              </motion.button>
              {categories.map((category) => (
                <motion.button
                  key={category}
                  className={`px-4 py-2 rounded-full text-sm border transition-all ${
                    selectedCategory === category
                      ? theme === "dark"
                        ? "bg-blue-500/20 border-blue-500/50 text-blue-200"
                        : "bg-blue-500/20 border-blue-500/50 text-blue-700"
                      : theme === "dark"
                      ? "border-gray-700 hover:border-blue-500/50 hover:bg-blue-900/20"
                      : "border-gray-300 hover:border-blue-500/50 hover:bg-blue-100/50"
                  }`}
                  onClick={() => setSelectedCategory(category)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {category}
                </motion.button>
              ))}
            </div>
          </motion.div>

          {/* Blog Posts */}
          {loading ? (
            <div className="flex justify-center items-center py-20">
              <div className="w-16 h-16 relative">
                <div className="absolute inset-0 rounded-full border-t-2 border-r-transparent border-l-transparent border-b-2 border-blue-500 animate-spin"></div>
                <div className="absolute inset-[6px] rounded-full border-r-2 border-l-transparent border-t-transparent border-b-2 border-purple-500 animate-spin"></div>
              </div>
            </div>
          ) : (
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedCategory || "all"}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
              >
                {filteredBlogs.map((blog) => (
                  <motion.div
                    key={blog.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: blog.id * 0.05 }}
                    whileHover={{ y: -8, transition: { duration: 0.2 } }}
                    onHoverStart={() => setHoveredBlog(blog.id)}
                    onHoverEnd={() => setHoveredBlog(null)}
                    className={`
                      group flex flex-col rounded-xl overflow-hidden 
                      ${
                        theme === "dark"
                          ? "bg-gray-900/30 backdrop-blur-md border border-gray-800 hover:border-blue-500/50 shadow-lg shadow-blue-900/20"
                          : "bg-white/80 backdrop-blur-md border border-gray-200 hover:border-blue-500/50 shadow-lg hover:shadow-blue-200/40"
                      } 
                      transition-all duration-300 h-full
                    `}
                  >
                    {/* Image section with overlay glow effect */}
                    <div className="relative h-56 overflow-hidden">
                      <motion.div
                        className="absolute inset-0 bg-cover bg-center z-0 transform group-hover:scale-110 transition-transform duration-700 ease-in-out"
                        style={{ backgroundImage: `url(${blog.image})` }}
                        animate={
                          hoveredBlog === blog.id
                            ? { scale: 1.05 }
                            : { scale: 1 }
                        }
                        transition={{ duration: 0.4 }}
                      />
                      <div
                        className={`absolute inset-0 ${
                          theme === "dark"
                            ? "bg-gradient-to-t from-gray-900 via-gray-900/60 to-transparent"
                            : "bg-gradient-to-t from-white via-white/60 to-transparent"
                        }`}
                      ></div>

                      {/* Category badge */}
                      <div className="absolute bottom-4 left-4 z-10">
                        <span
                          className={`
                          inline-block px-3 py-1 rounded-full text-xs font-medium
                          ${
                            theme === "dark"
                              ? "bg-blue-900/70 text-blue-200 backdrop-blur-sm"
                              : "bg-blue-100 text-blue-700 backdrop-blur-sm"
                          }
                        `}
                        >
                          {blog.category}
                        </span>
                      </div>

                      {/* Date badge */}
                      <div className="absolute top-4 right-4 z-10">
                        <span
                          className={`
                          inline-block px-3 py-1 rounded-full text-[10px] font-medium
                          ${
                            theme === "dark"
                              ? "bg-gray-800/70 text-gray-300 backdrop-blur-sm"
                              : "bg-gray-100/70 text-gray-700 backdrop-blur-sm"
                          }
                        `}
                        >
                          {blog.date}
                        </span>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="flex-1 p-6 flex flex-col">
                      <h2
                        className={`text-xl font-bold mb-3 ${
                          hoveredBlog === blog.id && theme === "dark"
                            ? "text-blue-300"
                            : hoveredBlog === blog.id
                            ? "text-blue-600"
                            : ""
                        }`}
                      >
                        {blog.title}
                      </h2>

                      <p className="text-sm opacity-80 mb-5 flex-grow line-clamp-3">
                        {blog.excerpt}
                      </p>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-2 mb-4">
                        {blog.tags.slice(0, 3).map((tag, index) => (
                          <span
                            key={index}
                            className={`
                              text-[10px] px-2 py-1 rounded-full
                              ${
                                theme === "dark"
                                  ? "bg-gray-800 text-gray-400"
                                  : "bg-gray-100 text-gray-600"
                              }
                            `}
                          >
                            {tag}
                          </span>
                        ))}
                        {blog.tags.length > 3 && (
                          <span
                            className={`
                              text-[10px] px-2 py-1 rounded-full
                              ${
                                theme === "dark"
                                  ? "bg-gray-800 text-gray-400"
                                  : "bg-gray-100 text-gray-600"
                              }
                            `}
                          >
                            +{blog.tags.length - 3}
                          </span>
                        )}
                      </div>

                      {/* Read more link with glow effect */}
                      <div className="flex items-center justify-between mt-auto">
                        <div className="flex items-center">
                          <div
                            className={`w-8 h-8 rounded-full flex items-center justify-center ${
                              theme === "dark"
                                ? "bg-blue-900/30 text-blue-300"
                                : "bg-blue-100 text-blue-700"
                            }`}
                          >
                            {blog.author.charAt(0)}
                          </div>
                          <span className="ml-2 text-xs opacity-70">
                            {blog.author}
                          </span>
                        </div>

                        <Link href={`/blog/${blog.slug}`}>
                          <Button
                            borderRadius="1.5rem"
                            className={`
                              px-4 py-1 text-sm group-hover:shadow-md group-hover:shadow-blue-500/20
                              ${
                                theme === "dark"
                                  ? "bg-blue-900/30 hover:bg-blue-800/50"
                                  : "bg-blue-50 hover:bg-blue-100"
                              }
                            `}
                          >
                            Read More
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </AnimatePresence>
          )}

          {/* Extra flourishes */}
          <div className="fixed top-1/3 right-0 w-40 h-40 bg-blue-500 rounded-full filter blur-[120px] opacity-10 pointer-events-none"></div>
          <div className="fixed bottom-1/3 left-0 w-40 h-40 bg-purple-500 rounded-full filter blur-[100px] opacity-10 pointer-events-none"></div>
        </motion.div>
      </div>
    </div>
  );
};

export default BlogPage;
