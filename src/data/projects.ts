export type Project = {
  id: string
  title: string
  short: string
  description: string
  github: string
  demo?: string
  tech: string[]
}

export const projects: Project[] = [
  {
    id: 'kaddem',
    title: 'Kaddem Project',
    short: 'University management platform built with Spring Boot and Angular, containerized and deployed via Jenkins CI/CD.',
    description: 'A comprehensive university management system enabling efficient handling of students, departments, and administrative workflows. Backend powered by Spring Boot with REST APIs and security; frontend built with Angular. Fully containerized with Docker and deployed via Jenkins pipelines for CI/CD.',
    github: 'https://github.com/souhail210301',
    tech: ['Spring Boot', 'Angular', 'Docker', 'Jenkins']
  },
  {
    id: 'hotel-microservices',
    title: 'Hotel Management Microservices',
    short: 'Microservices-based hotel services system with Eureka, API Gateway, and Docker Compose.',
    description: 'A modular hotel services management platform using Java Spring Boot microservices. Service discovery with Netflix Eureka, API Gateway routing, containerized services orchestrated with Docker Compose, emphasizing resilience and scalability.',
    github: 'https://github.com/souhail210301',
    tech: ['Spring Boot', 'Eureka', 'API Gateway', 'Docker Compose']
  },
  {
    id: 'odc-platform',
    title: 'Training & Certification Platform (ODC)',
    short: 'Manage training sessions and certifications with analytics dashboards and user personas.',
    description: 'Full-stack platform with React/Next.js frontend and Node.js/Python microservices backend. Supports session scheduling, certification tracking, and analytics dashboards. Designed user personas and flows to optimize UX.',
    github: 'https://github.com/souhail210301',
    tech: ['React', 'Next.js', 'Node.js', 'Python', 'Microservices']
  },
  {
    id: 'nutrilife',
    title: 'NutriLife',
    short: 'Smart semantic-based nutrition and wellness recommendation system.',
    description: 'A semantic web-driven recommendation system generating personalized and sustainable meal plans based on user profiles and goals, emphasizing nutrition science and usability.',
    github: 'https://github.com/souhail210301',
    tech: ['React', 'Node.js', 'Semantic Web']
  },
  {
    id: 'waste-platform',
    title: 'Waste Product Platform',
    short: 'Waste donation and recycling management app with Laravel and MySQL.',
    description: 'Platform enabling users to donate waste items and coordinate recycling pickups. Built with Laravel (PHP) and MySQL, focusing on community impact and transparency.',
    github: 'https://github.com/souhail210301',
    tech: ['Laravel', 'PHP', 'MySQL']
  },
]
