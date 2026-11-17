import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  FiMessageSquare,
  FiX,
  FiSend,
  FiDownload,
  FiMail,
  FiExternalLink,
  FiRefreshCw,
  FiCheckCircle,
  FiUser,
  FiChevronRight
} from 'react-icons/fi'
import { HiSparkles } from 'react-icons/hi2'
import { PROFILE_INFO, QUICK_PROMPTS, RecruiterAction } from '../data/recruiterKnowledge'
import { ChatMessage, sendChatMessage, isGeminiConfigured } from '../services/recruiterBotService'

export default function RecruiterChatbot() {
  const [isOpen, setIsOpen] = useState(false)
  const [hasInteracted, setHasInteracted] = useState(false)
  const [showTooltip, setShowTooltip] = useState(false)
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      sender: 'bot',
      text: `👋 **Welcome! I'm Souhail's Portfolio Agent.**\n\nI'm here to assist recruiters, engineering managers, and hiring teams. Souhail has **graduated with his Software Engineering degree** and is available immediately for **Full-Time roles**. Feel free to ask about his **technical stack, full-time job availability, engineering experience, or architecture expertise**.`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      actions: [
        { label: 'Download Resume (PDF)', actionType: 'download', value: PROFILE_INFO.cvUrl, icon: 'download' },
        { label: 'Contact Souhail', actionType: 'link', value: `mailto:${PROFILE_INFO.email}`, icon: 'mail' }
      ],
      quickReplies: QUICK_PROMPTS
    }
  ])

  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const hasAi = isGeminiConfigured()

  // Show a gentle greeting tooltip after 2.5s if user hasn't opened the chat
  useEffect(() => {
    const timer = setTimeout(() => {
      if (!hasInteracted && !isOpen) {
        setShowTooltip(true)
      }
    }, 2500)
    return () => clearTimeout(timer)
  }, [hasInteracted, isOpen])

  // Auto-scroll when messages update or loading state changes
  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
    }
  }, [messages, loading, isOpen])

  // Focus input on open
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 200)
    }
  }, [isOpen])

  const handleOpen = () => {
    setIsOpen(true)
    setShowTooltip(false)
    setHasInteracted(true)
  }

  const handleClose = () => {
    setIsOpen(false)
  }

  const handleReset = () => {
    setMessages([
      {
        id: 'welcome-' + Date.now(),
        sender: 'bot',
        text: `Conversation refreshed! How can I help you explore Souhail's qualifications today?`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        actions: [
          { label: 'Download Resume (PDF)', actionType: 'download', value: PROFILE_INFO.cvUrl, icon: 'download' },
          { label: 'Send an Email', actionType: 'link', value: `mailto:${PROFILE_INFO.email}`, icon: 'mail' }
        ],
        quickReplies: QUICK_PROMPTS
      }
    ])
  }

  const handleSend = async (userText?: string) => {
    const query = (userText || input).trim()
    if (!query || loading) return

    const userMsg: ChatMessage = {
      id: 'user-' + Date.now(),
      sender: 'user',
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }

    setMessages(prev => [...prev, userMsg])
    setInput('')
    setLoading(true)

    try {
      const response = await sendChatMessage(query, messages)
      const botMsg: ChatMessage = {
        id: 'bot-' + Date.now(),
        sender: 'bot',
        text: response.text,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        actions: response.actions,
        quickReplies: response.quickReplies
      }
      setMessages(prev => [...prev, botMsg])
    } catch {
      const fallbackMsg: ChatMessage = {
        id: 'bot-err-' + Date.now(),
        sender: 'bot',
        text: `I'm having trouble processing that right now. Feel free to contact Souhail directly at [${PROFILE_INFO.email}](mailto:${PROFILE_INFO.email}) or download his resume!`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        actions: [
          { label: 'Download Resume', actionType: 'download', value: PROFILE_INFO.cvUrl, icon: 'download' }
        ]
      }
      setMessages(prev => [...prev, fallbackMsg])
    } finally {
      setLoading(false)
    }
  }

  const handleActionClick = (action: RecruiterAction) => {
    if (action.actionType === 'question') {
      handleSend(action.value)
    } else if (action.actionType === 'download') {
      const link = document.createElement('a')
      link.href = action.value
      link.download = 'Abdennebi_Souhail_CV.pdf'
      link.click()
    } else if (action.actionType === 'link') {
      if (action.value.startsWith('#')) {
        const el = document.querySelector(action.value)
        el?.scrollIntoView({ behavior: 'smooth' })
        if (window.innerWidth < 640) setIsOpen(false)
      } else {
        window.open(action.value, '_blank', 'noreferrer')
      }
    }
  }

  // Format message text with markdown bold and bullet points
  const renderFormattedText = (content: string) => {
    const lines = content.split('\n')
    return (
      <div className="space-y-1.5 text-sm leading-relaxed">
        {lines.map((line, idx) => {
          if (!line.trim()) return <div key={idx} className="h-1.5" />
          
          // Parse bold markdown **text**
          const parts = line.split(/(\*\*.*?\*\*|\[.*?\]\(.*?\))/g)
          
          const parsed = parts.map((part, pIdx) => {
            if (part.startsWith('**') && part.endsWith('**')) {
              return <strong key={pIdx} className="font-semibold text-gray-900 dark:text-white">{part.slice(2, -2)}</strong>
            }
            if (part.startsWith('[') && part.includes('](') && part.endsWith(')')) {
              const label = part.substring(1, part.indexOf(']('))
              const url = part.substring(part.indexOf('](') + 2, part.length - 1)
              return (
                <a
                  key={pIdx}
                  href={url}
                  target="_blank"
                  rel="noreferrer"
                  className="text-primary-600 dark:text-primary-400 underline font-medium hover:text-primary-700"
                >
                  {label}
                </a>
              )
            }
            return part
          })

          return <p key={idx}>{parsed}</p>
        })}
      </div>
    )
  }

  return (
    <>
      {/* Floating Launcher Button */}
      <div className="fixed bottom-6 right-6 z-40 flex items-end flex-col">
        {/* Tooltip for Recruiters */}
        <AnimatePresence>
          {showTooltip && !isOpen && (
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="mb-3 max-w-xs bg-white dark:bg-gray-900 border border-primary-200 dark:border-primary-900/60 rounded-xl p-3 shadow-xl text-xs flex items-center gap-2 cursor-pointer group"
              onClick={handleOpen}
            >
              <div className="w-8 h-8 rounded-full bg-primary-100 dark:bg-primary-950 flex items-center justify-center text-primary-600 shrink-0">
                <HiSparkles className="animate-spin text-sm" style={{ animationDuration: '4s' }} />
              </div>
              <div className="flex-1">
                <p className="font-semibold text-gray-900 dark:text-gray-100 flex items-center gap-1">
                  Recruiter Agent <span className="inline-block w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                </p>
                <p className="text-gray-600 dark:text-gray-400">Ask about Souhail's stack, job availability, or download his resume!</p>
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  setShowTooltip(false)
                }}
                className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 p-1"
                aria-label="Dismiss"
              >
                <FiX className="text-xs" />
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Toggle Button */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => (isOpen ? handleClose() : handleOpen())}
          className={`relative p-3.5 rounded-full shadow-2xl flex items-center justify-center text-white transition-all duration-300 ${
            isOpen
              ? 'bg-gray-800 dark:bg-gray-700'
              : 'bg-gradient-to-r from-primary-500 via-primary-600 to-sky-600 hover:shadow-primary-500/30'
          }`}
          aria-label={isOpen ? 'Close chat' : 'Open recruiter assistant'}
        >
          {isOpen ? (
            <FiX className="text-2xl" />
          ) : (
            <>
              <FiMessageSquare className="text-2xl" />
              <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-green-500 border-2 border-white dark:border-gray-900"></span>
              </span>
            </>
          )}
        </motion.button>
      </div>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 25, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 25, scale: 0.95 }}
            transition={{ duration: 0.25 }}
            className="fixed bottom-20 sm:bottom-24 right-4 sm:right-6 z-50 w-[calc(100vw-2rem)] sm:w-[420px] max-w-[440px] h-[580px] max-h-[82vh] flex flex-col rounded-2xl bg-white/95 dark:bg-gray-900/95 backdrop-blur-md border border-gray-200 dark:border-gray-800 shadow-2xl overflow-hidden"
          >
            {/* Header */}
            <div className="px-4 py-3 bg-gradient-to-r from-primary-600 to-primary-700 text-white flex items-center justify-between shadow-sm">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur flex items-center justify-center text-white font-bold text-sm border border-white/30">
                    SA
                  </div>
                  <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-400 border-2 border-primary-700 rounded-full" />
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <h3 className="font-semibold text-sm sm:text-base leading-tight">Souhail's Agent</h3>
                    <span className="text-[10px] bg-white/20 text-white px-1.5 py-0.5 rounded font-mono">
                      {hasAi ? 'AI Powered' : 'Recruiter Bot'}
                    </span>
                  </div>
                  <p className="text-xs text-primary-100 flex items-center gap-1">
                    <FiCheckCircle className="text-[11px]" /> Online • Fast response
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-1">
                <button
                  onClick={handleReset}
                  className="p-1.5 rounded-lg text-primary-100 hover:text-white hover:bg-white/10 transition-colors"
                  title="Reset conversation"
                  aria-label="Reset conversation"
                >
                  <FiRefreshCw className="text-sm" />
                </button>
                <button
                  onClick={handleClose}
                  className="p-1.5 rounded-lg text-primary-100 hover:text-white hover:bg-white/10 transition-colors"
                  title="Close chat"
                  aria-label="Close chat"
                >
                  <FiX className="text-base" />
                </button>
              </div>
            </div>

            {/* Recruiter Quick Status Banner */}
            <div className="bg-primary-50 dark:bg-primary-950/40 border-b border-primary-100 dark:border-primary-900/30 px-3.5 py-2 flex items-center justify-between text-xs">
              <div className="flex items-center gap-1.5 text-gray-700 dark:text-gray-300">
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                <span>Graduated • Seeking <strong>Full-Time Roles</strong> (Immediate)</span>
              </div>
              <a
                href={PROFILE_INFO.cvUrl}
                download="Abdennebi_Souhail_CV.pdf"
                className="inline-flex items-center gap-1 text-primary-600 dark:text-primary-400 hover:underline font-semibold"
              >
                <FiDownload /> CV PDF
              </a>
            </div>

            {/* Chat Messages Body */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map(msg => (
                <div
                  key={msg.id}
                  className={`flex gap-2.5 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  {msg.sender === 'bot' && (
                    <div className="w-7 h-7 rounded-full bg-primary-500/10 dark:bg-primary-500/20 text-primary-600 dark:text-primary-400 flex items-center justify-center shrink-0 mt-0.5">
                      <HiSparkles className="text-xs" />
                    </div>
                  )}

                  <div className={`max-w-[85%] ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}>
                    <div
                      className={`p-3.5 rounded-2xl ${
                        msg.sender === 'user'
                          ? 'bg-primary-500 text-white rounded-br-xs'
                          : 'bg-gray-100 dark:bg-gray-800/90 text-gray-800 dark:text-gray-200 rounded-bl-xs border border-gray-200/50 dark:border-gray-700/50'
                      }`}
                    >
                      {msg.sender === 'user' ? (
                        <p className="text-sm whitespace-pre-wrap">{msg.text}</p>
                      ) : (
                        renderFormattedText(msg.text)
                      )}
                    </div>

                    <span className="text-[10px] text-gray-400 dark:text-gray-500 mt-1 px-1 inline-block">
                      {msg.timestamp}
                    </span>

                    {/* Interactive Action Buttons */}
                    {msg.actions && msg.actions.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 mt-2">
                        {msg.actions.map((act, i) => (
                          <button
                            key={i}
                            onClick={() => handleActionClick(act)}
                            className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium rounded-lg bg-white dark:bg-gray-800 border border-primary-200 dark:border-primary-800/80 text-primary-600 dark:text-primary-300 hover:bg-primary-50 dark:hover:bg-primary-950/40 shadow-xs transition-colors"
                          >
                            {act.icon === 'download' && <FiDownload className="text-[11px]" />}
                            {act.icon === 'mail' && <FiMail className="text-[11px]" />}
                            {act.icon === 'external' && <FiExternalLink className="text-[11px]" />}
                            {act.label}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>

                  {msg.sender === 'user' && (
                    <div className="w-7 h-7 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300 flex items-center justify-center shrink-0 mt-0.5">
                      <FiUser className="text-xs" />
                    </div>
                  )}
                </div>
              ))}

              {/* Bot Typing Indicator */}
              {loading && (
                <div className="flex items-center gap-2.5 text-gray-500">
                  <div className="w-7 h-7 rounded-full bg-primary-500/10 dark:bg-primary-500/20 text-primary-600 dark:text-primary-400 flex items-center justify-center shrink-0">
                    <HiSparkles className="text-xs" />
                  </div>
                  <div className="p-3 rounded-2xl rounded-bl-xs bg-gray-100 dark:bg-gray-800 border border-gray-200/50 dark:border-gray-700/50 flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-primary-400 animate-bounce" style={{ animationDelay: '0ms' }} />
                    <span className="w-2 h-2 rounded-full bg-primary-400 animate-bounce" style={{ animationDelay: '150ms' }} />
                    <span className="w-2 h-2 rounded-full bg-primary-400 animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Suggested Recruiter Chips */}
            <div className="px-3 py-2 border-t border-gray-100 dark:border-gray-800/80 bg-gray-50/50 dark:bg-gray-900/50">
              <div className="text-[11px] font-medium text-gray-500 dark:text-gray-400 mb-1 flex items-center gap-1">
                <FiChevronRight className="text-[10px]" /> Recruiter Topics:
              </div>
              <div className="flex gap-1.5 overflow-x-auto pb-1 no-scrollbar text-xs">
                {QUICK_PROMPTS.map((prompt, i) => (
                  <button
                    key={i}
                    onClick={() => handleSend(prompt)}
                    disabled={loading}
                    className="whitespace-nowrap px-2.5 py-1 rounded-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:border-primary-400 dark:hover:border-primary-500 hover:text-primary-600 transition-colors shrink-0 disabled:opacity-50"
                  >
                    {prompt}
                  </button>
                ))}
              </div>
            </div>

            {/* Input Bar */}
            <form
              onSubmit={(e) => {
                e.preventDefault()
                handleSend()
              }}
              className="p-3 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 flex items-center gap-2"
            >
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about skills, full-time availability, projects..."
                className="flex-1 bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100 text-xs sm:text-sm rounded-xl px-3.5 py-2.5 outline-none focus:ring-2 focus:ring-primary-500 transition-all border border-transparent focus:border-transparent placeholder-gray-400 dark:placeholder-gray-500"
                disabled={loading}
              />
              <button
                type="submit"
                disabled={!input.trim() || loading}
                className="p-2.5 rounded-xl bg-primary-500 hover:bg-primary-600 disabled:opacity-40 disabled:cursor-not-allowed text-white transition-colors flex items-center justify-center shrink-0"
                aria-label="Send message"
              >
                <FiSend className="text-base" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
