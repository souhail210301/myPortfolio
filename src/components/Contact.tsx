import { useState } from 'react'
import { motion } from 'framer-motion'
import { FiGithub, FiLinkedin, FiMail, FiPhone, FiSend, FiMapPin, FiClock, FiCheckCircle } from 'react-icons/fi'
import { useToast } from './ToastProvider'

const CONTACT_CARDS = [
  { icon: FiMail, label: 'Email', value: 'souhailabdennebi2@gmail.com', href: 'mailto:souhailabdennebi2@gmail.com', color: 'text-primary-500' },
  { icon: FiPhone, label: 'Phone / WhatsApp', value: '+216 52 999 688', href: 'tel:+21652999688', color: 'text-green-500' },
  { icon: FiLinkedin, label: 'LinkedIn', value: 'souhail-abdennebi', href: 'https://www.linkedin.com/in/souhail-abdennebi-856541229/', color: 'text-blue-500' },
  { icon: FiGithub, label: 'GitHub', value: 'souhail210301', href: 'https://github.com/souhail210301', color: 'text-gray-700 dark:text-gray-300' },
  { icon: FiMapPin, label: 'Location', value: 'Tunisia (Open to Relocation)', href: '#', color: 'text-orange-500' },
  { icon: FiClock, label: 'Availability', value: 'Immediate / Full-Time', href: '#', color: 'text-purple-500' },
]

export default function Contact() {
  const toast = useToast()
  const [formState, setFormState] = useState({ name: '', email: '', subject: 'fulltime', message: '' })
  const [submitting, setSubmitting] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormState(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  return (
    <div className="container-responsive">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mb-10"
      >
        <h2 className="text-3xl font-bold mb-2">Get in Touch</h2>
        <p className="text-gray-500 dark:text-gray-400 text-sm">Graduated Software Engineer ready for new challenges — let's connect!</p>
      </motion.div>

      {/* Availability Banner */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="card p-4 mb-8 flex items-center gap-3 border-green-200 dark:border-green-900/50 bg-green-50/50 dark:bg-green-950/20"
      >
        <span className="w-3 h-3 rounded-full bg-green-500 animate-pulse shrink-0" />
        <div className="flex-1">
          <p className="text-sm font-semibold text-green-800 dark:text-green-300 flex items-center gap-2">
            Graduated & Available Immediately for Full-Time Roles
            <FiCheckCircle className="text-xs text-green-600" />
          </p>
          <p className="text-xs text-green-700 dark:text-green-400">
            Open for Full-Time Software Engineer, Full Stack, Backend, or DevOps opportunities (Remote worldwide, Hybrid, or On-site with relocation).
          </p>
        </div>
      </motion.div>

      <div className="grid lg:grid-cols-5 gap-8">
        {/* Left: Contact cards */}
        <div className="lg:col-span-2 space-y-3">
          {CONTACT_CARDS.map((card, i) => (
            <motion.a
              key={card.label}
              href={card.href}
              target={card.href.startsWith('http') ? '_blank' : undefined}
              rel="noreferrer"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="card p-4 flex items-center gap-4 group hover:border-primary-300 dark:hover:border-primary-700 transition-all duration-200 hover:-translate-y-0.5 block"
            >
              <div className={`p-2.5 rounded-xl bg-gray-100 dark:bg-gray-800 ${card.color} group-hover:scale-110 transition-transform`}>
                <card.icon className="text-lg" />
              </div>
              <div className="min-w-0">
                <p className="text-xs font-medium text-gray-500 dark:text-gray-400">{card.label}</p>
                <p className="text-sm font-semibold text-gray-900 dark:text-white truncate group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                  {card.value}
                </p>
              </div>
            </motion.a>
          ))}
        </div>

        {/* Right: Contact form */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="lg:col-span-3"
        >
          <div className="card p-6">
            <h3 className="text-lg font-bold mb-5 text-gray-900 dark:text-white">Send a Direct Message</h3>
            <form
              name="contact"
              method="POST"
              data-netlify="true"
              data-netlify-honeypot="bot-field"
              action="/success"
              className="space-y-4"
              onSubmit={(e) => {
                if (location.hostname === 'localhost' || location.hostname === '127.0.0.1') {
                  e.preventDefault()
                  setSubmitting(true)
                  setTimeout(() => {
                    setSubmitting(false)
                    window.location.href = `mailto:souhailabdennebi2@gmail.com?subject=${encodeURIComponent(formState.subject + ' - Opportunity for Souhail')}&body=${encodeURIComponent('From: ' + formState.name + ' (' + formState.email + ')\n\n' + formState.message)}`
                    toast.success('Opening your email client to send message!')
                  }, 600)
                } else {
                  toast.success('Message sent! I will get back to you soon.')
                }
              }}
            >
              <input type="hidden" name="form-name" value="contact" />
              <input type="text" name="bot-field" className="hidden" tabIndex={-1} aria-hidden="true" />

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1.5">Name *</label>
                  <input
                    name="name"
                    value={formState.name}
                    onChange={handleChange}
                    required
                    placeholder="Recruiter or Company Name"
                    className="w-full px-3 py-2.5 text-sm rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all placeholder-gray-400 dark:placeholder-gray-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1.5">Email *</label>
                  <input
                    type="email"
                    name="email"
                    value={formState.email}
                    onChange={handleChange}
                    required
                    placeholder="recruiter@company.com"
                    className="w-full px-3 py-2.5 text-sm rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all placeholder-gray-400 dark:placeholder-gray-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1.5">Opportunity Type</label>
                <select
                  name="subject"
                  value={formState.subject}
                  onChange={handleChange}
                  className="w-full px-3 py-2.5 text-sm rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all text-gray-700 dark:text-gray-300"
                >
                  <option value="Full-Time Software Engineer">Full-Time Software Engineer Position</option>
                  <option value="Full Stack Developer Role">Full Stack Developer Role</option>
                  <option value="Backend / Microservices Opportunity">Backend / Microservices Opportunity</option>
                  <option value="Frontend Developer Role">Frontend Developer Role</option>
                  <option value="Freelance / Contract Opportunity">Freelance / Contract Opportunity</option>
                  <option value="General Recruiter Inquiry">General Recruiter Inquiry</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1.5">Message *</label>
                <textarea
                  name="message"
                  value={formState.message}
                  onChange={handleChange}
                  required
                  rows={4}
                  placeholder="Tell me about the position, team, tech stack, or location..."
                  className="w-full px-3 py-2.5 text-sm rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all resize-none placeholder-gray-400 dark:placeholder-gray-500"
                />
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="btn btn-primary w-full py-3 text-sm font-semibold shadow-md shadow-primary-500/20 hover:shadow-primary-500/30 transition-all disabled:opacity-60"
              >
                {submitting ? (
                  <span className="flex items-center justify-center gap-2">
                    <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Sending...
                  </span>
                ) : (
                  <span className="flex items-center justify-center gap-2">
                    <FiSend /> Send Message
                  </span>
                )}
              </button>
            </form>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
