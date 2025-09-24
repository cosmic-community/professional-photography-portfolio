// Base Cosmic object interface
interface CosmicObject {
  id: string;
  slug: string;
  title: string;
  content?: string;
  metadata: Record<string, any>;
  type: string;
  created_at: string;
  modified_at: string;
}

// Project interface
export interface Project extends CosmicObject {
  type: 'projects';
  metadata: {
    title?: string;
    description?: string;
    featured_image?: {
      url: string;
      imgix_url: string;
    };
    gallery?: Array<{
      url: string;
      imgix_url: string;
    }>;
    category?: {
      key: string;
      value: string;
    };
    client_name?: string;
    project_date?: string;
    location?: string;
  };
}

// Skill interface
export interface Skill extends CosmicObject {
  type: 'skills';
  metadata: {
    name?: string;
    proficiency?: {
      key: string;
      value: string;
    };
    category?: {
      key: string;
      value: string;
    };
    description?: string;
  };
}

// Work Experience interface
export interface WorkExperience extends CosmicObject {
  type: 'work-experience';
  metadata: {
    company?: string;
    job_title?: string;
    start_date?: string;
    end_date?: string | null;
    current_position?: boolean;
    location?: string;
    description?: string;
    achievements?: string;
  };
}

// Testimonial interface
export interface Testimonial extends CosmicObject {
  type: 'testimonials';
  metadata: {
    client_name?: string;
    company?: string;
    quote?: string;
    rating?: {
      key: string;
      value: string;
    };
    project_type?: {
      key: string;
      value: string;
    };
    date?: string;
  };
}

// Type guards
export function isProject(obj: CosmicObject): obj is Project {
  return obj.type === 'projects';
}

export function isSkill(obj: CosmicObject): obj is Skill {
  return obj.type === 'skills';
}

export function isWorkExperience(obj: CosmicObject): obj is WorkExperience {
  return obj.type === 'work-experience';
}

export function isTestimonial(obj: CosmicObject): obj is Testimonial {
  return obj.type === 'testimonials';
}

// Utility types
export type ProjectCategory = 'portrait' | 'wedding' | 'event' | 'commercial' | 'landscape' | 'fashion';
export type SkillCategory = 'technical' | 'creative' | 'software' | 'equipment';
export type ProficiencyLevel = 'beginner' | 'intermediate' | 'advanced' | 'expert';
export type Rating = '1' | '2' | '3' | '4' | '5';

// API response types
export interface CosmicResponse<T> {
  objects: T[];
  total: number;
  limit: number;
  skip: number;
}