import Link from 'next/link'
import { Project } from '@/types'

interface FeaturedProjectsProps {
  projects: Project[]
}

export default function FeaturedProjects({ projects }: FeaturedProjectsProps) {
  if (!projects || projects.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">No featured projects available</p>
      </div>
    )
  }

  return (
    <section className="space-y-12 animate-slide-up">
      <div className="text-center space-y-4">
        <h2 className="text-3xl md:text-4xl font-bold text-primary-900">
          Featured Projects
        </h2>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          A showcase of recent photography work across various categories
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects.map((project) => {
          const featuredImage = project.metadata?.featured_image;
          const category = project.metadata?.category;
          
          return (
            <Link 
              key={project.id} 
              href={`/projects/${project.slug}`}
              className="group block"
            >
              <article className="card hover:shadow-lg transition-all duration-300 group-hover:-translate-y-1">
                {featuredImage && (
                  <div className="aspect-video overflow-hidden rounded-lg mb-6">
                    <img
                      src={`${featuredImage.imgix_url}?w=800&h=450&fit=crop&auto=format,compress`}
                      alt={project.title}
                      width={400}
                      height={225}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                )}
                
                <div className="space-y-3">
                  {category && (
                    <span className="inline-block px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-sm font-medium">
                      {category.value}
                    </span>
                  )}
                  
                  <h3 className="text-xl font-semibold text-primary-900 group-hover:text-primary-600 transition-colors duration-200">
                    {project.title}
                  </h3>
                  
                  {project.metadata?.description && (
                    <p className="text-gray-600 line-clamp-3">
                      {project.metadata.description}
                    </p>
                  )}
                  
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    {project.metadata?.client_name && (
                      <span>Client: {project.metadata.client_name}</span>
                    )}
                    
                    {project.metadata?.project_date && (
                      <span>{new Date(project.metadata.project_date).getFullYear()}</span>
                    )}
                  </div>
                </div>
              </article>
            </Link>
          )
        })}
      </div>

      <div className="text-center">
        <Link href="/projects" className="btn-primary">
          View All Projects
        </Link>
      </div>
    </section>
  )
}