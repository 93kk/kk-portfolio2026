import { useEffect } from 'react'
import { motion } from 'framer-motion'

// Shared spring — slightly sticky for a tactile feel
const SPRING = { type: 'spring', stiffness: 300, damping: 30 }

// Staggered text entrance: slides up from below after image settles
const textVariants = {
  hidden:  { opacity: 0, y: 22 },
  visible: (delay) => ({ opacity: 1, y: 0, transition: { delay, duration: 0.45, ease: [0.23, 1, 0.32, 1] } }),
  exit:    { opacity: 0, y: 14, transition: { duration: 0.2 } },
}

function CardMedia({ item }) {
  if (item.img) {
    return (
      <img
        src={item.img}
        alt={item.title}
        // object-fit:cover is maintained — the container (layoutId) morphs, image fills it
        style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
      />
    )
  }
  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        background: `linear-gradient(135deg, ${item.grad.join(', ')})`,
      }}
    />
  )
}

export default function Detail({ item, onClose }) {
  // Escape key to close
  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])

  // Lock body scroll while detail is open
  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = '' }
  }, [])

  return (
    <>
      {/* ── Dark backdrop ── */}
      <motion.div
        className="fixed inset-0 z-40 bg-[#080c16]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.96 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        onClick={onClose}
      />

      {/* ── Color bloom — accent glow from the card color ── */}
      <motion.div
        className="fixed inset-0 z-40 pointer-events-none"
        style={{
          background: `radial-gradient(ellipse 90% 55% at 50% 25%, ${item.color}2a 0%, transparent 65%)`,
        }}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
      />

      {/* ── Scrollable content layer ── */}
      <div className="fixed inset-0 z-50 overflow-y-auto pointer-events-none">
        <div className="min-h-screen flex flex-col items-center">

          {/* ── Image — Shared Element (layoutId matches List card) ── */}
          <motion.div
            layoutId={`img-${item.id}`}
            transition={SPRING}
            className="w-full overflow-hidden pointer-events-auto"
            style={{ height: '62vh', minHeight: 320, maxHeight: 700 }}
          >
            <CardMedia item={item} />
          </motion.div>

          {/* ── Info panel — slides up after image settles ── */}
          <div className="w-full max-w-3xl px-7 pt-9 pb-24 pointer-events-auto">

            <motion.p
              variants={textVariants}
              custom={0.25}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="text-[10px] font-bold tracking-[0.22em] uppercase text-white/35 mb-3"
            >
              {item.tag}&nbsp;&nbsp;—&nbsp;&nbsp;{item.year}
            </motion.p>

            <motion.h2
              variants={textVariants}
              custom={0.31}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="text-white text-3xl sm:text-4xl font-bold tracking-tight leading-tight"
            >
              {item.title}
            </motion.h2>

            <motion.p
              variants={textVariants}
              custom={0.38}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="text-white/50 mt-5 text-base leading-relaxed"
            >
              {item.desc}
            </motion.p>

            <motion.div
              variants={textVariants}
              custom={0.44}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="mt-9 flex flex-wrap gap-3"
            >
              <button
                className="px-7 py-3 bg-white text-[#080c16] rounded-xl text-sm font-bold hover:bg-white/90 active:scale-95 transition-all"
              >
                View Case Study →
              </button>
              <button
                className="px-7 py-3 border border-white/20 text-white rounded-xl text-sm font-semibold hover:bg-white/5 active:scale-95 transition-all"
                onClick={onClose}
              >
                Close
              </button>
            </motion.div>
          </div>
        </div>
      </div>

      {/* ── Close button (top-right) ── */}
      <motion.button
        className="fixed top-5 right-5 z-[60] w-11 h-11 rounded-full bg-white/10 backdrop-blur-sm text-white flex items-center justify-center hover:bg-white/20 active:scale-90 transition-colors"
        initial={{ opacity: 0, scale: 0.7 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.7 }}
        transition={{ delay: 0.18, type: 'spring', stiffness: 400, damping: 25 }}
        onClick={onClose}
        aria-label="Close"
      >
        <svg width="13" height="13" viewBox="0 0 13 13" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
          <line x1="1" y1="1" x2="12" y2="12" />
          <line x1="12" y1="1" x2="1" y2="12" />
        </svg>
      </motion.button>
    </>
  )
}
