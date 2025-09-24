// app/projects/[slug]/page.tsx
import { getProject, getProjects } from '@/lib/cosmic'
import { Project } from '@/types'
import Link from 'next/link'
import { notFound } from 'next/navigation'

interface ProjectPageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const projects = await getProjects() as Project[]
  return projects.map((project) => ({
    slug: project.slug,
  }))
}

export async function generateMetadata({ params }: ProjectPageProps) {
  const { slug } = await params
  const project = await getProject(slug) as Project | null

  if (!project) {
    return {
      title: 'Project Not Found',
    }
  }

  return {
    title: `${project.metadata?.title || project.title} - Projects`,
    description: project.metadata?.description || `${project.metadata?.title || project.title} photography project`,
  }
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params
  const project = await getProject(slug) as Project | null

  if (!project) {
    notFound()
  }

  const featuredImage = project.metadata?.featured_image
  const featuredImageUrl = featuredImage?.imgix_url 
    ? `${featuredImage.imgix_url}?w=1600&h=1200&fit=crop&auto=format,compress`
    : null

  const gallery = project.metadata?.gallery || []

  return (
    <div className="container-max section-padding py-16">
      {/* Back button */}
      <div className="mb-8">
        <Link 
          href="/projects" 
          className="inline-flex items-center text-primary-600 hover:text-primary-700 font-medium"
        >
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Projects
        </Link>
      </div>

      {/* Project header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          {project.metadata?.title || project.title}
        </h1>
        <div className="flex flex-wrap gap-4 text-gray-600 mb-6">
          {project.metadata?.client_name && (
            <span className="flex items-center">
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              {project.metadata.client_name}
            </span>
          )}
          {project.metadata?.project_date && (
            <span className="flex items-center">
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              {new Date(project.metadata.project_date).toLocaleDateString()}
            </span>
          )}
          {project.metadata?.location && (
            <span className="flex items-center">
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              {project.metadata.location}
            </span>
          )}
          {project.metadata?.category && (
            <span className="bg-primary-100 text-primary-800 px-2 py-1 rounded-full text-sm font-medium">
              {project.metadata.category.value}
            </span>
          )}
        </div>
        {project.metadata?.description && (
          <p className="text-lg text-gray-700 leading-relaxed">
            {project.metadata.description}
          </p>
        )}
      </div>

      {/* Featured image */}
      {featuredImageUrl && (
        <div className="mb-12">
          <img
            src={featuredImageUrl}
            alt={project.metadata?.title || project.title}
            className="w-full h-96 md:h-[500px] object-cover rounded-lg shadow-lg"
            width={1600}
            height={1200}
          />
        </div>
      )}

      {/* Gallery */}
      {gallery.length > 0 && (
        <div className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">Gallery</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {gallery.map((image, index) => {
              const imageUrl = image.imgix_url 
                ? `${image.imgix_url}?w=800&h=600&fit=crop&auto=format,compress`
                : image.url

              return (
                <div key={index} className="aspect-w-4 aspect-h-3">
                  <img
                    src={imageUrl}
                    alt={`${project.metadata?.title || project.title} - Image ${index + 1}`}
                    className="w-full h-64 object-cover rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
                    width={800}
                    height={600}
                  />
                </div>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}