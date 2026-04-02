import { motion } from 'framer-motion'

const SPRING = { type: 'spring', stiffness: 300, damping: 30 }

function CardMedia({ item }) {
  if (item.img) {
    return (
      <img
        src={item.img}
        alt={item.title}
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

export default function List({ items, selectedId, onSelect }) {
  return (
    <div className="max-w-6xl mx-auto px-6 py-16">
      {/* Header */}
      <header className="mb-14 flex items-end justify-between">
        <div>
          <p className="text-[11px] font-bold tracking-[0.22em] uppercase text-white/30 mb-3">
            Portfolio
          </p>
          <h1 className="text-5xl font-bold text-white tracking-tight leading-none">
            Selected<br />Works
          </h1>
        </div>
        <p className="text-white/25 text-sm tabular-nums">{items.length} projects</p>
      </header>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-5 gap-y-10">
        {items.map((item) => (
          <motion.div
            key={item.id}
            animate={{
              opacity: selectedId && selectedId !== item.id ? 0.3 : 1,
              scale:   selectedId && selectedId !== item.id ? 0.98 : 1,
            }}
            transition={{ duration: 0.25 }}
            className="cursor-pointer"
            onClick={() => !selectedId && onSelect(item.id)}
          >
            {/* ── Image container — the shared element ── */}
            <motion.div
              layoutId={`img-${item.id}`}
              transition={SPRING}
              className="overflow-hidden rounded-xl"
              style={{ aspectRatio: '4 / 3' }}
              whileHover={!selectedId ? { scale: 1.03 } : {}}
            >
              <CardMedia item={item} />
            </motion.div>

            {/* ── Card text ── */}
            <div className="pt-3 px-0.5">
              <p className="text-[10px] font-bold tracking-[0.18em] uppercase text-white/35 mb-1">
                {item.tag}
              </p>
              <h3 className="text-white text-[15px] font-semibold leading-snug">
                {item.title}
              </h3>
              <p className="text-white/30 text-xs mt-1">{item.year}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
