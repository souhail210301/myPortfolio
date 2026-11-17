import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ThemeProvider, useTheme } from './theme/ThemeContext'
import { ToastProvider } from './components/ToastProvider'
import Header from './components/Header'
import Hero from './components/Hero'
import About from './components/About'
import ProjectsEnhanced from './components/ProjectsEnhanced'
import Skills from './components/Skills'
import Timeline from './components/Timeline'
import Contact from './components/Contact'
import Footer from './components/Footer'
import BackToTop from './components/BackToTop'
import RecruiterChatbot from './components/RecruiterChatbot'
import ScrollProgress from './components/ScrollProgress'

function PageLoader() {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-white dark:bg-gray-950"
    >
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
        className="w-12 h-12 border-4 border-primary-500 border-t-transparent rounded-full"
      />
    </motion.div>
  )
}

function AppContent() {
  const { theme } = useTheme()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const root = window.document.documentElement
    if (theme === 'dark') root.classList.add('dark')
    else root.classList.remove('dark')
  }, [theme])

  useEffect(() => {
    // Simulate initial load
    const timer = setTimeout(() => setLoading(false), 800)
    return () => clearTimeout(timer)
  }, [])

  return (
    <>
      <ScrollProgress />
      <AnimatePresence>
        {loading && <PageLoader />}
      </AnimatePresence>
      
      <div>
        <Header />
        <main>
          <section id="home" className="section"><Hero /></section>
          <section id="about" className="section"><About /></section>
          <section id="timeline" className="section"><Timeline /></section>
          <section id="projects" className="section"><ProjectsEnhanced /></section>
          <section id="skills" className="section"><Skills /></section>
          <section id="contact" className="section"><Contact /></section>
        </main>
        <Footer />
        <BackToTop />
        <RecruiterChatbot />
      </div>
    </>
  )
}

export default function App() {
  return (
    <ThemeProvider>
      <ToastProvider>
        <AppContent />
      </ToastProvider>
    </ThemeProvider>
  )
}
