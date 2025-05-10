'use client'

import { ThemeContext } from '@/providers/ThemeProvider'
import { useContext, useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { IoArrowBackOutline } from 'react-icons/io5'
import { use } from 'react'
import { Metadata } from 'next'
import { Button } from '@/components/ui/moving-border'
import ReactMarkdown from 'react-markdown'

// Define the page props to match Next.js 15's expectations
interface PageProps {
  params: Promise<{ slug: string }>
  searchParams: Promise<Record<string, string | string[] | undefined>>
}

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

export default function BlogPostPage(props: PageProps) {
  // Unwrap the params Promise using React.use()
  const params = use(props.params)
  const { theme } = useContext(ThemeContext)
  const [blog, setBlog] = useState<BlogPost | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/blogs_data.json')
      .then((response) => response.json())
      .then((data) => {
        const foundBlog = data.blogs.find(
          (b: BlogPost) => b.slug === params.slug
        )
        setBlog(foundBlog || null)
        setLoading(false)
      })
      .catch((error) => {
        console.error('Error fetching blog post:', error)
        setLoading(false)
      })
  }, [params.slug])

  if (loading) {
    return (
      <div
        className={`min-h-screen pt-20 pb-16 flex items-center justify-center ${
          theme === 'dark' ? 'bg-black text-white' : 'bg-white text-black'
        }`}
      >
        <div className='animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500'></div>
      </div>
    )
  }

  if (!blog) {
    return (
      <div
        className={`min-h-screen pt-20 pb-16 flex items-center justify-center ${
          theme === 'dark' ? 'bg-black text-white' : 'bg-white text-black'
        }`}
      >
        <div className='text-center'>
          <h1 className='text-xl font-bold mb-3'>Blog Post Not Found</h1>
          <Link href='/blog'>
            <Button className='px-4 py-1 text-sm'>Return to Blog</Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div
      className={`min-h-screen pt-32 pb-16 ${
        theme === 'dark' ? 'bg-black text-white' : 'bg-white text-black'
      }`}
    >
      <div className='max-w-3xl mx-auto px-4 sm:px-6'>
        {/* Back button */}
        <Link href='/blog'>
          <div className='inline-flex items-center gap-2 mb-8 text-sm opacity-70 hover:opacity-100 transition-opacity'>
            <IoArrowBackOutline />
            <span>Back to Blog</span>
          </div>
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          {/* Blog Header */}
          <div className='mb-8'>
            <div className='flex items-center gap-2 mb-4'>
              <span
                className={
                  theme === 'dark'
                    ? 'inline-block bg-blue-900/50 text-blue-300 px-2 py-1 rounded-full text-sm'
                    : 'inline-block bg-blue-100 text-blue-700 px-2 py-1 rounded-full text-sm'
                }
              >
                {blog.category}
              </span>
              <span className='text-sm opacity-70'>{blog.date}</span>
            </div>
            <h1 className='text-2xl sm:text-3xl md:text-4xl font-bold mb-4'>
              {blog.title}
            </h1>
            <p className='text-lg opacity-80 mb-6'>{blog.excerpt}</p>
            <div className='flex items-center mb-8'>
              <div className='mr-3 h-10 w-10 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold'>
                {blog.author.charAt(0)}
              </div>
              <div>
                <div className='font-medium'>{blog.author}</div>
              </div>
            </div>
          </div>

          {/* Featured Image */}
          <div
            className='w-full h-64 sm:h-80 md:h-96 rounded-xl mb-8 bg-cover bg-center'
            style={{ backgroundImage: `url(${blog.image})` }}
          />

          {/* Blog Content */}
          <div
            className={`prose max-w-none ${
              theme === 'dark'
                ? 'prose-invert prose-headings:text-blue-300 prose-a:text-blue-400'
                : 'prose-headings:text-blue-700 prose-a:text-blue-600'
            }`}
          >
            <ReactMarkdown>{blog.content}</ReactMarkdown>
          </div>

          {/* Tags */}
          <div className='mt-8 pt-6 border-t border-gray-700'>
            <div className='flex flex-wrap gap-2'>
              {blog.tags.map((tag, index) => (
                <span
                  key={index}
                  className={
                    theme === 'dark'
                      ? 'px-3 py-1 rounded-full text-xs bg-gray-800 text-gray-300'
                      : 'px-3 py-1 rounded-full text-xs bg-gray-200 text-gray-700'
                  }
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
