
// import { Course, PortfolioItem, Testimonial, TeamMember } from './types';

export const COURSES = [
  {
    id: '1',
    title: 'Complete Web Development',
    description: 'Master HTML, CSS, JavaScript, React, Node.js and more. Build real-world projects and become a full-stack dev.',
    image: 'https://picsum.photos/seed/web/800/500',
    lessons: '12 weeks',
    students: '1,200+',
    level: 'Beginner',
    tag: 'Web Development'
  },
  {
    id: '2',
    title: 'Graphic Design Masterclass',
    description: 'Learn typography, color theory, layout design, and master industry-standard tools like Adobe Creative Cloud.',
    image: 'https://picsum.photos/seed/design/800/500',
    lessons: '8 weeks',
    students: '1,500+',
    level: 'Intermediate',
    tag: 'Design'
  },
  {
    id: '3',
    title: 'UI/UX Design',
    description: 'Explore user research, wireframing, and visual design to create intuitive, friendly, and stunning user experiences.',
    image: 'https://picsum.photos/seed/uiux/800/500',
    lessons: '10 weeks',
    students: '1,000+',
    level: 'Advanced',
    tag: 'UI/UX'
  }
];

export const PORTFOLIO = [
  {
    id: '1',
    title: 'Creative Photography Collection',
    description: 'A stunning collection of portrait photography showcasing unique perspectives and lighting.',
    image: 'https://picsum.photos/seed/photo1/800/600',
    category: 'PHOTOGRAPHY',
    date: '20 Oct 2023',
    tags: ['Photography', 'Art', 'Portraits']
  },
  {
    id: '2',
    title: 'Mobile App UI/UX Design',
    description: 'Modern and intuitive mobile application design with seamless user experience and stunning visuals.',
    image: 'https://picsum.photos/seed/app/800/600',
    category: 'UI/UX DESIGN',
    date: '15 Nov 2023',
    tags: ['Mobile', 'UI/UX', 'Design']
  },
  {
    id: '3',
    title: 'Brand Identity System',
    description: 'Complete brand identity package including logo, color palette, typography, and brand guidelines.',
    image: 'https://picsum.photos/seed/branding/800/600',
    category: 'BRANDING',
    date: '05 Dec 2023',
    tags: ['Branding', 'Identity', 'Design']
  },
  {
    id: '4',
    title: 'E-Commerce Platform',
    description: 'Full-featured e-commerce solution with integrated payments and inventory management.',
    image: 'https://picsum.photos/seed/ecommerce/800/600',
    category: 'WEB DESIGN',
    date: '12 Jan 2024',
    tags: ['Web', 'E-commerce', 'React']
  }
];

export const TESTIMONIALS = [
  {
    id: '1',
    name: 'Ella Mark',
    role: 'Student',
    content: 'AfRESH Academy changed the way I look at web development. The instructors are experts and the community is so supportive. I landed my first dev job right after graduation!',
    avatar: 'https://picsum.photos/seed/ella/100/100',
    rating: 5
  },
  {
    id: '2',
    name: 'John Abba',
    role: 'Student',
    content: 'The curriculum is hands-on and very practical. I learned more than just tools; I learned how to think like a professional designer. Highly recommended!',
    avatar: 'https://picsum.photos/seed/john/100/100',
    rating: 5
  },
  {
    id: '3',
    name: 'Joy Olla',
    role: 'Student',
    content: 'I loved the flexibility and the depth of the courses. The mentors are always there to help, and the projects are real-world based. A truly transformative experience.',
    avatar: 'https://picsum.photos/seed/joy/100/100',
    rating: 5
  }
];

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  description: string;
  image: string;
}

export const TEAM: TeamMember[] = [
  {
    id: '1',
    name: 'Mark Johnson',
    role: 'CEO & Founder',
    description: 'Former tech educator with 15+ years of experience in digital learning and curriculum development.',
    image: 'https://picsum.photos/seed/mark_johnson/400/400'
  },
  {
    id: '2',
    name: 'Johnson Noel',
    role: 'CD & Founder',
    description: 'Former tech educator with 15+ years of experience in digital learning and curriculum development.',
    image: 'https://picsum.photos/seed/johnson_noel/400/400'
  },
  {
    id: '3',
    name: 'Mary Mark',
    role: 'CDO & Founder',
    description: 'Former tech educator with 15+ years of experience in digital learning and curriculum development.',
    image: 'https://picsum.photos/seed/mary_mark/400/400'
  },
  {
    id: '4',
    name: 'Joy Johnson',
    role: 'CO & Founder',
    description: 'Former tech educator with 15+ years of experience in digital learning and curriculum development.',
    image: 'https://picsum.photos/seed/joy_johnson/400/400'
  }
];

// Course Data for Enroll page
export const COURSE_DATA = {
  title: 'Complete Web Development Bootcamp',
  description: 'Master HTML, CSS, JavaScript, React, Node.js and more. Build real-world projects and become a full-stack developer.',
  rating: 4.8,
  reviewsCount: 15402,
  instructor: {
    name: 'Sarah Johnson',
    avatar: 'https://picsum.photos/seed/instructor/100/100'
  },
  duration: '12 weeks',
  lessonsCount: 156,
  level: 'Beginner to Advanced',
  learningPoints: [
    'Master HTML5, CSS3, and modern JavaScript (ES6+)',
    'Build responsive websites and web applications',
    'Learn React.js for building dynamic user interfaces',
    'Understand Node.js and Express for backend development',
    'Work with databases (MongoDB, PostgreSQL)',
    'Deploy applications to production servers',
    'Implement authentication and security best practices',
    'Use Git and GitHub for version control',
    'Build and deploy full-stack applications',
    'Prepare for technical interviews and job applications'
  ],
  modules: [
    {
      id: 'mod1',
      title: 'Introduction to Web Development',
      lessons: [
        'Welcome to the Course',
        'Setting Up Your Development Environment',
        'Understanding the Web',
        'HTML Basics',
        'CSS Fundamentals'
      ]
    },
    {
      id: 'mod2',
      title: 'JavaScript Fundamentals',
      lessons: [
        'JavaScript Basics',
        'Variables and Data Types',
        'Functions and Scope',
        'Arrays and Objects',
        'DOM Manipulation'
      ]
    },
    {
      id: 'mod3',
      title: 'React.js Development',
      lessons: [
        'Introduction to React',
        'Components and Props',
        'State Management',
        'Hooks and Effects',
        'Building a React App'
      ]
    },
    {
      id: 'mod4',
      title: 'Backend Development',
      lessons: [
        'Node.js Basics',
        'Express.js Framework',
        'RESTful APIs',
        'Database Integration',
        'Authentication'
      ]
    }
  ],
  requirements: [
    'No prior programming experience required',
    'A computer with internet connection',
    'Willingness to learn and practice',
    'Basic computer skills',
    'Text editor (VS Code recommended)',
    'Modern web browser'
  ],
  price: 99,
  originalPrice: 199
};

// All Courses for AllCourses page
export const ALL_COURSES = [
  {
    id: '1',
    title: 'Complete Web Development',
    description: 'Master HTML, CSS, JavaScript, React, Node.js and more. Build real-world projects and become a full-stack dev.',
    image: 'https://picsum.photos/seed/web/800/500',
    duration: '12 weeks',
    students: '1,200+',
    rating: 4.8,
    tag: 'Web Development'
  },
  {
    id: '2',
    title: 'Graphic Design Masterclass',
    description: 'Learn typography, color theory, layout design, and master industry-standard tools like Adobe Creative Cloud.',
    image: 'https://picsum.photos/seed/design/800/500',
    duration: '8 weeks',
    students: '1,500+',
    rating: 4.9,
    tag: 'Design'
  },
  {
    id: '3',
    title: 'UI/UX Design',
    description: 'Explore user research, wireframing, and visual design to create intuitive, friendly, and stunning user experiences.',
    image: 'https://picsum.photos/seed/uiux/800/500',
    duration: '10 weeks',
    students: '1,000+',
    rating: 4.7,
    tag: 'UI/UX'
  },
  {
    id: '4',
    title: 'Data Science & Analytics',
    description: 'Learn Python, data analysis, machine learning, and visualization to become a data scientist.',
    image: 'https://picsum.photos/seed/data/800/500',
    duration: '14 weeks',
    students: '800+',
    rating: 4.6,
    tag: 'Data Science'
  },
  {
    id: '5',
    title: 'Mobile App Development',
    description: 'Build iOS and Android apps using React Native. Learn mobile UI/UX and app deployment.',
    image: 'https://picsum.photos/seed/mobile/800/500',
    duration: '10 weeks',
    students: '900+',
    rating: 4.8,
    tag: 'Mobile'
  },
  {
    id: '6',
    title: 'Digital Marketing',
    description: 'Master SEO, social media marketing, content creation, and analytics to grow businesses online.',
    image: 'https://picsum.photos/seed/marketing/800/500',
    duration: '8 weeks',
    students: '1,300+',
    rating: 4.7,
    tag: 'Marketing'
  }
];
