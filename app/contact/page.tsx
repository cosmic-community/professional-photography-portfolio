import ContactForm from '@/components/ContactForm'
import ContactInfo from '@/components/ContactInfo'

export const metadata = {
  title: 'Contact - Professional Photography Portfolio',
  description: 'Get in touch for photography services, bookings, and inquiries. Professional photographer available for weddings, portraits, commercial, and event photography.',
}

export default function ContactPage() {
  return (
    <div className="section-padding py-16">
      <div className="container-max">
        <div className="max-w-6xl mx-auto">
          {/* Header Section */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-primary-900 mb-4">
              Get In Touch
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Ready to capture your special moments? Let's discuss your photography needs and create something beautiful together.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div>
              <ContactForm />
            </div>

            {/* Contact Information */}
            <div>
              <ContactInfo />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}