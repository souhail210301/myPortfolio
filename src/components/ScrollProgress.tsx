import { useEffect, useState } from 'react'
import { motion, useScroll, useSpring } from 'framer-motion'

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 })
  const [pct, setPct] = useState(0)

  useEffect(() => {
    return scrollYProgress.on('change', v => setPct(Math.round(v * 100)))
  }, [scrollYProgress])

  return (
    <>
      {/* Top progress bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-primary-500 via-sky-400 to-primary-600 origin-left z-[60]"
        style={{ scaleX }}
      />
      {/* Percentage badge when scrolling */}
      {pct > 5 && pct < 98 && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          className="fixed top-2 right-4 z-[59] text-[10px] font-bold tabular-nums text-primary-600 dark:text-primary-400 bg-white/80 dark:bg-gray-900/80 backdrop-blur px-1.5 py-0.5 rounded shadow-sm border border-gray-200/50 dark:border-gray-700/50"
        >
          {pct}%
        </motion.div>
      )}
    </>
  )
}
