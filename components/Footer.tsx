export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-primary-900 text-white py-12 section-padding">
      <div className="container-max">
        <div className="grid md:grid-cols-3 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold">Photography Portfolio</h3>
            <p className="text-gray-300">
              Professional photography services specializing in portraits, weddings, and commercial work.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="font-semibold">Quick Links</h4>
            <div className="flex flex-col space-y-2">
              <a href="/projects" className="text-gray-300 hover:text-white transition-colors duration-200">
                Portfolio
              </a>
              <a href="/skills" className="text-gray-300 hover:text-white transition-colors duration-200">
                Skills
              </a>
              <a href="/experience" className="text-gray-300 hover:text-white transition-colors duration-200">
                Experience
              </a>
              <a href="/testimonials" className="text-gray-300 hover:text-white transition-colors duration-200">
                Testimonials
              </a>
            </div>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h4 className="font-semibold">Get In Touch</h4>
            <div className="space-y-2 text-gray-300">
              <p>Ready to capture your special moments?</p>
              <p className="font-medium text-white">
                Let's create something beautiful together.
              </p>
            </div>
          </div>
        </div>

        <div className="border-t border-primary-800 mt-8 pt-8 text-center text-gray-300">
          <p>&copy; {currentYear} Photography Portfolio. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}