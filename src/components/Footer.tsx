import { FiGithub, FiLinkedin, FiMail, FiHeart } from 'react-icons/fi'

const links = [
  { href: 'https://github.com/souhail210301', icon: FiGithub, label: 'GitHub' },
  { href: 'https://www.linkedin.com/in/souhail-abdennebi-856541229/', icon: FiLinkedin, label: 'LinkedIn' },
  { href: 'mailto:souhailabdennebi2@gmail.com', icon: FiMail, label: 'Email' },
]

export default function Footer() {
  return (
    <footer className="border-t border-gray-200 dark:border-gray-800 pt-10 pb-6 mt-12">
      <div className="container-responsive">
        {/* Top row */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6">
          <div>
            <p className="font-extrabold text-lg tracking-tight">Souhail<span className="text-primary-500">.</span><span className="text-sm font-medium text-gray-400 ml-1">dev</span></p>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">Software Engineer · Full Stack Developer · Tunisia</p>
          </div>
          <div className="flex items-center gap-3">
            {links.map(({ href, icon: Icon, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noreferrer"
                aria-label={label}
                className="p-2.5 rounded-xl border border-gray-200 dark:border-gray-700 text-gray-500 dark:text-gray-400 hover:text-primary-500 hover:border-primary-400 dark:hover:border-primary-500 transition-all duration-200"
              >
                <Icon />
              </a>
            ))}
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-100 dark:border-gray-800/80 pt-4 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-gray-500 dark:text-gray-400">
          <p>© {new Date().getFullYear()} Abdennebi Souhail. All rights reserved.</p>
          <p className="flex items-center gap-1">
            Built with <FiHeart className="text-red-500 text-xs" /> using React, TypeScript &amp; Tailwind CSS
          </p>
        </div>
      </div>
    </footer>
  )
}
