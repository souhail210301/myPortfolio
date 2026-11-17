import { motion } from 'framer-motion'
import { FiArrowRight, FiDownload, FiGithub, FiLinkedin, FiMail } from 'react-icons/fi'
import { useTypingEffect } from '../hooks/useTypingEffect'
import ParticleCanvas from './ParticleCanvas'

const PHRASES = [
  'Full Stack Developer',
  'Spring Boot Engineer',
  'React Architect',
  'DevOps Enthusiast',
  'Problem Solver',
  'Cloud-Native Builder',
]

const STATS = [
  { label: 'Projects Shipped', value: '10+' },
  { label: 'Technologies', value: '20+' },
  { label: 'Industry Roles', value: '2' },
  { label: 'Full-Time Ready', value: '✓' },
]

export default function Hero() {
  const typed = useTypingEffect(PHRASES)

  return (
    <div className="relative min-h-[90vh] flex items-center overflow-hidden">
      {/* Particle background */}
      <div className="absolute inset-0 opacity-60">
        <ParticleCanvas />
      </div>

      {/* Gradient mesh overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary-50/80 via-transparent to-sky-50/40 dark:from-primary-950/50 dark:via-transparent dark:to-gray-950/80 pointer-events-none" />

      <div className="container-responsive relative z-10 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left: Content */}
          <div>
            {/* Status Badge */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold bg-green-100 dark:bg-green-950/60 text-green-700 dark:text-green-400 border border-green-200 dark:border-green-800 mb-6"
            >
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              Graduated Software Engineer • Available for Full-Time Roles
            </motion.div>

            {/* Name */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-5xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight mb-4 leading-none"
            >
              Abdennebi
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-500 via-sky-500 to-primary-600">
                Souhail
              </span>
            </motion.h1>

            {/* Typewriter role */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-xl sm:text-2xl font-semibold text-gray-600 dark:text-gray-300 mb-6 h-8 flex items-center gap-2"
            >
              <span>{typed}</span>
              <span className="inline-block w-0.5 h-6 bg-primary-500 animate-pulse ml-0.5" />
            </motion.div>

            {/* Bio */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-base sm:text-lg text-gray-600 dark:text-gray-400 mb-8 max-w-lg leading-relaxed"
            >
              Building production-grade web apps with <strong className="text-gray-800 dark:text-gray-200">React</strong>, <strong className="text-gray-800 dark:text-gray-200">Spring Boot</strong>, and cloud-native tooling. Passionate about scalable architectures, clean code, and exceptional UX.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-wrap gap-3 mb-8"
            >
              <a href="#contact" className="btn btn-primary group text-base px-6 py-3 shadow-lg shadow-primary-500/25 hover:shadow-primary-500/40 transition-all duration-300">
                Let's Talk <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
              </a>
              <a href="/assets/Abdennebi_Souhail_CV.pdf" download className="btn btn-outline text-base px-6 py-3 hover:bg-gray-50 dark:hover:bg-gray-800">
                <FiDownload /> Resume PDF
              </a>
            </motion.div>

            {/* Social Links */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="flex items-center gap-4"
            >
              {[
                { href: 'https://github.com/souhail210301', icon: FiGithub, label: 'GitHub' },
                { href: 'https://www.linkedin.com/in/souhail-abdennebi-856541229/', icon: FiLinkedin, label: 'LinkedIn' },
                { href: 'mailto:souhailabdennebi2@gmail.com', icon: FiMail, label: 'Email' },
              ].map(({ href, icon: Icon, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={label}
                  className="p-2.5 rounded-xl border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 hover:text-primary-500 hover:border-primary-400 dark:hover:border-primary-500 hover:bg-primary-50 dark:hover:bg-primary-950/30 transition-all duration-200"
                >
                  <Icon className="text-lg" />
                </a>
              ))}
              <div className="h-5 w-px bg-gray-200 dark:bg-gray-700" />
              <span className="text-xs text-gray-500 dark:text-gray-400">souhailabdennebi2@gmail.com</span>
            </motion.div>
          </div>

          {/* Right: Stats grid + floating card */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="relative"
          >
            {/* Avatar placeholder with gradient ring */}
            <div className="relative mx-auto w-64 h-64 lg:w-72 lg:h-72 mb-6">
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-primary-400 via-sky-500 to-primary-600 animate-spin-slow opacity-70 blur-sm" />
              <div className="relative w-full h-full rounded-3xl bg-gradient-to-br from-primary-100 to-sky-200 dark:from-primary-900/60 dark:to-sky-900/40 border-2 border-primary-200 dark:border-primary-800 flex items-center justify-center overflow-hidden">
                <div className="text-7xl font-black text-primary-500/30 dark:text-primary-400/20 select-none">AS</div>
                {/* Decorative code lines */}
                <div className="absolute bottom-4 left-4 right-4 font-mono text-[9px] text-primary-600/50 dark:text-primary-400/30 space-y-0.5">
                  <div>const dev = "Souhail";</div>
                  <div>stack: ["React", "Spring"]</div>
                  <div className="text-green-500/60">// available: true</div>
                </div>
              </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-3">
              {STATS.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, delay: 0.5 + i * 0.1 }}
                  className="card p-4 text-center group hover:border-primary-300 dark:hover:border-primary-700 transition-colors"
                >
                  <div className="text-2xl font-black text-primary-500 mb-1">{stat.value}</div>
                  <div className="text-xs text-gray-600 dark:text-gray-400 leading-tight">{stat.label}</div>
                </motion.div>
              ))}
            </div>

            {/* Floating badge: ESPRIT */}
            <motion.div
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute -top-4 -right-4 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl px-3 py-2 shadow-lg text-xs font-semibold flex items-center gap-2"
            >
              🎓 ESPRIT Engineer
            </motion.div>

            {/* Floating badge: Tunisia */}
            <motion.div
              animate={{ y: [0, 6, 0] }}
              transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
              className="absolute -bottom-2 -left-4 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl px-3 py-2 shadow-lg text-xs font-semibold flex items-center gap-2"
            >
              🇹🇳 Tunisia
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-gray-400 dark:text-gray-600"
        >
          <span className="text-xs tracking-widest uppercase">Scroll</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-5 h-8 rounded-full border-2 border-gray-300 dark:border-gray-700 flex items-start justify-center pt-1.5"
          >
            <div className="w-1 h-1.5 rounded-full bg-gray-400 dark:bg-gray-600" />
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}
