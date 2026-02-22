
export interface Teacher {
  _id: string;
  name: string;
  email: string;
  avatar?: string;
  title: string;
  bio: string;
  specialization: string[];
}

export interface Lesson {
  title: string;
  type: 'video' | 'text' | 'quiz';
  videoUrl?: string;
  textContent?: string;
  duration?: number;
  freePreview: boolean;
}

export interface Module {
  title: string;
  lessons: Lesson[];
}

export interface Course {
  _id: string;
  title: string;
  description: string;
  image: string;
  tag?: string;
  duration?: string;
  students?: number;
  level: string;
  tags: string[];
  price: number;
  originalPrice?: number;
  rating: number;
  reviewsCount: number;
  instructor: string | Teacher;
  modules: Module[];
  learningPoints: string[];
  requirements: string[];
}

export interface PortfolioItem {
  id: string;
  title: string;
  description: string;
  image: string;
  category: string;
  date: string;
  tags: string[];
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  content: string;
  avatar: string;
  rating: number;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  description: string;
  image: string;
}
