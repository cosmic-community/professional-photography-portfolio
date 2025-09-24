import { getProjects, getSkills, getTestimonials } from '@/lib/cosmic'
import Hero from '@/components/Hero'
import FeaturedProjects from '@/components/FeaturedProjects'
import SkillsOverview from '@/components/SkillsOverview'
import TestimonialPreview from '@/components/TestimonialPreview'

export default async function HomePage() {
  // Fetch data for homepage sections
  const [projects, skills, testimonials] = await Promise.all([
    getProjects(),
    getSkills(),
    getTestimonials()
  ])

  // Get featured projects (first 3)
  const featuredProjects = projects.slice(0, 3)
  
  // Get top skills (first 6)
  const topSkills = skills.slice(0, 6)
  
  // Get recent testimonial (first one)
  const recentTestimonial = testimonials[0]

  return (
    <div className="space-y-16">
      <Hero />
      
      {featuredProjects.length > 0 && (
        <section className="section-padding">
          <div className="container-max">
            <FeaturedProjects projects={featuredProjects} />
          </div>
        </section>
      )}
      
      {topSkills.length > 0 && (
        <section className="bg-gray-50 py-16 section-padding">
          <div className="container-max">
            <SkillsOverview skills={topSkills} />
          </div>
        </section>
      )}
      
      {recentTestimonial && (
        <section className="section-padding">
          <div className="container-max">
            <TestimonialPreview testimonial={recentTestimonial} />
          </div>
        </section>
      )}
    </div>
  )
}