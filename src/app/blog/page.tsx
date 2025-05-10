'use client'

import { ThemeContext } from '@/providers/ThemeProvider'
import { useContext, useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { TextGenerateEffect } from '@/components/ui/text-generate-effect'
import Link from 'next/link'
import { SparklesCore } from '@/components/ui/sparkles'

interface BlogPost {
  id: number
  title: string
  slug: string
  date: string
  category: string
  excerpt: string
  content: string
  image: string
  author: string
  tags: string[]
}

const BlogPage = () => {
  const { theme } = useContext(ThemeContext)
  const [blogs, setBlogs] = useState<BlogPost[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/blogs_data.json')
      .then((response) => response.json())
      .then((data) => {
        setBlogs(data.blogs)
        setLoading(false)
      })
      .catch((error) => {
        console.error('Error fetching blogs:', error)
        setLoading(false)
      })
  }, [])

  return (
    <div
      className={
        theme === 'dark'
          ? 'min-h-screen pt-32 pb-16 bg-black text-white'
          : 'min-h-screen pt-32 pb-16 bg-white text-black'
      }
    >
      <div className='relative'>
        {/* Background sparkles */}
        <div className='absolute inset-0 w-full h-full'>
          <SparklesCore
            id='blogSparks'
            background='transparent'
            minSize={0.4}
            maxSize={1}
            particleDensity={40}
            className='w-full h-full'
            particleColor={theme === 'dark' ? '#ffffff' : '#000000'}
          />
        </div>

        <motion.div
          className='max-w-5xl mx-auto px-4 sm:px-6 relative z-10'
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className='text-center mb-16'>
            <motion.h1
              className='text-4xl md:text-5xl lg:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 via-cyan-800 to-blue-200 mb-4'
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2, type: 'spring' }}
            >
              My Blog
            </motion.h1>
            <div className='text-center text-base md:text-lg font-normal max-w-3xl mx-auto'>
              <TextGenerateEffect words='Insights, tutorials, and thoughts on web development, design, and technology.' />
            </div>
          </div>

          {loading ? (
            <div className='flex justify-center items-center py-20'>
              <div className='animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500'></div>
            </div>
          ) : (
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
              {blogs.map((blog) => (
                <motion.div
                  key={blog.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: blog.id * 0.1 }}
                  className={
                    theme === 'dark'
                      ? 'flex flex-col rounded-xl overflow-hidden border border-gray-800 hover:border-blue-500/50 transition-all duration-300 h-full'
                      : 'flex flex-col rounded-xl overflow-hidden border border-gray-200 hover:border-blue-500/50 transition-all duration-300 h-full'
                  }
                >
                  <div
                    className='h-48 bg-cover bg-center'
                    style={{
                      backgroundImage: `url(${blog.image})`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                    }}
                  />
                  <div
                    className={
                      theme === 'dark'
                        ? 'flex-1 p-6 bg-gray-950/80 backdrop-blur-sm'
                        : 'flex-1 p-6 bg-white/90 backdrop-blur-sm'
                    }
                  >
                    <div className='flex items-center mb-4 text-sm'>
                      <span
                        className={
                          theme === 'dark'
                            ? 'inline-block bg-blue-900/50 text-blue-300 px-2 py-1 rounded-full'
                            : 'inline-block bg-blue-100 text-blue-700 px-2 py-1 rounded-full'
                        }
                      >
                        {blog.category}
                      </span>
                      <span className='ml-2 opacity-70'>{blog.date}</span>
                    </div>
                    <h2 className='text-xl font-bold mb-3'>{blog.title}</h2>
                    <p className='text-sm opacity-80 mb-4'>{blog.excerpt}</p>
                    <Link
                      href={`/blog/${blog.slug}`}
                      className={
                        theme === 'dark'
                          ? 'text-blue-400 hover:text-blue-300 inline-flex items-center text-sm'
                          : 'text-blue-600 hover:text-blue-700 inline-flex items-center text-sm'
                      }
                    >
                      Read More
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        className='h-4 w-4 ml-1'
                        fill='none'
                        viewBox='0 0 24 24'
                        stroke='currentColor'
                      >
                        <path
                          strokeLinecap='round'
                          strokeLinejoin='round'
                          strokeWidth={2}
                          d='M9 5l7 7-7 7'
                        />
                      </svg>
                    </Link>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </div>
  )
}

export default BlogPage
