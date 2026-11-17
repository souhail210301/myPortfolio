import { PROFILE_INFO, BotResponse, getFallbackResponse, RecruiterAction } from '../data/recruiterKnowledge'

export interface ChatMessage {
  id: string
  sender: 'bot' | 'user'
  text: string
  timestamp: string
  actions?: RecruiterAction[]
  quickReplies?: string[]
}

const SYSTEM_INSTRUCTION = `You are an AI career representative and assistant on the portfolio website of Abdennebi Souhail.
Your primary role is to interact with technical recruiters, hiring managers, and prospective employers.
Maintain a polite, professional, articulate, and confident tone.

Key candidate information:
- Full Name: Abdennebi Souhail
- Title: Software Engineer & Full Stack Developer
- Education: Graduated Software Engineer (Diplôme National d'Ingénieur en Génie Logiciel) from ESPRIT (Tunisia). He has officially completed his studies and graduated.
- Current Status: Graduated and seeking FULL-TIME job opportunities (Software Engineer, Full Stack Developer, Frontend/Backend Engineer). NOT seeking internships or PFE anymore.
- Availability: Available IMMEDIATELY for full-time employment. Open to remote worldwide, hybrid, or on-site with relocation (Europe, Canada, Gulf, or worldwide).
- Languages: English (Professional working proficiency), French (Fluent), Arabic (Native)
- Contact: Email: souhailabdennebi2@gmail.com, Phone: +216 52 999 688, LinkedIn: https://www.linkedin.com/in/souhail-abdennebi-856541229/, GitHub: https://github.com/souhail210301
- Frontend Skills: React, Angular, Next.js, TypeScript, JavaScript, Tailwind CSS, HTML5, CSS3
- Backend Skills: Spring Boot (Java), Node.js, Express, PHP (Laravel), Python, REST APIs, Microservices (Eureka, API Gateway)
- DevOps & Cloud: Docker, Docker Compose, Jenkins CI/CD, Microsoft Azure, GitHub Actions
- Databases: MySQL, MongoDB, PostgreSQL
- Experience:
  1. Full Stack Developer @ ODC (Orange Digital Center Training Platform) (2024): Built training and certification platform with React/Next.js and Node.js/Python microservices, analytics dashboards.
  2. Backend Developer @ Kaddem University Platform (2023): Built REST APIs with Spring Boot and CI/CD pipelines with Jenkins and Docker.
- Notable Projects:
  - Kaddem Project: University management with Spring Boot, Angular, Docker, Jenkins
  - Hotel Microservices: Resilient hotel platform with Eureka discovery, API Gateway, Docker Compose
  - ODC Platform: Training & certification platform with React/Next.js & Python/Node microservices
  - NutriLife: Semantic-web recommendation system (React, Node.js)
  - Waste Product Platform: Waste donation & recycling app with Laravel and MySQL

Guidelines:
1. Emphasize that Souhail is a graduated engineer seeking a full-time position and available immediately. Clarify if asked that he has completed his studies.
2. Always be concise, helpful, and recruiter-focused. Highlight practical skills, results, and architectural knowledge.
3. If asked about resume/CV, let them know they can download it directly from the chat.
4. If asked about interviews, availability, or contact, invite them to email him or connect on LinkedIn.
5. Keep replies within 2-4 focused paragraphs or structured bullet points.`

export function isGeminiConfigured(): boolean {
  return Boolean(import.meta.env.VITE_GEMINI_API_KEY && import.meta.env.VITE_GEMINI_API_KEY.trim().length > 5)
}

function extractActionsFromText(text: string): RecruiterAction[] {
  const actions: RecruiterAction[] = []
  const lower = text.toLowerCase()

  if (lower.includes('resume') || lower.includes('cv') || lower.includes('download')) {
    actions.push({
      label: 'Download Resume (PDF)',
      actionType: 'download',
      value: PROFILE_INFO.cvUrl,
      icon: 'download'
    })
  }

  if (lower.includes('contact') || lower.includes('email') || lower.includes('interview') || lower.includes('reach') || lower.includes('hire') || lower.includes('job') || lower.includes('opportunity')) {
    actions.push({
      label: 'Email Souhail',
      actionType: 'link',
      value: `mailto:${PROFILE_INFO.email}?subject=Job%20Opportunity%20Inquiry%20via%20Portfolio`,
      icon: 'mail'
    })
    actions.push({
      label: 'Connect on LinkedIn',
      actionType: 'link',
      value: PROFILE_INFO.linkedin,
      icon: 'external'
    })
  }

  if (lower.includes('project') || lower.includes('github') || lower.includes('portfolio') || lower.includes('code')) {
    actions.push({
      label: 'GitHub Profile',
      actionType: 'link',
      value: PROFILE_INFO.github,
      icon: 'external'
    })
  }

  return actions
}

export async function sendChatMessage(userMessage: string, history: ChatMessage[] = []): Promise<BotResponse> {
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY

  if (!apiKey || apiKey.trim() === '') {
    // Graceful offline fallback knowledge agent
    return getFallbackResponse(userMessage)
  }

  try {
    // Format conversation history for Gemini API
    const contents = []
    
    // Recent history (last 6 messages max for context & speed)
    const recent = history.slice(-6)
    for (const msg of recent) {
      contents.push({
        role: msg.sender === 'user' ? 'user' : 'model',
        parts: [{ text: msg.text }]
      })
    }

    // Add current user message
    contents.push({
      role: 'user',
      parts: [{ text: userMessage }]
    })

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          system_instruction: {
            parts: [{ text: SYSTEM_INSTRUCTION }]
          },
          contents,
          generationConfig: {
            temperature: 0.6,
            maxOutputTokens: 600,
          }
        })
      }
    )

    if (!response.ok) {
      console.warn('Gemini API call failed with status:', response.status, 'Falling back to local knowledge base.')
      return getFallbackResponse(userMessage)
    }

    const data = await response.json()
    const botText = data?.candidates?.[0]?.content?.parts?.[0]?.text

    if (!botText) {
      return getFallbackResponse(userMessage)
    }

    const actions = extractActionsFromText(botText)
    if (actions.length === 0) {
      actions.push({
        label: 'Download Resume',
        actionType: 'download',
        value: PROFILE_INFO.cvUrl,
        icon: 'download'
      })
      actions.push({
        label: 'Get in Touch',
        actionType: 'link',
        value: `mailto:${PROFILE_INFO.email}`,
        icon: 'mail'
      })
    }

    return {
      text: botText,
      actions,
      quickReplies: ['💼 Job Availability & Roles', '⚡ Top Skills & Tech Stack', '🚀 Featured Projects', '🏢 Work Experience']
    }
  } catch (err) {
    console.error('Chatbot API error, using offline knowledge base:', err)
    return getFallbackResponse(userMessage)
  }
}
