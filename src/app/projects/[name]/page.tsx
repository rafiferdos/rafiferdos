import ProjectDetails from '@/components/ProjectDetails'
import Navbar from '@/components/Navbar'

// Define the correct types for the page props
type ProjectPageProps = {
  params: { name: string }
}

export default function ProjectPage({ params }: ProjectPageProps) {
  // In a server component, you can access params directly
  const projectName = params.name

  return (
    <div>
      <Navbar />
      <ProjectDetails projectName={projectName} />
    </div>
  )
}
