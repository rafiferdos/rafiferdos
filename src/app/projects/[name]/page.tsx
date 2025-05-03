'use client'

import ProjectDetails from '@/components/ProjectDetails'
import Footer from '@/components/Footer'
import Navbar from '@/components/Navbar'
import { ThemeContext } from '@/providers/ThemeProvider'
import { useContext } from 'react'

export default function ProjectPage({ params }: { params: { name: string } }) {
  const { theme } = useContext(ThemeContext)

  console.log('Page rendering with params:', params) // Add debug log

  return (
    <div
      className={
        theme === 'dark' ? 'bg-black text-white' : 'bg-white text-black'
      }
    >
      <Navbar />
      <ProjectDetails projectName={params.name} />
      <Footer />
    </div>
  )
}
