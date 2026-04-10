import { useState, useEffect, useRef } from 'react'
import { AnimatePresence } from 'framer-motion'
import List from './components/List'
import Detail from './components/Detail'

export const ITEMS = [
  {
    id: '1',
    tag: 'Branding',
    title: 'Maison Verte — Visual Identity',
    year: '2024',
    img: '/images/tp-01.webp',
    color: '#FF6B6B',
    grad: ['#FF6B6B', '#FF8E53'],
    desc: 'A complete visual identity system for a Parisian botanical wellness brand, spanning logo, typography, packaging, and environmental design.',
  },
  {
    id: '2',
    tag: 'Branding',
    title: 'Koto Studio — Brand System',
    year: '2024',
    img: '/images/tp-02.webp',
    color: '#4FACFE',
    grad: ['#4FACFE', '#00C6FF'],
    desc: 'Comprehensive brand overhaul for a leading design studio, including motion guidelines, component library, and brand voice documentation.',
  },
  {
    id: '3',
    tag: 'Branding',
    title: 'Arkadia — Logo Design',
    year: '2023',
    img: '/images/tp-03.webp',
    color: '#43E97B',
    grad: ['#43E97B', '#38F9D7'],
    desc: 'Minimal and timeless logotype for a luxury real estate developer, inspired by classical Roman architecture and modern Swiss typography.',
  },
  {
    id: '4',
    tag: 'UI / UX',
    title: 'Fintech App — Mobile Design',
    year: '2024',
    img: null,
    color: '#667EEA',
    grad: ['#667EEA', '#764BA2'],
    desc: 'End-to-end design for a personal finance app targeting Gen Z, featuring micro-animations and accessible information architecture.',
  },
  {
    id: '5',
    tag: 'UI / UX',
    title: 'Dashboard System — SaaS',
    year: '2024',
    img: null,
    color: '#11998E',
    grad: ['#11998E', '#38EF7D'],
    desc: 'Scalable design system and analytics dashboard for a B2B SaaS platform, built with Figma component tokens and accessibility in mind.',
  },
  {
    id: '6',
    tag: 'Photography',
    title: 'Architecture — Tokyo 2024',
    year: '2024',
    img: '/images/tp-04.webp',
    color: '#4286F4',
    grad: ['#373B44', '#4286F4'],
    desc: 'A photo essay exploring the tension between brutalist postwar architecture and contemporary glass towers in central Tokyo.',
  },
  {
    id: '7',
    tag: 'Web Design',
    title: 'Agency Website — Full Redesign',
    year: '2024',
    img: null,
    color: '#8360C3',
    grad: ['#8360C3', '#2EBF91'],
    desc: 'Full redesign of a 30-person creative agency site, with case study system, team profiles, and custom CMS integration.',
  },
  {
    id: '8',
    tag: 'Motion',
    title: 'Brand Animation — Intro',
    year: '2024',
    img: null,
    color: '#ED213A',
    grad: ['#ED213A', '#93291E'],
    desc: 'A 15-second animated brand intro for use across social, broadcast, and digital touchpoints, rendered in After Effects and Lottie.',
  },
  {
    id: '9',
    tag: 'Print',
    title: 'Annual Report — Luxury Brand',
    year: '2024',
    img: null,
    color: '#C94B4B',
    grad: ['#C94B4B', '#4B134F'],
    desc: 'Print-ready annual report design for a luxury conglomerate, combining editorial photography, custom infographics, and premium typography.',
  },
]

export default function App() {
  const [selectedId, setSelectedId] = useState(null)
  // Preserve list scroll position across detail open/close
  const scrollRef = useRef(0)

  const selectedItem = ITEMS.find(item => item.id === selectedId) ?? null

  // Browser back button support
  useEffect(() => {
    const onPopState = (e) => {
      setSelectedId(e.state?.selectedId ?? null)
    }
    window.addEventListener('popstate', onPopState)
    return () => window.removeEventListener('popstate', onPopState)
  }, [])

  const openDetail = (id) => {
    // Save scroll position before opening detail
    scrollRef.current = window.scrollY
    history.pushState({ selectedId: id }, '')
    setSelectedId(id)
  }

  const closeDetail = () => {
    history.back()
  }

  // Restore scroll position when detail closes
  useEffect(() => {
    if (!selectedId) {
      // Use requestAnimationFrame to wait for layout to settle
      requestAnimationFrame(() => {
        window.scrollTo({ top: scrollRef.current, behavior: 'instant' })
      })
    }
  }, [selectedId])

  return (
    <div className="min-h-screen bg-[#080c16]">
      <List
        items={ITEMS}
        selectedId={selectedId}
        onSelect={openDetail}
      />
      <AnimatePresence>
        {selectedItem && (
          <Detail
            key={selectedItem.id}
            item={selectedItem}
            onClose={closeDetail}
          />
        )}
      </AnimatePresence>
    </div>
  )
}
