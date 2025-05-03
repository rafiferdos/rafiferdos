import ProjectDetails from '@/components/ProjectDetails'
import Navbar from '@/components/Navbar'

// Updated type definition to match Next.js 15's expectations
interface PageProps {
  params: { name: string }
  searchParams: Record<string, string | string[] | undefined>
}

export default function ProjectPage({ params }: PageProps) {
  const projectName = params.name

  return (
    <div>
      <Navbar />
      <ProjectDetails projectName={projectName} />
    </div>
  )
}
