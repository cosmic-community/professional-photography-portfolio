import Link from 'next/link'
import { Testimonial } from '@/types'

interface TestimonialPreviewProps {
  testimonial: Testimonial
}

export default function TestimonialPreview({ testimonial }: TestimonialPreviewProps) {
  if (!testimonial) {
    return null
  }

  const rating = testimonial.metadata?.rating;
  const ratingNumber = rating ? parseInt(rating.key) : 0;

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => {
      const filled = index < rating ? 'text-yellow-400' : 'text-gray-300';
      return (
        <svg
          key={index}
          className={`w-5 h-5 ${filled}`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path
            fillRule="evenodd"
            d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"
            clipRule="evenodd"
          />
        </svg>
      );
    });
  };

  return (
    <section className="bg-white py-16 animate-slide-up">
      <div className="text-center space-y-12">
        <div className="space-y-4">
          <h2 className="text-3xl md:text-4xl font-bold text-primary-900">
            What Clients Say
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Testimonials from satisfied clients who trusted us with their special moments
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="card bg-gradient-to-br from-primary-50 to-secondary-50 border-primary-200">
            <div className="space-y-6">
              {/* Stars */}
              <div className="flex justify-center text-yellow-400">
                {renderStars(ratingNumber)}
              </div>

              {/* Quote */}
              {testimonial.metadata?.quote && (
                <blockquote className="text-xl md:text-2xl text-gray-700 italic leading-relaxed text-center">
                  "{testimonial.metadata.quote}"
                </blockquote>
              )}

              {/* Client info */}
              <div className="text-center space-y-2">
                {testimonial.metadata?.client_name && (
                  <p className="font-semibold text-primary-900 text-lg">
                    {testimonial.metadata.client_name}
                  </p>
                )}
                
                <div className="flex items-center justify-center gap-4 text-gray-600">
                  {testimonial.metadata?.company && (
                    <span>{testimonial.metadata.company}</span>
                  )}
                  
                  {testimonial.metadata?.project_type && (
                    <span className="px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-sm">
                      {testimonial.metadata.project_type.value}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="text-center">
          <Link href="/testimonials" className="btn-primary">
            Read More Reviews
          </Link>
        </div>
      </div>
    </section>
  )
}