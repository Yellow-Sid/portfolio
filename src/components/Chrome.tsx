import { useEffect, useRef, useState, type ReactNode } from 'react'
import { AnimatePresence, motion, useMotionValue, useScroll, useSpring } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { nav, profile } from '../config/data'

export function Preloader({ onDone }: { onDone: () => void }) {
  const [n, setN] = useState(0)
  useEffect(() => {
    const t0 = performance.now(); let raf = 0
    const tick = (t: number) => { const p = Math.min(1, (t - t0) / 1400); setN(Math.round(p * 100)); p < 1 ? (raf = requestAnimationFrame(tick)) : setTimeout(onDone, 250) }
    raf = requestAnimationFrame(tick); return () => cancelAnimationFrame(raf)
  }, [onDone])
  return (
    <motion.div className="fixed inset-0 z-[70] bg-ink grid place-items-center" initial={{ clipPath: 'inset(0 0 0 0)' }}
      exit={{ clipPath: 'inset(0 0 100% 0)', transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } }} role="status" aria-label="Loading">
      <div className="w-56">
        <div className="flex items-end justify-between"><span className="text-6xl font-bold tracking-tight">{profile.initials}</span><span className="tabular-nums text-mute">{n}%</span></div>
        <div className="mt-4 h-px bg-line"><div className="h-px bg-signal" style={{ width: `${n}%` }} /></div>
      </div>
    </motion.div>
  )
}

export function Cursor() {
  const x = useMotionValue(-100), y = useMotionValue(-100)
  const sx = useSpring(x, { damping: 22, stiffness: 220 }), sy = useSpring(y, { damping: 22, stiffness: 220 })
  const [hover, setHover] = useState(false); const [on, setOn] = useState(false)
  useEffect(() => {
    if (!matchMedia('(pointer: fine)').matches || matchMedia('(prefers-reduced-motion: reduce)').matches) return
    setOn(true); document.body.classList.add('has-cursor')
    const mv = (e: MouseEvent) => { x.set(e.clientX); y.set(e.clientY); setHover(!!(e.target as HTMLElement).closest('a,button,[data-cursor]')) }
    addEventListener('mousemove', mv); return () => { removeEventListener('mousemove', mv); document.body.classList.remove('has-cursor') }
  }, [x, y])
  if (!on) return null
  return (<>
    <motion.div aria-hidden className="pointer-events-none fixed z-[80] h-1.5 w-1.5 -ml-[3px] -mt-[3px] rounded-full bg-paper" style={{ x, y }} />
    <motion.div aria-hidden className="pointer-events-none fixed z-[80] h-9 w-9 -ml-[18px] -mt-[18px] rounded-full border border-paper/60 mix-blend-difference" style={{ x: sx, y: sy }} animate={{ scale: hover ? 1.9 : 1 }} />
  </>)
}

export function Magnetic({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null); const [p, setP] = useState({ x: 0, y: 0 })
  return <motion.div ref={ref} className="inline-block" animate={p} transition={{ type: 'spring', stiffness: 200, damping: 15 }}
    onMouseMove={(e) => { const r = ref.current!.getBoundingClientRect(); setP({ x: (e.clientX - r.left - r.width / 2) * 0.3, y: (e.clientY - r.top - r.height / 2) * 0.3 }) }}
    onMouseLeave={() => setP({ x: 0, y: 0 })}>{children}</motion.div>
}

export function Nav() {
  const [active, setActive] = useState('home'); const [open, setOpen] = useState(false); const [scrolled, setScrolled] = useState(false)
  const { scrollYProgress } = useScroll(); const w = useSpring(scrollYProgress, { stiffness: 120, damping: 30 })
  useEffect(() => {
    const io = new IntersectionObserver((es) => es.forEach((e) => e.isIntersecting && setActive(e.target.id)), { rootMargin: '-45% 0px -50% 0px' })
    nav.forEach((n) => { const el = document.getElementById(n.toLowerCase()); el && io.observe(el) })
    const sc = () => setScrolled(scrollY > 40); sc(); addEventListener('scroll', sc, { passive: true })
    return () => { io.disconnect(); removeEventListener('scroll', sc) }
  }, [])
  return (
    <header className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${scrolled ? 'bg-ink/80 backdrop-blur py-3 border-b border-line' : 'py-6'}`}>
      <motion.div className="absolute bottom-0 left-0 h-px w-full origin-left bg-signal" style={{ scaleX: w }} />
      <nav aria-label="Primary" className="mx-auto flex max-w-6xl items-center justify-between px-6">
        <a href="#home" className="text-lg font-bold" aria-label="Home">{profile.initials}</a>
        <ul className="hidden gap-8 md:flex">
          {nav.map((n) => <li key={n}><a href={`#${n.toLowerCase()}`} className="ul text-sm" aria-current={active === n.toLowerCase()}>{n}</a></li>)}
        </ul>
        <button className="md:hidden" onClick={() => setOpen(!open)} aria-label={open ? 'Close menu' : 'Open menu'} aria-expanded={open}>{open ? <X /> : <Menu />}</button>
      </nav>
      <AnimatePresence>{open && (
        <motion.ul initial={{ height: 0 }} animate={{ height: 'auto' }} exit={{ height: 0 }} className="overflow-hidden bg-ink md:hidden">
          {nav.map((n) => <li key={n}><a onClick={() => setOpen(false)} href={`#${n.toLowerCase()}`} className="block px-6 py-4 text-2xl border-t border-line">{n}</a></li>)}
        </motion.ul>)}
      </AnimatePresence>
    </header>
  )
}
