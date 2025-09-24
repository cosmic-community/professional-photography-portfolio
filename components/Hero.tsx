export default function Hero() {
  return (
    <section className="relative bg-gradient-to-br from-primary-50 to-secondary-50 py-20 section-padding">
      <div className="container-max">
        <div className="text-center space-y-8 animate-fade-in">
          <h1 className="text-4xl md:text-6xl font-bold text-primary-900 text-balance">
            Capturing Life's
            <span className="text-primary-600 block mt-2">
              Precious Moments
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto text-balance">
            Professional photographer specializing in portraits, weddings, and commercial photography. 
            Creating timeless images that tell your unique story.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
            <a href="/projects" className="btn-primary">
              View Portfolio
            </a>
            <a href="/testimonials" className="btn-secondary">
              Client Reviews
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}