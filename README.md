# Professional Photography Portfolio

![App Preview](https://imgix.cosmicjs.com/5c61ea30-98ec-11f0-8dcc-651091f6a7c0-photo-1507003211169-0a1dd7228f2d-1758680135759.jpg?w=1200&h=300&fit=crop&auto=format,compress)

A modern, responsive photography portfolio website built with Next.js and Cosmic CMS. This application showcases professional photography work, skills, experience, and client testimonials in an elegant, user-friendly interface.

## Features

- 📸 **Dynamic Project Gallery** - Interactive portfolio showcase with category filtering
- 🎯 **Skills Matrix** - Organized display of technical and creative capabilities
- 💼 **Professional Timeline** - Career history with achievements and milestones  
- 💬 **Client Testimonials** - Social proof with star ratings and reviews
- 📱 **Responsive Design** - Optimized for all devices and screen sizes
- ⚡ **Performance Optimized** - Fast loading with image optimization
- 🔍 **SEO Friendly** - Built-in meta tags and structured data
- 🎨 **Modern UI/UX** - Clean design with smooth animations

## Clone this Project

Want to create your own version of this project with all the content and structure? Clone this Cosmic bucket and code repository to get started instantly:

[![Clone this Project](https://img.shields.io/badge/Clone%20this%20Project-29abe2?style=for-the-badge&logo=cosmic&logoColor=white)](https://app.cosmic-staging.com/projects/new?clone_bucket=68d353beeccbb9e75b24258d&clone_repository=68d35558eccbb9e75b2425b2)

## Prompts

This application was built using the following prompts to generate the content structure and code:

### Content Model Prompt

> Create a content model for a photographer with projects, skills, work experience, and testimonials

### Code Generation Prompt  

> Based on the content model I created for "Create a content model for a photographer with projects, skills, work experience, and testimonials", now build a complete web application that showcases this content. Include a modern, responsive design with proper navigation, content display, and user-friendly interface.

The app has been tailored to work with your existing Cosmic content structure and includes all the features requested above.

## Technologies Used

- **Framework**: Next.js 15 with App Router
- **Styling**: Tailwind CSS with custom design system
- **CMS**: Cosmic headless CMS
- **Language**: TypeScript with strict type checking
- **Package Manager**: Bun
- **Deployment**: Vercel-ready configuration

## Getting Started

### Prerequisites

- Node.js 18+ or Bun
- Cosmic account with your photography portfolio content

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd professional-photography-portfolio
```

2. Install dependencies:
```bash
bun install
```

3. Set up environment variables:
```bash
cp .env.example .env.local
```

Add your Cosmic credentials:
```env
COSMIC_BUCKET_SLUG=your-bucket-slug
COSMIC_READ_KEY=your-read-key
COSMIC_WRITE_KEY=your-write-key
```

4. Run the development server:
```bash
bun dev
```

Open [http://localhost:3000](http://localhost:3000) to view the portfolio.

## Cosmic SDK Examples

### Fetching Projects
```typescript
import { cosmic } from '@/lib/cosmic'

async function getProjects() {
  try {
    const response = await cosmic.objects
      .find({ type: 'projects' })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1)
    
    return response.objects
  } catch (error) {
    if (error.status === 404) return []
    throw error
  }
}
```

### Retrieving Skills by Category
```typescript
async function getSkillsByCategory() {
  try {
    const response = await cosmic.objects
      .find({ type: 'skills' })
      .props(['id', 'title', 'metadata'])
    
    const skills = response.objects
    
    // Group by category
    return skills.reduce((acc, skill) => {
      const category = skill.metadata.category.value
      if (!acc[category]) acc[category] = []
      acc[category].push(skill)
      return acc
    }, {})
  } catch (error) {
    if (error.status === 404) return {}
    throw error
  }
}
```

## Cosmic CMS Integration

This portfolio integrates with four main Cosmic object types:

### Projects
- **Featured Image**: Main portfolio image with imgix optimization
- **Gallery**: Additional project images for detailed views
- **Category**: Filter projects by type (Portrait, Wedding, Commercial, etc.)
- **Client Information**: Project details and metadata

### Skills  
- **Proficiency Levels**: Beginner, Intermediate, Advanced, Expert
- **Categories**: Technical, Creative, Software, Equipment
- **Descriptions**: Detailed skill explanations

### Work Experience
- **Career Timeline**: Chronological work history
- **Current Position**: Active role indicator
- **Achievements**: Key accomplishments and metrics

### Testimonials
- **Star Ratings**: 1-5 star client feedback system
- **Project Types**: Connected to portfolio categories
- **Client Information**: Names, companies, and dates

## Deployment

### Deploy to Vercel

1. Connect your repository to Vercel
2. Set environment variables in Vercel dashboard:
   - `COSMIC_BUCKET_SLUG`
   - `COSMIC_READ_KEY` 
   - `COSMIC_WRITE_KEY`
3. Deploy automatically on push to main branch

The application is optimized for Vercel deployment with proper build configuration and type checking.

### Other Deployment Options

- **Netlify**: Configure build command as `bun run build`
- **Railway**: Use provided railway.json configuration
- **Docker**: Dockerfile included for containerized deployment

## Project Structure

```
├── app/                    # Next.js App Router pages
│   ├── globals.css        # Global styles and Tailwind imports
│   ├── layout.tsx         # Root layout with navigation
│   ├── page.tsx          # Homepage with hero and featured content
│   ├── projects/         # Project gallery and detail pages
│   ├── skills/           # Skills showcase page
│   ├── experience/       # Work experience timeline
│   └── testimonials/     # Client testimonials page
├── components/            # Reusable UI components
├── lib/                  # Utility functions and Cosmic client
└── types.ts              # TypeScript type definitions
```
<!-- README_END -->