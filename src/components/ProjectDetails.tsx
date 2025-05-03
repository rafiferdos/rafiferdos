'use client'

import { ThemeContext } from '@/providers/ThemeProvider'
import { useContext, useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { IoArrowBackOutline } from 'react-icons/io5'
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa'
import { motion } from 'framer-motion'
import { Project } from './Projects'
import { SparklesCore } from './ui/sparkles'
import { BackgroundGradient } from './ui/background-gradient'
import { TextGenerateEffect } from './ui/text-generate-effect'
import { Button } from './ui/moving-border'

interface ProjectDetailsProps {
  projectName: string
}

const ProjectDetails = ({ projectName }: ProjectDetailsProps) => {
  const { theme } = useContext(ThemeContext)
  const [project, setProject] = useState<Project | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Fetch the project data from your JSON file
    fetch('/projects_data.json')
      .then((response) => response.json())
      .then((data) => {
        const foundProject = data.projects.find(
          (p: Project) =>
            p.name.toLowerCase().replace(/ /g, '-') ===
            projectName.toLowerCase().replace(/ /g, '-')
        )
        setProject(foundProject || null)
        setLoading(false)
      })
      .catch((error) => {
        console.error('Error fetching project data:', error)
        setLoading(false)
      })
  }, [projectName])

  if (loading) {
    return (
      <div
        className={
          theme === 'dark'
            ? 'min-h-screen bg-black text-white flex items-center justify-center'
            : 'min-h-screen bg-white text-black flex items-center justify-center'
        }
      >
        <div className='animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500'></div>
      </div>
    )
  }

  if (!project) {
    return (
      <div
        className={
          theme === 'dark'
            ? 'min-h-screen bg-black text-white flex items-center justify-center'
            : 'min-h-screen bg-white text-black flex items-center justify-center'
        }
      >
        <div className='text-center'>
          <h1 className='text-3xl font-bold mb-4'>Project Not Found</h1>
          <Link href='/projects' className='text-blue-500 hover:underline'>
            Return to Projects
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div
      className={
        theme === 'dark'
          ? 'min-h-screen bg-black text-white pt-20 pb-10 relative'
          : 'min-h-screen bg-white text-black pt-20 pb-10 relative'
      }
    >
      {/* Background effects */}
      <div className='absolute inset-0 w-full h-full pointer-events-none'>
        <SparklesCore
          id='projectDetailSparks'
          background='transparent'
          minSize={0.4}
          maxSize={1}
          particleDensity={40}
          className='w-full h-full'
          particleColor={theme === 'dark' ? '#ffffff' : '#000000'}
        />
      </div>

      <div className='max-w-6xl mx-auto px-4 relative z-10'>
        <Link href='/#projects'>
          <motion.div
            initial={{ x: -10, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            className='flex items-center mb-6 text-blue-500 hover:text-blue-600'
          >
            <IoArrowBackOutline className='mr-2' />
            <span>Back to Projects</span>
          </motion.div>
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className='text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-500'>
            {project.name}
          </h1>

          <BackgroundGradient className='rounded-2xl p-1 mb-10'>
            <div
              className={
                theme === 'dark'
                  ? 'bg-gray-950 rounded-xl overflow-hidden'
                  : 'bg-white rounded-xl overflow-hidden'
              }
            >
              <Image
                src={project.image}
                alt={project.name}
                width={1200}
                height={600}
                className='w-full object-cover h-[40vh] md:h-[50vh]'
              />
            </div>
          </BackgroundGradient>

          <div className='grid grid-cols-1 md:grid-cols-3 gap-8 mb-10'>
            <div className='md:col-span-2'>
              <h2 className='text-2xl font-bold mb-4'>Project Description</h2>
              <div className='prose max-w-none text-lg opacity-80'>
                <TextGenerateEffect words={project.description} />
              </div>
            </div>

            <div>
              <div
                className={
                  theme === 'dark'
                    ? 'bg-gray-900/50 p-6 rounded-xl backdrop-blur-sm'
                    : 'bg-gray-100/50 p-6 rounded-xl backdrop-blur-sm'
                }
              >
                <h3 className='text-xl font-bold mb-4'>Project Links</h3>

                <div className='flex flex-col gap-4 mb-6'>
                  <Link
                    href={project.github_link}
                    target='_blank'
                    rel='noopener noreferrer'
                  >
                    <Button className='w-full flex items-center justify-center gap-2'>
                      <FaGithub /> View on GitHub
                    </Button>
                  </Link>

                  <Link
                    href={project.link}
                    target='_blank'
                    rel='noopener noreferrer'
                  >
                    <Button className='w-full flex items-center justify-center gap-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white'>
                      <FaExternalLinkAlt /> Visit Live Site
                    </Button>
                  </Link>
                </div>

                {/* You can expand this section with more project details like:
                <div className="mt-6">
                  <h4 className="font-medium mb-2">Technologies Used</h4>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies?.map((tech, i) => (
                      <span key={i} className="bg-blue-500/20 text-blue-600 px-2 py-1 rounded text-xs">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div> */}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default ProjectDetails
