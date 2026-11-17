export interface RecruiterAction {
  label: string
  actionType: 'link' | 'download' | 'question'
  value: string
  icon?: 'download' | 'mail' | 'calendar' | 'external' | 'chat'
}

export interface BotResponse {
  text: string
  actions?: RecruiterAction[]
  quickReplies?: string[]
}

export const PROFILE_INFO = {
  name: 'Abdennebi Souhail',
  role: 'Software Engineer & Full Stack Developer',
  institution: 'ESPRIT (Tunisia)',
  graduation: 'Graduated Software Engineer (Diplôme National d\'Ingénieur en Génie Logiciel)',
  cvUrl: '/assets/Abdennebi_Souhail_CV.pdf',
  email: 'souhailabdennebi2@gmail.com',
  phone: '+216 52 999 688',
  linkedin: 'https://www.linkedin.com/in/souhail-abdennebi-856541229/',
  github: 'https://github.com/souhail210301',
  availability: 'Graduated and actively seeking Full-Time Software Engineering & Full Stack Developer positions. Available immediately (open to Remote, Hybrid, or On-site with relocation worldwide).',
  languages: ['English (Professional)', 'French (Fluent)', 'Arabic (Native)'],
  primaryStack: ['React', 'Angular', 'Next.js', 'Spring Boot (Java)', 'Node.js', 'Docker', 'Jenkins', 'CI/CD']
}

export const QUICK_PROMPTS = [
  '💼 Job Availability & Roles',
  '⚡ Top Skills & Tech Stack',
  '🚀 Featured Projects',
  '🏢 Work Experience',
  '📄 Download Resume',
  '📬 How to Contact'
]

export function getFallbackResponse(query: string): BotResponse {
  const q = query.toLowerCase().trim()

  // 1. Greetings
  if (/^(hi|hello|hey|bonjour|salut|coucou|good morning|good afternoon|good evening|greetings)/i.test(q)) {
    return {
      text: `Hello! I'm Souhail's AI portfolio agent. Souhail has graduated with his Software Engineering degree and is actively seeking **Full-Time Software Engineer / Full Stack Developer positions**.\n\nI can answer any questions recruiters have about his technical stack, engineering experience, projects, or immediate availability.\n\nHow can I help you today?`,
      actions: [
        { label: 'Download Resume', actionType: 'download', value: PROFILE_INFO.cvUrl, icon: 'download' },
        { label: 'Contact Souhail', actionType: 'link', value: `mailto:${PROFILE_INFO.email}`, icon: 'mail' }
      ],
      quickReplies: ['💼 Job Availability & Roles', '⚡ Top Skills & Tech Stack', '🚀 Featured Projects', '🏢 Work Experience']
    }
  }

  // 2. Availability / Hiring / Jobs / Relocation
  if (/(availab|hire|hiring|opportunity|job|full-time|fulltime|contract|relocat|remote|start date|status|intern|pfe)/i.test(q)) {
    return {
      text: `🟢 **Availability Status: Open for Immediate Full-Time Hire!**\n\n• **Candidate Status**: Graduated Software Engineer (ESPRIT) — studies completed.\n• **Target Roles**: Full Stack Developer, Software Engineer, Backend/Frontend Engineer.\n• **Notice Period**: Available **immediately**.\n• **Work Modes**: Open to Remote, Hybrid, or On-site opportunities (open to relocation across Europe, Canada, Gulf, or worldwide).\n\nWould you like to review his resume or get in touch directly?`,
      actions: [
        { label: 'Download Souhail\'s CV (PDF)', actionType: 'download', value: PROFILE_INFO.cvUrl, icon: 'download' },
        { label: 'Send an Email', actionType: 'link', value: `mailto:${PROFILE_INFO.email}?subject=Job%20Opportunity%20Discussion%20with%20Souhail`, icon: 'mail' },
        { label: 'Connect on LinkedIn', actionType: 'link', value: PROFILE_INFO.linkedin, icon: 'external' }
      ],
      quickReplies: ['⚡ Top Skills & Tech Stack', '🚀 Featured Projects', '🏢 Work Experience']
    }
  }

  // 3. Skills / Tech Stack
  if (/(skill|stack|technolog|framework|language|react|angular|spring|java|docker|devops|backend|frontend|node|next|python|sql)/i.test(q)) {
    return {
      text: `Souhail is a production-ready **Full Stack & DevOps-oriented Software Engineer** with strong end-to-end expertise:\n\n• **Frontend**: React, Angular, Next.js, TypeScript, JavaScript, Tailwind CSS, HTML5, CSS3\n• **Backend**: Spring Boot (Java), Node.js, Express, PHP (Laravel), Python (RESTful APIs, Microservices)\n• **Databases**: MySQL, MongoDB, PostgreSQL\n• **DevOps & Cloud**: Docker, Docker Compose, Jenkins CI/CD, Microsoft Azure, GitHub Actions\n• **Architecture**: Microservices (Eureka, API Gateway), Cloud-native patterns, Semantic Web\n\nWhich technology or project would you like to know more about?`,
      actions: [
        { label: 'View Projects', actionType: 'link', value: '#projects', icon: 'external' },
        { label: 'Download Resume', actionType: 'download', value: PROFILE_INFO.cvUrl, icon: 'download' }
      ],
      quickReplies: ['🚀 Featured Projects', '🏢 Work Experience', '💼 Job Availability & Roles']
    }
  }

  // 4. Projects
  if (/(project|portfolio|built|kaddem|hotel|odc|nutrilife|waste|microservice|github)/i.test(q)) {
    return {
      text: `Here are key engineering projects Souhail has designed & built:\n\n1. **Kaddem University Platform**: Comprehensive management portal built with **Spring Boot** & **Angular**, fully containerized via **Docker** with automated **Jenkins CI/CD** pipelines.\n2. **Hotel Management Microservices**: Distributed services architecture with Netflix Eureka service discovery, Spring Cloud API Gateway, and Docker Compose orchestration.\n3. **ODC Training Platform**: Scalable training & certification platform built with **React/Next.js** and **Node.js/Python** microservices.\n4. **NutriLife**: Smart semantic web-driven recommendation system for personalized nutrition built with React & Node.js.\n5. **Waste Recycling Platform**: Community waste donation & recycling system engineered with **Laravel** and **MySQL**.`,
      actions: [
        { label: 'View GitHub Profile', actionType: 'link', value: PROFILE_INFO.github, icon: 'external' },
        { label: 'Jump to Projects Section', actionType: 'link', value: '#projects', icon: 'external' }
      ],
      quickReplies: ['🏢 Work Experience', '⚡ Top Skills & Tech Stack', '📬 How to Contact']
    }
  }

  // 5. Experience / Work History
  if (/(experience|work|intern|internship|odc|orange|kaddem|company|history|career)/i.test(q)) {
    return {
      text: `Souhail brings practical software engineering experience from high-impact environments:\n\n• **Full Stack Developer @ ODC (Orange Digital Center Training Platform) (2024)**\n  Engineered a full-stack training and certification management portal using React/Next.js and microservices (Node.js & Python), implementing analytics dashboards and streamlined user flows.\n\n• **Backend Developer @ Kaddem University Platform (2023)**\n  Built resilient Spring Boot RESTful APIs, designed relational data models, containerized components with Docker, and configured Jenkins automated CI/CD deployment pipelines.\n\nNow that he has graduated, he is ready to immediately contribute to full-time engineering teams with strong agile collaboration and code quality.`,
      actions: [
        { label: 'Download Resume', actionType: 'download', value: PROFILE_INFO.cvUrl, icon: 'download' },
        { label: 'View Timeline Section', actionType: 'link', value: '#timeline', icon: 'external' }
      ],
      quickReplies: ['💼 Job Availability & Roles', '⚡ Top Skills & Tech Stack', '📬 How to Contact']
    }
  }

  // 6. Education / Degree / ESPRIT
  if (/(education|degree|school|university|esprit|study|studies|diploma|graduate|graduation)/i.test(q)) {
    return {
      text: `🎓 **Education & Graduation**:\n\n• **Institution**: ESPRIT (Ecole Supérieure Privée d'Ingénierie et de Technologies) — Tunisia\n• **Degree**: Software Engineering (Diplôme National d'Ingénieur en Génie Logiciel)\n• **Status**: **Graduated** — completed studies\n• **Focus**: Full Stack Software Architecture, Cloud Computing, Microservices, and DevOps methodologies.\n\nHe is also proficient in 3 languages: English (Professional), French (Fluent), and Arabic (Native).`,
      actions: [
        { label: 'Download Resume', actionType: 'download', value: PROFILE_INFO.cvUrl, icon: 'download' },
        { label: 'Contact Souhail', actionType: 'link', value: `mailto:${PROFILE_INFO.email}`, icon: 'mail' }
      ],
      quickReplies: ['💼 Job Availability & Roles', '🏢 Work Experience', '⚡ Top Skills & Tech Stack']
    }
  }

  // 7. Contact / Email / LinkedIn / Phone
  if (/(contact|email|phone|reach|call|interview|meeting|schedule|linkedin|number|talk)/i.test(q)) {
    return {
      text: `You can reach Souhail directly through several channels:\n\n• 📧 **Email**: [${PROFILE_INFO.email}](mailto:${PROFILE_INFO.email})\n• 📱 **Phone / WhatsApp**: [${PROFILE_INFO.phone}](tel:+21652999688)\n• 💼 **LinkedIn**: [linkedin.com/in/souhail-abdennebi](https://www.linkedin.com/in/souhail-abdennebi-856541229/)\n• 💻 **GitHub**: [github.com/souhail210301](https://github.com/souhail210301)\n\nHe responds promptly to recruiter inquiries!`,
      actions: [
        { label: 'Send an Email', actionType: 'link', value: `mailto:${PROFILE_INFO.email}?subject=Job%20Opportunity%20Inquiry%20via%20Portfolio`, icon: 'mail' },
        { label: 'Open LinkedIn Profile', actionType: 'link', value: PROFILE_INFO.linkedin, icon: 'external' },
        { label: 'Download CV', actionType: 'download', value: PROFILE_INFO.cvUrl, icon: 'download' }
      ],
      quickReplies: ['💼 Job Availability & Roles', '🚀 Featured Projects', '⚡ Top Skills & Tech Stack']
    }
  }

  // 8. Resume / CV
  if (/(resume|cv|curriculum|pdf|download)/i.test(q)) {
    return {
      text: `You can download Souhail's complete up-to-date resume in PDF format below, or let me know if you need specific details like tech stack, engineering projects, or his immediate job availability!`,
      actions: [
        { label: 'Download Resume (PDF)', actionType: 'download', value: PROFILE_INFO.cvUrl, icon: 'download' },
        { label: 'Get in Touch', actionType: 'link', value: `mailto:${PROFILE_INFO.email}`, icon: 'mail' }
      ],
      quickReplies: ['💼 Job Availability & Roles', '⚡ Top Skills & Tech Stack', '🏢 Work Experience']
    }
  }

  // Default Fallback
  return {
    text: `Thanks for asking! I represent Souhail Abdennebi — a graduated Software Engineer from ESPRIT specializing in Full Stack web development (React, Angular, Next.js, Spring Boot, Node.js) and DevOps (Docker, CI/CD).\n\nHe has completed his studies and is currently **available immediately for Full-Time job opportunities**.\n\nWhat would you like to explore?`,
    actions: [
      { label: 'Download Resume', actionType: 'download', value: PROFILE_INFO.cvUrl, icon: 'download' },
      { label: 'Contact Souhail', actionType: 'link', value: `mailto:${PROFILE_INFO.email}`, icon: 'mail' }
    ],
    quickReplies: ['💼 Job Availability & Roles', '⚡ Top Skills & Tech Stack', '🚀 Featured Projects', '🏢 Work Experience']
  }
}
