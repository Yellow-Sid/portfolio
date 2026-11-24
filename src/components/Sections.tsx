import { useEffect, useState, type ReactNode } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowUp, Check, Copy, Github, Linkedin, ExternalLink } from 'lucide-react'
import { about, interests, profile, projects, skills } from '../config/data'
import { Magnetic } from './Chrome'

const Reveal = ({ children, d = 0 }: { children: ReactNode; d?: number }) => (
  <motion.div initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-60px' }} transition={{ duration: 0.7, delay: d, ease: [0.22, 1, 0.36, 1] }}>{children}</motion.div>)
const Wrap = ({ id, children }: { id: string; children: ReactNode }) => <section id={id} className="mx-auto max-w-6xl px-6 py-28 scroll-mt-10">{children}</section>

function Clock() {
  const [t, setT] = useState(new Date()); useEffect(() => { const i = setInterval(() => setT(new Date()), 1000); return () => clearInterval(i) }, [])
  return <span className="tabular-nums">{t.toLocaleTimeString('en-IN', { timeZone: profile.timeZone, hour: '2-digit', minute: '2-digit', second: '2-digit' })} IST</span>
}

export function Hero() {
  const [name1, name2] = profile.name.split(' ')
  return (
    <section id="home" className="relative flex min-h-screen items-center overflow-hidden"
      onMouseMove={(e) => { const r = e.currentTarget.getBoundingClientRect(); e.currentTarget.style.setProperty('--mx', `${e.clientX - r.left}px`); e.currentTarget.style.setProperty('--my', `${e.clientY - r.top}px`) }}>
      <div className="grid-bg absolute inset-0" aria-hidden />
      <div className="relative mx-auto w-full max-w-6xl px-6 pt-24">
        <p className="mb-6 flex items-center gap-2 text-sm text-mute"><span className="relative flex h-2 w-2"><span className="absolute h-2 w-2 animate-ping rounded-full bg-signal opacity-70" /><span className="h-2 w-2 rounded-full bg-signal" /></span>Open to SDE internships</p>
        <h1 className="text-[clamp(3.5rem,13vw,11rem)] font-bold leading-[0.88] tracking-tighter">
          {[name1, name2].map((w, i) => <span key={w} className="block overflow-hidden"><motion.span className="block" initial={{ y: '105%' }} animate={{ y: 0 }} transition={{ delay: 1.7 + i * 0.12, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}>{w}</motion.span></span>)}
        </h1>
        <div className="mt-10 grid gap-8 md:grid-cols-[1.2fr_1fr]">
          <div><p className="text-2xl font-light md:text-3xl">{profile.headline}</p><p className="mt-4 max-w-md text-mute">{profile.intro}</p></div>
          <div className="text-sm text-mute md:text-right"><p>{profile.location}</p><p>{profile.status}</p><p className="mt-1"><Clock /></p></div>
        </div>
        <div className="mt-10 flex flex-wrap gap-4">
          <Magnetic><a href="#projects" className="inline-block rounded-full bg-paper px-7 py-3 font-medium text-ink">View projects</a></Magnetic>
          <Magnetic><a href="#contact" className="inline-block rounded-full border border-line px-7 py-3 hover:border-paper">Let's connect</a></Magnetic>
        </div>
      </div>
    </section>)
}

export const About = () => (
  <Wrap id="about"><div className="grid gap-12 md:grid-cols-[1fr_2fr]">
    <Reveal><h2 className="text-4xl font-bold tracking-tight">About</h2></Reveal>
    <div className="space-y-6 text-xl font-light leading-relaxed">
      {about.map((p, i) => <Reveal key={i} d={i * 0.08}><p>{p}</p></Reveal>)}
      <Reveal><ul className="flex flex-wrap gap-2 pt-2">{interests.map((i) => <li key={i} className="rounded-full border border-line px-4 py-1.5 text-sm text-mute">{i}</li>)}</ul></Reveal>
    </div></div></Wrap>)

export const Projects = () => (
  <Wrap id="projects">
    <Reveal><h2 className="mb-16 text-4xl font-bold tracking-tight">Selected projects</h2></Reveal>
    <div className="space-y-24">
      {projects.map((p, i) => (
        <Reveal key={p.name}><article className={`group grid items-center gap-8 md:grid-cols-2 ${i % 2 ? 'md:[&>div:first-child]:order-2' : ''}`}>
          <div data-cursor className="relative aspect-[4/3] overflow-hidden rounded-sm border border-line bg-[#131316]">
            <div className="grid-bg absolute inset-0 opacity-60 transition-transform duration-700 group-hover:scale-110" style={{ ['--mx' as string]: '50%', ['--my' as string]: '50%' }} />
            <div className="absolute inset-0 grid place-items-center text-5xl font-bold tracking-tighter text-paper/90 transition-transform duration-700 group-hover:scale-105">{p.name}</div>
            <span className="absolute bottom-4 left-4 text-sm text-mute">{p.tag}</span>
          </div>
          <div>
            <h3 className="text-3xl font-bold tracking-tight">{p.name}</h3>
            <p className="mt-2 text-lg text-mute">{p.blurb}</p>
            <p className="mt-6"><span className="text-mute">Problem: </span>{p.problem}</p>
            <ul className="mt-4 list-disc space-y-1 pl-5 text-mute">{p.features.map((f, k) => <li key={k}>{f}</li>)}</ul>
            <ul className="mt-6 flex flex-wrap gap-2">{p.stack.map((s) => <li key={s} className="rounded-full border border-line px-3 py-1 text-xs">{s}</li>)}</ul>
            <div className="mt-6 flex gap-6 text-sm">
              {p.github && <a className="ul inline-flex items-center gap-1" href={p.github} target="_blank" rel="noreferrer"><Github size={15} />Source</a>}
              {p.live && <a className="ul inline-flex items-center gap-1" href={p.live} target="_blank" rel="noreferrer"><ExternalLink size={15} />Live</a>}
            </div>
          </div>
        </article></Reveal>))}
    </div></Wrap>)

export function Skills() {
  const cats = Object.keys(skills); const [c, setC] = useState(cats[0])
  return (
    <Wrap id="skills"><Reveal><h2 className="mb-10 text-4xl font-bold tracking-tight">Skills</h2></Reveal>
      <div role="tablist" aria-label="Skill categories" className="flex flex-wrap gap-x-8 gap-y-2 border-b border-line pb-4">
        {cats.map((k) => <button key={k} role="tab" aria-selected={c === k} onClick={() => setC(k)} className={`relative pb-1 transition-colors ${c === k ? 'text-paper' : 'text-mute hover:text-paper'}`}>{k}{c === k && <motion.span layoutId="tab" className="absolute inset-x-0 -bottom-[17px] h-px bg-signal" />}</button>)}
      </div>
      <AnimatePresence mode="wait"><motion.ul key={c} role="tabpanel" className="mt-10 flex min-h-32 flex-wrap gap-3" initial="h" animate="s" exit={{ opacity: 0 }} variants={{ s: { transition: { staggerChildren: 0.05 } } }}>
        {skills[c].map((s) => <motion.li key={s} variants={{ h: { opacity: 0, y: 12 }, s: { opacity: 1, y: 0 } }} whileHover={{ y: -3 }} className="rounded-full border border-line px-6 py-3 text-xl hover:border-signal">{s}</motion.li>)}
      </motion.ul></AnimatePresence></Wrap>)
}

export function Contact() {
  const [copied, setCopied] = useState(false)
  const copy = async () => { try { await navigator.clipboard.writeText(profile.email) } catch { /* ignore */ } setCopied(true); setTimeout(() => setCopied(false), 1800) }
  const send = (e: React.FormEvent<HTMLFormElement>) => { e.preventDefault(); const f = new FormData(e.currentTarget)
    location.href = `mailto:${profile.email}?subject=${encodeURIComponent(String(f.get('subject')))}&body=${encodeURIComponent(`${f.get('message')}\n\n${f.get('name')} (${f.get('email')})`)}` }
  const field = 'w-full border-b border-line bg-transparent py-3 outline-none transition-colors focus:border-signal placeholder:text-mute'
  return (
    <Wrap id="contact"><div className="grid gap-16 md:grid-cols-2">
      <Reveal><h2 className="text-5xl font-bold leading-tight tracking-tight">Have something to build? Let's talk.</h2>
        <button onClick={copy} className="mt-8 inline-flex items-center gap-3 text-xl ul" aria-live="polite">{profile.email}{copied ? <Check size={18} className="text-signal" /> : <Copy size={18} />}<span className="text-sm text-mute">{copied ? 'Copied' : 'Copy'}</span></button>
        <div className="mt-6 flex gap-6"><a className="ul inline-flex gap-2" href={profile.github} target="_blank" rel="noreferrer"><Github size={18} />GitHub</a><a className="ul inline-flex gap-2" href={profile.linkedin} target="_blank" rel="noreferrer"><Linkedin size={18} />LinkedIn</a></div></Reveal>
      <Reveal d={0.1}><form onSubmit={send} className="space-y-6">
        {['name', 'email', 'subject'].map((n) => <label key={n} className="block"><span className="sr-only">{n}</span><input required name={n} type={n === 'email' ? 'email' : 'text'} placeholder={n[0].toUpperCase() + n.slice(1)} className={field} /></label>)}
        <label className="block"><span className="sr-only">Message</span><textarea required name="message" rows={4} placeholder="Message" className={field} /></label>
        <Magnetic><button className="rounded-full bg-paper px-7 py-3 font-medium text-ink">Send message</button></Magnetic>
      </form></Reveal></div></Wrap>)
}

export function Footer() {
  const line = `${profile.name} · Roorkee · Open to internships · `.repeat(4)
  return (
    <footer className="overflow-hidden border-t border-line pt-10">
      <div aria-hidden className="flex whitespace-nowrap text-[8vw] font-bold tracking-tighter text-line"><div className="marquee flex shrink-0 pr-8">{line}{line}</div></div>
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-6 py-8 text-sm text-mute">
        <span className="font-bold text-paper">{profile.initials}</span>
        <span>© {new Date().getFullYear()} {profile.name}. Built by hand, debugged by coffee.</span>
        <div className="flex items-center gap-5"><a href={profile.github} aria-label="GitHub"><Github size={18} /></a><a href={profile.linkedin} aria-label="LinkedIn"><Linkedin size={18} /></a>
          <button onClick={() => scrollTo({ top: 0 })} className="inline-flex items-center gap-1 ul text-paper">Top <ArrowUp size={14} /></button></div>
      </div></footer>)
}
