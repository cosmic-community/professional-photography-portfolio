import { NextRequest, NextResponse } from 'next/server'
import { cosmic } from '@/lib/cosmic'

interface ContactFormData {
  name: string
  email: string
  phone: string
  service: string
  eventDate: string
  message: string
}

export async function POST(request: NextRequest) {
  try {
    const data: ContactFormData = await request.json()

    // Validate required fields
    if (!data.name || !data.email || !data.service || !data.message) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Create contact submission in Cosmic
    const contactSubmission = {
      title: `Contact from ${data.name}`,
      type: 'contact-submissions',
      status: 'published',
      metadata: {
        name: data.name,
        email: data.email,
        phone: data.phone || '',
        service: data.service,
        event_date: data.eventDate || '',
        message: data.message,
        submission_date: new Date().toISOString().split('T')[0],
        status: 'New'
      }
    }

    await cosmic.objects.insertOne(contactSubmission)

    return NextResponse.json(
      { message: 'Contact form submitted successfully' },
      { status: 200 }
    )
  } catch (error) {
    console.error('Contact form submission error:', error)
    return NextResponse.json(
      { error: 'Failed to submit contact form' },
      { status: 500 }
    )
  }
}