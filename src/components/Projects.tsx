import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiGithub, FiX, FiExternalLink } from 'react-icons/fi'
import { projects } from '../data/projects'

export default function Projects() {
  const [activeId, setActiveId] = useState<string | null>(null)
  const active = projects.find(p => p.id === activeId)

  return (
    <div className="container-responsive">
      <h2 className="text-3xl font-bold mb-6">Projects</h2>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map(p => (
          <motion.div key={p.id} whileHover={{ y: -4 }} className="card card-hover p-5 flex flex-col">
            <div className="h-36 rounded-lg bg-gradient-to-br from-primary-200/50 to-primary-500/20 dark:from-primary-900/30 dark:to-primary-700/10 border border-gray-200 dark:border-gray-800 mb-4" />
            <h3 className="text-lg font-semibold">{p.title}</h3>
            <p className="text-sm text-gray-600 dark:text-gray-300 flex-1">{p.short}</p>
            <div className="mt-4 flex items-center gap-2">
              <a className="btn btn-outline text-sm" href={p.github} target="_blank" rel="noreferrer"><FiGithub /> Code</a>
              {p.demo && (
                <a className="btn btn-outline text-sm" href={p.demo} target="_blank" rel="noreferrer"><FiExternalLink /> Live</a>
              )}
              <button className="btn btn-primary text-sm ml-auto" onClick={() => setActiveId(p.id)}>Details</button>
            </div>
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {active && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="absolute inset-0 bg-black/50" onClick={() => setActiveId(null)} />
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="relative z-10 card max-w-2xl w-full p-6"
            >
              <button className="absolute top-3 right-3 btn btn-outline px-2 py-1" onClick={() => setActiveId(null)} aria-label="Close">
                <FiX />
              </button>
              <h3 className="text-2xl font-bold mb-2">{active.title}</h3>
              <p className="text-gray-700 dark:text-gray-300 mb-4">{active.description}</p>
              <div className="flex flex-wrap gap-2 mb-4">
                {active.tech.map(t => (
                  <span key={t} className="text-xs bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 px-2 py-1 rounded">{t}</span>
                ))}
              </div>
              <div className="flex gap-2">
                <a className="btn btn-primary" href={active.github} target="_blank" rel="noreferrer"><FiGithub /> GitHub</a>
                {active.demo && <a className="btn btn-outline" href={active.demo} target="_blank" rel="noreferrer"><FiExternalLink /> Live</a>}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
