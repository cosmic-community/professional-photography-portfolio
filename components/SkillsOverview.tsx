import Link from 'next/link'
import { Skill } from '@/types'

interface SkillsOverviewProps {
  skills: Skill[]
}

export default function SkillsOverview({ skills }: SkillsOverviewProps) {
  if (!skills || skills.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">No skills available</p>
      </div>
    )
  }

  const getProficiencyColor = (proficiency?: string) => {
    switch (proficiency?.toLowerCase()) {
      case 'expert':
        return 'bg-green-100 text-green-800 border-green-200'
      case 'advanced':
        return 'bg-blue-100 text-blue-800 border-blue-200'
      case 'intermediate':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200'
      case 'beginner':
        return 'bg-gray-100 text-gray-800 border-gray-200'
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  return (
    <section className="space-y-12 animate-slide-up">
      <div className="text-center space-y-4">
        <h2 className="text-3xl md:text-4xl font-bold text-primary-900">
          Skills & Expertise
        </h2>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Technical and creative capabilities developed over years of professional experience
        </p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {skills.map((skill) => {
          const proficiency = skill.metadata?.proficiency;
          const category = skill.metadata?.category;
          
          return (
            <div key={skill.id} className="card hover:shadow-md transition-shadow duration-200">
              <div className="space-y-4">
                <div className="flex items-start justify-between">
                  <h3 className="text-lg font-semibold text-primary-900">
                    {skill.metadata?.name || skill.title}
                  </h3>
                  
                  {category && (
                    <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                      {category.value}
                    </span>
                  )}
                </div>
                
                {proficiency && (
                  <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium border ${getProficiencyColor(proficiency.key)}`}>
                    {proficiency.value}
                  </span>
                )}
                
                {skill.metadata?.description && (
                  <p className="text-gray-600 text-sm line-clamp-3">
                    {skill.metadata.description}
                  </p>
                )}
              </div>
            </div>
          )
        })}
      </div>

      <div className="text-center">
        <Link href="/skills" className="btn-primary">
          View All Skills
        </Link>
      </div>
    </section>
  )
}