import ProjectDetails from '@/components/ProjectDetails'
import Navbar from '@/components/Navbar'
import { use } from 'react'

// Define the page props to match Next.js 15's expectations
interface PageProps {
  params: Promise<{ name: string }>
  searchParams: Record<string, string | string[] | undefined>
}

export default function ProjectPage(props: PageProps) {
  // Unwrap the params Promise using React.use()
  const params = use(props.params)
  const projectName = params.name

  return (
    <div>
      <Navbar />
      <ProjectDetails projectName={projectName} />
    </div>
  )
}
