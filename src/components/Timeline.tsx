import { motion } from 'framer-motion'
import { FiCalendar, FiMapPin, FiBriefcase, FiBook } from 'react-icons/fi'

type TimelineItem = {
  title: string
  organization: string
  location: string
  period: string
  description?: string
  type: 'education' | 'experience'
  tags?: string[]
  achievements?: string[]
}

const items: TimelineItem[] = [
  {
    title: 'Software Engineering Degree (Graduated)',
    organization: 'ESPRIT',
    location: 'Tunisia',
    period: 'Graduated Software Engineer',
    description: 'Earned National Engineering Diploma with specialization in full-stack web development, cloud computing, microservices, and DevOps methodologies.',
    type: 'education',
    tags: ['Cloud Computing', 'Software Architecture', 'Agile'],
    achievements: ['Full-stack specialization', 'Cloud & DevOps focus', 'Full-Time Ready']
  },
  {
    title: 'Full Stack Developer Intern',
    organization: 'ODC – Orange Digital Center',
    location: 'Tunisia',
    period: '2024',
    description: 'Built training and certification management platform using React/Next.js and microservices (Node.js & Python). Designed analytics dashboards and optimized user flows for better UX.',
    type: 'experience',
    tags: ['React', 'Next.js', 'Node.js', 'Microservices'],
    achievements: ['Training platform from scratch', 'Analytics dashboards', 'Microservices architecture']
  },
  {
    title: 'Backend Developer Intern',
    organization: 'Kaddem University Platform',
    location: 'Tunisia',
    period: '2023',
    description: 'Developed REST APIs with Spring Boot and implemented CI/CD pipelines with Jenkins and Docker. Containerized microservices and improved deployment speed by automating the build pipeline.',
    type: 'experience',
    tags: ['Spring Boot', 'Jenkins', 'Docker', 'CI/CD'],
    achievements: ['REST API design', 'Jenkins CI/CD pipeline', 'Docker containerization']
  }
]

export default function Timeline() {
  return (
    <div className="container-responsive">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mb-10"
      >
        <h2 className="text-3xl font-bold mb-2">Experience & Education</h2>
        <p className="text-gray-500 dark:text-gray-400 text-sm">My professional journey</p>
      </motion.div>

      <div className="relative">
        {/* Central line */}
        <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-primary-500 via-primary-400/50 to-transparent -translate-x-px" />

        <div className="space-y-10">
          {items.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: idx * 0.15 }}
              viewport={{ once: true }}
              className={`relative flex items-start gap-8 ${idx % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}
            >
              {/* Timeline node */}
              <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 w-10 h-10 rounded-full border-4 border-white dark:border-gray-950 shadow-lg items-center justify-center z-10"
                style={{ background: item.type === 'education' ? '#3B82F6' : '#10B981' }}
              >
                {item.type === 'education' ? (
                  <FiBook className="text-white text-sm" />
                ) : (
                  <FiBriefcase className="text-white text-sm" />
                )}
              </div>

              {/* Spacer for centering */}
              <div className="hidden md:block md:w-1/2" />

              {/* Content card */}
              <div className={`w-full md:w-1/2 ${idx % 2 === 0 ? 'md:pl-8' : 'md:pr-8'}`}>
                <motion.div
                  whileHover={{ y: -3, transition: { duration: 0.2 } }}
                  className="card p-6 group hover:border-primary-300 dark:hover:border-primary-700 transition-colors"
                >
                  {/* Type badge */}
                  <div className="flex items-center gap-2 mb-3">
                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${
                      item.type === 'education'
                        ? 'bg-blue-100 dark:bg-blue-950/40 text-blue-700 dark:text-blue-300'
                        : 'bg-emerald-100 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300'
                    }`}>
                      {item.type === 'education' ? <FiBook className="text-[10px]" /> : <FiBriefcase className="text-[10px]" />}
                      {item.type === 'education' ? 'Education' : 'Experience'}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-primary-600 dark:text-primary-400 font-semibold text-sm mb-3">{item.organization}</p>

                  <div className="flex flex-wrap gap-3 text-xs text-gray-500 dark:text-gray-400 mb-3">
                    <span className="flex items-center gap-1">
                      <FiCalendar className="text-[11px]" /> {item.period}
                    </span>
                    <span className="flex items-center gap-1">
                      <FiMapPin className="text-[11px]" /> {item.location}
                    </span>
                  </div>

                  {item.description && (
                    <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed mb-4">{item.description}</p>
                  )}

                  {/* Achievement chips */}
                  {item.achievements && (
                    <div className="flex flex-wrap gap-1.5">
                      {item.achievements.map(a => (
                        <span key={a} className="text-[11px] bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 px-2 py-0.5 rounded flex items-center gap-1">
                          ✓ {a}
                        </span>
                      ))}
                    </div>
                  )}
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}
