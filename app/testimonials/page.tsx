import { getTestimonials } from '@/lib/cosmic'
import { Testimonial } from '@/types'

export const metadata = {
  title: 'Testimonials - Professional Photography Portfolio',
  description: 'Read what my clients say about their photography experience and the quality of my work.',
}

export default async function TestimonialsPage() {
  const testimonials = await getTestimonials() as Testimonial[]

  if (!testimonials || testimonials.length === 0) {
    return (
      <div className="container-max section-padding py-16">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Testimonials</h1>
          <p className="text-gray-600">No testimonials available at the moment.</p>
        </div>
      </div>
    )
  }

  // Group testimonials by project type
  const testimonialsByType = testimonials.reduce((acc: Record<string, Testimonial[]>, testimonial) => {
    const projectType = testimonial.metadata?.project_type?.value || 'General'
    if (!acc[projectType]) {
      acc[projectType] = []
    }
    acc[projectType].push(testimonial)
    return acc
  }, {})

  return (
    <div className="container-max section-padding py-16">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Client Testimonials</h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Hear what my clients have to say about their photography experience and the quality of work delivered.
        </p>
      </div>

      {Object.keys(testimonialsByType).map((projectType) => {
        const typeTestimonials = testimonialsByType[projectType]
        if (!typeTestimonials || typeTestimonials.length === 0) {
          return null
        }

        return (
          <div key={projectType} className="mb-12">
            <h2 className="text-2xl font-semibold text-gray-900 mb-8 text-center">{projectType} Photography</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {typeTestimonials.map((testimonial) => (
                <TestimonialCard key={testimonial.id} testimonial={testimonial} />
              ))}
            </div>
          </div>
        )
      })}
    </div>
  )
}

function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  const rating = parseInt(testimonial.metadata?.rating?.key || '5')
  const date = testimonial.metadata?.date 
    ? new Date(testimonial.metadata.date).toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      })
    : null

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => {
      const filled = index < rating
      return (
        <svg
          key={index}
          className={`w-5 h-5 ${filled ? 'text-yellow-400' : 'text-gray-300'}`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path
            fillRule="evenodd"
            d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"
            clipRule="evenodd"
          />
        </svg>
      )
    })
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 h-full flex flex-col">
      {/* Stars */}
      <div className="flex mb-4">
        {renderStars(rating)}
      </div>

      {/* Quote */}
      {testimonial.metadata?.quote && (
        <blockquote className="text-gray-700 italic mb-4 flex-grow leading-relaxed">
          "{testimonial.metadata.quote}"
        </blockquote>
      )}

      {/* Client info */}
      <div className="border-t pt-4 mt-auto">
        <div className="flex justify-between items-start">
          <div>
            {testimonial.metadata?.client_name && (
              <p className="font-semibold text-gray-900">
                {testimonial.metadata.client_name}
              </p>
            )}
            {testimonial.metadata?.company && (
              <p className="text-sm text-gray-600">
                {testimonial.metadata.company}
              </p>
            )}
          </div>
          {date && (
            <p className="text-xs text-gray-500">
              {date}
            </p>
          )}
        </div>
      </div>
    </div>
  )
}