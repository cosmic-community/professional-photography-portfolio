import { getSkills } from '@/lib/cosmic'
import { Skill } from '@/types'

export const metadata = {
  title: 'Skills - Professional Photography Portfolio',
  description: 'Explore my photography skills including technical expertise, creative abilities, and software proficiency.',
}

export default async function SkillsPage() {
  const skills = await getSkills() as Skill[]

  if (!skills || skills.length === 0) {
    return (
      <div className="container-max section-padding py-16">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Skills</h1>
          <p className="text-gray-600">No skills available at the moment.</p>
        </div>
      </div>
    )
  }

  // Group skills by category
  const skillsByCategory = skills.reduce((acc: Record<string, Skill[]>, skill) => {
    const category = skill.metadata?.category?.value || 'Other'
    if (!acc[category]) {
      acc[category] = []
    }
    acc[category].push(skill)
    return acc
  }, {})

  return (
    <div className="container-max section-padding py-16">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Skills & Expertise</h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          A comprehensive overview of my technical skills, creative abilities, and professional expertise in photography.
        </p>
      </div>

      <div className="space-y-12">
        {Object.keys(skillsByCategory).map((category) => {
          const categorySkills = skillsByCategory[category]
          if (!categorySkills || categorySkills.length === 0) {
            return null
          }

          return (
            <div key={category}>
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">{category}</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {categorySkills.map((skill) => (
                  <SkillCard key={skill.id} skill={skill} />
                ))}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

function SkillCard({ skill }: { skill: Skill }) {
  const proficiency = skill.metadata?.proficiency?.value || 'Beginner'
  const proficiencyLevel = skill.metadata?.proficiency?.key || 'beginner'
  
  // Convert proficiency to percentage for visual representation
  const proficiencyPercentage = {
    'beginner': 25,
    'intermediate': 50,
    'advanced': 75,
    'expert': 100
  }[proficiencyLevel] || 25

  return (
    <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          {skill.metadata?.name || skill.title}
        </h3>
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-gray-700">Proficiency</span>
          <span className={`text-sm font-medium px-2 py-1 rounded-full ${
            proficiencyLevel === 'expert' ? 'bg-green-100 text-green-800' :
            proficiencyLevel === 'advanced' ? 'bg-blue-100 text-blue-800' :
            proficiencyLevel === 'intermediate' ? 'bg-yellow-100 text-yellow-800' :
            'bg-gray-100 text-gray-800'
          }`}>
            {proficiency}
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className={`h-2 rounded-full ${
              proficiencyLevel === 'expert' ? 'bg-green-500' :
              proficiencyLevel === 'advanced' ? 'bg-blue-500' :
              proficiencyLevel === 'intermediate' ? 'bg-yellow-500' :
              'bg-gray-500'
            }`}
            style={{ width: `${proficiencyPercentage}%` }}
          ></div>
        </div>
      </div>
      {skill.metadata?.description && (
        <p className="text-gray-600 text-sm leading-relaxed">
          {skill.metadata.description}
        </p>
      )}
    </div>
  )
}