import { useState, useRef } from 'react'
import { motion, AnimatePresence, useMotionValue, useTransform, useSpring } from 'framer-motion'
import { FiGithub, FiX, FiExternalLink, FiSearch, FiCode, FiLayers } from 'react-icons/fi'
import { projects } from '../data/projects'

// Project tech color mapping
const TECH_COLORS: Record<string, string> = {
  'React': 'bg-cyan-100 text-cyan-800 dark:bg-cyan-950/40 dark:text-cyan-300',
  'Angular': 'bg-red-100 text-red-800 dark:bg-red-950/40 dark:text-red-300',
  'Next.js': 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300',
  'Spring Boot': 'bg-green-100 text-green-800 dark:bg-green-950/40 dark:text-green-300',
  'Node.js': 'bg-lime-100 text-lime-800 dark:bg-lime-950/40 dark:text-lime-300',
  'Docker': 'bg-blue-100 text-blue-800 dark:bg-blue-950/40 dark:text-blue-300',
  'Jenkins': 'bg-orange-100 text-orange-800 dark:bg-orange-950/40 dark:text-orange-300',
  'MySQL': 'bg-indigo-100 text-indigo-800 dark:bg-indigo-950/40 dark:text-indigo-300',
  'MongoDB': 'bg-green-100 text-green-800 dark:bg-green-950/40 dark:text-green-300',
  'Python': 'bg-yellow-100 text-yellow-800 dark:bg-yellow-950/40 dark:text-yellow-300',
  'PHP': 'bg-purple-100 text-purple-800 dark:bg-purple-950/40 dark:text-purple-300',
  'Laravel': 'bg-rose-100 text-rose-800 dark:bg-rose-950/40 dark:text-rose-300',
  'TypeScript': 'bg-blue-100 text-blue-800 dark:bg-blue-950/40 dark:text-blue-300',
  'Microservices': 'bg-violet-100 text-violet-800 dark:bg-violet-950/40 dark:text-violet-300',
  'Eureka': 'bg-teal-100 text-teal-800 dark:bg-teal-950/40 dark:text-teal-300',
  'API Gateway': 'bg-sky-100 text-sky-800 dark:bg-sky-950/40 dark:text-sky-300',
  'Docker Compose': 'bg-blue-100 text-blue-800 dark:bg-blue-950/40 dark:text-blue-300',
  'Semantic Web': 'bg-pink-100 text-pink-800 dark:bg-pink-950/40 dark:text-pink-300',
}

const PROJECT_GRADIENTS = [
  'from-blue-500/20 to-cyan-500/10 dark:from-blue-900/30 dark:to-cyan-900/20',
  'from-green-500/20 to-teal-500/10 dark:from-green-900/30 dark:to-teal-900/20',
  'from-purple-500/20 to-pink-500/10 dark:from-purple-900/30 dark:to-pink-900/20',
  'from-orange-500/20 to-yellow-500/10 dark:from-orange-900/30 dark:to-yellow-900/20',
  'from-primary-500/20 to-sky-500/10 dark:from-primary-900/30 dark:to-sky-900/20',
]

const PROJECT_ICONS = ['🏛️', '🏨', '🎓', '🥗', '♻️']

function TiltCard({ children, className }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [6, -6]), { stiffness: 300, damping: 30 })
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-6, 6]), { stiffness: 300, damping: 30 })

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = ref.current?.getBoundingClientRect()
    if (!rect) return
    x.set((e.clientX - rect.left) / rect.width - 0.5)
    y.set((e.clientY - rect.top) / rect.height - 0.5)
  }

  return (
    <motion.div
      ref={ref}
      style={{ rotateX, rotateY, transformStyle: 'preserve-3d', perspective: 800 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => { x.set(0); y.set(0) }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

export default function Projects() {
  const [activeId, setActiveId] = useState<string | null>(null)
  const [search, setSearch] = useState('')
  const [selectedTag, setSelectedTag] = useState<string | null>(null)

  const active = projects.find(p => p.id === activeId)
  const allTags = Array.from(new Set(projects.flatMap(p => p.tech)))

  const filtered = projects.filter(p => {
    const matchesSearch = p.title.toLowerCase().includes(search.toLowerCase()) ||
                         p.short.toLowerCase().includes(search.toLowerCase())
    const matchesTag = !selectedTag || p.tech.includes(selectedTag)
    return matchesSearch && matchesTag
  })

  return (
    <div className="container-responsive">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mb-10"
      >
        <h2 className="text-3xl font-bold mb-2">Projects</h2>
        <p className="text-gray-500 dark:text-gray-400 text-sm">What I've built — hover the cards for 3D effect</p>
      </motion.div>

      {/* Search and filters */}
      <div className="mb-8 space-y-4">
        <div className="relative max-w-sm">
          <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search projects..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm transition-all"
          />
        </div>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setSelectedTag(null)}
            className={`px-3 py-1 text-xs font-medium rounded-full transition-all ${
              !selectedTag ? 'bg-primary-500 text-white shadow-sm' : 'bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-400'
            }`}
          >
            All ({projects.length})
          </button>
          {allTags.map(tag => (
            <button
              key={tag}
              onClick={() => setSelectedTag(tag === selectedTag ? null : tag)}
              className={`px-3 py-1 text-xs font-medium rounded-full transition-all ${
                selectedTag === tag ? 'bg-primary-500 text-white shadow-sm' : 'bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-400'
              }`}
            >
              {tag}
            </button>
          ))}
        </div>
      </div>

      <p className="text-xs text-gray-500 dark:text-gray-400 mb-4">
        Showing <strong>{filtered.length}</strong> of {projects.length} projects
      </p>

      {/* Projects Grid with 3D Tilt */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <AnimatePresence mode="popLayout">
          {filtered.map((p, idx) => (
            <motion.div
              key={p.id}
              layout
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3, delay: idx * 0.05 }}
            >
              <TiltCard className="h-full">
                <div className="card flex flex-col h-full overflow-hidden cursor-pointer group" onClick={() => setActiveId(p.id)}>
                  {/* Project visual header */}
                  <div className={`h-32 bg-gradient-to-br ${PROJECT_GRADIENTS[idx % PROJECT_GRADIENTS.length]} flex items-center justify-center relative overflow-hidden`}>
                    <span className="text-5xl opacity-30">{PROJECT_ICONS[idx % PROJECT_ICONS.length]}</span>
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-primary-500/10" />
                    <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                      <span className="text-xs bg-white/90 dark:bg-gray-900/90 text-primary-600 dark:text-primary-400 px-2 py-1 rounded-full font-medium flex items-center gap-1">
                        <FiLayers className="text-xs" /> Details
                      </span>
                    </div>
                  </div>

                  <div className="p-5 flex flex-col flex-1">
                    <h3 className="text-base font-bold text-gray-900 dark:text-white mb-2 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                      {p.title}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300 flex-1 leading-relaxed mb-3">{p.short}</p>

                    {/* Tech badges */}
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {p.tech.map(t => (
                        <span
                          key={t}
                          className={`text-[11px] font-medium px-2 py-0.5 rounded-full ${TECH_COLORS[t] || 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300'}`}
                        >
                          {t}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center gap-2 mt-auto pt-3 border-t border-gray-100 dark:border-gray-800">
                      <a
                        className="inline-flex items-center gap-1.5 text-xs font-medium text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                        href={p.github}
                        target="_blank"
                        rel="noreferrer"
                        onClick={e => e.stopPropagation()}
                      >
                        <FiGithub /> Code
                      </a>
                      {p.demo && (
                        <a
                          className="inline-flex items-center gap-1.5 text-xs font-medium text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                          href={p.demo}
                          target="_blank"
                          rel="noreferrer"
                          onClick={e => e.stopPropagation()}
                        >
                          <FiExternalLink /> Live
                        </a>
                      )}
                      <span className="ml-auto text-xs flex items-center gap-1 text-primary-600 dark:text-primary-400 font-medium">
                        <FiCode className="text-xs" /> {p.tech.length} techs
                      </span>
                    </div>
                  </div>
                </div>
              </TiltCard>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Empty state */}
      {filtered.length === 0 && (
        <div className="text-center py-16">
          <div className="text-5xl mb-4">🔍</div>
          <p className="text-gray-500 dark:text-gray-400 mb-4">No projects match your filter.</p>
          <button onClick={() => { setSearch(''); setSelectedTag(null) }} className="btn btn-outline">
            Clear filters
          </button>
        </div>
      )}

      {/* Modal */}
      <AnimatePresence>
        {active && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
              onClick={() => setActiveId(null)}
            />
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className="relative z-10 card max-w-2xl w-full overflow-hidden max-h-[90vh] overflow-y-auto"
            >
              {/* Modal header gradient */}
              <div className={`h-24 bg-gradient-to-br ${PROJECT_GRADIENTS[projects.findIndex(p => p.id === active.id) % PROJECT_GRADIENTS.length]} flex items-center px-6 relative`}>
                <span className="text-4xl">{PROJECT_ICONS[projects.findIndex(p => p.id === active.id) % PROJECT_ICONS.length]}</span>
                <button
                  className="absolute top-4 right-4 p-2 rounded-lg bg-white/20 hover:bg-white/40 backdrop-blur text-white transition-colors"
                  onClick={() => setActiveId(null)}
                  aria-label="Close"
                >
                  <FiX />
                </button>
              </div>

              <div className="p-6">
                <h3 className="text-2xl font-bold mb-3 text-gray-900 dark:text-white">{active.title}</h3>
                <p className="text-gray-700 dark:text-gray-300 mb-5 leading-relaxed">{active.description}</p>

                <div className="mb-5">
                  <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">Tech Stack</p>
                  <div className="flex flex-wrap gap-2">
                    {active.tech.map(t => (
                      <span
                        key={t}
                        className={`text-xs font-medium px-2.5 py-1 rounded-full ${TECH_COLORS[t] || 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300'}`}
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex gap-3">
                  <a className="btn btn-primary" href={active.github} target="_blank" rel="noreferrer">
                    <FiGithub /> View on GitHub
                  </a>
                  {active.demo && (
                    <a className="btn btn-outline" href={active.demo} target="_blank" rel="noreferrer">
                      <FiExternalLink /> Live Demo
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
