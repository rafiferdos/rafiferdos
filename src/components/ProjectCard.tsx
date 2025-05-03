'use client'

import Image from 'next/image'
import React, { useContext } from 'react'
import { ThemeContext } from '@/providers/ThemeProvider'
import Link from 'next/link'
import { Project } from './Projects'
import { CardBody, CardContainer, CardItem } from './ui/3d-card'
import { useRouter } from 'next/navigation'

type ProjectCardProps = {
  project: Project
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  const { theme } = useContext(ThemeContext)
  const { name, description, image, link, github_link } = project
  const router = useRouter()

  const projectPath = `/projects/${encodeURIComponent(
    name.toLowerCase().replace(/ /g, '-')
  )}`

  return (
    <Link href={projectPath} className='block cursor-pointer h-full'>
      <CardContainer className='inter-var project-card-container h-full'>
        <CardBody
          className={
            theme === 'light'
              ? 'bg-gray-50 relative group/card dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1] w-auto sm:w-[30rem] rounded-xl p-6 border project-card-body cursor-pointer h-full flex flex-col'
              : 'bg-gray-950 relative group/card hover:shadow-2xl hover:shadow-emerald-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1] w-auto sm:w-[30rem] rounded-xl p-6 border project-card-body cursor-pointer h-full flex flex-col'
          }
        >
          <CardItem
            translateZ='50'
            className={
              theme === 'dark'
                ? 'text-xl font-bold text-neutral-600 dark:text-white'
                : 'text-xl font-bold text-neutral-900 dark:text-black'
            }
          >
            Project:{' '}
            <span className={theme === 'dark' ? 'text-white' : 'text-black'}>
              {name}
            </span>
          </CardItem>
          <CardItem
            as='p'
            translateZ='60'
            className={
              theme === 'dark'
                ? 'text-neutral-500 text-sm max-w-sm mt-2 dark:text-neutral-300 line-clamp-3'
                : 'text-neutral-600 text-sm max-w-sm mt-2 dark:text-neutral-400 line-clamp-3'
            }
          >
            {description}
          </CardItem>
          <CardItem translateZ='100' className='w-full mt-4 flex-shrink-0'>
            <Image
              src={image}
              height='1000'
              width='1000'
              className='h-60 w-full object-cover rounded-xl group-hover/card:shadow-xl'
              alt='thumbnail'
            />
          </CardItem>
          <div className='flex-grow'></div>
          <div
            className='flex justify-between items-center mt-6'
            onClick={(e) => e.stopPropagation()}
          >
            <CardItem
              translateZ={20}
              as={Link}
              href={link}
              target='__blank'
              className='px-4 py-2 rounded-xl text-xs font-normal flex-grow-0'
            >
              View Live →
            </CardItem>
            <CardItem
              translateZ={20}
              as={Link}
              href={github_link}
              target='__blank'
              className={
                theme === 'dark'
                  ? 'px-4 py-2 rounded-xl bg-gray-800 text-white text-xs font-bold hover:bg-gray-700'
                  : 'px-4 py-2 rounded-xl bg-black text-white text-xs font-bold hover:bg-gray-800'
              }
            >
              Github
            </CardItem>
          </div>
        </CardBody>
      </CardContainer>
    </Link>
  )
}

export default ProjectCard
