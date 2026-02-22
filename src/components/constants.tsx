import { Handshake, Target, Users, BookOpen, Clock, BarChart, ShieldCheck } from 'lucide-react';

// Testimonial & team: Black professional photos only. Names unchanged. CEO stays /ceo.png.
const IMG = {
    woman1: "https://images.unsplash.com/photo-1610216705422-caa3fcb43689?w=400&h=500&fit=crop",
    woman2: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=500&fit=crop",
    woman3: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=500&fit=crop",
    man1: "https://images.unsplash.com/photo-1566492031773-4f4e44671857?w=400&h=500&fit=crop",
    man2: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=500&fit=crop",
    man3: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&h=500&fit=crop",
};
const AV = (key: keyof typeof IMG) => IMG[key].replace("400&h=500", "150&h=150");

// Light avatar for last card: small external URL only (no heavy assets for push)
const AV_LIGHT = "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&h=150&fit=crop&q=80";

export const TESTIMONIALS = [
    {
        id: 1,
        name: "Amara Okonkwo",
        role: "UX Design Student",
        content: "AfrESH Academy transformed my career. The hands-on approach and mentorship were invaluable in helping me land my dream job.",
        avatar: AV("woman1"),
        rating: 5
    },
    {
        id: 2,
        name: "Kwame Asante",
        role: "Web Development Graduate",
        content: "The curriculum is perfectly aligned with industry standards. I learned exactly what employers are looking for.",
        avatar: AV("man1"),
        rating: 5
    },
    {
        id: 3,
        name: "Ngozi Eze",
        role: "Digital Marketing Pro",
        content: "Outstanding instructors and a supportive community. Best investment I've made in my education.",
        avatar: AV_LIGHT,
        rating: 5
    }
];

export const TEAM = [
    {
        id: 1,
        name: "Founder & CEO",
        role: "CEO, AfrESH Academy",
        image: "/ceo.png",
        description: "CEO of Cbrilliance and Jebiz Innovations, and a software engineer with years of experience driving technology and education forward."
    },
    {
        id: 2,
        name: "Dr. James Wilson",
        role: "Lead Instructor",
        image: IMG.man2,
        description: "Ph.D. in Computer Science with 15 years of industry experience."
    },
    {
        id: 3,
        name: "Adaeze Nwosu",
        role: "Design Director",
        image: IMG.woman1,
        description: "Award-winning designer passionate about teaching creative problem solving."
    },
    {
        id: 4,
        name: "Marcus Thompson",
        role: "Technical Lead",
        image: IMG.man3,
        description: "Full-stack developer with expertise in scalable architecture."
    },
    {
        id: 5,
        name: "Chioma Okafor",
        role: "Student Success Manager",
        image: IMG.woman2,
        description: "Dedicated to ensuring every student reaches their full potential."
    }
];

export const COURSE_DATA = {
    title: "Complete Web Design & Development Bootcamp 2024",
    description: "Master modern web development from scratch. Learn HTML5, CSS3, JavaScript, React, and Node.js while building real-world projects and a professional portfolio.",
    rating: 4.8,
    reviewsCount: 2450,
    instructor: {
        name: "Dr. James Wilson",
        avatar: AV("man2")
    },
    duration: "12 Weeks",
    lessonsCount: 145,
    level: "Beginner to Advanced",
    learningPoints: [
        "Build responsive websites with HTML5 and CSS3",
        "Master JavaScript ES6+ and React.js",
        "Create backend APIs with Node.js and Express",
        " deploy full-stack applications to the cloud"
    ],
    modules: [
        {
            id: "mod1",
            title: "Module 1: Fundamentals of Web Design",
            lessons: ["Introduction to HTML5", "CSS3 Styling & Layouts", "Responsive Design Principles", "Project: Personal Portfolio"]
        },
        {
            id: "mod2",
            title: "Module 2: JavaScript Mastery",
            lessons: ["Variables & Data Types", "DOM Manipulation", "Asynchronous JavaScript", "Project: Interactive To-Do List"]
        },
        {
            id: "mod3",
            title: "Module 3: React.js Framework",
            lessons: ["Components & Props", "State Management & Hooks", "Routing with React Router", "Project: E-commerce Store"]
        }
    ],
    requirements: [
        "No prior coding experience required",
        "A computer with internet access",
        "Willingness to learn and practice"
    ],
    price: 49.99,
    originalPrice: 99.99
};

export const SERVICES = [
    {
        id: 1,
        title: "Web Development",
        description: "Build robust, scalable web applications using modern technologies.",
        icon: Users
    },
    {
        id: 2,
        title: "UI/UX Design",
        description: "Create intuitive and visually appealing user interfaces.",
        icon: Handshake
    },
    {
        id: 3,
        title: "Digital Marketing",
        description: "Reach your target audience with effective marketing strategies.",
        icon: Target
    }
];
