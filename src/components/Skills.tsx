import { useState } from 'react'
import { motion } from 'framer-motion'
import { IconType } from 'react-icons'
import { FiCloud } from 'react-icons/fi'
import { SiReact, SiAngular, SiNextdotjs, SiHtml5, SiCss3, SiJavascript, SiTypescript, SiSpringboot, SiNodedotjs, SiExpress, SiPhp, SiPython, SiMysql, SiMongodb, SiDocker, SiJenkins, SiGithubactions, SiGit, SiPostman } from 'react-icons/si'

type Skill = { name: string; icon: IconType; level: number; color: string }

const categories: { title: string; emoji: string; items: Skill[] }[] = [
  {
    title: 'Frontend',
    emoji: '🎨',
    items: [
      { name: 'React', icon: SiReact, level: 92, color: '#61DAFB' },
      { name: 'Angular', icon: SiAngular, level: 80, color: '#DD0031' },
      { name: 'Next.js', icon: SiNextdotjs, level: 78, color: '#000000' },
      { name: 'TypeScript', icon: SiTypescript, level: 85, color: '#3178C6' },
      { name: 'JavaScript', icon: SiJavascript, level: 90, color: '#F7DF1E' },
      { name: 'HTML5', icon: SiHtml5, level: 95, color: '#E34F26' },
      { name: 'CSS3', icon: SiCss3, level: 90, color: '#1572B6' },
    ]
  },
  {
    title: 'Backend',
    emoji: '⚙️',
    items: [
      { name: 'Spring Boot', icon: SiSpringboot, level: 85, color: '#6DB33F' },
      { name: 'Node.js', icon: SiNodedotjs, level: 80, color: '#339933' },
      { name: 'Express', icon: SiExpress, level: 78, color: '#000000' },
      { name: 'PHP', icon: SiPhp, level: 72, color: '#777BB4' },
      { name: 'Python', icon: SiPython, level: 75, color: '#3776AB' },
    ]
  },
  {
    title: 'Databases',
    emoji: '🗄️',
    items: [
      { name: 'MySQL', icon: SiMysql, level: 82, color: '#4479A1' },
      { name: 'MongoDB', icon: SiMongodb, level: 75, color: '#47A248' },
    ]
  },
  {
    title: 'DevOps & Cloud',
    emoji: '☁️',
    items: [
      { name: 'Docker', icon: SiDocker, level: 83, color: '#2496ED' },
      { name: 'Jenkins', icon: SiJenkins, level: 76, color: '#D33833' },
      { name: 'Azure', icon: FiCloud, level: 70, color: '#0078D4' },
      { name: 'GitHub Actions', icon: SiGithubactions, level: 78, color: '#2088FF' },
    ]
  },
  {
    title: 'Tools',
    emoji: '🔧',
    items: [
      { name: 'Git', icon: SiGit, level: 90, color: '#F05032' },
      { name: 'Postman', icon: SiPostman, level: 85, color: '#FF6C37' },
    ]
  },
]

function SkillBar({ name, level, color, icon: Icon }: Skill) {
  const [hovered, setHovered] = useState(false)
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
      className="group"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="flex items-center justify-between mb-1.5">
        <div className="flex items-center gap-2">
          <Icon className="text-base" style={{ color }} />
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{name}</span>
        </div>
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: hovered ? 1 : 0 }}
          className="text-xs font-bold tabular-nums"
          style={{ color }}
        >
          {level}%
        </motion.span>
      </div>
      <div className="h-1.5 w-full rounded-full bg-gray-100 dark:bg-gray-800 overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${level}%` }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, delay: 0.2, ease: 'easeOut' }}
          className="h-full rounded-full"
          style={{ background: `linear-gradient(90deg, ${color}99, ${color})` }}
        />
      </div>
    </motion.div>
  )
}

export default function Skills() {
  const [activeCategory, setActiveCategory] = useState<string | null>(null)

  const displayed = activeCategory
    ? categories.filter(c => c.title === activeCategory)
    : categories

  return (
    <div className="container-responsive">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mb-10"
      >
        <h2 className="text-3xl font-bold mb-2">Skills & Expertise</h2>
        <p className="text-gray-500 dark:text-gray-400 text-sm">Technologies I work with daily</p>
      </motion.div>

      {/* Category Filter Tabs */}
      <div className="flex flex-wrap gap-2 mb-8">
        <button
          onClick={() => setActiveCategory(null)}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
            !activeCategory
              ? 'bg-primary-500 text-white shadow-md shadow-primary-500/30'
              : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700'
          }`}
        >
          All Skills
        </button>
        {categories.map(cat => (
          <button
            key={cat.title}
            onClick={() => setActiveCategory(cat.title === activeCategory ? null : cat.title)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
              activeCategory === cat.title
                ? 'bg-primary-500 text-white shadow-md shadow-primary-500/30'
                : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700'
            }`}
          >
            {cat.emoji} {cat.title}
          </button>
        ))}
      </div>

      {/* Skills Grid */}
      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
        {displayed.map(cat => (
          <motion.div
            key={cat.title}
            layout
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="card p-6"
          >
            <h3 className="text-base font-bold mb-5 flex items-center gap-2 text-gray-800 dark:text-gray-100">
              <span className="text-xl">{cat.emoji}</span>
              {cat.title}
              <span className="ml-auto text-xs text-gray-400 font-normal">{cat.items.length} skills</span>
            </h3>
            <div className="space-y-4">
              {cat.items.map(skill => (
                <SkillBar key={skill.name} {...skill} />
              ))}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Total skills count */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mt-8 text-center text-sm text-gray-500 dark:text-gray-400"
      >
        {categories.reduce((acc, c) => acc + c.items.length, 0)} technologies across {categories.length} domains
      </motion.div>
    </div>
  )
}
