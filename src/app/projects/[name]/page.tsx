'use client'

import ProjectDetails from '@/components/ProjectDetails'
import Navbar from '@/components/Navbar'
import { ThemeContext } from '@/providers/ThemeProvider'
import { useContext } from 'react'
import { use } from 'react'

export default function ProjectPage({ params }: { params: { name: string } }) {
  const { theme } = useContext(ThemeContext)
  
  // Unwrap the params object using React.use()
  const unwrappedParams = use(params)
  const projectName = unwrappedParams.name

  return (
    <div
      className={
        theme === 'dark' ? 'bg-black text-white' : 'bg-white text-black'
      }
    >
      <Navbar />
      <ProjectDetails projectName={projectName} />
    </div>
  )
}