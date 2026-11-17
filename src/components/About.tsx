import { motion } from 'framer-motion'
import { FiCode, FiGlobe, FiAward, FiHeart } from 'react-icons/fi'

const traits = [
  { icon: FiCode, title: 'Clean Code Advocate', desc: 'Writes maintainable, well-documented code following SOLID principles and design patterns.' },
  { icon: FiGlobe, title: 'Multilingual', desc: 'Communicates fluently in English, French, and Arabic — bridging global teams easily.' },
  { icon: FiAward, title: 'Fast Learner', desc: 'Adapts quickly to new frameworks and technologies, delivering production-ready results.' },
  { icon: FiHeart, title: 'UX-Driven', desc: 'Passionate about crafting delightful, accessible interfaces that users love to use.' },
]

export default function About() {
  return (
    <div className="container-responsive">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mb-10"
      >
        <h2 className="text-3xl font-bold mb-2">About Me</h2>
        <p className="text-gray-500 dark:text-gray-400 text-sm">Who I am beyond the code</p>
      </motion.div>

      <div className="grid lg:grid-cols-2 gap-10 items-start">
        {/* Bio Column */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="space-y-6"
        >
          <div className="card p-6 border-l-4 border-primary-500">
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-base">
              I'm <strong className="text-gray-900 dark:text-white">Abdennebi Souhail</strong>, a graduated Software Engineer from <strong className="text-primary-600 dark:text-primary-400">ESPRIT, Tunisia</strong>, specializing in full-stack web development, microservices, and cloud-native architecture.
            </p>
          </div>

          <div className="card p-6">
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-sm">
              With hands-on experience building microservices at scale, containerizing applications with Docker, and automating CI/CD pipelines using Jenkins and GitHub Actions, I bring both depth and breadth to engineering teams. I'm driven by the challenge of solving real-world problems with elegant, performant software.
            </p>
          </div>

          {/* Education & Languages in a grid */}
          <div className="grid grid-cols-2 gap-4">
            <div className="card p-5">
              <h3 className="text-sm font-bold mb-3 text-gray-900 dark:text-white flex items-center gap-2">🎓 Education</h3>
              <div className="space-y-1">
                <p className="text-sm font-semibold text-primary-600 dark:text-primary-400">ESPRIT</p>
                <p className="text-xs text-gray-600 dark:text-gray-400">Software Engineering Degree</p>
                <p className="text-xs text-green-600 dark:text-green-400 font-medium">Graduated Software Engineer</p>
              </div>
            </div>
            <div className="card p-5">
              <h3 className="text-sm font-bold mb-3 text-gray-900 dark:text-white flex items-center gap-2">🌍 Languages</h3>
              <div className="space-y-2">
                {[
                  { lang: 'English', level: 'Professional', pct: 85 },
                  { lang: 'French', level: 'Fluent', pct: 90 },
                  { lang: 'Arabic', level: 'Native', pct: 100 },
                ].map(l => (
                  <div key={l.lang}>
                    <div className="flex justify-between text-xs mb-0.5">
                      <span className="font-medium text-gray-700 dark:text-gray-300">{l.lang}</span>
                      <span className="text-gray-500">{l.level}</span>
                    </div>
                    <div className="h-1 w-full rounded-full bg-gray-100 dark:bg-gray-800">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${l.pct}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, ease: 'easeOut' }}
                        className="h-full rounded-full bg-primary-500"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Traits Column */}
        <div className="space-y-4">
          {traits.map((trait, i) => (
            <motion.div
              key={trait.title}
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="card p-5 flex items-start gap-4 group hover:border-primary-300 dark:hover:border-primary-700 transition-colors duration-200"
            >
              <div className="p-2.5 rounded-xl bg-primary-100 dark:bg-primary-950/50 text-primary-600 dark:text-primary-400 group-hover:bg-primary-500 group-hover:text-white dark:group-hover:bg-primary-600 transition-colors duration-200 shrink-0">
                <trait.icon className="text-lg" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white text-sm mb-1">{trait.title}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">{trait.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}
