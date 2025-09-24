import { getWorkExperience } from '@/lib/cosmic'
import { WorkExperience } from '@/types'

export const metadata = {
  title: 'Experience - Professional Photography Portfolio',
  description: 'Explore my professional photography experience and career journey.',
}

export default async function ExperiencePage() {
  const experiences = await getWorkExperience() as WorkExperience[]

  if (!experiences || experiences.length === 0) {
    return (
      <div className="container-max section-padding py-16">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Experience</h1>
          <p className="text-gray-600">No experience information available at the moment.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="container-max section-padding py-16">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Professional Experience</h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          My journey in professional photography, showcasing career highlights and achievements.
        </p>
      </div>

      <div className="max-w-4xl mx-auto">
        <div className="space-y-8">
          {experiences.map((experience, index) => (
            <ExperienceCard key={experience.id} experience={experience} isLast={index === experiences.length - 1} />
          ))}
        </div>
      </div>
    </div>
  )
}

function ExperienceCard({ experience, isLast }: { experience: WorkExperience; isLast: boolean }) {
  const startDate = experience.metadata?.start_date 
    ? new Date(experience.metadata.start_date)
    : null
  const endDate = experience.metadata?.end_date 
    ? new Date(experience.metadata.end_date)
    : null
  const isCurrentPosition = experience.metadata?.current_position

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long' 
    })
  }

  const achievements = experience.metadata?.achievements?.split('\n').filter(Boolean) || []

  return (
    <div className="relative">
      {/* Timeline line */}
      {!isLast && (
        <div className="absolute left-8 top-16 w-0.5 h-full bg-gray-200"></div>
      )}
      
      <div className="flex items-start space-x-6">
        {/* Timeline dot */}
        <div className={`flex-shrink-0 w-4 h-4 rounded-full mt-6 ${
          isCurrentPosition ? 'bg-primary-600' : 'bg-gray-400'
        }`}></div>
        
        {/* Content */}
        <div className="flex-grow bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-300">
          <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-4">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-1">
                {experience.metadata?.job_title || experience.title}
              </h3>
              <p className="text-lg text-primary-600 font-medium mb-2">
                {experience.metadata?.company}
              </p>
              {experience.metadata?.location && (
                <p className="text-gray-600 flex items-center">
                  <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  {experience.metadata.location}
                </p>
              )}
            </div>
            <div className="text-right mt-2 md:mt-0">
              <div className="text-gray-600">
                {startDate && (
                  <>
                    {formatDate(startDate)} - {
                      isCurrentPosition ? (
                        <span className="text-primary-600 font-medium">Present</span>
                      ) : endDate ? (
                        formatDate(endDate)
                      ) : 'Present'
                    }
                  </>
                )}
              </div>
              {isCurrentPosition && (
                <span className="inline-block bg-green-100 text-green-800 text-xs font-medium px-2 py-1 rounded-full mt-1">
                  Current Position
                </span>
              )}
            </div>
          </div>
          
          {experience.metadata?.description && (
            <p className="text-gray-700 mb-4 leading-relaxed">
              {experience.metadata.description}
            </p>
          )}
          
          {achievements.length > 0 && (
            <div>
              <h4 className="text-sm font-semibold text-gray-900 mb-2">Key Achievements:</h4>
              <ul className="space-y-1">
                {achievements.map((achievement, index) => (
                  <li key={index} className="text-gray-700 text-sm leading-relaxed">
                    {achievement}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}