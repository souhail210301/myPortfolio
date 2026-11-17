import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTheme } from '../theme/ThemeContext'
import { useScrollSpy } from '../hooks/useScrollSpy'
import { FiMoon, FiSun, FiDownload, FiMenu, FiX } from 'react-icons/fi'

const nav = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'timeline', label: 'Timeline' },
  { id: 'projects', label: 'Projects' },
  { id: 'skills', label: 'Skills' },
  { id: 'contact', label: 'Contact' },
]

export default function Header() {
  const { theme, toggle } = useTheme()
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const active = useScrollSpy(nav.map(n => n.id))

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'backdrop-blur-xl bg-white/80 dark:bg-gray-950/80 border-b border-gray-200/70 dark:border-gray-800/70 shadow-sm'
          : 'bg-transparent border-b border-transparent'
      }`}
    >
      <div className="container-responsive flex items-center justify-between py-3">
        {/* Logo */}
        <motion.a
          href="#home"
          whileHover={{ scale: 1.03 }}
          className="font-extrabold tracking-tight text-xl flex items-center gap-1"
        >
          Souhail<span className="text-primary-500">.</span>
          <span className="hidden sm:inline text-xs font-medium text-gray-400 dark:text-gray-500 ml-1 mt-0.5">dev</span>
        </motion.a>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-1">
          {nav.map(n => (
            <a
              key={n.id}
              href={`#${n.id}`}
              className={`relative px-3 py-1.5 text-sm font-medium rounded-lg transition-colors duration-200 ${
                active === n.id
                  ? 'text-primary-600 dark:text-primary-400'
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-800'
              }`}
            >
              {n.label}
              {active === n.id && (
                <motion.div
                  layoutId="nav-active"
                  className="absolute inset-0 bg-primary-100 dark:bg-primary-950/50 rounded-lg -z-10"
                  transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                />
              )}
            </a>
          ))}
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-2">
          <a
            className="hidden sm:inline-flex btn btn-primary text-sm py-2 px-4 shadow-sm shadow-primary-500/20"
            href="/assets/Abdennebi_Souhail_CV.pdf"
            download
          >
            <FiDownload className="text-sm" /> CV
          </a>
          <button
            aria-label="Toggle theme"
            className="btn btn-outline p-2.5"
            onClick={toggle}
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={theme}
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                {theme === 'dark' ? <FiSun /> : <FiMoon />}
              </motion.div>
            </AnimatePresence>
          </button>
          <button
            className="md:hidden btn btn-outline p-2.5"
            aria-label="Toggle menu"
            onClick={() => setOpen(o => !o)}
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={open ? 'close' : 'open'}
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                {open ? <FiX /> : <FiMenu />}
              </motion.div>
            </AnimatePresence>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="md:hidden border-t border-gray-200 dark:border-gray-800 overflow-hidden bg-white/95 dark:bg-gray-950/95 backdrop-blur"
          >
            <div className="container-responsive py-3 flex flex-col gap-1">
              {nav.map(n => (
                <a
                  key={n.id}
                  href={`#${n.id}`}
                  onClick={() => setOpen(false)}
                  className={`py-2 px-3 rounded-lg text-sm font-medium transition-colors ${
                    active === n.id
                      ? 'bg-primary-100 dark:bg-primary-950/50 text-primary-600 dark:text-primary-400'
                      : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                  }`}
                >
                  {n.label}
                </a>
              ))}
              <a
                className="btn btn-primary text-sm mt-2"
                href="/assets/Abdennebi_Souhail_CV.pdf"
                download
                onClick={() => setOpen(false)}
              >
                <FiDownload /> Download CV
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
