'use client'

import { ThemeContext } from '@/providers/ThemeProvider'
import { useContext, useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { IoArrowBackOutline } from 'react-icons/io5'
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa'
import { motion } from 'framer-motion'
import { Project } from './Projects'
import { Button } from './ui/moving-border'
import { TextGenerateEffect } from './ui/text-generate-effect'

interface ProjectDetailsProps {
  projectName: string
}

const ProjectDetails = ({ projectName }: ProjectDetailsProps) => {
  const { theme } = useContext(ThemeContext)
  const [project, setProject] = useState<Project | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
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

  // Loading state
  if (loading) {
    return (
      <div
        className={`min-h-screen flex items-center justify-center ${
          theme === 'dark' ? 'bg-black text-white' : 'bg-white text-black'
        }`}
      >
        <div className='w-10 h-10 rounded-full border-2 border-t-blue-500 border-r-transparent border-b-blue-300 border-l-transparent animate-spin'></div>
      </div>
    )
  }

  // Project not found state
  if (!project) {
    return (
      <div
        className={`min-h-screen flex items-center justify-center ${
          theme === 'dark' ? 'bg-black text-white' : 'bg-white text-black'
        }`}
      >
        <div className='text-center max-w-md'>
          <h1 className='text-xl font-bold mb-3'>Project Not Found</h1>
          <Link href='/#projects'>
            <Button className='px-4 py-1 text-sm'>Return to Projects</Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div
      className={`min-h-screen pt-20 pb-16 ${
        theme === 'dark' ? 'bg-black text-white' : 'bg-white text-black'
      }`}
    >
      <div className='max-w-3xl mx-auto px-4 sm:px-6'>
        {/* Back button */}
        <Link href='/#projects'>
          <div className='inline-flex items-center gap-2 mb-8 text-sm opacity-70 hover:opacity-100 transition-opacity'>
            <IoArrowBackOutline />
            <span>Back</span>
          </div>
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          {/* Project Title */}
          <h1 className='text-2xl sm:text-3xl font-bold mb-6'>
            {project.name}
          </h1>

          {/* Project Image */}
          <div className='mb-8 rounded-lg overflow-hidden'>
            <Image
              src={project.image}
              alt={project.name}
              width={1200}
              height={600}
              className='w-full object-cover h-auto max-h-[400px]'
              priority
            />
          </div>

          <div className='grid grid-cols-1 md:grid-cols-12 gap-8'>
            {/* Project Description */}
            <div className='md:col-span-8 order-2 md:order-1'>
              <div className='prose max-w-none text-base opacity-90'>
                <TextGenerateEffect words={project.description} />
              </div>
            </div>

            {/* Project Links */}
            <div className='md:col-span-4 order-1 md:order-2 mb-8 md:mb-0'>
              <div
                className={`rounded-lg p-5 ${
                  theme === 'dark' ? 'bg-gray-900/30' : 'bg-gray-50/70'
                }`}
              >
                <div className='flex flex-col gap-3'>
                  <Link
                    href={project.link}
                    target='_blank'
                    rel='noopener noreferrer'
                  >
                    <Button className='w-full flex items-center justify-center gap-2 text-sm py-1.5'>
                      <FaExternalLinkAlt size={12} /> Live Preview
                    </Button>
                  </Link>

                  <Link
                    href={project.github_link}
                    target='_blank'
                    rel='noopener noreferrer'
                  >
                    <Button className='w-full flex items-center justify-center gap-2 bg-transparent border border-gray-600 text-sm py-1.5'>
                      <FaGithub size={14} /> Source Code
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default ProjectDetails
