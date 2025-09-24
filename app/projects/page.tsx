import { getProjects } from '@/lib/cosmic'
import { Project } from '@/types'
import Link from 'next/link'

export const metadata = {
  title: 'Projects - Professional Photography Portfolio',
  description: 'Explore my photography projects including weddings, portraits, and commercial work.',
}

export default async function ProjectsPage() {
  const projects = await getProjects() as Project[]

  if (!projects || projects.length === 0) {
    return (
      <div className="container-max section-padding py-16">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Projects</h1>
          <p className="text-gray-600">No projects available at the moment.</p>
        </div>
      </div>
    )
  }

  // Group projects by category
  const projectsByCategory = projects.reduce((acc: Record<string, Project[]>, project) => {
    const category = project.metadata?.category?.value || 'Other'
    if (!acc[category]) {
      acc[category] = []
    }
    acc[category].push(project)
    return acc
  }, {})

  return (
    <div className="container-max section-padding py-16">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Projects</h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Discover my photography work across various categories, from intimate weddings to corporate events.
        </p>
      </div>

      {Object.keys(projectsByCategory).map((category) => {
        const categoryProjects = projectsByCategory[category]
        if (!categoryProjects || categoryProjects.length === 0) {
          return null
        }

        return (
          <div key={category} className="mb-16">
            <h2 className="text-2xl font-semibold text-gray-900 mb-8">{category}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {categoryProjects.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          </div>
        )
      })}
    </div>
  )
}

function ProjectCard({ project }: { project: Project }) {
  const featuredImage = project.metadata?.featured_image
  const imageUrl = featuredImage?.imgix_url 
    ? `${featuredImage.imgix_url}?w=800&h=600&fit=crop&auto=format,compress`
    : null

  return (
    <Link href={`/projects/${project.slug}`} className="group block">
      <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
        {imageUrl && (
          <div className="aspect-w-16 aspect-h-12 bg-gray-200">
            <img
              src={imageUrl}
              alt={project.metadata?.title || project.title}
              className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
              width={800}
              height={600}
            />
          </div>
        )}
        <div className="p-6">
          <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-primary-600 transition-colors">
            {project.metadata?.title || project.title}
          </h3>
          {project.metadata?.description && (
            <p className="text-gray-600 mb-4 line-clamp-3">
              {project.metadata.description}
            </p>
          )}
          <div className="flex justify-between items-center text-sm text-gray-500">
            {project.metadata?.client_name && (
              <span>{project.metadata.client_name}</span>
            )}
            {project.metadata?.project_date && (
              <span>{new Date(project.metadata.project_date).getFullYear()}</span>
            )}
          </div>
        </div>
      </div>
    </Link>
  )
}